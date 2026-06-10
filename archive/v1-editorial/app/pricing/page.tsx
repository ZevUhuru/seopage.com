import Link from "next/link";
import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { CALL_HREF, START_HREF, offer } from "@/lib/data";

export const metadata: Metadata = {
  title: "AI Rank Report Pricing",
  description:
    "One plan: $149/month. Track up to 5 pages across ChatGPT, Google AI Overviews, Perplexity, and Claude — 20 buyer prompts per page, weekly re-runs, full answer evidence, and a fix list. First report free, cancel anytime.",
  alternates: { canonical: "https://seopage.com/pricing" },
  openGraph: {
    title: "AI Rank Report Pricing — $149/mo, First Report Free",
    description:
      "One plan, everything included. See how your pages rank across the top AI channels — with evidence, competitor gaps, and a weekly fix list.",
    url: "https://seopage.com/pricing",
    type: "website",
  },
};

const pricingFaq = [
  {
    q: "Why one plan?",
    a: "Because the product is one thing: know exactly how your pages rank in AI search, with evidence and a fix list. Every customer gets every feature. No tier-shopping, no feature matrix, no \"contact sales\" — $149/month, cancel anytime.",
  },
  {
    q: "What does the free first report include?",
    a: "The real product, on one page: 20 generated buyer prompts run across ChatGPT, Google AI Overviews & Gemini, Perplexity, and Claude — verdicts, framing, competitor gap, AI-readiness score, and the fix list. No credit card required.",
  },
  {
    q: "What exactly do I get for $149/month?",
    a: "Up to 5 tracked pages, 20 prompts per page (editable), all 4 AI channels, weekly re-runs with movement vs last week, full captured answers as evidence, competitor citation gaps, per-page AI-readiness scores and fix lists, plus shareable report links and PDF export.",
  },
  {
    q: "How does this compare to other AI visibility tools?",
    a: "Brand-monitoring tools (from $29/mo) tell you a brand was mentioned somewhere. Prompt-tracking suites charge $189+/mo for 100 prompts at the brand level. SEOPage tracks 100 prompts (5 pages × 20) for $149 — at the page level, where citations actually happen and where you can actually act, with the full answer saved as proof.",
  },
  {
    q: "Can I swap which pages I track?",
    a: "Yes. Swap a URL whenever you want — the next weekly run picks it up with a fresh prompt set. Most customers settle on their money pages and leave them; agencies rotate by client.",
  },
  {
    q: "I'm an agency — can I resell the reports?",
    a: "Yes. Every report has a shareable link and a PDF export you can put in front of clients, with the full AI answers attached as evidence. One $149 subscription covers 5 client pages; many agencies run one subscription per client.",
  },
  {
    q: "What counts as one page?",
    a: "One URL. A landing page, product page, comparison page, pricing page, or post. The prompt set, the verdicts, the competitor gap, and the fix list are all scoped to that URL.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes — it's month to month. Your reports remain accessible after you cancel; the weekly re-runs stop. Come back whenever you want the tracking again.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <SiteHeader active="pricing" />
      <main>
        {/* Hero */}
        <section className="mx-auto max-w-3xl px-5 pb-12 pt-20 text-center sm:px-8 lg:pt-28">
          <span className="eyebrow">Pricing</span>
          <h1 className="serif mt-5 text-balance text-5xl leading-[1.05] text-[var(--ink)] sm:text-6xl">
            One plan.{" "}
            <span className="italic text-[var(--ink-soft)]">
              Everything in it.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-[var(--ink-soft)]">
            Your first AI Rank Report is free — no card. After that,{" "}
            {offer.priceLabel}/month covers every page, every channel, every
            feature. Cancel anytime.
          </p>
        </section>

        {/* Offer card */}
        <section className="mx-auto max-w-3xl px-5 sm:px-8">
          <article className="overflow-hidden rounded-3xl border border-[var(--rule)] bg-[var(--paper)] p-8 sm:p-12">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="serif text-3xl text-[var(--ink)]">
                AI Rank Report
              </h2>
              <span className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
                {offer.freeReportLabel}
              </span>
            </div>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="serif text-7xl leading-none text-[var(--ink)]">
                {offer.priceLabel}
              </span>
              <span className="text-base text-[var(--ink-soft)]">
                /month · one plan · cancel anytime
              </span>
            </div>

            <ul className="mt-10 space-y-4 border-t border-[var(--rule)] pt-8 text-base text-[var(--ink-soft)]">
              {offer.includes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    className="mt-1.5 h-3.5 w-3.5 shrink-0 text-[var(--ink)]"
                    fill="none"
                  >
                    <path
                      d="M3 8.5l3.5 3.5L13 4.5"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href={START_HREF}
                className="rounded-full bg-[var(--ink)] px-6 py-3.5 text-sm font-medium text-[var(--paper)] transition hover:bg-[var(--accent)]"
              >
                Get your first report — free
              </Link>
              <Link
                href={CALL_HREF}
                className="text-sm font-medium text-[var(--ink-soft)] underline-offset-4 transition hover:text-[var(--ink)] hover:underline"
              >
                Prefer to talk it through? →
              </Link>
            </div>
          </article>
        </section>

        {/* Reassurance row */}
        <section className="mx-auto mt-20 max-w-5xl px-5 sm:px-8">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--rule)] md:grid-cols-3">
            {[
              {
                title: "Page-level, not brand-level",
                body: "Citations happen at the URL level. SEOPage measures the page, names the competitor page that beat it, and tells you what to change on it — not just \"your brand was mentioned somewhere.\"",
              },
              {
                title: "Evidence on every verdict",
                body: "Every AI answer is captured in full and attached to the report. When you report a win — or a loss — to a client or your team, you have the receipt.",
              },
              {
                title: "A fix list, not a dashboard",
                body: "Every report ends with an ordered list of changes for the page: schema, direct answers, FAQ blocks, entity signals, crawler access. Make the changes; the weekly re-run shows whether they worked.",
              },
            ].map((b) => (
              <div key={b.title} className="bg-[var(--paper)] p-7">
                <h3 className="serif text-xl text-[var(--ink)]">{b.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)]">
                  {b.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8 lg:py-28">
          <p className="eyebrow text-center">Pricing FAQ</p>
          <h2 className="serif mt-5 text-balance text-center text-4xl leading-tight text-[var(--ink)] sm:text-5xl">
            Common questions.
          </h2>

          <ul className="mt-12 divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
            {pricingFaq.map((f) => (
              <li key={f.q}>
                <details className="group py-6">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-left text-base font-medium text-[var(--ink)] [&::-webkit-details-marker]:hidden">
                    <span>{f.q}</span>
                    <span
                      aria-hidden="true"
                      className="grid h-6 w-6 shrink-0 place-items-center text-[var(--ink-soft)] transition group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--ink-soft)]">
                    {f.a}
                  </p>
                </details>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
