# Day 2 — Chrissy Wang

## What I set out to do

Turn AutoNews from a tool only I can run into something other reporters can set up
for themselves: enter a city and a beat, get a source list back.

The interface is the easy half. The hard part is the question underneath it —
**how do you find good sources for a beat you don't cover, in a city you don't know?**
My own Houston config took months to assemble by hand. That doesn't scale, and it
doesn't help anyone else.

## What I actually built

**A spec first** (`requirements.md`, `architecture.md`, `tasks.md`) — behaviour, then
approach, then checkable pieces. `CLAUDE.md` now points at all three, so every session
plans against them instead of me re-explaining the project.

**Task 1 from that spec**: a `--preview` flag that renders the digest to a file instead
of emailing it. Small, but nothing else was checkable without it — until today the only
way to see the output was to send myself mail.

**A source-discovery engine** (`discovery/`), tested on Chicago housing, Philadelphia
politics, Houston business and Detroit transit.

**Then I deleted a third of it.** The engine started with two arms: ask the model
directly which institutions matter, and reverse-engineer them out of published
reporting. By the end of the day the reverse-engineering arm was gone, replaced by a
much smaller idea it had been hiding — see below. What remains is four steps: propose,
resolve an address, fetch and verify, then check whether reporting actually cites it.

**A skill** (`skills/find-beat-sources/`) that packages the method itself. The code
needs Python and an API key; the skill needs only Claude. Any reporter can ask "where
should I be watching for housing in Chicago" and get the same method applied.

## What I learned — mostly from being wrong

This is the part worth reading. Details in `discovery-findings.md` and
`skills/find-beat-sources/references/pitfalls.md`.

**My main assumption was wrong.** I built the whole method around the fear that AI
would invent institutions that don't exist. Measured across three cities, close to
**100% of proposed institutions were real**. That wasn't the risk.

**The real risks were quieter.** Searching "Chicago Housing Authority" returned
`chicago.gov` — the city portal, not the CHA. A feed scoped to it came back fresh and
busy, so it **scored highest of everything tested** while carrying a house-music
festival and a Bears uniform launch. "Philadelphia Board of Ethics" also resolved to
`chicago.gov`. Testing Detroit transit returned the City of Flint — twice.

Every one of those passed the checks. **Liveness is not correctness**, and nothing
about a wrong answer looks wrong.

**A verification rule can destroy the thing it's protecting.** I first required the AI
to quote the exact sentence proving a source was used. It dropped 4 real sources and
caught 0 fabrications — every casualty (the county sheriff, the circuit court clerk,
the housing authority) was genuinely in the article. I was measuring transcription
accuracy, not truth.

**I spent a day fixing five layers of something that shouldn't have existed.** The
reverse-engineering arm kept returning junk, so I fixed it: stop words acting as
wildcards (the `and` in "housing and evictions" matched `Armored`, and a Dolly Parton
obituary came through as a housing exemplar), then word boundaries, then phrase
granularity, then outlets leaking in from other cities, then outlets whose text I
couldn't fetch at all. Each fix revealed the next. After all five, the Houston
business beat returned the **Nevada Gaming Control Board, Air Canada, and the Las
Vegas airport** — the same failure as before, relocated from airlines to casinos.

**Every safeguard worked. That's what made it convincing.** The geographic check said
`✗`. The evidence count said `0`. The thin-sample warning fired. Nothing lied — they
correctly reported a sample with nothing in it to choose from. The binding constraint
was never the selection logic; it was that the articles don't exist. Of 24 outlets
tested, only 2 were genuinely paywalled — but 9 gave up no feed at all, and those 9
included the Houston Chronicle, the Chicago Tribune, the Philadelphia Inquirer and
Spotlight PA. **The arm could only learn a beat from the outlets with the weakest
paywalls, not the ones that cover it best.** No amount of heuristics fixes that.

**The fix was to invert the question.** The arm's one real product was never finding
institutions — it was *evidence*: "a reporter actually used this" beats "a model
thinks this matters." And that separates cleanly from sweeping outlets for stories.
Instead of *find good articles → infer the institutions*, ask of an institution
already proposed: **does reporting cite this body on this beat?** One query each. The
institution's name carries the city and the subject with it, so the geographic gates
and outlet checks all become unnecessary. About 130 lines replaced roughly 690.

**Two details in that check turned out to be load-bearing.** Count distinct newsrooms,
not stories — one wire item syndicated ten times is one newsroom's judgment copied ten
times, and counting stories would rank the most-syndicated bodies highest. And exclude
self-publication: **90 of 100 results were the institution publishing about itself.**
Without that filter the check measures how much a body likes to promote itself.

**Ask the data before asking the model.** I spent two hours on prompt wording trying to
get the model to tell a job ad from a WARN layoff notice. It never worked reliably.
What fixed it was six lines of code reading a field that was in the config the whole
time. That's now a standing rule in my `CLAUDE.md`.

## Where it stands

Better than it was this morning, and measurably so. Against my Houston config — 146
sources assembled by hand over months, the only answer key I have — this round
proposed 7 and **6 hit**: TDLR, the Greater Houston Partnership, City of Houston
Emergency Management, the Harris County Clerk, the City Controller, and the city's
open data portal. The one miss was the Houston Chronicle, a newspaper, which shouldn't
count as a primary source anyway. Chicago housing came back with the Department of
Housing, the Illinois Housing Development Authority, and the Chicago Housing Authority
— cited by 35 newsrooms.

The number I won't quote is recall. Seven proposals against 146 caps it before it
starts; too few proposals is now the clearest weakness.

**The most useful part of the output is the part that failed.** The Harris County
Clerk and the City Controller are demonstrably used in reporting, but their own
addresses are dead — 460 and 5,115 days without an update. That section tells a
reporter exactly where hand-searching pays off most, which is the thing an ordinary
source list can't do.

**It is a starting set, not a finished list** — which matches how beat knowledge
actually accrues. A reporter adds sources as they work; the tool should keep proposing
them.

## Next

The wrong-city problem largely left with the arm that caused it. What's left, in
order: open-data-portal detection has never matched once, and that's where the primary
records live; the cited-but-unreachable bodies need a fallback path; and the engine
needs to propose more than seven things. Then the interface.

The AutoNews code stays in its own repo — what's submitted here is the method, the
spec, and what I got wrong.
