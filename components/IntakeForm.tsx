"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { GenerationView, StepState } from "@/lib/types";
import { GeneratingView } from "./GeneratingView";

type Phase = "form" | "generating";

type Form = {
  businessName: string;
  service: string;
  location: string;
  targetKeyword: string;
  websiteUrl: string;
  details: string;
  phone: string;
  brandColor: string;
};

const EMPTY: Form = {
  businessName: "",
  service: "",
  location: "",
  targetKeyword: "",
  websiteUrl: "",
  details: "",
  phone: "",
  brandColor: "",
};

export function IntakeForm() {
  const router = useRouter();
  const [form, setForm] = useState<Form>(EMPTY);
  const [showOptional, setShowOptional] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [phase, setPhase] = useState<Phase>("form");
  const [steps, setSteps] = useState<StepState[]>([]);
  const [genError, setGenError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Funnel: visitor started the intake.
  useEffect(() => {
    void fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: "intake_started" }),
    }).catch(() => {});
  }, []);

  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  const set = useCallback(<K extends keyof Form>(k: K, v: Form[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  }, []);

  function validate(): boolean {
    const next: Partial<Record<keyof Form, string>> = {};
    if (!form.businessName.trim()) next.businessName = "Tell us your business name.";
    if (!form.service.trim()) next.service = "What service do you offer?";
    if (!form.location.trim()) next.location = "Add your city or service area.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function startPolling(id: string) {
    pollRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/status/${id}`, { cache: "no-store" });
        if (!res.ok) return;
        const view = (await res.json()) as GenerationView;
        setSteps(view.steps);
        if (view.status === "complete") {
          if (pollRef.current) clearInterval(pollRef.current);
          router.push(`/preview/${id}`);
        } else if (view.status === "error") {
          if (pollRef.current) clearInterval(pollRef.current);
          setGenError(view.error ?? "Something went wrong. Please try again.");
        }
      } catch {
        // transient — keep polling
      }
    }, 1300);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;

    setPhase("generating");
    setGenError(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { id?: string; error?: string };
      if (!res.ok || !data.id) {
        throw new Error(data.error || "Could not start generation.");
      }
      startPolling(data.id);
    } catch (err) {
      setPhase("form");
      setSubmitError(
        err instanceof Error ? err.message : "Could not start generation.",
      );
    }
  }

  function retry() {
    setGenError(null);
    setPhase("form");
    setSteps([]);
  }

  if (phase === "generating") {
    return (
      <GeneratingView
        businessName={form.businessName}
        steps={steps}
        error={genError}
        onRetry={retry}
      />
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-12 sm:px-8 lg:py-16">
      <div className="mb-8">
        <Link
          href="/"
          className="mono text-xs uppercase tracking-wider text-muted hover:text-ink"
        >
          ← Back
        </Link>
        <h1 className="display mt-4 text-4xl text-ink sm:text-5xl">
          Build your page.
        </h1>
        <p className="mt-3 text-lg text-ink-2">
          Three quick details and we&apos;ll research your market and write your
          page. Preview it free.
        </p>
      </div>

      <form onSubmit={onSubmit} className="card p-6 sm:p-8">
        <div className="space-y-5">
          <Field
            label="Business name"
            placeholder="Summit Roofing Co."
            value={form.businessName}
            onChange={(v) => set("businessName", v)}
            error={errors.businessName}
            autoFocus
          />
          <Field
            label="What you do"
            placeholder="Emergency roof repair"
            value={form.service}
            onChange={(v) => set("service", v)}
            error={errors.service}
          />
          <Field
            label="Location / service area"
            placeholder="Denver, CO"
            value={form.location}
            onChange={(v) => set("location", v)}
            error={errors.location}
            hint="This is what makes it a local SEO page."
          />
          <Field
            label="Target keyword"
            badge="Optional"
            placeholder="emergency roof repair Denver"
            value={form.targetKeyword}
            onChange={(v) => set("targetKeyword", v)}
            hint="Leave it blank and we'll pick the best one from your service and location."
          />
        </div>

        {/* Optional enhancers */}
        <div className="mt-6 border-t border-line pt-5">
          <button
            type="button"
            onClick={() => setShowOptional((s) => !s)}
            className="flex w-full items-center justify-between text-left"
          >
            <span className="text-sm font-semibold text-ink">
              + Add details{" "}
              <span className="font-normal text-muted">(optional)</span>
            </span>
            <span
              className={`text-muted transition-transform ${showOptional ? "rotate-180" : ""}`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="m6 9 6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>

          {showOptional && (
            <div className="mt-5 space-y-5">
              <Field
                label="Website URL"
                placeholder="https://yourbusiness.com"
                value={form.websiteUrl}
                onChange={(v) => set("websiteUrl", v)}
                hint="Have a site? We'll pull details from it for context."
              />
              <Field
                label="Phone"
                placeholder="(303) 555-0142"
                value={form.phone}
                onChange={(v) => set("phone", v)}
              />
              <div>
                <label className="field-label">
                  Key details / what makes you different
                </label>
                <textarea
                  className="field mt-2 resize-y"
                  rows={3}
                  placeholder="24/7 storm response, family-owned since 2009, free inspections, licensed & insured…"
                  value={form.details}
                  onChange={(e) => set("details", e.target.value)}
                />
              </div>
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
            </div>
          )}
        </div>

        {submitError && (
          <p className="mt-5 rounded-xl border border-[#f3c2bd] bg-[#fdecea] px-4 py-3 text-sm text-[#b42318]">
            {submitError}
          </p>
        )}

        <button type="submit" className="btn btn-accent btn-lg mt-7 w-full">
          Generate My Page
        </button>
        <p className="mono mt-4 text-center text-xs uppercase tracking-wider text-muted">
          Preview free · takes ~60 seconds · $29 to export
        </p>
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  error,
  hint,
  badge,
  autoFocus,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
  hint?: string;
  badge?: string;
  autoFocus?: boolean;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="field-label">{label}</label>
        {badge && (
          <span className="mono text-[10px] uppercase tracking-wider text-muted">
            {badge}
          </span>
        )}
      </div>
      <input
        className={`field mt-2 ${error ? "border-[#e0584b]" : ""}`}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        autoFocus={autoFocus}
      />
      {error ? (
        <p className="mt-1.5 text-sm text-[#b42318]">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-sm text-muted">{hint}</p>
      ) : null}
    </div>
  );
}
