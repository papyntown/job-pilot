# Memory — Database Schema (Feature 04) complete

Last updated: 2026-07-05

## What was built

Feature 04 — Database Schema, created directly on the live InsForge backend via MCP tools (`run-raw-sql`, `create-bucket`, `get-table-schema`, `list-buckets`) — no application code, schema only:

- **`profiles` table** — all columns from architecture.md plus three additions: `resume_pdf_key` (text), `completion_percentage` (integer, default 0), `missing_fields` (text[]). PK `id` references `auth.users(id) ON DELETE CASCADE`.
- **`agent_runs` table** — `user_id` references `profiles(id) ON DELETE CASCADE`, `status` default `'running'`.
- **`jobs` table** — `run_id` references `agent_runs(id) ON DELETE SET NULL` (nullable), `user_id` references `profiles(id) ON DELETE CASCADE`.
- **`agent_logs` table** — `run_id`/`user_id`/`job_id` FKs, `level` default `'info'`.
- Indexes: `user_id` on `agent_runs`/`jobs`/`agent_logs`; `run_id` on `jobs`/`agent_logs`; `found_at` DESC and `match_score` DESC on `jobs`.
- RLS enabled on all four tables, one `FOR ALL` owner policy each (`auth.uid() = id` on `profiles`, `auth.uid() = user_id` on the rest).
- `handle_new_user()` `SECURITY DEFINER` trigger fires `AFTER INSERT ON auth.users`, auto-creates a blank `profiles` row.
- `resumes` storage bucket created via `create-bucket(isPublic: false)`.
- Updated `context/architecture.md`, `context/library-docs.md`, `context/code-standards.md`, `context/progress-tracker.md` with corrections (see below) and marked Feature 04 complete.

## Decisions made

- **DB SDK namespace correction (major):** real InsForge SDK is `insforge.database.from(...)`, not `insforge.from(...)` — every context file had this wrong since Feature 02. Fixed everywhere.
- **`auth.uid()` / `auth.jwt()` / `auth.role()` are real, working SQL functions** on this backend (Supabase-style convention) — confirmed by introspecting `pg_proc` directly. RLS uses the standard `auth.uid() = user_id` pattern, no InsForge-specific mechanism.
- **Storage `upload()` has no `upsert` param** — real signature is `upload(path, file)` only; auto-renames on key collision instead of overwriting. Must always save both `url` and `key` returned from upload (key needed later for `download()`/`remove()`). `library-docs.md`'s old example showing `upsert: true` was wrong, corrected.
- **User's explicit choices this session:**
  - No DB-level CHECK constraints on enum-shaped columns (`source`, `status`, `level`) — plain `text`, enforced only in app code.
  - `profiles` row is auto-created on signup via DB trigger, not lazily upserted in Feature 06.
  - Kept `jobs.source` modeling both `'search'`/`'url'` (nullable `run_id`) matching architecture.md exactly, even though URL import UI is out of scope for this build.
- **Storage access control is app-layer, not Postgres RLS** — confirmed by querying `pg_policies` (empty) and `storage.buckets` (plain `public` boolean column) directly. `isPublic: false` on `create-bucket` is sufficient; no `storage.objects` RLS to write.
- User instruction (standing preference, not specific to this feature): **always overwrite `memory.md` on `/remember save` without asking for confirmation first.**

## Problems solved

- Resolved the two 🚧 unverified-placeholder flags left over from Feature 02/03 (DB SDK shape, storage SDK shape) by fetching real docs via the InsForge MCP (`fetch-docs`/`fetch-sdk-docs` for `db-sdk`, `storage-sdk`, `auth-sdk`) before writing any SQL, then cross-checked by direct Postgres introspection (`information_schema`, `pg_proc`, `pg_policies`) rather than trusting docs alone.
- Confirmed via `get-backend-metadata` the backend was a completely clean slate (0 tables, 0 buckets) before starting, so no destructive/migration concerns.

## Current state

- All 4 tables + `resumes` bucket exist and verified correct via `get-table-schema`/`list-buckets` (schema, indexes, FKs, RLS policies all confirmed matching what was intended).
- `context/progress-tracker.md` shows Phase 2, last completed = 04 Database Schema, next = 05 Profile Page — Full UI.
- No application code touches these tables yet — that starts at Feature 05 (UI, mock data) and Feature 06 (real save logic).

## Next session starts with

**Feature 05 — Profile Page (Full UI, mock data)** per build-plan.md: profile-needs-attention banner, resume upload area, Profile Information form (Personal/Professional/Work Experience/Education/Job Preferences sections), Save Profile button. No save logic yet — mock data only, per the project's "UI first, verified visually, then wire logic" build principle.

Before Feature 06 (real save logic) can be built, there's an open architectural gap to resolve first (see below).

## Open questions

- 🚧 **Blocks Feature 06.** No documented InsForge service-role/admin key distinct from `anonKey`. Server-side code (Server Actions, API routes, agent functions) needs the signed-in user's access token attached to its `insforge` client call for RLS's `auth.uid()` to resolve. Mechanism not yet verified — fetch `auth-sdk`/`instructions` docs again and resolve this before writing `actions/profile.ts`.
- Whether to commit the accumulated uncommitted work (Auth + PostHog + DB Schema, spanning Features 02–04) is still undecided — nothing has been committed yet this build.
