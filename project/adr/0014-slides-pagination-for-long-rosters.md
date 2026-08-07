# 0014: Split long Slides rosters into sub-slides instead of scrolling

- Status: Accepted — supersedes [0013](0013-infinite-scroll-roster.md)
- Date: 2026-08-06

## Context

[0013](0013-infinite-scroll-roster.md) built a progressive-reveal
("infinite scroll") component for Topic 3's two `.roster` tables, which
had grown to 9 and 11 items during the site review. It didn't work as
intended:

- The user tested it live (including in a private/incognito window,
  ruling out simple browser caching) and still saw every row displayed
  immediately with no scroll-triggered reveal.
- The likely cause, on reflection: `IntersectionObserver` fires
  immediately with the current intersection state as soon as
  `observe()` is called. On a tall enough viewport, the sentinel element
  is already inside the viewport (or within the `200px` `rootMargin`) the
  moment the page loads — so the "reveal on scroll" logic fires
  instantly, in a fast cascade, before the user scrolls at all. It looked
  like scrolling wasn't happening because, functionally, it wasn't needed
  to trigger the reveal.
- More importantly, the user clarified the actual motivation: this was
  never really about the Overview page (which scrolls fine as an
  ordinary web page regardless of table length) — it was about the
  Slides deck, where a single fixed-viewport slide panel containing 9–11
  rows would be uncomfortably long. Scroll-within-a-slide was one way to
  solve that, but the user was explicit that "scroll doesn't have to be
  our solution" once it didn't pan out.

## Decision

- **Overview page**: reverted to a plain `.roster` — no `is-infinite`
  class, no hiding logic. A normal page scrolling past 9–11 rows needs no
  special handling; the added complexity wasn't solving a real problem
  here.
- **Slides deck**: long rosters are split across multiple slides instead,
  using the deck's existing pagination (next/prev, dot-nav, keyboard) —
  the mechanism it already has for "there's more content than fits in
  one screen." Continuation slides:
  - Reuse the same `data-slide` prefix with a letter suffix (`s2`, `s2b`;
    `s3`, `s3b`, `s3c`), so they don't need new entries in the deck's
    section-number sequence.
  - Keep the same `block-eyebrow` number as their parent section (e.g.
    both `s2` and `s2b` show "02"), with `(cont.)` appended to the
    `<h2>` title, so they read as a continuation rather than a new
    numbered topic.
  - Are **not** added to the cover slide's `cover-contents` TOC — that
    list stays at the section level; reaching a continuation slide is
    just "keep going" via next/dot-nav, consistent with how the deck
    already works.
  - `deck.js` needed no changes: it computes `total`, the dot-nav, and
    the counter from `document.querySelectorAll('.slide').length` at
    runtime, so adding slides "just works."
- Deleted `docs/js/infinite-roster.js` and its CSS
  (`.roster.is-infinite`, `.roster-row[hidden]`, `.roster-sentinel`) —
  none of it shipped as a working feature, so nothing is superseded at
  the code level, just removed.

## Consequences

- Any future topic whose Slides content grows past a comfortable single
  screen should split the same way: same `data-slide` prefix + letter
  suffix, same eyebrow number, `(cont.)` in the title, no new TOC entry.
- This was caught and fixed the same day it shipped, but it's a reminder
  to verify interactive/visual behavior in an actual browser (or with
  the user directly) before considering it done — structural checks
  (curl, grep, HTML diffs) can't catch a CSS-cascade or
  IntersectionObserver timing bug like this one. See also the new
  `project/scripts/check-slide-parity.js` tool, added the same session,
  which at least catches *content* drift between Overview and Slides
  even though it can't catch rendering bugs like this one.
