# State of AI

> We're at the invention phase, not the mature phase. The practices are still being written.

<!-- Content-architecture note: this section's own heading uses first-person-plural ("The Moment We're In"), and the dek repeats "We're at the invention phase" as a field-note bullet too — not a stray sentence, the voice choice is structural here. content-architecture-notes.md flags voice as the single biggest cross-page gap for Day 1; decide the call once (declarative narrator vs. keep this first-person-plural framing) rather than case by case. -->

## 1. The Moment We're In

AI itself isn't new. Machine learning (ML) has quietly shaped things like fraud detection and recommendation engines for over a decade, and artifical intelligence dates back to the beginning of the 20th century. What changed is who gets to use it. Large language models turned something that used to require real technical training into something you open on your laptop or smartphone. It's a foundational sociotechnical change that demands curiosity and skepticism. The tools are real and so is the hype around them.

- AI went from "expert-only" to "something most people have at least tried."
- The tooling is being adopted, in the best case, and forced on people, in the worst case, but it's not in a mature phase. Things are changing every week.
- The rules, best practices, and ethics are still being written.

This mirrors other major shifts in how fast a technology went from novelty to normal:

[Chip strip, maps to `.chip-strip` — a horizontal row of year/label pairs]
1995 Internet access · 2007 Smartphones · 2010 Social platforms · 2022 ChatGPT launch

ChatGPT launched with a free version, and within days AI went from a specialist topic to something millions of people were actually trying.

[Stat callout, maps to `.stat-pull`]
**1M** — Users in 5 days [1]
One of the fastest consumer product launches ever that left one question hanging over everything since: what can I actually do with this?

**Sources**
1. https://x.com/gdb/status/1599683104142430208 — OpenAI co-founders Sam Altman and Greg Brockman both confirmed on X that ChatGPT hit 1 million users five days after its Nov 30, 2022 launch.

## 2. What's Actually Changed

It's worth separating the hype from what's real.

**Changed**
- **Speed of deployment** — prototyping now takes minutes, not months. [1]
- **Accessibility** — no ML background needed, and adoption shows it: about half of U.S. adults now use AI chatbots, up from roughly a quarter in 2023. [2]
- **Capability scale** — reasoning, coding, document analysis, all far beyond what these models could do three years ago. [3]
- **Cost** — cheap enough for students and small newsrooms to experiment. [4]
- **Public conversation** — no longer niche: 95% of U.S. adults have heard of AI, and those who've heard "a lot" nearly doubled in three years. [5]
- **Privacy tooling** — enterprise AI plans now offer training opt-outs and data-retention controls, even if newsroom-grade guarantees are still maturing. [6]

**Caveat**
- AI still hallucinates — confidently wrong, sometimes. [7]
- It isn't "thinking" like humans; it's pattern-matching at scale. [8]
- It can amplify biases already in its training data. [9]
- Best on well-defined tasks, less so open-ended creative work. [10]
- Privacy and data security remain genuinely thorny. [11]
- We don't fully understand why these models work this well. [12]

<!-- Content-architecture note: this section alone carries 12 of this page's 24 citations — one of the two heaviest-cited Day 1 pages (03-use-cases is the other). content-architecture-notes.md flags citation density as a page-type call worth making explicit (explainer pages sourced-heavy, activity pages not) rather than trimming case by case. -->

**Sources**
1. https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/unleashing-developer-productivity-with-generative-ai — Generative AI meaningfully speeds up prototyping — McKinsey measured roughly 10-50% time savings on coding tasks, varying by task complexity.
2. https://www.pewresearch.org/internet/2026/06/17/americans-and-ai-2026-chatbots-smart-devices-and-views-on-impact/ — Pew Research, June 2026: 49% of U.S. adults now use AI chatbots, up from 23% in 2023.
3. https://hai.stanford.edu/ai-index/2025-ai-index-report — Stanford's 2025 AI Index found steep one-year benchmark jumps: real coding-task success (SWE-bench) rose from 4.4% to 71.7%, with similar leaps in graduate-level reasoning and multimodal understanding.
4. https://hai.stanford.edu/ai-index/2025-ai-index-report — Stanford's 2025 AI Index found the cost to query a GPT-3.5-level model fell about 280-fold in 18 months — from $20.00 to $0.07 per million tokens.
5. https://www.pewresearch.org/science/2025/09/17/ai-in-americans-lives-awareness-experiences-and-attitudes/ — Pew Research, Sept 2025: 95% of U.S. adults have heard at least a little about AI; the share who've heard "a lot" rose from 26% (2022) to 47% (2025).
6. https://www.anthropic.com/news/updates-to-our-consumer-terms — Anthropic's 2025 policy update excludes Work/Enterprise/Education/Government and API usage from training entirely, with new opt-in/opt-out controls for consumer plans.
7. https://arxiv.org/abs/2509.04664 — A Sept 2025 OpenAI/Georgia Tech paper argues models hallucinate partly because training rewards confident guessing over admitting uncertainty.
8. https://machinelearning.apple.com/research/illusion-of-thinking — Apple's 2025 "Illusion of Thinking" study found top reasoning models collapse on novel, complex logic puzzles — though the test design itself is debated among researchers.
9. https://arxiv.org/abs/1707.09457 — A foundational 2017 study found models don't just reflect but amplify training-data bias — one gender association went from 33% in the data to 68% in the model's predictions.
10. https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/ — METR, March 2025: AI agents succeed on nearly 100% of short, well-specified tasks but under 10% of tasks that take humans 4+ hours — performance drops sharply as tasks get longer and less defined.
11. https://hai.stanford.edu/assets/files/hai_ai-index-report-2025_chapter3_final.pdf — Stanford's 2025 AI Index recorded a 56% year-over-year rise in AI-related privacy incidents, while public trust in AI companies to protect personal data declined.
12. https://darioamodei.com/post/the-urgency-of-interpretability — Anthropic CEO Dario Amodei has written that even the companies building these models don't yet understand their internal workings well enough to fully explain their behavior.

## 3. Key Moments in Recent History

The path here wasn't sudden. It's the accumulation of decades of technical milestones and academic research — some at universities, some at big tech companies — that finally broke into public view.

1. **2012 · Deep learning renaissance.** A neural network called AlexNet wins a major image-recognition contest by a landmark margin, using far more data and computing power than anyone had tried before. [1] Almost no one outside the field notices at the time — worth sitting with, since it's usually true: the shifts that turn out to matter most rarely look big while they're happening.
2. **2016 · AlphaGo beats Lee Sedol.** Google's AI defeats the world Go champion — far more complex than chess. Mainstream news for the first time, but still entirely specialized.
3. **2018–2020 · BERT, GPT-2, GPT-3.** Language models get genuinely good at understanding and generating text. GPT-3 introduces few-shot learning — the model picks up a new task from just a few examples shown in the prompt, without retraining. [2] Still gated behind research access.
4. **Nov 2022 · ChatGPT launches.** [hinge step] Free, open to anyone with an internet connection. Millions playing with AI within days. Newsrooms begin experimenting: brainstorming, drafting, analyzing data.
5. **2023–2024 · The "Copilot" era.** AI built into everything. The debate shifts from "is this real?" to "how do we use this responsibly?" First lawsuits over training data land — The New York Times sues OpenAI and Microsoft in December 2023, alleging its articles were used to train ChatGPT without permission. [3]
6. **2024–2025 · Agents get hands.** Anthropic's Claude gains the ability to move a cursor, click, and type like a person would. [4] Three months later, OpenAI's Operator becomes the first agent product to break into mainstream tech coverage — an AI that can browse the web and actually complete a task for you, not just describe how. [5] "AI acts on your behalf" stops being theoretical.
7. **2025–2026 · Skills, then Cowork.** Anthropic launches Agent Skills — reusable packages of instructions an AI can load on demand for a specialized task, instead of being taught from scratch every time. [6] Months later, Cowork brings that same autonomous, multi-step work into a normal desktop app — describe an outcome, and Claude reads, edits, and creates files on its own, no coding background required. [7]
8. **2026 · The current moment.** AI embedded in newsrooms with explicit policies. Tone shifts from "AI is coming" to "how do we do this well." Frenetic integration work is underway — people are throwing things at the wall to see what sticks.

**Sources**
1. https://proceedings.neurips.cc/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html — Krizhevsky, Sutskever & Hinton's original NeurIPS 2012 paper introducing AlexNet — it won by 15.3% error vs. 26.2% for the next-best entry, and is widely credited with kicking off the deep-learning boom.
2. https://arxiv.org/abs/2005.14165 — OpenAI's May 2020 GPT-3 paper, which introduced few-shot learning as a capability.
3. https://en.wikipedia.org/wiki/The_New_York_Times_v._Microsoft_and_OpenAI — The New York Times v. Microsoft and OpenAI, filed Dec. 27, 2023 in the Southern District of New York.
4. https://www.anthropic.com/news/developing-computer-use — Anthropic, Oct 22, 2024: "computer use," a research preview letting Claude 3.5 Sonnet operate a computer the way a person does — widely cited as the technical starting gun for the AI-agent wave.
5. https://openai.com/index/introducing-operator/ — OpenAI, Jan 23, 2025: Operator, a general-purpose agent that controls a web browser to book reservations, order groceries, and more.
6. https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills — Anthropic, Oct 16, 2025: "Equipping agents for the real world with Agent Skills."
7. https://techcrunch.com/2026/01/12/anthropics-new-cowork-tool-offers-claude-code-without-the-code/ — TechCrunch, Jan 12, 2026: Anthropic previews Claude Cowork; it left research preview and became generally available April 9, 2026.

## 4. What This Means for Journalists

AI is a tool in your kit now, the way Google Docs or Slack is.

**You Can**
- Draft initial story outlines.
- Analyze large datasets you feed it.
- Brainstorm headlines or angles.
- Explain complex topics so you understand them better.
- Fact-check claims — imperfectly.
- Generate ideas for visual presentation.

**You Should Not**
- Replace reporting — it synthesizes, it doesn't originate.
- Publish AI text unvetted — it's confidently wrong, often.
- Use it without disclosure.
- Assume it's objective — trained on biased human text.

> Not "will AI replace me?" but "what does this let me try that I couldn't before?"

## 5. The Broader Landscape

### Who's Building It

**Tech giants**: OpenAI (ChatGPT, GPT-4), Google (Gemini), Meta (Llama), Anthropic (Claude).
**Specialized**: Hugging Face, Midjourney (images), 11Labs (audio).
**Open-source**: Anyone can download and run some models locally.

"Best" depends on the task — Claude is strong at reasoning and writing, others excel at images or code, and open-source is closing the gap faster than most people expect. The specific names on this list will probably look different in six months. The pattern — new capability arrives, then it takes months for anyone to figure out what to actually do with it — probably won't.

### Who's Using It in Journalism

Different layer entirely — these are newsrooms building on top of the tools above, not building foundation models themselves.

**Large newsrooms**: The New York Times' internal "Echo" [1] tool, The Washington Post's "Ember" [2] writing coach.
**Small newsrooms**: Sahan Journal [3], Outlier Media [4] — same underlying tools as the newsrooms above, at a very different scale.

[Maps to `.stakes`, not `.roster` — a 3-up pull-out layout, not an inline term list]
**For journalism**: Efficiency gains, new storytelling possibilities, and genuinely hard ethical questions, all at once.
**For society**: Labor disruption, misinformation risk, the environmental cost of training, and whose voices get amplified.
**For you**: Understanding this technology is turning into a basic job skill, the same way Google Docs, Slack, and spreadsheets did.

**Sources**
1. https://techcrunch.com/2025/02/17/the-new-york-times-has-greenlit-ai-tools-for-product-and-edit-staff/ — TechCrunch, Feb 2025: an internal beta tool that summarizes articles, suggests headlines, and generates social copy — staff cannot use it to draft or substantially revise articles.
2. https://www.semafor.com/article/12/14/2025/iterate-through-why-the-washington-post-launched-an-error-ridden-ai-product — Semafor, Dec 2025: an AI writing coach for outside op-ed contributors that gives structural feedback on submissions — it doesn't write for them.
3. https://www.niemanlab.org/2025/06/minnesotas-sahan-journal-dives-into-ai-with-strategic-goals-and-open-eyes/ — Nieman Lab, June 2025: a Minnesota nonprofit newsroom that built a custom ChatGPT-based tool to personalize advertiser media kits and uses AI for story summaries and data analysis.
4. https://wdet.org/2024/09/11/outlier-medias-new-sms-service-aims-to-address-information-gaps-in-detroit/ — WDET, Sept 2024: a Detroit newsroom whose AI-assisted SMS service connects thousands of residents weekly to housing and municipal data.
