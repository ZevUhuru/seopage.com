import type { CSSProperties, ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { DarkFooter } from "@/components/DarkFooter";
import { RankMark } from "@/components/rank/parts";
import { ZoomImage } from "@/components/rank/ZoomImage";
import { slugify } from "@/lib/articles";
import { CREATE_URL, PRICE_LABEL } from "@/lib/config";
import { BODY, CARD, H2, OAT_FONTS, PAD, Points, PRIMARY, SECTION, SiteHeader, toneStyle, TONES } from "./oat-home";

/* ================================================================
   rank¹, the SEOPage journal, on the homepage's Oat kit (2026-10-29).
   Same articles, same structure as the live /rank; the look follows
   the Oat homepage (/prototypes/oat/oat) so the two go live together:
     - Oat ground, Funnel Display / Funnel Sans, pill buttons, one cobalt
     - the site header (Pricing, Sign in, Start free) with rank¹ beside the logo
     - sections numbered 01, 02… in mono, like the homepage's month steps,
       instead of a citation badge on every heading (the ¹ stays in the logo)
     - the money card and the close sell the monthly plan, not one $199 page
     - a navy close over the Ink footer
   Links point at the prototype routes so clicking around stays in Oat.
   ================================================================ */

export const OAT_JOURNAL = "/prototypes/oat-rank";
const OAT = TONES[0];
export const pad2 = (n: number) => String(n).padStart(2, "0");

/** A label in the kit: small, sentence case, cobalt. */
export const LABEL = "text-[14px] font-medium text-[var(--o-link)]";
/** Section and issue numbers: mono, like the homepage's month steps. */
export const NUM = "font-[family-name:var(--o-mono)] tabular-nums";

/* The page shell: kit colors and fonts, the site header with rank¹, the close and the Ink footer. */
export function JournalShell({ children }: { children: ReactNode }) {
  return (
    <div className={`${OAT_FONTS} min-h-screen font-[family-name:var(--o-body)] text-[var(--o-text)]`} style={toneStyle(OAT)}>
      <div className={`${PAD} pt-7`}>
        <SiteHeader
          extra={
            <>
              <span className="h-6 w-px bg-[var(--o-edge-strong)]" />
              <RankMark href={OAT_JOURNAL} className="text-[24px]" />
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
