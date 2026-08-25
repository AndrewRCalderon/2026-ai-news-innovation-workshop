# CLAUDE.md

> Starting instructions for the project you build during this workshop. Copy this into your own project as `CLAUDE.md`. Keep what's useful, edit what isn't, and let it grow as you learn what you and Claude keep having to repeat to each other.

## Where this file kicks in

This file gets copied into your project folder (`docs/submissions/your-name/`) during Day 1's Fork & Submit, so it may already be active from Day 1, in Claude Desktop's Code tab (same engine as Claude Code, just inside Desktop). Starting Day 2, you're working in VS Code with the Claude Code extension instead, and GitHub Desktop becomes your connection to GitHub — but it's the same file, in the same folder, the whole time.

## How to explain things to me

Answered on Day 2 of the workshop. These replace the questions that were here; revisit them if they stop fitting.

**Vocabulary — explain the first time, every session.** When a term like "API," "environment variable," "commit," or "dependency" comes up, define it briefly the first time it appears *in that conversation*, then use it normally for the rest of the session. Do this in new chats too, not just once ever — a fresh session starts fresh, so don't assume a term explained yesterday needs no explanation today. Do **not** ask whether the explanation landed, and don't run comprehension checks. I'll tell you when to stop explaining a given term.

**Pace — plan first, then build.** When we're starting something new, or something breaks, tell me what you intend to do and wait for my go-ahead before touching anything. This is also the default for how much to build before checking in generally, not just for explanations: check with me first rather than presenting finished work.

**Reasoning — only when I ask.** Make the technical call and move on. Don't narrate the tradeoff behind routine choices. If I want to know why, I'll ask. The one exception is risk: if something is expensive or awkward to undo, say so before doing it — that's a warning, not a rationale.

## Things to watch for

- Never write an API key, token, or password directly into a file that isn't already covered by `.gitignore`. If you're about to, stop and tell me instead.
- Check that `.gitignore` actually covers `.env` and any credentials file before the first commit of a new project, not after.
- Keep the project folder organized as it grows. Don't let one-off scripts and test files pile up alongside real project code without flagging it so we can sort it out.
- Before a change that's expensive or awkward to undo, use Plan Mode and let me review the plan first, regardless of how I answered above — that's about risk, not about how much I want explained. A first rough scaffold of starter files for something brand new isn't what this is about, even if it's more than a file or two; match that instead to how I answered the "starting something new" question above.
- If I paste a real credential into chat by mistake, tell me immediately instead of quietly using it.

## Choosing the right model for the task

- Before starting a subtask, especially one you could hand off to a background agent, tell me the model options and the actual tradeoff between them for this specific task, in plain language, then let me choose. Don't just pick silently and move on.
- Keep it short. "I'd default to a smaller/faster model here because this is a quick lookup, want me to use something else?" is enough, it doesn't need to be a lecture every time.
- If I ask why you'd choose a given model, or what my options are, answer with the actual tradeoff (speed/cost vs. capability) for the task in front of us, not a generic explanation.

## Using git and GitHub

- Commit regularly, in small changes that each do one clear thing, with a real message that says why the change was made, not just what changed.
- For anything bigger than a quick fix, work in a branch and open a Pull Request rather than committing straight to `main`, even if I'm the only one who'll ever review it. It gives us a place to see the diff before it's permanent.
- Do this through GitHub Desktop, or ask Claude Code to run the git commands directly. Either is fine, use whichever feels more natural.
- Keep these habits even on a solo project. They're what make it possible to look back later and understand what got built and why, and they're the same habits a team project would need.

## Keeping submission info current

- `SUBMISSION.md` lives alongside this file in your `docs/submissions/your-name/` folder (copied there during Day 1's Fork & Submit). Fill it in as soon as there's a real direction, don't wait until the end.
- Keep it accurate as things change. If the pitch or what you're building shifts, update `SUBMISSION.md` in the same commit, don't let it go stale.
- If you restructure the project, keep `SUBMISSION.md` in that same folder and keep it filled in, rather than losing track of it in the shuffle.

## How this folder's Skills actually load

This folder holds my own Skills — `dissonance` (the detector) and
`dissonance_close` (end-of-session wrap-up) — in `.claude/skills/`. That is
**not** where Claude Code finds them. Submission folders are never scanned for
Skills — a `SKILL.md` sitting here is inert on its own.

They load because `~/.claude/skills/dissonance` and
`~/.claude/skills/dissonance_close`
are **symlinks** pointing into this folder. Those symlinks live outside the
repo, so nothing in this project shows that they exist — and a fresh clone on
another machine won't have them until they're recreated:

    ln -s "$PWD/.claude/skills/dissonance" ~/.claude/skills/dissonance
    ln -s "$PWD/.claude/skills/dissonance_close" ~/.claude/skills/dissonance_close

There is only one copy of each file; a symlink is a signpost to it, not a
duplicate.

Consequences, confirmed by testing on Aug 25 2026:

- **Moving or renaming this folder breaks the Skill silently.** No error, no
  warning — it just stops appearing. This already happened once.
- Before moving anything in this submission folder, run `ls -la ~/.claude/skills/`
  to see what points into it. Afterward, check that
  `~/.claude/skills/dissonance/SKILL.md` still resolves and repoint the symlink
  if it doesn't.
- **The Skill's name comes from the directory name, not the `name:` field in
  the frontmatter.** To rename the Skill, rename the symlink — editing the
  frontmatter alone does nothing.
- **A new symlink registers mid-session** — no restart needed. Confirmed
  Aug 25 2026: `dissonance_close` became available in the same session it was
  linked.

### Why the wrap-up Skill is called `dissonance_close`

Use **`/dissonance_close`** to close out a session. It is scoped to this
folder — `SUBMISSION.md`, `SPEC.md`, this folder's `CHANGELOG.md` — and asks
before pushing.

It is deliberately **not** called `chat_close`. The workshop lead's own
`chat_close` Skill lives at the repo root in `.claude/skills/`, and that one
writes to the repo's `project/` files, which belong to them. Two Skills with
the same name in the two scanned locations would make it unknowable which one
runs, so this one carries a name nothing else can claim.

- Never move this Skill into the repo-root `.claude/skills/`. That directory
  is the lead's and is tracked upstream — writing there means a merge conflict
  on every pull. This folder is the right home; the symlink is what makes it
  load.
- `/chat_close` still exists and still belongs to the lead. Don't use it.

**Left over:** `.claude/skills/wrapup/` is the earlier version of this same
Skill. `/dissonance_close` has now been run successfully (Aug 25 2026), so the
fallback has served its purpose — but `wrapup` is still on disk and still
symlinked, which means two wrap-up Skills answer to "wrapping up." It is
untracked in git, so removing it leaves no history to clean up:

    rm ~/.claude/skills/wrapup
    rm .claude/skills/wrapup/SKILL.md && rmdir .claude/skills/wrapup

---

Update this file as the project grows. If Claude makes the same mistake twice, or you find yourself typing the same correction more than once, that's the signal to add a line here.
