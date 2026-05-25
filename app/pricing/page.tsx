import Link from "next/link";
import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { CHECKOUT_HREF, NOTIFY_HREF, offer } from "@/lib/data";

export const metadata: Metadata = {
  title: "SEO Landing Page Pricing",
  description:
    "$699 for five competitive SEO landing pages, or $150 per page — engineered for AI search citation and Google rank. Researched by AI, signed off by a real editor. One-time purchase, no subscription.",
  alternates: { canonical: "https://seopage.com/pricing" },
  openGraph: {
    title: "SEO Landing Page Pricing — $699 for Five Pages, or $150 per Page",
    description:
      "One offer. Five competitive SEO landing pages engineered for ChatGPT citation and Google rank. AI-researched, human-verified, one-time purchase.",
    url: "https://seopage.com/pricing",
    type: "website",
  },
};

const pricingFaq = [
  {
    q: "How are the pages built to get cited by ChatGPT?",
    a: "AI search engines like ChatGPT, Perplexity, Claude, and Google AI Overviews pick sources based on structure: direct-answer paragraphs, FAQ markup, comparison tables, schema (Article, FAQPage, ItemList, Product), and clear entity signals. SEOPage engineers every page around those patterns — so the same page that ranks on Google is shaped to be picked up when AI engines cite a source.",
  },
  {
    q: "Is this really a one-time purchase?",
    a: "Yes. $699 buys the five-page pack, or $150 per page if you want fewer. No subscription, no auto-renewal, no per-seat fee. Come back when you want another pack.",
  },
  {
    q: "Is the content AI-generated?",
    a: "Yes — and that's the point. AI does the research and the drafting at a depth and speed a human can't match: scanning your site, your competitors, and the SERP for each target query, in the shape AI search engines reward. A human editor then reads every page end to end and signs off before delivery.",
  },
  {
    q: "What counts as one page?",
    a: "One target query consumes one page: one comparison, one alternatives page, one best-of, one FAQ hub, or one category page. The five pages can be any mix of types.",
  },
  {
    q: "What does the human verification actually do?",
    a: "An editor reads the AI draft, checks facts, fixes anything that doesn't hold up, tightens the copy, and adjusts voice so the page reads like something you'd publish. AI never ships straight to you.",
  },
  {
    q: "Can I publish the pages anywhere?",
    a: "Yes. Each page exports as Markdown, MDX, or HTML. Move it into WordPress, Webflow, Framer, Next.js, Astro, or anything else. The pages are not locked into a CMS.",
  },
  {
    q: "What if a page isn't useful?",
    a: "Email us. The whole point of starting with five pages is so you can judge the workflow on a small batch. If the structure or fit is off, we'll work with you on the verification pass — or refund.",
  },
  {
    q: "Do you do bigger packs or programmatic SEO?",
    a: "Not yet. The launch offer is one pack at a time. Once we've shipped enough $699 packs to know the workflow holds up, we'll talk about larger volume.",
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
            One offer.{" "}
            <span className="italic text-[var(--ink-soft)]">No subscription.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-[var(--ink-soft)]">
            Five competitive landing pages built to be cited by ChatGPT and
            ranked by Google. Pay once, ship five pages, come back when you need
            another pack.
          </p>
        </section>

        {/* Offer card */}
        <section className="mx-auto max-w-3xl px-5 sm:px-8">
          <article className="overflow-hidden rounded-3xl border border-[var(--rule)] bg-[var(--paper)] p-8 sm:p-12">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="serif text-3xl text-[var(--ink)]">SEO landing page pack</h2>
              <span className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
                {offer.unit}
              </span>
            </div>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="serif text-7xl leading-none text-[var(--ink)]">
                {offer.priceLabel}
              </span>
              <span className="text-base text-[var(--ink-soft)]">
                · {offer.pages} pages · one-time
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
          </article>
        </section>

        {/* Reassurance row */}
        <section className="mx-auto mt-20 max-w-5xl px-5 sm:px-8">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--rule)] md:grid-cols-3">
            {[
              {
                title: "Built for AI search",
                body: "Schema, FAQ, direct-answer copy, and entity signals shaped to be picked up by ChatGPT, Perplexity, Claude, and Google AI Overviews — not just blue links.",
              },
              {
                title: "Built for Google too",
                body: "Title tags, meta, internal links, and SERP-shaped sections. The new search and the old search, in the same page.",
              },
              {
                title: "Human-verified",
                body: "Every page is read end to end by a real editor before delivery. Facts checked, schema validated, copy approved. AI never ships alone.",
              },
            ].map((b) => (
              <div key={b.title} className="bg-[var(--paper)] p-7">
                <h3 className="serif text-xl text-[var(--ink)]">{b.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)]">{b.body}</p>
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
