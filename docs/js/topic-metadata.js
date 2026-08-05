document.addEventListener('DOMContentLoaded', async () => {
  const sessionId = document.body.dataset.sessionId;
  const day = document.body.dataset.day;
  if (!sessionId) return;

  const response = await fetch('/data/schedule.json');
  const data = await response.json();
  const dayData = data.days.find((d) => String(d.day) === String(day));
  if (!dayData) return;

  const sessions = dayData.sessions.filter((s) => s.url);
  const index = sessions.findIndex((s) => s.id === sessionId);
  if (index === -1) return;
  const session = sessions[index];

  const timeEl = document.getElementById('topic-time');
  const durationEl = document.getElementById('topic-duration');
  const typeEl = document.getElementById('topic-type');
  if (timeEl) timeEl.textContent = session.time;
  if (durationEl) durationEl.textContent = session.duration;
  if (typeEl) typeEl.textContent = session.type;

  const prevLink = document.getElementById('prev-link');
  const nextLink = document.getElementById('next-link');

  if (prevLink) {
    if (index > 0) {
      prevLink.href = sessions[index - 1].url;
      prevLink.textContent = `← ${sessions[index - 1].title}`;
    } else {
      prevLink.style.visibility = 'hidden';
    }
  }

  if (nextLink) {
    if (index < sessions.length - 1) {
      nextLink.href = sessions[index + 1].url;
      nextLink.textContent = `${sessions[index + 1].title} →`;
    } else {
      nextLink.style.visibility = 'hidden';
    }
  }
});
