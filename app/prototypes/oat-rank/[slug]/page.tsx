import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { findArticle, formatDate, formatDuration, getArticles, headingsOf, readMinutes, relatedFrom } from "@/lib/articles";
import { CARD, PAD } from "../../_lib/oat-home";
import { JournalShell, LABEL, OAT_JOURNAL, OatProse, PlanCard, SectionLink } from "../../_lib/oat-rank";

/* A /rank article on the Oat kit. Same real article, same parts as the live page (video, the short
   answer, the numbered body, transcript, follow-ups, the side list and the money card); schema and
   canonical stay on the live route, so this page only carries noindex metadata. */

export const metadata: Metadata = { title: { absolute: "rank¹ article on Oat | SEOPage" }, robots: { index: false, follow: false } };
export const revalidate = 3600;

export async function generateStaticParams() {
  return (await getArticles()).map((a) => ({ slug: a.slug }));
}

export default async function OatRankArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await findArticle(slug);
  if (!article) notFound();

  const all = await getArticles();
  const related = relatedFrom(all, article.slug, article.relatedSlugs);
  const heads = headingsOf(article.content);
  const duration = article.muxPlaybackId ? formatDuration(article.durationSeconds) : null;

  return (
    <JournalShell>
      <div className={`${PAD} grid gap-14 pb-24 pt-12 lg:grid-cols-12 lg:pt-16`}>
        <article className="min-w-0 lg:col-span-8">
          <nav aria-label="Breadcrumb" className="truncate font-[family-name:var(--o-mono)] text-[13px] text-[var(--o-muted)]">
            <Link href={OAT_JOURNAL} className="hover:text-[var(--o-text)]">seopage.com › rank</Link> › {article.slug}
          </nav>
          <h1 className="mt-6 text-balance font-[family-name:var(--o-head)] text-[clamp(40px,5vw,76px)] font-semibold leading-[0.98] tracking-[-0.045em]">{article.title}</h1>
          <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[14.5px] text-[var(--o-text2)]">
            <span className={LABEL}>{article.categoryLabel}</span>
            <span>Zev Uhuru</span>
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt, "long")}</time>
            <span>{duration ? `${duration} video` : `${readMinutes(article.content)} min read`}</span>
          </p>

          {article.muxPlaybackId && (
            <div className="mt-10 overflow-hidden rounded-[18px] border border-[var(--o-edge)] bg-black">
              <div className="relative aspect-video">
                <iframe
                  src={`https://player.mux.com/${article.muxPlaybackId}?accent-color=%231B46D4`}
                  title={article.title}
                  allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </div>
          )}

          {/* The short answer: the self-contained passage an assistant can lift, with the sections below it */}
          <section className={`${CARD} mt-10 p-7 sm:p-9`}>
            <p className={`${LABEL} flex items-center gap-2`}>
              <span className="h-2 w-2 rounded-full bg-[var(--o-action)]" />
              The short answer
            </p>
            <p className="mt-4 text-[clamp(20px,1.8vw,24px)] leading-[1.5]">{article.description}</p>
            {heads.length > 0 && (
              <ol className="mt-7 grid gap-2.5 border-t border-[var(--o-edge)] pt-6 sm:grid-cols-2">
                {heads.map((h, i) => <li key={h.id}><SectionLink id={h.id} text={h.text} i={i} /></li>)}
              </ol>
            )}
          </section>

          <div className="mt-6 max-w-[720px]">
            <OatProse content={article.content} />
          </div>

          {article.transcript && (
            <details className={`${CARD} mt-14 max-w-[720px] p-6`}>
              <summary className="cursor-pointer text-[17px] font-medium">Full transcript</summary>
              <div className="mt-4 whitespace-pre-wrap text-[15.5px] leading-[1.7] text-[var(--o-text2)]">{article.transcript}</div>
            </details>
          )}

          {related.length > 0 && (
            <section className="mt-20 max-w-[720px]">
              <h2 className="font-[family-name:var(--o-head)] text-[28px] font-semibold tracking-[-0.035em]">Follow-up questions</h2>
              <ul className="mt-5 border-t border-[var(--o-edge-strong)]">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={`${OAT_JOURNAL}/${r.slug}`} className="flex items-center justify-between gap-5 border-b border-[var(--o-edge)] py-5 text-[18px] hover:text-[var(--o-link)]">
                      {r.title}
                      <span className="text-[22px] text-[var(--o-muted)]" aria-hidden>→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>

        {/* The side: the numbered sections, then the plan */}
        <aside className="lg:col-span-4">
          <div className="sticky top-8 flex flex-col gap-6">
            {heads.length > 0 && (
              <nav aria-label="Sections" className="hidden rounded-[14px] border border-[var(--o-edge)] p-6 lg:block">
                <p className="text-[14px] text-[var(--o-muted)]">In this issue</p>
                <ol className="mt-3 flex flex-col gap-2.5">
                  {heads.map((h, i) => <li key={h.id}><SectionLink id={h.id} text={h.text} i={i} /></li>)}
                </ol>
              </nav>
            )}
            <PlanCard />
          </div>
        </aside>
      </div>
    </JournalShell>
  );
}
