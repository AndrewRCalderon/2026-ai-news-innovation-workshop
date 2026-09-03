---
name: dissonance_close
description: The end-of-session wrap-up for Michael's Project Dissonance submission, and the only one to use in his sessions. Refreshes docs/submissions/michael-flowers/SUBMISSION.md with a concise current status, updates that folder's SPEC.md if scope changed, adds a dated entry to that folder's CHANGELOG.md, then splits the session's work into logical commits and asks before pushing. Use when Michael says he's wrapping up, switching tasks, done for now, or invokes /dissonance_close — in preference to chat_close or any other wrap-up skill.
---

# Dissonance close — end-of-session wrap-up

Run this at the end of a session, before switching tasks, so nothing worked
on this session only lives in the conversation. Docs first, then commits, so
the doc updates ride along in the push.

## This is the only wrap-up skill for these sessions

If another wrap-up skill is also loaded — the workshop's repo-level
`chat_close`, or any leftover duplicate — **use this one instead.** The
others target the workshop lead's files. Don't run two wrap-ups in a session;
if one already ran, stop.

## Scope: `docs/submissions/michael-flowers/` only

This is Michael's student submission inside a forked workshop repo. Every
file this Skill reads or writes is inside that one folder:

| Step | Exact path |
|---|---|
| 1 | `docs/submissions/michael-flowers/SUBMISSION.md` |
| 2 | `docs/submissions/michael-flowers/SPEC.md` |
| 3 | `docs/submissions/michael-flowers/CHANGELOG.md` |
| ref | `docs/submissions/michael-flowers/CLAUDE.md` |

**Same-named files exist elsewhere in this repo and are never the target.**
Resolve every filename below to the table above, not to a bare match:

- `project/CHANGELOG.md`, `project/tasks.md`, `project/specifications.md`,
  `project/adr/` — the workshop lead's. **Never write there.**
- the repo-root `CLAUDE.md` — the maintainer's build guide, not Michael's.
- `docs/submissions/<any-other-student>/` — another student's submission,
  including their own `SUBMISSION.md`. **Never write there.**

If a step seems to call for a file outside `docs/submissions/michael-flowers/`,
that's a misresolved path. Stop and ask.

## Step 0 — Establish what actually happened

Don't work from memory of the conversation alone. Run `git status` and
`git diff` (staged and unstaged) to see the real, current change set —
conversation recall and actual diffs drift, especially in a long session.
Note anything that was tried and reverted (worth a changelog line, per the
convention in Step 3) versus what's actually still in the tree.

Check whether Michael committed during the session — he sometimes does, and
the tree may already be clean. If it is, and nothing was discussed that maps
to docs work either, say so and stop. Don't manufacture busywork on a session
that didn't change anything.

## Step 1 — Submission status: `docs/submissions/michael-flowers/SUBMISSION.md`

This is the public-facing profile card, pulled live onto the workshop
showcase page. Per that folder's `CLAUDE.md`, it gets updated in the same
commit as the change, not later — so refresh it here whenever this session
moved the project's actual state.

Update the fields the session touched: the hypothesis, what's being built,
the solution, the headline result, and the honest limitations line. Then make
sure the file as a whole reflects **where the project stands right now** —
what works today, and what's still open.

**Keep the status summary concise.** A tight sentence or two per field. This
is a profile card a reader skims, not a progress log — the full narrative
belongs in `CHANGELOG.md` (Step 3). If a field is growing into a paragraph of
history, cut it back to the current state and let the changelog carry the
rest.

Keep the limitations honest. If the headline result still rests on one test,
or there's still no live demo, that stays in — don't quietly upgrade a
provisional result into a finished one.

If the file is somehow missing, create it at that exact path, matching the
workshop's field list (Student Name, Fork URL, Hypothesis, What you're
building, Solution, and the limitations line).

Skip this step only if the session genuinely didn't change the project's
state (a pure refactor, a doc-only tidy). Don't force an edit.

## Step 2 — Scope: `docs/submissions/michael-flowers/SPEC.md`, if relevant

This file changes rarely. Only touch it on a real change to what the detector
does or requires — a new technique in the taxonomy, a changed threshold, a
changed output contract — not on ordinary progress.

Skip this step if the session was ordinary build work, which most are.

## Step 3 — Changelog: `docs/submissions/michael-flowers/CHANGELOG.md`

Add one dated entry under that file's `## Change log` section
(reverse-chronological, newest entries directly under the header):

    - YYYY-MM-DD — **Bold one-line summary.**

then 2–5 sentences: what changed, why, and anything explicitly excluded or
left open. Use today's actual date, not a placeholder.

Two conventions this project keeps, both worth preserving:

- **Record corrections, not just additions.** The 6.78× → 6.80× ratio fix is
  in there with the reason it was wrong. Corrections are the most useful
  entries later.
- **Record what a result does not establish.** The discrimination test entry
  says one matched pair is not validation. Keep that habit — it's the
  difference between a record and a highlight reel.

Keep entries tight. A few sentences is right for a normal session; only go
longer if the session was unusually complex and the detail is load-bearing.

## Step 4 — Check the Skill symlinks still resolve

The Skills in this folder load only because `~/.claude/skills/` holds
symlinks pointing into it. Submission folders are never scanned directly, so
moving or renaming anything under
`docs/submissions/michael-flowers/.claude/skills/` breaks them silently — no
error, the Skill just stops appearing. If this session moved or renamed Skill
folders, verify:

    ls -la ~/.claude/skills/

Repoint any dangling link before continuing. See that folder's `CLAUDE.md`
for the full mechanism.

## Step 5 — Commit, and ask before pushing

- Group the diff into logically separate commits (a feature and an unrelated
  fix are two commits, not one) rather than one catch-all commit. The doc
  updates from Steps 1–3 can ride in their own commit or the last content
  commit, whichever reads more naturally.
- Write each commit message around *why*, short and imperative, matching this
  repo's existing log style (`git log --oneline`).
- Stage files **by name**, never `git add -A` or `.`. Re-check `git status`
  after staging so nothing stray (temp files, unrelated edits) gets swept in.
- **Confirm every staged path starts with `docs/submissions/michael-flowers/`.**
  If any doesn't, stop and ask — that's someone else's territory.
- Per that folder's `CLAUDE.md`: for anything bigger than a quick fix, work on
  a branch and open a Pull Request rather than committing straight to `main`.
- **Ask before pushing.** Pushing is outward-facing and awkward to undo, and
  `CLAUDE.md` asks for a heads-up before anything in that category. Show what
  will go up, then wait for a yes. Push with
  `git push -u origin <branch-name>`.
- Never force-push, rewrite history, or skip hooks. If a hook fails, fix the
  underlying cause and commit again.
- If an open PR already exists for this branch, pushing is enough — don't
  open a duplicate.

## Step 6 — Report back

Briefly: what changed in each step or was skipped and why, the commits made,
and whether the push happened. No comprehension checks.
