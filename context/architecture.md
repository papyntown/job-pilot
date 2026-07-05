# Architecture

## Stack

| Layer                          | Tool                     | Purpose                                          |
| ------------------------------ | ------------------------ | ------------------------------------------------ |
| Framework                      | Next.js 16 (App Router)  | Full stack framework                             |
| Auth + DB + Storage + Realtime | InsForge                 | Entire backend                                   |
| Cloud browser                  | Browserbase              | Company research — browsing company public pages |
| AI browser control             | Stagehand                | Company page interaction and content extraction  |
| Job Discovery                  | Adzuna API               | Job search and discovery                         |
| AI model                       | OpenAI GPT-4o            | Matching, research synthesis, extraction         |
| Analytics                      | PostHog                  | Event tracking and dashboard charts              |
| PDF generation                 | @react-pdf/renderer      | Resume PDF rendering                             |
| Styling                        | Tailwind CSS + shadcn/ui | UI components and styling                        |
| Language                       | TypeScript strict        | Throughout                                       |

---

## Folder Structure

```
/
├── AGENTS.md
├── context/
│   ├── project-overview.md
│   ├── architecture.md
│   ├── ui-tokens.md
│   ├── ui-rules.md
│   ├── ui-registry.md
│   ├── code-standards.md
│   ├── library-docs.md
│   ├── build-plan.md
│   └── progress-tracker.md
├── app/
│   ├── layout.tsx                          → Root layout, PostHog provider
│   ├── page.tsx                            → Homepage
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx                   → Login page
│   │   └── callback/
│   │       └── page.tsx                   → OAuth callback handler
│   ├── dashboard/
│   │   └── page.tsx                       → Main dashboard
│   ├── profile/
│   │   └── page.tsx                       → Profile form + resume management
│   ├── find-jobs/
│   │   ├── page.tsx                       → Find Jobs page — search controls + jobs list
│   │   └── [id]/
│   │       └── page.tsx                   → Individual job details page
│   └── api/
│       ├── agent/
│       │   ├── find/route.ts              → Trigger Adzuna job discovery
│       │   └── research/route.ts          → Trigger company research agent
│       ├── resume/
│       │   ├── generate/route.ts          → Generate base resume PDF from profile
│       │   └── extract/route.ts           → Extract profile data from uploaded resume PDF
├── agent/
│   ├── adzuna.ts                          → Adzuna API job discovery + GPT-4o scoring
│   ├── research.ts                        → Company research — Browserbase + Stagehand + GPT-4o
│   ├── matcher.ts                         → GPT-4o job matching logic
│   ├── extractor.ts                       → GPT-4o job description extraction + structuring
│   └── types.ts                           → Agent-specific TypeScript types
├── actions/
│   ├── profile.ts                         → Profile save + update
│   └── jobs.ts                            → Job status updates
├── components/
│   ├── ui/                                → shadcn/ui components only
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── homepage/
│   │   ├── Hero.tsx
│   │   ├── HowItWorks.tsx
│   │   └── Features.tsx
│   ├── dashboard/
│   │   ├── StatsBar.tsx
│   │   ├── RecentActivity.tsx
│   │   └── AnalyticsCharts.tsx
│   ├── profile/
│   │   ├── ProfileForm.tsx
│   │   ├── ResumeUpload.tsx
│   │   ├── ResumePreview.tsx
│   │   └── CompletionIndicator.tsx
│   ├── find-jobs/
│   │   ├── SearchControls.tsx
│   │   ├── JobsTable.tsx
│   │   ├── JobFilters.tsx
│   │   └── JobsPagination.tsx
│   └── job-details/
│       ├── JobInfo.tsx
│       ├── MatchScore.tsx
│       ├── JobDescription.tsx
│       ├── CompanyResearch.tsx
│       └── JobActions.tsx
├── lib/
│   ├── insforge-client.ts                 → InsForge browser client instance
│   ├── insforge-server.ts                 → InsForge server client
│   ├── browserbase.ts                     → Browserbase session creation + management
│   ├── stagehand.ts                       → Stagehand initialisation with Browserbase session
│   ├── adzuna.ts                          → Adzuna API client
│   ├── posthog-client.ts                  → PostHog browser client
│   ├── posthog-server.ts                  → PostHog server client
│   └── utils.ts                           → Shared utility functions
└── types/
    └── index.ts                           → Global TypeScript types
```

---

## System Boundaries

| Folder        | Owns                                                                                                   |
| ------------- | ------------------------------------------------------------------------------------------------------ |
| `app/`        | Pages and API routes only. No business logic.                                                          |
| `agent/`      | All agent logic. Adzuna discovery, company research, matching, extraction. Nothing here touches React. |
| `actions/`    | Reserved for future Server Actions that need server-only secrets. Currently unused — profile save (Feature 06) writes via the client-side InsForge SDK directly from `components/`, not a Server Action. See InsForge Client Pattern below. |
| `components/` | UI only. No API-route logic. Client components performing RLS-gated DB reads/writes (e.g. profile save) call `insforge.database`/`insforge.storage` directly — see InsForge Client Pattern below. |
| `lib/`        | Third party client initialisation, shared utilities, and data-shape mapping helpers (e.g. DB row ↔ app type converters, no React, no side effects). |
| `types/`      | TypeScript types shared across the project.                                                            |

---

## Data Flow

### UI Mutations (Server Actions)

Reserved for future mutations that genuinely need server-only secrets. Not currently used by any
built feature.

```
User interaction in component
        ↓
Server Action in actions/
        ↓
InsForge DB write
        ↓
Revalidate or redirect
```

### Profile Mutations (Client SDK)

> ✅ **Feature 06.** Profile save does not use a Server Action — see InsForge Client Pattern below
> for why (no public API exists to forward the signed-in user's session to server-side code).

```
User interaction in ProfileForm ("use client")
        ↓
insforge.database.from("profiles").update() — client-side, RLS resolves via the
        shared browser singleton's own live session
        ↓
Local React state updated directly — no revalidatePath (no Server Component
        involved in the read path; ProfilePageClient re-fetches or updates state itself)
```

### Agent Operations (API Routes)

```
User clicks Find Jobs
        ↓
API route in app/api/agent/find
        ↓
Calls agent/adzuna.ts
        ↓
Adzuna API returns job listings
        ↓
GPT-4o scores each job against user profile
        ↓
Agent writes results to InsForge DB
        ↓
Page data revalidated
```

### Company Research (API Routes)

```
User clicks Research Company on job details page
        ↓
API route in app/api/agent/research
        ↓
Calls agent/research.ts
        ↓
Single Browserbase session opens with Stagehand
        ↓
Navigates to company homepage + sub pages
        ↓
GPT-4o synthesizes dossier from extracted content
        ↓
Dossier saved to jobs.company_research
        ↓
Page data revalidated
```

### Resume Operations (API Routes)

```
User uploads resume or clicks Generate
        ↓
API route in app/api/resume/
        ↓
GPT-4o processes content
        ↓
@react-pdf/renderer renders PDF buffer
        ↓
New PDF uploaded to InsForge Storage
        ↓
URL saved to profiles table
```

---

## InsForge Database Schema

> ✅ **Created 2026-07-05 (Feature 04).** All four tables below plus the `resumes` bucket exist on the real backend. Created directly via the InsForge MCP `run-raw-sql` tool (admin DDL) — schema management goes through MCP tools, never the SDK.

### `profiles`

| Column                 | Type        | Notes                                                                                                                                            |
| ---------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| id                     | uuid        | PK, references `auth.users(id)` on delete cascade                                                                                                 |
| full_name              | text        |                                                                                                                                                    |
| email                  | text        | Pre-filled from auth                                                                                                                               |
| phone                  | text        |                                                                                                                                                    |
| location               | text        | City, country                                                                                                                                     |
| current_title          | text        | Most recent job title                                                                                                                             |
| experience_level       | text        | junior / mid / senior / lead                                                                                                                      |
| years_experience       | integer     |                                                                                                                                                    |
| skills                 | text[]      | Array of skill tags                                                                                                                                |
| industries             | text[]      | Industries worked in                                                                                                                              |
| work_experience        | jsonb       | Array of up to 3 roles                                                                                                                            |
| education              | jsonb       | Degree, field, institution, year                                                                                                                  |
| job_titles_seeking     | text[]      | Roles they want                                                                                                                                    |
| remote_preference      | text        | remote / onsite / hybrid / any                                                                                                                    |
| preferred_locations    | text[]      | Optional preferred locations                                                                                                                       |
| salary_expectation     | text        | Optional                                                                                                                                           |
| cover_letter_tone      | text        | formal / casual / enthusiastic                                                                                                                     |
| linkedin_url           | text        |                                                                                                                                                    |
| portfolio_url          | text        |                                                                                                                                                    |
| work_authorization     | text        | citizen / permanent_resident / visa_required                                                                                                       |
| resume_pdf_url         | text        | InsForge Storage URL of current resume                                                                                                             |
| resume_pdf_key         | text        | 🆕 Not in original spec. Storage object key — the real `upload()` auto-renames on key collision, so the URL alone can't be used to `download()`/`remove()` the file later; must save both |
| completion_percentage  | integer     | 🆕 Not in original spec. Added because build-plan Feature 06 requires it "calculated and saved", and Feature 05's UI reads it back on load. Default `0` |
| missing_fields         | text[]      | 🆕 Not in original spec. Same reasoning — missing field tags for the profile banner                                                                |
| is_complete            | boolean     | True when all required fields filled. Default `false`                                                                                              |
| created_at             | timestamptz | Default `now()`                                                                                                                                    |
| updated_at             | timestamptz | Default `now()` — Server Actions set this explicitly on update, no DB trigger                                                                       |

A `SECURITY DEFINER` trigger (`handle_new_user()` fired `AFTER INSERT ON auth.users`) auto-creates a blank `profiles` row (`id`, `email`) the moment a user signs up — Feature 06 always finds an existing row to update, never needs to insert one.

> 🔧 **Regression found and fixed 2026-07-05 (Feature 06).** The trigger was previously marked "✅ Created" in Feature 04, but the function existed while the trigger binding it to `auth.users` did not (confirmed empty in `pg_trigger`) — it silently never fired for any real signup. Recreated the trigger and backfilled the one orphaned user's `profiles` row directly via the InsForge MCP. If a signed-in user ever hits a "0 rows" error reading their own `profiles` row again, check `pg_trigger` for this trigger first before assuming it's an RLS or client-code bug.

### `agent_runs`

| Column             | Type        | Notes                                            |
| ------------------ | ----------- | ------------------------------------------------- |
| id                 | uuid        | PK, default `gen_random_uuid()`                    |
| user_id            | uuid        | References `profiles(id)` on delete cascade         |
| status             | text        | running / completed / failed. Default `'running'`   |
| job_title_searched | text        |                                                    |
| location_searched  | text        |                                                    |
| jobs_found         | integer     | Total jobs discovered. Default `0`                  |
| started_at         | timestamptz | Default `now()`                                     |
| completed_at       | timestamptz |                                                    |

### `jobs`

| Column             | Type        | Notes                                          |
| ------------------ | ----------- | ---------------------------------------------- |
| id                 | uuid        | PK, default `gen_random_uuid()`                |
| run_id             | uuid        | References `agent_runs(id)` on delete set null — null if from URL input |
| user_id            | uuid        | References `profiles(id)` on delete cascade    |
| source             | text        | search / url — no DB constraint, enforced in app code |
| source_url         | text        | Original job listing URL                       |
| external_apply_url | text        | Direct company apply URL                       |
| title              | text        |                                                |
| company            | text        |                                                |
| location           | text        |                                                |
| salary             | text        | If available                                   |
| job_type           | text        | fulltime / parttime / contract                 |
| about_role         | text        | 2-3 sentence summary                           |
| responsibilities   | text[]      | Bullet points                                  |
| requirements       | text[]      | Bullet points                                  |
| nice_to_have       | text[]      | Optional                                       |
| benefits           | text[]      | Optional                                       |
| about_company      | text        | Brief company description                      |
| match_score        | integer     | 0-100 scored against main profile              |
| match_reason       | text        | GPT-4o explanation                             |
| matched_skills     | text[]      | Skills user has that match                     |
| missing_skills     | text[]      | Skills user lacks                              |
| company_research   | jsonb       | Company dossier from research agent            |
| found_at           | timestamptz | Default `now()`                                |

### `agent_logs`

| Column     | Type        | Notes                                                     |
| ---------- | ----------- | ------------------------------------------------------------ |
| id         | uuid        | PK, default `gen_random_uuid()`                                |
| run_id     | uuid        | References `agent_runs(id)` on delete cascade                  |
| user_id    | uuid        | References `profiles(id)` on delete cascade                    |
| message    | text        | Human readable log entry                                       |
| level      | text        | info / success / warning / error. Default `'info'`               |
| job_id     | uuid        | Optional — references `jobs(id)` on delete set null              |
| created_at | timestamptz | Default `now()`                                                |

Indexes: `user_id` on `agent_runs`/`jobs`/`agent_logs`, `run_id` on `jobs`/`agent_logs`, `found_at` and `match_score` (descending) on `jobs` — covers the Feature 11 filter/sort/pagination queries and Feature 15/16 dashboard queries.

### Row Level Security

Every table has RLS enabled with one `FOR ALL` owner policy, e.g.:

```sql
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
CREATE POLICY jobs_owner ON public.jobs
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
```

`auth.uid()` is a real InsForge SQL function (`SELECT nullif(auth.jwt() ->> 'sub', '')::uuid`) — same Supabase-style convention, reads the `sub` claim off the caller's JWT. `profiles` policy uses `auth.uid() = id` (its PK is the user id itself); the other three use `auth.uid() = user_id`.

> ✅ **Resolved 2026-07-05 (Feature 06).** Read the real `@insforge/sdk` source directly: there is no public API to extract the current access token from a live client instance (`getCurrentUser()` never returns one; the SDK's `TokenManager` holding the live token is a private field, never exposed). Server-side token forwarding is therefore not viable without adopting the separate `@insforge/sdk/ssr` cookie-based subpath, which this project's auth flow doesn't use. **Confirmed approach: RLS-gated profile reads/writes happen client-side**, through the shared browser `insforge` singleton (`lib/insforge-client.ts`) called directly from `"use client"` components — it already carries its own live session for every request it makes, so no manual token attachment is needed. No Server Action is used for profile save.

---

## InsForge Storage

> ✅ **Created 2026-07-05 (Feature 04).** Bucket exists: `create-bucket(bucketName: "resumes", isPublic: false)`.

| Bucket  | Path                         | Contents                  |
| ------- | ---------------------------- | ------------------------- |
| resumes | resumes/{user_id}/resume.pdf | Current active resume PDF |

Access: private bucket, authentication required. There is no `storage.objects` RLS layer to write — InsForge enforces this at the app layer off the bucket's `public` flag, confirmed by inspecting `pg_policies` (empty) and `storage.buckets` (plain `public` boolean column) directly on the backend.

> 🚧 **Still open — deferred to Feature 08 (resume upload was out of scope for Feature 06).** The real `upload()` signature is `upload(path, file)` — no `upsert` option exists (the docs warn it auto-renames on key collision instead). `library-docs.md`'s current storage example still shows `upsert: true`, which isn't a real parameter — must be corrected before resume upload logic is built.

---

## Authentication

> ⚠️ **Corrected 2026-07-04 (Feature 02).** Implemented on the real `@insforge/sdk` (client-side), not the nonexistent `@insforge/ssr`. Route protection is a **client-side guard**, not middleware.

- Provider: InsForge Auth (`@insforge/sdk`)
- Methods: Google OAuth, GitHub OAuth (both client-side via `signInWithOAuth`)
- Protected routes: /dashboard, /profile, /find-jobs, /find-jobs/[id]
- Public routes: /, /login
- Protection: `components/auth/AuthGuard.tsx` — a client component that calls `insforge.auth.getCurrentUser()` on mount and redirects to `/login` when there is no user. Wrap each protected page's content in `<AuthGuard>`. **No `middleware.ts`.**
- OAuth callback: no dedicated route — `redirectTo` points at `/dashboard`, and the SDK auto-exchanges the `insforge_code` on load
- On login → redirect to /dashboard
- `redirectTo` URLs must be whitelisted in the InsForge dashboard (Auth Methods → allowed redirect URLs)

---

## InsForge Client Pattern

> ⚠️ **Corrected 2026-07-04 (Feature 02).** The real SDK is **`@insforge/sdk`** with `createClient({ baseUrl, anonKey })`. The `@insforge/ssr` `createBrowserClient` / `createServerClient` cookie pattern below did not exist and has been removed. A verified server-side pattern will be added when Features 04+ are built (fetch via InsForge MCP `db-sdk` / `storage-sdk` first).

```typescript
// lib/insforge-client.ts — single shared client
import { createClient } from "@insforge/sdk";

export const insforge = createClient({
  baseUrl: process.env.NEXT_PUBLIC_INSFORGE_URL!,
  anonKey: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!,
});
```

**DB queries go through `insforge.database.from(...)`, not `insforge.from(...)`.** The real SDK namespaces database operations under `.database` — every example previously in this file and in `library-docs.md` was missing that namespace and would fail. Corrected pattern:

```typescript
const { data, error } = await insforge.database
  .from("jobs")
  .select("*")
  .eq("user_id", user.id)
  .order("found_at", { ascending: false });
```

**Server-side InsForge access — resolved 2026-07-05 (Feature 06): there is no server-side InsForge client, and none is needed.** `createInsforgeServer()` does not exist and must never be reintroduced. Reading the real `@insforge/sdk` source confirmed no public API exposes the live session/access token from a client instance (the token lives only in a private `TokenManager` field) — so a Server Action or API route has no way to authenticate an InsForge call as the signed-in user. The confirmed pattern: **all RLS-gated profile reads/writes happen client-side**, through the shared browser `insforge` singleton called directly from `"use client"` components (see `components/profile/ProfileForm.tsx` and `components/profile/ProfilePageClient.tsx`). The singleton already attaches its own live session to every request — no manual attachment step exists or is needed. Server Actions remain reserved for any future case that genuinely needs a server-only secret (none currently exist for profile).

---

## Browserbase Session Pattern

```typescript
// Company research session — single session, sequential page visits
const session = await bb.sessions.create({
  projectId: process.env.BROWSERBASE_PROJECT_ID!,
  timeout: 120, // 2 minute session — visits 3-4 pages max
});
```

---

## Job Discovery Pattern

**Adzuna API — job search**

```typescript
const response = await fetch(
  `https://api.adzuna.com/v1/api/jobs/us/search/1?` +
    `app_id=${process.env.ADZUNA_APP_ID}&` +
    `app_key=${process.env.ADZUNA_APP_KEY}&` +
    `what=${encodeURIComponent(jobTitle)}&` +
    `where=${encodeURIComponent(location)}&` +
    `category=it-jobs&` +
    `results_per_page=10&` +
    `content-type=application/json`,
);
const data = await response.json();
// data.results — array of job listings
// Each job: title, company.display_name, location.display_name,
//           salary_min, salary_max, description, redirect_url, created
```

---

## Company Research Pattern

```typescript
// Single session — visits company homepage and sub pages sequentially
const stagehand = new Stagehand({
  env: "BROWSERBASE",
  apiKey: process.env.BROWSERBASE_API_KEY!,
  projectId: process.env.BROWSERBASE_PROJECT_ID!,
  browserbaseSessionID: session.id,
  modelName: "gpt-4o",
  modelClientOptions: { apiKey: process.env.OPENAI_API_KEY! },
});

await stagehand.init();
const page = stagehand.page;

// Clean company name and construct homepage URL
const cleanName = companyName
  .replace(/\s*(Inc\.?|LLC|Ltd\.?|Corp\.?|Co\.?).*$/i, "")
  .trim()
  .toLowerCase()
  .replace(/\s+/g, "");

const homepageUrl = `https://www.${cleanName}.com`;

// Navigate and extract — graceful fallback if page not found
try {
  await page.goto(homepageUrl);
  await page.waitForLoadState("networkidle");
  const content = await stagehand.extract({ instruction: "..." });
} catch (error) {
  // Log and continue — GPT-4o will synthesize from what was found
  await logAgentError(jobId, error);
}

// Always close session when done
await stagehand.close();
```

---

## Invariants

Rules the AI agent must never violate:

- API routes contain no UI logic. Components contain no DB logic.
- Agent code in `/agent` never imports from `/components` or `/actions`.
- Server Actions never call agent functions. Agent functions are only called from API routes.
- There is no server-side InsForge client — `createInsforgeServer()` does not exist and must never be reintroduced. RLS-gated profile reads/writes go through the shared browser `insforge` client called directly from client components (Feature 06).
- No hardcoded hex values or raw Tailwind color classes in components — use CSS variables from ui-tokens.md.
- Every Stagehand action is wrapped in try/catch. Failures are logged to agent_logs, never thrown to crash the run.
- Company research always returns a dossier — even if browser research fails, GPT-4o synthesizes from company name and job description alone. Never return empty.
- Browserbase sessions are always closed with stagehand.close() when done — never leave sessions open.
- Always scope InsForge queries to the current user_id — never query without a user filter.
- Adzuna API always includes category=it-jobs — never search without this filter.
- jobs.source is always 'search' or 'url' — never any other value.
