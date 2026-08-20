# Safe & Auditable Design

> "Responsible AI" sounds like a value statement. What it actually means is how our promises map to our behaviors.

## 1. What "Auditable" Means (in this context)

Not "we could theoretically explain this." A record that actually lets you explain it, after the fact, how you used AI and how it influenced the product.

We want to ask ourselves **which actions would we need to explain later**, if someone asked why the tool did what it did. [1] For most projects, that's answerable with four inquiries: what went in, what came out, what the system did with it, and whether it was allowed. [2] 

**Sources**
1. https://www.metacto.com/blogs/ai-audit-trails-what-to-log-when-agents-touch-business-systems — MetaCTO, AI audit trails guide: the right first question is not what can we log, but which actions would we need to explain later.
2. https://www.metacto.com/blogs/ai-audit-trails-what-to-log-when-agents-touch-business-systems — Same source: a minimum viable audit trail answers four questions for any AI decision: what data went in, what came out, what the system did with it, and whether it was allowed.

## 2. When It Goes Wrong

To cite two examples:

**NYC's MyCity chatbot**: Falsely told business owners it was legal to take workers' tips, reject Section 8 tenants, and refuse cash. After journalists exposed it in March 2024, it kept giving the same wrong answers for over a year before finally being shut down. [1] The failure was not only the wrong answer, but the delay in quickly shutting down the tool when the falsehood was exposed.

**Air Canada's chatbot**: Told a customer he could claim a bereavement discount retroactively. That was wrong, and Air Canada argued the chatbot was "a separate legal entity responsible for its own actions." A tribunal rejected that outright and made the airline pay. [2]

> The two safety axes here are responsiveness and accountability, which are central tenets of responsible AI.

**Sources**
1. https://themarkup.org/artificial-intelligence/2024/03/29/nycs-ai-chatbot-tells-businesses-to-break-the-law — The Markup, March 29 2024: NYC's official business chatbot gave false legal guidance on tips, Section 8 tenants, and cash refusal. The chatbot stayed live giving the same wrong answers for over a year after the reporting, with no internal monitoring loop catching it; shut down in 2025.
2. https://www.forbes.com/sites/marisagarcia/2024/02/19/what-air-canada-lost-in-remarkable-lying-ai-chatbot-case/ — Forbes, Feb 19 2024, and Canada's Civil Resolution Tribunal ruling: Air Canada argued its chatbot was a separate legal entity responsible for its own actions. The tribunal rejected this, ordering a $650.88 refund and ruling Air Canada fully responsible for the chatbot's output.

## 3. Behavior is the key

A study of 52 published newsroom AI policies found about 90% required disclosure when AI was used. Only 8% specified how the policy would actually be enforced. [1] A policy that states values but has no enforcement mechanism isn't actually auditable, no matter how well it reads.

The newsrooms that got specific:

- **WBEZ Chicago** requires approval for each individual instance of AI use beyond minor permitted cases, with concerns escalated to a standing AI Oversight Committee that meets quarterly. [2]
- **LAist** names accountability directly, not abstractly: "a human at LAist has reviewed it and that person is accountable," with a working group vetting any new AI tool before it's adopted. [3]
- **CBC News** reduces disclosure to one testable question: is there any risk the audience might be misled if we don't disclose the AI use? If yes, disclose. [4]

**Sources**
1. https://journalistsresource.org/home/generative-ai-policies-newsrooms/ — Journalist's Resource, Dec 12 2023, analysis of 52 newsroom AI policies: about 90% required disclosure when AI was used in a story; only 8% specified how the policy would be enforced. 69% named hallucination as a risk; 54% warned about source protection.
2. https://www.wbez.org/ai-policy — WBEZ/Chicago Public Media AI policy: staff must get approval for each individual instance of GAI use beyond minor permitted uses. Concerns can be elevated to the AI Oversight Committee, which convenes quarterly.
3. https://laist.com/about-us/how-laist-uses-ai — LAist AI policy: a human at LAist has reviewed content and that person is accountable. An internal AI working group reviews new AI tools before they are adopted.
4. https://www.cbc.ca/news/ai-principles-practices-cbc-news-9.7205947 — CBC News AI principles: "Is there any risk that the audience might be misled if we do not disclose the use of AI? If the answer is yes, a disclosure is required."

## 4. A Working Checklist

Drawn from NIST's AI Risk Management Framework, the actual US government standard, these questions can help you enshrine responsible AI as promises. [1]

- Have you written one paragraph on what AI is being used for, and where it shouldn't be used in your product? [2]
- Have you written down what happens when AI fails, not just what happens if it's right? [3]
- Do you have a kill switch? A way to actually turn it off if it's producing bad output. [4]
- Is there somewhere a user can flag a wrong answer, and does anyone actually look at it? [5]

> **Exercise: Apply This**
> - Time: A few minutes, individually.
> - Description: For your own project, answer the four questions above. If the answer to any of them is "no," decide right now whether that's acceptable for a workshop project, or worth fixing before Final Coding Time.
> - Deliverable: Four short answers you could actually explain to someone who asked.

**Sources**
1. https://airc.nist.gov/airmf-resources/airmf/5-sec-core/ — NIST AI Risk Management Framework 1.0, released Jan 26 2023 (NIST AI 100-1). Core functions: Govern, Map, Measure, Manage.
2. https://airc.nist.gov/airmf-resources/airmf/5-sec-core/ — NIST AI RMF, MAP 1.1: intended purposes, potentially beneficial uses, and prospective settings must be documented.
3. https://airc.nist.gov/airmf-resources/airmf/5-sec-core/ — NIST AI RMF, MAP 3.1/3.2: potential benefits and potential costs from AI errors must both be examined and documented.
4. https://airc.nist.gov/airmf-resources/airmf/5-sec-core/ — NIST AI RMF, MANAGE 2.4: mechanisms exist to supersede, disengage, or deactivate AI systems that demonstrate performance or outcomes inconsistent with intended use.
5. https://airc.nist.gov/airmf-resources/airmf/5-sec-core/ — NIST AI RMF, MANAGE 4.1: post-deployment monitoring plans exist, including mechanisms for capturing and evaluating input from users, appeal, redress, and override.
