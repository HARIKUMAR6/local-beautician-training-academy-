# Phase 3 — Homepage Corrections Report

**Status:** The requested corrections are complete, awaiting review. No new pages and no next phase were started.

## 1. Root cause of the Live Server directory listing
The project folder had **no `index.html` at its root**. The website lives in `public/` (built from `src/`), but VS Code Live Server serves the *workspace root* by default, so the browser showed a folder listing (`public`, `src`, `scripts`, ...) instead of a page. Nothing was wrong with the pages or their paths.

**Fix at the root cause (no workaround, no backend):**
- `.vscode/settings.json` sets `"liveServer.settings.root": "/public"`, so Live Server serves `public/` as the site root and `/` opens Home 1.
- A small root `index.html` (meta-refresh to `public/index.html`) is a safety net if someone starts a static server at the project folder or the setting is ignored.
- `README.md` documents the Live Server start, the URLs and why a listing appeared. `package.json` description updated to the Sorrel name.
- Pages use relative asset paths (resolved at build time), so they work from either root.

## 2. Exact routing after correction

| Page | Web root = `public/` (Live Server with the setting) | Web root = project folder |
|---|---|---|
| Home 1 (primary, logo target) | `http://127.0.0.1:5500/` and `/index.html` | `/` redirects to `/public/index.html` |
| Home 2 | `http://127.0.0.1:5500/home-2.html` | `/public/home-2.html` |
| Image credits | `/image-credits.html` | `/public/image-credits.html` |

Start: open the folder that contains `package.json` in VS Code, click **Go Live** (restart Live Server once after the setting is added). Do not open `src/pages/*.html`; those are templates.

**Important limitation:** I could not run the actual Live Server extension in this environment. I tested the equivalent behaviour with two static servers: one rooted at `public/` (what the setting produces) and one rooted at the project folder (what Live Server did before). Please confirm on your machine after restarting Live Server.

## 3. Home 2 full redesign (still exactly 7 sections)
The old Home 2 (split screen with tabs, a card strip, a list finder, a side-list kit, a masonry wall, sticky steps and a table) is gone. Every section has a new composition, and the page has its own motif: **sheets**, meaning each section slides over the previous one with rounded top corners.

| # | New section | Composition |
|---|---|---|
| 1 | Path | Five full-width **expanding studio panels**. Click or Enter opens one (photo, text card, CTA); the others collapse into vertical labels (horizontal bands on mobile). "Find ... courses" pre-sets the course grid. |
| 2 | A day | Dark teal sheet with a **staggered photo timeline** on a dotted axis (alternating tall and square photos, time stamps), scroll-snap with prev/next. |
| 3 | Courses | A **discipline x level grid** (replaces the list). Filters dim non-matches instead of hiding them, so the whole catalogue stays visible; stacked with labels on mobile. |
| 4 | The kit | **Annotated specimen**: wide flat-lay photo with numbered, labelled pins (the pins are the controls) and a note below. |
| 5 | The board | **Pinboard** of six taped prints on a dotted notebook background, slightly rotated, with a lightbox. |
| 6 | Certificate | A built **sample certificate** (marked "Sample") with a photo tucked in the corner; four steps beside it, each highlights the matching part of the certificate. |
| 7 | Intakes | Sticky studio photo, a **Jan / May / Sep intake calendar** (replaces the table), then the enquiry form (demo, sends nothing). |

All earlier information is kept: disciplines and durations, 8 courses with level and format, kit tools, board images, certification steps, intakes, enquiry, address, image credits. Home 1 and Home 2 share no section layout. Images are the same 19 files as before (none shared with Home 1); only their presentation changed. Section transitions are the overlapping rounded sheets plus alternating background tones.

## 4. Home 1: hero and second section
The second section is now a **dark teal brand band** (the same teal in both themes), with its own markers: a notebook **index tab** hanging from its top edge, a large outlined numeral **"02"**, more padding, and light-on-dark type with the inline photos. It starts exactly where the hero ends. Home 1 still has exactly seven sections; the band colour for dark mode was chosen because the normal dark teal was too close to the dark page background.

## 5. Shared hero height
- New tokens in `src/css/tokens.css`: `--hero-chrome: 48px` and `--hero-h: clamp(520px, calc(100svh - header - 48px), 820px)`.
- Both `.h1-hero` and `.h2-hero` use `height: var(--hero-h)` and size their content to fit it (headline sizes scale with viewport height; the meta strip and lede hide on short or narrow screens). Home 2's 48px section index sits under the header, so the token reserves that space on both pages.
- Compositions stay different: Home 1 is copy plus an arch-cropped photo; Home 2 is a title bar over five expanding photo panels.
- A hero is never taller than 520px, so on screens shorter than header + 48 + 520 px the hero can extend slightly below the first screen (documented below).

## 6. Footer
- The separate **Follow** section is removed; the footer has three columns (Explore, Courses, Visit & contact).
- Under the logo: four **icon-only** social buttons (Instagram, Facebook, YouTube, LinkedIn), 44 px circles with equal spacing, aria-labels, visible focus rings, 7:1+ icon contrast on the footer in both themes. No handles or text are shown.
- Social URLs are still not set: each icon is a safe `#` link that does nothing, and its aria-label says "profile link not set up yet". Add real URLs in `src/config/site.json`; icons become real links automatically.

## 7. Files
**Created:** `.vscode/settings.json`, `index.html` (root redirect), `README.md`, `PHASE-3-HOMEPAGES-CORRECTION-REPORT.md`, `src/partials/logo-mark.html`, `src/icons/` `instagram.svg`, `facebook.svg`, `youtube.svg`, `linkedin.svg`.
**Rewritten:** `src/pages/home-2.html`, `src/css/pages/home-2.css`, `public/assets/js/pages/home-2.js`.
**Modified:** `src/pages/index.html`, `src/css/pages/home-1.css`, `src/css/tokens.css`, `src/css/components/sections.css`, `src/css/components/footer.css`, `src/partials/footer.html`, `scripts/build-pages.mjs`, `package.json` (description), `PHASE-3-HOME-PAGES-IMPLEMENTATION-REPORT.md` (superseded note). Built files in `public/` regenerated.

## 8. Tests actually run (Edge via Playwright and axe-core, kept outside the project)

| Suite | Result |
|---|---|
| Routing, hero, separation and footer (`qa-fix`) | **293 / 293** |
| Homepages: structure, images, themes, directions, axe, widths, interactions (`qa-home`) | **198 / 198** |
| Phase 2 regression on the component page | 587 / 587 |
| Brand suite | 60 / 60 |
| `node scripts/check.mjs` and `npm run build` (images unique) | OK |

**Routing** (both web roots): `/` returns a page, not a listing; HTML, CSS, JS, font, brand and image files all return 200; Home 1 renders with 7 sections, Fraunces headings and the styled background; Home dropdown goes to Home 2 and back; logo goes to Home 1; refresh and direct URLs work; zero 404s during navigation.

**Hero height:** 15 viewports (1920x1080, 1440x900, 1366x768, 1280x720, 1280x600, 1024x768, 1024x600, 820x1180, 768x1024, 430x932, 390x844, 375x667, 360x740, 320x568, 320x480) in LTR and RTL: both heroes have identical height equal to the token, start directly under the header (Home 2 under header + index), no content spills out, no horizontal overflow, and headline and primary CTA are visible in the first screen wherever the 520px minimum fits.

**Responsive:** widths 320, 360, 375, 390, 430, 768, 1024, 1280, 1440 and 1920, both pages, LTR and RTL: no page overflow and nothing outside the viewport (the timeline and section index scroll inside their own containers by design).

**Themes and directions:** light and dark, LTR and RTL, desktop and mobile, both pages: zero axe WCAG 2.2 A/AA and best-practice violations, headings never right-aligned, no overflow, identical English text when direction flips. Home 2 interactions tested in LTR and RTL (panels, grid filter and preset, timeline direction, pins, lightbox, certificate highlight, form, section index). Home 1 separation tested in all four theme and direction combinations. Footer tested in seven combinations (including mobile and tablet).

## 9. Remaining issues
1. **Live Server not run directly** (see section 2); confirm after restarting it.
2. On screens shorter than about 650 px (for example 1024x600 or 320x480) the 520 px hero minimum extends below the first screen; this is by design of the token.
3. Wikimedia Commons photographs, demonstration course data and fictional contact details are unchanged (see the earlier reports); About, Courses, Certification, Contact and Login links still go to pages that do not exist yet.
4. Dark-mode separation of the Home 1 band was verified by contrast ratio (1.6:1 against the dark page) plus its markers; if you want a stronger break in dark mode, I can lighten the band.
5. Not tested: Firefox, Safari, real devices or a screen reader.
6. `public/dev/components.html` still exists (noindex); delete before launch.

Waiting for your review before any further work.
