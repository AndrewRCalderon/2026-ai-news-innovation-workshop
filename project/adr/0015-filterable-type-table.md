# 0015: Unified filterable table with type pills, replacing multi-section rosters

- Status: Accepted
- Date: 2026-08-06

## Context

Topic 4 ("People to Follow") originally had 7 separate `<section>`s, each
its own `.roster` (Newsroom Leaders, Technologists & Researchers,
Journalists & Practitioners, Publications & Newsletters, Communities &
Events, plus a "How to Use This List" section that got cut). During
review, the set of people/resources grew (small-newsroom voices, critics,
designers), and the user proposed collapsing everything into one table
instead — the old section headers becoming values in a "Type" column,
with filter pills above the table so a reader can narrow to just the
category they want (e.g., only "Designer" or only "Conference").

## Decision

- **Markup**: one `<table class="resource-table">` (reusing the table
  component from the AI Decision Frameworks page,
  [ADR](0012-inline-citations.md) family) with columns Name (linked),
  Type, and a description. Every row carries `data-type="..."` matching
  one of: Newsroom Leader, Technologist, Journalist, Critic, Designer,
  Publication, Conference, Open-source.
- **Filtering** (`docs/js/type-filter.js`, new, ~30 lines, no
  dependencies): a `.filter-pills` group of buttons, each with
  `data-type`. Clicking a pill toggles it active and hides table rows
  whose `data-type` doesn't match any active pill; multiple pills can be
  active at once (OR filter — e.g., Critic + Designer shows both). An
  "all" pill resets to showing everything, and re-activates itself
  automatically if every specific pill gets deactivated.
- **Applied the `[hidden]` CSS fix proactively this time**: added
  `.resource-table tr[hidden] { display: none; }` before ever shipping,
  rather than after a bug report — this is the same class of bug as
  [ADR 0013](0013-infinite-scroll-roster.md)'s roster-row failure
  (`display: table-row` on `<tr>` would otherwise beat the browser's
  built-in `[hidden]` styling the same way `.roster-row`'s `display: grid`
  did). Verified working end-to-end with Playwright before considering it
  done, including the multi-select case.
- The page's TOC collapsed from 7 entries to 2 ("Drawing Inspiration From
  Others" + "Who & What to Follow") to match — the whole point was fewer,
  not more, navigational units.
- Applied identically to both the Overview page and the Slides deck
  (same table, same 29 rows, same filter pills) — unlike the roster
  splitting in [ADR 0014](0014-slides-pagination-for-long-rosters.md),
  a filter-driven table doesn't have the "too long for one slide panel"
  problem in the same way, since a reader/presenter can filter down to a
  manageable subset live rather than needing the deck to paginate for
  them, and the same table fits within the Slides deck's own
  `overflow-y: auto` per-slide scrolling if left unfiltered.
- **`project/scripts/check-slide-parity.js` updated** to count `<tr
  data-type="...">` rows in addition to `.roster-row` and `<li>` — it had
  a real blind spot here: it silently reported "no issues" for this page
  the first time, because neither of its old checks could see table rows
  at all (0 roster-rows and 0 `<li>`s in both files "matched" by
  coincidence, not because content actually lined up). Manually
  confirmed 29/29 rows before trusting the script again.

## Consequences

- Any future page needing a filterable, typed list can reuse this exact
  pattern: `.resource-table` + `.filter-pills` + `type-filter.js`, no new
  CSS/JS.
- The parity checker's table-row counting is keyed to the literal string
  `<tr data-type="`. A future table using a different attribute name to
  tag row type would silently bypass this check the same way the
  original gap did — worth remembering if that ever comes up.
- Filtering is client-side only over a fully-rendered 29-row table; fine
  at this scale, would need a different approach (search box, pagination)
  if this list grew substantially larger.
