# Day 1 copy drafts — cross-page notes

Read this once before starting the line-by-line edit pass, per
`project/content-architecture-notes.md`'s own ask: "make the undecided
calls above explicitly (citation density, voice) rather than letting
them vary page to page." Individual hotspots are also flagged inline
(as `<!-- HTML comments -->`) in the files they occur in — this file is
the cross-page summary, not a replacement for those.

## Voice — resolved for 01/02, still open for 04/05/07

**Update, 2026-08-21**: `01-state-of-ai.md` and `02-industry-conversation.md`
were rewritten from scratch (research-first, not a prose pass) and both
now use the declarative narrator voice throughout. §1's heading changed
from "The Moment We're In" to "The Moment"; the scattered first-person-
plural instances in `02` ("we're building AGI," "we'll put your list on
the board") are gone. **Still open**: `04-product-discussion.md` §1
("Why We Start Out Loud") is the same heading-level call, untouched by
this pass, plus smaller instances in `05-problem-statement-discussion.md`
and `07-explore-claude-desktop.md` (each flagged inline). Now that both
heading-level cases have a real precedent (declarative won), that's the
default to apply when `04` gets its own pass.

## Citation density and currency — both handled in the 01/02/03 rewrite

`01-state-of-ai.md` (24 citations) and `03-use-cases.md` (25 citations)
are heavily sourced; the five activity/how-to pages
(`04-product-discussion.md`, `06-ai-tools.md`, `07-explore-claude-desktop.md`,
`08-fork-and-submit.md`, plus `05-problem-statement-discussion.md` at 1)
are essentially citation-free by nature of their content. That split
("explainer pages are sourced, activity pages aren't") held up fine as
an implicit rule and didn't need restating as an explicit one.

**New rule that did need stating, added during the 2026-08-21 rewrite**:
any citation making a claim about *current* AI behavior, accuracy, or
error rates needs to be from 2023 or later, since older tools don't
represent today's. Citations about historical *events* (a launch date, a
lawsuit filing) are exempt, since the deliberate historical timeline in
`01`'s §3 depends on going back further (2012 AlexNet, 2014 AP's
Wordsmith automation). Three stale 2019-2021 capability citations in
`03-use-cases.md` §3 were swapped for 2023+ equivalents under this rule
(AAE content-moderation bias, speech-recognition racial disparity,
Copilot code-vulnerability rate). Worth applying the same 2023+ check
when `04`-`08` get their own research pass.

## Bare self-directed question lists

**Resolved in `02` and `03`**: `02-industry-conversation.md` §5 is now
"### Questions Without Settled Answers" and `03-use-cases.md` §6 is now
"### Questions to Ask Before Reaching for AI" (matching Day 2's
`01-debrief.md` pattern, `### Self Reflection` above its equivalent
list). **Still open**: `05-problem-statement-discussion.md` §3 and
`06-ai-tools.md` §2. Lowest-risk fix of the patterns in this file, each
just needs a sub-heading.

## Workshop-specific grounding

**Resolved in `01`/`02`/`03`**: all three now lean on named, dated
newsroom incidents and adoption data (Sports Illustrated, CNET, Gannett,
BBC Eye, Cody Enterprise, Ars Technica, AP's Wordsmith automation, plus
Reuters Institute/WAN-IFRA/University of Maryland survey and
measured-adoption data) instead of reading generic/theoretical. Split
deliberately across the three pages so no incident or stat repeats: see
each file's own note on this. **Still thin**: `people-to-follow.md`,
untouched by this pass.

## Consistency trip-wires

None found in Day 1 as of the original pass, no `Claude.md`/`CLAUDE.md`
capitalization drift, its/it's errors, or subject-verb slips (the
pattern that showed up during Day 2/3's pass). The 2026-08-21 rewrite of
`01`/`02`/`03` was checked the same way (grepped for em-dashes in prose
and first-person-plural in headings) and came back clean. Worth
confirming this stays true for `04`-`08` rather than assuming it's
solved project-wide.

## Where each page already lands relative to these patterns

**Updated 2026-08-21**: `01-state-of-ai.md` and `02-industry-conversation.md`
were the furthest-behind pages as of the original audit (voice baked
into a heading, thinnest grounding, one uncited claim) and are now
likely the *closest* to the target after their research-first rewrite.
`03-use-cases.md` was already close (concrete, named, well-cited in §2-3)
and is now fully there after §4-6 picked up the same treatment.
Remaining furthest from target: `04-product-discussion.md` (voice still
unresolved) and `06-ai-tools.md` (bare list, thin citation base per the
count above), neither touched by this pass.
