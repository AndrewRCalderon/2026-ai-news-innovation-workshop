# 0007: Shared rate-limited serverless proxy for live Claude API calls

- Status: Accepted
- Date: 2026-08-04

## Context

Some student projects (e.g. a "source verification" tool) will want their
deployed product — not just their dev workflow — to call Claude. Students
get Claude access for *development* through an enterprise VS Code/Claude Code
seat, which needs no API key in their code at all. But a live product demo is
different: a static site calling the Anthropic API from the browser must ship
the key in client-side JS, which is readable by anyone who loads the page
(view-source / network tab) — independent of whether the source repo is
private. That's true regardless of [0002](0002-public-repo.md).

Considered alternatives: (a) local-only demos with a recording embedded in
the portfolio page instead of a live version — zero infra, but no interactive
public demo; (b) "bring your own key" — visitor pastes their own key — more
UI complexity than justified for 5 students. Decided against both once we
confirmed we want real interactive demos while still controlling cost.

## Decision

One serverless function, `api/claude-proxy.ts`, holds a single shared
Anthropic key as a Vercel environment variable (never committed). Student
demo front-ends call this proxy instead of Anthropic directly. Protected by:
- Rate limiting via Upstash Redis (free tier) + `@upstash/ratelimit`, keyed
  by visitor IP.
- A hard `max_tokens` cap per request.
- A pinned cheaper/faster model for public-proxy traffic, independent of the
  rate limiter, as a second cost backstop.

## Consequences

- This is real infrastructure to build, not a checkbox — scoped as its own
  build phase (Phase 2 in `project/REQUIREMENTS.md`), validated before any
  student content depends on it.
- Introduces new dependencies: Upstash account, `@upstash/ratelimit`,
  `@upstash/redis`, and whatever Anthropic SDK the function uses.
- All student demos that call Claude must be written to hit this proxy
  endpoint, not the Anthropic API directly — needs to be stated in the
  student-facing guide once demos are in scope for a given day.
