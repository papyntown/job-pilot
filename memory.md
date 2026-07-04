# Memory — Homepage (Feature 01) image + design polish

Last updated: 2026-07-04

## What was built

Polished the existing homepage to use the real image assets and match `context/designs/landing-page.png`:

- **components/homepage/HomeCtaButtons.tsx** (new) — shared dual CTA ("Get Started" + "Find Your First Match") including the filled play-triangle arrow icon (`PlayArrowIcon`, `text-text-muted`). Single source of truth used by Hero and BottomCta.
- **components/layout/Logo.tsx** — now renders `public/logo.png` full lockup via next/image (`h-8 w-auto`, intrinsic 496×168); replaced the coded gradient-box + inline SVG + text. Shared by Navbar + Footer.
- **components/homepage/Testimonial.tsx** — avatar is `images/user-icon.png` (was "TW" initials).
- **components/homepage/ApplyWithConfidence.tsx** — terminal is `images/agent-log.png` (was a coded dark mockup).
- **components/homepage/Hero.tsx** / **BottomCta.tsx** — now render `<HomeCtaButtons />`; Hero headline ramped to `text-4xl sm:text-5xl md:text-[3.25rem]`.
- **components/layout/Navbar.tsx** — CTA uses `bg-cta-dark`.
- **app/globals.css** — added `--color-cta-dark: #36394a` token.
- Renamed asset `public/images/agnet-log.png` → `agent-log.png`.

## Decisions made

- **Dark CTA color = `--color-cta-dark` #36394a**, sampled from the design's ~#343541 button (not the near-black `bg-overlay-dark` #131316). Given its own semantic token.
- **Homepage uses the `*-preview.png` assets only.** `dashboard-demo.png` and `jobs-lists.png` are reserved for the real Dashboard / Find-Jobs pages (Phase 3/5) — the user explicitly said keep them off the homepage.
- Logo is the full PNG lockup (icon + wordmark), not a coded component.
- Homepage title matches design at ~48px (tablet/desktop); base kept at `text-4xl` so small phones aren't oversized.
- The five project "skills" live in `.claude/skills/` but are NOT registered in Claude Code's runtime (`.claude/skills/`), so they are not slash-invocable — run them manually as workflows.
- Project working agreement (CLAUDE.md `## Interaction`): when a prompt is ambiguous, ask clarifying questions before coding rather than assume.

## Problems solved

- The homepage was never actually erroring — it was built with coded placeholders/mockups _before_ the real assets were added to `public/`. "Down" meant it looked incomplete vs the design, not a runtime break.
- Design values were **measured, not guessed**: used PowerShell `System.Drawing` to sample `landing-page.png` at its ~4× export scale — button fill ~#343541, title em-box → ~48px, arrow = filled play-triangle ~13px in muted gray ~#A8A3AD (→ `text-text-muted`).

## Current state

- Homepage (Feature 01) is complete and design-matched. `tsc --noEmit` clean; page renders `200`; all image assets + next/image optimization serve `200`; `bg-cta-dark` resolves to #36394a in compiled CSS.
- Passed the project `/review` (0 critical / 0 important). All 4 minor findings fixed (dedup, semantic token, mobile title ramp, filename typo).
- **All changes are uncommitted** on branch `master`. No commits made this session. (Session-start git state also had `AGENTS.md` deleted and `CLAUDE.md` modified.)
- A dev server is running on port 3000 (PID 26080 — not started by this session) and hot-reloads the changes.

## Next session starts with

**Feature 02 — Auth** (next unchecked item in `context/progress-tracker.md`): InsForge Google + GitHub OAuth, OAuth callback handler, session middleware protecting `/dashboard` `/profile` `/find-jobs` `/find-jobs/[id]`, redirect to `/dashboard` after login. It's foundational with real decisions (middleware/session strategy, Next.js 16 callback handling) — consider running the `/architect` workflow first.

## Open questions

- Mobile title at ~375px was not visually eyeballed (code is correct, no horizontal overflow) — worth a quick check in a mobile viewport.
- `gh` CLI is not installed, so the GitHub PR review flow is unavailable. Remote is `github.com/papyntown/job-pilot.git`.
- Decide whether to commit the homepage work before starting Auth.
