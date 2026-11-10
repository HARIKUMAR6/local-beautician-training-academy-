# PHASE 1 — Design & Foundation
**Project:** Beautician Training Academy website + student portal
**Status:** Ready for review. No pages built. Phase 2 will not start until approved.
**Brand name:** *Sorrel Academy of Beauty* (finalized after Phase 2; replaces the working name "Aurelle". See BRAND-IDENTITY-REPORT.md for rationale, logo and fictional contact data.)

> **Honesty note on research.** Section 1 is a synthesis of established patterns in beauty-education and luxury-beauty editorial web design, drawn from my own knowledge. I did not browse live competitor sites in this phase, and I name no specific competitors. If you want a sourced competitor audit with screenshots, say so and I will do it as a separate step.

---

## 1. Industry & Design Research

### 1.1 What the sector does today
| Segment | Typical pattern | Strength | Weakness we avoid |
|---|---|---|---|
| Makeup academies | Full-bleed face close-ups, black/white/gold, big sans caps | Immediate glamour | Feels like a product brand, not education; low trust signals |
| Salon-school chains | Pink/blush, rounded cards, stock smiles | Approachable | Generic, "template" look, no authority |
| Luxury beauty editorial (magazines, maisons) | Serif display type, asymmetric image crops, generous whitespace, captions & folios | Premium, confident | Can be sparse on practical info (fees, duration, outcomes) |
| Vocational/professional schools | Dense course tables, accreditation badges | Credible, clear | Cold, dated |
| Student portals (LMS) | Sidebar + widgets | Functional | Visually disconnected from the public brand |

### 1.2 Gaps we can own
1. **Editorial luxury *with* vocational rigor** — magazine feel plus hard facts (hours, ratio, certification body, outcomes).
2. **Practice as the hero** — show hands, tools, bench work and finished student work, not just polished models.
3. **Portal that looks like the brand** — dashboard reuses the same type, palette and tone.

### 1.3 Trends adopted vs. rejected
**Adopted:** high-contrast serif display + quiet sans body; asymmetric image compositions with mixed crop ratios; numbered/“folio” editorial details; restrained motion (reveal, parallax-lite); deep, non-pink palette with a single warm accent; real photography of work-in-progress; dark mode treated as a designed theme.
**Rejected:** pink/blush dominance; uniform 3-up rounded card grids; gradient blobs and glassmorphism; stock-icon feature rows; centered-everything SaaS hero; carousels as primary content.

---

## 2. Creative Direction — “The Atelier Notebook”

**Concept:** A couture atelier meets a fashion-school sketchbook. The site reads like a printed editorial lookbook that has working notes in the margins: hairline rules, folios (“№ 03”), captions, swatch chips, annotation callouts. It signals *craft, discipline, mastery* — a place you train to become a professional, not a place you get pampered.

**Why this direction**
- Differentiates from pink salon templates and black/gold makeup-brand clichés.
- Editorial structure naturally supports *varied* layouts (no repeated card grids).
- “Notebook/atelier” vocabulary extends cleanly to the portal (logbooks, schedules, certificates are literal notebooks/records).
- Typographic-led design is robust for RTL (no dependence on directional illustration).

**Brand voice:** assured, precise, warm. Short declarative headlines; concrete numbers; no hype words.

**Signature visual devices** (used consistently, never decoratively overloaded)
1. **Hairline rule + folio** — 1px rule with a small mono numeral/label above each major section.
2. **Swatch chips** — small circular color chips used as list markers, badges and progress dots (nods to makeup swatches).
3. **Arch crop** — one image shape: a tall arch (rounded top) used selectively for portraits; other images use rectangular editorial crops.
4. **Margin annotations** — small captions beside images (“Bridal base · Term 2 practical”).
5. **Grain-free flat surfaces** — no gradients on surfaces; depth comes from tone and borders.

---

## 3. Brand Identity & Visual Strategy

### 3.1 Logo direction (to be drawn in a later phase)
Wordmark in the display serif, with a small monogram “A” whose crossbar is a brush/ligature stroke. Lockups: horizontal, stacked, monogram-only (favicon). Needs a one-colour version. **Final logo is a pending decision** (see §15).

### 3.2 Imagery direction
- **Mix:** 40% practical/process (hands, brushes, trays, tools, mirrors, classroom), 30% student finished work, 20% trainers/portraits, 10% facility/detail.
- **Treatment:** natural light, warm neutral grading, true skin tones across diverse complexions; no heavy retouch look; no pink overlay.
- **Crops:** arch (portraits), 4:5 portrait, 3:2 landscape, 1:1 detail, 21:9 banner.
- **Rule:** every image used once site-wide (requirement #6). We will maintain `assets/images/MANIFEST.md` mapping each file → single placement, enforced by a small check script.
- **Sourcing:** I cannot supply licensed photography. Final imagery must be the academy's own photography or licensed stock chosen in Phase 2. **No placeholder images will ship as final.** During build, any unfinished slot will use a clearly labelled neutral tone block, not a fake photo.

---

## 4. Color System

Brand: **deep ink-teal** (authority/craft) + **bone** (paper) + **clay** (warmth, the single accent) + **brass** (small premium highlights). Pink exists only as a tiny “blush” tint for tags, never as a theme.

### 4.1 Raw palette
| Token | HEX | Role |
|---|---|---|
| Ink Teal 900 | `#0A2926` | deepest brand surface |
| **Ink Teal 800 (Primary)** | `#12403B` | primary brand, buttons, headers |
| Ink Teal 600 | `#2B6A62` | hover/secondary |
| Mint 300 | `#8FD0C2` | primary on dark |
| **Bone 50** | `#FBF8F3` | light surface |
| **Bone 100** | `#F6F1EA` | light page background |
| Bone 200 | `#ECE4D8` | light sunken/alt section |
| **Clay 600 (Accent)** | `#A8472B` | accent on light |
| Clay 300 | `#E8957A` | accent on dark |
| Brass 700 | `#7A5C1E` | brass text on light |
| Brass 300 | `#D9B466` | brass on dark |
| Blush 100 (minor) | `#F1DDD3` | tag tint only |
| Night 950 | `#0E1413` | dark page background |
| Night 900 | `#151D1C` | dark surface |
| Night 800 | `#1C2726` | dark raised surface |

### 4.2 Semantic tokens
| Token | Light | Dark |
|---|---|---|
| `--bg` | `#F6F1EA` | `#0E1413` |
| `--surface` | `#FBF8F3` | `#151D1C` |
| `--surface-raised` | `#FFFFFF` | `#1C2726` |
| `--surface-alt` (section band) | `#ECE4D8` | `#121A19` |
| `--surface-brand` (inverted band) | `#12403B` | `#0A2926` |
| `--text` | `#1A1F1E` | `#EEE8DE` |
| `--text-muted` | `#54605E` | `#A3B0AC` |
| `--text-on-brand` | `#F6F1EA` | `#EEE8DE` |
| `--border` (decorative) | `#CFC3B3` | `#3A4B48` |
| `--border-input` (UI boundary) | `#857A6B` | `#6B7C78` |
| `--primary` (button bg) | `#12403B` | `#8FD0C2` |
| `--primary-text` | `#F6F1EA` | `#0E1413` |
| `--primary-hover` | `#0A2926` | `#A9DDD2` |
| `--accent` | `#A8472B` | `#E8957A` |
| `--accent-text` | `#FFFFFF` | `#0E1413` |
| `--brass` | `#7A5C1E` | `#D9B466` |
| `--focus-ring` | `#12403B` (2px + 2px offset) | `#8FD0C2` |
| `--success` | `#2F6B3A` | `#7FD18F` |
| `--danger` | `#A3262A` | `#FF8E8A` |

### 4.3 Contrast verification (WCAG 2.2, computed)
| Pair | Ratio | Needs | Result |
|---|---|---|---|
| Text on bg (L) | 14.85 | 4.5 | Pass |
| Muted on bg (L) | 5.82 | 4.5 | Pass |
| Muted on surface (L) | 6.17 | 4.5 | Pass |
| Primary button text (L) | 10.26 | 4.5 | Pass |
| Clay text on bg (L) | 5.19 | 4.5 | Pass |
| Clay button, white text (L) | 5.83 | 4.5 | Pass |
| Brass text on bg (L) | 5.53 | 4.5 | Pass |
| Text on bg (D) | 15.28 | 4.5 | Pass |
| Muted on bg / surface (D) | 8.30 / 7.65 | 4.5 | Pass |
| Primary button text (D) | 10.61 | 4.5 | Pass |
| Clay text (D) | 7.99 | 4.5 | Pass |
| Brass text (D) | 9.46 | 4.5 | Pass |
| Success / Danger (L) | 5.69 / 6.52 | 4.5 | Pass |
| Success / Danger (D) | 10.12 / 8.41 | 4.5 | Pass |
| Decorative border (L / D) | 1.54 / 2.02 | n/a (decorative) | Intentionally subtle |

**Not yet verified:** `--border-input` against its surfaces (target ≥ 3:1) and text over photography. Both will be checked in Phase 2; text over images always sits on a solid or scrim-backed panel, never directly on a photo.

### 4.4 Interactive states
Hover: shift to `--primary-hover` / underline thickening for links. Active: 1px translate + darker tone. Focus-visible: 2px ring + offset, always visible, never removed. Disabled: 45% opacity + `not-allowed` + no hover; disabled text is exempt from contrast but must remain legible. States never rely on color alone (underline/icon/weight change accompany).

### 4.5 Theme mechanism
Tokens are CSS custom properties on `:root` and `[data-theme="dark"]`. Initial theme = saved choice, else `prefers-color-scheme`. A tiny inline script in `<head>` sets `data-theme` before paint to prevent flash. Tailwind v4 `@theme` maps utilities to these variables, so utilities like `bg-bg` / `text-fg` flip automatically with no `dark:` duplication.

---

## 5. Typography System

| Role | Font | Why | Weights |
|---|---|---|---|
| Display / headings (Latin) | **Fraunces** (variable, SIL OFL) | Soft, high-contrast editorial serif with optical sizing; distinctive, not the usual Playfair/Cormorant | 400, 500, 600 |
| Body / UI (Latin) | **Instrument Sans** (OFL) | Clean, slightly characterful grotesque; excellent at small sizes | 400, 500, 600 |
| Labels / folios | **JetBrains Mono** or system mono (decide at build; subset to digits/caps) | Notebook/annotation voice | 400, 500 |

*Language & direction (clarified):* the site is **English only** in both LTR and RTL. Typography, fonts and content are identical in both directions; only layout direction changes. No Arabic or other-script fonts are used.

**Hosting:** self-host WOFF2 in `assets/fonts/` (no third-party requests, GDPR-friendly, faster). `font-display: swap`; preload the two critical faces; subset to needed Unicode ranges.

### 5.1 Responsive scale (fluid `clamp()`, 1.25 ratio, mobile → desktop)
| Token | Size | Line-height | Use |
|---|---|---|---|
| `display` | `clamp(2.75rem, 1.6rem + 5vw, 6rem)` | 1.0 | Hero headlines only |
| `h1` | `clamp(2.25rem, 1.4rem + 3.4vw, 4rem)` | 1.05 | Page titles |
| `h2` | `clamp(1.75rem, 1.2rem + 2.2vw, 2.75rem)` | 1.12 | Section titles |
| `h3` | `clamp(1.375rem, 1.1rem + 1.1vw, 1.875rem)` | 1.2 | Sub-sections |
| `h4` | `1.25rem` | 1.3 | Card/list titles |
| `body-lg` | `1.1875rem` | 1.65 | Lead paragraphs |
| `body` | `1rem` | 1.65 | Default |
| `small` | `0.875rem` | 1.5 | Captions, meta |
| `label` | `0.75rem`, uppercase, tracking 0.12em | 1.2 | Folios, badges |

Heading rules: left- or center-aligned only, never right-aligned in either direction (see §10 item 8). Max line length 68ch for body, 18ch–22ch for display. Type settings do not change between LTR and RTL.

---

## 6. UI Component Specifications

**Shared:** radius scale `--r-sm 4px`, `--r-md 8px`, `--r-lg 16px`, `--r-arch 999px 999px 8px 8px` (arch image). Deliberately restrained rounding; pills only for badges.

| Component | Spec |
|---|---|
| **Buttons** | Three sizes with fixed heights: `md` 48px (default), `lg` 56px, `sm` 40px. Padding-inline 24px; radius 4px; label 15px/600, no uppercase. Variants: **Primary** (`--primary`), **Accent** (`--accent`, one per view max), **Outline** (1.5px `--text` border), **Text-link** (underline + animated arrow, arrow mirrors in RTL). Min touch target 44px. Icon sits at inline-end. Same dimensions on every page. |
| **Form fields** | Height 52px; 1px `--border-input`; radius 4px; label above (never placeholder-only); helper and error text below with icon + text; focus ring; floating labels not used. Select = styled native `<select>` (reliable, a11y). Checkbox/radio custom-drawn with swatch-chip checked style. Inputs use `padding-inline`; phone/email/number fields keep `dir="ltr"` content inside RTL pages. |
| **Navigation** | Desktop: logo at inline-start, centered links, actions (theme toggle, RTL/LTR direction toggle, Login) at inline-end; sticky, solid on scroll with hairline border. Mobile: full-screen sheet menu, large type, focus-trapped, `Esc` closes. Active page = underline + `aria-current="page"`. Variants differ between Home 1 and Home 2 only in *presentation* via a data attribute, same DOM component. |
| **Dropdowns** | “Courses” menu with grouped list; button-disclosure pattern (`aria-expanded`), keyboard arrow navigation, closes on outside click/Esc; panel anchored with logical positioning (`inset-inline-start`). The direction control is a single toggle button (`aria-pressed`), not a dropdown; there is no language switcher. |
| **Cards** | Not the default building block. Allowed forms: **Editorial entry** (image + folio + text, no box), **Ledger row** (course list row with hairline rules), **Panel** (bordered surface, used in dashboard/forms only). 3-up identical card grids are prohibited on public pages. |
| **Badges** | Pill, 24px high, `label` type; tones: neutral, brand, clay, success, warning. Optional leading swatch chip. |
| **Section backgrounds** | Rotation of `--bg`, `--surface-alt`, `--surface-brand` (inverted band). No two adjacent sections share the same background; hairline rules instead of heavy dividers. |
| **Interactive elements** | Accordion (`<details>`-based enhancement), tabs (roving tabindex), modal/dialog (native `<dialog>`), toast, progress (swatch-dot steps), tooltip (only for non-essential info), image reveal on scroll honoring `prefers-reduced-motion`. |
| **Scroll-to-top** | Fixed button, 48px circle, appears after 600px scroll, `inset-inline-end: 24px; bottom: 24px`, smooth scroll (instant if reduced motion), `aria-label`, doesn’t overlap cookie/chat elements. |

---

## 7. Spacing & Layout

- **Containers:** `narrow 720px` (prose), `default 1200px`, `wide 1440px`, edge gutter `clamp(16px, 4vw, 48px)`.
- **Grid:** 12 columns desktop (gap 24px), 8 tablet (gap 20px), 4 mobile (gap 16px). Asymmetric 5/7, 4/8 and offset layouts are the norm.
- **Spacing scale (4px base):** 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- **Section spacing:** `clamp(64px, 8vw, 128px)` vertical; hero → first section 0 overlap rule: none.
- **Hero height:** **one shared token `--hero-h: clamp(560px, 82svh, 820px)`** for every page that has a hero (Home 1, Home 2, About, Courses, Certification, Contact). Login uses a split full-viewport layout and the Dashboard has no hero; both are documented exceptions. Inner-page heroes differ in *composition*, not height.
- **Image ratios:** arch 3:4, portrait 4:5, landscape 3:2, detail 1:1, banner 21:9. Always declare `width`/`height` to prevent layout shift; `object-fit: cover`.
- **Breakpoints (mobile-first):** `sm 480`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1536`.
- **Z-index scale:** base 0, sticky-nav 40, dropdown 50, scroll-top 60, modal 80, toast 90.

---

## 8. Home 1 vs Home 2 — Strategy (not implemented)

Both must carry the **same complete business information**: who we are, courses & fees, certification, trainers, facilities, outcomes/testimonials, intake dates, enquiry/CTA, student login access. They differ in *structure and browsing model*.

### Home 1 — “The Lookbook” (linear, editorial, scroll-told story)
Magazine-style vertical narrative.
1. Hero: oversized serif headline left, tall arch image right, folio meta strip (intake date · duration · certification).
2. Manifesto paragraph with inline small images embedded in the sentence.
3. Courses as a **ledger** (numbered rows with hairline rules; row hover reveals image preview).
4. Practice in focus: asymmetric collage of process photos with margin annotations.
5. Certification path as a horizontal **timeline** with swatch-dot steps.
6. Trainers: staggered portrait column with pull-quotes.
7. Outcomes in large numerals + single testimonial in oversized quote.
8. Facilities strip, FAQ accordion, enquiry band, footer.

### Home 2 — “The Studio Tour” (modular, interactive, explore-by-interest)
A non-linear, task-oriented experience.
1. Hero: split full-bleed — left a **“Choose your path”** selector (Makeup / Skin / Hair / Nails / Bridal) that updates the right image panel and a summary.
2. Sticky left-rail section index (inline-start) with scroll-spy — page behaves like a studio floor plan.
3. **Day-in-the-academy** horizontal scroll-snap strip (a student’s day, hour by hour).
4. Course finder: filter by goal/duration/level → results list (tabbed, interactive).
5. Fees & intakes in a comparison table with sticky header.
6. “Proof wall”: mixed-size tiles of student work with before/after toggle.
7. Trainers as a tabbed spotlight (one trainer big, others as small selectors).
8. Certification explainer as stacked sticky steps, enquiry with inline mini-form, footer.

**Differentiators:** Home 1 = passive reading, mostly static, light interaction. Home 2 = interactive discovery, with a persistent section index and filtered content. Different nav presentation (Home 1 transparent over hero; Home 2 solid with section index), different section order, different section *forms*. Images are distinct per section across both (and the whole site).

---

## 9. Inner Page Strategy

| Page | Purpose | Hero composition | Distinct layout language |
|---|---|---|---|
| **About** | Identity, story, trainers, facilities | Typographic hero: huge statement text over a single wide 21:9 image | Founder letter in prose column; **studio floor plan** (annotated image of facility zones); trainers as a *roll-call* list with bios expanding in place; values as margin notes; accreditation strip |
| **Courses** | Discovery, curriculum, duration, outcomes | Compact hero with live filter bar (level, category, duration) | **Master ledger** with expandable curriculum (modules, hours, practical vs theory bar), outcome chips, fee/intake sidebar; per-course detail as an anchored sheet; comparison toggle for 2–3 courses |
| **Certification** | Process and qualifications | Hero with certificate specimen as visual | Vertical **process path** (enrol → train → log hours → assess → certify); requirements checklist; sample certificate with annotated callouts; verification-lookup form (certificate ID); recognition/accreditation block |
| **Contact** | Info + enquiry | Split hero: contact details panel + enquiry form together | Form-first layout with course interest select and preferred call time; campus info with map (static image + link, no heavy embed by default); WhatsApp/phone quick actions; visit-booking mini scheduler |
| **Login** | Student authentication | Full-viewport split: brand image panel + form (documented exception) | Minimal form, show/hide password, “forgot password”, inline error summary; theme/direction toggles visible; no marketing clutter |
| **Dashboard** | Student portal | No hero | App shell: sidebar (inline-start) + top bar; **Overview** (next class, hours logged progress, certificate status), **Batch schedule** (week/agenda toggle), **Practical log** (table + add-entry dialog, trainer sign-off status), **Certificates** (list, preview, download, share ID). Panels are allowed here; density higher than public site; same tokens/type/brand |

Public pages share header/footer/tokens but **no two pages share a hero layout or section sequence**.

---

## 10. RTL / LTR Strategy

RTL is a layout mode, not an alignment tweak.

0. **Scope (confirmed):** English only. No translation, no language switcher. A single RTL/LTR toggle flips layout; content and typography stay unchanged.
1. **`<html lang="en" dir>`**: `lang` is always `en`; the toggle only changes `dir` (`ltr`/`rtl`), persisted in `localStorage` and applied by an inline `<head>` script before paint (default `ltr`).
2. **Logical properties only.** Use Tailwind v4 logical utilities (`ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`, `text-start`, `border-s`, `rounded-s-*`). Physical `left/right/ml/mr/pl/pr/text-left/text-right` are banned and linted by grep in a check script.
3. **Flex/grid** flip automatically; no hand-reversed order. Where visual order is intentional, use `order` sparingly and never at the cost of tab order.
4. **Directional icons** (arrows, chevrons, carets) get `rtl:-scale-x-100`; non-directional icons (search, play-pause, check) never mirror. Logo and photography are never mirrored.
5. **Positioned elements** (scroll-top, drawers, dropdowns, toasts, sidebar) use `inset-inline-*`; transforms for slide-in animations use a CSS variable `--dir: 1 / -1`.
6. **Mixed content:** numbers, emails, phone, URLs, certificate IDs wrapped in `<bdi>` or `dir="ltr"`/`unicode-bidi: isolate`. Currency and dates formatted via `Intl` for locale.
7. **Typography:** one font stack and one set of type settings for both directions (English text).
8. **Heading alignment (resolved):** `text-start` would resolve to *right* in RTL, so it is **banned for headings**. Headings use a `.heading-align` utility: `text-align:left` in LTR, `text-align:center` in RTL (`[dir="rtl"] .heading-align{text-align:center}`); sections whose headings are centered stay centered in both. The check script flags `text-end`/`text-right` on any `h1–h6`. In RTL, the heading's surrounding layout still mirrors (e.g. the image moves to the other side); only the heading text centers within its column. Eyebrow/folio labels are not headings and follow normal logical alignment.
9. **Layout:** asymmetric compositions mirror (image inline-end becomes left in RTL). Horizontal scrollers and timelines start at inline-start, progress bars fill inline-start → end.
10. **Content:** plain English in the HTML. No i18n layer, no string dictionaries. Content must be byte-identical across directions.
11. **Test matrix:** every page × {LTR, RTL} × {light, dark} × {360, 768, 1280px}; Playwright screenshots (dev-only) in Phase 7 hardening.

---

## 11. Responsive Strategy

- Mobile-first CSS; design at 360px first, enhance upward.
- Fluid type and spacing via `clamp()`; layouts shift with CSS grid column spans per breakpoint rather than shrinking.
- Hero height token is shared; on mobile, headline/image stack with image first for Home 1, selector first for Home 2.
- Navigation collapses to full-screen sheet < 1024px. Dashboard sidebar becomes bottom tab bar (< 768px) + overflow menu.
- Tables become stacked “ledger rows” on mobile; wide tables get a scroll container with a visible hint and sticky first column.
- Images: `srcset`/`sizes`, AVIF/WebP with JPEG fallback, lazy loading below the fold, explicit dimensions.
- Touch targets ≥ 44px; no hover-only functions; `100svh` instead of `100vh`.
- Respect `prefers-reduced-motion` and `prefers-contrast`.
- Performance budget: LCP < 2.5s on mid-range mobile, CSS < 60 KB gzipped, JS per page < 40 KB gzipped (public), CLS < 0.05.

---

## 12. Backend & Database Requirements

A static front end cannot safely do the following. **These need a backend before they work for real users:**

| Feature | Why a backend is required | Data |
|---|---|---|
| Student authentication | Password hashing, sessions, reset, rate limiting | `users`, `sessions` |
| Batch schedules | Per-student/per-batch data, admin editing | `batches`, `sessions_classes`, `enrollments` |
| Practical training logs | Student write + trainer approval, audit trail | `log_entries`, `skills`, `signoffs` |
| Certificates | Issuance, unique IDs, public verification, PDF generation | `certificates`, `certificate_templates` |
| Enquiry/contact form | Delivery, spam protection | `enquiries` |
| Admin/trainer roles | Authorization | `roles` |

**Security basics:** HTTPS, secure `HttpOnly`/`SameSite` cookies, CSRF protection, input validation, rate limiting on login/enquiry, hashed passwords (argon2/bcrypt), minimal personal-data retention, privacy policy and consent.

**Phase-to-phase strategy (proposal):** Phases for public pages and dashboard UI will be built against a thin `api.js` client with a **mock adapter** (JSON in `data/mock/`) so the interface is complete and testable. The mock is clearly marked, contains no real student data, and is swapped for the real API later. *Mock auth is not secure and must never be deployed as real authentication.*

**Backend options (decision needed, not made):**
A. Node.js + Express + SQLite/PostgreSQL — closest to our JS skills, simple hosting.
B. PHP + MySQL — cheapest shared hosting, common in this region.
C. Managed BaaS (e.g. Supabase/Firebase) — fastest, but third-party dependency and data-residency considerations.
Recommendation: **A** if you control hosting; **B** if hosting is shared cPanel. Not decided.

---

## 13. Technical Architecture

### 13.1 Stack
HTML5 · Tailwind CSS v4 (CLI) · Vanilla JS ES modules. No React, Vite or bundler. JS is loaded with `<script type="module">`; no transpile step (modern evergreen browsers).

### 13.2 Folder structure
```
Beautician Training Academy/
├─ PHASE-1-DESIGN-AND-FOUNDATION.md
├─ package.json                  # scripts + 2 dev deps only
├─ README.md                     # (Phase 2) how to run/build
├─ src/
│  └─ css/
│     ├─ main.css                # @import "tailwindcss"; @theme tokens; layers
│     ├─ tokens.css              # light/dark CSS variables
│     ├─ base.css                # resets, typography, focus, RTL base
│     ├─ components/             # buttons.css, forms.css, nav.css, badges.css…
│     └─ pages/                  # page-specific styles (home1.css, dashboard.css…)
├─ public/                       # deployed root (served as-is)
│  ├─ index.html                 # Home 1
│  ├─ home-2.html
│  ├─ about.html
│  ├─ courses.html
│  ├─ certification.html
│  ├─ contact.html
│  ├─ login.html
│  ├─ dashboard/
│  │  ├─ index.html              # overview
│  │  ├─ schedule.html
│  │  ├─ practical-log.html
│  │  └─ certificates.html
│  ├─ assets/
│  │  ├─ css/styles.css          # compiled output (generated)
│  │  ├─ js/
│  │  │  ├─ main.js              # entry, imports modules
│  │  │  ├─ modules/             # theme.js, direction.js, nav.js,
│  │  │  │                       # scroll-top.js, reveal.js, accordion.js, tabs.js, dialog.js
│  │  │  ├─ pages/               # home1.js, home2.js, courses.js, contact.js, login.js
│  │  │  ├─ dashboard/           # schedule.js, practical-log.js, certificates.js
│  │  │  └─ services/            # api.js (client), auth.js, mock-adapter.js
│  │  ├─ fonts/                  # self-hosted WOFF2
│  │  ├─ images/                 # per-page folders + MANIFEST.md
│  │  └─ icons/                  # SVG sprite
│  ├─ partials/                  # header.html, footer.html (see below)
│  └─ data/
│     └─ mock/                   # batches.json, logs.json, certificates.json
├─ scripts/
│  ├─ build-pages.mjs            # injects partials into pages (dev tool, no deps)
│  └─ check.mjs                  # lint: banned physical props, duplicate images, missing alt
└─ backend/                      # (later, once the stack is decided)
```

### 13.3 Shared components without a framework
Header/footer are authored once in `public/partials/` and injected into pages at **build time** by `scripts/build-pages.mjs` (a ~50-line Node script, zero dependencies). This yields static, SEO-friendly pages with no runtime fetch flash and no duplicated markup to maintain. If adopted, authored page sources move to `src/pages/` and build output goes to `public/`; the tree above is finalized at Phase 2 start — **see Pending Decision #6**.

### 13.4 JS patterns
ES modules; one module per behavior with an `init()`; progressive enhancement (pages usable without JS where possible); `data-*` hooks rather than class selectors; event delegation; no globals; ARIA states updated from one place; `localStorage` access wrapped in try/catch for `theme` and `dir`.

### 13.5 CSS patterns
Tailwind v4 CSS-first config (`@theme`), semantic color utilities backed by variables, component classes via `@layer components` + `@apply` only for repeated primitives (buttons, fields); everything else as utilities in HTML. Logical properties enforced.

### 13.6 Accessibility & SEO
Semantic landmarks, skip link, one `h1` per page, visible focus, form labels, `alt` text on all meaningful images, `aria-current`, reduced-motion support, `<title>`/meta/OG per page, canonical, JSON-LD (`EducationalOrganization`, `Course`), `sitemap.xml`, `robots.txt`. Dashboard pages `noindex`.

---

## 14. Dependencies & Tooling Plan

| Tool | Type | Purpose | Needed? |
|---|---|---|---|
| `tailwindcss` v4 | devDependency | Core | Yes |
| `@tailwindcss/cli` | devDependency | Compile CSS | Yes |
| Node.js (v24 detected; npm 11) | runtime/dev | run CLI and scripts | Yes (already installed) |
| Local static server (`npx serve` or Node built-in script) | dev only | preview | Optional; prefer a 15-line Node script to avoid a dependency |
| Playwright | dev only | screenshot/RTL/contrast tests | **Deferred** to hardening phase; not installed now |
| Fonts (Fraunces, Instrument Sans, optional mono) | assets | Typography | Yes, self-hosted (downloaded in Phase 2, OFL-licensed) |
| Icon set | assets | SVG sprite | Custom/inline from an open set (e.g. Lucide, ISC license), only icons used |

**Scripts (planned):** `npm run dev` (Tailwind `--watch` + static server), `npm run build` (minified CSS + page build), `npm run check` (lint rules in `scripts/check.mjs`).

**Not installed now.** Phase 1 installs nothing; `package.json` is created at Phase 2 start after your approval.

**Explicitly avoided:** React/Vite/bundlers, jQuery, animation libraries (GSAP etc.; CSS + IntersectionObserver suffice), carousel libraries, icon-font packages, CSS frameworks other than Tailwind, UI kits.

---

## 15. Pending Decisions Requiring Approval

1. ~~Academy name & logo~~ **Resolved:** "Sorrel Academy of Beauty" with an original S-in-ring monogram; contact data is fictional demonstration data (see BRAND-IDENTITY-REPORT.md).
2. **Direction & palette** — approve “Atelier Notebook” with ink-teal/bone/clay/brass, or request an alternative?
3. ~~Languages~~ **Resolved:** English only, direction toggle only, no language switcher.
4. ~~RTL heading alignment~~ **Resolved:** left in LTR, centered in RTL, never right (§10 item 8).
5. **Imagery** — will you provide photography, or should we use licensed stock? I cannot invent final photos.
6. **Shared header/footer method** — build-time includes via small Node script (recommended), or duplicate per page.
7. **Backend stack & hosting** — Node, PHP, or BaaS? Where will it be hosted? Needed before real login/dashboard data.
8. **Real content** — course list, fees, durations, certification body/accreditation, trainer bios, address/phone, intake dates, policies. Without these, Phase 2 copy will be clearly marked as draft.
9. **Student sign-up** — are accounts created by admin only, or can students self-register?
10. **Certificate scope** — digital download only, or public verification page + printed originals?
11. **Fonts and mono label** — OK to use JetBrains Mono for folio labels, or keep to two typefaces?

---

## 16. Proposed Next Phase (not started)
Phase 2 would create `package.json`, install the two Tailwind dev dependencies, download fonts, write `tokens.css` / base / components CSS, the header/footer partials and the shared JS modules (theme, direction, nav, scroll-top), plus a style-guide test page. **This will not begin until you approve this document.**
