# Progress Tracker

Update this file after every completed feature. Any AI agent reading this should immediately know what is done, what is in progress, and what is next.

---

## Current Status

**Phase:** Phase 1 — Foundation
**Last completed:** 01 Homepage (UI)
**Next:** 02 Auth

---

## Progress

### Phase 1 — Foundation

- [x] 01 Homepage
- [ ] 02 Auth
- [ ] 03 PostHog Initialization
- [ ] 04 Database Schema

### Phase 2 — Profile Page

- [ ] 05 Profile Page — Full UI
- [ ] 06 Profile Save Logic
- [ ] 07 AI Profile Extraction from Resume
- [ ] 08 Resume PDF Generation from Profile

### Phase 3 — Find Jobs Page

- [ ] 09 Find Jobs Page — Full UI
- [ ] 10 Adzuna Job Discovery
- [ ] 11 Filter + Sort + Pagination

### Phase 4 — Job Details Page

- [ ] 12 Job Details Page — Full UI
- [ ] 13 Company Research Agent

### Phase 5 — Dashboard

- [ ] 14 Dashboard Page — Full UI
- [ ] 15 Stats Bar — Real Data
- [ ] 16 Recent Activity — Real Data
- [ ] 17 Analytics Charts — PostHog Data

---

## Decisions Made During Build

- Homepage dark CTAs use the dedicated `--color-cta-dark` token (#36394a) — sampled from the landing-page design's ~#343541 button; distinct from in-app purple accent buttons. (Was `bg-overlay-dark` #131316, corrected as too near-black; briefly reused `bg-text-darker` before getting its own semantic token.) Hero/Bottom CTA buttons are `text-base px-6 py-3`; navbar CTA stays `text-sm`. Hero headline ramps `text-4xl sm:text-5xl md:text-[3.25rem]` (36/48/52px) to match the design without oversizing small phones.
- Homepage dual CTA extracted to shared `components/homepage/HomeCtaButtons.tsx` (used by Hero + BottomCta) — includes the filled play-triangle arrow icon. Do not re-inline the button pair.
- Homepage agent-log asset renamed `agnet-log.png` → `agent-log.png` (typo fix); referenced in ApplyWithConfidence.
- Dashboard and find-jobs preview images copied from `context/designs/` to `public/images/`.
- Agent log terminal in Apply With Confidence section built as HTML mockup (no image asset).
- Real homepage image assets wired in after they were added to `public/`: `logo.png` (full lockup) replaces the coded logo in Navbar + Footer; `images/user-icon.png` replaces the testimonial initials; `images/agnet-log.png` replaces the coded agent-log terminal mockup. Hero and ManageJobSearch keep their homepage-specific `*-preview.png` assets — `dashboard-demo.png` and `jobs-lists.png` are reserved for the real Dashboard/Find-Jobs pages, not the homepage.

---

## Notes

_Add notes here as the build progresses — workarounds, patterns, anything that differs from the context files._
