# State of AI

> AI is in an invention phase, not a mature one. The practices are still being written.

## 1. The Moment

AI itself isn't new. Machine learning (ML) has quietly shaped things like fraud detection and recommendation engines for over a decade, and artificial intelligence dates back to the mid-20th century. What changed is who gets to use it. Large language models turned something that used to require real technical training into something anyone can open on a laptop or phone. It's a foundational sociotechnical shift that demands curiosity and skepticism at once. The tools are real, and so is the hype around them.

- AI went from expert-only to something most people have at least tried.
- Adoption is happening fast, chosen in the best case and forced in the worst, but nothing about it is settled yet. Things are changing every week.
- The rules, best practices, and ethics are still being written.

This mirrors other major shifts in how fast a technology went from novelty to normal:

[Chip strip, maps to `.chip-strip`: a horizontal row of year/label pairs]
1995 Internet access · 2007 Smartphones · 2010 Social platforms · 2022 ChatGPT launch

ChatGPT launched free, and within days AI went from a specialist topic to something millions of people were actually trying.

[Stat callout, maps to `.stat-pull`]
**1M** users in 5 days [1]
One of the fastest consumer product launches ever. It left one question hanging over everything since: what can this actually do for me?

[Maps to `.stakes`, not `.roster`: a 3-up pull-out layout, not an inline term list]
**For journalism**: Efficiency gains, new storytelling possibilities, and genuinely hard ethical questions, all at once.
**For society**: Labor disruption, misinformation risk, the environmental cost of training, and whose voices get amplified.
**For you**: Understanding this technology is turning into a basic job skill.

**Sources**
1. https://x.com/gdb/status/1599683104142430208 — OpenAI co-founders Sam Altman and Greg Brockman both confirmed on X that ChatGPT hit 1 million users five days after its Nov 30, 2022 launch.

## 2. What's Actually Changed

It's worth separating the hype from what's real, matched change for change against its real limit.

**Changed**
- **Speed of deployment**: prototyping now takes minutes, not months. [1]
- **Accessibility**: no ML background needed, and adoption shows it. 49% of U.S. adults now use an AI chatbot, up from just 18% three years ago. [2] Journalists are ahead of that curve: 82% now use AI tools regularly, up from 77% last year. [3]
- **Capability scale**: coding-benchmark performance nearly doubled in a year. SWE-bench Verified went from 60% to close to 100% between the 2025 and 2026 AI Index. [4]
- **Cost**: cheap enough for students and small newsrooms to experiment. Querying a GPT-3.5-level model got about 280 times cheaper in 18 months. [5]
- **Public conversation**: no longer niche. The share of U.S. adults who've heard "a lot" about AI nearly doubled in four years, from 26% to 47%. [6]
- **Privacy tooling**: enterprise AI plans now offer training opt-outs and data-retention controls, plus baked-in security checks while coding. [7]

**Caveat**
- **Still confidently wrong**: AI hallucinates, sometimes with total confidence. [8]
- **Adoption outpaces trust, even among journalists**: 62% of UK journalists see AI as a large threat to journalism; only 15% call it a large opportunity. [9]
- **Benchmarks overstate real-world reliability**: the same 2026-era model that scores 81% on the standard SWE-bench test drops to 46% on a harder, less contamination-prone variant. [10]
- **Bias rides along, amplified**: tested against real labor-market data, current models are 3 to 6 times more likely to assign a stereotypically gendered occupation than actual employment statistics would predict. [11]
- **Awareness hasn't closed the trust gap**: only 20% of people globally trust AI chatbot answers, against 37% who trust the news itself. [12]
- **Even its builders don't fully understand it**: the companies training these models say so themselves. [13]

**Sources**
1. https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/unleashing-developer-productivity-with-generative-ai — Generative AI meaningfully speeds up prototyping. McKinsey measured roughly 10-50% time savings on coding tasks, varying by task complexity.
2. https://www.pewresearch.org/internet/2026/06/17/americans-and-ai-2026-chatbots-smart-devices-and-views-on-impact/ — Pew Research, June 2026 (fielded Feb 2026, n=5,119): 49% of U.S. adults use an AI chatbot, up from 18% in 2023, climbing steadily each year since.
3. https://www.globenewswire.com/news-release/2026/03/19/3259178/0/en/muck-rack-s-2026-state-of-journalism-report-finds-82-of-journalists-use-ai.html — Muck Rack, "The State of Journalism 2026" (March 19, 2026; n=897 journalists, fielded Jan 30-Mar 2, 2026): 82% of journalists use AI tools regularly, up from 77%. ChatGPT leads at 47%, Gemini 22%, Claude 12% (up from 6%).
4. https://hai.stanford.edu/ai-index/2026-ai-index-report — Stanford HAI's 2026 AI Index (April 13, 2026): SWE-bench Verified rose from 60% to near 100% between the 2025 and 2026 editions.
5. https://hai.stanford.edu/ai-index/2025-ai-index-report — Stanford's 2025 AI Index found the cost to query a GPT-3.5-level model fell about 280-fold in 18 months, from $20.00 to $0.07 per million tokens.
6. https://www.pewresearch.org/short-reads/2026/03/12/key-findings-about-how-americans-view-artificial-intelligence/ — Pew Research, March 2026: the share of U.S. adults who've heard "a lot" about AI rose from 26% (2022) to 47% (2025).
7. https://www.anthropic.com/news/updates-to-our-consumer-terms — Anthropic's 2025 policy update excludes Work/Enterprise/Education/Government and API usage from training entirely, with new opt-in/opt-out controls for consumer plans.
8. https://arxiv.org/abs/2509.04664 — A Sept 2025 OpenAI/Georgia Tech paper argues models hallucinate partly because training rewards confident guessing over admitting uncertainty.
9. https://reutersinstitute.politics.ox.ac.uk/ai-adoption-uk-journalists-and-their-newsrooms-surveying-applications-approaches-and-attitudes — Reuters Institute, Nov 27, 2025 (n=1,004 UK journalists): 62% see AI as a large or very large threat to journalism; 15% see it as a large opportunity. 60% are "extremely concerned" about its effect on public trust.
10. https://hai.stanford.edu/ai-index/2026-ai-index-report — Independent benchmark tracking cited alongside Stanford's 2026 AI Index: Claude Opus 4.5 scores 80.9% on the standard SWE-bench Verified but only 45.9% on the harder, less contamination-prone SWE-bench Pro variant.
11. https://arxiv.org/abs/2308.14921 — Kotek, Dockum & Sun, "Gender Bias and Stereotypes in Large Language Models" (2023): tested against real U.S. Bureau of Labor Statistics employment data, four 2023-era LLMs were 3-6 times more likely to select a stereotypically gender-matched occupation than actual employment distributions would predict.
12. https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2026/dnr-executive-summary — Reuters Institute Digital News Report 2026 (June 16, 2026): 20% of people globally trust AI chatbot answers, versus 37% who trust the news itself, a 17-point gap as low as 6% in the UK.
13. https://darioamodei.com/post/the-urgency-of-interpretability — Anthropic CEO Dario Amodei has written that even the companies building these models don't yet understand their internal workings well enough to fully explain their behavior.

## 3. Key Moments in Recent History

The path here wasn't sudden. It's the accumulation of decades of technical milestones and academic research, some at universities, some at big tech companies, some inside newsrooms themselves, that finally broke into public view.

1. **2014 · Newsrooms automate their first beat.** The Associated Press starts using Automated Insights' Wordsmith to write corporate earnings stories, expanding coverage from about 300 companies a quarter to more than 4,700 and freeing an estimated three full-time-equivalent reporters a year for other work. Long before ChatGPT, this is AI quietly doing a real newsroom job. [1]
2. **2012 · Deep learning renaissance.** A neural network called AlexNet wins a major image-recognition contest by a landmark margin, using far more data and computing power than anyone had tried before. [2]
3. **2016 · AlphaGo beats Lee Sedol.** Google's AI defeats the world Go champion at a game far more probabilistically complex than chess, in a match watched by over 200 million people. [3]
4. **2018-2020 · BERT, GPT-2, GPT-3.** Language models get genuinely good at understanding and generating text. GPT-3 introduces few-shot learning: the model picks up a new task from just a few examples shown in the prompt, without retraining. [4] Still gated behind research access.
5. **Nov 2022 · ChatGPT launches.** [hinge step] Free, open to anyone with an internet connection. Millions try AI within days. Newsrooms begin experimenting: brainstorming, drafting, analyzing data.
6. **Dec 2023 · The first major AI copyright suit lands.** The New York Times sues OpenAI and Microsoft, alleging its articles were used to train ChatGPT without permission and seeking billions in damages. [5]
7. **2024-2025 · Agents get hands.** Anthropic's Claude gains the ability to move a cursor, click, and type. [6] Three months later, OpenAI's Operator becomes the first agent product that can browse the web and complete a task on its own. [7] AI acting on your behalf stops being theoretical.
8. **2025-2026 · Skills, then Cowork.** Anthropic launches Agent Skills as reusable packages of instructions AI can load on demand for a specialized task, instead of being taught from scratch every time. [8] Months later, Cowork brings that same autonomous, multi-step work into a normal desktop app: describe an outcome, and Claude reads, edits, and creates files on its own, no coding background required. [9]
9. **2026 · The current moment.** Cowork expands to web and mobile, and most people using it aren't coding at all. [10] Anthropic, OpenAI, and Google all ship major model updates within weeks of each other. [11] In newsrooms specifically: 82% of journalists now use AI tools regularly [12], and more than 2,300 US and UK newsroom jobs were cut in the first half of 2026 alone, about a third faster than all of 2025 combined. Automation is cited explicitly at some outlets; at others it's tangled up with a longer industry decline. [13]

**Sources**
1. https://www.poynter.org/reporting-editing/2015/robot-writing-increased-aps-earnings-stories-by-tenfold/ — Poynter, 2015: AP's Automated Insights partnership expanded earnings-story coverage from about 300 to about 4,700 companies a quarter, freeing an estimated three full-time-equivalent reporters annually.
2. https://proceedings.neurips.cc/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html — Krizhevsky, Sutskever & Hinton's original NeurIPS 2012 paper introducing AlexNet. It won by 15.3% error versus 26.2% for the next-best entry, and is widely credited with kicking off the deep-learning boom.
3. https://deepmind.google/research/alphago/ — DeepMind: AlphaGo's 4-1 victory over Lee Sedol in Seoul, March 2016, was watched by over 200 million people worldwide.
4. https://arxiv.org/abs/2005.14165 — OpenAI's May 2020 GPT-3 paper, which introduced few-shot learning as a capability.
5. https://www.cnbc.com/2023/12/27/new-york-times-sues-microsoft-chatgpt-maker-openai-over-copyright-infringement.html — CNBC, Dec 27, 2023: The New York Times sued OpenAI and Microsoft in the Southern District of New York (case No. 1:23-cv-11195), alleging verbatim reproduction of its journalism and seeking billions in damages.
6. https://www.anthropic.com/news/developing-computer-use — Anthropic, Oct 22, 2024: "computer use," a research preview letting Claude 3.5 Sonnet operate a computer the way a person does, widely cited as the technical starting gun for the AI-agent wave.
7. https://openai.com/index/introducing-operator/ — OpenAI, Jan 23, 2025: Operator, a general-purpose agent that controls a web browser to book reservations, order groceries, and more.
8. https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills — Anthropic, Oct 16, 2025: "Equipping agents for the real world with Agent Skills."
9. https://techcrunch.com/2026/01/12/anthropics-new-cowork-tool-offers-claude-code-without-the-code/ — TechCrunch, Jan 12, 2026: Anthropic previews Claude Cowork; it left research preview and became generally available April 9, 2026.
10. https://techcrunch.com/2026/07/07/the-coding-agent-wars-are-spilling-into-the-rest-of-the-office-claude-cowork/ — TechCrunch, July 7, 2026: Cowork expands to web and mobile; most users aren't coding with it.
11. https://www.anthropic.com/news/claude-opus-5 — Anthropic, July 24, 2026: Claude Opus 5 launches, near-frontier performance at half the price of Opus 4.8, part of a dense mid-2026 release window that also included GPT-5.6 and updated Gemini models.
12. https://www.globenewswire.com/news-release/2026/03/19/3259178/0/en/muck-rack-s-2026-state-of-journalism-report-finds-82-of-journalists-use-ai.html — Muck Rack, "The State of Journalism 2026" (March 19, 2026).
13. https://mediacopilot.ai/journalisms-workforce-shrinks-as-ai-and-new-consumer-habits-reshape-the-industry/ — MediaCopilot tracker: 2,300+ US/UK newsroom jobs cut in H1 2026, roughly 34% ahead of 2025's full-year pace. A Columbia journalism-school analysis found AI so far "aids news workers rather than replaces them," with cuts also tangled up with referral-traffic collapse and a longer-run industry decline.

## 4. Who's Building It

**Tech giants**: OpenAI (ChatGPT, GPT-4/5), Google (Gemini), Meta (Llama), Anthropic (Claude). By app market share, ChatGPT led at 46.4% as of May 2026, down from over 50% at the start of the year, its first drop below half since launch. Gemini held 27.7%, Claude 10.3%. [1] Among paying businesses, Anthropic passed OpenAI for the first time in April 2026 and kept extending the lead: 43.5% of U.S. businesses paid for Anthropic subscriptions or tokens by July 2026, versus 39.7% for OpenAI, a fast reversal from a year earlier when Anthropic's share was roughly a quarter of OpenAI's. [2]
**Specialized**: Hugging Face (2 million-plus public models, 500,000-plus datasets, 13 million users as of spring 2026) [3], Midjourney (images), ElevenLabs (audio, valued at $11 billion as of a February 2026 raise) [4].
**Open-source**: Anyone can download and run some models locally, and the performance gap to closed frontier models is narrowing fast. On one independent benchmark, the best open-weight models trailed the leading proprietary model by about 13 points in early 2025; by April 2026 that gap had closed to about 6 points, though open models still lag noticeably on the hardest reasoning tests and on hallucination measures specifically. [5]

"Best" depends on the task, and not just as a hedge: an independent benchmark tracking multiple labs found no single leader in April 2026, with OpenAI, Google, and Anthropic's top models scoring within a few points of each other and the lead changing hands repeatedly through the year. [6] The specific names on this list will probably look different in six months.

**Sources**
1. https://techcrunch.com/2026/06/16/chatgpts-market-share-slips-below-50-for-first-time/ — TechCrunch, June 16, 2026, citing Sensor Tower's State of AI Report: ChatGPT held 46.4% of the global AI-assistant app market in May 2026, down from over 50% in January; Gemini 27.7%, Claude 10.3%.
2. https://ramp.com/data/ai-index-august-2026 — Ramp AI Index, August 2026: Anthropic passed OpenAI on U.S. business spend share in April 2026 and extended its lead to 43.5% versus 39.7% by July 2026.
3. https://huggingface.co/blog/huggingface/state-of-os-hf-spring-2026 — Hugging Face's Spring 2026 state-of-open-source report: over 2 million public models, 500,000-plus datasets, 13 million users.
4. https://techcrunch.com/2026/02/04/elevenlabs-raises-500m-from-sequioia-at-a-11-billion-valuation/ — TechCrunch, Feb 4, 2026: ElevenLabs raised $500 million from Sequoia at an $11 billion valuation.
5. https://artificialanalysis.ai/articles/recent-open-weights-model-launches — Artificial Analysis, April 30, 2026: the best open-weight models (Kimi K2.6, MiMo V2.5 Pro) scored 54 on its Intelligence Index versus 60 for the leading proprietary model, a 6-point gap, down from roughly 13 points a year earlier; open models still trail by 8-11 points on Humanity's Last Exam and score negative on hallucination measures where proprietary leaders score positive.
6. https://artificialanalysis.ai/ — Artificial Analysis Intelligence Index, April 30, 2026 snapshot: OpenAI's GPT-5.5 scored 60, Google's Gemini 3.1 Pro Preview and Anthropic's Claude Opus 4.7 tied at 57, with leadership changing hands multiple times across 2026.

## 5. What This Means for Journalists

AI is a tool in your kit now, the way Google Docs or Slack is.

**You Can**
- Draft initial story outlines.
- Analyze large datasets you feed it.
- Brainstorm headlines or angles. In one controlled test, AI-generated ideas beat human ones on a real measure of quality: a 47% predicted-purchase rate for AI-generated product ideas versus 40% for a comparison group of MBA students, and 35 of the top 40 rated ideas were AI-generated. It also produced 200 ideas in about 15 minutes. [1]
- Explain complex topics so you understand them better.
- Fact-check claims, imperfectly and unevenly. One study found an AI fact-checker correctly flagged false headlines 90% of the time, but correctly confirmed true headlines only 15% of the time, marking most of them "unsure" instead. Worse, when it wrongly flagged a true headline as false, people's belief in that headline dropped more than when a human corrected them the same way, meaning a bad AI fact-check can do more damage than a bad human one. [2]
- Generate ideas for visual presentation.

**You Should Be Wary**
- Replacing reporting: it synthesizes rather than originates.
- Publishing AI outputs unvetted. It's confidently wrong, often.
- Using it without guardrails or disclosure.
- Assuming it's unbiased, or that you won't bias it. This isn't hypothetical: in a study of over 1,500 people, those who wrote with an AI assistant nudged toward one side of a debate were about twice as likely to adopt that position themselves, and most didn't notice it happening. [3]

> Reframe: not "what can AI do for me?" but "what does this let me try that I couldn't before?"

**Sources**
1. https://mackinstitute.wharton.upenn.edu/2023/new-working-paper-finds-chatgpt-a-better-innovation-ideator-than-mba-students/ — Wharton/Mack Institute working paper, Sept 2023: ChatGPT-generated product ideas had a 47% predicted-purchase rate versus 40% for Wharton MBA students; 35 of the top 40 rated ideas were AI-generated, produced in about 15 minutes.
2. https://arxiv.org/html/2308.10800v4 — DeVerna, Yan, Yang & Menczer, PNAS/arXiv, 2024 (Indiana University Observatory on Social Media, n=2,159): ChatGPT-3.5 correctly labeled true headlines only 15% of the time (marking 65% "unsure") and correctly flagged false headlines 90% of the time; a wrongly-flagged true headline lost 12.75 points of believed accuracy, versus an 18.06-point discernment gain from an equivalent human correction.
3. https://arxiv.org/abs/2302.00560 — Jakesch, Bhat, Buschek, Zalmanson & Naaman, CHI 2023 (Cornell, n>1,500): people who co-wrote with an AI assistant opinionated toward one side of a debate were about twice as likely to write in agreement with it and later report holding that opinion, and most didn't notice the influence.
