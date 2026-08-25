# Changelog — Project Dissonance

The running record of how this project got built: what changed on each
working day, why, and what was tried and rejected. Scoped to this submission
folder only.

This is **not** the repo's `project/CHANGELOG.md` — that one belongs to the
workshop site itself and is maintained by the workshop lead. Session wrap-ups
for this project go here instead.

For what the project *is* and where it stands, see [`SUBMISSION.md`](SUBMISSION.md)
and [`SPEC.md`](SPEC.md).

## Change log

- 2026-08-25 — **Made `dissonance_close` the single wrap-up Skill, and pinned
  every path it touches to this folder.** The reference copy of the lead's
  `chat_close` became `dissonance_close`, scoped to this submission and asking
  before it pushes. Every file it named was a bare filename — `SUBMISSION.md`,
  `CHANGELOG.md`, `CLAUDE.md`, `SPEC.md` all have same-named siblings at the
  repo root, under `project/`, or in other students' folders — so each is now
  written out in full, with a do-not-touch list and a check that no staged path
  escapes `docs/submissions/michael-flowers/`. Corrected `CLAUDE.md`, which
  named the symlink `~/.claude/skills/wrapup` where it meant
  `dissonance_close`. What this does not settle: the old `wrapup` Skill is
  still on disk and still symlinked, so two wrap-ups still answer to the same
  request until it's deleted by hand; and the lead's repo-root `chat_close`
  was deliberately left in place, since deleting a tracked upstream file would
  show up as a deletion in any PR.

- 2026-08-25 — **Added the reader view and corrected the discrimination ratio
  to 6.80×.** Built `viewer.html` and `viewer.js` to show the matched FT pair
  side by side, so the result is legible without reading raw JSON. Corrected
  the headline ratio from 6.78× to 6.80×: it is computed from unrounded
  densities (12/768 ÷ 3/1305 = 6.797), and an earlier draft of `RESULTS.md`
  had rounded intermediate values before dividing. The finding is unchanged —
  it still clears the pre-registered 3× threshold with better than double the
  margin.

- 2026-08-25 — **Consolidated the Skill into one `.claude/skills/` folder.**
  The submission had drifted into two skill directories; merged them into
  `.claude/skills/`. Established by experiment that submission folders are
  never scanned for Skills — `dissonance` loads only because
  `~/.claude/skills/dissonance` is a symlink pointing here, and a Skill's
  invocable name comes from its directory name, not the `name:` field in the
  frontmatter. A folder move broke that symlink silently mid-session, with no
  error; documented the whole mechanism in [`CLAUDE.md`](CLAUDE.md) so it
  doesn't get broken blind again. Also pulled the workshop's upstream changes,
  which brought a Day 3 restructure and the lead's own `chat_close` Skill.

- 2026-08-25 — **Ran the discrimination test: 6.78× (later corrected to
  6.80×).** Tested the Skill on a matched Financial Times pair covering the
  same Iran sanctions announcement in the same week — Treasury Secretary Scott
  Bessent's opinion column against the FT news desk's report. The threshold
  was set at 3× *before* the test ran, so the result couldn't be fitted to the
  outcome. What this does not establish: one pair on one topic is not
  validation.

- 2026-08-25 — **First real analysis: Bessent's FT op-ed on Iran sanctions.**
  First run of the Skill against live published copy rather than test text.

- 2026-08-25 — **Built the dissonance Skill itself.** Reads an article and
  returns three layers: verifiable claims and what would check them, the
  persuasion techniques with the exact span doing the work plus a neutral
  rewrite, and what a reader can go verify. Works from a closed taxonomy —
  Cialdini's influence principles plus rhetorical moves like agent deletion
  and implied causation — so output is checkable rather than a matter of
  taste, and nothing is flagged without a verbatim quoted span.

- 2026-08-25 — **Wrote the spec, set working preferences, named the folder.**
  Committed `SPEC.md` for the persuasion detector before building it, recorded
  working preferences in `CLAUDE.md`, and renamed the submission folder to
  `michael-flowers`.
