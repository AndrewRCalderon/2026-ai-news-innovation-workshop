# Copy drafts

Markdown working copies of topic-page prose, meant to be edited directly
(not dictated) and diffed. Pilot run: Day 2 (`day-2/`). If this workflow
holds up, Day 1 and Day 3 get the same treatment, and generating these
drafts becomes a repeatable skill instead of a one-off port.

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
