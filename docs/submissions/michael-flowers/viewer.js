// Project Dissonance — comparison viewer.
//
// Renders the discrimination test from the two analysis files. Every number on
// the page is computed from the JSON, never written into the markup, so the
// page cannot drift from the analyses it reports on.
//
// The articles themselves are not in this repo (FT terms). To see spans in
// place, the reader pastes text and matching happens locally — nothing is
// stored or transmitted.
(function () {
  var SOURCES = {
    opinion: { file: 'analyses/ft-bessent-2026-08-23.analysis.json', genreClass: '' },
    news: { file: 'analyses/ft-news-2026-08-25.analysis.json', genreClass: 'is-news' }
  };

  // My own sentence, written for SPEC.md — safe to ship, and it exercises the
  // three priority techniques so the panel does something on first load.
  var SAMPLE = 'Despite record corporate profits, struggling families now face yet another painful hike in grocery prices.';

  var SAMPLE_FINDINGS = [
    { technique: 'implied-causation', span: 'Despite record corporate profits', attributed: false },
    { technique: 'loaded-language', span: 'struggling families', attributed: false },
    { technique: 'agent-deletion', span: 'hike in grocery prices', attributed: false }
  ];

  var loaded = {};

  // FT text carries typographic quotes and dashes; stored spans are normalised.
  // Without this, matches fail for reasons that look like tool error.
  //
  // Every replacement here MUST be one character for one character. Match
  // positions are found in the normalised string but used to slice the raw
  // string, so anything that changes length would shift every highlight after
  // it. That rules out stripping zero-width or soft-hyphen characters here —
  // they would need handling with a position map instead.
  function normalise(s) {
    return s
      .replace(/[‘’‛]/g, "'")
      .replace(/[“”]/g, '"')
      .replace(/[–—‐‑‒]/g, '-')
      .replace(/ /g, ' ');
  }

  function el(tag, className, text) {
    var n = document.createElement(tag);
    if (className) n.className = className;
    if (text !== undefined) n.textContent = text;
    return n;
  }

  function unattributedCount(analysis) {
    return analysis.persuasion.filter(function (f) { return !f.attributed; }).length;
  }

  function density(analysis) {
    return unattributedCount(analysis) / analysis.source.wordCount * 100;
  }

  // ---- result banner -------------------------------------------------------

  function renderBanner(op, news) {
    var dOp = density(op);
    var dNews = density(news);
    var ratio = dNews > 0 ? dOp / dNews : Infinity;
    var passes = ratio >= 3;

    document.getElementById('ratio').textContent = ratio.toFixed(2) + '×';

    document.getElementById('ratio-caption').textContent =
      'The opinion column carries ' + ratio.toFixed(1) + ' times as much persuasion per hundred words as the news report on the same event. The project set 3× in advance as the bar to clear, and under 2× as the result that would have meant the tool wasn’t detecting anything.';

    var figures = document.getElementById('figures');
    figures.textContent = '';

    [
      ['Op-ed', dOp.toFixed(2) + ' per 100 words'],
      ['News report', dNews.toFixed(2) + ' per 100 words'],
      ['Threshold set in advance', '3.00×']
    ].forEach(function (pair) {
      var wrap = el('div');
      wrap.appendChild(el('span', 'figure-label', pair[0]));
      wrap.appendChild(el('span', 'figure-value', pair[1]));
      figures.appendChild(wrap);
    });

    var verdictWrap = el('div');
    verdictWrap.appendChild(el('span', 'figure-label', 'Result'));
    var badge = el('span', 'verdict ' + (passes ? 'pass' : 'fail'), passes ? 'Passed' : 'Failed');
    verdictWrap.appendChild(badge);
    figures.appendChild(verdictWrap);
  }

  // ---- comparison columns --------------------------------------------------

  function renderColumn(analysis, genreClass) {
    var src = analysis.source;
    var col = el('div', 'doc-column');

    col.appendChild(el('p', 'doc-genre ' + genreClass,
      src.type === 'opinion' ? 'Opinion page' : 'News desk'));
    col.appendChild(el('h3', 'doc-title', src.title));
    col.appendChild(el('p', 'doc-meta', src.author + ' · ' + src.outlet + ' · ' + src.date));

    var stats = el('div', 'doc-stats');
    var unattr = unattributedCount(analysis);
    [
      ['Words', String(src.wordCount)],
      ['Findings', String(analysis.persuasion.length)],
      ['In its own voice', String(unattr)],
      ['Per 100 words', density(analysis).toFixed(2)]
    ].forEach(function (pair) {
      var s = el('div');
      s.appendChild(el('span', 'figure-label', pair[0]));
      s.appendChild(el('span', 'figure-value', pair[1]));
      stats.appendChild(s);
    });
    col.appendChild(stats);

    var list = el('ul', 'finding-list');
    analysis.persuasion.forEach(function (f) {
      var li = el('li', 'finding' + (f.attributed ? ' is-attributed' : ''));

      var head = el('p', 'finding-technique');
      head.appendChild(document.createTextNode(f.technique.replace(/-/g, ' ')));
      head.appendChild(el('span', 'tag', f.confidence));
      if (f.attributed) head.appendChild(el('span', 'tag attributed', 'attributed'));
      li.appendChild(head);

      li.appendChild(el('p', 'finding-span', '“' + f.span + '”'));
      li.appendChild(el('p', 'finding-mechanism', f.mechanism));

      if (!f.attributed) {
        var neutral = el('p', 'finding-neutral');
        neutral.appendChild(el('strong', null, 'Without the technique: '));
        neutral.appendChild(document.createTextNode(f.neutral));
        li.appendChild(neutral);
      }

      list.appendChild(li);
    });
    col.appendChild(list);

    return col;
  }

  // ---- paste-to-highlight --------------------------------------------------

  function currentFindings() {
    var key = document.getElementById('analysis-select').value;
    var a = loaded[key];
    return a ? a.persuasion : [];
  }

  function highlight() {
    var raw = document.getElementById('article-input').value;
    var out = document.getElementById('highlighted');
    var report = document.getElementById('match-report');
    out.textContent = '';
    report.textContent = '';

    if (!raw.trim()) return;

    var usingSample = normalise(raw).indexOf(normalise(SAMPLE)) !== -1 &&
      raw.trim().length < SAMPLE.length + 40;
    var findings = usingSample ? SAMPLE_FINDINGS : currentFindings();

    var text = normalise(raw);
    var hits = [];
    var missed = [];

    findings.forEach(function (f) {
      var span = normalise(f.span);
      var at = text.indexOf(span);
      if (at === -1) { missed.push(f); return; }
      hits.push({ start: at, end: at + span.length, finding: f });
    });

    // Sort by position and drop any that overlap an earlier hit, so the
    // rebuild below can walk the text once.
    hits.sort(function (a, b) { return a.start - b.start; });
    var placed = [];
    hits.forEach(function (h) {
      if (!placed.length || h.start >= placed[placed.length - 1].end) placed.push(h);
    });

    var cursor = 0;
    placed.forEach(function (h) {
      if (h.start > cursor) {
        out.appendChild(document.createTextNode(raw.slice(cursor, h.start)));
      }
      var mark = document.createElement('mark');
      if (h.finding.attributed) mark.className = 'attributed';
      mark.textContent = raw.slice(h.start, h.end);
      mark.title = h.finding.technique.replace(/-/g, ' ') +
        (h.finding.attributed ? ' (attributed to a source)' : '');
      out.appendChild(mark);
      cursor = h.end;
    });
    if (cursor < raw.length) out.appendChild(document.createTextNode(raw.slice(cursor)));

    // Report misses loudly. Silent failure would hide exactly the defect the
    // verbatim rule exists to catch.
    if (!missed.length) {
      report.className = 'match-report ok';
      report.textContent = 'All ' + placed.length + ' findings located in this text.';
    } else {
      report.className = 'match-report warn';
      report.appendChild(document.createTextNode(
        placed.length + ' of ' + findings.length + ' findings located. These were not found — either this is a different article, or the text has been edited:'));
      var ul = el('ul');
      missed.forEach(function (f) {
        ul.appendChild(el('li', null, '“' + f.span + '”'));
      });
      report.appendChild(ul);
    }
  }

  // ---- boot ----------------------------------------------------------------

  function fail(message) {
    document.getElementById('ratio').textContent = '—';
    document.getElementById('ratio-caption').textContent = message;
  }

  Promise.all([
    fetch(SOURCES.opinion.file).then(function (r) { return r.json(); }),
    fetch(SOURCES.news.file).then(function (r) { return r.json(); })
  ]).then(function (results) {
    loaded.opinion = results[0];
    loaded.news = results[1];

    renderBanner(loaded.opinion, loaded.news);

    var comparison = document.getElementById('comparison');
    comparison.appendChild(renderColumn(loaded.opinion, SOURCES.opinion.genreClass));
    comparison.appendChild(renderColumn(loaded.news, SOURCES.news.genreClass));
  }).catch(function () {
    fail('Could not load the analysis files. If you are opening this page directly from disk, run a local server instead — browsers block file reads from file:// URLs.');
  });

  document.getElementById('article-input').addEventListener('input', highlight);
  document.getElementById('analysis-select').addEventListener('change', highlight);

  document.getElementById('sample-btn').addEventListener('click', function () {
    document.getElementById('article-input').value = SAMPLE;
    highlight();
  });

  document.getElementById('clear-btn').addEventListener('click', function () {
    document.getElementById('article-input').value = '';
    highlight();
  });
})();
