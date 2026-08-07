# 0012: Inline citation component for briefing-template pages

- Status: Accepted
- Date: 2026-08-06

## Context

During the full-scale site review, the user repeatedly asked (across three
separate review batches on Day 1/Topic 1 "State of AI") to be able to cite
sources for factual claims — stats, historical benchmarks, legal cases,
named examples — without bloating the prose. Their own description of the
desired UI was specific: "a superscript that is numbered that you can click
on and a small text box opens up with a link and more information." This
recurs often enough across both the Overview and Slides content (which
duplicate prose per [0011](0011-split-overview-and-slides.md)) that it
needs to be a shared, reusable template component rather than a one-off.

## Decision

Add a small inline-citation component to the shared briefing template:

- **Markup**: `<sup class="cite" data-url="..." data-note="...">*</sup>`
  placed directly after the cited text. Authors don't hand-number these —
  numbering is assigned automatically in document order by JS, the same
  reasoning as `topic-metadata.js` driving badges from `schedule.json`
  instead of hardcoding them: hand-numbered citations would drift out of
  sync the first time one gets added, removed, or reordered (this is the
  same class of staleness bug already caught once with Slides pages'
  hardcoded cover-meta — see `project/REQUIREMENTS.md`).
- **Behavior** (`docs/js/citations.js`, new, ~30 lines, no dependencies):
  on page load, finds all `.cite` elements, numbers them, and builds a
  popover (`.cite-pop`) containing the `data-note` text and a
  "Source ↗" link to `data-url` (link omitted if no URL). Reveal itself is
  pure CSS (`:hover`/`:focus-within`) — no click/toggle/outside-click JS,
  per the user's preference for a hover-driven interaction over a
  click-to-open one. The marker also carries a full `aria-label`
  (number + note text) so the content reaches screen readers independent
  of hover.
- **Styling** (`docs/css/briefing.css`): the marker itself renders as a
  small pill — site-orange text and border (`--accent-secondary-strong`,
  not the purple `--accent-primary` used elsewhere in the template) plus
  a small `▾` caret, so the affordance that it's interactive is visible
  before any hover, not only revealed once opened. The popover is
  positioned absolutely above the marker, sized to content up to a
  max-width, using the template's existing surface/border/ink tokens so
  it matches both light and dark mode automatically. `text-transform:
  none` is set explicitly on `.cite-pop`, since some citations sit inside
  uppercase-styled ancestors (e.g. `.stat-pull .cap`) that would otherwise
  leak into the popover text.
- Loaded as an additional `<script>` tag per page that needs it (same
  pattern as `reveal.js`/`deck.js`) — not bundled into `topic-metadata.js`
  or `reveal.js`, since not every briefing page will use citations.
- The gap between the pill and the popover (needed for visual breathing
  room) would otherwise break hover: moving the mouse from the pill up to
  the popover crosses a strip that's over neither element, so CSS
  `:hover` drops and the popover closes before the pointer arrives. Fixed
  with an invisible `::before` bridge on `.cite` spanning that gap, so
  the hover region stays continuous from pill to popover. Clicking the
  pill itself also opens `data-url` directly (in a new tab, guarded so it
  doesn't double-fire when the click actually came from the inner
  "Source ↗" link) — a second way to reach the source besides hovering
  and clicking the link.
- Piloted first on `day-1/01-state-of-ai.html` (Overview), covering the
  facts already verified by research during the review: the ChatGPT
  "1M users in 5 days" stat, the AlexNet/ImageNet 2012 benchmark, the GPT-3
  few-shot-learning definition (previously left unexplained pending this
  decision), the NYT v. OpenAI/Microsoft lawsuit, and the four named
  newsroom examples.

## Consequences

- New reusable pattern: any future briefing-template page can cite a claim
  by adding one `<sup class="cite">` tag — no new CSS/JS per page.
- Hover/focus-only reveal means touch devices (no hover) can't open the
  popover by tapping the marker — this wasn't scoped for touch since the
  redesign was explicitly hover-driven per the user's request; the
  `aria-label` at least keeps the underlying content available to
  assistive tech regardless of device. Revisit if the workshop site turns
  out to get meaningful tablet/phone traffic.
- Not yet applied to the Slides deck's mirrored content, or to any other
  topic page, or to the "Caveat"/"Changed" compare-grid items the user
  specifically asked about in Batch 2 — those are tracked as follow-up
  work in `project/REQUIREMENTS.md`, not done as part of this ADR.
- The popover has no scroll/viewport-edge collision handling (assumes
  enough space above the marker) — fine for now given where the pilot
  citations sit on the page, but worth revisiting if a citation ends up
  near the top of the viewport or deck slide.
- Citation source data lives inline in `data-url`/`data-note` attributes
  rather than a separate JSON file — simplest option for the current
  volume (a handful of citations on one page); revisit if the number of
  citations per page grows large enough that inline attributes get
  unwieldy to maintain.
