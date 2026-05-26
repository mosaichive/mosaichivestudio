# Backend Integration Guide

## Goal

Keep Lovable in charge of frontend generation while Codex owns:

- backend logic
- API behavior
- Supabase schema and policies
- auth wiring
- notification flows
- deployment-safe environment setup

The public UI should remain visually stable while backend capabilities evolve underneath it.

## Repository comparison

### Frontend-owned code in `mosaichivestudio`

These areas are treated as Lovable-owned and should not be restyled during backend work:

- `src/components/` visual sections and motion systems
- `src/pages/` public route composition
- `src/index.css`
- hero, transitions, cursor, ambient background, spacing, typography, and responsive layout

### Backend-owned code imported or adapted from `mosai06studio`

The useful backend deltas were:

- safer edge-function request handling in `supabase/functions/send-service-request/index.ts`
- stricter admin-role/admin-invite policy direction
- evidence of a broader generated Supabase type file

### What was intentionally not imported

These items from `mosai06studio` were not adopted because they would either break the current project or were not actually used by the live Lovable UI:

- stale/generated Supabase table types for unrelated tables such as:
  - `contact_messages`
  - `global_settings`
  - `growth_plans`
  - `media_library`
  - `page_content`
  - `portfolio_projects`
  - `pricing_packages`
  - `services`
  - `shop_products`
  - `team_members`
- `// @ts-nocheck` suppressions added to admin pages
- frontend regressions such as removing the cinematic cursor or changing metadata presentation
- Vite config hardcoded with a baked-in Supabase URL and publishable key

## Final backend architecture

### Client-side service layer

- `src/lib/leadNotifications.ts`
  - primary client submission service
  - posts to `/api/notify-lead`
  - falls back to Supabase edge function if email delivery is unavailable

- `src/lib/supabaseFunctionHeaders.ts`
  - reusable helper for attaching a Supabase session bearer token when present
  - keeps function auth wiring isolated from page components

### Server/API layer

- `api/notify-lead.js`
  - primary serverless notification endpoint
  - handles email + SMS fanout
  - uses Gmail/Resend/Africa's Talking/Twilio based on env availability

### Supabase edge-function layer

- `supabase/functions/send-service-request/index.ts`
  - legacy fallback for service-request email delivery
  - now sanitizes user-supplied HTML fields
  - can optionally require authenticated Supabase requests via `SEND_SERVICE_REQUEST_REQUIRE_AUTH`
  - returns safer error messages

### Data/auth layer

- `src/integrations/supabase/client.ts`
  - browser client

- `src/context/AuthContext.tsx`
  - session + roles

- `src/hooks/useStudioContent.ts`
  - React Query + realtime invalidation for CMS data

### Schema/policy layer

- `supabase/migrations/20260526103000_harden_admin_role_and_invite_policies.sql`
  - replaces broad admin `ALL` policies with explicit per-command policies
  - keeps the current schema intact while making access rules clearer

## Environment variables

### Frontend/runtime

- `VITE_SITE_URL`
- `VITE_SUPABASE_PROJECT_ID`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_URL`

### Vercel/serverless

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

### Supabase edge function

- `RESEND_API_KEY`
- `SEND_SERVICE_REQUEST_REQUIRE_AUTH`

Supabase runtime also provides:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

## Lovable safety contract

Lovable can safely continue generating frontend work if these boundaries are respected:

### Lovable-safe

- visual section edits
- copy/layout changes
- motion tweaks in public components
- route composition updates

### Codex/backend-safe

- `api/`
- `supabase/functions/`
- `supabase/migrations/`
- `src/lib/leadNotifications.ts`
- `src/lib/supabaseFunctionHeaders.ts`
- auth/data hooks and providers when needed for backend integration

## Recommended workflow

1. Let Lovable generate or refine UI.
2. Keep backend changes isolated to data, services, functions, and migrations.
3. Re-run build checks after any UI generation that touches imports or forms.
4. Avoid embedding credentials or hardcoded backend fallbacks in frontend config.
5. Treat Supabase migrations as the source of truth for backend structure, not generated type drift alone.
