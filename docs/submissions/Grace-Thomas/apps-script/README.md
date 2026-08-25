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

**4. Go back to the Editor.** Step 3 left you in Project Settings. Click the **`< >`** icon in
the narrow strip of icons on the far left — that's the Editor. Everything from here on happens
there. `appsscript.json` should now be sitting in the **Files** list next to `Code.gs`; if it
isn't, step 3 didn't take.

**5. Add the Gmail advanced service.** In the Editor's left panel there are three stacked
headings: **Files**, **Libraries**, **Services**. Hover over **Services** and a **+** appears
("Add a service"). Click it → scroll to **Gmail API** → leave the Identifier as `Gmail` →
**Add**.

> **Why the advanced service and not `GmailApp`.** `GmailApp.createDraft()` is one line, but
> Apps Script authorizes its methods under `https://mail.google.com/` — full mailbox access,
> including permanent delete. The advanced service goes through the Gmail API, which lets the
> manifest ask for `gmail.compose` and nothing more.

**6. Get the five files in.** You don't create all five — two already exist, and you replace
what's in them. Open this folder in VS Code to copy from; each file is Cmd-A, Cmd-C.

Nothing is typed with an extension. Apps Script adds `.gs` to a Script file and `.html` to an
HTML file, so you type `Drafts`, not `Drafts.gs`.

| This folder | In the editor | How |
|---|---|---|
| `appsscript.json` | `appsscript.json` | Already there after step 3. Select all, paste over it. |
| `Config.gs` | `Config` | Rename `Code.gs`: its **⋮** menu → **Rename** → `Config`. Select all, paste over the `myFunction` stub. |
| `Drafts.gs` | `Drafts` | **+** next to *Files* → **Script** → name it `Drafts`. Paste over the stub. |
| `Menu.gs` | `Menu` | **+** → **Script** → `Menu`. Paste over the stub. |
| `Sidebar.html` | `Sidebar` | **+** → **HTML** — not Script → `Sidebar`. Paste over the boilerplate. |

File order doesn't matter, even though it looks like it should. Apps Script loads every `.gs`
file into one shared space, so `Drafts` can see the settings in `Config` wherever it sits.

**7. Save, then reload the Doc.** Cmd-S saves all the files at once. Then reload the Doc tab —
an **RFC Bot** menu appears next to Help.

**8. Install the commit hook** (once per clone, from anywhere):

```bash
git -C ~/2026-ai-news-innovation-workshop config core.hooksPath docs/submissions/Grace-Thomas/.githooks
```

This refuses any commit that adds a way to send mail, or that widens the Gmail scope past
`gmail.compose`. See *It never sends* below for why that check is the whole guarantee.

**9. Authorize.** **RFC Bot → Create Gmail drafts…** the first time will ask for permission.

> Google will call this app "unverified," because it is — it's your own script, not a published
> add-on. Click **Advanced → Go to (project name)**. **Authorize with the account you want the
> drafts in.** If you're signed into several, this is the step that decides, and getting it
> wrong means hunting for drafts in the wrong mailbox.
>
> If authorization complains about a missing scope, it names the one it wants. Add it to
> `oauthScopes` in `appsscript.json` and tell me which — that means I got a scope wrong and it
> should be fixed here rather than papered over.

---

## clasp — editing locally instead of pasting

`clasp` is Google's command-line tool for Apps Script. It syncs this folder with the Google
project, so you edit in VS Code and run one command instead of copying five files by hand.

### One-time setup

**1. Node.** clasp is a Node program and this Mac had none. Installed from the official
package rather than through a version manager or Homebrew — the least machinery for someone who
wants clasp, not a JavaScript toolchain.

Download the **macOS Installer (.pkg)** from <https://nodejs.org/en/download> — take the **LTS**
build, currently `node-v24.19.0.pkg`, about 93 MB. Double-click it and accept the defaults. It
asks for your Mac password, which is why it can't be done for you.

Then **open a new Terminal window** — an existing one won't see it — and check:

```bash
node --version && npm --version
```

**2. clasp itself.** `/usr/local/lib/node_modules` is owned by root, so a plain `npm install -g`
would need `sudo` and your password. npm was pointed at a folder in your home directory instead:

```bash
npm config set prefix ~/.npm-global
npm install -g @google/clasp
```

and `export PATH="$HOME/.npm-global/bin:$PATH"` was appended to `~/.zshrc` so `clasp` is on your
path in a new terminal. To undo: delete those lines and run `npm config delete prefix`. A backup
of the original is at `~/.zshrc.bak-before-clasp`.

Installed version: clasp **3.4.0**. Worth pinning down, because v3 removed commands that older
tutorials still tell you to run — `clasp setting` among them.

**3. Turn on the Apps Script API** for your account, once, at
<https://script.google.com/home/usersettings> → **Google Apps Script API: On**. clasp cannot
talk to your projects until this is on, and the error it gives if you skip it does not say so
clearly.

**4. Log in.** Opens a browser; authorize with **the same Google account the Doc lives in**:

```bash
clasp login
```

This writes an OAuth token to `~/.clasprc.json`. It is a credential. It lives in your home
folder, not in the repo, and `.gitignore` covers it anyway.

**5. Point clasp at your project.** In the script editor: **Project Settings** (the gear) →
copy the **Script ID**. Then write `.clasp.json` in this folder by hand:

```json
{ "scriptId": "paste-the-script-id-here", "rootDir": "." }
```

**Do not use `clasp clone` for this.** It attaches to the project *and* downloads Google's copy
over your local files. If what's in the browser is a partial paste, cloning replaces your good
local files with the bad ones, with no undo. Writing the two-line file has no such failure mode.

`.clasp.json` is gitignored — it points at one specific person's Doc, so it doesn't belong in a
shared repo. Writing it by hand is also how you recreate it on a new machine.

### Day to day

Check what would go up before it goes up:

```bash
clasp status
```

That lists exactly the files `clasp push` would send. If anything unexpected is in the list,
`.claspignore` needs a look — don't push and find out.

```bash
clasp push
```

From this folder. Uploads the five files and overwrites what's in the Google project. Reload
the Doc afterwards if you changed `Menu.gs`, since the menu is built when the Doc opens.

`.claspignore` is an allow-list, so only the five real files go up — `README.md` and
`.clasp.json` stay local. A new file in this folder stays local too until it's added there
deliberately.

### Two things that will bite

**Pick one place to edit.** `clasp push` overwrites Google with your local files, and
`clasp pull` overwrites your local files with Google's. If you edit in the browser and then
push from here, the browser edits are gone with no warning and no undo. Edit locally as the
default; if you did change something in the browser, `clasp pull` first.

**Run it from the clone**, `~/2026-ai-news-innovation-workshop/docs/submissions/Grace-Thomas/apps-script`,
not from `~/082626_AI Workshop`. The clone is the copy under version control. There are already
two copies of this project that have drifted once; Google is now a third, and the way to keep
that manageable is for pushes to come from the canonical one.

### If clasp breaks

The copy-paste steps above still work. Nothing depends on clasp.

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

The guarantee is that nothing here calls send. That's it. So the check for one is automated
rather than remembered: `.githooks/pre-commit` searches the staged code on every commit and
refuses any that adds `.send(`, `smtplib`, `sendmail`, or a Gmail scope wider than
`gmail.compose`. Install it with step 7 above.

**It's a tripwire, not a wall** — `git commit --no-verify` skips it. Saying so plainly matters
more than pretending otherwise, since overclaiming this exact guarantee is the mistake it was
written to catch.
