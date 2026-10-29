import type { Metadata } from "next";
import Link from "next/link";
import { RankMark } from "@/components/rank/parts";
import { formatDate, getArticles, readMinutes } from "@/lib/articles";
import { PAD } from "../_lib/oat-home";
import { JournalShell, LABEL, NUM, OAT_JOURNAL, pad2 } from "../_lib/oat-rank";

/* The /rank index on the Oat kit: the masthead, the latest issue beside the next three, then every
   issue. Same real articles and structure as the live index. Issue numbers count up from the oldest. */

export const metadata: Metadata = { title: { absolute: "rank¹ on Oat | SEOPage" }, robots: { index: false, follow: false } };
export const revalidate = 3600;

export default async function OatRankIndex() {
  const articles = await getArticles();
  const [lead, ...rest] = articles;
  const next = rest.slice(0, 3);
  const issueNo = (i: number) => pad2(articles.length - i);
  const href = (slug: string) => `${OAT_JOURNAL}/${slug}`;

  return (
    <JournalShell>
      {/* MASTHEAD */}
      <header className={`${PAD} pb-10 pt-14 lg:pt-20`}>
        <h1>
          <span className="sr-only">rank, the SEOPage journal</span>
          <RankMark className="text-[clamp(110px,22vw,340px)] tracking-[-0.07em] !leading-[0.78]" />
        </h1>
        <div className="mt-10 grid gap-4 border-y border-[var(--o-edge-strong)] py-5 text-[15px] text-[var(--o-text2)] md:grid-cols-3">
          <p className="text-[var(--o-text)]">How pages get found on Google and named by AI.</p>
          <p className="md:text-center">The work, not the theory. Written by Zev Uhuru.</p>
          <p className="text-[var(--o-muted)] md:text-right">
            <span className={NUM}>{articles.length}</span> {articles.length === 1 ? "issue" : "issues"}
            {lead && <> · latest {formatDate(lead.publishedAt, "long")}</>}
          </p>
        </div>
      </header>

      {/* FRONT: the latest issue beside the next three */}
      {lead && (
        <section className={`${PAD} grid gap-12 pb-24 lg:grid-cols-12 lg:gap-16`}>
          <Link href={href(lead.slug)} className="group flex flex-col gap-6 lg:col-span-7">
            <span className={LABEL}>Latest · {lead.categoryLabel}</span>
            <h2 className="font-[family-name:var(--o-head)] text-[clamp(42px,5.4vw,84px)] font-semibold leading-[0.96] tracking-[-0.045em] transition-colors group-hover:text-[var(--o-link)]">{lead.title}</h2>
            <p className="max-w-[620px] text-[clamp(18px,1.5vw,21px)] leading-[1.55] text-[var(--o-text2)]">{lead.description}</p>
            <span className="text-[15px] font-medium text-[var(--o-link)]">Read · {readMinutes(lead.content)} min →</span>
          </Link>
          {next.length > 0 && (
            <ol className="flex flex-col lg:col-span-5 lg:border-l lg:border-[var(--o-edge-strong)] lg:pl-12">
              {next.map((a, i) => (
                <li key={a.slug} className="border-b border-[var(--o-edge)] first:border-t lg:first:border-t-0">
                  <Link href={href(a.slug)} className="group grid grid-cols-[56px_1fr] gap-4 py-7">
                    <span className={`${NUM} pt-1 text-[15px] text-[var(--o-link)]`}>{issueNo(i + 1)}</span>
                    <span className="flex flex-col gap-2">
                      <span className="text-[13.5px] text-[var(--o-muted)]">{a.categoryLabel}</span>
                      <span className="font-[family-name:var(--o-head)] text-[26px] font-semibold leading-[1.08] tracking-[-0.035em] transition-colors group-hover:text-[var(--o-link)]">{a.title}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          )}
        </section>
      )}

      {/* EVERY ISSUE */}
      <section className={`${PAD} py-20 lg:py-28`} style={{ background: "var(--o-alt)" }}>
        <div className="flex items-end justify-between gap-6">
          <h2 className="font-[family-name:var(--o-head)] text-[clamp(38px,4.6vw,64px)] font-semibold leading-none tracking-[-0.045em]">Every issue.</h2>
          <span className="text-[14px] text-[var(--o-muted)]">Newest first</span>
        </div>
        <ul className="mt-12 border-t border-[var(--o-edge-strong)]">
          {articles.map((a, i) => (
            <li key={a.slug}>
              <Link
                href={href(a.slug)}
                className="group grid grid-cols-[48px_1fr] items-baseline gap-x-5 gap-y-2 border-b border-[var(--o-edge)] px-2 py-7 transition-colors hover:bg-[var(--o-panel)] md:grid-cols-[64px_1fr_170px_130px_80px]"
              >
                <span className={`${NUM} text-[13px] text-[var(--o-muted)]`}>{issueNo(i)}</span>
                <span className="font-[family-name:var(--o-head)] text-[clamp(21px,2.1vw,30px)] font-semibold leading-[1.1] tracking-[-0.035em] group-hover:text-[var(--o-link)]">{a.title}</span>
                <span className="col-start-2 text-[14px] text-[var(--o-link)] md:col-start-auto">{a.categoryLabel}</span>
                <time dateTime={a.publishedAt} className="col-start-2 text-[14px] text-[var(--o-text2)] md:col-start-auto">{formatDate(a.publishedAt)}</time>
                <span className="hidden text-right text-[14px] text-[var(--o-muted)] md:block">{readMinutes(a.content)} min</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </JournalShell>
  );
}
