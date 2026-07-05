# Memory — PostHog Initialization (Feature 03) complete

Last updated: 2026-07-05

## What was built

Fixed and completed Feature 03 (PostHog Initialization), then reviewed and closed the gaps found:

- **.env.local** — renamed `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` → `NEXT_PUBLIC_POSTHOG_KEY` (fixed the root cause of the "no apiKey provided" console error).
- **components/PostHogProvider.tsx** — `ui_host` corrected `eu.posthog.com` → `us.posthog.com`; now imports the shared `posthog` instance from `@/lib/posthog-client` instead of `posthog-js` directly.
- **lib/posthog-client.ts** — removed dead `initPostHog()` (never called anywhere); file now just re-exports the shared `posthog` client instance, which is the project's single source of truth for it.
- **components/auth/AuthGuard.tsx** — added `posthog.identify(data.user.id, { email: data.user.email })` once a session is confirmed authed.
- **components/auth/SignedInPanel.tsx** — added `posthog.reset()` on sign out, before redirecting to `/login`.
- **app/(auth)/login/page.tsx** — removed undocumented `sign_in_started` / `sign_in_failed` `posthog.capture()` calls (not on the project's fixed 4-event list) and the now-unused `posthog-js` import.
- **context/progress-tracker.md** — checked off `03 PostHog Initialization`, moved `Next` to `04 Database Schema`, and logged all of the above as a new decision entry.

## Decisions made

- PostHog project is **US region** — `ui_host` must be `us.posthog.com` everywhere (matches `NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com`).
- `lib/posthog-client.ts` is the canonical place to import the shared `posthog` instance from (`@/lib/posthog-client`), not `posthog-js` directly — mirrors how `lib/insforge-client.ts` is used for InsForge.
- The project's PostHog event list is locked to exactly 4 events (`job_search_started`, `job_found`, `profile_completed`, `company_researched`) per `code-standards.md`. Any new event idea must be added to that list first before being fired — don't add ad hoc events (this is why `sign_in_started`/`sign_in_failed` were removed rather than kept).

## Problems solved

- Root cause of the PostHog console error was a var name mismatch between `.env.local` and the code (not a bad key). Confirmed by reading all three PostHog-related files, which already expected `NEXT_PUBLIC_POSTHOG_KEY`.
- Ran `/review` against `build-plan.md` Feature 03 spec + `code-standards.md`/`library-docs.md` PostHog rules and found real gaps beyond the original bug: missing `identify()`/`reset()` calls, an undocumented-event violation, and dead code. All fixed in the same session per user's "fix" instruction.
- `npx tsc --noEmit` is clean after all changes.

## Current state

- Feature 03 (PostHog Initialization) is now genuinely complete: client init works, `identify`/`reset` wired into the real auth flow, no rule violations, no dead code, tracker updated.
- **All changes are uncommitted** — no commits made this session.
- Dev server needs a restart to pick up the env var + import changes (env vars aren't hot-reloaded).

## Next session starts with

**Feature 04 — Database Schema** (next unchecked item in `context/progress-tracker.md`): create `profiles`, `agent_runs`, `jobs`, `agent_logs` tables + `resumes` storage bucket with RLS scoped to `user_id`. **Before writing any code**, fetch the real InsForge server-side/DB/storage patterns via the InsForge MCP (`fetch-docs` → `db-sdk`, `storage-sdk`) — `architecture.md` and `library-docs.md` both flag their current server-side sections as 🚧 unverified placeholders written against the wrong SDK (`@insforge/ssr`, which doesn't exist; real one is `@insforge/sdk`).

## Open questions

- None outstanding on PostHog — all review findings were resolved this session.
- Whether to commit the Auth + PostHog work before starting Feature 04 has not been decided.
