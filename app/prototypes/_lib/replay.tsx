/* eslint-disable @next/next/no-img-element -- mockups of a generated page; fixed-size decorative images. */
import Link from "next/link";
import { BuilderDemo } from "@/components/home/BuilderDemo";
import { PersonalizeProvider } from "@/components/home/Personalize";
import { VERTICALS, type Vertical } from "@/lib/verticals";
import images from "./replay-images.json";
import { BeforeAfter } from "./replay-client";
import { aOr, PAD, REPLAY, tradeWord } from "./trade-shared";

/* Three prototypes for the trade page's app section ("Here's a roofing page,
   built"), each with real images generated through api.esy.com from
   replay-images.json. A keeps the replay; B shows the change; C shows the
   payoff, the answer that now names you. */

export const REPLAY_STYLES = [
  { key: "a", name: "Replay, with photos", note: "Today's builder replay, building a page with a real hero and real service photos." },
  { key: "b", name: "Before and after", note: "Drag between the roofer's photo-gallery site and the page that wins. Score 18 to 90." },
  { key: "c", name: "The payoff", note: "The finished page scrolling on a phone, and the AI answer that now names you." },
] as const;
export type ReplayKey = (typeof REPLAY_STYLES)[number]["key"];

type TradeImages = { hero: string; services: { key: string; prompt: string }[] };
const imgs = (slug: string) => {
  const t = (images.trades as Record<string, TradeImages>)[slug];
  const base = `/prototypes/replay/${slug}`;
  return { hero: `${base}/hero.webp`, services: t.services.map((s) => `${base}/${s.key}.webp`) };
};

/** The replay settings for a trade, with photos attached. */
function tradeWithPhotos(v: Vertical) {
  const r = REPLAY[v.slug];
  const i = imgs(v.slug);
  return {
    ...r,
    demo: { ...r.demo, hero: i.hero, services: r.demo.services.map((s, n) => ({ ...s, img: i.services[n] })) },
  };
}

const PHONE = "(720) 555-0147";

/** The page SEOPage builds, drawn at 720px. Mirrors the replay's generated page. */
export function BuiltPage({ v }: { v: Vertical }) {
  const t = tradeWithPhotos(v);
  const { demoName: name, demoService: svc, demoCity: city } = t.defaults;
  return (
    <div className="w-[720px] bg-white text-[#0a0c11]" style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}>
      <div className="flex items-center justify-between bg-[#0e1631] px-6 py-3 text-white">
        <b className="text-[14px]">{name}</b>
        <span className="flex items-center gap-4 text-[11.5px] text-white/75">
          <span>Services</span><span>Areas</span><span>FAQ</span>
          <span className="rounded-md bg-[#3d6bff] px-2.5 py-1.5 font-semibold text-white">{PHONE}</span>
        </span>
      </div>
      <div className="relative h-[300px]">
        <img src={t.demo.hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(14,22,49,.94) 0%, rgba(14,22,49,.7) 45%, rgba(14,22,49,.05) 85%)" }} />
        <div className="absolute left-7 top-10 flex w-[340px] flex-col gap-2.5 text-white">
          <span className="text-[9.5px] uppercase tracking-[.16em] text-[#9fb4ff]">{city} · {t.demo.credential}</span>
          <span className="text-[28px] font-extrabold leading-[1.04] tracking-[-0.02em]">{svc} in {city}, done right the first time.</span>
          <span className="text-[12.5px] leading-[1.5] text-white/80">A written price before any work starts. Same-day, evenings and weekends.</span>
          <span className="mt-1 flex gap-2 text-[12px]"><span className="rounded-lg bg-[#3d6bff] px-3 py-2 font-semibold">Call now</span><span className="rounded-lg border border-white/35 px-3 py-2">Get a quote</span></span>
        </div>
      </div>
      <div className="flex justify-around border-b border-[#e6e8ec] bg-[#f3f5fb] px-5 py-3 text-[11.5px] font-semibold text-[#1d2a55]">
        <span>✓ Licensed &amp; insured</span><span>✓ Written pricing</span><span>✓ Same-day response</span><span>✓ Local since 2014</span>
      </div>
      <div className="px-6 pb-2 pt-5 text-[18px] font-extrabold">What we fix in {city}</div>
      <div className="grid grid-cols-3 gap-3 px-6 pb-5">
        {t.demo.services.map((s) => (
          <div key={s.h} className="overflow-hidden rounded-[10px] border border-[#e6e8ec]">
            <img src={s.img} alt="" className="block h-24 w-full object-cover" />
            <div className="px-3 py-2.5"><b className="block text-[12.5px]">{s.h}</b><span className="text-[11px] text-[#646b78]">{s.d}</span></div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 border-t border-[#eef0f3] bg-[#f9fafc] px-6 pb-6 pt-4 text-[12px]">
        <span className="text-[16px] font-extrabold">{svc} in {city}: common questions</span>
        {v.faqs.slice(0, 3).map((f) => (
          <span key={f.q} className="rounded-lg border border-[#e6e8ec] bg-white px-3 py-2.5">
            <b>{f.q}</b>
            <br />
            <span className="line-clamp-2 text-[#4b515c]">{f.a}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/** The site most trades have today: photos, a phone-number graphic, almost no text. */
export function GalleryPage({ v }: { v: Vertical }) {
  const t = tradeWithPhotos(v);
  const pics = [t.demo.hero, ...t.demo.services.map((s) => s.img!)];
  return (
    <div className="w-[720px] bg-[#f4f1ea] text-[#2b2b2b]" style={{ fontFamily: "Georgia, serif" }}>
      <div className="flex items-center justify-between px-6 py-4">
        <span className="text-[18px] italic">{t.defaults.demoName}</span>
        <span className="rounded bg-[#8a2d1f] px-3 py-1.5 text-[12px] text-white">CALL US TODAY!</span>
      </div>
      <div className="relative h-[300px]">
        <img src={pics[0]} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <span className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded bg-black/55 px-5 py-2 text-[26px] italic text-white">Quality you can trust</span>
      </div>
      <p className="px-6 pt-5 text-center text-[13px] italic">Family owned. Serving the area for over 20 years.</p>
      <div className="grid grid-cols-3 gap-2 p-6">
        {[...pics.slice(1), pics[0], pics[2], pics[1]].map((p, i) => (
          <img key={i} src={p} alt="" className="h-28 w-full object-cover" />
        ))}
      </div>
      <p className="pb-8 text-center text-[12px] text-[#777]">© Our Company · Home · Gallery · Contact</p>
    </div>
  );
}

function SectionHead({ title, body }: { title: React.ReactNode; body: string }) {
  return (
    <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
      <h2 className="nh-display max-w-[760px] text-[clamp(40px,5vw,72px)] leading-none">{title}</h2>
      <p className="max-w-[460px] text-[18px] leading-[1.6] text-[#C9D0E2]">{body}</p>
    </div>
  );
}

/* ---------- A · REPLAY, WITH PHOTOS ---------- */
function ReplayA({ v }: { v: Vertical }) {
  const t = tradeWithPhotos(v);
  const w = tradeWord(v);
  return (
    <>
      <SectionHead
        title={<>Here&apos;s {aOr(w)} {w} page, built.</>}
        body={`The real builder, replayed for ${t.defaults.demoName} in ${t.defaults.demoCity}: live research, the page written and designed, ten checks scored before you pay.`}
      />
      <PersonalizeProvider defaults={t.defaults}>
        <BuilderDemo trade={t.demo} />
      </PersonalizeProvider>
    </>
  );
}

/* ---------- B · BEFORE AND AFTER ---------- */
function ReplayB({ v }: { v: Vertical }) {
  const t = tradeWithPhotos(v);
  return (
    <>
      <SectionHead
        title="Your page now, and the page that wins."
        body={`Drag across. On the left, the site most ${v.plural} have: photos, a phone number, nothing an assistant can quote. On the right, the page SEOPage builds for ${t.defaults.demoName}.`}
      />
      <BeforeAfter before={<GalleryPage v={v} />} after={<BuiltPage v={v} />} failings={v.failings} proof={v.proof.map((p) => p.t)} />
    </>
  );
}

/* ---------- C · THE PAYOFF ---------- */
function ReplayC({ v }: { v: Vertical }) {
  const t = tradeWithPhotos(v);
  const host = `${t.defaults.demoName.toLowerCase().replace(/[^a-z0-9]+/g, "")}.seo.page`;
  return (
    <>
      <SectionHead
        title="Then the answer names you."
        body={`${t.defaults.demoName}'s page, built in one evening. A week later, the same question gets a different answer.`}
      />
      <div className="grid items-center gap-14 lg:grid-cols-12">
        <div className="flex justify-center lg:col-span-5">
          <div className="relative h-[620px] w-[310px] overflow-hidden rounded-[46px] border-[10px] border-[#1A2340] bg-white shadow-[0_60px_120px_-40px_rgba(61,107,255,.45)]">
            <div className="absolute left-1/2 top-2 z-10 h-6 w-28 -translate-x-1/2 rounded-full bg-[#1A2340]" />
            <div className="origin-top-left" style={{ width: 720, transform: "scale(0.403)" }}>
              <div className="rk-phone-scroll">
                <BuiltPage v={v} />
                <BuiltPage v={v} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 lg:col-span-7">
          <div className="flex flex-col gap-4 rounded-[24px] border border-[#3D6BFF]/40 bg-[#0A0F1E] p-7 shadow-[0_50px_100px_-50px_rgba(61,107,255,.5)]">
            <div className="ml-auto max-w-[85%] rounded-[18px] rounded-br-[6px] bg-[#1A2340] px-5 py-3 text-[16px]">
              Who&apos;s best for {v.searches[0].replace(/ near me$/, "").replace(" in [city]", "")} in {t.defaults.demoCity}?
            </div>
            <p className="text-[19px] leading-[1.6]">
              The one most people recommend is{" "}
              <span className="whitespace-nowrap">
                <b className="font-semibold text-[#9DB4FF]">{t.defaults.demoName}</b>
                <sup className="ml-1 rounded-[5px] bg-[#3D6BFF] px-1.5 py-0.5 text-[11px] font-semibold text-white">1</sup>
              </span>
              . Their page states what you&apos;d want to know before calling: licensed and insured, same-day response, and a written price before any work starts.
            </p>
            <p className="nh-mono flex items-center gap-2 border-t border-white/10 pt-4 text-[12px] text-[#9DB4FF]">
              <span className="rounded-[5px] bg-[#3D6BFF] px-1.5 py-0.5 text-white">1</span>
              {host}
            </p>
          </div>
          <p className="text-[14px] text-[#7D869C]">Illustrative. {t.defaults.demoName} is an example business; no one can guarantee a placement in an AI answer.</p>
        </div>
      </div>
    </>
  );
}

const VIEWS = { a: ReplayA, b: ReplayB, c: ReplayC };

export function ReplayProto({ style, v }: { style: ReplayKey; v: Vertical }) {
  const View = VIEWS[style];
  return (
    <section className={`${PAD} flex flex-col gap-12 bg-[#0A0F1E] py-24 lg:py-[120px]`}>
      <View v={v} />
    </section>
  );
}

export function ReplaySwitcher({ style, slug }: { style: ReplayKey; slug: string }) {
  const pill = (on: boolean) => `whitespace-nowrap rounded-full px-3.5 py-1.5 font-medium ${on ? "bg-[#3D6BFF] text-white" : "text-[#C9D0E2] hover:bg-white/10"}`;
  return (
    <nav className="fixed bottom-4 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/15 bg-[#0A0F1E]/90 p-1 text-[13px] shadow-2xl backdrop-blur">
      <Link href="/prototypes/replay" className="hidden px-3 text-[#7D869C] hover:text-white sm:inline">App section</Link>
      {REPLAY_STYLES.map((s) => (
        <Link key={s.key} href={`/prototypes/replay/${s.key}/${slug}`} className={pill(s.key === style)}>
          {s.key.toUpperCase()}<span className="hidden sm:inline"> · {s.name}</span>
        </Link>
      ))}
      <span className="mx-1 h-5 w-px bg-white/15" />
      {VERTICALS.map((v) => (
        <Link key={v.slug} href={`/prototypes/replay/${style}/${v.slug}`} className={pill(v.slug === slug)}>/{v.slug}</Link>
      ))}
    </nav>
  );
}
