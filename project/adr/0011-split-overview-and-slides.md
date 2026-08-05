# 0011: Split the briefing template into separate Overview and Slides pages

- Status: Accepted — supersedes the toggle mechanism from [0010](0010-briefing-template.md)
- Date: 2026-08-04

## Context

[0010](0010-briefing-template.md) shipped a single page
(`day-1/01-state-of-ai.html`) containing both a long-form scrolling layout
and a paginated deck layout, switched at runtime by a Scroll/Paginated
toggle defaulting to paginated. After reviewing it live, the user asked to
go back to the original scrolling design as the primary landing page (the
first design explored, before the deck concept), with the deck moved to a
separate, linked "Slides" page — matching the original build plan's own
Part 6b structure (`day-N/topic.html` plus a `day-N/slides/` companion
file), rather than one page trying to be both.

This also resolves a real regression flagged when 0010 shipped: the
paginated deck's fixed/`overflow:hidden` layout couldn't accommodate the
site's standard nav bar, so 0010 dropped shared nav/footer from the page
entirely. Once Overview goes back to being a normal scrolling page, there's
no more conflict — the shared nav can return for Overview pages, and the
self-contained-chrome tradeoff from 0010 narrows to apply only to the
dedicated Slides pages.

## Decision

Each topic that gets this treatment is now two files:

- **Overview** — `day-N/NN-topic.html`. A normal page: shared
  `nav.html`/`footer.html` partials restored ([0005](0005-js-injected-partials.md)),
  standard `.breadcrumb`, and the existing generic-template script
  `topic-metadata.js` reused as-is (its `#topic-time`/`#topic-duration`/
  `#topic-type`/`#prev-link`/`#next-link` targets already matched what this
  page needed — no new metadata script required). Content sections keep the
  rich components from 0010 (comparisons, history timeline, stat pulls,
  etc.) inside `.block` elements, with a small `docs/js/reveal.js` added for
  the scroll-in fade (generic, reusable, not toggle-coupled).
- **Slides** — `day-N/slides/NN-topic-slides.html`. The paginated deck only,
  self-contained chrome (breadcrumb eyebrow linking back through Day N /
  Home / and directly back to the Overview page), no shared nav. Pagination
  logic moves to a new, smaller `docs/js/deck.js` — no mode-toggle, no
  schedule.json fetch. Its "prev/next" is just "back to Overview," not
  cross-topic sequencing; cross-topic prev/next stays the Overview page's
  job via `topic-metadata.js`.
- Overview links to its Slides page via a `.slides-cta` subsection (not a
  numbered part of the 01–05 sequence, since it's a format choice, not
  curriculum content).
- `docs/js/briefing.js` (the toggle-era combined script) is deleted.
  `docs/css/briefing.css` is simplified to drop `[data-mode]`-conditional
  rules and mode-toggle styles, and its fixed/hidden-viewport rules are
  scoped to a `.briefing-deck` class instead of a runtime attribute.

## Consequences

- Overview pages are fully navigable site pages again — the nav-loss
  flagged after 0010 is resolved for Overview; it still applies to Slides
  pages by design (a presentation surface, reached by an explicit choice
  from Overview).
- Content is now duplicated across two *files* per topic (Overview prose vs.
  Slides panels) instead of two trees within one file. This is the same
  duplication 0010 already accepted, just at the file level — and it matches
  the original plan's own topic-page + slides-page structure, so it's not a
  new cost, just a relocated one.
- Every future topic that wants a slides companion repeats this two-file
  pattern. Only Day 1/Topic 1 has both today; see `project/REQUIREMENTS.md`.
