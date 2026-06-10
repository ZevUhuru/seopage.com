import Link from "next/link";
import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import {
  CALL_HREF,
  channels,
  included,
  offer,
  START_HREF,
  steps,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "How the AI Rank Report Works",
  description:
    "Paste a URL. SEOPage generates the buyer prompts the page should win, runs them across ChatGPT, Google AI Overviews, Perplexity, and Claude, and reports where you're cited, who beats you, and what to fix — every week.",
  alternates: { canonical: "https://seopage.com/how-it-works" },
  openGraph: {
    title: "How the AI Rank Report Works — SEOPage",
    description:
      "Four-step pipeline: URL in, prompt set generated, all 4 AI channels run, report out with evidence and a fix list — re-run weekly.",
    url: "https://seopage.com/how-it-works",
    type: "website",
  },
};

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <SiteHeader active="how" />

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-3xl px-5 pb-16 pt-20 text-center sm:px-8 lg:pt-28">
          <span className="eyebrow">How it works</span>
          <h1 className="serif mt-5 text-balance text-5xl leading-[1.05] text-[var(--ink)] sm:text-6xl lg:text-7xl">
            URL in.{" "}
            <span className="italic text-[var(--ink-soft)]">Report out.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-8 text-[var(--ink-soft)]">
            No tracking setup, no prompt research, no spreadsheet of AI answers.
            SEOPage reads your page, asks the questions your buyers ask, runs
            them across the four AI channels that matter, and reports back with
            evidence — every week.
          </p>
        </section>

        {/* Steps */}
        <section className="mx-auto max-w-5xl border-t border-[var(--rule)] px-5 py-20 sm:px-8 lg:py-24">
          <span className="eyebrow">The pipeline</span>
          <h2 className="serif mt-4 max-w-2xl text-balance text-4xl leading-tight text-[var(--ink)] sm:text-5xl">
            Four steps. One loop.
          </h2>

          <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--rule)] md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <li key={s.number} className="bg-[var(--paper)] p-8">
                <span className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
                  Step {s.number}
                </span>
                <h3 className="serif mt-4 text-2xl leading-snug text-[var(--ink)]">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)]">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* Channels */}
        <section className="mx-auto max-w-5xl border-t border-[var(--rule)] px-5 py-20 sm:px-8 lg:py-24">
          <span className="eyebrow">The channels</span>
          <h2 className="serif mt-4 max-w-2xl text-balance text-4xl leading-tight text-[var(--ink)] sm:text-5xl">
            Every prompt runs on all four engines.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-[var(--ink-soft)]">
            Each engine selects sources differently. A page Perplexity cites on
            every answer can be invisible to Claude. That&apos;s why a verdict
            on one channel tells you almost nothing — and why every report
            covers all four.
          </p>

          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--rule)] sm:grid-cols-2">
            {channels.map((c) => (
              <div key={c.key} className="bg-[var(--paper)] p-7">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="serif text-xl text-[var(--ink)]">{c.label}</h3>
                  <span className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                    {c.subtitle}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)]">
                  {c.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* What's in the report */}
        <section className="mx-auto max-w-5xl border-t border-[var(--rule)] px-5 py-20 sm:px-8 lg:py-24">
          <span className="eyebrow">In every report</span>
          <h2 className="serif mt-4 max-w-2xl text-balance text-4xl leading-tight text-[var(--ink)] sm:text-5xl">
            Six pieces every report gets.
          </h2>

          <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--rule)] md:grid-cols-2">
            {included.map((f, i) => (
              <li key={f.title} className="bg-[var(--paper)] p-8">
                <span className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="serif mt-4 text-2xl leading-snug text-[var(--ink)]">
                  {f.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)]">
                  {f.body}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Delivery */}
        <section className="mx-auto max-w-5xl border-t border-[var(--rule)] px-5 py-20 sm:px-8 lg:py-24">
          <span className="eyebrow">Delivery</span>
          <h2 className="serif mt-4 max-w-2xl text-balance text-4xl leading-tight text-[var(--ink)] sm:text-5xl">
            Built to be forwarded.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-[var(--ink-soft)]">
            Every report ships as a shareable link and a PDF, with the captured
            AI answers attached. Send it to a client, drop it in Slack, or put
            it in the Monday deck — the evidence travels with it.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--rule)] sm:grid-cols-4">
            {[
              ["Shareable link", "Every report"],
              ["PDF export", "Client-ready"],
              ["Answer evidence", "Attached"],
              ["Weekly email", "Movement"],
              ["Prompt editing", "Any time"],
              ["URL swapping", "Any time"],
              ["Fix list", "Per page"],
              ["History", "Kept"],
            ].map(([label, status]) => (
              <div
                key={label}
                className="flex items-center justify-between bg-[var(--paper)] px-5 py-4"
              >
                <span className="text-sm text-[var(--ink)]">{label}</span>
                <span className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                  {status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-8 lg:py-32">
          <p className="eyebrow">The offer</p>
          <h2 className="serif mt-5 text-balance text-5xl leading-[1.05] text-[var(--ink)] sm:text-6xl">
            First report free. Then {offer.priceLabel}/mo.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-[var(--ink-soft)]">
            See it run on your own page before you pay anything. One plan,
            everything included, cancel anytime.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
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
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
