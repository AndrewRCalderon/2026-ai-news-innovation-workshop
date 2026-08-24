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
2. **Research.** Otherwise use WebSearch/WebFetch. Look for the company's actual newsroom or
   media-relations page: `<company>.com/newsroom`, `/press`, `/media`, `/news`, or their
   corporate site (Nike's is `about.nike.com`, not `nike.com`). Prefer a media-relations
   inbox over a named individual — individuals change jobs, inboxes get routed on deadline.
   Prefer the regional desk that matches the story (a global sports story usually wants
   global or North America comms, not the local retail PR contact).
3. **Assign confidence honestly:**
   - `HIGH` — the address is printed on the company's own site or its official press kit,
     and you fetched that page.
   - `MEDIUM` — from a credible secondary source (a press release wire, a recent news story,
     a trade publication's masthead), or from the company's own site but not recently dated.
   - `LOW` — inferred from a naming pattern (`press@`, `media@`) without seeing it published.
4. **If you can't find one at all**, still write the email, set `to` to `""`, and tell the
   reporter which companies need a manual lookup. Don't quietly drop a recipient.

Report contacts to the reporter as a table (company, address, source, confidence) **before**
moving on, so they can catch a wrong desk early.

### 3. Write one email per recipient

Every email is individually written. Same core question, but the context paragraph names the
specific company and what the reporting shows about *them*. Substitute `{COMPANY}` throughout.

**Subject line.** It has to survive a PR inbox on deadline. Pattern:

> `<Outlet> query — <specific topic> — response requested by <deadline>`

e.g. `NYCity News Service query — Nike's pink World Cup cleats — response by 4 p.m. ET today`

Not "Media inquiry" or "Quick question." Name the outlet, the subject, and the clock.

Keep the subject line **plain ASCII** — use a hyphen, not an em dash. Non-ASCII characters
get MIME-encoded into `=?utf-8?b?...?=` gibberish in the raw `.eml`, and they bloat the
Gmail compose URL. Em dashes in the body are fine.

**Body.** Plain text, roughly 150–250 words. This structure, in this order:

1. **Who you are, one line.** Name, outlet, and that you're on deadline.
2. **What the story is, two or three sentences.** The actual thesis, not a vague gesture.
   A comms person who understands the story writes you a useful statement; one who doesn't
   sends boilerplate.
3. **What it says about them specifically.** The claim you're putting to this company, drawn
   from the brief's "What I already have" field. This is the part that makes it a genuine
   request for comment rather than a survey — they can respond to something concrete.
4. **The numbered questions**, company name substituted in.
5. **Terms.** On the record, attributed to a named spokesperson (or whatever the brief says).
   Offer a call if that's faster for them.
6. **The deadline, stated plainly**, with timezone and date — and the consequence, neutrally
   phrased: *"If I don't hear back by then, the story will note that {COMPANY} did not
   respond to a request for comment by press time."* That sentence is standard practice and
   is what actually gets replies. Keep it matter-of-fact, never threatening.
7. **Your direct line**, so they can call instead of drafting.

Do **not** type the signature into the body — the pipeline handles it. Gmail inserts the
reporter's real signature automatically; the `.eml` files get `config/signature.txt` embedded.
Putting it in the body too would sign every email twice.

**Tone.** Neutral, specific, unhurried in register even though the deadline is short. No
flattery, no "I hope this finds you well," no implied accusation. Respect the reader's time:
they are also on deadline.

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

### 6. Update the contact cache

Append any **HIGH or MEDIUM** contact that isn't already in `contacts/press-contacts.csv`,
with its source URL and date. Never cache a `LOW` address — that's how a guess becomes
permanent.

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
