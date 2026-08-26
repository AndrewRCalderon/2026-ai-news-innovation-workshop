# Architecture — RFC Bot

How it's built and why. What it has to do is in [requirements.md](requirements.md); the order of
work is in [tasks.md](tasks.md).

Last revised 2026-08-26.

## The shape of it

RFC Bot is not an application. It's a **skill plus a build script**, split by what each side is
actually good at.

```
BRIEF.md  ──►  rfc-outreach skill  ──►  drafts.json  ──►  build_drafts.py  ──►  outreach/<slug>/
              (judgment: research,      (the handoff)     (mechanics:            compose.html
               confidence, prose)                          encoding, files)      NN-company.eml
                                                                                 REVIEW.md
                                                                                 tracking.csv
                     │                                                           drafts.json
                     └──► contacts/press-contacts.csv  (persistent, upserted)
```

**The skill holds everything requiring judgment.** Reading the brief, researching each press
contact, assigning confidence honestly, deciding what the reporting shows about a specific
company, writing the prose. It's a markdown instruction file, not code — every design decision
lives in it as a written rule that can be read and argued with.

**The script holds everything that must be byte-identical every time.** Gmail URL encoding,
`.eml` assembly, signature placement, tracking rows, the length warning.

The reason for the split: a model that rewrites a URL-encoder on every run will eventually
produce a subtly broken link, and nobody will notice until a draft opens blank on deadline. A
script, meanwhile, cannot judge whether an address is really Nike's global press desk.

**`drafts.json` is the seam.** The model writes it; the script consumes it. The reporter can
hand-edit it and rebuild without re-running any research — which is also the escape hatch when
the model gets a paragraph wrong.

## Components

| Path | What it is | Owned by |
|---|---|---|
| `BRIEF.md` | Per-story input form: slug, story thesis, recipients, questions, what you have on them, deadline, terms, publication, tone | Reporter |
| `.claude/skills/rfc-outreach/SKILL.md` | The instructions Claude follows. All judgment rules and the email format live here | Both |
| `config/profile.md` | Byline name, title, outlet, email, phone, Gmail account index | Reporter |
| `config/signature.txt` | Signature embedded in `.eml` files only | Reporter |
| `contacts/press-contacts.csv` | Persistent contact record across all stories. Upserted, never append-only | Skill |
| `outreach/<slug>/drafts.json` | Structured source of truth for one story's emails | Skill, hand-editable |
| `scripts/build_drafts.py` | 351 lines. `drafts.json` → `compose.html`, `.eml` files, `REVIEW.md`, `tracking.csv` | Script |
| `scripts/gmail_drafts.py` | 109 lines. Optional: writes real drafts into Gmail via API | Script |
| `outreach/<slug>/` | One folder per story. Output only | Script |

## Constraints already in place

Things that are true whether or not they're convenient.

**Gmail truncates long compose URLs.** `build_drafts.py` guards at `URL_SAFE_LIMIT = 8000`
characters; past that it emits a copy-paste block in `compose.html` instead of a button that
opens a half-empty draft. The four-sentence rewrite brought the cleats URLs from ~1,900 to
~1,050 characters, so there's real headroom — but a long email plus a long subject can still
approach it.

**Subject lines must be plain ASCII.** See R6. This is a MIME encoding constraint, not a style
preference.

**The signature is supplied by two different mechanisms** depending on output format, which is
why it must never be written into the body. See R7.

**The Gmail account index matters.** `config/profile.md` carries an index that controls the
`/u/0/` segment of compose URLs, so drafts open in the right Google account for someone signed
into several.

**Credentials are gitignored, and must stay that way.** `.gitignore` covers
`config/gcp_credentials.json` and `config/gmail_token.json`.

**The `gmail.compose` scope is not a send barrier** *(corrected 2026-08-25)*. Both this file and
`requirements.md` used to say it was "technically incapable of sending." That is false, and it
was load-bearing, so it is worth stating plainly: Google's scope table describes
`gmail.compose` as *"Manage drafts and send emails,"* and `users.messages.send` lists it as an
accepted scope. There is no narrower Gmail scope that writes drafts without allowing send.
`gmail_drafts.py` and the Apps Script project request it because it is the least-permissive
scope that does the job. **R1 is guaranteed by there being no send call in any file**, checked
by grep as a standing check — not by the permission model.

**The project exists in two places.** The git home is
`~/2026-ai-news-innovation-workshop/docs/submissions/Grace-Thomas/` (branch `day-2`, fork
`graceathomas5/2026-ai-news-innovation-workshop`, upstream
`AndrewRCalderon/2026-ai-news-innovation-workshop`). It was **copied**, not moved, from
`~/082626_AI Workshop`, which is not a git repo. Both still exist and have drifted once
already — on 2026-08-24 a rewrite happened in the working copy only and ten files were
re-synced after the fact. **The clone is canonical. Edit there, then sync across.**

**`CLAUDE.md` carries reporting guardrails that outrank convenience** — never invent a fact or
contact, never let a guess become a record, never contact anyone, no sign-offs, don't add back
things that were cut. Those are the same rules as R5, R8 and R12, stated at the session level so
they apply even outside a skill run.

## Decisions worth not re-litigating

- **Never sends.** Not a feature gap. The human on the Send button is what makes automating the
  rest safe.
- **Confidence labels are load-bearing.** A wrong address on deadline is a missed statement, so
  the system never sounds more certain than it is, and the build warns on anything below HIGH.
- **Only HIGH and MEDIUM contacts are recorded**, so a guess never hardens into a permanent
  record.
- **Terms stay out of the email.** Reporter's call — establish on-the-record in the reply thread
  rather than spend a sentence on it. Recorded in `drafts.json` for reference.
- **Questions run as prose, not a numbered list** *(2026-08-25)*. A list is easier for a comms
  person to answer point-by-point and easier to compare across companies; prose reads like a
  person wrote it. The tradeoff was taken knowingly in favor of prose.
- **No thesis sentence** *(2026-08-25)*. Emails once opened by explaining the story's pattern
  across an industry. Cut. A comms person needs to know what their company is being asked
  about, not what the piece argues — and an industry-wide thesis in writing is an assertion the
  reporting has to carry. The body is now: who you are, what this company did, what statement
  you need, deadline.
- **Outlet is Semafor** *(2026-08-25)*, set in `config/profile.md` and `config/signature.txt`.
  Earlier drafts said NYCity News Service.
- **The Docs sidebar hands off; it does not think** *(2026-08-25)*. The reporter works in
  Google Docs while the story is still moving, so the input needed to become a live draft rather
  than a filled-in form. Two ways to do that: the sidebar calls the Claude API and writes the
  emails itself, or it reads the draft and hands it to Claude Code, where the skill already runs.

  **Handoff won.** Calling the API from Apps Script would have meant a copy of `SKILL.md`'s rules
  living in a prompt string, drifting from the real one; a paid API key and roughly a dime a run;
  and — the deciding one — **worse contact research.** Apps Script has no browser, and research
  escalates curl → fetcher → real browser. `kalshi.com` returns 429 to everything above that last
  tier, which is the only reason `media@kalshi.com` was ever found. A sidebar that researched
  contacts would be quietly weakest at the job that most needs to be right.

  Cost of the choice: two pastes instead of none — the draft out, `drafts.json` back. Taken
  knowingly.

  What the draft turned out to contain: **the recipient list, already written by the reporter**,
  as inline notes ("Kalshi statement on this"). Nothing has to be inferred about who to contact.

- **The Apps Script is a standalone add-on, not bound to one Doc** *(2026-08-26, reversing the
  2026-08-25 decision)*. It was originally bound to a single Google Doc so that Phase 7's sidebar
  would be one project with one authorization. That was the right trade when the sidebar existed
  to serve one test document, and the wrong one for real use: **a bound script only ever runs in
  its own container**, so RFC Bot was unavailable in every other Doc the reporter writes in.
  Rebuilt as a standalone project installed as an editor add-on, so the menu appears under
  Extensions in any Doc. The scope is unchanged — `documents.currentonly` reads the Doc that is
  open and no other file in the account. Cost: an add-on has to be installed once, and shows an
  "unverified app" warning on first authorization because it is not published to the Marketplace.

- **The sidebar opens with two controls and nothing else** *(2026-08-26)*. A deadline field and
  one button. The paste-back that puts drafts into Gmail is hidden until the button has been
  pressed, because it cannot be used before Claude has been handed anything. This is a real
  constraint on what the sidebar may grow into, not a coat of paint: the reporter asked for two
  things on open, and anything added later goes below the fold or not at all.

- **Structure over word count** *(2026-08-25)*. An earlier hard "four sentences maximum" cap
  was replaced by a fixed four-part structure plus a warning-only length check. The shape is
  the rule; the length falls out of it. Accuracy still outranks brevity.

## Known weak points

Stated plainly rather than hidden.

- **It has only ever been run on one story.** Everything about generalization is currently an
  assumption. This is the single biggest risk in the project.
- **Contact research came back MEDIUM on half the first real attempt.** Honest, but it means a
  human still confirms half the list — which eats into the time saved.
- **The follow-up path has never been run.**
- **Everything routes through Gmail.** Outlook users get `.eml` files, which is worse.
- **The bot does not verify the premise.** See requirements.md, Out of scope.
