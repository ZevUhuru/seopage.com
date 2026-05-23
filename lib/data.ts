export type PageTypeKey = "vs" | "alt" | "best" | "faq" | "category";

export type PageType = {
  key: PageTypeKey;
  label: string;
  subtitle: string;
  description: string;
  intent: string;
  template: string;
};

export const offer = {
  price: 497,
  priceLabel: "$497",
  pages: 5,
  unit: "$99 per page",
  pitch:
    "Five competitive landing pages built to be cited by ChatGPT and ranked by Google. AI researches your site, your competitors, and the SERP. A human editor signs off every page before delivery.",
  includes: [
    "Five competitive SEO landing pages, drafted by AI from your URL",
    "Engineered for AI search — schema, direct answers, and entity signals ChatGPT, Perplexity, and Google AI Overviews pick up",
    "Built for Google too — title tags, meta, internal links, and SERP-shaped structure",
    "One human verification pass per page — facts, structure, and voice signed off",
    "Markdown, MDX, and HTML export for any CMS",
    "One-time purchase. No subscription.",
  ],
};

// Replace with your Stripe Payment Link when ready.
// Until then, this falls back to a mailto so you can quote and invoice manually.
export const CHECKOUT_HREF =
  process.env.NEXT_PUBLIC_CHECKOUT_URL ??
  "mailto:zev@seopage.com?subject=SEOPage%20—%20I%20want%20to%20buy%20a%20%24497%20pack&body=Site%20URL%3A%20%0ACompetitors%20or%20keywords%3A%20%0APage%20types%20you%20want%20%28comparison%2C%20alternatives%2C%20best-of%2C%20FAQ%2C%20category%29%3A%20%0A";

export const NOTIFY_HREF =
  "mailto:zev@seopage.com?subject=SEOPage%20—%20notify%20me%20when%20self-serve%20launches&body=Email%20me%20when%20the%20self-serve%20app%20is%20ready.%20%0A%0AYou%20can%20add%20a%20note%20about%20your%20site%20or%20use%20case%20here%3A%20%0A";

export const pageTypes: PageType[] = [
  {
    key: "vs",
    label: "Comparison",
    subtitle: "X vs Y",
    description:
      "Side-by-side pages for buyers actively comparing two products.",
    intent: "Bottom-of-funnel",
    template: "/clip-art-vs-canva",
  },
  {
    key: "alt",
    label: "Alternatives",
    subtitle: "Alternative to {competitor}",
    description:
      "Pages for searches where someone is unhappy with a tool and looking to switch.",
    intent: "High purchase intent",
    template: "/canva-clip-art-alternative",
  },
  {
    key: "best",
    label: "Best-of",
    subtitle: "Best {category}",
    description:
      "Ranked list pages with a clear methodology and editorial point of view.",
    intent: "Comparison shoppers",
    template: "/best-ai-clip-art-generator",
  },
  {
    key: "faq",
    label: "FAQ hubs",
    subtitle: "Question clusters",
    description:
      "Question clusters that explain a category before the visitor reaches a sales page.",
    intent: "Informational → commercial",
    template: "/faq/seo-landing-pages",
  },
  {
    key: "category",
    label: "Category",
    subtitle: "Niche taxonomy",
    description:
      "Structured category and sub-category pages where a buyer needs orientation.",
    intent: "Browse + buy",
    template: "/category/wireframe-tools",
  },
];

export type IncludedItem = {
  title: string;
  body: string;
};

export const included: IncludedItem[] = [
  {
    title: "AI-researched brief from your URL",
    body: "AI scans your site, your competitors, and the SERP for each target query — then writes the brief that drives the page. The kind of research that takes a day, in minutes.",
  },
  {
    title: "Engineered for AI search citation",
    body: "Each page is structured with the schema, direct answers, FAQ blocks, and entity signals that ChatGPT, Perplexity, Claude, and Google AI Overviews actually pick up when they cite sources.",
  },
  {
    title: "Built for Google too",
    body: "Title tags, meta descriptions, internal-link suggestions, and SERP-shaped sections — comparison tables, alternatives lists, verdicts, category breakdowns — chosen to fit the intent of the search, not stamped on every page.",
  },
  {
    title: "Drafted copy you can edit",
    body: "Working copy for the whole page, written around the structure and the SERP — not a generic prompt or a vague AI blob.",
  },
  {
    title: "Human verification on every page",
    body: "Before delivery, a real editor reads the page end to end. They check facts, tighten the copy, refine voice, and approve the structure. AI doesn't ship to you alone.",
  },
  {
    title: "Clean export",
    body: "Export Markdown, MDX, or HTML and move the page into the CMS or codebase you already use.",
  },
];

export type Step = {
  number: string;
  title: string;
  body: string;
};

export const steps: Step[] = [
  {
    number: "01",
    title: "Send your URL",
    body: "Paste your site URL, list a few competitors, and add any keywords or page ideas you already have.",
  },
  {
    number: "02",
    title: "AI does the research",
    body: "AI reads your site, scans your competitors, and analyzes the SERP for each target query. It builds a structured brief for every page in minutes.",
  },
  {
    number: "03",
    title: "Drafted for AI citation and Google rank",
    body: "AI drafts each page with the schema, direct answers, and entity signals AI search engines reward — and the title, meta, internal links, and structure Google still wants. A real editor reads every page end to end, checks facts, tightens the copy, and signs off.",
  },
  {
    number: "04",
    title: "Export and publish",
    body: "Take the Markdown, MDX, or HTML and publish the page inside the CMS or codebase you already use.",
  },
];

export const faqHome = [
  {
    q: "How are these pages built to get cited by ChatGPT?",
    a: "AI search engines pick sources based on structure, not just content. They reward direct-answer paragraphs, FAQ markup, comparison tables, schema (Article, FAQPage, Product, ItemList), and clear entity signals. Every SEOPage page is engineered around exactly those patterns — so the same page that ranks on Google has the shape ChatGPT, Perplexity, Claude, and Google AI Overviews look for when they cite a source.",
  },
  {
    q: "Why only five pages? Other tools offer 10× more for the price.",
    a: "Because volume isn't the point — pages you can actually publish are. Cheap AI tools ship fast and most of what they produce is invisible to AI search and needs heavy editing before it goes live on Google. Five pages researched against your site, competitors, and the SERP, structured for AI citation, and verified end to end by a real editor, beat fifty pages you'd have to rewrite.",
  },
  {
    q: "What's in the $497 pack?",
    a: "Five competitive landing pages, researched and drafted by AI from your site, your competitors, and the SERP — engineered for AI search citation and Google rank, with one human verification pass per page. Each page includes title and meta tags, FAQ, schema, internal-link suggestions, and Markdown / MDX / HTML export.",
  },
  {
    q: "Is the content AI-generated?",
    a: "Yes — and that's a feature. AI does the research and the drafting at a depth and speed a human can't match: scanning competitors, mapping SERP intent, and building each page in the shape AI search engines reward. A human editor then reads every page end to end and signs off before delivery.",
  },
  {
    q: "What does the human verification actually do?",
    a: "An editor reads the AI draft, checks facts, fixes anything that doesn't hold up, tightens the copy, confirms the schema and structure are clean, and adjusts voice so the page reads like something you'd publish. AI doesn't ship straight to you. Every page has eyes on it.",
  },
  {
    q: "Is this a subscription?",
    a: "No. It's a one-time $497 pack of five pages. Use them, and come back when you want another pack.",
  },
  {
    q: "Does it publish to my site?",
    a: "No. SEOPage gives you Markdown, MDX, or HTML. You move the page into WordPress, Webflow, Framer, Next.js, or whatever you use. Schema and metadata travel with the page so AI search engines and Google can both index it cleanly.",
  },
  {
    q: "How is this different from Surfer / Frase / NeuronWriter?",
    a: "Those tools help you optimize content you've already written for Google blue links. SEOPage creates competitive landing pages from scratch — alternatives, comparisons, best-of, FAQ, category — engineered for AI search citation as well as traditional SEO, using AI for research and drafting with a human verifying every page before delivery.",
  },
  {
    q: "Do you guarantee rankings, traffic, or AI citations?",
    a: "No. SEOPage ships five well-structured pages faster and in better shape than you could write them. Whether they rank, get cited by ChatGPT, or convert still depends on your market, domain, links, product proof, and how well you publish them.",
  },
];
