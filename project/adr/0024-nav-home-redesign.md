# 0024: Home page & nav redesign — implementation decisions

- Status: Accepted
- Date: 2026-08-21

## Context

A design handoff (`Home.dc.html` + `README.md`, delivered outside the repo)
specified a redesign of `docs/index.html` and `docs/partials/nav.html`:
collapsing the flat Day 1 / Day 2 / Day 3 top-level nav items into a single
"Days" menu with a second-level flyout per day, an editorial home page
(masthead, jump-to strip, two numbered sections), and moving the logo from
nav to footer. The handoff was a single-file interactive prototype (inline
styles, a component-framework `<script>` block) explicitly flagged as a
design reference, not code to paste in — implementation choices below are
this session's, not the handoff's.

## Decisions

**Single shared nav markup, not duplicate desktop/mobile trees.** The
prototype rendered two separate DOM subtrees — one `<ul data-nav-links>` for
desktop, one `<div data-mobile-panel>` for the tap-open mobile menu — each
with its own copy of every link, because the prototyping tool has no other
way to diverge behavior by breakpoint. This repo's nav has always been one
`<ul class="site-nav-links">` reused at both breakpoints via
`@media (max-width: 720px)` (see [0005](0005-js-injected-partials.md)).
Kept that: one `.dropdown`/`.day-flyout` pair per day, `position: absolute`
flyouts on desktop, `position: static` accordion rows on mobile, driven by
the same `.is-open` classes and the same click/hover JS in
`docs/js/nav.js`. This means the state model is a single shared
`daysOpen`/`openDay` (module-scoped via classList, not component state) —
not the prototype's explicitly separate `mobileDaysOpen`/`mobileOpenDay`.
That separation existed in the prototype only because its two DOM trees
could theoretically both be mounted at once; with one tree gated by CSS
`display`, only one is ever interactive at a time, so shared state is
correct and simpler. Trade-off: if a user hover-opens "Days" on a wide
window and then resizes below 720px without closing it, the mobile panel's
accordion can render pre-expanded on next open. Judged inconsequential for
a workshop site.

**Day label navigates; a separate caret toggles the flyout.** Initial
implementation made the whole "Day 1" row a toggle button (matching the
prototype exactly), but that meant clicking "Day 1" only opened the
flyout — it never took you to `/day-1/`. Split it: `.day-trigger-link`
(the index badge + "Day 1" text) is a real `<a href="/day-1/">`;
`.day-caret-btn` is a small adjacent button that only toggles
`[data-day-flyout]`. Hover on the row still opens the flyout either way
(desktop). This is a deliberate deviation from the handoff, made because a
top-level nav item that can't be navigated to directly is a usability gap,
not a faithful-to-spec feature.

**New home-page component classes went in `style.css`, not `briefing.css`,
per the handoff's own suggested-implementation-order note** — even though
the result (masthead / eyebrow / numbered `.block`-style sections) closely
resembles patterns already defined in `docs/css/briefing.css`
([0010](0010-briefing-template.md)). `docs/index.html` does not load
`briefing.css`. Reusing its class names directly would have required either
adding that stylesheet to the home page (pulling in dark-mode tokens and
slide-deck CSS the home page doesn't use) or duplicating class names across
two stylesheets with a collision risk. Instead, `--surface`, `--border`,
and `--border-strong` were mirrored into `style.css`'s `:root` by value (they
already matched exactly) so the new `.home-*` classes could reuse the same
tokens without loading `briefing.css`.

**Fixed a latent nav/footer color bug surfaced by this work, not caused by
it.** `briefing.css` has `.briefing a { color: var(--accent-primary-strong)
}`, scoped to the whole `<body class="briefing">` element — which includes
the injected `#nav`/`#footer` partials, since they're DOM children of
`body`, not sibling stylesheets. Because that selector (one class + one
element = specificity 0,1,1) was tied or beat every existing nav/footer
link-color rule, **every** nav link on every day/setup/briefing-templated
page rendered in the briefing accent purple regardless of state — a
pre-existing bug, just not one anybody noticed until the new `.is-active`
pill made "the current page doesn't look different from the rest" visible.
Fixed by prefixing the nav's and footer's own color-bearing selectors with
their `.site-nav` / `.site-footer` ancestor class, raising specificity
above `.briefing a` (e.g. `.site-nav .site-nav-links a`,
`.site-footer .site-footer-links a`). Did **not** narrow `.briefing a`
itself — that rule is correct for article body copy, and narrowing its
selector (e.g. to `.briefing main a`) is a larger change with a bigger
blast radius across ~26 existing pages that was out of scope here.

**Update, same day, after the user tried it live: the click+hover combo had
two real bugs, not just theoretical edge cases.** The first pass's testing
did surface a symptom — a Playwright-simulated click on the "Days" trigger
sometimes toggled it closed instead of open — but that was wrongly written
off as a synthetic-event artifact rather than flagged as a real interaction
bug. It isn't an artifact: on any real mouse, moving the cursor onto a
button to click it fires `mouseenter` (opening the menu via hover)
*immediately before* the `click` event, so a plain open/closed toggle on
click sees "already open" and instantly closes what hover just opened —
every real click was affected, not just Playwright's. Fixed by detecting
hover-capable pointers (`matchMedia('(hover: hover) and (pointer: fine)')`)
and making click idempotent-*open* (not toggling) on those; touch devices
have no hover at all, so click there still fully toggles, unchanged.
Closing on hover-capable devices stays mouseleave/outside-click/Escape
driven — no way to "click again to close" while hovering, which matches
standard hover-menu UX (e.g. most mega-menus) rather than being a gap.
A second, separate bug surfaced during the fix: `.has-dropdown:focus-within
.dropdown { display: block }` kept the day-list panel visually open via
pure CSS after clicking into it, even once JS correctly closed it on
mouseleave — because the just-clicked button kept DOM focus, and
`:focus-within` doesn't care about mouse position. Removed that rule
entirely rather than patching around it: the click handlers already open
the menu on keyboard `Enter`/`Space` activation (native button behavior
dispatches `click`), so `:focus-within` was redundant *and* the thing
causing the stuck-open state. This is the standard WAI-ARIA "disclosure"
pattern (explicit activation opens it, not focus alone) — arguably more
correct than what shipped first, not just a bug fix.

## Consequences

- The nav/footer chrome is now specificity-hardened against `.briefing a`;
  any future chrome selector that sets `color` on an anchor inside
  `.site-nav`/`.site-footer` needs the same ancestor-class prefix or it will
  silently lose on briefing-templated pages again. Worth a comment at the
  point of failure if it recurs.
- `docs/js/nav.js` now owns three behaviors instead of one: mobile toggle
  (pre-existing), desktop-dropdown click/hover/outside-click/Escape, and
  current-page `.is-active` marking (via `[data-nav-link]`, pathname
  compared with `index.html` stripped). The active-link logic runs for
  every top-level simple link (Home, Students, Resources, Setup), not just
  Home — the handoff called out Home specifically as "the pattern to extend
  to other top-level items when their page is active," so this extends it
  now rather than leaving three more items to wire up later for free.
- No keyboard arrow-key roving/typeahead was added to the Days menu or day
  flyouts — buttons and links remain natively Tab/Enter-operable, and
  Escape closes the open menu, but there's no arrow-key navigation between
  flyout items. The handoff flagged the flyout as "the riskiest part to get
  right without a framework" and suggested a `<details>/<summary>` fallback
  if it proved fragile; the click/hover implementation passed interaction
  testing (desktop click, desktop hover, mobile tap-accordion, outside-click
  close) without needing that fallback.
