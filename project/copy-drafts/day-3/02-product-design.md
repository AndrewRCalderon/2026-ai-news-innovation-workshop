# Product Design

> Not AI for AI's sake, but whether its use earns trust.

## 1. The Confident-Wrongness Problem

It's not surprising that AI gets things wrong. Let's ground that in some literature.

In 2025, a CJR x Tow Center study testing eight AI search tools on 1,600 news queries found more than 60% of answers were factually wrong. [1] What's more, ChatGPT miscited 134 articles, but flagged low confidence only 15 times out of 200 answers. [2] The risk is the tool sounding exactly as confident when it's wrong as when it's right.

Your workflow and your output needs to design around that risk, not assume it away. And don't assume demand for AI either. A 2025 Poynter x University of Minnesota study found that nearly half of respondents said they had zero interest in AI chatbots for getting news. [3] This is an oversimplification, but the intuition is worth keeping in mind: your audience has mixed opinions about AI that could affect trust and confidence.

**Sources**
1. https://www.cjr.org/tow_center/we-compared-eight-ai-search-engines-theyre-all-bad-at-citing-news.php — Columbia Journalism Review / Tow Center, March 6 2025: tested 8 AI search tools on 1,600 queries, over 60% of responses factually wrong.
2. https://www.cjr.org/tow_center/we-compared-eight-ai-search-engines-theyre-all-bad-at-citing-news.php — Same study: ChatGPT misidentified 134 articles but flagged low confidence only 15 times out of 200 answers. Grok-3 and Gemini fabricated URLs in over 50% of responses.
3. https://www.poynter.org/ethics-trust/2025/news-audience-feelings-artificial-intelligence-data/ — Poynter / University of Minnesota, April 8 2025, n=1,128: 49% of respondents reported zero interest in AI chatbots for news. Researcher Benjamin Toff: "The data suggests if you build it, do not expect overwhelming demand for it."

## 2. Framing Changes Everything

From a product design perspective, methodology and user experience is everything. And so is storytelling. The same process and product, described two different ways, can get different trust measures.

In 2025, the Reuters Institute found that "human-led, AI-assisted" got 43% comfort, versus 21% comfort for "AI-led, with human oversight," despite describing functionally the same workflow. [1] Same work, same amount of human review, different label, double the comfort. The takeaway is that how you describe and design your tool changes whether people trust it, independent of what it actually does.

Another number from this study worth knowing is that only 33% of people believe journalists actually check AI output before publishing, and that belief tracks closely with trust. [1] Visible verification, not general verification claims, moves that number.

That was in 2025, however. A whole year later...

The same research team found chatbot use for news had risen from 7% to 10% of people globally. [2] And a separate study found people reach for a chatbot mainly to act on the news, look something up, get it summarized, not to feel something about it or have it explained to them. [3] 

So, whatever comfort level you're designing against today is a snapshot, not a fixed target. Expect it to keep moving. Iteration and continued conversation with your audience and your team is the key.

**Sources**
1. https://reutersinstitute.politics.ox.ac.uk/generative-ai-and-news-report-2025-how-people-think-about-ais-role-journalism-and-society — Reuters Institute, Oxford, Oct 7 2025 Generative AI and News Report: human-led-with-AI-assist framing gets 43% comfort vs. 21% for AI-led-with-human-oversight framing, describing the same technical process. Fully AI-generated news gets 12% comfort vs. 62% for fully human. Also: only 33% believe journalists check AI output before publishing; belief in verification correlates strongly with trust (57% among high-trust consumers vs. 19% among distrusters). 77% consume news daily but only 19% report seeing AI labels daily.
2. https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2026/emerging-uses-ai-chatbots-news-and-what-it-means-journalism — Reuters Institute, Digital News Report 2026, "Emerging uses of AI chatbots for news and what it means for journalism," June 16 2026: chatbot use for news rose from 7% to 10% of people globally in a single year.
3. https://cnti.org/reports/chatbots-for-news/ — CNTI, "Action, Ease & Personalization: AI Chatbot News Experiences," Jan 22 2026: people use AI chatbots mainly to act on the news and to understand it, far more than to simply know about it or feel something about it.

## 3. The One Pattern Every Case Study Agrees On

Since trust hangs in the balance, newsrooms are increasingly relying on vetted data and reporting to ground their AI products. The "garbage in, garbage out" principle of data science holds true. The actionable insight is to answer only from what you actually own and trust, and be transparent when you can't and don't.

**SF Chronicle's Chowbot**: Answers draw only from ~1,000 vetted restaurant reviews, never general web knowledge. Outside that scope, it says so instead of guessing. [1]

**Financial Times' Ask FT**: Restricted to FT's own archive, footnoted citations, a stated time range for sources. It still misidentified an ex-candidate as active, a stale-knowledge gap worth planning for explicitly. [2]

**Forbes' Adelaide**: Chief Digital Officer: "We only want to provide our users with our trusted journalism." Launched to 5% of readers first, expanded once the pattern held. [3]

**Rappler's Rai**: Built with "hyper-strict guardrails to prevent outside information from seeping into results," designed to say "I don't know" rather than fabricate. [4]

Scope is the key. The AI use cases that stick to a narrow, well-defined job (subscription FAQs, local election basics) answer reliably. When your tool reaches for a large corpus of data or is meant as a general purpose tool, you increase the likelihood for falsehood and inaccuracy, as some newsrooms have already found. [5]

**Sources**
1. https://www.niemanlab.org/2024/02/san-francisco-chronicle-tries-an-ai-chatbot-er-chowbot-for-food-recs/ — Nieman Lab, Feb 27 2024: Chowbot answers only from ~1,000 vetted Chronicle reviews. Food editor Janelle Bitker: it "accentuates" rather than replaces human expertise. Team documented the hallucination risk publicly rather than overselling accuracy.
2. https://www.niemanlab.org/2024/03/the-financial-times-is-ready-for-its-ai-to-answer-your-questions-well-some-of-them/ — Nieman Lab, March 23 2024: Ask FT restricted to FT's own archive back to 2004, with footnoted citations. Initially misidentified Nikki Haley as an active candidate, a stale-knowledge-vs-live-reporting gap.
3. https://pressgazette.co.uk/publishers/digital-journalism/news-chatbots-generative-ai-forbes-search/ — Press Gazette, Dec 14 2023: Forbes' Adelaide launched in beta to 5% of audience, expanding later. CDO Vadim Supitskiy: "We only want to provide our users with our trusted journalism, right?"
4. https://gijn.org/stories/newsrooms-using-ai-chatbots-leverage-reporting/ — Global Investigative Journalism Network, Aug 2025: Rappler's Rai draws from 400,000+ stories with hyper-strict guardrails against outside information. In July 2025 it stopped including new stories due to a broken pipeline, going stale without anyone noticing.
5. https://www.niemanlab.org/2025/08/local-newsrooms-are-building-ai-chatbots-fast-and-cheap/ — Nieman Lab / UNC CISLM Local NewsBot Studio, Aug 2025: The News Reporter's FAQ bot answered 90%+ of static queries reliably. Chapelboro and Henrico Citizen's archive-search bots hit unsustainable maintenance burden with only 3 full-time journalists; "Chappy" was pulled after accuracy complaints. Development was fast and cheap, initial demo in 1 week, full deployment in 1 month, about $40/month.

## 4. Design for Transparency

In other words, telling people you used AI is an interface decision, and the details of that decision measurably change trust.

In one narrow and controlled study (40 participants), detailed disclosures actually made readers slightly less trusting than a simple one-line label, even though most readers said they preferred the detailed version anyway. [1] This is being described in human-computer interaction and news spaces as the "transparency dilemma." [1]

One recent study, from researchers at Oxford and Stanford, makes the case concretely and expands it to source transparency. [2] Florent Daudens' write-up of the same study is worth reading directly. [3]

The researchers pitted AI-written articles against several human-written pieces on the same event. 93% of the AI article's claims linked directly back to the data or citation behind them, versus 25% for the human-written comparisons. Readers rated it higher on transparency and on how well its claims lined up with its data.

So what are our options? [4]

- **Highlight-for-glancing**: Highlighting key steps in which AI was involved while maintaining a higher level of detail for a thorough inspection if needed. This design allows for a quick visual scan to grasp AI involvement without interrupting the reading flow.
- **Info button**: A brief disclosure with a small interactive element (e.g., an "i" icon) that readers can click or hover over to access detailed disclosure information. Readers choose when they read detailed information (e.g., based on the news type, topic, or their own interest) rather than having it imposed upfront.
- **Outlet-level disclosure**: Transparency at the news organization level ("this outlet uses AI in the following ways...") rather than per-article labels, reducing repetitive disclosure fatigue. Readers can read this statement whenever they need to understand the outlet's AI use policy. This design is also in line with existing work that an outlet's brand reputation matters for trust in AI use.
- **Proportional AI-ratio visualization**: A visual representation, such as a partially colored page (e.g., 30% of the page highlighted for 30% AI contribution) or a percentage bar, showing the proportion of AI involvement. Paired with a brief statement such as "AI was used in the final editorial layer," it helps visualize how thick the AI layer is.
- **Visual trust stamp**: A recognizable seal or badge indicating responsible AI use, analogous to organic food labels or verified account badges.
- **"No AI used" label**: An explicit statement that no AI tools were used, reframing disclosure as a signal that works in both directions.

![Six AI-disclosure patterns mocked up on the same sample article: highlight-for-glancing, info button, outlet-level disclosure, proportional AI-ratio visualization, visual trust stamp, and "no AI used" label](/assets/images/product-design-disclosure-patterns.png)
[Structural note: center this image when implemented in the actual page.]

> **Exercise: Apply This**
> - Time: A few minutes, individually.
> - Description: For your own project: Draft a disclosure plan for AI use and for sourcing. What approach will you experiment with and why?
> - Deliverable: Share your thoughts with the group.

**Sources**
1. https://arxiv.org/abs/2601.09620 — Prajod et al., "Full Disclosure, Less Trust?", arXiv:2601.09620, submitted Jan 14 2026: trust declined specifically with detailed disclosures, not one-line ones, though about 67% of participants preferred detailed disclosure despite the trust cost.
2. https://arxiv.org/abs/2606.11176 — Lin, EI, Shi, Lu, Torr (Oxford), & Zou (Stanford), "Data Journalist Agent: Transforming Data into Verifiable Multimodal Stories," arXiv:2606.11176, June 9 2026: 93% of visible claims in the system's AI-generated articles resolved to a traceable binding between the text and its underlying evidence, versus 25% for a text-only audit of the human-written comparison articles, across 18 paired human/AI articles on the same events.
3. https://fdaudens.substack.com/p/is-ai-better-at-our-jobs-than-us — Florent Daudens, "The half of journalism AI can't do yet," June 23 2026: reporting on the Oxford/Stanford study above; readers rated the AI article higher on transparency and claim-data alignment.
4. https://arxiv.org/html/2606.11116 — Prajod, "Designed by Journalists, but Is It for Readers?", arXiv:2606.11116, June 2026 CHIWORK workshop paper. Six reader-sourced disclosure patterns: detail-on-demand, highlight-for-glancing, proportional visualization, outlet-level transparency, trust badges, and "no AI used" labels. Core insight: readers want agency over when and how deeply they engage with AI-transparency information.
