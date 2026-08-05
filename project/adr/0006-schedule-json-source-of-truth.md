# 0006: `schedule.json` as single source of truth for timeline data

- Status: Accepted
- Date: 2026-08-04

## Context

Session times, durations, and types (lecture/discussion/hands-on/break) need
to appear in two places per session: the day-overview timeline visualization
and the individual topic page's metadata badge. Authoring this by hand in
both places risks drift (e.g. a time change on the timeline that never makes
it to the topic page).

## Decision

Author one `docs/data/schedule.json` describing every session (day, order,
title, start time, duration, type, link, deliverables). `docs/js/timeline.js`
renders the day-overview timeline from it; topic pages read their own entry
to populate the metadata sidebar.

## Consequences

- One place to edit when a time or session changes.
- Topic pages and timeline rendering both depend on this file loading
  correctly — a malformed `schedule.json` breaks both surfaces at once, so it
  should be validated (e.g. a quick JSON-schema or manual check) before
  content-fill begins.
