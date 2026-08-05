# 0002: Public repository from project start

- Status: Accepted
- Date: 2026-08-04

## Context

The original plan assumed the repo would stay private until the workshop
team chose to open it up. But GitHub Pages only builds from private repos on
paid plans (Pro/Team/Enterprise Cloud); the account this repo lives under is
not confirmed to have one. Content is a workshop curriculum and student
portfolio material — not sensitive.

## Decision

Make the repository public from the start, rather than working around a
paid-plan dependency or standing up a private-source/public-deploy split
(e.g. Vercel deploying from a private repo).

## Consequences

- Removes any GitHub-plan dependency for deployment.
- Student and curriculum content is visible to anyone from day one — full
  names in student portfolio URLs (see
  [0008](0008-readme-driven-portfolio-data.md)) are a deliberate choice made
  with this in mind, not an oversight.
- No "reveal" moment; if the team ever wants a private working period, that
  would require reopening this decision.
