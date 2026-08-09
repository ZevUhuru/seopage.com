"use client";

import { useCallback, useState } from "react";
import { Field } from "./Field";

/**
 * The post-payment brief — the professional intake, compressed. Agency
 * questionnaires run 30–50 questions across business, audience, competitors,
 * keywords, and goals; this covers every category with structured fields the
 * buyer can finish in ~5 minutes. They've already paid, so depth here is
 * safe — and every answer directly shapes the page.
 */

type Form = {
  email: string;
  // The business
  businessName: string;
  websiteUrl: string;
  industry: string;
  service: string;
  usp: string;
  // The search
  targetKeyword: string;
  location: string;
  serviceArea: string;
  competitors: string;
  audience: string;
  // The goal
  goal: "" | "rank" | "leads" | "sales" | "authority";
  conversionAction:
    | ""
    | "call"
    | "book"
    | "form"
    | "email_optin"
    | "buy"
    | "visit";
  conversionTarget: string;
  // Extras
  tone: string;
  internalLinks: string;
  brandColor: string;
  phone: string;
  notes: string;
};

const EMPTY: Form = {
  email: "",
  businessName: "",
  websiteUrl: "",
  industry: "",
  service: "",
  usp: "",
  targetKeyword: "",
  location: "",
  serviceArea: "",
  competitors: "",
  audience: "",
  goal: "",
  conversionAction: "",
  conversionTarget: "",
  tone: "",
  internalLinks: "",
  brandColor: "",
  phone: "",
  notes: "",
};

const GOALS: { value: Form["goal"]; label: string; hint: string }[] = [
  { value: "rank", label: "Rank & get found", hint: "Bring in search + AI traffic" },
  { value: "leads", label: "Generate leads", hint: "Calls, forms, bookings" },
  { value: "sales", label: "Drive sales", hint: "Purchases or signups" },
  { value: "authority", label: "Build authority", hint: "Be the trusted answer" },
];

const CONVERSIONS: {
  value: Form["conversionAction"];
  label: string;
  targetLabel: string;
  targetPlaceholder: string;
}[] = [
  {
    value: "call",
    label: "Call my business",
    targetLabel: "Phone number to feature",
    targetPlaceholder: "(303) 555-0142",
  },
  {
    value: "book",
    label: "Book a call / appointment",
    targetLabel: "Booking link",
    targetPlaceholder: "https://calendly.com/you",
  },
  {
    value: "form",
    label: "Fill out a contact form",
    targetLabel: "Where should the form/button send them?",
    targetPlaceholder: "https://yourbusiness.com/contact",
  },
  {
    value: "email_optin",
    label: "Join my email list",
    targetLabel: "Signup link (or tell us to build the form in)",
    targetPlaceholder: "https://yourbusiness.com/newsletter",
  },
  {
    value: "buy",
    label: "Buy on my site",
    targetLabel: "Product / checkout URL",
    targetPlaceholder: "https://yourbusiness.com/product",
  },
  {
    value: "visit",
    label: "Visit in person",
    targetLabel: "Address to feature",
    targetPlaceholder: "123 Main St, Denver, CO",
  },
];

function SectionHead({ n, title, hint }: { n: string; title: string; hint?: string }) {
  return (
    <div className="border-b border-line pb-3">
      <p className="mono text-[11px] uppercase tracking-[0.14em] text-accent">
        {n}
      </p>
      <h3 className="mt-1 text-lg font-semibold text-ink">{title}</h3>
      {hint && <p className="mt-1 text-sm text-muted">{hint}</p>}
    </div>
  );
}

export function OrderIntakeForm({
  sessionId,
  defaultEmail,
  deliveryHours,
}: {
  sessionId: string;
  defaultEmail: string;
  deliveryHours: number;
}) {
  const [form, setForm] = useState<Form>({ ...EMPTY, email: defaultEmail });
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const set = useCallback(<K extends keyof Form>(k: K, v: Form[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  }, []);

  const conversion = CONVERSIONS.find((c) => c.value === form.conversionAction);

  function validate(): boolean {
    const next: Partial<Record<keyof Form, string>> = {};
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email.trim()))
      next.email = "We need a valid email to deliver your page.";
    if (!form.businessName.trim())
      next.businessName = "Tell us your business name.";
    if (!form.industry.trim())
      next.industry = "What kind of business is this?";
    if (!form.service.trim())
      next.service = "What are you selling or offering on this page?";
    if (!form.targetKeyword.trim())
      next.targetKeyword = "What search should this page win?";
    if (!form.goal) next.goal = "Pick the page's main objective.";
    if (!form.conversionAction)
      next.conversionAction = "Pick what a visitor should do.";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      // Surface the first problem — the form is long enough to scroll.
      const firstKey = Object.keys(next)[0];
      document
        .querySelector(`[data-field="${firstKey}"]`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, ...form }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error || "Could not save your brief.");
      setDone(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Could not save your brief.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="card p-8 text-center sm:p-10">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-good-soft text-good">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12.5 10 17l9-10"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className="display mt-5 text-3xl text-ink">
          Your page is in production.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-ink-2">
          We&apos;re researching the search results for{" "}
          <span className="font-semibold text-ink">{form.targetKeyword}</span>{" "}
          now. Your finished page — researched, written, and reviewed — will
          arrive at <span className="font-semibold text-ink">{form.email}</span>{" "}
          within {deliveryHours} hours.
        </p>
        <p className="mono mt-6 text-xs uppercase tracking-wider text-muted">
          Research → Write → Review → Your inbox
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card p-6 sm:p-8">
      <div className="space-y-10">
        {/* ---------------- 01 · The business ---------------- */}
        <div className="space-y-5">
          <SectionHead
            n="01"
            title="Your business"
            hint="Who the page is about."
          />
          <div data-field="businessName">
            <Field
              label="Business name"
              placeholder="Summit Roofing Co."
              value={form.businessName}
              onChange={(v) => set("businessName", v)}
              error={errors.businessName}
            />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div data-field="industry">
              <Field
                label="Industry / type of business"
                placeholder="Residential roofing contractor"
                value={form.industry}
                onChange={(v) => set("industry", v)}
                error={errors.industry}
              />
            </div>
            <Field
              label="Website"
              badge="Recommended"
              placeholder="https://yourbusiness.com"
              value={form.websiteUrl}
              onChange={(v) => set("websiteUrl", v)}
              hint="We study your site so the page matches your voice."
            />
          </div>
          <div data-field="service">
            <Field
              label="What you're selling or offering on this page"
              placeholder="24/7 emergency roof repair"
              value={form.service}
              onChange={(v) => set("service", v)}
              error={errors.service}
            />
          </div>
          <div>
            <label className="field-label">
              What makes you different from competitors?
            </label>
            <textarea
              className="field mt-2 resize-y"
              rows={3}
              placeholder="Years in business, guarantees, awards, certifications, specialties, response time, pricing approach…"
              value={form.usp}
              onChange={(e) => set("usp", e.target.value)}
            />
            <p className="mt-1.5 text-sm text-muted">
              This becomes the page&apos;s proof. Specifics beat adjectives —
              &ldquo;since 2009, 4.9 stars, 2-hour response&rdquo; outranks
              &ldquo;high quality service.&rdquo;
            </p>
          </div>
        </div>

        {/* ---------------- 02 · The search ---------------- */}
        <div className="space-y-5">
          <SectionHead
            n="02"
            title="The search you want to win"
            hint="What we research before writing a word."
          />
          <div data-field="targetKeyword">
            <Field
              label="Target keyword or topic"
              placeholder="emergency roof repair Denver"
              value={form.targetKeyword}
              onChange={(v) => set("targetKeyword", v)}
              error={errors.targetKeyword}
              hint="Not sure? Describe it in plain words and we'll pick the keyword."
            />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="City / locality"
              badge="If local"
              placeholder="Denver, CO"
              value={form.location}
              onChange={(v) => set("location", v)}
            />
            <Field
              label="Areas you serve"
              badge="If local"
              placeholder="Denver metro, Aurora, Lakewood"
              value={form.serviceArea}
              onChange={(v) => set("serviceArea", v)}
            />
          </div>
          <Field
            label="Top competitors"
            badge="Recommended"
            placeholder="acmeroofing.com, peakroofers.com"
            value={form.competitors}
            onChange={(v) => set("competitors", v)}
            hint="Who currently wins this search? We'll study what they rank with."
          />
          <Field
            label="Who is this page for?"
            badge="Recommended"
            placeholder="Homeowners hit by hail storms who need same-day help"
            value={form.audience}
            onChange={(v) => set("audience", v)}
            hint="The customer you most want to attract, in your words."
          />
        </div>

        {/* ---------------- 03 · The goal ---------------- */}
        <div className="space-y-5">
          <SectionHead
            n="03"
            title="What this page is for"
            hint="A page with one job converts. A page with three jobs decorates."
          />
          <div data-field="goal">
            <label className="field-label">
              The page&apos;s main objective
            </label>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {GOALS.map((g) => (
                <button
                  key={g.value}
                  type="button"
                  onClick={() => set("goal", g.value)}
                  className={`rounded-xl border px-4 py-3 text-left transition-colors ${
                    form.goal === g.value
                      ? "border-accent bg-accent-soft"
                      : "border-line bg-surface hover:border-line-strong"
                  }`}
                >
                  <span className="block text-sm font-semibold text-ink">
                    {g.label}
                  </span>
                  <span className="mt-0.5 block text-xs text-muted">
                    {g.hint}
                  </span>
                </button>
              ))}
            </div>
            {errors.goal && (
              <p className="mt-1.5 text-sm text-[#b42318]">{errors.goal}</p>
            )}
          </div>
          <div data-field="conversionAction">
            <label className="field-label">
              When a visitor is convinced, what should they do?
            </label>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {CONVERSIONS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => set("conversionAction", c.value)}
                  className={`rounded-xl border px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                    form.conversionAction === c.value
                      ? "border-accent bg-accent-soft text-ink"
                      : "border-line bg-surface text-ink-2 hover:border-line-strong"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
            {errors.conversionAction && (
              <p className="mt-1.5 text-sm text-[#b42318]">
                {errors.conversionAction}
              </p>
            )}
          </div>
          {conversion && (
            <Field
              label={conversion.targetLabel}
              placeholder={conversion.targetPlaceholder}
              value={form.conversionTarget}
              onChange={(v) => set("conversionTarget", v)}
              hint="This is where the page's buttons and calls-to-action will point."
            />
          )}
        </div>

        {/* ---------------- 04 · Finishing touches ---------------- */}
        <div className="space-y-5">
          <SectionHead
            n="04"
            title="Finishing touches"
            hint="All optional — skip anything that doesn't apply."
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Tone"
              badge="Optional"
              placeholder="Straight-talking and local. Or: polished and premium."
              value={form.tone}
              onChange={(v) => set("tone", v)}
            />
            <Field
              label="Phone"
              badge="Optional"
              placeholder="(303) 555-0142"
              value={form.phone}
              onChange={(v) => set("phone", v)}
            />
          </div>
          <Field
            label="Pages we should link to"
            badge="Optional"
            placeholder="/contact, /services/roof-repair"
            value={form.internalLinks}
            onChange={(v) => set("internalLinks", v)}
            hint="Internal links strengthen the page and your site."
          />
          <div>
            <label className="field-label">Brand color</label>
            <div className="mt-2 flex items-center gap-3">
              <input
                type="color"
                value={form.brandColor || "#1b46d4"}
                onChange={(e) => set("brandColor", e.target.value)}
                className="h-11 w-14 cursor-pointer rounded-lg border border-line-strong bg-surface"
                aria-label="Brand color"
              />
              <input
                className="field flex-1"
                placeholder="#1b46d4 (optional)"
                value={form.brandColor}
                onChange={(e) => set("brandColor", e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="field-label">
              Anything else we should know?
            </label>
            <textarea
              className="field mt-2 resize-y"
              rows={3}
              placeholder="Offers to feature, things to avoid saying, pages you admire…"
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
            />
          </div>
        </div>

        {/* ---------------- Delivery ---------------- */}
        <div className="space-y-5">
          <SectionHead n="05" title="Delivery" />
          <div data-field="email">
            <Field
              label="Where do we send the finished page?"
              type="email"
              placeholder="you@company.com"
              value={form.email}
              onChange={(v) => set("email", v)}
              error={errors.email}
              hint="Pre-filled from your payment — change it if you'd like delivery elsewhere."
            />
          </div>
        </div>
      </div>

      {submitError && (
        <p className="mt-6 rounded-xl border border-[#f3c2bd] bg-[#fdecea] px-4 py-3 text-sm text-[#b42318]">
          {submitError}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="btn btn-accent btn-lg mt-8 w-full disabled:opacity-60"
      >
        {submitting ? "Saving your brief…" : "Start my page"}
      </button>
      <p className="mono mt-4 text-center text-xs uppercase tracking-wider text-muted">
        Delivered to your inbox within {deliveryHours} hours
      </p>
    </form>
  );
}
