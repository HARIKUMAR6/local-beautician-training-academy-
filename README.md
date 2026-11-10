# Sorrel Academy of Beauty — static website

HTML5, Tailwind CSS v4 (CLI) and vanilla JavaScript. No backend.

## Folder roles
| Folder | Role |
|---|---|
| `public/` | **The website.** Everything a browser loads (built pages, CSS, JS, fonts, images). This is the web root. |
| `src/` | Sources: page templates (`src/pages`), partials, CSS, config. Templates contain `{{tokens}}` and are **not** viewable directly. |
| `scripts/` | Build, dev-server and lint scripts. |

## Pages and URLs
| Page | URL when `public/` is the web root | URL when the project folder is the web root |
|---|---|---|
| Home 1 (primary) | `/` or `/index.html` | `/public/index.html` (the root `index.html` redirects here) |
| Home 2 | `/home-2.html` | `/public/home-2.html` |
| About | `/about.html` | `/public/about.html` |
| Contact | `/contact.html` | `/public/contact.html` |
| Courses | `/courses.html` (discipline anchors `#makeup`, `#skin`, `#hair`, `#nails`, `#bridal`) | `/public/courses.html` |
| Certification | `/certification.html` | `/public/certification.html` |
| Student Login (portal, static) | `/login.html` | `/public/login.html` |
| Student Dashboard (static, sample data) | `/dashboard.html` (views: `#overview`, `#learning`, `#schedule`, `#logs`, `#certificates`, `#profile`) | `/public/dashboard.html` |

## Live Server (VS Code)
1. Open the project folder in VS Code (the folder that contains `package.json`).
2. Click **Go Live** (or right-click `public/index.html` > **Open with Live Server**).
3. The workspace setting `.vscode/settings.json` (`"liveServer.settings.root": "/public"`) makes Live Server serve `public/` as the site root, so the browser opens **http://127.0.0.1:5500/** (Home 1). Home 2 is **http://127.0.0.1:5500/home-2.html**.
4. After changing that setting, stop and restart Live Server.

Why a directory listing appeared before: the project root had no `index.html`, and Live Server serves the workspace root by default, so it showed the folder listing (`src`, `public`, `scripts`, ...). The site lives in `public/`. Do not open files from `src/pages/` in the browser: they are templates.

## Build and local server
```
npm install          # once
npm run build        # Tailwind CSS + pages (also validates images) -> public/
npm run dev          # watch + http://localhost:4173/  (Home 1) and /home-2.html
node scripts/check.mjs   # lint: no physical left/right properties
```
Edit `src/`, then run `npm run build` (or keep `npm run dev` running) so `public/` is regenerated.
