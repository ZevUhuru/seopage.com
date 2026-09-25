import { funnelDisplay } from "@/components/home/fonts";
import { CREATE_URL, PRICE_AFTER_LAUNCH_LABEL, PRICE_LABEL } from "@/lib/config";
import type { Vertical } from "@/lib/verticals";
import { Cta, Faq, PAD, Query, SECTION, TradeHeader, TradeLegal } from "./trade-shared";

/* C · THE POSTER
   The trade itself is the headline, set as big as the rank¹ masthead and
   wearing the same citation badge: the page's promise is that this trade
   gets cited. Searches scroll past like a ticker; what the competition gets
   wrong is struck through. Loudest of the three. */

export function TradeC({ v }: { v: Vertical }) {
  const ticker = [...v.searches, ...v.searches];
  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden" style={{ background: "radial-gradient(60% 50% at 80% 0%, rgba(61,107,255,.18), transparent 70%)" }}>
        <TradeHeader v={v} />
        <div className={`${PAD} pb-16 pt-10 lg:pt-16`}>
          <h1 className="text-[18px] font-medium text-[#9DB4FF]">{v.primaryKeyword}</h1>
          <p className={`${funnelDisplay.className} mt-6 font-bold leading-[0.82] tracking-[-0.065em] text-[clamp(72px,15vw,250px)]`}>
            {v.plural.charAt(0).toUpperCase() + v.plural.slice(1)}
            <span aria-hidden className="relative -top-[0.5em] ml-[0.2em] inline-flex h-[1.5em] min-w-[1.5em] items-center justify-center rounded-[0.43em] bg-[#3D6BFF] align-top text-[0.28em] tracking-normal text-white">1</span>
          </p>
          <div className="mt-12 grid gap-10 border-t border-white/12 pt-10 lg:grid-cols-12">
            <p className="nh-display text-[clamp(26px,2.6vw,40px)] leading-[1.12] tracking-[-0.03em] lg:col-span-7">
              {v.headline.lead} <span className="text-[#FF8A7D]">{v.headline.loss}</span>
            </p>
            <div className="lg:col-span-4 lg:col-start-9">
              <Cta v={v} />
            </div>
          </div>
        </div>

        {/* TICKER */}
        <div className="border-y border-white/12 bg-[#0A0F1E] py-6" aria-label={`Searches ${v.plural}' customers type`}>
          <div className="rk-marquee flex w-max gap-12 whitespace-nowrap">
            {ticker.map((s, i) => (
              <span key={i} className="nh-display flex items-center gap-12 text-[clamp(28px,3.4vw,52px)] tracking-[-0.04em]" aria-hidden={i >= v.searches.length}>
                <span className="text-[#EEF2FF]">&ldquo;<Query q={s} />&rdquo;</span>
                <span className="text-[#3D6BFF]">●</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* STRUCK THROUGH */}
      <section className={SECTION}>
        <p className="text-[18px] font-medium text-[#FF8A7D]">Why the pages above you are beatable</p>
        <ul className="mt-10 flex flex-col gap-8">
          {v.failings.map((f) => (
            <li key={f} className="nh-display max-w-[1150px] text-[clamp(26px,3.2vw,48px)] leading-[1.12] tracking-[-0.035em] text-[#7D869C] line-through decoration-[#FF6B5C] decoration-[0.06em]">
              {f}
            </li>
          ))}
        </ul>
        <p className="nh-display mt-14 text-[clamp(34px,4.4vw,64px)] leading-[1] tracking-[-0.04em]">Replace it this afternoon.</p>
      </section>

      {/* PROOF */}
      <section className={`${SECTION} bg-[#0A0F1E]`}>
        <h2 className="nh-display max-w-[900px] text-[clamp(40px,5vw,72px)] leading-none">Said in words, so it gets quoted.</h2>
        <div className="mt-14 grid border-l border-t border-white/12 md:grid-cols-2">
          {v.proof.map((p, i) => (
            <div key={p.t} className="flex flex-col gap-5 border-b border-r border-white/12 p-8 lg:p-12">
              <span className="nh-display text-[clamp(64px,7vw,110px)] leading-[0.8] tracking-[-0.06em] text-[#3D6BFF]">{i + 1}</span>
              <h3 className="nh-display text-[clamp(24px,2.2vw,32px)] leading-[1.08] tracking-[-0.03em]">{p.t}</h3>
              <p className="text-[16.5px] leading-[1.6] text-[#A0A9C0]">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* OFFER BAND */}
      <section className={`${PAD} bg-[#3D6BFF] py-20 text-white lg:py-28`}>
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-[18px] font-medium text-white/80">One {v.primaryKeyword} page. Once.</p>
            <p className="nh-display mt-3 text-[clamp(110px,16vw,240px)] leading-[0.8] tracking-[-0.06em]">{PRICE_LABEL}</p>
            <p className="mt-6 text-[17px] text-white/80">Launch price. {PRICE_AFTER_LAUNCH_LABEL} after launch. Free to preview, pay when you publish.</p>
          </div>
          <div className="flex flex-col gap-4 lg:col-span-4 lg:col-start-9">
            <a href={CREATE_URL} className="flex h-[60px] items-center justify-center rounded-full bg-white text-[17px] font-semibold text-[#0A0F1E] hover:bg-[#EEF2FF]">
              Build my page free
            </a>
            <p className="text-[15px] text-white/80">No retainer, no dashboard, no contract. You own the page.</p>
          </div>
        </div>
      </section>

      <Faq v={v} />
      <TradeLegal />
    </main>
  );
}
