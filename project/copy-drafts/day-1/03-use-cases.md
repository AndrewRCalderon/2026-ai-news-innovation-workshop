# Use Cases

> Not everything is a good AI problem. Knowing which is the real skill.

<!-- Content-architecture note: heaviest-cited Day 1 page (25 citations) and zero workshop-specific grounding language — reads fully generic/theoretical throughout, per content-architecture-notes.md. §6 below also has a bare question list with no sub-heading. -->

## 1. What Does AI Actually Do?

It's easy to get lost in abstractions. These are real, deployed use cases, not theoretical ones. Understanding what AI can actually do, and what it can't, is the difference between smart experimentation and wasting time.

## 2. Use Cases in Journalism

**Data journalism**: The NYT's internal tool, Cheatsheet, analyzed 10,000 names from a Puerto Rico tax-incentive registry and rated each for investigative interest — a reporter's "I can't Google 10,000 people, but a machine can." It later processed 500 hours of leaked Zoom audio (~5M words), turning an unmanageable dataset into a story before Election Day. Catch: you still verify everything yourself. [1]
**Coverage auditing**: THE CITY asked ChatGPT to map four years of stories by NYC neighborhood — confirming they covered underserved areas more than they realized, while surfacing real gaps. Catch: AI misreads location and context; verify. [2]
**Headline ideation**: Feed a draft or topic to Claude, ask for ten angles, pick the strongest. Hearst's regional dailies built a Slack bot doing exactly this at scale, with human review required before anything ships. Catch: AI headlines skew clichéd — it's a brainstorming partner, not a final product. [3]
**Accessibility**: "Explain this so a high schooler would understand," then iterate. A two-person team at Persian-language newsroom Zamaneh Media used this approach to cut translation time from days to under an hour. Catch: guarantees clarity, not accuracy — you still need subject-matter expertise to fact-check. [4]
**Local government monitoring**: iTromsø, a 20-person Norwegian newsroom, built an AI tool that scans 12,000+ municipal documents a month and flags newsworthy ones — cutting daily document research from hours to about 10 minutes, now used across 35 papers. Catch: still needs a reporter's judgment on what's actually a story. [5]
**Automated claim-spotting**: Argentine fact-checker Chequeado's Chequeabot scans dozens of outlets and speeches in real time to flag checkable claims — by the organization's own account, roughly half of certain fact-checks now start there, a share that's grown since the tool launched in 2016 as it's expanded to cover podcasts and dozens of channels. Catch: it flags candidates; a human still has to verify each one, and Chequeado's own AI-use policy requires that review. [6]
**Automated local content**: Swedish publisher MittMedia uses automation to turn structured data into thousands of local real-estate and sports stories a year that reporters couldn't otherwise cover — 61,800 articles in one year at one network. Catch: only works where the underlying data is clean and structured. [7]
**Records & FOIA analysis**: DocumentCloud's free AI add-ons let any newsroom — no coding required — summarize and search large public-records dumps. Catch: built for small newsrooms without engineering staff, so it's only as good as the documents you feed it. [8]
**No-code automation**: Probably the most common entry point at small newsrooms, even if it's the least flashy: Simon Galperin (also profiled in [People to Follow](/day-1/people-to-follow.html#s2)) ran an earlier local-news project on Zapier alone — indexing 200+ local sources into one feed, auto-drafting posts from press releases, and pushing them to a newsletter and social. In his words: "This news product wouldn't exist in its present form without Zapier." Catch: it's automation, not intelligence — it still needs someone to design the workflow and catch when a source changes format. [9]

**Sources**
1. https://wan-ifra.org/2025/05/divining-data-how-ai-invigorates-the-new-york-times-approach-to-investigative-reporting/ — NYT's "Cheatsheet" tool rated 10,000 Puerto Rico tax-registry names for investigative interest and used semantic search to process 500 hours of leaked Zoom audio.
2. https://www.thecityreporter.nyc/2024/02/29/chatgpt-map-stories-nyc/ — THE CITY used ChatGPT to geolocate and map over four years of its own stories by NYC neighborhood, confirming broad coverage while surfacing real gaps.
3. https://www.journalists.org/news/case-study-how-hearst-newspapers-built-an-ai-powered-slack-based-tool-to-help-with-digital-content — Hearst's regional papers (San Francisco Chronicle, Houston Chronicle, and others) built a Slack bot suggesting AI-generated headlines and SEO titles for human editors to review.
4. https://www.journalists.org/news/case-study-transforming-workflows-with-ai-at-zamaneh-media — A two-person team at Persian-language exile newsroom Zamaneh Media built AI tools that cut article translation time from days to under an hour.
5. https://www.journalists.org/news/case-study-djinn-an-ai-powered-data-journalism-interface — iTromsø's "Djinn" tool monitors municipal records and cut journalists' daily document-research time from hours to minutes; now used across 35 Polaris Media papers.
6. https://chequeado.com/politica-de-uso-de-ia-en-chequeado/ — Chequeado's Sept 2025 AI-use policy lists Chequeabot among its current production tools and requires human review of all AI-assisted output; a May 2024 Chequeado piece confirms Chequeabot "remains part of Chequeado's technology infrastructure" while the org also experiments with newer models.
7. https://pressgazette.co.uk/publishing-services-content/robot-journalism-sweden-united-robots/ — Swedish regional publisher MittMedia uses automation company United Robots to generate thousands of local stories a year from structured data.
8. https://www.muckrock.com/news/archives/2024/mar/27/automating-your-beat-with-doccloud/ — Nonprofit tool DocumentCloud lets any newsroom use AI, with no coding required, to summarize and search large FOIA document dumps.
9. https://rjionline.org/news/the-bloomfield-info-project-an-automation-case-study/ — Reynolds Journalism Institute, Dec 28, 2022: Simon Galperin's Bloomfield Information Project used Zapier ($130/mo) to index 200+ local sources and auto-publish to WordPress, Mailchimp, and social.

## 3. Use Cases Outside Journalism

Not journalism-specific — most of these originated elsewhere — but a few of them actually show up on the business side of most newsrooms too, not just outside them:

**Customer service**: A chatbot handles "why was this retracted?" and "how do I subscribe?" so people can focus on real complaints. This is exactly what handles subscriber support at most newsrooms, not just other industries. Catch: confidently wrong answers need human oversight. [1]
**Content moderation**: Flags spam and off-topic comments for human review at scale — the same tooling most newsroom comment sections run on. Catch: reflects training-data bias; can unfairly suppress voices without a human check. [2]
**Search & recommendation**: Understands intent, not just keywords; suggests relevant follow-up reading. Catch: can create filter bubbles if not designed carefully. [3]
**Video & audio**: Transcribes interviews, extracts quotes, generates captions automatically. Catch: accuracy drops with accents, noise, and jargon — proofread transcripts. [4]
**Sentiment analysis**: Flags where anger or concern concentrates across thousands of comments. Catch: misreads sarcasm and irony — "great job on that terrible decision" can read as positive. [5]
**Scientific research**: Google DeepMind's AlphaFold predicts a protein's 3D structure from its sequence, solving a 50-year "grand challenge" in biology. Catch: predictions are computational hypotheses that still need lab verification. [6]
**Legal**: Harvey AI now supports 142,000+ legal professionals across 1,500+ organizations, including roughly half of the Am Law 100 — used for contract review and, closest to journalism's own work, discovery: parsing massive document dumps for what actually matters. One firm, Lynn Pinker Hurst & Schwegmann, says it saves 8+ hours per lawyer per week using it for early case assessment across hundreds of files. Catch: still requires a lawyer to verify what it surfaces — same as any AI-assisted document review. [7]
**Finance**: Mastercard's Decision Intelligence Pro scans roughly a trillion data points to flag fraudulent transactions in under 50 milliseconds, improving detection rates 20% on average — up to 300% in some cases. Catch: a high false-positive rate means real transactions get blocked too; it's a filter, not a final judge. [8]
**Healthcare**: IDx-DR became the first FDA-authorized autonomous AI diagnostic tool, screening for diabetic eye disease without a specialist reading the image. Catch: works only within a narrow, validated task — it defers ambiguous cases rather than guessing. [9]
**Software & coding**: A study testing GitHub Copilot on security-relevant coding tasks found about 40% of its suggested code contained exploitable vulnerabilities. Catch: AI coding assistants reproduce the flaws present in their training data. [10]
**Accessibility (outside journalism)**: Be My Eyes' "Be My AI," powered by GPT-4 with vision, describes photographed scenes for blind and low-vision users. Catch: documented hallucinations — confidently describing objects or text that aren't actually there. [11]

**Sources**
1. https://www.zendesk.com/blog/ai/chatbots/ai-chatbot-use-cases/ — Zendesk documents how AI chatbots handle routine requests and escalate to humans with full context when needed.
2. https://aclanthology.org/P19-1163/ — A peer-reviewed study found tweets in African American English were up to twice as likely to be mislabeled as offensive by automated moderation systems.
3. https://en.wikipedia.org/wiki/Filter_bubble — The "filter bubble" concept, coined by Eli Pariser in 2011, describes how personalized algorithms can narrow the information people see.
4. https://www.pnas.org/doi/10.1073/pnas.1915768117 — A study found leading speech-recognition systems had nearly double the error rate for Black speakers compared to white speakers.
5. https://www.brandwatch.com/social-media-glossary/sentiment-analysis/ — Brandwatch's glossary notes that sarcasm, irony, and cultural context remain difficult for sentiment-analysis algorithms to interpret.
6. https://deepmind.google/blog/alphafold-a-solution-to-a-50-year-old-grand-challenge-in-biology/ — DeepMind's AlphaFold predicts protein 3D structure with near-experimental accuracy, though its predictions still require lab verification.
7. https://en.wikipedia.org/wiki/Harvey_(software) — Harvey AI: legal-AI platform valued at $11B as of March 2026, used by 142,000+ legal professionals at 1,500+ organizations including roughly half the Am Law 100.
8. https://www.cnbc.com/2024/02/01/mastercard-launches-gpt-like-ai-model-to-help-banks-detect-fraud.html — CNBC, Feb 1, 2024: Mastercard's Decision Intelligence Pro model scans about one trillion data points, improving fraud-detection rates by an average of 20% (up to 300% in some cases) in under 50 milliseconds per transaction.
9. https://engineering.uiowa.edu/news-all/2018/04/fda-permits-marketing-idx-dr-automated-detection-diabetic-retinopathy-primary-care — IDx-DR was the first FDA-authorized autonomous AI diagnostic device, screening for diabetic eye disease in primary care without a specialist.
10. https://arxiv.org/abs/2108.09293 — A study found about 40% of GitHub Copilot's suggested code across security-relevant scenarios contained exploitable vulnerabilities.
11. https://techcrunch.com/2023/09/26/openais-gpt-4-with-vision-still-has-flaws-paper-reveals/ — Be My Eyes' "Be My AI" describes photographed scenes for blind and low-vision users, but researchers documented hallucinations in its descriptions.

## 4. Not a Good Use Case (Yet)

- **Investigative reporting** — AI can't call a source, dig through an archive with judgment, earn a whistleblower's trust, or read between the lines of what someone isn't saying — the parts that actually make it investigative. It can help with pieces of the process (see Data Journalism and Records & FOIA Analysis above); it just can't do the whole thing.
- **Original breaking news** — it synthesizes existing information; by the time it "knows" a story, the news is already public.
- **Opinion requiring deep expertise** — AI can draft structure, but not credibility or unique perspective.
- **Stories requiring human experience** — homelessness, racial justice: the reporting itself is human work.
- **Real-time verification** — training data has a cutoff, but that's a workflow problem, not a hard wall: point it at live search or a real-time feed and it can work with current information. What it still can't do is verify a live source itself, or tell you something is true just because it's recent.

## 5. The Pattern

Where AI actually works, and where it doesn't:

**Works When**
- The task is repetitive and structured.
- Input data is high-quality.
- It's finding needles in haystacks — pattern recognition, lead generation, surfacing what a human would miss at scale.
- You need an "at least this many" count, not an exhaustive one — finding as many examples as you can, not every single one.
- It augments human work, not replaces it.
- You can verify the output yourself.
- Mistakes are tolerable.

**Doesn't Work When**
- The task needs original reporting or investigation.
- Accuracy is non-negotiable.
- It needs to replace human judgment.
- Context and nuance are everything.
- Readers need to trust a human made the call.
- It requires real-world experience you haven't had.

## 6. The Practical Question

<!-- Content-architecture note: bare question list below, no sub-heading — flagged pattern from content-architecture-notes.md. -->

Before reaching for AI, ask yourself:

- Does this need original judgment *every single time* — or can I design the process so judgment only happens on a smaller, surfaced set? [1]
- Is my input data trustworthy and high-quality? [2]
- Can I actually verify the output myself before it goes out? [3]
- Would a mistake here be tolerable, or costly to my credibility? [4]
- Am I augmenting my own work, or trying to replace judgment I should be exercising myself? [5]
- Does this depend on real-time information, or a relationship/trust only a human can provide?

[Structural note: page also links out to "See more frameworks like this →" at /resources/ai-decision-frameworks.html]

> Knowing which problems are AI problems and which aren't — that's how you use this tool without letting it do the work that needs human judgment.

**Sources**
1. https://developers.google.com/machine-learning/guides/rules-of-ml — Google's internal ML engineering playbook, publicly published — advises against reaching for machine learning until a simpler approach has proven insufficient.
2. https://developers.google.com/machine-learning/problem-framing/problem — Google's own criteria for judging whether the data behind an ML/AI system is good enough to trust: reliable, correct, representative, and from a trusted source.
3. https://www.poynter.org/ethics-trust/2023/new-ap-stylebook-guidelines-artificial-intelligence-chatgpt/ — AP's newsroom policy treats all generative AI output as unvetted source material — journalists must apply normal sourcing standards before using it.
4. https://trustingnews.org/trustkits/ai/ — Trusting News' audience research found AI use disclosure measurably reduces reader trust — the credibility stakes of an AI mistake are real, not hypothetical.
5. https://page.ideo.com/download-ai-ethics-cards — IDEO's AI Ethics Cards, a design-practice tool for evaluating AI use: "Just because AI can do something doesn't mean that it should."
