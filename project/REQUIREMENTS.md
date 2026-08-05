# Requirements & Task Log

**Current focus (2026-08-04):** paused backend work (Phase 2, and the
remaining Vercel-connection item in Phase 1) to prioritize frontend/content —
need the site visibly clickable and ready for content to be added. Backend
items below are fully scoped and not forgotten; resume after the content
pass. Do not build anything that calls the Claude API from a page until
Phase 2 (the proxy) is actually done — see
[ADR 0007](adr/0007-serverless-claude-proxy.md).

Source of truth for build progress on this repo. Check here before starting
work; update here when a task starts/completes, or when new work is
discovered that wasn't in the original scope. Architecture *decisions* (the
"why") live in [`project/adr/`](adr/) — this file tracks the "what" and
"is it done."

Status legend: `[ ]` not started · `[~]` in progress · `[x]` done

---

## Phase 1 — Foundation

- [x] Repo scaffold: `docs/` directory structure created
- [x] `docs/partials/nav.html`, `docs/partials/footer.html`
- [x] `docs/js/partials.js` loader script
- [x] `docs/css/style.css` (base reset, watercolor palette variables)
- [x] `docs/index.html`, `docs/setup.html`, `docs/resources.html` skeletons
- [x] `vercel.json` + `package.json` deploy config
- [ ] Connect repo to Vercel and confirm live URL (requires account access —
      maintainer action, not something done from this session)
- [ ] Confirm a PR produces an automatic Vercel preview deployment

## Phase 2 — Proxy & rate limiting

- [ ] `api/claude-proxy.ts` serverless function
- [ ] Upstash Redis project created; rate limiting wired via `@upstash/ratelimit`
- [ ] Env vars configured in Vercel (`ANTHROPIC_API_KEY`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`)
- [ ] `max_tokens` cap + pinned cheaper model for public-proxy traffic
- [ ] Verify: request past rate limit returns a graceful error, not a pass-through to Anthropic

## Phase 3 — Content structure

- [x] `docs/data/schedule.json` authored (single source of truth for session times/types/titles) — **placeholder times, confirm real schedule before workshop**
- [x] `docs/css/timeline.css`, `docs/js/timeline.js`
- [x] `docs/js/topic-metadata.js` — populates each topic page's time/duration/type badges and prev/next links from `schedule.json`
- [x] Day 1/2/3 `index.html` (timeline view, driven by `schedule.json`) — pattern works for all three; Day 2/3 are stubs with a working timeline but no learning-outcomes copy yet
- [~] Topic page template + 22 topic pages — **8/22 scaffolded (Day 1 complete, now 8 topics — see below)**; of those, **6/8 have real content** (`01-state-of-ai`, `02-industry-conversation`, `03-use-cases`, `04-people-to-follow`, `05-project-ideation`, `07-ai-tools`, all using the briefing-overview template — see below); `06-problem-statement-discussion` and `08-project-assignments` still placeholder. Day 2 (8) and Day 3 (6) not yet built, so their timeline links currently 404
- [x] Briefing template, Overview page (`docs/css/briefing.css` Overview rules, `docs/js/reveal.js`) — normal scrolling page, shared nav/footer restored, reuses `topic-metadata.js`. See [ADR 0011](adr/0011-split-overview-and-slides.md) (supersedes [0010](adr/0010-briefing-template.md)'s toggle).
- [x] Briefing template, Slides page (`docs/css/briefing.css` deck rules, `docs/js/deck.js`) — paginated-only, self-contained chrome linking back to its Overview page, no schedule.json fetch. **6/6 content-complete topics now have a Slides companion** (Topics 1–5, 7).
- [ ] Slides system for the *generic* template (`docs/css/slides.css`, `docs/js/slides.js`) — the original Part 6b plan; **not needed for briefing-template pages**, which get their slides via the deck pattern above instead. Only relevant if a generic-template page ever wants slides.
- [~] Responsive layout — handled via media queries inside `style.css`/`timeline.css`/`briefing.css` rather than a separate `responsive.css` file (simpler given how little CSS exists so far); revisit splitting it out if it gets unwieldy

## Phase 4 — Student showcase

- [ ] `docs/students/index.html` hub page
- [ ] Student portfolio page template
- [ ] Extended `README.md` submission template (adds title/pitch + demo path fields)
- [ ] `.github/pull_request_template.md`
- [ ] `SUBMISSION_GUIDE.md`

## Phase 5 — Content fill

- [~] Real content written for each of the 22 topic pages — **6/22 done** (Day 1 topics 1–5, 7; missing 6 and 8)
- [ ] Slides populated per topic
- [ ] `STUDENT_CLAUDE_GUIDE.md` written (day-specific guidance students paste into their own Claude sessions — see ADR 0009 for why this isn't named `CLAUDE.md`)
- [ ] `resources.html` populated with real links
- [ ] Sample/placeholder student portfolio pages created for 2-3 students to validate the template

---

## Newly identified tasks

Tasks discovered during build that weren't in the original plan. Add here as
found; promote into a phase above once scoped, or leave here if it doesn't
map cleanly to one.

- [ ] `docs/setup.html` currently references `STUDENT_CLAUDE_GUIDE.md` as
      plain text (not a working link) because it lives outside the `docs/`
      deploy root and the GitHub org/repo URL isn't finalized yet. Once the
      repo is created on GitHub, replace with a direct link to the
      GitHub-hosted file.
- [ ] Decide which remaining topic pages should use the new briefing template
      (rich, structured content) vs. stay on the generic topic-header/sidebar
      template — currently only `day-1/01-state-of-ai.html` uses briefing;
      the other 5 built Day 1 pages are still on the generic template with
      placeholder content. See [ADR 0011](adr/0011-split-overview-and-slides.md).
- [x] Resolved: user wants a Slides companion for every topic that has real
      content — 4/4 built so far (Topics 1–4). Keep building one alongside
      each new Overview page going forward rather than deciding per-topic.
- [ ] Slides pages hardcode their cover-meta (time/duration/type) as static
      text instead of reading `schedule.json` like Overview pages do
      (`topic-metadata.js`) — a deliberate simplification in
      [ADR 0011](adr/0011-split-overview-and-slides.md) since deck.js has no
      fetch. Real cost: caught once already — Topic 1's slides page still
      said "45 MIN" after the schedule retiming moved it to 15 min, and had
      to be fixed by hand. Worth reconsidering if this happens again as more
      slides pages accumulate; the fix would be a small schedule-fetch added
      to `deck.js` for just the cover-meta fields.
- [ ] "After class: end-of-day resources email (including recommended
      newsletters)" is real Day 1 content but isn't an in-class scheduled
      session, so it isn't in `schedule.json`. Currently just a static note
      on `day-1/index.html`. The actual newsletter list it should send
      belongs in `resources.html`'s Day 1 section once that's populated
      (Phase 5) — right now that section is still a TODO placeholder.

---

## Change log

- 2026-08-04 — Requirements log created from the approved build plan. Phase 1
  scaffold (structure, partials, base CSS, page skeletons, deploy config)
  completed in the same session.
- 2026-08-04 — Shifted focus to frontend/content per instruction; paused
  Phase 2 (backend proxy) and the remaining Vercel-connection item. Built
  `schedule.json`, the timeline system, and all 6 Day 1 topic pages plus
  stub Day 2/3 index pages. Verified locally with a static file server —
  all key routes return 200.
- 2026-08-04 — User supplied real content for Day 1/Topic 1 ("State of AI").
  Designed a distinct template for content-rich topic pages via Artifact
  prototypes (long-form scroll → paginated deck → combined with a mode
  toggle), approved by the user, then shipped it as `docs/css/briefing.css` +
  `docs/js/briefing.js` and wired into `day-1/01-state-of-ai.html` with the
  real content. See [ADR 0010](adr/0010-briefing-template.md) for the
  self-contained-nav tradeoff this required.
- 2026-08-04 — User asked to bring back the original scrolling design as the
  landing page and move the deck to a linked "Slides" subsection instead of
  a runtime toggle. Split into `day-1/01-state-of-ai.html` (Overview, shared
  nav restored, reuses `topic-metadata.js`) and
  `day-1/slides/01-state-of-ai-slides.html` (Slides, paginated deck only).
  Deleted `briefing.js`; added `docs/js/deck.js` and `docs/js/reveal.js`;
  simplified `briefing.css` accordingly. See
  [ADR 0011](adr/0011-split-overview-and-slides.md).
- 2026-08-04 — User supplied the real Day 1 schedule; it revealed the
  existing `schedule.json` was missing the project-ideation cluster (group
  conversation, problem statement/hypothesis/goal, a nudge/reminder) and had
  "AI Tools" undersized (45 min instead of the actual 2 hours). Corrected
  `schedule.json`: moved Project Ideation before lunch, added a new
  post-lunch "Problem Statement Discussion" and "Project Assignments"
  session (1hr, workshop-buddy pairs), added a non-linked "Nudge & Check-in"
  checkpoint (same pattern as Break/Lunch — `url: null`), and fixed AI Tools
  to 120 min. Renumbered `06-ai-tools.html` → `07-ai-tools.html` to keep
  filenames in chronological order; added placeholder pages
  `06-problem-statement-discussion.html` and `08-project-assignments.html`;
  updated `nav.html`'s Day 1 dropdown to match. Day 1 is now 8 linked topics
  (was 6) — total topic-page count across the site is 22 (was 20).
- 2026-08-04 — Retimed the Day 1 morning block per user direction: State of
  AI (15 min), Industry Conversation (30 min), Use Cases (30 min), People to
  Follow (15 min unchanged), two 15-min breaks, and Project Ideation
  expanding to fill the rest of the 9:00 AM–1:00 PM block (now 120 min,
  intentionally long for now per the user — "that's ok for now"). Lunch
  shifts to 1:00–2:00 PM, cascading the whole afternoon ~15 min later
  (Problem Statement Discussion 2:00 PM → Nudge & Check-in 5:30 PM). Worked
  out interactively with the user before writing to `schedule.json`.
- 2026-08-04 — User supplied real content for Day 1 Topics 2–4 (Industry
  Conversation, Use Cases, People to Follow) and built them on the same
  briefing-overview template as Topic 1 — no new CSS/JS needed, the existing
  component vocabulary (roster, compare-grid, field-notes, stakes,
  pull-question) covered all three. Also: Industry
  Conversation's type corrected `discussion` → `lecture`; "Problem Statement
  Discussion" renamed to "Problem Statement" (the type badge already says
  "discussion," redundant in the title); Day 1's headline changed to "Day 1:
  State of the Art & Experimentation" (`schedule.json` + `day-1/index.html`).
- 2026-08-04 — Added Slides companions for Topics 2–4
  (`day-1/slides/02-industry-conversation-slides.html`,
  `03-use-cases-slides.html`, `04-people-to-follow-slides.html`) plus the
  "Open the slides →" CTA on their Overview pages, matching Topic 1's
  pattern exactly — no new CSS/JS. Decided every content-complete topic gets
  a Slides page going forward, not a per-topic call. Caught and fixed a
  staleness bug this surfaced: Topic 1's slides page still showed the old
  "45 MIN" after the schedule retiming; see the new task above about
  `deck.js`'s static cover-meta.
- 2026-08-04 — User supplied real content for Day 1 Topics 5 (Project
  Ideation) and 7 (AI Tools) — the two densest topics so far. Both built as
  Overview + Slides pairs on the existing template with no new components:
  reused `.history` (originally built for chronological timelines) for two
  sequential-steps diagrams — the circular design process and the
  build/test/ship workflow — since a numbered step sequence is the same
  shape as a timeline. Reused `.exercise-box` (from the old generic
  template, defined in `style.css`) for the Project Ideation workshop
  activity, since briefing pages already load `style.css` first. AI Tools'
  tool-landscape section links tool names to their real URLs from the
  source doc. Day 1 is now 6/8 topics with real content; only Problem
  Statement and Project Assignments remain placeholders.
