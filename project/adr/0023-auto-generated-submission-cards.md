# 0023: Student submission cards render client-side, pulled live from `main`

- Status: Accepted
- Date: 2026-08-21
- Supersedes: [0008](0008-readme-driven-portfolio-data.md) /
  [0022](0022-continuous-student-folder.md) (the hand-built-rendering
  portion only — their data-source decision, `SUBMISSION.md` as the
  source of truth, is unchanged and reaffirmed)

## Context

ADR 0008 (carried forward by 0022) decided student portfolio pages would
be hand-built by the maintainer, reading each student's `SUBMISSION.md`
directly, specifically because the cohort is small (5-7 students) and
auto-generation wasn't worth the build cost at that scale.

The user wants cards to auto-generate instead, reflecting the current
state of `main` without a manual step per student. Two constraints shape
how: the site has no backend (Phase 2, the serverless proxy, is still
paused — see [0007](0007-serverless-claude-proxy.md)) and no build step
(`vercel.json` serves `docs/` as-is; `package.json` has no scripts). A
manifest-file-plus-CI approach was considered and rejected for the same
reason Phase 2 stays paused: it adds infrastructure this project doesn't
otherwise need.

## Decision

Render cards entirely client-side on `docs/students/index.html`:

1. Discover student folders via GitHub's public REST API:
   `api.github.com/repos/AndrewRCalderon/2026-ai-news-innovation-workshop/contents/docs/submissions?ref=main`.
2. Fetch each folder's `SUBMISSION.md` as raw text from
   `raw.githubusercontent.com`.
3. Parse the `- **Field:** value` lines into a card, matched by field
   label rather than line position.

No manifest file, no CI step, no backend — the same "fetch and render, no
dependencies" pattern already proven by `docs/js/project-ideas.js`
([0017](0017-project-ideas-google-form.md)), pointed at the repo itself
instead of a published Google Sheet CSV.

`SUBMISSION.md` stays the single source of truth for the field data
(0008/0022's decision, unchanged). What changes is only how that data
becomes a rendered card: a maintainer transcribing it by hand, versus a
script reading it directly. A separate, full per-student portfolio page
(distinct from the card, part of the original Phase 4 scope) stays
explicitly out of scope for this pass — the card is the display unit for
now, linking out to each student's fork via the existing Fork URL field
for anyone wanting more.

## Consequences

- **Coupling to the field set.** `SUBMISSION.md`'s fields are still
  provisional (flagged in `project/REQUIREMENTS.md`, "wanting to be seen
  in real use before finalizing"). A field *rename* breaks parsing for
  that field until `docs/js/submissions-gallery.js` is updated to match —
  mitigated by matching on label text rather than position, and failing
  per-field (a missing/renamed field shows a "not yet filled in" note
  rather than breaking the whole card), but the coupling itself is real,
  not eliminated. Hand-built pages didn't have this cost; this is the
  actual price of automating now instead of after the field set settles.
- **Rate limits.** Unauthenticated GitHub API calls are capped at 60/hr
  per IP. Acceptable at the confirmed cohort scale (5-7 students,
  classroom-showcase traffic) and deliberately not engineered around
  further — no caching layer, no fallback manifest — for the same reason
  a CSV-export feature and a custom backend were both rejected elsewhere
  in this project at this scale.
- **Availability dependency.** Cards go blank or show an error state if
  the repo goes private or GitHub's API is unreachable. Acceptable for a
  workshop showcase; would not be for production infrastructure.
- `docs/students/index.html`'s TODO stub and the "student portfolio page
  template" Phase 4 line are updated to reflect what actually shipped:
  hub page + card renderer built, a separate full-page-per-student
  template explicitly deferred.
