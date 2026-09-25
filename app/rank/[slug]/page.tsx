import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { Cite, JournalHeader, JournalProse, PAD, PriceCard } from "@/components/rank/parts";
import {
  findArticle,
  formatDate,
  formatDuration,
  getArticles,
  headingsOf,
  JOURNAL_PATH,
  readMinutes,
  relatedFrom,
  toIsoDuration,
} from "@/lib/articles";

const BASE_URL = "https://seopage.com";

/**
 * Every article known at build is prerendered; ones published from Compose
 * later render on first request. Either way ISR holds the page until the
 * publish webhook purges it.
 *
 * Prerendering is what makes a failed API refresh safe: getArticles() throws
 * in production so Next keeps the last-good render, which only exists if the
 * page was rendered once. With an empty list here, an API outage 500'd every
 * article that had never been visited.
 */
export const dynamicParams = true;
export const revalidate = 3600;

export async function generateStaticParams() {
  return (await getArticles()).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = await findArticle(slug);
  if (!a) return {};

  const url = `${BASE_URL}${JOURNAL_PATH}/${a.slug}`;
  const ogImage = a.muxPlaybackId
    ? `https://image.mux.com/${a.muxPlaybackId}/thumbnail.jpg?time=0`
    : a.thumbnailUrl;

  return {
    title: { absolute: `${a.title} | SEOPage` },
    description: a.description.slice(0, 160),
    alternates: { canonical: url },
    openGraph: {
      title: a.title,
      description: a.description.slice(0, 160),
      type: a.muxPlaybackId ? "video.other" : "article",
      url,
      images: ogImage ? [ogImage] : [],
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title: a.title,
      description: a.description.slice(0, 160),
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await findArticle(slug);
  if (!article) notFound();

  const all = await getArticles();
  const related = relatedFrom(all, article.slug, article.relatedSlugs);
  const heads = headingsOf(article.content);
  const url = `${BASE_URL}${JOURNAL_PATH}/${article.slug}`;
  // Planned videos carry a duration before they exist; only a real one counts.
  const duration = article.muxPlaybackId ? formatDuration(article.durationSeconds) : null;

  // VideoObject once there's a video (eligible for video rich results, and the
  // transcript rides along as the entity's text); Article until then.
  const author = { "@type": "Person", name: "Zev Uhuru", url: BASE_URL };
  const publisher = { "@type": "Organization", name: "SEOPage", url: BASE_URL };
  const schema = article.muxPlaybackId
    ? {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: article.title,
        description: article.description,
        thumbnailUrl: `https://image.mux.com/${article.muxPlaybackId}/thumbnail.jpg?time=0`,
        uploadDate: article.publishedAt,
        duration: toIsoDuration(article.durationSeconds),
        contentUrl: `https://stream.mux.com/${article.muxPlaybackId}.m3u8`,
        embedUrl: url,
        transcript: article.transcript,
        author,
        publisher,
        keywords: article.tags.join(", "),
      }
    : {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.description,
        datePublished: article.publishedAt,
        mainEntityOfPage: url,
        author,
        publisher,
        keywords: article.tags.join(", "),
      };

  return (
    <>
      <JsonLd data={schema} />
      <main>
        <JournalHeader />
        <div className={`${PAD} grid gap-14 pb-24 pt-10 lg:grid-cols-12 lg:pt-16`}>
          <article className="min-w-0 lg:col-span-8">
            <nav aria-label="Breadcrumb" className="nh-mono truncate text-[13px] text-[#7D869C]">
              <Link href={JOURNAL_PATH} className="hover:text-white">
                seopage.com › rank
              </Link>{" "}
              › {article.slug}
            </nav>
            <h1 className="nh-display mt-6 text-balance text-[clamp(42px,5.2vw,80px)] leading-[0.96]">{article.title}</h1>
            <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[14.5px] text-[#A0A9C0]">
              <span className="text-[#9DB4FF]">{article.categoryLabel}</span>
              <span>Zev Uhuru</span>
              <time dateTime={article.publishedAt}>{formatDate(article.publishedAt, "long")}</time>
              <span>{duration ? `${duration} video` : `${readMinutes(article.content)} min read`}</span>
            </p>

            {/* Mux's hosted player once a playback id exists. No placeholder
                frame before then: on the dark page it read as a broken embed. */}
            {article.muxPlaybackId && (
              <div className="mt-10 overflow-hidden rounded-[22px] border border-white/12 bg-black">
                <div className="relative aspect-video">
                  <iframe
                    src={`https://player.mux.com/${article.muxPlaybackId}?accent-color=%233D6BFF`}
                    title={article.title}
                    allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
              </div>
            )}

            {/* The short answer: the self-contained passage an assistant can
                lift, with each section cited below it. */}
            <section className="mt-10 rounded-[24px] border border-white/12 bg-[#0A0F1E] p-7 sm:p-9">
              <p className="flex items-center gap-2 text-[14px] text-[#9DB4FF]">
                <span className="h-2 w-2 rounded-full bg-[#3D6BFF]" />
                The short answer
              </p>
              <p className="mt-4 text-[clamp(20px,1.8vw,24px)] leading-[1.5] text-[#EEF2FF]">{article.description}</p>
              {heads.length > 0 && (
                <ol className="mt-7 grid gap-2.5 border-t border-white/12 pt-6 sm:grid-cols-2">
                  {heads.map((h, i) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`} className="flex items-baseline gap-2.5 text-[15.5px] text-[#C9D0E2] hover:text-white">
                        <Cite n={i + 1} className="!bg-[#3D6BFF] !text-white" />
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              )}
            </section>

            {/* The body is what ranks. A transcript alone never would. */}
            <div className="mt-6 max-w-[720px]">
              <JournalProse content={article.content} />
            </div>

            {article.transcript && (
              <details className="mt-14 max-w-[720px] rounded-[18px] border border-white/12 bg-[#0A0F1E] p-6">
                <summary className="cursor-pointer text-[17px] font-medium">Full transcript</summary>
                <div className="mt-4 whitespace-pre-wrap text-[15.5px] leading-[1.7] text-[#C9D0E2]">{article.transcript}</div>
              </details>
            )}

            {related.length > 0 && (
              <section className="mt-20 max-w-[720px]">
                <h2 className="nh-display text-[28px] tracking-[-0.03em]">Follow-up questions</h2>
                <ul className="mt-5 border-t border-white/12">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link href={`${JOURNAL_PATH}/${r.slug}`} className="flex items-center justify-between gap-5 border-b border-white/12 py-5 text-[18px] hover:text-[#9DB4FF]">
                        {r.title}
                        <span className="text-[22px] text-[#7D869C]" aria-hidden>
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </article>

          {/* Every article feeds the money page. */}
          <aside className="lg:col-span-4">
            <div className="sticky top-8 flex flex-col gap-6">
              {heads.length > 0 && (
                <nav aria-label="Sections" className="hidden rounded-[22px] border border-white/12 p-6 lg:block">
                  <p className="text-[14px] text-[#7D869C]">Sections, cited</p>
                  <ol className="mt-3 flex flex-col gap-2.5">
                    {heads.map((h, i) => (
                      <li key={h.id}>
                        <a href={`#${h.id}`} className="flex items-baseline gap-2.5 text-[14.5px] leading-snug text-[#C9D0E2] hover:text-white">
                          <Cite n={i + 1} />
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}
              <PriceCard />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
