# Submission Info

<!-- Fill this in as your project takes shape, and keep it current.
     This becomes your public profile card on the workshop showcase page,
     pulled live from this file — worth a real sentence per field, not a
     placeholder. -->

- **Student Name:** Michael Flowers

- **Fork URL:** `https://github.com/michaelflowers-media/2026-ai-news-innovation-workshop`

- **Hypothesis or problem statement:** Readers can't tell, inside a single economics story, which parts are verifiable fact, which are the outlet's framing, and which are things they could actually act on. Those three layers arrive blended together, so a story about inflation or interest rates reads as either alarming or irrelevant — and the reader has no way to separate what happened from how it was characterized. The hypothesis is that making that separation visible, on the reader's side, makes economic coverage more usable and more trustworthy without changing a word of the original reporting.

- **What you're building:** Project Dissonance — a reader-facing decoder for economic news. You give it an article, and it splits the piece into three labeled layers: the factual claims and the data behind them, the framing and word choices the outlet used to present those facts, and the concrete actionable takeaways for a reader's own finances or civic decisions.

- **Solution:** A Claude Skill that reads an article and returns three layers: the verifiable claims and what would check them, the persuasion techniques with the exact words doing the work and a neutral rewrite of each, and what a reader can go verify. It works from a closed taxonomy — Cialdini's influence principles plus rhetorical moves like agent deletion and implied causation — so the output is checkable rather than a matter of taste, and nothing is flagged without quoting a verbatim span. Tested on a matched pair from the Financial Times covering the same announcement in the same week: Treasury Secretary Scott Bessent's opinion column on Iran sanctions carried 6.80x the persuasion density of the FT news desk's report on it, against a 3x threshold set before the test was run. What it does not establish: one pair on one topic is not validation, and there is no public live demo, because the workshop's shared Claude proxy hasn't been built.

- **Live comparison:** `/submissions/michael-flowers/viewer.html`
