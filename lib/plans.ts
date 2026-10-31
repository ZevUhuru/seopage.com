import { BOOK_CALL_URL, CREATE_URL, PRICE_USD } from "./config";

/* ================================================================
   Every SEOPage plan, in one place (2026-10-26). /pricing and
   /prototypes/plans read this file, so a price or a limit changes here
   and nowhere else.

   The site is a shop. Monthly comes first: SEOPage (switched off until
   it's built) and Managed (sold on a call). Google Ads is an add-on to
   SEOPage, not a plan: whether an owner needs it depends on whether they
   already pay for clicks, not on how long they've been with us. Guides are
   the second add-on: articles answering the questions an owner's
   customers search before they call, the first step toward an SEO writer.

   Below the plans, pages are sold by the page, for the buyer who wants one
   landing page (or a few) without a plan: one page today on
   create.seopage.com, bundles of 3 and 6 once checkout can sell them.

   `status: "coming"` renders a disabled button; anything goes live by
   flipping its status once everything in `needs` exists.

   Sources: the Oct 6 "SEOPage Offer" doc, and the Oct 26 look at
   Searchable, Blaze and BabyLoveGrowth. Every price is a proposal.
   ================================================================ */

export type PlanId = "seopage" | "managed";
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
  /** none · available as the Ads add-on · run for them inside a budget. */
  ads: "none" | "addon" | "run";
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
  /** The Google Ads add-on can be switched on for this plan. */
  adsAddOn?: boolean;
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

/** Google Ads, added to SEOPage for owners already paying Google for clicks. */
export const ADS = {
  name: "Google Ads",
  status: "coming" as PlanStatus,
  price: 99,
  yearly: yearlyFor(99),
  extraCredits: 20,
  includes: [
    "Your Google Ads beside your pages",
    "What's wasting spend, and what to try instead",
    "Nothing changes your spend until you say yes",
    "A budget cap the app never goes over",
  ],
  needs: [
    "Everything SEOPage needs",
    "Google Ads API access (developer token)",
    "Ads suggestions the owner approves, under a hard budget cap",
  ],
};

/* Guides, added to SEOPage for owners whose customers read up before they
   hire (remodelers, roofers, dentists, lawyers). Questions come from the
   owner's own Search Console, aimed at cost, compare and repair-or-replace
   searches. They count separately from the plan's pages. */
export const GUIDES = {
  name: "Guides",
  status: "coming" as PlanStatus,
  price: 99,
  yearly: yearlyFor(99),
  perMonth: 4,
  includes: [
    "4 guides a month, answering what people ask before they call",
    "Picked from the questions in your Search Console",
    "Sources cited in every guide",
    "Nothing goes live until you say yes",
  ],
  needs: [
    "Everything SEOPage needs",
    "A guide format in the builder: longer than a page, with cited sources",
    "Question searches picked from Search Console",
    "Somewhere to publish them: a blog we host, or the owner's WordPress or Webflow",
    "A guide allowance in the builder, separate from pages",
  ],
};

export const PLANS: Plan[] = [
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
      // No page count until Zev settles how many a plan includes (2026-10-31); limits below are planning numbers
      "New pages every month",
      "Picked from the searches you already show up for",
      "Pages that slip get rewritten",
      "Which AI answers name you, checked weekly",
      "A monthly report from Search Console and Analytics",
      "Nothing goes live until you say yes",
    ],
    limits: {
      pagesFirstMonth: 8, pagesPerMonth: 4, imagesPerPage: 4, creditsPerMonth: 40, locations: 1,
      searchConsole: true, rewrites: true, aiAnswers: "weekly", report: "monthly", ads: "addon", person: false,
    },
    cta: { label: "Coming soon" },
    featured: true,
    adsAddOn: true,
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
      "Everything in SEOPage, with Google Ads",
      "One person who knows your business, and a monthly call",
      "More new pages every month, plus rewrites of your current site",
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
      "Everything SEOPage and the Ads add-on need",
      "Google Business Profile access (API approval)",
      "A client seat in os.esy.com for each Managed business",
      "Time: about 4–6 hours a month per business",
    ],
  },
];

export const plan = (id: PlanId) => PLANS.find((p) => p.id === id)!;

/** By the page: one landing page, or a discounted bundle, paid once. Always dearer a page than the plan (about $19). */
export const BY_THE_PAGE = {
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
  } satisfies Limits as Limits,
  options: [
    {
      pages: 1, price: PRICE_USD, status: "live" as PlanStatus,
      fits: "The search that matters most, or one page to send ad traffic to.",
      cta: { label: "Build my page free", href: CREATE_URL as string | undefined },
    },
    {
      pages: 3, price: 499, status: "coming" as PlanStatus,
      fits: "Your main service and two more, or one service in three towns.",
      cta: { label: "Coming soon", href: undefined as string | undefined },
    },
    {
      pages: 6, price: 899, status: "coming" as PlanStatus,
      fits: "A page for each job you want more of.",
      cta: { label: "Coming soon", href: undefined as string | undefined },
    },
  ],
  needs: [
    "Checkout for 3 and 6 pages (today it sells one)",
    "A page balance in the builder that counts down as each page goes live",
  ],
};
export const perPage = (o: { pages: number; price: number }) => Math.round(o.price / o.pages);

/** The price a card shows for the chosen billing, with the Ads add-on if it's on. */
export function priceFor(p: Plan, billing: Billing, withAds = false) {
  if (p.per === "once") return { amount: p.price, unit: "once", note: null as string | null };
  const ads = withAds && p.adsAddOn;
  if (billing === "yearly" && p.yearly) {
    const yearly = p.yearly + (ads ? ADS.yearly : 0);
    return { amount: Math.round(yearly / 12), unit: "a month", note: `${usd(yearly)} billed yearly` };
  }
  return { amount: p.price + (ads ? ADS.price : 0), unit: "a month", note: p.yearly ? "billed monthly" : null };
}

/** The compare table, one row per limit. */
export const COMPARE: { label: string; value: (l: Limits) => string }[] = [
  // Monthly plans say "every month" with no count until the count is decided; the one-page buy says 1
  { label: "New pages", value: (l) => (l.pagesPerMonth ? "Every month" : "1") },
  { label: "Images made for each page", value: (l) => (l.imagesPerPage ? `Up to ${l.imagesPerPage}` : "—") },
  { label: "Picked from your Search Console", value: (l) => yes(l.searchConsole) },
  { label: "Pages that slip get rewritten", value: (l) => yes(l.rewrites) },
  { label: "Which AI answers name you", value: (l) => (l.aiAnswers === "weekly" ? "Weekly" : "—") },
  { label: "Monthly report", value: (l) => yes(l.report === "monthly") },
  { label: "Google Ads", value: (l) => ({ none: "—", addon: `Add-on, +${usd(ADS.price)} a month`, run: "We run them" })[l.ads] },
  {
    label: "Credits for extra versions",
    value: (l) => (l.creditsPerMonth === null ? (l.person ? "Not needed" : "—") : `${l.creditsPerMonth} a month${l.ads === "addon" ? `, ${l.creditsPerMonth + ADS.extraCredits} with Ads` : ""}`),
  },
  { label: "Locations", value: (l) => String(l.locations) },
  { label: "A person and a monthly call", value: (l) => yes(l.person) },
];
function yes(b: boolean) { return b ? "Yes" : "—"; }

/** Who each plan is for, in the owner's words. */
export const FITS: { who: string; label: string; href: string }[] = [
  { who: "I have a website and want more calls from it, month after month.", label: "SEOPage", href: "#plans" },
  { who: "I already pay Google for clicks and don't know if it's working.", label: "SEOPage with Google Ads", href: "#plans" },
  { who: "I don't have time for this. I want someone to run it.", label: "Managed", href: "#plans" },
  { who: "I just need one good page to send people to.", label: "By the page", href: "#by-the-page" },
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

/** Monthly add-ons on SEOPage. */
export const ADD_ONS = [
  { what: "Google Ads", price: `${usd(ADS.price)} a month`, note: `Suggestions you approve, under a budget cap; ${ADS.extraCredits} more credits` },
  { what: "Guides", price: `${usd(GUIDES.price)} a month`, note: `${GUIDES.perMonth} a month, answering what your customers ask before they call` },
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
  seopage: { firstMonth: 45, after: 25, hours: 0 },
  managed: { firstMonth: 75, after: 75, hours: 5 },
};
/** A page by the page costs what any page does. */
export const PAGE_COST = 4.49;
/** The Ads add-on on its own: Ads API reads, suggestions, a few more credits. */
export const ADS_COST_ESTIMATE = { monthly: 5, hours: 0.5 };
/** Guides: a guess of about $5 a guide (a page plus source research) until a guide workflow is measured. */
export const GUIDES_COST_ESTIMATE = { monthly: 20, hours: 0 };
