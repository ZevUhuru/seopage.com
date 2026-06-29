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

  const mailtoHref = `mailto:support@seopage.com?subject=${encodeURIComponent(
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
      <section className="mx-auto max-w-6xl px-5 pb-14 pt-14 sm:px-8 lg:pb-20 lg:pt-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="label">§ 01 · Free first report</p>
            <h1 className="display mt-6 text-6xl text-[var(--ink)] sm:text-7xl lg:text-8xl">
              See your page&apos;s
              <br />
              AI rank. <span className="text-[var(--red)]">Free.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--ink-soft)]">
              One page, {offer.promptsPerPage}{" "}buyer prompts, all 4 AI channels
              — ChatGPT, Google AI Overviews &amp; Gemini, Perplexity, and
              Claude. No credit card. Preview the prompt set below, then send
              the request and your report comes back within one business day.
            </p>
            <div className="mt-8 grid border-2 border-[var(--ink)] sm:grid-cols-3">
              {[
                ["01", "Paste your page URL"],
                ["02", "Preview the prompt set"],
                ["03", "Send — report in 1 day"],
              ].map(([number, label], i) => (
                <div
                  key={number}
                  className={`p-5 ${i > 0 ? "border-t-2 border-[var(--ink)] sm:border-l-2 sm:border-t-0" : ""}`}
                >
                  <span className="display text-3xl text-[var(--red)]">
                    {number}
                  </span>
                  <p className="mt-2 text-sm font-semibold text-[var(--ink)]">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <aside className="hard h-fit border-2 border-[var(--ink)] bg-[var(--paper)]">
            <div className="border-b-2 border-[var(--ink)] bg-[var(--ink)] px-6 py-3">
              <p className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--paper)]">
                The offer
              </p>
            </div>
            <div className="p-6">
              <h2 className="display text-3xl text-[var(--ink)]">
                First report free.
                <br />
                Then {offer.priceLabel}/mo.
              </h2>
              <p className="mt-4 text-sm leading-7 text-[var(--ink-soft)]">
                The free report is the full product on one page. The
                subscription keeps it running: up to {offer.pages} pages,
                weekly re-runs, movement tracking, and client-ready exports.
                Cancel anytime.
              </p>
              <dl className="mt-6 border-t-2 border-[var(--ink)] pt-5">
                {[
                  ["First report", "Free · no card"],
                  ["Subscription", `${offer.priceLabel}/month`],
                  ["Channels", "4 AI engines"],
                  ["Cadence", "Weekly re-runs"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-baseline justify-between gap-4 py-1.5"
                  >
                    <dt className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                      {label}
                    </dt>
                    <dd className="mono text-[12px] uppercase tracking-[0.08em] text-[var(--ink)]">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t-2 border-[var(--ink)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:py-24">
          <form
            className="h-fit border-2 border-[var(--ink)] bg-[var(--paper)]"
            onSubmit={(event) => {
              event.preventDefault();
              buildPreview();
            }}
          >
            <div className="border-b-2 border-[var(--ink)] bg-[var(--ink)] px-6 py-3">
              <p className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--paper)]">
                § 02 · Your page
              </p>
            </div>

            <div className="p-6 sm:p-8">
              <h2 className="display text-4xl text-[var(--ink)]">
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
                  label="Competitors (optional)"
                  name="competitors"
                  placeholder="A few competitor names or URLs. One per line works best."
                  value={form.competitors}
                  onChange={(value) => updateForm("competitors", value)}
                />
              </div>

              <button
                type="submit"
                className="hard-sm mono mt-8 w-full border-2 border-[var(--ink)] bg-[var(--ink)] px-6 py-4 text-[12px] uppercase tracking-[0.18em] text-[var(--paper)] transition hover:bg-[var(--red)] hover:border-[var(--red)] hover:shadow-none"
              >
                Preview my prompt set
              </button>
              <p className="mono mt-4 text-center text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                Free · No card · Report within 1 business day
              </p>
            </div>
          </form>

          <div className="space-y-8">
            <PromptPreview
              hasPreview={hasPreview}
              siteName={siteName}
              prompts={prompts}
            />

            {hasPreview ? (
              <section className="border-2 border-[var(--ink)] bg-[var(--paper)]">
                <div className="border-b-2 border-[var(--ink)] bg-[var(--red)] px-6 py-3">
                  <p className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--paper)]">
                    § 04 · Next step
                  </p>
                </div>
                <div className="p-6 sm:p-8">
                  <h2 className="display text-3xl text-[var(--ink)]">
                    Send the request — the report comes to your inbox.
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-[var(--ink-soft)]">
                    We run every prompt across all 4 channels, capture the
                    answers, score the page, and email your report within one
                    business day. Ready to track weekly from day one? Subscribe
                    instead.
                  </p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <Link
                      href={mailtoHref}
                      className="mono border-2 border-[var(--ink)] bg-[var(--ink)] px-5 py-3 text-[11px] uppercase tracking-[0.18em] text-[var(--paper)] transition hover:bg-[var(--red)] hover:border-[var(--red)]"
                    >
                      Request my free report
                    </Link>
                    <Link
                      href={CHECKOUT_HREF}
                      className="mono border-2 border-[var(--ink)] px-5 py-3 text-[11px] uppercase tracking-[0.18em] text-[var(--ink)] transition hover:bg-[var(--ink)] hover:text-[var(--paper)]"
                    >
                      Subscribe — {offer.priceLabel}/mo
                    </Link>
                    <Link
                      href={CALL_HREF}
                      className="mono border-2 border-[var(--ink)] px-5 py-3 text-[11px] uppercase tracking-[0.18em] text-[var(--ink)] transition hover:bg-[var(--ink)] hover:text-[var(--paper)]"
                    >
                      15-min fit call
                    </Link>
                    <button
                      type="button"
                      onClick={copyBrief}
                      className="mono border-2 border-[var(--ink)] px-5 py-3 text-[11px] uppercase tracking-[0.18em] text-[var(--ink)] transition hover:bg-[var(--ink)] hover:text-[var(--paper)]"
                    >
                      {copyState === "copied"
                        ? "Copied"
                        : copyState === "failed"
                          ? "Copy failed"
                          : "Copy request"}
                    </button>
                  </div>
                </div>
              </section>
            ) : null}
          </div>
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
    <section className="border-2 border-[var(--ink)] bg-[var(--paper)]">
      <div className="border-b-2 border-[var(--ink)] bg-[var(--ink)] px-6 py-3">
        <p className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--paper)]">
          § 03 · Prompt set preview
        </p>
      </div>
      <div className="p-6 sm:p-8">
        <h2 className="display text-4xl text-[var(--ink)]">
          {hasPreview
            ? `Buyer prompts for ${siteName}`
            : "Your prompt set appears here."}
        </h2>
        <p className="mt-4 text-sm leading-7 text-[var(--ink-soft)]">
          A sample of the buyer questions your report will run. The full report
          uses {offer.promptsPerPage} prompts, generated from the page itself —
          and you can edit every one before the run.
        </p>

        <ol className="mt-8 border-2 border-[var(--ink)]">
          {(hasPreview ? prompts : placeholderPrompts).map((prompt, index) => (
            <li
              key={`${prompt}-${index}`}
              className={`flex items-start gap-4 px-4 py-3 ${
                index > 0 ? "border-t border-[var(--rule)]" : ""
              }`}
            >
              <span className="mono mt-0.5 text-[11px] text-[var(--red)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-sm font-medium leading-6 text-[var(--ink)]">
                “{prompt}”
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-8 grid grid-cols-2 border-2 border-[var(--ink)] sm:grid-cols-4">
          {channels.map((c, i) => (
            <div
              key={c.key}
              className={`p-3.5 ${i % 2 === 1 ? "border-l border-[var(--rule)]" : ""} ${
                i > 1 ? "border-t border-[var(--rule)] sm:border-t-0" : ""
              } ${i > 0 ? "sm:border-l sm:border-[var(--rule)]" : ""}`}
            >
              <span className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
                {c.label}
              </span>
              <p
                className={`mono mt-1.5 text-[10px] uppercase tracking-[0.14em] ${
                  hasPreview ? "text-[var(--red)]" : "text-[var(--muted)]"
                }`}
              >
                {hasPreview ? "▸ Will be checked" : "Waiting for input"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
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
      <span className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-soft)]">
        {label}
      </span>
      <input
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full border-2 border-[var(--ink)] bg-white px-4 py-3 text-sm text-[var(--ink)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--red)]"
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
      <span className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-soft)]">
        {label}
      </span>
      <textarea
        name={name}
        value={value}
        placeholder={placeholder}
        rows={3}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full resize-y border-2 border-[var(--ink)] bg-white px-4 py-3 text-sm leading-6 text-[var(--ink)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--red)]"
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
