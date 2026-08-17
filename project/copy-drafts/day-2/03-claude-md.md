# CLAUDE.md

> One file, read at the start of every session. It's the difference between explaining your project to Claude once and explaining it every single time.

## 1. What It Is

CLAUDE.md is a plain-text file Claude reads automatically at the start of every session. [1] Every Claude Code session starts with an empty context window. Without this file, you're re-explaining your project's conventions, commands, and quirks from scratch, every time. [2]

A simple test for whether something belongs in yours: has Claude made the same mistake twice, or have you typed the same correction into chat more than once? That's the signal. [3]

One distinction worth knowing before next session: CLAUDE.md is for what's true every time. If something's only relevant sometimes, a specific kind of task you do occasionally, that's what Skills, covered right after lunch, are for instead. [4]

**Sources**
1. https://code.claude.com/docs/en/memory — Claude Code Docs, "How Claude remembers your project": CLAUDE.md files are markdown files that give Claude persistent instructions for a project, your personal workflow, or your entire organization. Claude reads them at the start of every session.
2. https://claude.com/blog/using-claude-md-files — Anthropic blog, Nov 25 2025, "Using CLAUDE.md files": think of it as a configuration file that Claude automatically incorporates into every conversation, ensuring it always knows your project structure, coding standards, and preferred workflows.
3. https://code.claude.com/docs/en/memory — Claude Code Docs: add to CLAUDE.md when Claude makes the same mistake a second time, a code review catches something Claude should have known, or you type the same correction into chat that you typed last session.
4. https://code.claude.com/docs/en/best-practices — Claude Code Docs, Best Practices: "For domain knowledge or workflows that are only relevant sometimes, use skills instead" of CLAUDE.md.

## 2. A Real Example

This workshop's own repository has a CLAUDE.md file. It's not a hypothetical, it's the actual file governing how this website gets built. [See it on GitHub](https://github.com/AndrewRCalderon/2026-ai-news-innovation-workshop/blob/main/CLAUDE.md), or open the whole thing right here.

<!-- Pending, logged in REQUIREMENTS.md Batch 7: this button currently
     opens a popup that user reports is illegible ("shows a long string").
     Fix is a design change, not a copy edit: replace with an inline
     collapsible element that opens in place instead of a popup. Not
     something to resolve in this markdown file — the embedded file
     content below is a verbatim, byte-faithful copy of this repo's real
     CLAUDE.md, not something to edit here; edit the actual CLAUDE.md
     file if it needs to change. -->
[Embedded file viewer: shows this repo's actual `CLAUDE.md`, verbatim.]

Three things worth noticing about it, and worth copying into your own:

<!-- Pending, logged in REQUIREMENTS.md Batch 7: remove the second
     sentence of the second item below (the haddock3/robotics-lab
     example) entirely. Left in place here so you can see exactly what's
     being cut; delete it directly if you agree, or edit instead. -->
**It points, it doesn't duplicate**: Instead of listing every task, it says: read `project/REQUIREMENTS.md` for current status. The file stays short because it delegates to other files rather than repeating their contents.
**It states what can't be inferred from code**: A rule like "any non-trivial technical decision gets a new numbered file in `project/adr/`" isn't something Claude could guess by reading the codebase. That's exactly the kind of thing that belongs here. A robotics lab's CLAUDE.md makes the same kind of call for a different reason: it tells Claude explicitly that existing code has been human-verified to work, but isn't necessarily the best implementation, a fact no amount of code-reading would reveal. [1]
**It's organized by when you'd need it**: Sections for "before starting work," "while working," and "repo layout" map to the actual moments in a session, not an abstract table of contents.

<!-- Pending, logged in REQUIREMENTS.md Batch 7: weave these examples
     into the closing paragraph below (user's own phrasing, to fold in,
     not to add verbatim as a new paragraph): "This is the place where
     you'd document decisions that you or your team made about
     fundamental aspects of the product that you are designing. It can
     be information about audience segments, the tone of the language
     across the site, words to avoid, or a commitment to only use
     certain kinds of tools." Also: check for overlap with the Include
     column in section 3 below (which already mentions design system and
     audience persona examples) and remove any duplicate examples once
     this is folded in, don't repeat the same illustration twice on one
     page. Edit the paragraph below directly to do this weave. -->
That's the shape worth copying, whatever your own project is about: point instead of duplicate, write down what Claude can't guess on its own, and organize around when you'll actually need each part. The decisions in your file might come from a design system, an audience persona, or a build process like this one, the habit is the same either way.

**Sources**
1. https://github.com/haddocking/haddock3/blob/main/CLAUDE.md — haddocking/haddock3 CLAUDE.md (Utrecht University): "All code in this project is functional, meaning it has been verified by humans that it produces the expected results, but that does not mean that the code is in its best implementation. If you copy code from somewhere else, try to improve it, do not assume it is already optimal." (this citation goes away if the sentence it supports is cut, per the pending edit above)

## 3. What Belongs In One

The most common mistake isn't leaving something out. It's putting too much in. [1]

A CLAUDE.md isn't only an engineering file. It's a record of decisions your whole team has already made, so Claude doesn't have to guess at them or get them re-explained every session.

**Include**
- Decisions Claude can't guess on its own, a command, a required step, a deadline
- Your design system, fonts, colors, spacing, so pages built with Claude match on the first try
- What you know about your audience, personas, reading level, assumptions, so writing and design choices don't need re-explaining either
- Structural decisions specific to your project
- A gotcha you've already hit once, so it doesn't happen twice

**Leave out**
- Anything Claude can already figure out by looking at the project itself
- Long explanations of tools Claude already knows how to use
- Detailed documentation, link to it instead of copying it in [2]
- Information that changes often, an outdated CLAUDE.md is worse than a short one [3]
- Self-evident practices, like "write clean code"
- Credentials or anything sensitive, especially if this file is shared with others

### Before You Add a Line

- Would removing this line actually cause Claude to make a mistake? If not, cut it. [4]
- Could Claude figure this out just by looking at the project itself, without you writing it down? [5]

**Sources**
1. https://code.claude.com/docs/en/best-practices — Claude Code Docs, "Best practices for Claude Code": bloated CLAUDE.md files cause Claude to ignore your actual instructions. Target under 200 lines per file, longer files consume more context and reduce adherence.
2. https://code.claude.com/docs/en/best-practices — Claude Code Docs, "Write an effective CLAUDE.md" table, Exclude column: "Detailed API documentation (link to docs instead)".
3. https://code.claude.com/docs/en/best-practices — Claude Code Docs, same table, Exclude column: "Information that changes frequently."
4. https://code.claude.com/docs/en/best-practices — Claude Code Docs: for each line, ask "would removing this cause Claude to make mistakes?" If not, cut it.
5. https://code.claude.com/docs/en/memory — Claude Code Docs, on the /doctor command for oversized CLAUDE.md files: it "cuts content Claude can derive from the codebase, such as directory layouts, dependency lists, and architecture overviews, and keeps pitfalls, rationale, and conventions that differ from tool defaults."

## 4. Write Your Own

Claude Code can generate a starting CLAUDE.md by analyzing your project directly, with the `/init` command. [1] That's a starting point, not a finished product. It should grow from the actual friction points in your workflow, not a theoretical checklist. [2]

> **Exercise: Draft Your CLAUDE.md**
> - Time: ~15 minutes.
> - Description: Run `/init` on your Day 1 project and let Claude generate a CLAUDE.md from the current state of things, don't write it yourself first.
> - Deliverable: Read what Claude produced. Pick two or three things it summarized and, for each one, ask yourself whether it was explicit, a decision you actually made or told Claude directly, or whether it's an abstraction Claude inferred from a pattern in how you'd been working that you weren't even aware of. Come ready to share one of each.

**Sources**
1. https://code.claude.com/docs/en/memory — Claude Code Docs: the /init command generates a starting CLAUDE.md by analyzing the codebase; re-run it to get improvement suggestions rather than overwrite.
2. https://claude.com/blog/using-claude-md-files — Anthropic blog: start simple with basic project structure, then expand based on actual friction points in your workflow. Your file should reflect how your team actually develops software, not theoretical best practices that sound good but don't match reality.
