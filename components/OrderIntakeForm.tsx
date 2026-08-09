"use client";

import { useCallback, useState } from "react";
import { Field } from "./Field";

/**
 * The post-payment intake — the high-value brief. The buyer has already paid,
 * so every question here earns its place: each answer directly shapes the
 * page we build. Submitting flips to a confirmation state.
 */

type Form = {
  email: string;
  businessName: string;
  websiteUrl: string;
  targetKeyword: string;
  service: string;
  location: string;
  competitors: string;
  audience: string;
  goal: "" | "rank" | "leads" | "sales";
  internalLinks: string;
  brandColor: string;
  phone: string;
  notes: string;
};

const GOALS: { value: Form["goal"]; label: string; hint: string }[] = [
  { value: "rank", label: "Rank & get found", hint: "Bring in search traffic" },
  { value: "leads", label: "Generate leads", hint: "Calls, forms, bookings" },
  { value: "sales", label: "Drive sales", hint: "Purchases or signups" },
];

export function OrderIntakeForm({
  sessionId,
  defaultEmail,
  deliveryHours,
}: {
  sessionId: string;
  defaultEmail: string;
  deliveryHours: number;
}) {
  const [form, setForm] = useState<Form>({
    email: defaultEmail,
    businessName: "",
    websiteUrl: "",
    targetKeyword: "",
    service: "",
    location: "",
    competitors: "",
    audience: "",
    goal: "",
    internalLinks: "",
    brandColor: "",
    phone: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const set = useCallback(<K extends keyof Form>(k: K, v: Form[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  }, []);

  function validate(): boolean {
    const next: Partial<Record<keyof Form, string>> = {};
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email.trim()))
      next.email = "We need a valid email to deliver your page.";
    if (!form.businessName.trim())
      next.businessName = "Tell us your business name.";
    if (!form.targetKeyword.trim())
      next.targetKeyword = "What search should this page win?";
    if (!form.service.trim())
      next.service = "What are you selling or offering on this page?";
    setErrors(next);
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
      <div className="space-y-5">
        <Field
          label="Where do we send the finished page?"
          type="email"
          placeholder="you@company.com"
          value={form.email}
          onChange={(v) => set("email", v)}
          error={errors.email}
          hint="Pre-filled from your payment — change it if you'd like delivery elsewhere."
        />
        <Field
          label="Business name"
          placeholder="Summit Roofing Co."
          value={form.businessName}
          onChange={(v) => set("businessName", v)}
          error={errors.businessName}
        />
        <Field
          label="Target keyword or topic"
          placeholder="emergency roof repair Denver"
          value={form.targetKeyword}
          onChange={(v) => set("targetKeyword", v)}
          error={errors.targetKeyword}
          hint="The search you want this page to win. Not sure? Describe it in plain words and we'll pick the keyword."
        />
        <Field
          label="What you're selling or offering"
          placeholder="24/7 emergency roof repair"
          value={form.service}
          onChange={(v) => set("service", v)}
          error={errors.service}
        />
        <Field
          label="Website"
          badge="Recommended"
          placeholder="https://yourbusiness.com"
          value={form.websiteUrl}
          onChange={(v) => set("websiteUrl", v)}
          hint="We study your site so the page matches your voice and links into it."
        />
        <Field
          label="Location / service area"
          badge="If local"
          placeholder="Denver, CO"
          value={form.location}
          onChange={(v) => set("location", v)}
        />

        <div>
          <label className="field-label">
            What should this page achieve?
          </label>
          <div className="mt-2 grid gap-2 sm:grid-cols-3">
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
                <span className="mt-0.5 block text-xs text-muted">{g.hint}</span>
              </button>
            ))}
          </div>
        </div>

        <Field
          label="Top competitors"
          badge="Optional"
          placeholder="acmeroofing.com, peakroofers.com"
          value={form.competitors}
          onChange={(v) => set("competitors", v)}
          hint="Who currently wins this search? We'll study what they rank with."
        />
        <Field
          label="Who is this page for?"
          badge="Optional"
          placeholder="Homeowners hit by hail storms who need same-day help"
          value={form.audience}
          onChange={(v) => set("audience", v)}
        />
        <Field
          label="Pages we should link to"
          badge="Optional"
          placeholder="/contact, /services/roof-repair"
          value={form.internalLinks}
          onChange={(v) => set("internalLinks", v)}
          hint="Internal links strengthen the page and your site."
        />
        <Field
          label="Phone"
          badge="Optional"
          placeholder="(303) 555-0142"
          value={form.phone}
          onChange={(v) => set("phone", v)}
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
            placeholder="Awards, guarantees, years in business, tone you like, pages you admire…"
            value={form.notes}
            onChange={(e) => set("notes", e.target.value)}
          />
        </div>
      </div>

      {submitError && (
        <p className="mt-5 rounded-xl border border-[#f3c2bd] bg-[#fdecea] px-4 py-3 text-sm text-[#b42318]">
          {submitError}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="btn btn-accent btn-lg mt-7 w-full disabled:opacity-60"
      >
        {submitting ? "Saving your brief…" : "Start my page"}
      </button>
      <p className="mono mt-4 text-center text-xs uppercase tracking-wider text-muted">
        Delivered to your inbox within {deliveryHours} hours
      </p>
    </form>
  );
}
