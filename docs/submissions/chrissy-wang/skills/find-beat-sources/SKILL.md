---
name: find-beat-sources
description: Find where news breaks first for a beat in a place — the agencies, registries, courts, datasets and organisations a reporter should be watching, each one verified by actually fetching it. Use this whenever someone is starting a new beat, moving to a new city, asking "what should I be watching for X in Y", building a source list or feed list, setting up news monitoring or alerts for a place, or wondering what they're missing on a beat they already cover. Works for any beat — business, housing, city politics, courts, education, immigration, health — and any place. Use it even when the person doesn't say the word "sources": "I just got assigned the housing beat in Chicago" is exactly this request.
---

# Finding sources for a beat

A reporter starting a beat needs to know where news on it becomes public *first* —
before a press release, before a competitor's story. That is a knowable thing: it is
the set of institutions that are obliged to publish, the registries that record what
happened, and the organisations with a stake in it.

The job here is to produce that list for a specific place and beat, with each entry
verified and carrying its evidence, so the reporter can judge it rather than trust it.

## The one principle everything else follows from

**Propose from knowledge, verify by fetching, let the person decide.**

Naming institutions is something a model is genuinely good at — it is world knowledge.
Producing a working URL is not: a plausible-looking address is the easiest thing to
invent and the hardest for a reader to disprove. So institution names can come from
reasoning; **every URL must be fetched before it is shown to anyone**, and what gets
shown is the feed's actual recent headlines, not a description of what it probably
contains.

This is not caution for its own sake. A dead or wrong link in a source list is worse
than an omission, because the reporter builds a routine around it and quietly misses
things for weeks.

## The method

### 1. Learn the beat from real reporting

Before listing anything, find two or three **good published stories** on this beat in
this place, and work out what the reporter must have consulted. A story that exists is
proof its sources produce stories — much stronger evidence than an abstract sense of
which agencies matter.

- Search for **source-dense reporting**: add phrases like `"records show"`,
  `"according to data obtained"`, `"public records request"`, or `"an analysis of"` to
  the query. Those phrases select the investigative and data-driven pieces, which are
  the ones that reveal their own plumbing.
- **Fetch the articles.** Do not reason about a story from memory — a remembered
  article is an invented one, and its sources will be invented too.
- For each source you infer, **check the institution is actually named in the text**.
  If the article never mentions it, drop it.
- Then ask the harder question: **what should this reporter have checked and didn't?**
  Run the archetypes in `references/archetypes.md` as a checklist against the story.
  This is where the list gets better than the article it came from.

### 2. Fill the gaps by naming institutions directly

Work through the eight archetypes and name the specific bodies for this place and beat
that step 1 didn't surface. Aim for real, correctly-spelled, specific names — "Cook
County Clerk of the Circuit Court", not "court records".

Both steps are needed and they find different things. Tested on three cities, the
overlap between them was near zero every time: reverse-engineering finds the
non-obvious nodes a reporter actually used (the sheriff's office that publishes
eviction counts by zip code, the landlords' association); direct naming finds the
institutional skeleton (the open-data portal, the housing department). Skipping either
one loses half the answer.

### 3. Find somewhere to subscribe

For each institution, in this order:

1. **Wikidata** — look up the entity and read its official-website property (`P856`).
   This is authoritative and worth trying first; see the pitfalls file for why.
2. **The site's own feed declaration** — `<link rel="alternate" type="application/rss+xml">`
   in the homepage HTML. When a site says where its feed is, guessing is strictly worse.
3. **Conventional paths** — `/rss`, `/feed`, `/rss.xml`, `/atom.xml`, `/news/rss`,
   WordPress's `?feed=rss2`.
4. **An open-data portal**, if the body runs one (Socrata, CKAN, ArcGIS). These carry
   the registries — permits, filings, complaints, inspections — that no press release
   announces, so they are worth extra effort.
5. **A news-search feed as a fallback**, e.g. a Google News RSS search scoped to the
   institution. Always include the beat's vocabulary in the query, not just the
   institution and the place — see pitfall 2.

### 4. Verify, then present with evidence

Fetch every candidate. For each one, report:

- whether it parsed as a feed at all
- how many items, and **how recent the newest one is**
- **what share of its headlines are actually on the beat**
- **three real headlines**, so the reporter judges from output rather than a promise

Drop the dead, the empty, and anything whose newest item is months old. Say how many
you dropped — "we checked 33 addresses and 19 were live" is useful information about
how well-covered this beat is.

## Rules worth holding onto

Each of these comes from a specific failure, described in `references/pitfalls.md`.
Read that file when the work starts going wrong, or when you want the detail.

1. **Liveness is not correctness.** A feed can be fresh, busy, correctly parsed and
   still be the wrong institution publishing the wrong subject — or the right
   institution in the wrong city. Check three things separately, because they fail
   separately: did it fetch, is it the body you meant, and does that body actually
   cover the place asked about. A live feed from a city seventy miles away passes the
   first two checks and is still useless.
2. **Say when the sample is thin.** If you found fewer than three exemplar articles, or
   they all came from one newsroom, say so plainly at the top of the output. One story
   about an airline dispute will produce a source list made entirely of airlines, and
   that list looks completely normal unless it is labelled.
3. **Reader-service links are not reporting sources.** Where the article tells readers
   to apply for rental assistance or call a legal-aid hotline is not where the reporter
   looked. A "source" identified only by a bare URL is usually one of these.
4. **Prefer primary records over coverage of them.** A news-search feed about an agency
   is a fallback, not the goal. The agency's own filings, dockets and registries are
   what the reporter can't get anywhere else.
5. **Nothing unverified reaches the output.** If a URL couldn't be fetched, it belongs
   in the "checked and rejected" list with its reason, never in the recommendations.

## What the output should look like

Lead with the caveats if there are any — a thin sample, a place with little online
infrastructure, a beat where most bodies publish nothing machine-readable. A thin list
labelled thin is useful; a thin list presented as a full briefing is actively harmful.

Then a table of verified sources, most useful first, with: the institution, which
archetype it belongs to, how recent and how on-beat its feed is, and how it was found.
Then, for each, its URL and three real headlines.

Then two things that are easy to omit and shouldn't be:

- **What was checked and rejected**, with reasons. It tells the reporter this was
  actually tested, and it stops them re-finding the same dead ends.
- **What nobody in the sample was watching** — the gap analysis from step 1. For a
  reporter, that is often the most valuable part of the whole exercise.

Close by saying this is a **starting set, not a finished list**. Beat knowledge accrues:
the reporter will add sources as they work, and this should be re-runnable later
against what they already have, to suggest what's still missing.

## Reference files

- `references/archetypes.md` — the eight source archetypes, with examples for both
  business and civic beats. Read this before step 1 or 2.
- `references/pitfalls.md` — the specific ways this goes wrong, each with the real
  case that produced it. Read when results look off, or before trusting a ranking.
