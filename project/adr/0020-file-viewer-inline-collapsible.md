# 0020: File viewer as an inline collapsible, not a dialog

- Status: Accepted
- Date: 2026-08-20
- Supersedes: [ADR 0019](0019-file-viewer-dialog.md)

## Context

ADR 0019's `<dialog>`-based file viewer on `03-claude-md.html` shipped
2026-08-16. User feedback during the round-3 audit (Batch 7) reported the
popup as illegible, "shows a long string." The root cause was never
diagnosed at the time (no browser automation tool was available in that
session to actually open the dialog and inspect it), but the direction was
already clear: replace the popup with an inline collapsible element that
opens in place instead of an overlay.

Diagnosed this time with an actual headless-browser check (Playwright):
swapping the markup alone reproduced the identical "long unbroken line"
bug in the new inline version. The real cause was a CSS specificity
collision, not the dialog itself: `.briefing code` (`briefing.css:134`)
sets `white-space: nowrap` for inline `<code>` snippets, and that rule
targets the `<code>` element directly, so it wins over the
`white-space: pre-wrap` set on the parent `.file-viewer-body` (`<pre>`).
`.code-block` (the starter-prompt component, see the `.code-block code`
rule) already carries its own `code`-level override for the same reason;
`.file-viewer-body` never had one. This means ADR 0019's original popup
had this exact bug from day one, unrelated to `<dialog>` vs. inline.

## Decision

Replace the `<dialog>` + trigger-button + `file-viewer.js` pattern with a
native `<details>`/`<summary>` disclosure, `.file-viewer-inline`:

- **Markup**: `<details class="file-viewer-inline"><summary>Open
  CLAUDE.md →</summary>` followed by the same file-name header and
  `<pre><code>` body as before, now inline content instead of dialog
  content.
- **No JS required.** `<details>`/`<summary>` toggling is native browser
  behavior; `docs/js/file-viewer.js` is deleted rather than rewritten, and
  its `<script>` include removed from both `03-claude-md.html` and its
  Slides companion.
- **Styling**: `.file-viewer-inline` in `docs/css/briefing.css` replaces
  the old `.file-viewer`/`.file-viewer-trigger`/`.file-viewer-close`
  rules. The body keeps the same monospace/`pre-wrap` treatment as before,
  plus `overflow-x: auto` as a safety net for any single long line (a
  URL, an unbroken path). A new `.file-viewer-body code` rule explicitly
  overrides `.briefing code`'s `white-space: nowrap`, fixing the actual
  bug (see Context) rather than just relocating it.

## Consequences

- Simpler than the dialog version: no JS, no focus-trap/backdrop-click
  handling to reason about, no `showModal()` browser-support check.
- The file expands in the page's normal flow instead of overlaying it, so
  it pushes surrounding content down while open. Acceptable for this use
  (a single file, not a maze of nested overlays).
- Same known tradeoff as ADR 0019: the embedded file content is a
  hand-copied, byte-faithful snapshot of this repo's real `CLAUDE.md`, not
  fetched live. If the real file changes, the embedded copy needs a
  manual update.
- Any future "show a real file in place" need on the site should reuse
  `.file-viewer-inline`, not the retired dialog pattern.
