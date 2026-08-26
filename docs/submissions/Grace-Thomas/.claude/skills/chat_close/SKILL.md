---
name: chat_close
description: End-of-session wrap-up for RFC Bot. Works only on the files in docs/submissions/Grace-Thomas/, never the maintainer's repo-root copies. Updates tasks.md (checkboxes, newly discovered tasks), adds a dated entry to PLAN.md's edit log, refreshes SUBMISSION.md to reflect current project status, and updates requirements.md / architecture.md if this session changed behavior or an approach — then splits the session's work into logical commits and pushes to the current branch. Use when the user says they're wrapping up, switching tasks, done for now, or invokes /chat_close.
---

# Chat close

Run this at the end of a session, before switching tasks, so nothing worked on
this session only lives in the conversation. Docs first, then commits, so the
doc updates ride along in the push.

## Which files this skill touches

**Every file named in this skill lives in Grace's submission folder:**

```
~/2026-ai-news-innovation-workshop/docs/submissions/Grace-Thomas/
```

Repo-relative, that's `docs/submissions/Grace-Thomas/`. Read and write:

| Referred to as     | Actual path                                             |
| ------------------ | ------------------------------------------------------- |
| `tasks.md`         | `docs/submissions/Grace-Thomas/tasks.md`                |
| `requirements.md`  | `docs/submissions/Grace-Thomas/requirements.md`         |
| `architecture.md`  | `docs/submissions/Grace-Thomas/architecture.md`         |
| `PLAN.md`          | `docs/submissions/Grace-Thomas/PLAN.md`                 |
| `SUBMISSION.md`    | `docs/submissions/Grace-Thomas/SUBMISSION.md`           |
| `CLAUDE.md`        | `docs/submissions/Grace-Thomas/CLAUDE.md`               |

**Never** the copies at the repo root. The clone root has its own
`SUBMISSION.md`, `CLAUDE.md`, `README.md`, and `project/REQUIREMENTS.md` —
those are the workshop maintainer's templates and starter files, not Grace's
project, and editing them would put unrelated changes in her PR. If you find
yourself opening a bare `SUBMISSION.md` from the repo root, you have the wrong
file: it's about 1KB of unfilled template. Hers is several KB of real prose.

Resolve paths explicitly rather than relying on the working directory, since
this skill can be invoked from either the repo root or from inside the
submission folder.

## Step 0 — Establish what actually happened

Don't work from memory of the conversation alone. Run `git status` and
`git diff` (staged and unstaged) to see the real, current change set —
conversation recall and actual diffs drift, especially in a long session.
Note what was tried and reverted (worth a line in the edit log) versus what's
actually still in the tree.

Two things to confirm before anything else, because this project has a twin:

- You are in the git clone, not the copy. The version-controlled folder is
  `~/2026-ai-news-innovation-workshop/docs/submissions/Grace-Thomas/`.
  `~/082626_AI Workshop/` is a non-git copy of the same files and the two can
  drift. If the session's edits landed in the copy, say so and ask before
  bringing them across — don't silently sync.
- Which branch is checked out, and whether it has an open PR.

If `git status` is clean and nothing was discussed that maps to docs work
either, say so and stop — don't manufacture busywork on a session that didn't
change anything.

## Step 1 — Task tracker: `tasks.md`, if relevant

This is the active list of what's open, in build order, each task with a
"done when." Update it when this session's work maps onto it:

- Check off a task (`### [x] N.`) **only if Grace has seen the result and the
  task's own "done when" actually passes.** Per `CLAUDE.md`, never mark a task
  complete she hasn't seen. If the work is done but unreviewed, leave it open
  and say so in your report instead.
- If a task was discovered but not done, add it under the relevant Phase
  header rather than leaving it untracked.
- If a task turned out to be wrong, propose the edit to `tasks.md` rather than
  quietly doing something else — same rule as during the session.
- Keep entries short. History and reasoning belong in the `PLAN.md` edit log
  (Step 4), not piled into `tasks.md`.

Skip this step if the session's work genuinely doesn't map to anything tracked
here — don't force an edit.

## Step 2 — Spec files, if this session changed them

Per `CLAUDE.md`, these change in the same commit as the work, not later:

- **`requirements.md`** — if behavior changed, or something moved in or out of
  scope. Requirements are referenced by number (R1, R4…); keep the numbering
  stable and add rather than renumber.
- **`architecture.md`** — if the approach, a component, or a decision changed,
  including a deviation from a decision already recorded there. Write down what
  was decided and why, so it isn't re-litigated next session.

Most sessions (a bug fix, a copy pass, a regenerated set of drafts) won't need
either of these. Skip what doesn't apply.

## Step 3 — Project status: `SUBMISSION.md`

Check `SUBMISSION.md` every session and bring it in line with where the
project actually is now. This is the public showcase card, pulled live from
the file, so a stale one misrepresents the work to anyone reading it.

Re-read it against what's actually true after this session and update the
fields that have drifted — typically **What you're building**, **Solution**,
and **Known limits**. If the pitch or hypothesis itself shifted, update those
too.

**Keep it concise.** Edit in place at the existing length; don't let the file
grow a session's worth of detail each time. Tighten or replace a sentence
rather than appending one — the running history belongs in the `PLAN.md` edit
log (Step 4), not here. If a change doesn't alter what a reader should
understand about the project, it doesn't belong in `SUBMISSION.md` at all.

Per `CLAUDE.md`, don't quietly restore anything Grace cut from this file. If
you think a cut was a mistake, say so instead of putting it back.

If nothing about the project's public description changed this session, say
you checked and it's still accurate — don't edit for the sake of editing.

## Step 4 — Edit log: `PLAN.md`

`PLAN.md` is the running narrative and history — not spec. If it ever
disagrees with `requirements.md` / `architecture.md` / `tasks.md`, those three
win and `PLAN.md` gets corrected.

Add one dated entry under the `## Edit log` header, newest first:

- `**YYYY-MM-DD — bold one-line summary.**` then a short paragraph: what
  changed, why, and anything explicitly excluded or left open.
- Match the existing entry's shape — where useful it breaks out what was
  **Cut:** and what was **Compressed:**, so a later reader can see what was
  removed on purpose. Per `CLAUDE.md`, things Grace cut don't get added back
  quietly; the log is what makes that checkable.
- A few tight sentences is the right size. Only go longer if the session was
  genuinely complex and the detail is load-bearing.
- Use today's actual date. Never guess a date — if you don't know it, ask.
- Also refresh `## Where things stand` / `## Next up` / `## Open questions` if
  this session moved them.

## Step 5 — Commit and push

- Group the diff into logically separate commits — a content change and an
  unrelated fix are two commits, not one. Doc updates from Steps 1–4 can ride
  in their own commit or the last content commit, whichever reads more
  naturally.
- Write each message around *why*, matching this repo's log style
  (`git log --oneline`): short, imperative, specific. "Pause task 13:
  follow-ups may not fit a day-of turnaround" — not "update tasks.md".
- Stage files by name, never `git add -A` or `git add .` — then re-read
  `git status` to make sure no stray temp file, credential, or unrelated edit
  got in. Every staged path should start with `docs/submissions/Grace-Thomas/`;
  anything outside that folder is almost certainly a maintainer file you
  shouldn't be committing, so stop and ask. If anything holds a real key or
  token, stop and say so rather than committing it.
- Push to the current branch: `git push -u origin <branch-name>`. Auth is SSH;
  if it fails with `Permission denied (publickey)`, check `ssh-add -l` — an
  empty agent is the usual cause, and the fix is Grace running
  `ssh-add --apple-use-keychain ~/.ssh/id_ed25519` in her own terminal. Don't
  run it for her.
- Never force-push, rewrite history, or skip hooks to get a push through.
- Per `CLAUDE.md`, anything bigger than a quick fix belongs in a branch with a
  PR rather than straight on `main`. If a PR is already open for this branch,
  pushing is enough — don't open a duplicate. If one seems warranted, draft it
  in the shape of the repo's `.github/pull_request_template.md`; don't prefill
  through a `?body=` compare URL, which overrides that template.

Report back concisely: what got updated or skipped in each step and why, the
resulting commits, and the push outcome. Flag anything you left open —
especially a task that's done but unreviewed.
