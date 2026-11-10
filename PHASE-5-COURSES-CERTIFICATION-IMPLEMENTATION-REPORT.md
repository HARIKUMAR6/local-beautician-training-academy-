# Phase 5 — Courses and Certification Implementation Report

**Status:** Both pages are complete and tested, awaiting review. No other pages were created in this phase, and the next phase was not started.

> **Note on files outside this phase.** While this phase was in progress, `src/pages/login.html`, `src/pages/dashboard.html`, a `portal` image folder, two `login` / `dashboard` entries in `images.json` and a "Student Dashboard" action in `site.json` appeared in the project (timestamps 13:57 to 14:56). I did not create or edit them. Because the build compiles every page in `src/pages`, my build runs also produced `public/login.html` and `public/dashboard.html`. Those additions change two older test expectations (see section 10).

## 1. Planning table

| Page | # | Purpose | Content | Visual layout |
|---|---|---|---|---|
| Courses | 1 | Hero: what the courses offer | Title, lede, 3 key figures, CTAs | Copy beside a **staggered three-photo film strip** |
| Courses | 2 | Disciplines | 5 disciplines with course counts, jump links | **Five tall portrait tiles** with a clay base bar |
| Courses | 3 | Catalogue: details and outcomes | 8 courses: description, level, length, format, 3 outcomes, entry requirement | **Sticky discipline rail + level filter** beside ruled spec sheets; outcomes in a tinted panel |
| Courses | 4 | Practical training | Typical full-time week | **Colour-coded timetable** (Mon to Fri × 3 sessions) beside two overlapping photos |
| Courses | 5 | Structure: level and progression | Foundation → Advanced → Specialist per discipline; formats; intakes | **Progression lanes** with connectors (stacked on mobile) |
| Courses | 6 | Enquiry | Help choosing a course | Teal copy panel overlapping a framed photo |
| Certification | 1 | Hero: what certification means | Title, lede, CTAs | Copy beside a tall photo stamped with a **rotating SVG seal** |
| Certification | 2 | Completion requirements | Attend, log practice, build portfolio, pass practical | **Large checklist ledger** with ticks, beside a square photo |
| Certification | 3 | Practical assessment process | Prepare → Perform → Review | **Three photo stages**, numbered, middle one offset, joined by connectors |
| Certification | 4 | Evaluation criteria | 5 criteria, 3 levels, pass mark | **Rubric table with a shaded pass zone** beside a detail photo |
| Certification | 5 | After you pass + certificate contents | Result → Certificate → Record → Check; six certificate fields; "it is / it is not" | **Milestone track**, then a **landscape certificate with numbered pins** and a matching legend |
| Certification | 6 | Invitation | Start a course or ask admissions | Portrait with a **brass offset frame** beside a large statement |

## 2. Page-specific design decisions
- Courses reads as a working catalogue: easy to scan, filterable, with every course's level, length, format, outcomes and entry route. Imagery carries sections 1, 2, 4 and 6; the catalogue and progression lanes are deliberately typographic so they stay scannable rather than becoming another photo grid.
- Certification reads as a record: a seal, a checklist, a rubric and an annotated certificate, alternating with photography of practical work.
- No section layout repeats one from Home 1, Home 2, About, Contact or the other new page. The Home 2 certificate (portrait specimen with a stepper) is different from the Certification page's landscape specimen with numbered pins and legend.
- Header and footer were not changed. Courses and Certification were already in the header nav and footer; both now resolve, and the footer course links (`courses.html#makeup` and so on) land on real anchors.

## 3. Hero height
Both heroes use the existing shared `.inner-hero` class and token from Phase 4: `--inner-hero-h: clamp(440px, calc(100svh - header - var(--inner-hero-peek)), 720px)`. No new height values were added. Each hero's content sizes itself to that box (headline sizes scale with viewport height; on short desktop screens the Courses figures strip hides, and on phones the secondary button hides). Compositions are unique: About has a full-frame photo with a notched panel, Contact has copy with a main and inset photo, Courses has a three-photo staggered strip, and Certification has a photo with a seal.

## 4. Containers and alignment
Every section uses the shared `.container-x`. The test suite checks that every element inside each section's container stays within the container's content box (padding included). Headings are left-aligned in LTR and centred in RTL, never right-aligned; copy blocks next to centred headings centre in RTL.

## 5. Images
18 new photographs (11 Courses, 7 Certification), all from Wikimedia Commons, none previously used anywhere on the site. The build fails if an image key or a source photo is registered twice. Final build: `images: 82 used, all unique` (80 from Phases 3 to 5, plus 2 registered by the external login/dashboard work).

| Licence | Count |
|---|---|
| CC0 | 3 (cs-cta, ce-req, ce-assess-prepare) |
| CC BY 2.0 / 3.0 | 5 (4 + 1) |
| CC BY-SA 4.0 | 10 |

- The licence, author and source were read from the Commons API on download (`licenseCheck: "Commons API, 2026-11-10"` in `images.json`). That verifies the licence as stated on Commons; it is not legal clearance and does not cover model releases. The generated `public/assets/images/MANIFEST.md` lists each file's path, page, section, subject (alt text), licence, author, source and check status. The image credits page now lists Courses and Certification too.
- Every image has descriptive alt text, `object-fit: cover`, 800 and 1600 px WebP sizes, and the existing tonal fallback if a file fails to load.
- **Rejected during selection:** photos showing a minor or possible minors, a real training college's branded uniforms, a named public figure, a cosmetics company's own education centre, religious face-paint, and a military promotional shot.
- **Remaining third-party marks:** a small brush brand name is visible in `cs-hero-b`, and a small logo on a T-shirt in `cs-disc-nails`.

## 6. Content assumptions (provisional)
- **Courses:** the same 8 courses as Home 2. Descriptions, outcomes, entry requirements, lengths, formats (full-time weekdays, part-time two days a week), intakes (January, May, September) and the typical-week timetable are illustrative. The page says that course details are provisional and will be confirmed in each course handbook.
- **Certification:** the 90% attendance figure, the four requirements, the five criteria and pass mark, re-sits and the milestones are illustrative and marked provisional on the page. The page states plainly that the certificate is proof of completing a Sorrel course and passing its assessment, and that it is **not** a government-regulated qualification or a licence to practise. There are no accreditation, awarding-body, government, university, licensing or international-recognition claims, and no employment guarantees.

## 7. Files
**Created:** `src/pages/courses.html`, `src/pages/certification.html`, `src/css/pages/courses.css`, `src/css/pages/certification.css`, `public/assets/js/pages/courses.js`, `src/icons/check.svg`, `public/assets/images/courses/` (22 files), `public/assets/images/certification/` (14 files), this report.
**Modified:** `src/config/images.json` (18 entries), `src/css/main.css` (2 imports), `scripts/build-pages.mjs` (page labels and assignment map for the two pages), `README.md` (URLs). Built pages, CSS and the manifest were regenerated.

## 8. Routing
Static files at `public/courses.html` and `public/certification.html`. With Live Server rooted at `public/` (`.vscode/settings.json`): **http://127.0.0.1:5500/courses.html** and **http://127.0.0.1:5500/certification.html**; Home 1 is `/`. Catalogue anchors: `courses.html#makeup`, `#skin`, `#hair`, `#nails`, `#bridal`.

## 9. Tests executed (Edge/Chromium via Playwright and axe-core; scripts outside the project)

**Phase 5 suite: 332 / 332 passed.**
- **Structure:** both pages have exactly 6 main sections, each with a heading and one `h1`; the first section is the shared `.inner-hero`.
- **Images:** all images load with alt text and `object-fit: cover`. Courses uses 11 and Certification 7, in their own folders. Across all six built site pages, no image file appears twice. The manifest lists every new image.
- **Containment:** section content stays inside the shared container on both pages.
- **Links:** every internal link resolves; the only `#` links are the unlinked social icons.
- **Hero consistency:** across 12 viewports (320x568 to 1920x1080, plus 1280x650 and 1024x1366) in LTR and RTL, About, Contact, Courses and Certification heroes have identical heights. The new heroes start under the header, nothing spills, no image is squashed, and the hero and its CTA fit the first screen wherever the 440 px minimum allows. The four hero compositions differ.
- **Themes, directions, viewports:** light and dark × LTR and RTL × desktop, tablet and mobile on both pages. Theme and direction apply with `lang="en"`, there is no overflow, headings are only left or centred, there are **zero axe WCAG 2.2 A/AA and best-practice violations**, and the English text is identical in both directions.
- **Width sweep:** 320, 360, 375, 390, 430, 768, 1024, 1280, 1440 and 1920 px, in LTR and RTL. No overflow, nothing outside the viewport, no clipped buttons, headings, tags, timetable cells or nodes, and all images load.
- **Interactions and navigation:**
  - The level filter works: Foundation shows 4 courses and hides the Bridal group; Advanced shows 4 and hides Hair and its rail link.
  - Discipline tiles and the footer `#anchor` links land on the right catalogue group.
  - From all six site pages, the header and footer link to both new pages, and the current page is marked.
  - Header navigation works between pages, as do refresh, direct URLs and the logo.
  - `/` serves Home 1, not a directory listing.
  - The rotating seal stops under reduced motion.

**Bugs found and fixed during testing:** the rubric's dot labels broke an ARIA rule and now use screen-reader text instead; catalogue anchors landed too low (double offset); the Courses CTA band merged visually into the teal footer, so it is now a teal panel on a light section; the requirements photo left an empty gap; and the seal ring text was too small on phones.

**Regression suites:**

| Suite | Result | Note |
|---|---|---|
| Phase 4 (About, Contact) | 330 / 330 | |
| Phase 2 (components) | 587 / 587 | |
| Brand | 60 / 60 | |
| Homepages | 197 / 198 | The credits-count check expects 80 entries but finds 82, because of the login/dashboard images added outside this phase. |
| Routing, hero and footer | 286 / 293 | The 7 failures are one check (expects 7 footer Explore links) repeated across 7 theme and direction combinations. The footer now has 8 because a "Student Dashboard" link was added outside this phase. |

Lint (`scripts/check.mjs`) and `npm run build` both pass.

## 10. Known issues and pending items
1. **External changes:** login and dashboard work appeared in the project during this phase (see the note at the top). I did not review or test those pages. The two older test failures above come from it, not from Courses or Certification.
2. All course and certification details are provisional and need confirming by the academy. The photos are illustrative Commons images, not the academy's own, and model releases are not confirmed.
3. Not tested: Firefox, Safari, real devices, a screen reader, the actual VS Code Live Server extension (equivalent static servers were used).
4. On screens shorter than about 560 px the 440 px inner-hero minimum can extend past the first screen (shared Phase 4 token).

Waiting for review before any further work.
