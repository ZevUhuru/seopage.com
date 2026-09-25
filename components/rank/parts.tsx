import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Logo } from "@/components/Logo";
import { Tick } from "@/components/home/HeroAnswer";
import { funnelDisplay } from "@/components/home/fonts";
import { JOURNAL_PATH, slugify } from "@/lib/articles";
import { CREATE_URL, PRICE_AFTER_LAUNCH_LABEL, PRICE_LABEL } from "@/lib/config";

/* rank¹, the SEOPage journal. The logo's superscript is the mark an AI answer
   puts next to a source, so the journal reads the way an answer does: the
   index is a composed answer citing each issue, and each issue opens with its
   short answer and numbers its sections like sources. */

export const PAD = "px-6 sm:px-10 lg:px-24";

/** "rank" set as a sibling of the seopage¹ wordmark. */
export function RankMark({ className = "text-[24px]", href }: { className?: string; href?: string }) {
  const cls = `${funnelDisplay.className} inline-flex items-start font-bold leading-none tracking-[-0.05em] ${className}`;
  const inner = (
    <>
      rank
      <span
        aria-hidden
        className="ml-[0.2em] mt-[0.07em] flex h-[1.5em] min-w-[1.5em] items-center justify-center rounded-[0.43em] bg-[#3D6BFF] px-[0.3em] text-[0.28em] tracking-normal text-white"
      >
        1
      </span>
    </>
  );
  return href ? (
    <Link href={href} className={cls} aria-label="rank, the SEOPage journal">
      {inner}
    </Link>
  ) : (
    <span className={cls}>{inner}</span>
  );
}

/** A citation badge, the logo's superscript as an inline element. */
export function Cite({ n, className = "" }: { n: number; className?: string }) {
  return (
    <span className={`inline-flex h-[1.35em] min-w-[1.35em] items-center justify-center rounded-[0.35em] bg-[#3D6BFF]/20 px-[0.25em] align-[0.3em] text-[0.62em] font-semibold leading-none text-[#9DB4FF] ${className}`}>
      {n}
    </span>
  );
}

export function JournalHeader() {
  return (
    <header className={`${PAD} flex h-20 items-center justify-between`}>
      <div className="flex items-center gap-4">
        <Logo tone="dark" className="text-[22px]" />
        <span className="h-6 w-px bg-white/15" />
        <RankMark href={JOURNAL_PATH} className="text-[22px] text-[#9DB4FF]" />
      </div>
      <a href={CREATE_URL} className="flex h-11 items-center rounded-full border border-white/30 px-5 font-medium hover:border-white/60">
        Build my page
      </a>
    </header>
  );
}

export function PriceCard() {
  return (
    <div className="flex flex-col gap-4 rounded-[24px] border border-[#3D6BFF]/40 bg-gradient-to-b from-[#12204A] to-[#0A0F1E] p-7">
      <span className="text-[15px] text-[#C9D0E2]">Want your page to be the source?</span>
      <span className="flex items-baseline gap-3">
        <span className="nh-display text-[56px] leading-none tracking-[-0.05em]">{PRICE_LABEL}</span>
        <span className="text-[14px] text-[#9DB4FF]">launch price</span>
      </span>
      <ul className="flex flex-col gap-2 border-y border-white/12 py-4 text-[14.5px] text-[#C9D0E2]">
        {["Free preview, no card", "Ten checks before you pay", "You own the page"].map((x) => (
          <li key={x} className="flex items-center gap-2">
            <Tick />
            {x}
          </li>
        ))}
      </ul>
      <a href={CREATE_URL} className="flex h-[52px] items-center justify-center rounded-full bg-[#3D6BFF] font-semibold text-white hover:bg-[#5A82FF]">
        Build my page free
      </a>
      <span className="text-[13px] text-[#7D869C]">{PRICE_AFTER_LAUNCH_LABEL} after launch.</span>
    </div>
  );
}

export function JournalClose() {
  return (
    <section className={`${PAD} border-t border-white/12 bg-[#0A0F1E] py-24 lg:py-32`}>
      <p className="text-[18px] font-medium text-[#FF8A7D]">Everything here is how we build your page.</p>
      <h2 className="nh-display mt-5 max-w-[980px] text-[clamp(44px,6vw,96px)] leading-[0.95]">
        Make the answer you. <span className="text-[#7D869C]">For {PRICE_LABEL}, once.</span>
      </h2>
      <a href={CREATE_URL} className="mt-10 inline-flex h-[60px] items-center rounded-full bg-[#3D6BFF] px-8 text-[17px] font-semibold text-white hover:bg-[#5A82FF]">
        Build my page free
      </a>
    </section>
  );
}

function textOf(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (node && typeof node === "object" && "props" in node)
    return textOf((node as { props: { children?: React.ReactNode } }).props.children);
  return "";
}

/**
 * The article body. Server-rendered so the whole text is in the HTML: it is
 * what ranks and what an assistant quotes. Sections are numbered like
 * sources, and their ids match headingsOf() so the short answer can link in.
 */
export function JournalProse({ content }: { content: string }) {
  let n = 0;
  const Section = ({ children }: { children?: React.ReactNode }) => (
    <h2 id={slugify(textOf(children))}>
      <Cite n={++n} className="shrink-0 text-[0.6em]" />
      {children}
    </h2>
  );
  return (
    <div className="rank-prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ h1: Section, h2: Section }}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
