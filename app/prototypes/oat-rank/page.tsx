import type { Metadata } from "next";
import { getArticles } from "@/lib/articles";
import { OAT_JOURNAL, RankIndex } from "@/components/oat/rank";

/* The /rank index on the Oat kit, kept as the prototype the live /rank shipped from. */

export const metadata: Metadata = { title: { absolute: "rank¹ on Oat | SEOPage" }, robots: { index: false, follow: false } };
export const revalidate = 3600;

export default async function OatRankIndex() {
  return <RankIndex articles={await getArticles()} base={OAT_JOURNAL} />;
}
