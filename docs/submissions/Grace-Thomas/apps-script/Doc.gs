/**
 * RFC Bot - pulls the story draft out of the Doc so it can go to Claude.
 *
 * This is the whole of the Docs half. It reads and hands off; it does not
 * decide anything.
 *
 * The alternative was calling the Claude API from here so the sidebar could
 * write the emails itself. Rejected, and it is worth writing down why rather
 * than rediscovering it:
 *
 *   - Apps Script has no browser. Contact research escalates curl -> fetcher
 *     -> real browser, and kalshi.com returns 429 to everything above that
 *     last tier. media@kalshi.com was only ever found by a real browser. A
 *     sidebar that researched contacts would be quietly worse at the one job
 *     that most needs to be right.
 *   - It would mean a copy of SKILL.md's rules living in a prompt string here,
 *     drifting from the real one.
 *   - It would need a paid API key and cost roughly a dime a run.
 *
 * So the judgment stays in Claude Code and this stays a pipe.
 */


/**
 * The document's text, as it stands right now.
 *
 * Deliberately the whole body rather than a selection: the recipients are
 * usually the reporter's own inline notes ("Kalshi statement on this"), and
 * those sit wherever the note was made, not inside whatever is highlighted.
 *
 * Needs only documents.currentonly - this script can read the Doc it is
 * attached to, and no other file in the account.
 */
function readDocument() {
  var doc = DocumentApp.getActiveDocument();
  return {
    name: doc.getName(),
    text: doc.getBody().getText()
  };
}
