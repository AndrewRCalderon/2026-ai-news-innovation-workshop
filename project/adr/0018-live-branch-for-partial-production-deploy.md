# 0018: Separate `live` branch as Vercel's production branch during active review

- Status: Accepted
- Date: 2026-08-12

## Context

The Day 1 restructure (Claude Desktop pivot, schedule retiming, Adiel's
review feedback) was merged directly into `main`. Separately, the new
`setup.html` needed to be shareable with students immediately — but the
rest of the Day 1 rework is still mid-review and not meant to be
publicly visible yet.

Vercel's Deployment Protection was considered first, but it's all-or-
nothing per deployment: there's no built-in way to protect every page
except one. Its "Share Deployment" bypass-link feature was also
considered, but the bypass isn't path-scoped — once a visitor's browser
has the bypass cookie, they can navigate anywhere in that deployment, not
just the shared page. Reverting `main` itself and re-applying just the
setup page was also considered, but that would mean reverting real,
already-reviewed work sitting on `main` and redoing it later.

## Decision

Created a new branch, `live`, starting from the commit immediately before
today's Day 1 merge (`a8be2ec`) — i.e., the site exactly as it was
before today. Cherry-picked over only the files needed for the new setup
flow: `docs/setup.html`, `docs/setup-day-2.html`, `docs/js/checklist.js`,
and the isolated checklist CSS addition in `docs/css/briefing.css`.
Fixed one internal link in `setup.html` that referenced today's
renumbered Fork & Submit path, since `live` still uses the old
(pre-rework) file structure. The user points Vercel's **Project
Settings → Git → Production Branch** at `live` instead of `main`.

## Consequences

- `main` stays the real integration/review branch — it can keep
  accumulating Day 1 rework (and any other in-progress work) without
  affecting what's actually live.
- **Real gotcha to remember**: once Production Branch points at `live`,
  anything merged into `main` will *not* appear in production until it's
  separately cherry-picked onto `live` (or Production Branch is pointed
  back at `main`). This is an easy thing to forget later — if another
  "ready to ship now" page shows up while the rest of Day 1 is still in
  review, it needs the same treatment as `setup.html` did here.
- When the full Day 1 restructure is ready to go live, the cleanest
  resolution is pointing Production Branch back at `main` (one Vercel
  settings change, no git surgery) — not merging `live` back into `main`,
  since `live` has no unique history worth preserving beyond what
  already exists on `main`.

## Update, 2026-08-12

Vercel's dashboard has moved this setting: it's now under **Settings →
Environments**, with a "Production" environment entry that has its own
branch assignment — not the classic "Settings → Git → Production Branch"
path referenced above. Also worth knowing: changing which branch an
environment tracks does **not** retroactively rebuild/promote anything.
The previous deployment keeps serving the stable production URL until a
new build actually happens — a push (including an empty one) to the
newly-assigned branch is what triggers that.
