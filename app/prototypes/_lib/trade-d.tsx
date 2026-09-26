import { AlarmTranscript, HeroForm } from "@/components/home/HeroAnswer";
import { BuilderDemo, type DemoTrade } from "@/components/home/BuilderDemo";
import { PersonalizeProvider, type PersonalDefaults } from "@/components/home/Personalize";
import { Logo } from "@/components/Logo";
import { CREATE_URL, PRICE_AFTER_LAUNCH_LABEL, PRICE_LABEL } from "@/lib/config";
import type { Vertical } from "@/lib/verticals";
import { aOr, Faq, PriceCard, Query, REPLAY } from "./trade-shared";

/* D · HOMEPAGE EDITION
   The homepage's story and layout with a different profession. The
   structure, the replay, and the proof are shared; the words are the
   trade's own, from lib/verticals.ts, so the page competes for "roofing SEO"
   rather than duplicating the homepage. Where Nora's clips play, a labeled
   frame describes the scene to make: each one is a line of the image brief. */

type Scene = "proud" | "surprised" | "waiting" | "typing" | "call";
type Edition = {
  name: string;
  role: string;
  caption: [string, string];
  defaults: PersonalDefaults;
  demo: DemoTrade;
  scenes: Record<Scene, string>;
};

/** Per-trade extras. Would move into lib/verticals.ts if D is chosen. Names are proposals. */
const EDITIONS: Record<string, Edition> = {
  roofers: {
    name: "Marco",
    role: "roofer",
    caption: ["Roofer, fifteen years in.", "Great at the work. Invisible to AI."],
    ...REPLAY.roofers,
    scenes: {
      proud: "On a pitched roof at golden hour, nail gun on the shoulder, the crew truck parked below.",
      surprised: "Halfway up a ladder, reading a phone in disbelief.",
      waiting: "In the truck cab, rain on the windshield, a silent phone on the dash.",
      typing: "At the kitchen table at night, laptop open beside a stack of shingle samples.",
      call: "Beside the truck, phone to ear, smiling, writing a new job on a clipboard.",
    },
  },
  hvac: {
    name: "Dee",
    role: "HVAC tech",
    caption: ["HVAC tech, ten years in.", "Great at the work. Invisible to AI."],
    ...REPLAY.hvac,
    scenes: {
      proud: "Beside a rooftop condenser, pressure gauges in hand, the city behind.",
      surprised: "In an attic by flashlight, reading a phone in disbelief.",
      waiting: "In the service van, heat shimmer outside, a silent phone on the seat.",
      typing: "At a desk in the van at dusk, laptop open, a clipboard of work orders.",
      call: "Phone to ear, smiling, writing a new job on a tablet.",
    },
  },
};

const PAD = "px-6 sm:px-10 lg:px-24";
const SECTION = `${PAD} py-24 lg:py-[136px]`;
const H2 = "nh-display text-[clamp(40px,5vw,72px)] leading-[1]";
const FADE = "lg:[background:linear-gradient(90deg,#04060B_0%,rgba(4,6,11,.86)_30%,rgba(4,6,11,.2)_62%,rgba(4,6,11,0)_100%)]";
const SCENE_NO: Record<Scene, number> = { proud: 1, surprised: 2, waiting: 3, typing: 4, call: 5 };

/** Stands in for a clip. Says which scene goes here and what it shows. */
function Frame({ e, scene, className = "" }: { e: Edition; scene: Scene; className?: string }) {
  return (
    <div className={`bg-[#0E1631] [background-image:linear-gradient(rgba(61,107,255,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(61,107,255,.1)_1px,transparent_1px)] [background-size:32px_32px] ${className}`}>
      <div className="flex h-full w-full items-center justify-center p-8">
        <div className="max-w-[380px] rounded-[16px] border border-dashed border-[#3D6BFF]/60 bg-[#04060B]/70 p-5 backdrop-blur">
          <p className="nh-mono text-[11px] uppercase tracking-[0.16em] text-[#9DB4FF]">
            {e.name}, {e.role} · scene {SCENE_NO[scene]}/5 · {scene}
          </p>
          <p className="mt-2 text-[15px] leading-[1.5] text-[#EEF2FF]">{e.scenes[scene]}</p>
          <p className="mt-2 text-[12.5px] text-[#7D869C]">Clay-animated, Nora&apos;s style. Labeled as an illustration.</p>
        </div>
      </div>
    </div>
  );
}

function Stat({ n, text, href, source }: { n: string; text: string; href: string; source: string }) {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="nh-display text-[clamp(52px,5vw,72px)] font-medium leading-none tabular-nums text-[#FF6B5C]">{n}</span>
      <span className="text-[16px] leading-[1.5] text-[#C9D0E2]">{text}</span>
      <a href={href} target="_blank" rel="noopener noreferrer" className="text-[13px] text-[#7D869C] underline-offset-2 hover:underline">{source}</a>
    </div>
  );
}

export function TradeD({ v }: { v: Vertical }) {
  const e = EDITIONS[v.slug] ?? EDITIONS.roofers;
  const keyword = v.primaryKeyword.charAt(0).toUpperCase() + v.primaryKeyword.slice(1);
  return (
    <PersonalizeProvider defaults={e.defaults}>
      {/* HERO */}
      <section className="relative overflow-hidden lg:h-[940px]">
        <Frame e={e} scene="proud" className="absolute right-0 top-0 h-full w-full lg:w-[72%]" />
        <div className={`absolute inset-0 bg-[#04060B]/70 lg:bg-transparent ${FADE}`} />
        <div className={`relative flex h-full flex-col ${PAD} pb-16 pt-7`}>
          <header className="flex h-[52px] items-center justify-between">
            <Logo tone="dark" className="text-[26px]" />
            <a href={CREATE_URL} className="flex h-11 items-center rounded-full border border-white/30 bg-[#04060B]/35 px-5 font-medium backdrop-blur hover:border-white/60">Build my page</a>
          </header>
          <div className="mt-24 flex w-full max-w-[640px] flex-col gap-6 lg:mt-auto">
            <h1 className="nh-display text-[clamp(48px,6.2vw,88px)] leading-[0.95]">{keyword} that gets you named by AI.</h1>
            <p className="max-w-[540px] text-[clamp(17px,1.5vw,20px)] leading-[1.55] text-[#C9D0E2]">
              {v.headline.lead} Your page, built from live search data for your city and scored on ten checks before you pay.
            </p>
            <HeroForm />
          </div>
        </div>
        <p className="absolute bottom-16 right-24 hidden text-right text-[14px] text-[#C9D0E2] lg:block">
          <b className="text-[#EEF2FF]">Meet {e.name}.</b> {e.caption[0]}
          <br />
          {e.caption[1]}
        </p>
      </section>

      {/* ALARM */}
      <section className={`${SECTION} flex flex-col gap-14 border-t border-[#FF5A4A]/20`}>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-6 lg:col-span-6">
            <p className="text-[clamp(18px,1.6vw,22px)] font-medium text-[#FF8A7D]">Right now, someone near you is asking ChatGPT which {e.role} to call.</p>
            <h2 className="nh-display text-[clamp(44px,5.6vw,80px)] leading-[0.97]">It&apos;s giving them your competitor&apos;s name.</h2>
            <AlarmTranscript />
          </div>
          <figure className="flex flex-col gap-3 lg:col-span-6">
            <Frame e={e} scene="surprised" className="aspect-[16/10] overflow-hidden rounded-3xl border border-white/12" />
            <figcaption className="text-[14px] text-[#A0A9C0]">{e.name} asked it too. It named the company across town.</figcaption>
          </figure>
        </div>
        <div className="grid gap-10 border-t border-white/12 pt-8 md:grid-cols-3 md:gap-0 md:[&>*+*]:border-l md:[&>*+*]:border-white/12 md:[&>*]:px-10 md:[&>*:first-child]:pl-0">
          <Stat n="45%" text="of US consumers now use AI to find a local business. A year earlier it was 6%." href="https://www.brightlocal.com/research/lcrs-ai-trust/" source="BrightLocal, 2026" />
          <Stat n="8 in 100" text="click a result when Google answers first with an AI summary. Without one, 15 do." href="https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/" source="Pew Research, 2025" />
          <Stat n="−58%" text="fewer clicks for the #1 Google result when an AI Overview sits above it." href="https://ahrefs.com/blog/ai-overviews-reduce-clicks-update/" source="Ahrefs, 2026" />
        </div>
      </section>

      {/* WAITING BAND: the trade's own loss line */}
      <section className="relative h-[520px] overflow-hidden lg:h-[720px]">
        <Frame e={e} scene="waiting" className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#04060B]/95 via-[#04060B]/20 to-transparent" />
        <p className={`nh-display absolute bottom-16 left-0 max-w-[1160px] ${PAD} text-[clamp(36px,4.8vw,68px)] leading-none`}>{v.headline.loss}</p>
      </section>

      {/* THE SEARCHES: where the homepage has general copy, the trade's own */}
      <section className={SECTION} style={{ background: "radial-gradient(55% 60% at 80% 10%, rgba(61,107,255,.16), transparent 70%)" }}>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <h2 className={`${H2} max-w-[760px]`}>The searches that pay {v.plural}.</h2>
          <p className="max-w-[440px] text-[18px] leading-[1.6] text-[#C9D0E2]">Typed in your market today. Every one has an answer. The only question is whose page it quotes.</p>
        </div>
        <ul className="mt-14 border-t border-white/12">
          {v.searches.map((s) => (
            <li key={s} className="grid items-baseline gap-2 border-b border-white/12 py-6 md:grid-cols-[1fr_260px]">
              <span className="nh-display text-[clamp(24px,2.6vw,38px)] leading-[1.1] tracking-[-0.035em]"><Query q={s} /></span>
              <span className="text-[15px] text-[#FF8A7D] md:text-right">Answer names: someone else</span>
            </li>
          ))}
        </ul>
      </section>

      {/* DEMO */}
      <section className={`${SECTION} flex flex-col gap-14 bg-[#0A0F1E]`}>
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <Frame e={e} scene="typing" className="aspect-[16/10] overflow-hidden rounded-[22px] border border-white/12 lg:col-span-5" />
          <div className="flex flex-col gap-4 lg:col-span-7">
            <h2 className={H2}>So {e.name} built the page AI could quote.</h2>
            <p className="text-[clamp(17px,1.5vw,20px)] leading-[1.6] text-[#C9D0E2]">
              One evening, four details. SEOPage researched the market, wrote and designed the page, and scored it before paying. This is the real builder, replayed. Type your own business above and it replays with yours.
            </p>
          </div>
        </div>
        <BuilderDemo trade={e.demo} />
        <p className="text-[14px] text-[#7D869C]">The builder&apos;s screens, replayed. Search volumes are illustrative; yours come from live data.</p>
      </section>

      {/* WHAT THE PAGE MUST PROVE */}
      <section className={SECTION}>
        <h2 className={`${H2} max-w-[900px]`}>What {aOr(v.primaryKeyword)} {v.primaryKeyword} page has to say out loud.</h2>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {v.proof.map((p, i) => (
            <div key={p.t} className="flex flex-col gap-4 rounded-[22px] border border-white/12 bg-[#0A0F1E] p-7">
              <span className="nh-mono text-[12px] text-[#9DB4FF]">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="nh-display text-[26px] leading-[1.1] tracking-[-0.03em]">{p.t}</h3>
              <p className="text-[16px] leading-[1.6] text-[#A0A9C0]">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROOF: our own sites, shared with the homepage */}
      <section className={`${SECTION} flex flex-col gap-12 bg-[#0A0F1E]`}>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end lg:gap-14">
          <h2 className={`${H2} max-w-[780px]`}>We ran it on our own products first.</h2>
          <p className="max-w-[460px] text-[18px] leading-[1.6] text-[#C9D0E2]">esy.com and clip.art are built with the same workflow. Here is what Ahrefs showed, unedited. Not {e.role} results; yours will differ.</p>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          {[
            ["/proof/esy-ai-citations.png", "Ahrefs overview for esy.com: 37 ChatGPT citations across 20 pages.", "esy.com, cited 37 times by ChatGPT"],
            ["/proof/clipart-ai-responses-sep-2026.png", "Ahrefs overview for clip.art: 102 AI responses across 35 pages.", "clip.art, named in 102 AI answers"],
          ].map(([src, alt, h]) => (
            <figure key={src} className="flex flex-col gap-[18px]">
              <div className="overflow-hidden rounded-[18px] border border-white/15 bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={alt} className="block w-full" loading="lazy" />
              </div>
              <figcaption className="nh-display text-[28px] leading-tight tracking-[-0.03em]">{h}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* WHY THE PAGES ABOVE YOU ARE BEATABLE */}
      <section className={`${SECTION} grid gap-12 lg:grid-cols-12`}>
        <h2 className="nh-display text-[clamp(38px,4.4vw,60px)] leading-[1.02] lg:col-span-5">The {v.plural} above you are beatable.</h2>
        <ul className="flex flex-col border-t border-white/12 lg:col-span-6 lg:col-start-7">
          {v.failings.map((f) => (
            <li key={f} className="flex gap-4 border-b border-white/12 py-5 text-[17px] leading-[1.55] text-[#C9D0E2]">
              <span className="text-[20px] leading-none text-[#FF6B5C]" aria-hidden>✕</span>
              {f}
            </li>
          ))}
        </ul>
      </section>

      {/* PRICE */}
      <section className={`${SECTION} grid items-center gap-12 bg-[#0A0F1E] lg:grid-cols-12`}>
        <h2 className="nh-display text-[clamp(38px,4.4vw,60px)] leading-[1.02] lg:col-span-6">One page. One price. Once.</h2>
        <div className="lg:col-span-5 lg:col-start-8"><PriceCard v={v} /></div>
      </section>

      <Faq v={v} />

      {/* CLOSE */}
      <section className="relative flex min-h-[860px] flex-col overflow-hidden">
        <Frame e={e} scene="call" className="absolute right-0 top-0 h-full w-full lg:w-[64%]" />
        <div className={`absolute inset-0 bg-[#04060B]/75 lg:bg-transparent ${FADE}`} />
        <div className={`relative flex min-h-[860px] flex-1 flex-col ${PAD} pb-11 pt-32 lg:pt-[150px]`}>
          <p className="max-w-[520px] text-[20px] text-[#C9D0E2]">The goal isn&apos;t a ranking report. It&apos;s a call that starts with &ldquo;I found you on ChatGPT.&rdquo;</p>
          <h2 className="nh-display mt-5 max-w-[720px] text-[clamp(48px,6.4vw,92px)] leading-[0.95]">Someone&apos;s asking AI which {e.role} to call. Make the answer you.</h2>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <a href={CREATE_URL} className="flex h-[60px] items-center rounded-full bg-[#3D6BFF] px-8 text-[17px] font-semibold text-white hover:bg-[#5A82FF]">Build my page free</a>
            <span className="text-[14.5px] text-[#C9D0E2]">Free preview · {PRICE_LABEL} launch price · {PRICE_AFTER_LAUNCH_LABEL} after launch</span>
          </div>
          <p className="mt-auto border-t border-white/15 pt-6 text-[13px] text-[#7D869C]">{e.name} is an illustration, not a customer. Payments by Stripe.</p>
        </div>
      </section>
    </PersonalizeProvider>
  );
}
