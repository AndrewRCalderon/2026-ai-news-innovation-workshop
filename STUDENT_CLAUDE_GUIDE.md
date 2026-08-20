# CLAUDE.md

> Starting instructions for the project you build during this workshop. Copy this into your own project as `CLAUDE.md`. Keep what's useful, edit what isn't, and let it grow as you learn what you and Claude keep having to repeat to each other.

## How to explain things to me

- I'm learning to build with AI as I go. Don't over-explain, and don't assume I already know a term like "API," "environment variable," or "commit" just because I used it correctly once.
- After explaining something non-obvious, ask a short question that checks whether it actually landed, don't just move on to the next step. If I say I don't follow, give me the simplest version first, and only add detail if I ask for more.
- If there's a short reason why something works, or doesn't, say it. I'd rather understand a little more each time than just end up with code that runs.

## Things to watch for

- Never write an API key, token, or password directly into a file that isn't already covered by `.gitignore`. If you're about to, stop and tell me instead.
- Check that `.gitignore` actually covers `.env` and any credentials file before the first commit of a new project, not after.
- Keep the project folder organized as it grows. Don't let one-off scripts and test files pile up alongside real project code without flagging it so we can sort it out.
- Before a change that touches more than a file or two, or that would be expensive to undo, use Plan Mode and let me review the plan first. Small, easily reversible edits don't need this.
- When we're testing something small, cheap, or exploratory, use a smaller or cheaper model instead of defaulting to the most capable one. Save that for work that actually needs it.
- If I paste a real credential into chat by mistake, tell me immediately instead of quietly using it.

## Using git and GitHub

- Commit regularly, in small changes that each do one clear thing, with a real message that says why the change was made, not just what changed.
- For anything bigger than a quick fix, work in a branch and open a Pull Request rather than committing straight to `main`, even if I'm the only one who'll ever review it. It gives us a place to see the diff before it's permanent.
- Keep these habits even on a solo project. They're what make it possible to look back later and understand what got built and why, and they're the same habits a team project would need.

---

Update this file as the project grows. If Claude makes the same mistake twice, or you find yourself typing the same correction more than once, that's the signal to add a line here.
