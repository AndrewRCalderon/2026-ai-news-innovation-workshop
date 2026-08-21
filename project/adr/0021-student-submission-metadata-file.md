# 0021: `SUBMISSION.md` ships as a pre-built template at repo root

- Status: Superseded by [0022](0022-continuous-student-folder.md)
- Date: 2026-08-20

## Context

Phase 4's student showcase (`docs/students/index.html` hub page, portfolio
cards) needs basic submission data per student — title/pitch, demo path,
and similar — pulled from each of the 5–7 student forks of this repo. That
hub page and its harvesting mechanism aren't built yet and aren't scoped by
this decision. What's needed now is something upstream of that: a
consistent place in every student's fork where this data actually lives,
so a future harvester has something predictable to read.

Two options were considered for where that data lives: extending
`README.md` with a metadata section, or a dedicated file. A `README.md`
section was rejected — README content tends to grow and reshape around a
project's own narrative over the course of the workshop, making it an
unreliable, moving target for a future parser. A structured, machine-
readable format (e.g. `.workshop/submission.json`) was also considered and
rejected for now as more rigidity/setup than warranted before this
convention has been tried even once.

`STUDENT_CLAUDE_GUIDE.md` already tells Claude to help students keep this
kind of file current (see its "Keeping submission info current" section).
That instruction only works if the file already exists as a known target
in every fork from the start, rather than being invented fresh, and
inconsistently, by each student's Claude session.

## Decision

Added `SUBMISSION.md` at the repo root, a plain-markdown template with a
fixed field list (Student Name, Fork URL, Status, What you're creating,
Hypothesis or problem statement, Solution). It ships in this repo now, so
every student fork inherits it automatically at the same path.
`STUDENT_CLAUDE_GUIDE.md` instructs Claude to help the student fill it in
early and keep it updated as the project changes, including through
restructures.

The field set is a deliberate v1, not final — see the corresponding
`project/REQUIREMENTS.md` follow-up task. It's expected to change once the
harvesting mechanism (how `docs/students/index.html` will eventually read
across all forks) is actually designed; that design work is out of scope
here.

## Consequences

- Every student fork has a predictable, known path (`SUBMISSION.md`) for a
  future harvester to target, whatever that mechanism ends up being.
- The field set will likely need revisiting once real submissions exist in
  it and the harvesting mechanism is designed — tracked as an open
  follow-up, not treated as settled by this ADR.
- If the harvesting mechanism ends up needing machine-parseable data (e.g.
  YAML front matter) rather than prose bullets, `SUBMISSION.md`'s format
  will need a follow-up revision across already-forked student repos, not
  just this one.
