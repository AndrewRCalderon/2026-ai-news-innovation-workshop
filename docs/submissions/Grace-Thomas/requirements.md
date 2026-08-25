# Requirements — RFC Bot

What this has to do, described as behavior. Implementation lives in
[architecture.md](architecture.md); the order of work lives in [tasks.md](tasks.md).

Last revised 2026-08-25.

## The job

On a breaking story, the request for comment is the step that gets rushed. Finding each
company's press contact, confirming it's current, writing a real email per recipient, and
keeping a record of who was asked and when is 30–45 minutes of work in the same hour the story
is being written — so it gets compressed into a generic blast, or skipped.

RFC Bot automates the research and the drafting. It does not automate the sending or the
judgment. The reporter reads every draft and presses Send.

## Behavior

### R1 — Never sends

No SMTP, no mail-sending tool, no browser automation that clicks Send, no `mailto:` execution.
The system writes files. A human sends. This is not configurable.

The optional Gmail API path may only ever request the `gmail.compose` scope, which is
technically incapable of sending.

### R2 — One story in, one send-ready package out

Given a filled-in brief, produce for that story:

- a set of pre-filled Gmail compose links, one per recipient, that open a draft in the
  reporter's own account
- the same emails as `.eml` files, for anyone not on Gmail
- **one file containing every email for that story, in reading order**, so the reporter can
  read the whole round in one scroll instead of opening each draft separately
- a tracking log recording who was asked, at what address, with what confidence, when it was
  drafted, and against what deadline
- a structured source file the reporter can hand-edit and rebuild from without re-running the
  research

### R3 — Every email is individually written

Not a template with the company name swapped in. The paragraph about what the reporting shows
names *that company* and the specific claim being put to *them*. A recipient should be able to
tell the email was written to them.

### R4 — Email format

Plain text. **Four sentences, in this exact order**, and nothing else:

1. **Greeting**, on its own line. `Hello,`
2. **Who you are.** Name and outlet. Nothing else in the sentence.
3. **Why you're writing** — a plain statement of the specific factual thing *this company*
   did, from the brief's "What I already have" field. No framing, no lead-in.
4. **What statement you need**, opening `I am looking for a statement on` and running the
   reporter's questions together **as prose**. Never a numbered or bulleted list.
5. **The deadline**, after a blank line, alone on the last line. Nothing after it.

Sentences 2–4 are one continuous paragraph with no blank lines between them. A correct body
has exactly two blank lines: after the greeting, and before the deadline.

**There is no thesis sentence.** Nothing explains what the story is about at large, what
pattern it examines, or what the reporting shows across an industry. Sentence 3 states what
this company did; sentence 4 asks. A recipient learns the story from the question they're
being asked, not from a summary of it.

**Nothing editorializes before the ask.** No "I'd like to understand the thinking behind it,"
no "which is why I'm bringing these questions to you." Sentence 4 opens with the request.

Length follows from the structure rather than a word budget. If a clause is needed for
accuracy, it stays — **accuracy outranks brevity**, and the length warning (R9a) never blocks
or rewrites a draft.

### R5 — Nothing gets added back

These were each cut deliberately. They do not return because they seem standard or helpful:

- Any sign-off — no "Thank you," "Best," "Sincerely." The signature is the close.
- The signature itself in the body. The pipeline supplies it (see R7).
- "If I don't hear back, the story will note that X did not respond by press time."
- An offer to share the passage before publication for an accuracy check.
- A statement of terms. The reporter establishes those in the reply thread.
- An offer to take a call, or a phone number.
- Numbered or bulleted questions.
- Any sentence after the deadline line.

### R6 — Subject lines survive a PR inbox

Name the outlet, the specific topic, and the clock. Not "Media inquiry."

Plain ASCII only — a hyphen, never an em dash. Non-ASCII gets MIME-encoded into
`=?utf-8?b?…?=` gibberish in the raw `.eml` and inflates the Gmail compose URL. Em dashes in
the body are fine.

### R7 — The signature is supplied once, never twice

Gmail compose links omit the signature from the body, because Gmail appends the reporter's real
configured signature. `.eml` files embed the stored signature, because nothing else will.

### R8 — Contacts are researched honestly, and never invented

Every address carries a source URL, the date it was sourced, and a confidence label:

- **HIGH** — printed on the company's own newsroom or press-kit page, and that page was
  actually fetched and read.
- **MEDIUM** — from a credible secondary source, or from the company's own site but not
  verified on this run.
- **LOW** — inferred from a naming pattern like `press@` without seeing it published.

Rules that follow from this:

- A guessed address is labeled LOW and says so. It is never presented as verified.
- Anything below HIGH is named to the reporter as needing confirmation before send.
- If no address can be found, the email is still written with an empty `to`, and the company is
  reported as needing a manual lookup. A recipient is never silently dropped.
- LOW addresses are never written to the contact record. A guess must not harden into a record.

### R9 — The contact record stays current

A single ongoing record of press contacts persists across stories: company, contact name,
address, region, source URL, source date, confidence, notes.

On every run, for each company researched:

- **Not in the record** → add it, if HIGH or MEDIUM.
- **In the record, and what was just found differs** → **overwrite that row in place** with the
  new address, confidence, source URL, and today's date. The old value is not retained.
- **In the record and unchanged** → leave it, but refresh the source date if it was re-verified.

A row older than roughly six months is re-verified rather than trusted.

### R10 — Re-running is safe

Running the same brief twice produces the same output and does not duplicate tracking rows. The
reporter can edit the structured source file and rebuild without re-running the research.

### R11 — Follow-ups

Given a tracking log with statuses marked, produce short chasers to everyone still marked
awaiting, referencing when the original was sent and restating the deadline. Same pipeline,
separate output folder. R1 still applies.

### R12 — It says what it doesn't know

Distinguish "I fetched this page and it says X" from "a search result said X" from "companies
usually format addresses this way." Never sound more certain than the evidence.

If the brief asserts something unverified and that assertion is about to be put to a company in
writing, say so before writing it.

## Out of scope

Not "later" — deliberately not part of this.

- **Sending.** See R1.
- **Verifying the story's premise.** Whatever the reporter puts in the brief gets put to a
  comms team in writing. The reporting has to stand on its own before a send. The bot does not
  fact-check the brief, and does not pretend to.
- **Non-Gmail-first workflows** beyond the `.eml` fallback. Outlook users get a worse
  experience. Accepted for now.
- **Contact scraping at scale.** Contacts are resolved per story, for named companies in a
  brief. This is not a media-database builder.
- **Reading or acting on replies.** Statuses in the tracking log are updated by the reporter.
- **Any judgment about whether a story is worth doing, or whether a question is fair.**
