import Link from "next/link";
import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { CHECKOUT_HREF, included, NOTIFY_HREF, offer, steps } from "@/lib/data";

export const metadata: Metadata = {
  title: "How SEO Landing Pages Are Built",
  description:
    "AI researches your site, your competitors, and the SERP — then drafts five competitive SEO landing pages engineered to get cited by ChatGPT and rank on Google. A real editor signs off every page before delivery.",
  alternates: { canonical: "https://seopage.com/how-it-works" },
  openGraph: {
    title: "How SEO Landing Pages Are Built — SEOPage",
    description:
      "Four-step pipeline: URL in, AI research, drafted-and-verified SEO landing pages, clean export to any CMS.",
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
            Built for ChatGPT.{" "}
            <span className="italic text-[var(--ink-soft)]">
              And for Google.
            </span>
          </h1>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-8 text-[var(--ink-soft)]">
            AI scans your site, your competitors, and the SERP for each target
            query. It drafts five competitive landing pages with the schema,
            structure, and direct answers AI search engines reward — and the
            metadata Google still wants. A real editor signs off every page
            before delivery.
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

        {/* What's included */}
        <section className="mx-auto max-w-5xl border-t border-[var(--rule)] px-5 py-20 sm:px-8 lg:py-24">
          <span className="eyebrow">In each page</span>
          <h2 className="serif mt-4 max-w-2xl text-balance text-4xl leading-tight text-[var(--ink)] sm:text-5xl">
            Six pieces every page gets.
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

        {/* Export */}
        <section className="mx-auto max-w-5xl border-t border-[var(--rule)] px-5 py-20 sm:px-8 lg:py-24">
          <span className="eyebrow">Export</span>
          <h2 className="serif mt-4 max-w-2xl text-balance text-4xl leading-tight text-[var(--ink)] sm:text-5xl">
            Publish in any CMS.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-[var(--ink-soft)]">
            Markdown, MDX, and HTML come out of the workflow. Move each page
            into the CMS or codebase you already use.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--rule)] sm:grid-cols-4">
            {[
              ["Markdown", "Export"],
              ["MDX", "Export"],
              ["HTML", "Export"],
              ["Copy", "Export"],
              ["WordPress", "CMS-ready"],
              ["Webflow", "CMS-ready"],
              ["Framer", "CMS-ready"],
              ["Next.js", "Code-ready"],
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
            {offer.priceLabel} for {offer.pages} SEO landing pages.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-[var(--ink-soft)]">
            See it run on your URL. One pack, no subscription.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={CHECKOUT_HREF}
              className="rounded-full bg-[var(--ink)] px-6 py-3.5 text-sm font-medium text-[var(--paper)] transition hover:bg-[var(--accent)]"
            >
              Buy the pack — {offer.priceLabel}
            </Link>
            <Link
              href={NOTIFY_HREF}
              className="text-sm font-medium text-[var(--ink-soft)] underline-offset-4 transition hover:text-[var(--ink)] hover:underline"
            >
              Notify me when self-serve launches →
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
