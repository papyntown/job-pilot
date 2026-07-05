# Progress Tracker

Update this file after every completed feature. Any AI agent reading this should immediately know what is done, what is in progress, and what is next.

---

## Current Status

**Phase:** Phase 2 — Profile Page
**Last completed:** 06 Profile Save Logic
**Next:** 07 AI Profile Extraction from Resume

---

## Progress

### Phase 1 — Foundation

- [x] 01 Homepage
- [x] 02 Auth
- [x] 03 PostHog Initialization
- [x] 04 Database Schema

### Phase 2 — Profile Page

- [x] 05 Profile Page — Full UI
- [x] 06 Profile Save Logic
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
- 03 PostHog — **env var name bug fixed.** `.env.local` had `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` instead of `NEXT_PUBLIC_POSTHOG_KEY`, so `PostHogProvider` never received an `apiKey`. Renamed to match code. Also corrected `ui_host` from `eu.posthog.com` to `us.posthog.com` in `PostHogProvider.tsx` and `lib/posthog-client.ts` (project's PostHog host is US region).
- 03 PostHog — `lib/posthog-client.ts` is now the single shared `posthog` client import (dead `initPostHog()` duplicate removed); `PostHogProvider.tsx`, `AuthGuard.tsx`, and `SignedInPanel.tsx` all import from there instead of `posthog-js` directly.
- 03 PostHog — `posthog.identify(userId, { email })` now called in `AuthGuard` once a session is confirmed; `posthog.reset()` called in `SignedInPanel` on sign out. Matches the build-plan/library-docs spec that was previously unimplemented.
- 03 PostHog — removed undocumented `sign_in_started` / `sign_in_failed` events from the login page — `code-standards.md` fixes the event list to exactly 4 events (`job_search_started`, `job_found`, `profile_completed`, `company_researched`); these two weren't on it.
- 04 DB Schema — **major DB SDK correction.** Fetched the real `db-sdk`/`storage-sdk`/`auth-sdk` docs via InsForge MCP before building. Database calls are namespaced `insforge.database.from(...)`, not `insforge.from(...)` as every context file previously showed — corrected in `architecture.md`, `library-docs.md`, `code-standards.md`.
- 04 DB Schema — `auth.uid()` / `auth.jwt()` / `auth.role()` are real SQL functions on this backend (Supabase-style convention), confirmed by introspecting `pg_proc`. `auth.users.id` is a real `uuid` PK. RLS on all four new tables uses standard `auth.uid() = user_id` (`= id` for `profiles`) — no InsForge-specific RLS mechanism needed.
- 04 DB Schema — created `profiles`, `agent_runs`, `jobs`, `agent_logs` tables directly via the InsForge MCP `run-raw-sql` tool (admin DDL — schema management is MCP-only, never the SDK), plus indexes on all FK/sort columns and RLS enabled with one `FOR ALL` owner policy per table. Verified with `get-table-schema` on all four.
- 04 DB Schema — added two columns not in the original architecture.md spec: `profiles.resume_pdf_key` (real Storage SDK auto-renames on key collision — URL alone can't reference a file later, must save the key too) and `profiles.completion_percentage` / `profiles.missing_fields` (build-plan Feature 06 requires these calculated-and-saved, Feature 05's UI reads them on load, but architecture.md never named columns for them).
- 04 DB Schema — user's explicit choice: `profiles` row is **auto-created on signup** via a `SECURITY DEFINER` trigger (`handle_new_user()` on `auth.users AFTER INSERT`), not lazily upserted in Feature 06. Also by explicit choice: no DB-level CHECK constraints on enum-shaped columns (`source`, `status`, `level`) — plain `text`, enforced only in application code. Also kept `jobs.source` modeling both `'search'` and `'url'` (nullable `run_id`) matching architecture.md exactly, even though URL import UI is out of scope for this build.
- 04 DB Schema — created `resumes` storage bucket via `create-bucket(isPublic: false)`. Confirmed (by querying `pg_policies` and `storage.buckets` directly) that InsForge storage access control is an app-layer concern off the bucket's `public` flag — there's no `storage.objects` RLS to write.
- 04 DB Schema — **storage `upload()` has no `upsert` param** — real signature is `upload(path, file)`, auto-renames on key collision instead of overwriting. `library-docs.md`'s prior example showing `upsert: true` was wrong; corrected. Matters for Feature 06/08 resume upload logic.
- 04 DB Schema — 🚧 **still open, blocks Feature 06:** no documented service-role/admin key. Server-side code (Server Actions, API routes, agent functions) needs the signed-in user's access token attached to its `insforge` client call for RLS's `auth.uid()` to resolve — mechanism not yet verified. Fetch `auth-sdk`/`instructions` docs again and resolve before writing Feature 06's `actions/profile.ts`.
- 05 Profile Page — built full UI with mock data, no save logic, per `context/designs/profile.png`: `ProfileAttentionBanner` (SVG ring `CompletionIndicator`, missing-field tags), `ResumeUpload` (dropzone + Generate Resume CTA), `ProfileForm` (Personal Info, Professional Info with skills/industries tag inputs, Work Experience up to 3 roles, Education, Job Preferences, Save Profile button). New `types/index.ts` — `Profile`, `WorkExperienceEntry`, `Education` types shared across profile components.
- 05 Profile Page — `Navbar` upgraded to a client component (`usePathname`) with inline SVG icons per nav item and purple active-state color, matching the profile design exactly — this changes the navbar on every page, not just `/profile`, since it's the one shared component.
- 05 Profile Page — no shadcn/ui components actually installed in the project (`components/ui/` is empty) despite `architecture.md` listing shadcn as a dependency — all form primitives built as plain Tailwind-styled native HTML (`input`, `select`, `textarea`) matching `ui-rules.md`'s Form Inputs spec directly. Flagging in case a future feature assumes shadcn primitives exist.
- 05 Profile Page — visual verification method: `AuthGuard` blocks unauthenticated rendering and no OAuth session/browser automation is available in this environment, so verified by temporarily creating an unguarded preview route (`app/preview-profile-temp`), screenshotting with an ephemeral `npx playwright` install (not added to `package.json`), confirming pixel-level match against `profile.png`, then deleting the temp route. No new dependency was added to the project.
- 05 Profile Page — **bug found in `/review`, fixed:** `app/profile/page.tsx` never rendered `<Navbar>` — `Navbar` isn't global (no `app/layout.tsx` inclusion), it's added per-page, and the first pass only wrapped content in `<AuthGuard>`. Same gap existed in `app/dashboard/page.tsx` (the Feature 02 placeholder). Both fixed: `<Navbar>` now renders outside/above `<AuthGuard>` so it's visible even while the auth check is loading, matching the homepage's explicit-include pattern. Re-verified visually via the same temp-preview-route + Playwright method — Navbar with active-state now confirmed present on `/profile`.
- 06 Profile Save Logic — **major architectural resolution.** Resolved the open gap (flagged since Feature 04) of how server-side code attaches a signed-in user's session to InsForge so RLS resolves, by reading the actual `@insforge/sdk` package source directly (not just docs): there is **no public API to extract the live access token** from a client instance — `getCurrentUser()` never returns one, and the SDK's `TokenManager` holding it is a private field, never exposed. Token-forwarding to a Server Action is therefore not viable without adopting the separate `@insforge/sdk/ssr` cookie-based subpath, which this project's auth flow doesn't use. **Decision: all RLS-gated profile reads/writes happen client-side**, through the shared browser `insforge` singleton called directly from `"use client"` components — it already carries its own live session for every request. This is a deliberate deviation from `architecture.md`'s original "Server Actions own mutations" boundary; `actions/profile.ts` was never created and the `actions/` folder remains reserved for a future genuine server-only-secret use case. `architecture.md` and `code-standards.md` both updated to reflect this as the confirmed pattern, not an open question.
- 06 Profile Save Logic — built `lib/profile-mapper.ts` (`rowToProfile`/`profileToRow`) to convert between the camelCase `Profile` app type and the snake_case `profiles` DB row shape, including comma-string ↔ `text[]` conversion for `jobTitlesSeeking`/`preferredLocations`. `cover_letter_tone` DB column has no UI/type field and stays permanently unmanaged (dropped on read, never set on write) — flagged as intentional, not an oversight.
- 06 Profile Save Logic — `types/index.ts` gained `resumePdfKey`/`isComplete` on `Profile` (previously missing despite existing as DB columns since Feature 04) and a new `ProfileRow` type for the raw DB shape.
- 06 Profile Save Logic — `AuthGuard.tsx` now exposes the signed-in user via `AuthUserContext` + `useAuthUser()` hook (throws if called outside the guard) — added specifically so `ProfilePageClient` can get `user.id` for its fetch, but reusable by any future protected page/feature needing the current user without re-calling `getCurrentUser()` itself. `UserSchema` type imported directly from `@insforge/sdk` (confirmed exported from the main entry point).
- 06 Profile Save Logic — `app/profile/page.tsx` is now a thin Server Component shell; new `components/profile/ProfilePageClient.tsx` owns the real fetch (`insforge.database.from("profiles").select("*").eq("id", user.id).single()`) plus loading/error states. `mockProfile` deleted entirely. Matches the existing `DashboardPage`/`SignedInPanel` split precedent.
- 06 Profile Save Logic — `ProfileForm.tsx` converted every previously-uncontrolled field (`defaultValue`) to one `useState<EditableFields>` object; `skills`/`industries`/`roles` array states kept exactly as-is from Feature 05, merged in only at save time. Real `handleSave` now calls `insforge.database.from("profiles").update(...)`, shows inline saving/error/success states (no toast system exists in this codebase), and fires `profile_completed` via PostHog on the `isComplete` false→true transition only (not "once ever per user" — no persisted flag added, simplest option per user's explicit choice).
- 06 Profile Save Logic — new `lib/utils.ts` with `MATCH_THRESHOLD` (moved here per code-standards.md's existing reference) and `calculateCompletion()`. Required-fields list is **10 items** (Education deliberately split into Highest Degree + Field of Study as two separate checks, deduped to one "Education" tag in the output) — chosen specifically so the math reproduces the design mock's exact 70%-complete/3-missing-tags scenario (7/10 = 70% exactly), per user's explicit choice over a simpler 9-field list that couldn't hit that number.
- 06 Profile Save Logic — **`/review` found 3 issues, all fixed:**
  - **Critical (real Feature 04 regression, not a Feature 06 bug):** `/profile` was throwing a live `PGRST116` ("0 rows") error for a real signed-in user. Root cause traced directly on the backend via `run-raw-sql`: the `handle_new_user()` function existed correctly (confirmed via `pg_proc`), but the trigger that's supposed to fire it `AFTER INSERT ON auth.users` **did not exist** (`pg_trigger` returned 0 rows for it) — despite `architecture.md` stating since Feature 04 that it was "✅ Created" and verified. It silently never ran for any signup. Fixed by recreating the trigger (`CREATE TRIGGER handle_new_user AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user()`) and backfilling the one orphaned real user's `profiles` row (`INSERT ... SELECT ... WHERE p.id IS NULL ON CONFLICT DO NOTHING`). Confirmed via a fresh `auth.users LEFT JOIN profiles` query that zero orphans remain. **Lesson: Feature 04's "verified" claim checked schema/RLS/indexes but never actually tested the trigger by inserting a real row — schema existing and a trigger firing are different facts.**
  - **Important:** fixed the "phantom work experience" bug — `ProfileForm.tsx`'s `roles` state seeds one blank `emptyRole()` for UI editing when a profile has no experience yet, but `handleSave` was writing that placeholder to `work_experience` verbatim if the user saved without filling it in. Fixed by filtering `roles` down to entries with a non-empty `companyName` before building `fullProfile` in `handleSave` — the UI's editable blank card is untouched, only the DB payload is cleaned.
  - **Important:** `code-standards.md`'s Next.js Conventions rule ("Data fetching happens in Server Components — never fetch in Client Components directly") was contradicted by `ProfilePageClient.tsx`/`ProfileForm.tsx` and never updated alongside the other Feature 06 doc corrections. Fixed by appending an explicit, narrow exception for RLS-gated InsForge operations with no server-side client available — not a general license to fetch client-side.

---

## Notes

_Add notes here as the build progresses — workarounds, patterns, anything that differs from the context files._
