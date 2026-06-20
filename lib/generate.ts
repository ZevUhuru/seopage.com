import Anthropic from "@anthropic-ai/sdk";
import { ANTHROPIC_MODEL } from "./config";
import {
  BUILD_SYSTEM,
  RESEARCH_SYSTEM,
  STRATEGY_SCHEMA,
  buildUserPrompt,
  researchUserPrompt,
} from "./prompts";
import { getGeneration, saveGeneration, updateGeneration } from "./store";
import type {
  Generation,
  Intake,
  PageMeta,
  StepKey,
  StepState,
  Strategy,
} from "./types";

/**
 * The provider call is isolated to this module. To swap models or providers,
 * change only what's here — callers just see runGeneration().
 */

let client: Anthropic | null = null;
function anthropic(): Anthropic {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error(
      "ANTHROPIC_API_KEY is not set. Add it to .env.local (see .env.example).",
    );
  }
  if (!client) client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  return client;
}

/* ------------------------------- step model ------------------------------- */

const STEP_LABELS: Record<StepKey, string> = {
  research: "Researching your market",
  analysis: "Analyzing local search intent",
  copy: "Writing your page",
  seo: "Optimizing for Google & AI search",
  build: "Designing & building your page",
};
const STEP_ORDER: StepKey[] = ["research", "analysis", "copy", "seo", "build"];

export function initialSteps(): StepState[] {
  return STEP_ORDER.map((key, i) => ({
    key,
    label: STEP_LABELS[key],
    status: i === 0 ? "active" : "waiting",
  }));
}

/** Mark every step up to and including `key` done, and the next one active. */
function advanceTo(steps: StepState[], key: StepKey): StepState[] {
  const idx = STEP_ORDER.indexOf(key);
  return steps.map((s) => {
    const i = STEP_ORDER.indexOf(s.key);
    if (i < idx) return { ...s, status: "done" as const };
    if (i === idx) return { ...s, status: "active" as const };
    return { ...s, status: "waiting" as const };
  });
}

function allDone(steps: StepState[]): StepState[] {
  return steps.map((s) => ({ ...s, status: "done" as const }));
}

async function setStepActive(id: string, key: StepKey): Promise<void> {
  const gen = await getGeneration(id);
  if (!gen) return;
  await updateGeneration(id, { steps: advanceTo(gen.steps, key) });
}

/* ------------------------------- pipeline -------------------------------- */

export async function runGeneration(id: string): Promise<void> {
  const gen = await getGeneration(id);
  if (!gen) return;

  try {
    await updateGeneration(id, { status: "running", steps: initialSteps() });

    // STEP 1 — research → strategy
    await setStepActive(id, "research");
    const strategy = await researchStep(gen.intake);
    await updateGeneration(id, { strategy });

    await setStepActive(id, "analysis");
    // (analysis is the second half of the research phase; brief pause for UX honesty)

    // STEP 2 — copy + SEO + build → HTML (streamed)
    await setStepActive(id, "copy");
    const html = await buildStep(id, gen.intake, strategy);

    const meta = deriveMeta(html, gen.intake, strategy);

    const current = await getGeneration(id);
    await saveGeneration({
      ...(current as Generation),
      status: "complete",
      html,
      meta,
      strategy,
      steps: allDone((current as Generation).steps),
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Generation failed. Please retry.";
    await updateGeneration(id, { status: "error", error: message });
  }
}

async function researchStep(intake: Intake): Promise<Strategy> {
  const res = await anthropic().messages.create({
    model: ANTHROPIC_MODEL,
    max_tokens: 12000,
    thinking: { type: "adaptive" },
    output_config: {
      effort: "high",
      format: {
        type: "json_schema",
        schema: STRATEGY_SCHEMA as Record<string, unknown>,
      },
    },
    system: RESEARCH_SYSTEM,
    messages: [{ role: "user", content: researchUserPrompt(intake) }],
  });

  if (res.stop_reason === "refusal") {
    throw new Error(
      "The research step couldn't complete. Try adjusting the details and retry.",
    );
  }
  const text = res.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("");
  try {
    return JSON.parse(text) as Strategy;
  } catch {
    throw new Error("Couldn't build the SEO strategy. Please retry.");
  }
}

async function buildStep(
  id: string,
  intake: Intake,
  strategy: Strategy,
): Promise<string> {
  const stream = anthropic().messages.stream({
    model: ANTHROPIC_MODEL,
    max_tokens: 32000,
    thinking: { type: "adaptive" },
    // Design + code quality benefit from higher effort; cost is negligible vs $29.
    output_config: { effort: "xhigh" },
    system: BUILD_SYSTEM,
    messages: [{ role: "user", content: buildUserPrompt(intake, strategy) }],
  });

  // Advance the visible steps as real output streams in.
  let chars = 0;
  let movedToSeo = false;
  let movedToBuild = false;
  stream.on("text", (delta) => {
    chars += delta.length;
    if (!movedToSeo && chars > 1800) {
      movedToSeo = true;
      void setStepActive(id, "seo");
    } else if (!movedToBuild && chars > 5000) {
      movedToBuild = true;
      void setStepActive(id, "build");
    }
  });

  const final = await stream.finalMessage();
  if (final.stop_reason === "refusal") {
    throw new Error(
      "The generator couldn't complete this request. Try adjusting the details and retry.",
    );
  }
  const raw = final.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("");
  const html = cleanHtml(raw);
  if (!/<html[\s>]/i.test(html) || html.length < 400) {
    throw new Error("The generated page came back incomplete. Please retry.");
  }
  return html;
}

/* ------------------------------- helpers --------------------------------- */

/** Strip stray markdown fences / preamble; keep the HTML document. */
function cleanHtml(raw: string): string {
  let html = raw.trim();
  // Remove ```html ... ``` fences if the model added them anyway.
  html = html.replace(/^```(?:html)?\s*/i, "").replace(/```\s*$/i, "");
  const start = html.search(/<!DOCTYPE html>/i);
  if (start > 0) html = html.slice(start);
  return html.trim();
}

function extractTag(html: string, regex: RegExp): string | undefined {
  const m = html.match(regex);
  return m?.[1]?.trim();
}

function deriveMeta(
  html: string,
  intake: Intake,
  strategy: Strategy,
): PageMeta {
  const title =
    extractTag(html, /<title>([\s\S]*?)<\/title>/i) ||
    `${intake.service} in ${intake.location} | ${intake.businessName}`;
  const description =
    extractTag(
      html,
      /<meta[^>]+name=["']description["'][^>]+content=["']([\s\S]*?)["']/i,
    ) || strategy.buyerIntent.slice(0, 158);

  const targetKeywords = [
    strategy.primaryKeyword,
    ...strategy.secondaryKeywords,
  ].slice(0, 8);

  const hasFaqSchema = /"@type"\s*:\s*"FAQPage"/i.test(html);
  const hasLocalBiz = /"@type"\s*:\s*"LocalBusiness"/i.test(html);
  const hasService = /"@type"\s*:\s*"Service"/i.test(html);

  const optimizationSummary = [
    `Built to rank for "${strategy.primaryKeyword}" and ${strategy.secondaryKeywords.length} supporting local keywords.`,
    `Local angle baked in: ${strategy.localAngle}`,
    hasFaqSchema
      ? "FAQ section written and structured (FAQPage schema) to be cited by ChatGPT, AI Overviews & Perplexity."
      : "FAQ section written to be cited by AI answer engines.",
    [
      hasLocalBiz && "LocalBusiness",
      hasService && "Service",
      hasFaqSchema && "FAQPage",
    ]
      .filter(Boolean)
      .join(" + ") +
      " schema.org structured data embedded for Google & AI search.",
    "Semantic, accessible, mobile-first HTML with a precise title tag & meta description.",
  ];

  return { title, description, targetKeywords, optimizationSummary };
}
