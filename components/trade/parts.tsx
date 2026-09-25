import { Logo } from "@/components/Logo";
import { Tick } from "@/components/home/HeroAnswer";
import { CREATE_URL, PRICE_AFTER_LAUNCH_LABEL, PRICE_LABEL } from "@/lib/config";
import type { Vertical } from "@/lib/verticals";

/* Building blocks for the trade pages (/roofers, /hvac, …). They sit on the
   homepage's dark system and sell its offer: build free, pay to publish.
   Everything reads from the trade's entry in lib/verticals.ts. */

export const PAD = "px-6 sm:px-10 lg:px-24";
export const SECTION = `${PAD} py-24 lg:py-[120px]`;
export const H2 = "nh-display text-[clamp(40px,5vw,72px)] leading-none";

/** "roofing SEO" → "roofing": the trade as an adjective. */
export const tradeWord = (v: Vertical) => v.primaryKeyword.replace(/ SEO$/i, "");

/**
 * "a roofing" / "an HVAC". Acronyms are read letter by letter, so one that
 * starts with a letter named with a vowel sound (F, H, L, M, N, R, S, X)
 * takes "an".
 */
export const aOr = (word: string) => (/^[aeiou]/i.test(word) || /^[FHLMNRSX][A-Z]/.test(word) ? "an" : "a");

/** A search as the slug its page would live at: "roof leak repair near me" → roof-leak-repair. */
export const urlSlug = (q: string) =>
  q.replace(/\b(near me|in \[city\])\b/g, "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export function TradeHeader({ v }: { v: Vertical }) {
  return (
    <header className={`${PAD} relative z-10 flex h-20 items-center justify-between`}>
      <div className="flex items-center gap-4">
        <Logo tone="dark" className="text-[22px]" />
        <span className="nh-mono hidden text-[11px] uppercase tracking-[0.16em] text-[#7D869C] sm:inline">For {v.plural}</span>
      </div>
      <a href={CREATE_URL} className="flex h-11 items-center rounded-full border border-white/30 bg-[#04060B]/35 px-5 font-medium backdrop-blur hover:border-white/60">
        Build my page
      </a>
    </header>
  );
}

/** "[city]" in a search renders as a "your city" chip, not literal brackets. */
export function Query({ q }: { q: string }) {
  return (
    <>
      {q.split(/(\[city\])/).map((p, i) =>
        p === "[city]" ? (
          <span key={i} className="mx-[0.1em] rounded-[0.25em] bg-white/10 px-[0.25em] text-[0.9em] text-[#9DB4FF]">your city</span>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}

export function Cta({ v, center = false }: { v: Vertical; center?: boolean }) {
  return (
    <div className={`flex flex-col gap-4 ${center ? "items-center" : ""}`}>
      <a href={CREATE_URL} className="flex h-[60px] w-fit items-center rounded-full bg-[#3D6BFF] px-8 text-[17px] font-semibold text-white transition-colors hover:bg-[#5A82FF]">
        Build my {tradeWord(v)} page free
      </a>
      <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[14px] text-[#C9D0E2]">
        {["Free preview, no card", `${PRICE_LABEL} launch price, once`, "You own the page"].map((t) => (
          <li key={t} className="flex items-center gap-[7px]">
            <Tick />
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The trade's most urgent search, answered with someone else's name. */
export function Transcript({ v }: { v: Vertical }) {
  return (
    <div className="flex flex-col gap-4 rounded-[24px] border border-white/15 bg-[#0A0F1E]/90 p-6 shadow-[0_50px_100px_-50px_rgba(255,90,74,.35)] backdrop-blur sm:p-8">
      <div className="ml-auto max-w-[85%] rounded-[18px] rounded-br-[6px] bg-[#1A2340] px-5 py-3 text-[16px] text-[#EEF2FF]">
        <Query q={v.searches[0]} />
      </div>
      <p className="text-[18px] leading-[1.6] text-[#EEF2FF]">
        The one most people recommend is{" "}
        <span className="whitespace-nowrap">
          <b className="nh-named font-semibold text-[#FF6B5C]">[the company down the street]</b>
          <sup className="ml-1 rounded-[5px] bg-[#FF6B5C]/20 px-1.5 py-0.5 text-[11px] font-semibold text-[#FF8A7D]">1</sup>
        </span>
        . Their page answers what you need to know before you call.
      </p>
      <p className="nh-mono flex items-center gap-2 border-t border-white/10 pt-4 text-[12px] text-[#7D869C]">
        <span className="rounded-[5px] bg-[#FF6B5C]/20 px-1.5 py-0.5 text-[#FF8A7D]">1</span>
        their-site.com/{urlSlug(v.searches[0])}
      </p>
      <p className="flex items-center gap-2 text-[14px] text-[#FF8A7D]">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v6M12 16.5v.5" />
        </svg>
        Your page was read. Nothing on it could be quoted.
      </p>
    </div>
  );
}

/** Where each proof point lands on the page, index-matched to v.proof. */
const SLOTS = [
  { top: "13%", left: "6%", w: "52%", h: "7%", label: "Hero" },
  { top: "24%", left: "6%", w: "88%", h: "6%", label: "Trust bar" },
  { top: "40%", left: "6%", w: "42%", h: "22%", label: "Section" },
  { top: "40%", left: "52%", w: "42%", h: "22%", label: "Section" },
];

/** The page drawn as a blueprint, each proof point pinned where it goes. */
export function Blueprint({ v }: { v: Vertical }) {
  return (
    <div className="grid gap-10 xl:grid-cols-[1.1fr_1fr] xl:items-start">
      <div
        aria-hidden
        className="relative aspect-[4/5] overflow-hidden rounded-[20px] border border-[#3D6BFF]/40 bg-[#0A0F1E] [background-image:linear-gradient(rgba(61,107,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(61,107,255,.08)_1px,transparent_1px)] [background-size:24px_24px]"
      >
        <div className="flex h-8 items-center gap-1.5 border-b border-[#3D6BFF]/30 px-3">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-2 w-2 rounded-full bg-white/20" />
          ))}
          <span className="nh-mono ml-3 truncate text-[11px] text-[#7D869C]">yoursite.com/{urlSlug(v.searches[0])}</span>
        </div>
        <div className="absolute left-[6%] top-[8%] h-[3%] w-[30%] rounded bg-white/25" />
        <div className="absolute bottom-[26%] left-[6%] h-[7%] w-[88%] rounded-lg bg-white/[0.06]" />
        <div className="absolute bottom-[8%] left-[6%] h-[12%] w-[88%] rounded-lg border border-dashed border-white/15" />
        <span className="nh-mono absolute bottom-[12.5%] left-[9%] text-[10px] text-[#7D869C]">FAQ, written to be quoted</span>
        {v.proof.slice(0, SLOTS.length).map((p, i) => {
          const s = SLOTS[i];
          return (
            <div key={p.t} className="absolute rounded-lg border border-[#3D6BFF]/70 bg-[#3D6BFF]/[0.12]" style={{ top: s.top, left: s.left, width: s.w, height: s.h }}>
              <span className="callout-dot absolute -left-2.5 -top-2.5 !bg-[#3D6BFF]">{i + 1}</span>
              <span className="nh-mono absolute bottom-1.5 left-2.5 text-[10px] text-[#9DB4FF]">{s.label}</span>
            </div>
          );
        })}
      </div>
      <ol className="flex flex-col gap-7">
        {v.proof.map((p, i) => (
          <li key={p.t} className="grid grid-cols-[32px_1fr] gap-4">
            <span className="callout-dot mt-1 !h-7 !w-7 !bg-[#3D6BFF] !text-[12px]">{i + 1}</span>
            <div>
              <h3 className="nh-display text-[22px] leading-[1.15] tracking-[-0.025em]">{p.t}</h3>
              <p className="mt-2 text-[15.5px] leading-[1.6] text-[#A0A9C0]">{p.d}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function PriceCard({ v }: { v: Vertical }) {
  return (
    <div className="flex flex-col gap-[18px] rounded-[28px] border border-[#3D6BFF]/40 bg-gradient-to-b from-[#12204A] to-[#0A0F1E] p-8 sm:p-10">
      <span className="text-[16px] text-[#C9D0E2]">One {v.primaryKeyword} page</span>
      <span className="flex items-baseline gap-3.5">
        <span className="nh-display text-[clamp(72px,7vw,104px)] leading-none tracking-[-0.05em]">{PRICE_LABEL}</span>
        <span className="text-[15px] text-[#9DB4FF]">launch price</span>
      </span>
      <span className="text-[15px] text-[#A0A9C0]">{PRICE_AFTER_LAUNCH_LABEL} after launch. Pay when you publish.</span>
      <ul className="flex flex-col gap-2.5 border-y border-white/12 py-[18px] text-[15.5px]">
        {["Live research on your market's searches", "The full page, written and designed", "Everything a buyer needs, stated in text", "Title, description, and schema", "Ten checks, scored before you pay"].map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
      <a href={CREATE_URL} className="flex h-[58px] items-center justify-center rounded-full bg-[#3D6BFF] text-[16px] font-semibold text-white hover:bg-[#5A82FF]">
        Build my page free
      </a>
    </div>
  );
}
