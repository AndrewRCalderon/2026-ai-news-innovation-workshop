---
name: chat_close
description: End-of-session wrap-up for RFC Bot. Updates tasks.md (checkboxes, newly discovered tasks), adds a dated entry to PLAN.md's edit log, and updates requirements.md / architecture.md / SUBMISSION.md if this session changed behavior, an approach, or the pitch — then splits the session's work into logical commits and pushes to the current branch. Use when the user says they're wrapping up, switching tasks, done for now, or invokes /chat_close.
---

# Chat close

Run this at the end of a session, before switching tasks, so nothing worked on
this session only lives in the conversation. Docs first, then commits, so the
doc updates ride along in the push.

## Step 0 — Establish what actually happened

Don't work from memory of the conversation alone. Run `git status` and
`git diff` (staged and unstaged) to see the real, current change set —
conversation recall and actual diffs drift, especially in a long session.
Note what was tried and reverted (worth a line in the edit log) versus what's
actually still in the tree.

Two things to confirm before anything else, because this repo has a twin:

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
  (Step 3), not piled into `tasks.md`.

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
- **`SUBMISSION.md`** — if the pitch or what's being built shifted. It's meant
  to stay accurate as things change, not be filled in at the end.

Most sessions (a bug fix, a copy pass, a regenerated set of drafts) won't need
any of these. Skip what doesn't apply.

## Step 3 — Edit log: `PLAN.md`

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

## Step 4 — Commit and push

- Group the diff into logically separate commits — a content change and an
  unrelated fix are two commits, not one. Doc updates from Steps 1–3 can ride
  in their own commit or the last content commit, whichever reads more
  naturally.
- Write each message around *why*, matching this repo's log style
  (`git log --oneline`): short, imperative, specific. "Pause task 13:
  follow-ups may not fit a day-of turnaround" — not "update tasks.md".
- Stage files by name, never `git add -A` or `git add .` — then re-read
  `git status` to make sure no stray temp file, credential, or unrelated edit
  got in. If anything holds a real key or token, stop and say so rather than
  committing it.
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
