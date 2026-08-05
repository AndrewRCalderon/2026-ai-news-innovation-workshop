# 0004: Student submissions live inside `docs/`

- Status: Accepted
- Date: 2026-08-04

## Context

The original file structure put `submissions/` as a sibling of `docs/`
(the deployed static root). Portfolio pages were meant to link to a live demo
under `submissions/day-1/name/`, but a path outside the deploy root is never
served by Vercel/Pages — the plan's own demo-link pattern couldn't work as
written.

## Decision

Move submissions inside the deploy root: `docs/submissions/day-N/name/`.
Combined with [0003](0003-daily-merge-branch-workflow.md) (daily merges to
`main`) and [0001](0001-deploy-via-vercel.md) (single shared deployment),
this means there is one live site that always reflects the latest merged
work from every student.

## Consequences

- Portfolio "live demo" links point at paths that are actually deployed.
- Student submission folders are part of the same repo tree as the
  curriculum site — no separate per-student Pages/Vercel projects to manage.
- Any given student's raw files, once merged, are visible to any site visitor
  (consistent with [0002](0002-public-repo.md)).
