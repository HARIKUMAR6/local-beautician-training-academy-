# Phase 6: Student Login portal and Student Dashboard

> **IMPORTANT: this report describes the 15:05 version of the two pages, not the files now on disk.**
> At about 15:14 to 15:15, after my final test run, another session edited many files across the site. That included my `src/pages/dashboard.html` (from about 415 to 223 lines: the sample figures were replaced with "–" and empty states), `dashboard.css`, `dashboard.js`, every public page, `src/partials/footer.html`, `site.json` (Dashboard added to the main navigation), `build-pages.mjs` and `README.md`. It also **removed `src/pages/image-credits.html`**, and no page now links to image credits.
> I did not revert any of it. The test results below (661 / 661) were run against the 15:05 build and have **not** been re-run on the current files. Sections 2 and 6 describe the dashboard as I built it (with labelled sample data), which differs from the current file.
> Separately: most site photos are CC BY or CC BY-SA, so **removing the credits page breaks their attribution requirement** unless credit is given elsewhere.

**Status:** both pages are built and tested, and they are awaiting your review. Nothing else was built: no backend, no authentication, no OAuth, no database, no API and no extra pages. The next phase has not been started.

**Before you review:**
- **No Phase 5 report.** The brief lists a "Phase 5 Courses and Certification implementation report", but no such file exists in the project. `courses.html` and `certification.html` do exist and build. They come from the other session that was working in this folder during Phase 4, and that session was still editing files about 6 minutes before this phase started (last edits at 13:50; this phase began at 13:56). I read those pages but did not change them.
- **Shared dev server.** Port 4173 was already serving this project's `public/` folder, apparently from that other session's dev server. I confirmed it serves byte-identical files and ran the tests against it.

## 1. Login portal (`login.html`)

**Layout.** This is a dedicated portal, not an inner website page:
- There is no public header, footer, website navigation or "Back to website" link.
- **1024 px and wider:** a split screen. On one side is a sticky teal brand panel: the logo, an arch-framed black-and-white studio photo, a headline ("Your training, in one place.") and four portal features. On the other side is the sign-in column.
- **Below 1024 px:** the panel becomes a compact teal brand band at the top, so the logo always stays visible, with the form below it.

The panel uses the fixed brand teal in both themes, as the site's teal bands do.

**Elements:**
- Logo and brand name
- "Student portal" eyebrow, the **Welcome back.** heading and a one-line description
- **Continue with Google** and **Continue with Apple** buttons
- An "or sign in with email" divider
- Email field
- Password field with a visibility toggle (`aria-pressed`, and the label changes between Show and Hide password)
- **Forgot password?**
- **Sign in**
- "New to Sorrel? **Create an account**"
- An inline note explaining the static preview
- Theme and LTR/RTL controls

I left out "Remember me". In a static page it would be a control that does nothing.

**Static behaviour (honest by design):**

| Control | What happens |
|---|---|
| Sign in | Nothing is checked, and both fields can be empty. The fields are cleared, a message says "Opening the sample dashboard. No sign-in took place.", and the page goes to `dashboard.html`. The form has no `action` or `method`, and no request is made. |
| Continue with Google / Apple | Inline message: "Google (or Apple) sign-in is not connected in this static version. Nothing was sent to Google (or Apple) and you are not signed in." No request goes to the provider. |
| Forgot password? | "Password reset is not connected in this static version, so no email was sent. Please contact admissions for help." |
| Create an account | "Account creation is not connected in this static version, so no account was created. Please contact admissions to enrol." |

- Messages appear in a polite live region. No `alert()` is used.
- There are no demo usernames, passwords or sample credentials anywhere.
- The inputs use `autocomplete="off"` and nothing is stored.

## 2. Student Dashboard (`dashboard.html`)

**Application shell.** There is no public header, footer, hero or "Back to website" link.
- **Sidebar:** a teal sidebar (fixed width, 264 px, from 1024 px) with the logo (linking to Home 1) and six navigation items with icons. Practical Logs shows a count badge of 3. The bottom of the sidebar has a static-preview note plus theme and LTR/RTL controls.
- **Below 1024 px:** the sidebar becomes a slide-in drawer opened from the top bar's menu button. It has a backdrop, a focus trap, and closes with Esc, the close button, a tap on the backdrop, or choosing an item.
- **Top bar:** a breadcrumb and the view title as the page `h1`. Then come search (a field from 768 px, a search button below that), a "Sample data" badge (from 1280 px), the notifications button and dropdown, and the avatar with a profile menu (Profile, Certificates, Exit preview → `login.html`).

**Views.** The six views switch in the browser using the URL hash (`#overview`, `#learning`, `#schedule`, `#logs`, `#certificates`, `#profile`). Refresh, direct links and browser Back all work, and an unknown hash shows Overview. On each switch:
- the active item gets `aria-current="page"` and a highlight bar,
- the `h1` and the document title update,
- focus moves to the title.

There are no separate HTML pages per view.

| View | Content | Interactions |
|---|---|---|
| Overview | Welcome; a schedule-change alert; current course card (photo, batch, 58% progress ring, "up next", Continue learning); practical hours 74/120, skills signed off 18/30 and the next assessment; upcoming sessions; certificate status; practical progress by skill; recent activity | Links into the other views |
| My Learning | Enrolled course, overall progress, completed / in-progress / upcoming counts, 8 modules with status pills and progress | Filter: All, Completed, In progress, Upcoming (the count is announced). "Open module" shows an honest toast. |
| Batch Schedule | Batch MUA-26A, course, training days, room; a sample week (16 to 20 Nov 2026) with date, time, topic, room and status (Completed / Upcoming / Rescheduled) | Switches between a Week calendar and a List table. The page states that the schedule is not synchronised with any academy system. |
| Practical Logs | Hours logged, signed off, awaiting review, needs rework; a table of date, activity, topic, hours, status and trainer feedback | Status filter. Feedback rows expand (`aria-expanded`). "Add entry" shows a toast: nothing saved or submitted. |
| Certificates | Professional Makeup Artistry: in progress, "Issue date: not issued", requirements checklist, a certificate preview stamped **Sample · not issued**. Bridal Artistry Intensive: not started, with a dashed "locked" outline. | "View sample" opens a modal dialog (also stamped not issued). "Download PDF" shows "No certificate has been issued, so there is nothing to download". |
| Profile | Initials avatar, sample details (name, email `student@sorrelacademy.example`, phone in the UK drama range, ID `SAMPLE-0001`, course, batch) | "Edit details" shows "Nothing is saved to an account". It has no inputs, so it asks for no personal data. Display preferences (theme, direction) are real and saved in this browser only. |

**Other interactions:**
- **Notifications dropdown:** shows 2 unread. "Mark all as read" clears that state for the current view only and says so.
- **Search:** a combobox over a front-end index of views, modules, sessions, logs and certificates. Arrow keys and Enter work, and there is an empty state.
- **Profile menu:** opened by click; arrow keys move through items; Esc or an outside click closes it and returns focus.
- **Toasts:** used for every action that would need a backend.

**Sample data is labelled throughout:**
- the "Sample data" badge,
- the sidebar note "Static preview with sample data. Nothing here is linked to a student account",
- the footer line "Static preview · sample data only",
- the "Sample week" tag,
- the notes under the schedule, logs and certificates,
- "Sample student" under the name.

The certificates make no accreditation, government or "officially issued" claim.

## 3. No backend, no authentication, no credentials

- There is no authentication, password verification, registration, OAuth/SDK, database or API anywhere. The only JavaScript is `login.js` and `dashboard.js` (front-end only), plus the existing shared modules.
- **Tested:** no POST/PUT request on either page (including submitting the login form), and no request to Google, Apple or any OAuth host.
- **Tested:** Sign in with empty fields opens the dashboard. There are no `required` or `pattern` rules and no pre-filled values. The page text contains no credential-like strings.
- **Tested:** no message claims success. No account is created, nobody is signed in and no email is sent.

## 4. Brand navigation and routing

- On both pages the logo and brand name are a single link (`a.brand`, the existing partial) to `index.html` (Home 1). Tested by clicking.
- There is no "Back to website" or "Back to home" text link (tested on both pages).
- **Public site:**
  - The header's existing **Student Login** button (desktop and mobile menu) opens `login.html`.
  - The footer's Explore column now includes **Student Dashboard**, added through `site.json → actions.dashboard` and the footer generator. The header is unchanged.
- Both pages use the existing `head.html` partial, so CSS, fonts, theme and direction are applied before first paint (no flash). They also use the shared `main.js` theme and direction modules, whose other modules skip missing elements.

| Page | Live Server (web root `public/`) | Dev server (`npm run dev`) |
|---|---|---|
| Student Login | `http://127.0.0.1:5500/login.html` | `http://localhost:4173/login.html` |
| Student Dashboard | `http://127.0.0.1:5500/dashboard.html` | `http://localhost:4173/dashboard.html` |
| A dashboard view | `…/dashboard.html#schedule` (and `#overview`, `#learning`, `#logs`, `#certificates`, `#profile`) | same |

If the project folder itself is served, the paths are `/public/login.html` and `/public/dashboard.html`. Both pages are marked `noindex`.

## 5. Files

**Created**
- `src/pages/login.html`, `src/pages/dashboard.html` (built to `public/login.html` and `public/dashboard.html`)
- `src/css/pages/login.css`, `src/css/pages/dashboard.css`
- `public/assets/js/pages/login.js`, `public/assets/js/pages/dashboard.js`
- 18 icons in `src/icons/`: eye, eye-off, info, grid, book, calendar, clipboard, award, user, bell, search, log-out, check, lock, download, plus, list
- `public/assets/images/portal/` with 2 photos × 2 sizes:
  - `studio` (login panel): CC BY-SA 4.0, KelvinJM
  - `course` (dashboard course card): CC BY 2.0, geehairimages
  - Both from Wikimedia Commons, licences read from the Commons API on 10 Nov 2026, and neither used anywhere else on the site.
- This report

**Modified**
- `src/config/site.json`: added `actions.dashboard`. Saving it from a script also re-indented the file; the data is unchanged.
- `scripts/build-pages.mjs`:
  - page labels and assignments for `login` and `dashboard`;
  - the footer's Explore list now includes the dashboard.
- `src/config/images.json`: 2 entries. The manifest and credits page regenerate automatically, with "Student Login" and "Student Dashboard" groups.
- `src/css/main.css`: 2 imports.
- `README.md`: 2 URL rows.

The public website's pages, header and footer were not redesigned.

## 6. Test results

Everything below was **actually executed** with Edge (Chromium) via playwright-core and axe-core 4.x, against the built site. The scripts are kept outside the project, so there are no new dependencies.

Final run on the final build: ****661 / 661 passed****.

| Group | Checks | Result |
|---|---|---|
| Login | 26 / 26 | Portal layout; no public header, footer or nav; no back link; logo to Home 1; one `h1`; labelled fields; no `action` or `required`; no credentials shown; all four unconnected controls visible with honest messages; no identity-provider requests; password toggle; empty Sign in opens the dashboard with a non-claiming message; no POST; no `alert`; skip link; 360 px fit |
| Dashboard | 50 / 50 | Shell; 6 nav items with icons; sample-data labelling; each view (only that view visible, active item visually distinct, title, hash, focus); refresh, Back, deep link, unknown hash; notifications (open, Esc returns focus, mark read, outside click); profile menu (items, arrow keys, choose); search (results, Enter, empty state); learning filters; schedule week/list; logs filter and feedback; certificate dialog and honest download; profile toast and no inputs; theme from profile; logo to Home 1; no POST, `alert` or errors |
| Mobile drawer | 8 / 8 | Off-canvas by default; opens as a modal with focus on close; focus trap; Esc returns focus; item choice closes it; backdrop closes it; search button; logs become stacked cards |
| Public site | 15 / 15 | All 9 pages return 200 with no 4xx or script errors; portal images load; footer has Student Login and Student Dashboard; header Login opens the portal; footer Dashboard opens the dashboard; mobile menu still lists Login |
| Theme × direction × viewport | 522 / 522 | Login and each of the 6 dashboard views (7 targets) × light/dark × LTR/RTL × desktop 1440 / tablet 820 / mobile 390. In every combination: theme and direction applied, no horizontal overflow, headings never right-aligned (centred in RTL), content inside the viewport, no overlapping top-bar controls, **axe WCAG 2.2 A/AA plus best practice: 0 violations**, no errors. English text identical in LTR and RTL, with no Arabic |
| Width sweep | 40 / 40 | 320, 360, 375, 390, 430, 768, 1024, 1280, 1440 and 1920 px, LTR and RTL. Login, and the dashboard across all 6 views (the schedule in list mode): no overflow, nothing outside the screen, no clipped buttons |

**Regression:** Phase 4 About/Contact suite **330 / 330**. Phase 2 component suite **587 / 587**. The Phase 3 homepage suite printed **no result** on its last run (it started while another session was changing files, see the top note), so I have **no valid homepage regression result** for this phase.

**Build:** `npm run build` succeeds with "images: 82 used, all unique". `node scripts/check.mjs` passes (no physical left/right properties).

**Bugs found and fixed during testing:**
- The wordmark was invisible on teal: the logo colour is set on `.brand__logo`, not on the link.
- `.checks` clashed with the Certification page's CSS; renamed to `.db-checks`.
- The certificate "not issued" ribbon was clipped; replaced with a centred stamp.
- The profile LTR/RTL toggle was squashed by a broad grid rule.
- The mobile breadcrumb was clipped; it is now hidden below 480 px.
- In RTL, "?Forgot password" showed leading punctuation; fixed with bidi isolation on button text.
- Focus did not move into the drawer, because the drawer was still `visibility: hidden` at that moment; it now becomes visible at once.
- **A real script bug:** the toast container and the action buttons shared the `data-toast` attribute, so messages were written into the "Open module" button's label. The container now has its own `data-toast-region`.
- axe `label-content-name-mismatch` on the profile button and the profile theme button: fixed the accessible names.
- The locked certificate card was faded with opacity and failed contrast; it now uses a dashed outline.

## 7. Accessibility

- Semantic landmarks: `aside` and `nav` for the sidebar, `header`, and `main`.
- One `h1` per page. On the dashboard, the `h1` is the current view title and receives focus on each view change.
- Skip links on both pages.
- Labelled inputs, and accessible names on every icon button.
- Expandable controls use `aria-expanded`/`aria-controls`; toggles use `aria-pressed`.
- `aria-current` on the active view.
- Search follows the combobox/listbox pattern with `aria-activedescendant`.
- Progress bars use `role="progressbar"` with values; the progress ring is an image with a text equivalent.
- Live regions for the login messages, toasts and filter counts.
- Native `dialog` for the certificate preview.
- The drawer is a modal with a focus trap and Esc.
- Visible focus rings, and reduced motion respected: no transitions, and Sign in navigates at once.

Not tested: a real screen reader, Firefox and Safari, physical devices, performance.

## 8. Known issues and pending items

1. **No backend.** Nothing is authenticated or stored. The sample student, dates, figures, logs and notifications are fixed demonstration content. Connecting real accounts needs a later, approved backend decision.
2. **Anyone can open `dashboard.html` directly.** That is intended for a static preview; it is not a protected page.
3. **"Mark all as read" and filter states reset on reload.** Only theme and direction are remembered, in this browser.
4. **The Google and Apple marks** are the providers' standard sign-in symbols. If real sign-in is added later, follow each provider's branding guidelines.
5. **The sample week is fixed** (16 to 20 Nov 2026) and is labelled as a sample.
6. **No Phase 5 report.** The concurrent Courses/Certification work has no report in the project (see the note at the top).
7. **Photos are interim Commons imagery** with credits, as in earlier phases. They have not been cleared for commercial use.

## 9. Awaiting your review

- Approve the login portal and dashboard, or send changes.
- Confirm the sample student name and figures (Jordan Ellis, Professional Makeup Artistry, batch MUA-26A), or provide others.

The next phase has not been started.
