/**
 * /agentic articles: a static registry checked into git, merged with articles
 * published from Compose via api.esy.com.
 *
 * The registry is the curated source of record and wins slug collisions; the
 * API adds net-new articles. That means the hub has real content with no API
 * dependency, and keeps rendering if api.esy.com is unreachable.
 *
 * Cache model is event-driven. The publish/unpublish webhook hits
 * /api/revalidate, which purges these tags, so a change lands in ~1s. The
 * 1-hour revalidate below is a backstop for a missed webhook, not the primary
 * freshness mechanism.
 */

import { seedArticles } from "@/data/agentic-articles";

const API_URL = process.env.ESY_API_URL ?? "https://api.esy.com";

/** The Compose publication that feeds seopage.com/agentic. */
export const PUBLICATION_SLUG = process.env.ESY_PUBLICATION_SLUG ?? "seopage";

/** Backstop only; on-demand tag revalidation is the real trigger. */
const REVALIDATE_SECONDS = 3600;

/**
 * The shape api.esy.com serves for a published article. Video fields are
 * optional: seopage.com/agentic launches as written articles, and a Mux
 * playback id upgrades a given article to a video page with no code change.
 */
export type Article = {
  slug: string;
  title: string;
  description: string;
  category: string;
  categoryLabel: string;
  publishedAt: string;
  /** Markdown body. This is what ranks; a transcript alone never would. */
  content: string;
  tags: string[];
  relatedSlugs?: string[];
  /** Present once the article has a video. */
  muxPlaybackId?: string;
  durationSeconds?: number;
  thumbnailUrl?: string;
  transcript?: string;
};

/**
 * Local dev and static builds may degrade to an empty list when the API is
 * unreachable. Production ISR must throw instead, so Next discards the
 * regeneration and keeps serving the last-good render.
 */
function mayDegradeToEmpty(): boolean {
  return (
    process.env.NEXT_PHASE === "phase-production-build" ||
    process.env.NODE_ENV === "development"
  );
}

async function fetchPublished(): Promise<Article[]> {
  const res = await fetch(
    `${API_URL}/v1/publications/public/${PUBLICATION_SLUG}/articles`,
    {
      next: {
        revalidate: REVALIDATE_SECONDS,
        tags: ["published-articles", `published-articles:${PUBLICATION_SLUG}`],
      },
    },
  );
  // Throw, never return [] — returning an empty list here would let Next cache
  // an article-less render on a transient blip and silently drop every article
  // until the cache expired. A 404 means the publication is missing or not
  // public, which is also an error rather than "no articles".
  if (!res.ok) {
    throw new Error(`published-articles ${PUBLICATION_SLUG}: HTTP ${res.status}`);
  }
  const body = await res.json();
  return (body.items ?? []) as Article[];
}

/** Registry wins slug collisions; everything sorts newest-first. */
function mergeBySlug(registry: Article[], api: Article[]): Article[] {
  const seen = new Set(registry.map((a) => a.slug));
  const merged = [...registry];
  for (const a of api) {
    if (seen.has(a.slug)) continue;
    seen.add(a.slug);
    merged.push(a);
  }
  return merged.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export async function getArticles(): Promise<Article[]> {
  let published: Article[] = [];
  try {
    published = await fetchPublished();
  } catch (err) {
    if (!mayDegradeToEmpty()) throw err;
    if (process.env.NODE_ENV === "development") {
      console.warn(
        `[articles] ${PUBLICATION_SLUG}: API unavailable, registry only.`,
        err,
      );
    }
  }
  return mergeBySlug(seedArticles, published);
}

/** Distinct categories present, in first-seen order. */
export function categoriesOf(articles: Article[]) {
  const seen = new Map<string, string>();
  for (const a of articles) {
    if (!seen.has(a.category)) seen.set(a.category, a.categoryLabel);
  }
  return [...seen].map(([category, label]) => ({ category, label }));
}

export async function findArticle(slug: string): Promise<Article | undefined> {
  return (await getArticles()).find((a) => a.slug === slug);
}

/** Explicit relations first, then most-recent, excluding the current article. */
export function relatedFrom(
  all: Article[],
  currentSlug: string,
  relatedSlugs: string[] = [],
  limit = 3,
): Article[] {
  const picked = relatedSlugs
    .map((slug) => all.find((a) => a.slug === slug))
    .filter((a): a is Article => Boolean(a));
  const rest = all.filter(
    (a) => a.slug !== currentSlug && !picked.some((p) => p.slug === a.slug),
  );
  return [...picked, ...rest].slice(0, limit);
}

export function formatDuration(seconds?: number): string | null {
  if (!seconds || seconds <= 0) return null;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

/** ISO 8601 duration for VideoObject schema. */
export function toIsoDuration(seconds?: number): string | undefined {
  if (!seconds || seconds <= 0) return undefined;
  return `PT${Math.floor(seconds / 60)}M${seconds % 60}S`;
}
