# Content architecture notes — for Day 1, once we get there

A running log of patterns worth carrying into Day 1's rewrite, pulled
from what actually changed during the Day 2/3 line-by-line pass (not
theory, observed edits). Add to this as the pass continues; it's meant
to get read once, before Day 1 starts, not maintained like
REQUIREMENTS.md.

## Patterns observed so far (2026-08-20, from Day 2's edit pass)

- **Deks get trimmed to one punchy sentence.** Several two-sentence deks
  (setup + payoff) got cut down to just the setup, or just the hook,
  losing the "why this matters" half. Worth deciding up front for Day 1:
  one sentence by default, and treat a second sentence as something that
  has to earn its place, not a habit.
- **Citation density vs. conciseness is a real tension, not yet
  resolved.** The heaviest edits (02-prompting §2, 05-goal-plan-mode §2)
  cut sourced evidence in favor of shorter, more declarative claims,
  sometimes leaving the citation behind attached to a claim it no longer
  fully supports. This isn't necessarily wrong, a lighter citation touch
  may read better, but it needs to be a deliberate call per page, with
  the Sources list updated to match, not a byproduct of trimming for
  length. Decide this on purpose for Day 1 rather than letting it happen
  page by page.
- **Named sub-headings help structure question lists.** Adding
  `### Self Reflection` above a bullet list of reflection questions
  (01-debrief) is a small change that makes the list's purpose legible
  at a glance. Worth doing by default anywhere a section is mostly
  self-directed questions.
- **Workshop-specific grounding reads well.** "For this workshop, you
  don't have to start blank," "Your instructors will circulate" — tying
  generic advice to the specific room and moment, rather than leaving it
  abstract. Worth doing more of this in Day 1, which currently leans
  more general/theoretical than Days 2-3.
- **Voice is drifting toward more spoken/facilitator tone in spots** —
  first person plural ("let's switch to Plan mode"), the occasional
  exclamation point — against the otherwise declarative, no-exclamation
  narrator voice used everywhere else. Not necessarily wrong, but it's
  drifting inconsistently rather than by decision. Worth explicitly
  choosing a voice for Day 1 instead of letting it emerge page by page.
- **Fast editing drops small consistency details**: `Claude.md` vs.
  `CLAUDE.md`, its/it's, subject-verb agreement. Not a content
  observation so much as a process one: a quick consistency pass (grep
  for known trip-wires like inconsistent `CLAUDE.md` capitalization)
  before implementation catches these cheaply.

## How to use this for Day 1

Before starting Day 1's line-by-line pass, read this file and make the
undecided calls above explicitly (citation density, voice) rather than
letting them vary page to page the way they did during Day 2's pass.
