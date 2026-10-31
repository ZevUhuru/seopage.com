/**
 * Central config. Edit the price here (one place) and it flows to the
 * homepage, the paywall, and the Stripe Checkout Session. One price, no
 * launch window (dropped 2026-10-26). Must match create.seopage.com's
 * lib/config.ts, where the page is actually bought.
 */
export const PRICE_USD = 199;
export const PRICE_CENTS = PRICE_USD * 100;
export const PRICE_LABEL = `$${PRICE_USD}`;

/**
 * The builder app. Every "build my page" CTA on the marketing site sends
 * people here: free to preview, PRICE_LABEL to publish.
 */
export const CREATE_URL =
  process.env.NEXT_PUBLIC_CREATE_URL || "https://create.seopage.com";

/** Where a returning owner signs in: the builder's own login page. */
export const SIGN_IN_URL = `${CREATE_URL}/login`;

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

/** Zev's booking page. Managed is sold on a call, not through checkout. */
export const BOOK_CALL_URL = "https://cal.com/zev-uhuru-49mkft/15min";

/**
 * The positioning, in one place (decided 2026-10-31): SEO landing pages for local businesses,
 * built every month. The homepage title and description, the site's default metadata and social
 * cards, the footer and the homepage schema all read these. "SEO Landing Pages" stays first in the
 * title (the primary keyword; don't swap the term without Zev). No AI-citation claim (single pages
 * don't get cited; sites do) and no ranking promise.
 */
export const TAGLINE = "SEO landing pages for local businesses, built every month.";
export const SITE_TITLE = "SEO Landing Pages for Local Businesses, Built Every Month | SEOPage";
export const SITE_DESCRIPTION = `SEO landing pages for local service businesses, picked from your own Search Console. Our AI SEO agents research and write each page and score it on ten checks; you approve it. $149 a month, opening soon, or one page for ${PRICE_LABEL}.`;
export const SOCIAL_DESCRIPTION = "SEO landing pages for local service businesses, picked from your own Search Console and built every month. You approve every page.";

/** seopage.com's own Google Analytics 4 property (the marketing site, not any customer's).
 *  Loaded by app/layout.tsx on the production deploy only. */
export const GA_MEASUREMENT_ID = "G-JD7VKJQKNW";

/** The company SEOPage is a division of. */
export const PARENT = { name: "ESY LLC", href: "https://esy.com" } as const;

/**
 * Our social profiles. Linked from both footers and listed as sameAs on the
 * Organization schema, which ties them to SEOPage for search engines and AI.
 */
export const SOCIALS = [
  { name: "YouTube", handle: "@SEOPageAI", href: "https://www.youtube.com/@SEOPageAI" },
  { name: "LinkedIn", handle: "SEOPage", href: "https://www.linkedin.com/company/seopage" },
] as const;

/** The site's public origin, used to build Stripe redirect URLs. */
export function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export const ANTHROPIC_MODEL = "claude-opus-4-8";
