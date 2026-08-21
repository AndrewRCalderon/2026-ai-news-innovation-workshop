# Skills & Best Practices

> Package your expertise.

## 1. What a Skill Is

A Skill is a reusable, filesystem-based resource. It's a folder of instructions, scripts, and reference material that gives Claude domain-specific expertise and targeted functionality. [1]

The difference from just writing a prompt is that a prompt is a conversation, whereas a Skill loads on demand or on trigger in conversation, so the same guidance doesn't need repeating across every new conversation. [2] Anthropic introduced Skills in October 2025, framing them around a simple idea: real work needs procedural knowledge and organizational context, not just a capable model. [3]

People have already built skills for various journalism functions. For example, a 14-skill collection for journalists covers AP style, source and deepfake verification, and FOIA request templates, free to install. [4] Worth a look after this session.

**Sources**
1. https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview — Claude Platform Docs, Agent Skills Overview: Skills are reusable, filesystem-based resources that give Claude domain-specific expertise. They exist as directories containing instructions, executable code, and reference materials, organized like an onboarding guide you'd create for a new team member.
2. https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview — Claude Platform Docs: unlike prompts (conversation-level instructions for one-off tasks), Skills load on demand, so you don't have to repeat the same guidance across conversations.
3. https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills — Anthropic Engineering blog, Oct 16 2025, "Equipping agents for the real world with Agent Skills": Claude is powerful, but real work requires procedural knowledge and organizational context.
4. https://github.com/jamditis/claude-skills-journalism — Joe Amditis, claude-skills-journalism (GitHub, MIT license): 14 core journalism skills built for journalists, researchers, and media professionals, covering AP style, source/deepfake verification via C2PA, and FOIA/OPRA request templates.

## 2. When You'd Know You Need One

You're a few days into your own project, and every time you open a new chat with Claude to update your README, you find yourself typing the same three sentences: which fields are required, what the submission format looks like, and where the file goes. You've now explained this four times, once per session.

That's the moment. Not "this seems complicated," but "I've explained this before, and I'm about to explain it again." A Skill is what you'd write down so you never have to type those three sentences again: a folder Claude reads automatically whenever the task calls for it, instead of you re-explaining it from memory every time. [1]

The same signal shows up in reverse, too. Maybe Claude keeps making the same small mistake, using the wrong date format in your captions, say, and you've now corrected it three separate times. That's not a one-off fix. That's a pattern, and a Skill is where the fix for a pattern lives, instead of getting fixed once and forgotten by the next session.

**Sources**
1. https://claude.com/blog/lessons-from-building-claude-code-how-we-use-skills — Anthropic, "Lessons from building Claude Code: how we use skills." On deciding where to create a skill: ask whether this is a task you'll need to repeat multiple times, and whether it's specialized enough to matter to the overall workflow.

## 3. Build One

1. **Notice the pattern.** You'll know it's worth turning into a Skill the same way you'd know something belongs in your CLAUDE.md. You've explained the same thing to Claude more than once, or corrected the same mistake twice.
2. **Direct Claude to build it.** Tell Claude what you've noticed, the thing you keep re-explaining, or the mistake you keep correcting, and ask whether a Skill is the right fix. If you already know it is, just tell it to make one. Claude sets up the folder and the required SKILL.md file itself. [1]
3. **Review the description it wrote.** At the top of the file, a short description of what the skill does and exactly when Claude should use it. That description is literally what Claude matches against your future requests, so read it critically. [2] If Claude doesn't reliably reach for the skill later, the problem is usually this description, not the instructions inside it: it needs to be specific enough to say exactly when to use it, not something vague like "helps with content creation." [3] Below that, check that the instructions read like something you'd actually brief a new hire with, in the right order, with real gotchas, not vague generalities. Keep adding to that section as you actually use the skill: the gotchas worth documenting are the failures you watched happen, not ones you imagined in advance. [4]
4. **Test it two ways.** Ask a question that matches the description, and see if Claude reaches for the skill on its own. Then try invoking it directly by typing the skill's name as a command, to confirm it works even when it doesn't trigger automatically. [5] Before you trust what you're seeing either way, run the task once without the skill loaded, using your general-purpose model: skip that, and you have no baseline, so you can't actually tell what the skill changed, only that something happened. [6]
5. **Stress-test it honestly.** Write down a few real, specific examples of what a good result looks like, not abstract rules. [7] Once it seems to work, hand it to a fresh conversation that doesn't know how you built it, and try it on messy, real input, not just the cases you had in mind while writing it. [8]

**Sources**
1. https://code.claude.com/docs/en/skills — Claude Code Docs, Skills: a skill is a directory named after the skill, with SKILL.md as the required entry point. Personal skills live at ~/.claude/skills/<name>/SKILL.md (all projects); project skills live at .claude/skills/<name>/SKILL.md (that project only).
2. https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview — Claude Platform Docs: SKILL.md's YAML frontmatter requires a name and a description that states both what the skill does and when to use it, since Claude matches requests against the description to decide when to load it.
3. https://alexmcfarland.substack.com/p/5-reasons-your-claude-skills-keep — Alex McFarland, "5 reasons your Claude skills keep breaking (and you don't even notice)," Mar 30 2026: vague descriptions kill routing. Contrasts "helps with content creation" against a specific trigger description naming exactly when the skill applies.
4. https://claude.com/blog/lessons-from-building-claude-code-how-we-use-skills — Anthropic: "The highest-signal content in any skill is the Gotchas section," built from real observed failures rather than hypothetical ones.
5. https://code.claude.com/docs/en/skills — Claude Code Docs, Skills: test a skill either by asking a question matching its description (auto-trigger) or by typing /<skill-name> to invoke it explicitly.
6. https://alexmcfarland.substack.com/p/5-reasons-your-claude-skills-keep — Alex McFarland, Mar 30 2026: if you never test without the skill loaded, "you have no idea what your instructions actually changed."
7. https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices — Claude Platform Docs, Agent Skills best practices: recommends writing concrete evaluation scenarios (a real query, real files, the expected behavior) rather than abstract rules, and testing with a separate, fresh Claude instance that wasn't involved in building the skill.
8. https://www.philschmid.de/testing-skills — Phil Schmid, independent practitioner workflow for testing Claude Skills: build a set of real test cases with clear success criteria, run them in a clean environment, and expect skills to behave non-deterministically, run each case more than once.

## 4. Testing It For Real

Take the README skill from the example above. Hand it a messy, real case, a feature with an unusual file structure, say, not the clean example you had in mind while writing it, and see whether the instructions still hold up or start needing you to step in.

When it breaks, that's not a sign the Skill failed. It's information. Add what actually happened to the Gotchas section, specific to the real failure, not a hypothetical, and test again. A couple of these small corrections is normal. 

What isn't normal is patching the same Skill five or six times without ever rereading it start to finish. That's called a patch spiral, and the fix is to stop and rebuild from what actually failed instead of layering on another exception. A quick way to tell you've hit that point: could someone read the skill start to finish and still explain why each rule is there? If not, it's time to rebuild, not patch again. [1]

**Installing skills from strangers**: One public skills marketplace passed 40,000 listings within months of launch, and shared skill repos have already been found shipping malware that exfiltrates tokens and cloud credentials. Fix: read a skill's actual instructions before installing it, the same way you'd check a browser extension's permissions. [2]

**Sources**
1. https://alexmcfarland.substack.com/p/5-reasons-your-claude-skills-keep — Alex McFarland: describes a "patch spiral," where every failure gets a quick fix until the skill accumulates contradictory rules, instead of being rebuilt from what was actually observed to fail.
2. https://news.ycombinator.com/item?id=49169640 — Hacker News thread, "Agent skills that bring team coding standards to Claude Code and Codex": commenters warned that a linked skill repo contained malware exfiltrating GitHub tokens, AWS keys, and Kubernetes secrets. Separately reported: a skills marketplace exceeded 40,000 listings within months of the feature's October 2025 launch.
