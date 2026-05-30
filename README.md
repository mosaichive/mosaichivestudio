# Mosaichive

Independent Vite + React site for Mosaic06 Studio.

## Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- shadcn/ui
- Supabase
- Vercel

## Local development

```sh
npm install
cp .env.example .env
npm run dev
```

The default dev server is Vite on `http://localhost:5173`.

## Environment variables

Client/runtime:

- `VITE_SITE_URL`
- `VITE_SUPABASE_PROJECT_ID`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_URL`

Notifications and server-side delivery:

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

Keep real secrets in Vercel, Supabase, or your local shell only. Do not commit `.env` files.

## Project structure

- `src/` application code
- `src/components/` shared UI and motion systems
- `src/pages/` route pages and admin screens
- `src/hooks/` shared data and utility hooks
- `src/integrations/supabase/` browser client and generated types
- `api/` Vercel serverless endpoints
- `supabase/` migrations and edge functions
- `scripts/prerender.mjs` public-route prerender script

## Deployment

The project is ready for Vercel deployment.

- `vercel.json` rewrites app routes to `index.html`
- `api/notify-lead.js` handles form notifications
- `api/sitemap.js` builds the sitemap dynamically
- `scripts/prerender.mjs` emits static HTML for public routes after `vite build`

If `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` are missing during build, prerendering still succeeds but skips CMS-driven project route expansion.

## Supabase

Supabase is used for:

- admin authentication and roles
- CMS content tables
- realtime updates for projects, testimonials, logos, and settings
- storage-backed media uploads

Apply the latest migrations before using the admin CMS on a fresh project, especially:

- `supabase/migrations/20260419114809_61973c78-711e-442d-b056-a18e23c09848.sql`
- `supabase/migrations/20260421110000_extend_site_settings_cms.sql`

## Notifications

Public forms submit to `/api/notify-lead`.

- Gmail SMTP is attempted first when configured
- Resend is the email fallback
- Africa's Talking is the primary SMS provider
- Twilio is the SMS fallback
- If server-side providers are absent, the app can still fall back to the Supabase `send-service-request` function
