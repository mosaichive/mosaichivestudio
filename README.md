# Mosaic06 Studio

Premium Vite + React studio site for Mosaic06 Studio, prepared for GitHub-first development and continuous Lovable sync.

## Stack

- Vite
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- shadcn/ui
- Supabase
- Vercel Functions

## Quick start

```sh
npm install
cp .env.example .env
npm run dev
```

The default dev server is Vite on `http://localhost:5173`.

## Environment variables

Client/runtime variables:

- `VITE_SITE_URL`
- `VITE_SUPABASE_PROJECT_ID`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_URL`

Server-side notification variables:

- `LEAD_EMAIL_TO`
- `LEAD_SMS_TO`
- `GMAIL_USER`
- `GMAIL_APP_PASSWORD`
- `GMAIL_FROM_EMAIL`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `AFRICASTALKING_USERNAME`
- `AFRICASTALKING_API_KEY`
- `AFRICASTALKING_ENVIRONMENT`
- `AFRICASTALKING_SENDER_ID`
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_FROM_NUMBER`
- `TWILIO_MESSAGING_SERVICE_SID`
- `SEND_SERVICE_REQUEST_REQUIRE_AUTH`

Important:

- Keep real secrets in Lovable, Vercel, or your local shell only.
- Do not commit `.env`, `.env.local`, or `.env.production`.
- `.env.example` is the only tracked env template.

## Project structure

- `src/` app code
- `src/components/` public UI, motion systems, CMS-driven sections
- `src/pages/` route pages, plus `/admin` screens
- `src/hooks/` shared data, SEO, and animation hooks
- `src/integrations/supabase/` browser client and generated types
- `api/` Vercel serverless endpoints
- `supabase/` migrations and edge function source
- `scripts/prerender.mjs` static prerender pipeline for public routes

See [PROJECT_CONTEXT.md](/Users/mosaic/Documents/Codex/2026-04-21-files-mentioned-by-the-user-mosaichive/mosaichive-main/PROJECT_CONTEXT.md) for the detailed architecture map.
See [docs/BACKEND_INTEGRATION.md](/Users/mosaic/Documents/Codex/2026-04-21-files-mentioned-by-the-user-mosaichive/mosaichive-main/docs/BACKEND_INTEGRATION.md) for the backend/frontend ownership contract and integration details.

## Lovable workflow

This repository is set up to stay compatible with Lovable while remaining editable locally.

- `playwright.config.ts` and `playwright-fixture.ts` are included for Lovable agent compatibility.
- Keep `main` deployable at all times.
- Sync flow:
  1. Pull the latest `main`.
  2. Make local changes and commit them normally.
  3. Push to GitHub.
  4. Let Lovable continue from the same repository.
  5. Pull Lovable-authored commits back before the next round of local work.

Recommended guardrails:

- Use environment-variable UIs for secrets, not git.
- Keep Supabase schema changes in `supabase/migrations/`.
- Keep reusable motion/background systems in shared components instead of page-only copies.

## Deployment

The project is ready for Vercel deployment.

- `vercel.json` rewrites all app routes to `index.html`.
- `api/notify-lead.js` handles form notifications.
- `api/sitemap.js` builds the sitemap at request time.
- `scripts/prerender.mjs` emits static HTML for public routes after `vite build`.

If `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` are missing during build, prerendering still succeeds but skips CMS-driven project route expansion.

## Supabase

Supabase powers:

- admin authentication and roles
- CMS content tables
- realtime updates for projects, testimonials, logos, and settings
- storage-backed media uploads

Apply the latest migrations before using the admin CMS on a fresh project, especially:

- `supabase/migrations/20260419114809_61973c78-711e-442d-b056-a18e23c09848.sql`
- `supabase/migrations/20260421110000_extend_site_settings_cms.sql`

## Notifications

Public forms submit to `/api/notify-lead`.

- Gmail SMTP is attempted first when configured.
- Resend is the email fallback.
- Africa's Talking is the primary SMS provider.
- Twilio is the SMS fallback.
- If server-side providers are absent, the app can still fall back to the Supabase `send-service-request` function path already used in the original project.
