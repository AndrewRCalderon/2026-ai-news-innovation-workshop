# Day 2 — RFC Bot

**2026-08-25.** Day 1 built RFC Bot end to end on a single story. Day 2 was about finding out
whether it actually worked, or only looked like it did.

Short answer: it didn't, in three specific ways — and finding them is most of what happened.

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

## What still holds

- **Nothing has ever been sent.** No SMTP, no send scope, no automation that clicks Send.
- **Two stories, six drafts, all contacts HIGH**, every one read from the company's own page.
- **`CLAUDE.md` gained one rule** that generalizes past this project: *never assume a deadline, a
  date, or a time zone — if it isn't specified, ask.* A guessed deadline in a message to a source
  is a promise the reporter didn't make.

## Next

Apps Script work: Gmail drafts and sending — guarded so test sends **rewrite** every recipient to a
dummy address rather than merely checking against a list — then a Google Docs script so a reporter
can generate outreach from a story draft in progress. Then reporter-specific voice settings.
