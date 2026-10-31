import { CREATE_URL, PARENT, PRICE_LABEL, PRICE_USD, PRODUCT, SOCIALS } from "@/lib/config";

/**
 * What stops the owner of a trade business from starting (2026-10-31, the story homepage).
 * They lead the homepage FAQ, before the ranking content below. No ranking promises: the
 * "Will it actually rank on Google?" answer in FAQS covers that question.
 */
export const OWNER_FAQS: { q: string; a: string }[] = [
  { q: "I've been burned by an SEO agency. Why is this different?", a: "You see what we see. The app shows your clicks, calls and every page, straight from your own Search Console and GA4, and nothing goes live until you approve it. The plan is month to month, so it has to earn its place every month." },
  { q: "How much of my time does it take?", a: "Reading the report and saying yes or no to each new page. Everything else, the research, the writing and the checks, is ours." },
  { q: "What do I need to connect?", a: "Google Search Console, so we can see what people search before they find you, and GA4, so calls from search can be counted. Bing is optional. Each one connects to your site, not to us." },
  { q: "Is AI writing any good for a trade like mine?", a: "Each page is researched for your city from live search data, written by our AI SEO agents, and scored on ten checks before you see it. Then you read it, change any section, or ask for another version." },
  { q: "Do I own the pages?", a: "Yes. Every page is yours." },
  { q: "Can I cancel?", a: "Yes. The plan is month to month, and you can change or cancel it any time." },
];

/**
 * Homepage FAQ: the ranking content for "SEO landing page" and its AEO/GEO
 * neighbors. Rendered visibly on the page and mirrored 1:1 into FAQPage
 * schema below, so the structured data always matches the visible text.
 */
export const FAQS: { q: string; a: string }[] = [
  {
    q: "What is an SEO landing page?",
    a: `An SEO landing page is a web page engineered to win one specific search: it targets a single keyword with a matching title tag, meta description, heading structure, content written for the search intent, and schema markup — so search engines can rank it and AI assistants can cite it. SEOPage builds yours with AI: you describe your business, it researches the searches in your market and writes the page, you refine it in a live editor, and you publish one complete ready-to-publish HTML file — not a draft you still have to fix.`,
  },
  {
    // The monthly plan leads the homepage (2026-10-29); this answer says what a month is, without page counts.
    q: "What's in the monthly plan?",
    a: "SEOPage is $149 a month, opening soon. Each month our AI SEO agents read your Search Console, pick the searches your site doesn't answer yet, research and write those pages for your city, and score each one on ten checks. You approve every page before it goes live, and a monthly report shows searches and clicks, page by page. You can start today with one page, free to preview.",
  },
  {
    q: `What exactly do I get for ${PRICE_LABEL}?`,
    a: "One finished SEO page: keyword research for your market, a keyword-focused title tag and meta description, a clean heading structure, the full written page in a hand-crafted responsive design, an FAQ section written to be quoted, and LocalBusiness and FAQPage schema markup — exported as a single ready-to-publish HTML file that's yours forever. Previewing is free; you only pay when you publish.",
  },
  {
    q: "How does it work?",
    a: `Enter three details: your business name, what you do, and where you do it. The AI researches the searches people in your market actually type, writes the page around the one worth winning, and lays it out in a hand-crafted design. You refine anything you want in the live editor, then publish for ${PRICE_LABEL} and download the file. No brief, no sales call, no waiting on an inbox.`,
  },
  {
    q: "Who actually writes the page?",
    a: "The AI does, inside guardrails. It runs live keyword research for your market and writes structured content: the headline, sections, FAQ, title tag, and meta description. It never improvises the design; the look comes from hand-crafted themes and section templates, so the page doesn't read or look like generic AI output. And you have the final say in the editor before anything is published.",
  },
  {
    q: "How is this different from an AI visibility tool?",
    a: "AI visibility tools monitor whether ChatGPT, Perplexity, and Google AI mention your brand — they diagnose the problem, usually for a monthly subscription, and leave the fixing to you. SEOPage is the other half: it builds the pages those systems can actually cite. Buy one page and keep it, or let the monthly plan keep building them from your own Search Console, with a report on what moved.",
  },
  {
    q: "Will it actually rank on Google?",
    a: "The page is built on the fundamentals Google rewards: a keyword-focused title and description, clean headings, real content matched to search intent, and valid structured data. How fast it climbs depends on your domain and your competition — specific, lower-competition searches can move in weeks; harder markets take longer. Either way, the page itself won't be the thing holding you back.",
  },
  {
    q: "Does it help me show up in ChatGPT and AI search?",
    a: "Every page is engineered for Google and AI search: clear, quotable answers, an FAQ section with matching FAQPage schema, and specific facts AI assistants can cite. Nobody can honestly guarantee a placement inside an AI answer — what we can do is build the kind of page those systems read and quote.",
  },
  {
    q: "Do you do llms.txt?",
    a: "It isn't part of the page, and here's the truth about it. As of 2026 no major AI company has committed to reading llms.txt in production, and Google's own AI-optimization guidance says it isn't used for AI Overviews or AI Mode. It costs nothing to add one yourself and it's there the day that changes, but anyone selling it to you as the reason you'll get cited is selling you a meta keywords tag. What actually earns a citation is duller: specific facts an assistant can quote, answers that still make sense lifted out of the page, valid structured data, and a site that isn't accidentally blocking the AI crawlers in robots.txt. Every SEOPage page is built for those.",
  },
  {
    q: "Is this AEO or GEO — answer engine optimization?",
    a: "Those are the names people are giving to the same job: getting your business named inside an AI answer instead of a blue link. We do it at the page level. In practice that means writing self-contained, quotable passages rather than long build-up; putting specific, checkable facts and numbers on the page, because generative engines lean on sources they can quote precisely; matching structured data to the content so the page is machine-readable; making the entity clear and consistent, so the assistant knows who you are; and a robots.txt that lets GPTBot, ClaudeBot, PerplexityBot, and Google's crawlers actually reach your site. It's the same craft as good SEO, aimed at a surface that quotes instead of links.",
  },
  {
    q: "What if I don't like the page?",
    a:
      "You'll know before you pay. The whole page is free to preview, and you can refine any section in the editor until it's right. You only pay when you publish. " +
      PRODUCT.satisfaction,
  },
  {
    q: "Do I need a website? How do I publish it?",
    a: "You don't need an existing site. When you publish, you download the page as one self-contained HTML file — upload it to any host, point a domain at it, or paste it into your site builder's custom-HTML block.",
  },
  {
    q: "Can I build pages for multiple keywords, or for clients?",
    a: `Yes. Each page covers one target keyword — many customers build a page per service or per city. If you're an agency or need pages in volume, email ${PRODUCT.supportEmail} and we'll set you up directly.`,
  },
];

/* The homepage's whole FAQ, in the order it shows: the owner's objections, then the ranking content */
export const HOME_FAQS = [...OWNER_FAQS, ...FAQS];

export const HOME_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://seopage.com/#organization",
      name: "SEOPage",
      url: "https://seopage.com",
      email: PRODUCT.supportEmail,
      sameAs: SOCIALS.map((s) => s.href),
      parentOrganization: { "@type": "Organization", name: PARENT.name, url: PARENT.href },
      description: `SEOPage builds SEO landing pages for local service businesses every month, picked from each owner's own Search Console, researched and written by AI SEO agents, and approved by the owner before they go live.`,
    },
    {
      "@type": "WebSite",
      "@id": "https://seopage.com/#website",
      url: "https://seopage.com",
      name: "SEOPage",
      publisher: { "@id": "https://seopage.com/#organization" },
    },
    {
      "@type": "Service",
      "@id": "https://seopage.com/#service",
      serviceType: "SEO landing pages for local businesses",
      name: "SEOPage",
      provider: { "@id": "https://seopage.com/#organization" },
      audience: { "@type": "BusinessAudience", audienceType: "Local service businesses" },
      description: `New SEO landing pages every month, picked from the owner's own Search Console, researched and written for their city, scored on ten checks, and approved by the owner. Or one page, bought once.`,
      // The monthly plan first (opening soon, so a pre-order), then the single page sold today
      offers: [
        {
          "@type": "Offer",
          name: "SEOPage monthly plan",
          priceSpecification: { "@type": "UnitPriceSpecification", price: "149.00", priceCurrency: "USD", unitText: "MONTH" },
          availability: "https://schema.org/PreOrder",
          url: "https://seopage.com/pricing",
        },
        {
          "@type": "Offer",
          name: "One SEO landing page",
          price: `${PRICE_USD}.00`,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: CREATE_URL,
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://seopage.com/#faq",
      mainEntity: HOME_FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

