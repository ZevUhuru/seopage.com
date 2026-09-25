import type { Vertical } from "@/lib/verticals";
import { Cta, Faq, PAD, PriceCard, Query, SECTION, TradeHeader, TradeLegal, urlSlug } from "./trade-shared";

/* B · THE BRIEF
   The page reads like the research brief we'd write for this trade: numbered
   chapters, the search to start with, and the page itself drawn as a
   blueprint with each proof point pinned where it goes. Shows the work
   instead of describing it. */

const pad2 = (n: number) => String(n).padStart(2, "0");

function Chapter({ n, label, children }: { n: number; label: string; children: React.ReactNode }) {
  return (
    <section className={`${SECTION} grid gap-10 border-t border-white/12 lg:grid-cols-12`}>
      <div className="lg:col-span-3">
        <div className="sticky top-10 flex flex-col gap-2">
          <span className="nh-display text-[72px] leading-[0.8] tracking-[-0.05em] text-white/15">{pad2(n)}</span>
          <span className="nh-mono text-[12px] uppercase tracking-[0.16em] text-[#9DB4FF]">{label}</span>
        </div>
      </div>
      <div className="lg:col-span-9">{children}</div>
    </section>
  );
}

/** Where each proof point lands on the page. Index-matched to v.proof. */
const SLOTS = [
  { top: "13%", left: "6%", w: "52%", h: "7%", label: "Hero" },
  { top: "24%", left: "6%", w: "88%", h: "6%", label: "Trust bar" },
  { top: "40%", left: "6%", w: "42%", h: "22%", label: "Section" },
  { top: "40%", left: "52%", w: "42%", h: "22%", label: "Section" },
];

function Blueprint({ v }: { v: Vertical }) {
  return (
    <div className="grid gap-10 xl:grid-cols-[1.1fr_1fr] xl:items-start">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] border border-[#3D6BFF]/40 bg-[#0A0F1E] [background-image:linear-gradient(rgba(61,107,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(61,107,255,.08)_1px,transparent_1px)] [background-size:24px_24px]">
        <div className="flex h-8 items-center gap-1.5 border-b border-[#3D6BFF]/30 px-3">
          {[0, 1, 2].map((i) => <span key={i} className="h-2 w-2 rounded-full bg-white/20" />)}
          <span className="nh-mono ml-3 truncate text-[11px] text-[#7D869C]">yoursite.com/{urlSlug(v.searches[0])}</span>
        </div>
        {/* Static page skeleton */}
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

export function TradeB({ v }: { v: Vertical }) {
  const [first, ...more] = v.searches;
  return (
    <main>
      <TradeHeader v={v} />

      {/* COVER */}
      <header className={`${PAD} pb-20 pt-12 lg:pt-20`}>
        <p className="nh-mono flex flex-wrap gap-x-6 gap-y-2 border-y border-white/12 py-4 text-[12px] uppercase tracking-[0.16em] text-[#7D869C]">
          <span className="text-[#9DB4FF]">Brief</span>
          <span>Trade: {v.plural}</span>
          <span>{v.searches.length} searches</span>
          <span>{v.proof.length} proof points</span>
        </p>
        <h1 className="nh-display mt-12 text-[clamp(64px,11vw,176px)] leading-[0.86] tracking-[-0.055em]">{v.primaryKeyword}.</h1>
        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <p className="text-[clamp(22px,2.2vw,32px)] leading-[1.3] tracking-[-0.02em] lg:col-span-7">
            {v.headline.lead} <span className="text-[#FF8A7D]">{v.headline.loss}</span>
          </p>
          <div className="lg:col-span-4 lg:col-start-9">
            <Cta v={v} />
          </div>
        </div>
      </header>

      <Chapter n={1} label="The search to win first">
        <p className="text-[15px] text-[#9DB4FF]">Start here</p>
        <p className="nh-display mt-3 text-[clamp(36px,4.6vw,68px)] leading-[1] tracking-[-0.045em]">
          &ldquo;<Query q={first} />&rdquo;
        </p>
        <p className="mt-6 max-w-[620px] text-[18px] leading-[1.6] text-[#C9D0E2]">
          The most urgent buyer, calling whoever the search puts in front of them. After that, one page each:
        </p>
        <ul className="mt-8 flex flex-wrap gap-2.5">
          {more.map((s) => (
            <li key={s} className="rounded-full border border-white/15 px-4 py-2 text-[15px] text-[#C9D0E2]"><Query q={s} /></li>
          ))}
        </ul>
      </Chapter>

      <Chapter n={2} label="What the page has to prove">
        <h2 className="nh-display max-w-[760px] text-[clamp(34px,3.8vw,54px)] leading-[1.02]">Every claim a buyer needs, placed where it gets read.</h2>
        <div className="mt-12">
          <Blueprint v={v} />
        </div>
      </Chapter>

      <Chapter n={3} label="What the pages above you get wrong">
        <ol className="flex flex-col">
          {v.failings.map((f, i) => (
            <li key={f} className="grid grid-cols-[56px_1fr] gap-4 border-b border-white/12 py-6 first:pt-0">
              <span className="nh-display text-[36px] leading-none text-[#FF6B5C]">{pad2(i + 1)}</span>
              <p className="text-[clamp(18px,1.6vw,22px)] leading-[1.45] text-[#EEF2FF]">{f}</p>
            </li>
          ))}
        </ol>
      </Chapter>

      <Chapter n={4} label="The page, built">
        <div className="grid items-center gap-12 xl:grid-cols-2">
          <div className="flex flex-col gap-5">
            <h2 className="nh-display text-[clamp(34px,3.8vw,54px)] leading-[1.02]">This brief is what the builder runs.</h2>
            <p className="text-[18px] leading-[1.6] text-[#C9D0E2]">Tell it your business and city. It researches your market live, writes and designs the page, and scores it on ten checks before you pay.</p>
          </div>
          <PriceCard v={v} />
        </div>
      </Chapter>

      <Faq v={v} />
      <TradeLegal />
    </main>
  );
}
