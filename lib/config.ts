/**
 * Central config. Edit the price here (one place) and it flows to the
 * homepage, the paywall, and the Stripe Checkout Session.
 */
export const PRICE_USD = 29;
export const PRICE_CENTS = PRICE_USD * 100;
export const PRICE_LABEL = `$${PRICE_USD}`;

export const PRODUCT = {
  name: "SEOPage",
  // Statement descriptor shown on the customer's card. Stripe limits this to
  // 22 chars; keep it recognizable.
  billingDescriptor: "SEOPAGE.COM",
  productName: "SEO Landing Page (HTML export)",
  productDescription:
    "One finished, SEO-optimized landing page exported as clean, ready-to-publish HTML you own.",
  satisfaction: "Not happy with it? Email hi@seopage.com and we'll make it right.",
  supportEmail: "hi@seopage.com",
};

/** The site's public origin, used to build Stripe redirect URLs. */
export function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export const ANTHROPIC_MODEL = "claude-opus-4-8";
