import { notFound } from "next/navigation";
import { getArticles, relatedFrom } from "@/lib/articles";
import { ArticleA } from "../../_lib/a";
import { ArticleB } from "../../_lib/b";
import { ArticleC } from "../../_lib/c";
import { ProtoSwitcher, STYLES, type StyleKey } from "../../_lib/shared";

const ARTICLE = { a: ArticleA, b: ArticleB, c: ArticleC };

// Built once, so the prototype links never depend on the API.
export const dynamicParams = false;
export async function generateStaticParams() {
  const all = await getArticles();
  return STYLES.flatMap((s) => all.map((a) => ({ style: s.key, slug: a.slug })));
}

export default async function ProtoArticle({ params }: { params: Promise<{ style: string; slug: string }> }) {
  const { style, slug } = await params;
  const View = ARTICLE[style as StyleKey];
  const all = await getArticles();
  const article = all.find((a) => a.slug === slug);
  if (!View || !article) notFound();
  return (
    <>
      <View article={article} all={all} related={relatedFrom(all, slug, article.relatedSlugs)} />
      <ProtoSwitcher current={style as StyleKey} slug={slug} />
    </>
  );
}
