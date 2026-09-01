// Renders student submission cards, read live from this repo's own
// docs/submissions/ folder on GitHub — no backend, no build step, no
// manifest file. See project/adr/0023-auto-generated-submission-cards.md.
//
// Discovery: GitHub's public Contents API lists the folders currently in
// docs/submissions/ on the given ref. Per-student data: each folder's
// SUBMISSION.md, fetched raw and parsed client-side.
//
// Override the ref via ?ref=your-branch in the URL for local testing
// before a branch merges to main (the API only reflects the ref you ask
// for, and raw.githubusercontent.com works the same way).
(function () {
  var REPO = 'AndrewRCalderon/2026-ai-news-innovation-workshop';
  var REF = new URLSearchParams(window.location.search).get('ref') || 'main';
  var CONTENTS_URL = 'https://api.github.com/repos/' + REPO + '/contents/docs/submissions?ref=' + encodeURIComponent(REF);
  var RAW_BASE = 'https://raw.githubusercontent.com/' + REPO + '/' + REF + '/docs/submissions/';

  var FIELDS = [
    { key: 'Hypothesis or problem statement', label: 'The problem' },
    { key: "What you're building", label: 'Building' },
    { key: 'Solution', label: 'Solution' }
  ];

  function parseSubmission(text) {
    var noComments = text.replace(/<!--[\s\S]*?-->/g, '');
    var fields = {};
    var lineRe = /^-\s*\*\*(.+?):\*\*\s*(.*)$/;
    noComments.split('\n').forEach(function (line) {
      var m = line.match(lineRe);
      if (!m) return;
      var label = m[1].trim();
      var raw = m[2].trim();
      // Strip wrapping markdown emphasis/backticks left over from the
      // template's inline "*e.g. ...*" example text.
      var cleaned = raw.replace(/^\*+|\*+$/g, '').replace(/^`+|`+$/g, '').trim();
      var isPlaceholder = cleaned === '' || /^e\.g\.?\s/i.test(cleaned);
      fields[label] = isPlaceholder ? null : cleaned;
    });
    return fields;
  }

  function fieldOrPlaceholder(value) {
    return value || 'Not yet filled in.';
  }

  function buildCard(folderName, fields) {
    var card = document.createElement('div');
    card.className = 'submission-card';

    var name = document.createElement('h3');
    name.textContent = fields['Student Name'] || folderName;
    card.appendChild(name);

    FIELDS.forEach(function (f) {
      var p = document.createElement('p');
      var label = document.createElement('strong');
      label.textContent = f.label + ': ';
      p.appendChild(label);
      p.appendChild(document.createTextNode(fieldOrPlaceholder(fields[f.key])));
      card.appendChild(p);
    });

    var LINKS = [
      { key: 'Project Repo', text: "View " + (fields['Student Name'] || 'this') + "'s project repo →" },
      { key: 'Fork URL', text: "View " + (fields['Student Name'] || 'this') + "'s fork →" }
    ];
    LINKS.forEach(function (l) {
      if (fields[l.key]) {
        var link = document.createElement('a');
        link.href = fields[l.key];
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = l.text;
        card.appendChild(link);
      }
    });

    return card;
  }

  function render(container, students) {
    if (students.length === 0) {
      container.innerHTML = '<p class="aside">No submissions yet — check back once people start forking and building.</p>';
      return;
    }
    students.sort(function (a, b) {
      var nameA = a.fields['Student Name'] || a.folderName;
      var nameB = b.fields['Student Name'] || b.folderName;
      return nameA.localeCompare(nameB);
    });
    var frag = document.createDocumentFragment();
    students.forEach(function (s) {
      frag.appendChild(buildCard(s.folderName, s.fields));
    });
    container.innerHTML = '';
    container.appendChild(frag);
  }

  function fetchFolderNames() {
    return fetch(CONTENTS_URL).then(function (res) {
      if (res.status === 404) return []; // docs/submissions/ doesn't exist yet — nobody has submitted
      if (!res.ok) throw new Error('contents API error ' + res.status);
      return res.json();
    }).then(function (entries) {
      return entries.filter(function (e) { return e.type === 'dir'; }).map(function (e) { return e.name; });
    });
  }

  function fetchStudent(folderName) {
    return fetch(RAW_BASE + folderName + '/SUBMISSION.md')
      .then(function (res) { return res.ok ? res.text() : null; })
      .then(function (text) {
        if (text === null) return null; // this folder has no SUBMISSION.md yet — skip it, don't break the rest
        return { folderName: folderName, fields: parseSubmission(text) };
      })
      .catch(function () { return null; });
  }

  function init() {
    var container = document.getElementById('submission-cards');
    if (!container) return;
    fetchFolderNames()
      .then(function (folderNames) {
        return Promise.all(folderNames.map(fetchStudent));
      })
      .then(function (students) {
        render(container, students.filter(function (s) { return s !== null; }));
      })
      .catch(function () {
        container.innerHTML = '<p class="aside">Couldn\'t load submissions right now.</p>';
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
