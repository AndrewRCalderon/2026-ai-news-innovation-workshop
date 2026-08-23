# Industry Conversation

> The conversation about AI isn't happening in one place. It's countless conversations, large and small, happening at once.

## 1. What Everyone's Talking About

AI's role in journalism is polyvalent. Some newsrooms are all-in; others are skeptical; others want to jump in and don't know where to start. In tech, the conversation is dizzying: some technologists think they're building artificial general intelligence that will dominate the planet, others think the field is overhyped and about to plateau. On the ethics side, some argue AI will amplify inequality; others argue it's a democratizing tool.

> **Exercise: Before You Look**
>
> - Description: Where do you think people actually disagree about AI's role in journalism? Name a few before reading further, then compare your list against the ones below.

Here's the list that tends to come up in this conversation:

- **Progress vs. caution**: move fast and experiment, or slow down and get it right. In July 2025, xAI released Grok 4 without publishing a safety report, a document every other frontier lab had published for major releases since a 2023 industry commitment xAI itself had joined. An Anthropic researcher publicly called the omission "reckless." [1]
- **Accessibility vs. concentration**: is AI democratizing, or does it concentrate power in whoever can afford the best models? Both are true at once. The five most resource-rich labs held under half of global AI compute at the end of 2025 [2], and open-weight models are closing the capability gap fast (see State of AI). At the same time, token prices have fallen roughly 300-fold since GPT-4's 2023 launch, and Hugging Face now hosts over 2 million open models. [3]
- **Efficiency vs. job displacement**: more productive workers, or fewer jobs. Klarna's AI customer-service assistant did the work of 700 people in its first month in 2024, cutting resolution time from 11 minutes to 2. By 2025, the company was quietly rehiring humans after quality dropped on harder cases; its CEO put it bluntly: "We focused too much on efficiency and cost. The result was lower quality, and that's not sustainable." [4]
- **Accuracy vs. speed**: can reporting get faster without sacrificing truth? One measured study found AI-labeled news articles were 8.2 times more likely to contain a fabricated claim, an invented quote, wrong statistic, or misdated event, than human-written ones: 41% versus 5%. [5]
- **Adoption vs. readiness**: AI is already inside most newsrooms, but the training and trust haven't caught up. Most publishers offer no formal AI training at all, and cultural resistance is the single most common barrier newsroom leaders name. [6]

**Sources**
1. https://fortune.com/2025/07/17/elon-musk-xai-grok-4-no-safety-report — Fortune, July 17, 2025: xAI released Grok 4 without a public safety report, breaking from a July 2023 industry disclosure commitment it had joined in May 2024; Anthropic researcher Samuel Marks called the omission "reckless" and a break from "industry best practices."
2. https://epoch.ai/gradient-updates/frontier-labs-dont-use-most-ai-compute — Epoch AI, May 20, 2026: as of end-2025, the five most resource-rich AI developers (OpenAI, Anthropic, xAI, Google, Meta) together held under half of global operational AI compute, with OpenAI alone accounting for roughly 10-15%.
3. https://www.deeplearning.ai/the-batch/falling-llm-token-prices-and-what-they-mean-for-ai-companies — DeepLearning.AI, The Batch: token prices fell roughly 300-fold since GPT-4 launched at $30 per million tokens in March 2023. Also: https://huggingface.co/blog/huggingface/state-of-os-hf-spring-2026 — Hugging Face's Spring 2026 report counts over 2 million public models.
4. https://www.forbes.com/sites/jackkelly/2024/03/04/klarnas-ai-assistant-is-doing-the-job-of-700-workers-company-says/ — Forbes, March 4, 2024: Klarna's OpenAI-built assistant did the work of 700 full-time agents, handling 2.3 million conversations in its first month and cutting resolution time from 11 to 2 minutes. Also: https://www.forbes.com/sites/quickerbettertech/2025/05/18/business-tech-news-klarna-reverses-on-ai-says-customers-like-talking-to-people/ — Forbes, May 18, 2025: CEO Sebastian Siemiatkowski said Klarna was rehiring humans after AI-driven quality problems on complex cases; Klarna later disputed the framing.
5. https://arxiv.org/html/2510.18774v4 — Russell, Karpinska & Iyyer (University of Maryland/Pangram Labs), rev. April 26, 2026: manually reviewing 100 AI-labeled and 100 human-written news articles, AI-labeled articles were 8.2 times more likely to contain a hallucination (41% versus 5%, Fisher's exact test p=2.3×10⁻⁹).
6. https://pressgazette.co.uk/publishing-services-content/cultural-resistance-hampers-use-of-ai-in-newsrooms-new-global-survey-finds/ — FT Strategies/WAN-IFRA "Future Newsrooms Study 2026" (July 20, 2026; 448 newsroom leaders, 86 countries): 61% offer no formal AI training, 52% cite cultural resistance or skepticism as a barrier, and 43% anticipate staffing cuts within three years despite adoption.

## 2. The Scaling Debate

One specific, narrower argument is worth knowing on its own, separate from the broader debate below: does today's approach of more data and more compute keep producing better models, or is it running out of room? The people actually building these systems don't agree.

**Ilya Sutskever**, an OpenAI co-founder now running Safe Superintelligence Inc., argues the "age of scaling" that defined 2020-2025 is ending. Pretrained models, he says, "generalize dramatically worse than people," and he expects the next gains to come from a return to research, not from bigger training runs. [1]

**Dario Amodei**, Anthropic's CEO, disagrees. He's held the same view since 2017, that intelligence is fundamentally a matter of scale, and he now sees the same pattern showing up in reinforcement learning that once showed up in pretraining. In his words, scaling "has not hit a wall at all." [2]

**Yann LeCun**, who left Meta to found AMI Labs, thinks both of them are missing the point. He calls large language models a "detour," architecturally incapable of real understanding no matter how much they scale, and predicts they'll be largely obsolete within five years. He raised over $1 billion in 2026 to build something else entirely. [3]

**Gary Marcus**, a longtime AI critic, has argued for years that scaling laws are "empirical generalizations, not physical laws" that eventually plateau, and that using more compute at inference time is an expensive patch, not a fix. [4]

The honest summary: the argument has shifted from "does scaling work" to "which kind of scaling," pretraining versus inference-time compute, and even the researchers who think pretraining has plateaued don't think progress overall has.

Where there's less disagreement is what's already happening to jobs. Software development is the clearest, most measurable case of AI-linked hiring disruption so far: early-career workers in AI-exposed roles are measurably below expected employment since ChatGPT's launch. [5] Journalism is being hit too, newsrooms cut more than 2,300 jobs in the first half of 2026 alone, but unlike coding, that decline is tangled up with a referral-traffic collapse and a newsroom-employment slide that predates AI by over a decade, which makes AI's specific role harder to isolate. [6]

**Sources**
1. https://www.dwarkesh.com/p/ilya-sutskever-2 — Dwarkesh Podcast, Nov 25, 2025: Ilya Sutskever argues the "age of scaling" is ending, and that pretrained models "generalize dramatically worse than people."
2. https://www.dwarkesh.com/p/dario-amodei-2 — Dwarkesh Podcast, Feb 13, 2026: Dario Amodei says scaling "has not hit a wall at all," and reports seeing the same log-linear scaling pattern now in reinforcement learning that pretraining showed earlier.
3. https://www.bloomberg.com/news/videos/2026-05-21/the-next-phase-of-artificial-intelligence — Bloomberg, May 21, 2026: Yann LeCun calls LLMs a "detour" and predicts they'll be largely obsolete within five years; he raised $1.03B in March 2026 to build AMI Labs around a different architecture.
4. https://garymarcus.substack.com/p/a-new-ai-scaling-law-shell-game — Gary Marcus, Substack, Nov 24, 2024: argues scaling laws are "empirical generalizations, not physical laws," and that inference-time compute is an expensive patch rather than a fix.
5. https://digitaleconomy.stanford.edu/publication/canaries-in-the-coal-mine-six-facts-about-the-recent-employment-effects-of-artificial-intelligence/ — Stanford Digital Economy Lab, updated Aug 12, 2026: early-career workers (22-25) in AI-exposed occupations are 19% below expected employment, with software development among the most exposed, concentrated in reduced hiring rather than layoffs.
6. https://mediacopilot.ai/journalisms-workforce-shrinks-as-ai-and-new-consumer-habits-reshape-the-industry/ — MediaCopilot tracker: 2,300+ US/UK newsroom job cuts in H1 2026. A Columbia journalism-school analysis found AI so far "aids news workers rather than replaces them," with cuts also tangled up with referral-traffic collapse and newsroom employment down more than 50% since 2008.

## 3. Where Journalism Splits

The scaling debate above is about the technology in the abstract. This is about what's actually happened when newsrooms used AI in production, not what might happen.

**When it went wrong**
- **Sports Illustrated, Nov 2023.** Its publisher ran product reviews under fabricated bylines, complete with AI-generated headshots. The parent company fired its CEO and three other executives within weeks. [1]
- **CNET, Jan 2023.** Quietly ran 77 AI-written financial explainers; more than half needed correction once errors surfaced, and CNET paused the program. [2]
- **Gannett, Aug 2023.** An AI tool published high school sports recaps with unresolved placeholder text and wrong scores. Public mockery forced the chain to pause it. [3]
- **Chicago Sun-Times, May 2025.** A syndicated summer reading list recommended 15 books; 10 didn't exist. A freelancer had used AI without disclosing it. [4]
- **Tagesspiegel, Germany, 2026.** A former editor-in-chief's AI-drafted opinion columns contained fabricated quotes and false claims. The paper pulled them and reviewed its practices. [5]

Five newsrooms, five different countries and sizes, one recurring failure: AI-generated claims published without enough human verification to catch what wasn't true.

**When it worked**
- **BBC Eye, 2023-2024.** A two-person investigative team used a multi-agent AI system to sift roughly 10,000 Russian-language social media posts, a task its own reporters called "impossible manually," and surfaced contradictions between soldiers' real conditions and official reports. The resulting documentary drew over 3 million views. [6]

The difference isn't the technology itself. It's scope, and how much verification stood between the AI's output and publication. That, more than any position on whether AI is "good" or "bad" for journalism, is what actually separates these two lists.

**Sources**
1. https://futurism.com/sports-illustrated-ai-generated-writers — Futurism, Nov 27, 2023: Sports Illustrated published product reviews under fabricated AI-generated author profiles; parent company Arena Group fired CEO Ross Levinsohn and three other executives in the following weeks.
2. https://futurism.com/cnet-ai-errors — Futurism, Jan 2023: CNET had quietly run 77 AI-generated financial explainers since Nov 2022; editor-in-chief Connie Guglielmo confirmed corrections on 41 of the 77 and paused the program.
3. https://www.cnn.com/2023/08/30/tech/gannett-ai-experiment-paused — CNN, Aug 30, 2023: Gannett paused its AI sports-recap tool after it published unresolved placeholder text and wrong scores.
4. https://www.axios.com/2025/05/20/ai-summer-reading-books-chicago-sun-times — Axios, May 20, 2025: a syndicated Chicago Sun-Times reading list recommended 15 books, 10 of which didn't exist; freelancer Marco Buscaglia admitted using AI without disclosure.
5. https://oecd.ai/en/incidents/2026-06-12-39cd — OECD.AI incident database, 2026: Tagesspiegel removed opinion pieces by former editor-in-chief Stephan-Andreas Casdorff after he used AI to draft columns containing fabricated quotes and false claims.
6. https://reutersinstitute.politics.ox.ac.uk/news/how-bbc-eye-built-multi-agent-ai-system-sift-through-ten-thousand-russian-social-media-posts — Reuters Institute (Oxford): BBC Eye's small team used a multi-agent AI system to sift roughly 10,000 Russian-language social media posts, surfacing contradictions with official reports; the resulting documentary drew over 3 million views.

## 4. Where Newsrooms Actually Stand

Most coverage of newsroom AI adoption assumes a size-based hierarchy: small newsrooms lag, large ones lead. The actual data doesn't support that.

A 2025 Reuters Institute survey of UK journalists found 56% use AI professionally at least weekly, but at the newsroom level, integration stays shallow. 85% of outlets report "none" or "limited" AI integration into actual workflows, and only 4% call it moderate to full. [1] What predicts whether a newsroom has real AI governance isn't size. It's ownership: publicly-owned outlets are far more likely to have AI protocols than privately-owned ones (70% versus 40%) and to offer staff training (57% versus 29%). [1]

A separate, measured study, a direct scan of what newsrooms actually published rather than a survey of what they say, found something close to the opposite of the assumed size pattern. Testing 186,507 articles from 1,528 US newspapers for AI-generated content, papers under 100,000 circulation showed more detectable AI use (9.3%) than papers over that threshold (1.7%). [2] Smaller newsrooms aren't behind. They may be using AI more, just less visibly.

Disclosure is the real gap, at every size. In that same study, 96.5% of AI-flagged articles carried no disclosure, and only 12 of the 200 newspapers sampled had any public AI policy at all. [2] A broader synthesis of 97 newsroom AI policies across 22 countries found the same priorities recur everywhere, transparency, human oversight, human verification, but the language is often vague enough that it's unclear what it actually requires in practice. [3] The gap is sharpest outside wealthy countries: about 80% of Global South journalists surveyed in one study said their newsroom has no AI policy at all. [4]

**Sources**
1. https://reutersinstitute.politics.ox.ac.uk/ai-adoption-uk-journalists-and-their-newsrooms-surveying-applications-approaches-and-attitudes — Reuters Institute, Nov 27, 2025 (n=1,004 UK journalists): 56% use AI professionally at least weekly; 85% of newsrooms report none-or-limited AI integration; publicly-owned outlets are far more likely than private ones to have AI protocols (70% vs. 40%) and training (57% vs. 29%).
2. https://arxiv.org/html/2510.18774v4 — Russell, Karpinska & Iyyer (University of Maryland/Pangram Labs), arXiv:2510.18774, rev. April 26, 2026: scanning 186,507 articles from 1,528 US newspapers, 9.1% showed AI-generated or mixed authorship; papers under 100K circulation showed 9.3% AI use versus 1.7% for papers over 100K. 96.5% of flagged articles had no disclosure; only 12 of 200 sampled papers had a public AI policy.
3. https://cnti.org/reports/newsroom-policies-for-ai-in-journalism-2/ — CNTI synthesis of 97 newsroom AI policies across 22 countries: transparency, human oversight, and human verification recur as priorities, but the underlying studies note the language is often vague and unoperationalized.
4. https://cnti.org/reports/newsroom-policies-for-ai-in-journalism-2/ — Same CNTI synthesis, citing a Thomson Reuters Foundation survey of 221 Global South journalists (late 2024): about 80% said their newsroom has no AI policy at all.

## 5. Questions Without Settled Answers

Newsrooms that do have AI guidelines are weakest specifically on fairness and bias: just 27% of outlets with any AI protocols cover it, the lowest of the four areas measured. [1] That gap shows up as real, unresolved questions for individual journalists too:

- When do I disclose that I used AI in my reporting?
- Can I trust AI's analysis of a dataset, or do I need to verify everything myself?
- If I use AI to brainstorm story ideas, is that still "real" journalism?

Many journalists fear AI will be used to replace them. Publishers like the efficiency argument. The honest answer depends entirely on how it's used, and right now, most of that "how" is still being decided newsroom by newsroom.

**Sources**
1. https://reutersinstitute.politics.ox.ac.uk/ai-adoption-uk-journalists-and-their-newsrooms-surveying-applications-approaches-and-attitudes — Reuters Institute, Nov 27, 2025: among UK newsrooms with any AI guidelines, only 27% cover bias or fairness, the weakest of four measured areas (also: 44% human-oversight protocols, 43% data-privacy/security).

## 6. What's Actually at Stake

[Maps to `.stakes`, not `.roster`]
**For journalists**: Finding truth, interviewing sources, telling stories, that skill is more valuable, not less. What changes is how fast the routine research gets done. Learning to use AI well is becoming a job requirement, the way learning to use Google once was.
**For news organizations**: Can they get more efficient without sacrificing quality or trust, and stay competitive with organizations moving faster?
**For the public**: Only 20% trust AI's answers about the news, but a growing share is asking it anyway. [1] Whether journalism survives that gap depends on whether readers can tell where AI actually played a role.
**For you**: The question isn't "will AI replace me?" It's "will I know how to use it?" There's a real opportunity to be among the people who figure out responsible, effective AI use in journalism early.

**Sources**
1. https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2026/dnr-executive-summary — Reuters Institute Digital News Report 2026: 20% of people globally trust AI chatbot answers about the news, versus 37% who trust the news itself; global chatbot use for news rose from 7% to 10% year over year.
