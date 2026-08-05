document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('timeline');
  if (!container) return;

  const day = document.body.dataset.day;
  const response = await fetch('/data/schedule.json');
  const data = await response.json();
  const dayData = data.days.find((d) => String(d.day) === String(day));
  if (!dayData) return;

  container.innerHTML = dayData.sessions
    .map((session) => {
      const isBreak = !session.url;
      const summary = session.summary
        ? `<p class="timeline-summary">${session.summary}</p>`
        : '';

      if (isBreak) {
        return `
          <div class="timeline-item timeline-item-break">
            <span class="timeline-time">${session.time}</span>
            <div class="timeline-body">
              <span class="timeline-title">${session.title} (${session.duration})</span>
            </div>
          </div>`;
      }

      return `
        <a class="timeline-item timeline-item-${session.type}" href="${session.url}">
          <span class="timeline-time">${session.time}</span>
          <div class="timeline-body">
            <span class="timeline-title">${session.title}</span>
            <span class="timeline-type-badge">${session.type}</span>
            <span class="timeline-duration">${session.duration}</span>
            ${summary}
          </div>
        </a>`;
    })
    .join('');
});
