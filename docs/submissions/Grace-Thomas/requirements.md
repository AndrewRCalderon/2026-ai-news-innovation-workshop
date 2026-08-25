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

**The barrier is the code, not the scope.** Google publishes no Gmail scope that grants
draft-writing without also granting send. `gmail.compose` is documented as *"Manage drafts and
send emails,"* and the Gmail API accepts it for `users.messages.send`. The Gmail API path and
the Apps Script path request `gmail.compose` because it is the narrowest scope that can write a
draft at all — **not** because it is incapable of sending. An earlier version of this document
claimed it was. R1 holds because no send call exists anywhere in this project, and a standing
check greps for one.

### R1a — Every recipient gets a draft, whatever the route

A company is never dropped for being hard to reach. Each recipient is recorded with how they
can be contacted:

- **`email`** — a press address was found. Full pipeline.
- **`form`** — no address, but the company publishes a media contact form. The draft is written
  in full, the form URL is recorded and linked, and the body is offered as copy-paste text. A
  form is a normal answer, not a failure.
- **`none`** — neither found. The draft is still written, and it is reported as a **BLOCKER**
  naming what was tried.

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

1. **Greeting**, on its own line.
2. **Who you are:** `My name is <full name>, I'm a <title> with <outlet>.` Name, title and
   outlet come from the reporter profile.
3. **What you're requesting comment on:** `I am writing to request comment on <the news, in one
   clause>.` **This is breaking news — the company already knows what it announced.** The
   sentence identifies the event; it does not summarize it back to them, list the details, or
   recite a filing. Past roughly 25 words it is explaining rather than identifying.
4. **What statement you need:** `I am looking for a statement on <the asks, as prose>.` **Every
   ask ties to the news in sentence 3.** Background, history and prior incidents are context for
   the story, not for the request — if an ask would still make sense without the breaking news,
   it doesn't belong. Never a numbered or bulleted list.
5. **The deadline**, after a blank line, alone on the last line. Nothing after it.

Sentences 2–4 are one continuous paragraph. A correct body has exactly two blank lines: after
the greeting, and before the deadline.

**Readable in one pass.** Short clauses, plain words, no subordinate pile-ups. A comms person is
skimming on their own deadline; a sentence that has to be re-read gets rewritten.

**Recipients with different involvement get different sentences.** Two companies in one story
are rarely being asked the same thing.

**The deadline is never invented.** It comes from the brief. If the brief has no deadline, or
gives one without a time zone, **the system stops and asks** rather than assuming a default.

### R5 — Nothing gets added back

These were each cut deliberately. They do not return because they seem standard or helpful:

- Any sign-off — no "Thank you," "Best," "Sincerely." The signature is the close.
- The signature itself in the body. The pipeline supplies it (see R7).
- "If I don't hear back, the story will note that X did not respond by press time."
- An offer to share the passage before publication for an accuracy check.
- A statement of terms. The reporter establishes those in the reply thread.
- **Any phone number, anywhere** — in the body or the signature. RFC Bot does not put
  phone numbers in email. Not the reporter's, not the company's. See R7a.
- Numbered or bulleted questions.
- Any sentence after the deadline line.

### R6 — Subject lines

Exactly `<Outlet> request: <what the request is about>`. **No deadline in the subject** — it
lives in the body. Not "Media inquiry," not "Quick question."

Plain ASCII only — a hyphen, never an em dash. Non-ASCII gets MIME-encoded into
`=?utf-8?b?…?=` gibberish in the raw `.eml`.

### R7 — The signature is supplied once, never twice

Gmail compose links omit the signature from the body, because Gmail appends the reporter's real
configured signature. `.eml` files embed the stored signature, because nothing else will.

### R7a — No phone numbers

No phone number appears in any email this produces — not in a body, not in a signature, not as
an offer to take a call. `config/profile.md` has no phone field. The build warns if one turns
up in a body or in `config/signature.txt`.

A phone number found during contact research may be kept in the contact record's notes only if
the reporter asks for it; it never reaches an email.

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
- **Research escalates through three tiers, and stops at the first that works:** raw HTML via
  `curl`; then the text-conversion fetcher; then **a real browser**. Each defeats a failure the
  one above it can't. A 429, a 403, or a near-empty page means bot-blocking or a
  JavaScript-only site — neither is fixable with more request headers, and both yield to the
  browser. Reporting "no contact found" without reaching tier 3 is a false negative.
- **The raw page source is searched, not just its readable text.** Page-to-text conversion
  discards `mailto:` link targets, which is how most companies publish a press address — so a
  text-only read will report "no address on this page" for a page that plainly has one. It has
  already produced a wrong contact here. HIGH requires seeing the address in the page's own
  source.
- **The domain is taken character for character.** `@company.com` and `@company-group.com` are
  different addresses. A secondary source got exactly that wrong in this project.
- **A search-engine summary is MEDIUM, never HIGH**, however confident its wording.
- If no address can be found, the email is still written with an empty `to` and empty
  confidence, and **the build reports it as a BLOCKER** — named at the top of the report, not
  buried in a table — listing which URLs were tried and what each returned. A recipient is
  never silently dropped, and a gap is never filled with a guess.
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
