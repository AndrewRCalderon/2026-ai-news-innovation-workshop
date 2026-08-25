# Tasks — RFC Bot

Ordered by risk, hardest assumption first. Each task is small enough that "is this done?" has a
one-line answer. Behavior is defined in [requirements.md](requirements.md); the pieces are in
[architecture.md](architecture.md).

Work in the git clone, then sync to `~/082626_AI Workshop`. Check boxes as they land.

Last revised 2026-08-25.

---

## Phase 1 — Stop lying about state

### [x] 1. Mark pink cleats as a fixture

**Why:** `outreach/pink-cleats-world-cup/tracking.csv` has four rows reading `not sent` against
a deadline of Aug. 24, 2026, 4:00 p.m. ET — which has passed. Nothing in the file says whether
that's real outreach that never went out or test data. The tracking log's whole purpose is to be
a record you'd stand behind, so an ambiguous one is worse than none.

**Decision made 2026-08-25: it is a demo, not a live story.**

**Do:** mark it as a fixture in `BRIEF.md` and in the tracking log's status column, in a way a
stranger reading the folder in three weeks cannot misread.

**Done when:** no file in `outreach/pink-cleats-world-cup/` can be read as pending real
outreach.

### [x] 2. Clear the `TODO` in `config/profile.md` — *resolved by removing the field*

**Why:** the phone number is still a placeholder. It only affects the `.eml` signature now, so
it doesn't block a send — but a `TODO` shipping inside an email file is exactly the kind of
thing that gets noticed by the recipient.

**Done when:** `grep -r TODO config/` returns nothing.

**Resolved 2026-08-25 by deletion.** The reporter decided RFC Bot should never put a phone
number in an email or signature (requirements R7a), so the field was removed rather than
filled. The build now warns if a phone number appears in a body or in `config/signature.txt`.

---

## Phase 2 — Fix the format before testing generalization

Order matters: these change what the bot produces, so they land before the second story, so the
second story exercises the final format.

### [x] 3. Replace the four-sentence cap with a guideline

**Why:** "Four sentences maximum" in `SKILL.md:76` is over-specified. The real rule is no
padding, which is judgment, not arithmetic. A story that needs one more clause to be accurate
should get it.

**Do:** rewrite the body rules in `.claude/skills/rfc-outreach/SKILL.md` per requirements R4.
`CLAUDE.md` needs no change — it already says "Short. If a sentence isn't working, cut it,"
which is the correct version. Update the PLAN.md decision record so the old rule isn't
reinstated later from history.

**Done when:** no file states a fixed sentence count as a rule, and `SKILL.md` states the
guideline plus "accuracy outranks brevity."

### [x] 4. Switch questions from a numbered list to prose

**Why:** requirements R4. Touches four places: the rule at `SKILL.md:76` and `:86`, the worked
example in `SKILL.md`, the instruction to the reporter at `BRIEF.md:29`, and the decision record
in `PLAN.md`.

**Do:** questions render as connected clauses inside the body paragraph. The `BRIEF.md` question
field also becomes a prose field — the reporter no longer enters a numbered list. Add "numbered
or bulleted questions" to the do-not-add-back list in `SKILL.md`.

**Done when:** the worked example in `SKILL.md` contains no numbered list, `BRIEF.md` asks for
prose, and the do-not-add-back list names it.

### [x] 5. One paragraph, deadline on its own line

**Why:** requirements R4. The current format puts a blank line between every sentence, which
reads as a list of fragments. The deadline stays separate because it's the line that most needs
to survive a skim.

**Do:** greeting on its own line; everything else as one continuous paragraph; deadline alone on
the last line, nothing after it.

**Done when:** a generated `.eml` body has exactly two blank lines — after the greeting, and
before the deadline.

### [x] 6. Regenerate the pink-cleats emails in the new format

**Why:** proves tasks 3–5 work on input whose correct output is already known, before betting a
new story on them.

**Done when:** all four emails are one paragraph with prose questions, the deadline is the last
line in all four, `grep` finds zero hits for `Thank you`, `[YOUR NAME]`, `[YOUR PHONE]`, `press
time`, `on the record`, `happy to share`, or a line starting with `1.`, and re-running adds no
duplicate tracking rows.

---

## Phase 3 — Make the contact record actually a record

### [x] 7. Upsert the contact record instead of appending

**Why:** requirements R9. `SKILL.md` step 6 currently only adds a company that isn't already in
`contacts/press-contacts.csv`. If an address changes, or a MEDIUM is confirmed to HIGH, the
saved row stays frozen at whatever was written the first time.

**Do:** on each run, for each company — add if absent; if present and what was found differs,
**overwrite the row in place** with the new address, confidence, source URL, and today's date;
if present and unchanged, refresh the source date only if it was re-verified. Old values are not
retained. LOW is still never written.

**Done when:** deliberately changing a saved address, re-running, and finding the row updated
rather than duplicated — and a LOW result still never reaches the file.

### [x] 8. Confirm the two MEDIUM addresses — *both now HIGH; one was wrong*

**Why:** Nike and Adidas are both MEDIUM. Adidas's media-contact page timed out on direct fetch;
Nike's address is cited in their own releases but the newsroom page wasn't read directly. Half
the list needing a human check is the thing that most erodes the time saved.

**Do:** re-fetch `about.nike.com/en/newsroom` and
`adidas-group.com/en/media/media-contact` directly. Promote to HIGH only if the address is
actually read on the company's own page. If a fetch fails again, the row stays MEDIUM and the
note says why — the remaining confirmation is a phone call, which is the reporter's to make.

**Done when:** both rows are HIGH with a source URL that can be opened and checked, or the row
explains exactly why it couldn't be promoted.

**Superseded — see below. Both are now HIGH.**

~~**Result 2026-08-25 — neither could be promoted. Both remain MEDIUM.**~~ Nike's newsroom and
contact-us pages were fetched and read; neither publishes a media email, and the help directory
returned 403. The address is corroborated only by Nike's own verified X account and its press
releases. Adidas's media-contact and imprint pages timed out on direct fetch a second time, and
news.adidas.com publishes a form rather than an address. **A conflict also surfaced:** secondary
sources give both `corporate.press@adidas.com` and `corporate.press@adidas-group.com`. That is
unresolved and must not be guessed.~~

**Corrected 2026-08-25, same day.** The reporter found both addresses by hand and asked why the
bot couldn't. Cause: the page-fetch tool converts HTML to plain text and **discards `mailto:`
link targets**, which is exactly how both companies publish their press address — so it
truthfully reported "no address on this page" for pages that have one. It had also never tried
`about.nike.com/en/company`, since the skill's URL list started at `/newsroom`.

Fetching the raw HTML with `curl` and grepping for `mailto:` found both immediately, including
through the adidas timeout. **Nike `media.relations@nike.com` and adidas
`corporate.press@adidas-group.com` are both now HIGH, read from the page source.** The adidas
address was also **wrong in the saved record** — it had `@adidas.com`, not `@adidas-group.com`.

The fix is in the skill, not just the two rows: raw-HTML grep is now the primary research
method, `/company` and `/contact` lead the URL list, and the domain must be copied character
for character.

---

## Phase 4 — Guardrails that outlive attention

### [x] 9. Add a warning-only length check to `build_drafts.py`

**Why:** with the hard cap gone, drift back toward long emails is invisible over months. A
warning catches it without overriding judgment.

**Do:** warn on a body over roughly 150 words. **Warning only — never blocks, never truncates.**

**Done when:** an over-length draft prints a warning and still builds completely.

### [x] 10. Add a format check for the do-not-add-back list

**Why:** those items are currently caught by reading. Reading stops happening.

**Do:** check for sign-offs, an embedded signature, "press time," an accuracy-check offer, a
statement of terms, a phone offer, numbered questions, and any text after the deadline line.
Warning-level, consistent with task 9.

**Done when:** a draft containing a `Thank you,` sign-off triggers a warning naming the rule it
broke.

---

## Phase 5 — The real test

### [x] 11. Run a second, unrelated story end to end

**Why:** the single biggest risk in the project. Everything works on one story that the system
was built alongside. Whether it generalizes or is quietly shaped around pink cleats is currently
an assumption, not a finding.

**Do:** pick a story with a different beat and a different shape of recipient — ideally not four
peer competitors. Fill in the brief, run it, use nothing but what a stranger would have.

**Done when:** a full `outreach/<new-slug>/` exists, and every place the skill assumed something
cleats-specific has been written down.

**Run 2026-08-25: `kalshi-flight-cancellation-markets`.** A real NBC News story the reporter
published on 2026-07-15, re-run as if the outreach hadn't happened yet. Two recipients, not four
peer competitors, and each needed a *different* factual sentence 3 rather than one templated
line with the name swapped.

What it exposed:

1. **Subject-header folding bug.** The Polymarket subject was long enough that the `.eml` writer
   broke the header immediately after `Subject:`, leaving the line starting with whitespace —
   which some clients render as a leading space in the subject. Never surfaced on cleats because
   those subjects were shorter. Fixed in `write_eml` by raising the policy line limit; subjects
   are ASCII by rule, so nothing needs encoding. Verified across all six drafts.
2. **A site can block the research method entirely.** `kalshi.com` returns HTTP 429 to
   automated requests on every path tried, and to `WebFetch` too. The address came from a
   Kalshi-issued press release via MLB, so it is MEDIUM, not HIGH. The skill handled this
   correctly — it labeled honestly rather than guessing — but "the company's own site refuses
   to be read" is a case worth naming explicitly in the skill.
3. **`{COMPANY}` substitution doesn't fit every brief.** Two recipients with genuinely different
   involvement need per-company facts, which the brief's "What I already have" field handled by
   being written per company. Worth documenting as the expected pattern.

### [x] 12. Fix what task 11 exposes, then re-run pink cleats

**Why:** a generalization fix that breaks the known-good case isn't a fix.

**Done when:** `SKILL.md` is updated and the cleats output still passes task 6's checks.

**Round 2, 2026-08-25.** Reporter review of the Kalshi drafts drove a second set of changes:

- **Browser tier added to contact research.** `kalshi.com` 429s every `curl` and `WebFetch`
  request even with a full browser header set — but the real browser loaded `/about` and found
  `media@kalshi.com` on the first try. Kalshi is now HIGH. Research is a three-tier escalation:
  curl → fetcher → browser, and 429/403/empty-page means go to tier 3, not give up.
- **Contact forms are a supported route** (R1a). `contact_method` is `email`, `form`, or
  `none`; a form-only company still gets a full draft plus a link to the form and copy-paste
  text. Verified with a synthetic two-company fixture.
- **Subject is now `<Outlet> request: <topic>`** with no deadline in it.
- **Sentence 2 is `My name is X, I'm a <title> with <outlet>.`**
- **Sentence 3 is one clause.** The old version briefed companies on their own announcement.
  Breaking news means they already know; the sentence identifies the event and stops.
- **Asks must tie to the news.** The first Polymarket draft led with the Charles de Gaulle
  trade, which is story context, not what was being asked. Cut.
- **Deadlines are never defaulted.** No more assuming 4 p.m. today — if the brief doesn't say,
  ask.

### [ ] 13. Exercise the follow-up path — **PAUSED 2026-08-25, scope in question**

**Why:** requirements R11. It's written and has never been run.

**Do:** mark statuses in a tracking log, ask for chasers for the non-responders.

**Done when:** `outreach/<slug>-followup/` exists with correct original-send times and a
restated deadline, and the non-responders are the right ones.

**Paused 2026-08-25 — this may not belong in the product.** The reporter's point: RFC Bot is
for **day-of, breaking-news turnarounds**. The story files at 4 p.m. A chaser that lands the
next morning has nothing to chase — by then the piece has already run with "did not respond by
press time." The follow-up path was designed for a multi-day reporting rhythm this tool doesn't
serve.

**Decide before building:** is the follow-up feature in scope at all? If it stays, it probably
means *same-day* chasers measured in hours, not days, which is a different feature from what
`SKILL.md` currently describes.

**Recommendation, 2026-08-25: drop it from scope and say so in `requirements.md`.** The tool
is for day-of turnarounds; a chaser that lands tomorrow morning has nothing to chase. Cutting a
feature that was never run costs nothing and removes a section of `SKILL.md` that would
otherwise rot. **This needs the reporter's yes before R11 is deleted.** Until then it stays
here, unbuilt.

If it does stay, four things are still undefined:

1. **Sentence 2.** `My name is X, I'm a <title> with <outlet>.` is wrong on a second email —
   they already have it.
2. **The deadline.** A follow-up usually means the original is close or blown. Restate, or
   require a new one in the brief?
3. **The subject.** Reuse the original so it reads as one conversation, or prefix
   `Following up:`? Note a Gmail compose link cannot attach to an existing thread — it arrives
   as a new message either way.
4. **Does it write back to `tracking.csv`?** Log that a chaser went out, or keep the log as a
   record of the first ask only?

---

## Phase 6 — Get it into Google

Everything so far produces files on a laptop. The reporter works in Gmail and Google Docs. This
phase moves the output into the tools the work actually happens in.

### [x] 14. Correct the `gmail.compose` claim

**Why:** `requirements.md` R1, `architecture.md` and `scripts/gmail_drafts.py` all stated that
`gmail.compose` is "technically incapable of sending," and R1 leaned on it as an architectural
guarantee. **It is false.** Google's scope table documents `gmail.compose` as *"Manage drafts
and send emails,"* and `users.messages.send` lists it as an accepted scope. There is no Gmail
scope that writes drafts without permitting send.

Caught while checking the scope for task 15, before building the Apps Script path on the same
false premise.

**Done when:** all three files say the barrier is the absence of a send call in the code, and a
standing check greps for one.

**Done 2026-08-25.**

### [ ] 15. Apps Script that writes RFC drafts into Gmail

**Why:** `compose.html` opens a pre-filled compose window, which is fine but transient — close
the tab and it's gone. A real Gmail draft survives, syncs to phone, and is what a reporter
actually expects. `gmail_drafts.py` already does this, but it needs a Google Cloud project, an
OAuth consent screen and two `pip` installs. Apps Script needs none of that.

**Do:** an Apps Script project **bound to a Google Doc**, not standalone — Phase 7 puts a
sidebar in that same doc, and binding now means one project, one authorization, one setup, done
once. It reads a `drafts.json` payload and creates one Gmail draft per recipient via the
**advanced Gmail service** with explicit `oauthScopes` in the manifest, so the requested
permission is the narrowest that can write a draft rather than whatever Apps Script
auto-detects. `GmailApp` is not used: its methods pull `https://mail.google.com/`, which is
full-mailbox access including permanent delete.

Skips any recipient with an empty `to` (a `form` or `none` route, per R1a) and says which.

**Done when:** pasting a real `drafts.json` produces one correctly formatted Gmail draft per
`email` recipient, in the right account, with the signature appearing exactly once.

### [ ] 16. Test mode, locked to a dummy address

**Why:** the pipeline can't be tested end to end without a real send, and a real send during
testing must be impossible to aim at a press desk by accident. The mistake this prevents is
mundane and fatal: testing with the real `drafts.json` still loaded.

**Do:** a `TEST_MODE` flag in the script config. When on, **every** recipient is rewritten to
the configured dummy address, `Cc` is dropped, the subject is prefixed `[TEST]`, and the real
intended recipient is preserved in an `X-RFC-Bot-Test-Original-To` header. **The body is left
byte-identical** — the point is to review the exact text that would go out. When off, the
sidebar requires an explicit confirmation that these are real press addresses.

The dummy address is `tkc.intern2@journalism.cuny.edu` — the reporter's own, so a test lands in
the same inbox it was drafted from.

**The script still never sends.** The test send is the reporter opening the `[TEST]` draft and
pressing Send to themselves, which is also the only honest way to see what Gmail does to the
formatting on the way out.

**Done when:** running with `TEST_MODE = true` against the Kalshi `drafts.json` produces two
drafts both addressed to the dummy address and none addressed to Kalshi or Polymarket, and
the standing send check comes back clean.

### [x] 21. Make the send check automatic

**Why:** task 14 established that R1 rests on nothing but the absence of a send call in the
code — Google does not enforce it. A guarantee that depends on someone remembering to run a
search is not much of a guarantee, and the thing most likely to break it is a future session
adding a send call in good faith.

**Do:** a committed pre-commit hook that searches **staged** code under `scripts/` and
`apps-script/` and refuses the commit on `.send(`, `smtplib`, `sendmail`, or a Gmail scope
wider than `gmail.compose`. Warns without blocking on `TEST_MODE = false`, which is a
legitimate state during real outreach.

It lives in `.githooks/` and is committed, not dropped in `.git/hooks/` — anything in there is
invisible to git, wouldn't appear in a PR, and wouldn't survive a fresh clone. Installed with
`git config core.hooksPath`.

Scoped to code, and markdown is skipped: `tasks.md` and `apps-script/README.md` both quote the
pattern in prose. **The hook refused its own first commit over exactly this**, which is how the
markdown exclusion got written. It excludes `.md` rather than allow-listing code extensions, so
a new kind of code file is checked by default instead of silently skipped.

**`--no-verify` still skips it.** It's a tripwire, not a wall. Recorded plainly rather than
overclaimed, since overclaiming this exact guarantee is what task 14 had to correct.

**Done when:** a staged send call is refused with the file and line named, a widened scope is
refused, and a docs-only commit still goes through.

**Done 2026-08-25.** All three verified by running them.

### [ ] 17. Google Contacts sync — **decision needed first**

**Why:** `contacts/press-contacts.csv` is invisible from Gmail. Pushing it into Google Contacts
would make press desks autocomplete in the compose window.

**Decide before building:** Contacts has no field for `confidence` or `source_url`, and both are
load-bearing (R8). A two-way sync could also let an unlabeled address flow back into the CSV as
though it were verified, which is exactly what R8 and R9 exist to prevent.

Recommended shape: **one-way, CSV → Contacts**, into a single labeled group, with confidence,
source URL and source date written into the contact's notes field so they travel with the
record. The CSV stays canonical. Nothing reads back.

**Done when:** decided, then built to whatever was decided.

---

## Phase 7 — Start from the draft, not from a form

### [x] 18. Decide where the judgment lives — **decided: hand off, don't think**

**Why:** the real workflow is a reporter part-way through a story in Google Docs, asking for the
outreach while the draft is still moving. That changes the input from "a form you fill in" to
"a document that isn't finished," which is a different product.

**Decide:** does the Docs sidebar (a) extract the draft and hand off to the `rfc-outreach`
skill, which keeps every judgment rule in `SKILL.md` where it can be argued with; or (b) call
the Anthropic API directly from Apps Script, which duplicates all of `SKILL.md` into a prompt
and guarantees the two drift apart; or (c) call the API but read the prompt from a synced copy
of `SKILL.md`, keeping one source of truth at the cost of a Drive dependency and an API key.

**Done when:** the decision and its reasoning are in `architecture.md`.

**Decided 2026-08-25: (a), the handoff.** `apps-script/Doc.gs` reads the body of the bound Doc;
the sidebar's step 1 shows it with a Copy button and a header saying it is an unverified draft in
progress. Claude Code does the research and the writing; step 2 takes the resulting
`drafts.json` back.

(b) and (c) both meant calling the Claude API from Apps Script. Rejected on three counts, the
third decisive: a copy of the rules drifting inside a prompt string, a paid key at roughly a dime
a run, and **no browser tier for contact research** — `kalshi.com` 429s everything below it, and
that tier is the only reason `media@kalshi.com` was ever found. Reasoning is in
`architecture.md`.

Cost taken knowingly: two pastes instead of none.

**What the first real draft showed:** the recipient list was already written in it, as the
reporter's own inline notes — "Kalshi statement on this", "Polymarket comment on Kalshi's
proposal or on its own approach." A scanner doesn't have to work out who to contact. It has to
notice the placeholders.

### [ ] 19. R13 — a claim pulled from an unfinished draft is not a verified claim

**Why:** `CLAUDE.md` already says to flag when the reporter is the one asserting something
unverified and it's about to go to a third party in writing. Scanning a live draft makes that
the *normal* case rather than the exception: half-written sentences, placeholder figures and
notes-to-self all look like assertions to a scanner, and sentence 3 of every email is exactly
where one would land.

**Do:** anything lifted out of the draft is shown back with the source sentence quoted and
confirmed before it reaches an email. Write it into `requirements.md` as R13.

**Reshaped by task 18's outcome.** With the handoff design, this confirmation happens in
conversation with Claude rather than in the sidebar — which is a stronger place for it, since
Claude can quote the line and say what it read versus inferred. What the sidebar does carry is
the header on the copied text: *"In-progress draft. Nothing in it is verified."* That is the
lightweight half. R13 itself is still unwritten.

**Done when:** R13 exists, and no scanned claim can reach a draft body unconfirmed.

---

## Phase 8 — More than one reporter

### [ ] 20. Split the rules into invariant and voice

**Why:** the format rules currently mix two different kinds of thing. Some are what make the
tool safe — the four-part structure (R4), the honest confidence labels (R8), never inventing a
deadline. Others are one reporter's taste: no sign-offs, the signature as the close, how the
deadline is phrased. A second reporter will disagree with the second set and should be able to,
without touching the first.

**Do:** move voice into `config/profiles/<name>.md`, alongside two or three of that reporter's
own real sent RFCs as examples. Invariants stay in `SKILL.md` and `requirements.md`.

**Done when:** a second profile with a visibly different voice produces emails in that voice
with the R4 structure intact — and it is written down which of R5's items turned out to be
rules and which turned out to be preferences.

---

## Standing checks — true after every task

- **Nothing was sent, and nothing can send.** Enforced automatically by `.githooks/pre-commit` on every commit (task 21); by hand it's `grep -rnE --include='*.gs' --include='*.py' --include='*.html' --include='*.json' "\.send\(|smtplib|sendmail" scripts/ apps-script/`, which should return nothing. The `--include` filters match the hook, which skips markdown -- `apps-script/README.md` documents the pattern in prose, so a check without them reports a hit every time and stops being read. Matching on the open paren so that comments *explaining* the rule don't trip it. The scope does not stop a send; only this check does. See task 14.
- Every address in every output traces to a source URL that can be opened.
- No LOW address appears in `contacts/press-contacts.csv`.
- Re-running a brief produces identical output and no duplicate tracking rows.
- `grep -r TODO config/` is empty.
- No credential is written to a file `.gitignore` doesn't cover.
- The clone and `~/082626_AI Workshop` are in sync.
