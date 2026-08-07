// Renders student problem-statement submissions as cards, read live from
// a Google Sheet published as CSV (Form -> Sheet -> Publish to web).
// No backend/database — see project/adr/0017-project-ideas-google-form.md.
//
// SETUP: replace CSV_URL below with your published-sheet CSV URL
// (Google Sheet > File > Share > Publish to web > select the responses
// sheet > CSV > Publish).
(function () {
  var CSV_URL = 'REPLACE_WITH_PUBLISHED_CSV_URL';

  function parseCSV(text) {
    var rows = [];
    var row = [];
    var field = '';
    var inQuotes = false;
    for (var i = 0; i < text.length; i++) {
      var c = text[i];
      if (inQuotes) {
        if (c === '"') {
          if (text[i + 1] === '"') { field += '"'; i++; }
          else { inQuotes = false; }
        } else {
          field += c;
        }
      } else if (c === '"') {
        inQuotes = true;
      } else if (c === ',') {
        row.push(field); field = '';
      } else if (c === '\n' || c === '\r') {
        if (c === '\r' && text[i + 1] === '\n') i++;
        row.push(field); field = '';
        rows.push(row); row = [];
      } else {
        field += c;
      }
    }
    if (field.length || row.length) { row.push(field); rows.push(row); }
    return rows.filter(function (r) { return r.length > 1 || r[0] !== ''; });
  }

  function findCol(headers, keyword) {
    for (var i = 0; i < headers.length; i++) {
      if (headers[i].toLowerCase().indexOf(keyword) !== -1) return i;
    }
    return -1;
  }

  function render(container, rows) {
    if (rows.length < 2) {
      container.innerHTML = '<p class="aside">No submissions yet — check back once people start filling out the form.</p>';
      return;
    }
    var headers = rows[0];
    var nameCol = findCol(headers, 'name');
    var ideaCol = findCol(headers, 'idea');
    var statementCol = findCol(headers, 'problem');

    var frag = document.createDocumentFragment();
    for (var i = rows.length - 1; i >= 1; i--) {
      var r = rows[i];
      if (nameCol === -1 || !r[nameCol]) continue;
      var card = document.createElement('div');
      card.className = 'idea-card';

      var name = document.createElement('h3');
      name.textContent = r[nameCol];
      card.appendChild(name);

      if (ideaCol !== -1 && r[ideaCol]) {
        var idea = document.createElement('p');
        var ideaLabel = document.createElement('strong');
        ideaLabel.textContent = 'Original idea: ';
        idea.appendChild(ideaLabel);
        idea.appendChild(document.createTextNode(r[ideaCol]));
        card.appendChild(idea);
      }

      if (statementCol !== -1 && r[statementCol]) {
        var stmt = document.createElement('p');
        var stmtLabel = document.createElement('strong');
        stmtLabel.textContent = 'Problem statement: ';
        stmt.appendChild(stmtLabel);
        stmt.appendChild(document.createTextNode(r[statementCol]));
        card.appendChild(stmt);
      }

      frag.appendChild(card);
    }
    container.innerHTML = '';
    container.appendChild(frag);
  }

  function init() {
    var container = document.getElementById('idea-cards');
    if (!container) return;
    if (CSV_URL.indexOf('REPLACE_WITH') === 0) {
      container.innerHTML = '<p class="aside">Submissions aren\'t connected yet — see project/adr/0017 for setup steps.</p>';
      return;
    }
    fetch(CSV_URL)
      .then(function (res) { return res.text(); })
      .then(function (text) { render(container, parseCSV(text)); })
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
