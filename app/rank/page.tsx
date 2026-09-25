import type { Metadata } from "next";
import { Ask } from "@/components/rank/Ask";
import { JournalClose, JournalHeader, PAD, RankMark } from "@/components/rank/parts";
import { firstSentence, formatDate, getArticles, JOURNAL_PATH, readMinutes } from "@/lib/articles";

// "Agentic SEO" stays the index's target term through the rename.
const TITLE = "rank¹: Agentic SEO, in the Open | SEOPage";
const DESCRIPTION =
  "How pages get found on Google and named by AI. How we pick the search worth winning, run the agents that build the page, and check the result.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: JOURNAL_PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `https://seopage.com${JOURNAL_PATH}`,
    siteName: "SEOPage",
    locale: "en_US",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

// Backstop only — the publish webhook purges the article tags on change.
export const revalidate = 3600;

export default async function RankIndex() {
  const articles = await getArticles();
  const sources = articles.map((a, i) => ({
    n: i + 1,
    slug: a.slug,
    title: a.title,
    lead: firstSentence(a.description),
    label: a.categoryLabel,
    date: formatDate(a.publishedAt),
    minutes: readMinutes(a.content),
    haystack: [a.title, a.description, a.categoryLabel, ...a.tags].join(" ").toLowerCase(),
  }));

  return (
    <main style={{ background: "radial-gradient(60% 40% at 85% 0%, rgba(61,107,255,.14), transparent 70%)" }}>
      <JournalHeader />

      {/* MASTHEAD */}
      <header className={`${PAD} pt-8 lg:pt-12`}>
        <h1>
          <span className="sr-only">rank, the SEOPage journal</span>
          <RankMark className="text-[clamp(120px,24vw,380px)] tracking-[-0.07em] !leading-[0.78]" />
        </h1>
        <div className="mt-8 grid gap-4 border-y border-white/12 py-5 text-[15px] text-[#C9D0E2] md:grid-cols-3">
          <p className="text-[#EEF2FF]">How pages get found on Google and named by AI.</p>
          <p className="md:text-center">The work, not the theory. Written by Zev Uhuru.</p>
          <p className="nh-mono text-[12px] uppercase tracking-[0.14em] text-[#7D869C] md:text-right">
            {articles.length} {articles.length === 1 ? "issue" : "issues"}
          </p>
        </div>
      </header>

      {/* THE ANSWER + SOURCES */}
      <section className={`${PAD} pb-28 pt-6`}>
        <Ask sources={sources} base={JOURNAL_PATH} />
      </section>

      <JournalClose />
    </main>
  );
}
