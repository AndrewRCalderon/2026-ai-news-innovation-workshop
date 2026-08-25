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

## How the dissonance Skill actually loads

The Skill lives in this folder at `.claude/skills/dissonance/`, but that is
**not** where Claude Code finds it. Submission folders are never scanned for
Skills — a `SKILL.md` sitting here is inert on its own.

It loads because `~/.claude/skills/dissonance` is a **symlink** pointing at
`docs/submissions/michael-flowers/.claude/skills/dissonance`. That symlink
lives outside the repo, so nothing in this project shows that it exists. There
is only one copy of the file; the symlink is a signpost to it, not a duplicate.

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
- `.claude/skills/chat_close/` in this folder is a reference copy of the
  workshop's own Skill. It does not load from here; the working one is at the
  repo root. Don't rely on this copy staying current.

---

Update this file as the project grows. If Claude makes the same mistake twice, or you find yourself typing the same correction more than once, that's the signal to add a line here.
