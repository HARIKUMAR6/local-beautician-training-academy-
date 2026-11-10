# Final Website QA Report: containers, responsiveness, alignment and buttons

**Status:** corrections are complete and regression-tested, awaiting review. Nothing was redesigned, no content or sections were removed, no dependencies were added, and no new features were built.

## 1. Summary

**The main problem was the container system.** The header and footer used a 1440 px container (`.container-wide`) while every section used 1200 px (`.container-x`). From 1440 px up, the logo, navigation and footer started about 72 px further out than all page content (120 px further at 1920). Three sections also put their text in the wide container: the About hero, the Home 2 hero, and the Contact map.

**Fix:** one shared token, `--container-max: 1200px`, used by `.container-x`. The header, mobile menu, footer and every section now use it. At every width, all content starts and ends on the same two lines. The dashboard got the same treatment with its own token (`--app-max`), shared by its top bar and its views.

**Buttons:**
- The three sizes are now tokens.
- Page-specific height overrides were removed, and form submits were unified.
- A single mobile rule centres every CTA and stacks button pairs at equal widths.
- Card buttons in a row now align, through a subgrid.

**Theme toggle:** the menu's existing theme toggle moved into a labelled "Theme" row. The phone header shows none.

**Testing:**
- Automated audit, before and after, at all 10 widths × LTR and RTL on all 8 pages (160 page loads each time).
- Final QA checks: **407 / 407**.
- Earlier regression suites:

  | Suite | Result |
  |---|---|
  | Phase 2 components | 587 / 587 |
  | Phase 3 homepages | 196 / 196 |
  | Phase 4 About/Contact | 330 / 330 |
  | Portal smoke test | 29 / 29 |

- Visual inspection of screenshots, including alignment guide lines.

## 2. Pages audited

| Page | File | Notes |
|---|---|---|
| Home 1 | `index.html` | |
| Home 2 | `home-2.html` | |
| About | `about.html` | |
| Contact | `contact.html` | |
| Courses | `courses.html` | |
| Certification | `certification.html` | |
| Student Login | `login.html` | portal; no public header or footer |
| Student Dashboard | `dashboard.html` | app shell; all 6 views were checked by the portal smoke test |

`image-credits.html` no longer exists in the project; it was removed by another session before this phase (see §16). `dev/components.html` is a development-only page and was not audited.

## 3. Viewports tested

320, 360, 375, 390, 430, 768, 1024, 1280, 1440 and 1920 px, each in LTR and RTL, on all 8 pages: 160 page loads per audit run. Extra runs:
- the theme-toggle test at 320 and 390 px;
- the desktop-toggle test at 1280, 1440 and 1920 px;
- axe at 1440 and 390 px in light and dark, LTR and RTL;
- the earlier suites' own viewport sets.

## 4. Global container system

**The system** (`tokens.css` and `base.css`):
- `--container-max: 1200px` and `.container-x` (`max-width: calc(var(--container-max) + 2 * var(--gutter))`, `padding-inline: var(--gutter)`): **the** content container for the header, mobile menu, footer and all sections.
- `--gutter: clamp(16px, 4vw, 48px)`: unchanged, so the side padding stays responsive (16 px on phones, 48 px on desktop).
- `--container-wide-max: 1440px` and `.container-wide`: kept, documented as reserved for intentionally wide media. No public page uses it now.
- `--app-max: 1320px`: the dashboard's content width. The top bar uses `padding-inline: max(var(--gutter), calc((100% - var(--app-max)) / 2 + var(--gutter)))`, so it lines up exactly with `.db-main`.

Section backgrounds (teal bands, alt surfaces, the map band and the footer) still run full width. Only their content sits inside the container.

**Measured result.** The audit compares each container's content edges with the header's.

| | Before | After |
|---|---|---|
| Containers not aligned with the header | 140 instances on 6 public pages, all at 1440 and 1920 px | **0** |
| Footer vs header | misaligned from 1440 px | **0** |
| Content escaping its container | 0 | **0** |
| Dashboard top bar vs views | not measured | **0** |

Screenshots at 1440 px with guide lines at the header's content edges confirm it. The logo, every section's eyebrow, heading, image and card edges, the footer columns and the copyright all sit on the same two lines (Home 1, About, Home 2). The dashboard at 1920 px shows the top bar title and search on the same edges as the view content.

## 5. Header and footer

| | Before | After |
|---|---|---|
| Header content box at 1440 px | 48 to 1392 px | 120 to 1320 px, identical to all sections |
| Footer content box at 1440 px | 48 to 1392 px | 120 to 1320 px |

The desktop navigation still fits from 1280 px (it already worked in 1184 px at that width).

**Side effect fixed:** in the narrower footer, the email address broke mid-word ("…examp / le"). The column widths were rebalanced (desktop: brand 4, explore 2, courses 2, contact 4 of 12 columns; 768–1023 px: explore 3, courses 3, contact 6). The email now fits on one line at all 7 widths checked (320 to 1920 px). The footer layout and content are unchanged.

## 6. Section-by-section container consistency

| Page | Change | Result |
|---|---|---|
| Home 1 | none needed (all sections already used `.container-x`) | aligned with the header and footer at all widths |
| Home 2 | hero title row and expanding photo panels: `container-wide` → `container-x` (the panels carry text and buttons, so they are content) | aligned; the panels fill the container exactly (open panel 738 px + 4 × 105 px + gaps = 1200 px) |
| About | hero frame: `container-wide` → `container-x` (the hero's text panel had started 72 px left of the content line) | aligned |
| Contact | map wrapper: `container-wide` → `container-x` | aligned; the map section still contains only the map |
| Courses, Certification | none needed | aligned |
| Login | portal layout with no public header; panel and form use the shared gutter | no overflow at any width |
| Dashboard | top bar uses `--app-max` with the same formula as `.db-main` | top bar and views aligned at 1280, 1440 and 1920 px |

## 7. Responsive issues found and corrected

| Issue found | Correction |
|---|---|
| Header/footer vs section containers misaligned from 1440 px (all public pages) | one shared container (§4) |
| About and Home 2 hero text, and the Contact map, in the wide container | moved to the global container |
| Footer email wrapping mid-word after the container fix | footer column rebalance (§5) |
| Contact course tiles at 320 px: tile content 148 px wide in a 136 px tile (the button's minimum width) | `.btn-fluid` uses a tighter token padding (`--btn-px-fluid: 12px`) and the tile children may shrink (`min-width: 0`); tiles now fit exactly |
| Dashboard top bar not aligned with the content at wide screens | `--app-max` (§4) |

**Checked and found clean, before and after:** no horizontal page overflow on any page, width or direction, and no element outside the viewport. Intentional horizontal scroll strips (Home 2 timeline) are excluded and scroll inside their own frame.

**Fixed-height heroes:** a new audit check confirms that no heading, lede, eyebrow or button is clipped by the fixed-height heroes (Home 1, Home 2 and the inner pages). This matters because the stacked mobile CTAs take more height. The result is 0 clipped.

## 8. Text, card and image alignment

- **Headings:** none right-aligned on any page, width or direction (audit: 0; axe and the earlier suites agree). In RTL they stay centred.
- **Text:** no clipped text (audit check for overflowing text in clipping containers: 0, apart from the tile issue in §7, now fixed).
- **Cards:** on Contact, the course tiles became a 4-row subgrid (photo, title, text, button). Titles, descriptions and buttons now line up across each row, even when "Makeup Artistry" wraps to two lines and "Skin Care" does not (seen at 390 px). The audit's card-button check (bottoms of buttons in the same row within 2 px) reports 0 misalignments on all pages before and after.
- **Images:** all `.media` images use `object-fit: cover`, so nothing is stretched or distorted (audit: 0). No broken images on any page (final QA, both themes and directions: 0). Aspect ratios within each component group were not changed.

## 9. CTA button sizing

**System** (`tokens.css` and `buttons.css`): `--btn-h-sm 40px`, `--btn-h-md 48px`, `--btn-h-lg 56px`, and matching `--btn-px-*` padding. `.btn`, `.btn-sm` and `.btn-lg` read the tokens. Typography, radius and the hover, focus, active and disabled states are unchanged.

| Role | Size |
|---|---|
| Hero, section and form-submit CTAs | md, 48 px |
| Card, header and dashboard actions | sm, 40 px |
| (reserved) | lg, 56 px; no longer used on any page |

Icon buttons, social icons, the direction toggle and the segmented controls are deliberately outside this system.

**New reusable modifier:** `.btn-fluid` lets a label wrap in narrow cards, keeping the variant's minimum height. The parent grid aligns the row.

| Corrected | Before | After |
|---|---|---|
| Home 1 and About hero buttons on mobile (page overrides) | 44 px | 48 px (overrides removed) |
| Contact "Send enquiry" and Login "Sign in" (form submits) | 56 px | 48 px, same as the Home 2 enquiry submit |
| Contact tile buttons | ad-hoc `height: auto` rule on the page | `.btn-sm.btn-fluid`, equal heights within a row via subgrid |

**Audit, before → after:** 86 off-size buttons on 3 pages → **0**; 40 `btn-lg` uses on 2 pages → **0**; clipped button labels 0 → **0**. The portal smoke test also confirms the dashboard's buttons are 40 px (sm) or 48 px (md).

## 10. Mobile CTA alignment

**Rule** (`buttons.css`, below 768 px):
- Every non-link `.btn` spans its container, so it is centred by construction.
- `.btn-row` stacks its buttons with equal widths and a 12 px gap, and stretches to its container.

Text links and icon controls are unaffected.

**Audit, before → after:**

| Check | Before | After |
|---|---|---|
| CTAs not centred | 113 on 7 pages (measured against the button's immediate parent) | **0** (measured against the enclosing container or card, a stricter check) |
| Pairs with unequal widths | 60 on 4 pages | **0** |

The stricter check was added after a screenshot showed the hero pair still sitting to one side: the button row itself was shrinking to its content. The row now stretches as well.

**Visually checked:**
- Home 1 hero at 375 px: both CTAs full width and equal.
- About hero at 360 px in dark RTL: same.
- Contact tiles at 390 px.
- Login at 390 px: Sign in spans the form.

## 11. Mobile theme toggle

**Before:** the phone header already hid its theme toggle below 768 px (an earlier change by another session). The open menu had a toggle as an icon in its top bar, next to Close.

**Change:** the same menu button moved into a labelled **Theme** row in the menu footer, above the existing **Layout** (LTR/RTL) row. No new toggle was created. Each menu still has exactly one theme toggle, with the same sun and moon icons, the same accessible labels from the shared theme module, and the same localStorage persistence. The desktop header toggle was not touched.

| Test, actually executed | Result |
|---|---|
| The brief's 8 steps on 6 public pages × LTR/RTL × 390 and 320 px (24 runs, 168 checks): no toggle in the visible header; menu opens with exactly one visible toggle in the Theme row; light → dark changes the page (background, label and icon update); close and reopen keeps dark; refresh keeps dark; header still has no toggle; direction unchanged | **168 / 168** |
| Desktop at 1280, 1440 and 1920 px on 6 pages: header order unchanged (theme, LTR/RTL, Student Login, Enquire) and the toggle still switches theme | **36 / 36** |

## 12. LTR and RTL regression

Every audit and test above ran in both directions:
- containers aligned (0 issues);
- no overflow;
- headings never right-aligned (centred in RTL);
- CTAs centred;
- tiles aligned;
- header, mobile menu (the RTL switch inside the menu still works), footer and dashboard drawer fine.

English content is identical in both directions; the earlier suites check this, and they passed. No Arabic text, fonts or language controls were added. The new CSS uses logical properties only (`node scripts/check.mjs`: OK).

## 13. Files modified

From `git diff` against the baseline commit `0df330b`, sources only; the `public/` files are build output.

| File | Change |
|---|---|
| `src/css/tokens.css` | container tokens, `--app-max`, button size and padding tokens |
| `src/css/base.css` | `.container-x` / `.container-wide` read the tokens; documented |
| `src/css/components/buttons.css` | token-based sizes, `.btn-fluid`, mobile CTA rule |
| `src/css/components/footer.css` | column rebalance |
| `src/css/pages/home-1.css`, `about.css` | removed the 44 px hero button overrides |
| `src/css/pages/contact.css` | tile subgrid, removed ad-hoc button rules, RTL tile alignment |
| `src/css/pages/dashboard.css` | top bar and views share `--app-max` |
| `src/partials/header.html` | header and menu wrappers → `.container-x`; menu theme toggle moved into a "Theme" row |
| `src/partials/footer.html` | footer wrapper → `.container-x` |
| `src/pages/about.html` | hero frame → `.container-x` |
| `src/pages/contact.html` | map wrapper → `.container-x`; tile buttons `.btn-fluid`; submit size md |
| `src/pages/home-2.html` | hero title row and panels → `.container-x`; kit pin accessible names (§15) |
| `src/pages/login.html` | Sign in size md |

`scripts/build-pages.mjs` also shows a diff, but **it was not changed by me**. Another session edited it at 16:28 during this phase: the footer's Explore list now shows "Student Dashboard" once instead of repeating the Dashboard nav item. I left it as is.

## 14. Automated test results (all actually executed on the final build)

Tools: Edge (Chromium) via playwright-core, axe-core 4.x, and the local server. The scripts are kept outside the project, so there are no new dependencies.

| Run | Result |
|---|---|
| Layout audit (8 pages × 10 widths × LTR/RTL = 160 loads): containers, overflow, headings, button sizes, mobile centring, pair widths, card button rows, hero clipping, dashboard alignment, clipped text, broken images, console errors | before: 439 issues in 5 categories; **after: 0** |
| Final QA (407 checks): mobile theme toggle (168), desktop toggle (36), navigation and mobile menu (11), and **axe WCAG 2.2 A/AA + best practice, broken images and console/network errors on all 8 pages × light/dark × LTR/RTL × 1440/390 px (192)** | **407 / 407** |
| Portal smoke test on the current login and dashboard (desktop and 390 px): honest login messages, password toggle, Sign in size and navigation, all 6 dashboard views, drawer, dropdown, button sizes, no errors or POST | **29 / 29** |
| Phase 4 About/Contact suite | **330 / 330** |
| Phase 2 components suite | **587 / 587** |
| Phase 3 homepages suite | **196 / 196** |
| `npm run build` | OK (`images: 82 used, all unique`) |
| `node scripts/check.mjs` | OK |

**Executed but not usable:** the Phase 6 login/dashboard suite. Its dashboard group stops at a "Mark all as read" control that no longer exists, because the dashboard was replaced with an empty-state version by another session before this phase. The suite tests that older dashboard, so its results do not describe the current page. The portal smoke test above replaces it for this phase.

**Not executed:** Firefox and Safari, physical phones and tablets, a real screen reader, Lighthouse or performance audits, and the Live Server extension itself (the local static server serves the same `public/` folder).

## 15. Manual visual inspection

I viewed and checked these screenshots:
- Home 1 at 1440 px with header guide lines (header, hero, philosophy band, courses ledger);
- About at 1440 px, journey section, vision and footer, with guide lines;
- Home 2 hero at 1440 px (panels fill the container);
- the dashboard at 1920 px with guide lines;
- Home 1 hero at 375 px and About hero at 360 px in dark RTL (CTAs before and after);
- the mobile menu at 390 px with the Theme row;
- Contact tiles at 390 and 1024 px;
- Login at 390 px.

**Found visually and fixed:**
- the hero CTA pair not centred (§10);
- the footer email breaking mid-word (§5).

One Home 2 screenshot showed the closed photo panels missing. Measuring the live page showed correct panel widths, and a retake without the scroll pass showed the correct layout. It was a capture artifact.

**Also found and fixed (pre-existing, outside the layout scope):** axe reported `label-content-name-mismatch` on the four Home 2 kit-photo pins. Their labels ("Palettes") did not contain the visible text ("1 Palettes"), and the number and tag had no space between them. The labels are now "1 Palettes" and so on, with a space added between the spans. The spans are absolutely positioned, so nothing visible changed. axe now reports 0 on Home 2 in all 8 combinations.

## 16. Remaining issues and limitations

1. **Image credits page removed.** It was removed by another session before this phase, and no page links to credits. Most photos are CC BY or CC BY-SA, which **require attribution**, so this is a licence-compliance gap. I did not restore it, because this phase must not add or remove content. It needs your decision.
2. **Dashboard content.** The dashboard is now the other session's empty-state version, not the Phase 6 sample-data version. I audited and tested it as it is. The Phase 6 report still describes the earlier version (its top note says so).
3. **Other sessions edited this project during this phase.** The edits seen were `build-pages.mjs` at 16:28 and a Git commit, "new changes", at 16:34. My final runs were made after the last of those edits; no source file changed between my last fix and the final results.
4. **The Home 2 kit-pin fix** was confirmed by the final QA run (407/407). The layout audit ran just before that one-attribute change, which doesn't affect layout.
5. **Test coverage limits:** see "Not executed" in §14. The width sweep used fixed heights per width; very short landscape phones were not tested.
6. **`btn-lg` (56 px) is now unused.** It is kept as a reserved size in the token system.
