import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { JournalClose, PAD, RankMark } from "@/components/rank/parts";
import { formatDate, getArticles, JOURNAL_PATH, readMinutes } from "@/lib/articles";
import { CREATE_URL } from "@/lib/config";

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

const pad2 = (n: number) => String(n).padStart(2, "0");

/* The front page of a dark broadsheet. No imagery: the masthead, the issue
   numbers, and the headline sizes do the work the Nora videos do on the
   homepage. Issue numbers count up from the oldest. */
export default async function RankIndex() {
  const articles = await getArticles();
  const [lead, ...rest] = articles;
  const next = rest.slice(0, 3);
  const issueNo = (i: number) => pad2(articles.length - i);

  return (
    <main>
      <div className={`${PAD} flex h-16 items-center justify-between border-b border-white/12`}>
        <div className="flex items-center gap-5">
          <Logo tone="dark" className="text-[20px]" />
          {lead && (
            <span className="nh-mono hidden text-[11px] uppercase tracking-[0.16em] text-[#7D869C] sm:inline">
              No. {issueNo(0)} · {formatDate(lead.publishedAt, "long")}
            </span>
          )}
        </div>
        <a href={CREATE_URL} className="flex h-10 items-center rounded-full border border-white/30 px-4 text-[14px] font-medium hover:border-white/60">
          Build my page
        </a>
      </div>

      {/* MASTHEAD */}
      <header className={`${PAD} pb-8 pt-10 lg:pt-14`}>
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

      {/* FRONT: the latest issue beside the next three */}
      {lead && (
        <section className={`${PAD} grid gap-12 pb-24 lg:grid-cols-12 lg:gap-16`}>
          <Link href={`${JOURNAL_PATH}/${lead.slug}`} className="group flex flex-col gap-6 lg:col-span-7">
            <span className="nh-mono text-[12px] uppercase tracking-[0.16em] text-[#FF8A7D]">Latest · {lead.categoryLabel}</span>
            <h2 className="nh-display text-[clamp(44px,5.6vw,88px)] leading-[0.95] transition-colors group-hover:text-[#9DB4FF]">{lead.title}</h2>
            <p className="max-w-[620px] text-[clamp(18px,1.5vw,21px)] leading-[1.55] text-[#C9D0E2]">{lead.description}</p>
            <span className="text-[15px] font-medium text-[#9DB4FF]">Read · {readMinutes(lead.content)} min →</span>
          </Link>
          {next.length > 0 && (
            <ol className="flex flex-col lg:col-span-5 lg:border-l lg:border-white/12 lg:pl-12">
              {next.map((a, i) => (
                <li key={a.slug} className="border-b border-white/12 first:border-t lg:first:border-t-0">
                  <Link href={`${JOURNAL_PATH}/${a.slug}`} className="group grid grid-cols-[64px_1fr] gap-4 py-7">
                    <span className="nh-display text-[48px] leading-[0.85] text-[#FF6B5C]">{issueNo(i + 1)}</span>
                    <span className="flex flex-col gap-2">
                      <span className="nh-mono text-[11px] uppercase tracking-[0.14em] text-[#7D869C]">{a.categoryLabel}</span>
                      <span className="nh-display text-[26px] leading-[1.05] tracking-[-0.035em] transition-colors group-hover:text-[#9DB4FF]">{a.title}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          )}
        </section>
      )}

      {/* EVERY ISSUE */}
      <section className={`${PAD} border-t border-white/12 py-20 lg:py-28`}>
        <div className="flex items-end justify-between gap-6">
          <h2 className="nh-display text-[clamp(40px,5vw,72px)] leading-none">Every issue.</h2>
          <span className="nh-mono text-[12px] uppercase tracking-[0.14em] text-[#7D869C]">Newest first</span>
        </div>
        <ul className="mt-12 border-t border-white/12">
          {articles.map((a, i) => (
            <li key={a.slug}>
              <Link
                href={`${JOURNAL_PATH}/${a.slug}`}
                className="group grid grid-cols-[48px_1fr] items-baseline gap-x-5 gap-y-2 border-b border-white/12 py-7 transition-colors hover:bg-[#3D6BFF]/[0.07] md:grid-cols-[64px_1fr_160px_130px_80px]"
              >
                <span className="nh-mono text-[13px] text-[#7D869C]">{issueNo(i)}</span>
                <span className="nh-display text-[clamp(22px,2.2vw,32px)] leading-[1.08] tracking-[-0.035em] group-hover:text-[#9DB4FF]">{a.title}</span>
                <span className="col-start-2 text-[14px] text-[#FF8A7D] md:col-start-auto">{a.categoryLabel}</span>
                <time dateTime={a.publishedAt} className="col-start-2 text-[14px] text-[#A0A9C0] md:col-start-auto">
                  {formatDate(a.publishedAt)}
                </time>
                <span className="hidden text-right text-[14px] text-[#7D869C] md:block">{readMinutes(a.content)} min</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <JournalClose />
    </main>
  );
}
