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

### Login Page

File: app/(auth)/login/page.tsx
Last updated: 2026-07-04

| Property       | Class                                                                    |
| -------------- | ------------------------------------------------------------------------ |
| Page wrapper   | flex min-h-full flex-1 flex-col items-center justify-center bg-background px-4 py-12 |
| Card           | w-full max-w-sm rounded-2xl border border-border bg-surface p-8 shadow-card |
| Heading        | text-2xl font-bold text-text-primary                                     |
| Subtext        | text-sm font-medium text-text-secondary                                  |
| OAuth button   | inline-flex items-center justify-center gap-3 rounded-md border border-border bg-surface px-4 py-2.5 text-sm font-medium text-text-primary hover:bg-surface-secondary |
| Error text     | text-sm font-medium text-error (role="alert")                            |
| Loading spinner| h-6 w-6 animate-spin rounded-full border-2 border-border border-t-accent |

**Pattern notes:**
Client component. Centered auth card matching the standard card tokens (rounded-2xl, border-border, shadow-card). Two OAuth buttons use the **secondary** button style (surface + border), full width, stacked with `gap-3`. Provider brand icons are inline SVGs — GitHub uses `currentColor`; the Google mark keeps its official multi-color hex (the one sanctioned exception to the no-hardcoded-hex rule, since a brand logo cannot be tokenized). Reuse this spinner + secondary-button pattern for AuthGuard and future auth surfaces.

---

### Auth Guard

File: components/auth/AuthGuard.tsx
Last updated: 2026-07-04

| Property        | Class                                                                    |
| --------------- | ------------------------------------------------------------------------ |
| Loading wrapper | flex min-h-full flex-1 items-center justify-center bg-background         |
| Spinner         | h-6 w-6 animate-spin rounded-full border-2 border-border border-t-accent |

**Pattern notes:**
Client component wrapping protected page content. Calls `insforge.auth.getCurrentUser()` on mount — shows the spinner while checking, redirects to `/login` if no user, renders children when authed. This is the project's route-protection mechanism (no middleware). Wrap every protected page in `<AuthGuard>`.

---

### Signed-In Panel (placeholder)

File: components/auth/SignedInPanel.tsx
Last updated: 2026-07-04

| Property   | Class                                                                    |
| ---------- | ------------------------------------------------------------------------ |
| Card       | mx-auto flex w-full max-w-sm flex-col items-center rounded-2xl border border-border bg-surface p-8 text-center shadow-card |
| Sign out   | rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground |

**Pattern notes:**
Temporary placeholder shown on `/dashboard` to prove the auth session works — displays the signed-in email and a Sign Out button (`insforge.auth.signOut()` → redirect to `/login`). **Replace in Feature 14 (Dashboard — Full UI).** Uses the primary button style (`bg-accent`) for sign out.

---

### Navbar (icons + active state)

File: components/layout/Navbar.tsx
Last updated: 2026-07-05

| Property        | Class                                                      |
| ---------------- | ----------------------------------------------------------- |
| Active link      | text-accent (icon + label both inherit via currentColor)    |
| Inactive link    | text-text-dark hover:text-text-primary                      |
| Icon size        | h-4 w-4, inline before label, gap-1.5                        |

**Pattern notes:**
Now a client component (`usePathname`) — each of the three nav links carries an inline SVG icon (grid/dashboard, search/find-jobs, person/profile) that share `currentColor`, so the active-purple/inactive-gray state colors both icon and label together. Matches `context/designs/profile.png`'s navbar exactly. CTA button and Logo unchanged from the original version.

---

### Profile Page

File: app/profile/page.tsx
Last updated: 2026-07-05

| Property     | Class                                             |
| ------------ | -------------------------------------------------- |
| Page wrapper | mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-8 py-8 |

**Pattern notes:**
Thin Server Component shell — `<Navbar>` + `<AuthGuard>` wrapping `<ProfilePageClient>`, which owns the real data fetch (see below). No `mockProfile` anymore as of Feature 06.

---

### ProfilePageClient

File: components/profile/ProfilePageClient.tsx
Last updated: 2026-07-05

| Property      | Class                                                                  |
| ------------- | --------------------------------------------------------------------- |
| Loading state | flex min-h-[400px] items-center justify-center, spinner border-2 border-border border-t-accent |
| Error state   | rounded-2xl border border-border bg-surface p-6 shadow-card, text-sm font-medium text-error |

**Pattern notes:**
Client component (Feature 06) — calls `useAuthUser()` (from `AuthGuard`) for the signed-in user's id, fetches the real `profiles` row via `insforge.database.from("profiles").select("*").eq("id", user.id).single()`, maps it through `rowToProfile` (`lib/profile-mapper.ts`), then renders `ProfileAttentionBanner`/`ResumeUpload`/`ProfileForm` fed real data. This is the reason `app/profile/page.tsx` is a thin shell rather than owning the fetch itself — matches the existing `DashboardPage`/`SignedInPanel` split.

---

### CompletionIndicator

File: components/profile/CompletionIndicator.tsx
Last updated: 2026-07-05

| Property     | Class / value                                          |
| ------------ | -------------------------------------------------------- |
| Wrapper      | relative flex h-28 w-28 items-center justify-center       |
| Ring track   | stroke="var(--color-error)" strokeOpacity="0.15"          |
| Ring fill    | stroke="var(--color-error)" strokeWidth 10, round linecap  |
| Center text  | text-2xl font-bold text-text-primary                       |

**Pattern notes:**
Pure SVG ring (`-rotate-90` viewBox trick, `strokeDasharray`/`strokeDashoffset` driven by `percentage` prop) — no charting library. Always uses the error/red token regardless of percentage value, matching the design's red ring at 70%. Reused wherever a completion ring is needed.

---

### ProfileAttentionBanner

File: components/profile/ProfileAttentionBanner.tsx
Last updated: 2026-07-05

| Property        | Class                                                              |
| ---------------- | --------------------------------------------------------------------- |
| Card             | flex items-center justify-between rounded-2xl border border-border bg-surface p-6 shadow-card |
| Missing-field tag | rounded-full bg-error/10 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-error |

**Pattern notes:**
Returns `null` when `missingFields` is empty — this is the section's empty state per ui-rules.md. Tag background uses Tailwind v4's `/10` opacity modifier on the `error` token rather than a new named color, since ui-tokens.md has no dedicated "light error" token. Renders `CompletionIndicator` on the right.

---

### ResumeUpload

File: components/profile/ResumeUpload.tsx
Last updated: 2026-07-05

| Property      | Class                                                                 |
| ------------- | ------------------------------------------------------------------------ |
| Dropzone      | rounded-xl border border-dashed border-border-muted bg-surface-tertiary px-6 py-12, hover:bg-surface-secondary |
| Upload icon   | h-12 w-12 rounded-full bg-surface shadow-card wrapper, text-accent icon inside |
| Select button | secondary button style (border border-border, bg-surface)                |
| Generate CTA  | primary button style (bg-accent), with document icon                     |

**Pattern notes:**
The whole dropzone is a `<label>` wrapping a visually-hidden (`sr-only`) file input — clicking anywhere in the zone opens the file picker natively, no JS drag-and-drop handlers yet. **Explicitly out of scope for Feature 06** (profile save) — stays fully static/unwired; resume upload logic lands in Feature 07/08. "Generate Resume from Profile" button is inert until Feature 08.

---

### FormField

File: components/profile/FormField.tsx
Last updated: 2026-07-05

| Property | Class                                                    |
| -------- | ----------------------------------------------------------- |
| Label    | text-xs font-medium uppercase tracking-wide text-text-secondary |
| Wrapper  | flex flex-col gap-1.5                                          |

**Pattern notes:**
Shared label+input vertical wrapper used by every field in `ProfileForm`. Matches the design's uppercase micro-labels (FULL NAME, EMAIL, etc). Reuse for any future form on Find Jobs / job details pages instead of re-inlining label markup.

---

### ProfileForm

File: components/profile/ProfileForm.tsx
Last updated: 2026-07-05

| Property        | Class                                                                |
| ---------------- | ------------------------------------------------------------------------ |
| Section card    | rounded-2xl border border-border bg-surface p-6 shadow-card               |
| Section divider | border-t border-border pt-6 (between Personal/Professional/Work Exp/Education/Preferences) |
| Input           | rounded-md border border-border bg-surface px-3 py-2 text-sm, focus:ring-1 ring-accent |
| Disabled input  | cursor-not-allowed bg-surface-secondary text-text-muted (Email field)      |
| Skill/industry tag | rounded-full bg-surface-secondary px-3 py-1 text-sm, × remove button    |
| Role card       | rounded-xl border border-border bg-surface-tertiary p-4                    |
| Save button     | flex w-full items-center justify-center gap-2 bg-accent px-4 py-3 text-sm font-medium text-accent-foreground, disabled:opacity-60 |
| Saving spinner  | h-4 w-4 animate-spin rounded-full border-2 border-border border-t-accent (inline in button) |
| Save error text | text-sm font-medium text-error                                             |
| Save success text | text-sm font-medium text-success                                         |

**Pattern notes:**
Client component — **fully wired as of Feature 06.** All scalar/nested fields (Personal Info, Professional Info scalars, Education, Job Preferences) are controlled via one `useState<EditableFields>` object; `skills`/`industries`/`roles` stay as their own separate array states (unchanged from Feature 05) and are only merged in at save time. `handleSave` runs `calculateCompletion` (`lib/utils.ts`), maps the merged profile through `profileToRow` (`lib/profile-mapper.ts`), and calls `insforge.database.from("profiles").update(...).eq("id", profile.id)` directly — no Server Action (see architecture.md's InsForge Client Pattern section for why). Fires `profile_completed` via PostHog on the `isComplete` false→true transition only. Work Experience caps at 3 roles per architecture.md (`+ Add role` link hides itself at the cap). "Currently working here" checkbox clears and disables the End Date field. Email field is permanently disabled/uncontrolled per build-plan.md ("pre-filled, not editable") — excluded from `EditableFields`. Uses native `<select>`/`<input type="month">` — no shadcn/ui components installed in this project despite architecture.md listing it as a dependency; every form primitive here is plain Tailwind-styled HTML matching ui-rules.md's Form Inputs spec directly.

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
