# StudyFlow

A personal study dashboard — focus timer, progress calendar, to-do list, and mindfulness tools — in a **single offline HTML file**. No dependencies, no build step, no server needed.

![platform](https://img.shields.io/badge/platform-browser%20%7C%20offline-blue)

## Features

- **Focus Timer** — set your own study & break lengths, circular countdown, auto-switches between study and break, records completed sessions automatically.
- **Progress Calendar** — month view with color-coded study intensity per day, study streak counter, month & all-time totals. Click any day for session details and notes.
- **To-Do List** — tasks with optional due dates and priority. Dated tasks appear as colored dots on the calendar and can be ticked off from the day popup.
- **Mindfulness** — guided breathing (Box / 4-7-8 / Relaxing) with an animated orb, ambient rain sound, daily intention + gratitude journal.
- **Extras** — light/dark theme, weekly bar chart.

## Getting started

### Run it locally

Just open `index.html` in any modern browser (Chrome, Safari, Firefox, Edge). That's it — everything works offline.

### Deploy to GitHub Pages (free hosting)

1. Create a repo on GitHub and push this folder to it.
2. Repo **Settings → Pages → Branch** → select `main` + `/ (root)` → Save.
3. Your app is live at `https://<username>.github.io/<repo-name>/`.

> The Pages build takes a minute the first time. If the repo is private, Pages still works but the URL is only accessible to you when signed in.

## Data & privacy

- **Everything is stored locally** in your browser's `localStorage` (per browser, per device). Nothing is uploaded to any server.
- Session progress, timer settings, tasks, and journal entries are all saved automatically as you use the app.
- ⚠️ Clearing your browser data will erase everything. To back up: open the app, then in the browser console run `localStorage` and copy the values, or periodically duplicate `index.html` + export via DevTools. A one-click backup button is a planned enhancement.

## Tech

- 100% vanilla HTML + CSS + JavaScript
- Web Audio API for chimes and ambient rain
- Native `<dialog>` for day details
- No external libraries or network requests

## License

[MIT](LICENSE) © Satvik Tripathi
