import { BuilderDemo } from "@/components/home/BuilderDemo";
import { PersonalizeProvider } from "@/components/home/Personalize";
import type { Vertical } from "@/lib/verticals";
import { Blueprint } from "./trade-b";
import { Cta, Faq, PAD, PriceCard, Query, SECTION, TradeHeader, TradeLegal, REPLAY, aOr, tradeWord, urlSlug } from "./trade-shared";

/* A · THE ANSWER
   The homepage's argument, told per trade: someone asks an assistant the
   trade's most urgent search, and the answer names another company. Every
   section after that is the fix, in the order a buyer needs it.

   `final` is the recommended cut: the builder replay builds this trade's
   page right after the searches, and B's blueprint replaces the proof
   cards. No character, no videos, no images to make. */

function Transcript({ v }: { v: Vertical }) {
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
        . Their page
        answers what you need to know before you call.
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

export function TradeA({ v, final = false }: { v: Vertical; final?: boolean }) {
  const replay = REPLAY[v.slug];
  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden" style={{ background: "radial-gradient(50% 60% at 85% 30%, rgba(255,90,74,.12), transparent 70%)" }}>
        <TradeHeader v={v} />
        <div className={`${PAD} grid items-center gap-14 pb-24 pt-14 lg:grid-cols-12 lg:pt-20`}>
          <div className="flex flex-col gap-7 lg:col-span-7">
            <h1 className="text-[18px] font-medium text-[#FF8A7D]">{v.primaryKeyword}</h1>
            <p className="nh-display text-[clamp(44px,5.4vw,82px)] leading-[0.97]">
              {v.headline.lead} <span className="text-[#7D869C]">{v.headline.loss}</span>
            </p>
            <p className="max-w-[560px] text-[clamp(17px,1.5vw,20px)] leading-[1.55] text-[#C9D0E2]">
              One page, built to win the search {v.plural}&apos; customers type when they&apos;re ready, and to be the name an AI assistant gives.
            </p>
            <Cta v={v} />
          </div>
          <div className="lg:col-span-5">
            <Transcript v={v} />
          </div>
        </div>
      </section>

      {/* THE SEARCHES */}
      <section className={`${SECTION} border-t border-white/12`}>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <h2 className="nh-display max-w-[760px] text-[clamp(40px,5vw,72px)] leading-none">Typed in your market right now.</h2>
          <p className="max-w-[420px] text-[18px] leading-[1.6] text-[#C9D0E2]">Every one of them has an answer today. The only question is whose page it is.</p>
        </div>
        <ul className="mt-14 border-t border-white/12">
          {v.searches.map((s) => (
            <li key={s} className="grid items-baseline gap-2 border-b border-white/12 py-6 md:grid-cols-[1fr_260px]">
              <span className="nh-display text-[clamp(24px,2.6vw,38px)] leading-[1.1] tracking-[-0.035em]">
                <Query q={s} />
              </span>
              <span className="text-[15px] text-[#FF8A7D] md:text-right">Answer names: someone else</span>
            </li>
          ))}
        </ul>
      </section>

      {final && replay && (
        /* THE PAGE, BUILT: the real builder, replayed for this trade */
        <section className={`${SECTION} flex flex-col gap-12 bg-[#0A0F1E]`}>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <h2 className="nh-display max-w-[760px] text-[clamp(40px,5vw,72px)] leading-none">Here&apos;s {aOr(tradeWord(v))} {tradeWord(v)} page, built.</h2>
            <p className="max-w-[460px] text-[18px] leading-[1.6] text-[#C9D0E2]">
              The real builder, replayed for {replay.defaults.demoName} in {replay.defaults.demoCity}: live research, the page written and designed, ten checks scored before you pay. Yours uses your business and your city.
            </p>
          </div>
          <PersonalizeProvider defaults={replay.defaults}>
            <BuilderDemo trade={replay.demo} />
          </PersonalizeProvider>
          <p className="text-[14px] text-[#7D869C]">The builder&apos;s screens, replayed. {replay.defaults.demoName} is an example business. Search volumes are illustrative; yours come from live data.</p>
        </section>
      )}

      {final ? (
        /* WHAT THE PAGE MUST PROVE, drawn onto the page */
        <section className={SECTION}>
          <h2 className="nh-display max-w-[900px] text-[clamp(40px,5vw,72px)] leading-none">Every claim a buyer needs, placed where it gets read.</h2>
          <p className="mt-6 max-w-[600px] text-[18px] leading-[1.6] text-[#C9D0E2]">What {aOr(v.primaryKeyword)} {v.primaryKeyword} page has to say in plain text before anyone calls, and where each one goes.</p>
          <div className="mt-14">
            <Blueprint v={v} />
          </div>
        </section>
      ) : (
        <>
      {/* WHAT THE PAGE MUST PROVE */}
      <section className={`${SECTION} bg-[#0A0F1E]`}>
        <h2 className="nh-display max-w-[900px] text-[clamp(40px,5vw,72px)] leading-none">An assistant can&apos;t quote your photos.</h2>
        <p className="mt-6 max-w-[600px] text-[18px] leading-[1.6] text-[#C9D0E2]">What {aOr(v.primaryKeyword)} {v.primaryKeyword} page has to say in plain text before anyone calls. Your page states every one of these.</p>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {v.proof.map((p, i) => (
            <div key={p.t} className="flex flex-col gap-4 rounded-[22px] border border-white/12 bg-[#04060B] p-7">
              <span className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3D6BFF] text-white">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12.5l4.5 4.5L19 7" /></svg>
                </span>
                <span className="nh-mono text-[12px] text-[#7D869C]">Check {String(i + 1).padStart(2, "0")}</span>
              </span>
              <h3 className="nh-display text-[26px] leading-[1.1] tracking-[-0.03em]">{p.t}</h3>
              <p className="text-[16px] leading-[1.6] text-[#A0A9C0]">{p.d}</p>
            </div>
          ))}
        </div>
      </section>
        </>
      )}

      {/* WHY THE PAGES ABOVE YOU ARE BEATABLE */}
      <section className={`${SECTION} grid gap-12 lg:grid-cols-12`}>
        <h2 className="nh-display text-[clamp(38px,4.4vw,60px)] leading-[1.02] lg:col-span-5">
          The {v.plural} above you are beatable.
        </h2>
        <div className="flex flex-col gap-6 lg:col-span-6 lg:col-start-7">
          <ul className="flex flex-col border-t border-white/12">
            {v.failings.map((f) => (
              <li key={f} className="flex gap-4 border-b border-white/12 py-5 text-[17px] leading-[1.55] text-[#C9D0E2]">
                <span className="mt-[0.1em] text-[20px] leading-none text-[#FF6B5C]" aria-hidden>✕</span>
                {f}
              </li>
            ))}
          </ul>
          <p className="text-[18px] leading-[1.6]">None of that is a marketing problem. It&apos;s a page problem, and a page is a thing you can replace this afternoon.</p>
        </div>
      </section>

      {/* PRICE */}
      <section className={`${SECTION} grid items-center gap-12 bg-[#0A0F1E] lg:grid-cols-12`}>
        <div className="flex flex-col gap-6 lg:col-span-6">
          <h2 className="nh-display text-[clamp(38px,4.4vw,60px)] leading-[1.02]">One page. One search. Once.</h2>
          <p className="max-w-[520px] text-[18px] leading-[1.6] text-[#C9D0E2]">No retainer, no dashboard, no contract. See the whole page before you pay a cent.</p>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <PriceCard v={v} />
        </div>
      </section>

      <Faq v={v} />

      {/* CLOSE */}
      <section className={`${SECTION} border-t border-white/12 text-center`}>
        <h2 className="nh-display mx-auto max-w-[900px] text-[clamp(44px,6vw,92px)] leading-[0.95]">Someone&apos;s asking who to call. Make the answer you.</h2>
        <div className="mt-10 flex justify-center">
          <Cta v={v} center />
        </div>
      </section>
      <TradeLegal />
    </main>
  );
}
