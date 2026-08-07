# 0017: Google Form + published-sheet CSV for problem-statement submissions

- Status: Accepted
- Date: 2026-08-06

## Context

The user wants students to submit their original project idea and their
reformulated problem statement (with their name) during Project Ideation,
then see everyone's submissions surfaced as cards for group discussion.
That's a real data-collection feature — but this site is fully static
(`docs/` deployed via Vercel, [ADR 0001](0001-deploy-via-vercel.md)), with
no database, and the project's one other planned backend piece (Phase 2,
the Claude proxy) has been explicitly paused since the project's
`project/REQUIREMENTS.md` was created. Building a custom serverless
form-to-database pipeline would mean starting real backend work earlier
than planned, for a single-workshop-cohort, low-stakes use case.

## Decision

Use Google Forms + a published Google Sheet as the entire "backend," with
a static page doing the display:

- **Collection**: a Google Form (name, original idea, reformulated
  problem statement) embedded via `<iframe>` in the Workshop Activity
  section of `day-1/05-project-ideation.html` (Overview only — not added
  to the Slides deck, since submitting a form isn't something that
  belongs in a presentation surface).
- **Storage**: the Form's linked Google Sheet, published to the web as
  CSV (Sheet → File → Share → Publish to web → CSV). This is a Google
  feature, not custom infrastructure — no API keys, no server code.
- **Display**: a new page, `day-1/project-ideas.html`, with a new
  dependency-free script (`docs/js/project-ideas.js`) that fetches the
  published CSV client-side, parses it (a small hand-written parser —
  quoted-field-aware, no library), and renders each row as a card
  (`.idea-cards`/`.idea-card`, new CSS). Column matching is by header
  keyword ("name," "idea," "problem"), not fixed position, so it
  tolerates minor rewording of the Form's questions.
- **Not built by Claude**: the actual Google Form and Sheet need a human
  with a Google account to create them — this ADR's code ships with two
  literal placeholder strings (`REPLACE_WITH_GOOGLE_FORM_EMBED_URL` in
  the Overview page's iframe, `REPLACE_WITH_PUBLISHED_CSV_URL` in
  `project-ideas.js`) and fails visibly/gracefully (a clear message, not
  a silent blank page) until both are filled in.

## Consequences

- Zero new hosting/infra risk: no database, no serverless function, no
  new paid service, nothing that touches the paused Phase 2 backend
  work. If this pattern needs to grow later (e.g., real-time
  moderation, richer fields), that's the point to reconsider a custom
  backend — not before.
- Submissions are only as private as "anyone with the Sheet's published
  CSV link" — acceptable for a single-cohort in-class activity, but this
  is not appropriate for anything more sensitive; worth remembering if
  this pattern gets reused elsewhere on the site.
- The CSV column-matching is keyword-based and English-only; a
  differently-worded or non-English form would need the keywords in
  `findCol()` adjusted.
- This whole feature does nothing until a human manually creates the
  Form/Sheet and swaps in the two real URLs — it's shipped as
  ready-to-wire-up, not as a finished, live feature.
