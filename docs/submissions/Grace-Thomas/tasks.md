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

### [ ] 2. Clear the `TODO` in `config/profile.md`

**Why:** the phone number is still a placeholder. It only affects the `.eml` signature now, so
it doesn't block a send — but a `TODO` shipping inside an email file is exactly the kind of
thing that gets noticed by the recipient.

**Done when:** `grep -r TODO config/` returns nothing.

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

### [x] 8. Confirm the two MEDIUM addresses — *attempted, both stay MEDIUM*

**Why:** Nike and Adidas are both MEDIUM. Adidas's media-contact page timed out on direct fetch;
Nike's address is cited in their own releases but the newsroom page wasn't read directly. Half
the list needing a human check is the thing that most erodes the time saved.

**Do:** re-fetch `about.nike.com/en/newsroom` and
`adidas-group.com/en/media/media-contact` directly. Promote to HIGH only if the address is
actually read on the company's own page. If a fetch fails again, the row stays MEDIUM and the
note says why — the remaining confirmation is a phone call, which is the reporter's to make.

**Done when:** both rows are HIGH with a source URL that can be opened and checked, or the row
explains exactly why it couldn't be promoted.

**Result 2026-08-25 — neither could be promoted. Both remain MEDIUM.** Nike's newsroom and
contact-us pages were fetched and read; neither publishes a media email, and the help directory
returned 403. The address is corroborated only by Nike's own verified X account and its press
releases. Adidas's media-contact and imprint pages timed out on direct fetch a second time, and
news.adidas.com publishes a form rather than an address. **A conflict also surfaced:** secondary
sources give both `corporate.press@adidas.com` and `corporate.press@adidas-group.com`. That is
unresolved and must not be guessed. For both companies the remaining confirmation is a phone
call — Nike 212-367-4447, adidas +49 9132 84-2352 — which is the reporter's to make.

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

### [ ] 11. Run a second, unrelated story end to end

**Why:** the single biggest risk in the project. Everything works on one story that the system
was built alongside. Whether it generalizes or is quietly shaped around pink cleats is currently
an assumption, not a finding.

**Do:** pick a story with a different beat and a different shape of recipient — ideally not four
peer competitors. Fill in the brief, run it, use nothing but what a stranger would have.

**Done when:** a full `outreach/<new-slug>/` exists, and every place the skill assumed something
cleats-specific has been written down.

### [ ] 12. Fix what task 11 exposes, then re-run pink cleats

**Why:** a generalization fix that breaks the known-good case isn't a fix.

**Done when:** `SKILL.md` is updated and the cleats output still passes task 6's checks.

### [ ] 13. Exercise the follow-up path

**Why:** requirements R11. It's written and has never been run.

**Do:** mark statuses in a tracking log, ask for chasers for the non-responders.

**Done when:** `outreach/<slug>-followup/` exists with correct original-send times and a
restated deadline, and the non-responders are the right ones.

---

## Standing checks — true after every task

- Nothing was sent. No SMTP, no send scope, no automation that clicked Send.
- Every address in every output traces to a source URL that can be opened.
- No LOW address appears in `contacts/press-contacts.csv`.
- Re-running a brief produces identical output and no duplicate tracking rows.
- `grep -r TODO config/` is empty.
- No credential is written to a file `.gitignore` doesn't cover.
- The clone and `~/082626_AI Workshop` are in sync.
