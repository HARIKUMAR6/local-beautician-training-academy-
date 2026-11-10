# PHASE 2 — Global UI Components: Implementation Report

**Status:** Complete, awaiting review. Phase 3 has not been started.
**Update:** the working name "Aurelle" and the temporary monogram described below were later replaced by the final "Sorrel" identity; see BRAND-IDENTITY-REPORT.md. Test counts below are from the Phase 2 run (the suite was re-run after rebranding: 587/587).
**Scope:** Shared components only. No Home 1, Home 2, About, Courses, Certification, Contact, Login or Dashboard pages were built.

## 1. Components implemented
1. Main header (sticky, hairline border, skip link)
2. Brand wordmark with monogram (inline SVG; stays visually stable in RTL)
3. Primary navigation (Home, About, Courses, Certification, Contact)
4. Home dropdown (exactly two options: Home 1, Home 2)
5. Courses navigation — **implemented as a plain link, not a dropdown** (see §10, decision 1)
6. Mobile / tablet navigation (full-screen menu sheet)
7. Light / Dark theme toggle (icon-only)
8. LTR / RTL direction toggle (text labels only)
9. Buttons: primary, accent, secondary (outline), text link; sizes 40 / 48 / 56 px; icon button
10. Form fields (input, select, textarea, checkbox) so forms could be tested in both themes
11. Reusable utilities: tokens, fluid type scale, containers, icon system, disclosure/dropdown/accordion script
12. Global footer
13. Scroll-to-top button
14. Build-time shared-component integration (`scripts/build-pages.mjs`)

## 2. Files created / modified
Only new files were created. The Phase 1 document was not modified. Nothing unrelated existed in the workspace.

| Area | Files |
|---|---|
| Project | `package.json`, `package-lock.json`, `node_modules/` (Tailwind only) |
| CSS source | `src/css/main.css`, `tokens.css`, `base.css`, `components/buttons.css`, `forms.css`, `header.css`, `footer.css`, `scroll-top.css` |
| Partials | `src/partials/head.html`, `brand.html`, `header.html`, `dir-toggle.html`, `footer.html`, `scroll-top.html` |
| Icons | `src/icons/` — `sun`, `moon`, `menu`, `close`, `chevron-down`, `arrow-right`, `arrow-up` (.svg) |
| Config | `src/config/site.json` (name, nav, footer data, contact/social placeholders) |
| JS | `public/assets/js/main.js`, `modules/storage.js`, `theme.js`, `direction.js`, `disclosure.js`, `mobile-menu.js`, `scroll-top.js` |
| Build tools | `scripts/build-pages.mjs`, `serve.mjs`, `dev.mjs`, `check.mjs` |
| Assets | `public/assets/fonts/` (Fraunces, Instrument Sans, JetBrains Mono — variable WOFF2, OFL, self-hosted), `public/favicon.svg` |
| Dev-only page | `src/pages/dev/components.html` → `public/dev/components.html` (buttons, form fields, spacer for scroll testing; `noindex`; **delete before launch**) |
| Generated | `public/assets/css/styles.css`, `public/dev/components.html` |

Dependencies: `tailwindcss` and `@tailwindcss/cli` (v4) only. Fonts were fetched via a temporary scratch install of `@fontsource-variable/*`; those packages are **not** in the project.

Commands: `npm run build` (CSS + pages), `npm run dev` (watch + server at http://localhost:4173), `node scripts/check.mjs` (RTL lint).

## 3. Header and dropdown
- **≥ 1280 px:** brand at inline-start, centred nav, actions at inline-end (theme toggle, LTR/RTL toggle, Student Login [secondary], Enquire [primary]). Both header buttons are 40 px high.
- **< 1280 px (tablet and mobile):** brand, theme toggle and a menu button. Nav, Login and Enquire move into the menu. Tablet uses this layout rather than a cramped desktop nav. The LTR/RTL toggle stays in the bar from 768 px and is always inside the menu.
- **Active state:** the current page gets `aria-current="page"` and a clay underline, written at build time from `<body data-page="…">`.
- **Home dropdown (desktop):** closed on load. Hover never opens it (verified). Click toggles it; outside click, `Esc`, choosing an option, and tabbing away all close it. `Esc` returns focus to the trigger. `Enter` opens it, `ArrowUp`/`ArrowDown`/`Home`/`End` move through options. The panel is anchored to the trigger's inline-start edge. It holds only the two links, with no subtitles.
- **Mobile menu:** full-screen dialog (`role="dialog"`, `aria-modal`), focus trapped, `Esc` and close button work, page scroll locked while open, closes on link choice or when the viewport grows to desktop. The Home entry is an accordion that is closed by default.

## 4. Theme toggle
- Tokens are CSS variables on `:root` and `[data-theme="dark"]`, taken from the Phase 1 tables. Tailwind utilities (`bg-bg`, `text-fg`, …) read them, so everything flips together.
- A small inline script in `<head>` (from `head.html`) sets theme and direction before first paint. The only inline script on the page is this one.
- Saved in `localStorage` (`aca-theme`). With no saved choice the system preference is used and followed until the visitor chooses. Other tabs sync via the `storage` event. All storage access is wrapped so blocked storage does not break the page.
- Icon-only button (sun/moon) with a state-aware label ("Switch to dark theme" / "Switch to light theme").

## 5. Direction toggle
- A two-button group with the visible text **LTR** and **RTL**, no icons, `aria-pressed` state. The group is fixed to `dir="ltr"` so the order never flips.
- It changes only `<html dir>`. `lang` stays `en`, and no content or fonts change. Saved in `localStorage` (`aca-dir`).
- Layout uses logical properties throughout (`inset-inline-*`, `padding-inline`, `text-align` via logical utilities, etc.). `scripts/check.mjs` lints for physical left/right properties, with two documented exceptions in `base.css`.
- Directional arrows get `icon-dir` and mirror in RTL; the logo and non-directional icons do not.
- **Headings:** left-aligned in LTR and centred in RTL, set once in `base.css` for all `h1`–`h6`. Never right-aligned.
- **Body text in RTL:** English text blocks keep left-to-right reading order, so punctuation does not jump (an earlier build showed ".record" at the start of a line) while block alignment mirrors to the right edge. This needed an explicit `text-align: right` for paragraphs, definition values and field messages only, never headings.

## 6. Footer
Inverted brand band with numbered folio columns and hairline rules, no cards: brand + short intro; 01 Explore (Home 1, Home 2, About, Courses, Certification, Contact, Student Login); 02 Courses; 03 Visit & contact; 04 Follow; copyright line. Four columns on desktop, brand on top with three columns on tablet, stacked on mobile. No image-credit section. Light and dark themes are supported; RTL mirrors the column order.

Contact details and social links are **placeholders** from `site.json` (`[Academy address]`, `[Phone number]`, etc.; social URLs are empty). Empty-URL social links render as non-navigating `#` links that do not jump the page.

## 7. Scroll-to-top
48 px circle, hidden at the top and shown after 600 px of scrolling. It smooth-scrolls to the top (instant under reduced motion) and moves focus to `<main>`. It sits at the inline-end corner (right in LTR, left in RTL), uses safe-area insets on phones, and has the label "Back to top". It stays out of the tab order while hidden. On mobile the footer's copyright line has extra end padding so the button never covers it.

## 8. Responsive behaviour
Breakpoints: 480 / 768 / 1024 / 1280 / 1536. Full desktop nav from 1280. Below 1280 a menu sheet replaces it. Below 376 px the brand tagline is hidden so the header fits (a real overflow found at 320 px and fixed). Footer layout changes at 768 and 1024.

## 9. Testing results
All tests below were **actually executed** with Microsoft Edge (Chromium 157) driven by Playwright-core, plus axe-core 4.x for accessibility and contrast, against the built dev page. The test scripts live outside the project (scratch directory), not in the repo, since Phase 1 deferred Playwright. Total: **575 checks, 575 passed** on the final run.

| Theme | Direction | Viewport | Checks | Result |
|---|---|---|---|---|
| Light | LTR | Desktop 1440×900 | 47 | Pass |
| Light | RTL | Desktop | 47 | Pass |
| Dark | LTR | Desktop | 47 | Pass |
| Dark | RTL | Desktop | 47 | Pass |
| Light | LTR | Tablet 820×1180 | 47 | Pass |
| Light | RTL | Tablet | 47 | Pass |
| Dark | LTR | Mobile 390×844 | 43 | Pass |
| Dark | RTL | Mobile | 43 | Pass |
| Dark | LTR | Tablet / Light LTR+RTL, Dark RTL Mobile | 47 / 43 | Pass (also run) |
| Global | — | no-flash, system theme, blocked storage, keyboard | 7 | Pass |
| Edge widths | LTR+RTL | 320, 360, 480, 768, 1023, 1024, 1279, 1280, 1366, 1920 | 20 | Pass |

Per combination, the checks cover: header alignment and no overlap; brand/actions at the correct inline side; dropdown behaviour (closed by default, no hover open, click open, outside click, Esc, selection closes, keyboard, position inside viewport); mobile menu (open/close, accordion, focus trap, controls inside viewport, in-menu theme toggle); theme and direction toggles and their persistence across reload; content text identical after switching direction; heading alignment; no horizontal overflow; scroll-to-top show/hide/click/position; footer layout, placeholders and no image-credit section; axe WCAG 2.2 A/AA + best-practice with zero violations (this includes colour contrast in both themes, including the buttons, form fields and footer); no console, page or network errors.

I also viewed screenshots for desktop light LTR and dark RTL with the dropdown open, the footer in both directions, the mobile menu in RTL dark, and the mobile footer. This visual review found and led to fixes for the RTL punctuation issue, the mis-aligned RTL placeholder values, and the scroll button covering the mobile copyright line.

**Not tested / limits:**
- Only Chromium (Edge) was tested. Firefox and Safari were not.
- Tablet means 820 px wide plus the width sweep; no physical devices.
- Contrast was verified by axe on the dev page. It cannot check text over photography; none exists yet.
- axe cannot assess every state (e.g. hover colours). Hover/active colours were checked by computed ratio in Phase 1 for the palette, not re-measured in the browser.
- Screen-reader behaviour was not tested by hand.
- I did not run a Lighthouse/performance audit.

## 10. Remaining issues, deviations and open items
**Decisions I made that you may want to change**
1. **Courses is a plain link, not a dropdown.** The real course list does not exist yet, and I did not want to invent one. The footer "Courses" column uses provisional category names (Makeup, Skin, Hair, Nails, Bridal) from the Phase 1 plan, clearly marked in `site.json`. Replace them with the real list.
2. **Partials live in `src/partials/`** (Phase 1 showed `public/partials/`), because they are build inputs and not deployed files. Source pages go in `src/pages/` and build to `public/`, as Phase 1 §13.3 anticipated.
3. **Phase 1's `.heading-align` utility is not needed.** Heading alignment is applied globally in `base.css` (left in LTR, centred in RTL), with identical behaviour. Individual sections can still override with `text-center`.
4. **Desktop nav starts at 1280 px** (Phase 1 left this open). At 1024–1279 the full nav, two buttons and both toggles do not fit, so those widths use the menu.
5. **Header is a solid bar everywhere.** Phase 1 mentioned a transparent header over the Home 1 hero. That is a page-level variant and is deferred to Phase 3.
6. **Mono font:** JetBrains Mono, as proposed in Phase 1 (used only for small labels).
7. **Brand name/logo is still the working placeholder** "Aurelle Academy of Beauty" and a simple monogram (Phase 1 pending decision #1). The tagline, intro text and all contact fields are draft placeholders.

**Known limitations**
- Links to `index.html`, `home-2.html`, `about.html`, `courses.html`, `certification.html`, `contact.html` and `login.html` will 404 until those pages exist. Only `dev/components.html` is built.
- Login and Enquire links are plain links; there is no auth or form handling yet (needs the backend decision from Phase 1).
- The dev page `public/dev/components.html` and its source are temporary.
- `unicode-bidi: plaintext` on body text is a deliberate choice for English-in-RTL; if you later add any right-to-left script, revisit it.

## 11. Phase 1 decisions preserved
- Design concept "The Atelier Notebook", with hairline rules, folio numerals, swatch-chip markers and no cards in the footer: preserved.
- All colour values are the approved tokens (Ink Teal `#12403B`, Bone `#F6F1EA`, Clay `#A8472B`, Brass `#7A5C1E`, Dark `#0E1413`, Mint `#8FD0C2`, Dark accent `#E8957A`, plus the full semantic set). Three footer-only helper tokens (`--on-brand-muted`, `--on-brand-line`, `--on-brand-accent`) and hover tones (`--accent-hover`) were added; each is derived from the palette and contrast-checked.
- Fonts: Fraunces, Instrument Sans, JetBrains Mono (self-hosted, `font-display: swap`).
- English only; LTR/RTL toggle only; no language switcher; headings never right-aligned.
- Stack: HTML5 + Tailwind v4 CLI + vanilla ES modules; no frameworks, no bundler.
- Component specs: buttons 40/48/56 px, 4 px radius; 52 px form fields with labels above; breakpoints; click-only dropdown.

## 12. Awaiting your decision
1. Approve or change the Courses-as-link decision (§10.1) and supply the real course categories.
2. Approve the 1280 px desktop-nav breakpoint.
3. Provide the real academy name/logo, contact details and social URLs (placeholders are in `src/config/site.json`).
4. Confirm I may proceed to Phase 3 (not started).
