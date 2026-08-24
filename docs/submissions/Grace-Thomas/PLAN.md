# RFC Bot — working plan

> **How this file came about:** written 2026-08-24 at the end of Day 1, reconstructed from the
> actual state of the project rather than from an earlier written plan (there wasn't one). If
> we agreed on something before this that isn't captured here, add it — this file is meant to
> be edited, not preserved.

## The idea, in one paragraph

On a breaking story, the request for comment is the step that gets rushed. Finding each
company's press contact, confirming it's current, writing a real email per recipient, and
keeping a record of who was asked and when — that's 30–45 minutes of work in the same hour the
story is being written, so it gets compressed into a generic blast or skipped. RFC Bot
automates the research and the drafting but deliberately **not** the sending or the judgment.
The reporter reads every draft and presses Send.

## Where things stand

**Built and working end to end.** The `rfc-outreach` skill takes a filled-in `BRIEF.md` and
produces, per story:

| Output | Purpose |
|---|---|
| `compose.html` | One button per contact → pre-filled Gmail compose window. Main workflow. |
| `NN-company.eml` | Same emails as files, for Apple Mail / Outlook. |
| `REVIEW.md` | All emails in one document for a fast read-through. |
| `tracking.csv` | Who, when, deadline, status — the record behind "did not respond by press time." |
| `drafts.json` | Structured source; edit and re-run `scripts/build_drafts.py` to regenerate. |

**Test story:** pink cleats at the 2026 World Cup — Nike, Adidas, New Balance, Puma. All four
drafted 2026-08-24. Contacts resolved: New Balance and Puma at HIGH confidence (fetched from
their own press pages), Nike and Adidas at MEDIUM (Adidas' media-contact page timed out on
direct fetch; Nike's address is cited in their own releases but the newsroom page wasn't read
directly). Nothing sent.

**Design decisions worth not re-litigating:**

- *Never sends.* No SMTP, no browser automation that clicks Send. The skill writes files.
- *Confidence labels are load-bearing.* HIGH / MEDIUM / LOW on every address, with a source
  URL and date. `build_drafts.py` warns on anything below HIGH. A wrong address on deadline is
  a missed statement, so the bot never sounds more certain than it is.
- *Gmail links omit the signature on purpose*, because Gmail appends the real one. `.eml` files
  embed `config/signature.txt`, because nothing else will.
- *Only HIGH and MEDIUM contacts get cached*, so a guess never hardens into a permanent record.

## Next up

1. **Fill in `config/profile.md` and `config/signature.txt`.** Still `TODO` for byline name,
   outlet, and deadline phone. The skill is written to stop and ask when it hits these, so no
   real run can complete until they're filled. *(In progress.)*
2. **Send the pink-cleats round, or retire it as a test.** Four drafts are sitting at "not
   sent" against a 4 p.m. ET deadline dated 2026-08-24. Decide whether this is a live story or
   a fixture — and if it's a fixture, say so in the brief so it isn't mistaken for real
   pending outreach later.
3. **Confirm the two MEDIUM addresses** (Nike, Adidas) before any real send.
4. **Exercise the follow-up path.** `"draft follow-ups for the non-responders"` reads statuses
   from `tracking.csv` and writes chasers to `outreach/<slug>-followup/`. Untested so far.
5. **Run a second, unrelated story** — the real test of whether this generalizes or is
   quietly shaped around the cleats example.

## Open questions

- **Does it generalize past Gmail?** Everything routes through Gmail compose URLs. A reporter
  on Outlook gets the `.eml` files, which is a worse experience. Is that acceptable?
- **Is contact research reliable enough to trust?** Two of four came back MEDIUM on the first
  real attempt. That's honest, but it means a human still confirms half the list. Does that
  leave enough time saved to matter?
- **Optional Gmail API drafts** (`scripts/gmail_drafts.py`) needs ~15 min of Google Cloud
  setup and requests the `gmail.compose` scope, which cannot send. Worth doing, or does
  `compose.html` already cover it?

## Housekeeping

- Project now lives at `docs/submissions/Grace-Thomas/` in the workshop repo, branch `day-1`.
- It was **copied**, not moved, from `~/082626_AI Workshop`, which is not a git repo. Both
  copies exist and can drift. The clone is the one under version control.
- Day 2 moves from Claude Desktop's Code tab to VS Code + the Claude Code extension.
