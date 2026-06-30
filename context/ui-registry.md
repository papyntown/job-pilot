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
Last updated: 2026-06-30

| Property      | Class                                              |
| ------------- | -------------------------------------------------- |
| Icon box      | bg-logo-gradient size-9 rounded-[10px]             |
| Brand text    | text-[19px] font-bold leading-7 text-text-darkest |

**Pattern notes:**
Logo icon uses `bg-logo-gradient` utility. Always pair icon + "JobPilot" wordmark.

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
| CTA button     | bg-overlay-dark text-surface rounded-md px-4 py-2 text-sm font-medium |

**Pattern notes:**
Homepage navbar uses dark CTA, not purple accent. Nav links hover to text-text-primary.

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
| Headline           | text-4xl md:text-5xl font-bold text-text-primary   |
| Subheadline        | text-base md:text-lg font-medium text-text-secondary |
| Primary CTA        | bg-overlay-dark text-surface rounded-md px-5 py-2.5 text-sm font-medium |
| Secondary CTA      | bg-surface border border-border text-text-primary rounded-md px-5 py-2.5 |
| Preview frame      | rounded-xl border border-border bg-surface shadow-card |

**Pattern notes:**
Hero and bottom CTA share the same button pair pattern. Dashboard preview uses browser chrome dots (error/warning/success tokens).

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
| Avatar      | size-12 rounded-full bg-accent-light text-accent font-semibold |

---

### Bottom CTA

File: components/homepage/BottomCta.tsx
Last updated: 2026-06-30

| Property           | Class                    |
| ------------------ | ------------------------ |
| Section background | bg-hero-gradient         |
| Buttons            | Same as Hero section     |

---

### Agent Log Terminal

File: components/homepage/ApplyWithConfidence.tsx (AgentLogPreview)
Last updated: 2026-06-30

| Property    | Class                              |
| ----------- | ---------------------------------- |
| Background  | bg-overlay-dark                    |
| Border      | border border-border rounded-xl shadow-card |
| Log prefix  | text-info, text-success-alt, text-accent |
| Log text    | text-surface                       |

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
