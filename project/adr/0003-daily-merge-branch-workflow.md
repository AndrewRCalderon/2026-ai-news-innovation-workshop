# 0003: Daily instructor-merge branch workflow

- Status: Accepted
- Date: 2026-08-04

## Context

CLAUDE.md guidance for students needs Day 2 to "build on Day 1," but also
described `day-2` as a fresh branch not continuing from `day-1` — a direct
contradiction. Each student only ever writes inside their own
`submissions/day-N/their-name/` folder, so different students' PRs never
touch the same files and can always merge without conflict.

## Decision

Each day's student PRs are merged into `main` by the instructor before the
next day's branch work begins. `day-2` and `day-3` branches are cut from
`main` (which by then contains the student's own merged prior-day work),
rather than from the previous day's branch directly.

## Consequences

- Resolves the CLAUDE.md contradiction: "fresh branch from main" and
  "builds on yesterday" are both true simultaneously.
- Introduces a hard sequencing dependency: Day 2 branch work assumes Day 1
  PRs are already merged. This must be stated plainly in the student-facing
  guide and the instructor needs to actually do the merge pass each day.
- Also makes `main` the live state the deployed site reflects — ties directly
  into demo hosting (see [0004](0004-submissions-inside-docs.md)).
