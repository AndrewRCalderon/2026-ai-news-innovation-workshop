# Day 2 — RFC Bot

**2026-08-25.** Day 1 built RFC Bot end to end on a single story. Day 2 was about finding out
whether it actually worked, or only looked like it did.

Short answer: it didn't, in three specific ways — and finding them is most of what happened.
The rest of the day moved it into the tools the work actually happens in: Gmail and Google Docs.

---

## 1. The project got a spec it didn't have

Everything lived in `PLAN.md`, which mixed decisions, history, and open questions together. Every
session started by re-explaining the project.

Split into three files with distinct jobs:

| File | Holds |
|---|---|
| [`requirements.md`](requirements.md) | What it must do, as behavior. Numbered (R1, R4…) so changes can be argued about precisely. Plus what's explicitly **out of scope** |
| [`architecture.md`](architecture.md) | The approach, the pieces, constraints already in place, decisions not worth re-litigating, and known weak points |
| [`tasks.md`](tasks.md) | 13 tasks in build order, each with a **"done when"** that's checkable rather than a judgment call |

[`CLAUDE.md`](CLAUDE.md) now points at all three, so future sessions read them automatically.
`PLAN.md` stays as the historical narrative and loses to the three files if they disagree.

**Tasks 1–12 are done.** Task 13 is paused, deliberately — see below.

---

## 2. The email got rewritten three times, by reading it

The Day 1 email was 123 words and opened by explaining the story's industry-wide thesis. Each
round of reporter review cut something that had seemed reasonable when written.

**Cut across three rounds:**

- **The thesis sentence.** *"The story examines a pattern: every major athletic brand…"* Beyond
  being long, it asserted in writing — to four companies' comms teams — that the whole industry
  coordinated on shared market research. That was the story's biggest claim, sitting in an email
  before it was published.
- **Numbered questions**, in favor of prose.
- **The hard four-sentence cap**, replaced by a fixed structure. The shape is the rule; length
  falls out of it. Accuracy outranks brevity.
- **Briefing companies on their own announcement.** This is breaking news — they know what they
  filed. The sentence identifies the event and stops.
- **Asks that don't tie to the news.** A Polymarket draft opened on the Charles de Gaulle sensor
  incident, which is story context, not the thing being asked about.
- **All phone numbers**, everywhere, by request.
- **The deadline in the subject line.**

**Where it landed:**

```
Hello,

My name is Grace Thomas, I'm a reporter with Semafor. I am writing to request comment on
Kalshi notifying the CFTC that it self-certified a new class of contracts on airport flight
cancellations. I am looking for a statement on whether these markets are live yet, what
Kalshi sees as their purpose, and how Kalshi prevents trading by people with nonpublic
information about flight operations.

My deadline is 4 p.m. ET today.
```

Subject: `Semafor request: Kalshi's flight cancellation contracts`. **123 words → 65.**

---

## 3. Contact research was broken, and it had produced a wrong address

The most useful failure of the day.

The bot reported "no press contact found" for pages that plainly had one. Two separate causes,
found only because the reporter went and looked manually:

**Cause A — text conversion discards `mailto:` links.** The page-fetch tool converts HTML to
plain text and throws away link targets. That is exactly how most companies publish a press
address. So the bot read Nike's newsroom, found nothing, and said so honestly and uselessly.

**Cause B — bot-blocking.** `kalshi.com` returns **HTTP 429** to `curl` and to the fetcher on
every path, with or without a full browser header set. No amount of header spoofing gets past it.

**The consequence was worse than a miss.** The saved adidas address was `corporate.press@adidas.com`.
Their page says `corporate.press@adidas-group.com`. **That email would have bounced** — and it
was labeled MEDIUM, which is supposed to mean "plausible." A confidence label that never reads
the page can't catch a wrong domain, so it was doing no work at all.

**The fix — three-tier escalation, keyed to the symptom so it generalizes:**

| Tier | Beats | Blind to |
|---|---|---|
| 1. `curl` raw HTML | Text conversion losing `mailto:` | Bot-blocking, JS-only sites |
| 2. Text fetcher | Some network-level blocks | `mailto:` links, always |
| 3. **Real browser** | Bot-blocking, JS-only rendering | (slowest) |

A **429, 403, or near-empty page now means escalate**, not give up. The browser loaded
`kalshi.com/about` and found `media@kalshi.com` on the first try.

**All contacts are now HIGH**, each read from the company's own page. Also learned: Nike
publishes on `about.nike.com/en/company` and Kalshi on `kalshi.com/about` — *neither* on its
newsroom or press page. The URL list now leads with `/about` and `/company`.

---

## 4. Nobody gets dropped for being hard to reach

Some organizations publish a media contact form instead of an address. Each recipient now
carries a `contact_method`:

- **`email`** — full pipeline.
- **`form`** — draft still written in full, form URL linked, body offered as copy-paste text. A
  form is a normal route, not a failure.
- **`none`** — draft still written, reported as a **BLOCKER** naming what was tried.

Verified with a synthetic fixture covering both edge cases.

---

## 5. Guardrails that outlive attention

Format rules used to be enforced by reading. Reading stops happening. `build_drafts.py` now warns
on eleven violations — sign-offs, numbered questions, thesis sentences, phone numbers, "press
time," accuracy-check offers, stated terms, a deadline in the subject, a sentence-3 that runs long,
and anything after the deadline line.

**Every check is warning-only.** It never blocks or rewrites a draft, because a journalist on
deadline should not have a build refuse to produce an email over a style rule. Verified against a
deliberately bad fixture: all warnings fire, and the draft still builds completely.

---

## 6. The real test: a second story

The single biggest risk was that everything worked on one story the tool was *built alongside*.

Task 11 ran a real NBC News story — [Kalshi's flight-cancellation
contracts](https://www.nbcnews.com/tech/tech-news/kalshi-looks-expand-contracts-related-air-travel-delays-rcna587702),
published 2026-07-15 — re-run as if the outreach hadn't happened yet. Two recipients instead of
four peer competitors, each needing a genuinely different ask rather than one templated line with
the name swapped.

**It immediately found a bug cleats never could.** Polymarket's subject was long enough that the
`.eml` writer folded the header right after `Subject:`, leaving the line starting with whitespace —
which some clients render as a leading space in the subject. Every cleats subject was short enough
to escape it. Fixed and verified across all six drafts.

That's the argument for running a second story: not that it works, but that it breaks differently.

---

## 7. One task paused on purpose

**Task 13, the follow-up path, is not unfinished — it's in question.**

RFC Bot is for day-of, breaking-news turnarounds. The story files at 4 p.m. A chaser that lands
the next morning has nothing to chase; the piece already ran with "did not respond by press time."
The follow-up feature was designed for a multi-day reporting rhythm this tool doesn't serve.

So the open question isn't *how* to build it. It's *whether it belongs*. That reasoning is written
into `tasks.md` rather than left as an unchecked box, along with the four format questions that
would need answering if it stays.

---

## 8. Real Gmail drafts, and a test mode that rewrites

`compose.html` opens a pre-filled compose window, which works but is transient — close the tab and
it's gone. A real Gmail draft survives, syncs to the phone, and is what a reporter expects.

An Apps Script project now writes them. **Bound to a Google Doc, not standalone**, because section
10 puts a sidebar in that same doc — one project, one authorization, set up once. It uses the
advanced Gmail service with explicit `oauthScopes` rather than `GmailApp`, whose methods quietly
pull `https://mail.google.com/`: full-mailbox access, including permanent delete.

**Test mode is on by default, and it rewrites rather than checks.** With `TEST_MODE = true`, every
recipient becomes the reporter's own address, `Cc` is dropped, the subject gets a `[TEST]` prefix,
and the real intended recipient is kept in an `X-RFC-Bot-Test-Original-To` header. The body is left
byte-identical, because the point is to read the exact text that would go out.

Rewriting matters more than it sounds. A check against a list of known-test addresses still lets a
real press desk through if the wrong `drafts.json` is loaded — which is exactly the mundane,
fatal mistake this exists to prevent. Rewriting has no such path.

**The script still never sends.** A test send is the reporter opening the `[TEST]` draft and
pressing Send to themselves, which is also the only honest way to see what Gmail does to the
formatting on the way out.

Both of these are **built but not checked off**. Their "done when" is a real run in a real Gmail
account, and that run hasn't been recorded.

---

## 9. The guarantee stopped depending on memory

Task 14 established that R1 — never sends — rests on nothing but the absence of a send call in the
code. Google does not enforce it. A guarantee that depends on someone remembering to run a search
is not much of a guarantee, and the thing most likely to break it is a future session adding a send
call in perfectly good faith.

So it became a committed pre-commit hook. It searches **staged** code for `.send(`, `smtplib`,
`sendmail`, or a Gmail scope wider than `gmail.compose`, and refuses the commit naming the file and
line.

Two details worth keeping:

- **It's committed, in `.githooks/`, not dropped in `.git/hooks/`.** Anything in there is invisible
  to git, wouldn't show up in a PR, and wouldn't survive a fresh clone.
- **It refused its own first commit** — `tasks.md` and `apps-script/README.md` both quote the
  pattern in prose. That's how the markdown exclusion got written. It excludes `.md` rather than
  allow-listing code extensions, so a new kind of code file gets checked by default instead of
  silently skipped.

**`--no-verify` still skips it.** It's a tripwire, not a wall. Recorded plainly rather than
overclaimed, because overclaiming this exact guarantee is what task 14 had to correct.

---

## 10. Start from the draft, not from a form

The real workflow isn't a reporter filling in a form. It's a reporter part-way through a story in
Google Docs, asking for the outreach while the draft is still moving. That changes the input from
"a form you fill in" to "a document that isn't finished," which is a different product.

Two ways to build it: the sidebar calls the Claude API and writes the emails itself, or it reads
the draft and hands it to Claude Code, where the skill already runs.

**Handoff won**, on three counts. A copy of `SKILL.md`'s rules would have lived inside a prompt
string and drifted from the real one. It would have needed a paid API key at roughly a dime a run.
And — the decisive one — **Apps Script has no browser.** Contact research escalates curl → fetcher
→ real browser, and `kalshi.com` returns 429 to everything above that last tier. That tier is the
only reason `media@kalshi.com` was ever found. A sidebar that researched its own contacts would
have been quietly weakest at the job that most needs to be right.

Cost of the choice, taken knowingly: two pastes instead of none — the draft out, `drafts.json`
back.

**What the first real draft showed.** The recipient list was already in it, written by the reporter
as inline notes: "Kalshi statement on this," "Polymarket comment on Kalshi's proposal or on its own
approach." Nothing has to be inferred about who to contact. What the scanner has to do is notice
the placeholders — which is why anything lifted out of a live draft gets quoted back and confirmed
before it reaches an email. That rule is task 19, still unwritten as R13.

**One more thing came out of it: the deadline is now a required field**, typed fresh in the sidebar
on every run and deliberately *not* prefilled from `drafts.json`. A deadline is a promise to a
source, and the person making it should be typing it rather than inheriting it from a file written
earlier.

---

## What still holds

- **Nothing has ever been sent.** No SMTP, no send call anywhere — and as of today a commit hook
  that refuses to let one in.
- **Two stories, six drafts, all contacts HIGH**, every one read from the company's own page.
- **`CLAUDE.md` gained one rule** that generalizes past this project: *never assume a deadline, a
  date, or a time zone — if it isn't specified, ask.* A guessed deadline in a message to a source
  is a promise the reporter didn't make.

## Next

Open, in `tasks.md`:

- **Run tasks 15 and 16 for real.** Both are built; neither has been run against a live Gmail
  account and seen to pass its "done when."
- **Two decisions before any building.** Task 13 — is the follow-up path in scope at all, on a
  day-of tool? Task 17 — does the contact record sync into Google Contacts, given that Contacts
  has no field for confidence or source URL and both are load-bearing under R8?
- **Task 19 — write R13.** A claim pulled out of an unfinished draft is not a verified claim.
  Scanning a live draft makes that the normal case rather than the exception.
- **Task 20 — split the rules into invariant and voice.** The format rules currently mix what
  makes the tool safe with one reporter's taste. A second reporter should be able to disagree
  with the second set without touching the first.
