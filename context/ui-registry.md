# UI Registry

Living document. Updated after every component is built. Read this before building any new component — match existing patterns exactly before inventing new ones.

---

## How to Use

Before building any component:

1. Check if a similar component already exists here
2. If yes — match its exact classes
3. If no — build it following ui-rules.md and ui-tokens.md, then add it here

After building any component — update this file with the component name, file path, and exact classes used.

---

## Components

### Logo

File: components/layout/Logo.tsx
Last updated: 2026-07-04

| Property   | Class                          |
| ---------- | ------------------------------ |
| Image      | h-8 w-auto (src /logo.png)     |
| Wrapper    | Link flex items-center         |

**Pattern notes:**
Logo is the full `public/logo.png` lockup (icon + "JobPilot" wordmark baked into one image), rendered via next/image at `h-8 w-auto` (intrinsic 496×168). Shared by Navbar and Footer. Superseded the earlier coded `bg-logo-gradient` box + inline SVG + text once the real asset was added.

---

### Navbar

File: components/layout/Navbar.tsx
Last updated: 2026-06-30

| Property       | Class                                           |
| -------------- | ----------------------------------------------- |
| Background     | bg-surface                                      |
| Border         | border-b border-border                          |
| Height         | h-16                                            |
| Max width      | max-w-[1440px] mx-auto px-6                     |
| Nav links      | text-sm font-medium text-text-dark              |
| CTA button     | bg-cta-dark text-surface rounded-md px-4 py-2 text-sm font-medium |

**Pattern notes:**
Homepage navbar uses dark CTA, not purple accent. Nav links hover to text-text-primary. Dark CTA fill is `bg-cta-dark` (#36394a) — matches the design's ~#343541 button, not the near-black `bg-overlay-dark`. Navbar CTA keeps `text-sm` for its compact scale (hero/bottom CTAs use `text-base`).

---

### Footer

File: components/layout/Footer.tsx
Last updated: 2026-06-30

| Property    | Class                                    |
| ----------- | ---------------------------------------- |
| Background  | bg-surface                               |
| Border      | border-t border-border                   |
| Links       | text-sm text-text-muted                  |
| Layout      | max-w-[1440px] mx-auto px-6 py-8         |

---

### Hero

File: components/homepage/Hero.tsx
Last updated: 2026-06-30

| Property           | Class                                              |
| ------------------ | -------------------------------------------------- |
| Section background | bg-hero-gradient                                   |
| Headline           | text-4xl sm:text-5xl md:text-[3.25rem] font-bold text-text-primary md:leading-[1.1] |
| Subheadline        | text-base md:text-lg font-medium text-text-secondary |
| CTA buttons        | via HomeCtaButtons (see below)                     |
| Preview frame      | rounded-xl border border-border bg-surface shadow-card |

**Pattern notes:**
Headline ramps 36px → 48px (sm) → 52px (md) — matches the design (~48px) on tablet/desktop while staying comfortable on small phones. The dual CTA pair is the shared `HomeCtaButtons` component. Dashboard preview uses browser chrome dots (error/warning/success tokens).

---

### Feature Section (text + visual)

File: components/homepage/ManageJobSearch.tsx, ApplyWithConfidence.tsx
Last updated: 2026-06-30

| Property         | Class                                              |
| ---------------- | -------------------------------------------------- |
| Section padding  | px-6 py-16 md:py-24                                |
| Grid             | lg:grid-cols-2 gap-12 lg:gap-16 max-w-[1440px]     |
| Section heading  | text-3xl md:text-4xl font-bold text-text-primary   |
| Feature title    | text-base font-semibold text-text-primary          |
| Feature body     | text-sm font-medium text-text-secondary            |
| Highlight border | border-l-2 border-accent pl-5 (first item only)    |
| Visual wrapper   | rounded-xl border border-border bg-surface-secondary p-3 shadow-card |

---

### Testimonial

File: components/homepage/Testimonial.tsx
Last updated: 2026-06-30

| Property    | Class                                              |
| ----------- | -------------------------------------------------- |
| Background  | bg-testimonial-pattern                             |
| Label       | text-xs font-semibold uppercase tracking-widest text-accent |
| Quote       | text-xl md:text-2xl font-medium italic text-text-primary |
| Avatar      | size-12 rounded-full object-cover (src /images/user-icon.png) |

---

### Bottom CTA

File: components/homepage/BottomCta.tsx
Last updated: 2026-06-30

| Property           | Class                    |
| ------------------ | ------------------------ |
| Section background | bg-hero-gradient         |
| Buttons            | via HomeCtaButtons       |

---

### HomeCtaButtons

File: components/homepage/HomeCtaButtons.tsx
Last updated: 2026-07-04

| Property      | Class                                                                 |
| ------------- | --------------------------------------------------------------------- |
| Group wrapper | mt-8 flex flex-col items-center gap-3 sm:flex-row                      |
| Primary       | bg-cta-dark text-surface rounded-md px-6 py-3 text-base font-medium    |
| Secondary     | bg-surface border border-border text-text-primary rounded-md px-6 py-3 text-base |
| Arrow icon    | filled triangle, text-text-muted, ~13×15 (play-style, aria-hidden)    |

**Pattern notes:**
Single source of truth for the homepage dual CTA ("Get Started" + "Find Your First Match"), used by both Hero and BottomCta — do not re-inline the pair. Primary uses `bg-cta-dark` (#36394a, matches the design's ~#343541 button). The arrow is a filled play-triangle in `text-text-muted`, not an outlined chevron.

---

### Agent Log Terminal

File: components/homepage/ApplyWithConfidence.tsx
Last updated: 2026-07-04

| Property       | Class                                                     |
| -------------- | --------------------------------------------------------- |
| Visual wrapper | overflow-hidden rounded-xl border border-border bg-surface-secondary p-3 shadow-card |
| Image          | h-auto w-full rounded-lg (src /images/agent-log.png)      |

**Pattern notes:**
Now a static screenshot asset (`/images/agent-log.png`, intrinsic 2144×1656) inside the standard feature "Visual wrapper" — matches the ManageJobSearch visual pattern. Replaced the earlier coded `bg-overlay-dark` terminal mockup, which existed only because no image asset was available at build time.

---

### Global Utilities

File: app/globals.css
Last updated: 2026-06-30

| Utility                 | Purpose                          |
| ----------------------- | -------------------------------- |
| bg-hero-gradient        | Hero + bottom CTA backgrounds    |
| bg-testimonial-pattern  | Testimonial section grid bg      |
| bg-logo-gradient        | Logo icon gradient               |
| shadow-card             | Card/browser frame elevation     |
