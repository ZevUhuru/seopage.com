import Link from "next/link";
import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { channels, START_HREF } from "@/lib/data";

export const metadata: Metadata = {
  title: "What is AI Page Ranking? (AI Search Visibility, Explained)",
  description:
    "AI page ranking is whether — and how favorably — a specific page is cited inside AI-generated answers from ChatGPT, Google AI Overviews, Perplexity, and Claude. How it works, how it differs from SEO rankings, and how to measure it.",
  alternates: { canonical: "https://seopage.com/ai-page-ranking" },
  openGraph: {
    title: "What is AI Page Ranking? — SEOPage",
    description:
      "There is no position 1–100 inside an AI answer. Either your page is cited or it isn't. What AI page ranking means and how to measure it.",
    url: "https://seopage.com/ai-page-ranking",
    type: "article",
  },
};

const definitionFaq = [
  {
    q: "What is AI page ranking?",
    a: "AI page ranking is whether — and how favorably — a specific page appears inside AI-generated answers when buyers ask questions on channels like ChatGPT, Google AI Overviews, Perplexity, and Claude. Unlike a search ranking, there is no position 1–100: a page is cited as a source, mentioned without a link, or absent from the answer entirely.",
  },
  {
    q: "How is AI page ranking different from Google rankings?",
    a: "Google rankings order pages on a results list; the user chooses. AI answers synthesize a response and pick a handful of sources; the engine chooses. The overlap between top Google results and AI-cited sources has fallen below 20% — so a page can rank #1 on Google and still be invisible to ChatGPT, and vice versa.",
  },
  {
    q: "What decides whether AI engines cite a page?",
    a: "Engines favor pages they can extract from cleanly: direct-answer paragraphs near the top, clear headings, FAQ blocks, structured data (schema), unambiguous entity signals (who you are, what the product is), topical depth, and crawler access. Authority and third-party corroboration (reviews, comparisons, mentions on other sites) also weigh heavily.",
  },
  {
    q: "How do you measure AI page ranking?",
    a: "Define the buyer prompts a page should win, run those prompts on each AI channel, and record the verdict per prompt per channel: cited, mentioned, or absent — plus how the answer frames you (recommended, neutral, or warned against) and which competitor URLs are cited instead. Repeating the run weekly turns snapshots into a trend.",
  },
  {
    q: "What is a buyer prompt?",
    a: "The AI-era equivalent of a keyword: a full question a buyer asks an assistant, like \"best payroll software for a 10-person agency\" or \"is X worth paying for.\" One page typically needs 20+ tracked prompts for meaningful coverage, because phrasing changes which sources an engine pulls.",
  },
  {
    q: "Why does this matter for revenue?",
    a: "AI engines now intercept an estimated 35–50% of high-intent commercial queries before any link is clicked, and visitors arriving from AI answers convert at 5–16% versus roughly 1.8% for organic search. Absence from AI answers is invisible in analytics — you simply never enter the buyer's consideration set.",
  },
];

export default function AiPageRankingPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <SiteHeader active="reference" />

      <main>
        {/* Definition hero */}
        <section className="mx-auto max-w-3xl px-5 pb-16 pt-20 sm:px-8 lg:pt-28">
          <span className="eyebrow">Reference · Definition</span>
          <h1 className="serif mt-5 text-balance text-5xl leading-[1.05] text-[var(--ink)] sm:text-6xl">
            What is AI page ranking?
          </h1>
          <p className="mt-8 border-l-2 border-[var(--accent)] pl-6 text-lg leading-8 text-[var(--ink)]">
            <strong>AI page ranking</strong> is whether — and how favorably — a
            specific page is cited inside AI-generated answers when buyers ask
            questions on channels like ChatGPT, Google AI Overviews,
            Perplexity, and Claude. There is no position 1–100 inside an AI
            answer: a page is <em>cited</em>, <em>mentioned</em>, or{" "}
            <em>absent</em>.
          </p>
          <p className="mt-6 text-base leading-8 text-[var(--ink-soft)]">
            The discipline of improving it goes by several names — answer
            engine optimization (AEO), generative engine optimization (GEO),
            AI search visibility. The unit of measurement is the same in all
            of them: a page, a prompt, a channel, and a verdict.
          </p>
        </section>

        {/* Old vs new */}
        <section className="mx-auto max-w-5xl border-t border-[var(--rule)] px-5 py-20 sm:px-8 lg:py-24">
          <span className="eyebrow">The shift</span>
          <h2 className="serif mt-4 max-w-2xl text-balance text-4xl leading-tight text-[var(--ink)] sm:text-5xl">
            Rankings order links. AI answers pick sources.
          </h2>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--rule)] md:grid-cols-2">
            <div className="bg-[var(--paper)] p-8">
              <span className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
                Search ranking · old
              </span>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-[var(--ink-soft)]">
                <li>Position 1–100 on a results page</li>
                <li>The unit is a keyword</li>
                <li>The user scans and chooses a link</li>
                <li>Measured by rank trackers</li>
                <li>Win condition: be near the top</li>
              </ul>
            </div>
            <div className="bg-[var(--paper)] p-8">
              <span className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
                AI page ranking · now
              </span>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-[var(--ink-soft)]">
                <li>Cited, mentioned, or absent — binary per answer</li>
                <li>The unit is a buyer prompt (a full question)</li>
                <li>The engine synthesizes and picks a few sources</li>
                <li>Measured by running prompts and capturing answers</li>
                <li>Win condition: be in the answer, framed as the recommendation</li>
              </ul>
            </div>
          </div>

          <p className="mt-8 max-w-2xl text-sm leading-7 text-[var(--ink-soft)]">
            The two no longer track each other: the overlap between top Google
            results and AI-cited sources has dropped from roughly 70% to under
            20% in two years. Each surface now needs its own measurement.
          </p>
        </section>

        {/* Channels */}
        <section className="mx-auto max-w-5xl border-t border-[var(--rule)] px-5 py-20 sm:px-8 lg:py-24">
          <span className="eyebrow">The channels</span>
          <h2 className="serif mt-4 max-w-2xl text-balance text-4xl leading-tight text-[var(--ink)] sm:text-5xl">
            The four engines that matter in 2026.
          </h2>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--rule)] sm:grid-cols-2">
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

        {/* FAQ */}
        <section className="mx-auto max-w-3xl border-t border-[var(--rule)] px-5 py-20 sm:px-8 lg:py-24">
          <p className="eyebrow">Questions</p>
          <h2 className="serif mt-4 text-balance text-4xl leading-tight text-[var(--ink)] sm:text-5xl">
            AI page ranking, answered.
          </h2>

          <ul className="mt-12 divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
            {definitionFaq.map((f) => (
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

        {/* CTA */}
        <section className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-8 lg:py-28">
          <p className="eyebrow">Measure yours</p>
          <h2 className="serif mt-5 text-balance text-5xl leading-[1.05] text-[var(--ink)] sm:text-6xl">
            Where does your page rank in AI?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-[var(--ink-soft)]">
            Get a free AI Rank Report: 20 buyer prompts, all four channels,
            with evidence and a fix list. No card.
          </p>
          <div className="mt-10">
            <Link
              href={START_HREF}
              className="rounded-full bg-[var(--ink)] px-6 py-3.5 text-sm font-medium text-[var(--paper)] transition hover:bg-[var(--accent)]"
            >
              Get your first report — free
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "DefinedTerm",
      "@id": "https://seopage.com/ai-page-ranking#term",
      name: "AI page ranking",
      description:
        "Whether — and how favorably — a specific page is cited inside AI-generated answers from channels like ChatGPT, Google AI Overviews, Perplexity, and Claude. A page is cited, mentioned, or absent; there is no position 1–100 inside an AI answer.",
      url: "https://seopage.com/ai-page-ranking",
    },
    {
      "@type": "Article",
      "@id": "https://seopage.com/ai-page-ranking#article",
      headline: "What is AI Page Ranking?",
      description:
        "AI page ranking explained: how AI engines select sources, how it differs from search rankings, and how to measure it per prompt and per channel.",
      author: { "@type": "Organization", name: "SEOPage" },
      publisher: { "@type": "Organization", name: "SEOPage" },
      mainEntityOfPage: "https://seopage.com/ai-page-ranking",
    },
    {
      "@type": "FAQPage",
      "@id": "https://seopage.com/ai-page-ranking#faq",
      mainEntity: definitionFaq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://seopage.com/ai-page-ranking#breadcrumbs",
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
          name: "What is AI page ranking?",
          item: "https://seopage.com/ai-page-ranking",
        },
      ],
    },
  ],
};
