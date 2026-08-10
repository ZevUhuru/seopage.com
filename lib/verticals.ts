/**
 * Industry pages: seopage.com/roofers, /hvac, and the rest.
 *
 * The domain supplies "SEO page" and the slug supplies the trade, so the URL
 * itself reads as the query. Each entry targets a vertical head term
 * ("roofing seo") with the long-tail on-page variants as support.
 *
 * The rule that keeps this out of scaled-content-abuse territory: everything
 * below is specific to the trade. The searches are ones that trade's customers
 * actually type, the proof points are what that trade has to demonstrate to be
 * hired, and the failings are what those pages actually get wrong. A vertical
 * that can only be described in generic terms does not belong here.
 *
 * One page per trade. Not one page per trade per city — that is a factory, and
 * it is the line where Google stops reading this as content.
 */

export type Vertical = {
  /** URL slug. seopage.com/<slug> */
  slug: string;
  /** Plural trade noun as it appears in prose: "roofers", "HVAC companies". */
  plural: string;
  /** The head term this page is built to win. */
  primaryKeyword: string;
  /** Supporting terms, worked into the body rather than stuffed. */
  supporting: string[];
  /** Title tag, keyword front-loaded. The layout template appends "| SEOPage". */
  title: string;
  description: string;
  /** Display headline. The second half takes the loss colour. */
  headline: { lead: string; loss: string };
  /** Searches this trade's customers type when they are ready to hire. */
  searches: string[];
  /** What a page in this trade has to prove before anyone calls. */
  proof: { t: string; d: string }[];
  /** What the pages currently ranking in this trade get wrong. */
  failings: string[];
  /** Questions specific to this trade. Shared FAQs are appended by the page. */
  faqs: { q: string; a: string }[];
};

export const VERTICALS: Vertical[] = [
  {
    slug: "roofers",
    plural: "roofers",
    primaryKeyword: "roofing SEO",
    supporting: [
      "SEO for roofing companies",
      "on-page SEO for roofers",
      "roofing contractor SEO",
    ],
    title: "Roofing SEO: One Page Built to Win the Search That Pays",
    description:
      "Roofing SEO that ships a finished page, not a retainer. We build one page engineered to win a search your customers actually type, and to be the roofer an AI assistant names. $99, in your inbox within 3 hours.",
    headline: {
      lead: "A storm hits and the calls go out within the hour.",
      loss: "They go to whoever the search finds first.",
    },
    searches: [
      "emergency roof repair near me",
      "storm damage roof repair",
      "roof replacement cost",
      "best roofing company in [city]",
      "roof leak repair same day",
    ],
    proof: [
      {
        t: "Licensed, bonded, insured — stated, not implied",
        d: "The single most common reason a roofing page loses a ready buyer is that it never says this in text a crawler or an assistant can read.",
      },
      {
        t: "How fast you actually show up",
        d: "\"24/7 emergency response\" is the phrase that wins storm searches. If it lives only in a header image, it does not exist.",
      },
      {
        t: "Insurance claim experience",
        d: "Storm work is an insurance transaction. Homeowners search for someone who has done the claim before, and almost no roofing page says so plainly.",
      },
      {
        t: "Warranty terms in words",
        d: "Manufacturer and workmanship warranties are a deciding factor and a quotable fact. Both matter for the same reason.",
      },
    ],
    failings: [
      "A gallery of finished roofs with almost no text on the page, so there is nothing to rank and nothing to quote",
      "One page covering repair, replacement, gutters, and siding at once, competing with itself for every search",
      "Service areas buried in a footer instead of stated where the page can be read",
      "No answer to the question every homeowner actually types first: what does this cost",
    ],
    faqs: [
      {
        q: "What is roofing SEO?",
        a: "Roofing SEO is the work of making a roofing company's pages win the searches homeowners run when they need a roof repaired or replaced — emergency and storm-damage queries, cost questions, and \"best roofer near me\" searches. Most of it is on-page: matching each page to one search, stating licensing, response time, and warranty terms in readable text, and structuring the page so both Google and AI assistants can quote it.",
      },
      {
        q: "How is this different from a roofing SEO agency?",
        a: "An agency sells a monthly retainer and reports on progress. We sell one finished page for $99, delivered in 3 hours, and then we are done. If you need a page for emergency repair, one for replacement, and one for each city you serve, that is separate orders — not a contract.",
      },
      {
        q: "Which page should a roofer order first?",
        a: "The one with the most urgent buyer. For most roofers that is emergency or storm-damage repair, because the searcher has water coming in and is calling whoever the search puts in front of them. Replacement and cost pages convert more slowly and can come second.",
      },
    ],
  },
  {
    slug: "hvac",
    plural: "HVAC companies",
    primaryKeyword: "HVAC SEO",
    supporting: [
      "SEO for HVAC companies",
      "on-page SEO for HVAC",
      "HVAC contractor SEO",
    ],
    title: "HVAC SEO: One Page Built to Win the Search That Pays",
    description:
      "HVAC SEO that ships a finished page, not a retainer. We build one page engineered to win a search your customers actually type, and to be the company an AI assistant names. $99, in your inbox within 3 hours.",
    headline: {
      lead: "The AC dies on the first hot day and nobody shops around.",
      loss: "They call whoever the search answers with.",
    },
    searches: [
      "ac repair near me",
      "furnace not turning on",
      "emergency hvac service",
      "ac installation cost",
      "hvac maintenance plan",
    ],
    proof: [
      {
        t: "Same-day and after-hours availability",
        d: "Heating and cooling failures are emergencies with a deadline measured in hours. Whether you answer tonight is the whole decision.",
      },
      {
        t: "The brands you service",
        d: "Homeowners search by brand when something specific breaks. A page that names the equipment it works on catches searches a generic page never sees.",
      },
      {
        t: "Financing, stated up front",
        d: "A system replacement is a four- to five-figure decision. Pages that mention financing convert buyers who would otherwise keep searching.",
      },
      {
        t: "Maintenance plans as a real offer",
        d: "Recurring revenue is the business, but most HVAC pages bury the plan below the fold and never describe what it includes.",
      },
    ],
    failings: [
      "One page for heating and cooling both, so it ranks for neither season",
      "Emergency availability shown as a phone-number graphic that no crawler and no assistant can read",
      "No pricing signal at all, on a purchase where the first question is always cost",
      "Equipment brands never named, missing every brand-specific search in the market",
    ],
    faqs: [
      {
        q: "What is HVAC SEO?",
        a: "HVAC SEO is the work of making a heating and cooling company's pages win the searches homeowners run when a system fails or needs replacing — emergency repair queries, brand-specific problems, installation cost questions, and maintenance plan searches. Most of it is on-page: one page per search, availability and financing stated in readable text, and structure that lets Google rank the page and AI assistants quote it.",
      },
      {
        q: "Should heating and cooling be separate pages?",
        a: "Yes, and it is the most common fix we make. A single page trying to win both \"ac repair\" and \"furnace repair\" competes with itself and peaks in neither season. Two pages, each built around one search, is the difference between ranking twice a year and ranking never.",
      },
      {
        q: "How is this different from an HVAC marketing agency?",
        a: "An agency sells a monthly retainer. We sell one finished page for $99, delivered in 3 hours, with no contract. Order a page for AC repair now and a furnace page before winter, or order twelve. There is nothing to cancel.",
      },
    ],
  },
];

export function getVertical(slug: string): Vertical | undefined {
  return VERTICALS.find((v) => v.slug === slug);
}
