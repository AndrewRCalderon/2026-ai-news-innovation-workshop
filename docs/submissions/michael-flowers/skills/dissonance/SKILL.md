---
name: dissonance
description: Analyze a news article for persuasion technique. Splits the text into three layers — verifiable facts, named persuasion techniques with the exact span doing the work, and what a reader can go check. Use when given an article, a passage of news writing, or an opinion column to examine for framing, spin, loaded language, or hidden persuasion.
---

# Dissonance — persuasion detector

Take one news article and separate what it is claiming from how it is selling
the claim. Name the technique, quote the exact words doing the work, and leave
the judgment to the reader.

The specification this implements is `docs/submissions/michael-flowers/SPEC.md`.
Where this file and the spec disagree, the spec wins.

## The point

Naming is the active ingredient. Not fact-checking, not rating bias, not telling
the reader what to conclude. Once someone can say "that's agent deletion," they
can't fully un-see it in the next article.

## Hard rules

These are not preferences. Violating any one of them makes the output worthless.

**1. No span, no flag.** Every persuasion finding must quote the exact text doing
the work, copied verbatim from the input. If you cannot point at specific words,
drop the finding. Never describe a technique in the abstract.

**2. Silence is a valid result.** A neutrally written passage produces zero
findings. Do not manufacture findings to look thorough. A detector that fires
everywhere carries no information. Returning "nothing found" for a plain wire
report is a correct answer and a good one.

**3. Quoted speech is attributed, not blamed.** Persuasive language inside a
quotation belongs to the speaker, not the article. Report it with
`"attributed": true`. An article that quotes a politician using us/them language
is reporting. An article using it in its own voice is doing it. Never conflate
these — it would flag good adversarial journalism as manipulation.

**4. Use only the taxonomy below.** Never invent a technique name. If something
feels manipulative but matches no category, leave it out and note it under
`unclassified` with the span.

**5. One flag per span.** When techniques overlap on the same words, report the
single strongest one.

**6. No verdicts.** No bias score, no left–right placement, no trust percentage,
no overall rating. A number invites the reader to accept a conclusion; a named
technique with a quoted span invites them to check.

## The three layers

### Fact
Every verifiable assertion, on its own, with the source that would confirm or
break it. A claim qualifies if a person could in principle go check it.
"Grocery prices rose 3.1% last month" qualifies. "Families are struggling" does
not — that is an evaluation and belongs in Persuasion.

### Persuasion
Each finding has: `technique`, `span` (verbatim), `mechanism` (one sentence on
how it moves the reader), `neutral` (the span rewritten with the technique
removed and factual content kept), `confidence`, `attributed`.

### Actionable
The specific dataset, filing, or question that would settle what the article
implies but doesn't assert. This layer exists so noticing leads somewhere.
Without it the tool just teaches readers that everything is manipulation, which
is the opposite of the goal.

## Taxonomy

### Priority set — check these first

**`agent-deletion`** — An action described without the actor who performed it.
Cues: passive voice with no "by" phrase; a transitive act written intransitively
("prices rose" not "retailers raised prices"); a verb turned into a noun so the
actor vanishes ("the hike," "the increase").

**`loaded-language`** — Affective words carrying an evaluation the evidence
doesn't support. Cue: remove the word and ask whether factual content was lost.
If nothing was lost, it was doing emotional work.

**`implied-causation`** — Two facts placed side by side so the reader draws a
causal line the sentence never asserts, and therefore never has to defend. Cues:
"despite," "while," "as," "even as," "amid" joining two independent claims.

### Rhetorical and framing moves

**`appeal-to-fear`** — Consequence framing inflating likelihood or severity past
the evidence.
**`false-dilemma`** — Two options presented as exhaustive when others exist.
**`bandwagon`** — Popularity offered as evidence of correctness.
**`whataboutism`** — A charge deflected by raising a different one.
**`straw-man`** — An opposing position restated weaker than anyone holds it, then
refuted.
**`selective-attribution`** — Who is named, quoted, or granted anonymity, and who
isn't. Cue: named sources on one side, unnamed or absent on the other.
**`us-them-sorting`** — Language assigning the reader to a group and placing
another opposite them.
**`nominalization`** — A process turned into a thing, removing actor and timing.
Use `agent-deletion` when an actor is specifically hidden; `nominalization` when
the process itself is obscured.

### Influence principles

**`authority`** · **`social-proof`** · **`scarcity`** · **`reciprocity`** ·
**`consistency`** · **`liking`** · **`unity`**

Flag these only when the principle is used to make a claim more persuasive than
its evidence warrants. Quoting an economist is normal reporting. Quoting an
economist *instead of* showing the data is `authority`.

## Confidence

Rule-based, not a feeling.

- `high` — the span matches a structural cue named above (passive without agent,
  "despite" joining two claims, an adjective removable without factual loss).
- `medium` — the technique is present but depends on context outside the span.
- `low` — a defensible reading, but another reading is equally defensible.

## Output

Write two things.

**1. `analysis.json`** next to the source text:

```json
{
  "source": { "title": "", "outlet": "", "date": "", "wordCount": 0 },
  "fact": [
    { "claim": "", "verifyWith": "" }
  ],
  "persuasion": [
    {
      "technique": "",
      "span": "",
      "mechanism": "",
      "neutral": "",
      "confidence": "high|medium|low",
      "attributed": false
    }
  ],
  "actionable": [
    { "question": "", "how": "" }
  ],
  "unclassified": [
    { "span": "", "note": "" }
  ],
  "density": { "findings": 0, "words": 0, "per100Words": 0.0 }
}
```

`density.per100Words` is `findings / words * 100`, counting unattributed
persuasion findings only. This is the number the discrimination test uses.

**2. A short readable summary** in chat: the count by technique, the two or three
strongest findings with their spans, and the density figure. Do not dump the
whole JSON into chat.

## Verify before returning

Run these checks on your own output. Any failure means fix it, not ship it.

- Every `span` appears verbatim in the input. Search for it. A near-match is a
  defect.
- Every `neutral` preserves the factual claim of its span.
- Every `technique` is on the list above.
- No two findings share a span.
- Nothing in `persuasion` lacks a span.

## Worked example

Input:

> Despite record corporate profits, struggling families now face yet another
> painful hike in grocery prices.

Correct output for the persuasion layer:

```json
[
  {
    "technique": "implied-causation",
    "span": "Despite record corporate profits",
    "mechanism": "Places profits beside prices so the reader infers a causal link the sentence never asserts, and so never has to defend.",
    "neutral": "Corporate profits reached a record in the same period.",
    "confidence": "high",
    "attributed": false
  },
  {
    "technique": "agent-deletion",
    "span": "hike in grocery prices",
    "mechanism": "Prices appear to rise on their own; whoever raised them is absent from the sentence.",
    "neutral": "grocery retailers raised prices",
    "confidence": "high",
    "attributed": false
  },
  {
    "technique": "loaded-language",
    "span": "struggling families",
    "mechanism": "Assigns a condition to the subject that the cited figures do not establish.",
    "neutral": "households",
    "confidence": "high",
    "attributed": false
  }
]
```

Note what is *not* flagged: "record corporate profits" and "grocery prices" are
verifiable claims and belong in the fact layer, not here.

## The discrimination test

When asked to test the detector: run it on a wire report and an opinion column
covering the same event, then compare `density.per100Words`.

- **Passes** if the column is at least 3× the wire report.
- **Fails** if within 2× — the detector isn't detecting, it's decorating.

Report the actual numbers either way. A failure is a real finding, not something
to explain away.
