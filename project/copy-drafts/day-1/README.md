# Day 1 copy drafts — cross-page notes

Read this once before starting the line-by-line edit pass, per
`project/content-architecture-notes.md`'s own ask: "make the undecided
calls above explicitly (citation density, voice) rather than letting
them vary page to page." Individual hotspots are also flagged inline
(as `<!-- HTML comments -->`) in the files they occur in — this file is
the cross-page summary, not a replacement for those.

## Voice — the biggest gap

Two pages bake first-person-plural directly into a section **heading**,
not just body prose: `01-state-of-ai.md` §1 ("The Moment We're In") and
`04-product-discussion.md` §1 ("Why We Start Out Loud"). This isn't a
find/replace fix — it's a real choice between keeping that
facilitator-voice framing or moving to the declarative, no-exclamation
narrator voice used everywhere else on the site. Smaller first-person-
plural instances also show up in `02-industry-conversation.md`,
`05-problem-statement-discussion.md`, and `07-explore-claude-desktop.md`
(each flagged inline) — deciding the heading-level cases first will
probably settle these too.

## Citation density — probably fine as a rule, but not yet stated as one

`01-state-of-ai.md` (24 citations) and `03-use-cases.md` (25 citations)
are heavily sourced; the five activity/how-to pages
(`04-product-discussion.md`, `06-ai-tools.md`, `07-explore-claude-desktop.md`,
`08-fork-and-submit.md`, plus `05-problem-statement-discussion.md` at 1)
are essentially citation-free by nature of their content. Worth stating
explicitly as "explainer pages are sourced, activity pages aren't"
rather than trimming citations page by page during the edit.

## Bare self-directed question lists

Four spots have a question list with no named sub-heading (compare to
Day 2's `01-debrief.md`, which added `### Self Reflection` above its
equivalent list): `02-industry-conversation.md` §5, `03-use-cases.md`
§6, `05-problem-statement-discussion.md` §3, `06-ai-tools.md` §2. Lowest-
risk fix of the four patterns here — each just needs a sub-heading if
you want the same treatment.

## Workshop-specific grounding

Thin on the explainer pages — `01-state-of-ai.md`, `02-industry-conversation.md`,
`03-use-cases.md`, and `people-to-follow.md` all read generic/theoretical
throughout, no "this room" language. Strong on the hands-on pages —
`04-product-discussion.md`, `07-explore-claude-desktop.md`, and
`08-fork-and-submit.md` already tie advice to the actual session flow.
If you want more of this on Day 1 (per content-architecture-notes.md's
observation that Day 1 leans more general/theoretical than Days 2-3),
the explainer pages are where it's missing.

## Consistency trip-wires

None found in Day 1 — no `Claude.md`/`CLAUDE.md` capitalization drift,
its/it's errors, or subject-verb slips (the pattern that showed up during
Day 2/3's pass). Worth confirming this stays true rather than assuming
it's solved, since the edit pass itself could introduce new ones.

## Where each page already lands relative to these patterns

Closest to a consistent target: `07-explore-claude-desktop.md`,
`08-fork-and-submit.md` (clean voice, strong grounding, no bare lists).
Furthest: `01-state-of-ai.md` (voice baked into a heading, heaviest
citation load) and `02-industry-conversation.md` (mixed voice, a bare
list, thinnest grounding of the explainer pages).
