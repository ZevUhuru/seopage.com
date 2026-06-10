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
        <section className="mx-auto max-w-6xl px-5 pb-16 pt-14 sm:px-8 lg:pt-20">
          <p className="label">§ 01 · How it works</p>
          <h1 className="display mt-6 text-6xl text-[var(--ink)] sm:text-7xl lg:text-8xl">
            URL in. <span className="text-[var(--red)]">Report out.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-[var(--ink-soft)]">
            No tracking setup, no prompt research, no spreadsheet of AI answers.
            SEOPage reads your page, asks the questions your buyers ask, runs
            them across the four AI channels that matter, and reports back with
            evidence — every week.
          </p>
        </section>

        {/* Steps */}
        <section className="border-t-2 border-[var(--ink)]">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
            <p className="label">§ 02 · The pipeline</p>
            <h2 className="display mt-5 text-4xl text-[var(--ink)] sm:text-5xl lg:text-6xl">
              Four steps. One loop.
            </h2>

            <ol className="mt-12 grid border-2 border-[var(--ink)] md:grid-cols-2 lg:grid-cols-4">
              {steps.map((s, i) => (
                <li
                  key={s.number}
                  className={`p-7 ${i > 0 ? "border-t-2 border-[var(--ink)] md:border-t-0 md:border-l-2" : ""} ${
                    i === 2 ? "md:border-t-2 md:border-l-0 lg:border-l-2 lg:border-t-0" : ""
                  } ${i === 3 ? "md:border-t-2 lg:border-t-0" : ""}`}
                >
                  <span className="display text-5xl text-[var(--red)]">
                    {s.number}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold leading-snug text-[var(--ink)]">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--ink-soft)]">
                    {s.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Channels */}
        <section className="border-t-2 border-[var(--ink)]">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
            <p className="label">§ 03 · The channels</p>
            <h2 className="display mt-5 max-w-3xl text-4xl text-[var(--ink)] sm:text-5xl lg:text-6xl">
              Every prompt runs on all four engines.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-[var(--ink-soft)]">
              Each engine selects sources differently. A page Perplexity cites
              on every answer can be invisible to Claude. That&apos;s why a
              verdict on one channel tells you almost nothing — and why every
              report covers all four.
            </p>

            <div className="mt-10 grid border-2 border-[var(--ink)] sm:grid-cols-2">
              {channels.map((c, i) => (
                <div
                  key={c.key}
                  className={`p-7 ${i > 0 ? "border-t-2 border-[var(--ink)]" : ""} ${
                    i % 2 === 1 ? "sm:border-l-2 sm:border-t-0" : ""
                  } ${i > 1 ? "sm:border-t-2" : ""}`}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="display text-2xl text-[var(--ink)]">
                      {c.label}
                    </h3>
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
          </div>
        </section>

        {/* What's in the report */}
        <section className="border-t-2 border-[var(--ink)]">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
            <p className="label">§ 04 · In every report</p>
            <h2 className="display mt-5 text-4xl text-[var(--ink)] sm:text-5xl lg:text-6xl">
              Six pieces every report gets.
            </h2>

            <ul className="mt-12 grid border-2 border-[var(--ink)] md:grid-cols-2">
              {included.map((f, i) => (
                <li
                  key={f.title}
                  className={`p-7 ${i > 0 ? "border-t-2 border-[var(--ink)]" : ""} ${
                    i % 2 === 1 ? "md:border-l-2 md:border-t-0" : ""
                  } ${i > 1 ? "md:border-t-2" : ""}`}
                >
                  <span className="mono text-[11px] text-[var(--red)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold leading-snug text-[var(--ink)]">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--ink-soft)]">
                    {f.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Delivery */}
        <section className="border-t-2 border-[var(--ink)]">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
            <p className="label">§ 05 · Delivery</p>
            <h2 className="display mt-5 text-4xl text-[var(--ink)] sm:text-5xl lg:text-6xl">
              Built to be forwarded.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-[var(--ink-soft)]">
              Every report ships as a shareable link and a PDF, with the
              captured AI answers attached. Send it to a client, drop it in
              Slack, or put it in the Monday deck — the evidence travels with
              it.
            </p>

            <div className="mt-10 grid grid-cols-2 border-2 border-[var(--ink)] sm:grid-cols-4">
              {[
                ["Shareable link", "Every report"],
                ["PDF export", "Client-ready"],
                ["Answer evidence", "Attached"],
                ["Weekly email", "Movement"],
                ["Prompt editing", "Any time"],
                ["URL swapping", "Any time"],
                ["Fix list", "Per page"],
                ["History", "Kept"],
              ].map(([label, status], i) => (
                <div
                  key={label}
                  className={`flex flex-col gap-1 px-5 py-4 ${
                    i % 2 === 1 ? "border-l border-[var(--rule)]" : ""
                  } ${i % 4 !== 0 ? "sm:border-l sm:border-[var(--rule)]" : ""} ${
                    i > 1 ? "border-t border-[var(--rule)] sm:border-t-0" : ""
                  } ${i > 3 ? "sm:border-t sm:border-[var(--rule)]" : ""}`}
                >
                  <span className="text-sm font-medium text-[var(--ink)]">
                    {label}
                  </span>
                  <span className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t-2 border-[var(--ink)] bg-[var(--ink)]">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
            <p className="mono text-[11px] uppercase tracking-[0.28em] text-[var(--paper)]/60">
              § 06 · The offer
            </p>
            <h2 className="display mt-6 text-5xl text-[var(--paper)] sm:text-6xl lg:text-7xl">
              See it run on your own page —{" "}
              <span className="text-[var(--red)]">before you pay anything.</span>
            </h2>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link
                href={START_HREF}
                className="mono border-2 border-[var(--paper)] bg-[var(--paper)] px-7 py-4 text-[13px] uppercase tracking-[0.18em] text-[var(--ink)] transition hover:bg-[var(--red)] hover:text-[var(--paper)] hover:border-[var(--red)]"
              >
                Get your first report — free
              </Link>
              <Link
                href={CALL_HREF}
                className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--paper)]/70 underline underline-offset-8 transition hover:text-[var(--paper)]"
              >
                Prefer to talk it through? →
              </Link>
            </div>
            <p className="mono mt-8 text-[10px] uppercase tracking-[0.22em] text-[var(--paper)]/50">
              First report free · Then {offer.priceLabel}/mo · One plan · Cancel
              anytime
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
