# Project Dissonance — Specification

Version 0.1 · Day 2 of the AI News Innovation Workshop

This is the source of truth. The Skill that does the analysis is checked against
this document, not the other way around. If the two disagree, this file is right
and the Skill is broken.

---

## 1. Purpose

**Problem.** Fractured groupthink benefits the few and exploits the many. It
works because the techniques doing the fracturing are invisible to the person
being persuaded — they sit in plain view inside the sentence, and most readers
move straight past them because nobody ever pointed at them.

**Hypothesis.** If I use AI to name the specific persuasion techniques in a news
story and quote the exact language doing the work, then a reader will be able to
see how a piece is trying to move them — separately from what it is telling them
— for readers who take in news from a single source and don't notice the
technique.

**The bet.** Naming is the active ingredient. Not fact-checking, not rating bias
on a left–right dial, not telling anyone what to conclude. Once a reader can say
"that's agent deletion," they can't fully un-see it in the next article, and that
transfers across topics and outlets in a way a single fact-check never does.

---

## 2. What it does

Input: the text of one news article.

Output: that article separated into three layers.

### Layer 1 — Fact

Every verifiable assertion, pulled out on its own, paired with the source that
would confirm or break it.

A claim belongs here if a person could in principle go and check it. "Grocery
prices rose 3.1% last month" qualifies. "Families are struggling" does not — that
is an evaluation, and it belongs in Layer 2.

### Layer 2 — Persuasion

Each detected technique, reported with four parts:

| Part | What it is |
|---|---|
| `technique` | A name from the fixed taxonomy in section 3. Never an invented label. |
| `span` | The exact text doing the work, copied verbatim from the input. |
| `mechanism` | One sentence on how it moves the reader. |
| `neutral` | A rewrite of that span with the technique removed and the factual content preserved. |

### Layer 3 — Actionable

What the reader can go do about it: the specific dataset, filing, or question
that would settle what the article implies but doesn't assert.

This layer exists so that noticing leads somewhere. Without it the tool teaches
readers that everything is manipulation, which is the opposite of the goal.

---

## 3. The taxonomy

The detector works from this fixed list. A technique not on this list is not
reported. The list can grow between versions; it cannot grow mid-analysis.

### 3.1 Priority set — build these first

These three are the most common in economic coverage and the most mechanical to
detect, which makes them the right place to start.

**`agent-deletion`** — An action is described without the actor who performed it.
Detection cues: passive voice with no "by" phrase; a transitive act written
intransitively ("prices rose" rather than "retailers raised prices"); a verb
turned into a noun so the actor disappears ("the hike," "the increase").

**`loaded-language`** — Affective words carrying an evaluation the cited evidence
doesn't support. Detection cue: remove the adjective or noun and ask whether any
factual content was lost. If nothing was lost, the word was doing emotional work.

**`implied-causation`** — Two facts placed side by side so the reader draws a
causal line the sentence never asserts, and therefore never has to defend.
Detection cues: "despite," "while," "as," "even as," "amid" joining two
independent claims.

### 3.2 Rhetorical and framing moves

**`appeal-to-fear`** — Consequence framing that inflates likelihood or severity
beyond what the evidence states.

**`false-dilemma`** — Two options presented as exhaustive when others exist.

**`bandwagon`** — Popularity offered as evidence of correctness.

**`whataboutism`** — A charge deflected by raising a different one instead of
answering it.

**`straw-man`** — An opposing position restated in a weaker form than anyone
holds, then refuted.

**`selective-attribution`** — Who gets named, quoted, or granted anonymity, and
who doesn't. Detection cue: named sources on one side, unnamed or absent on the
other.

**`us-them-sorting`** — Language that assigns the reader to a group and places
another group opposite them.

**`nominalization`** — A process turned into a thing, which removes both actor
and timing. Closely related to `agent-deletion`; use `agent-deletion` when an
actor is specifically hidden, `nominalization` when the process itself is
obscured.

### 3.3 Influence principles (Cialdini)

**`authority`** · **`social-proof`** · **`scarcity`** · **`reciprocity`** ·
**`consistency`** · **`liking`** · **`unity`**

Report these when the article uses the principle to make a claim more persuasive
than its evidence warrants — not merely when a credentialed source is quoted.
Quoting an economist is normal reporting. Quoting an economist *instead of*
presenting the data is `authority`.

---

## 4. Requirements

What has to be true when this is finished.

1. Accepts pasted article text and returns all three layers.
2. Every Layer 2 finding names a technique from section 3.
3. Every Layer 2 finding quotes a span that appears **verbatim** in the input.
4. Every Layer 2 finding includes a neutral rewrite that preserves the factual
   content of the original span.
5. Each finding carries a confidence value of `high`, `medium`, or `low`, per the
   rule in section 5.4.
6. Output is emitted as structured data so a display layer can be built on it
   later without re-running the analysis.
7. The same article analyzed twice produces substantially the same findings.

---

## 5. Constraints

What must not happen.

### 5.1 No unsupported flags

No span, no flag. If the analysis cannot quote the exact text doing the work, the
finding is dropped rather than described in the abstract. This is the single most
important rule in this document — it is what makes every claim checkable by the
reader.

### 5.2 Silence is a valid result

A neutrally written passage produces zero findings. The tool is not required to
find something in every paragraph, and must not manufacture findings to appear
thorough. A detector that fires everywhere carries no information.

### 5.3 Quoted speech is attributed, not blamed

Persuasive language inside a quotation belongs to the speaker, not the article.
Report it, but mark it as attributed. An article that quotes a politician using
`us-them-sorting` is reporting; an article using it in its own voice is doing it.
Conflating these would flag good adversarial reporting as manipulation.

### 5.4 Confidence is rule-based, not a feeling

- `high` — the span matches a structural cue listed in section 3 (passive without
  agent, "despite" joining two claims, an adjective removable without factual
  loss).
- `medium` — the technique is present but depends on context outside the span.
- `low` — a defensible reading, but another reading is equally defensible.

### 5.5 No verdicts

No bias score, no left–right placement, no trust percentage, no overall rating. A
number invites the reader to accept a conclusion. A named technique with a quoted
span invites them to check. The whole design rests on this distinction.

### 5.6 One flag per span

Overlapping techniques on the same words are resolved to the single strongest
one, so the output stays readable.

### 5.7 No live API dependency

The workshop's shared Claude proxy does not exist yet (`project/adr/0007`), and a
static page cannot call the API without exposing a key. Analysis runs through
Claude Code, and results are saved as files. No key is ever written into this
repository.

---

## 6. Acceptance criteria

How I'll know it's done, rather than started. Each of these can fail.

### 6.1 The discrimination test — the one that matters

Run the tool on a wire report and an opinion column covering the same event.

Measure **flag density**: Layer 2 findings per 100 words.

- **Passes** if the column's density is at least **three times** the wire
  report's.
- **Fails** if the two are within 2×. That result means the tool isn't detecting
  persuasion — it's decorating text, and the hypothesis is wrong as built.

This test is allowed to fail, and a failure is a real finding worth reporting.

### 6.2 Span integrity

Every quoted span appears verbatim in the source text. Checkable mechanically:
search the input for each span; any miss is a defect.

### 6.3 Rewrite fidelity

For each finding, the neutral rewrite preserves the factual claim of the original
span. Spot-checked by hand across at least ten findings.

### 6.4 Control silence

A paragraph of plain statistical reporting — numbers, dates, named sources, no
evaluation — produces zero or near-zero findings.

### 6.5 Stranger comprehension

Someone who has not seen this project understands what the tool is telling them
within roughly thirty seconds of looking at the output, without explanation.

---

## 7. Out of scope for this workshop

- **A public live demo.** Requires the shared proxy from `project/adr/0007`,
  which is designed but unbuilt.
- **Multimodal analysis.** Video, audio, and images are where this eventually has
  to go. Text first, because text can be tested this week.
- **Non-English text.**
- **Proving the tool depolarizes anyone.** That is the thesis behind the project,
  not a claim three days can support. What is testable now is narrower: does it
  find the technique, and does it stay quiet when there isn't one.

---

## 8. Open questions

Not blockers. Recorded so they don't get lost.

- Should Layer 1 attempt verification, or only name the source that would verify?
  Currently the latter — verification is a much larger problem.
- How should the reader view handle an article with fifty findings? Density may
  need a display cap that the analysis itself doesn't have.
- Does the taxonomy need a category for what is *absent* from a story? Omission is
  central to the problem statement but is not a span, and every rule here is
  built on spans.
