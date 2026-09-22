import { CREATE_URL, PRICE_LABEL, PRICE_USD, PRODUCT } from "@/lib/config";

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
    a: "AI visibility tools monitor whether ChatGPT, Perplexity, and Google AI mention your brand — they diagnose the problem, usually for a monthly subscription, and leave the fixing to you. SEOPage is the other half: it builds the page those systems can actually cite. No dashboard, no subscription. One finished page, engineered to be quoted.",
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

export const HOME_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://seopage.com/#organization",
      name: "SEOPage",
      url: "https://seopage.com",
      email: PRODUCT.supportEmail,
      description:
        "SEOPage builds SEO landing pages with AI: researched, written, and engineered to be cited by AI search and rank on Google. Free to preview, ready to publish in one sitting.",
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
      serviceType: "SEO landing page creation",
      name: "SEO landing page builder",
      provider: { "@id": "https://seopage.com/#organization" },
      description: `One researched and written SEO landing page built around a target keyword, engineered to be cited by AI search, and exported ready to publish.`,
      offers: {
        "@type": "Offer",
        price: `${PRICE_USD}.00`,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: CREATE_URL,
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://seopage.com/#faq",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

