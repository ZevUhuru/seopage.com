import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { JsonLd } from "@/components/JsonLd";
import { PRICE_LABEL } from "@/lib/config";

export const metadata: Metadata = {
  title: "What Is an SEO Landing Page? Definition, Types & How They Work",
  description:
    "An SEO landing page (also called an SEO page) is a page built to rank on Google and get cited by AI for one specific search. Definition, the main page types, anatomy, and the 2026 shift to AI search.",
  alternates: { canonical: "/seo-page" },
  openGraph: {
    title: "What Is an SEO Landing Page? Definition, Types & How They Work",
    description:
      "The plain-English reference for SEO landing pages: what they are, the main types, how they're built, and how they earn citations from AI search.",
    url: "https://seopage.com/seo-page",
    type: "article",
  },
};

const anatomy = [
  {
    title: "One targeted search and intent",
    body: "An SEO landing page targets one search, like a service plus a city, not a dozen. Everything on the page serves that single query and the customer behind it.",
  },
  {
    title: "A direct answer up top",
    body: "Search engines and AI tools pull the answer from your opening lines. The first sentence should answer the search in plain words, before any setup.",
  },
  {
    title: "Schema markup",
    body: "JSON-LD structured data (LocalBusiness, Service, FAQPage, Article) tells crawlers and AI tools exactly what the page is. A page with no schema is hard for them to read.",
  },
  {
    title: "A clean heading structure",
    body: "One H1, then ordered H2s and H3s, with your keyword used naturally. AI tools use the heading order to understand and extract the page.",
  },
  {
    title: "Real, local content",
    body: "Specific copy about your service and your area, plus the proof a buyer wants: reviews, credentials, service area, and a clear way to get in touch.",
  },
  {
    title: "An FAQ that answers questions",
    body: "A short FAQ with matching FAQPage schema is the single most-cited shape in AI search. Clear question, complete answer, easy to quote.",
  },
];

const types = [
  {
    name: "Local service page",
    targets: "Service + place intent",
    example: "“emergency roof repair Denver”",
  },
  {
    name: "City / service-area page",
    targets: "One page per place you serve",
    example: "“plumber in Round Rock”",
  },
  {
    name: "“Near me” page",
    targets: "On-the-spot, ready-to-call intent",
    example: "“electrician near me”",
  },
  {
    name: "Comparison page",
    targets: "Side-by-side decisions",
    example: "“Brand A vs Brand B”",
  },
  {
    name: "Best-of page",
    targets: "Early-stage research",
    example: "“best HVAC company in Austin”",
  },
  {
    name: "FAQ / definition page",
    targets: "Question and lookup intent",
    example: "“what is an SEO landing page”",
  },
  {
    name: "Use case page",
    targets: "Job-to-be-done research",
    example: "“tax help for freelancers”",
  },
  {
    name: "Programmatic page",
    targets: "Long-tail at scale",
    example: "“[service] in [city]”, many cities",
  },
];

const eras = [
  {
    period: "2000s",
    label: "Keyword era",
    body: "Pages ranked on keyword density and links. The usual format was a blog post or a generic product page.",
  },
  {
    period: "2010s",
    label: "Landing page era",
    body: "Conversion-focused page design became a craft of its own. Paid traffic drove most of the early evolution.",
  },
  {
    period: "Late 2010s",
    label: "Programmatic era",
    body: "Companies like Zapier, Yelp, and Tripadvisor proved that template-based pages could rank at scale across millions of long-tail searches, including one page per city.",
  },
  {
    period: "2020s",
    label: "AI search era",
    body: "ChatGPT, Perplexity, Claude, and Google AI Overviews changed what it means to rank. Being cited in an AI answer became its own kind of visibility, alongside a Google ranking.",
  },
];

const disambiguation = [
  {
    term: "SEO landing page vs landing page",
    body: "A landing page is any page built to convert traffic, often from ads or email. An SEO landing page is the kind whose traffic comes from organic search and AI citations, built to satisfy a specific search rather than an ad campaign.",
  },
  {
    term: "SEO landing page vs blog post",
    body: "A blog post is informational and built for top-of-funnel reach. An SEO landing page is structured and conversion-focused, built to rank and convert for years, not weeks.",
  },
  {
    term: "SEO landing page vs product page",
    body: "A product page defends one product and is fully brand-controlled. An SEO landing page targets a specific search and the customer behind it, often a local one ready to buy.",
  },
  {
    term: "SEO page vs SEO landing page",
    body: "They mean the same thing. “SEO page” is the shorter term, “SEO landing page” the fuller one, and “landing page SEO” is the practitioner's shorthand for the same work.",
  },
];

const aiShifts = [
  {
    title: "Schema is no longer optional",
    body: "AI tools read JSON-LD as a primary signal of what a page contains. A page without schema is close to invisible to the most precise systems.",
  },
  {
    title: "Direct answers replace snippets",
    body: "Where Google's featured snippet was a hint, the AI answer is the whole response. Pages that lead with a clear, quotable answer get pulled in. Pages that bury it do not.",
  },
  {
    title: "FAQ blocks do the heavy lifting",
    body: "FAQPage schema with direct-answer Q&A pairs is the most-cited content shape across AI search. A good FAQ block can earn several citations on its own.",
  },
  {
    title: "Mentions count, not just links",
    body: "Links still matter, but plain mentions of your business name in trusted content now feed AI retrieval too. Being named clearly, with your city, helps.",
  },
];

const faq = [
  {
    q: "What is an SEO landing page?",
    a: "An SEO landing page is a page built to rank for one specific search, usually a service plus a place like “roof repair Denver,” and to turn that visitor into a call or booking. It pairs clear copy with the on-page basics search engines read: the title tag, headings, meta description, and schema markup. It is the same thing as an “SEO page.”",
  },
  {
    q: "Is an SEO page the same as an SEO landing page?",
    a: "Yes. The two terms are used interchangeably. “SEO page” is the shorter name and “SEO landing page” is the fuller one. Both mean a structured page built to rank in search and get cited by AI for a specific query.",
  },
  {
    q: "Do landing pages help SEO?",
    a: "Yes, when they're built right. A focused page that targets one keyword and one location, with clean structure and real content, gives Google a clear result to rank. Most landing pages skip the on-page SEO, so they look fine but rank for nothing.",
  },
  {
    q: "How is an SEO landing page different from a regular landing page?",
    a: "A regular landing page is built to convert traffic from any source, often paid ads. An SEO landing page is built for organic search and AI citation, so its job is to match a real search and earn the click, not just convert an ad visitor.",
  },
  {
    q: "How many SEO landing pages does a local business need?",
    a: "Usually one per main service and one per city or area you serve, so each page targets its own search. A good start is your top few services across your top few locations.",
  },
  {
    q: "Which types of SEO landing pages convert best for local businesses?",
    a: "Service-plus-city pages and “near me” pages tend to convert best, because they catch people who are ready to call. Best-of and comparison pages catch earlier-stage research.",
  },
  {
    q: "Can AI build a good SEO landing page?",
    a: "Yes, when it does real research first instead of one-shot writing. The page needs a deliberate research step, clean structure, and correct schema. That is what SEOPage does: it researches your market, writes the page, and hands you the finished HTML.",
  },
];

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "DefinedTerm",
      "@id": "https://seopage.com/seo-page#term",
      name: "SEO Landing Page",
      alternateName: ["SEO Page", "Landing Page SEO"],
      description:
        "A structured web page built to rank in search engines and get cited by AI answer engines for one specific search, then convert that visitor into a customer.",
      url: "https://seopage.com/seo-page",
      inDefinedTermSet: {
        "@type": "DefinedTermSet",
        name: "SEOPage Reference",
        url: "https://seopage.com/seo-page",
      },
    },
    {
      "@type": "Article",
      "@id": "https://seopage.com/seo-page#article",
      headline:
        "What Is an SEO Landing Page? Definition, Types, and How They Work",
      description:
        "A plain-English reference for SEO landing pages: definition, the main types, page anatomy, history, and the 2026 shift to AI search.",
      mainEntityOfPage: "https://seopage.com/seo-page",
      about: { "@id": "https://seopage.com/seo-page#term" },
      author: { "@type": "Organization", name: "SEOPage", url: "https://seopage.com" },
      publisher: { "@type": "Organization", name: "SEOPage", url: "https://seopage.com" },
      articleSection: "Reference",
    },
    {
      "@type": "FAQPage",
      "@id": "https://seopage.com/seo-page#faq",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "SEOPage", item: "https://seopage.com" },
        {
          "@type": "ListItem",
          position: 2,
          name: "SEO Landing Page",
          item: "https://seopage.com/seo-page",
        },
      ],
    },
  ],
};

export default function SeoPageReference() {
  return (
    <>
      <JsonLd data={SCHEMA} />
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="mx-auto max-w-3xl px-5 pt-16 sm:px-8 lg:pt-24">
          <span className="kicker">Reference</span>
          <h1 className="display mt-4 text-[2.6rem] leading-[1.04] text-ink sm:text-5xl">
            What is an SEO landing page?
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-ink-2">
            An SEO landing page is a page built to rank in search and get cited
            by AI for one specific search, then turn that visitor into a
            customer.
          </p>
          <div className="mono mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.14em] text-muted">
            <span>Term</span>
            <span className="text-line-strong">·</span>
            <span>
              Also called <span className="text-ink-2">SEO page</span>
            </span>
            <span className="text-line-strong">·</span>
            <span>Marketing &amp; search</span>
          </div>
        </section>

        {/* Lead */}
        <section className="mx-auto max-w-3xl px-5 pt-12 sm:px-8">
          <p className="text-lg leading-9 text-ink-2">
            An <strong className="text-ink">SEO landing page</strong> (also
            called an <strong className="text-ink">SEO page</strong>, or{" "}
            <strong className="text-ink">landing page SEO</strong> in
            practitioner shorthand) is a web page built to rank in search
            results, get cited by AI answer engines like ChatGPT, Perplexity,
            and Google AI Overviews, and turn that traffic into a customer. A
            blog post informs. An SEO landing page converts. A product page
            defends one product. An SEO landing page targets one specific
            search. For a local business, that usually means one page per
            service and city, like “emergency roof repair Denver.”
          </p>
          <p className="mt-6 text-lg leading-9 text-ink-2">
            The category covers local service pages, city pages, “near me”
            pages, comparison and best-of pages, and FAQ or definition pages
            like this one. Each is its own page type, with its own shape and its
            own kind of searcher.
          </p>
        </section>

        {/* Anatomy */}
        <section className="border-t border-line mt-16">
          <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:py-20">
            <span className="kicker">Anatomy</span>
            <h2 className="display mt-3 text-[1.9rem] text-ink sm:text-4xl">
              Six things every good one has.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-ink-2">
              Whatever the business, a well-built SEO landing page has the same
              six parts.
            </p>
            <ol className="mt-10 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2">
              {anatomy.map((c, i) => (
                <li key={c.title} className="bg-surface p-7">
                  <span className="mono text-sm font-semibold text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold text-ink">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-2">
                    {c.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Types */}
        <section className="border-t border-line bg-surface-2">
          <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:py-20">
            <span className="kicker">Types</span>
            <h2 className="display mt-3 text-[1.9rem] text-ink sm:text-4xl">
              The main types, by what the searcher wants.
            </h2>
            <div className="mt-10 overflow-hidden rounded-lg border border-line bg-surface">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-line bg-surface-2">
                    {["Type", "Targets", "Example search"].map((h) => (
                      <th
                        key={h}
                        className="mono px-5 py-3.5 text-[10px] uppercase tracking-[0.14em] text-muted"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {types.map((t, i) => (
                    <tr
                      key={t.name}
                      className={i < types.length - 1 ? "border-b border-line" : ""}
                    >
                      <td className="px-5 py-3.5 font-semibold text-ink">
                        {t.name}
                      </td>
                      <td className="px-5 py-3.5 text-ink-2">{t.targets}</td>
                      <td className="px-5 py-3.5 text-muted">{t.example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* History */}
        <section className="border-t border-line">
          <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:py-20">
            <span className="kicker">A short history</span>
            <h2 className="display mt-3 text-[1.9rem] text-ink sm:text-4xl">
              How we got to the AI search era.
            </h2>
            <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {eras.map((e) => (
                <div key={e.period} className="bg-surface p-6">
                  <span className="mono text-[11px] uppercase tracking-[0.14em] text-muted">
                    {e.period}
                  </span>
                  <h3 className="mt-2 font-semibold text-ink">{e.label}</h3>
                  <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-2">
                    {e.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI shift */}
        <section className="border-t border-line bg-ink text-white">
          <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:py-20">
            <span className="mono text-[11px] uppercase tracking-[0.14em] text-white/45">
              What changed with AI search
            </span>
            <h2 className="display mt-3 text-[1.9rem] text-white sm:text-4xl">
              Four shifts that decide who gets cited.
            </h2>
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {aiShifts.map((s) => (
                <div
                  key={s.title}
                  className="rounded-lg border border-white/12 bg-white/[0.03] p-5"
                >
                  <p className="font-semibold text-white">{s.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/65">
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related terms */}
        <section className="border-t border-line">
          <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-20">
            <span className="kicker">Related terms</span>
            <h2 className="display mt-3 text-[1.9rem] text-ink sm:text-4xl">
              How it differs from similar pages.
            </h2>
            <dl className="mt-10 divide-y divide-line border-y border-line">
              {disambiguation.map((d) => (
                <div key={d.term} className="py-5">
                  <dt className="font-semibold text-ink">{d.term}</dt>
                  <dd className="mt-1.5 text-[0.95rem] leading-relaxed text-ink-2">
                    {d.body}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-line bg-surface-2">
          <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-20">
            <span className="kicker">Questions</span>
            <h2 className="display mt-3 text-[1.9rem] text-ink sm:text-4xl">
              Common questions
            </h2>
            <div className="mt-8 divide-y divide-line overflow-hidden rounded-lg border border-line bg-surface">
              {faq.map((f) => (
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
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-line">
          <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8 lg:py-24">
            <h2 className="display text-[1.9rem] text-ink sm:text-4xl">
              Want one built for your business?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-ink-2">
              Tell us what you do and where. We&apos;ll research your market and
              build a local SEO landing page you can publish. Preview it free,
              {" "}
              {PRICE_LABEL} to download.
            </p>
            <Link href="/intake" className="btn btn-accent btn-lg mt-8">
              Build my page
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
