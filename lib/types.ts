/** Shared types for the generation pipeline and storage. */

/** Raw intake collected from the form. Only the first three are required. */
export type Intake = {
  businessName: string;
  service: string;
  location: string;
  // Prompted but optional — inferred when blank.
  targetKeyword?: string;
  // Optional enhancers.
  websiteUrl?: string;
  details?: string;
  phone?: string;
  brandColor?: string;
};

/** SEO + content strategy produced by the research step. */
export type Strategy = {
  primaryKeyword: string;
  secondaryKeywords: string[];
  localAngle: string;
  buyerIntent: string;
  customerQuestions: string[];
  competitiveNotes: string;
  aiSearchAngle: string;
};

/** Page metadata + a short value summary shown to the user. */
export type PageMeta = {
  title: string; // <title> tag
  description: string; // meta description
  targetKeywords: string[];
  optimizationSummary: string[]; // bullet points of what was optimized
};

/** Lifecycle of a generation job. */
export type GenStatus = "pending" | "running" | "complete" | "error";

/** A single step shown in the premium "generating" UI. */
export type StepKey = "research" | "analysis" | "copy" | "seo" | "build";

export type StepState = {
  key: StepKey;
  label: string;
  status: "waiting" | "active" | "done";
};

/** The full record stored server-side, keyed by generation id. */
export type Generation = {
  id: string;
  status: GenStatus;
  createdAt: number;
  intake: Intake;
  steps: StepState[];
  error?: string;
  // Populated once complete:
  strategy?: Strategy;
  meta?: PageMeta;
  html?: string; // full, self-contained, production-ready page (no watermark)
  // Payment / unlock:
  paid: boolean;
  stripeSessionId?: string;
};

/** Lifecycle of a paid done-for-you order. */
export type OrderStatus = "awaiting_intake" | "in_progress" | "delivered";

/**
 * A paid pay-first order: created when Stripe confirms payment, enriched by
 * the /order intake form, fulfilled by hand from /admin.
 */
export type Order = {
  id: string;
  stripeSessionId: string;
  email: string;
  status: OrderStatus;
  createdAt: number;
  deliveredAt?: number;
  // The high-value intake, filled in after payment:
  businessName?: string;
  websiteUrl?: string;
  targetKeyword?: string;
  service?: string;
  location?: string;
  competitors?: string;
  audience?: string;
  goal?: "rank" | "leads" | "sales";
  internalLinks?: string;
  brandColor?: string;
  phone?: string;
  notes?: string;
  // Fulfillment: the generation whose reviewed HTML gets delivered.
  generationId?: string;
};

/** Public-facing view of a generation (never leaks full HTML until paid). */
export type GenerationView = {
  id: string;
  status: GenStatus;
  steps: StepState[];
  error?: string;
  meta?: PageMeta;
  paid: boolean;
  // Watermarked/preview HTML is provided separately by the preview route.
  hasResult: boolean;
};
