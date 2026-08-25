# architecture.md — AutoNews feedback loop

> The approach, the pieces, how they fit, and what already exists that this has
> to work with or around. Behavior lives in `requirements.md`; build order lives
> in `tasks.md`.

## The approach, in one paragraph

Leave `monitor.py` as the engine. Add feedback **beside** it rather than inside
it: a store on disk that records judgments, a small endpoint that receives
clicks from the digest email, and a scoring step that runs late in the existing
pipeline and reorders what the email shows. The scoring step is optional by
design — if the store is missing or unreadable, the pipeline skips it and sends
exactly the digest it sends today. That constraint (R6) is what keeps a
half-built feedback loop from breaking the thing that already works.

## What already exists

Verified against the working tree, not remembered.

### The engine

`monitor.py` — one city-agnostic engine, driven entirely by a config file. It
hardcodes no place names. Adding a city means adding a config, not code.

```
Every 10 min (launchd) →
  1. Discover    fetch feeds concurrently; custom ingesters pull open city data
  2. Full text   resolve SEC filings, crawl article pages
  3. Summarize   LLM sorts into beats, extracts the money/policy angle
  4. Deliver     one HTML digest per city, grouped into region buckets
```

The pipeline already has a **filter funnel**, logged per run in `health.json`
as `disc → geo → beat → sent`, plus a reader-defined `exclude_kinds` step after
the beat filter (added 2026-08-25) that drops kinds of item the reader asked not
to see. Structured primary-source records are exempt from it by construction. Feedback scoring is a **fifth stage that reorders
what survives**, not a sixth filter that removes more.

### The two cities

| City | Config | State dir | launchd job |
|---|---|---|---|
| Houston / Texas | `config.yaml` | repo root | `com.autonews.monitor` |
| New York / NY State | `config-nyc.yaml` | `state-nyc/` | `com.autonews.nyc` |

Houston watches 46 feeds plus custom ingesters for SEC EDGAR, Texas WARN, TDLR
licenses, and HCAD commercial property. New York watches 66 feeds plus NY/NJ
WARN, EDGAR, DOB permits, DCWP licenses, and ACRIS deeds.

**This is the reason feedback must be per-city.** State is already separated by
`state_dir`; feedback follows the same rule and lands in the same place.

### Existing state files

| File | Holds | Shape |
|---|---|---|
| `seen.json` | URLs already sent | ordered list, capped at 8000, oldest evicted |
| `status.json` | run bookkeeping | small dict |
| `health.json` | per-run funnel counts + drops | `{"runs": [...]}` |
| `src-*.json` | per-source snapshots for diffing | per ingester |

Feedback adds one more file per city and follows the same conventions:
plain JSON on disk, in the city's `state_dir`, no database.

## Constraints this has to work around

These are properties of the existing system, not opinions.

**The laptop sleeps.** launchd only fires while the Mac is awake. There is
already a `daily_sweep` that promotes the first run at/after 9am into a wide
catch-up pass. Anything always-on — including the click endpoint — cannot assume
it is reachable when I click. The design consequence: **clicks must not be lost
when the endpoint is down.** A rating link that only works while the monitor
happens to be awake is a broken rating link.

**Dedup keys on the raw URL.** `load_seen()` builds a dict from a plain list of
URLs, keyed on `entry.link` with no normalization. The same story arriving via
Google News (opaque `CBMi...` redirect URLs) and via the publisher directly is
two different keys, so it sends twice. Out of scope to fix here, but it shapes
this design: **item identity cannot be the URL.** Two ratings on what is
really one story must be reconcilable later.

**The digest is never written to disk.** `monitor.py` renders HTML and hands it
to SMTP. There is no `--dry-run`, no `--preview`; the only CLI argument is
`--config`. This is why R7 exists and why it is task 1 — every later piece needs
to see the digest to be checkable.

**`seen.json` is capped at 8000** and evicts oldest-first (Houston is at ~6,853).
Feedback must not depend on an item still being in `seen.json` to stay
meaningful.

## The new pieces

### 1. Item identity

Feedback needs something stable to point at. The URL will not do — it is
unstable across sources (see above) and is often an opaque Google News
redirect.

An item ID is derived from the item's durable properties rather than its link,
so the same story surfaced twice can be recognized as the same story later.
Computed during discovery, carried through the pipeline, and embedded in the
digest.

**Why this is its own piece:** every other piece references it, and getting it
wrong means re-rating everything.

### 2. Feedback store

Append-only, one record per judgment, in the city's `state_dir`.

Append-only rather than a mutable table for three reasons: a crash mid-write
loses one line instead of the file; the full history stays available for the
before/after comparison R4 requires; and changing my mind is a new record, so
the record of having changed my mind is preserved.

Each record holds enough to be readable on its own later: the item ID, what the
item was, its source, the rating, and when. Denormalized on purpose — the store
must remain meaningful after the item has aged out of `seen.json`.

### 3. Click endpoint

Receives rating clicks from the email and appends to the store.

**The availability problem is the real design constraint here.** The laptop
sleeps; I read email on a phone. Options, in order of preference:

1. **Endpoint absent → the click still counts.** The rating link encodes the
   judgment, and a click that cannot reach the endpoint is queued by the
   sender's own retry or recorded on next contact. Most robust, most work.
2. **Local-only endpoint, clicks work when the Mac is awake**, with an honest
   failure page when it is not. Simplest thing that could work, and acceptable
   for a solo tool — but it silently loses ratings made from a phone at night,
   which is exactly when I read email.
3. **Ratings collected by replying to the digest**, parsed on the next run. No
   uptime requirement at all, but clunkier.

**Decision: start with (2), because it is checkable end-to-end in an afternoon,
and treat the lost-click case as a known limitation to measure rather than
solve up front.** If in practice most ratings happen away from the desk, this is
the piece to revisit first — and that is a real possibility, not a remote one.

### 4. Scoring layer

Runs after the beat filter, before rendering. Reads the feedback store, scores
surviving items, and reorders.

**Reorders, never removes** (R3). Demoted items move into a labeled lower
section. Two reasons: an over-eager filter that silently hides a real story is
the worst possible failure for a reporting tool, and I cannot correct a mistake
I never see.

Wrapped so that any failure — missing store, unreadable JSON, scoring bug —
logs and falls through to today's ordering (R6).

**How it learns is deliberately left open here.** Scoring on source and beat
first, since those already exist as structured fields, is the obvious start.
Whether that is enough is an empirical question, and `requirements.md` leaves
"how much feedback is enough" open for the same reason. Committing to a
mechanism now would be guessing.

### 5. Preference summary

Reads the store and describes, in prose, what the ratings add up to. Corrections
are appended to the store as records, so they carry the same weight as ratings
and there is only ever one source of truth.

## How it fits together

```
discover → full text → summarize → geo filter → beat filter
                                                     │
                                    ┌────────────────┴────────────────┐
                                    │  scoring layer (new, optional)  │
                                    │  reads feedback store, reorders │
                                    └────────────────┬────────────────┘
                                                     │
                                              render digest
                                              ├── --preview → file
                                              └── default   → SMTP
                                                     │
                                          I read it, I click
                                                     │
                                          click endpoint (new)
                                                     │
                                          feedback store (new)
                                                     └──→ back to scoring
```

The loop closes at the store. Everything left of the scoring layer is unchanged
existing code.

## What this does NOT change

Stated so the blast radius is explicit:

- Discovery, full-text fetching, and summarization are untouched.
- The geo and beat filters are untouched. Feedback reorders survivors; it does
  not widen or narrow what gets in.
- `seen.json`, `status.json`, and `health.json` keep their current formats.
- Email delivery and SMTP config are untouched.
- No config schema changes beyond what the feedback feature itself needs.
