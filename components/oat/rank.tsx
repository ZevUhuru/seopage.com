import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { DarkFooter } from "@/components/DarkFooter";
import { RankMark } from "@/components/rank/parts";
import { ZoomImage } from "@/components/rank/ZoomImage";
import { type Article, formatDate, formatDuration, headingsOf, readMinutes, slugify } from "@/lib/articles";
import { CREATE_URL, PRICE_LABEL } from "@/lib/config";
import { BODY, CARD, H2, OAT_FONTS, PAD, Points, PRIMARY, SECTION, SiteHeader, toneStyle, TONES } from "./home";

/* ================================================================
   rank¹, the SEOPage journal, on the homepage's Oat kit (2026-10-29).
   Same articles and structure as the dark journal it replaced; the look
   follows the Oat homepage:
     - Oat ground, Funnel Display / Funnel Sans, pill buttons, one cobalt
     - the site header (Pricing, Sign in, Start free) with rank¹ beside the logo
     - sections numbered 01, 02… in mono, like the homepage's month steps,
       instead of a citation badge on every heading (the ¹ stays in the logo)
     - the money card and the close sell the monthly plan, not one $199 page
     - a navy close over the Ink footer
   Every link is built from `base`: /rank on the live site, the prototype
   path under /prototypes so clicking around there stays in the prototype.
   ================================================================ */

export const OAT_JOURNAL = "/prototypes/oat-rank";
const OAT = TONES[0];
export const pad2 = (n: number) => String(n).padStart(2, "0");

/** A label in the kit: small, sentence case, cobalt. */
export const LABEL = "text-[14px] font-medium text-[var(--o-link)]";
/** Section and issue numbers: mono, like the homepage's month steps. */
export const NUM = "font-[family-name:var(--o-mono)] tabular-nums";

/* The page shell: kit colors and fonts, the site header with rank¹, the close and the Ink footer. */
export function JournalShell({ base, children }: { base: string; children: ReactNode }) {
  return (
    <div className={`${OAT_FONTS} min-h-screen font-[family-name:var(--o-body)] text-[var(--o-text)]`} style={toneStyle(OAT)}>
      <div className={`${PAD} pt-7`}>
        <SiteHeader
          extra={
            <>
              <span className="h-6 w-px bg-[var(--o-edge-strong)]" />
              <RankMark href={base} className="text-[24px]" />
            </>
          }
        />
      </div>
      {children}
      <JournalClose />
      <DarkFooter ground="ink" />
    </div>
  );
}

/* The close: Esy Navy, the plan's ask in checklist voice. */
function JournalClose() {
  const navy = { "--o-text": "#f4f1ea", "--o-text2": "#cdd6e2", "--o-action": "#9db4ff", "--o-action-ink": "#0a2540", background: "#0a2540", color: "#f4f1ea" } as CSSProperties;
  return (
    <section className={`${SECTION} text-center`} style={navy}>
      <p className="text-[16px] font-medium text-[#9db4ff]">Everything here is how we build your pages.</p>
      <h2 className={`${H2} mx-auto mt-5 max-w-[860px]`}>Give the searches near you an answer on your site.</h2>
      <div className={`${BODY} mx-auto mt-6 max-w-[560px]`}>
        <Points center items={["First page free to preview", "$149 a month when the plan opens"]} />
      </div>
      <div className="mt-10"><a href={CREATE_URL} className={PRIMARY}>Build your first page free</a></div>
    </section>
  );
}

/* The article's money card: the monthly plan, with one page as a footnote. */
export function PlanCard() {
  return (
    <div className={`${CARD} flex flex-col gap-5 p-7`}>
      <span className="text-[15px] text-[var(--o-muted)]">SEOPage · opening soon</span>
      <span className="flex items-baseline gap-3">
        <span className={`${NUM} text-[48px] font-medium leading-none tracking-[-0.04em]`}>$149</span>
        <span className="text-[15px] text-[var(--o-text2)]">a month</span>
      </span>
      <div className="border-y border-[var(--o-edge)] py-4">
        <Points items={["Picked from your Search Console", "Written by our AI SEO agents", "A report every month"]} />
      </div>
      <a href={CREATE_URL} className={`${PRIMARY} justify-center`}>Start with a free page</a>
      <span className="text-[13.5px] text-[var(--o-muted)]">
        Just need one page? It&apos;s {PRICE_LABEL} once when you publish.
      </span>
    </div>
  );
}

function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (node && typeof node === "object" && "props" in node) return textOf((node as { props: { children?: ReactNode } }).props.children);
  return "";
}

/**
 * The article body, server-rendered so the whole text is in the HTML. Sections are numbered 01, 02…
 * and their ids match headingsOf(), so the short answer and the side list can link in.
 */
export function OatProse({ content }: { content: string }) {
  let n = 0;
  const Section = ({ children }: { children?: ReactNode }) => (
    <h2 id={slugify(textOf(children))}>
      <span className={`${NUM} oat-prose-num`}>{pad2(++n)}</span>
      <span>{children}</span>
    </h2>
  );
  return (
    <div className="oat-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: Section,
          h2: Section,
          // An image paragraph becomes a figure: the zoom dialog can't sit inside a <p>.
          p: ({ node, children }) =>
            node?.children.some((c) => c.type === "element" && c.tagName === "img") ? <figure className="rank-figure">{children}</figure> : <p>{children}</p>,
          img: ({ src, alt }) => <ZoomImage src={typeof src === "string" ? src : undefined} alt={alt} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

/* A numbered section link, used by the short answer and the side list. */
export function SectionLink({ id, text, i }: { id: string; text: string; i: number }) {
  return (
    <a href={`#${id}`} className="grid grid-cols-[28px_1fr] items-baseline gap-2 text-[15px] leading-snug text-[var(--o-text2)] hover:text-[var(--o-text)]">
      <span className={`${NUM} text-[13px] text-[var(--o-link)]`}>{pad2(i + 1)}</span>
      {text}
    </a>
  );
}

/* ---------- The index: the masthead, the latest issue beside the next three, then every issue.
   Issue numbers count up from the oldest. ---------- */
export function RankIndex({ articles, base }: { articles: Article[]; base: string }) {
  const [lead, ...rest] = articles;
  const next = rest.slice(0, 3);
  const issueNo = (i: number) => pad2(articles.length - i);
  const href = (slug: string) => `${base}/${slug}`;

  return (
    <JournalShell base={base}>
      {/* MASTHEAD */}
      <header className={`${PAD} pb-10 pt-14 lg:pt-20`}>
        <h1>
          <span className="sr-only">rank, the SEOPage journal</span>
          <RankMark className="text-[clamp(110px,22vw,340px)] tracking-[-0.07em] !leading-[0.78]" />
        </h1>
        <div className="mt-10 grid gap-4 border-y border-[var(--o-edge-strong)] py-5 text-[15px] text-[var(--o-text2)] md:grid-cols-3">
          <p className="text-[var(--o-text)]">How pages get found on Google and named by AI.</p>
          <p className="md:text-center">The work, not the theory. Written by Zev Uhuru.</p>
          <p className="text-[var(--o-muted)] md:text-right">
            <span className={NUM}>{articles.length}</span> {articles.length === 1 ? "issue" : "issues"}
            {lead && <> · latest {formatDate(lead.publishedAt, "long")}</>}
          </p>
        </div>
      </header>

      {/* FRONT: the latest issue beside the next three */}
      {lead && (
        <section className={`${PAD} grid gap-12 pb-24 lg:grid-cols-12 lg:gap-16`}>
          <Link href={href(lead.slug)} className="group flex flex-col gap-6 lg:col-span-7">
            <span className={LABEL}>Latest · {lead.categoryLabel}</span>
            <h2 className="font-[family-name:var(--o-head)] text-[clamp(42px,5.4vw,84px)] font-semibold leading-[0.96] tracking-[-0.045em] transition-colors group-hover:text-[var(--o-link)]">{lead.title}</h2>
            <p className="max-w-[620px] text-[clamp(18px,1.5vw,21px)] leading-[1.55] text-[var(--o-text2)]">{lead.description}</p>
            <span className="text-[15px] font-medium text-[var(--o-link)]">Read · {readMinutes(lead.content)} min →</span>
          </Link>
          {next.length > 0 && (
            <ol className="flex flex-col lg:col-span-5 lg:border-l lg:border-[var(--o-edge-strong)] lg:pl-12">
              {next.map((a, i) => (
                <li key={a.slug} className="border-b border-[var(--o-edge)] first:border-t lg:first:border-t-0">
                  <Link href={href(a.slug)} className="group grid grid-cols-[56px_1fr] gap-4 py-7">
                    <span className={`${NUM} pt-1 text-[15px] text-[var(--o-link)]`}>{issueNo(i + 1)}</span>
                    <span className="flex flex-col gap-2">
                      <span className="text-[13.5px] text-[var(--o-muted)]">{a.categoryLabel}</span>
                      <span className="font-[family-name:var(--o-head)] text-[26px] font-semibold leading-[1.08] tracking-[-0.035em] transition-colors group-hover:text-[var(--o-link)]">{a.title}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          )}
        </section>
      )}

      {/* EVERY ISSUE */}
      <section className={`${PAD} py-20 lg:py-28`} style={{ background: "var(--o-alt)" }}>
        <div className="flex items-end justify-between gap-6">
          <h2 className="font-[family-name:var(--o-head)] text-[clamp(38px,4.6vw,64px)] font-semibold leading-none tracking-[-0.045em]">Every issue.</h2>
          <span className="text-[14px] text-[var(--o-muted)]">Newest first</span>
        </div>
        <ul className="mt-12 border-t border-[var(--o-edge-strong)]">
          {articles.map((a, i) => (
            <li key={a.slug}>
              <Link
                href={href(a.slug)}
                className="group grid grid-cols-[48px_1fr] items-baseline gap-x-5 gap-y-2 border-b border-[var(--o-edge)] px-2 py-7 transition-colors hover:bg-[var(--o-panel)] md:grid-cols-[64px_1fr_170px_130px_80px]"
              >
                <span className={`${NUM} text-[13px] text-[var(--o-muted)]`}>{issueNo(i)}</span>
                <span className="font-[family-name:var(--o-head)] text-[clamp(21px,2.1vw,30px)] font-semibold leading-[1.1] tracking-[-0.035em] group-hover:text-[var(--o-link)]">{a.title}</span>
                <span className="col-start-2 text-[14px] text-[var(--o-link)] md:col-start-auto">{a.categoryLabel}</span>
                <time dateTime={a.publishedAt} className="col-start-2 text-[14px] text-[var(--o-text2)] md:col-start-auto">{formatDate(a.publishedAt)}</time>
                <span className="hidden text-right text-[14px] text-[var(--o-muted)] md:block">{readMinutes(a.content)} min</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </JournalShell>
  );
}

/* ---------- An article: video, the short answer, the numbered body, transcript, follow-ups,
   the side list and the plan card. The route adds metadata and schema. ---------- */
export function RankArticle({ article, related, base }: { article: Article; related: Article[]; base: string }) {
  const heads = headingsOf(article.content);
  // Planned videos carry a duration before they exist; only a real one counts.
  const duration = article.muxPlaybackId ? formatDuration(article.durationSeconds) : null;

  return (
    <JournalShell base={base}>
      <div className={`${PAD} grid gap-14 pb-24 pt-12 lg:grid-cols-12 lg:pt-16`}>
        <article className="min-w-0 lg:col-span-8">
          <nav aria-label="Breadcrumb" className="truncate font-[family-name:var(--o-mono)] text-[13px] text-[var(--o-muted)]">
            <Link href={base} className="hover:text-[var(--o-text)]">seopage.com › rank</Link> › {article.slug}
          </nav>
          <h1 className="mt-6 text-balance font-[family-name:var(--o-head)] text-[clamp(40px,5vw,76px)] font-semibold leading-[0.98] tracking-[-0.045em]">{article.title}</h1>
          <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[14.5px] text-[var(--o-text2)]">
            <span className={LABEL}>{article.categoryLabel}</span>
            <span>Zev Uhuru</span>
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt, "long")}</time>
            <span>{duration ? `${duration} video` : `${readMinutes(article.content)} min read`}</span>
          </p>

          {/* Mux's hosted player once a playback id exists; no placeholder frame before then */}
          {article.muxPlaybackId && (
            <div className="mt-10 overflow-hidden rounded-[18px] border border-[var(--o-edge)] bg-black">
              <div className="relative aspect-video">
                <iframe
                  src={`https://player.mux.com/${article.muxPlaybackId}?accent-color=%231B46D4`}
                  title={article.title}
                  allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </div>
          )}

          {/* The short answer: the self-contained passage an assistant can lift, with the sections below it */}
          <section className={`${CARD} mt-10 p-7 sm:p-9`}>
            <p className={`${LABEL} flex items-center gap-2`}>
              <span className="h-2 w-2 rounded-full bg-[var(--o-action)]" />
              The short answer
            </p>
            <p className="mt-4 text-[clamp(20px,1.8vw,24px)] leading-[1.5]">{article.description}</p>
            {heads.length > 0 && (
              <ol className="mt-7 grid gap-2.5 border-t border-[var(--o-edge)] pt-6 sm:grid-cols-2">
                {heads.map((h, i) => <li key={h.id}><SectionLink id={h.id} text={h.text} i={i} /></li>)}
              </ol>
            )}
          </section>

          {/* The body is what ranks. A transcript alone never would. */}
          <div className="mt-6 max-w-[720px]">
            <OatProse content={article.content} />
          </div>

          {article.transcript && (
            <details className={`${CARD} mt-14 max-w-[720px] p-6`}>
              <summary className="cursor-pointer text-[17px] font-medium">Full transcript</summary>
              <div className="mt-4 whitespace-pre-wrap text-[15.5px] leading-[1.7] text-[var(--o-text2)]">{article.transcript}</div>
            </details>
          )}

          {related.length > 0 && (
            <section className="mt-20 max-w-[720px]">
              <h2 className="font-[family-name:var(--o-head)] text-[28px] font-semibold tracking-[-0.035em]">Follow-up questions</h2>
              <ul className="mt-5 border-t border-[var(--o-edge-strong)]">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={`${base}/${r.slug}`} className="flex items-center justify-between gap-5 border-b border-[var(--o-edge)] py-5 text-[18px] hover:text-[var(--o-link)]">
                      {r.title}
                      <span className="text-[22px] text-[var(--o-muted)]" aria-hidden>→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>

        {/* The side: the numbered sections, then the plan. Every article feeds the money page. */}
        <aside className="lg:col-span-4">
          <div className="sticky top-8 flex flex-col gap-6">
            {heads.length > 0 && (
              <nav aria-label="Sections" className="hidden rounded-[14px] border border-[var(--o-edge)] p-6 lg:block">
                <p className="text-[14px] text-[var(--o-muted)]">In this issue</p>
                <ol className="mt-3 flex flex-col gap-2.5">
                  {heads.map((h, i) => <li key={h.id}><SectionLink id={h.id} text={h.text} i={i} /></li>)}
                </ol>
              </nav>
            )}
            <PlanCard />
          </div>
        </aside>
      </div>
    </JournalShell>
  );
}
