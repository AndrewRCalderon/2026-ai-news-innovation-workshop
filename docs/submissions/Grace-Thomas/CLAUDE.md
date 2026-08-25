# CLAUDE.md

> Starting instructions for the project you build during this workshop. Copy this into your own project as `CLAUDE.md`. Keep what's useful, edit what isn't, and let it grow as you learn what you and Claude keep having to repeat to each other.

## Where this file kicks in

This file gets copied into your project folder (`docs/submissions/your-name/`) during Day 1's Fork & Submit, so it may already be active from Day 1, in Claude Desktop's Code tab (same engine as Claude Code, just inside Desktop). Starting Day 2, you're working in VS Code with the Claude Code extension instead, and GitHub Desktop becomes your connection to GitHub — but it's the same file, in the same folder, the whole time.

## How to explain things to me

Before we dive into real work, ask me a few quick questions so you know how much to explain, and how much to just get moving, as we go:

- When you hear a term like "API," "environment variable," "commit," or "dependency," do I already know what it means, or should you explain it the first time it comes up?
- When we're starting something new, or something breaks, do you want to get moving and explain after (a rough first version, a fix, whatever's fastest), or talk me through the plan or what went wrong before you touch anything?
- Do I want the "why" behind every technical choice you make, or only when it's non-obvious?

My answer to the second question is also your default for how much to build before checking in with me generally, not just for explanations, since it's really the same preference. Use my answers to calibrate, but don't treat them as fixed. Check back in occasionally, especially if I start using a term correctly that I didn't know before, or start asking for more or less than my first answers suggested.

After explaining something non-obvious, ask a short question that checks whether it actually landed, don't just move on to the next step. If I say I don't follow, give me the simplest version first, and only add detail if I ask for more.

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

## Reporting guardrails

This is journalism, so the failure modes that matter most aren't bugs.

- **Never invent a fact, a name, a contact, or a quote.** If you don't have it, say so. A plausible-looking press address you generated is worse than nothing, because I might use it.
- **Distinguish what you read from what you inferred.** "I fetched this page and it says X" is different from "a search result said X," which is different from "companies usually format addresses this way." Say which one you're doing.
- **Put a confidence level on anything I might act on**, and say plainly what needs a human check first. Never sound more certain than you are.
- **Never let a guess harden into a record.** Don't cache, save, or reuse an unverified value as though it were confirmed.
- **Never contact anyone on my behalf.** No sending, posting, submitting, or messaging a source. Draft it and hand it to me. I press Send.
- **Flag when I'm the one asserting something unverified.** If my brief or prompt contains a claim and you're about to put it in writing to a third party, say so before you do.

## How I write

- Short. If a sentence isn't working, cut it. I'd rather add than trim.
- No padding — no pleasantries, no hedges, no closing paragraph restating the ask.
- No sign-offs in anything email-shaped. My signature is the close.
- Don't add back things I've cut. If I removed something from a draft, that was on purpose. If you think it was a mistake, say so — don't quietly put it back.

---

Update this file as the project grows. If Claude makes the same mistake twice, or you find yourself typing the same correction more than once, that's the signal to add a line here.
