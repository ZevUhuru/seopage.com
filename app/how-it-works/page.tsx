import Link from "next/link";
import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { includedFeatures, stackSteps } from "@/lib/data";

const SAMPLE_REQUEST_HREF =
  "mailto:hello@seopage.com?subject=SEOPage%20sample%20request&body=Site%20URL%3A%20%0ACompetitors%20or%20keywords%3A%20%0A";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "How SEOPage turns your website and competitor context into competitive SEO landing pages you can export to your site.",
};

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <SiteHeader active="how" />

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
          <span className="eyebrow">How it works</span>
          <h1 className="serif mt-5 max-w-4xl text-balance text-5xl leading-[1.02] tracking-[-0.015em] text-[var(--ink)] sm:text-6xl lg:text-7xl">
            Generate competitive SEO landing pages for your product.{" "}
            <span className="italic text-[var(--muted)]">From your site, competitors, and target search.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--ink-soft)]">
            Give SEOPage your website, the kind of page you want, and any competitors or
            keywords you care about. It creates a structured SEO landing page with
            sections, copy, metadata, FAQs, and export formats ready for your CMS.
          </p>
        </section>

        {/* Pipeline */}
        <section className="bg-[var(--paper)]">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
            <span className="eyebrow">The pipeline</span>
            <h2 className="serif mt-5 max-w-2xl text-balance text-4xl leading-tight sm:text-5xl">
              Four steps, one loop.
            </h2>

            <div className="mt-12 space-y-px overflow-hidden rounded-3xl border border-[var(--rule)]">
              {stackSteps.map((s, i) => (
                <div
                  key={s.number}
                  className={`grid gap-8 bg-[var(--background)] p-8 md:grid-cols-[160px_1fr_1fr] md:items-start md:p-10 ${
                    i !== 0 ? "border-t border-[var(--rule)]" : ""
                  }`}
                >
                  <div>
                    <span className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--signal-deep)]">
                      Step {s.number}
                    </span>
                    <h3 className="serif mt-4 text-4xl leading-tight text-[var(--ink)]">
                      {s.title}
                    </h3>
                  </div>
                  <p className="text-base leading-8 text-[var(--ink-soft)]">{s.body}</p>
                  <div className="rounded-2xl border border-[var(--rule)] bg-[var(--paper)] p-5">
                    <span className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                      Under the hood
                    </span>
                    <p className="mt-3 text-sm leading-7 text-[var(--ink)]">{s.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What's included */}
        <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
          <span className="eyebrow">What ships with every SEO landing page</span>
          <h2 className="serif mt-5 max-w-3xl text-balance text-4xl leading-tight sm:text-5xl">
            Six practical pieces every SEO landing page gets.
          </h2>

          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-[var(--rule)] bg-[var(--rule)] md:grid-cols-2 lg:grid-cols-3">
            {includedFeatures.map((f) => (
              <div key={f.title} className="flex flex-col gap-4 bg-[var(--paper)] p-7">
                <span className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
                  {f.tag}
                </span>
                <h3 className="serif text-2xl leading-tight text-[var(--ink)]">{f.title}</h3>
                <p className="text-sm leading-7 text-[var(--ink-soft)]">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Integrations */}
        <section className="bg-[var(--paper)]">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
            <span className="eyebrow">Export first</span>
            <h2 className="serif mt-5 max-w-2xl text-balance text-4xl leading-tight sm:text-5xl">
              Own the SEO landing page before it goes anywhere.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-[var(--ink-soft)]">
              The launch version is built around copy, Markdown, MDX, and HTML export.
              Start there, then publish inside the CMS you already use.
            </p>

            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Copy", "Export"],
                ["Markdown", "Export"],
                ["MDX", "Export"],
                ["HTML", "Export"],
                ["WordPress", "CMS-ready"],
                ["Webflow", "CMS-ready"],
                ["Framer", "CMS-ready"],
                ["Next.js", "Code-ready"],
              ].map(([label, status]) => (
                <div
                  key={label}
                  className="flex items-center justify-between rounded-2xl border border-[var(--rule)] bg-[var(--background)] px-5 py-4"
                >
                  <span className="text-[var(--ink)]">{label}</span>
                  <span className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--signal-deep)]">
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-6xl px-5 pb-24 pt-20 sm:px-8 lg:pb-32 lg:pt-28">
          <div className="overflow-hidden rounded-3xl border border-[var(--rule)] bg-[var(--ink)] p-10 text-[var(--paper)] sm:p-14">
            <span className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--signal)]">
              Try it on your site
            </span>
            <h2 className="serif mt-5 max-w-2xl text-balance text-4xl leading-tight sm:text-5xl">
              The fastest way to understand it is to see it on your URL.
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={SAMPLE_REQUEST_HREF}
                className="rounded-full bg-[var(--signal)] px-6 py-3.5 text-sm font-medium text-[var(--signal-deep)] transition hover:brightness-95"
              >
                Get a sample →
              </Link>
              <Link
                href="/pricing"
                className="rounded-full border border-white/15 px-6 py-3.5 text-sm font-medium text-[var(--paper)] transition hover:bg-white/5"
              >
                Pricing
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
