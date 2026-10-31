import type { ReactNode } from "react";
import Link from "next/link";
import { DarkFooter } from "@/components/DarkFooter";
import { PersonalizeProvider } from "@/components/home/Personalize";
import { HOME_FAQS } from "@/lib/homeContent";
import { CARD, Close, COPIES, Faq, GHOST, Hero, OAT_FONTS, Offer, SECTION, TONES, toneStyle } from "./home";
import { Shot, type Rect } from "./crop";
import { FEATURES, heroShot, shotSrc, TRADES, tradeOf, type Feature, type Trade } from "./showcase";

/* ================================================================
   The homepage (live at / since 2026-10-31), picked as S4 · Story in
   /prototypes/app-showcase: the homepage as one argument to the owner of
   an HVAC, plumbing or roofing company, one of their questions per
   section, in the order they'd ask them:
     1 Hero        the promise, and the app with their numbers in it
     2 Calls       "Is search sending you calls?"          (Overview)
     3 Coverage    "Do you show up in every town you cover?" (replaces N1)
     4 Next        "What should your next page be?"        (why it's monthly)
     5 Approval    "Nothing goes live without your yes."   (replaces the builder section)
     6 Identity    "Does Google know everything you do?"   (→ the free audit)
     7 A month     four steps, a strip above the price
     8 Offer · 9 FAQ (the owner's objections, then the ranking content;
       mirrored into FAQPage schema as HOME_FAQS) · 10 Close
   The trade switch sits above section 2; every example and picture follows
   it, and so does the hero (?trade= links, not state). Pictures are the app
   captures in public/app, made by scripts/app-shots.mjs, with a sample
   business per trade. Businesses and numbers are samples; no ranking promises.
   ================================================================ */

const by = (k: string) => FEATURES.find((f) => f.key === k) as Feature;

/* Each trade's cost search and seasonal page, for section 4's two hooks */
const HOOKS: Record<Trade, { cost: string; season: string; when: string }> = {
  hvac: { cost: "ac replacement cost denver", season: "AC tune-ups", when: "before summer" },
  plumbing: { cost: "water heater replacement cost denver", season: "Frozen pipe repair", when: "before the first freeze" },
  roofing: { cost: "roof replacement cost denver", season: "Hail damage repair", when: "before hail season" },
};

/* Section 5's picture: the builder on Versions, three ranked takes on the trade's opening section.
   Wide: the whole builder. Phones: the rail's top two versions, which stay readable. */
const BUILDER: { rect: Rect; phone: Rect } = { rect: { x: 0, y: 0, w: 1440, h: 900 }, phone: { x: 1092, y: 160, w: 342, h: 430 } };
const OPENING: Record<Trade, string> = { hvac: "furnace repair", plumbing: "drain cleaning", roofing: "roof repair" };

/* A crop in a card, labelled with the view it came from */
function Pane({ trade, label, children }: { trade: Trade; label: string; children: ReactNode }) {
  return (
    <figure className={`${CARD} overflow-hidden shadow-[0_28px_70px_-30px_rgba(10,37,64,.5)]`}>
      <figcaption className="flex h-10 items-center justify-between border-b border-[var(--o-edge)] bg-[var(--o-panel)] px-4 text-[13px] text-[var(--o-muted)]">
        <span className="font-medium text-[var(--o-text2)]">{label}</span>
        <span className="font-[family-name:var(--o-mono)] text-[12px]">{tradeOf(trade).business}</span>
      </figcaption>
      {children}
    </figure>
  );
}

/* One feature's picture, wide from a tablet up and its readable region on phones */
function FeatureShot({ trade, f }: { trade: Trade; f: Feature }) {
  return (
    <Pane trade={trade} label={f.kicker}>
      <Shot src={shotSrc(trade, f.view)} rect={f.crop} phone={f.phone} alt={`${f.kicker} in the SEOPage app, for ${tradeOf(trade).business} (a sample business).`} />
    </Pane>
  );
}

const QH = "font-[family-name:var(--o-head)] [font-weight:var(--o-hw)] text-[clamp(34px,3.6vw,54px)] leading-[1] tracking-[var(--o-ht)]";

/* One beat of the story: the owner's question, a one-line answer, their trade's example, then the picture.
   `flip` puts the picture on the left; `alt` gives the section the alternate ground. */
function Beat({ n, id, kicker, question, answer, example, flip = false, alt = false, picture, children }: { n: number; id: string; kicker: string; question: string; answer: string; example?: string; flip?: boolean; alt?: boolean; picture: ReactNode; children?: ReactNode }) {
  return (
    <section id={id} className={`${SECTION} border-t border-[var(--o-edge)]`} style={alt ? { background: "var(--o-alt)" } : undefined}>
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <div className={`flex flex-col gap-5 lg:col-span-5 ${flip ? "lg:order-2 lg:col-start-8" : ""}`}>
          <span className="font-[family-name:var(--o-mono)] text-[13px] text-[var(--o-link)]">{String(n).padStart(2, "0")} · {kicker}</span>
          <h2 className={QH}>{question}</h2>
          <p className="text-[clamp(17px,1.4vw,19px)] leading-[1.6] text-[var(--o-text2)]">{answer}</p>
          {example && (
            <p className="flex items-start gap-2.5 text-[15.5px] font-medium text-[var(--o-text)]">
              <span aria-hidden className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-[var(--o-action)]" />
              {example}
            </p>
          )}
          {children}
        </div>
        <div className={`lg:col-span-7 ${flip ? "lg:order-1 lg:col-start-1" : ""}`}>{picture}</div>
      </div>
    </section>
  );
}

/* The trade switch: links, so the hero above follows the pick too */
function TradeBar({ trade, base }: { trade: Trade; base: string }) {
  return (
    <div id="story" className="border-t border-[var(--o-edge)] px-6 py-6 sm:px-10 lg:px-24">
      <nav aria-label="Examples for your trade" className="flex flex-wrap items-center gap-2">
        <span className="mr-2 text-[15px] text-[var(--o-muted)]">Examples for</span>
        {TRADES.map((t) => (
          <Link key={t.key} href={`${base}?trade=${t.key}#story`} scroll={false} aria-current={t.key === trade ? "true" : undefined} className={`inline-flex h-10 items-center rounded-full px-4 text-[14.5px] font-semibold ${t.key === trade ? "bg-[var(--o-text)] text-[var(--o-bg)]" : "border border-[var(--o-edge-strong)] text-[var(--o-text)] hover:border-[var(--o-text)]"}`}>{t.name}</Link>
        ))}
        <span className="ml-1 text-[13.5px] text-[var(--o-muted)]">Every business and number below is a sample.</span>
      </nav>
    </div>
  );
}

/* Section 7: the month in four steps, a navy strip right above the price, so the story turns to the offer */
function MonthStrip() {
  const steps = [
    { h: "We read your Search Console", d: "What you show up for, what you almost win, what has no page." },
    { h: "Our AI SEO agents build the pages", d: "Researched for your city, written, scored on ten checks." },
    { h: "You approve every page", d: "Change any section first, or keep it as it is." },
    { h: "The report shows what moved", d: "Searches, clicks and calls, page by page." },
  ];
  return (
    <section className="px-6 py-16 sm:px-10 lg:px-24 lg:py-20" style={{ background: "#0a2540", color: "#f4f1ea" }}>
      <h2 className="font-[family-name:var(--o-head)] text-[clamp(26px,2.4vw,34px)] font-semibold tracking-[-0.03em]">How a month works.</h2>
      <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <li key={s.h} className="flex flex-col gap-1.5 border-t-2 border-[#9db4ff] pt-4">
            <span className="font-[family-name:var(--o-mono)] text-[13px] text-[#9db4ff]">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-[17px] font-semibold">{s.h}</span>
            <span className="text-[15px] leading-[1.5] text-[#cdd6e2]">{s.d}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function StoryHome({ trade, base, picker }: { trade: Trade; base: string; picker?: ReactNode }) {
  const t = TONES[0];
  const copy = COPIES.find((c) => c.key === "b") ?? COPIES[0];
  const calls = by("calls"), coverage = by("coverage"), next = by("next"), identity = by("identity");
  const hook = HOOKS[trade];
  const business = tradeOf(trade).business;
  return (
    <div className={`${OAT_FONTS} min-h-screen font-[family-name:var(--o-body)] text-[var(--o-text)]`} style={toneStyle(t)}>
      <PersonalizeProvider>
        <Hero tone={t} sub={copy.hero} heroShot={heroShot(trade)} />
      </PersonalizeProvider>
      <TradeBar trade={trade} base={base} />

      <Beat n={1} id="calls" kicker="Calls" question="Is search sending you calls?" answer="Most owners can't say which page made the phone ring. SEOPage shows clicks, calls and where you show up, page by page, in plain words." example={calls.example[trade]} picture={<FeatureShot trade={trade} f={calls} />}>
        <p className="text-[14.5px] text-[var(--o-muted)]">From your own Search Console and GA4. No report to decode.</p>
      </Beat>

      <Beat n={2} id="coverage" kicker="Coverage" alt flip question="Do you show up in every town you cover?" answer="People search for each service in each town. The grid shows which of those searches have a page of yours to land on, with about how many people make each one a month." example={coverage.example[trade]} picture={<FeatureShot trade={trade} f={coverage} />}>
        <p className="text-[14.5px] leading-[1.6] text-[var(--o-muted)]">
          45% of US consumers now use AI to find a local business, up from 6% a year earlier (<a href="https://www.brightlocal.com/research/lcrs-ai-trust/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-[var(--o-text)]">BrightLocal, 2026</a>).
        </p>
      </Beat>

      <Beat n={3} id="next" kicker="What's next" question="What should your next page be?" answer="Each month's pages are picked from your own Search Console and research in your area, ranked for calls, each with the reason it made the list." picture={<FeatureShot trade={trade} f={next} />}>
        {/* The two kinds of page an owner gets at once: price searches and the season ahead */}
        <div className="grid gap-3 sm:grid-cols-2">
          <div className={`${CARD} flex flex-col gap-1.5 p-4`}>
            <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--o-link)]">Cost searches</span>
            <span className="font-[family-name:var(--o-mono)] text-[13.5px]">“{hook.cost}”</span>
            <span className="text-[14px] leading-[1.5] text-[var(--o-text2)]">People pricing a job are getting ready to call.</span>
          </div>
          <div className={`${CARD} flex flex-col gap-1.5 p-4`}>
            <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--o-link)]">The season ahead</span>
            <span className="text-[14.5px] font-medium">{hook.season}</span>
            <span className="text-[14px] leading-[1.5] text-[var(--o-text2)]">Built {hook.when}, not during it.</span>
          </div>
        </div>
      </Beat>

      <Beat n={4} id="approval" kicker="You decide" alt flip question="Nothing goes live without your yes." answer="Every page waits for you. Each section comes with versions to compare: keep one, ask for three more, or change the words, then approve the page when it's right." example={`Three new takes on the ${OPENING[trade]} page's opening, ranked`}
        picture={
          <Pane trade={trade} label="The builder">
            <Shot src={shotSrc(trade, "builder")} rect={BUILDER.rect} phone={BUILDER.phone} alt={`The SEOPage builder showing three ranked versions of ${business}'s opening section (a sample business).`} />
          </Pane>
        }>
        <ul className="flex flex-col gap-2 text-[16px] text-[var(--o-text)]">
          {["You approve every page", "Change any section, or ask for another version", "You own every page"].map((x) => (
            <li key={x} className="flex items-center gap-2.5"><span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[var(--o-action)]" />{x}</li>
          ))}
        </ul>
      </Beat>

      <Beat n={5} id="identity" kicker="Identity" question="Does Google know everything you do?" answer="Your name, phone, towns, services and reviews, checked on every page. When Google connects you with one service out of four, you'll see it, and the next pages are picked to close the gap." example={identity.example[trade]} picture={<FeatureShot trade={trade} f={identity} />}>
        <div><Link href="/audit" className={GHOST}>Check your own page free</Link></div>
      </Beat>

      <MonthStrip />
      <Offer />
      <Faq items={HOME_FAQS} />
      <Close sub={copy.close} />
      <DarkFooter ground="ink" />
      {picker}
    </div>
  );
}
