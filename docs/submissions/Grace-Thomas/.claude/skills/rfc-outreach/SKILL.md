---
name: rfc-outreach
description: Generate request-for-comment emails for a breaking news story from BRIEF.md — research and verify each company's press contact, write an individual email per recipient with subject line and deadline, and output Gmail draft links, .eml files, and a tracking log. Never sends. Use when the user says "run the brief", "generate the outreach emails", "RFC these companies", or asks to draft requests for comment for a story.
---

# RFC outreach

Turn a filled-in `BRIEF.md` into per-recipient request-for-comment emails, ready to send but
never sent.

## Hard rules

1. **Never send anything.** No mail tools, no SMTP, no `mailto:` execution, no browser
   automation that clicks Send. This skill writes files. The reporter sends.
2. **Never invent an email address and present it as verified.** Every address carries a
   source URL and a confidence level. A guessed address is labeled `LOW` and says so.
3. **Never invent facts about a company** to make a paragraph land better. If the brief
   doesn't establish that a company did the thing, don't assert they did — ask.
4. **Never fabricate the reporter's identity.** If `config/profile.md` still has `TODO` in a
   field an email needs, stop and ask for it.

## Steps

### 1. Read the inputs

- `BRIEF.md` — the story
- `config/profile.md` — reporter name, outlet, phone, Gmail account index
- `config/signature.txt` — used in `.eml` files (Gmail adds its own)
- `contacts/press-contacts.csv` — previously confirmed contacts

If the brief is missing a **story summary**, **recipient list**, **the question**, or a
**deadline**, ask for just those. Everything else has a reasonable default. If `profile.md`
still contains `TODO`, ask for those values before writing any email.

### 2. Resolve the press contact for each company

For each company, in order:

1. **Cache hit.** If `contacts/press-contacts.csv` has a row for the company, use it. Note
   the `source_date` — if it's more than ~6 months old, re-verify.

2. **Grep the raw HTML. Do this first, before anything else.**

   **`WebFetch` is not sufficient on its own and must never be your only attempt.** It converts
   a page to plain text and **discards link targets**, so an address published as a `mailto:`
   link — which is how most companies publish one — is invisible to it. It also times out on
   sites that answer a plain `curl` instantly. Both failure modes have already produced a wrong
   contact in this project.

   Fetch the raw source and search it directly:

   ```bash
   UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0 Safari/537.36"
   curl -sL --max-time 45 -A "$UA" "<url>" -o /tmp/page.html
   grep -oE "mailto:[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+" /tmp/page.html | sort -u
   grep -oE "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]*<domain>[A-Za-z0-9.-]*" /tmp/page.html | sort -u
   ```

   Run **both** greps. The second catches addresses rendered as text or injected by JavaScript;
   the first catches the far more common `mailto:` case. Read what comes back — a page often
   lists investor relations, sustainability, and regional desks alongside the press inbox, and
   you want the press one.

   **Watch the domain.** `corporate.press@adidas.com` and `corporate.press@adidas-group.com`
   are different addresses, and a secondary source got that wrong here once. Take the domain
   from the page, character for character. Never normalize it to what looks right.

3. **Where to look.** Try these paths on the corporate site, not the retail one (Nike's is
   `about.nike.com`, not `nike.com`):

   `/company` · `/contact` · `/contact-us` · `/newsroom` · `/press` · `/media` ·
   `/media/media-contact` · `/news` · `/about` · `/imprint` (European companies)

   `/company` and `/contact` are listed **first on purpose** — Nike publishes its media address
   on `about.nike.com/en/company` and on neither `/newsroom` nor `/pages/contact-us`. Don't stop
   at the newsroom.

   Prefer a media-relations inbox over a named individual — individuals change jobs, inboxes get
   routed on deadline. Prefer the regional desk that matches the story (a global sports story
   usually wants global or North America comms, not local retail PR).

4. **Assign confidence honestly:**
   - `HIGH` — you fetched the company's own page and **saw the address in that page's source**.
   - `MEDIUM` — from a credible secondary source (a wire release, a recent news story, a trade
     masthead), or from the company's own site but not verified this run.
   - `LOW` — inferred from a naming pattern (`press@`, `media@`) without seeing it published.

   A search-engine summary quoting an address is `MEDIUM`, never `HIGH`, no matter how confident
   it sounds. Only reading the page yourself earns `HIGH`.

5. **If you can't find one, say so loudly.** Still write the email, set `to` to `""`, and set
   confidence to `""`. Then **flag it to the reporter as an issue, at the top of your report,
   named as a blocker** — not a footnote at the end of a table. List which companies need a
   manual lookup, which URLs you tried, and what each one returned (404, timeout, page had no
   address). Never guess an address to fill the gap, and never quietly drop a recipient.

Report contacts to the reporter as a table (company, address, source URL, confidence)
**before** moving on, so they can catch a wrong desk early. Say plainly which ones you read
off the page yourself and which came from somewhere else.

### 3. Write one email per recipient

Every email is individually written. Same core question, but the context paragraph names the
specific company and what the reporting shows about *them*. Substitute `{COMPANY}` throughout.

**Subject line.** It has to survive a PR inbox on deadline. Pattern:

> `<Outlet> query — <specific topic> — response requested by <deadline>`

e.g. `Semafor query — Nike's pink World Cup cleats — response by 4 p.m. ET today`

Not "Media inquiry" or "Quick question." Name the outlet, the subject, and the clock.

Keep the subject line **plain ASCII** — use a hyphen, not an em dash. Non-ASCII characters
get MIME-encoded into `=?utf-8?b?...?=` gibberish in the raw `.eml`, and they bloat the
Gmail compose URL. Em dashes in the body are fine.

**Body.** Plain text. **Four sentences, in this exact order.** Nothing else goes in.

1. **Greeting**, on its own line. `Hello,`
2. **Who you are.** `I'm <name>, a reporter with <outlet>.` Nothing else in this sentence.
3. **Why you're writing** — the specific, factual thing this company did, drawn from the
   brief's "What I already have" field. Plain statement of fact, no framing, no lead-in.
   `Nike released at least one pink cleat colorway timed to the World Cup.`
4. **What statement you need**, as prose. Begins `I am looking for a statement on` and runs
   the reporter's questions together as connected clauses. Never a numbered or bulleted list.
5. **The deadline**, after a blank line, alone on the last line. Nothing after it.
   `My deadline is 4 ET today.`

Sentences 2–4 sit in **one continuous paragraph** with no blank lines between them. Only the
deadline is separated.

**Do not write a thesis sentence.** There is no sentence explaining what the story is about,
what pattern it examines, or what the reporting indicates across the industry. Openers like
`The story examines a pattern:` or `My reporting indicates that…` are cut. Sentence 3 states
what *this company* did, and sentence 4 asks. That is the whole email.

**Do not editorialize the ask.** No `I'd like to understand the thinking behind it`, no
`which is why I'm bringing these questions to you`. Sentence 4 starts with the request.

Length follows from the structure — four sentences is the shape, not a word budget. If a
clause is needed for accuracy, keep it. **Accuracy outranks brevity**, and the build's length
warning never blocks or rewrites anything.

Example (Nike, pink cleats):

```
Hello,

I'm Grace Thomas, a reporter with Semafor. Nike released at least one pink cleat colorway
timed to the World Cup. I am looking for a statement on why the players wore pink cleats, why
a consumer release was timed to the same window, and whether Nike relied on market research
indicating pink would have the highest on-pitch visibility.

My deadline is 4 ET today.
```

The line wrapping above is display width only — the middle block is one paragraph. A correct
body has exactly two blank lines: after the greeting, and before the deadline.

**Do not include any of the following.** Each was deliberately cut. Do not add them back
because they seem helpful or standard:

- Any sign-off — no "Thank you," "Best," or "Sincerely." The Gmail signature is the close.
- The signature itself. The pipeline handles it: Gmail appends the reporter's real signature,
  and the `.eml` files embed `config/signature.txt`. Writing it into the body signs twice.
- "If I don't hear back, the story will note that X did not respond by press time."
- An offer to share the passage before publication for an accuracy check.
- A statement of terms ("on the record, attributed to a named spokesperson"). The reporter
  chose to leave terms out of the email and establish them in the reply thread.
- An offer to take a call, or a phone number.
- **Numbered or bulleted questions.** The questions run as prose inside the paragraph.
- **Blank lines between sentences.** The body above the deadline is one paragraph.
- **A thesis sentence.** No "The story examines…", no "my reporting indicates…". Sentence 3
  states what this company did; sentence 4 asks. Nothing explains the story at large.
- **Editorializing before the ask** — "I'd like to understand the thinking behind it",
  "which is why I'm bringing these questions to you". Sentence 4 opens with the request.
- Any sentence after the deadline line.

The `terms` field in the brief still gets recorded in `drafts.json` for the reporter's own
reference — it just doesn't appear in the email body.

**Tone.** Neutral, specific, plain. No flattery, no "I hope this finds you well," no implied
accusation. Respect the reader's time: they are also on deadline.

### 4. Write `drafts.json`

Create `outreach/<story-slug>/drafts.json`:

```json
{
  "story_slug": "pink-cleats-world-cup",
  "deadline": "today, Aug. 24, at 4:00 p.m. ET",
  "terms": "on the record, attributed to a named spokesperson",
  "generated": "2026-08-24",
  "from_email": "tkc.intern2@journalism.cuny.edu",
  "emails": [
    {
      "company": "Nike",
      "contact_name": "Nike Media Relations",
      "to": "nikemedia@nike.com",
      "cc": "",
      "source_url": "https://about.nike.com/en/newsroom",
      "source_date": "2026-08-24",
      "confidence": "HIGH",
      "subject": "...",
      "body": "..."
    }
  ]
}
```

Get today's date from the system rather than assuming it.

### 5. Build the outputs

```bash
python3 scripts/build_drafts.py outreach/<story-slug>/drafts.json
```

That writes `compose.html` (Gmail buttons), one `.eml` per contact, `REVIEW.md`, and
`tracking.csv`.

### 6. Update the contact record

`contacts/press-contacts.csv` is a living record, not an append-only log. For each company you
researched this run:

- **Not in the file** — add a row, if the contact is `HIGH` or `MEDIUM`.
- **In the file, and what you found differs** — **overwrite that row in place** with the new
  address, contact name, confidence, source URL, and today's date. Do not add a second row for
  the same company, and do not keep the old value. A confirmed `MEDIUM` becoming `HIGH` is an
  overwrite, not a new row.
- **In the file and unchanged** — leave it. Refresh `source_date` only if you actually
  re-verified it this run.
- **Older than roughly six months** — re-verify before using, then apply the rules above.

Never write a `LOW` address to this file at all. That's how a guess becomes permanent.

Note in your report to the reporter which rows you added and which you overwrote, and say what
changed on each overwrite.

### 7. Report back

Tell the reporter:

- the contact table with confidence levels
- which addresses they must confirm before sending
- the path to `compose.html` and how to open it
- anyone who needs a manual lookup

Then stop. Do not open the browser and start clicking.

## Follow-ups

If asked to chase non-responders, read `tracking.csv`, take the rows still marked
`awaiting`, and write short follow-ups referencing the original send time and restating the
deadline. Same pipeline, into `outreach/<slug>-followup/`.
