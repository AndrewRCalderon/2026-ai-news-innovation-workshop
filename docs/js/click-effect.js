document.addEventListener('click', function (event) {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var burst = document.createElement('div');
  burst.setAttribute('aria-hidden', 'true');
  burst.style.cssText =
    'position:fixed; left:' + event.clientX + 'px; top:' + event.clientY + 'px; ' +
    'pointer-events:none; z-index:9999; transform:translate(-50%, -50%); opacity:1;';

  var robot = document.createElement('span');
  robot.textContent = '\u{1F916}';
  robot.style.cssText = 'position:absolute; right:0.15em; top:0; font-size:1.1rem;';

  var brain = document.createElement('span');
  brain.textContent = '\u{1F9E0}';
  brain.style.cssText = 'position:absolute; left:0.15em; top:0; font-size:1.1rem;';

  burst.appendChild(robot);
  burst.appendChild(brain);
  document.body.appendChild(burst);

  if (reduceMotion) {
    setTimeout(function () { burst.remove(); }, 350);
    return;
  }

  burst.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  requestAnimationFrame(function () {
    burst.style.opacity = '0';
    burst.style.transform = 'translate(-50%, -50%) translateY(-24px)';
  });

  setTimeout(function () { burst.remove(); }, 650);
});
