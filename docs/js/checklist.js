document.addEventListener('DOMContentLoaded', () => {
  const boxes = Array.prototype.slice.call(document.querySelectorAll('.setup-check'));
  const counter = document.getElementById('setup-progress-count');
  if (!boxes.length || !counter) return;

  function update() {
    const done = boxes.filter((box) => box.checked).length;
    counter.textContent = done + ' of ' + boxes.length + ' steps checked off';
  }

  boxes.forEach((box) => box.addEventListener('change', update));
  update();
});
