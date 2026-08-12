# Requirements & Task Log

**Current focus (2026-08-04):** paused backend work (Phase 2, and the
remaining Vercel-connection item in Phase 1) to prioritize frontend/content —
need the site visibly clickable and ready for content to be added. Backend
items below are fully scoped and not forgotten; resume after the content
pass. Do not build anything that calls the Claude API from a page until
Phase 2 (the proxy) is actually done — see
[ADR 0007](adr/0007-serverless-claude-proxy.md).

Source of truth for build progress on this repo. Check here before starting
work; update here when a task starts/completes, or when new work is
discovered that wasn't in the original scope. Architecture *decisions* (the
"why") live in [`project/adr/`](adr/) — this file tracks the "what" and
"is it done."

Status legend: `[ ]` not started · `[~]` in progress · `[x]` done

---

## Phase 1 — Foundation

- [x] Repo scaffold: `docs/` directory structure created
- [x] `docs/partials/nav.html`, `docs/partials/footer.html`
- [x] `docs/js/partials.js` loader script
- [x] `docs/css/style.css` (base reset, watercolor palette variables)
- [x] `docs/index.html`, `docs/resources.html` skeletons; `docs/setup.html` has real content now — see Phase 5
- [x] `vercel.json` + `package.json` deploy config
- [ ] Connect repo to Vercel and confirm live URL (requires account access —
      maintainer action, not something done from this session)
- [ ] Confirm a PR produces an automatic Vercel preview deployment

## Phase 2 — Proxy & rate limiting

- [ ] `api/claude-proxy.ts` serverless function
- [ ] Upstash Redis project created; rate limiting wired via `@upstash/ratelimit`
- [ ] Env vars configured in Vercel (`ANTHROPIC_API_KEY`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`)
- [ ] `max_tokens` cap + pinned cheaper model for public-proxy traffic
- [ ] Verify: request past rate limit returns a graceful error, not a pass-through to Anthropic

## Phase 3 — Content structure

- [x] `docs/data/schedule.json` authored (single source of truth for session times/types/titles) — **Day 1 times confirmed 2026-08-11** (10am–5pm, one AM break — see the Day 1 schedule section below); Day 2/3 still placeholder, confirm before the workshop
- [x] `docs/css/timeline.css`, `docs/js/timeline.js`
- [x] `docs/js/topic-metadata.js` — populates each topic page's time/duration/type badges and prev/next links from `schedule.json`
- [x] Day 1/2/3 `index.html` (timeline view, driven by `schedule.json`) — pattern works for all three; Day 2/3 are stubs with a working timeline but no learning-outcomes copy yet
- [~] Topic page template + topic pages — **Day 1 renumbered/renamed 2026-08-11** (Claude Desktop pivot — see below): `01-state-of-ai`, `02-industry-conversation`, `03-use-cases`, `04-product-discussion`, `05-problem-statement-discussion`, `06-ai-tools`, `07-explore-claude-desktop`, `08-fork-and-submit` all have real content; `09-project-assignments` is still a placeholder. `people-to-follow.html` also has real content but is unlisted/unscheduled (a resource page, not a numbered session — see below). Day 2 (8 topics) and Day 3 (6 topics) not yet built, so their timeline links currently 404
- [x] Briefing template, Overview page (`docs/css/briefing.css` Overview rules, `docs/js/reveal.js`) — normal scrolling page, shared nav/footer restored, reuses `topic-metadata.js`. See [ADR 0011](adr/0011-split-overview-and-slides.md) (supersedes [0010](adr/0010-briefing-template.md)'s toggle).
- [x] Briefing template, Slides page (`docs/css/briefing.css` deck rules, `docs/js/deck.js`) — paginated-only, self-contained chrome linking back to its Overview page, no schedule.json fetch. **8/8 content-complete topics now have a Slides companion** (Topics 1–5, 7, 8, 9).
- [ ] Slides system for the *generic* template (`docs/css/slides.css`, `docs/js/slides.js`) — the original Part 6b plan; **not needed for briefing-template pages**, which get their slides via the deck pattern above instead. Only relevant if a generic-template page ever wants slides.
- [~] Responsive layout — handled via media queries inside `style.css`/`timeline.css`/`briefing.css` rather than a separate `responsive.css` file (simpler given how little CSS exists so far); revisit splitting it out if it gets unwieldy

## Phase 4 — Student showcase

- [ ] `docs/students/index.html` hub page
- [ ] Student portfolio page template
- [ ] Extended `README.md` submission template (adds title/pitch + demo path fields)
- [ ] `.github/pull_request_template.md`
- [ ] `SUBMISSION_GUIDE.md`

## Phase 5 — Content fill

- [~] Real content written for each of the 24 topic pages — **Day 1: 8/9
      scheduled sessions done** (only `09-project-assignments` still a
      placeholder), plus `people-to-follow.html` as a bonus resource page.
      Day 2/3 not started.
- [x] Slides populated per topic — **true for every Day 1 topic that has
      real content** (all 8 scheduled + `people-to-follow`); Day 2/3 have
      none yet.
- [x] `docs/setup.html` — **rebuilt 2026-08-11 as Day 1 only**, with a real
      interactive checklist, ready to send to students. Day 2's setup
      content moved to a new, currently-unlinked `docs/setup-day-2.html`.
- [ ] `STUDENT_CLAUDE_GUIDE.md` written (day-specific guidance students paste into their own Claude sessions — see ADR 0009 for why this isn't named `CLAUDE.md`)
- [~] `resources.html` populated with real links — established pattern:
      when a topic's review turns up a genuinely useful external
      compilation/reference (not something we'd host/maintain ourselves),
      link it from the relevant day's section here as it's found, rather
      than waiting for a dedicated content-fill pass. First entry added:
      Day 1's newsroom AI policies index (from Topic 2). Day 2/3 sections
      still fully unpopulated.
- [ ] Sample/placeholder student portfolio pages created for 2-3 students to validate the template

---

## Newly identified tasks

Tasks discovered during build that weren't in the original plan. Add here as
found; promote into a phase above once scoped, or leave here if it doesn't
map cleanly to one.

- [x] Resolved: the org/repo is confirmed
      (`github.com/AndrewRCalderon/2026-ai-news-innovation-workshop`, this
      repo's own remote) — `setup.html` now links directly to it. **New
      caveat**: `STUDENT_CLAUDE_GUIDE.md` itself doesn't exist yet (still a
      Phase 5 deliverable), so that specific link 404s on GitHub until it's
      written. Fine for now since setup.html isn't live/sent to students
      yet, but write that file before it actually goes out.
- [ ] Decide which remaining topic pages should use the new briefing template
      (rich, structured content) vs. stay on the generic topic-header/sidebar
      template — currently only `day-1/01-state-of-ai.html` uses briefing;
      the other 5 built Day 1 pages are still on the generic template with
      placeholder content. See [ADR 0011](adr/0011-split-overview-and-slides.md).
- [x] Resolved: user wants a Slides companion for every topic that has real
      content — 4/4 built so far (Topics 1–4). Keep building one alongside
      each new Overview page going forward rather than deciding per-topic.
- [ ] Slides pages hardcode their cover-meta (time/duration/type) as static
      text instead of reading `schedule.json` like Overview pages do
      (`topic-metadata.js`) — a deliberate simplification in
      [ADR 0011](adr/0011-split-overview-and-slides.md) since deck.js has no
      fetch. Real cost: caught once already — Topic 1's slides page still
      said "45 MIN" after the schedule retiming moved it to 15 min, and had
      to be fixed by hand. Worth reconsidering if this happens again as more
      slides pages accumulate; the fix would be a small schedule-fetch added
      to `deck.js` for just the cover-meta fields.
- [ ] "After class: end-of-day resources email (including recommended
      newsletters)" is real Day 1 content but isn't an in-class scheduled
      session, so it isn't in `schedule.json`. Currently just a static note
      on `day-1/index.html`. The actual newsletter list it should send
      belongs in `resources.html`'s Day 1 section once that's populated
      (Phase 5) — right now that section is still a TODO placeholder.
- [x] Resolved: "Your Workshop Tech Stack" and "How They Work Together"
      moved out of `07-ai-tools.html` into `08-explore-tech-stack.html`
      (both Overview and Slides). AI Tools is now a clean 5-section, 30-min
      survey (landscape, quick reference, evaluation criteria, required/
      optional for this workshop); Explore Tech Stack owns the hands-on
      deep dive plus a new facilitator roadmap (see change log).
- [ ] `project/scripts/check-slide-parity.js` (added 2026-08-06, see
      Batch 7 below) found two pre-existing Overview/Slides content
      mismatches on topics not yet reached in the full-scale review — not
      fixed, just flagging so they're not lost: `05-project-ideation.html`
      s2 (Overview 12 `<li>`s vs. Slides 7) and `07-ai-tools.html` s2
      (Overview 22 `.roster-row`s vs. Slides 12). Address when the review
      reaches those topics.

---

## Full-scale site review (in progress — 2026-08-06)

User is reviewing the live site page by page and passing notes in batches.
Logging each batch here as it arrives; not prioritized or implemented yet —
that happens once the review is complete. See change log for batch history.

### Batch 1 — Home, Students, Day 1 index, Topic 1 (State of AI)

- [ ] **Home page**: harmonize styles to match the briefing template adopted
      for Day 1 content pages (`docs/css/briefing.css`). User chose a
      **light visual pass** (align colors/type/spacing tokens), not a full
      retemplate — in progress.
- [ ] **Student submissions**: verify the fork → clone → branch → commit →
      push → PR flow actually works end-to-end, not just that
      `09-fork-and-submit.html` describes it correctly. **Deferred**: user
      wants to finish writing all of Day 1's content first, then come back
      to this. When it happens: user will do the fork/PR themselves under
      their own GitHub account and report back (their choice over doing it
      together live in-session), since opening a real PR is a visible,
      public action.
- [ ] **Day 1 index page** (`docs/day-1/index.html`): once all Day 1 topic
      content is finished, add a 1–2 sentence summary of what the day
      covers plus a short learning-outcomes list. Blocked on Topics 6
      (`06-problem-statement-discussion`) and 10 (`10-project-assignments`)
      still being placeholders.
- [x] **Topic 1 (State of AI) slides — cover slide**: removed the
      `"→ or click to begin"` hint site-wide from all 8 existing slide
      decks (Topics 1, 2, 3, 4, 5, 7, 8, 9), not just Topic 1.
- [x] **Topic 1 "The Moment We're In" copy edits** — done in both
      `docs/day-1/01-state-of-ai.html` and
      `docs/day-1/slides/01-state-of-ai-slides.html`:
      - Bullet 1: "overnight" dropped.
      - Bullet 2: em dash replaced with a period.
      - Timeline chips: `.chip` given left padding
        (`docs/css/briefing.css:120`) so years no longer crowd the divider.
      - ChatGPT paragraph reworded to the shorter version.
      - Stat pull "1,000,000 users in 5 days" verified accurate (see
        research findings below) — left as plain text for now, not yet
        wired into an interactive citation (that's the item right below).
- [ ] **New architecture idea raised by the citation need above**: an
      inline citation/footnote system — superscript markers on factual
      claims that reveal a source link (and maybe a short description) when
      clicked. Would touch the shared briefing template used by every
      topic page, so this is ADR-sized, not a copy fix. Interaction design
      (inline popover vs. bottom footnote list) still needs to be worked
      out with the user — revisit once the review batches are done.

### Batch 2 — Topic 1 (State of AI), "What's Actually Changed" section

Applies to both `docs/day-1/01-state-of-ai.html` (§s2, lines ~60–86) and
`docs/day-1/slides/01-state-of-ai-slides.html` (duplicated content, ~line
75+).

- [x] Dropped "Here's the honest split." from the intro paragraph.
- [x] Renamed "Still True" → "Caveat" (user's choice among Caveat/
      Caution/Warning options).
- [x] Resolved: asked the user to clarify "deeper/more probative" (longer
      per-item explanations vs. more items vs. both) — answer was that the
      column is fine as-is. No content change needed.
- [x] Column parity: added a "Privacy tooling" item to the Changed column
      to pair with the existing "Privacy and data security remain
      genuinely thorny" caveat (exact wording was drafted by Claude, not
      dictated by the user — worth a closer read).
- [x] Done — all 12 items in both columns now have `.cite` citations (see
      ADR 0012 and the research findings entry below).

### Batch 3 — Topic 1 (State of AI), "Key Moments in Recent History" section

Applies to both `docs/day-1/01-state-of-ai.html` (§s3, lines ~88–97) and
`docs/day-1/slides/01-state-of-ai-slides.html` (duplicated content,
~line 106+). Six-item `<ol class="history">` timeline: 2012, 2016,
2018–2020, Nov 2022 (hinge), 2023–2024, 2024–2026.

- [x] Intro line reworded (polished version of the user's rough phrasing):
      "The path here wasn't sudden. It's the accumulation of decades of
      technical milestones and academic research — some at universities,
      some at big tech companies — that finally broke into public view."
- [x] 2012 item named the benchmark: AlexNet's 2012 ImageNet win (15.3%
      vs. 26.2% error), confirmed via research — see findings below.
- [x] 2016 AlphaGo item: confirmed fine as-is, no change made.
- [ ] 2018–2020 BERT/GPT-2/GPT-3 item: "GPT-3 introduces few-shot
      learning" is still unexplained — deliberately left alone pending the
      citation-system decision (user's preferred fix for this one)
      rather than half-solving it with inline text.
- [x] 2023–2024 "Copilot era" item: added a plain-text detail naming the
      NYT v. OpenAI/Microsoft lawsuit (Dec 2023) — not yet an interactive
      citation, since that system doesn't exist yet.
- [x] 2024–2026 "current moment" item: "Sober" → "Frenetic" (user's pick
      over "Adamant," which was flagged as not fitting the intended
      meaning), plus added "— people are throwing things at the wall to
      see what sticks."

### Research findings (background agent, 2026-08-06) — unblocks Batch 1/3/4 citations

- **ChatGPT "1M users in 5 days"**: verified accurate. Sam Altman and Greg
  Brockman both confirmed it on X, Dec 5 2022 (5 days after the Nov 30
  launch). High confidence. Caveat: don't confuse with a *different*,
  later 2025 Altman tweet about "1 million users in one hour" — different
  milestone.
- **2012 benchmark**: confirmed as AlexNet winning ILSVRC (ImageNet) 2012 —
  15.3% top-5 error vs. 26.2% for the next-best (non-neural) entry. Paper:
  Krizhevsky, Sutskever, Hinton, NeurIPS 2012. Source:
  <https://proceedings.neurips.cc/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html>
- **Training-data lawsuits**: *The New York Times v. Microsoft and OpenAI*
  (filed Dec 27 2023, SDNY) is the clearest, most journalism-relevant pick
  — alleges unauthorized use of Times articles to train GPT models; still
  active/in discovery as of the research date. A second option: eight
  Alden Global papers (Chicago Tribune, NY Daily News, etc.) sued the same
  defendants Apr 30 2024. **Before publishing a "case status" line, verify
  against a live docket** — litigation is moving fast and the agent's
  status info may already be stale.
- **Newsroom examples**: Large — NYT's internal "Echo" tool (2025,
  summarizes/suggests headlines, cannot draft articles) and Washington
  Post's "Ember" AI writing coach for op-ed contributors (2025). Small —
  Sahan Journal (MN, AI-personalized advertiser kits + story summaries),
  Outlier Media (Detroit, AI-assisted SMS civic-info service), City
  Bureau/Documenters Network (Chicago, AI surfacing trends across public-
  meeting notes). All confirmed via named sources; full citations in the
  agent's report if needed later.
- Full agent report (with all URLs) is not persisted elsewhere — if a
  citation URL is needed and not summarized here, someone will need to
  re-derive/re-search it.

### Batch 4 — Topic 1 (State of AI), slides 4–5 + end slide

Slides 4–5 apply to both `docs/day-1/01-state-of-ai.html` (§s4/s5, lines
~101–144) and `docs/day-1/slides/01-state-of-ai-slides.html` (duplicated).
The end-slide item is a **shared deck template pattern**, confirmed present
in all 8 existing slide decks (Topics 1, 2, 3, 4, 5, 7, 8, 9) — see note
below.

- [x] Slide 4 — "You Cannot" → "You Should Not."
- [x] Same slide — pull-question reworded to: `Not "will AI replace me?"
      but "what does this let me try that I couldn't before?"` (user's
      pick among three drafted options).
- [x] Slide 5 — "Your industry" → "Our industry."
- [x] Same row — replaced the vague Adobe/Bloomberg line with real named
      examples: NYT's "Echo" tool, Washington Post's "Ember," Sahan
      Journal, Outlier Media (sourced via the research agent — see
      findings above).
- [x] Same slide, "For you" stakes item — reworded to "...as essential as
      understanding Google Docs, Slack, and spreadsheets."
- [x] **End slide**: replaced the `-30-` mark + summary line with a
      simple nav block (Restart / Back to schedule / Next section) —
      applied as a template-level change across **all 8 slide decks**
      (Topics 1, 2, 3, 4, 5, 7, 8, 9), each with a correct next-topic link
      per `schedule.json`'s Day 1 order.

### Research findings (background agent, 2026-08-06) — citations for the compare-grid ("Changed"/"Caveat") items

**Applied** — all 12 items in both `docs/day-1/01-state-of-ai.html` and its
Slides mirror now carry `.cite` markers using these sources. The two
weak/proxy items (Changed #2 "Accessibility," #5 "Public conversation")
had their copy reworded per user direction to actually match what their
Pew sources measure, rather than being cited as-is or left uncited.

**Changed column:**

1. Speed of deployment — McKinsey on generative AI's dev-time savings.
   <https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/unleashing-developer-productivity-with-generative-ai>
   Medium confidence — "minutes vs. months" is hyperbole beyond what the
   study itself claims (its real numbers: 10–50% time savings).
2. Accessibility — Pew: 49% of U.S. adults now use AI chatbots (up from
   23% in 2023). <https://www.pewresearch.org/internet/2026/06/17/americans-and-ai-2026-chatbots-smart-devices-and-views-on-impact/>
   **Weak/proxy citation** — shows broad adoption, not specifically "no ML
   background needed."
3. Capability scale — Stanford AI Index 2025: SWE-bench 4.4%→71.7% solved
   in one year, GPQA +48.9 pts, MMMU +18.8 pts.
   <https://hai.stanford.edu/ai-index/2025-ai-index-report> High confidence.
4. Cost — Stanford AI Index: GPT-3.5-level query cost fell ~280x in 18
   months ($20.00 → $0.07 per million tokens).
   <https://hai.stanford.edu/ai-index/2025-ai-index-report> High confidence.
5. Public conversation — Pew: 95% of U.S. adults have heard about AI;
   "heard a lot" nearly doubled 26%→47% (2022–2025).
   <https://www.pewresearch.org/science/2025/09/17/ai-in-americans-lives-awareness-experiences-and-attitudes/>
   **Weak/proxy citation** — measures awareness/usage, not literal
   "dinner-table talk." Agent suggested either softening the tooltip
   wording or skipping a citation on this one.
6. Privacy tooling — Anthropic's Aug 2025 consumer terms update: Work/
   Enterprise/Education/Government + API excluded from training; new
   consumer opt-in/opt-out controls. <https://www.anthropic.com/news/updates-to-our-consumer-terms>
   High confidence, primary source.

**Caveat column:**

1. Hallucinates — OpenAI/Georgia Tech paper arguing training rewards
   confident guessing over admitting uncertainty.
   <https://arxiv.org/abs/2509.04664> High confidence.
2. Not "thinking," pattern-matching — Apple's "The Illusion of Thinking"
   (2025): reasoning models collapse on novel/complex logic puzzles.
   <https://machinelearning.apple.com/research/illusion-of-thinking> High
   confidence, but **contested in the field** — some researchers argue the
   puzzle-based test design underestimates real reasoning ability.
3. Amplifies bias — Zhao et al. 2017, the foundational bias-*amplification*
   paper (33%→68% gender-association skew after training).
   <https://arxiv.org/abs/1707.09457> High confidence, though pre-LLM era;
   a newer companion citation exists if wanted
   (<https://arxiv.org/html/2410.15234>, 2024).
4. Best on well-defined tasks — METR: near-100% success on tasks under
   ~4 min, under 10% on tasks taking humans 4+ hours.
   <https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/>
   High confidence for task length/complexity; imperfect fit for
   "creative work" specifically (METR's tasks are mostly software
   engineering).
5. Privacy/security thorny — Stanford AI Index: privacy incidents up 56%
   YoY (233 in 2024); trust in AI companies on data protection fell
   50%→47%. <https://hai.stanford.edu/assets/files/hai_ai-index-report-2025_chapter3_final.pdf>
   High confidence.
6. Don't fully understand why models work — Dario Amodei's "The Urgency
   of Interpretability" essay. <https://darioamodei.com/post/the-urgency-of-interpretability>
   High confidence, direct primary source from a lab CEO.

### Batch 5 — Topic 2 (Industry Conversation)

Not yet implemented — logged only, per the review workflow (organize
first, implement once the user says go). Applies to
`docs/day-1/02-industry-conversation.html` and
`docs/day-1/slides/02-industry-conversation-slides.html` unless noted as
Overview-only.

- [x] **"Smart people" → "people"** — both occurrences fixed:
      - s1 lede (both files): "...understanding what people actually
        disagree about."
      - s3 (Overview only — the Slides version never had this sentence):
        rewritten (not a straight deletion, which would've broken the
        grammar) to "Nobody knows yet — both camps have people who know
        what they're talking about." (Claude's phrasing — worth a check.)
- [x] **s2 "The Journalism Conversation" — citations, done in both files**.
      Before wiring in citations, independently re-verified every
      candidate source URL by fetching it directly (several of the
      research agent's suggested links turned out dead or blocked —
      caught before publishing, not after):
      - The agent's suggested NYT source (`nytco.com/press/principles-...`)
        **404s** — not used. Its Nieman Lab backup also blocks automated
        fetches. Used **Semafor's Feb 2025 reporting** instead (confirmed
        live, content directly verified): NYT bars staff from using AI to
        draft/substantially revise articles and requires AI-generated
        images/video to be labeled. Copy changed from "if AI was used...
        readers are told" (aspirational, per the agent's own caveat) to
        this verified, concrete policy detail.
        Source: <https://www.semafor.com/article/02/16/2025/new-york-times-goes-all-in-on-internal-ai-tools>
      - **Washington Post**: dropped the unsupported "draft templated
        earnings reports" clause (that's actually AP's program) and
        rewrote around what Haystacker (2024) actually does — confirmed
        directly against the source's own text.
        Source: <https://www.editorandpublisher.com/stories/new-washington-post-ai-tool-sifts-massive-data-sets,251540>
      - **Reuters**: rewritten around Fact Genie, Reuters' real tool
        (confirmed via the source's own text: scans press releases/
        financial documents in under 5 seconds, suggests alerts,
        journalists review before publishing) — not the unverifiable
        court-filings claim that was previously on the page.
        Source: <https://wan-ifra.org/2025/04/from-lab-to-newsroom-how-reuters-builds-ai-tools-journalists-actually-use/>
      - **Associated Press**: copy kept as-is (accurate, if conservative),
        cited. Source: <https://www.poynter.org/reporting-editing/2015/robot-writing-increased-aps-earnings-stories-by-tenfold/>
- [x] **s2 copy edit, both files** — investigative-reporting sentence
      reworded to: "No major newsroom uses it to replace investigative
      reporting. However, newsrooms are using AI to augment investigative
      capacity. The tension is efficiency gains versus maintaining
      journalistic integrity." Applied to each file's own base sentence
      (the Slides version keeps its trailing "honest answer" sentence
      after the edited part).
- [x] **s3 "The Tech Industry Conversation" — intro line, both files**:
      "The scaling question — are we even on the right path?" → "The
      scaling question…"
- [x] **Structural reorder, both files** (this turned out to apply to the
      Slides deck too — it has the identical 6-section structure with the
      same "Journalism Conversation" content, not just the Overview as
      first assumed): moved "The Journalism Conversation" to directly
      after "Where Newsrooms Actually Stand," before "What's Actually at
      Stake." New order in both files: What Everyone's Talking About →
      Tech Industry Conversation → Skeptics vs. Optimists → Where
      Newsrooms Actually Stand → Journalism Conversation → What's
      Actually at Stake. Updated the TOC/cover-contents order and all
      `block-eyebrow`/`<span class="n">` numbers to match; physically
      moved the section blocks. DOM `id`s (`s1`–`s6`) left unchanged since
      they're just anchors/`data-jump` targets, not tied to visual order —
      confirmed the Slides deck's prev/next and dot-nav (which read DOM
      order) still track correctly since the actual nodes moved, not just
      their labels.

### Batch 6 — Topic 2, "Where Newsrooms Actually Stand" section

**Overview-only** — the Slides deck's version of this section has neither
the "depending on size" phrase nor the "common policies emerging" bullets
(it's a condensed roster + pull-question only), so neither addition below
has an equivalent spot there. Flagged, not assumed away.

- [x] Added a no-URL `.cite` disclaimer after "depending on size":
      "This breakdown reflects general perception, not a formal study of
      AI adoption or maturity across small, regional, mid-size, and large
      newsrooms." The citation component already supported note-only
      citations (no `data-url` → popover shows just the text, pill isn't
      clickable) without needing any code changes.
- [ ] User wants 2–3 hyperlinks to real, public newsroom AI policies
      placed right under the "common policies emerging across newsrooms"
      bullets. **Research findings (verified live, not just recalled)**:
      - **Compilation option**: <https://aifornewsroom.in/ai-guides> — an
        actively maintained, independent index of ~128 published newsroom
        AI policies across ~40 countries, each linking to the original
        document. Spot-checked 3 outbound links (ABC News Australia, EL
        PAÍS, WBEZ) — all live and on-topic. Caveat: partly newsroom-
        submitted, not independently audited.
      - **Individual-link alternative** (if preferred instead of/alongside
        the compilation), spanning sizes not already used elsewhere on
        this page: Chicago Public Media/WBEZ (mid-size,
        <https://www.wbez.org/ai-policy>), Sahan Journal (small nonprofit,
        AI guidelines embedded in its About page, not a standalone URL —
        <https://sahanjournal.com/about-sahan-journal/>), ABC News
        Australia (large, non-US alternative to the names already cited —
        <https://www.abc.net.au/about/abc-ai-principles/104036790>).
      - Rejected candidates: Journalist's Resource's 52-newsroom policy
        comparison (bot-blocked, and it's an analysis piece not a link-out
        compilation); Denver Post's policy (real per secondhand reporting,
        no direct published URL found); CNTI's policy report (a PDF
        analysis, not a browsable compilation).
      - [x] **Resolved**: went with the compilation link. Briefly
        considered hosting our own CSV-backed table page (surfaced via
        `resources.html`) instead of linking out, reasoning that we
        wouldn't maintain it ongoing — but dropped that once it was clear
        aifornewsroom.in is already a live, actively maintained index, so
        rebuilding it ourselves would just be a snapshot competing with
        the real thing. Added a single plain-prose link (not a `.cite`
        pill, since it's further reading rather than a footnote on one
        specific claim) right after the "common policies" bullets:
        "Curious what real policies look like? Browse a compiled index of
        published AI policies from newsrooms worldwide" →
        <https://aifornewsroom.in/ai-guides>.

### Batch 7 — Topic 3 (Use Cases)

Applies to `docs/day-1/03-use-cases.html` and
`docs/day-1/slides/03-use-cases-slides.html` unless noted otherwise.

- [x] **s1 "What Does AI Actually Do?"**: em dash → comma. "These are
      real, deployed use cases — not theoretical ones." → "These are
      real, deployed use cases, not theoretical ones." Done in both
      files.
- [x] **s2 "Use Cases in Journalism" — done, Overview only**. All 5
      existing items now cited (WAN-IFRA, Poynter, THE CITY's own site).
      Added 6 new examples: 4 as new rows (iTromsø/local-government
      monitoring, Chequeado/automated claim-spotting, MittMedia+United
      Robots/automated local content, DocumentCloud/FOIA analysis — all
      small/regional or mid-size, none repeating NYT/AP/WaPo/Reuters),
      plus 2 folded into existing rows as concrete named examples rather
      than duplicate-category rows (Hearst's regional dailies added to
      "Headline ideation"; Zamaneh Media added to "Accessibility"). Table
      grew from 5 to 9 rows.
- [x] **s3 "Use Cases Outside Journalism" — done, Overview only**. All 5
      existing items cited (Zendesk, an ACL bias-detection paper,
      Wikipedia's filter-bubble entry, a PNAS speech-recognition bias
      study, Brandwatch). Added all 6 new examples as new rows, each a
      distinct industry (AlphaFold/scientific research, *Mata v. Avianca*/
      legal, IDx-DR/healthcare, GitHub Copilot security study/software,
      Be My Eyes' "Be My AI"/accessibility, UPS ORION/logistics). Table
      grew from 5 to 11 rows.
- [x] **CSV download — reverted**: built a client-side "Download as CSV"
      button, then the user reconsidered given how few rows existed at
      the time and asked to drop it. Removed cleanly (buttons, the shared
      `docs/js/csv-export.js` script, its CSS, and the ADR, since it never
      shipped/was reviewed).
- [x] **Standalone-module question — resolved**: user wants an inline
      "infinite scroll" reveal (not a separate page). Built
      `docs/js/infinite-roster.js` — a `.roster.is-infinite` table shows
      its first 4 rows, then reveals more in batches as a sentinel
      element scrolls into view; all rows stay in the DOM so non-JS
      visitors see everything immediately. Applied to both of Topic 3's
      rosters (Overview only — Slides stays condensed at 5 items each,
      matching how every other topic's Slides content is already a
      trimmed version of its Overview, not a full mirror). See
      [ADR 0013](adr/0013-infinite-scroll-roster.md).
- [x] **Resources link, per user request**: rather than a second page,
      linked directly to these two sections from `resources.html`'s Day 1
      list via their existing `#s2`/`#s3` anchors — same pattern now used
      for the newsroom AI policies index (see Phase 5 above).
- [x] **s6 "The Practical Question" — reframed as a self-assessment
      checklist, done in both files**, replacing the yes/no task list.
      Mirrors s5's Works-When/Doesn't-Work-When criteria as first-person
      questions (to avoid duplicating that content) rather than repeating
      the same specific tasks (research, drafting, etc.) — the Slides
      version is condensed, same pattern as everywhere else on this page.
      Wording was Claude's draft, presented before implementing; no
      objection raised, so shipped as proposed — worth a read.

### Batch 8 — Topic 3, s6 "The Practical Question" follow-up

- [x] Dropped the "Not abstract —" lead-in (Overview only — Slides never
      had it). Now just "Before reaching for AI, ask yourself:" in both.
- [x] Bullets restyled from the site's usual em-dash marker to checkmarks
      for this specific list, via a new `.field-notes.is-checklist`
      modifier (scoped, not a global change to every field-notes list on
      the site) — done in both files.
- [x] **Checklist questions now grounded in real sources, done in both
      files**. Research found no single master framework covering all 6
      — pieced together from multiple credible sources instead (user
      explicitly said this was fine): Google's "Rules of Machine
      Learning" (task/heuristic-first question), Google's "Problem
      Framing" guide (data-quality question), AP's generative AI
      standards via Poynter (verify-before-publish question), Trusting
      News' AI Trust Kit (credibility-stakes question), and IDEO's AI
      Ethics Cards (augment-vs-replace question). The 6th question
      ("real-time information / human trust") has **no honest citation**
      — research explicitly flagged this as a gap rather than forcing a
      weak match, so it's left uncited rather than fabricated.
      Independently re-verified all 5 URLs live before using them.
- [x] **Built `docs/resources/ai-decision-frameworks.html`** — a table of
      the same 5 verified sources (org, type, description), framed as an
      ongoing collection to add to whenever future research turns up
      another good practitioner framework, not a one-off list. Linked
      from Topic 3 s6 ("See more frameworks like this →", both files) and
      from `resources.html`'s Day 1 list, matching the pattern already
      established for the newsroom AI policies index.

### Batch 9 — Topic 4 (People to Follow)

Applies to `docs/day-1/04-people-to-follow.html` and
`docs/day-1/slides/04-people-to-follow-slides.html` unless noted.

- [x] s1 renamed "Why Follow People" → "Drawing Inspiration From Others"
      (user's suggestion), done in both files.
- [x] Removed the "Hashtags" row from s6 "Communities & Events" (both
      files) — not necessary.
- [x] Deleted s7 "How to Use This List" entirely (both files) — TOC/
      cover-contents entry and the section itself. Slides deck's static
      counter placeholder updated 09→08 (interim value — will need
      re-checking once the new section below is added back in).
- [x] **Research surfaced a serious accuracy problem**: 3 of the original
      11 people appear to be entirely fabricated — no trace found under
      any method (direct search, LinkedIn, org staff pages) for **Marcus
      Whiten** (claimed WaPo AI lead — real person is Phoebe Connelly),
      **Matt Penneyacker** (claimed GNI program officer — no verifiable
      match), or **Jeremy Sleight** (claimed Hugging Face advocate — no
      trace at all). Also, **Charlie Warzel's role was outdated** — he's
      moved from NYT Opinion to The Atlantic (Galaxy Brain newsletter).
      Fixed: Whiten → Phoebe Connelly (real, verified via Nieman Lab);
      Penneyacker and Sleight dropped rather than force in a weak
      replacement; Warzel's role and link corrected. Independently
      re-verified every remaining URL live before use (all 200 except
      Nieman Lab, which 403's on direct curl — a bot-blocking pattern
      seen repeatedly this session on real, active sites, not a dead
      link).
- [x] **Look beyond big-name newsrooms**: added 3 real, verified
      small/mid-size newsroom leaders — Simon Galperin (The Jersey Bee,
      small NJ nonprofit), Angela Eichhorst (CT Mirror), Matt Boggie
      (Philadelphia Inquirer, built "Dewey").
- [x] **New content added**: 3 critical voices (Emily M. Bender, Safiya
      Umoja Noble, Karen Hao) and 3 human-centered-AI designers (Don
      Norman, Ben Shneiderman, Fernanda Viégas), all verified.
- [x] **Structural pivot mid-build**: while wiring up the new
      "Critical Voices & Designers" section as its own 7th roster
      section, the user proposed something better — collapse the whole
      page (all 6 people/resource categories) into **one unified,
      filterable table** with a Type column and filter pills, rather than
      many separate sections. Confirmed scope (everything in one table;
      collapse to one section) before rebuilding, given how costly the
      infinite-scroll guess-wrong/rebuild cycle was earlier the same day.
      Built as `.resource-table` + `.filter-pills` + new
      `docs/js/type-filter.js` (29 rows, 8 filterable types) — see
      [ADR 0015](adr/0015-filterable-type-table.md). TOC collapsed from
      7 entries to 2 in both files. Proactively added the `tr[hidden]`
      CSS fix this time (same bug class as the roster-row failure) and
      verified the whole interaction with Playwright before calling it
      done — worked correctly on the first try.
- [x] Extended `project/scripts/check-slide-parity.js` to count `<tr
      data-type="...">` rows — it had a real blind spot for table-based
      content (silently read as "no issues" the first run, since neither
      of its old checks could see table rows at all). Re-ran after the
      fix; Topic 4 confirmed clean, only the two pre-existing Topic 5/7
      mismatches remain (still not fixed, per the user's "haven't gotten
      there yet" instruction from Batch 7).
- [x] Added a `resources.html` Day 1 link to the new unified table,
      per the user's request.

---

## Infinite-scroll roster — built, debugged, then abandoned in favor of Slides pagination

Full arc, in order:

1. Built `docs/js/infinite-roster.js` (progressive reveal via
   `IntersectionObserver`) for Topic 3's two long rosters — see
   [ADR 0013](adr/0013-infinite-scroll-roster.md).
2. User reported it wasn't working (all rows displayed immediately).
   Diagnosed and fixed a real bug: `.roster-row`'s explicit `display:
   grid` was overriding the `hidden` attribute's default `display: none`.
   Verified the fix with an actual headless-Chrome session via
   Playwright (available in this environment) rather than trusting
   curl/HTML-structure checks, which can't catch a rendering bug like
   this — confirmed progressive reveal working (4→9, 4→11 rows) with
   simulated continuous scrolling.
3. Applied follow-up design feedback on the same component: removed the
   "Scroll for more examples…" sentinel text, framed the module with a
   border + `--surface` background.
4. **User still reported it not working, even in a private/incognito
   window** — ruling out caching. Real cause: on a sufficiently tall
   viewport, the sentinel is already inside the `IntersectionObserver`'s
   trigger zone the instant the page loads, so the "reveal on scroll"
   logic fires immediately in a fast cascade — no scrolling was ever
   needed to see everything, which is indistinguishable from "scroll
   doesn't work."
5. User clarified the actual goal was about the **Slides deck** getting
   too long, not the Overview page (which scrolls fine regardless), and
   said scroll didn't have to be the mechanism. **Pivoted**: Overview
   reverted to a plain roster (no special handling needed); the Slides
   deck's two long rosters split into continuation slides (`s2`/`s2b`,
   `s3`/`s3b`/`s3c`) using the deck's existing pagination instead. See
   [ADR 0014](adr/0014-slides-pagination-for-long-rosters.md), which
   supersedes 0013. Deleted `infinite-roster.js` and its CSS entirely —
   none of it shipped as a working feature.
6. Along the way, discovered Topic 3's Slides deck had silently drifted
   from item-level parity with Overview (5 items shown vs. Overview's
   9/11) — a real inconsistency with how Topics 1–2 always mirrored every
   item (just with condensed wording). Fixed by adding all the same new
   examples to Slides, condensed. Built
   `project/scripts/check-slide-parity.js` per the user's request for a
   repeatable way to catch this going forward — compares `.roster-row`/
   `<li>` counts between each topic's Overview and Slides files,
   understands the new continuation-slide pattern from ADR 0014. Running
   it immediately surfaced two more pre-existing mismatches on
   not-yet-reviewed topics (logged above, not fixed yet per the user's
   explicit "we haven't gotten past use cases" instruction).

### Batch 10 — Topic 5 (Project Ideation)

Applies to `docs/day-1/05-project-ideation.html` and
`docs/day-1/slides/05-project-ideation-slides.html` unless noted.

- [x] **s1 "The Design Process Is Circular" made actually circular**: new
      `.process-wheel` CSS component (rotate/translate/counter-rotate
      technique, 7 items at 51.43° apart, dashed ring, mobile falls back
      to a stacked list) — see [ADR 0016](adr/0016-circular-process-diagram.md).
      Verified visually with Playwright (screenshot + programmatic
      overlap check across all 7 items) rather than trusting the CSS by
      eye, at both desktop and mobile widths, and inside the Slides
      deck's more cramped per-panel layout.
- [x] Added a citation on the same lede: Nielsen Norman Group's "Design
      Thinking 101" — verified live, cleanest match to the 7-step cycle
      of the sources researched (Double Diamond, Stanford d.school, IDEO,
      and Lean Startup's Build-Measure-Learn were also checked; NN/g was
      the clearest prose match).
- [x] s2 "Start here" first question broadened: "What frustrates you
      about how journalism works (or could work)?" → "...how you access,
      share, or create information?" — both files.
- [x] "Get Specific" split out into its own section (s3), with new
      framing language: the earlier questions are "ways into a problem
      space," not something to answer perfectly yet; specificity is the
      destination, not the starting expectation; forming a hypothesis
      (next section) is one way to start closing that gap. Also fixed a
      **pre-existing** Slides/Overview parity gap while restructuring
      this section — Slides had always been missing several Start Here/
      Go Deeper questions and the entire "Think about scale" subsection
      (this is the same mismatch flagged back in Batch 7's site-wide
      scan; addressed now that the review reached this topic).
- [x] Removed "Reality Check," "Case Studies," and "Key Takeaways"
      sections entirely — both files.
- [x] Workshop Activity revised: now explicitly tells students to
      revisit the project idea they brought into the session and
      reformulate it via the exercise, and adds a closing line that
      surfacing gaps during reformulation is normal — those are places
      for more research, not a problem.
- [x] **Architecture resolved**: presented 3 options (Google Form +
      published-CSV cards / custom serverless + database / skip digital
      collection); user chose the Google Form approach specifically
      because it needs no backend, keeping the site's static architecture
      intact and not pulling Phase 2 (paused since project start) forward.
      See [ADR 0017](adr/0017-project-ideas-google-form.md).
      **Built**: an embedded-form section in Workshop Activity (Overview
      only — not the Slides deck, since submitting isn't a presentation
      action), a new `day-1/project-ideas.html` cards gallery, and
      `docs/js/project-ideas.js` (dependency-free CSV fetch + parse +
      render, header-keyword column matching so minor question rewording
      doesn't break it). **Not built by Claude, needs a human**: the
      actual Google Form and Sheet require a Google account to create —
      shipped with two literal placeholder strings
      (`REPLACE_WITH_GOOGLE_FORM_EMBED_URL` in the iframe,
      `REPLACE_WITH_PUBLISHED_CSV_URL` in the JS) that fail visibly with
      a clear message rather than silently, verified via Playwright.

### Batch 11 — Topic 7 (AI Tools)

Applies to `docs/day-1/07-ai-tools.html` and
`docs/day-1/slides/07-ai-tools-slides.html` unless noted. Not implemented —
logged only.

- [ ] Remove **s3 "Quick Reference"** entirely (both files).
- [ ] Remove **s5 "For This Workshop"** entirely (both files) —
      supersedes the earlier plan (logged in "Day 1 schedule & Claude
      Desktop pivot" below) to update this section's required-tools list
      for the Claude Desktop pivot; it's being deleted, not reworked, so
      that item is marked resolved/superseded there.
- [ ] **s2 "The Broader Landscape"** tool listings (7 categories, ~25
      tools) move out of this page into `resources.html`. Keep **s4
      "Evaluating a New Tool"** as-is — user says it's useful.
- [ ] Page reframes around two things going forward: evaluating new tools
      (existing s4 content) and **familiarizing yourself with a new
      tool** — this second angle isn't written yet; scope/content TBD
      before implementation.
- [ ] **Open implementation questions, not yet resolved:**
  - Where exactly "The Broader Landscape" lands in `resources.html` needs
    a format decision. Note this is a different case than
    `resources.html`'s established pattern so far (Phase 5: link out to
    genuinely useful *external* compilations we wouldn't host ourselves)
    — this is ~25 tools across 7 categories the site itself authored, not
    an outside link. Options: embed inline, build it as a filterable
    table like People to Follow's, or keep it a dedicated page linked
    from Resources. Not decided.
  - TOC/section numbering for `07-ai-tools.html` shrinks from 5 sections
    to 2 — renumbering question, same open item already flagged for
    People to Follow's removal above.
  - `schedule.json`'s AI Tools duration (currently 30 min) will very
    likely shrink given the content cut — folds into the Day 1 retiming
    already blocked on other content-boundary decisions.
- [ ] **Resolves Adiel's PR #1 note #21** ("tool comparison table risks
      feeling like a wall of information that goes stale fast... consider
      simplifying toward general advice") — moving the volatile tool
      roster to Resources (easier to keep current independently) while
      keeping the in-session lesson durable (an evaluation skill, not a
      point-in-time list) is exactly the fix she was pointing at.

---

## Collaborator feedback — Adiel, PR #1 (2026-08-07)

Adiel (co-instructor) opened
[PR #1](https://github.com/AndrewRCalderon/2026-ai-news-innovation-workshop/pull/1)
"Day 1 feedback" from a private fork, adding
`project/feedback/adiel-2026-08-07.md` — notes from clicking through the
live Day 1 pages. **Not merged**; digested into requirement items below.
**Not implemented, logged only**, same workflow as the review batches
above.

The PR also included a `Logistics` section on Claude account
billing/provisioning (credit-card reimbursement via a card-masking
service, CUNY's Microsoft AI subscription decision) —
**intentionally excluded from this log**, per instruction not to bring
subscription/billing specifics into `main`. That topic (student Claude
accounts need to be provisioned somehow before Day 1) still exists, but
its resolution lives in conversation with Adiel, not in this repo.

### Big-picture items (Adiel's top 4)

- [x] **Day 1 timing** — independently confirms the schedule decision
      already logged above (10am–5pm with breaks; the current
      9am–5:45pm build needs condensing). No new information, just
      corroboration from a second source.
- [ ] **VS Code vs. Claude Desktop** — already being tracked above, but
      Adiel's note adds a real wrinkle: she describes a Claude Desktop
      interface where you switch between "cowork" and "claude code" via a
      tab, with panels for MCPs/skills/scheduled tasks, and says it's now
      comparable to Codex's interface and "feels like Notion" — closer to
      what students should be comfortable with than raw VS Code.
      **"Cowork" isn't a term I can independently confirm as an official
      Claude Desktop feature name** — her notes were dictated, so it may
      be shorthand or a transcription artifact. Verify the actual current
      UI/feature names before writing session content around it.
- [ ] **How much GitHub to teach — conflicts with the "GitHub Desktop
      only" decision logged above.** Adiel suggests going further: use
      Claude Desktop's GitHub connector (MCP) to handle fork/PR directly
      from inside Claude Desktop, possibly bypassing GitHub Desktop and
      the terminal entirely, so the only concepts students need are
      "fork" and "PR." Needs a decision before Fork & Submit gets
      rewritten — GitHub Desktop (already logged) or the Claude Desktop
      connector (Adiel's newer suggestion). Cross-referenced in the
      Fork & Submit bullet above.
- [ ] **Pre-class email content** — to be finalized between you and Adiel;
      she wants to send it by end of week. Related existing items: the
      setup-page checklist-with-submit-button idea (#1 below) and the
      "who are you building for" pre-workshop framing question (#18
      below).

### Cross-cutting patterns Adiel flagged

Named across multiple notes; specifics logged per-page below with note
numbers for traceability back to the PR:

- Jargon students may not have yet (e.g. "your OS," "no ML background
  needed," "AGI," "weights anyone can run locally").
- Sources/examples that have aged out (some 3–5 years old) — a general
  concern beyond the specific items flagged below.
- A few sections zoom to industry-level abstraction before students have
  footing, or present a dichotomy before students form their own view
  first.
- Several "AI can't do X" claims read more absolute than current
  capability actually supports.

### Setup guide (`/setup.html`)

- [x] **Implemented 2026-08-11**: `/setup.html` is now Day 1 only, split
      into its own standalone page — see "Setup pages split for shipping"
      below for the full change. Its install steps are real interactive
      checkboxes (`.field-notes.is-interactive-checklist`, `checklist.js`)
      with a live "N of 7 steps checked off" counter. **No submission
      step** — consistent with the "no Google Form right now" decision
      from the revision-pass above; if a completion-tracking mechanism is
      wanted later, it should use whatever lightweight approach gets
      chosen for problem-statement submissions, not a one-off Google Form
      here.
- [ ] (#2) Add screenshots for install steps. **Not implemented — needs a
      human.** I can't produce real UI screenshots of Claude Desktop,
      VS Code, or GitHub; this needs someone to actually take them and
      drop them in. Applies to both `/setup.html` (Day 1) and
      `/setup-day-2.html` (Day 2).
- [x] **Implemented**: terminal/Git is already fully out of Day 1 (the
      Claude Desktop pivot removed it entirely, not just de-emphasized
      it). On Day 2, where Git still appears, softened the framing —
      added an explicit "if you're not comfortable with a command line,
      that's fine" line before the terminal step rather than presenting
      it as a bare requirement.

### Day 1 — State of AI

- [x] **Implemented 2026-08-11.** (#4) 2022 added as a fourth chip in the
      timeline strip, matching 1995/2007/2010; "1,000,000" became "1M" in
      the big stat display rather than literally "1 million" — spelling
      it out clashed with that component's numeral-styled design
      (`tabular-nums`, huge mono font), so "1M" was the readability fix
      that didn't break the component. Flagging this as a judgment call,
      not a literal application of the suggestion.
- [x] **Implemented.** (#5) Two-part fix: (1) `citations.js` now derives
      the source-site name from the citation URL's hostname for every
      citation link sitewide (`sourceLabel()` — e.g. "mckinsey.com ↗"
      instead of "Source ↗"), a systemic fix, not a per-page one. (2)
      Added month/year to State of AI's citation hover notes, derived
      confidently from each URL itself (arXiv ID month-year encoding,
      URL date-slugs) rather than guessed — e.g. arXiv `2509.04664` →
      Sept 2025. Skipped one citation (Dario Amodei's essay) where no
      date could be derived this way.
- [x] **Implemented.** (#6) AlexNet's 2012 entry reworded for a general
      audience (exact 15.3%/26.2% figures moved into the citation hover,
      not the visible prose); GPT-3's few-shot learning explanation moved
      from a citation tooltip into visible text (this also resolves an
      old pending item from Batch 3 — "GPT-3 introduces few-shot
      learning" was flagged there as unexplained). Timeline extended past
      2022 with two new entries covering the agentic escalation
      (computer use + Operator, 2024–2025; Skills + Cowork, 2025–2026),
      using dates verified by a research agent against primary sources —
      see the research summary below. **Images not added — needs a
      human**; I can't source/produce real images to embed responsibly.
- [x] **Implemented.** (#7) Split into two clearly separated groups: "Who's
      Building It" (tech giants/specialized/open-source — the model
      layer) and "Who's Using It in Journalism" (large + small newsrooms
      — the application layer), so newsrooms no longer read as parallel
      to OpenAI/Google/Meta.

### Day 1 — Industry Conversation

- [x] **Implemented.** (#8) Added a "Before You Look" prompt box asking
      students to generate their own list of disagreements before the
      prepared dichotomies list is shown, reframing it from a presented
      board of tensions into an activity.
- [x] **Implemented.** (#9) Pulled the labor-disruption line out of a
      trailing sentence into its own pull-quote, sharpened to name coding
      as the clearest current example of "work changes, doesn't
      disappear." Written as directional framing, not backed by a
      specific stat — didn't want to fabricate a number under time
      pressure.
- [x] **Implemented.** (#10) Retitled rather than reordered — "The Tech
      Industry Conversation" → "The Scaling Debate" (its actual, narrower
      scope) and "Skeptics vs. Optimists" → "The Bigger Picture: Skeptics
      vs. Optimists," with a line explicitly noting it's a wider, separate
      split from the scaling one right before it. Resolves the "which
      optimists/skeptics is this" confusion without needing to move
      content around.
- [x] **Implemented.** (#11) Reuters entry enriched with the angle Adiel
      was actually pointing at (Fact Genie was already on the page) — AI
      built into "Leon," Reuters' daily CMS (headline suggestions,
      summaries, error detection), plus the 6–8 second alert-speed stat.
      The Zapier/no-code example went into Use Cases (#12/#13 below)
      instead of here, since it's a concrete deployed example matching
      that section's pattern more than this page's policy/culture focus.

### Day 1 — Use Cases

- [x] **Implemented.** (#12) Legal example replaced: Harvey AI (142,000+
      legal professionals, ~half the Am Law 100, used for discovery —
      the direct parallel to document-heavy reporting Adiel wanted).
      Added a new **Finance** row (Mastercard's fraud-detection model,
      ~1 trillion data points, <50ms per transaction) rather than folding
      it into Legal, since Adiel raised it as a distinct example. UPS
      ORION/Logistics **dropped rather than replaced** — the research
      agent couldn't find a comparably well-sourced current alternative
      (candidates traced only to secondary SEO/consultant blogs, not
      primary sources), so this followed the site's existing pattern of
      dropping weak citations rather than forcing one in (see Batch 9).
- [x] **Implemented.** (#13) Customer service and Content moderation rows
      now explicitly note they're also business-side newsroom tools, not
      purely "outside" journalism, with an intro line on the section
      making the same point generally.
- [x] **Implemented.** (#14) Both flagged claims softened: investigative
      reporting now says AI can help with *pieces* of the process (cross-
      referencing the Data Journalism/Records & FOIA rows above it) even
      though it can't do the whole thing; the real-time item reframed
      from "can't do real-time" to "the cutoff is a workflow problem, not
      a hard wall," while keeping the real, narrower limitation (it can't
      verify a live source itself).
- [x] **Implemented.** (#15) Added "finding needles in haystacks — pattern
      recognition, lead generation" as its own line in the Works When
      column, and reframed "speed matters more than perfection" into
      "you need an 'at least this many' count, not an exhaustive one" —
      Adiel's exact framing.
- [x] **Implemented.** (#16) Reframed exactly as suggested: "does this need
      original judgment *every single time* — or can I design the
      process so judgment only happens on a smaller, surfaced set?"
- [x] **Added, not in Adiel's original list**: a new "No-code automation"
      row using Simon Galperin's Zapier-based Bloomfield Information
      Project (research-verified) — this is where the Zapier use case
      from #11 landed. **Flagging a real overlap**: Simon Galperin is
      already cited on People to Follow for the same underlying
      small-newsroom-automation story (The Jersey Bee). Cross-referenced
      the two entries explicitly rather than hiding the duplication —
      worth a look to confirm that's the right call rather than swapping
      in a different example.

### Day 1 — People to Follow

- [x] **Implemented.** (#17) Added an "Employer" column across all 27 rows
      (derived from each entry's existing, already-verified "what to
      know" text — not new research; org/publication rows get "—" since
      Employer doesn't apply). Karen Hao recategorized from "Critic" to
      "Journalist." Added the Tow-Knight Center's Substack, "(Re)Structured
      News" by Gina Chua — URL and current focus (AI's impact on
      journalism) confirmed by the research agent.

### Day 1 — Project Ideation

- [ ] (#18) Still open — clarify who students are building for before the
      "what frustrates you" prompts. Now applies to Problem Statement's
      "Finding a Problem Worth Solving" section post-restructure, not the
      original Project Ideation page (which no longer exists under that
      name — see Product Discussion above).
- [x] (#19) No action needed — hypothesis section well-received as-is.
- [ ] (#20) Still open — solo vs. pairs. **Partially resolved by the
      revision pass above**: Product Discussion (the idea-sharing part)
      is confirmed group; Problem Statement (the hypothesis/goal part) is
      confirmed individual-then-share-out. Adiel's underlying "should
      this be solo" question is answered for Problem Statement; Product
      Discussion being a group activity was a separate, explicit user
      decision, not derived from Adiel's guess.

### Day 1 — AI Tools

- [x] Already resolved earlier (Batch 11) — tool list moved to
      `resources.html`, session content simplified to evaluating +
      familiarizing. See above.

### Research agent findings applied above (2026-08-11)

A second background research agent verified: Cowork's research-preview
date (Jan 12, 2026, TechCrunch) and GA date (April 9, 2026); Skills'
launch date (Oct 16, 2025, official Anthropic post); Harvey AI's
adoption/valuation figures; Mastercard's fraud-detection stats; the
Bloomfield Information Project/Zapier case study; the Leon CMS/Fact Genie
speed stat; and the Tow-Knight Substack URL. Full findings with every
source URL and confidence level aren't persisted elsewhere — if a
citation needs re-verification later, the research would need to be
re-run rather than pulled from a saved report.

### Use-case currency rule clarified, and applied — 2026-08-11

User clarified the actual rule after reviewing the earlier "old sources"
list: sources cited as **historical facts or terminology** (AlexNet's
2012 win, "filter bubble" coined in 2011, IDx-DR's 2018 "first
FDA-authorized" milestone) are fine to stay old — the date *is* the
point. Sources cited as **live use cases** (claiming a practice is
ongoing/current) need to meet Adiel's "avoid 2023 or earlier" bar. A
third research agent checked the two remaining flagged examples against
this:

- [x] **AP's automated earnings reports — dropped entirely** (Industry
      Conversation's "Associated Press" row and Use Cases' "Routine news"
      row, both Overview + Slides). No citable 2024–2026 source exists
      confirming current scale, vendor, or even that AP still runs this
      the way the 2015 source describes — the automation vendor
      (Automated Insights/Wordsmith)'s current marketing has pivoted
      entirely to sports/betting content, a real signal the original
      arrangement may not reflect AP's current state. Followed the site's
      existing house rule (drop rather than force in a weak citation —
      see Batch 9, UPS ORION above) rather than keep it caveated as
      historical, since Use Cases' own framing explicitly claims these
      are "real, deployed use cases, not theoretical ones."
- [x] **Chequeado's Chequeabot — updated, not dropped.** Strong current
      sourcing exists (Chequeado's own May 2024 and Sept 2025 posts
      confirm it's still active, in production, and expanded since 2016
      to cover podcasts and dozens of channels). Also **corrected a
      real understatement**: the "1 in 5" figure from the old 2019
      source is stale on the *low* side — Chequeado's own reporting
      suggests roughly half of certain fact-checks now originate there.
      Rewrote to "roughly half... and growing" rather than asserting a
      precise current percentage I don't have.

### "Claude-speak" / tone pass — sample on State of AI, 2026-08-11

User flagged that Adiel's original PR feedback included a note this
project's own digest had dropped: some passages "read very claude-speak."
Combined with new guidance from the user directly: descriptions
shouldn't sound absolute; the voice should be **thoughtful and
constructively skeptical**, grounded in concrete examples, with a sense
of **curiosity and insight** rather than declarative hype. User asked for
a sample pass on State of AI first, to approve the direction before it
rolls out further — **approved, "sounds a bit better," asked to extend
it across the whole page** (done, both rounds, Overview + Slides, 7
spots total):

- Opening lede rewritten — cut "one of the most consequential technology
  shifts in decades" and "suddenly accessible to everyone" (unverifiable
  superlatives), replaced with a grounded framing that names the
  hype-vs-reality tension directly instead of only asserting the hype
  side.
- "Faster than any app in history" → "one of the fastest consumer
  product launches ever" (defensible; the original was an unverified
  superlative).
- "Impossible three years ago" → "far beyond what these models could do
  three years ago" (defensible; "impossible" overclaimed).
- "Everyone's tool" / "anyone could pick up" → "most people have at
  least tried" / "millions of people were actually trying" (removed
  unsupported absolutes; the second rewrite deliberately ties to the
  1M-in-5-days stat right below it instead of asserting an unsupported
  "most people," which the site's own later Pew citations don't actually
  support for year one).
- AlexNet/2012 entry: "this is where the modern AI boom actually starts"
  (flat causal claim) → reframed into an observation with more curiosity
  — "the shifts that turn out to matter most rarely look big while
  they're happening."
- Landscape section closer: "expect the landscape to keep shifting"
  (filler) → named the actual pattern (new capability arrives, then
  months pass before anyone knows what to do with it) instead of a
  generic closing line.
- "Essential" (stakes-for-you) → "turning into a basic job skill" —
  echoes s4's own "AI is a tool in your kit now, the way Google Docs or
  Slack is" framing instead of introducing new absolute language.
- **Not yet done**: same treatment on Industry Conversation, Use Cases,
  and People to Follow — holding for explicit go-ahead per the
  sample-first workflow the user asked for.

---

## Site-wide color palette alignment (new initiative — 2026-08-06)

User wants this site's color palette to feel *related to* their personal
site (andrewrcalderon.com) without being identical — same family, used
differently. This touches the shared root CSS variables in
`docs/css/style.css` (and their aliases in `docs/css/briefing.css`), so
it's sitewide and ADR-sized, not a page-level tweak. Not started —
logged only.

**Current workshop palette** (`docs/css/style.css`): purple `#9b7ebd` /
purple-dark `#6b4a7f`, orange `#f4a460` / orange-dark `#d97e2a`, cream
`#f5f1e8`, text `#2c2c2c`/`#666`.

**Personal site's actual palette**, pulled directly from
`andrewrcalderon.com/styles/custom.css` (not guessed):

- Purple (dominant accent, 23 uses): `rgb(149, 90, 245)` / `#955AF5` —
  notably more vivid/saturated than the workshop's muted lavender.
- Coral-red (2nd accent, 18 uses): `#E8664A` — warm, but reads as
  coral/red rather than the workshop's sandy orange.
- Near-black text: `rgb(48, 47, 47)` / `#302F2F`.
- Teal (secondary accent, 9 uses): `#1D8B8A` — **not present at all** in
  the workshop's current palette.
- Cream background: `#FFFBEF` — close in spirit to the workshop's own
  `#f5f1e8`, already similar.
- Darker purple variant: `rgb(109, 60, 200)` / `#6D3CC8`.
- Gold accent (minor use): `rgb(252, 185, 2)` / `#FCB902`.
- Light purple tints (backgrounds/borders): `#f3edff`, `#F8F5FF`,
  `#D4C8F8`.
- Dark navy (minor use): `#0D2B3A`.

**Observation**: both sites already independently land on a
purple+warm-accent+cream trio, which makes "related but not identical"
very achievable — e.g., shift the workshop's purple hue closer to the
personal site's more vivid violet while keeping it a distinct shade, warm
the orange toward coral without matching `#E8664A` exactly, and consider
introducing the teal as a new tertiary accent the workshop site doesn't
currently have. Needs a proposed derived palette (with actual hex swatches
for approval) before touching any CSS variables — not done yet.

---

## Day 1 schedule & Claude Desktop pivot (new initiative — 2026-08-11)

User is auditing Day 1 at the structural level — schedule shape and tool
stack — separate from the per-page copy batches above. Not implemented —
logged only, per the review workflow (organize first, implement once the
user says go).

### Schedule structure (applies to all three days going forward)

- [ ] Standard day shape: **10:00 AM–1:00 PM, 1-hour lunch, 2:00–5:00 PM**.
      `schedule.json`'s Day 1 times are already flagged "PLACEHOLDER"; this
      replaces that placeholder. Day 2/3 haven't been reviewed against this
      rule yet.
- [ ] **One 15-minute break in the morning only.** No afternoon break — the
      afternoon is hands-on.
- [x] **Resolved 2026-08-11 — final Day 1 timing, approved after two rounds
      of preview**:

      ```
      10:00  State of AI              15 min
      10:15  Industry Conversation    30 min
      10:45  Use Cases                30 min
      11:15  Break                    15 min
      11:30  Product Discussion       90 min   (was Project Ideation)
      1:00   Lunch                    60 min
      2:00   Problem Statement        40 min
      2:40   AI Tools                 15 min
      2:55   Explore Claude Desktop   55 min   (was Explore Tech Stack)
      3:50   Fork & Submit            25 min
      4:15   Project Assignments      45 min
      5:00   END
      ```

      Afternoon math: original session lengths totaled 250 min against a
      180-min budget. User chose to protect Project Assignments (hands-on
      buddy build time) and trim Explore Claude Desktop instead, over the
      reverse. "Nudge & Check-in" (previously a 15-min slot after 5:30pm)
      is **dropped as a separate scheduled item** — no room under the hard
      5pm end; fold a brief nudge into Project Assignments' close if
      wanted.
- [x] **Implemented 2026-08-11**: `docs/data/schedule.json` rewritten with
      the table above. Verified valid JSON and matches the approved times
      exactly.

### Remove "People to Follow" as a scheduled session

- [ ] Drop `day-1/04-people-to-follow` from `schedule.json`'s session list
      (frees ~15 min + its slot).
- [ ] Keep the page itself live at its current URL — it becomes
      resource-only, not a numbered/timed session. `resources.html`
      already links to it (`#s2`); that link keeps working since the file
      doesn't move.
- [ ] Day 1 index timeline, topic-metadata prev/next links, and the
      numbered TOC sequence (05→10) all need renumbering once this session
      drops out of the sequence — whether to renumber files 05–10 down to
      04–09, or leave a numbering gap, not yet decided.

### Project Ideation / Problem Statement split

- [x] **Resolved 2026-08-11**: "Project Ideation" (`05-project-ideation.html`)
      is **renamed "Product Discussion"** and becomes a pure discussion of
      students' own project ideas — no problem-solving framework content
      at all. It's a **group activity**.
- [x] **Resolved**: all of the problem-solving framework content moves to
      the post-lunch "Problem Statement" session
      (`06-problem-statement-discussion.html`, currently a placeholder):
      Finding a Problem Worth Solving (s2), Get Specific (s3), Form a
      Hypothesis (s4), Articulate Your Goal (s5), and the Workshop
      Activity exercise + Google Form submission (s6). Problem Statement
      is **individual work, then share out** as a group.
- [ ] "The Design Process Is Circular" (s1, the process-wheel) — which
      session it frames still isn't decided. Given Problem Statement now
      owns the whole framework arc (questions → hypothesis → goal →
      exercise), it likely belongs there as the opening frame rather than
      in Product Discussion — not yet confirmed.
- [ ] File rename still open: does `05-project-ideation.html` get renamed
      to match "Product Discussion" (e.g. `05-product-discussion.html`),
      or keep its filename with just the on-page title/nav label changed?
      Ties into the broader Day 1 renumbering question above.

### Day 1 tech stack: Claude Desktop instead of Claude Code/VS Code

- [ ] Day 1's hands-on tool session (currently `08-explore-tech-stack.html`)
      reworks around **Claude Desktop**: the app itself (not the Claude
      Code CLI/VS Code extension), giving Claude access to local files, and
      Claude Desktop's **GitHub integration/connector** (not VS Code's
      Source Control panel).
- [ ] **Confirmed 2026-08-11**: page renamed/refocused from "Explore Tech
      Stack" to an "Explore Claude Desktop" framing — a live,
      instructor-guided walkthrough of the Claude Desktop environment in
      the classroom, with **special emphasis on the code environment**.
      Exact title text and section-by-section roadmap not drafted yet —
      s1 (Why This Session), s2 (Session Roadmap), and s6 (How They Work
      Together) all need to be rewritten from scratch for Claude Desktop
      rather than moved, since they currently describe the VS Code/Claude
      Code/GitHub workflow directly (distinct from s3–s5 below, which
      relocate to Day 2 largely as-is).
- [x] **Research complete (background agent, 2026-08-11) — verifies and
      corrects Adiel's "cowork" description.** Sourced against official
      Anthropic docs (`code.claude.com/docs/en/desktop`,
      `claude.com/docs/cowork/overview`, `support.claude.com`), high
      confidence:
      - **"Cowork" is real**, not a mishearing. Claude Desktop has three
        tabs: **Chat**, **Cowork**, and **Code**. Cowork is an agentic
        workspace for document/research/spreadsheet-style work (attach
        "workspace folders," step away, come back to a deliverable) — it
        is **not** IDE-like (no file editor, no terminal, no diff view).
        **Code** is the actual coding surface and genuinely is
        VS-Code-like: file editor, integrated terminal, diff viewer with
        inline comments, multi-session sidebar, PR creation/monitoring —
        same engine as the Claude Code CLI. **This session's "special
        emphasis on the code environment" should center on the Code
        tab**, using Cowork/Chat only as needed for file access and
        connectors.
      - **Filesystem access**: Cowork uses "workspace folders" (folder
        picker, scoped access); the Code tab uses a "Project folder"
        (same unscoped model as opening a folder in VS Code); Chat/either
        tab can also add a filesystem **Connector**.
      - **"Customize" panel confirmed real** — single place for
        connectors/skills/plugins; **`/schedule`** or the Cowork sidebar
        for scheduled tasks (runs remotely, even laptop closed). Adiel's
        description of this was accurate.
      - **Hard constraint for setup/logistics**: both Cowork and Code
        **require a paid plan** (Pro/Max/Team/Enterprise) — not available
        on a free account. Doesn't change any plan (Adiel is already
        arranging paid seats — see the excluded Logistics note above),
        but must land explicitly in `setup.html`'s Day 1 prep.
      - **Windows-specific**: opening the Code tab at all requires **Git
        for Windows** to be installed (Desktop prompts for it). Relevant
        to Day 1 setup regardless of which Fork & Submit path gets
        chosen, since the Code tab itself needs it just to open.
      - Full agent report (with every source URL) isn't persisted
        elsewhere — re-run the research if a citation is needed later
        and isn't summarized here.
- [ ] VS Code walkthrough (s3), Claude Code best-practices/mindset (s4),
      and the VS Code-based GitHub walkthrough (s5) are **not deleted** —
      they move to Day 2, which already plans to introduce VS Code, Claude
      Code, and Git from the code editor. Exact Day 2 slot/page not decided
      yet (Day 2 hasn't been reviewed).
- [x] **Resolved 2026-08-11**: "Fork & Submit" (`09-fork-and-submit.html`)
      **stays on Day 1**, rebuilt entirely around **Claude Desktop's
      GitHub connector (option 2 above)** — OAuth device-flow sign-in via
      Chat/Cowork, no local Git, no `gh`, and explicitly **no GitHub
      Desktop app**. The whole fork → edit → commit → PR flow happens
      conversationally inside Claude Desktop. GitHub Desktop is dropped
      from the plan entirely, not kept as a fallback.
- [x] Superseded — see Batch 11 in the "Full-scale site review" section
      above: user decided to delete `07-ai-tools.html`'s "For This
      Workshop" section entirely rather than update its required-tools
      list.
- [x] **Implemented 2026-08-11**: `setup.html` splits into two labeled
      parts on one page (decided against a separate page, to keep one
      canonical setup URL): **Day 1 Setup** = Claude Desktop app (install,
      sign in, paid-plan note) + a GitHub account (connecting it to Claude
      Desktop is left for the live Explore Claude Desktop session, not
      pre-work). GitHub Desktop dropped entirely. **Day 2 Setup** = VS
      Code, Claude Code extension, Git — carried over close to the
      original pre-pivot content, relabeled as post-Day-1 prep.

## Implementation pass, 2026-08-11 — what actually got built

Everything above in this section is now implemented, not just logged.
Summary of the concrete changes:

- **Renumbered/renamed** all Day 1 Overview + Slides files via `git mv`
  (history preserved): `04-people-to-follow` → `people-to-follow` (dropped
  from the numbered sequence, kept as a resource, removed from the nav
  dropdown); `05-project-ideation` → `04-product-discussion`;
  `06-problem-statement-discussion` → `05-problem-statement-discussion`;
  `07-ai-tools` → `06-ai-tools`; `08-explore-tech-stack` →
  `07-explore-claude-desktop`; `09-fork-and-submit` → `08-fork-and-submit`;
  `10-project-assignments` → `09-project-assignments`.
- **`schedule.json`** rewritten with the approved Day 1 table; Day 2/3
  still placeholder.
- **`nav.html`, `resources.html`, `setup.html`, `project-ideas.html`**
  updated for the new paths/names.
- **Content rewritten**: Product Discussion (pure group discussion, no
  framework), Problem Statement (absorbed the full framework arc,
  upgraded from a placeholder to the briefing template, got a new Slides
  deck), AI Tools (trimmed to Evaluating + a new Familiarizing section),
  Explore Claude Desktop (fully rebuilt around Chat/Cowork/Code per the
  research findings), Fork & Submit (rebuilt around the GitHub connector,
  no GitHub Desktop). All six got matching Slides decks, kept in parity —
  verified with `project/scripts/check-slide-parity.js` (clean run).
- **`resources.html`** gained a new "AI Tools Landscape" section (the
  migrated tool categories) — implemented as a plain categorized list,
  not a filterable table, to match the page's existing simple style.
- Verified: valid JSON, every internal Day 1 link resolves to a real
  file, every `data-session-id` matches its `schedule.json` id, slide
  parity checker clean, HTML tag balance spot-checked.

**One honest caveat, not verified**: Fork & Submit's copy describes
asking Claude to bridge a local Code-tab project folder into a fork via
the GitHub connector, and Explore Claude Desktop describes Cowork
"handing off" to a Code session. The research confirmed the GitHub
connector's read/write capabilities and that Cowork *can* orchestrate
both local files and connectors, but didn't verify the exact click-by-
click mechanics of that hand-off. **Recommend walking through this flow
firsthand in Claude Desktop before teaching it live** — the concepts
should hold, but the precise UI steps might not match exactly.

### Revision pass, 2026-08-11 (round 2) — user reviewed the implementation

User reviewed the pages above and came back with corrections, applied
directly (not just logged):

- [x] **Product Discussion**: "The Design Process Is Circular" moved out
      entirely, into Problem Statement (see below) — Product Discussion
      is now just 2 sections (Why We Start Out Loud, Workshop Activity).
      Cut the "Good ideas rarely survive first contact with an empty
      room" line as a platitude; user's broader note: **avoid platitudes
      in the copy generally**, not just here. s1 reframed to plainly
      remind students they brought an idea in and we want to hear it, no
      flourish. Workshop Activity rewritten as literal instructions
      instead of vague description: students go around the room; since
      most will have brought more than one idea, they pick the one
      they're most excited about and talk about just that one; the group
      asks questions and reacts afterward.
- [x] **Problem Statement**: gained "The Design Process Is Circular" as
      its new opening section (s1), reframed to say the group did the
      first two steps this morning in Product Discussion and now it's
      individual work through the rest — same wheel, same citation, just
      relocated and reworded for the new context.
- [x] **No submission mechanism for now.** The Google Form
      embed/iframe and the "Submit Your Problem Statement" exercise-box
      are removed from Problem Statement entirely — **tabled, not
      cancelled**. User floated a possible lighter-weight future version
      (drop into a CSV held in the repo, surfaced somehow) instead of
      wiring up an actual Google Form, but explicitly does not want that
      built now either. `docs/day-1/project-ideas.html` and
      `docs/js/project-ideas.js` (the cards-gallery infrastructure from
      [ADR 0017](adr/0017-project-ideas-google-form.md)) are **left in
      place but now fully unlinked** — no page links to them anymore.
      Revisit ADR 0017 if/when a submission mechanism actually gets
      built, since the CSV-in-repo idea is a different architecture than
      what's there now.
- [x] **Explore Claude Desktop**: "How It All Works Together" kept (not
      deleted) but reworked into **"Building Is a Loop, Too"** — no
      longer a straight line ending at "Shipping." Now a 7-step
      `.process-wheel` (same circular component as the Design Process
      wheel, deliberately — visual callback to the same idea): Ideation →
      Planning → Building → Reviewing → Testing → Iterating (hinge) →
      Repeat. Shipping (commit + PR via the GitHub connector) is now a
      separate line noting it happens "whenever you're ready," not a
      forced final step in the loop — that's what Fork & Submit actually
      covers.
- All changes mirrored in both Overview and Slides for the three
  affected pages; re-ran `check-slide-parity.js` (clean) and re-verified
  JSON/link/tag-balance/`data-session-id` integrity after this round —
  all clean.

### Setup pages split for shipping, 2026-08-11

User needs to send students a link to Day 1 setup imminently, so
`/setup.html` had to stop being a two-day combined page and become a
single-purpose, shippable URL.

- [x] **`/setup.html` is now Day 1 setup only** — the page that's
      actually going out. Title/H1 changed to "Day 1 Setup" so a
      standalone shared link is unambiguous about scope. Confirmed no
      other page expected Day 2 content to live at this URL (`index.html`,
      `nav.html`, `footer.html`, and Explore Claude Desktop's two "do
      setup first" links all just say "(pre-workshop) setup," which
      still holds true).
- [x] **New page `/setup-day-2.html`** — the former "Day 2 Setup" half,
      moved wholesale, same content. **Not linked from nav or footer, and
      not hyperlinked from `/setup.html` either** — `/setup.html` mentions
      it exists in plain (non-clickable) text ("you'll get that link
      closer to Day 2") so students don't go looking for it early. It's
      fully built and live at its URL now, ready for whenever it needs to
      go out.
- [x] Both pages verified: tag balance, checkbox count matches the static
      "N of 7" / "N of 10" fallback text, all sitewide links still resolve
      to `/setup.html` correctly (grep-verified, none pointed at Day 2
      content).

### Downstream, not yet touched

- [ ] `STUDENT_CLAUDE_GUIDE.md` (still unwritten, Phase 5) will need to
      reflect Claude Desktop for Day 1 vs. Claude Code for Day 2 once
      drafted.
- [ ] Adiel's 21 per-page content notes (logged in the "Collaborator
      feedback" section above) — in progress, see next section.
- [ ] Day 2 hasn't been otherwise touched — it still needs the VS Code /
      Claude Code / Git content that moved out of the old Explore Tech
      Stack, plus its own schedule retiming against the 10–1/lunch/2–5
      rule.

---

## Change log

- 2026-08-06 — Implemented most of Batches 1–4 from the full-scale site
  review (Topic 1 "State of AI" content edits, plus two template-level
  fixes applied across all 8 existing slide decks: removing the
  `cover-hint` and replacing the `-30-` end slide with a Restart/Back-to-
  schedule/Next-section nav block). Ran a background research agent to
  verify the ChatGPT "1M users in 5 days" stat, identify the 2012
  benchmark (AlexNet/ImageNet), and find real training-data-lawsuit and
  newsroom-AI examples — findings folded into the relevant copy as plain
  text (see research findings entry above). Explicitly **not** built:
  the interactive citation/footnote (superscript + popover) system the
  user has asked for three times now — still needs its own design pass,
  since it touches the shared briefing template. Also not yet done:
  home-page style harmonization, student-submission flow testing, Day 1
  index summary/learning-outcomes, and the "Caveat" column content-depth
  pass — all still open in the batches above.
- 2026-08-04 — Requirements log created from the approved build plan. Phase 1
  scaffold (structure, partials, base CSS, page skeletons, deploy config)
  completed in the same session.
- 2026-08-04 — Shifted focus to frontend/content per instruction; paused
  Phase 2 (backend proxy) and the remaining Vercel-connection item. Built
  `schedule.json`, the timeline system, and all 6 Day 1 topic pages plus
  stub Day 2/3 index pages. Verified locally with a static file server —
  all key routes return 200.
- 2026-08-04 — User supplied real content for Day 1/Topic 1 ("State of AI").
  Designed a distinct template for content-rich topic pages via Artifact
  prototypes (long-form scroll → paginated deck → combined with a mode
  toggle), approved by the user, then shipped it as `docs/css/briefing.css` +
  `docs/js/briefing.js` and wired into `day-1/01-state-of-ai.html` with the
  real content. See [ADR 0010](adr/0010-briefing-template.md) for the
  self-contained-nav tradeoff this required.
- 2026-08-04 — User asked to bring back the original scrolling design as the
  landing page and move the deck to a linked "Slides" subsection instead of
  a runtime toggle. Split into `day-1/01-state-of-ai.html` (Overview, shared
  nav restored, reuses `topic-metadata.js`) and
  `day-1/slides/01-state-of-ai-slides.html` (Slides, paginated deck only).
  Deleted `briefing.js`; added `docs/js/deck.js` and `docs/js/reveal.js`;
  simplified `briefing.css` accordingly. See
  [ADR 0011](adr/0011-split-overview-and-slides.md).
- 2026-08-04 — User supplied the real Day 1 schedule; it revealed the
  existing `schedule.json` was missing the project-ideation cluster (group
  conversation, problem statement/hypothesis/goal, a nudge/reminder) and had
  "AI Tools" undersized (45 min instead of the actual 2 hours). Corrected
  `schedule.json`: moved Project Ideation before lunch, added a new
  post-lunch "Problem Statement Discussion" and "Project Assignments"
  session (1hr, workshop-buddy pairs), added a non-linked "Nudge & Check-in"
  checkpoint (same pattern as Break/Lunch — `url: null`), and fixed AI Tools
  to 120 min. Renumbered `06-ai-tools.html` → `07-ai-tools.html` to keep
  filenames in chronological order; added placeholder pages
  `06-problem-statement-discussion.html` and `08-project-assignments.html`;
  updated `nav.html`'s Day 1 dropdown to match. Day 1 is now 8 linked topics
  (was 6) — total topic-page count across the site is 22 (was 20).
- 2026-08-04 — Retimed the Day 1 morning block per user direction: State of
  AI (15 min), Industry Conversation (30 min), Use Cases (30 min), People to
  Follow (15 min unchanged), two 15-min breaks, and Project Ideation
  expanding to fill the rest of the 9:00 AM–1:00 PM block (now 120 min,
  intentionally long for now per the user — "that's ok for now"). Lunch
  shifts to 1:00–2:00 PM, cascading the whole afternoon ~15 min later
  (Problem Statement Discussion 2:00 PM → Nudge & Check-in 5:30 PM). Worked
  out interactively with the user before writing to `schedule.json`.
- 2026-08-04 — User supplied real content for Day 1 Topics 2–4 (Industry
  Conversation, Use Cases, People to Follow) and built them on the same
  briefing-overview template as Topic 1 — no new CSS/JS needed, the existing
  component vocabulary (roster, compare-grid, field-notes, stakes,
  pull-question) covered all three. Also: Industry
  Conversation's type corrected `discussion` → `lecture`; "Problem Statement
  Discussion" renamed to "Problem Statement" (the type badge already says
  "discussion," redundant in the title); Day 1's headline changed to "Day 1:
  State of the Art & Experimentation" (`schedule.json` + `day-1/index.html`).
- 2026-08-04 — Added Slides companions for Topics 2–4
  (`day-1/slides/02-industry-conversation-slides.html`,
  `03-use-cases-slides.html`, `04-people-to-follow-slides.html`) plus the
  "Open the slides →" CTA on their Overview pages, matching Topic 1's
  pattern exactly — no new CSS/JS. Decided every content-complete topic gets
  a Slides page going forward, not a per-topic call. Caught and fixed a
  staleness bug this surfaced: Topic 1's slides page still showed the old
  "45 MIN" after the schedule retiming; see the new task above about
  `deck.js`'s static cover-meta.
- 2026-08-04 — User supplied real content for Day 1 Topics 5 (Project
  Ideation) and 7 (AI Tools) — the two densest topics so far. Both built as
  Overview + Slides pairs on the existing template with no new components:
  reused `.history` (originally built for chronological timelines) for two
  sequential-steps diagrams — the circular design process and the
  build/test/ship workflow — since a numbered step sequence is the same
  shape as a timeline. Reused `.exercise-box` (from the old generic
  template, defined in `style.css`) for the Project Ideation workshop
  activity, since briefing pages already load `style.css` first. AI Tools'
  tool-landscape section links tool names to their real URLs from the
  source doc. Day 1 is now 6/8 topics with real content; only Problem
  Statement and Project Assignments remain placeholders.
- 2026-08-06 — Added a new Day 1 session, "Explore Tech Stack," right after
  AI Tools, per user direction: AI Tools shrinks from 120 to 30 min, and the
  freed 90 min goes to the new session (30 + 90 = 120, so nothing downstream
  in the afternoon shifts). Renumbered `08-project-assignments.html` →
  `09-project-assignments.html` to make room; new
  `08-explore-tech-stack.html` scaffolded as a generic-template placeholder
  (content deferred — user is writing it separately). Updated
  `schedule.json` and `nav.html`. Flagged the likely content overlap this
  creates with AI Tools' existing workshop-stack section — see the task
  above.
- 2026-08-06 — Resolved that overlap: moved "Your Workshop Tech Stack" and
  "How They Work Together" out of `07-ai-tools.html`/its slides into
  `08-explore-tech-stack.html`, which now has real content instead of a
  placeholder. Added a facilitator roadmap the user asked for — a
  time-boxed plan for the 90-minute session (VS Code 20 min → Claude Code
  45 min → GitHub 25 min, confirmed with the user) rendered via the
  `.history` steps component, plus a "basics checklist" per tool (what to
  demo/have people do, not narrative prose) for VS Code, Claude Code, and
  GitHub. AI Tools renumbered down to 5 sections; both pages' slide/section
  counts and TOCs updated to match. No new CSS/JS — same component
  vocabulary throughout.
- 2026-08-06 — Split tool setup from tool walkthrough per user direction:
  `docs/setup.html` now has real, self-serve install instructions (VS Code,
  Claude Code, GitHub, opening them together inside VS Code, a
  verify-you're-ready step) instead of the original 5-bullet stub — this is
  the page sent to students before Day 1, so it's written assuming no
  instructor is present to help, plus a short reassurance line for anyone
  who gets stuck. `08-explore-tech-stack.html` (and its slides) had install
  steps removed accordingly and now link back to `/setup.html`; its Claude
  Code section was reframed from a basics checklist to best-practices/
  mindset content (be specific, use Plan Mode, read every diff, treat
  surprises as information) — the user's reasoning being that the real way
  to learn an agentic tool is to use it, so guardrails plus practice beats
  a checklist. `setup.html` now loads `briefing.css` alongside `style.css`
  to reuse its field-notes/roster styling, without adopting the full
  masthead/TOC/slides-cta template scaffolding (it isn't a schedule-tied
  topic page).
- 2026-08-06 — Reworked `setup.html`'s GitHub section for readers with no
  command-line experience: separated the Git-vs-GitHub concepts up front,
  added GitHub Desktop as the recommended no-terminal path (direct Git
  install stays as the alternative for anyone comfortable with one), linked
  GitHub's own setup docs for anyone who wants more depth, and noted that
  Claude Code can run git commands on a student's behalf once it's set up —
  so this step is about installing accounts/apps, not learning git syntax.
  Adjusted the "Verify You're Ready" step to branch by which path was
  taken, since GitHub Desktop's bundled Git isn't reliably on the system
  PATH (`git --version` isn't a valid check for that path).
- 2026-08-06 — Added a new Day 1 session, "Fork & Submit" (40 min,
  hands-on), between Explore Tech Stack and Project Assignments, funded by
  shrinking Project Ideation from 120 to 80 min. Because the new block sits
  in the afternoon while the time comes from late morning, Project
  Assignments and Nudge & Check-in land on the exact same clock times as
  before (4:30 PM / 5:30 PM) — everything between them shifted 40 min
  earlier, most visibly lunch (1:00 PM → 12:20 PM). New
  `09-fork-and-submit.html` + slides cover what a fork is, forking the real
  repo, cloning it, branching, and the commit/push/PR submission mechanics
  — content that used to be one unexplained bullet in Explore Tech Stack's
  GitHub Walkthrough, which is now trimmed to generic Git/GitHub mechanics
  only, with a forward-reference to the new session. Renumbered
  `09-project-assignments.html` → `10-project-assignments.html`.
  Confirmed and used the real repo URL
  (`github.com/AndrewRCalderon/2026-ai-news-innovation-workshop`)
  throughout, which also resolved the long-standing `setup.html` TODO about
  linking `STUDENT_CLAUDE_GUIDE.md` (see the note above — that file itself
  still needs to be written before setup.html actually goes out).
