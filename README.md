# SEOPage — Done-For-You SEO Pages

SEOPage sells **finished SEO pages as a service**: pay **$99** up front, fill
out a detailed brief, and receive a researched, written, human-reviewed page by
email **within 3 hours**. The $29 instant-builder validated that strangers will
pay for a generated page; this iteration tests the real commercial price with
service positioning (researched + reviewed, not instant AI output).

### Primary funnel (pay-first)

```
land (/ or /on-page-seo-services) → pay $99 (Stripe) → /order?session_id=… (brief)
  → confirmation ("inbox within 3 hours") → operator fulfills from /admin
  → "Send delivery email" → buyer downloads via /api/export/[id]
```

Fulfillment is human-driven: run the brief through `/intake` (the legacy
self-serve pipeline, kept as internal tooling), review the result, attach the
generation id to the order in `/admin`, and hit **Send delivery email**.

### Legacy funnel (kept, unlinked)

```
/intake → generate → preview (/preview/[id]) → pay (Stripe) → export (/success)
```

---

## Quick start

```bash
npm install
cp .env.example .env.local   # then add your keys (see below)
npm run dev                  # http://localhost:3000
```

Fill out the intake, watch it generate a real page, preview it, and run the
$29 Stripe test checkout end to end.

---

## Environment variables

All config lives in `.env.local` (gitignored). See `.env.example`.

| Variable | Required | What it's for |
|---|---|---|
| `ANTHROPIC_API_KEY` | **yes** | Powers generation (Claude Opus 4.8). |
| `STRIPE_SECRET_KEY` | for checkout | Creates the Checkout Session. |
| `STRIPE_PUBLISHABLE_KEY` | for checkout | Public Stripe key. |
| `STRIPE_WEBHOOK_SECRET` | optional locally | Verifies webhook events. |
| `NEXT_PUBLIC_BASE_URL` | recommended | Origin for Stripe redirect URLs. |
| `RESEND_API_KEY` | for email | Order confirmation, operator alerts, delivery email (Resend). Without it, emails are skipped and logged. |
| `EMAIL_FROM` | for email | From address, on the Resend-verified domain. |
| `ORDER_ALERT_TO` | for email | Inbox that receives "new paid order" alerts. |

The provider call is isolated in **`lib/generate.ts`** and is the only place
that talks to Anthropic — swap models/providers there. The price is set once in
**`lib/config.ts`** (`PRICE_USD`). The prompts live in **`lib/prompts.ts`** and
are the main lever on output quality.

---

## How it works

- **`POST /api/generate`** creates a generation record and runs the pipeline in
  the background (`after()`), returning an `id` immediately.
- **`GET /api/status/[id]`** is polled by the UI to show real, step-by-step
  progress and detect completion/errors.
- **The pipeline** (`lib/generate.ts`) is two deliberate steps on Claude Opus 4.8:
  1. **Research** → a structured SEO + content strategy (primary/secondary
     keywords, local angle, buyer intent, customer questions, AI-search angle).
  2. **Build** → a single, complete, self-contained, responsive HTML page with
     conversion copy, semantic structure, a title/meta description, and valid
     `schema.org` JSON-LD (LocalBusiness + Service + FAQPage). Streamed.
- **`/preview/[id]`** renders the page (watermarked, non-exportable) plus a
  summary of what was optimized.
- **`POST /api/checkout`** creates a Stripe Checkout Session and redirects to
  hosted checkout. On success the user returns to **`/success`**, which unlocks
  the export — verified two ways for reliability:
  1. the **webhook** (`/api/webhook`) marks the generation paid, and
  2. the success route **also** retrieves the Checkout Session server-side and
     marks it paid (so delivery works even without a webhook configured locally).
- **`GET /api/export/[id]`** serves the clean, watermark-free HTML as a download
  — only when the generation is paid.

### Funnel analytics

Three events are logged (server log + a JSONL file in the temp dir) so you can
read the validation result — see `lib/analytics.ts`:

- `intake_started` — visitor started the intake (try rate)
- `paywall_reached` — generated a page and saw the preview
- `payment_completed` — paid (conversion)

---

## Stripe webhook (local)

The success page already self-verifies, so checkout works without a webhook.
To also exercise the webhook locally:

```bash
stripe login
stripe listen --forward-to localhost:3000/api/webhook
# copy the printed whsec_... into STRIPE_WEBHOOK_SECRET
```

Use Stripe's test card `4242 4242 4242 4242`, any future expiry, any CVC.

---

## Persistence note (MVP)

Generations are stored in `lib/store.ts` — Upstash Redis in production, with an
in-process map mirrored to a temp file as the local fallback (**no database
required** to run). The interface is small and isolated; swap it for Postgres if
you outgrow it.

**Retention:**

- **Paid orders are kept forever** — they're the audit trail of what each
  customer received (the record carries the intake *and* the delivered HTML).
- **Non-converting intakes are kept for 90 days** (full record, including the
  page the visitor was shown), then auto-expire. They're demand data: what
  people typed and what they saw before bouncing.

Every intake is indexed (`seopage:leads`); paid orders are also indexed
(`seopage:paid`) and reverse-indexed by Stripe session (`seopage:session:*`).

---

## Admin / order lookup

`/admin?key=<ADMIN_TOKEN>` is an internal, no-index page to audit orders and
intakes. Set `ADMIN_TOKEN` in the environment (it fails closed if unset). It
lists every intake with its outcome (Paid / Previewed / Building / Error), shows
conversion stats, and looks up a single record by **generation id or Stripe
Checkout Session id** — including the exact page shown and a download of the
delivered file for paid orders. See `app/admin/page.tsx`.

---

## Deploy to Vercel

1. Push to a Git repo and import it into Vercel.
2. Add the env vars from `.env.example` in the Vercel project settings.
   Set `NEXT_PUBLIC_BASE_URL` to your production URL.
3. Add a Stripe webhook endpoint pointing at `https://<your-domain>/api/webhook`
   and put its signing secret in `STRIPE_WEBHOOK_SECRET`.
4. Deploy.

---

## Where to edit things

| I want to change… | Edit |
|---|---|
| The price / delivery promise | `lib/config.ts` (`PRICE_USD`, `DELIVERY_HOURS`) |
| The generation prompts / quality | `lib/prompts.ts` |
| The model / provider | `lib/generate.ts` |
| The homepage copy/design | `app/page.tsx`, `components/*`, `app/globals.css` |
| The money page (on-page SEO services) | `app/on-page-seo-services/page.tsx` |
| The post-payment brief fields | `components/OrderIntakeForm.tsx`, `app/api/order/route.ts`, `lib/types.ts` (`Order`) |
| The legacy self-serve intake | `components/IntakeForm.tsx` |
| Email templates (confirmation / alert / delivery) | `lib/email.ts` |
| Rate limits | `lib/ratelimit.ts` |
| Persistence backend / retention | `lib/store.ts` |
| Admin queue / fulfillment | `app/admin/page.tsx`, `app/api/admin/order/route.ts`, `lib/admin.ts` |
| SEO/GEO files | `app/robots.ts`, `app/sitemap.ts`, `public/llms.txt`, `app/opengraph-image.tsx` |
| Analytics backend | `lib/analytics.ts` |
