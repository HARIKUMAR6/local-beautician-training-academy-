# Brand Identity Finalization Report

**Status:** Complete, awaiting review. Phase 3 has not been started.

> **FICTIONAL DATA DISCLAIMER.** The academy contact details and social handles in this project are **fictional demonstration data**. They are not verified business information. They must be replaced with the real academy's details before launch. See §6.

## 1. Final name: **Sorrel** (full name: *Sorrel Academy of Beauty*)

**Rationale**
- *Sorrel* is a leafy herb, a nod to botanical skincare, and also the name of a warm reddish-brown colour, which echoes the Clay accent in the palette. One word, two syllables, easy to say and remember.
- It reads as a studio or atelier name rather than a salon name, and it is not a "beauty" pun, so it suits an education brand. The descriptor "Academy of Beauty" carries the professional-training meaning.
- It fits the Atelier Notebook idea: understated, crafted and slightly literary, and it sets well in Fraunces.
- **Caveat:** I cannot run a trademark or domain search. "Sorrel" is a common word, so a clearance check is needed before real-world use.

All uses derive from `src/config/site.json` (`name`, `fullName`, `tagline`). The previous placeholder "Aurelle" no longer appears anywhere in config, partials or built pages (verified by test).

## 2. Logo

**Concept.** A monogram in a ring: a single continuous **S** stroke inside a thin circle, with a small clay **swatch dot** sitting on the ring. The ring is a compact, notebook-like mark that also recalls a makeup compact or palette pan. The dot is the swatch chip from the Atelier Notebook system, so the logo shares its vocabulary with the site. It uses no brushes, lipsticks or scissors.

**Wordmark.** "Sorrel" in Fraunces SemiBold with slight negative tracking, over "ACADEMY OF BEAUTY" in JetBrains Mono Medium with wide tracking: the same two typefaces as the site. All lettering is converted to outlines, so the SVGs do not depend on any installed font.

**Variants and where they go**

| Asset | Use |
|---|---|
| `logo-primary.svg` | Full lockup on light backgrounds (ink teal, clay dot, muted tagline) |
| `logo-reversed.svg` | Full lockup on dark backgrounds (bone, coral dot) |
| `logo-mono-ink.svg` | One-colour, dark, for print, stamps, light photos |
| `logo-mono-bone.svg` | One-colour, light, for dark or photographic backgrounds |
| `icon-primary.svg` | Monogram only, light backgrounds |
| `icon-reversed.svg` | Monogram only, dark backgrounds |
| `favicon.svg` | Solid ink-teal disc with bone S and coral dot (legible at 16 px) |
| `favicon-32.png` | PNG fallback favicon |
| `apple-touch-icon.png` (180), `icon-192.png`, `icon-512.png`, `app-icon.svg` | Home-screen and app icons (full-bleed teal square, mark in the safe centre) |

**Location:** `public/assets/brand/`. Favicons are linked from `src/partials/head.html` (SVG, 32 px PNG, Apple touch icon). The old root `public/favicon.svg` was removed.

**On the site.** The header, mobile menu and footer all use one shared partial, `src/partials/brand.html`: an inline SVG of the full lockup whose colours come from theme tokens (so it works in light and dark without separate files). `src/partials/brand-mark.html` is the monogram-only version, ready for the login page and the dashboard's collapsed sidebar. The footer uses a lighter variant on the teal band. The logo link stays `dir="ltr"` so the mark never swaps sides in RTL.

**Regenerating:** the SVGs were produced from the fonts by a one-off generator script kept outside the repo (it needs `opentype.js`). The generator is not part of the build, and the committed SVGs are the source of truth.

## 3. Colour usage in the brand

| Context | Mark / wordmark | Dot | Tagline |
|---|---|---|---|
| Light page | Ink `#12403B` (header uses text colour `#1A1F1E`) | Clay `#A8472B` | Muted `#54605E` |
| Dark page | Bone `#EEE8DE` | Coral `#E8957A` | `#A3B0AC` |
| Footer band (both themes) | Bone | Coral `#E8957A` (new token `--on-brand-dot`) | `#B9CBC7` / `#A9BDB8` |
| Favicon / app icon | Bone on ink-teal | Coral | none |

Contrast measured: ink on bone 10.3, bone on dark 15.3, tagline on bone 5.8, tagline on dark 8.3, footer tagline on teal 6.8. The coloured dot is a graphic and clears the 3:1 graphic threshold on every background (clay on bone 5.2, coral on dark 8.0, coral on teal 4.2).

## 4. Fictional business information (all in `src/config/site.json`)

| Field | Value | Why it is safe |
|---|---|---|
| Name | Sorrel Academy of Beauty | Fictional; trademark not searched |
| Address | Unit 3, Larkspur Yard, 21 Quill Street, Aldermere ZZ1 0AA, United Kingdom | Invented street/town; postcode `ZZ1 0AA` is not a valid UK postcode |
| City / country | Aldermere / United Kingdom | Town invented |
| Phone | +44 20 7946 0173 | Inside the UK range reserved for drama and fiction (Ofcom) |
| Email | admissions@sorrelacademy.example | `.example` is a reserved TLD (RFC 2606) |
| Hours | Mon to Fri 9:00 to 18:00, Sat 10:00 to 16:00, Sun closed | Invented |
| Instagram | @sorrel.academy | Display text only, no URL |
| Facebook | Sorrel Academy of Beauty | Display text only |
| YouTube | @SorrelAcademy | Display text only |
| LinkedIn | Sorrel Academy of Beauty | Display text only |

- **Social handles are not links.** I cannot confirm these handles are unclaimed, and a link could send visitors to someone else's real account. They render as text with `href="#"`, and clicking does nothing. Set a `url` for each in `site.json` once real profiles exist, and they become real links automatically.
- **No accreditation or recognition claims** were invented anywhere.
- The disclaimer is recorded in `site.json` (`_fictional` field) and as an HTML comment at the top of the built footer. It is not shown to site visitors.
- The footer intro line and the provisional course categories are still draft copy.

## 5. Files created / modified

**Created:** `BRAND-IDENTITY-REPORT.md`; `public/assets/brand/` (12 files listed above); `src/partials/brand-mark.html`.
**Replaced:** `src/partials/brand.html` (new logo).
**Modified:** `src/config/site.json`, `src/partials/footer.html`, `src/partials/head.html`, `src/css/components/header.css` (logo rules replaced the old mark/text rules), `src/css/components/footer.css` (logo colours, handle styling, a grid fix so long emails cannot widen a column), `src/css/tokens.css` (one added token), `scripts/build-pages.mjs` (social links now show handles and are marked unlinked), `public/assets/js/main.js` (attribute renamed from `data-placeholder` to `data-unlinked`), `PHASE-1-DESIGN-AND-FOUNDATION.md` and `PHASE-2-IMPLEMENTATION-REPORT.md` (name notes only). **Removed:** `public/favicon.svg` (superseded). Generated files were rebuilt.

The header and footer layouts were not redesigned. Only the logo inside them changed, plus the footer's contact and social content.

## 6. Testing (executed, Edge/Chromium via Playwright, plus axe-core)

- **Phase 2 regression suite, re-run in full: 587 / 587 passed.** This covers all light/dark × LTR/RTL × desktop/tablet/mobile combinations, the width sweep (320 to 1920 px), dropdown and menu behaviour, theme and direction persistence, scroll-to-top, footer layout, keyboard order, and axe WCAG A/AA with zero violations.
- **Brand suite: 60 / 60 passed.** It checks:
  - no leftover old name, and the full asset set present;
  - SVGs contain only outlines (no `<text>`, no external references);
  - every brand asset served with HTTP 200;
  - the header logo (40 px, or 34 px on phones ≤ 376 px), the footer logo (54 px) and the logo inside the open menu, in light-LTR, dark-LTR, light-RTL, dark-RTL, light-LTR mobile, dark-RTL mobile and light-RTL at 320 px;
  - the logo at the inline-start edge in both directions;
  - logo colours following the theme;
  - favicon links present;
  - no overflow and no console or network errors;
  - computed contrast for logo colours.

**Two bugs found by this testing and fixed:** a long email address pushed the footer 8 px wider than the screen at 768 px; and in RTL the "@" of a social handle jumped to the wrong end (fixed by isolating the handle's direction).

**Not tested:** Firefox/Safari; physical devices; the PNG icons were checked for existence and size, not in a real home-screen install; I did not run a trademark/domain search for "Sorrel".

## 7. Phase 1/2 decisions preserved
Atelier Notebook direction, the Ink Teal / Bone / Clay / Brass palette and approved dark values, Fraunces + Instrument Sans (+ JetBrains Mono for labels), English only with the LTR/RTL toggle, light and dark themes, and the click-only Home dropdown are unchanged. One derived colour token was added (`--on-brand-dot: #E8957A`, the existing dark accent).

## 8. Pending
1. Approve the name "Sorrel" and the logo, or ask for changes (name alternatives are easy to swap in `site.json`; a logo change means regenerating the SVGs).
2. Do a trademark/domain check on "Sorrel" if it will be used for real.
3. Replace all fictional contact data and add real social URLs before launch.
4. Approve starting Phase 3 (not started).
