import { BOOK_CALL_URL, CREATE_URL, PRICE_USD } from "./config";

/* ================================================================
   Every SEOPage plan, in one place (2026-10-26). /pricing and
   /prototypes/plans read this file, so a price or a limit changes here
   and nowhere else.

   One page is sold today (create.seopage.com), and Managed is sold on a
   call. SEOPage and SEOPage + Ads are written out in full so the
   direction is clear, and ship switched off: `status: "coming"` renders a
   disabled button. A plan goes live by flipping its status once
   everything in `needs` exists.

   Sources: the Oct 6 "SEOPage Offer" doc, and the Oct 26 look at
   Searchable, Blaze and BabyLoveGrowth. Every price is a proposal.
   ================================================================ */

export type PlanId = "page" | "seopage" | "ads" | "managed";
/** live: bought online · call: sold on a call · coming: shown, not sold. */
export type PlanStatus = "live" | "call" | "coming";
export type Billing = "monthly" | "yearly";

/** What a plan gets each month. The app will enforce these; today nothing does. */
export interface Limits {
  /** Pages in the first month, then every month after. */
  pagesFirstMonth: number;
  pagesPerMonth: number;
  /** Generated images per page; proof of work is always the owner's own photo. */
  imagesPerPage: number;
  /** Credits for extra versions and images; null = not metered. */
  creditsPerMonth: number | null;
  /** Business locations (each its own address and Google Business Profile). */
  locations: number;
  searchConsole: boolean;
  /** Pages that slip in Search Console get rewritten. */
  rewrites: boolean;
  aiAnswers: "none" | "weekly";
  report: "none" | "monthly";
  /** none · suggestions the owner approves · run for them inside a budget. */
  ads: "none" | "suggest" | "run";
  /** A named person on the account, and a monthly call. */
  person: boolean;
}

export interface Plan {
  id: PlanId;
  name: string;
  status: PlanStatus;
  /** Dollars. `per: "once"` is a single payment. */
  price: number;
  per: "once" | "month";
  /** Paid up front for a year; null = no yearly option. */
  yearly: number | null;
  /** A later price, shown as a future price and never struck through. */
  later?: { price: number; when: string };
  /** One line on who runs it. */
  who: string;
  blurb: string;
  includes: string[];
  limits: Limits;
  cta: { label: string; href?: string };
  featured?: boolean;
  /** Internal: what has to exist before `status` can be "live". Never rendered on /pricing. */
  needs: string[];
}

/** Two months free on yearly. */
export const yearlyFor = (monthly: number) => monthly * 10;
export const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

/** Managed starts as a capped pilot at a founding price. */
export const MANAGED_PILOT = { places: 10, days: 90, list: 1499 } as const;

/** Money back on the first month of a monthly plan. A proposal, Zev's call. */
export const REFUND_DAYS = 30;

export const PLANS: Plan[] = [
  // Live today: the builder and its checks are real, checkout is on create.seopage.com.
  {
    id: "page",
    name: "One page",
    status: "live",
    price: PRICE_USD,
    per: "once",
    yearly: null,
    who: "You build it, we check it",
    blurb: "One page for the search that matters most. Try it before you pay.",
    includes: [
      "Built from your business, section by section",
      "Versions of each section to choose from",
      "Checked before you pay",
      "Publish to your address, or download it",
      "Yours to keep, no subscription",
    ],
    limits: {
      pagesFirstMonth: 1, pagesPerMonth: 0, imagesPerPage: 0, creditsPerMonth: null, locations: 1,
      searchConsole: false, rewrites: false, aiAnswers: "none", report: "none", ads: "none", person: false,
    },
    cta: { label: "Build my page free", href: CREATE_URL },
    needs: [],
  },
  // The core offer: the monthly bill the business runs on.
  {
    id: "seopage",
    name: "SEOPage",
    status: "coming",
    price: 149,
    per: "month",
    yearly: yearlyFor(149),
    who: "We do the work, you approve it",
    blurb: "New pages every month, picked from your own Search Console.",
    includes: [
      "8 pages your first month, then 4 a month",
      "Picked from the searches you already show up for",
      "Pages that slip get rewritten",
      "Which AI answers name you, checked weekly",
      "A monthly report from Search Console and Analytics",
      "Nothing goes live until you say yes",
    ],
    limits: {
      pagesFirstMonth: 8, pagesPerMonth: 4, imagesPerPage: 4, creditsPerMonth: 40, locations: 1,
      searchConsole: true, rewrites: true, aiAnswers: "weekly", report: "monthly", ads: "none", person: false,
    },
    cta: { label: "Coming soon" },
    featured: true,
    needs: [
      "Monthly billing in Stripe (subscription, yearly price, refunds)",
      "Search Console connection that picks the month's pages",
      "Monthly page allowance and credits in the builder",
      "Rewrites of pages that slip",
      "Weekly AI-answer check",
      "Monthly report from Search Console and Analytics",
      "A check budget per customer in Esy (today all SEOPage shares one $25 a month)",
      "Each subscriber as an ESY LLC Client in Esy",
    ],
  },
  // For owners already paying Google for clicks.
  {
    id: "ads",
    name: "SEOPage + Ads",
    status: "coming",
    price: 279,
    per: "month",
    yearly: yearlyFor(279),
    who: "You approve every change",
    blurb: "Your pages and your Google Ads in one place.",
    includes: [
      "Everything in SEOPage",
      "Your Google Ads beside your pages",
      "What's wasting spend, and what to try instead",
      "Nothing changes your spend until you say yes",
      "A budget cap the app never goes over",
      "60 credits a month",
    ],
    limits: {
      pagesFirstMonth: 8, pagesPerMonth: 4, imagesPerPage: 4, creditsPerMonth: 60, locations: 1,
      searchConsole: true, rewrites: true, aiAnswers: "weekly", report: "monthly", ads: "suggest", person: false,
    },
    cta: { label: "Coming soon" },
    needs: [
      "Everything SEOPage needs",
      "Google Ads API access (developer token)",
      "Ads suggestions the owner approves, under a hard budget cap",
    ],
  },
  // Done for them, by people. A capped pilot at a founding price.
  {
    id: "managed",
    name: "Managed",
    status: "call",
    price: 999,
    per: "month",
    yearly: null,
    later: { price: MANAGED_PILOT.list, when: `after the first ${MANAGED_PILOT.places} businesses` },
    who: "We run it for you",
    blurb: "We run your pages, your Google Business Profile and your Google Ads.",
    includes: [
      "Everything in SEOPage + Ads",
      "One person who knows your business, and a monthly call",
      "Up to 12 pages a month, plus rewrites of your current site",
      "Your Google Business Profile kept current",
      "Your Google Ads run inside the budget you set",
      "Up to 3 locations",
    ],
    limits: {
      pagesFirstMonth: 12, pagesPerMonth: 12, imagesPerPage: 4, creditsPerMonth: null, locations: 3,
      searchConsole: true, rewrites: true, aiAnswers: "weekly", report: "monthly", ads: "run", person: true,
    },
    cta: { label: "Book a call", href: BOOK_CALL_URL },
    needs: [
      "Everything SEOPage + Ads needs",
      "Google Business Profile access (API approval)",
      "A client seat in os.esy.com for each Managed business",
      "Time: about 4–6 hours a month per business",
    ],
  },
];

export const plan = (id: PlanId) => PLANS.find((p) => p.id === id)!;

/** The price a card shows for the chosen billing. */
export function priceFor(p: Plan, billing: Billing) {
  if (p.per === "once") return { amount: p.price, unit: "once", note: null as string | null };
  if (billing === "yearly" && p.yearly) {
    return { amount: Math.round(p.yearly / 12), unit: "a month", note: `${usd(p.yearly)} billed yearly` };
  }
  return { amount: p.price, unit: "a month", note: p.yearly ? "billed monthly" : null };
}

/** The compare table, one row per limit. */
export const COMPARE: { label: string; value: (l: Limits) => string }[] = [
  { label: "New pages", value: (l) => (l.pagesPerMonth ? (l.pagesFirstMonth === l.pagesPerMonth ? `Up to ${l.pagesPerMonth} a month` : `${l.pagesFirstMonth} first month, then ${l.pagesPerMonth} a month`) : "1") },
  { label: "Images made for each page", value: (l) => (l.imagesPerPage ? `Up to ${l.imagesPerPage}` : "—") },
  { label: "Picked from your Search Console", value: (l) => yes(l.searchConsole) },
  { label: "Pages that slip get rewritten", value: (l) => yes(l.rewrites) },
  { label: "Which AI answers name you", value: (l) => (l.aiAnswers === "weekly" ? "Weekly" : "—") },
  { label: "Monthly report", value: (l) => yes(l.report === "monthly") },
  { label: "Google Ads", value: (l) => ({ none: "—", suggest: "Suggestions you approve", run: "We run them" })[l.ads] },
  { label: "Credits for extra versions", value: (l) => (l.creditsPerMonth === null ? (l.person ? "Not needed" : "—") : `${l.creditsPerMonth} a month`) },
  { label: "Locations", value: (l) => String(l.locations) },
  { label: "A person and a monthly call", value: (l) => yes(l.person) },
];
function yes(b: boolean) { return b ? "Yes" : "—"; }

/** Who each plan is for, in the owner's words. */
export const FITS: { who: string; plan: PlanId }[] = [
  { who: "I want to see what you make before I commit to anything.", plan: "page" },
  { who: "I have a website and want more calls from it, month after month.", plan: "seopage" },
  { who: "I already pay Google for clicks and don't know if it's working.", plan: "ads" },
  { who: "I don't have time for this. I want someone to run it.", plan: "managed" },
];

/** What a credit buys. Retries and fixes never cost one. */
export const CREDIT_USES = [
  { what: "A section version (“Try 3 more” uses 3)", credits: "1 credit each" },
  { what: "A new or swapped image after you’ve approved the page", credits: "1 credit" },
  { what: "One more page this month", credits: "75 credits" },
];

export const CREDIT_PACKS = [
  { credits: 50, price: 10 },
  { credits: 150, price: 25 },
  { credits: 500, price: 70 },
];

/** Monthly add-ons on SEOPage and SEOPage + Ads. */
export const ADD_ONS = [
  { what: "Another location", price: "$99 a month", note: "Its own pages, profile and report" },
];

/** Never costs a credit, on any plan. */
export const NEVER_A_CREDIT = [
  "Retries when a build fails or misses its checks",
  "Your monthly report",
  "AI answer checks",
  "Reading Search Console and Analytics",
];

/** Internal estimates of what a plan costs us a month (pages at the v3 median of $4.49, plus checks and reporting). */
export const COST_ESTIMATE: Record<PlanId, { firstMonth: number; after: number; hours: number }> = {
  page: { firstMonth: 4.49, after: 0, hours: 0 },
  seopage: { firstMonth: 45, after: 25, hours: 0 },
  ads: { firstMonth: 50, after: 30, hours: 0.5 },
  managed: { firstMonth: 75, after: 75, hours: 5 },
};
