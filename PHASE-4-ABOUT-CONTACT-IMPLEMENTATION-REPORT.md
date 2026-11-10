# Phase 4: About and Contact implementation report

**Status:** Both pages are built, tested and ready for review. I did not build Courses, Certification, Login, a dashboard or a backend.

**Note on concurrent work:** while this phase was running, another session started building Courses and Certification in this same folder (`src/pages/courses.html`, `assets/images/courses|certification/`, and edits to `build-pages.mjs`, `images.json` and `main.css`). I did not change that work. See §13.

## 1. Section plan (exactly 6 main sections per page)

The header, footer and scroll-to-top button are shared components and are not counted.

| Page | # | Section purpose | Visual presentation |
|---|---|---|---|
| About | 1 | Cover: who Sorrel is, with primary actions | Full-frame photo with a notched copy panel cut into its bottom-start corner, and a caption chip |
| About | 2 | Identity and philosophy | Stacked prints (a tall portrait with an overlapping detail shot) beside a serif pull statement and three numbered beliefs (i, ii, iii) |
| About | 3 | Teaching approach (practical training) | A rising staircase of four photo frames: Watch, Practise, Check, Finish |
| About | 4 | Learning environment | Teal brand band with an asymmetric floor plan of four rooms (makeup, hair, skin, nails) |
| About | 5 | Instructor and mentoring approach | A mentoring ledger (term and description) beside two frames of different heights, one of them arch-topped |
| About | 6 | Student journey and academy vision | A five-stop route line, then a wide photo with an overlapping teal vision card and calls to action |
| Contact | 1 | Introduction and direct channels | Copy with a call / email / online list beside a reception photo with a curved corner and a round inset swatch |
| Contact | 2 | Contact information | A four-part directory (visit, call, email, hours) with social handles, beside an arch-topped photo |
| Contact | 3 | Course enquiry guidance | Five discipline tiles. "Ask about …" pre-selects that course in the form and moves focus there |
| Contact | 4 | Enquiry form | The form panel beside a photo and a three-step "what happens next" list |
| Contact | 5 | Map | **The interactive map only** (see §4) |
| Contact | 6 | Final call to action | A centred invitation with buttons over a panoramic studio photo, with hours and address on a notched tab |

No section layout repeats one from Home 1 or Home 2, or another section on these two pages.

## 2. Page overviews

**About ("The Atelier").** The page reads as an editorial story: who we are, how we teach, where, with whom, and where it leads. The copy is short (a heading, one sentence, short list items). Photographs carry most of the message: 14 images across 5 of the 6 sections, with photography in every section.

**Contact ("The Front Desk").** The page follows the visitor's contact journey: reach us directly, choose a discipline, write, see the map, visit. All contact details come from `src/config/site.json`, rendered at build time. That covers the address, phone, email, hours and social handles, plus a new `phoneHref` for `tel:` links. The course list comes from `site.json` too, so nothing on the page invents its own values.

## 3. Shared inner-page hero height

`src/css/tokens.css`:
```css
--inner-hero-peek: clamp(40px, 8svh, 88px);
--inner-hero-h: clamp(440px, calc(100svh - var(--header-h) - var(--inner-hero-peek)), 720px);
```
`src/css/components/inner-hero.css`: `.inner-hero { height: var(--inner-hero-h); overflow: hidden; }`. Every inner page puts this class on its first section (the in-progress Courses page already does).

- It subtracts the shared header height (72 px on mobile, 80 px from 768 px), so the hero always ends inside the first viewport. The "peek" leaves the next section visible.
- It is clamped between 440 and 720 px, so it stays proportionate on very short and very tall screens.
- Each page designs its own layout inside the box. About uses a full-frame photo with a notched panel. Contact uses a split layout, with the photo above the copy on mobile.
- On short screens the lede hides (heading, buttons and photo remain) so nothing is clipped.
- The homepage `--hero-h` system is unchanged. Tested: both homepage heroes are still 772 px at 1440×900.

Measured hero heights, identical on About and Contact and equal to the token (tested):

| Viewport | Height | Viewport | Height |
|---|---|---|---|
| 320×568 | 450.5 px | 1024×768 | 626.5 px |
| 360×640 | 516.8 px | 1280×650 | 518 px |
| 375×667 | 541.6 px | 1280×800 | 656 px |
| 390×600 | 480 px | 430×932, 768×1024, 1024×1366, 1440×900, 1440×1300, 1920×1080 | 720 px (cap) |
| 390×844 | 704.5 px | | |

## 4. Map

- **Provider:** OpenStreetMap's official embed (`openstreetmap.org/export/embed.html`) in an `<iframe>`. It uses real map data and real tiles, and you can drag and zoom it. There is no API key and no new dependency.
- **Area shown:** central London, chosen only as a real, recognisable area. It is not presented as the academy's location. There is no marker, and the iframe's accessible title is just "Interactive street map from OpenStreetMap". The academy's address in `site.json` is still the fictional placeholder.
- **The map section contains only the map.** The markup is `section > div.container-wide > div.ct-map__frame > iframe`, with no heading, caption, address, label or other text, inside or around it. The section's accessible name is `aria-label="Map"`, which is not visible. The only text in the map area is OpenStreetMap's own attribution and zoom buttons, drawn by the provider inside the map. The tile licence requires that attribution.
- **Layout:** a rounded, bordered frame inside the standard container, `clamp(340px, 62svh, 620px)` high, on a soft surface band. The tiles are dimmed slightly in dark mode.
- **Tested:** tiles load, the zoom-in control loads the next zoom level, dragging pans and loads new tiles, and the frame sits inside the viewport at 320, 390, 768 and 1280 px.
- On touch screens a one-finger drag over the map pans the map. Visitors can still scroll the page by touching the band above or below it.

## 5. Contact form (front end only)

- **Fields:** full name, email address, phone number, course of interest (from `site.json`, plus "Not sure yet") and message. Each field has a visible label, a placeholder and `required`, and the form uses `novalidate` so all checks run in JavaScript.
- **Rules:** name at least 2 characters. Email must match `name@domain.tld`. Phone may contain only digits, spaces, `+`, `()`, `.` and `-`, with 7 to 15 digits. A course must be chosen. Message at least 10 characters.
- **Errors:** every invalid field gets `aria-invalid`, plus its own error text linked by `aria-describedby`. A summary ("Please correct 3 fields.") appears in the `role="status"` region, and focus moves to the first invalid field. Each error clears as soon as its field becomes valid.
- **Success:** a message that is honest about what happened, for example: "Thank you, Amara. Your Skin Care enquiry passed all the checks. This is a demonstration website with no server, so it was not sent and nothing was stored. Please call or email the academy to reach admissions." The form then resets. A note beside the button says the same thing before anyone submits.
- **Tested:** submitting makes no network request.
- **Limitations:** nothing is delivered anywhere, there is no spam protection, and the phone check is a format check only.

## 6. Images and licensing

24 new photographs (14 About, 10 Contact), each used once, as 1600 px and 800 px WebP files with `srcset`/`sizes`, explicit dimensions and `object-fit: cover`. Only each page's hero images load eagerly; the rest are lazy. They total about 4.3 MB.

- **Location:** `public/assets/images/about/` and `public/assets/images/contact/`.
- **Registry:** `src/config/images.json`, with keys `ab-*` and `ct-*`, page, section, alt text, source, licence and `licenseCheck`.
- **Manifest:** `public/assets/images/MANIFEST.md`, generated by the build. It now has **Subject** and **Licence check** columns as well as path, page, section, source, licence and author.
- **Credits:** `image-credits.html` now has "About" and "Contact" groups, linked from the last section of each page.

**No homepage image is reused.** I checked this four ways:

1. Candidates were filtered against the Commons titles of all 38 homepage photos before download.
2. The build now fails if the same Commons source is registered under two keys.
3. The build fails if a key is used twice or on the wrong page.
4. The QA suite compares every About and Contact image path with every image path in the built Home 1 and Home 2.

**Licensing status.** All 24 are from Wikimedia Commons:

| Licence | Images |
|---|---|
| CC0 | 6 |
| CC BY 2.0 | 6 |
| CC BY-SA 2.0, 3.0 or 4.0 | 12 |

I read the licence, author and source URL from the Commons API at download time on 10 Nov 2026. That verifies the licence **as stated on Commons**. It is **not** legal or commercial clearance:

- Model releases are not confirmed.
- CC BY-SA requires share-alike for adaptations (crops and WebP conversions count).
- Attribution is required for every CC BY and CC BY-SA image, and the credits page provides it.

No image has a watermark. In review I rejected candidates that:

- showed a visible product brand,
- appeared to show a child,
- were graphic (an SFX burn practice head),
- or repeated a photo session already used.

One file name ("Aaradhna Singh.jpg") names the uploading artist's studio, not the model. The photos are illustrative and do not show Sorrel's students, trainers or rooms; the credits page says so.

## 7. Files

**Created**
- `src/pages/about.html`, `src/pages/contact.html` (built to `public/about.html`, `public/contact.html`)
- `src/css/components/inner-hero.css` (shared token consumer), `src/css/pages/about.css`, `src/css/pages/contact.css`
- `public/assets/js/pages/contact.js` (form validation, course tiles). About needs no page script.
- `src/icons/phone.svg`, `mail.svg`, `map-pin.svg`, `clock.svg`
- `public/assets/images/about/` (28 files), `public/assets/images/contact/` (20 files)
- This report

**Modified**
- `src/css/tokens.css`: added `--inner-hero-h` and `--inner-hero-peek`.
- `src/css/main.css`: three imports.
- `src/config/site.json`: added `contact.phoneHref`.
- `src/config/images.json`: 24 entries.
- `src/pages/image-credits.html`: the wording now says "website" instead of "homepages".
- `scripts/build-pages.mjs`:
  - `about` and `contact` page labels and assignments;
  - `course-options` and `social-handles` generators;
  - a duplicate-source check;
  - a warning for registered but unused images;
  - the richer manifest.
- `README.md`: added the About and Contact URLs.

I did not redesign the header, footer, brand, theme, direction or scroll-to-top components. About and Contact were already in the navigation (`site.json`), and their links now resolve.

## 8. Static routing

Pages are static HTML in `public/` with relative paths (`{{root}}` is resolved at build time). There is no router and no backend.

| Page | Live Server (web root `public/`, set by `.vscode/settings.json`) | Dev server (`npm run dev` or `node scripts/serve.mjs`) |
|---|---|---|
| About | `http://127.0.0.1:5500/about.html` | `http://localhost:4173/about.html` |
| Contact | `http://127.0.0.1:5500/contact.html` | `http://localhost:4173/contact.html` |

Start Live Server from the project folder (the one that contains `package.json`), then click **Go Live**. The root opens Home 1, not a directory listing. If the project folder itself is served, the URLs are `/public/about.html` and `/public/contact.html`. The ES modules need a server, so `file://` will not run the scripts.

**Tested:**
- Navigation: Home 1 → About, Home 2 → Contact, About ↔ Contact, the logo back to Home 1, the footer to Home 2, and the header **Enquire** button to Contact.
- Direct access and refresh on both pages.
- Each page marks itself as current in the desktop and mobile navigation.
- Links to `courses.html`, `certification.html` and `login.html` still return 404, because those pages belong to later phases.

## 9. Test results

Everything below was **actually executed** with Edge (Chromium) driven by playwright-core, plus axe-core 4.x, against the built site on the local server. The test scripts are kept outside the project, as in earlier phases, and add no project dependencies. Final run after the last code change: **330 / 330 passed**.

| Group | Checks | Result | What it covers |
|---|---|---|---|
| Structure, images, navigation (both pages) | 47 | Pass | Exactly 6 `main > section`, one `h1`, every section named, all images load with alt text and no distortion, none reused from the homepages or between the two pages, links resolve, Home dropdown (no hover open), mobile menu, scroll-to-top, refresh, no console or network errors |
| Routing | 10 | Pass | Root is Home 1, direct access, cross-page navigation |
| Map | 12 | Pass | Only the map in the section, real OpenStreetMap, no location claim, tiles load, zoom and drag work, responsive at 320, 390 (dark), 768 and 1280 px |
| Form | 14 | Pass | Labels, placeholders, required, empty and invalid submits, error linking and clearing, honest success message, reset, tile pre-fill, options from `site.json`, 360 px mobile layout, no network request |
| Hero token | 57 | Pass | 14 viewports from 320×568 to 1920×1080 (including 1280×650, 1440×1300 and 390×600): both heroes equal the token, end inside the first viewport, no clipped text or buttons, and the hero photo keeps at least 120 px. Homepage heroes unchanged |
| Theme × direction × viewport | 150 | Pass | Light/dark × LTR/RTL × desktop 1440, mobile 390 and tablet 820, on both pages (24 combinations): theme and direction applied, no horizontal overflow, headings never right-aligned (centred in RTL), content inside the viewport, **axe WCAG 2.2 A/AA plus best practice: 0 violations**, no errors. The English text is the same set of words in LTR and RTL, with no Arabic |
| Width sweep | 40 | Pass | 320, 360, 375, 390, 430, 768, 1024, 1280, 1440 and 1920 px in LTR and RTL, both pages: no overflow, nothing outside the viewport, no clipped buttons, all images loaded |

**Regression suites:**
- Phase 2 components: **587 / 587**.
- Phase 3 homepages: **197 / 198**. The one failure is expected. That suite hard-codes "the credits page lists 38 images", and it now correctly lists 62. The other session's Courses page will add more.

**Build and lint:**
- `npm run build` completes. During that run it also printed a warning that the 7 Certification images from the other session are registered but not used yet.
- `node scripts/check.mjs`: OK, with no physical left/right properties.

**Visual review:** I reviewed screenshots of both pages at desktop light LTR, desktop dark RTL, 1024 dark RTL, 390 mobile (light LTR and dark RTL) and 320 px. That review found and fixed:
- an unreadable lede on the teal band;
- the teal final Contact section merging into the teal footer;
- an email address breaking mid-word in the 1024 px directory;
- right-aligned directory headings in RTL;
- a leading ellipsis in the RTL textarea placeholder.

## 10. Theme and direction

**Light and dark:** every section uses the semantic tokens. The teal band and the vision card keep the same fixed teal in both themes, as the homepages do. Form fields, map frame, borders and buttons adapt to each theme.

**RTL:**
- The layout mirrors through logical properties: photo and copy sides swap, the staircase rises toward the left, the route line runs right to left, and the visit tab moves to the right.
- Directional arrows flip; the phone, mail, pin and clock icons do not.
- Headings are centred. Copy blocks next to headings are centred.
- Ruled lists keep right-aligned rows, and their headings stay centred.
- Each English text keeps its reading order (`unicode-bidi: plaintext`).
- `lang` stays `en`, and there is no Arabic text, Arabic font or language selector.

## 11. Accessibility

- One `h1` per page, and every section is labelled.
- Decorative images use empty alt text. There is one: the round palette inset in the Contact hero.
- Form errors are linked by `aria-describedby`, the status region is polite, and focus moves to the first invalid field.
- "Ask about …" buttons move focus into the form without a double scroll.
- The map iframe has a title.
- Interactive targets are at least 40–44 px.
- Visible focus rings come from the base styles.
- Reduced motion is respected: smooth scrolling is turned off.
- axe found 0 violations in all 24 combinations. It checks contrast in both themes, but cannot judge text over photographs. No text sits directly on a photo; captions and panels have solid backgrounds.

**Not tested:** a real screen reader, keyboard use inside the third-party map, Firefox and Safari, real phones and tablets, and a performance audit.

## 12. Content notes

The copy is demonstration content and is not verified business fact. This includes:
- the beliefs, the four-step method and the mentoring claims ("One mentor per term", "Small groups");
- the room descriptions;
- the journey stops;
- the "what happens next" replies.

It follows the same demo-content approach as Phases 2 and 3. Please replace anything that doesn't match how the academy really works.

## 13. Known issues and pending items

1. **Concurrent session.** Another session is building Courses and Certification in this folder. It edited shared files during my run, adding Courses and Certification entries to `build-pages.mjs`, `images.json` and `main.css`. My changes are intact, and so are theirs. I also changed my new "registered but unused image" rule from a build failure to a warning, because it was failing the build on their unfinished Certification page. Please make sure only one session edits the project at a time, or review both together.
2. **Placeholder contact data.** The address, phone, email and social handles in `site.json` are still the fictional placeholders from earlier phases. The pages will show real details once that file is updated. Social handles appear as text only, because no profile URLs are set.
3. **The map shows central London** as a stand-in area. When the real address is known, change the `bbox` in `src/pages/contact.html`. A marker could then be added (`&marker=lat,lon`), but only once the location is confirmed.
4. **The form sends nothing.** Connecting it to a real service needs a later, approved backend or form-service decision.
5. **The photography is interim.** It comes from Commons and is not the academy's own (see §6). On About in RTL, the hero panel covers part of the model in the hero photo; the photo is deliberately not flipped.
6. **The Phase 3 credits regression check** needs its expected count updated (it is hard-coded to 38).
7. **Not tested:** Firefox and Safari, physical devices, screen readers and performance (see §11).

## 14. Awaiting your review

- Approve About and Contact, or tell me what to change.
- Confirm the central London map area as a stand-in until the academy's real address is available.
- Confirm the Commons photography as interim imagery.

I have not started the next phase.
