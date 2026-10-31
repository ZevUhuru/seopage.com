# The homepage

How seopage.com's homepage is built, the trade-offs we accepted when it shipped, and what to
revisit. Update this file whenever the homepage changes.

*Live since 2026-10-31 (seopage.com #55). Picked as S4 · Story in `/prototypes/app-showcase`.*

## What it is

The homepage shows the app to the owner of a local service business (HVAC, plumbing, roofing) and
answers their questions in the order they ask them:

| # | Section | The owner's question | Picture |
|---|---|---|---|
| 1 | Hero | — | The app's Overview |
| 2 | Calls | Is search sending you calls? | Overview: clicks, calls, position |
| 3 | Coverage | Do you show up in every town you cover? | The service × town grid |
| 4 | What's next | What should your next page be? | Opportunities, plus a cost search and the season ahead |
| 5 | You decide | Nothing goes live without your yes. | The builder on Versions |
| 6 | Identity | Does Google know everything you do? | Identity, then the free audit |
| 7 | A month | How a month works (navy strip) | — |
| 8–10 | Offer, FAQ, close | The owner's objections lead the FAQ | — |

A trade switch above section 2 (`?trade=hvac|plumbing|roofing`, HVAC by default) changes every
example and picture, the hero included. The canonical stays `/`.

**Where the code lives**

- `app/page.tsx`: the route, metadata and JSON-LD.
- `components/oat/story.tsx`: the page.
- `components/oat/showcase.tsx`: the trades, the features each section shows, the picture crops.
- `components/oat/home.tsx`: the Oat kit (hero, offer, FAQ, close) shared with the prototypes.
- `lib/homeContent.ts`: the FAQ. `OWNER_FAQS` (objections) then `FAQS` (ranking content) make
  `HOME_FAQS`, which is both the visible FAQ and the FAQPage schema. Edit them there and both follow.

## Trade-offs to revisit

### 1. The homepage renders on every request

**What:** the page reads `?trade=` from the address, so Vercel builds it fresh for each visit
(`ƒ /` in `next build`). Before #55 it was built once at deploy time and served as a ready-made
file, the fastest a page can be. Each visit now costs a few tens of milliseconds of server time.

**Why we accepted it:** a link like `seopage.com/?trade=roofing` (from an ad or an email) shows the
roofer's version on the first paint, with no flash of HVAC first.

**When to act:** if the homepage's speed in Vercel (Speed Insights, Time to First Byte) or Search
Console's Core Web Vitals gets worse than before #55.

**The fix:** keep `/` prebuilt with HVAC, and make the trade buttons switch the examples and
pictures in the browser (client state, reading `?trade=` after load). We get the speed back. The
cost: a `?trade=roofing` link shows HVAC for a moment before it switches.

### 2. The homepage shows views that are still prototypes

Coverage, Identity and Opportunities exist in the create.seopage.com prototypes
(`/prototypes/site`, `/prototypes/home`), not the live app yet. The homepage presents them as the
app. Either build them before the monthly plan opens, or label them "coming with the monthly plan".

### 3. "Calls from search" depends on the owner's GA4

The calls numbers come from the owner's GA4, which only counts calls if they set it up. The page
says the numbers come from GA4; onboarding should help them set call tracking up.

### 4. The pictures are captured, with sample businesses swapped in

`public/app/<trade>/*.webp` are 2x screenshots of the create.seopage.com prototype, taken by
`scripts/app-shots.mjs`. The prototype's sample business is a painter, so the script swaps in a
sample HVAC company, plumber or roofer on screen before each shot. For the builder it also swaps
in the trade's photo. Every business and number is a sample, and the page says so.

Recapture whenever the app's look changes. Run both dev servers (the app on 3099, this site on
3091 for the builder's photos), then:

```sh
APP=http://localhost:3099 SITE=http://localhost:3091 \
PW_CORE=/path/to/node_modules/playwright-core node scripts/app-shots.mjs
# ONLY=builder recaptures just the builder
```

When the app gets real samples per trade, drop the swap tables and capture as is.

### 5. The plumbing builder photo is a render

`public/home/svc-drain.webp` is a stylized render, not a real job photo like the HVAC
(`trade/hvac/furnace.webp`) and roofing (`trade/roofers/leak.webp`) ones. Replace it and recapture
the plumbing builder.

## Still open

- **Title and meta description** still sell one page that "gets cited by AI", with $199 to publish.
  The code says not to swap the keyword without Zev.
- **The footer tagline** says "SEO landing pages that rank on Google and get cited by AI."
- **`HOME_SCHEMA`** describes one $199 Service and doesn't mention the monthly plan.
- **`/pricing`** still says 8 pages the first month, then 4 (`lib/plans.ts`).
- **Two FAQ answers to confirm:** "Every page is yours" and "you can change or cancel it any time."

## Analytics

seopage.com's own Google Analytics 4 property is `G-JD7VKJQKNW` (`GA_MEASUREMENT_ID` in
`lib/config.ts`). `app/layout.tsx` loads the Google tag on every page, on the production deploy
only (`VERCEL_ENV === "production"`), so local dev and Vercel previews stay out of the numbers.

**Events.** `lib/events.ts` lists every event and where it goes; add an event there before
sending it. GA4 gets a few key events only (the detailed product events belong in PostHog later):

| Event | Sent from | When |
|---|---|---|
| `start_free` | the browser, `components/TrackClicks.tsx` | A click on any link into create.seopage.com except Sign in. Params: `location` (the section), `link_text`, `trade`. |
| `book_call` | the browser, `components/TrackClicks.tsx` | A click on Book a call. Param: `location`. |
| `purchase` | the server, the Stripe webhook (`lib/ga4.ts`) | A paid $199 page on this site's own checkout (`/audit`, `/on-page-seo-services`). The session id is the transaction id. |
| `sign_up` | create.seopage.com (not yet) | An account created. Sent once create.seopage.com carries the tag. |

One click listener covers the whole site, so new buttons are tracked without code: a link to
`CREATE_URL` is `start_free`, a link to `BOOK_CALL_URL` is `book_call`. Clicks on `/prototypes`
pages are skipped. To name a link's `location`, put `data-track="…"` on it or its section.

**Setup in GA4 (once):**

1. **The purchase event needs an API secret.** GA4 → Admin → Data streams → the seopage.com
   stream → Measurement Protocol API secrets → Create. Add it to Vercel as `GA4_API_SECRET`
   (Production). Without it, `purchase` is skipped and nothing breaks.
2. **Mark `start_free` and `book_call` as key events** (Admin → Key events → New key event,
   by name). `purchase` is a key event already.
3. **The Stripe webhook must be on** (`STRIPE_WEBHOOK_SECRET`). `purchase` is sent from it, not
   from the success page.

Not set up yet:

- **Cross-domain measurement** with create.seopage.com, so a visit that starts here and signs up
  there counts as one journey. It needs the same tag on create.seopage.com, and both domains
  listed in GA4 (Admin → Data streams → Configure tag settings → Configure your domains).
- **A cookie banner.** None today. Needed before marketing to visitors in the EU or UK.
