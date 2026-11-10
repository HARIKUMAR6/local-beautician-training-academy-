# Phase 3 — Home 1 & Home 2 Implementation Report

> **Superseded in part by `PHASE-3-HOMEPAGES-CORRECTION-REPORT.md`:** Home 2 was fully redesigned, hero heights unified, the footer Follow section replaced by icons, and Live Server routing fixed. Sections 1 to 2, the Home 2 tests and the footer description below describe the earlier version.

**Status:** Complete, awaiting review. Nothing beyond the two homepages was built. Phase 4 has not been started.

## 1. Section plan (exactly 7 main sections per page)

| Page | # | Purpose | Visual direction |
|---|---|---|---|
| Home 1 | 1 | Cover: positioning and primary calls to action | Large serif headline left, tall arch-cropped photo right, folio meta strip, swatch dots |
| Home 1 | 2 | Philosophy: how the academy teaches | One oversized manifesto sentence with two pill-shaped photos set inline, three hairline principles |
| Home 1 | 3 | Courses: five disciplines | Numbered ledger; hovering or focusing a row swaps one large preview photo (stacked under each row on mobile) |
| Home 1 | 4 | Practice: learning at the bench | Asymmetric four-photo collage with offsets, mono captions and a "how we teach" column |
| Home 1 | 5 | Certification: the path to a certificate | Teal brand band, five-step dotted timeline, one dark studio photo |
| Home 1 | 6 | Portfolio: the standard of finish | Mosaic of five photos in mixed spans, solid caption chips |
| Home 1 | 7 | Visit and admissions | Studio photo with address, hours, intakes and enquiry buttons |
| Home 2 | 1 | Choose a path | Split screen: path tabs (Makeup, Skin, Hair, Nails, Bridal) switch a description and a full-height photo; button pre-sets the course finder |
| Home 2 | 2 | A day at the academy | Horizontal scroll-snap strip of five timed photo tiles with prev/next buttons |
| Home 2 | 3 | Course finder | Discipline chips plus a level select filter eight courses, live count, empty state (no photos) |
| Home 2 | 4 | The kit | Flat-lay photo with four hotspots linked to a list of tools |
| Home 2 | 5 | The wall | CSS-column mosaic of six photos that open in a lightbox |
| Home 2 | 6 | Certificate | Sticky intro with a photo beside four large numbered steps |
| Home 2 | 7 | Intakes and enquiry | Wide studio banner, sticky-header intake table, demo enquiry form |

Home 2 also has a sticky section index (01 to 07) under the header with scroll-spy. It is navigation and is not counted as a section. Both pages carry the same core information (positioning, courses, practical training, work samples, certification, admissions, facility) in different structures and interaction models.

## 2. Design differences
Home 1 is a linear editorial read with light interaction (the ledger preview). Home 2 is interactive discovery: tabs, filters, a scroller, hotspots, a lightbox, a form and a persistent index. No section layout, hero or image is shared. Both use the same header, footer, tokens, type and button sizes. Both heroes use the shared `--hero-h` minimum height.

## 3. Files and routes

| Route (served from `public/`) | Source |
|---|---|
| `/index.html` (Home 1, primary; the logo links here) | `src/pages/index.html` |
| `/home-2.html` (Home 2) | `src/pages/home-2.html` |
| `/image-credits.html` | `src/pages/image-credits.html` |

Dev server: `npm run dev` or `node scripts/serve.mjs` at `http://localhost:4173/index.html` and `/home-2.html`. Pages are static and use relative paths (`{{root}}` is resolved at build time), so they also work from a sub-folder or `file://` for everything except the ES modules, which need any static server. The Home dropdown links to both homepages and marks the current one.

```
src/
  pages/            index.html, home-2.html, image-credits.html, dev/components.html
  css/pages/        home-1.css, home-2.css        css/components/sections.css (shared scaffolding)
  config/           site.json, images.json (alt text, assignments, licence data)
  partials/ icons/  header, footer, brand ... (unchanged apart from a new arrow-left icon)
public/
  assets/js/pages/  home-1.js, home-2.js          assets/js/modules/images.js (image fallback)
  assets/images/    home-1/ (19 images), home-2/ (19 images), MANIFEST.md (generated)
scripts/            build-pages.mjs now also validates images and writes the manifest
```

New build behaviour: the build fails if an image key is used twice, is used on a page other than the one it is assigned to, or its file is missing. Result of the final build: `images: 38 used, all unique`.

## 4. Images and licensing

38 photographs (19 per page), each used once, in `public/assets/images/{home-1,home-2}/` as 1600 px and 800 px WebP (responsive `srcset`, explicit dimensions, lazy loading except the hero images). The full mapping to page, section and licence is in `public/assets/images/MANIFEST.md` and `src/config/images.json`.

**Source and verification.** All photographs come from Wikimedia Commons. For each file I read the licence name, licence URL, author and source page from the Commons API at download time. 9 are CC0 or public domain (no attribution needed) and 29 are CC BY or CC BY-SA 2.0 to 4.0. I excluded NC, ND and unknown licences. The credits page `/image-credits.html` lists every image with author, licence link and source link. It is reached from the last section of each homepage. There is no credit section in the footer.

**Limits of that verification.**
- I verified the licence as stated on Commons. That is not legal clearance. Commons uploaders can be wrong, and I did not check each upload's chain of title.
- Photographs of identifiable people may need model releases for some commercial uses. Commons does not guarantee releases.
- CC BY-SA requires adaptations (including crops and conversions) of those images to be shared under the same licence; the credits page says so.
- The images are illustrative. They do not show Sorrel students, trainers or facilities, and captions are written so they do not claim that. The credits page states it.
- The image quality is documentary and uneven rather than glossy commercial photography. For a real launch, replace them with the academy's own photography (swap the files and the entries in `images.json`).
- I replaced several candidates that showed third-party brands or named individuals' events, or showed children, and rejected low-quality ones. Faint third-party text can still appear on a few clothing items.

**Fallback.** Missing or broken images keep their frame and show the alt text on a tonal block (`modules/images.js`). I tested the normal case (all 38 load) and did not simulate a missing file.

## 5. Testing — what was actually run
Tools: Edge (Chromium 157) via Playwright-core and axe-core, kept outside the project (no new project dependencies). Local static server. Final run after the last code change.

| Suite | Result |
|---|---|
| Homepages (`qa-home`) | **193 / 193 passed** |
| Phase 2 regression on the component page | 587 / 587 passed |
| Brand suite | 60 / 60 passed |
| `node scripts/check.mjs` (no physical left/right) | OK |
| `npm run build` (CSS + pages + image validation) | OK |

**Per page (Home 1 and Home 2):** exactly 7 `main > section` elements, each with a heading, one `h1`; all images load, have alt text, are not distorted (`object-fit: cover`), and are unique within the page; no image is shared between the two pages (19 and 19 distinct files); logo points to `index.html`; no `#` links in main content; Home dropdown stays closed on hover, opens on click, lists only Home 1 and Home 2 with the current page marked; scroll-to-top works; reload keeps both pages working; no console or network errors.

**Theme × direction × viewport (each page):** light and dark, LTR and RTL, at 1440 px desktop and 390 px mobile (8 combinations). In each: theme and direction applied, no horizontal overflow, headings never right-aligned, headings/buttons/captions inside the viewport, and axe WCAG 2.2 A/AA plus best-practice with **zero violations** (this covers text contrast in light and dark). The English text of `main` is identical when direction flips, and nothing overflows after flipping.

**Width sweep (each page, LTR and RTL):** 320, 360, 375, 390, 430, 768, 1024, 1280, 1440, 1920 px. No page-level overflow and no content outside the viewport (the day strip, intake table and section index scroll inside their own containers by design).

**Interactions:** Home 1 ledger hover and keyboard focus swap the preview. Home 2: tab switching and arrow keys, "Find nail courses" pre-sets the finder (2 results), level filter, empty state, day strip next button (and in RTL it moves forward and starts at the right), kit list and hotspots, lightbox opens at full size and closes with Esc, form validation, demo confirmation, scroll-spy index.

**Bugs found and fixed during this phase:**
- Finder rows put the "View course" button on its own line (grid had one column too few).
- Footer and some sections left a stray bone band above the footer (footer top margin removed).
- Teal certification band link was unreadable dark-on-dark.
- In RTL, English labels and short sentences reordered (for example "WEEKS 12" and a leading full stop). Fixed with per-element bidi isolation plus explicit right alignment for body text only; headings stay centred.
- Several weak or off-brand images were swapped (poor phone photo, cluttered studio, dated salon scan, third-party-branded and named-event photos).

## 6. Accessibility
Semantic landmarks and one `h1` per page; every section labelled by its heading; visible focus rings; keyboard support for tabs (arrow keys), dropdown, mobile menu, filters, hotspots (via the list), lightbox (native `dialog`, Esc) and scrollers (focusable regions); decorative inline photos have empty alt; hotspot dots are hidden from assistive technology because the tool list is the accessible control; reduced-motion respected (smooth scrolling and transitions disabled); no autoplay or unnecessary animation. Not tested: a real screen reader.

## 7. Build status
`npm run build` succeeds (Tailwind CSS 4 minified to about 45 KB; three static pages built). Total image payload about 8 MB across 76 files, loaded lazily.

## 8. Files created or modified
**Created:** `src/pages/index.html`, `home-2.html`, `image-credits.html`; `src/css/pages/home-1.css`, `home-2.css`; `src/css/components/sections.css`; `src/config/images.json`; `src/icons/arrow-left.svg`; `public/assets/js/pages/home-1.js`, `home-2.js`; `public/assets/js/modules/images.js`; `public/assets/images/` (76 WebP files and the generated `MANIFEST.md`); this report; built `public/index.html`, `home-2.html`, `image-credits.html`.
**Modified:** `scripts/build-pages.mjs` (image tokens, uniqueness checks, credits, manifest), `src/css/main.css` (imports), `src/css/base.css` (RTL text rules), `src/css/components/footer.css` (footer top margin), `public/assets/js/main.js` (image fallback).
Header, footer and brand partials were not redesigned.

## 9. Known issues and pending items
1. **Pages that do not exist yet** return 404: About, Courses (and its `#makeup` anchors), Certification, Contact and Login. The links are intended destinations for later phases. The test confirmed the Home 1, Home 2 and credits links work.
2. **Demonstration copy:** course names, durations, formats, intake months and the "weeks" figures, plus the process steps, are illustrative and not business facts. The enquiry form validates but sends nothing and says so; there is no backend.
3. **Photography is stand-in imagery**, documentary in style, not the academy's own, and may need model releases (see §4).
4. The ledger photo preview is hover/focus driven on desktop; on touch screens all five photos are shown stacked under their rows.
5. The kit hotspots are positioned for this specific photo; swapping the photo means re-positioning them.
6. Not tested: Firefox, Safari, real phones or tablets, a real screen reader, performance audits. "Tablet" is covered by 768 and 1024 px in the sweep.
7. The dev page `public/dev/components.html` still exists (noindex); delete before launch.

## 10. Preview
Open `http://localhost:4173/index.html` and `/home-2.html` after `node scripts/serve.mjs`. Screenshots were reviewed during development (desktop light, dark RTL, mobile light and dark, RTL ledger) but are not saved in the project.

## 11. Decisions that need your approval
1. Accept the Wikimedia Commons photography (with credits page) as interim imagery, or provide the academy's own.
2. Approve the demonstration course catalogue and figures, or send real ones.
3. Confirm Phase 4 scope and that I may start it.
