// Filter-pill toggling for tables of typed rows. See project/adr (People
// to Follow unified table). Usage:
//   <div class="filter-pills" data-filters="#some-table tbody tr">
//     <button class="filter-pill is-active" data-type="all">All</button>
//     <button class="filter-pill" data-type="Foo">Foo</button>
//   </div>
//   <table id="some-table">...<tr data-type="Foo">...
(function () {
  function init() {
    document.querySelectorAll('.filter-pills').forEach(function (group) {
      var pills = Array.prototype.slice.call(group.querySelectorAll('.filter-pill'));
      var rows = document.querySelectorAll(group.getAttribute('data-filters'));

      function apply() {
        var active = pills
          .filter(function (p) { return p.dataset.type !== 'all' && p.classList.contains('is-active'); })
          .map(function (p) { return p.dataset.type; });
        rows.forEach(function (row) {
          row.hidden = active.length > 0 && active.indexOf(row.dataset.type) === -1;
        });
      }

      pills.forEach(function (pill) {
        pill.addEventListener('click', function () {
          if (pill.dataset.type === 'all') {
            pills.forEach(function (p) { p.classList.toggle('is-active', p === pill); });
          } else {
            pill.classList.toggle('is-active');
            var anyActive = pills.some(function (p) { return p.dataset.type !== 'all' && p.classList.contains('is-active'); });
            pills.forEach(function (p) { if (p.dataset.type === 'all') p.classList.toggle('is-active', !anyActive); });
          }
          apply();
        });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
