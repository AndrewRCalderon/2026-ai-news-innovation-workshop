# tasks.md — AutoNews feedback loop

> Small, checkable pieces in build order. Each task names its own check, so
> "is this done" has one answer and not an opinion.
>
> Requirements are in `requirements.md`; the design is in `architecture.md`.
> A task is done when its check passes — not when the code looks finished.

## Ordering logic

Task 1 comes first because nothing after it is checkable without it: today the
only way to see the digest is to email it to myself. Task 2 comes second because
every later piece points at item IDs, and changing them later means re-rating
everything. After that each task is usable on its own — the loop closes at task
5, and task 6 makes it legible.

---

## Task 1 — See the digest without sending it ✅ DONE (2026-08-25)

Shipped as `--preview [PATH]`. Renders through the real `build_email_html()` path,
writes to `STATE_DIR/preview.html` by default.

**A preview run has no persistent side effects.** `save_seen()`, `record_health()`
and `maybe_send_heartbeat()` are all skipped. Skipping `save_seen()` is the one
that matters: without it a preview would mark items seen and the next real run
would silently never email them.

Check results — verified against an isolated config + state dir, so the real data
was never at risk:

- Rendered 72 items to file, no email sent.
- `seen.json`, `health.json`, `status.json` and the NYC state file were all
  byte-identical before and after (md5 compared).
- Found and fixed a preview-only defect: `build_email_html()` emits no
  `<meta charset>` because the real send declares UTF-8 in the MIME header. As a
  file the browser guessed Latin-1 and mangled every emoji and Chinese sentence.
  The preview now declares the charset so it matches the email.

Still unverified: the with-flag / without-flag side-by-side, because that needs a
real send. Worth doing on the next real digest.

**Why first:** every later task needs to look at the output to be checked.

Add a way to render the digest to a file instead of emailing it. Uses the real
rendering path, not a parallel copy — a preview that renders differently from
the real digest is worse than no preview.

Must not touch the send path. Running without the flag behaves exactly as today.

**Check:** run it with the flag — a readable HTML file appears, no email is
sent. Run it without — the email arrives as usual. Open both, confirm they
match.

---

## Task 2 — Stable item IDs

**Why second:** tasks 3–6 all reference items by ID. Changing the scheme later
invalidates every rating already collected.

Give each item an identifier derived from its durable properties rather than its
URL (see `architecture.md` on why the URL will not do). Computed at discovery,
carried through the pipeline, visible in the preview output.

**Check:** run twice against the same source data — the same story gets the same
ID both times. Confirm a story reachable via both a Google News redirect and its
publisher URL produces the same ID, or write down explicitly that it does not
yet and why. Confirm the digest is otherwise unchanged.

---

## Task 3 — Feedback store

Append-only file in the city's `state_dir`, one record per judgment, holding
enough to stay readable after the item ages out of `seen.json`: item ID, what
the item was, its source, the rating, the timestamp.

Nothing writes to it yet. This task is the format and the read/write path.

**Check:** write a few records by hand, read them back, confirm they survive a
restart. Confirm Houston and New York write to separate files. Corrupt the file
deliberately and confirm reading it fails loudly rather than silently returning
nothing.

---

## Task 4 — Click endpoint and rating links

The first piece I can actually use.

A local endpoint that records a judgment and returns a visible confirmation
page. Rating links embedded in each digest item.

Per `architecture.md`, the starting version only works while the Mac is awake.
That is a deliberate, known limitation — **so this task includes making the
failure visible**, not hiding it. A click that cannot be recorded says so.

**Check:** send a real digest to myself. Click a rating link — confirmation
appears, a record lands in the store. Stop the endpoint, click another link,
confirm I get a clear failure rather than a silent success. Rate items in both
cities' digests and confirm they land in separate stores.

**Also record, don't just build:** over the first week, roughly what share of
ratings fail because the machine was asleep. That number decides whether the
endpoint design needs revisiting, and guessing it now would be inventing data.

---

## Task 5 — Scoring layer

The loop closes here.

Runs after the beat filter, before rendering. Reads the store, scores surviving
items, reorders. Demoted items move to a labeled lower section — **never
removed** (R3).

Wrapped so any failure falls through to today's ordering and logs why (R6).

Start by scoring on source and beat, which already exist as structured fields.
Whether that is enough is an open question by design; do not invent a more
elaborate mechanism before there is real feedback data to test one against.

**Check:** with an empty store, ordering is identical to today's. With ratings
present, ordering changes and demoted items are still present in the lower
section. Delete the store mid-run and confirm the digest still sends, ranked as
today, with the fallback logged. Count items before and after scoring: the two
numbers must match.

---

## Task 6 — Before/after view and preference summary

Makes the learning visible (R4) and correctable (R5).

Two parts: a way to see a given day's items ranked both with and without
feedback applied; and a plain-language summary of what the ratings add up to,
with corrections appended to the store as records.

**Check:** for a day with real ratings, view both orderings and confirm they
differ. If they do not, that is a finding about task 5, not a failure of this
task — write it down. Ask for the summary and confirm it reads as prose I would
actually use. Give a correction and confirm subsequent ordering reflects it.

---

## Validation across the whole thing

Per-task checks prove each piece matches the spec. These prove the spec was
right — a distinction the lesson makes and the one that actually matters.

- **Run the acceptance criteria in `requirements.md` end to end**, all seven, in
  order, on a real digest. Passing tests on individual tasks is not the same as
  the feature working.
- **The real test is the side-by-side.** Same day's items, ranked feedback-off
  versus feedback-on. If I cannot tell them apart, the loop is not working no
  matter what the code does.
- **After roughly two weeks of real use, ask the harder question:** is it
  surfacing things I actually chase — or has it only learned to agree with me?
  A feedback loop that narrows toward what I already clicked is a real failure
  mode for a reporting tool, and it will look like success from the inside.
  If that is happening, the spec was wrong, not the code.

## Keeping these files honest

If the project changes, these three files change in the same commit. A spec that
has quietly stopped matching reality is worse than no spec — an agent will
follow it confidently long after it stopped being true.
