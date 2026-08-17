// Click-to-open file viewer for briefing-template pages. Turns a
// [data-file-viewer="id"] trigger button into an opener for the matching
// <dialog class="file-viewer" id="id">. See project/adr/0019.
(function () {
  function init() {
    document.querySelectorAll('[data-file-viewer]').forEach(function (trigger) {
      var dialog = document.getElementById(trigger.getAttribute('data-file-viewer'));
      if (!dialog || typeof dialog.showModal !== 'function') return;

      trigger.addEventListener('click', function () {
        dialog.showModal();
      });

      dialog.querySelectorAll('[data-file-viewer-close]').forEach(function (closeBtn) {
        closeBtn.addEventListener('click', function () {
          dialog.close();
        });
      });

      dialog.addEventListener('click', function (e) {
        if (e.target === dialog) dialog.close(); // click on backdrop
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
