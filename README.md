# Mosaichive

Independent Vite + React site for Mosaic06 Studio.

## Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase

## Local development

```sh
npm install
npm run dev
```

The app expects the following environment variables:

- `VITE_SITE_URL`
- `VITE_SUPABASE_PROJECT_ID`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_URL`
- `GMAIL_USER`
- `GMAIL_APP_PASSWORD`
- `GMAIL_FROM_EMAIL`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_FROM_NUMBER` or `TWILIO_MESSAGING_SERVICE_SID`
- `LEAD_EMAIL_TO`
- `LEAD_SMS_TO`

Copy `.env.example` to `.env` for local work.

## Deployment

This project is ready for Vercel deployment.

- `vercel.json` rewrites all routes to `index.html` so React Router pages work on refresh.
- `/api/notify-lead` handles public form notifications through Vercel Functions.
- Canonical and Open Graph URLs are derived from `VITE_SITE_URL` when available.
- The Lovable-specific dev plugin and hosted scripts have been removed.

## Lead notifications

Public forms submit to `/api/notify-lead`.

- Email notifications use Gmail SMTP when `GMAIL_USER` and `GMAIL_APP_PASSWORD` are configured, then fall back to Resend.
- The default lead inbox is `mosaichive@gmail.com`.
- SMS notifications use Twilio and default to `0544909011` (`+233544909011`).
- If Vercel notification secrets are not configured yet, the forms attempt the existing Supabase `send-service-request` function as an email fallback.

Set the non-`VITE_` notification variables in Vercel project settings, not in client-side code.

## Supabase

Supabase is used for:

- site content
- admin authentication
- project submissions / service requests

The `supabase/` directory includes migrations and the `send-service-request` edge function export from the original project.
