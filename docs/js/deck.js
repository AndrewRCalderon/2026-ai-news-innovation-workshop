/* Pagination for "Slides" deck pages: click/keyboard/dot-nav to page
   section-to-section. No reading-mode toggle and no schedule.json fetch —
   see project/adr/0011-split-overview-and-slides.md. */
(function () {
  var track = document.getElementById('track');
  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  var dotsContainer = document.getElementById('dots');
  var counterEl = document.getElementById('counter');
  var prevBtn = document.getElementById('prev-btn');
  var nextBtn = document.getElementById('next-btn');
  var fsBtn = document.getElementById('fs-toggle');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var total = slides.length;
  var index = 0;

  if (reduceMotion) { track.classList.add('no-transition'); }

  slides.forEach(function (slide, i) {
    var dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'dot';
    dot.setAttribute('aria-label', 'Go to panel ' + (i + 1) + ' of ' + total);
    dot.addEventListener('click', function () { goTo(i); });
    dotsContainer.appendChild(dot);
  });
  var dots = Array.prototype.slice.call(dotsContainer.children);

  function pad(n) { return String(n).length < 2 ? '0' + n : String(n); }

  function render() {
    track.style.transform = 'translateX(-' + (index * 100) + 'vw)';
    slides.forEach(function (slide, i) {
      var active = i === index;
      slide.setAttribute('aria-hidden', active ? 'false' : 'true');
      slide.style.pointerEvents = active ? 'auto' : 'none';
      if (active) { slide.scrollTop = 0; }
    });
    dots.forEach(function (dot, i) { dot.classList.toggle('is-active', i === index); });
    counterEl.textContent = pad(index + 1) + ' / ' + pad(total);
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === total - 1;
  }

  function goTo(i) { index = Math.max(0, Math.min(total - 1, i)); render(); }
  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); next(); }
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); prev(); }
    else if (e.key === 'Home') { e.preventDefault(); goTo(0); }
    else if (e.key === 'End') { e.preventDefault(); goTo(total - 1); }
  });

  document.querySelectorAll('[data-jump]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      var target = el.getAttribute('data-jump');
      var i = slides.findIndex(function (s) { return s.getAttribute('data-slide') === target; });
      if (i > -1) { goTo(i); }
    });
  });

  fsBtn.addEventListener('click', function () {
    var stage = document.querySelector('.stage');
    if (!document.fullscreenElement) {
      (stage.requestFullscreen || stage.webkitRequestFullscreen || function () {}).call(stage);
    } else {
      (document.exitFullscreen || document.webkitExitFullscreen || function () {}).call(document);
    }
  });

  render();
})();
