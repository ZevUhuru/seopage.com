/**
 * Central config. Edit the price here (one place) and it flows to the
 * homepage, the paywall, and the Stripe Checkout Session.
 */
export const PRICE_USD = 99;
export const PRICE_CENTS = PRICE_USD * 100;
export const PRICE_LABEL = `$${PRICE_USD}`;

/** The delivery promise shown everywhere. Only promise what we can hit. */
export const DELIVERY_HOURS = 3;
export const DELIVERY_LABEL = `within ${DELIVERY_HOURS} hours`;

/**
 * The free page audit is the top of the funnel, not the product. It gets a
 * slower promise than a paid order on purpose: paying customers own the
 * 3-hour queue, and a free audit must never be the reason one slips.
 */
export const AUDIT_HOURS = 24;

export const PRODUCT = {
  name: "SEOPage",
  // Statement descriptor shown on the customer's card. Stripe limits this to
  // 22 chars; keep it recognizable.
  billingDescriptor: "SEOPAGE.COM",
  productName: "SEO Page",
  productDescription:
    "One researched, written, and human-reviewed SEO page built around your target keyword — delivered ready to publish, engineered for Google and AI search.",
  satisfaction: "Not happy with it? Email support@seopage.com and we'll make it right.",
  supportEmail: "support@seopage.com",
};

/** The site's public origin, used to build Stripe redirect URLs. */
export function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export const ANTHROPIC_MODEL = "claude-opus-4-8";
