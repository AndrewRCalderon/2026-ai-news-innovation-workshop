# 0022: One continuous per-student folder, not per-day; `SUBMISSION.md` supersedes README-driven fields

- Status: Accepted
- Date: 2026-08-20
- Supersedes: [0003](0003-daily-merge-branch-workflow.md) (folder-namespacing
  portion only), [0008](0008-readme-driven-portfolio-data.md)
  (data-source/field portion only), [0021](0021-student-submission-metadata-file.md)
  (superseded entirely, folded into this ADR)

## Context

Two prior decisions turned out to conflict with each other and with this
session's newer work, once actually read together instead of assumed:

- ADR 0003 has each student writing only inside a **per-day** folder,
  `submissions/day-N/their-name/`, specifically so different students' PRs
  never touch the same files.
- ADR 0004 places that path inside the deploy root:
  `docs/submissions/day-N/name/`. The live copy in
  `docs/day-1/08-fork-and-submit.html` never actually picked up the `docs/`
  prefix — it still reads `submissions/day-1/your-name/`.
- ADR 0008 decided portfolio data comes from extending each student's
  `README.md` (Problem Statement / How It Works / What Worked / What I'd Do
  Differently, plus title/pitch and demo path), with portfolio pages
  hand-built rather than auto-generated for this cohort size.

Separately, this session built `STUDENT_CLAUDE_GUIDE.md` (student-facing
`CLAUDE.md` guidance) and, initially, a `SUBMISSION.md` template file at the
repo root with its own field set — without checking these ADRs first. That
work needs to be reconciled, not layered on top of a contradiction.

Two questions got resolved directly with the user:

1. **Does the per-day folder still make sense?** ADR 0003's actual goal was
   "no two students' PRs ever touch the same file." A single,
   uniquely-named-per-student folder achieves that just as well as a
   per-day one — the day-N segment was incidental to the goal, not
   load-bearing. It also makes ADR 0004's "Day 2 builds on Day 1, not
   starting over" claim literally true, instead of requiring the student to
   manually copy their folder's contents forward into a new day-N folder
   every day.
2. **README-driven fields, or `SUBMISSION.md`?** Keep `SUBMISSION.md` as its
   own dedicated file, with its own field set (see the file itself for the
   current fields — the user has been iterating on it directly). ADR 0008's
   separate stance that portfolio pages are hand-built, not
   auto-generated, for this cohort size is **not** being revisited here,
   only its data-source/field decision.

A third, related fix: `STUDENT_CLAUDE_GUIDE.md` and `SUBMISSION.md` are
**copied**, not moved, into each student's folder. Every fork starts from
the same root copies of both files. `STUDENT_CLAUDE_GUIDE.md` is already
linked from live pages (`docs/setup-day-2.html`, `docs/day-2/03-claude-md.html`)
— if a student's merged PR deleted the root copy, those links would break
for every subsequent visitor and student. Moving also carries a smaller,
mostly theoretical concurrent-deletion risk across students' merges; copying
avoids both problems outright.

## Decision

- Each student works inside one folder for the entire workshop:
  `docs/submissions/your-name/`. Created once, during Day 1's Fork & Submit
  session, reused through Day 2 and Day 3 — not recreated per day.
- `STUDENT_CLAUDE_GUIDE.md` (as `CLAUDE.md`) and `SUBMISSION.md` are both
  **copied** (not moved) from the fork's root into that folder as part of
  Day 1's Fork & Submit session. The root copies of both files stay in
  place permanently, since they're linked from live site pages.
- `SUBMISSION.md`'s field set (see the file itself) is the source of truth
  for portfolio/showcase data going forward, replacing ADR 0008's
  README-based fields.
- ADR 0003's daily-merge branch workflow (`day-1`/`day-2`/`day-3` branches,
  merged to `main` by the instructor between days) is unchanged — only the
  folder-path detail it referenced is superseded.
- ADR 0008's "hand-built, not auto-generated" portfolio-page stance is
  unchanged — this ADR only supersedes where the data comes from.

## Consequences

- `docs/day-1/08-fork-and-submit.html` and its Slides companion need their
  `submissions/day-1/your-name/` copy corrected to
  `docs/submissions/your-name/`, plus a new step for copying both files in.
- `docs/day-2/03-claude-md.html`'s §03 exercise, built around copying
  `STUDENT_CLAUDE_GUIDE.md` in fresh on Day 2, needs reframing — the file
  will already be present from Day 1, so the exercise becomes reviewing and
  updating it, not introducing it.
- The Phase 4 "Extended `README.md` submission template" task
  (`project/REQUIREMENTS.md`) is superseded by `SUBMISSION.md` and no
  longer needs building.
- `SUBMISSION.md`'s field set is still expected to change as it gets used
  in a real cohort — this ADR documents the current decision, not a final
  one.
