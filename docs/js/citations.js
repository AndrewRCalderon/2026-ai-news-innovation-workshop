// Inline citations for briefing-template pages. See project/adr/0012.
// Turns <sup class="cite" data-url="..." data-note="...">...</sup> into a
// numbered marker; the popover itself is shown on hover/focus via CSS.
(function () {
  function sourceLabel(url) {
    try {
      return new URL(url).hostname.replace(/^www\./, '');
    } catch (e) {
      return 'Source';
    }
  }

  function init() {
    document.querySelectorAll('.cite').forEach(function (cite, i) {
      var note = cite.getAttribute('data-note') || '';
      var url = cite.getAttribute('data-url');

      cite.textContent = String(i + 1);
      cite.setAttribute('tabindex', '0');
      cite.setAttribute('aria-label', 'Source ' + (i + 1) + ': ' + note);

      var pop = document.createElement('span');
      pop.className = 'cite-pop';
      var text = document.createElement('span');
      text.textContent = note;
      pop.appendChild(text);
      if (url) {
        var link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = sourceLabel(url) + ' ↗';
        pop.appendChild(document.createElement('br'));
        pop.appendChild(link);
      }
      cite.appendChild(pop);

      cite.addEventListener('click', function (e) {
        if (e.target.closest('a')) return; // let the Source link handle its own click
        if (url) window.open(url, '_blank', 'noopener,noreferrer');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
