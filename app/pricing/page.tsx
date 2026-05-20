import Link from "next/link";
import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Launch pricing for SEO landing page packs. Buy a small pack of competitive SEO landing pages and export them to your site.",
};

const packs = [
  {
    name: "Free sample",
    price: "Free",
    cadence: "1 SEO landing page",
    pitch: "Try the workflow on one SEO landing page idea before buying a pack.",
    cta: { label: "Request a sample", href: "mailto:hello@seopage.com?subject=SEOPage%20sample" },
    features: [
      "One competitive SEO landing page",
      "One page type",
      "Basic title/meta + outline",
      "Delivered through the beta workflow",
    ],
    highlight: false,
  },
  {
    name: "Starter",
    price: "$19",
    cadence: "3 SEO landing pages",
    pitch: "For testing a few obvious competitor or alternative SEO landing pages.",
    cta: { label: "Start with Starter", href: "mailto:hello@seopage.com?subject=SEOPage%20Starter%20pack" },
    features: [
      "3 SEO landing pages",
      "Comparison, alternative, or best-of pages",
      "FAQ + schema suggestions",
      "Markdown / HTML export",
      "Built for your site and competitors",
    ],
    highlight: true,
  },
  {
    name: "Growth",
    price: "$49",
    cadence: "10 SEO landing pages",
    pitch: "For building a small cluster around one product or category.",
    cta: { label: "Start with Growth", href: "mailto:hello@seopage.com?subject=SEOPage%20Growth%20pack" },
    features: [
      "10 SEO landing pages",
      "All launch page types",
      "Internal-link suggestions",
      "Metadata + FAQ + schema suggestions",
      "Markdown / MDX / HTML export",
    ],
    highlight: false,
  },
];

const pricingFaq = [
  {
    q: "Is this a subscription?",
    a: "No. The launch offer is SEO landing page packs only. You buy a small number of SEO landing pages, use them, and buy more only if the workflow is useful.",
  },
  {
    q: "What counts as one SEO landing page?",
    a: "One target SEO landing page idea consumes one credit: for example, one comparison SEO landing page, one alternatives SEO landing page, one best-of page, one FAQ hub, or one category page.",
  },
  {
    q: "What should I expect after publishing?",
    a: "SEOPage gives you a stronger starting SEO landing page for a specific search intent. Search performance still depends on your site, competition, links, indexing, and how useful the final page is.",
  },
  {
    q: "Can it publish directly to WordPress, Webflow, or Framer?",
    a: "SEOPage gives you SEO landing page copy, Markdown, MDX, or HTML that you can move into WordPress, Webflow, Framer, or a custom site. That keeps the page portable instead of locked into one CMS.",
  },
  {
    q: "Why SEO landing page packs?",
    a: "Packs make the value easy to judge. Buy a few SEO landing pages, publish the ones you like, and come back when you want another cluster.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <SiteHeader active="pricing" />
      <main className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <header className="max-w-3xl">
          <span className="eyebrow">Pricing</span>
          <h1 className="serif mt-5 text-balance text-5xl leading-[1.02] tracking-[-0.015em] text-[var(--ink)] sm:text-6xl">
            Buy SEO landing page packs.{" "}
            <span className="italic text-[var(--muted)]">Start small, then buy more when you need them.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--ink-soft)]">
            Start with a small pack, generate the competitive SEO landing pages you need, and
            export them into your site. No subscription required for the launch offer.
          </p>
        </header>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {packs.map((tier) => (
            <article
              key={tier.name}
              className={`flex h-full flex-col rounded-3xl border p-6 ${
                tier.highlight
                  ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]"
                  : "border-[var(--rule)] bg-[var(--paper)]"
              }`}
            >
              <div className="flex items-center justify-between">
                <h2
                  className={`serif text-2xl ${
                    tier.highlight ? "text-[var(--paper)]" : "text-[var(--ink)]"
                  }`}
                >
                  {tier.name}
                </h2>
                {tier.highlight ? (
                  <span className="mono rounded-full bg-[var(--signal)] px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-[var(--signal-deep)]">
                    Start here
                  </span>
                ) : null}
              </div>
              <p
                className={`mt-2 text-sm ${
                  tier.highlight ? "text-[var(--paper)]/70" : "text-[var(--ink-soft)]"
                }`}
              >
                {tier.pitch}
              </p>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="serif text-5xl">{tier.price}</span>
                <span
                  className={`text-xs ${
                    tier.highlight ? "text-[var(--paper)]/60" : "text-[var(--muted)]"
                  }`}
                >
                  {tier.cadence}
                </span>
              </div>
              <ul className="mt-8 space-y-3 text-sm">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${
                        tier.highlight ? "bg-[var(--signal)]" : "bg-[var(--signal-deep)]"
                      }`}
                    />
                    <span
                      className={tier.highlight ? "text-[var(--paper)]/85" : "text-[var(--ink-soft)]"}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href={tier.cta.href}
                className={`mt-8 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition ${
                  tier.highlight
                    ? "bg-[var(--signal)] text-[var(--signal-deep)] hover:brightness-95"
                    : "border border-[var(--rule-strong)] bg-transparent text-[var(--ink)] hover:bg-[var(--paper-soft)]"
                }`}
              >
                {tier.cta.label} →
              </Link>
            </article>
          ))}
        </div>

        {/* Feature comparison */}
        <section className="mt-20">
          <h2 className="serif text-3xl leading-tight text-[var(--ink)] sm:text-4xl">
            Compare in detail
          </h2>
          <div className="mt-7 overflow-hidden rounded-3xl border border-[var(--rule)]">
            <div className="mono grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-4 border-b border-[var(--rule)] bg-[var(--paper)] px-6 py-4 text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
              <span>Feature</span>
              <span className="text-center">Sample</span>
              <span className="text-center">Starter</span>
              <span className="text-center">Growth</span>
            </div>
            {[
              ["Included pages", "1", "3", "10"],
              ["Page types", "1", "Core", "All launch types"],
              ["Title and meta options", "✓", "✓", "✓"],
              ["FAQ and schema suggestions", "Basic", "✓", "✓"],
              ["Internal-link suggestions", "—", "Basic", "✓"],
              ["Export", "Copy", "Markdown / HTML", "MDX / HTML"],
              ["CMS-ready export", "Copy", "HTML", "MDX / HTML"],
              ["Publishing control", "You", "You", "You"],
              ["Best for", "Trying it", "First tests", "Small cluster"],
            ].map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-[1.4fr_1fr_1fr_1fr] items-center gap-4 px-6 py-3.5 text-sm ${
                  i !== 0 ? "border-t border-[var(--rule)]" : ""
                }`}
              >
                <span className="text-[var(--ink)]">{row[0]}</span>
                {row.slice(1).map((cell, j) => (
                  <span key={j} className="text-center text-[var(--ink-soft)]">
                    {cell}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-20">
          <h2 className="serif text-3xl leading-tight text-[var(--ink)] sm:text-4xl">
            Pricing FAQ
          </h2>
          <ul className="mt-6 divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
            {pricingFaq.map((f) => (
              <li key={f.q} className="py-6">
                <details className="group">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-left text-lg font-medium text-[var(--ink)] [&::-webkit-details-marker]:hidden">
                    <span>{f.q}</span>
                    <span
                      aria-hidden="true"
                      className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[var(--rule-strong)] text-[var(--ink-soft)] transition group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--ink-soft)]">{f.a}</p>
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
