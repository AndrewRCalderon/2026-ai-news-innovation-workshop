# 0008: README-driven portfolio data; manual page generation for v1

- Status: Accepted
- Date: 2026-08-04

## Context

Student portfolio pages need a project title/pitch, problem statement, and
reflection per day. The original plan offered three generation options:
manual, semi-automated template, or fully automated via the GitHub API
(client-side, unauthenticated — subject to a 60 req/hr/IP rate limit).
Considered adding a separate data-collection tool (Google Form) for an
end-of-day reflection step, but that duplicates data students already write.

## Decision

Extend the existing `README.md` submission template (Problem Statement / How
It Works / What Worked / What I'd Do Differently) with two portfolio-specific
fields: a one-line project title/pitch, and a demo path. This README, written
as part of each day's PR, is the single source of the reflection data. For
this first cohort (5 students), portfolio HTML pages are still hand-built
from that data — not auto-generated from the GitHub API.

## Consequences

- No new tool introduced; reuses the git/PR workflow students already do.
- Hand-building 5 students × 3 days of portfolio content is a real,
  repeated content-fill task (tracked in Phase 4/5 of
  `project/REQUIREMENTS.md`), not free — acceptable at this scale, worth
  revisiting (Option C, GitHub API automation) if the cohort size grows.
