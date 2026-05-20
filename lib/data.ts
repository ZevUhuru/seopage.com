export type PageTypeKey = "vs" | "alt" | "best" | "faq" | "category";

export type PageType = {
  key: PageTypeKey;
  label: string;
  subtitle: string;
  description: string;
  intent: string;
  metric: { value: string; unit: string };
  template: string;
};

export const pageTypes: PageType[] = [
  {
    key: "vs",
    label: "Comparison",
    subtitle: "X vs Y",
    description:
      "Side-by-side pages for people comparing two products. Includes fit, pricing notes, tradeoffs, and a clear editorial verdict.",
    intent: "Commercial · Bottom-of-funnel",
    metric: { value: "Buyer intent", unit: "best fit" },
    template: "/clip-art-vs-canva",
  },
  {
    key: "alt",
    label: "Alternatives",
    subtitle: "Alternative to {competitor}",
    description:
      "Pages for searches where someone is unhappy with a tool and actively looking for a replacement.",
    intent: "High purchase intent",
    metric: { value: "Switching", unit: "search intent" },
    template: "/canva-clip-art-alternative",
  },
  {
    key: "best",
    label: "Best-of lists",
    subtitle: "Best {category}",
    description:
      "Ranked list pages with a methodology, category notes, and room for your own testing or editorial judgment.",
    intent: "Comparison shoppers",
    metric: { value: "Research", unit: "search intent" },
    template: "/best-ai-clip-art-generator",
  },
  {
    key: "faq",
    label: "FAQ hubs",
    subtitle: "Question clusters",
    description:
      "Question clusters that help explain a product, category, or buying decision before the visitor reaches a sales page.",
    intent: "Informational → commercial",
    metric: { value: "Long-tail", unit: "coverage" },
    template: "/faq/seo-landing-pages",
  },
  {
    key: "category",
    label: "Category pages",
    subtitle: "Niche taxonomy",
    description:
      "Structured category and sub-category pages where the visitor needs orientation before choosing.",
    intent: "Browse + buy",
    metric: { value: "Catalog", unit: "structure" },
    template: "/category/wireframe-tools",
  },
];

export type Opportunity = {
  query: string;
  type: PageTypeKey;
  volume: number;
  difficulty: "Low" | "Medium" | "High";
  intent: "Comparison" | "Alternative" | "Best-of" | "FAQ" | "Category";
};

export const demoOpportunities: Opportunity[] = [
  { query: "best AI clip art generator", type: "best", volume: 12100, difficulty: "Medium", intent: "Best-of" },
  { query: "canva clip art alternative", type: "alt", volume: 5400, difficulty: "Medium", intent: "Alternative" },
  { query: "clip.art vs canva", type: "vs", volume: 1900, difficulty: "Low", intent: "Comparison" },
  { query: "free clip art generator", type: "category", volume: 14800, difficulty: "High", intent: "Category" },
  { query: "school clip art for teachers", type: "category", volume: 6600, difficulty: "Medium", intent: "Category" },
  { query: "transparent png clip art", type: "category", volume: 8100, difficulty: "Medium", intent: "Category" },
  { query: "how to make custom clip art", type: "faq", volume: 2900, difficulty: "Low", intent: "FAQ" },
  { query: "best free canva alternative for clip art", type: "alt", volume: 1700, difficulty: "Low", intent: "Alternative" },
];

export type Feature = {
  title: string;
  body: string;
  tag: string;
};

export const includedFeatures: Feature[] = [
  {
    tag: "01 / Brief",
    title: "A clear page brief",
    body:
      "Each page starts with the target query, search intent, page type, and the angle the page is taking.",
  },
  {
    tag: "02 / Structure",
    title: "A page outline that matches intent",
    body:
      "Comparison tables, alternatives lists, FAQ sections, verdict blocks, and category sections are included when they fit the page type.",
  },
  {
    tag: "03 / Copy",
    title: "Copy you can actually edit",
    body:
      "The output gives you the working copy for the page, written around the structure and search intent instead of a generic prompt.",
  },
  {
    tag: "04 / Conversion",
    title: "Places for the selling points",
    body:
      "Each page includes CTAs, objection sections, comparison notes, and places to add proof once you have real examples or customer quotes.",
  },
  {
    tag: "05 / SEO basics",
    title: "Metadata, FAQ, and schema",
    body:
      "Title tags, meta descriptions, FAQ copy, schema suggestions, and internal-link suggestions are included.",
  },
  {
    tag: "06 / Export",
    title: "Clean export",
    body:
      "Export clean copy, Markdown, MDX, or HTML and move the page into the CMS or codebase you already use.",
  },
];

export type StackStep = {
  number: string;
  title: string;
  body: string;
  detail: string;
};

export const stackSteps: StackStep[] = [
  {
    number: "01",
    title: "Submit",
    body: "Paste your URL and add any competitors or page ideas you already have. SEOPage uses that context to understand what the page should sell.",
    detail: "URL · competitors · product notes",
  },
  {
    number: "02",
    title: "Choose",
    body: "Pick from page ideas like alternatives, comparison pages, best-of pages, FAQ hubs, and category pages.",
    detail: "Intent · page type · angle",
  },
  {
    number: "03",
    title: "Generate",
    body: "Generate a structured SEO landing page with title/meta, sections, tables where useful, FAQ, schema suggestions, and internal-link suggestions.",
    detail: "Templates · landing page · export notes",
  },
  {
    number: "04",
    title: "Export",
    body: "Export the SEO landing page to copy, Markdown, MDX, or HTML so you can move it into your publishing workflow.",
    detail: "Copy · Markdown · HTML",
  },
];

export type ExamplePage = {
  slug: string;
  type: PageTypeKey;
  title: string;
  subtitle: string;
  query: string;
  monthlySearches: number;
  difficulty: "Low" | "Medium" | "High";
  intent: string;
  competitors?: { a: string; b: string };
  verdict: string;
  highlights: string[];
  faq: { q: string; a: string }[];
  schema: string[];
};

export const examplePages: ExamplePage[] = [
  {
    slug: "clip-art-vs-canva",
    type: "vs",
    title: "clip.art vs Canva",
    subtitle: "Which one is better for fast, reusable clip art?",
    query: "clip.art vs canva",
    monthlySearches: 1900,
    difficulty: "Medium",
    intent: "Commercial · ready to choose",
    competitors: { a: "clip.art", b: "Canva" },
    verdict:
      "Pick clip.art when you want purpose-built, export-ready clip art fast. Pick Canva when you want a broader design suite with clip art as one asset type inside a larger editor.",
    highlights: [
      "Side-by-side table for generation, editing, export, and licensing",
      "Use-case matrix: teachers, printables, small business, POD, social",
      "When to use a focused clip art generator vs a general design tool",
      "Internal links to clip.art categories and create flow",
    ],
    faq: [
      { q: "Is clip.art better than Canva for clip art?", a: "For people who mainly want clip art assets, clip.art is more focused. Canva is better when the clip art is only one part of a larger design workflow." },
      { q: "Can I use generated clip art commercially?", a: "A real page should explain the current licensing terms clearly and link to the relevant policy before making commercial-use claims." },
      { q: "Which is faster for transparent PNG clip art?", a: "A focused generator can make the path from prompt to reusable asset shorter, especially when transparent export is central to the workflow." },
    ],
    schema: ["Article", "FAQPage", "BreadcrumbList", "Organization"],
  },
  {
    slug: "canva-clip-art-alternative",
    type: "alt",
    title: "Canva clip art alternative",
    subtitle: "For people who want clip art assets, not a full design workspace.",
    query: "canva clip art alternative",
    monthlySearches: 5400,
    difficulty: "Medium",
    intent: "Switching · evaluating",
    verdict:
      "If your main job is generating reusable clip art, start with a focused clip art tool. If you need layouts, social posts, decks, and brand kits in the same place, Canva still has the broader workspace.",
    highlights: [
      "Why people look for a Canva alternative for clip art",
      "Focused generator vs general design suite comparison",
      "Use cases for teachers, crafters, printables, and small shops",
      "CTA into clip.art's generator and relevant categories",
    ],
    faq: [
      { q: "What is the best Canva alternative for clip art?", a: "The best choice depends on whether you want a focused generator, a marketplace, or a full design editor. clip.art can position around fast generation and reusable exports." },
      { q: "Why use a clip art generator instead of Canva?", a: "A focused generator can reduce steps when the goal is to make a standalone asset rather than a complete design." },
      { q: "What should a Canva alternative page include?", a: "It should compare workflow, output formats, licensing, speed, use cases, and when Canva is still the better option." },
    ],
    schema: ["ItemList", "FAQPage", "BreadcrumbList", "Article"],
  },
  {
    slug: "best-ai-clip-art-generator",
    type: "best",
    title: "Best AI clip art generator",
    subtitle: "A sample best-of page for people comparing AI clip art tools.",
    query: "best AI clip art generator",
    monthlySearches: 12100,
    difficulty: "Medium",
    intent: "Researching · comparing",
    verdict:
      "This sample page uses a rubric format to compare AI clip art tools and show how a best-of page can be organized.",
    highlights: [
      "Scoring rubric: output quality, export format, licensing, speed, and ease of reuse",
      "Use-case sections for teachers, creators, marketers, and small businesses",
      "Comparison table for focused generators vs design suites",
      "FAQ for commercial use, transparent PNGs, and free options",
    ],
    faq: [
      { q: "What is the best AI clip art generator?", a: "A strong answer depends on the desired output: transparent PNGs, classroom assets, stickers, printables, or commercial graphics." },
      { q: "Can AI clip art be used commercially?", a: "A real page should answer this with current licensing terms and avoid vague claims." },
      { q: "What should I look for in an AI clip art generator?", a: "Look for style control, clean exports, transparent backgrounds, licensing clarity, generation speed, and category coverage." },
    ],
    schema: ["ItemList", "Article", "FAQPage", "BreadcrumbList"],
  },
];

export const trustLogos = [
  "Built first on our own sites",
  "Competitive SEO landing page types",
  "SEO landing page packs",
];

export const testimonials = [
  {
    quote:
      "SEOPage is launching as a beta. The point is to learn which competitive SEO landing pages buyers actually want, not pretend the product already has years of outcomes.",
    name: "Beta note",
    company: "SEOPage",
  },
  {
    quote:
      "Generated SEO landing pages include the structure and copy. You can then tune product claims, pricing, and brand voice for your site.",
    name: "Publishing note",
    company: "SEOPage",
  },
  {
    quote:
      "The first version focuses on SEO landing page generation and clean export, so you can get useful SEO landing pages without setting up a full CMS integration.",
    name: "Roadmap note",
    company: "SEOPage",
  },
];

export const faqHome = [
  {
    q: "Is this just an AI writer with a prompt?",
    a: "No. It uses page-type templates, your URL, competitor notes, and a structured brief to produce one specific SEO landing page instead of a loose block of AI copy.",
  },
  {
    q: "Will Google penalize AI content?",
    a: "Google cares about usefulness, accuracy, and whether the page deserves to exist. SEOPage helps create the page structure and copy, but you should still check claims and add real product knowledge.",
  },
  {
    q: "Does it actually publish to my site?",
    a: "SEOPage gives you clean SEO landing page copy, Markdown, MDX, or HTML that you can move into your CMS. That keeps the workflow simple and avoids locking you into a publishing system.",
  },
  {
    q: "How is this different from Surfer / Frase / NeuronWriter?",
    a: "Those products help optimize existing content. SEOPage is aimed at creating competitive SEO landing pages from scratch: alternatives, comparisons, best-of lists, FAQ hubs, and category pages.",
  },
  {
    q: "What about programmatic SEO?",
    a: "SEO landing page packs are the launch offer because they are easier to judge: generate a few high-intent SEO landing pages, publish the ones you like, then decide whether larger batches are worth it.",
  },
  {
    q: "Do you guarantee rankings or traffic?",
    a: "No. SEOPage helps you create useful, search-shaped SEO landing pages faster. Rankings, traffic, rich results, and revenue still depend on your market, domain, links, product proof, and publishing quality.",
  },
];
