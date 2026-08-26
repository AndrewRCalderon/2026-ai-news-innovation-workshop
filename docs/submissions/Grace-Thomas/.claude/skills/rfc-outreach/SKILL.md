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

### 2. Resolve how to reach each company

The goal is **a usable route to a comms desk for every recipient** — not necessarily an email
address. A company with only a media contact form still gets a full draft. Nobody is dropped
and nothing is guessed.

**1. Cache hit.** If `contacts/press-contacts.csv` has a row, use it. Re-verify if
`source_date` is more than ~6 months old.

**2. Otherwise escalate through three tiers. Stop at the first that works.**

Each tier defeats a failure the tier above it can't. Do not skip to tier 3, and do not stop at
tier 1 just because it returned *something*.

> **Tier 1 — `curl` the raw HTML.** Fast, and it sees `mailto:` links, which is how most
> companies publish an address.
>
> ```bash
> UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0 Safari/537.36"
> curl -sL --max-time 30 -A "$UA" "<url>" -o /tmp/page.html -w "%{http_code}\n"
> grep -ohiE "mailto:[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+" /tmp/page.html | sort -u
> grep -ohiE "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]*<domain>[A-Za-z0-9.-]*" /tmp/page.html | sort -u
> ```
>
> **Tier 2 — `WebFetch`.** Different network path, so it sometimes succeeds where curl is
> blocked. **It converts pages to plain text and discards link targets, so it cannot see a
> `mailto:` address.** Useful for reading what a page *says*; never sufficient on its own.
>
> **Tier 3 — the real browser.** Use when tiers 1 and 2 both fail, and specifically whenever
> you see **HTTP 429, 403, or a near-empty page**. Those mean bot-blocking or a JavaScript-only
> site, and no amount of extra `curl` headers will fix either — that has already been tried
> here and does not work. A real browser executes the page's JavaScript and passes the bot
> check.
>
> ```
> mcp__Claude_Browser__preview_start  { url: "<url>" }
> ```
> then run this in the page — it returns addresses **and** contact forms in one pass:
> ```js
> (() => {
>   const html = document.documentElement.outerHTML;
>   const mailtos = [...new Set([...html.matchAll(/mailto:([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+)/g)].map(m => m[1]))];
>   const plain = [...new Set([...document.body.innerText.matchAll(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g)].map(m => m[0]))];
>   const forms = [...document.querySelectorAll('form')].map(f => f.action || '(no action)');
>   return JSON.stringify({url: location.href, title: document.title, mailtos, plain, forms}, null, 1);
> })()
> ```
>
> **This is not optional when the first two tiers fail.** `kalshi.com` returns 429 to every
> `curl` and to `WebFetch` on every path, with or without full browser headers. The browser
> loaded `kalshi.com/about` and found `media@kalshi.com` immediately. Reporting "no contact
> found" without trying tier 3 is a false negative, not an honest one.

**3. Where to look.** Corporate site, not the retail one (Nike's is `about.nike.com`):

`/about` · `/company` · `/contact` · `/contact-us` · `/newsroom` · `/press` · `/media` ·
`/media/media-contact` · `/news` · `/imprint` (European companies) · `/tos` and `/terms`
(footers and legal pages often carry the press inbox when no press page does)

`/about` and `/company` lead the list on purpose. Nike publishes on `about.nike.com/en/company`
and Kalshi on `kalshi.com/about` — **neither on its newsroom or press page.** Don't stop at the
obvious path.

Prefer a media-relations inbox over a named individual — individuals change jobs, inboxes get
routed on deadline. Prefer the desk that matches the story.

**4. Watch the domain.** `corporate.press@adidas.com` and `corporate.press@adidas-group.com`
are different addresses, and a secondary source got that wrong here once. Copy it from the page
character for character. Never normalize it to what looks right.

**5. Record how the company can be reached** as `contact_method`:

| `contact_method` | Meaning | What gets built |
|---|---|---|
| `email` | A press address was found | Full pipeline: Gmail button, `.eml`, everything |
| `form` | No address, but the company publishes a media/press contact form | Draft is still written in full. `to` is empty, `form_url` is set. `compose.html` links the form and shows the body as copy-paste text. Flagged as needing manual submission. |
| `none` | Neither could be found | Draft still written, `to` empty, reported as a **BLOCKER** |

**A form is a real answer, not a failure.** Plenty of companies route press through one. Write
the email exactly as you would otherwise — the reporter pastes it into the form.

**6. Confidence, honestly:**

- `HIGH` — you loaded the company's own page and **saw the address (or the form) yourself**,
  by any of the three tiers.
- `MEDIUM` — a credible secondary source (wire release, recent news story, trade masthead), or
  the company's own site but not verified this run.
- `LOW` — inferred from a naming pattern (`press@`, `media@`) without seeing it published.
  Never written to the contact record.

A search-engine summary quoting an address is `MEDIUM`, never `HIGH`, however confident it
sounds. Only reading the page yourself earns `HIGH`.

**7. Report before writing.** Give the reporter a table — company, route, address or form URL,
source URL, confidence — and say plainly which you read yourself and which came from elsewhere.
Name anything at `MEDIUM` or `form` or `none` **at the top, as a blocker**, with the URLs you
tried and what each returned (429, 404, timeout, no address on page). Never guess to fill a gap.

### 3. Write one email per recipient

Every email is individually written. Same core question, but the context paragraph names the
specific company and what the reporting shows about *them*. Substitute `{COMPANY}` throughout.

**Subject line.** Exactly this shape:

> `<Outlet> request: <what the request is about>`

```
Semafor request: Kalshi's flight cancellation contracts
Semafor request: Polymarket's approach to aviation markets
```

**No deadline in the subject.** It's in the body. Not "Media inquiry," not "Quick question."

Keep it **plain ASCII** — a hyphen, never an em dash. Non-ASCII gets MIME-encoded into
`=?utf-8?b?...?=` gibberish in the raw `.eml`.

**Body.** Plain text. **Four sentences, in this exact order.** Nothing else goes in.

1. **Greeting**, on its own line. `Hello,`
2. **Who you are**, in exactly this form:
   `My name is <full name>, I'm a <title> with <outlet>.`
   Name, title and outlet come from `config/profile.md`. Nothing else in this sentence.
3. **What you're requesting comment on**, in exactly this form:
   `I am writing to request comment on <the news, in one clause>.`

   **This is breaking news and the company already knows what they did.** Compress it to the
   single clause that identifies the event. Do not brief them on their own announcement, do not
   list the details, do not recite the filing back to them. If your clause runs past about 25
   words, it is explaining rather than identifying — cut it.

   Right: `I am writing to request comment on Kalshi notifying the CFTC that it self-certified
   a new class of contracts on airport flight cancellations.`

   Wrong: `Kalshi notified the CFTC on Tuesday that it self-certified a new class of contracts
   letting traders bet on the percentage of scheduled flights canceled at U.S. airports, and
   the filing bars airport employees, directors and contractors with nonpublic knowledge of
   flight operations from trading them.`

4. **What statement you need**, in exactly this form:
   `I am looking for a statement on <the asks, run together as prose>.`

   **Every ask must tie to the news in sentence 3.** Background, history, and prior incidents
   are context for the story, not for the request. If an ask would still make sense without the
   breaking news, it doesn't belong. Never a numbered or bulleted list.

5. **The deadline**, after a blank line, alone on the last line. Nothing after it.
   `My deadline is 4 p.m. ET today.`

   **Use the deadline from the brief. Never invent one.** If the brief has no deadline, or one
   with no time zone, **stop and ask the reporter** before writing any email. Do not default to
   4 p.m., do not default to today.

Sentences 2–4 sit in **one continuous paragraph** with no blank lines between them. Only the
deadline is separated.

**Write it to be read in one pass.** Short clauses, plain words, no subordinate pile-ups. A
comms person is skimming on their own deadline. If a sentence has to be re-read, rewrite it.

**Recipients get different sentence 3s when their involvement differs.** Two companies in the
same story are rarely being asked about the same thing. Write each from the brief's "What I
already have" entry for *that* company. `{COMPANY}` substitution is for shared wording only,
not a substitute for thinking about each recipient.

Example (Kalshi):

```
Hello,

My name is Grace Thomas, I'm a reporter with Semafor. I am writing to request comment on
Kalshi notifying the CFTC that it self-certified a new class of contracts on airport flight
cancellations. I am looking for a statement on whether these markets are live yet, what
Kalshi sees as their purpose, and how Kalshi prevents trading by people with nonpublic
information about flight operations.

My deadline is 4 p.m. ET today.
```

Example (Polymarket — same story, different ask, because their involvement is different):

```
Hello,

My name is Grace Thomas, I'm a reporter with Semafor. I am writing to request comment on
Kalshi notifying the CFTC that it self-certified a new class of contracts on airport flight
cancellations. I am looking for a statement on Polymarket's response to Kalshi's proposal and
on Polymarket's own approach to aviation markets.

My deadline is 4 p.m. ET today.
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
- **A thesis sentence.** No "The story examines…", no "my reporting indicates…".
- **A briefing on the company's own news.** They already know what they announced. Sentence 3
  identifies the event in one clause; it does not summarize it back to them.
- **Background or prior incidents** that aren't the news you're asking about. Context belongs
  in the story, not the request.
- **A deadline in the subject line.**
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
  "from_email": "graceathomas5@gmail.com",
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
