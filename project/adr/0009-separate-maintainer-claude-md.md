# 0009: Separate maintainer `CLAUDE.md` from student-facing guide

- Status: Accepted
- Date: 2026-08-04

## Context

The original plan put a single `CLAUDE.md` at the repo root, meant to be
pasted by students into their own Claude sessions for day-specific guidance.
Separately, this repo now needs its own maintainer-facing guidance (check
`project/REQUIREMENTS.md` and `project/adr/` before working, log new tasks
and decisions as they come up) — and Claude Code auto-loads a root
`CLAUDE.md` as project instructions for *whoever* is working in the repo,
including maintainer build sessions. One file can't cleanly serve both a
"build this website" audience and a "here's how to use git for your
workshop submission" audience without either bloating or confusing both.

## Decision

Root `CLAUDE.md` is the maintainer/build guide — instructions for Claude Code
sessions working on this repo itself (this website). The student-facing
day-by-day guidance is written to `STUDENT_CLAUDE_GUIDE.md` at the repo root
instead of `CLAUDE.md`, and referenced from `SUBMISSION_GUIDE.md` /
`setup.html` for students to copy into their own sessions.

## Consequences

- Deviates from the approved plan's exact filename for the student guide —
  functionally identical content, different filename, to avoid the
  maintainer/student instruction collision.
- Anywhere the original plan says "paste `CLAUDE.md` into your session,"
  student-facing docs must say `STUDENT_CLAUDE_GUIDE.md` instead.
