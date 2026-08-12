# Setup page copy - for editing

Single-page version: everything students install, in one place, labeled by
which day it's for.

Sections 1 to 3 are Day 1. Sections 4 to 6 are Day 2, and are the candidates
for deferring to the end of Day 1 or the morning of Day 2.

Base text is from the `live` branch, Aug 12 2026. Text in **[PROPOSED]** blocks
is Claude's draft. Everything else is the current live wording. Edit freely.

**No em-dashes** anywhere on this page. Andrew stripped them deliberately
(commit `e8cf5cd`).

---

## Page heading and intro

**Title:** Pre-Workshop Setup

**Lede:** Please do this **before Day 1**. We won't have time to walk through
installs live, and Day 1's hands-on session assumes you're already set up.

> **[PROPOSED] Add after the lede:** This covers everything you'll need for the
> whole workshop. Sections 1 to 3 are what you need on Day 1. Sections 4 to 6
> aren't used until Day 2, so if you'd rather do those later, that's fine.

**Timing:** It should take about 30 minutes.

**Contact line:** If something doesn't work, please reach out to Andrew
(andrew.calderon@journalism.cuny.edu) or Adiel (adiel.kaplan@journalism.cuny.edu).

---

# Day 1

## 1. Claude Desktop

**Intro:** The app you'll build with all day. It's a chat, research, and an
actual coding environment, all in one place.

**Checklist:**

1. Download and install Claude Desktop from claude.ai/download.

2. Open it and sign in with your email account.

3. Confirm you can see three tabs near the top: **Chat**, **Cowork**, and
   **Code**. We'll cover what each one is for on Day 1.

> **[PROPOSED] Replace item 2:** Open it and sign in. Adiel is emailing
> everyone their account details the week before class. If you don't have them
> yet, that's expected. Install now and sign in when the email arrives.

> **[PROPOSED] Replace item 3.** Confirmed on Adiel's machine Aug 12 2026: the
> app shows **Home** and **Code**, not three tabs. Chat and Cowork are merged
> into Home. Anthropic's docs still say three, so the docs are behind the app:
> "Confirm you can see two tabs near the top: **Home** and **Code**. Home is
> where chat and longer research work happen. Code is for building things.
> We'll cover both on Day 1."

---

## 2. GitHub

**Intro:** **GitHub** is the website where your work lives online and gets
submitted. You'll connect it directly to Claude Desktop: no separate app, no
typed commands.

**Checklist:**

1. Sign up for a free account at github.com if you don't already have one.

2. In Claude Desktop, click the **+** next to the message box and choose
   **Connectors** (or go to **Settings → Connectors**).

3. Find **GitHub** in the list and select it.

4. You'll get a short code and a browser tab opens automatically. Sign in to
   GitHub there and approve the connection.

5. Back in Claude Desktop, confirm GitHub now shows as connected.

---

## [PROPOSED] 3. Git

New section. Claude Desktop's Code tab will not open without Git on the
machine, so this belongs on Day 1, not Day 2.

**Intro:** A small background tool that Claude uses to keep track of changes to
your work. You won't interact with it directly, but the Code tab won't open
without it.

**Checklist:**

1. **On a Mac:** open Terminal (search for it with Spotlight) and type
   `git --version`, then press Enter. If it prints a version number, you're
   done. If it offers to install developer command line tools, accept and let
   it finish.

2. **On Windows:** download and install Git for Windows from
   git-scm.com/downloads/win, then quit Claude and reopen it.

---

# Day 2

> **[PROPOSED] Add a line under this heading:** You won't use anything below on
> Day 1. Install it before the workshop if you can, or at the end of Day 1, or
> first thing on Day 2 morning. It's quick, and by then you'll have Claude
> Desktop open and can ask it for help if anything goes wrong.

## [PROPOSED] 4. VS Code

**Intro:** A traditional code editor. This is where Day 2 happens.

**Checklist:**

1. Download and install VS Code from code.visualstudio.com. It detects your
   operating system automatically.

2. Open it once after installing, just to confirm it launches.

---

## [PROPOSED] 5. Claude Code in VS Code

**Intro:** The same Claude you'll use in Claude Desktop's Code tab, this time
running inside VS Code.

**Checklist:**

1. In VS Code, open the Extensions panel. It's the icon that looks like four
   squares in the left sidebar. Search for "Claude Code" and click Install.

2. Sign in with your workshop account when prompted.

*(Verified: still a separate install. Marketplace extension, needs VS Code
1.94.0 or higher plus a paid Claude plan, which the workshop account covers.)*

---

## [PROPOSED] 6. GitHub Desktop

**Intro:** A free app for moving work between your computer and GitHub: save
changes and send them up by clicking buttons, with no typed commands. Day 1
uses Claude Desktop's GitHub connector instead. This is the path you'd use on
your own projects.

**Checklist:**

1. Download and install GitHub Desktop from desktop.github.com, then sign in
   with the GitHub account from section 2.

*(Note: GitHub Desktop installs its own private copy of Git that Claude can't
see, which is why section 3 is separate and still necessary.)*

---

## Verify You're Ready

**Checklist:**

1. Open Claude Desktop, confirm you're signed in, and confirm you see the
   Chat, Cowork, and Code tabs.

2. Confirm you can log in to github.com with your account.

**Closing line:** If that works, you're set for Day 1.

> **[PROPOSED] Replace item 1:** Open Claude Desktop, confirm you're signed in,
> and confirm the Code tab opens without an error.

> **[PROPOSED] Add for Day 2, only if sections 4 to 6 stay on this page:**
> "Open VS Code and confirm Claude Code appears in the sidebar and shows you're
> signed in." and "Open GitHub Desktop and confirm you're signed in to your
> GitHub account."

> **[PROPOSED] Replace the closing line:** If that works, you're set.

---

## Claude's open questions

1. Does the Day 2 block stay on this page with a "do it later" note, or move
   back to its own page? The note to Andrew argues for keeping it here and
   deciding after.

2. How many Windows students? Changes how prominent section 3 needs to be.

3. Section 2 walks students through connecting the GitHub connector as
   pre-work. Is that still right, or was that meant to be done together in the
   first session?
