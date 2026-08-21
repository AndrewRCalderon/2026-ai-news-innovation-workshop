# Explore Claude Desktop

> Hands-on, instructor-guided: get comfortable with the app you'll actually build with — especially its code environment — before you start building.

## 1. Why This Session

AI Tools gave you the landscape. This session is different: it's hands-on and instructor-guided, working through the one app you'll actually use for the rest of the workshop — Claude Desktop — so nothing is unfamiliar when it's time to build.

If you haven't completed [pre-workshop setup](/setup.html) yet, do that first — this session assumes Claude Desktop is already installed, signed in, and on a paid plan (Pro, Max, Team, or Enterprise). Its coding surface isn't available on a free account.

## 2. Session Roadmap

55 minutes, one app, most of it in the Code tab — this is practice time, not install time, since setup happened before today:

[Maps to `.history`, chronological within the session]
1. **10 MIN · Getting Oriented.** Chat, Cowork, and Code — what each tab is actually for.
2. **30 MIN · The Code Environment.** [hinge step] The core of the session — describe a task, review the plan, watch it build, iterate.
3. **15 MIN · Connecting GitHub.** Sign in to the GitHub connector — sets up the next session, Fork & Submit.

## 3. Getting Oriented: Chat, Cowork, Code

Claude Desktop has three tabs, and they're not interchangeable — knowing which one you're in matters:

**Chat**: A normal conversation with Claude. No special file access unless you add one.
**Cowork**: An agentic workspace for document/research-style work — attach a "workspace folder," describe an outcome, step away, come back to a finished deliverable. Not a code editor: no file editor pane, no terminal, no diff view.
**Code**: The actual coding surface, and it looks like a lightweight IDE — file editor, integrated terminal, a diff viewer with inline comments, and PR tooling. Same engine as the Claude Code CLI, in a GUI. **This is where most of today's session happens.**

- Switch tabs from the tab bar near the message box.
- In the Code tab, you pick a **Project folder** when you start a session — the same unscoped access model as opening a folder in VS Code.
- In Cowork or Chat, you attach files or folders via **Connectors** instead — click the **+** next to the prompt box, or check **Settings → Connectors**.
- The **Customize** panel in the sidebar is the one place to manage connectors, skills, and plugins — no technical setup required.

## 4. The Code Environment: Best Practices & Mindset

There isn't a fixed set of steps to memorize here — the real way to get good at the Code tab is to use it. What follows are guardrails, not a checklist: a few habits that make the difference between fighting the tool and working well with it. Once you've got these, the rest of today is practice.

- **Be specific.** Vague asks get vague results. "Add filtering" is weaker than "add a dropdown that filters the article list by topic."
- **Use Plan mode for anything non-trivial.** The Code tab's permission modes (Manual, Accept Edits, Plan, Auto, Bypass) control how much it does before checking with you — Plan mode shows you what it's about to do before it does it, which is the moment to catch a misunderstanding cheaply.
- **Give it context.** Point it at relevant files or explain the project rather than assuming it can guess what you mean.
- **Work in small steps.** A series of small, specific asks beats one giant one — easier to review, easier to course-correct.
- **Always read the diff.** The Code tab's diff viewer is right there — use it. You're still responsible for what ships, not Claude.
- **Clarify, don't fight.** If the result is off, restate what you actually want rather than repeating the same prompt harder.
- **Treat surprises as information.** It won't be right every time — that's normal, not a sign you're doing something wrong.

> The fastest way to get good at this is to use it. Treat today's project time as low-stakes practice.

## 5. Connecting GitHub

<!-- Content-architecture note: has a first-person-plural instance ("which is why it's the one we're using this workshop") against the declarative voice elsewhere, though this page's grounding is otherwise the strongest in Day 1 per content-architecture-notes.md, so it may be a lower-priority fix than 01/04's heading-level cases. -->

Claude Desktop's GitHub connector signs in through your browser — no personal access tokens, no Git installed on your computer. Set it up now; the next session, Fork & Submit, is where you'll actually use it.

- Click the **+** next to the prompt box (in Chat or Cowork) and choose **Connectors**, or go to **Settings → Connectors**.
- Find **GitHub** and sign in — you'll get a short code and a browser prompt to approve it.
- Once connected, Claude can read and write to repos you have access to: file changes, commits, and pull requests. Write actions ask for your approval before anything happens, and a few (like merging a PR) always require approval no matter what.

This is a different path from the Code tab's own built-in git — that one is real, local git and works well, but requires Git (and the GitHub CLI, for PRs) installed on your machine. The connector skips that installation step entirely, which is why it's the one we're using this workshop.

## 6. Building Is a Loop, Too

Same lesson as this morning's design process: there's no straight line from "describe it" to "done." You'll go around this loop — building, trying it, adjusting — more than once before anything's ready to ship.

[Maps to `.process-wheel`, not `.history` — a circular 7-step diagram]
1. **Ideation.** Describe the problem to Claude, in plain language.
2. **Planning.** Claude shows you a plan before touching anything.
3. **Building.** It writes the code; you see it in the editor pane.
4. **Reviewing.** Check the diff, ask questions.
5. **Testing.** Claude runs it locally, right in the terminal, so you can try it.
6. **Iterating.** [hinge step] Tell Claude what to change based on what you saw.
7. **Repeat.** Back to building — until it's actually right.

Shipping — committing and opening a PR through the GitHub connector — happens whenever you're ready, not as a forced last step. That's what the next session, Fork & Submit, walks through.
