/* eslint-disable @next/next/no-img-element -- app screenshots, cropped by CSS so one picture serves several frames */
import type { ReactNode } from "react";
import Link from "next/link";
import { CARD, H2, BODY, PAD, SECTION, type HeroShot } from "./home";
import { Crop, Shot, type Rect } from "./crop";
import { ShowcaseTabs } from "./showcase-client";

/* ================================================================
   App showcase (proto, 2026-10-30): the homepage shows the app itself,
   analytics first, to owners of HVAC, plumbing and roofing companies.
   One question: which views of the app sell the monthly plan, and how
   should the page show them?
     S1 · Tour        one row per view, a close crop beside a short pitch
     S2 · Tabs        one navy stage; tabs switch a full app window
     S3 · Your trade  pick HVAC, plumbing or roofing; the hero and four
                      owner questions show that trade's app
   Every take swaps the hero's builder for the app's Overview (clicks,
   calls, where you show up). Pictures are the create.seopage.com
   prototype (F4 frame, R1 rail) captured by scripts/app-shots.mjs, with
   a sample business per trade; every business and number is a sample.
   ================================================================ */

/* The three takes, for the route's picker and the prototype index */
export const SHOWCASE_TAKES = [
  { key: "s1", name: "S1 · Tour", note: "One row per view: a close crop beside a short pitch, with an example for each trade" },
  { key: "s2", name: "S2 · Tabs", note: "One navy stage: the views as tabs over a full app window" },
  { key: "s3", name: "S3 · Your trade", note: "Pick HVAC, plumbing or roofing; the hero and four owner questions show that trade's app" },
  // Round 2 (2026-10-31): S1's one-section-per-question order, S3's questions and trade switch, a whole page
  { key: "s4", name: "S4 · Story", note: "S1's order with S3's questions and trade switch: the whole homepage as one argument, new app pictures only" },
];

export type Trade = "hvac" | "plumbing" | "roofing";
export const TRADES: { key: Trade; name: string; business: string }[] = [
  { key: "hvac", name: "HVAC", business: "Northside Heating & Air" },
  { key: "plumbing", name: "Plumbing", business: "Northside Plumbing" },
  { key: "roofing", name: "Roofing", business: "Northside Roofing" },
];
export const tradeOf = (k?: string) => TRADES.find((t) => t.key === k) ?? TRADES[0];

export type View = "overview" | "site-coverage" | "opportunities" | "site-identity" | "site-performance" | "site-map" | "builder";
export const shotSrc = (trade: Trade, view: View) => `/app/${trade}/${view}.webp`;

/* What each view proves to an owner. Examples are per trade, so the copy matches the picture. */
export type Feature = {
  key: string;
  view: View;
  tab: string;
  kicker: string;
  h: string;
  ask: string; // the owner's question (S3)
  short: string; // the one-line answer under it (S3)
  body: string;
  crop: Rect; // wide crop (S1, S3 wide cards)
  tight?: Rect; // narrow crop (S3 narrow cards)
  phone: Rect; // what fits a phone screen and stays readable
  example: Record<Trade, string>;
};
export const FEATURES: Feature[] = [
  {
    key: "calls", view: "overview", tab: "Calls", kicker: "Overview",
    h: "Know what search brings in.",
    ask: "Is search sending me calls?",
    short: "Clicks, calls and where you show up, from your Search Console and GA4.",
    body: "Clicks from Google, how often you showed up, where you sit on average, and the calls search sent you. Synced from your Search Console and GA4, in plain words.",
    crop: { x: 270, y: 280, w: 1150, h: 452 },
    phone: { x: 286, y: 283, w: 560, h: 445 },
    example: { hvac: "11 calls from search in 28 days, 4 from the furnace repair page", plumbing: "11 calls from search in 28 days, 4 from the drain cleaning page", roofing: "11 calls from search in 28 days, 4 from the roof repair page" },
  },
  {
    key: "coverage", view: "site-coverage", tab: "Coverage", kicker: "Coverage",
    h: "Every service, in every town you cover.",
    ask: "Do I show up in every town I cover?",
    short: "Every service against every town, with about how many search each a month.",
    body: "Each square is a search people make, with about how many make it a month. The empty ones have no page of yours to land on, and the plan fills them a few at a time.",
    crop: { x: 270, y: 398, w: 1150, h: 445 },
    tight: { x: 286, y: 398, w: 690, h: 445 },
    phone: { x: 286, y: 398, w: 560, h: 445 },
    example: { hvac: "“heat pump installation Aurora”: no page yet", plumbing: "“tankless water heater Aurora”: no page yet", roofing: "“gutter installation Aurora”: no page yet" },
  },
  {
    key: "next", view: "opportunities", tab: "What's next", kicker: "Opportunities",
    h: "The searches you almost win, ranked for calls.",
    ask: "What should my next page be?",
    short: "Searches worth a page, ranked by your goal, each with the reason it made the list.",
    body: "We read your Search Console and research your area, then rank what's worth a page by your goal, with the reason for each. Cost searches come from people ready to call.",
    crop: { x: 270, y: 132, w: 1150, h: 445 },
    tight: { x: 286, y: 132, w: 720, h: 445 },
    phone: { x: 286, y: 132, w: 560, h: 445 },
    example: { hvac: "AC tune-ups, worth a page before summer", plumbing: "Frozen pipes, worth a page before the first freeze", roofing: "Hail damage, worth a page before hail season" },
  },
  {
    key: "identity", view: "site-identity", tab: "Identity", kicker: "Identity",
    h: "Does Google know everything you do?",
    ask: "Does Google know everything I do?",
    short: "Your name, phone, towns, services and reviews, checked on every page.",
    body: "Your name, phone, towns, services and reviews, checked across every page. If Google connects you with one service out of four, you'll see it, and next month's pages are picked to close the gap.",
    crop: { x: 270, y: 318, w: 1150, h: 530 },
    phone: { x: 286, y: 318, w: 600, h: 520 },
    example: { hvac: "Google sees a furnace company. You do four services.", plumbing: "Google sees a drain company. You do four services.", roofing: "Google sees a roof repair company. You do four services." },
  },
  {
    key: "pages", view: "site-performance", tab: "Every page", kicker: "Your site",
    h: "Every page, and how it's doing.",
    ask: "Which pages are working?",
    short: "Position, clicks and calls for every page, and the one waiting for your yes.",
    body: "Position, clicks and calls for each page, what's coming next, and the one waiting for your yes. Nothing goes live until you approve it.",
    crop: { x: 270, y: 318, w: 1150, h: 470 },
    phone: { x: 286, y: 318, w: 560, h: 470 },
    example: { hvac: "Heat pump installation page: written, waiting for your yes", plumbing: "Tankless water heater page: written, waiting for your yes", roofing: "Gutter installation page: written, waiting for your yes" },
  },
];

/* The app in a browser window: a quiet title bar with the address, then the screenshot.
   On phones the window shows `phone`, a region small enough to read. */
export function AppWindow({ src, alt, phone, eager = false }: { src: string; alt: string; phone?: Rect; eager?: boolean }) {
  return (
    <div className="bg-[#f3f0e9]">
      <div className="flex h-9 items-center gap-2 border-b border-black/[0.07] bg-[#fffdf9] px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-[#d8d2c6]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#d8d2c6]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#d8d2c6]" />
        <span className="mx-auto rounded-full bg-[#f3f0e9] px-4 py-1 font-[family-name:var(--o-mono)] text-[11.5px] text-[#5e574b]">create.seopage.com</span>
        <span className="w-[42px]" />
      </div>
      <img src={src} alt={alt} width={2880} height={1800} loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : undefined} className={`h-auto w-full ${phone ? "hidden sm:block" : "block"}`} />
      {phone && <Crop src={src} rect={phone} alt={alt} eager={eager} fadeRight className="sm:hidden" />}
    </div>
  );
}

/* The hero's new picture: the app's Overview for the trade, and the line under the form.
   On phones: the "Ready for you" card, the first two numbers and the top of the chart. */
const HERO_PHONE: Rect = { x: 280, y: 160, w: 440, h: 430 };
export function heroShot(trade: Trade): HeroShot {
  const t = tradeOf(trade);
  return {
    shot: <AppWindow eager phone={HERO_PHONE} src={shotSrc(trade, "overview")} alt={`The SEOPage app's Overview for ${t.business}: clicks from Google, times shown, average position and calls from search, with a page waiting for approval.`} />,
    caption: <>The app: clicks, calls and where you show up, every page you have and the next one to build. {t.business} is a sample.</>,
  };
}

/* The heading every take opens with */
function Intro({ dark = false, center = false, children }: { dark?: boolean; center?: boolean; children?: ReactNode }) {
  return (
    <div className={`flex max-w-[820px] flex-col gap-5 ${center ? "mx-auto items-center text-center" : ""}`}>
      <span className={`text-[14px] font-semibold uppercase tracking-[0.12em] ${dark ? "text-[#9db4ff]" : "text-[var(--o-link)]"}`}>Inside SEOPage</span>
      <h2 className={H2}>See what search is doing for your business.</h2>
      <p className={`${BODY} ${dark ? "!text-[#cdd6e2]" : ""}`}>Made for the trades that live on the phone: HVAC, plumbing, roofing and the rest.</p>
      {children}
    </div>
  );
}

/* A crop in a card, labelled with the view it came from */
function Pane({ trade, f, rect, className = "" }: { trade: Trade; f: Feature; rect: Rect; className?: string }) {
  return (
    <figure className={`${CARD} overflow-hidden shadow-[0_24px_60px_-28px_rgba(10,37,64,.45)] ${className}`}>
      <figcaption className="flex h-10 items-center justify-between border-b border-[var(--o-edge)] px-4 text-[13px] text-[var(--o-muted)]">
        <span className="font-medium text-[var(--o-text2)]">{f.kicker}</span>
        <span className="font-[family-name:var(--o-mono)] text-[12px]">{tradeOf(trade).business}</span>
      </figcaption>
      <Shot src={shotSrc(trade, f.view)} rect={rect} phone={f.phone} alt={`${f.kicker} in the SEOPage app, for ${tradeOf(trade).business} (sample).`} />
    </figure>
  );
}

/* ---------- S1 · Tour: one row per view, picture and pitch alternating sides ---------- */
export function ShowcaseTour() {
  return (
    <section className={`${SECTION} border-t border-[var(--o-edge)]`}>
      <Intro />
      <div className="mt-16 flex flex-col gap-20 lg:mt-24 lg:gap-28">
        {FEATURES.map((f, i) => (
          <div key={f.key} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
            <div className={`flex flex-col gap-4 lg:col-span-4 ${i % 2 ? "lg:order-2 lg:col-start-9" : ""}`}>
              <span className="font-[family-name:var(--o-mono)] text-[13px] text-[var(--o-link)]">{String(i + 1).padStart(2, "0")} · {f.kicker}</span>
              <h3 className="font-[family-name:var(--o-head)] text-[clamp(28px,2.6vw,38px)] font-semibold leading-[1.05] tracking-[-0.035em]">{f.h}</h3>
              <p className="text-[16.5px] leading-[1.6] text-[var(--o-text2)]">{f.body}</p>
              <ul className="mt-1 flex flex-col gap-1.5 border-l-2 border-[var(--o-action)] pl-4 text-[14.5px] text-[var(--o-text2)]">
                {TRADES.map((t) => (
                  <li key={t.key}><span className="font-semibold text-[var(--o-text)]">{t.name}</span> · {f.example[t.key]}</li>
                ))}
              </ul>
            </div>
            <Pane trade="hvac" f={f} rect={f.crop} className={`lg:col-span-8 ${i % 2 ? "lg:order-1 lg:col-start-1" : ""}`} />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- S2 · Tabs: a navy stage, the views as tabs over one full app window ---------- */
export function ShowcaseTabsSection() {
  return (
    <section className={`${PAD} py-24 lg:py-[128px]`} style={{ background: "#0a2540", color: "#f4f1ea" }}>
      <Intro dark center />
      <ShowcaseTabs features={FEATURES.map(({ key, view, tab, h, body, example, phone }) => ({ key, tab, h, body, phone, example: example.hvac, src: shotSrc("hvac", view) }))} />
    </section>
  );
}

/* ---------- S3 · Your trade: pick a trade, and four owner questions answer from its app ---------- */
export function ShowcaseTrade({ trade, base }: { trade: Trade; base: string }) {
  const by = (k: string) => FEATURES.find((f) => f.key === k)!;
  // Wide and narrow cards take turns, so each row is one wide crop and one close one
  const cards: { f: Feature; span: string; rect: Rect }[] = [
    { f: by("calls"), span: "lg:col-span-7", rect: by("calls").crop },
    { f: by("next"), span: "lg:col-span-5", rect: by("next").tight! },
    { f: by("coverage"), span: "lg:col-span-5", rect: by("coverage").tight! },
    { f: by("identity"), span: "lg:col-span-7", rect: by("identity").crop },
  ];
  return (
    <section id="your-trade" className={`${SECTION} border-t border-[var(--o-edge)]`} style={{ background: "var(--o-alt)" }}>
      <Intro>
        {/* Links, not state, so the hero above follows the pick too */}
        <nav aria-label="Your trade" className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-[15px] text-[var(--o-muted)]">Show me</span>
          {TRADES.map((t) => (
            <Link key={t.key} href={`${base}?trade=${t.key}#your-trade`} scroll={false} aria-current={t.key === trade ? "true" : undefined} className={`inline-flex h-11 items-center rounded-full px-5 text-[15px] font-semibold ${t.key === trade ? "bg-[var(--o-text)] text-[var(--o-bg)]" : "border border-[var(--o-edge-strong)] text-[var(--o-text)] hover:border-[var(--o-text)]"}`}>{t.name}</Link>
          ))}
        </nav>
      </Intro>
      <div className="mt-14 grid gap-5 lg:grid-cols-12">
        {cards.map(({ f, span, rect }) => (
          <article key={f.key} className={`${CARD} flex flex-col overflow-hidden ${span}`}>
            <div className="flex flex-col gap-2 p-7 pb-6">
              <h3 className="font-[family-name:var(--o-head)] text-[clamp(24px,2vw,30px)] font-semibold leading-[1.1] tracking-[-0.03em]">{f.ask}</h3>
              <p className="text-[15.5px] font-medium text-[var(--o-link)]">{f.example[trade]}</p>
              <p className="text-[15.5px] leading-[1.55] text-[var(--o-text2)]">{f.short}</p>
            </div>
            <div className="mt-auto border-t border-[var(--o-edge)]">
              <Shot src={shotSrc(trade, f.view)} rect={rect} phone={f.phone} fadeRight={rect !== f.crop} alt={`${f.kicker} in the SEOPage app, for ${tradeOf(trade).business} (sample).`} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
