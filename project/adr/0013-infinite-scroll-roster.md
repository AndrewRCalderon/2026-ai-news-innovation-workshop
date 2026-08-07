# 0013: Progressive-reveal ("infinite scroll") for long roster tables

- Status: Superseded by [0014](0014-slides-pagination-for-long-rosters.md)
- Date: 2026-08-06

## Context

Topic 3's ("Use Cases") two `.roster` tables were deliberately expanded
during the site review — the user wants them "somewhat comprehensive,"
which after a research pass grew them from 5 items each to 9 (journalism)
and 11 (outside journalism). That's long for a page meant to be skimmed,
but the user explicitly didn't want these broken out into separate pages
(a standalone module was floated and rejected) or made downloadable
instead (a CSV export was built, then reverted once the table sizes were
this small in the first place — see `project/REQUIREMENTS.md`). The ask
that stuck: keep it as an "infinite scroll module," inline on the same
page, not linked out as its own destination.

## Decision

A small, dependency-free script (`docs/js/infinite-roster.js`) progressively
reveals `.roster` rows as the reader scrolls, rather than rendering all of
them at once:

- Markup: `<dl class="roster is-infinite">` — same roster markup as
  everywhere else on the site, opting in via one class. All rows stay in
  the DOM (nothing is server- or template-rendered specially), which
  keeps this consistent with every other hand-authored roster on the
  site and requires no data file.
- On load, everything past the first 4 rows gets a `hidden` attribute.
  Since the hiding only happens after this script runs, a no-JS/slow-JS
  visitor simply sees the full table immediately — progressive
  enhancement, not a requirement.
- A sentinel element is inserted after the roster; an `IntersectionObserver`
  watches it and reveals the next batch of 4 whenever it scrolls near the
  viewport, removing itself once nothing's left to reveal.
- Applied only to the Overview page's two use-case rosters, not their
  Slides-deck counterparts — the Slides deck deliberately stays condensed
  (5 items each, no new examples added there), consistent with how every
  other topic's Slides content has been a trimmed-down version of its
  Overview rather than a full mirror throughout this review.
- Discoverability: rather than these two tables living only inside the
  topic page, `resources.html`'s Day 1 section now links directly to them
  via the existing `#s2`/`#s3` section anchors — satisfying the "link to
  it from Resources" ask without creating a second page/URL for the same
  content.

## Consequences

- Any `.roster` on the site can opt into this by adding `is-infinite` —
  no new markup vocabulary, no per-table JS.
- Batch size (4) and reveal trigger (`rootMargin: '200px'`) are hardcoded
  constants in the script rather than configurable per table; fine for
  the two current use cases, revisit if a future roster wants different
  pacing.
- This makes the anchor-link pattern from `resources.html` slightly odd
  for a *new* visitor landing mid-page via `#s2`/`#s3` — they'll land on
  a table that's already showing only the first 4 rows (the same as
  anyone scrolling normally), which is expected but worth knowing if the
  reveal behavior is confusing on direct-link arrival. Not addressed
  specially; the sentinel still works normally once they start scrolling.
