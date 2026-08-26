# This is a test fixture. No outreach here was sent, and none should be.

Generated 2026-08-25 to answer one question: **does reading the story draft straight out of
Google Docs produce the same outreach as filling in `BRIEF.md` by hand?**

The comparison is against `../kalshi-flight-cancellation-markets/`, which was written from the
brief. Same story, same two recipients, written from a live in-progress draft instead of a form.

**Result: the two bodies are byte-identical apart from the deadline line**, which the Apps Script
sidebar now supplies at draft time rather than the model inventing one.

**How much that proves, honestly.** Less than it looks. Claude had already read the brief-derived
version earlier in the same session, so this is a consistency check, not a blind replication. A
real test needs a story whose correct output nobody has seen. Worth doing; not done yet.

The addresses are real press desks, both HIGH, both taken from `contacts/press-contacts.csv`
rather than researched again — the rows were sourced the same day. That is why the tracking
status says FIXTURE rather than `not sent`: a log that reads as pending outreach to a real
company is worse than no log at all.
