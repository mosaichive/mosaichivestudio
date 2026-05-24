# PROJECT_CONTEXT

## Overview

Mosaic06 Studio is a Vite + React + Supabase studio website with:

- a cinematic public-facing marketing site
- a Supabase-backed admin CMS
- serverless lead notification endpoints
- prerendered public pages for SEO and faster first paint

The codebase is structured so public brand experience, CMS content management, and deployment concerns stay separated.

## Architecture

### Frontend shell

- `src/main.tsx` boots the React app.
- `src/App.tsx` defines the full route tree.
- `src/components/PageTransition.tsx` wraps public pages with the ambient background, cursor, and route transitions.
- `src/context/AuthContext.tsx` manages Supabase auth session state and role loading.

### Public experience layer

Key shared systems:

- `src/components/AmbientBackground.tsx`
- `src/components/SiteDecorativeElements.tsx`
- `src/components/CinematicCursor.tsx`
- `src/components/ScrollAnimations.tsx`
- `src/components/Reveal.tsx`
- `src/components/SectionTransition.tsx`

These provide the sitewide cinematic motion, cursor system, layered backgrounds, and reveal timing.

### CMS/data layer

- `src/hooks/useStudioContent.ts` is the primary read/query layer for:
  - `projects`
  - `testimonials`
  - `client_logos`
  - `site_settings`
- React Query handles caching and invalidation.
- Supabase realtime channels invalidate content queries when rows change.

### Backend/services

- `api/notify-lead.js` sends lead notifications through:
  - Gmail SMTP
  - Resend
  - Africa's Talking
  - Twilio
- `api/sitemap.js` generates the XML sitemap dynamically.
- `supabase/functions/send-service-request/index.ts` is the existing Supabase function fallback path from the earlier project setup.

### Build and prerender

- `npm run build` runs:
  1. `vite build`
  2. `node scripts/prerender.mjs`
- `scripts/prerender.mjs` expands public routes into static HTML.
- If Supabase env vars are present, it also pulls published project slugs so case study pages are prerendered.

## Routes

### Public routes

- `/`
- `/services`
- `/services/:serviceId`
- `/about`
- `/portfolio`
- `/portfolio/:slug`
- `/blog`
- `/blog/:slug`
- `/contact`
- `/clients`
- `/team`
- `/get-started`
- `/podcast`
- `/careers`
- `/portfolio-submission`
- `/branding-agency-accra`
- `/web-design-ghana`
- `/creative-agency-ghana`
- `*` -> `NotFound`

### Auth/admin routes

- `/auth`
- `/admin`
- `/admin/projects`
- `/admin/projects/:id`
- `/admin/testimonials`
- `/admin/logos`
- `/admin/settings`
- `/admin/invites`

## Core page components

### Homepage stack

`src/pages/Home.tsx` composes:

- `Navbar`
- `Hero`
- `FeaturedWork`
- `StudioIntro`
- `WhyChooseUs`
- `TrustLogos`
- `Testimonials`
- `ConversionCTA`
- `Footer`

with `SectionTransition` and `ScrollAnimations` tying the sections together.

### Project showcase

- `FeaturedWork.tsx` powers the homepage selected-work rail
- `ProjectShowcaseCard.tsx` is the cinematic project card system
- `PortfolioGrid.tsx` is used on the portfolio index
- `CaseStudyPage.tsx` renders individual project pages from Supabase

### Services experience

- `ServicesPage.tsx`
- `Services.tsx`
- `ServicesGrid.tsx`
- `ServicesDetail.tsx`

These now use interactive motion cards and expandable content.

### Social proof

- `Testimonials.tsx`
- `TestimonialCard.tsx`
- `TrustLogos.tsx`

### Admin components/pages

Admin editing is centered around:

- `src/pages/admin/AdminLayout.tsx`
- `AdminProjects.tsx`
- `AdminProjectEditor.tsx`
- `AdminTestimonials.tsx`
- `AdminLogos.tsx`
- `AdminSettings.tsx`
- `AdminInvites.tsx`

## Supabase schema and services

The main migration creates:

- `profiles`
- `user_roles`
- `admin_invites`
- `projects`
- `testimonials`
- `client_logos`
- `site_settings`

Role model:

- first signed-up user is auto-promoted to admin
- later admins/editors are granted via `admin_invites`

Realtime-enabled frontend queries:

- projects
- testimonials
- client logos
- site settings

## Environment variables

### Required for full runtime

- `VITE_SITE_URL`
- `VITE_SUPABASE_PROJECT_ID`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_URL`

### Optional, but required for live form delivery

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

### Portability note

This repository is intentionally cleaned so no production env file is tracked. Use `.env.example` as the safe template.

## Deployment flow

### Local

1. `npm install`
2. `cp .env.example .env`
3. fill env values
4. `npm run dev`

### Production

1. push to GitHub
2. Vercel builds with `npm run build`
3. Vite outputs the SPA bundle
4. `scripts/prerender.mjs` emits static HTML per public route
5. Vercel serves:
   - prerendered HTML
   - React SPA hydration
   - serverless APIs from `api/`

### Supabase deployment

1. apply migrations from `supabase/migrations/`
2. deploy/update edge functions if needed
3. configure storage policies for studio assets

## Lovable sync guidance

To keep GitHub and Lovable aligned:

- treat this repository as the single source of truth
- keep secrets out of git and inside Lovable/Vercel env settings
- keep CMS schema changes in tracked migrations
- prefer additive component changes over in-place ad hoc duplication
- pull Lovable-authored commits before starting a local edit cycle

Compatibility helpers included for Lovable:

- `playwright.config.ts`
- `playwright-fixture.ts`
