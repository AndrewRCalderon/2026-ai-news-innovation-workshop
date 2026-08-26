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

> **This file is history, not spec.** What RFC Bot must do lives in
> [requirements.md](requirements.md), how it's built in [architecture.md](architecture.md), and
> the work order in [tasks.md](tasks.md). Those three win if this file disagrees. Sections that
> have been superseded say so rather than being deleted.

**Built and working end to end.** The `rfc-outreach` skill takes a story input and produces, per
story:

| Output | Purpose |
|---|---|
| `compose.html` | One button per contact - pre-filled Gmail compose window. |
| `NN-company.eml` | Same emails as files, for Apple Mail / Outlook. |
| `REVIEW.md` | All emails in one document for a fast read-through. |
| `tracking.csv` | Who, when, deadline, status - the record behind "did not respond by press time." |
| `drafts.json` | Structured source; edit and re-run `scripts/build_drafts.py` to regenerate. |

**Two ways in, as of 2026-08-25.** A filled-in `BRIEF.md`, or the story draft itself, read out of
a Google Doc by the Apps Script sidebar and handed to Claude. The sidebar hands off rather than
calling the Claude API itself - task 18 has the reasoning, `architecture.md` has the decision.

**A Google layer, rebuilt 2026-08-26.** A standalone Apps Script project, installed as an editor
add-on, writes real Gmail drafts rather than transient compose windows. Its sidebar opens with
two controls - the deadline, and one button - and reveals the paste-back only after the button is
pressed. Test mode is on by default and rewrites every recipient to the reporter's other address;
an address below HIGH is marked in the draft subject; a committed `.githooks/pre-commit` refuses
any commit that adds a way to send. **Tasks 15 and 16 are built but not checked off** - both
"done when" conditions describe a real Gmail draft, and none has been created yet.

**Stories run:** pink cleats at the 2026 World Cup (Nike, Adidas, New Balance, Puma) and Kalshi /
Polymarket on flight-cancellation markets. Six drafts, **every contact HIGH**, each read from the
company's own page. A third folder, `outreach/kalshi-from-doc/`, is a fixture checking that the
Doc route matches the brief route - its `FIXTURE.md` is honest that this proves less than it
looks, because Claude had already seen the brief-derived version. Nothing has ever been sent.

**The bot does not verify the premise.** Whatever goes in the brief gets put to a comms team in
writing, so the reporting has to support it before a send.

**Design decisions moved out on 2026-08-25.** The list that used to sit here is now
[architecture.md](architecture.md) - "Decisions worth not re-litigating" - which is current where
this was going stale. Three of the items here were superseded the same day and are worth naming
so an old copy isn't mistaken for the rule: the *four-sentence cap* became a four-part structure
plus a warning-only length check; the *numbered questions* became prose; the *story-thesis
sentence* was cut from the body entirely. The superseded versions are preserved verbatim in the
2026-08-24 edit-log entry below.

## Next up

**The work list is [tasks.md](tasks.md), not this section.** It was drifting: as of 2026-08-25
every item that used to be here was either done or paused, and this file is the wrong place for a
second, staler task list. Open tasks are 13, 15, 16, 17, 19 and 20.

Two of those are **decisions before they are work**, and both need Grace, not a build:

- **Task 13 - follow-ups.** Paused 2026-08-25. RFC Bot is for day-of turnarounds; a chaser that
  lands the next morning has nothing to chase. `tasks.md` recommends cutting it and deleting R11.
  Not cut yet, because that's her call.
- **Task 17 - Google Contacts sync.** Contacts has no field for confidence or source URL, and
  both are load-bearing under R8. Recommended shape is one-way, CSV to Contacts, with confidence
  and source in the notes field. Undecided.
- **Task 22 - RFC Bot in every Doc.** An unpublished add-on works in one document at a time.
  Template Doc plus "Make a copy", or publish unlisted, which needs task 23 first. Undecided.
- **Task 24 - the button-to-Claude bridge.** Deferred on time, not merit. Read the note about
  what an unattended run cannot ask before picking it up.

## Open questions

- **Does it generalize past Gmail?** Still open. Everything routes through Gmail compose URLs and
  now through Apps Script as well; a reporter on Outlook gets the `.eml` files, which is worse.
- **Is contact research reliable enough to trust?** *Mostly answered 2026-08-25.* Two of four came
  back MEDIUM on the first attempt because the research read page text and not page source, which
  discards `mailto:` targets - and it had produced one wrong address. Fixed by grepping raw HTML
  and adding a real-browser tier for sites that block fetching. All six contacts across both
  stories are now HIGH. What's still open is whether that holds on a story nobody has seen.
- **Optional Gmail API drafts** (`scripts/gmail_drafts.py`). *Answered 2026-08-25, differently
  than expected.* The premise was wrong - `gmail.compose` is not incapable of sending (task 14).
  Apps Script became the route instead, because it needs no Google Cloud project, and R1 now rests
  on there being no send call anywhere, checked by a commit hook.
- **Does it generalize to a second reporter?** New. Every voice rule in `SKILL.md` is one
  reporter's taste, mixed in with the rules that make the tool safe. Task 20.

## Edit log

**2026-08-26 — Day 3: RFC Bot rebuilt as an add-on, the sidebar cut to two controls, and the
history files brought current.**

Two halves. The first was catching up the record: `PLAN.md`'s edit log stopped at 2026-08-24 and
its `## Next up` list was entirely done or paused, and `DAY-2.md` still described the Apps Script
and Docs work as upcoming though it had landed the same day. Both fixed, and the task list moved
to `tasks.md` where it belongs rather than living in two places.

The second was a redesign the reporter asked for, which changed three things:

- **Standalone editor add-on, not a bound script.** A bound script only runs in its own
  container, so RFC Bot existed in exactly one Doc. Reversed in `architecture.md` and in task 15.
- **The sidebar opens with two controls** — "When is the deadline?" and one button. The
  paste-back that creates the Gmail drafts is hidden until the button has been pressed.
- **Below-HIGH addresses are marked in the draft subject** (R8). The reporter picked marking over
  being asked: it interrupts nothing, and the marker has to be deleted by hand, so the check
  lands at the moment of sending.

**Corrected:** the sending address. Signature, profile and the Apps Script all carried the CUNY
address while the drafts are written in `graceathomas5@gmail.com` — a source hitting Reply and a
source reading the signature would have reached two different inboxes. Task 16's rationale was
wrong in the same way and was rewritten rather than left standing.

**Ran it end to end on a third story** — Apple's Mac mini M6 release. Contacts came off the press
release itself at HIGH; Apple prints named press contacts at the foot of each newsroom post, and
publishes nothing on `/newsroom` or `/contact`. The general helpline turned up on `/leadership`,
which no reasonable person would check. A first attempt was refused: the draft named no actual
news, and sentence 3 cannot be invented.

**Not done, and worth being plain about it:** the reporter asked for a button that puts the text
into Claude Code without her pasting. That is not possible from Apps Script — Google's servers
cannot reach a laptop — and the bridge that would do it is deferred as task 24. "Every Doc" also
turned out to need publishing, which the Gmail scope blocks; that is task 22. Tasks 15 and 16
stay unchecked: no Gmail draft has been created yet.

**2026-08-25 — Day 2: a spec, a rewritten email, fixed contact research, and a way into Google.**

The full narrative is in [DAY-2.md](DAY-2.md). What follows is the short version, plus the part
DAY-2.md doesn't cover: it was written mid-afternoon, and four more things landed after it.

Covered in DAY-2.md:

- **The project got a spec.** `requirements.md`, `architecture.md` and `tasks.md` split out of
  this file, so a session no longer starts by re-explaining the project.
- **The email got rewritten three times, by reading it.** The four-sentence cap became a
  four-part structure; numbered questions became prose; the thesis sentence was cut. Outlet
  changed from NYCity News Service to Semafor.
- **Contact research was broken and had produced a wrong address.** It read page text, which
  discards `mailto:` targets, and it had taken `@company-group.com` for `@company.com` from a
  secondary source. Now it greps raw page source and escalates curl -> fetcher -> real browser.
  A 429 or a near-empty page means bot-blocking, which only the browser tier defeats.
- **Nobody gets dropped for being hard to reach** (R1a): `email`, `form` or `none`, and a `none`
  is reported as a BLOCKER naming what was tried.
- **A second story, end to end** - Kalshi and Polymarket - which is what exposed most of the above.
- **Task 13 paused** rather than left as an unchecked box.
- **`gmail.compose` is not a send barrier** (task 14). Both spec files had claimed it was
  "technically incapable of sending." It is not; Google documents it as "Manage drafts and send
  emails." R1 was leaning on a false guarantee. Corrected in place, because a load-bearing wrong
  claim is worse than no claim.

Landed after DAY-2.md was written:

- **Apps Script that writes real Gmail drafts** (`4a36498`, task 15). Bound to a Google Doc rather
  than standalone, so Phase 7's sidebar is one project and one authorization. Uses the advanced
  Gmail service with explicit `oauthScopes`, not `GmailApp`, whose methods pull
  `https://mail.google.com/` - full-mailbox access including permanent delete.
- **Test mode, on by default** (task 16). `TEST_MODE = true` rewrites **every** recipient to
  `tkc.intern2@journalism.cuny.edu`, drops `Cc`, prefixes `[TEST]`, and keeps the real intended
  recipient in an `X-RFC-Bot-Test-Original-To` header. The body is left byte-identical, because
  the point is to read the exact text that would go out. Rewriting beats checking against an
  allow-list: the mistake this prevents is testing with the real `drafts.json` still loaded.
- **A commit hook that refuses any way to send** (`23a44e4`, task 21 - done). Task 14 established
  that R1 rests on nothing but the absence of a send call, so it stopped depending on someone
  remembering to grep. `.githooks/pre-commit` searches staged code for `.send(`, `smtplib`,
  `sendmail`, or a scope wider than `gmail.compose`. It is committed rather than dropped in
  `.git/hooks/`, which is invisible to git and wouldn't survive a clone. **It refused its own
  first commit**, which is how the markdown exclusion got written. `--no-verify` still skips it -
  it's a tripwire, not a wall, recorded plainly because overclaiming this exact guarantee is what
  task 14 had to correct.
- **The deadline became a required field** (`e0b5ae5`). Typed fresh in the sidebar on every run,
  deliberately not prefilled from `drafts.json`: a deadline is a promise to a source, and the
  person making it should be typing it. Whatever is typed replaces the last line of every body
  word for word. R4 updated the same commit.
- **The Docs sidebar reads the story draft and hands it to Claude** (`edfa8e5`, task 18 - decided).
  Rejected: calling the Claude API from Apps Script. Three reasons, the third decisive - a copy of
  `SKILL.md`'s rules drifting inside a prompt string, roughly a dime a run, and **no browser tier
  for contact research**. `kalshi.com` 429s everything below it, which is the only reason
  `media@kalshi.com` was ever found. A sidebar that researched contacts would have been quietly
  weakest at the job that most needs to be right. Cost taken knowingly: two pastes instead of none.
- **`clasp` replaced copy-pasting files into the editor** (`f860d1f`, `be76826`). Version 3.4.0;
  the setup instructions named a command that release had removed.
- **A `chat_close` skill** (`d329e93`, rewritten in `edfa8e5`) that updates `tasks.md`, this edit
  log, `SUBMISSION.md` and the spec files, then commits - pointed at this folder only, never the
  maintainer's repo-root copies.

Left open on purpose: tasks 15 and 16 are **built but unchecked**, because neither has been run
against a real Gmail account and seen to pass its "done when."

**2026-08-24 — cut every email to four sentences.**

Reviewed the first real drafts and found them too long for breaking news. Applied across all
four pink-cleats emails and baked into `.claude/skills/rfc-outreach/SKILL.md` as the default,
so the next story generates the short form without re-cutting.

Cut: the redundant "I'm on deadline today with a story about..." sentence; the "I'm seeking a
response on the record" paragraph; the "did not respond by press time" sentence; the offer to
share the passage for an accuracy check; the "Thank you," sign-off.

Compressed: the three-sentence thesis paragraph into one sentence, to fit the four-sentence cap
after the other cuts. The market-research point survives.

Result, per email:

```
Hello,

I'm Grace Thomas, a reporter with NYCity News Service.

The story examines a pattern: every major athletic brand released pink cleats timed to
the 2026 World Cup, and my reporting indicates they were working from similar market
research concluding that pink offers the highest visibility against the green of the pitch.

Nike released at least one pink cleat colorway timed to the tournament, which is why I'm
bringing these questions to you:

1. Why did Nike choose pink for the boots worn by players at the World Cup?
2. Why did Nike release pink cleats for consumers to purchase during this period?
3. Did Nike rely on market research indicating pink would have the highest on-pitch
   visibility, and if so, was that research conducted internally or by an outside firm?

My deadline is 4 ET today.
```

Verified after rebuild: four sentences plus three questions in all four emails; last line
correct in all four; zero hits for `Thank you`, `[YOUR NAME]`, `[YOUR PHONE]`, `press time`,
`on the record` or `happy to share`; signature reads Grace Thomas; Gmail compose URLs down from
~1,900 to ~1,050 characters; re-running adds no duplicate tracking rows.

## Housekeeping

- Project lives at `docs/submissions/Grace-Thomas/` in the workshop repo. Branch as of
  2026-08-25: `day-2-apps-script`, pushed and tracking `origin`. PR #23 is open against
  `AndrewRCalderon/2026-ai-news-innovation-workshop` -> `main`, 46 files, all inside this folder,
  mergeable, not yet merged.
- It was **copied**, not moved, from `~/082626_AI Workshop`, which is not a git repo. Both copies
  exist and can drift. The clone is canonical - edit there. They *did* drift on 2026-08-24: the
  four-sentence rewrite happened in the working copy only and ten files were re-synced after the
  fact. Checked again 2026-08-26 and the two are identical apart from a `NEXT-CHAT-PROMPT.md`
  that exists only in the copy.
- Day 2 moved from Claude Desktop's Code tab to VS Code + the Claude Code extension.
- Homebrew is at `/opt/homebrew`, added to `.zshrc` (backup: `~/.zshrc.bak-preblew`). `gh` is
  installed and authed as `graceathomas5`.
