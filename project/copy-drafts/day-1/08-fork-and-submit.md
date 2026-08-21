# Fork & Submit

> One-time setup that connects your work to the shared repo — do this now, and submitting is just asking Claude for a commit and a PR from here on.

## 1. Why This Matters

Everything you build today gets submitted the same way: as a Pull Request against the shared workshop repo. This session is the one-time setup that makes that possible — after this, submitting is just asking Claude to commit and open a PR, every day.

This all runs through the GitHub connector you set up in [Explore Claude Desktop](/day-1/07-explore-claude-desktop.html) — no Git, no terminal, no separate app to install.

## 2. What Is a Fork?

A **fork** is your own personal copy of the shared workshop repo, living under your own GitHub account. It's a real copy — you can change anything in it without affecting anyone else's. When you want to share a change back with the class, you open a **Pull Request (PR)**: a proposal to merge your changes from your fork into the shared repo. The instructor reviews and merges it.

Everyone in the workshop forks the same repo, works in their own folder inside it, and submits changes the same way — which is also how real software teams collaborate.

## 3. Fork the Workshop Repo

- Go to [github.com/AndrewRCalderon/2026-ai-news-innovation-workshop](https://github.com/AndrewRCalderon/2026-ai-news-innovation-workshop).
- Click **Fork** in the top-right corner.
- Confirm the fork — GitHub creates a copy under your own account, at `github.com/your-username/2026-ai-news-innovation-workshop`.

## 4. Ask Claude to Set Up Your Branch

From here on, you're not clicking through GitHub yourself — you're telling Claude what you want, in plain language, and it does the GitHub work through the connector.

- Tell Claude your fork's URL and ask it to create a branch called `day-1` in it.
- Ask it to create `docs/submissions/your-name/` — that's your own folder for the rest of the workshop, so your changes never conflict with anyone else's. Same folder every day, not a new one each time.
- Ask it to copy (not move) `STUDENT_CLAUDE_GUIDE.md` into that folder and rename the copy to `CLAUDE.md` — Claude only reads project instructions from a file with that exact name, so the rename isn't optional. Copy `SUBMISSION.md` in alongside it, filename unchanged. Fill in what you can of `SUBMISSION.md` so far — the root copies of both files stay where they are.
- If you're building your project in the Code tab with a local project folder, say so — Claude can connect what you're working on locally to your fork on GitHub through the connector.

> You don't need to know the underlying git commands — you need to be able to describe what you want, clearly.

## 5. Commit, Push, Open a PR

- Ask Claude to commit your changes with a real, descriptive message.
- Ask it to push your `day-1` branch to your fork.
- Ask it to open a Pull Request from your fork's `day-1` branch into the shared repo's `main` branch. That's your submission.

The GitHub connector asks for your approval before it does anything that writes to GitHub — you'll see and confirm each step, not just trust that it happened.

## 6. What Happens Next

The instructor reviews and merges everyone's PRs at the end of the day. Tomorrow, Day 2's branch starts from the shared repo's updated `main` — which already includes your merged Day 1 work, so you're building on it, not starting over.

> Fork once, today. From here, submitting is just asking Claude for a commit and a PR.
