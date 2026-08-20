<!-- STRUCTURAL NOTE, pending, logged in REQUIREMENTS.md Batch 7.
     Target end state for this page (confirmed, not yet built):
       1. What a Skill Is — unchanged.
       2. NEW — a non-technical scenario illustrating the kind of moment
          that should prompt someone to turn something into a Skill.
          Not drafted yet. Write it directly in section 2 below,
          replacing the current "What Actually Makes This Work" content.
       3. Build One — unchanged, EXCEPT it should absorb the current
          section 2's advice first (see the note inside section 3 below
          for where and how).
       4. NEW — how to think about testing a skill and how to actually
          do it. Practical, step-by-step, not abstractions, and should
          use the same scenario introduced in the new section 2. Keep
          the current "Installing skills from strangers" row somewhere
          in this section (or in Build One) — confirmed to preserve,
          not cut with the rest of the old section 4.
     Current (pre-restructure) content is below so you have the raw
     material to work from. Rewrite sections 2 and 4 directly; move
     content into section 3 directly. -->

# Skills & Best Practices

> Package your expertise.

## 1. What a Skill Is

A Skill is a reusable, filesystem-based resource. It's a folder of instructions, scripts, and reference material that gives Claude domain-specific expertise and targeted functionality. [1]

The difference from just writing a prompt is that a prompt is a conversation, whereas a Skill loads on demand or on trigger in conversation, so the same guidance doesn't need repeating across every new conversation. [2] Anthropic introduced Skills in October 2025, framing them around a simple idea: real work needs procedural knowledge and organizational context, not just a capable model. [3]

People have already built skills for this exact job. For example, a 14-skill collection for journalists covers AP style, source and deepfake verification, and FOIA request templates, free to install. [4] Worth a look after this session.

**Sources**
1. https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview — Claude Platform Docs, Agent Skills Overview: Skills are reusable, filesystem-based resources that give Claude domain-specific expertise. They exist as directories containing instructions, executable code, and reference materials, organized like an onboarding guide you'd create for a new team member.
2. https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview — Claude Platform Docs: unlike prompts (conversation-level instructions for one-off tasks), Skills load on demand, so you don't have to repeat the same guidance across conversations.
3. https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills — Anthropic Engineering blog, Oct 16 2025, "Equipping agents for the real world with Agent Skills": Claude is powerful, but real work requires procedural knowledge and organizational context.
4. https://github.com/jamditis/claude-skills-journalism — Joe Amditis, claude-skills-journalism (GitHub, MIT license): 14 core journalism skills built for journalists, researchers, and media professionals, covering AP style, source/deepfake verification via C2PA, and FOIA/OPRA request templates.

## 2. What Actually Makes This Work

<!-- PENDING: replace this entire section's content with the new
     non-technical "when you'd know you need a skill" scenario. Before
     replacing, make sure the two items below have been folded into
     section 3 (Build One), written in the same explained if/then,
     cause-and-effect style as the third bullet below (not as flat
     statements) — that's the original standing instruction for this
     content (REQUIREMENTS.md Batch 4), reconfirmed for the fold-in. -->

The team that built Claude Code uses Skills internally for its own production work, and their account of what makes one work is useful: [1]

- When you're deciding where to create a skill, ask yourself if this is a task that you will need to repeat multiple times. Moreover, ask yourself whether this is a specialized task that need to be performed with specific context & is important for the overall function of the product or workflow.
- Notice what failures you actually watched happen, not ones you imagined in advance. The so-called "gotcha" section is where you document edge cases as you use the skill. It creates a safeguard against what might go wrong out in the wild. [2]
- Before you trust a new skill, run the task once without it loaded just using your general-purpose model. If you skip that step, you have no baseline, so you can't actually tell what the skill changed, only that something happened. [3]
- If Claude doesn't reliably reach for a skill when it should, the problem is usually the description, not the instructions inside it. A vague one, "helps with content creation," won't trigger reliably. Write one specific enough to say exactly when to use it, and Claude will find it. [4]

**Sources**
1. https://claude.com/blog/lessons-from-building-claude-code-how-we-use-skills — Anthropic, "Lessons from building Claude Code: how we use skills." Describes their own internal production skill library, including billing-lib, signup-flow-driver, standup-post, and adversarial-review.
2. https://claude.com/blog/lessons-from-building-claude-code-how-we-use-skills — Anthropic: "The highest-signal content in any skill is the Gotchas section," built from real observed failures rather than hypothetical ones.
3. https://alexmcfarland.substack.com/p/5-reasons-your-claude-skills-keep — Alex McFarland, "5 reasons your Claude skills keep breaking (and you don't even notice)," Mar 30 2026: if you never test without the skill loaded, "you have no idea what your instructions actually changed."
4. https://alexmcfarland.substack.com/p/5-reasons-your-claude-skills-keep — Alex McFarland: vague descriptions kill routing. Contrasts "helps with content creation" against a specific trigger description naming exactly when the skill applies.

## 3. Build One

<!-- PENDING: fold section 2's three bullets in here, most likely inside
     step 3 below ("Fill it in like an onboarding doc"), since that step
     already touches gotchas and description-writing. Write them as
     if/then cause-and-effect, matching this section's own existing
     voice, not as a flat restatement. -->

1. **Notice the pattern.** You'll know it's worth turning into a Skill the same way you'd know something belongs in your CLAUDE.md. You've explained the same thing to Claude more than once, or corrected the same mistake twice.
2. **Create the folder and the file.** A Skill lives in its own folder, named after the skill, with one required file inside it called SKILL.md. [1] Ask Claude to set the folder up for you if you're not sure where that is.
3. **Fill it in like an onboarding doc.** At the top, a short description of what the skill does and exactly when Claude should use it. That description is literally what Claude matches against your requests, so vague doesn't work. [2] Below that, write the instructions the way you'd brief a new hire on what to do, in what order, and any gotchas you already know about.
4. **Test it two ways.** Ask a question that matches your own description, and see if Claude reaches for the skill on its own. Then try invoking it directly by typing the skill's name as a command, to confirm it works even when it doesn't trigger automatically. [3]
5. **Stress-test it honestly.** Write down a few real, specific examples of what a good result looks like, not abstract rules. [4] Once it seems to work, hand it to a fresh conversation that doesn't know how you built it, and try it on messy, real input, not just the cases you had in mind while writing it. [5]

**Sources**
1. https://code.claude.com/docs/en/skills — Claude Code Docs, Skills: a skill is a directory named after the skill, with SKILL.md as the required entry point. Personal skills live at ~/.claude/skills/<name>/SKILL.md (all projects); project skills live at .claude/skills/<name>/SKILL.md (that project only).
2. https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview — Claude Platform Docs: SKILL.md's YAML frontmatter requires a name and a description that states both what the skill does and when to use it, since Claude matches requests against the description to decide when to load it.
3. https://code.claude.com/docs/en/skills — Claude Code Docs, Skills: test a skill either by asking a question matching its description (auto-trigger) or by typing /<skill-name> to invoke it explicitly.
4. https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices — Claude Platform Docs, Agent Skills best practices: recommends writing concrete evaluation scenarios (a real query, real files, the expected behavior) rather than abstract rules, and testing with a separate, fresh Claude instance that wasn't involved in building the skill.
5. https://www.philschmid.de/testing-skills — Phil Schmid, independent practitioner workflow for testing Claude Skills: build a set of real test cases with clear success criteria, run them in a clean environment, and expect skills to behave non-deterministically, run each case more than once.

## 4. Common Failure Patterns

<!-- PENDING: replace "The confident-looking failure" and "The patch
     spiral" rows below with a new explanation of how to think about
     testing a skill and how to actually do it — practical, step-by-step,
     not abstractions, and should speak back to the scenario introduced
     in section 2. KEEP "Installing skills from strangers" below,
     confirmed — either here or moved into Build One, your call. -->

**The patch spiral**: Treating every new failure as a one-line edit until the skill accumulates contradictory rules nobody remembers the reason for. Fix: after a couple of patches, stop and rebuild from what actually failed instead of layering on another exception. A quick way to tell you've hit that point: could someone read the skill start to finish and still explain why each rule is there? If not, it's time to rebuild, not patch again. [1]
**Installing skills from strangers**: One public skills marketplace passed 40,000 listings within months of launch, and shared skill repos have already been found shipping malware that exfiltrates tokens and cloud credentials. Fix: read a skill's actual instructions before installing it, the same way you'd check a browser extension's permissions. [2]

**Sources**
1. https://alexmcfarland.substack.com/p/5-reasons-your-claude-skills-keep — Alex McFarland: describes a "patch spiral," where every failure gets a quick fix until the skill accumulates contradictory rules, instead of being rebuilt from what was actually observed to fail.
2. https://news.ycombinator.com/item?id=49169640 — Hacker News thread, "Agent skills that bring team coding standards to Claude Code and Codex": commenters warned that a linked skill repo contained malware exfiltrating GitHub tokens, AWS keys, and Kubernetes secrets. Separately reported: a skills marketplace exceeded 40,000 listings within months of the feature's October 2025 launch.
