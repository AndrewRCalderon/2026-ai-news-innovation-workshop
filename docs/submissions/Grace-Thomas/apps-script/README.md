# RFC Bot in Google Apps Script

Creates real Gmail drafts from a story's `drafts.json`. **It never sends.**

`compose.html` opens a pre-filled compose window, which is fine but transient — close the tab
and it's gone. A draft made this way persists, syncs to your phone, and is what you'd expect
after asking for a draft. `scripts/gmail_drafts.py` already does this, but it needs a Google
Cloud project, an OAuth consent screen and two `pip` installs. This needs none of that.

Serves task 15 and task 16 in [tasks.md](../tasks.md).

---

## Setup — about ten minutes, once

**1. Make the Google Doc.** Any doc. Call it something like *RFC Bot*. This same doc is where
the Phase 7 sidebar will read your story draft from, so it's worth putting somewhere you'll
find it.

**2. Open the script editor.** In that doc: **Extensions → Apps Script**.

**3. Show the manifest.** Left sidebar → **Project Settings** (the gear) → tick
**"Show 'appsscript.json' manifest file in editor."**

**4. Add the Gmail advanced service.** Left sidebar → **Services** → **+** → pick **Gmail API**
→ leave the identifier as `Gmail` → **Add**.

> **Why the advanced service and not `GmailApp`.** `GmailApp.createDraft()` is one line, but
> Apps Script authorizes its methods under `https://mail.google.com/` — full mailbox access,
> including permanent delete. The advanced service goes through the Gmail API, which lets the
> manifest ask for `gmail.compose` and nothing more.

**5. Paste in the five files.** Replace the contents of each; use the **+** next to *Files* to
add the ones that don't exist yet. `Sidebar.html` is added as an **HTML** file, the rest as
**Script** files (Apps Script drops the `.gs`, so `Config.gs` here becomes `Config` there).

| This folder | In the editor |
|---|---|
| `appsscript.json` | `appsscript.json` |
| `Config.gs` | `Config` |
| `Drafts.gs` | `Drafts` |
| `Menu.gs` | `Menu` |
| `Sidebar.html` | `Sidebar` (HTML) |

**6. Save, then reload the Doc.** An **RFC Bot** menu appears next to Help.

**7. Authorize.** **RFC Bot → Create Gmail drafts…** the first time will ask for permission.

> Google will call this app "unverified," because it is — it's your own script, not a published
> add-on. Click **Advanced → Go to (project name)**. **Authorize with the account you want the
> drafts in.** If you're signed into several, this is the step that decides, and getting it
> wrong means hunting for drafts in the wrong mailbox.
>
> If authorization complains about a missing scope, it names the one it wants. Add it to
> `oauthScopes` in `appsscript.json` and tell me which — that means I got a scope wrong and it
> should be fixed here rather than papered over.

---

## Using it

1. Run the normal pipeline first: `python3 scripts/build_drafts.py outreach/<slug>/drafts.json`.
   That's where the full R4/R5 format checks live. What's in `Drafts.gs` is a safety net, not a
   replacement — see *What this does not check*.
2. Open `outreach/<slug>/drafts.json`, select all, copy.
3. In the Doc: **RFC Bot → Create Gmail drafts…**, paste, **Create drafts**.
4. Read every draft in Gmail. You press Send.

Recipients with no address — a contact form, or nothing found (R1a) — are skipped with a reason
rather than silently dropped. They still have a full `.eml` and copy-paste text from
`build_drafts.py`.

---

## Test mode

`TEST_MODE = true` in `Config.gs` is the default and should stay the default.

While it's on, **every** draft is addressed to `TEST_RECIPIENT`, whatever `drafts.json` says.
Cc is dropped, the subject is prefixed `[TEST]`, and the real intended recipient is preserved in
an `X-RFC-Bot-Test-Original-To` header where you can see it via *Show original*. You can load
the real Kalshi `drafts.json` and still not reach Kalshi.

**The body is left byte-identical.** Nothing is injected into it — the point of a test draft is
to read the exact text that would go out.

The test send is you opening the `[TEST]` draft and pressing Send to yourself. That's the only
honest way to see what Gmail does to the formatting on the way out, and it keeps R1 intact:
the script drafts, a human sends.

### Two things to check on the very first test draft

1. **Does the signature appear once, or twice?** The script embeds it, on the reasoning that
   Gmail inserts your configured signature into a *new compose window* but not into a draft that
   already exists. That is what I expect, not something I've watched happen in your account. If
   you see it twice, set `EMBED_SIGNATURE = false` in `Config.gs`.
2. **Does the body survive as one paragraph** with the deadline alone on the last line, after
   Gmail has rendered it?

---

## What this does not check

`scripts/build_drafts.py` holds the full R4/R5 checks — sign-offs, thesis sentences, numbered
questions, editorializing, sentence-3 length, the whole do-not-add-back list. Those are **not**
duplicated here, deliberately: two copies of the same rules drift apart, and right now every
`drafts.json` has already been through the Python checks before it gets here.

What `Drafts.gs` does check is only what it can break on its own, or what's a hard rule rather
than a style rule: a non-ASCII subject (R6), a phone number anywhere (R7a), a signature already
in the body, and the greeting/paragraph/deadline structure.

**This becomes a real gap in Phase 7**, when the Docs sidebar starts producing drafts that never
touch `build_drafts.py`. Noted now so it isn't discovered then.

---

## It never sends

There is no send call in this project.

Be precise about why that holds, because the repo used to be wrong about it: **it is not the
scope.** Google documents `gmail.compose` as *"Manage drafts and send emails,"* and the Gmail
API accepts it for `users.messages.send`. There is no Gmail scope that writes drafts without
permitting send. `gmail.compose` is requested because it's the narrowest scope that can write a
draft at all.

The guarantee is that nothing here calls send, plus the standing grep in `tasks.md` that checks
for one. Run it before any commit that touches this folder.
