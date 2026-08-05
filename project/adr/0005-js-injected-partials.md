# 0005: JS-injected partials for shared nav/footer

- Status: Accepted
- Date: 2026-08-04

## Context

The site is ~60 pages (topic pages, slides, day indexes), all sharing the
same nav bar, breadcrumb style, and footer. The stack is deliberately
static HTML/CSS/JS with no build tooling. Duplicating the nav markup in every
file means any nav change is a ~60-file edit; introducing a static site
generator would add build tooling the plan explicitly wanted to avoid.

## Decision

Each page includes empty placeholders (`<div id="nav"></div>`,
`<div id="footer"></div>`) and one shared script, `docs/js/partials.js`, that
fetches `docs/partials/nav.html` and `docs/partials/footer.html` and injects
them at page load.

## Consequences

- Nav/footer changes happen in one file each, not ~60.
- No build step introduced — still deploys as plain static files.
- Nav content isn't present in page source until JS runs (irrelevant here —
  this isn't a public SEO-optimized site).
- Every page must include the partials script and matching placeholder IDs;
  the topic-page and slide templates need to bake this in from the start
  (see `project/REQUIREMENTS.md` Phase 1/3).
