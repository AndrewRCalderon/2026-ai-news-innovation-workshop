# Spec-Driven Development

> AI models are excellent at pattern completion and poor at mind reading. A spec is how you close that gap before you start building.

## 1. What a Spec Is

A spec, short for specification, is a written description of what something should do, worked out before anyone builds it. Product and design teams have used them for decades, long before AI entered the picture.

An engineer writes what a feature needs to accomplish. A designer writes what a screen needs to show and how it should behave. An editor writes what a story needs to cover before a reporter starts writing it. Different fields, same habit. Agree on what "done" looks like before you start, so you're not discovering disagreements halfway through.

A useful spec usually has three parts. The requirements, what has to be true when this is finished. The constraints, what can't be true, budget, format, a deadline, a technical limit. And the acceptance criteria, how you'll actually know it's done, not just started.

## 2. The Core Idea

Spec-driven development takes that same habit and applies it to how you work with an AI coding assistant. It inverts the usual coding workflow. The specification becomes the source of truth, and the code becomes something generated and checked against it, not the other way around. [1] GitHub's own tooling for this, spec-kit, describes the same inversion independently: you give the agent a high-level description of what you're building and why, and it generates the spec first, the plan second, code last. [2]

Why this matters more with AI assistants than it used to: AI models are excellent at pattern completion, matching what you ask against patterns they've already seen, and poor at mind reading. [3] A vague prompt like "add photo sharing to my app" leaves Claude guessing at what you actually meant. A spec gives it enough to match your intent instead of inventing one.

Worth knowing before you reach for this on every project: it works best on new, well-scoped work. One independent critique argues that on a large project's existing code, its codebase, it mostly breaks down. Planning can't eliminate how unpredictable real development actually is, the way it promises to. [4] For an afternoon build in this workshop, that's rarely the constraint you'll hit.

**Sources**
1. https://arxiv.org/pdf/2602.00180 — Piskala, "Spec-Driven Development: From Code to Contract in the Age of AI Coding Assistants," arXiv:2602.00180 (Jan 2026). Abstract: SDD inverts the traditional workflow by treating specifications as the source of truth and code as a generated or verified secondary artifact.
2. https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/ — Den Delimarsky, GitHub Blog, Sept 2 2025: "You provide a high-level description of what you're building and why, and the coding agent generates a detailed specification."
3. https://arxiv.org/pdf/2602.00180 — Piskala paper: "The problem is simple: AI models are excellent at pattern completion but poor at mind reading."
4. https://marmelab.com/blog/2025/11/12/spec-driven-development-waterfall-strikes-back.html — François Zaninotto, Marmelab, Nov 12 2025: "Software development is fundamentally a non-deterministic process, so planning doesn't eliminate uncertainty." Also: "For large existing codebases, SDD is mostly unusable."

## 3. The Checklist

A repeatable four-step framework, worth applying to your own project this afternoon, and one that independent teams building real spec-driven tools converge on in roughly the same shape. [1] At each step, a few questions to ask yourself and anyone you're building with.

1. **Specify: what should it do?** Behavior, requirements, acceptance criteria, not implementation details yet. GitHub's spec-kit and AWS's Kiro, two real tools built around this workflow, both start in the same place, under names like requirements.md. [2]
   - What should this actually do, described as behavior, not how it gets built?
   - What does "finished" look like, specifically enough that someone else could check it? [3]
   - Is there more than one reasonable way to read what you just wrote? If so, that's exactly where to add detail. If there's only one reasonable reading, stop there. [4]
2. **Plan: how should you build it?** Architecture, the pieces, how they fit together. The spec declares what you want, the plan declares how you'll get there. One four-engineer team, a year into running this loop with Claude Code, found this is also the step that resists automation the most. [5]
   - What's the actual approach, and what already exists that this has to work with or around?
   - Whose judgment does this decision actually need? Turning a spec into a plan takes a person who knows the project and the team, not just the model.
3. **Implement: build it in pieces.** Small, validated increments, each one a testable piece of functionality, not one giant leap. That same team reported roughly a two-to-three-times increase in throughput over a year running this workflow, with headcount unchanged. [6]
   - Can you break this into pieces small enough to check one at a time, instead of one giant leap?
   - After each piece, does it actually do what step 1 said it should?
4. **Validate: does it match?** A passing test only proves the code matches the spec, not that the spec was right in the first place. [7] Claude stops when the work looks done, and without an explicit check to run, "looks done" is the only signal you get. [8] Neither spec-kit nor Kiro treats validation as one closing step either, both check continuously between phases instead of saving it all for the end. [9]
   - If it doesn't match, was the spec wrong or the build wrong? Either way, the spec stays the authority until you deliberately change it.
   - Would a fresh pair of eyes still agree the spec was asking for the right thing, not just that the code matches it?

### Put It Together, For Use With Claude

Once you've worked through the questions above, you already have what a real spec needs, you just have to write it down. The fastest way is to hand Claude your answers and ask it to draft the spec for you. Here's a starting point you can copy, fill in, and adapt.

`starter-prompt.md`
```
I want to build [describe the project in one or two sentences].

Here's what I worked out by going through a spec:

Specify
- What it should do: [your answer]
- What "finished" looks like: [your answer]

Plan
- The approach, and what it has to work with: [your answer]

Implement
- Pieces that should probably get built and checked separately: [your answer]

Validate
- How I'll know it's actually done, not just running: [your answer]

Turn this into an actual spec: behavior-focused, testable, and only as
detailed as it needs to be to remove ambiguity. Then propose a plan
before you start building anything.
```

One thing this checklist can't do on its own: a spec that isn't updated when the code changes doesn't just go unused, it becomes actively misleading. An agent will follow it confidently even after it's stopped matching reality. [10] If you revise your project later today, revise the spec too.

**Sources**
1. https://arxiv.org/pdf/2602.00180 — Piskala paper, Section III, describes this as a four-phase SDD workflow: Specify, Plan, Implement, Validate.
2. https://kiro.dev/docs/specs/ — AWS Kiro docs: the first spec artifact, requirements.md, is defined to "Define what needs to be built or fixed."
3. https://arxiv.org/pdf/2602.00180 — Piskala paper, Section II: good specs share several characteristics: they are behavior-focused, describing what happens rather than how; they are testable; they are unambiguous; they are complete enough to cover essential cases without over-specifying.
4. https://arxiv.org/pdf/2602.00180 — Piskala paper: write specs at the level of detail needed to remove ambiguity. If an AI or developer could interpret a requirement in multiple ways, add clarification. If there's only one reasonable interpretation, don't over-specify.
5. https://joshmcdonald.medium.com/running-a-small-team-on-a-big-project-spec-driven-development-with-claude-code-9a1b97f58551 — Joshua McDonald, Apr 28 2026, on running a small team on spec-driven development with Claude Code: the /spec-decompose planning step is explicitly called out as resisting reliable automation, requiring human judgment about team composition and codebase context.
6. https://joshmcdonald.medium.com/running-a-small-team-on-a-big-project-spec-driven-development-with-claude-code-9a1b97f58551 — Joshua McDonald, Apr 28 2026: "Throughput increased by about a factor of two to three over the past year, while headcount remained unchanged." Four-engineer team, fourteen-feature roadmap, using Claude Code specifically.
7. https://arxiv.org/pdf/2602.00180 — Piskala paper, Section IX, on the "false confidence" pitfall: a passing spec test doesn't guarantee correct software, it only guarantees the software matches the spec. If the spec is wrong, the code will faithfully implement the wrong thing.
8. https://code.claude.com/docs/en/best-practices — Claude Code Docs, Best Practices: "Claude stops when the work looks done. Without a check it can run, looks done is the only signal available, and you become the verification loop."
9. https://github.com/github/spec-kit — GitHub spec-kit repo: alongside /speckit.specify, /speckit.plan, /speckit.tasks, and /speckit.implement, it ships /speckit.clarify and /speckit.analyze for ambiguity and consistency checks between phases, not one closing validation step.
10. https://www.augmentcode.com/blog/what-spec-driven-development-gets-wrong — Amelia Wattenberger, Augment Code, Feb 20 2026 (updated Jun 18 2026): "A stale spec misleads agents that don't know any better. They'll execute a plan that no longer matches reality, confidently."

## 4. Why This Connects to Skills

Specs, done well, act as modular building blocks Claude can work from directly. [1] That's close to what a Skill does when it packages expertise for reuse. A Skill is essentially a pre-written spec for a kind of task you'll do again. Once you've written a spec once, the checklist above is what makes it repeatable the next time.

If this clicks for you, GitHub's spec-kit and AWS's Kiro are two real, free tools built entirely around this loop, worth a look after the workshop. [2][3]

**Sources**
1. https://arxiv.org/pdf/2602.00180 — Piskala paper, Section IV: specifications act as "super-prompts" that break down complex problems into modular components aligned with agents' context windows.
2. https://github.com/github/spec-kit — GitHub spec-kit, open-source toolkit for spec-driven development, github.com/github/spec-kit.
3. https://kiro.dev/docs/specs/ — AWS Kiro, spec-driven AI IDE, kiro.dev/docs/specs.
