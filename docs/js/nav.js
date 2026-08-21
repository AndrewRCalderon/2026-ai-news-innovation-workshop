document.addEventListener('partials:loaded', () => {
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // On a real mouse, moving the cursor onto a trigger to click it fires
  // mouseenter (which opens the menu via hover) immediately before the
  // click event — so a plain open/closed toggle on click sees "already
  // open" and instantly closes what hover just opened. On hover-capable
  // pointers, click is made idempotent-open instead of toggling; closing
  // stays hover/outside-click/Escape driven. Touch has no hover at all,
  // so click there still needs to fully toggle to be usable.
  const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const daysItem = links.querySelector('[data-dropdown]');
  const daysTrigger = links.querySelector('[data-dropdown-trigger]');
  const dayItems = links.querySelectorAll('[data-day-item]');

  const closeDays = () => {
    dayItems.forEach((item) => {
      item.classList.remove('is-open');
      item.querySelector('[data-day-trigger]').setAttribute('aria-expanded', 'false');
    });
  };

  const openDay = (item) => {
    closeDays();
    item.classList.add('is-open');
    item.querySelector('[data-day-trigger]').setAttribute('aria-expanded', 'true');
  };

  const closeDaysMenu = () => {
    daysItem.classList.remove('is-open');
    daysTrigger.setAttribute('aria-expanded', 'false');
    closeDays();
  };

  const openDaysMenu = () => {
    daysItem.classList.add('is-open');
    daysTrigger.setAttribute('aria-expanded', 'true');
  };

  daysTrigger.addEventListener('click', () => {
    if (supportsHover) {
      openDaysMenu();
    } else if (daysItem.classList.contains('is-open')) {
      closeDaysMenu();
    } else {
      openDaysMenu();
    }
  });

  daysItem.addEventListener('mouseenter', openDaysMenu);
  daysItem.addEventListener('mouseleave', closeDaysMenu);

  dayItems.forEach((item) => {
    const trigger = item.querySelector('[data-day-trigger]');

    trigger.addEventListener('click', () => {
      if (supportsHover) {
        openDay(item);
      } else if (item.classList.contains('is-open')) {
        closeDays();
      } else {
        openDay(item);
      }
    });

    item.addEventListener('mouseenter', () => openDay(item));
  });

  document.addEventListener('click', (event) => {
    if (!links.contains(event.target)) {
      closeDaysMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeDaysMenu();
  });

  activateCurrentNavLink(links);
});

function normalizeNavPath(path) {
  return path.replace(/index\.html$/, '') || '/';
}

function activateCurrentNavLink(links) {
  const current = normalizeNavPath(window.location.pathname);
  links.querySelectorAll('[data-nav-link]').forEach((link) => {
    const linkPath = normalizeNavPath(new URL(link.getAttribute('href'), window.location.origin).pathname);
    link.classList.toggle('is-active', linkPath === current);
  });
}
