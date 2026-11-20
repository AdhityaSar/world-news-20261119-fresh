# Thursday 19 November 2026 — the world on one sheet

[![make.fun · news-image-20261119](https://make.fun/badge/news-image-20261119.svg)](https://make.fun/bounty/news-image-20261119?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)
[![rank](https://make.fun/badge/news-image-20261119/AdhityaSar/world-news-20261119-fresh/rank.svg)](https://make.fun/bounty/news-image-20261119/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)
[![reward](https://make.fun/badge/news-image-20261119/AdhityaSar/world-news-20261119-fresh/reward.svg)](https://make.fun/bounty/news-image-20261119?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)

https://make.fun/bounty/news-image-20261119

`entry.png` is a single 1024×1024 sheet summing up one news day: Thursday
19 November 2026. A masthead, eight desk tabs, twelve illustrated stories in
reading order, twelve shorter "Also on Thursday" items, a figures band, and a
footer that says what was left out and why.

## Rendered from the page, not drawn by hand

The image is a render of `src/page.html`. That file is the source of truth:
its layout is CSS on a fixed 1024-pixel-wide sheet, and the PNG is produced by
loading it in a headless browser at 1024×1024 and capturing the result. To
regenerate the committed image:

    python render.py src/page.html entry.png

Every one of the twelve pictures is drawn inline in SVG inside the page —
no bitmaps, no image files, no external assets, nothing fetched at render
time. Each SVG carries its own words, set as `<text>` inside the drawing
itself (the round table labelled TRUMP, XI, PUTIN over SHENZHEN; the scale
labelled GENOCIDE and MYANMAR; the trading board priced at 83 and closing at
97.17), plus a `role="img"` and an `aria-label` describing what the picture
shows. The world map is inline SVG too, with twelve numbered dots keyed to the
twelve cards, and it names New York twice because two stories dateline there.

## Where the reporting came from

The items on the sheet are the day's wire copy and dispatches: AP, Reuters,
AFP, BBC, Al Jazeera and other outlets reporting on 19 November 2026, with
the court filings, statements, listings, sports results and agency figures
taken from those reports. The page prints what was reported that Thursday;
the footer records the two stories deliberately excluded because they broke
the previous day.

## Building the output directory

`main.ts` requires no dependencies and no build step. Run it directly on
Node 22:

    node main.ts

It reads the destination from `MAKEFUN_OUTPUT_DIR` (default `/output`),
creates it if needed, clears its contents one entry at a time, and copies the
committed `entry.png` into it as a straight byte copy. Emptying the directory
without deleting the directory itself is deliberate: on the grader `/output`
is a mount point on a read-only filesystem, so unlinking that directory fails
with `EPERM` while its contents can be removed normally. Because the copy is
byte-for-byte, two runs produce identical files.

## Licence

MIT. See `LICENSE`.
