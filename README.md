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

- **Primary store is your browser's `localStorage`** (per browser, per device). Nothing is uploaded automatically.
- Session progress, timer settings, tasks, and journal entries are all saved locally as you use the app.
- ⚠️ Clearing your browser data will erase your local copy — use GitHub Sync to keep a cloud backup (below).

### GitHub Sync (cloud backup & cross-device)

The app can store a backup of all your data as a JSON file inside this repo and pull it back on load — so your data follows you across devices or survives a browser wipe.

1. Click the **☁️** button in the top bar.
2. Create a **fine-grained personal access token** (GitHub → Settings → Developer settings → Personal access tokens → Fine-grained). Scope it to **only this repo** with the **Contents: Read and write** permission.
3. Paste the token, enter `owner/repo`, and (optionally) change the backup path. Click **▲ Push to GitHub** to save your data.
4. On any other device, open the same page, enter the same token + repo, and click **▼ Pull from GitHub** (or just let it auto-pull on load).

> Security notes:
> - The token is stored in that browser's `localStorage`. Anyone with the page open in the same browser + that token can read/write the scoped repo, so scope it to one repo and don't share it.
> - Rate limit is 5,000 requests/hour with a token — far more than personal use needs.
> - Every push creates a new commit in your repo history, so you get free versioned backups.

## Tech

- 100% vanilla HTML + CSS + JavaScript
- Web Audio API for chimes and ambient rain
- Native `<dialog>` for day details
- No external libraries or network requests

## License

[MIT](LICENSE) © Satvik Tripathi
