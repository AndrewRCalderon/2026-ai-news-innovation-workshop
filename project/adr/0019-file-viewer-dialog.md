# 0019: File-viewer dialog for showing a real file in place

- Status: Accepted
- Date: 2026-08-16

## Context

Day 2's CLAUDE.md topic (`03-claude-md.html`) names this repo's own
`CLAUDE.md` as a real, working example, but only ever described it in
prose. Round-3 audit feedback asked for people to actually be able to
open and read the file, ideally without leaving the page, so copy could
point at specific parts of it ("notice this section states what can't be
inferred from code") while the reader has it in front of them.

No existing component fits. The site's only "click for more" pattern is
`docs/js/citations.js`'s `.cite`/`.cite-pop` (see ADR 0012), which is a
small, hover/focus-triggered CSS popover anchored to an inline element,
sized for a one-paragraph note, not a 39-line file someone needs to
scroll through. This needed a real modal.

## Decision

A native `<dialog>` element, `.file-viewer`, opened by a
`[data-file-viewer="id"]` trigger button and driven by a small new script
(`docs/js/file-viewer.js`):

- **Markup**: trigger button + `<dialog class="file-viewer" id="...">`
  containing a sticky header (file name + close button) and a
  `<pre><code>` body holding the file's real text, hand-copied into the
  page rather than fetched at runtime (this is a static site with no
  build step or server, so there's no live-fetch path to the repo; if the
  file changes, the embedded copy has to be updated by hand — see
  Consequences).
- **JS**: click the trigger to call the dialog's native `.showModal()`;
  click the close button, or click the backdrop, to call `.close()`. No
  keyboard-trap or focus-management code needed, `<dialog>` handles
  focus containment and Escape-to-close natively.
- **Styling**: matches `briefing.css`'s existing tokens
  (`--bg`/`--surface`/`--border-strong`/`--mono`, etc.), so it themes
  correctly in both light and dark automatically rather than needing its
  own palette.
- First use: `03-claude-md.html`'s "A Real Example" section, showing this
  repo's actual `CLAUDE.md`.

## Consequences

- Any future "show a real file/example in place" need on the site can
  reuse `.file-viewer` directly, same pattern as `.history` or
  `.process-wheel` being reused across topics.
- **The embedded file content will drift** if this repo's real
  `CLAUDE.md` changes and the copy inside `03-claude-md.html`'s dialog
  isn't updated to match. This is a known, accepted tradeoff of a
  static, no-build site (the same class of staleness risk already
  flagged for `deck.js`'s hardcoded Slides cover-meta, see the Day 2
  round-3 change log) — worth a periodic check whenever this repo's own
  `CLAUDE.md` is edited, not something the component itself can catch.
- `<dialog>`/`.showModal()` is broadly supported in current browsers;
  the JS checks for `showModal` before wiring up a trigger, so on an
  unsupported browser the button simply does nothing rather than
  erroring, at the cost of no visible fallback (acceptable given the
  workshop's own setup requirements already assume a current browser).
