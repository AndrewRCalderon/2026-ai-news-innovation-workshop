# Copy drafts

Markdown working copies of topic-page prose, meant to be edited directly
(not dictated) and diffed. Pilot run: Day 2 (`day-2/`), 2026-08-16. The
pilot held up, so Day 3 (`day-3/`) was ported the same way on 2026-08-19,
all 7 sessions, including the three (`02-product-design`,
`04-ai-human-design`, `05-where-you-can-take-this`) rewritten that same
day for the Adiel PR #8 response, so the drafts reflect current site
content, not the pre-rewrite version. **Day 1 (`day-1/`) ported
2026-08-21**, all 9 real-content pages (8 scheduled topics plus the bonus
`people-to-follow` resource page) — see `day-1/README.md` for a
cross-page pattern summary specific to that pass, pulled from
`project/content-architecture-notes.md`. `09-project-assignments.html`
is still a TODO stub, not ported. If a repeatable skill for generating/
refreshing these drafts gets built, it's worth doing now that three days
have gone through this by hand.

## Why this exists

Dictating copy edits turn by turn (the workflow used for the round-3
audit's Batches 1–7) is slow and lossy, especially over voice transcription.
These files let you edit final wording directly; Claude re-fits the edited
text back into each page's real HTML/CSS structure and citation markup.

## What's here vs. what isn't

Only Overview-page prose. Slides decks are always a condensed version of
Overview, authored by Claude during implementation, not separately
dictated or edited here — that pattern hasn't changed.

## Format

Each file mirrors one Overview page (`day-2/01-debrief.md` ↔
`docs/day-2/01-debrief.html`).

- `# Title` — the page's `<h1>`.
- `> dek` — the masthead dek, as a blockquote.
- `## N. Section Title` — one per `<section id="sN">`, in order.
- `### Sub-heading` — any `<h3>` inside a section (e.g. a named
  sub-block like "What worked" or "Before You Add a Line").
- Plain paragraphs and `-` bullet lists — edit this text directly, exactly
  as it'll read on the site. The first paragraph in a section is the
  page's `.lede` (styled larger); no separate marker needed, order is
  enough.
- `[n]` — an inline citation marker. Each section ends with a **Sources**
  list mapping `[n]` back to its URL and the descriptive note that
  powers the site's citation popover (see `docs/js/citations.js`,
  ADR 0012). Edit the surrounding prose freely; if your edit changes what
  a sentence claims enough that the citation no longer supports it,
  say so or flag it rather than silently leaving a mismatched source —
  Claude will also flag any case where this looks unclear when
  re-implementing.
- **Two-column comparisons** (Include/Leave out, Before/After, etc.) —
  two `**Label**` headings each followed by a bullet list. Maps to
  `.compare-grid` on the actual page.
- **Term/definition pairs** (a `.roster`) — `**Term**: definition text.`
  one per line.
- **Numbered steps** (a `.history`, chronological or not) —
  `1. **Era · Title.** Body text [n].` Nested sub-bullets under a step
  are that step's own checklist questions, where the page has them.
- **Exercises** — a blockquote starting `> **Exercise: Title**`, with
  `Time` / `Description` / `Deliverable` as its own lines. Maps to
  `.exercise-box`.
- **Starter-prompt / code blocks** — a fenced code block, exactly as it
  should read on the page.
- **Data tables** (a `.resource-table`) — a standard GFM markdown table,
  columns in the same order as the page. If the table also drives
  filter pills (a `.filter-pills` component, e.g. `people-to-follow.md`),
  add a `[Table, maps to .resource-table...]` structural note above it
  explaining the pill values come from one of the table's own columns —
  no separate authoring needed for the pills.
- **Pulled-out stats** (a `.stat-pull`) — a `[Stat callout, maps to
  .stat-pull]` structural note, then `**Number** — Caption [n]` on one
  line and the aside sentence on the next. First used in
  `day-1/01-state-of-ai.md`.
- **Three/four-up emphasis blocks** (a `.stakes`) — visually distinct
  from `.roster` (a pull-out layout, not an inline term list) but same
  markdown shape, `**Label**: text.` one per line. Since the two look
  identical in markdown, add a `[Maps to .stakes, not .roster]`
  structural note above so re-implementation picks the right component.
  First used in `day-1/01-state-of-ai.md`.
- **Circular step diagrams** (a `.process-wheel`) — same numbered-step
  markdown shape as `.history` (`1. **Title.** Body.`), but a different
  component (a repeating cycle, not a chronological timeline). Add a
  `[Maps to .process-wheel, not .history]` structural note above it.
  First used in `day-1/05-problem-statement-discussion.md`.
- **Chip strips** (a `.chip-strip`, a horizontal row of year/label
  pairs) — a `[Chip strip, maps to .chip-strip]` structural note, then
  the pairs on one line separated by `·`, e.g. `1995 Internet access ·
  2007 Smartphones`. First used in `day-1/01-state-of-ai.md`.
- Anything in `[square brackets, not bold]` is a structural note from
  Claude, not prose to edit, e.g. a pointer to an embedded file viewer
  whose content lives in a separate file.
- `<!-- HTML comments -->` flag context worth knowing before you edit a
  given spot, most often a pending piece of feedback already logged in
  `project/REQUIREMENTS.md` that hasn't been implemented yet. Delete the
  comment once you've addressed it (by editing the prose beneath it, or
  by leaving a note about what you want instead) — it's a pointer, not
  something that needs preserving.

## Workflow

1. Claude generates/refreshes the draft from the live HTML.
2. You edit the `.md` file directly.
3. Claude reads the diff (`git diff` against what it generated, or just
   compares the two versions if the file isn't committed yet) and
   re-implements the changes into the actual HTML — reattaching
   citations, rebuilding whichever component each section maps to, and
   updating the Slides companion as a fresh condensation of the new copy.
4. Anything structural (move a section, swap a component, add a whole
   new interactive piece) still gets called out directly in conversation
   — a markdown diff doesn't express "turn this into a collapsible
   instead of a popup" well. Use the drafts for wording; use words for
   structure.
