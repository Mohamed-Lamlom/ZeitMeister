# ZeitMeister — Offline-Ready Package

A static, browser-based trainer for learning how to tell time in German. No backend or build step is required.

## QA audit revision (2026-10-10)

- Fixed the clock animation lifecycle so it resumes after tab visibility changes and restores a settled time after page restoration.
- Localized the streak label in Arabic, English, and German.
- Limited answer input to 120 characters to bound normalization work for pasted text.
- Made service-worker cache-write failures non-fatal so a successful online response is still delivered when cache storage is unavailable or full.
- Added light/dark theme-color metadata and aligned the manifest colors with the default light theme.

## Offline use

ZeitMeister is a static app and does not need an internet connection to run its clock, questions, scoring, settings, or locally saved progress.

### Option A — Use the downloaded ZIP

1. Extract the ZIP.
2. For the easiest offline file, open **`ZeitMeister Offline.html`**. It is a standalone single-file build with the CSS and JavaScript embedded; it does not need the other files or an internet connection.
3. Alternatively, open `index.html` and keep `css/`, `js/`, `assets/`, and `manifest.webmanifest` together in the same project folder.
4. No external font, CDN, API, or backend is required. If your phone/browser blocks JavaScript in local HTML files, use Option B or C instead.

### Option B — Offline use from GitHub Pages

1. Publish the complete folder to GitHub Pages over HTTPS.
2. Open the site while connected to the internet and wait for it to finish loading once. The service worker (`sw.js`) caches the app shell: HTML, CSS, JavaScript, manifest, and icons.
3. Open the same site again after disconnecting from the internet. The cached app shell should load offline. An update to a future version is cached when that version is first opened online.

Service workers work on HTTPS sites and localhost, not on `file://` URLs. The service worker adds offline caching to the hosted version; it is not required for a fully extracted local folder whose browser permits local HTML execution.

### Option C — Run the folder locally without internet

On a computer with Python installed, open a terminal inside the extracted project folder and run:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`. This server runs on your own computer; it does not need internet access. It also permits the service worker to cache the app shell locally after the first load.

**Important:** Progress and settings use browser `localStorage`. They stay in that browser/profile on that device; they are not synced between devices. Some browsers treat data stored under a `file://` URL differently, so using the HTTPS hosted version or the local server is more reliable for saving progress.

## v102.17 changes

- Added a service worker that caches the local app shell for offline use on HTTPS/localhost deployments.
- Added an offline guide covering downloaded ZIPs, GitHub Pages, and a local offline server.
- No backend or external runtime dependency added; existing learning behavior is unchanged.

## v102.16 changes

- In `Offiziell`, analog positions 1–11 map to 13–23 (`2` on the clock becomes `vierzehn Uhr`); the 12 position remains `zwölf Uhr`.
- The main answer and the Offiziell explanation are written in German words, not digits.
- The `🕒` reference shows the matching numeric 24-hour time, e.g. `14:00` for the 2 o’clock position.
- Official practice questions target 13:00–23:59. Reverse-mode choices stay close within that range instead of wrapping from late-night times back to early-afternoon times.
- `Inoffiziell` retains its existing spoken-time behavior. Labels, CSS, layout, progress tracking, and reset behavior are unchanged.

## v102.15 changes

- The style labels are now `Inoffiziell` and `Offiziell` in every interface language; they are not translated.
- `Offiziell` continues to use the explicit 24-hour display, e.g. `Es ist 07:00 Uhr` and `Es ist 19:05 Uhr`. No extra `Formal` or `24h` wording is added to the label.
- The answer checker continues to accept matching numeric 24-hour input and the corresponding spoken German time while rejecting mismatched 12-hour values and incomplete answers such as `Uhr`.
- No CSS, clock layout, or practice-mode behavior was changed in this revision.

## v102.12 changes

- Time Difficulty now determines the target time grid in Read, Type, and Reverse modes, regardless of Clock Difficulty.
- Reverse mode uses adjacent, unique distractors so all three answer clocks remain close: neighboring hours, quarter-hour intervals, or five-minute intervals. Every-minute mode uses choices five minutes either side of the target.
- Clock Difficulty changes the clock-face visual aids without silently changing the selected Time Difficulty.
- No backend, framework, or new service was added.

## v102.11 changes

- Restored Clock Difficulty as four separate rounded buttons in a 2×2 grid; Time Difficulty keeps the connected control and off-white dividers.
- Added a Settings-only Progress button beside Reset Stats, showing persistent Type and Reverse answered counts, correct counts, and accuracy percentages.
- Stored progress locally in the browser; no backend or network service is used.
- Reset Stats now clears current/best streaks, completed rounds, session score, and all Type/Reverse progress counters, including in-memory state.
- Left the existing retry-feedback behavior unchanged, as requested.

## v102.10 changes

- Centered the logo and ZeitMeister wordmark as a group on phone layouts, without reserving asymmetric space for the separate settings gear.
- Increased phone typography, especially settings headings, labels, segmented-control choices, and the reset control, without increasing margins or padding.
- Reordered time difficulty choices semantically: Random hour → Quarter / half → Every 5 min → Every minute.
- Made time-difficulty reading order follow the interface language: right-to-left for Arabic and left-to-right for English and German.
- Changed the time-difficulty choices to a two-column grid on phone widths so labels remain readable at 320px.
- Kept JavaScript, practice logic, scoring, persistence, and all existing features unchanged.

## v102.8 changes

- Increased typography across the interface, with a stronger readability adjustment for phone layouts, including 320px-wide screens.
- Kept the small-screen settings and statistics readable while preserving the existing layout structure.
- Standardized the educational clock-expression hints in German across Arabic, English, and German UI languages.
- Isolated the German hint text as left-to-right text so punctuation and word order display correctly in the Arabic interface.
- Kept the page static; no backend, new framework, or new feature was introduced.

## v102.7 changes

- Added a final responsive CSS layer for narrow 320px phone viewports through large desktop viewports.
- Kept the existing practice modes, clock logic, answer checking, settings, streaks, and local-storage behavior unchanged.
- Improved small-screen sizing for the clock, answer area, statistics, buttons, and longer localized text.
- Made the settings panel fit within short viewports and scroll internally when its content needs more room.
- Used a stacked layout for tablets and compact laptop widths, and retained the side-by-side layout on desktop.
- Added safe-area-aware spacing for phones with display cutouts and home indicators.

## v102.6 changes

- Changed Reverse clock difficulty buttons to a two-column, two-row layout so longer English and German labels (especially “Impossible” and “Unmöglich”) stay inside their own buttons without overlapping adjacent controls. The order remains Normal → Medium → Hard → Impossible when read across the RTL layout.

## Previous v102.5 changes

- Reverse-difficulty buttons render emoji and labels as separate inline elements, preventing the skull or other difficulty emoji from wrapping above its label.
- Added the Random hour time difficulty, which generates only exact-hour times. Reverse-mode distractors also remain exact hours when this difficulty is selected.
- Every minute continues to generate minute-aligned questions, with the clock's second hand settling at zero when a question stops.

## Project structure

```text
ZeitMeister/
├── index.html
├── manifest.webmanifest
├── sw.js
├── ZeitMeister Offline.html
├── css/
│   └── style.css
├── js/
│   └── app.js
├── assets/
│   ├── favicon.svg
│   ├── icon-180.png
│   ├── icon-192.png
│   └── icon-512.png
└── README.md
```

### What each file does

- `index.html` — page structure and UI elements.
- `css/style.css` — theme, layout, clock presentation, settings panel, and responsive behavior.
- `js/app.js` — clock logic, German time expressions, practice modes, reverse mode, scoring, settings, translations, local storage, and answer checking.
- `assets/` — browser and home-screen icons.
- `manifest.webmanifest` — installable web-app metadata for supported browsers.
- `sw.js` — caches the app shell for offline use when served over HTTPS or localhost.

## Run locally

No build step or framework is required. Open `index.html` in a modern browser.

For development, using a small local server is recommended because it behaves more like a deployed site:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## GitHub Pages

The repository root should contain `index.html`. GitHub Pages serves it as the site entry point. Keep the relative paths below intact:

```html
<link rel="stylesheet" href="css/style.css">
<script src="js/app.js" defer></script>
<link rel="icon" href="assets/favicon.svg">
```

No server-side code is required.
