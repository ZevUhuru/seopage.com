import type { Metadata } from "next";
import { RankIndex } from "@/components/oat/rank";
import { getArticles, JOURNAL_PATH } from "@/lib/articles";

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

/* The journal's front page on the Oat kit (components/oat/rank.tsx): the masthead, the latest issue
   beside the next three, then every issue. Picked in /prototypes/oat-rank (seopage.com #53). */
export default async function RankIndexPage() {
  return <RankIndex articles={await getArticles()} base={JOURNAL_PATH} />;
}
