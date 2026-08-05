# CLAUDE.md — Maintainer / Build Guide

This file is for Claude Code sessions working **on** this repository —
building the workshop website itself. It is not shown to workshop students.
Their day-by-day guidance lives in `STUDENT_CLAUDE_GUIDE.md` (see
[ADR 0009](project/adr/0009-separate-maintainer-claude-md.md) for why these
are separate files).

## Before starting work

- Read [`project/REQUIREMENTS.md`](project/REQUIREMENTS.md) for current task
  status and what's next in the active phase.
- Read [`project/adr/`](project/adr/) for existing architecture decisions
  before proposing a new approach to something already decided. If a past
  decision needs to change, write a new ADR that supersedes it — don't edit
  the old one.

## While working

- Check off tasks in `project/REQUIREMENTS.md` as they're completed. Add
  newly discovered tasks to its "Newly identified tasks" section rather than
  letting them go untracked.
- Any non-trivial technical decision (new dependency, changed data flow,
  hosting/infra change, a plan deviation) gets a new numbered file in
  `project/adr/`, following the existing format (Context / Decision /
  Consequences).

## Repo layout

- `docs/` — the deployed static site (Vercel). This is the only directory
  that ends up live at the public URL.
- `project/` — internal build tracking (this file's companions). Never
  linked from the public site.
- `api/` — the one serverless function (Claude proxy, see
  [ADR 0007](project/adr/0007-serverless-claude-proxy.md)). Never put
  secrets in this directory's source — they're Vercel environment variables.
- `STUDENT_CLAUDE_GUIDE.md`, `SUBMISSION_GUIDE.md` — content students copy
  into their own workflow. Treat as content-fill deliverables, not this
  file's concern.
