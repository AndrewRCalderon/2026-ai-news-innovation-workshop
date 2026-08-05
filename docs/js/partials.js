async function loadPartial(targetId, path) {
  const target = document.getElementById(targetId);
  if (!target) return;
  const response = await fetch(path);
  target.innerHTML = await response.text();
}

Promise.all([
  loadPartial('nav', '/partials/nav.html'),
  loadPartial('footer', '/partials/footer.html'),
]).then(() => {
  document.dispatchEvent(new Event('partials:loaded'));
});
