import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import {
  getArticles,
  categoriesOf,
  formatDuration,
  type Article,
} from "@/lib/articles";

const TITLE = "The Build Log — Agentic SEO, in the Open | SEOPage";
const DESCRIPTION =
  "How we pick the search worth winning, run the agents that build the page, and check the result. Playbooks, explainers, and breakdowns of real pages.";

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
  const shelves = categoriesOf(articles);

  return (
    <>
      <SiteHeader />
      <main>
        {/* ============ HERO ============ */}
        <section className="relative overflow-hidden border-b border-line">
          <div className="grid-backdrop absolute inset-0 -z-10" aria-hidden />
          <div className="mx-auto max-w-5xl px-5 pb-14 pt-16 sm:px-8 lg:pb-16 lg:pt-24">
            <h1 className="kicker">The build log</h1>
            <p className="display mt-5 max-w-3xl text-balance text-[2.1rem] leading-[1.05] text-ink sm:text-[2.9rem]">
              Agentic SEO,{" "}
              <span className="text-accent">in the open.</span>
            </p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-2">
              How we pick the search worth winning, run the agents that build
              the page, and check the result before it ships. The work, not the
              theory.
            </p>
            <p className="mono mt-7 text-[10px] uppercase tracking-[0.14em] text-muted">
              {articles.length} issues &middot; written and reviewed by Zev
              Uhuru
            </p>
          </div>
        </section>

        {/* ============ LEAD ============ */}
        {lead && (
          <section className="border-b border-line bg-surface-2">
            <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 lg:py-16">
              <p className="kicker">Latest</p>
              <Link href={`/agentic/${lead.slug}`} className="group mt-6 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
                <Poster article={lead} />
                <div>
                  <Meta article={lead} />
                  <h2 className="display mt-3 text-balance text-[1.7rem] leading-[1.12] text-ink transition group-hover:text-accent sm:text-[2.1rem]">
                    {lead.title}
                  </h2>
                  <p className="mt-3 max-w-[58ch] text-[1rem] leading-relaxed text-ink-2">
                    {lead.description}
                  </p>
                  <span className="mono mt-5 inline-block text-[10px] uppercase tracking-[0.14em] text-accent">
                    Read the issue →
                  </span>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* ============ SHELVES ============ */}
        {shelves.map(({ category, label }) => {
          const items = rest.filter((a) => a.category === category);
          if (items.length === 0) return null;
          return (
            <section key={category} className="border-b border-line">
              <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 lg:py-16">
                <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
                  <h2 className="text-[1.1rem] font-semibold text-ink">
                    {label}
                  </h2>
                  <span className="mono text-[10px] uppercase tracking-wider text-muted">
                    {items.length} {items.length === 1 ? "issue" : "issues"}
                  </span>
                </div>
                <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((a) => (
                    <li key={a.slug}>
                      <Link href={`/agentic/${a.slug}`} className="group block">
                        <Poster article={a} compact />
                        <div className="mt-3">
                          <Meta article={a} />
                          <h3 className="display mt-2 text-balance text-[1.1rem] leading-[1.22] text-ink transition group-hover:text-accent">
                            {a.title}
                          </h3>
                          <p className="mt-2 line-clamp-3 text-[0.9rem] leading-relaxed text-ink-2">
                            {a.description}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          );
        })}

        {/* ============ CTA ============ */}
        <section className="bg-surface-2">
          <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8">
            <p className="text-[1.05rem] font-semibold text-ink">
              Want this run on your page?
            </p>
            <p className="mt-2 max-w-lg text-ink-2">
              Send us a page and we&apos;ll audit it free, or have us build the
              page outright.
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
      </main>
      <SiteFooter />
    </>
  );
}

function Meta({ article }: { article: Article }) {
  const duration = formatDuration(article.durationSeconds);
  return (
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
  );
}

/**
 * The video slot. A Mux thumbnail once a playback id exists; until then a
 * placeholder frame so the shelf reads as a video hub rather than a link list.
 */
function Poster({
  article,
  compact = false,
}: {
  article: Article;
  compact?: boolean;
}) {
  const src = article.muxPlaybackId
    ? `https://image.mux.com/${article.muxPlaybackId}/thumbnail.jpg?time=0&width=640`
    : article.thumbnailUrl;
  const duration = formatDuration(article.durationSeconds);

  return (
    <div
      className={`relative aspect-video overflow-hidden rounded-lg border border-line bg-surface-3 ${
        compact ? "" : "shadow-lg"
      }`}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="grid-backdrop absolute inset-0 grid place-items-center">
          <span className="grid h-12 w-12 place-items-center rounded-full border border-line-strong bg-surface text-accent shadow-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5.5v13l11-6.5-11-6.5Z" />
            </svg>
          </span>
        </div>
      )}
      {duration && (
        <span className="mono absolute bottom-2 right-2 rounded bg-ink/85 px-1.5 py-0.5 text-[10px] text-white">
          {duration}
        </span>
      )}
    </div>
  );
}
