export type ChannelKey = "chatgpt" | "google-ai" | "perplexity" | "claude";

export type Channel = {
  key: ChannelKey;
  label: string;
  subtitle: string;
  description: string;
  behavior: string;
};

export const offer = {
  price: 149,
  priceLabel: "$149",
  period: "/month",
  pages: 5,
  promptsPerPage: 20,
  freeReportLabel: "First report free",
  pitch:
    "Paste a URL. SEOPage runs the buyer questions that page should win across ChatGPT, Google AI Overviews, Perplexity, and Claude — and sends you a report showing where you're cited, who gets cited instead, and exactly what to fix. Your first report is free.",
  includes: [
    "Track up to 5 pages (URLs) — yours or a client's",
    "20 buyer prompts per page, generated from the page itself — editable any time",
    "All 4 AI channels: ChatGPT, Google AI Overviews & Gemini, Perplexity, Claude",
    "Cited / mentioned / absent on every prompt, with the full AI answer saved as evidence",
    "Recommended vs neutral vs warned-against — framing scored, not just presence",
    "Competitor gap: which pages get cited instead of yours, prompt by prompt",
    "AI-readiness score per page — schema, direct answers, FAQ, entity signals, crawler access",
    "A prioritized fix list, not a dashboard — what to change on the page, in order",
    "Weekly re-runs with movement vs last week",
    "Shareable report link + PDF export — client-ready for agencies",
    "First paid month fully refundable — one email, no questions asked",
    "Cancel anytime",
  ],
};

export const START_HREF = "/start";

// Stripe Price for the $149/mo plan. Used when checkout is wired
// (Payment Link or Checkout Session must reference this price).
8
// Until then, this falls back to a mailto so you can quote and invoice manually.
export const CHECKOUT_HREF =
  process.env.NEXT_PUBLIC_CHECKOUT_URL ??
  "mailto:support@seopage.com?subject=SEOPage%20—%20subscribe%20at%20%24149%2Fmo&body=Page%20URL%28s%29%20to%20track%3A%20%0ACompetitors%3A%20%0AAnything%20else%3A%20%0A";

export const CALL_HREF =
  "mailto:support@seopage.com?subject=SEOPage%20—%2015-minute%20fit%20call&body=Page%20URL%3A%20%0AWhat%20you%20want%20to%20figure%20out%3A%20%0A";

export const FIRST_REPORT_HREF =
  "mailto:support@seopage.com?subject=SEOPage%20—%20run%20my%20first%20AI%20Rank%20Report&body=Page%20URL%3A%20%0AWhat%20the%20page%20sells%20or%20answers%3A%20%0ACompetitors%3A%20%0A";

export const channels: Channel[] = [
  {
    key: "chatgpt",
    label: "ChatGPT",
    subtitle: "OpenAI · ChatGPT Search",
    description:
      "The largest AI answer surface — roughly two-thirds of generative AI traffic. Conversational mentions, web citations in search mode.",
    behavior: "Names brands freely; links mostly in search mode",
  },
  {
    key: "google-ai",
    label: "Google AI Overviews",
    subtitle: "AI Overviews · AI Mode · Gemini",
    description:
      "AI answers sitting on top of the world's biggest search engine. Overlap with classic top-10 rankings has collapsed — ranking #1 no longer guarantees you're in the Overview.",
    behavior: "Cites sources inline; structure-sensitive",
  },
  {
    key: "perplexity",
    label: "Perplexity",
    subtitle: "Answer engine",
    description:
      "Every answer ships with inline source citations. The clearest, most attributable AI channel — and the one where citation gaps are most visible.",
    behavior: "Always cites; rewards extractable pages",
  },
  {
    key: "claude",
    label: "Claude",
    subtitle: "Anthropic",
    description:
      "The most selective engine — it names noticeably fewer companies than ChatGPT or Gemini. Being recommended here is the hardest signal to earn.",
    behavior: "Selective; recommendation carries weight",
  },
];

export type IncludedItem = {
  title: string;
  body: string;
};

export const included: IncludedItem[] = [
  {
    title: "Buyer prompts generated from your page",
    body: "Most teams don't know which AI questions decide their deals. SEOPage reads the page and writes the 20 buyer prompts it should win — \"best X for Y,\" \"X vs Y,\" \"is X worth it\" — and you can edit every one.",
  },
  {
    title: "Cited, mentioned, or absent — per prompt, per channel",
    body: "There's no position 1–100 inside an AI answer. Either your page is in it or it isn't. Every prompt gets a verdict on each of the 4 channels, so you see exactly where you exist and where you're invisible.",
  },
  {
    title: "Full answer evidence, not yes/no flags",
    body: "Every AI response is captured in full and saved with the report. When you tell a client or your boss \"ChatGPT recommends us,\" you have the receipt.",
  },
  {
    title: "Framing score: recommended, neutral, or warned against",
    body: "A mention isn't a win. The report scores how each engine frames you — top recommendation, runner-up, or a comparison that steers buyers elsewhere. A negative mention is worse than none.",
  },
  {
    title: "Competitor citation gap",
    body: "For every prompt you lose, the report shows which page got cited instead — the exact URLs the engines trust over yours. That list is your content roadmap.",
  },
  {
    title: "AI-readiness score + prioritized fix list",
    body: "The page itself is audited across the signals engines extract from: schema, direct-answer paragraphs, FAQ blocks, heading clarity, entity signals, crawler access. You get an ordered fix list — change this first, then this.",
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
    title: "Paste your page URL",
    body: "One URL — a landing page, product page, comparison page, or blog post. Add competitors if you want the gap analysis sharper.",
  },
  {
    number: "02",
    title: "We build the prompt set",
    body: "SEOPage reads the page and generates the 20 buyer questions it should win in AI search. You review and edit the list — then it's locked in as your tracking set.",
  },
  {
    number: "03",
    title: "We run all 4 AI channels",
    body: "Every prompt runs against ChatGPT, Google AI Overviews & Gemini, Perplexity, and Claude. Full answers are captured and scored: cited, mentioned, or absent — and how you're framed.",
  },
  {
    number: "04",
    title: "You get the report — then weekly",
    body: "One report: your AI rank per channel, the competitor pages beating you, your page's AI-readiness score, and a prioritized fix list. Re-run weekly so you see movement.",
  },
];

export const faqHome = [
  {
    q: "What exactly does the report tell me?",
    a: "For one page, across 20 buyer prompts and 4 AI channels: whether the page is cited, mentioned, or absent in each answer; whether the engine recommends you, stays neutral, or steers buyers elsewhere; which competitor URLs get cited when you don't; and an AI-readiness audit of the page itself with a prioritized fix list. Every AI answer is saved in full as evidence.",
  },
  {
    q: "Which AI channels do you check?",
    a: "ChatGPT (including ChatGPT Search), Google AI Overviews and Gemini, Perplexity, and Claude. Those four cover the overwhelming majority of AI-assisted buying research in 2026. Tools that only check ChatGPT aren't telling you enough — each engine selects sources differently.",
  },
  {
    q: "How is this different from my rank tracker?",
    a: "Rank trackers measure blue-link positions. There is no position 1–100 inside an AI answer — your page is either in the answer or it isn't. The overlap between top Google results and AI-cited sources has dropped below 20%, so ranking #1 on Google no longer means ChatGPT or Perplexity will cite you. This is a different surface and it needs its own measurement.",
  },
  {
    q: "Why track pages instead of my brand?",
    a: "Brand monitoring tells you that you were mentioned somewhere. Page tracking tells you which URL earns the citation, which competitor URL beats it, and what to change on that specific page. Citations happen at the page level — so that's where SEOPage measures, and that's where you can actually act.",
  },
  {
    q: "Where do the prompts come from?",
    a: "SEOPage generates them from the page itself: what it sells, who it's for, and the comparison and recommendation questions buyers actually ask AI assistants. You can edit, delete, or add prompts before the run — and any time after. Most customers refine the set once and let it run.",
  },
  {
    q: "Is this a one-time report or a subscription?",
    a: "Your first report is free — one page, all 4 channels, no card. After that it's a subscription: $149/month, one plan, everything included, cancel anytime — and your first paid month is fully refundable, no questions asked. AI answers change constantly as models update and competitors publish, so a one-time snapshot goes stale in weeks. Your pages re-run weekly and every report shows movement against the last one.",
  },
  {
    q: "What's in the free first report?",
    a: "The real thing, on one page: 20 generated buyer prompts, all 4 AI channels, cited / mentioned / absent verdicts, framing, competitor gap, and the AI-readiness fix list. No credit card. If the report shows you're invisible somewhere that matters, that's when the weekly tracking earns its $149.",
  },
  {
    q: "I'm an agency. Can I use this for clients?",
    a: "Yes — that's half the point. Track client pages, and every report has a shareable link and PDF export with the full answer evidence attached. \"Perplexity cites your competitor on 14 of 20 buying questions\" is the strongest retainer-justifying sentence in SEO right now, and you'll have the receipts.",
  },
  {
    q: "Will this improve my AI rankings, or just measure them?",
    a: "The report measures, then tells you exactly what to change: which prompts you're losing, which competitor pages win them and why, and an ordered fix list for your page — schema, direct answers, FAQ blocks, entity signals, crawler access. You (or your team) make the changes; the weekly re-run shows whether they worked.",
  },
  {
    q: "Do you guarantee citations?",
    a: "No — anyone who does is lying to you. AI engines weigh your market, your authority, and your content. What SEOPage guarantees is that you'll know exactly where your page stands on every channel, who's beating you, and what to fix — with evidence, every week.",
  },
];

/* Sample report data used to render the report preview on the homepage. */
export type SampleVerdict = "cited" | "mentioned" | "absent";

export type SampleRow = {
  prompt: string;
  verdicts: Record<ChannelKey, SampleVerdict>;
  losesTo?: string;
};

export const sampleRows: SampleRow[] = [
  {
    prompt: "best ai clip art generator",
    verdicts: {
      chatgpt: "cited",
      "google-ai": "cited",
      perplexity: "cited",
      claude: "mentioned",
    },
  },
  {
    prompt: "clip art tool vs canva",
    verdicts: {
      chatgpt: "cited",
      "google-ai": "mentioned",
      perplexity: "cited",
      claude: "absent",
    },
    losesTo: "canva.com/learn",
  },
  {
    prompt: "is clip.art worth paying for",
    verdicts: {
      chatgpt: "mentioned",
      "google-ai": "absent",
      perplexity: "cited",
      claude: "absent",
    },
    losesTo: "reddit.com/r/graphic_design",
  },
  {
    prompt: "free clip art for commercial use",
    verdicts: {
      chatgpt: "absent",
      "google-ai": "absent",
      perplexity: "mentioned",
      claude: "absent",
    },
    losesTo: "openclipart.org",
  },
];
