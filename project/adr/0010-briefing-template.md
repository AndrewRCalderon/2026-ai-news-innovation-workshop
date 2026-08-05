# 0010: "Briefing" template for content-rich topic pages

- Status: Superseded by [0011](0011-split-overview-and-slides.md) (the toggle mechanism was replaced by separate Overview/Slides pages; the rest of this ADR — component design, token aliasing — still holds)
- Date: 2026-08-04

## Context

The generic topic-page template (topic-header + two-column content/sidebar,
see [0005](0005-js-injected-partials.md)) was scaffolded before any real
content existed. Once the user supplied real content for Day 1 / Topic 1
("State of AI") and asked to explore its design, we prototyped a distinct
treatment as Artifacts: a long-form "field briefing" layout, then a paginated
deck version (page section-to-section like a slide deck, but keeping the
same rich components — comparisons, a history timeline, stat callouts —
instead of flattening to bullet slides), then a version combining both behind
a Scroll/Paginated toggle defaulting to paginated. The user approved this and
asked to add it to the real site.

The paginated layout is a fixed-position, full-viewport "deck" (`overflow:
hidden` on `html`/`body`) with its own compact top bar (breadcrumb-style
eyebrow, mode toggle, section counter, fullscreen button). That doesn't have
room for, and doesn't suit, the site's standard dropdown nav bar
(`docs/partials/nav.html`) — a full multi-day dropdown menu competing for
space with a presentation-style deck reads as cluttered, and the fixed/hidden
overflow model conflicts with how the shared nav assumes normal page scroll.

## Decision

Content-rich topic pages using this "briefing" template are self-contained:
they do **not** include the shared `nav.html`/`footer.html` partials
([0005](0005-js-injected-partials.md)). Instead:
- A persistent top bar has a breadcrumb-style eyebrow (Home → Day N → page)
  as the only way back to site-wide navigation.
- In-page navigation (contents list, prev/next) is schedule-driven, sourced
  from `docs/data/schedule.json` ([0006](0006-schedule-json-source-of-truth.md)).

Implementation is two new shared files, not page-specific inline code, since
this template is expected to be reused across topic pages as more content
arrives:
- `docs/css/briefing.css` — all layout/typography/component styles. Its
  color tokens (`--accent-primary`, `--bg`, `--ink`, etc.) are aliases onto
  the site's existing palette from `style.css` (`--purple`, `--cream`,
  `--text-primary`, ...) rather than a second, separately-maintained color
  system. Two tokens are genuinely new and scoped to this template only:
  `--ink-soft` (a warm-biased secondary text color, deliberately not the
  site's flat `--text-secondary: #666`) and `--surface` (a card/panel
  background distinct from the page background).
- `docs/js/briefing.js` — the Scroll/Paginated toggle, deck paging logic,
  and schedule-driven metadata badges + prev/next links (parallel to, but
  separate from, the existing `topic-metadata.js` used by pages still on the
  generic template).

The generic template and `topic-metadata.js` are untouched and still serve
pages that haven't been migrated (see `project/REQUIREMENTS.md`).

## Consequences

- Two topic-page templates now coexist: the generic one (topic-header +
  sidebar) and this briefing one. Which template each remaining topic page
  should use is an open question, tracked in `project/REQUIREMENTS.md`
  rather than decided here — likely depends on whether a topic's real content
  is rich/structured enough to justify it.
- Losing the shared nav on these pages is a deliberate tradeoff: less
  discoverability of the rest of the site from mid-briefing, in exchange for
  an uncluttered, presentation-capable page. The breadcrumb eyebrow is the
  minimum viable way back.
- `briefing.css` currently defines dark-mode tokens; the rest of the site has
  no dark mode at all. That's an intentional scope limit (not solving
  site-wide dark mode here), accepted as a minor inconsistency if a visitor
  navigates from a dark-rendered briefing page to a light-only page.
- The prototype artifacts duplicated content markup between scroll and
  paginated trees for reliability (see the design conversation); that same
  duplication exists in the shipped page. Acceptable for one page — if/when
  more pages adopt this template, duplicated authoring per page is the real
  cost, not duplicated CSS (which is already fully shared).
