/* eslint-disable @next/next/no-img-element -- real product screenshots, shown at their own size */
import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { Geist_Mono } from "next/font/google";
import { funnelDisplay, funnelSans } from "@/components/home/fonts";
import { DarkFooter } from "@/components/DarkFooter";
import { Logo } from "@/components/Logo";
import { AppShot } from "@/components/home/AppShot";
import { PersonalizeProvider } from "@/components/home/Personalize";
import { BOOK_CALL_URL, CREATE_URL, PRICE_LABEL, SIGN_IN_URL } from "@/lib/config";
import { OatForm, OatGap, OatMonth } from "./oat-client";

/* ================================================================
   The homepage in the Signed direction (2026-10-29), with the N1 story
   under the new builder hero. One page, three grounds, so the dark
   question can be answered side by side:
     oat   · Oat #EFECE5, the product on a lit navy stage
     night · Esy's Navy #0A2540, with the live glow
     black · today's #04060B, with the live glow
   System: the live homepage's type and shapes on every ground (Funnel
   Display 600 at -0.045em, Funnel Sans, pill buttons and form), one
   cobalt, one primary per section. Copy sells the monthly plan and shows
   the work, not who checks it (no human-review promise on the $149 plan);
   no ranking promises.
   Shared by /prototypes/oat/[tone] (the grounds) and
   /prototypes/oat-copy/[v] (how the paragraphs under each headline speak).
   ================================================================ */

const mono = Geist_Mono({ subsets: ["latin"], variable: "--o-mono" });

/* stage: the builder sits on a lit navy band, so the product is the brightest thing on a light page.
   glow:  the live hero's cobalt glow behind the product. */
export type Tone = { key: string; name: string; note: string; dark: boolean; stage?: boolean; glow?: boolean; vars: Record<string, string> };

/* Every pair checked: text 10:1+, muted 5.7:1+, buttons 7:1+, links 6:1+. */
export const TONES: Tone[] = [
  {
    key: "oat", name: "Oat", note: "Warm ground, the product on a navy stage", dark: false, stage: true,
    vars: { bg: "#efece5", alt: "#f6f3ec", panel: "#fffdf9", edge: "#ddd6c8", "edge-strong": "#c9bfac", text: "#0b0b0c", text2: "#34302a", muted: "#5e574b", action: "#1b46d4", "action-ink": "#ffffff", link: "#1b46d4", danger: "#b42318" },
  },
  {
    key: "night", name: "Night", note: "Esy's Navy all the way down", dark: true, glow: true,
    vars: { bg: "#0a2540", alt: "#0c2a49", panel: "#0f3052", edge: "#1d4270", "edge-strong": "#2c5487", text: "#f4f1ea", text2: "#cdd6e2", muted: "#9fb0c4", action: "#9db4ff", "action-ink": "#0a2540", link: "#9db4ff", danger: "#ff8a7d" },
  },
  {
    key: "black", name: "Black", note: "The live black homepage, with the Signed details", dark: true, glow: true,
    /* #3563F5: the live cobalt nudged so white text passes (4.9:1) */
    vars: { bg: "#04060b", alt: "#070a12", panel: "#0a0f1e", edge: "#1a2033", "edge-strong": "#2a3248", text: "#eef2ff", text2: "#c9d0e2", muted: "#a0a9c0", action: "#3563f5", "action-ink": "#ffffff", link: "#9db4ff", danger: "#ff8a7d" },
  },
];

/* Earlier links to the two in-between variants land on the tone they became. */
export const ALIASES: Record<string, string> = { "oat-sharp": "oat", "black-signed": "black" };

/* ---------- Copy: how the paragraph under each headline speaks (oat-copy round, 2026-10-29) ----------
   "now" is the page as it stood. The three takes rewrite the same five paragraphs in one voice each,
   so the voice is judged across the page, not on one line. All drop "You approve each one before it
   goes live" from the hero: it already lives in the month's steps and on the plan card.
   Picked: B · Checklist (2026-10-29), now the copy on /prototypes/oat/[tone].
     A · Short       one line under each headline, the outcome only
     B · Checklist   the paragraph becomes short points you can scan
     C · Owner talk  second person, the owner's day, plain and warm */
export type Copy = { key: string; name: string; note: string; hero: ReactNode; n1: ReactNode; month: ReactNode | null; builder: ReactNode; close: ReactNode };

function Points({ items, center = false }: { items: string[]; center?: boolean }) {
  return (
    <ul className={`flex flex-wrap gap-y-2.5 text-[var(--o-text)] ${center ? "justify-center gap-x-5 text-[16px]" : "flex-col gap-x-6 text-[clamp(16px,1.3vw,18px)]"}`}>
      {items.map((t) => (
        <li key={t} className="flex items-center gap-2.5">
          <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--o-action)]" />
          {t}
        </li>
      ))}
    </ul>
  );
}

export const COPIES: Copy[] = [
  {
    key: "now", name: "Now", note: "The page as it stood",
    hero: "Every month SEOPage reads your Search Console, picks the pages your site is missing, and builds them for your city. You approve each one before it goes live, and a report shows what moved.",
    n1: "Each search is a question: what it costs, who can come today, whether you cover their street. Google, and the AI answers built on it, look for sites that answer those questions plainly. A site earns that one solid page at a time.",
    month: "A few researched pages every month, picked from your own search data. Your site grows where people are already looking.",
    builder: "Every section comes with versions to compare. Keep one, ask for three more, or edit the words yourself. Nothing goes live until you say so.",
    close: "Start with one page, free to preview. The monthly plan is $149 when it opens.",
  },
  {
    key: "a", name: "Short", note: "One line under each headline, the outcome only",
    hero: "New pages for your site every month, picked from what people near you already search.",
    n1: "Each one is a question: what it costs, who can come today, whether you cover their street. Search looks for sites that answer plainly.",
    month: "A few pages a month, picked from your own search data.",
    builder: "Keep one, ask for three more, or edit the words yourself.",
    close: "Start with one page, free to preview.",
  },
  {
    key: "b", name: "Checklist", note: "The paragraph becomes short points you can scan",
    hero: <Points center items={["Picked from your Search Console", "Written by our AI SEO agents", "A report every month"]} />,
    n1: (
      <div className="flex flex-col gap-4">
        <span>Each search is a question your site answers, or doesn&apos;t:</span>
        <Points items={["What does it cost?", "Can someone come today?", "Do you cover my street?"]} />
      </div>
    ),
    month: null,
    builder: <Points items={["Keep a version", "Ask for three more", "Edit the words yourself"]} />,
    close: <Points center items={["First page free to preview", "$149 a month when the plan opens"]} />,
  },
  {
    key: "c", name: "Owner talk", note: "Second person, the owner's day, plain and warm",
    hero: "You run the jobs. Every month we add the pages people near you are searching for, and show you what changed.",
    n1: "Someone wants to know what a job costs, or whether you can come tomorrow. If your site doesn't say, they keep looking.",
    month: "You don't need to know SEO. You say yes or no to each page, and we handle the rest.",
    builder: "Don't like a section? Pick another version, or change the words yourself.",
    close: "Start with one page. It's free to look at.",
  },
];

/* The type and shape each look uses, as variables the shared sections read. */
const LOOK = { "--o-body": "var(--font-funnel)", "--o-head": "var(--font-funnel-display)", "--o-hw": "600", "--o-ht": "-0.045em", "--o-h1": "clamp(48px,6.2vw,88px)", "--o-h2": "clamp(36px,4.3vw,62px)", "--o-r": "999px", "--o-rf": "999px" };

const PAD = "px-6 sm:px-10 lg:px-24";
const SECTION = `${PAD} py-24 lg:py-[128px]`;
const H1 = "font-[family-name:var(--o-head)] [font-weight:var(--o-hw)] text-[length:var(--o-h1)] leading-[0.95] tracking-[var(--o-ht)] [font-variant-numeric:lining-nums]";
const H2 = "font-[family-name:var(--o-head)] [font-weight:var(--o-hw)] text-[length:var(--o-h2)] leading-[1] tracking-[var(--o-ht)] [font-variant-numeric:lining-nums]";
const BODY = "text-[clamp(17px,1.4vw,19px)] leading-[1.6] text-[var(--o-text2)]";
const PRIMARY = "inline-flex h-[52px] items-center rounded-[var(--o-r)] bg-[var(--o-action)] px-7 text-[16px] font-semibold text-[var(--o-action-ink)] hover:opacity-90";
const GHOST = "inline-flex h-[52px] items-center rounded-[var(--o-r)] border border-[var(--o-edge-strong)] px-6 text-[16px] font-medium text-[var(--o-text)] hover:border-[var(--o-text)]";
const CARD = "rounded-[14px] border border-[var(--o-edge)] bg-[var(--o-panel)]";

/* The whole homepage for one ground and one copy take, with the picker the route passes in. */
export function OatHome({ tone: t, copy: c, picker }: { tone: Tone; copy: Copy; picker: ReactNode }) {
  const style = { ...Object.fromEntries(Object.entries(t.vars).map(([k, v]) => [`--o-${k}`, v])), ...LOOK } as CSSProperties;
  return (
    <div className={`${mono.variable} ${funnelDisplay.variable} ${funnelSans.variable} min-h-screen font-[family-name:var(--o-body)] text-[var(--o-text)]`} style={{ ...style, background: "var(--o-bg)" }}>
      <PersonalizeProvider>
        <Hero tone={t} sub={c.hero} />
        <Question body={c.n1} />
      </PersonalizeProvider>
      <HowAMonthWorks intro={c.month} />
      <Builder body={c.builder} />
      <Offer />
      <Close inverse={t.key === "night"} sub={c.close} />
      <DarkFooter ground="ink" />
      {picker}
    </div>
  );
}

/* The floating picker at the foot of every take: a label, then each option, the current one filled. */
export function Picker({ label, items, current }: { label: string; items: { key: string; name: string; note: string; href: string }[]; current: string }) {
  return (
    <nav data-proto-ui aria-label={label} className="fixed bottom-4 left-1/2 z-50 flex max-w-[calc(100vw-32px)] -translate-x-1/2 items-center gap-1 overflow-x-auto rounded-full bg-[#0a0c11] p-1 text-[13px] text-white shadow-2xl">
      <span className="whitespace-nowrap px-3 text-white/55">{label}</span>
      {items.map((t) => (
        <Link key={t.key} href={t.href} className={`whitespace-nowrap rounded-full px-3.5 py-1.5 font-medium ${t.key === current ? "bg-[#1b46d4]" : "hover:bg-white/10"}`} title={t.note}>{t.name}</Link>
      ))}
    </nav>
  );
}

/* ---------- Hero: the title, the form, the builder with your business in it ---------- */
function Hero({ tone, sub }: { tone: Tone; sub: ReactNode }) {
  const glow = tone.glow ? { background: "radial-gradient(50% 45% at 50% 62%, rgba(61,107,255,.22), transparent 75%)" } : undefined;
  return (
    <section className={`relative overflow-hidden ${PAD} pt-7`} style={glow}>
      <style>{MOTION}</style>
      {/* Header: Pricing and Sign in for people coming back; the build button for everyone else */}
      <header className="flex h-[52px] items-center justify-between">
        <Logo tone={tone.dark ? "dark" : "light"} className="text-[26px]" />
        <nav aria-label="Main" className="flex items-center gap-1 text-[15px] font-medium">
          <Link href="/pricing" className="inline-flex h-11 items-center px-3 text-[var(--o-text2)] hover:text-[var(--o-text)] sm:px-4">Pricing</Link>
          <a href={SIGN_IN_URL} className="inline-flex h-11 items-center px-3 text-[var(--o-text2)] hover:text-[var(--o-text)] sm:px-4">Sign in</a>
          <a href={CREATE_URL} className="ml-2 hidden h-11 items-center rounded-[var(--o-r)] bg-[var(--o-action)] px-5 font-semibold text-[var(--o-action-ink)] hover:opacity-90 sm:inline-flex">Start free</a>
        </nav>
      </header>
      <div className="mx-auto mt-16 flex max-w-[900px] flex-col items-center gap-6 text-center lg:mt-24">
        <h1 className={`${H1} oat-rise`}>
          Build a site Google and AI can trust,{" "}
          <span className="relative inline-block whitespace-nowrap">
            one page at a time.
            {/* The one hand-drawn mark in the hero, drawn in once on load */}
            <svg viewBox="0 0 300 16" preserveAspectRatio="none" aria-hidden className="absolute -bottom-[0.08em] left-0 h-[0.16em] w-[96%]">
              <path className="oat-draw" pathLength={1} d="M3 11 C 70 3, 160 3, 297 8" fill="none" stroke="var(--o-action)" strokeWidth="5" strokeLinecap="round" />
            </svg>
          </span>
        </h1>
        <div className={`${BODY} oat-rise mx-auto max-w-[720px] [text-wrap:balance]`} style={{ animationDelay: "120ms" }}>{sub}</div>
        <div className="oat-rise w-full max-w-[760px] text-left" style={{ animationDelay: "220ms" }}><OatForm /></div>
      </div>
      <p className="oat-rise mt-14 text-center text-[14px] text-[var(--o-muted)]" style={{ animationDelay: "320ms" }}>The builder, with your business in it. Type yours above and watch it change.</p>
      {tone.stage ? (
        /* Full-bleed navy band that starts a third of the way down the shot, with the cobalt glow behind it */
        <div className="relative -mx-6 mt-5 px-6 sm:-mx-10 sm:px-10 lg:-mx-24 lg:px-24" style={{ background: `linear-gradient(to bottom, transparent 0 140px, ${STAGE} 140px)` }}>
          <div aria-hidden className="oat-breathe pointer-events-none absolute inset-0" style={{ background: "radial-gradient(45% 40% at 50% 70%, rgba(61,107,255,.32), transparent 75%)" }} />
          <div className="oat-rise relative mx-auto max-w-[1240px]" style={{ animationDelay: "380ms" }}>
            <ShotFrame fade={STAGE} border="rgba(10,37,64,.18)" shadow />
            <div className="oat-float absolute -right-6 top-[30%] hidden xl:block"><OatMonth /></div>
          </div>
        </div>
      ) : (
        <div className="mt-5"><ShotFrame fade="var(--o-bg)" border="var(--o-edge)" /></div>
      )}
    </section>
  );
}

const STAGE = "#0a2540";

/* Hero motion: a staged rise, the underline drawing in, the stage glow breathing, the month card
   drifting. All of it stops for reduced-motion visitors. */
const MOTION = `
@keyframes oat-rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
@keyframes oat-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
@keyframes oat-breathe { 0%, 100% { opacity: .75; } 50% { opacity: 1; } }
@keyframes oat-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
.oat-rise { animation: oat-rise .8s cubic-bezier(.2,.7,.2,1) both; }
.oat-draw { stroke-dasharray: 1; stroke-dashoffset: 1; animation: oat-draw .9s cubic-bezier(.6,0,.2,1) .7s forwards; }
.oat-breathe { animation: oat-breathe 6s ease-in-out infinite; }
.oat-float { animation: oat-float 7s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) {
  .oat-rise, .oat-breathe, .oat-float { animation: none; }
  .oat-draw { animation: none; stroke-dashoffset: 0; }
}`;

function ShotFrame({ fade, border, shadow = false }: { fade: string; border: string; shadow?: boolean }) {
  return (
    <div className="relative mx-auto max-h-[560px] max-w-[1240px] overflow-hidden rounded-t-[16px] border border-b-0 lg:max-h-[600px]" style={{ borderColor: border, boxShadow: shadow ? "0 30px 80px -20px rgba(4,6,11,.45)" : undefined }}>
      <AppShot theme="light" className="hidden sm:block" />
      <AppShot theme="light" device="mobile" crop={{ x: 478, w: 400 }} className="sm:hidden" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40" style={{ background: `linear-gradient(to top, ${fade}, transparent)` }} />
    </div>
  );
}

/* ---------- N1 · The gap: searches near you that your site doesn't answer ---------- */
function Question({ body }: { body: ReactNode }) {
  return (
    <section className={`${SECTION} border-t border-[var(--o-edge)]`}>
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col gap-6 lg:col-span-6">
          <h2 className={H2}>People search for your work hundreds of ways. Your site answers a few.</h2>
          <div className={BODY}>{body}</div>
          <p className="text-[15px] leading-[1.6] text-[var(--o-muted)]">
            45% of US consumers now use AI to find a local business, up from 6% a year earlier (<a href="https://www.brightlocal.com/research/lcrs-ai-trust/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-[var(--o-text)]">BrightLocal, 2026</a>).
          </p>
        </div>
        {/* The bridge to the audit: the card shows the gap, the audit checks one of your own pages */}
        <div className="flex flex-col gap-4 lg:col-span-6">
          <OatGap />
          <Link href="/audit" className="self-start pl-1 text-[15px] font-medium text-[var(--o-link)] underline-offset-4 hover:underline">Check one of your own pages with a free audit →</Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- How a month works: the plan, in four steps ---------- */
function HowAMonthWorks({ intro }: { intro: ReactNode | null }) {
  const steps = [
    { h: "We read your Search Console", d: "The searches you show up for, the ones you almost win, and the ones with no page at all." },
    { h: "Our AI SEO agents build the pages", d: "Each one is researched for your city from live search data, written, and scored on ten checks." },
    { h: "You approve every page", d: "Change any section in the builder, or keep it as it is. Nothing goes live until you say so." },
    { h: "The report shows what moved", d: "Searches and clicks, page by page, so next month starts from what worked." },
  ];
  return (
    <section className={`${SECTION}`} style={{ background: "var(--o-alt)" }}>
      <div className="flex max-w-[760px] flex-col gap-5">
        <h2 className={H2}>How a month works.</h2>
        {intro && <div className={BODY}>{intro}</div>}
      </div>
      <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((x, i) => (
          <li key={x.h} className={`${CARD} flex flex-col gap-2 p-6`}>
            <span className="font-[family-name:var(--o-mono)] text-[13px] text-[var(--o-link)]">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-[18px] font-semibold">{x.h}</span>
            <span className="text-[15.5px] leading-[1.55] text-[var(--o-text2)]">{x.d}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ---------- The builder makes it ---------- */
function Builder({ body }: { body: ReactNode }) {
  return (
    <section className={`${SECTION} grid items-center gap-12 lg:grid-cols-12 lg:gap-16`}>
      <div className="flex flex-col gap-6 lg:col-span-5">
        <h2 className={H2}>Every page comes with versions to compare.</h2>
        <div className={BODY}>{body}</div>
        <div><a href={CREATE_URL} className={PRIMARY}>Start with a free page</a></div>
      </div>
      <figure className="flex flex-col gap-3 lg:col-span-7">
        <img src="/prototypes/below/builder-versions.jpg" alt="The builder showing three versions of a section to choose from." className="block w-full rounded-[14px] border border-[var(--o-edge)]" loading="lazy" />
        <figcaption className="text-[14px] text-[var(--o-muted)]">The real builder: three versions of one section.</figcaption>
      </figure>
    </section>
  );
}

/* ---------- The offer: the monthly plan first, Managed beside it, one page as a footnote ---------- */
function Offer() {
  return (
    <section className={`${SECTION}`} style={{ background: "var(--o-alt)" }}>
      <div className="flex max-w-[760px] flex-col gap-5">
        <h2 className={H2}>One plan. New pages every month.</h2>
      </div>
      <div className="mt-12 grid gap-5 lg:grid-cols-[1.25fr_1fr]">
        <div className={`${CARD} relative flex flex-col gap-5 p-8`}>
          <span className="text-[15px] text-[var(--o-muted)]">SEOPage · opening soon</span>
          <span className="flex items-baseline gap-3"><span className="font-[family-name:var(--o-mono)] text-[56px] font-medium leading-none tracking-[-0.04em]">$149</span><span className="text-[15px] text-[var(--o-text2)]">a month</span></span>
          <p className="text-[16px] leading-[1.6] text-[var(--o-text2)]">New pages every month, picked from your own Search Console, researched and written by our AI SEO agents and scored on ten checks. You approve each one, and a report shows what moved.</p>
          <div className="flex flex-wrap items-center gap-3">
            <a href={CREATE_URL} className={PRIMARY}>Start with a free page</a>
            <Link href="/pricing" className={GHOST}>See the plan</Link>
          </div>
        </div>
        <div className={`${CARD} flex flex-col gap-5 p-8`}>
          <span className="text-[15px] text-[var(--o-muted)]">Managed · founding price</span>
          <span className="flex items-baseline gap-3"><span className="font-[family-name:var(--o-mono)] text-[56px] font-medium leading-none tracking-[-0.04em]">$999</span><span className="text-[15px] text-[var(--o-text2)]">a month</span></span>
          <p className="text-[16px] leading-[1.6] text-[var(--o-text2)]">We run it for you: your pages, your Google Business Profile and your Google Ads.</p>
          <div><a href={BOOK_CALL_URL} className={GHOST}>Book a call</a></div>
        </div>
      </div>
      <p className="mt-8 text-[15px] text-[var(--o-text2)]">
        Just need one page? <a href={CREATE_URL} className="font-medium text-[var(--o-link)] underline underline-offset-4">Build it free</a>, and it&apos;s {PRICE_LABEL} once when you publish.
      </p>
    </section>
  );
}

/* ---------- Close: always Esy's Navy, so even the Oat site ends in the family's dark ---------- */
/* The close is Esy Navy on Oat and black. On a navy page it flips to Oat so it still reads as the end. */
function Close({ inverse = false, sub }: { inverse?: boolean; sub: ReactNode }) {
  const navy = { "--o-text": "#f4f1ea", "--o-text2": "#cdd6e2", "--o-action": "#9db4ff", "--o-action-ink": "#0a2540", background: "#0a2540", color: "#f4f1ea" } as CSSProperties;
  const oat = { "--o-text": "#16130f", "--o-text2": "#3d372e", "--o-action": "#1b46d4", "--o-action-ink": "#ffffff", background: "#efece5", color: "#16130f" } as CSSProperties;
  return (
    <section className={`${SECTION} text-center`} style={inverse ? oat : navy}>
      <h2 className={`${H2} mx-auto max-w-[860px]`}>Give the searches near you an answer on your site.</h2>
      <div className={`${BODY} mx-auto mt-6 max-w-[560px]`}>{sub}</div>
      <div className="mt-10"><a href={CREATE_URL} className={PRIMARY}>Build your first page free</a></div>
    </section>
  );
}
