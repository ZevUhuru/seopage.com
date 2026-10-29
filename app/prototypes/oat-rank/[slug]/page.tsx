import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findArticle, getArticles, relatedFrom } from "@/lib/articles";
import { OAT_JOURNAL, RankArticle } from "@/components/oat/rank";

/* A /rank article on the Oat kit, kept as the prototype the live article shipped from. Schema and
   canonical live on the real route; this page only carries noindex metadata. */

export const metadata: Metadata = { title: { absolute: "rank¹ article on Oat | SEOPage" }, robots: { index: false, follow: false } };
export const revalidate = 3600;

export async function generateStaticParams() {
  return (await getArticles()).map((a) => ({ slug: a.slug }));
}

export default async function OatRankArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await findArticle(slug);
  if (!article) notFound();
  const related = relatedFrom(await getArticles(), article.slug, article.relatedSlugs);
  return <RankArticle article={article} related={related} base={OAT_JOURNAL} />;
}
