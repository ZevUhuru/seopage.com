import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getArticles, formatDuration } from "@/lib/articles";

const TITLE = "How we build SEO pages, in the open | SEOPage";
const DESCRIPTION =
  "Breakdowns of how we analyze a real business, pick the search worth winning, and run the agents that build the page. Every issue shows the work, not the theory.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/agentic" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://seopage.com/agentic",
    siteName: "SEOPage",
    locale: "en_US",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

// Backstop only — the publish webhook purges the article tags on change.
export const revalidate = 3600;

export default async function AgenticIndex() {
  const articles = await getArticles();
  const [lead, ...rest] = articles;

  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden border-b border-line">
          <div className="grid-backdrop absolute inset-0 -z-10" aria-hidden />
          <div className="mx-auto max-w-3xl px-5 pb-14 pt-16 sm:px-8 lg:pb-16 lg:pt-24">
            <h1 className="kicker">The build log</h1>
            <p className="display mt-5 text-balance text-[2.1rem] leading-[1.05] text-ink sm:text-[2.9rem]">
              How we build SEO pages,{" "}
              <span className="text-accent">in the open.</span>
            </p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-2">
              Each issue takes a real business, works out which search is worth
              winning, and shows the agents building the page. The work, not the
              theory.
            </p>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-20">
            {articles.length === 0 ? (
              <p className="text-ink-2">
                The first issue is on its way. In the meantime,{" "}
                <Link href="/audit" className="underline underline-offset-4">
                  get a free page audit
                </Link>
                .
              </p>
            ) : (
              <>
                {lead && <ArticleRow article={lead} lead />}
                {rest.length > 0 && (
                  <ul className="mt-12 divide-y divide-line border-t border-line">
                    {rest.map((a) => (
                      <li key={a.slug}>
                        <ArticleRow article={a} />
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function ArticleRow({
  article,
  lead = false,
}: {
  article: Awaited<ReturnType<typeof getArticles>>[number];
  lead?: boolean;
}) {
  const duration = formatDuration(article.durationSeconds);
  return (
    <Link href={`/agentic/${article.slug}`} className="group block py-6">
      <div className="mono flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] uppercase tracking-[0.14em] text-muted">
        <span className="text-accent">{article.categoryLabel}</span>
        <time dateTime={article.publishedAt}>
          {new Date(article.publishedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </time>
        {duration && <span>{duration}</span>}
      </div>
      <h2
        className={`display mt-2 text-balance text-ink transition group-hover:text-accent ${
          lead ? "text-[1.7rem] leading-[1.12] sm:text-[2.1rem]" : "text-[1.2rem] leading-[1.2]"
        }`}
      >
        {article.title}
      </h2>
      <p className="mt-2 max-w-[64ch] text-[0.95rem] leading-relaxed text-ink-2">
        {article.description}
      </p>
    </Link>
  );
}
