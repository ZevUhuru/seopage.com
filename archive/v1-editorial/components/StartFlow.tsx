"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CALL_HREF, CHECKOUT_HREF, channels, offer } from "@/lib/data";

type FormState = {
  email: string;
  pageUrl: string;
  pitch: string;
  audience: string;
  competitors: string;
};

const initialState: FormState = {
  email: "",
  pageUrl: "",
  pitch: "",
  audience: "",
  competitors: "",
};

export function StartFlow() {
  const [form, setForm] = useState<FormState>(initialState);
  const [hasPreview, setHasPreview] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");

  const siteName = useMemo(() => getSiteName(form.pageUrl), [form.pageUrl]);
  const prompts = useMemo(() => buildPrompts(form, siteName), [form, siteName]);
  const brief = useMemo(
    () => buildBrief(form, siteName, prompts),
    [form, siteName, prompts],
  );

  const mailtoHref = `mailto:zev@seopage.com?subject=${encodeURIComponent(
    "SEOPage — run my free AI Rank Report",
  )}&body=${encodeURIComponent(brief)}`;

  function updateForm<Key extends keyof FormState>(key: Key, value: FormState[Key]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function buildPreview() {
    setHasPreview(true);
    setCopyState("idle");
    window.localStorage.setItem(
      "seopage:report-intake:last-brief",
      JSON.stringify({ savedAt: new Date().toISOString(), form, prompts }),
    );
  }

  async function copyBrief() {
    try {
      await navigator.clipboard.writeText(brief);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  }

  return (
    <main>
      <section className="mx-auto grid max-w-5xl gap-10 px-5 pb-14 pt-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:pb-20 lg:pt-24">
        <div>
          <span className="eyebrow">Free first report</span>
          <h1 className="serif mt-5 text-balance text-5xl leading-[1.05] text-[var(--ink)] sm:text-6xl lg:text-7xl">
            See your page&apos;s AI rank. Free.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--ink-soft)]">
            One page, 20 buyer prompts, all 4 AI channels — ChatGPT, Google AI
            Overviews &amp; Gemini, Perplexity, and Claude. No credit card.
            Preview the prompt set below, then send the request and your report
            comes back within one business day.
          </p>
          <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--rule)] sm:grid-cols-3">
            {[
              ["1", "Paste your page URL"],
              ["2", "Preview the prompt set"],
              ["3", "Send — report in 1 day"],
            ].map(([number, label]) => (
              <div key={number} className="bg-[var(--paper)] p-5">
                <span className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
                  Step {number}
                </span>
                <p className="mt-2 text-sm font-medium text-[var(--ink)]">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-3xl border border-[var(--rule)] bg-[var(--paper)] p-7">
          <p className="eyebrow">The offer</p>
          <h2 className="serif mt-4 text-3xl leading-tight text-[var(--ink)]">
            First report free. Then {offer.priceLabel}/mo.
          </h2>
          <p className="mt-4 text-sm leading-7 text-[var(--ink-soft)]">
            The free report is the full product on one page. The subscription
            keeps it running: up to {offer.pages} pages, weekly re-runs,
            movement tracking, and client-ready exports. Cancel anytime.
          </p>
          <dl className="mt-6 space-y-4 border-t border-[var(--rule)] pt-6">
            <MiniStat label="First report" value="Free · no card" />
            <MiniStat label="Subscription" value={`${offer.priceLabel}/month`} />
            <MiniStat label="Channels" value="4 AI engines" />
            <MiniStat label="Cadence" value="Weekly re-runs" />
          </dl>
        </aside>
      </section>

      <section className="mx-auto grid max-w-5xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:py-24">
        <form
          className="rounded-3xl border border-[var(--rule)] bg-[var(--paper)] p-7 sm:p-8"
          onSubmit={(event) => {
            event.preventDefault();
            buildPreview();
          }}
        >
          <p className="eyebrow">Your page</p>
          <h2 className="serif mt-4 text-4xl leading-tight text-[var(--ink)]">
            Tell us what the page should win.
          </h2>

          <div className="mt-8 space-y-5">
            <Field
              label="Email"
              name="email"
              placeholder="you@company.com"
              value={form.email}
              onChange={(value) => updateForm("email", value)}
            />
            <Field
              label="Page URL"
              name="page-url"
              placeholder="https://yourcompany.com/your-money-page"
              value={form.pageUrl}
              onChange={(value) => updateForm("pageUrl", value)}
            />
            <Field
              label="What the page sells or answers"
              name="pitch"
              placeholder="AI clip art generator, CRM for agencies, payroll software..."
              value={form.pitch}
              onChange={(value) => updateForm("pitch", value)}
            />
            <Field
              label="Who buys it"
              name="audience"
              placeholder="designers, B2B SaaS founders, small agencies..."
              value={form.audience}
              onChange={(value) => updateForm("audience", value)}
            />
            <TextArea
              label="Competitors (optional — sharpens the gap analysis)"
              name="competitors"
              placeholder="A few competitor names or URLs. One per line works best."
              value={form.competitors}
              onChange={(value) => updateForm("competitors", value)}
            />
          </div>

          <button
            type="submit"
            className="mt-8 w-full rounded-full bg-[var(--ink)] px-6 py-3.5 text-sm font-medium text-[var(--paper)] transition hover:bg-[var(--accent)]"
          >
            Preview my prompt set
          </button>
          <p className="mono mt-4 text-center text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
            Free · No card · Report within 1 business day
          </p>
        </form>

        <div className="space-y-6">
          <PromptPreview
            hasPreview={hasPreview}
            siteName={siteName}
            prompts={prompts}
          />

          {hasPreview ? (
            <section className="rounded-3xl border border-[var(--rule)] bg-[var(--paper)] p-7 sm:p-8">
              <p className="eyebrow">Next step</p>
              <h2 className="serif mt-4 text-3xl leading-tight text-[var(--ink)]">
                Send the request — the report comes to your inbox.
              </h2>
              <p className="mt-4 text-sm leading-7 text-[var(--ink-soft)]">
                We run every prompt across all 4 channels, capture the answers,
                score the page, and email your report within one business day.
                Ready to track weekly from day one? Subscribe instead.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href={mailtoHref}
                  className="rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-medium text-[var(--paper)] transition hover:bg-[var(--accent)]"
                >
                  Request my free report
                </Link>
                <Link
                  href={CHECKOUT_HREF}
                  className="rounded-full border border-[var(--rule-strong)] px-5 py-3 text-sm font-medium text-[var(--ink)] transition hover:border-[var(--ink)]"
                >
                  Subscribe — {offer.priceLabel}/mo
                </Link>
                <Link
                  href={CALL_HREF}
                  className="rounded-full border border-[var(--rule-strong)] px-5 py-3 text-sm font-medium text-[var(--ink)] transition hover:border-[var(--ink)]"
                >
                  15-minute fit call
                </Link>
                <button
                  type="button"
                  onClick={copyBrief}
                  className="rounded-full border border-[var(--rule-strong)] px-5 py-3 text-sm font-medium text-[var(--ink)] transition hover:border-[var(--ink)]"
                >
                  {copyState === "copied"
                    ? "Copied"
                    : copyState === "failed"
                      ? "Copy failed"
                      : "Copy request"}
                </button>
              </div>
            </section>
          ) : null}
        </div>
      </section>
    </main>
  );
}

function PromptPreview({
  hasPreview,
  siteName,
  prompts,
}: {
  hasPreview: boolean;
  siteName: string;
  prompts: string[];
}) {
  return (
    <section className="rounded-3xl border border-[var(--rule)] bg-[var(--paper)] p-7 sm:p-8">
      <p className="eyebrow">Prompt set preview</p>
      <h2 className="serif mt-4 text-4xl leading-tight text-[var(--ink)]">
        {hasPreview
          ? `Buyer prompts for ${siteName}`
          : "Your prompt set appears here."}
      </h2>
      <p className="mt-4 text-sm leading-7 text-[var(--ink-soft)]">
        A sample of the buyer questions your report will run. The full report
        uses {offer.promptsPerPage} prompts, generated from the page itself —
        and you can edit every one before the run.
      </p>

      <ol className="mt-8 space-y-3">
        {(hasPreview ? prompts : placeholderPrompts).map((prompt, index) => (
          <li
            key={`${prompt}-${index}`}
            className="flex items-start gap-3 rounded-2xl border border-[var(--rule)] bg-[var(--paper-soft)] p-4"
          >
            <span className="mono mt-0.5 text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-sm leading-6 text-[var(--ink)]">
              “{prompt}”
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--rule)] sm:grid-cols-4">
        {channels.map((c) => (
          <div key={c.key} className="bg-[var(--paper)] p-4">
            <span className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
              {c.label}
            </span>
            <p className="mt-2 text-xs leading-5 text-[var(--ink-soft)]">
              {hasPreview ? "Will be checked" : "Waiting for input"}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
        {label}
      </dt>
      <dd className="text-sm font-medium text-[var(--ink)]">{value}</dd>
    </div>
  );
}

function Field({
  label,
  name,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-[var(--ink)]">{label}</span>
      <input
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-2xl border border-[var(--rule-strong)] bg-white px-4 py-3 text-sm text-[var(--ink)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--ink)]"
      />
    </label>
  );
}

function TextArea({
  label,
  name,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-[var(--ink)]">{label}</span>
      <textarea
        name={name}
        value={value}
        placeholder={placeholder}
        rows={3}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full resize-y rounded-2xl border border-[var(--rule-strong)] bg-white px-4 py-3 text-sm leading-6 text-[var(--ink)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--ink)]"
      />
    </label>
  );
}

const placeholderPrompts = [
  "best {what your page sells} for {who buys it}",
  "{your product} vs {competitor}",
  "is {your product} worth it",
  "{competitor} alternatives",
  "how to choose a {category}",
];

function buildPrompts(form: FormState, siteName: string): string[] {
  const product = siteName !== "your page" ? siteName : "your product";
  const category = form.pitch.trim().toLowerCase() || "this category";
  const audience = form.audience.trim().toLowerCase() || "buyers";
  const competitors = splitLines(form.competitors);
  const competitor = competitors[0] || "the market leader";

  const prompts = [
    `best ${category} for ${audience}`,
    `${product} vs ${competitor}`,
    `is ${product} worth paying for`,
    `${competitor} alternatives`,
    `what should ${audience} look for in ${category}`,
  ];

  if (competitors.length > 1) {
    prompts.push(`${competitors[1]} vs ${product} — which is better`);
  }

  return prompts.slice(0, 6);
}

function buildBrief(form: FormState, siteName: string, prompts: string[]) {
  const promptLines = prompts
    .map((prompt, index) => `${index + 1}. ${prompt}`)
    .join("\n");

  return `SEOPage — free AI Rank Report request

Email:
${form.email || "[not provided]"}

Page URL:
${form.pageUrl || siteName}

What the page sells or answers:
${form.pitch || "[not provided]"}

Who buys it:
${form.audience || "[not provided]"}

Competitors:
${form.competitors || "[not provided]"}

Sample prompt set:
${promptLines}

Channels: ChatGPT · Google AI Overviews & Gemini · Perplexity · Claude
`;
}

function getSiteName(pageUrl: string) {
  if (!pageUrl.trim()) {
    return "your page";
  }

  try {
    const normalized = pageUrl.startsWith("http") ? pageUrl : `https://${pageUrl}`;
    return new URL(normalized).hostname.replace(/^www\./, "");
  } catch {
    return pageUrl;
  }
}

function splitLines(value: string) {
  return value
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}
