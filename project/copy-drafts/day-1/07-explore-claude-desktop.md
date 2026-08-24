# Explore Claude Desktop

> Get comfortable with the app and its code environment.

## 1. Getting Oriented: Chat, Cowork, Code

*If you haven't completed [pre-workshop setup](/setup.html) yet, do that first. This session assumes Claude Desktop is already installed, signed in, and on a paid plan (Pro, Max, Team, or Enterprise).*

Claude Desktop has two main surfaces, Chat and Code, plus a mode inside Chat:

**Chat**: A normal conversation with Claude. No special file access unless you add one. 
**Cowork**: Select it when you start a new chat to hand off a longer, multi-step task instead of typing a normal message. Attach a "workspace folder," describe an outcome, step away, come back to a finished deliverable.
**Code**: The actual coding surface, and it looks like a lightweight IDE — file editor, integrated terminal, a diff viewer with inline comments, and PR tooling.**This is where today's building happens.**

> **Exercise: Explore Claude Desktop**
>
> - Time: 25 minutes.
> - Description: Poke around Claude Desktop on your own. Play with it, explore each surface, and surface what you notice. If you see something you don't get, look it up.
> - Deliverable: A few things you noticed or got stuck on, ready to share out with the group.

## 4. The Code Environment: Best Practices & Mindset

The best way to get good at the Claude Code is to use it. Here are some guardrail and habits that can make the difference between fighting the tool and working well with it.

- **Be specific.** Vague asks get vague results. "Add filtering" is weaker than "add a dropdown that filters the article list by topic." 
- **Use Plan mode for anything non-trivial.** The Code tab's permission modes (Manual, Accept Edits, Plan, Auto, Bypass) control how much it does before checking with you. Plan mode co-creates a plan before it does it, which is the moment to catch a misunderstanding cheaply.
- **Give it context.** Point it at relevant files or explain the project rather than assuming it can guess what you mean. You can @ specific files to target your work.
- **Work in small steps.** A series of small, specific asks beats one giant one. It's easier to review, easier to course-correct.
- **Always read the diff.** The Code tab's diff viewer is right there. Use it. You're still responsible for what makes it into the code. You can also ask Claude to summarize changes, but that costs you tokens. 
- **Clarify, don't fight.** If the result is off, restate what you actually want rather than repeating the same prompt harder. You can ask why it did something, too, because you might be misunderstanding.
- **Treat surprises as information.** It won't be right every time. That's normal, not a sign you're doing something wrong.

## 6. Building Is a Loop, Too

Coding is a design. There's no straight line from "describe it" to "done." You'll go around this loop — building, trying it, adjusting — more than once before anything's ready to ship.

[Maps to `.process-wheel`, not `.history` — a circular 7-step diagram]
1. **Ideation.** Describe the problem to Claude, in plain language.
2. **Planning.** Claude shows you a plan before touching anything.
3. **Building.** It writes the code; you see it in the editor pane.
4. **Reviewing.** Check the diff, ask questions.
5. **Testing.** Claude runs it locally, right in the terminal, so you can try it.
6. **Iterating.** [hinge step] Tell Claude what to change based on what you saw.
7. **Repeat.** Back to building.
