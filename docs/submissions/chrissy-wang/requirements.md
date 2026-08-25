# requirements.md — AutoNews feedback loop

> What this needs to do, described as behavior. No implementation here — that's
> `architecture.md`. Build order is `tasks.md`.
>
> **Scope of this spec:** stage 2 of AutoNews, the feedback loop. Stages 3–5
> (reporting brief, drafting, video) are named under *Out of scope* and are
> deliberately not specified yet.

## The problem

AutoNews currently runs one way. It finds items, ranks them by fixed rules in a
config file, and emails them. When it surfaces something useless, nothing
changes. When it surfaces something I chase all the way to a published story,
nothing changes either. Every day starts from the same fixed rules, so the tool
cannot get better at my beat — only I do.

## What it should do

### R1 — Rate an item without leaving the digest

Every item in the digest carries a way to record a judgment: **worth chasing**
or **not worth it**. Recording a judgment takes one action and does not require
opening a separate app, logging in, or copying an ID.

Recording a judgment gives visible confirmation that it was received. If it
cannot be recorded, I am told so plainly rather than the click silently failing.

### R2 — Judgments persist

A recorded judgment survives the laptop sleeping, the monitor restarting, and
the machine rebooting. Judgments accumulate over time rather than being reset
each run or each day.

A judgment stays attached to the specific item it was about, and remains
readable later as: what the item was, which source it came from, when it was
rated, and which way.

### R3 — Judgments change what surfaces next

Once enough judgments exist, the ordering of the digest reflects them. Items
resembling ones I marked *worth chasing* appear earlier. Items resembling ones I
marked *not worth it* appear later.

**Nothing is silently dropped.** A demoted item still appears in the digest, in
a clearly labeled lower section. I can always see what was pushed down, and
disagree with it.

### R4 — The learning is visible, not asserted

For any given day I can see the ordering the digest would have had *without* my
feedback alongside the ordering it actually had. The difference is the evidence
that feedback is doing something.

If feedback has not yet changed anything, that is stated plainly rather than
implied.

### R5 — I can read and correct what it thinks I care about

I can ask for a plain-language summary of what the tool has concluded from my
judgments — which sources, topics, and kinds of item it now favors or avoids.

The summary is written for me to read, not as raw scores. When it is wrong, I
can correct it directly, and the correction carries the same weight as a rating.

### R6 — Failure degrades gracefully

If any part of the feedback system is unavailable — the store is unreadable, the
endpoint is down, the laptop was asleep — **the digest still sends**, ranked by
the existing config rules, with no feedback applied.

Losing the feedback loop must never mean losing the daily digest. The digest is
the thing that already works; this is an addition to it.

### R7 — I can see the digest without sending it

The digest can be produced and inspected without emailing it. This is a
requirement, not convenience: today the only way to see the output is to send
mail to myself, which makes every change to the digest slow to check and
impossible to iterate on quickly.

## Constraints

- **The machine sleeps.** Nothing may assume continuous uptime. Ratings made
  while the monitor is not running must still be captured, or must fail in a way
  that tells me so.
- **One engine, many cities.** No place names, no city-specific behavior in
  code. Anything city-specific belongs in that city's config, and feedback must
  be kept per-city — Houston judgments must not reorder the New York digest.
- **No credentials in anything committed.** Existing `.env` handling stands.
- **Solo use.** One reader, one mailbox. No accounts, no multi-user, no sharing.
- **The digest is the product.** Any change that risks the daily email not
  arriving is the wrong change.

## Acceptance criteria

Finished means all of these are true:

1. Every item in a delivered digest can be rated in one action.
2. A rating made today is still readable after a reboot tomorrow.
3. For a fixed set of items, feedback-on and feedback-off produce a demonstrably
   different order, and I can view both.
4. No item is removed from the digest by feedback — only reordered or moved into
   a labeled lower section.
5. Asking what the tool thinks I care about returns readable prose, and a
   correction I give changes subsequent ordering.
6. With the feedback store deliberately deleted or corrupted, the digest still
   sends, ranked as it is today.
7. The digest can be rendered and read without sending an email.

## Out of scope, for now

Named so they are not accidentally built, and so a later spec can pick them up:

- **Stage 3 — reporting brief.** Who to interview, what background to read, what
  articles to read first, for items I flag.
- **Stage 4 — drafting.** Writing the story.
- **Stage 5 — video.** Turning a finished story into an animated video in a
  selectable style, for social distribution.
- **Cloud deployment.** Still a laptop-scheduled tool. Moving off the laptop is
  its own piece of work.
- **Deduplication fixes.** The same story arriving under two URLs is a real,
  known bug (see `architecture.md`), but it is not this spec's job. It is noted
  here only because duplicates make rating more annoying.
- **A third city.** The engine supports it; adding one is config work, not this.
- **Multi-user anything.**

## Open questions

Decided by default, flagged so they can be revisited:

- **Rating vocabulary.** Two options (worth chasing / not worth it) is the
  assumption. A third — "interesting, not now" — may be worth adding once there
  is real usage to judge from.
- **How much feedback is "enough"** before ordering should visibly change. Left
  to be discovered from real data rather than guessed at now.
