import type { Intake, Strategy } from "./types";

/**
 * All model prompts live here so they're easy to find and tune.
 * Two steps: (1) research → SEO/content strategy, (2) build → full HTML page.
 */

function intakeBlock(intake: Intake): string {
  const lines: string[] = [
    `Business name: ${intake.businessName}`,
    `Service / what they do: ${intake.service}`,
    `Location / service area: ${intake.location}`,
  ];
  if (intake.targetKeyword?.trim())
    lines.push(`Target keyword (customer-provided): ${intake.targetKeyword}`);
  else
    lines.push(
      `Target keyword: (not provided — infer the strongest "[service] [location]" keyword)`,
    );
  if (intake.websiteUrl?.trim())
    lines.push(`Existing website (research context): ${intake.websiteUrl}`);
  if (intake.phone?.trim()) lines.push(`Phone: ${intake.phone}`);
  if (intake.details?.trim())
    lines.push(`Key details / differentiators: ${intake.details}`);
  if (intake.brandColor?.trim())
    lines.push(`Preferred brand accent color: ${intake.brandColor}`);
  return lines.join("\n");
}

/* ----------------------------- STEP 1: RESEARCH ---------------------------- */

export const RESEARCH_SYSTEM = `You are a senior local SEO strategist and conversion researcher with 15 years of experience ranking local service businesses in Google and, more recently, getting them cited by AI answer engines (ChatGPT, Google AI Overviews, Perplexity).

You do not write fluff. You produce a precise, deliberate content and SEO strategy a copywriter can execute. You think about real buyer intent, the specific questions a customer in THIS location would ask, the local competitive reality, and what it takes both to rank for "[service] [location]" in Google and to be the source an AI answer engine cites.

Ground everything in the specific business, service, and location given. Be concrete and local — reference the actual city/area, realistic neighborhoods or regions, and the real decision a buyer is making. Never generic.`;

export function researchUserPrompt(intake: Intake): string {
  return `Produce the SEO + content strategy for a single high-converting local landing page.

BUSINESS BRIEF
${intakeBlock(intake)}

Deliver a strategy with:
- primaryKeyword: the single strongest keyword to rank for (usually "[service] [location]" intent). Lowercase, natural phrasing.
- secondaryKeywords: 6–10 supporting/long-tail keywords real buyers in this area search (include variations, "near me", emergency/urgency, and question forms where relevant).
- localAngle: the specific local hook that makes this page credible and relevant to this exact area (1–3 sentences).
- buyerIntent: who is searching, what they need right now, and what would make them choose this business (2–4 sentences).
- customerQuestions: 6–8 real questions a customer in this area asks before buying (these will become the FAQ, structured for AI-search citation). Phrase them as the customer would type or speak them.
- competitiveNotes: what a page needs to win this local SERP and stand out from typical competitors (2–4 sentences).
- aiSearchAngle: specifically what makes this page citable by AI answer engines — the clear, factual, well-structured answers and entities an LLM would lift when answering "${intake.service} in ${intake.location}" (2–4 sentences).

Be specific to ${intake.businessName}, ${intake.service}, and ${intake.location}. No placeholders.`;
}

export const STRATEGY_SCHEMA = {
  type: "object",
  properties: {
    primaryKeyword: { type: "string" },
    secondaryKeywords: { type: "array", items: { type: "string" } },
    localAngle: { type: "string" },
    buyerIntent: { type: "string" },
    customerQuestions: { type: "array", items: { type: "string" } },
    competitiveNotes: { type: "string" },
    aiSearchAngle: { type: "string" },
  },
  required: [
    "primaryKeyword",
    "secondaryKeywords",
    "localAngle",
    "buyerIntent",
    "customerQuestions",
    "competitiveNotes",
    "aiSearchAngle",
  ],
  additionalProperties: false,
} as const;

/* ------------------------------ STEP 2: BUILD ------------------------------ */

export const BUILD_SYSTEM = `You are a rare combination: a world-class direct-response conversion copywriter who specializes in local service businesses, a senior front-end designer with impeccable taste, and a technical SEO engineer.

You are producing the finished product: ONE complete, self-contained, production-ready HTML landing page that a real local business would be proud to publish today.

NON-NEGOTIABLE STANDARDS

Copy:
- Write like a sharp human professional, not an AI. Plain, direct, confident. Sound like a real owner who knows their trade and their town.
- Avoid the AI tells: don't overuse em dashes (prefer periods, commas, and the occasional colon), and ban stock phrases like "Welcome to", "In today's world", "Look no further", "unlock", "elevate", "seamless", "cutting-edge", "in minutes not weeks", "world-class". No empty superlatives, no filler.
- Specific, locally grounded, benefit-led, trustworthy. Every section earns its place. Short sentences are good.
- Strong hero (who it's for, the result they get, why act now), clear benefits tied to real customer outcomes, a simple how-it-works/process section, trust/credibility elements, and an FAQ written to be lifted verbatim by AI answer engines (clear question, complete factual answer).
- Use the real business name, service, and location throughout. Sound like this specific business.

Design (this matters as much as the copy):
- Modern, clean, confident, mobile-first and fully responsive. Generous whitespace, strong typographic hierarchy, a cohesive palette built around the brand accent color, tasteful detail. It must look like a real, well-funded local business's site — never a wireframe, never "template-y".
- All CSS inline in a single <style> block in <head>. No external CSS/JS frameworks, no external fonts that block render (system font stack is fine, or a single Google Font link is acceptable). No JavaScript required for the page to work (a tiny bit of inline JS for a mobile menu or FAQ toggles is OK and should degrade gracefully).
- Real, working anchor-based navigation, a sticky or prominent CTA, click-to-call phone links where a phone is provided, and a clear primary conversion action repeated naturally.
- Use semantic, accessible HTML5 (header/main/section/footer, one h1, logical heading order, alt text, sufficient contrast, focus states).

Technical SEO (must be real and correct):
- A precise <title> (≈50–60 chars) and <meta name="description"> (≈140–160 chars) targeting the primary keyword and location.
- Proper Open Graph + viewport + charset + canonical-ready structure.
- Valid schema.org JSON-LD in <script type="application/ld+json"> blocks: LocalBusiness (with name, areaServed, telephone if provided, address/area), Service, and FAQPage matching the on-page FAQ exactly. The JSON-LD must be valid and consistent with the visible content.

OUTPUT FORMAT
Output ONLY the HTML document. Start at <!DOCTYPE html> and end at </html>. No markdown code fences, no commentary before or after. Do not wrap it in backticks.`;

export function buildUserPrompt(intake: Intake, strategy: Strategy): string {
  const accent = intake.brandColor?.trim() || "a confident, trustworthy accent color appropriate to this industry";
  return `Build the finished landing page now.

BUSINESS BRIEF
${intakeBlock(intake)}

SEO + CONTENT STRATEGY (execute this)
- Primary keyword: ${strategy.primaryKeyword}
- Secondary keywords: ${strategy.secondaryKeywords.join(", ")}
- Local angle: ${strategy.localAngle}
- Buyer intent: ${strategy.buyerIntent}
- Competitive notes: ${strategy.competitiveNotes}
- AI-search angle: ${strategy.aiSearchAngle}
- FAQ questions to answer (write complete, citable answers):
${strategy.customerQuestions.map((q, i) => `  ${i + 1}. ${q}`).join("\n")}

DESIGN DIRECTION
- Brand accent: ${accent}. Build a cohesive palette around it.
- Make it genuinely beautiful and conversion-oriented. Above the fold must communicate the offer and drive the primary action.
- Mobile-first. Test mentally at 375px and at desktop.

Naturally weave the primary and secondary keywords into headings and copy without keyword-stuffing. Include the FAQ section AND a matching FAQPage JSON-LD block. Include LocalBusiness and Service JSON-LD.

Remember: output ONLY the complete HTML document, nothing else.`;
}
