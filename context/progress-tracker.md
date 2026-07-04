# Progress Tracker

Update this file after every completed feature. Any AI agent reading this should immediately know what is done, what is in progress, and what is next.

---

## Current Status

**Phase:** Phase 1 — Foundation
**Last completed:** 02 Auth
**Next:** 03 PostHog Initialization

---

## Progress

### Phase 1 — Foundation

- [x] 01 Homepage
- [x] 02 Auth
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
- **02 Auth — MAJOR SDK CORRECTION.** The context files (architecture/library-docs/code-standards) were written against `@insforge/ssr` (`createBrowserClient`/`createServerClient`, cookie forwarding, `middleware.ts`, `auth.getUser()`) — **that package does not exist on npm**. The real InsForge SDK is `@insforge/sdk` v1.4.x: `createClient({ baseUrl, anonKey })`, `auth.signInWithOAuth()`, `auth.getCurrentUser()`, `auth.signOut()`, `{ data, error }` returns, array-format inserts. All three context files were corrected for the client + auth surface; **server-side/DB/storage patterns are flagged 🚧 unverified** and must be re-fetched from the InsForge MCP (`db-sdk`/`storage-sdk`) before Feature 04.
- 02 Auth — route protection is a **client-side guard** (`components/auth/AuthGuard.tsx` → `getCurrentUser()` on mount, redirect to `/login`), **not** middleware. User's explicit choice. OAuth callback collapses into `/dashboard` load (SDK auto-exchanges `insforge_code`); no dedicated callback route.
- 02 Auth — env vars `NEXT_PUBLIC_INSFORGE_URL` (→ `baseUrl`) and `NEXT_PUBLIC_INSFORGE_ANON_KEY` (→ `anonKey`) in `.env.local`. Backend URL `https://djg3wnsn.eu-central.insforge.app`.
- 02 Auth — **BLOCKED ON USER:** redirect URLs must be added to allowed-redirect-URLs in the InsForge dashboard (Auth Methods) before OAuth can be tested — add `http://localhost:3000/dashboard` (dev) + prod URL. `allowedRedirectUrls` was empty at build time.
- 02 Auth — `app/dashboard/page.tsx` + `components/auth/SignedInPanel.tsx` are a **temporary placeholder** (proves session works, shows email + sign out). Replace in Feature 14.
- 02 Auth — Google OAuth button keeps the official multi-color logo hex (sanctioned exception to no-hardcoded-hex, brand logos can't be tokenized); GitHub icon uses `currentColor`.
- 02 Auth — Tailwind stays on v4 despite InsForge's "use 3.4" guidance (ripping it out would break Feature 01). Noted, not acted on.

---

## Notes

_Add notes here as the build progresses — workarounds, patterns, anything that differs from the context files._
