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

Copy `.env.example` to `.env` for local work.

## Deployment

This project is ready for Vercel deployment.

- `vercel.json` rewrites all routes to `index.html` so React Router pages work on refresh.
- Canonical and Open Graph URLs are derived from `VITE_SITE_URL` when available.
- The Lovable-specific dev plugin and hosted scripts have been removed.

## Supabase

Supabase is used for:

- site content
- admin authentication
- project submissions / service requests

The `supabase/` directory includes migrations and the `send-service-request` edge function export from the original project.
