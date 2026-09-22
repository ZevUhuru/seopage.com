/**
 * Central config. Edit the price here (one place) and it flows to the
 * homepage, the paywall, and the Stripe Checkout Session.
 */
export const PRICE_USD = 149;
export const PRICE_CENTS = PRICE_USD * 100;
export const PRICE_LABEL = `$${PRICE_USD}`;

/**
 * Launch pricing: $149 now, $249 once launch pricing ends. Shown as a FUTURE
 * price, never struck through as a "was" price we never charged. When launch
 * ends, raise PRICE_USD to this and drop the launch copy. Must match
 * create.seopage.com's lib/config.ts, where the page is actually bought.
 */
export const PRICE_AFTER_LAUNCH_USD = 249;
export const PRICE_AFTER_LAUNCH_LABEL = `$${PRICE_AFTER_LAUNCH_USD}`;

/**
 * The builder app. Every "build my page" CTA on the marketing site sends
 * people here: free to preview, PRICE_LABEL to publish.
 */
export const CREATE_URL =
  process.env.NEXT_PUBLIC_CREATE_URL || "https://create.seopage.com";

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
