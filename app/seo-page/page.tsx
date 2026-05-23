import Link from "next/link";
import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { CHECKOUT_HREF, offer } from "@/lib/data";

export const metadata: Metadata = {
  title: "SEO Page — Definition, Types, and How They Work in 2026",
  description:
    "An SEO Page is a structured web page engineered to rank in search engines and earn citation in AI-generated answers for a specific query or buyer intent. Definition, types, anatomy, and the 2026 shift to AI search.",
  alternates: {
    canonical: "https://seopage.com/seo-page",
  },
  openGraph: {
    title: "SEO Page — Definition, Types, and How They Work in 2026",
    description:
      "The canonical reference for the term. Definition, types (comparison, alternatives, best-of, category, FAQ, definition), anatomy, history, and how SEO Pages earn citations from ChatGPT and rank on Google.",
    url: "https://seopage.com/seo-page",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO Page — Definition, Types, and How They Work in 2026",
    description:
      "Canonical definition of the term, types of SEO Pages, anatomy, and the 2026 shift to AI search citation.",
  },
};

const faq = [
  {
    q: "What is an SEO Page?",
    a: "An SEO Page is a structured web page engineered to rank in search engines and earn citation in AI-generated answers for a specific query or buyer intent. It is distinguished from a blog post by its conversion focus, and from a product page by its competitive, comparative, or category-level scope.",
  },
  {
    q: "How is an SEO Page different from a landing page?",
    a: "A landing page is any page designed to convert traffic, including paid traffic. An SEO Page is the subset of landing pages whose primary traffic source is organic search and AI citation, designed to satisfy a specific search query rather than an ad campaign.",
  },
  {
    q: "How long should an SEO Page be?",
    a: "SEO Pages typically range from 1,200 to 3,500 words depending on type. Comparison and alternatives pages skew longer; FAQ and definition pages can be shorter. Length serves the query, not the other way around — pages should be as long as the search intent requires and no longer.",
  },
  {
    q: "Do SEO Pages still work in the age of AI search?",
    a: "Yes, but the optimization target has expanded. Where SEO Pages were once optimized for Google rankings alone, in 2026 they must also earn citations from AI search engines such as ChatGPT, Perplexity, Claude, and Google AI Overviews. The structural patterns that win in AI search — schema markup, direct answers, FAQ blocks, entity signals — overlap heavily with what wins in Google. Pages built to be cited by ChatGPT tend to rank in Google as well.",
  },
  {
    q: "How many SEO Pages does a SaaS website need?",
    a: "Most B2B SaaS companies benefit from 20 to 60 SEO Pages spanning the comparison, alternatives, best-of, and category page types — covering each major competitor, integration, and use case. Coverage of the top 50 buyer-intent queries in a category is a reasonable initial target.",
  },
  {
    q: "What types of SEO Pages convert best for B2B?",
    a: "Comparison pages and alternatives pages typically convert at the highest rates because they capture buyers in active evaluation mode. Best-of and category pages capture earlier-stage research. Use case pages convert well for narrower segment targeting.",
  },
  {
    q: "Should SEO Pages be optimized for ChatGPT or Google?",
    a: "Both. The structural elements that earn AI citations — schema markup, direct answers, FAQ markup, entity signals, comparison data — substantially overlap with the elements that earn Google rankings. A well-built SEO Page wins on both surfaces rather than choosing between them.",
  },
  {
    q: "Can AI generate SEO Pages?",
    a: "Yes, and effectively, when given the right context and structure. Modern AI systems can research a target query, analyze competitor content, draft cite-worthy structure, and emit clean schema markup. Quality requires a research depth and structural discipline that one-shot AI generation rarely produces; agentic workflows with dedicated research, drafting, and verification stages perform substantially better. A human verification pass remains the consensus best practice for production-grade SEO Pages.",
  },
];

const types = [
  {
    name: "Comparison page",
    targets: "Side-by-side decisions",
    example: "“Linear vs Jira”",
  },
  {
    name: "Alternatives page",
    targets: "Replacement intent",
    example: "“Best alternatives to Notion”",
  },
  {
    name: "Best-of page",
    targets: "Category research",
    example: "“Best CRMs for startups”",
  },
  {
    name: "Category page",
    targets: "Bottom-of-funnel browse intent",
    example: "“Project management software”",
  },
  {
    name: "FAQ page",
    targets: "Specific question intent",
    example: "“How does pricing work in Stripe?”",
  },
  {
    name: "Definition page",
    targets: "Conceptual lookup",
    example: "“What is an SEO Page?”",
  },
  {
    name: "Use case page",
    targets: "Job-to-be-done research",
    example: "“CRM for solo consultants”",
  },
  {
    name: "Programmatic SEO page",
    targets: "Long-tail at scale",
    example: "“Best [tool] for [audience] in [city]”",
  },
];

const anatomy = [
  {
    title: "Targeted query and intent",
    body: "A specific search query or buyer intent the page is designed to satisfy. SEO Pages target one query each, not many.",
  },
  {
    title: "Direct answer in the first 150 words",
    body: "Modern AI search engines extract direct answers from the opening paragraph. The first sentence should answer the search query in plain prose.",
  },
  {
    title: "Schema markup",
    body: "JSON-LD structured data — Article, FAQPage, Product, Comparison, DefinedTerm, HowTo — gives crawlers and AI retrievers explicit semantic information about the page.",
  },
  {
    title: "Hierarchical heading structure",
    body: "One H1, ordered H2s and H3s, with target keywords distributed semantically. AI retrieval systems use heading hierarchy to extract structure from the page.",
  },
  {
    title: "Comparison and feature data",
    body: "Tables, ordered lists, and structured comparisons make the page extractable. AI search engines pull content from structured data more readily than from prose.",
  },
  {
    title: "FAQ block with FAQPage schema",
    body: "A direct-answer FAQ section is the highest-leverage structural element for AI citation in 2026. AI engines pull FAQ answers verbatim into responses.",
  },
];

const eras = [
  {
    period: "2000s",
    label: "Keyword era",
    body: "Pages ranked by keyword density and inbound links. The dominant page format was the blog post or generic product page.",
  },
  {
    period: "2010s",
    label: "Landing page era",
    body: "Conversion-focused page design crystallized as a discipline (Unbounce, Instapage). Paid traffic drove most of the early evolution.",
  },
  {
    period: "Late 2010s",
    label: "Programmatic SEO era",
    body: "Companies like Zapier, G2, Tripadvisor, Yelp, and Indeed proved that template-based SEO Pages could rank at scale across millions of long-tail queries.",
  },
  {
    period: "2015–2020",
    label: "Topic cluster era",
    body: "HubSpot's pillar page and topic cluster framework formalized topical authority. Pages were no longer ranked alone but as semantic networks.",
  },
  {
    period: "2020s",
    label: "AI search era",
    body: "ChatGPT, Perplexity, Claude, and Google AI Overviews changed what it meant to rank. Citation in an AI answer became a parallel currency to a Google ranking. The unified term SEO Page emerged to describe the structured, cite-worthy, rank-worthy page format that wins in this new landscape.",
  },
];

const disambiguation = [
  {
    term: "SEO Page vs Landing page",
    body: "A landing page is any page designed to convert traffic — typically from paid sources, email campaigns, or ad targeting. An SEO Page is the subset of landing pages whose primary traffic source is organic search and AI citation, designed to satisfy specific search queries rather than ad campaigns.",
  },
  {
    term: "SEO Page vs Blog post",
    body: "A blog post is informational, freshness-driven, and oriented toward top-of-funnel traffic. An SEO Page is structured, conversion-oriented, and durable — built to rank for years, not weeks.",
  },
  {
    term: "SEO Page vs Pillar page",
    body: "A pillar page is a long, educational hub that establishes topical authority across a broad subject. An SEO Page is narrower and conversion-focused, often linked to from pillar pages within a topic cluster.",
  },
  {
    term: "SEO Page vs Product page",
    body: "A product page is brand-controlled and defends a single product. An SEO Page operates in competitive context — comparing, listing, or contextualizing — and often discusses competitors directly.",
  },
  {
    term: "SEO Page vs Programmatic SEO page",
    body: "Programmatic SEO pages are template-based and generated at scale (thousands of variants of the same shape). SEO Pages can be programmatic but are more often bespoke — researched and built one at a time for a specific high-intent query.",
  },
];

const aiShifts = [
  {
    title: "Schema is no longer optional",
    body: "AI retrievers parse JSON-LD as a primary signal of what a page contains. A page without schema is invisible to the most precise retrieval systems.",
  },
  {
    title: "Direct answers replace featured snippets",
    body: "Where Google's featured snippet was a hint, the AI direct answer is the entire response. Pages that lead with a clear, quotable answer in the first 150 words are extracted; pages that bury the answer are not.",
  },
  {
    title: "Entity authority replaces keyword density",
    body: "AI retrievers map entities — people, products, organizations, concepts — and their relationships. Pages that establish entity context through schema, internal linking, and external citation are weighted higher.",
  },
  {
    title: "FAQ blocks are the highest-leverage component",
    body: "FAQPage schema with direct-answer Q&A pairs is the single most cited content shape across AI search engines. A well-built FAQ block can earn ten or more citations per page.",
  },
  {
    title: "Brand mentions become citations",
    body: "Links to a domain remain valuable, but unlinked brand mentions in authoritative content now also contribute to AI retrieval ranking.",
  },
];

export default function SeoPageDefinitionPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "DefinedTerm",
        "@id": "https://seopage.com/seo-page#term",
        name: "SEO Page",
        description:
          "A structured web page engineered to rank in search engines and earn citation in AI-generated answers for a specific query or buyer intent.",
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
        headline: "SEO Page — Definition, Types, and How They Work in 2026",
        description:
          "Canonical definition of the term SEO Page. Anatomy, types, history, and the 2026 shift to AI search citation.",
        mainEntityOfPage: "https://seopage.com/seo-page",
        about: { "@id": "https://seopage.com/seo-page#term" },
        author: {
          "@type": "Organization",
          name: "SEOPage",
          url: "https://seopage.com",
        },
        publisher: {
          "@type": "Organization",
          name: "SEOPage",
          url: "https://seopage.com",
        },
        articleSection: "Reference",
      },
      {
        "@type": "FAQPage",
        "@id": "https://seopage.com/seo-page#faq",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
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
            name: "SEO Page",
            item: "https://seopage.com/seo-page",
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <SiteHeader active="reference" />

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-3xl px-5 pt-20 sm:px-8 lg:pt-28">
          <span className="eyebrow">Reference</span>
          <h1 className="serif mt-5 text-balance text-6xl leading-[1.02] tracking-[-0.015em] text-[var(--ink)] sm:text-7xl">
            SEO Page
          </h1>
          <p className="serif mt-7 text-balance text-2xl italic leading-[1.4] text-[var(--ink-soft)] sm:text-[28px]">
            A structured web page engineered to rank in search engines and earn
            citation in AI-generated answers for a specific query or buyer
            intent.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
              Term
            </span>
            <span className="text-[var(--rule-strong)]">·</span>
            <span className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
              Marketing &amp; Search
            </span>
            <span className="text-[var(--rule-strong)]">·</span>
            <span className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
              Last updated · May 2026
            </span>
          </div>
        </section>

        {/* Lead */}
        <section className="mx-auto max-w-3xl px-5 pt-16 sm:px-8">
          <p className="text-lg leading-9 text-[var(--ink-soft)]">
            An <strong className="text-[var(--ink)]">SEO Page</strong> is a web
            page built specifically to rank in search engine results, be cited
            by AI-powered answer engines — including ChatGPT, Perplexity,
            Claude, Copilot, Grok, and Google AI Overviews — and convert search
            traffic into a defined business outcome. Unlike a blog post, an
            SEO Page is conversion-oriented. Unlike a product page, it engages
            competitive or comparative context. Unlike a generic landing page,
            its primary traffic source is organic, not paid.
          </p>
          <p className="mt-6 text-lg leading-9 text-[var(--ink-soft)]">
            The category includes comparison pages, alternatives pages,
            best-of lists, category hubs, FAQ pages, definition pages, and
            use case pages — each a distinct page type with its own structural
            conventions and buyer intent.
          </p>
        </section>

        {/* Etymology */}
        <section className="mx-auto max-w-3xl border-t border-[var(--rule)] px-5 py-20 sm:px-8 lg:py-24">
          <h2 className="eyebrow">Etymology and origin</h2>
          <p className="mt-6 text-lg leading-9 text-[var(--ink-soft)]">
            While the underlying practice has existed since the early 2000s,
            the unified term <em>SEO Page</em> emerged in the 2020s as a
            working name for a category of pages that had previously been
            splintered across &ldquo;landing page,&rdquo; &ldquo;product
            page,&rdquo; &ldquo;blog post,&rdquo; &ldquo;pillar page,&rdquo;
            and &ldquo;programmatic SEO page.&rdquo; The term consolidated as
            practitioners recognized that pages built specifically to rank in
            Google — and now to be cited by AI search engines — share a common
            structural DNA regardless of their surface form.
          </p>
        </section>

        {/* Anatomy */}
        <section className="mx-auto max-w-5xl border-t border-[var(--rule)] px-5 py-20 sm:px-8 lg:py-24">
          <span className="eyebrow">Anatomy</span>
          <h2 className="serif mt-4 max-w-2xl text-balance text-4xl leading-tight text-[var(--ink)] sm:text-5xl">
            Six structural components.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--ink-soft)]">
            Every well-built SEO Page contains the same six components,
            regardless of its specific type or the industry it serves.
          </p>

          <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--rule)] md:grid-cols-2">
            {anatomy.map((c, i) => (
              <li key={c.title} className="bg-[var(--paper)] p-8">
                <span className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="serif mt-4 text-2xl leading-snug text-[var(--ink)]">
                  {c.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)]">
                  {c.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* Types */}
        <section className="mx-auto max-w-5xl border-t border-[var(--rule)] px-5 py-20 sm:px-8 lg:py-24">
          <span className="eyebrow">Types</span>
          <h2 className="serif mt-4 max-w-3xl text-balance text-4xl leading-tight text-[var(--ink)] sm:text-5xl">
            The principal types of SEO Pages, by buyer intent.
          </h2>

          <div className="mt-12 overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--paper)]">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--rule)] bg-[var(--paper-soft)]">
                  <th className="mono px-6 py-4 text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
                    Type
                  </th>
                  <th className="mono px-6 py-4 text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
                    Targets
                  </th>
                  <th className="mono px-6 py-4 text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
                    Example query
                  </th>
                </tr>
              </thead>
              <tbody>
                {types.map((t, i) => (
                  <tr
                    key={t.name}
                    className={
                      i < types.length - 1 ? "border-b border-[var(--rule)]" : ""
                    }
                  >
                    <td className="px-6 py-5 align-top">
                      <span className="serif text-lg leading-tight text-[var(--ink)]">
                        {t.name}
                      </span>
                    </td>
                    <td className="px-6 py-5 align-top text-[var(--ink-soft)]">
                      {t.targets}
                    </td>
                    <td className="px-6 py-5 align-top text-[var(--ink-soft)]">
                      {t.example}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Disambiguation */}
        <section className="mx-auto max-w-3xl border-t border-[var(--rule)] px-5 py-20 sm:px-8 lg:py-24">
          <span className="eyebrow">Disambiguation</span>
          <h2 className="serif mt-4 text-balance text-4xl leading-tight text-[var(--ink)] sm:text-5xl">
            SEO Page vs related terms.
          </h2>
          <p className="mt-5 text-base leading-8 text-[var(--ink-soft)]">
            The boundaries are real and worth observing — they determine which
            page format is appropriate for a given buyer intent.
          </p>

          <dl className="mt-12 space-y-10">
            {disambiguation.map((d) => (
              <div key={d.term} className="border-l-2 border-[var(--rule-strong)] pl-6">
                <dt className="serif text-xl leading-snug text-[var(--ink)]">
                  {d.term}
                </dt>
                <dd className="mt-3 text-base leading-8 text-[var(--ink-soft)]">
                  {d.body}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* History */}
        <section className="mx-auto max-w-5xl border-t border-[var(--rule)] px-5 py-20 sm:px-8 lg:py-24">
          <span className="eyebrow">History</span>
          <h2 className="serif mt-4 max-w-3xl text-balance text-4xl leading-tight text-[var(--ink)] sm:text-5xl">
            Five eras, one discipline.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--ink-soft)]">
            The discipline now called SEO has evolved through distinct eras —
            each defined by the dominant retrieval interface and the page
            format that won within it.
          </p>

          <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--rule)] md:grid-cols-2 lg:grid-cols-5">
            {eras.map((e) => (
              <li key={e.label} className="bg-[var(--paper)] p-6">
                <span className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
                  {e.period}
                </span>
                <h3 className="serif mt-3 text-xl leading-snug text-[var(--ink)]">
                  {e.label}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--ink-soft)]">
                  {e.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* AI shift */}
        <section className="mx-auto max-w-3xl border-t border-[var(--rule)] px-5 py-20 sm:px-8 lg:py-24">
          <span className="eyebrow">The 2026 shift</span>
          <h2 className="serif mt-4 text-balance text-4xl leading-tight text-[var(--ink)] sm:text-5xl">
            Optimizing for AI citation.
          </h2>
          <p className="mt-5 text-base leading-8 text-[var(--ink-soft)]">
            In 2026, an SEO Page is no longer just a Google-ranking page. It
            is also a page engineered to be retrieved, parsed, and cited by AI
            answer engines — ChatGPT, Perplexity, Claude, Copilot, Grok, Google
            AI Overviews, and emerging retrieval interfaces. The shift is
            structural, not stylistic.
          </p>

          <ul className="mt-12 space-y-8">
            {aiShifts.map((s) => (
              <li key={s.title} className="border-l-2 border-[var(--rule-strong)] pl-6">
                <h3 className="serif text-xl leading-snug text-[var(--ink)]">
                  {s.title}
                </h3>
                <p className="mt-3 text-base leading-8 text-[var(--ink-soft)]">
                  {s.body}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-3xl border-t border-[var(--rule)] px-5 py-20 sm:px-8 lg:py-24">
          <span className="eyebrow">Frequently asked questions</span>
          <h2 className="serif mt-4 text-balance text-4xl leading-tight text-[var(--ink)] sm:text-5xl">
            About SEO Pages.
          </h2>

          <dl className="mt-12 divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
            {faq.map((item) => (
              <div key={item.q} className="py-7">
                <dt className="serif text-xl leading-snug text-[var(--ink)]">
                  {item.q}
                </dt>
                <dd className="mt-3 text-base leading-8 text-[var(--ink-soft)]">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* References */}
        <section className="mx-auto max-w-3xl border-t border-[var(--rule)] px-5 py-20 sm:px-8 lg:py-24">
          <span className="eyebrow">References</span>
          <h2 className="serif mt-4 text-balance text-4xl leading-tight text-[var(--ink)] sm:text-5xl">
            Sources and further reading.
          </h2>

          <ul className="mt-10 space-y-4 text-base leading-8 text-[var(--ink-soft)]">
            <li>
              <Link
                href="https://schema.org/DefinedTerm"
                rel="noopener"
                target="_blank"
                className="text-[var(--ink)] underline-offset-4 hover:underline"
              >
                Schema.org — DefinedTerm, FAQPage, and Article specifications
              </Link>
            </li>
            <li>
              <Link
                href="https://developers.google.com/search/docs"
                rel="noopener"
                target="_blank"
                className="text-[var(--ink)] underline-offset-4 hover:underline"
              >
                Google Search Central — Documentation on featured snippets,
                structured data, and Search Quality Guidelines
              </Link>
            </li>
            <li>
              <Link
                href="https://blog.hubspot.com/marketing/topic-clusters-seo"
                rel="noopener"
                target="_blank"
                className="text-[var(--ink)] underline-offset-4 hover:underline"
              >
                HubSpot — Topic cluster framework documentation
              </Link>
            </li>
            <li>
              <Link
                href="https://ahrefs.com/blog/"
                rel="noopener"
                target="_blank"
                className="text-[var(--ink)] underline-offset-4 hover:underline"
              >
                Ahrefs — AI search citation tracking research
              </Link>
            </li>
            <li>
              Anthropic, OpenAI, and Perplexity — published documentation on
              retrieval-augmented generation and citation behavior in
              production AI systems
            </li>
          </ul>
        </section>

        {/* Soft CTA */}
        <section className="border-t border-[var(--rule)]">
          <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8 lg:py-24">
            <span className="eyebrow">Built by SEOPage</span>
            <h2 className="serif mt-4 text-balance text-3xl leading-[1.15] text-[var(--ink)] sm:text-4xl">
              SEOPage builds SEO Pages —{" "}
              <span className="italic text-[var(--ink-soft)]">
                five competitive pages per pack, engineered for ChatGPT
                citation and Google rank.
              </span>
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--ink-soft)]">
              Drafted by AI from your URL. Verified by a human editor. Exported
              to any CMS. One-time purchase, no subscription.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href={CHECKOUT_HREF}
                className="rounded-full bg-[var(--ink)] px-6 py-3.5 text-sm font-medium text-[var(--paper)] transition hover:bg-[var(--accent)]"
              >
                Buy the pack — {offer.priceLabel}
              </Link>
              <Link
                href="/how-it-works"
                className="text-sm font-medium text-[var(--ink-soft)] underline-offset-4 transition hover:text-[var(--ink)] hover:underline"
              >
                See how SEOPage builds them →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
