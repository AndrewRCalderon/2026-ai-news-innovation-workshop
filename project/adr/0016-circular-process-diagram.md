# 0016: Circular process diagram component

- Status: Accepted
- Date: 2026-08-06

## Context

Topic 5's "The Design Process Is Circular" section described a 7-step
iterative design cycle but rendered it with `.history` — the same linear,
vertical-line component used for chronological timelines elsewhere on the
site (Topic 1's history of AI, Explore Tech Stack's roadmap). The user
asked for the diagram to actually be circular, not just described as
circular while rendering as a straight list.

## Decision

Added `.process-wheel`, a new opt-in variant of the same `<li><span
class="era">…</span><h3>…</h3><p>…</p></li>` markup `.history` already
uses — same content shape, different layout, so no change to `.history`
itself (still used elsewhere) and no new markup vocabulary for authors.

- **Desktop**: the classic CSS "rotate → translate → counter-rotate"
  technique. Seven explicit `:nth-child` rules place each item at an
  equal angle (360°/7 ≈ 51.43° apart) around a ring; the counter-rotation
  keeps each item's text upright rather than rotated. A dashed circular
  `::before` reinforces the loop visually.
- **Mobile** (`max-width: 720px`): falls back to a plain stacked list
  (`position: static`, transforms cleared) with a left border replacing
  the ring — a literal geometric circle doesn't reflow to narrow
  viewports without becoming unreadable, so this is a deliberate,
  content-preserving fallback rather than an attempt to keep the shape.
- **Verified visually with Playwright** before considering it done (a
  screenshot check plus a programmatic pairwise bounding-box overlap
  test across all 7 items) — this is a geometry-dependent layout where
  "looks right in the CSS" and "actually renders right" can diverge, the
  same category of risk as the infinite-scroll and roster-row bugs
  earlier this session. Checked both the Overview page and the Slides
  deck (which has less vertical room per panel) at multiple viewport
  sizes; no overlaps, no clipping, fits without scrolling in the deck.

## Consequences

- Any future circular/cyclical process on the site can reuse
  `.process-wheel` directly — but the seven `:nth-child` rules are
  hardcoded for exactly 7 items. A future diagram with a different item
  count would need its own set of angle rules (360° / N), not a drop-in
  reuse.
- The ring's fixed pixel radius (230px) and container size (min(560px,
  92vw)) were tuned for this specific set of short titles/descriptions;
  meaningfully longer text per item would need the radius increased or
  font size reduced to avoid crowding.
