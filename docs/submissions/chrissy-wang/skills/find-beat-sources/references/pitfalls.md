# How this goes wrong

Every entry below is a real failure, observed while building and testing this method
across Chicago (housing), Philadelphia (city politics) and Houston (business) on
2026-08-25. They are recorded with the actual case because the abstract version of each
warning is easy to nod along to and hard to act on.

The pattern connecting most of them: **the output looked completely normal while being
wrong.** None of these announced themselves.

---

## 1. One story becomes the whole beat

**What happened.** Running Houston + business, only one exemplar article could be
fetched — a dispute between two airlines. The reverse-engineering worked perfectly and
produced: United Airlines, Frontier Airlines, United's CEO, the FAA, the Department of
Transportation, an airline complaint database.

Every one of those really was a source for that story. The error was treating one story
as if it were a beat. The report gave no indication anything was wrong.

**What to do.** Count the exemplars before trusting the pattern. Fewer than three, or
all from one newsroom, and the list reflects those specific stories rather than the
beat — **say so at the top of the output**, in the reader's language, not as a footnote.

A thin list labelled thin is useful. A thin list presented as a beat briefing is worse
than nothing, because the reporter will build a routine on it.

---

## 2. Liveness is not correctness

**What happened, twice.**

Searching for "Chicago Housing Authority" returned `chicago.gov` — the city's main
portal, not the CHA (`thecha.org`). A news feed scoped to that domain came back fresh,
busy and correctly parsed. Its top headlines were a house-music festival and a Bears
uniform launch. Because it was recent and high-volume, **it scored highest of
everything tested** while being the wrong institution publishing the wrong subject.

Separately, "Philadelphia Board of Ethics" resolved to `chicago.gov` — the wrong city
entirely — and passed the identity check, because the check tolerated one missing word
and the page happened to contain "ethics".

**What to do.** Verify three things separately, because they fail separately:

- **Reachable** — did it fetch and parse?
- **The right institution** — every distinctive word of the name should appear on the
  site. Do not tolerate a missing one; a missing *place* word is the strongest possible
  sign you are looking at the wrong city.
- **The right subject** — what share of the headlines are actually on the beat? Include
  the beat's vocabulary in any search-based feed query, or an agency feed will return
  everything that agency does. A sheriff's office feed without beat terms returns drug
  arrests and extraditions, not the eviction data the housing reporter came for.

Volume and freshness are the weakest signals of the three, and they are the ones that
naive ranking rewards.

---

## 2b. The right institution, in the wrong city

**What happened.** Testing Detroit + public transit, the list came back with **City of
Flint** — twice. Flint is a different city, seventy miles away.

Every check passed, and that is the point. The site really is the City of Flint's; the
name really does match; the feed really is live. Nothing in the pipeline ever asked the
question that mattered: *is this institution in the place the reporter asked about?*

Flint almost certainly appeared because an exemplar article mentioned it — Michigan
transit coverage moves between cities — and nothing downstream questioned it.

**What to do.** Check the institution against the **requested place**, separately from
checking it against its own website. When a name contains a place word that is not the
requested place, that is a flag worth raising rather than silently accepting.

Be careful not to over-correct: plenty of legitimate sources are named for a different
administrative unit than the city — Cook County for Chicago, a state department of
transportation for any city in it, a regional transit authority spanning several
municipalities. The test is not "does the name match the city" but "does this body have
jurisdiction over, or responsibility for, the place asked about". When unsure, keep it
and say why it might not belong, rather than dropping it silently.

## 3. Search engines are the wrong tool for finding an official website

**What happened.** Both errors above came from search results. The fix was Wikidata's
official-website property (`P856`), which returned `thecha.org` for the CHA and
`phila.gov` for the Philadelphia ethics board — correct in both cases where search was
wrong.

**What to do.** Try Wikidata first for any named institution. It is structured data
maintained for exactly this purpose, and it is not rate-limited.

**But know the limit**: of five local bodies tested, only two had entries. National and
city-level institutions are usually present; county clerks, municipal boards and
neighbourhood organisations often are not. So Wikidata is a first stop, never the only
one — and **the absence of an entry says nothing about whether the institution is real.**

---

## 4. The model is not really the hallucination risk here

**What happened.** The whole method was designed around the assumption that asking a
model to name institutions would produce invented ones. Measured across three cities,
**close to 100% of proposed institutions turned out to be real** — verifiable, with
their own websites.

The real errors were the ones above: correct institution, wrong website; correct
website, wrong subject.

**What to do.** Spend verification effort on *identity and relevance*, not on existence.
And treat "does this exist" as a three-way answer rather than true/false:

- **confirmed** — a structured registry has an entry for it
- **probable** — a site was found and it names the institution
- **unverified** — neither, which is honest; calling it fake would not be

---

## 5. Where readers go for help is not where reporters look

**What happened.** Chicago housing articles ended with rental-assistance portals and
legal-aid hotlines. These were extracted as "sources the reporter used". They are
useful to a *reader* in trouble; they tell a reporter nothing.

The tell was structural: both were identified only by a bare web address rather than an
organisation name.

**What to do.** Ask whether the article is *telling its audience where to get help*. If
so it is not a source. A "source" whose only identifier is a URL is usually one of
these.

---

## 6. The same institution under several names, and the same feed under several URLs

**What happened.** "Cook County Sheriff's Office" and "Cook County sheriff's office"
counted as two institutions, which made a cross-source agreement metric meaningless.
Separately, `/feed`, `/feed/`, `/news/feed` and `/blog/feed` are four different strings
that redirect to one document — one organisation appeared four times in a ranked list,
and another five.

**What to do.** Compare institution names as **word sets**, ignoring case, punctuation
and word order. Deduplicate feeds by their **contents** — a fingerprint of the item
titles — not by their URL strings. And cap how many feeds any one institution
contributes, so a single body cannot crowd out the beat.

---

## 7. Quiet failures in the plumbing

**What happened.** A search endpoint began rate-limiting mid-session (HTTP 202 with an
"anomaly" notice). The pipeline reported "0 articles found" and carried on producing a
normal-looking report. "Search is blocked" and "the web has nothing" are indistinguishable
downstream and mean opposite things.

**What to do.** Distinguish *blocked* from *empty*, and make blocked loud enough to stop
the run. A result built on a step that silently didn't happen is the most expensive kind
of wrong, because nothing about it looks wrong.

---

## 8. Relevance scoring catches noise but not category errors

**What happened.** `American Community Survey` — a national census dataset — scored well
on a Chicago housing list because its headlines contain housing vocabulary. It is not a
place to watch for what happened this week; it is a reference dataset.

**What to do.** On-beat share filters noise, not type errors. Ask separately whether a
source has a *"what happened recently"* character at all. Reference datasets,
methodology pages and research archives can be enormously useful to a reporter without
belonging in a monitoring list.
