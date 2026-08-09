import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { JsonLd } from "@/components/JsonLd";
import { BuyButton } from "@/components/BuyButton";
import { EmailCapture } from "@/components/EmailCapture";
import {
  DELIVERY_HOURS,
  PRICE_LABEL,
  PRICE_USD,
  PRODUCT,
} from "@/lib/config";

/* ================================================================
   Money page for the "on page seo services" cluster (services /
   service / company / expert / agency / packages / price). Written
   answer-first: the opening sentence defines the term, every section
   heading matches a question people actually search, and the FAQ
   mirrors People-Also-Ask phrasing.
   ================================================================ */

const TITLE = `On-Page SEO Services: ${PRICE_LABEL} Per Finished Page, Delivered in ${DELIVERY_HOURS} Hours`;
const DESCRIPTION = `On-page SEO services that deliver the page itself — research, copy, title tag, meta description, headings, FAQ, and schema, human-reviewed. ${PRICE_LABEL} per page, in your inbox within ${DELIVERY_HOURS} hours.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/on-page-seo-services" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://seopage.com/on-page-seo-services",
    siteName: "SEOPage",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const INCLUDED: { t: string; d: string }[] = [
  {
    t: "Search-intent & SERP research",
    d: "We read the results for your target keyword and work out what Google is actually rewarding — before a word is written.",
  },
  {
    t: "Keyword-focused title tag & meta description",
    d: "The two lines that decide your click-through rate, written around your keyword and sized to display in full.",
  },
  {
    t: "Heading structure (H1–H3)",
    d: "One clear H1 and a logical heading outline, so both crawlers and readers can follow the page at a glance.",
  },
  {
    t: "The full written page",
    d: "Complete, publish-ready copy matched to search intent — not an outline, not a draft, not a content brief.",
  },
  {
    t: "FAQ section, written to be quoted",
    d: "Direct answers to the questions searchers ask, with matching FAQPage schema so AI search can cite you by name.",
  },
  {
    t: "Schema markup",
    d: "Valid structured data matched to the page content, so machines can read what the page is about.",
  },
  {
    t: "Internal-link recommendations",
    d: "Which of your pages should link to the new one and where it should link out, so it strengthens your whole site.",
  },
  {
    t: "Human review",
    d: "A person reads and approves every page before it ships. Nothing goes out on autopilot.",
  },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "What are on-page SEO services?",
    a: "On-page SEO services optimize the elements of a web page that search engines read directly: the title tag, meta description, heading structure, body content, internal links, and structured data. Off-page SEO covers signals from outside the page, like backlinks. Our on-page service goes one step further than most: instead of auditing or advising on an existing page, we research, write, and deliver the optimized page itself.",
  },
  {
    q: "How much do on-page SEO services cost?",
    a: `Agencies typically charge $300–$1,000 per optimized page, and freelance SEO writers charge roughly $175–$350 for a researched piece. SEOPage charges a flat ${PRICE_LABEL} per finished page — research, writing, on-page optimization, schema, and human review included — because an efficient workflow does the heavy lifting and a person does the judging.`,
  },
  {
    q: "What's included in your on-page SEO service?",
    a: "Every order includes search-intent and competitor research, a keyword-focused title tag and meta description, a clean H1–H3 heading structure, the complete written page, an FAQ section with matching schema, internal-link recommendations, and a human review — delivered as one ready-to-publish HTML file.",
  },
  {
    q: "On-page SEO service vs. on-page SEO tools — which do I need?",
    a: "Tools like checkers and analyzers tell you what's wrong with a page; you still have to do the work. A service delivers the work. If you have an SEO team that just needs guidance, a tool is cheaper. If you want the finished page without learning SEO first, a done-for-you service gets you there in hours.",
  },
  {
    q: "Do you offer on-page SEO for agencies or white label?",
    a: `Yes. Agencies send us keywords and receive client-ready pages they can review and deliver under their own brand. If you need pages in volume or ongoing capacity, email ${PRODUCT.supportEmail} and we'll set up a direct arrangement.`,
  },
  {
    q: "How fast is delivery?",
    a: `Within ${DELIVERY_HOURS} hours of your order. After checkout you fill out a 5-minute brief; research and writing start immediately, a person reviews the result, and the finished page lands in your inbox.`,
  },
  {
    q: "Does on-page SEO still matter for AI search?",
    a: "More than ever. AI assistants like ChatGPT and Google's AI Overviews answer questions by reading pages and quoting the clearest ones. Clean structure, direct answers, and valid schema — classic on-page SEO — are exactly what make a page quotable. Every page we deliver is engineered for both Google rankings and AI citations.",
  },
];

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://seopage.com/on-page-seo-services#service",
      serviceType: "On-page SEO services",
      name: "Done-for-you on-page SEO service",
      provider: {
        "@type": "Organization",
        "@id": "https://seopage.com/#organization",
        name: "SEOPage",
        url: "https://seopage.com",
      },
      description: DESCRIPTION,
      offers: {
        "@type": "Offer",
        price: `${PRICE_USD}.00`,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: "https://seopage.com/on-page-seo-services",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://seopage.com/on-page-seo-services#faq",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "SEOPage",
          item: "https://seopage.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "On-Page SEO Services",
          item: "https://seopage.com/on-page-seo-services",
        },
      ],
    },
  ],
};

export default function OnPageSeoServicesPage() {
  return (
    <>
      <JsonLd data={SCHEMA} />
      <SiteHeader />
      <main>
        {/* Hero — definition-first, per GEO practice. */}
        <section className="relative overflow-hidden">
          <div className="grid-backdrop absolute inset-0 -z-10" aria-hidden />
          <div className="mx-auto max-w-3xl px-5 pb-16 pt-16 sm:px-8 lg:pb-20 lg:pt-24">
            <span className="kicker">On-page SEO services</span>
            <h1 className="display mt-5 text-[2.3rem] leading-[1.05] text-ink sm:text-[3rem]">
              On-page SEO services that deliver{" "}
              <span className="text-accent">the page itself.</span>
            </h1>
            <div className="measure mt-7 space-y-5 text-[1.06rem] leading-[1.75] text-ink-2">
              <p>
                On-page SEO services optimize what search engines read on a
                page: the title tag, meta description, headings, content,
                internal links, and schema markup. Most providers audit your
                page and hand you a to-do list. We do the whole job — research,
                writing, optimization, and human review — and deliver the
                finished page, ready to publish, for {PRICE_LABEL}.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <BuyButton label={`Get my page — ${PRICE_LABEL}`} />
              <a href="#included" className="btn btn-ghost btn-lg">
                What&apos;s included
              </a>
            </div>
            <p className="mt-5 text-sm text-muted">
              Delivered within {DELIVERY_HOURS} hours · human-reviewed · no
              subscription
            </p>
          </div>
        </section>

        {/* What's included */}
        <section id="included" className="border-t border-line bg-surface-2">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
            <div className="max-w-2xl">
              <h2 className="display text-[1.8rem] leading-[1.1] text-ink sm:text-[2.2rem]">
                What&apos;s included in our on-page SEO service
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-2">
                Every element of on-page SEO that matters, done for you, on one
                page built around one target keyword.
              </p>
            </div>
            <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {INCLUDED.map((i) => (
                <div key={i.t} className="border-t border-line-strong pt-4">
                  <h3 className="font-semibold text-ink">{i.t}</h3>
                  <p className="mt-1.5 text-[0.93rem] leading-relaxed text-ink-2">
                    {i.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing transparency */}
        <section className="border-t border-line">
          <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-20">
            <h2 className="display text-[1.8rem] leading-[1.1] text-ink sm:text-[2.2rem]">
              How much do on-page SEO services cost?
            </h2>
            <div className="measure mt-6 space-y-5 text-[1.02rem] leading-[1.75] text-ink-2">
              <p>
                Across the industry, on-page SEO pricing spans a wide range:
                agencies commonly charge $300–$1,000 per optimized page,
                researched freelance SEO content runs roughly $175–$350 per
                piece, and monthly on-page SEO packages start around $500 and
                climb quickly.
              </p>
              <p>
                We charge a flat {PRICE_LABEL} per finished page. The research
                and drafting run on a workflow we&apos;ve refined across
                hundreds of runs, so you pay for the two things that still
                deserve a bill: the process and the person who reviews the
                result.
              </p>
            </div>
            <div className="mt-8 divide-y divide-line border-y border-line">
              {[
                ["SEO agency, per optimized page", "$300–$1,000"],
                ["Freelance SEO writer, researched piece", "$175–$350"],
                ["Monthly on-page SEO package", "$500+/mo"],
                ["SEOPage, per finished page", PRICE_LABEL],
              ].map(([l, p], idx, arr) => (
                <div
                  key={l}
                  className={`flex items-baseline justify-between gap-4 py-3.5 ${
                    idx === arr.length - 1
                      ? "font-semibold text-ink"
                      : "text-ink-2"
                  }`}
                >
                  <span className="text-[0.95rem]">{l}</span>
                  <span className="mono text-[0.95rem]">{p}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section className="border-t border-line bg-surface-2">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
            <h2 className="display max-w-2xl text-[1.8rem] leading-[1.1] text-ink sm:text-[2.2rem]">
              Who this service is for
            </h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              {[
                {
                  t: "Local businesses",
                  d: "One page per service, one page per city. The standard local SEO playbook, without the agency retainer.",
                },
                {
                  t: "Small businesses & SaaS",
                  d: "Comparison pages, use-case pages, and service pages that target the searches your buyers actually make.",
                },
                {
                  t: "Agencies",
                  d: "Client-ready pages on demand. Send keywords, receive reviewed pages you can white-label and deliver.",
                },
              ].map((c) => (
                <div key={c.t} className="card p-6">
                  <h3 className="font-semibold text-ink">{c.t}</h3>
                  <p className="mt-2 text-[0.93rem] leading-relaxed text-ink-2">
                    {c.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-line">
          <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-20">
            <h2 className="display text-[1.8rem] leading-[1.1] text-ink sm:text-[2.2rem]">
              On-page SEO services: common questions
            </h2>
            <div className="mt-10 divide-y divide-line overflow-hidden rounded-lg border border-line bg-surface">
              {FAQS.map((f) => (
                <details key={f.q} className="group px-6 py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink">
                    {f.q}
                    <span className="shrink-0 text-muted transition-transform group-open:rotate-45">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 5v14M5 12h14"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-2">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
            <p className="mt-8 text-sm text-muted">
              New to this?{" "}
              <Link href="/seo-page" className="underline hover:text-ink">
                What is an SEO landing page?
              </Link>{" "}
              covers the fundamentals, and the{" "}
              <Link href="/" className="underline hover:text-ink">
                homepage
              </Link>{" "}
              walks through exactly what you get.
            </p>
          </div>
        </section>

        {/* CTA + capture */}
        <section className="border-t border-line bg-surface-2">
          <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8">
            <h2 className="display text-[1.9rem] leading-[1.08] text-ink sm:text-[2.3rem]">
              Skip the audit. Get the page.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-ink-2">
              Tell us the search you want to win. A researched, human-reviewed
              page is in your inbox within {DELIVERY_HOURS} hours.
            </p>
            <div className="mt-8 flex justify-center">
              <BuyButton label={`Get my page — ${PRICE_LABEL}`} />
            </div>
            <div className="mt-14 text-left">
              <EmailCapture />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
