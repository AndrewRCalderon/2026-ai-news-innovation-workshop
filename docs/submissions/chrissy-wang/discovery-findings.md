# discovery/ — what the testing actually showed

Measured results from the source-discovery engine, written down because none of it
is visible in the code and re-running a round costs real time and tokens.

> **2026-08-25, major change: the reverse-engineering arm was deleted.** "Why it was
> cut" below is the most important section here. Earlier conclusions that this
> overturned are marked where they stand.

## What the package does

Given a **place and a beat**, it produces a source list where **every address has
been fetched and checked**, not just proposed. The goal is to make AutoNews
something another reporter can configure for themselves.

```bash
python -m discovery --place "Chicago" --beat "housing and evictions" --out report.md
```

## The four steps as they stand now

| Step | What it does | File |
|---|---|---|
| 1 | Ask the model which bodies this beat should watch | `enumerate.py` |
| 2 | Institution name → candidate subscribable address | `resolve.py` |
| 3 | Fetch each one for real; is it alive, is it on-topic | `verify.py` |
| 4 | **Check: has published reporting actually cited it** | `citations.py` |

Step 4 is what the reverse-engineering arm left behind, and the only part of it that
paid for itself.

---

## Why the reverse-engineering arm was cut

The arm swept a place's newsrooms, found source-dense stories, read them in full, and
inferred which institutions the reporter must have consulted. It had three independent
causes of death, any one of them sufficient.

### 1. Its founding premise was disproved by my own measurements

The arm existed because I assumed a model asked directly would invent institutions.
**Measured across three cities, close to 100% of proposed institutions were real on
both arms.** The model rarely fabricates a body. That finding was in my notes from the
first round — I just never turned it back on the question of whether the arm should
exist at all.

### 2. The bottleneck was the article supply, not the selection logic

A full round went into fixing the arm's story-selection, peeling off one layer at a
time:

1. Substring matching on the beat — **stop words acting as wildcards**. The `and` in
   `"housing and evictions"` matched `Armored`, `Another`, `Commanders`, and a Dolly
   Parton obituary came through as a "housing exemplar"
2. Word boundaries — `rent` matching inside `Parents`, `lease` inside `released`
3. Phrase granularity — the term list returned `"housing crisis"` rather than
   `"housing"`, and strict matching went straight to zero
4. Geographic leakage — widening the outlet pool to 20 pulled in Van Nuys (Los
   Angeles), Oaklandside, Naples
5. Outlet health — 14 of those 20 returned no article text at all

**Each fix exposed the next. It never converged.** With all five layers fixed, the
Houston business beat returned:

| # | "Houston business sources," reverse-engineered |
|---|---|
| 1 | Nevada Gaming Control Board |
| 2 | Air Canada |
| 3 | Clark County Department of Aviation |

Drawn from two articles: Business Insider on Trump's trade war with Canada, and Las
Vegas hotels worried about losing Canadian visitors.

**This is the same failure as the original one — a single airline dispute producing
United, Frontier, the FAA and the DOT — just relocated from airlines to casinos.**

And **every safeguard worked correctly**. The geographic check reported `✗`. The
evidence-trace count reported `0`. The thin-sample warning fired honestly. Nothing
lied. **They accurately reported a sample with nothing in it to choose from.** In the
outlets that can be read, inside a few days of RSS, there simply is not enough local
records-based business reporting — and no amount of selection cleverness manufactures
articles that were never published.

### 3. A structural bias that cannot be fixed with more heuristics

The arm can only learn a beat from the outlets with the **weakest paywalls**, not the
ones that **cover it best**. Across 24 outlets in three cities:

| | Count | Who |
|---|---|---|
| Readable | 13 | ABC13, Houston Public Media, Houston Landing, Sun-Times, Injustice Watch, Block Club, WBEZ, ProPublica, Billy Penn… |
| Genuine paywall | 2 | bizjournals, KHOU |
| **No feed obtainable** | **9** | **Houston Chronicle, Chicago Tribune, Philadelphia Inquirer, Spotlight PA**, Click2Houston, jsonline… |

**Only two are actually paywalled — the real hole is "no feed obtainable."** I chased
the causes and none of them are mine to fix:

- Homepages all return HTTP 200, so there is no site-level block; these sites simply
  do not declare a feed in their HTML
- The Chicago Tribune's Arc path `/arc/outboundfeeds/rss/` is **correct** and returns
  **403** (CDN anti-scraping). **Browser headers do not help** — tested, still 403.
  The Houston Chronicle behaves the same way
- The Inquirer and Click2Houston return 404; there is no such feed
- Spotlight PA's homepage carries **no rss/feed/atom link at all**

The unreachable ones are precisely the three metros where local records-based
reporting is most concentrated. No heuristic closes that gap.

---

## What was kept: citation checking

The arm's one unique product was never "finding institutions" — it was **evidence**.
"A reporter actually used this" is a far stronger claim than "a model thinks this
matters." And that claim **separates cleanly from sweeping outlets for articles**.

The fix is to **invert the question**. Instead of *find good stories → infer the
institutions behind them* — which needs a supply of readable, local, records-based
reporting that frequently does not exist — ask, of an institution already proposed:
**does reporting cite this body on this beat?**

One targeted query per institution. The institution's name carries the place and the
subject with it, so the geographic gates, outlet health checks and word-sense
ambiguity that the sweeping approach needed **all become unnecessary**. It runs on
Google News RSS, which was **never once rate-limited** across a day of heavy use.

### Two details that turned out to be mandatory, both learned the hard way

**1. Count distinct newsrooms, not stories.** One wire item syndicated ten times is
one newsroom's judgment copied ten times. Counting stories makes the most-syndicated
bodies look best-sourced — the same prominence-for-quality error that had Google News
counts ranking the Houston Chronicle above the Houston Landing.

**2. Self-publication must be excluded.** Querying `"Houston Chronicle" …` of course
matches the Chronicle's own stories. Unfiltered, it looked "cited by 3 newsrooms" and
all three were its own. After filtering: **90 of 100 results were self-published.**
Without that exclusion this check measures how much an institution likes to promote
itself.

---

## Results after the swap

Same beat (Houston · business), same day:

| | Reverse-engineered (after five fixes) | Now |
|---|---|---|
| 1 | Nevada Gaming Control Board | **Texas Department of Licensing and Regulation** (100% on-topic, 13 newsrooms) |
| 2 | Air Canada | Houston Chronicle (48% on-topic) |
| 3 | Clark County Dept of Aviation | Greater Houston Partnership (20 newsrooms) |
| 4 | — | City of Houston Emergency Management |

Chicago · housing and evictions: Chicago Tribune (64%), **Chicago Department of
Housing (80%)**, **Illinois Housing Development Authority (100%)**, **Chicago Housing
Authority** (35 newsrooms).

### Against the answer key (Houston)

The 146 hand-assembled sources in `config.yaml` are the only ground truth I have. This
round proposed 7 and **6 of them hit**: TDLR, Greater Houston Partnership, City of
Houston Emergency Management, Harris County Clerk, Houston City Controller, City of
Houston Open Data Portal. The one miss, the Houston Chronicle, is a newspaper — it
should not count as a primary source anyway.

**Don't use a recall figure** — 7 proposals against 146 caps it before it starts.
**Accuracy is the number that means something.**

### The most valuable section is "used by reporters, but no address found"

Houston City Controller (8 newsrooms) and Harris County Clerk (7 newsrooms) are
genuinely used in reporting, but their own addresses are dead — 5,115 days and 460
days without an update. **That tells a reporter where hand-searching pays off most**,
and it is what separates this from an ordinary list. Don't bury it.

---

## Earlier conclusions that still stand

### The real risks are the wrong website and the wrong topic, not hallucination

1. **Wrong website.** Searching "Chicago Housing Authority" returns `chicago.gov` —
   the city portal, not the CHA. "Philadelphia Board of Ethics" also resolves to
   **`chicago.gov`**
2. **Wrong topic.** `site:chicago.gov "Chicago"` returns Bears uniforms and a music
   festival, and because it is busy and fresh it **scored highest of everything
   tested**

**Liveness is not correctness.** Fetching alone, in `verify.py`, cannot see this.
Citation checking is aimed squarely at that risk.

### The network layer

| Purpose | What it uses | Notes |
|---|---|---|
| Find an institution's site | **Wikidata P856** | Authoritative, never rate-limited, and it fixed both cross-city errors above. But only ~40% coverage for local bodies |
| Citation checking | **Google News RSS** | Not rate-limited once, across a day of heavy use |
| Fallback site lookup | DuckDuckGo html | No key needed, but **does rate-limit** (HTTP 202 with `anomaly` in the body). `SearchBlocked` now aborts the round loudly |

For more reliability later: the Brave Search API (2,000 free queries/month, needs a
key), best as optional config — runs without it, steadier with it.

~~Google News to find outlets → read each outlet's own RSS~~ — deleted along with the
arm. Google News links are encrypted `CBMi…`; following the redirect lands on a Google
page, and the article HTML carries no real address either. **All three approaches were
tried and none work.** That conclusion holds — don't try a fourth.

### Confidence has three levels, not two

`resolve()` returns `confidence`: `confirmed` (a Wikidata entry exists) / `probable`
(a self-describing site was found; coincidence can fool it) / `unverified`. **No
Wikidata entry does not mean the institution is fake** — only that nobody recorded it.
Saying "unverified" is honest; saying "fake" is not.

---

## Traps I know I will hit again

- **Abbreviation vs full name — word-set comparison always misses.** `merge_key()`
  merges on word sets, and `TDLR` shares zero words with
  `Texas Department of Licensing and Regulation`. This was already written down, and
  on 2026-08-25 I **walked into it again** while scoring against the answer key,
  nearly recording a hit as a miss. Anything compared with `merge_key()` needs a
  manual pass for abbreviations.
- **Substring matching fires inside words.** `rent`⊂`Parents`, `lease`⊂`released`,
  `and`⊂`Armored`. `verify.py`'s `beat_ratio` had this bug too — now fixed with
  word-boundary matching via `title_hits()` — which means **every on-topic percentage
  measured before this was too high**.
- **Stemming has to run both ways.** The term list gives the plural `investments`, the
  headline says `Investment`. Allowing only word+s reported Greater Houston
  Partnership at 0% on-topic when it plainly had "New Solar Investment".
- Archetype classification skews — HUD (federal oversight) and the Urban Institute (a
  think tank) both land in `Institutional newsrooms`, and the `oversight` category is
  barely used.
- National datasets creep in (`American Community Survey`). An on-topic ratio filters
  noise; it does not catch **the wrong kind of thing**.

## Next

1. **Open-data-portal detection has never hit once** — while the primary records
   (eviction filings, licenses) sit right there. This is what separates AutoNews from
   an ordinary news aggregator, and right now that link is empty. `resolve.py`'s
   `probe_portal()` already has Socrata and CKAN probes written; find out why they
   never match before writing anything new.
2. **Add a fallback path for "cited but no address found."** These bodies usually have
   pages but no feed, and they are the highest-value primary-record sources in the
   list.
3. **Too few proposals** — 7 for Houston, 8 for Chicago, against 146 hand-assembled.
   Asking in several rounds, or asking archetype by archetype, is untried.
4. Then the interface.
