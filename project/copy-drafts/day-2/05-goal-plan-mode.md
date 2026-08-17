# Your Goal & Plan Mode

> Before Claude touches any code, it can research and propose an approach first. Knowing when that's worth the time, and when it's its own kind of overhead, is the actual skill.

## 1. What Plan Mode Is

Plan mode tells Claude to research and propose changes without making them. It reads files, runs commands to explore, and writes a plan, but edits stay blocked until you approve it. [1]

Turn it on with `Shift+Tab`, or start a single prompt with `/plan`. [2] Once Claude has a plan ready, you get three options. Approve it and let Claude build. Approve it but review each change as it happens. Or send it back and ask Claude to keep planning.

If you're working in the VS Code extension, the plan opens as a real Markdown document, so you can highlight a specific piece of it and leave a comment right there, instead of replying to the whole thing in chat. [3]

**Sources**
1. https://code.claude.com/docs/en/permission-modes#analyze-before-you-edit-with-plan-mode — Claude Code Docs, "Choose a permission mode": plan mode tells Claude to research and propose changes without making them. Claude reads files, runs shell commands to explore, and writes a plan, but does not edit your source. Edits stay blocked until you approve the plan.
2. https://code.claude.com/docs/en/permission-modes#analyze-before-you-edit-with-plan-mode — Claude Code Docs: enter plan mode by pressing Shift+Tab or prefixing a single prompt with /plan.
3. https://code.claude.com/docs/en/vs-code — Claude Code Docs, VS Code extension: "VS Code automatically opens the plan as a full Markdown document where you can add inline comments to give feedback before Claude begins."

## 2. When to Use It

Letting Claude jump straight to coding can produce code that solves the wrong problem. [1] One founder's account of skipping it: "The first time I let Claude Code take a serious auth change straight from prompt to patch, it changed nine files. Three of them were subtly wrong." Everything looked fine when Claude finished. It broke once someone actually used it. [2]

> "A bad plan is a paragraph. A bad implementation is an afternoon." [2]

Four independent practitioners, none citing each other or Anthropic, land on the same three axes for deciding. [2][3][4]

- **Uncertainty.** Do you know the approach, or are you still figuring out what "done" looks like?
- **Blast radius.** One file and easy to undo, or several files touching something hard to reverse?
- **Familiarity.** Code you know well, or a part of the project you haven't touched yet?

Fast gut-check for the common case: if you could describe the diff in one sentence, skip the plan. [1] If any of the three axes above says otherwise, that one sentence is hiding more than it says.

**Sources**
1. https://code.claude.com/docs/en/best-practices#explore-first-then-plan-then-code — Claude Code Docs, "Best practices for Claude Code": letting Claude jump straight to coding can produce code that solves the wrong problem. Use plan mode to separate exploration from execution. Also: if you could describe the diff in one sentence, skip the plan.
2. https://nimbalyst.com/blog/claude-code-plan-mode/ — Karl Wirth, Nimbalyst, Jun 29 2026: "The first time I let Claude Code take a serious auth change straight from prompt to patch, it changed nine files. Three of them were subtly wrong." Also: "A bad plan is a paragraph. A bad implementation is an afternoon." Decision axes include file count (3+), risk domains like auth/permissions/billing/migrations, unfamiliar territory requiring architectural inference, and side effects not visible in one file.
3. https://maketocreate.com/claude-code-plan-mode-how-i-use-it-and-when-i-dont/ — Nishil Bhave, maketocreate.com, Jul 17 2026: five-signal framework, blast radius, unfamiliar code, ambiguous requirements, hard-to-reverse operations, approach uncertainty. Self-tracked: planning changed his approach on 71% of cross-file refactors vs. 8% of one-line fixes.
4. https://padezhnov.com/en/blog/how-i-use-claude-code-separation-of-planning-and-execution/ — Evgeny Padezhnov, Jul 14 2026: time-boxes planning by complexity tier, skip for single-file changes, scale up for multi-file and architectural work. "If explaining the task takes longer than doing it, skip planning mode."

## 3. The Other Failure Mode

Planning has its own failure mode, and it's the opposite problem: over-relying on it becomes its own tax. [1] One independent account: Claude would write up a giant multi-page plan document and ask for feedback, hard to actually review, and giving feedback triggered a full regeneration instead of a targeted edit, making it circular rather than iterative. [2]

Two concrete risks worth watching for, not just skipping planning to avoid:

**Rubber-stamping**: A long plan is easy to skim and approve without actually reading its opening assumptions critically, which defeats the point of having one.
**Plan drift**: In a long session, context compaction can quietly drop details the plan depended on, so what gets built stops matching what got approved. [1]

A practical middle ground: keep the plan short enough to actually read, and act on it reasonably soon after you approve it.

**Sources**
1. https://maketocreate.com/claude-code-plan-mode-how-i-use-it-and-when-i-dont/ — Nishil Bhave: "Over-planning is a real tax, and it is easy to fall into once plan mode becomes a reflex." Also: "plan drift" in long sessions, where context compaction quietly drops details the plan depended on. His fix is to execute reasonably soon after approval rather than planning for an hour.
2. https://emschwartz.me/a-rave-review-of-superpowers-for-claude-code/ — Evan Schwartz, emschwartz.me, Apr 2 2026: "In Plan mode, Claude would write up a giant plan document and ask for feedback. It's hard to review a multi-page plan."
