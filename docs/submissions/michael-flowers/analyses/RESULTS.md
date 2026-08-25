# Discrimination test — result

**Date:** 2026-08-25, Day 2
**Detector version:** v0.1
**Spec criterion:** §6.1 — the opinion piece must show at least 3× the flag
density of the news piece. Under 2× means the detector isn't detecting.

## Design

Same outlet, same event, same week. Only the genre changes.

| | |
|---|---|
| **Event** | Operation Economic Outcast — US secondary sanctions campaign against Iran, announced 24 Aug 2026 |
| **Opinion** | "Scott Bessent: an economic D-Day is coming for Iran" — FT Opinion, 23 Aug 2026, by the US Treasury Secretary |
| **News** | "Can Trump's 'economic D-day' force Iran to capitulate?" — FT news desk, 25 Aug 2026, England / Bozorgmehr / Leahy |

Holding the outlet constant matters. Comparing FT opinion against a different
paper's news report would vary two things at once — genre *and* house style —
and no conclusion could be drawn about either.

## Result

| | words | flags | attributed | own voice | per 100 words |
|---|---:|---:|---:|---:|---:|
| Op-ed | 768 | 12 | 0 | 12 | **1.56** |
| News | 1,305 | 6 | 3 | 3 | **0.23** |

**Ratio: 6.78×** — passes, with more than twice the margin the spec required.

Every span in both analyses was verified programmatically: verbatim presence in
the source, technique on the taxonomy, no overlapping spans. All checks passed.

## What the numbers mean

**The op-ed is entirely in its own voice.** Twelve findings, zero attributed.
Bessent quotes no one, so every persuasive move belongs to him. That is normal
for an op-ed and precisely what makes it a good high-density specimen.

**The news piece splits.** Six findings, but half are quotations — Bessent's
"single greatest financial offensive," his "remedy bad behaviour," an Iranian
official's "act of war." Under spec §5.3 those are attributed to the speaker and
excluded from density, leaving three findings in the paper's own voice across
1,305 words.

**The attribution rule is doing real work.** The strongest evidence in this whole
test: the phrase *"the single greatest financial offensive ever marshalled
against an adversary"* appears in **both** texts. In the op-ed it is flagged as
Bessent's own loaded language. In the news piece it sits inside quotation marks,
credited to him, and is marked `attributed: true` — excluded from the density
count.

Identical words, different verdict, because the relationship between writer and
language changed. Without that rule the news piece would have scored 0.46 and
the ratio would have collapsed to 3.4× — still a pass, but for the wrong reason,
and the tool would have been penalising a paper for quoting a source accurately.

## Findings in the news piece's own voice

Only three, and they are mild:

- `agent-deletion` — "the pain being heaped on the nation of about 90mn people."
  Passive with no actor. Pain is heaped; the sanctions regime doing the heaping
  is absent. The clearest instance in the piece.
- `loaded-language` — "force the Islamic regime to cave to its demands and lift
  its chokehold over the Strait of Hormuz." Two metaphors in the paper's voice.
- `loaded-language` — "hundreds of swingeing sanctions." Low confidence.

## Caveats

**The control is news analysis, not a straight wire report.** Analysis carries
more interpretation than a bare account of events. This makes the control
conservative — a pure AP or Reuters story would likely score lower, widening the
gap rather than narrowing it.

**One test is not validation.** This is a single pair on a single topic, with
findings identified by one analyst. It shows the detector *can* separate opinion
from reporting on this pair. It does not establish that it does so reliably
across topics, outlets, or languages.

**The op-ed is an unusually rich specimen.** A serving cabinet secretary arguing
for his own policy is close to a best case. A subtler column would be a harder
test, and is the obvious next one.

## Taxonomy gap found

The op-ed closes by addressing the reader directly — *"are Iran's enablers
willing to wager their future against it?"* — a rhetorical question that presumes
its own framing. No category covers second-person address. Logged under
`unclassified` rather than forced into a nearby label. Candidate for v0.2.
