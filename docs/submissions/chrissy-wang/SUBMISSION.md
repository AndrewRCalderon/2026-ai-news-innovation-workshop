# Submission Info

<!-- Fill this in as your project takes shape, and keep it current.
     This becomes your public profile card on the workshop showcase page,
     pulled live from this file — worth a real sentence per field, not a
     placeholder. -->

- **Student Name:** Chrissy Wang

- **Fork URL:** `https://github.com/XiaohuaWang-Chrissy/2026-ai-news-innovation-workshop`

- **Hypothesis or problem statement:** Local business stories break first in primary sources — SEC filings, layoff notices, building permits, business licenses, property records — but those are scattered across dozens of government sites, most with no search, no alerts, and no RSS. A reporter can't realistically check them all every day, so they end up following other outlets instead of finding stories first. My hypothesis: a monitor that reads those primary sources directly, every day, will surface original leads that never show up in a press release or a competitor's feed.

- **What you're building:** AutoNews, a reporter's workflow for local business news, built in stages. Stage one runs today: it watches a city's primary sources and turns each item into a short pitch with a line on why it matters and who it matters to. The stages after that turn a feed into a loop — an interface where I mark which items are genuinely worth chasing, so the tool learns what to surface next; for anything I flag, a briefing on who to interview, what background I need, and what to read first; then drafting the story; then turning the finished piece into a short animated video in a style I choose, so it travels on social. The engine is city-agnostic — everything place-specific lives in a config file, so a new city means a new config, not new code.

- **Solution:** Stage one is real and running for two cities. Houston/Texas watches 46 feeds plus custom readers for SEC EDGAR filings, Texas WARN layoff notices, TDLR contractor licenses, and HCAD commercial property records. New York City/NY State watches 66 feeds plus NY and NJ WARN notices, EDGAR, DOB building permits, DCWP business licenses, and ACRIS property deeds. It checks every 10 minutes and delivers one digest per city. Stages two through five — the feedback loop, the reporting brief, drafting, and video — are designed but not built yet. Known limits on what does exist: it runs on my own Mac rather than in the cloud, so it stops when my laptop sleeps; deduplication keys on the raw URL, so the same story on two wires can still reach me twice; and adding a third city still means hand-assembling that city's source list, which is the slow part.

