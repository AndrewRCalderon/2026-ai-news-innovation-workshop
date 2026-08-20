# Prompting

> "Prompt engineering" used to mean hacks. Increasingly, it just means being clear about what you want, and knowing how best to work with Claude to help you get there.

## 1. How This Has Changed

Three years is a long time in this field. What counted as good practice right after ChatGPT launched looks pretty different from what Anthropic recommends now.

1. **2022 · A craft already forming.** Learn Prompting, one of the first dedicated prompting guides, launched in October 2022, before ChatGPT existed. [1]
2. **Dec 2022 · The role-play era.** A week after ChatGPT's launch, "Awesome ChatGPT Prompts" popularized a style built on assigning Claude a persona: "I want you to act as a linux terminal," "I want you to act as an English translator." [2] This kind of framing, plus heavy structural scaffolding, was the dominant advice.
3. **2023 · A six-figure job title.** By spring 2023, "prompt engineer" was a real, well-paid job, with postings reportedly as high as $335,000. [3] Even then, skeptics raised questions about its longevity as a distinct specialty.
4. **2024 · Claude starts writing prompts for you.** Anthropic shipped a Prompt Generator, where you describe what you want and let Claude draft the prompt, [4] followed months later by a Prompt Improver that strengthens a prompt you already wrote. [5] OpenAI shipped something similar the same year, a single "Generate" feature in its Playground that both drafts and refines prompts, rather than Anthropic's two separate tools. [6]
5. **2025 · Less scaffolding, more curation.** By late 2025, Anthropic got specific about curation rather than prompt engineering. Heavy role prompting, telling Claude "you are a financial advisor," isn't as necessary. Current models do better if you are precise about the task you want to perform. Structural scaffolding like XML tags matters less too, plain headings and spacing work about as well. [7] What still matters, maybe more than before, is being explicit about what you actually want, explaining your reasoning instead of just listing rules, and giving Claude a few real examples of the output you're after + curated contextualization. [8]

**Sources**
1. https://learnprompting.org/about — Learn Prompting founder Sander Schulhoff: "I read a few hundred papers on Prompting over 2 weeks, built a site, and released it on October 2022 (before ChatGPT!)"
2. https://github.com/f/awesome-chatgpt-prompts — Awesome ChatGPT Prompts repo, launched Dec 5 2022, now 167k+ GitHub stars. Example prompt text: "I want you to act as a linux terminal. I will type commands and you will reply with what the terminal should show."
3. https://time.com/6272103/ai-prompt-engineer-job/ — Time, April 14 2023: reports on prompt engineer salaries up to $335,000, hires with no tech background. Also notes early skepticism from Ethan Mollick about whether prompt engineering would matter long-term.
4. https://claude.com/blog/prompt-generator — Anthropic, May 20 2024: "Describe what you want to achieve, and Claude will use prompt engineering techniques such as chain-of-thought reasoning to create an effective, precise, and reliable prompt."
5. https://claude.com/blog/prompt-improver — Anthropic, Oct 14 2024: the prompt improver strengthens existing prompts via chain-of-thought reasoning, example standardization, example enrichment, rewriting, and prefill addition.
6. https://community.openai.com/t/new-playground-features-generate-in-the-playground/963949 — OpenAI developer community post, Oct 1 2024, announcing "Generate" in the Playground: generates prompts, function definitions, and structured-output schemas from a plain-language task description, and can also refine an existing prompt.
7. https://claude.com/blog/best-practices-for-prompt-engineering — Anthropic, Nov 10 2025: "modern models are better at understanding structure without XML tags... clear headings, whitespace, and explicit language work just as well with less overhead." Also on role prompting: "modern models are sophisticated enough that heavy-handed role prompting is often unnecessary," recommending stating the desired lens directly instead (e.g. "focusing on risk tolerance and long-term growth" rather than "you are a financial advisor").
8. https://claude.com/blog/best-practices-for-prompt-engineering — Anthropic, Nov 10 2025: be explicit ("Create a dashboard" vs. specifying to include as many relevant features and interactions as possible); explain reasoning behind rules instead of just stating them; use few-shot examples, current Claude models "pay very close attention to details in examples."

## 2. What Works Now

Two failure patterns worth recognizing when they happen:

- The kitchen sink session: piling unrelated tasks into one long conversation until Claude loses the thread of what actually matters. Fix: one goal per session, `/clear` before starting the next. [1]
- Correcting the same thing twice: by the third try, the context is cluttered with failed approaches, not getting clearer. Fix: clear it and rewrite the prompt with what you learned, instead of correcting again. [2]

**Sources**
1. https://code.claude.com/docs/en/best-practices — Claude Code Docs, common failure patterns: the kitchen sink session mixes unrelated tasks into one context. Fix: /clear between tasks.
2. https://code.claude.com/docs/en/best-practices — Claude Code Docs: if you've corrected Claude more than twice on the same issue in one session, the context is cluttered with failed approaches. Run /clear and start fresh with a more specific prompt that incorporates what you learned.

## 3. Using Claude to Refine Your Prompt

If a prompt isn't landing, asking Claude to improve it is a legitimate move, not a shortcut around doing the work. Anthropic builds this in two ways:

**Generate**: Describe what you're trying to do in plain language, and Claude drafts a first version of the prompt for you.
**Improve**: Hand Claude a prompt you already wrote and ask it to strengthen it, especially useful for a prompt that's underperforming or was written for a different model.

## 4. Rewrite One of Yours

<!-- Pending, logged in REQUIREMENTS.md Batch 7: change the deliverable
     so it's them annotating the prompt itself using the three questions
     below as a tool of inquiry, rather than writing separate reflection
     sentences. Description/questions below are unchanged; only the
     Deliverable line needs to change. -->
> **Exercise: Rewrite a Day 1 Prompt**
> - Time: ~15 minutes.
> - Description: Find a prompt from yesterday that didn't get you what you wanted. Hand it to Claude and ask it to improve the prompt. You can prompt Claude to ask you questions to help it refine your prompt. 
> - As you compare your original to Claude's version, look for the kind of shift this session covered:
>   - Did it replace a vague ask with something more specific?
>   - Did it add a way to check the result, an example, a test case?
>   - Did it drop something that wasn't actually necessary?
> - Deliverable: A sentence or two on what you wanted the original prompt to do, and what Claude improved.
