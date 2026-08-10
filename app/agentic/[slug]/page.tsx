import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { JsonLd } from "@/components/JsonLd";
import { Markdown } from "@/components/Markdown";
import {
  findArticle,
  getArticles,
  relatedFrom,
  formatDuration,
  toIsoDuration,
} from "@/lib/articles";
import { AUDIT_HOURS, PRICE_LABEL } from "@/lib/config";

const BASE_URL = "https://seopage.com";

/**
 * Articles are published from Compose, so slugs are not known at build time.
 * Everything renders on demand and is held by ISR until the publish webhook
 * purges it.
 */
export const dynamicParams = true;
export const revalidate = 3600;

export async function generateStaticParams() {
  // Empty at build; the first request for a slug renders and caches it.
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = await findArticle(slug);
  if (!a) return {};

  const ogImage = a.muxPlaybackId
    ? `https://image.mux.com/${a.muxPlaybackId}/thumbnail.jpg?time=0`
    : a.thumbnailUrl;

  return {
    title: { absolute: `${a.title} | SEOPage` },
    description: a.description.slice(0, 160),
    alternates: { canonical: `${BASE_URL}/agentic/${a.slug}` },
    openGraph: {
      title: a.title,
      description: a.description.slice(0, 160),
      type: a.muxPlaybackId ? "video.other" : "article",
      url: `${BASE_URL}/agentic/${a.slug}`,
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
  const duration = formatDuration(article.durationSeconds);

  // VideoObject once there's a video (eligible for video rich results, and the
  // transcript rides along as the entity's text); Article until then.
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
        embedUrl: `${BASE_URL}/agentic/${article.slug}`,
        transcript: article.transcript,
        author: { "@type": "Person", name: "Zev Uhuru", url: BASE_URL },
        publisher: {
          "@type": "Organization",
          name: "SEOPage",
          url: BASE_URL,
        },
        keywords: article.tags.join(", "),
      }
    : {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.description,
        datePublished: article.publishedAt,
        mainEntityOfPage: `${BASE_URL}/agentic/${article.slug}`,
        author: { "@type": "Person", name: "Zev Uhuru", url: BASE_URL },
        publisher: {
          "@type": "Organization",
          name: "SEOPage",
          url: BASE_URL,
        },
        keywords: article.tags.join(", "),
      };

  return (
    <>
      <JsonLd data={schema} />
      <SiteHeader />
      <main>
        <article>
          <div className="mx-auto max-w-3xl px-5 pt-12 sm:px-8 lg:pt-16">
            <nav aria-label="Breadcrumb" className="mono text-[10px] uppercase tracking-[0.14em] text-muted">
              <Link href="/agentic" className="hover:text-ink">
                The build log
              </Link>
              <span className="mx-2">/</span>
              <span className="text-accent">{article.categoryLabel}</span>
            </nav>

            <h1 className="display mt-5 text-balance text-[2rem] leading-[1.08] text-ink sm:text-[2.6rem]">
              {article.title}
            </h1>

            <div className="mono mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] uppercase tracking-[0.14em] text-muted">
              <time dateTime={article.publishedAt}>
                {new Date(article.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
              {duration && <span>{duration}</span>}
            </div>

            {/* The video slot. Mux's hosted player once a playback id exists —
                which keeps this dependency-free until the UX justifies
                mux-player-react. Until then, a placeholder frame so the page
                reads as an issue with a video pending, not a broken embed. */}
            {article.muxPlaybackId ? (
              <div className="mt-8 overflow-hidden rounded-lg border border-line bg-ink">
                <div className="relative aspect-video">
                  <iframe
                    src={`https://player.mux.com/${article.muxPlaybackId}?accent-color=%231b46d4`}
                    title={article.title}
                    allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
              </div>
            ) : (
              article.durationSeconds != null && (
                <div className="relative mt-8 aspect-video overflow-hidden rounded-lg border border-line bg-surface-3">
                  <div className="grid-backdrop absolute inset-0 grid place-items-center">
                    <div className="text-center">
                      <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-line-strong bg-surface text-accent shadow-sm">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5.5v13l11-6.5-11-6.5Z" />
                        </svg>
                      </span>
                      <p className="mono mt-4 text-[10px] uppercase tracking-[0.14em] text-muted">
                        Video in production
                      </p>
                    </div>
                  </div>
                </div>
              )
            )}

            <p className="mt-8 max-w-[64ch] text-[1.15rem] leading-relaxed text-ink-2">
              {article.description}
            </p>
          </div>

          {/* The body is what ranks. A transcript alone never would. */}
          <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
            <Markdown content={article.content} />
          </div>

          {article.transcript && (
            <div className="mx-auto max-w-3xl px-5 pb-12 sm:px-8">
              <details className="rounded-lg border border-line bg-surface-2 p-6">
                <summary className="cursor-pointer text-[1.02rem] font-semibold text-ink">
                  Full transcript
                </summary>
                <div className="mt-4 whitespace-pre-wrap text-[0.95rem] leading-[1.7] text-ink-2">
                  {article.transcript}
                </div>
              </details>
            </div>
          )}
        </article>

        {/* Every article feeds the money pages. */}
        <section className="border-t border-line bg-surface-2">
          <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
            <p className="text-[1.05rem] font-semibold text-ink">
              Want this done for your page?
            </p>
            <p className="mt-2 max-w-lg text-ink-2">
              Send us a page and we&apos;ll audit it free within {AUDIT_HOURS}{" "}
              hours, or have us build the page outright for {PRICE_LABEL}.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/audit" className="btn btn-accent px-6 py-3">
                Get a free page audit
              </Link>
              <Link href="/" className="btn btn-ghost px-6 py-3">
                See what we build
              </Link>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="border-t border-line">
            <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
              <h2 className="kicker">Keep reading</h2>
              <ul className="mt-6 divide-y divide-line border-t border-line">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/agentic/${r.slug}`}
                      className="group block py-5"
                    >
                      <span className="mono text-[10px] uppercase tracking-[0.14em] text-accent">
                        {r.categoryLabel}
                      </span>
                      <p className="display mt-1.5 text-[1.15rem] leading-[1.25] text-ink transition group-hover:text-accent">
                        {r.title}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
