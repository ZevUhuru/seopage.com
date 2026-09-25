import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { funnelDisplay } from "@/components/home/fonts";
import type { Article } from "@/lib/articles";

export const STYLES = [
  { key: "a", name: "Front Page", note: "Dark broadsheet. Type does all the work." },
  { key: "b", name: "Answer Engine", note: "The blog reads as an AI answer citing us." },
  { key: "c", name: "Cinematic", note: "Nora-led, video-first, calm light reading body." },
] as const;
export type StyleKey = (typeof STYLES)[number]["key"];

export const base = (s: StyleKey) => `/proto/rank/${s}`;

export function readMinutes(content: string) {
  return Math.max(1, Math.round(content.split(/\s+/).length / 230));
}

export function slugify(t: string) {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function headingsOf(content: string) {
  return [...content.matchAll(/^##\s+(.+)$/gm)].map((m) => ({ id: slugify(m[1]), text: m[1] }));
}

export function fmtDate(iso: string, month: "short" | "long" = "short") {
  return new Date(iso).toLocaleDateString("en-US", { month, day: "numeric", year: "numeric", timeZone: "UTC" });
}

export const pad2 = (n: number) => String(n).padStart(2, "0");

/** First sentence of a description, for answer-style summaries. */
export const firstSentence = (s: string) => s.match(/^.*?[.!?](\s|$)/)?.[0].trim() ?? s;

function textOf(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (node && typeof node === "object" && "props" in node)
    return textOf((node as { props: { children?: React.ReactNode } }).props.children);
  return "";
}

/** Article body; each style skins it through its own `.rk-prose-*` class. */
export function Prose({ content, className, h2Prefix }: { content: string; className: string; h2Prefix?: (i: number) => React.ReactNode }) {
  let i = 0;
  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <h2 id={slugify(textOf(children))}>{children}</h2>,
          h2: ({ children }) => {
            const n = i++;
            return (
              <h2 id={slugify(textOf(children))}>
                {h2Prefix?.(n)}
                {children}
              </h2>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

/** "rank" set as a sibling of the seopage¹ wordmark. */
export function RankMark({ className = "text-[24px]", n = "1", href }: { className?: string; n?: string; href?: string }) {
  const inner = (
    <>
      rank
      <span
        aria-hidden
        className="ml-[0.2em] mt-[0.07em] flex h-[1.5em] min-w-[1.5em] items-center justify-center rounded-[0.43em] bg-[#3D6BFF] px-[0.3em] text-[0.28em] tracking-normal text-white"
      >
        {n}
      </span>
    </>
  );
  const cls = `${funnelDisplay.className} inline-flex items-start font-bold leading-none tracking-[-0.05em] ${className}`;
  return href ? (
    <Link href={href} className={cls} aria-label="rank, the SEOPage journal">
      {inner}
    </Link>
  ) : (
    <span className={cls}>{inner}</span>
  );
}

/** Citation badge, the logo's superscript as an inline element. */
export function Cite({ n, className = "" }: { n: number | string; className?: string }) {
  return (
    <span className={`inline-flex h-[1.35em] min-w-[1.35em] items-center justify-center rounded-[0.35em] bg-[#3D6BFF]/20 px-[0.25em] align-[0.3em] text-[0.62em] font-semibold leading-none text-[#9DB4FF] ${className}`}>
      {n}
    </span>
  );
}

/** Floating prototype switcher. Keeps the current article when flipping styles. */
export function ProtoSwitcher({ current, slug }: { current: StyleKey; slug?: string }) {
  return (
    <nav className="fixed bottom-4 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/15 bg-[#0A0F1E]/90 p-1 text-[13px] shadow-2xl backdrop-blur">
      <Link href="/proto/rank" className="hidden px-3 text-[#7D869C] hover:text-white sm:inline">
        Prototypes
      </Link>
      {STYLES.map((s) => (
        <Link
          key={s.key}
          href={slug ? `${base(s.key)}/${slug}` : base(s.key)}
          className={`whitespace-nowrap rounded-full px-3.5 py-1.5 font-medium ${s.key === current ? "bg-[#3D6BFF] text-white" : "text-[#C9D0E2] hover:bg-white/10"}`}
        >
          {s.key.toUpperCase()}<span className="hidden sm:inline"> · {s.name}</span>
        </Link>
      ))}
    </nav>
  );
}

export type IndexProps = { articles: Article[] };
export type ArticleProps = { article: Article; all: Article[]; related: Article[] };
