# Portfolio Redesign Design — Calvin Patmont

**Date:** 2026-03-19
**Approach:** "The Portfolio First" (Approach B)
**Goal:** Impress recruiters and potential clients — the work leads, the person follows.

---

## Audience & Goal

- **Primary audience:** Recruiters and potential clients (both equally)
- **#1 objective:** Leave visitors impressed — they likely already have contact info
- **Not** a lead-gen funnel — no conversion pressure, just credibility and wow factor

---

## Visual Direction

- **Aesthetic:** Clean / minimal modern (Apple/Linear feel)
- **Background:** `#F5F5F3` (off-white, warm)
- **Text:** `#111111` (near-black)
- **Accent:** `#1A6BFF` (electric blue)
- **Card overlays:** `#111111` at 70% opacity on hover
- **Typography:** Inter or DM Sans via Google Fonts (no build tooling)

---

## Page Structure

```
[ NAV — floating, minimal ]
[ PORTFOLIO GRID — full viewport, filters above ]
[ ABOUT — photo + bio + stat callouts + skill tags ]
[ EXPERIENCE TIMELINE — animated, impact-focused ]
[ CONTACT — dark section, email + social ]
```

---

## Section 1: Navigation

- Fixed top bar, nearly invisible on load (translucent)
- On scroll past grid: transitions to white with subtle bottom border + drop shadow
- Active section highlighted in accent blue (`#1A6BFF`)
- Links: `Work · About · Experience · Contact`
- Right side: `Download Resume` link (opens/downloads PDF) — high value for recruiters

---

## Section 2: Portfolio Grid

**Layout:**
- CSS Grid, 3 columns desktop / 2 tablet / 1 mobile
- `grid-auto-rows: 380px` — equal height forces consistent framing regardless of image quality
- No masonry library — pure CSS

**Card treatment:**
- Project image as `background-image: cover; center center`
- Permanent subtle dark gradient at bottom — shows project title in white (always readable)
- On hover: full `#111111` overlay at 70% opacity reveals:
  - Project title (larger)
  - One-line descriptor (e.g., "Airship structural components — LTA Research")
  - Category tag chip
  - `→` arrow

**Filter bar:**
- Pill buttons: `ALL · ENGINEERING · HOBBIES`
- Remove "Architecture and Construction" filter (removed from resume)

**Click behavior — Slide-in panel (right side):**
- `<div>` slides in via CSS `transform: translateX`
- Grid remains visible behind panel (scrim overlay)
- Panel contains:
  - Large image
  - Project title + company/context
  - **Problem:** 1 sentence
  - **What I built:** 2–3 sentences
  - **Skills/tools:** tag chips (e.g., `SolidWorks`, `FEA`, `Composites`)
  - Close button (`×`)
- Chosen over lightbox: more modern, keeps grid context visible, room for real descriptions

---

## Section 3: About + Skills

**Layout:** Two columns desktop, stacked mobile.

**Left — Photo:**
- `profile_nasa.jpg` cropped to square, slightly rounded corners
- No border or drop shadow

**Right — Text:**
- No heading — straight into resume summary paragraph
- Below: 3 bold stat callouts (e.g., `10+ years` / `6 industries` / `[punchy stat]`)
- Calvin to verify exact stats

**Skills — tag cloud grouped by category (replaces progress bars):**
- `CAD & Design` — SolidWorks, CATIA, AutoCAD
- `Analysis` — FEA, CFD, Thermal modeling
- `Fabrication` — Machining, Composites, Welding
- `Software` — Python, MATLAB, LabVIEW
- `Management` — Production scale-up, Construction PM, Cross-functional teams

*Rationale: Arbitrary percentage bars undermine credibility with technical audiences.*

---

## Section 4: Experience Timeline

**Layout:** Single centered column, alternating left/right on desktop, linear stacked mobile.

**Each entry:**
- Company name — large, bold
- Role + dates — smaller, muted gray
- One-sentence impact statement (active voice, most impressive accomplishment)
- Industry tag chip

**Example impact statements:**
- Havelock Wool: *"Scaled production capacity from prototype to commercial manufacturing."*
- LTA Research: *"Designed structural and mechanical systems for a next-generation airship."*
- Redwood Materials: *"Commissioned battery recycling equipment for a greenfield facility."*
- Sila Nanotechnologies: *"Managed facility build-out and equipment commissioning for battery R&D manufacturing."*
- Brechtel: *"Designed precision aerosol instrumentation for NASA and NOAA research programs."*
- Porifera: *"Built and iterated membrane filtration systems from R&D through pilot production."*

**Visual details:**
- Center spine: accent blue (`#1A6BFF`)
- Spine nodes: small filled circles, accent blue
- Scroll-triggered fade-up animations (WOW.js — already in project)
- Education entries: lighter background card, visually distinct from work entries

---

## Section 5: Contact

**Layout:** Full-width, dark background (`#111111`), white text — strong visual contrast signals end of page.

**Content:**
- Large heading: *"Let's build something."*
- `calvin@patmont.com`
- Icon links: LinkedIn + GitHub (remove GitHub if not active)
- No contact form — unnecessary friction

---

## Technical Notes

- Single `index.html` file — no framework or build tooling
- Existing dependencies kept: Bootstrap, Font Awesome, WOW.js, Animate.css
- Add: Google Fonts (Inter or DM Sans), custom CSS replacing/extending `style.css`
- Slide-in panel: vanilla JS + CSS transitions (no new library)
- Nav scroll behavior: small vanilla JS scroll listener
- PDF resume: add file to repo, link from nav

---

## Open Items (Calvin to provide)

- [ ] Verify stat callouts (years of experience, industries count, third stat)
- [ ] Write one-sentence impact statements per role (or approve suggested ones above)
- [ ] Write Problem / What I built descriptions per project for slide-in panels
- [ ] Confirm LinkedIn URL and whether GitHub should be linked
- [ ] Provide PDF resume for download link
- [ ] Confirm which tool/skill tags apply to each project
