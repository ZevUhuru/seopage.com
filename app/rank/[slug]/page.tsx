import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { RankArticle } from "@/components/oat/rank";
import { findArticle, getArticles, JOURNAL_PATH, relatedFrom, toIsoDuration } from "@/lib/articles";

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
  // A chosen thumbnail beats Mux's first frame, which is often a fade from black.
  const ogImage =
    a.thumbnailUrl ?? (a.muxPlaybackId ? `https://image.mux.com/${a.muxPlaybackId}/thumbnail.jpg?time=0` : undefined);

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

/* An article on the Oat kit (components/oat/rank.tsx), picked in /prototypes/oat-rank
   (seopage.com #53). This route keeps the schema, metadata and ISR; the component draws the page. */
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await findArticle(slug);
  if (!article) notFound();

  const related = relatedFrom(await getArticles(), article.slug, article.relatedSlugs);
  const url = `${BASE_URL}${JOURNAL_PATH}/${article.slug}`;

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
        thumbnailUrl: article.thumbnailUrl
          ? new URL(article.thumbnailUrl, BASE_URL).toString()
          : `https://image.mux.com/${article.muxPlaybackId}/thumbnail.jpg?time=0`,
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
      <RankArticle article={article} related={related} base={JOURNAL_PATH} />
    </>
  );
}
