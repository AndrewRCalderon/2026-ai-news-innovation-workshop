Continuing RFC Bot, my CUNY AI workshop project. Day 3.

Read these before proposing anything, instead of asking me to re-explain: `CLAUDE.md`,
`requirements.md`, `architecture.md`, `tasks.md`. `PLAN.md` is history and reasoning, not spec —
if it disagrees with the other three, they win.

**Where the files live.** The git home is
`~/2026-ai-news-innovation-workshop/docs/submissions/Grace-Thomas/`. There's a non-git copy at
`~/082626_AI Workshop/` that can drift from it. Work in the clone. If you find edits that landed
in the copy, tell me before syncing anything across.

**Git state, end of Day 2 (2026-08-25):**
- Branch `day-2-apps-script`, pushed, tracking `origin`.
- PR #23 open against `AndrewRCalderon/2026-ai-news-innovation-workshop` → `main`. 46 files, all
  inside my folder, mergeable, not yet merged.
- `gh` CLI is installed and authed as `graceathomas5` — you can run PR and issue commands directly.
- Homebrew is at `/opt/homebrew`, added to `.zshrc` (backup: `~/.zshrc.bak-preblew`).

**Gaps I already know about — check these before anything new:**

1. `PLAN.md`'s edit log stops at **2026-08-24**. All of Day 2 is missing: the Apps Script that
   writes drafts into Gmail, the commit hook that refuses any way to send, the Docs sidebar that
   reads the story draft out of a Doc, and the `chat_close` skill rewrite. Its `## Next up`
   section is stale too — item 5, "run a second unrelated story," is done (Kalshi/Polymarket).
2. Tasks **15** (Apps Script writing drafts into Gmail) and **16** (test mode, locked to a dummy
   address) are unchecked in `tasks.md`, but that work looks committed in `4a36498`. Don't check
   them off yourself. Tell me what you find and I'll confirm whether I've actually seen the
   results pass their "done when."
3. Open tasks: **13** (follow-up path, paused — scope in question), **15**, **16**,
   **17** (Google Contacts sync — needs a decision from me first), **19**, **20**.
4. Still `TODO`: the deadline phone in `config/signature.txt`. Doesn't block a send, but the
   `.eml` files carry a placeholder until it's filled.

**What I want to do this session:**

<!-- FILL THIS IN before you send. Some candidates, if you want one:
     - Bring PLAN.md current for Day 2 and fix the stale "Next up" list.
     - Decide task 17 (Google Contacts sync) — walk me through the tradeoff, then we pick.
     - Un-pause or formally cut task 13 (follow-ups) and update tasks.md either way.
     - Whatever Day 3 of the workshop asks for. -->

Usual rules from `CLAUDE.md`: propose a plan against `requirements.md` and `architecture.md`
before building and let me review it, say which requirement each piece serves, work tasks in
order, and never mark a task complete I haven't seen the result of.
