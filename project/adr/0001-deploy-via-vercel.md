# 0001: Deploy via Vercel instead of GitHub Pages

- Status: Accepted
- Date: 2026-08-04

## Context

The original plan deployed the static site via GitHub Pages from `docs/` on
`main`. Separately, we decided some student projects need to call the Claude
API from their live deployed demo, which requires a server-side proxy holding
a shared key (see [0007](0007-serverless-claude-proxy.md)) — GitHub Pages
serves static files only and cannot host that function.

## Decision

Deploy via Vercel. It hosts the static `docs/` output and a serverless
function (`api/claude-proxy.ts`) in the same project, so no second hosting
service is needed just for the proxy. It also produces an automatic preview
deployment for every PR.

## Consequences

- One deploy target for both static content and the proxy function.
- Adds a dependency on Vercel's platform/account instead of relying solely on
  GitHub's own hosting.
- PR preview URLs are available as a side benefit — could be surfaced to
  students as an early look at their own work before the daily merge.
