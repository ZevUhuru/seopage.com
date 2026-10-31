/**
 * The event list: every analytics event seopage.com sends, and where it goes. Add an event here
 * before sending it anywhere, so the names stay one vocabulary across GA4 (and PostHog later).
 * Kept small on purpose: an event earns its place by answering a question we're asking.
 * See docs/HOMEPAGE.md → Analytics for the GA4 setup.
 */
export const EVENTS = {
  start_free: {
    ga4: true,
    note: "A click on any link into create.seopage.com except Sign in (the hero form, every Start free and Build it free). Params: location, link_text, trade.",
  },
  book_call: {
    ga4: true,
    note: "A click on Book a call (the Managed plan). Params: location.",
  },
  purchase: {
    ga4: true,
    note: "A paid $199 page on seopage.com's own checkout (/audit, /on-page-seo-services), sent by the Stripe webhook. Params: transaction_id, value, currency, items.",
  },
  sign_up: {
    ga4: true,
    note: "An account created on create.seopage.com. Sent by create.seopage.com once it carries the tag; not sent from this site.",
  },
} as const;

export type EventName = keyof typeof EVENTS;
