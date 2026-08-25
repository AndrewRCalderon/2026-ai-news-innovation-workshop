---
name: chat_close
description: End-of-session wrap-up for my workshop submission. Works inside docs/submissions/chrissy-wang/ — updates tasks.md (checkboxes, newly discovered tasks), architecture.md (if a non-trivial technical decision was made), the current day's writeup (DAY2.md, DAY3.md, …), and SUBMISSION.md so the public status stays current, then splits the session's work into logical commits and pushes them to the current branch. Use when the user says they're wrapping up, switching tasks, done for now, or invokes /chat_close.
---

# Chat close

Run this at the end of a session, before switching tasks, so nothing worked
on this session only lives in the conversation. Docs first, then commits, so
the doc updates ride along in the push.

**Everything this skill touches lives in `docs/submissions/chrissy-wang/`.**
The `project/` directory at the repo root belongs to the workshop
maintainers — never edit it. The AutoNews application code lives in its own
repo (`~/AutoNews`); what's tracked here is the spec, the method, and the
writeups.

## Step 0 — Establish what actually happened

Don't work from memory of the conversation alone. Run `git status` and
`git diff` (staged and unstaged) to see the real, current change set —
conversation recall and actual diffs drift, especially in a long session.
Note anything that was tried and reverted (worth a line in the day writeup,
Step 3) versus what's actually still in the tree.

If work this session happened in `~/AutoNews` rather than here, check there
too — the decision or finding still belongs in these docs even when the code
that produced it landed in the other repo.

If `git status` is clean and nothing was discussed that maps to docs work
either, say so and stop — don't manufacture busywork on a session that
didn't change anything.

## Step 1 — Task tracker: `tasks.md`, if relevant

`docs/submissions/chrissy-wang/tasks.md` is the spec's build list — the work
broken into checkable pieces, in order, each with its own check. Update it
when this session's work maps onto it:

- Check off (`- [x]`) any task completed this session — but only after
  running that task's own stated check and seeing it pass. Don't check
  something off because it looks done.
- If a task was discovered but not done, add it under the relevant header
  rather than leaving it untracked.
- Keep entries short — the narrative belongs in the day writeup (Step 3),
  not piled into `tasks.md`.

If this session changed what the tool has to *do* — not just what's left to
build — update `requirements.md` in the same pass. That file is behaviour and
scope, including the *Out of scope* list, so a real scope change has to land
there or the spec has drifted.

Skip this step (leave the files untouched) if the session's work genuinely
doesn't map to anything tracked here — don't force an edit.

## Step 2 — Architecture: `architecture.md`, if relevant

Any non-trivial technical decision — a new dependency, a changed data flow,
a different approach to something already decided, a deviation from what the
spec said — goes into `docs/submissions/chrissy-wang/architecture.md`.

- Update the section that decision belongs to, in place. Say what the
  approach now is and why, and keep the reason the old approach was
  dropped — the discarded option is usually the load-bearing part.
- If the decision came out of something that failed in testing, the evidence
  belongs in `discovery-findings.md`; `architecture.md` gets the decision
  itself, with a pointer.

Skip this step if nothing decision-worthy happened — most sessions (a bug
fix, a doc pass, a copy edit) won't need one.

## Step 3 — Session record: the current day's writeup

Add to the writeup for the day the workshop is on — `DAY2.md` today, `DAY3.md`
next, and so on. Create the file if this is the first session of a new day,
matching `DAY2.md`'s shape: what I set out to do, what I actually built, what
I learned (especially from being wrong), where it stands, what's next.

- Fold this session into the existing sections rather than appending a log.
  These read as a written account, not a change log.
- Being wrong is the valuable part. If something failed, or an assumption
  didn't survive contact with real data, that goes in — with the number or
  the example that showed it.
- Keep it tight. A few sentences per point; the detail lives in
  `discovery-findings.md`.

## Step 4 — Submission status: `SUBMISSION.md`

`docs/submissions/chrissy-wang/SUBMISSION.md` is pulled live onto the public
workshop showcase page, so it has to match reality at the end of every
session.

- Update the field the session actually changed — usually **Solution**
  (what's real and running versus designed but not built) or **What you're
  building** if the direction shifted. Leave the rest alone.
- **Keep it concise.** Edit the existing sentences; don't append a new
  paragraph per session or the field grows into a log. If a stage went from
  designed to working, move it across in the sentence that's already there.
- Say what's real, not what's planned, and keep the known-limits sentence
  honest — that's the part that dates fastest.

## Step 5 — Commit and push

- Group the diff into logically separate commits (e.g. a spec change and an
  unrelated fix are two commits, not one) rather than a single catch-all
  commit. Doc updates from Steps 1-4 can ride in their own commit or the
  last content commit, whichever reads more naturally.
- Write each commit message around *why*, matching this repo's existing log
  style (`git log --oneline`) — short, imperative, specific. English, even
  when the session was in Chinese.
- Stage files by name, not `git add -A`/`.` — review `git status` after
  staging to make sure nothing unintended (stray temp files, `.DS_Store`,
  unrelated edits) is included, and that nothing outside
  `docs/submissions/chrissy-wang/` snuck in.
- Push to the current branch: `git push -u origin <branch-name>`. Retry on
  network failure only (exponential backoff). Never force-push, rewrite
  history, or skip hooks to get a push through — if a hook fails, fix the
  underlying issue and commit again.
- If an open PR already exists for this branch, pushing is enough — don't
  open a duplicate. If none exists and one seems warranted, follow the
  repo's normal PR flow rather than leaving pushed commits with no PR.

Report back concisely: what got updated in each step (or skipped, and why),
and the resulting commits/push outcome.
