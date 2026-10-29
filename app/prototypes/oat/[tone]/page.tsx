/* eslint-disable @next/next/no-img-element -- real product screenshots, shown at their own size */
import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Geist_Mono } from "next/font/google";
import { funnelDisplay, funnelSans } from "@/components/home/fonts";
import { DarkFooter } from "@/components/DarkFooter";
import { Logo } from "@/components/Logo";
import { AppShot } from "@/components/home/AppShot";
import { PersonalizeProvider } from "@/components/home/Personalize";
import { CREATE_URL, PRICE_LABEL, SIGN_IN_URL } from "@/lib/config";
import { OatAlarm, OatAnswer, OatForm } from "../../_lib/oat-client";

/* ================================================================
   The homepage in the Signed direction (2026-10-29), with the N1 story
   under the new builder hero. One page, three grounds, so the dark
   question can be answered side by side:
     oat   · Oat #EFECE5, the product on a lit navy stage
     night · Esy's Navy #0A2540, with the live glow
     black · today's #04060B, with the live glow
   System: the live homepage's type and shapes on every ground (Funnel
   Display 600 at -0.045em, Funnel Sans, pill buttons and form), one
   cobalt, one primary per section, the stamp once (on the plan a person
   reviews). Copy follows N1; no ranking promises.
   ================================================================ */

export const metadata: Metadata = { title: { absolute: "Homepage in Signed | SEOPage" }, robots: { index: false, follow: false } };

const mono = Geist_Mono({ subsets: ["latin"], variable: "--o-mono" });

/* stage: the builder sits on a lit navy band, so the product is the brightest thing on a light page.
   glow:  the live hero's cobalt glow behind the product. */
type Tone = { key: string; name: string; note: string; dark: boolean; stage?: boolean; glow?: boolean; vars: Record<string, string> };

/* Every pair checked: text 10:1+, muted 5.7:1+, buttons 7:1+, links 6:1+. */
const TONES: Tone[] = [
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
const ALIASES: Record<string, string> = { "oat-sharp": "oat", "black-signed": "black" };

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

export const dynamicParams = false;
export function generateStaticParams() {
  return [...TONES.map((t) => t.key), ...Object.keys(ALIASES)].map((tone) => ({ tone }));
}

export default async function Page({ params }: { params: Promise<{ tone: string }> }) {
  const { tone } = await params;
  if (ALIASES[tone]) redirect(`/prototypes/oat/${ALIASES[tone]}`);
  const t = TONES.find((x) => x.key === tone);
  if (!t) notFound();
  const style = { ...Object.fromEntries(Object.entries(t.vars).map(([k, v]) => [`--o-${k}`, v])), ...LOOK } as CSSProperties;
  return (
    <div className={`${mono.variable} ${funnelDisplay.variable} ${funnelSans.variable} min-h-screen font-[family-name:var(--o-body)] text-[var(--o-text)]`} style={{ ...style, background: "var(--o-bg)" }}>
      <PersonalizeProvider>
        <Hero tone={t} />
        <Question />
      </PersonalizeProvider>
      <WhatItNeeds />
      <Builder />
      <Offer />
      <Close inverse={t.key === "night"} />
      <DarkFooter ground="ink" />
      <ToneSwitch current={t.key} />
    </div>
  );
}

/* ---------- Hero: the title, the form, the builder with your business in it ---------- */
function Hero({ tone }: { tone: Tone }) {
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
          <a href={CREATE_URL} className="ml-2 hidden h-11 items-center rounded-[var(--o-r)] bg-[var(--o-action)] px-5 font-semibold text-[var(--o-action-ink)] hover:opacity-90 sm:inline-flex">Build my page</a>
        </nav>
      </header>
      <div className="mx-auto mt-16 flex max-w-[900px] flex-col items-center gap-6 text-center lg:mt-24">
        <h1 className={`${H1} oat-rise`}>
          Build SEO landing pages that get{" "}
          <span className="relative inline-block whitespace-nowrap">
            cited by AI.
            {/* The one hand-drawn mark in the hero, drawn in once on load */}
            <svg viewBox="0 0 300 16" preserveAspectRatio="none" aria-hidden className="absolute -bottom-[0.08em] left-0 h-[0.16em] w-[96%]">
              <path className="oat-draw" pathLength={1} d="M3 11 C 70 3, 160 3, 297 8" fill="none" stroke="var(--o-action)" strokeWidth="5" strokeLinecap="round" />
            </svg>
          </span>
        </h1>
        <p className={`${BODY} oat-rise mx-auto max-w-[560px]`} style={{ animationDelay: "120ms" }}>And rank on Google. Built from live search data for your city, and scored on ten checks before you pay.</p>
        <div className="oat-rise w-full max-w-[760px] text-left" style={{ animationDelay: "220ms" }}><OatForm /></div>
      </div>
      <p className="oat-rise mt-14 text-center text-[14px] text-[var(--o-muted)]" style={{ animationDelay: "320ms" }}>The builder, with your business in it. Type yours above and watch it change.</p>
      {tone.stage ? (
        /* Full-bleed navy band that starts a third of the way down the shot, with the cobalt glow behind it */
        <div className="relative -mx-6 mt-5 px-6 sm:-mx-10 sm:px-10 lg:-mx-24 lg:px-24" style={{ background: `linear-gradient(to bottom, transparent 0 140px, ${STAGE} 140px)` }}>
          <div aria-hidden className="oat-breathe pointer-events-none absolute inset-0" style={{ background: "radial-gradient(45% 40% at 50% 70%, rgba(61,107,255,.32), transparent 75%)" }} />
          <div className="oat-rise relative mx-auto max-w-[1240px]" style={{ animationDelay: "380ms" }}>
            <ShotFrame fade={STAGE} border="rgba(10,37,64,.18)" shadow />
            <div className="oat-float absolute -right-6 top-[42%] hidden xl:block"><OatAnswer /></div>
          </div>
        </div>
      ) : (
        <div className="mt-5"><ShotFrame fade="var(--o-bg)" border="var(--o-edge)" /></div>
      )}
    </section>
  );
}

const STAGE = "#0a2540";

/* Hero motion: a staged rise, the underline drawing in, the stage glow breathing, the answer card
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

/* ---------- N1 · The question ---------- */
function Question() {
  return (
    <section className={`${SECTION} border-t border-[var(--o-edge)]`}>
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col gap-6 lg:col-span-6">
          <h2 className={H2}>Someone near you just asked AI who to hire. It named someone else.</h2>
          <p className={BODY}>AI answers quote pages that say plainly what you do, where you do it, and what it costs. When your site doesn&apos;t say it, the answer names a business whose site does.</p>
          <p className="text-[15px] leading-[1.6] text-[var(--o-muted)]">
            45% of US consumers now use AI to find a local business, up from 6% a year earlier (<a href="https://www.brightlocal.com/research/lcrs-ai-trust/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-[var(--o-text)]">BrightLocal, 2026</a>).
          </p>
        </div>
        <div className="lg:col-span-6"><OatAlarm /></div>
      </div>
    </section>
  );
}

/* ---------- What that page needs: the details AI quotes ---------- */
function WhatItNeeds() {
  const items = [
    { h: "What it costs", d: "Real prices or ranges for your main jobs, so the answer can quote them." },
    { h: "Where you work", d: "The towns and neighbourhoods you serve, named on the page." },
    { h: "Straight answers", d: "How long it takes, who shows up, what happens on the day." },
    { h: "Proof it's you", d: "Your own photos, reviews and licence, not stock." },
  ];
  return (
    <section className={`${SECTION}`} style={{ background: "var(--o-alt)" }}>
      <div className="flex max-w-[760px] flex-col gap-5">
        <h2 className={H2}>What that page needs to say.</h2>
        <p className={BODY}>Four things the answers quote, written so a person and an AI can both find them.</p>
      </div>
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((x) => (
          <li key={x.h} className={`${CARD} flex flex-col gap-2 p-6`}>
            <span className="text-[18px] font-semibold">{x.h}</span>
            <span className="text-[15.5px] leading-[1.55] text-[var(--o-text2)]">{x.d}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------- The builder makes it ---------- */
function Builder() {
  return (
    <section className={`${SECTION} grid items-center gap-12 lg:grid-cols-12 lg:gap-16`}>
      <div className="flex flex-col gap-6 lg:col-span-5">
        <h2 className={H2}>The builder writes it, with your business in it.</h2>
        <p className={BODY}>Every section comes with versions to compare. Keep one, ask for three more, or edit the words yourself. Nothing goes live until you say so.</p>
        <div><a href={CREATE_URL} className={PRIMARY}>Build it free</a></div>
      </div>
      <figure className="flex flex-col gap-3 lg:col-span-7">
        <img src="/prototypes/below/builder-versions.jpg" alt="The builder showing three versions of a section to choose from." className="block w-full rounded-[14px] border border-[var(--o-edge)]" loading="lazy" />
        <figcaption className="text-[14px] text-[var(--o-muted)]">The real builder: three versions of one section.</figcaption>
      </figure>
    </section>
  );
}

/* ---------- The offer: one page now, the plan when it opens. The stamp, once. ---------- */
function Offer() {
  return (
    <section className={`${SECTION}`} style={{ background: "var(--o-alt)" }}>
      <div className="flex max-w-[760px] flex-col gap-5">
        <h2 className={H2}>One page today. More every month, when you&apos;re ready.</h2>
      </div>
      <div className="mt-12 grid gap-5 lg:grid-cols-2">
        <div className={`${CARD} flex flex-col gap-5 p-8`}>
          <span className="text-[15px] text-[var(--o-muted)]">By the page</span>
          <span className="flex items-baseline gap-3"><span className="font-[family-name:var(--o-mono)] text-[56px] font-medium leading-none tracking-[-0.04em]">{PRICE_LABEL}</span><span className="text-[15px] text-[var(--o-text2)]">once</span></span>
          <p className="text-[16px] leading-[1.6] text-[var(--o-text2)]">One page, researched for your city, written, designed and checked. Publish it to your address or download it. No subscription.</p>
          <div><a href={CREATE_URL} className={PRIMARY}>Build it free</a></div>
        </div>
        <div className={`${CARD} relative flex flex-col gap-5 p-8`}>
          <span className="text-[15px] text-[var(--o-muted)]">SEOPage, monthly · coming soon</span>
          <span className="flex items-baseline gap-3"><span className="font-[family-name:var(--o-mono)] text-[56px] font-medium leading-none tracking-[-0.04em]">$149</span><span className="text-[15px] text-[var(--o-text2)]">a month</span></span>
          <p className="max-w-[78%] text-[16px] leading-[1.6] text-[var(--o-text2)]">New pages every month from your own Search Console, each researched and read by a person before you see it, and a report on what moved.</p>
          <div><Link href="/pricing" className={GHOST}>See the plans</Link></div>
          <span className="absolute right-6 top-6"><Stamp /></span>
        </div>
      </div>
    </section>
  );
}

/* The one human mark: a person read it. Ink is the tone's action color. */
function Stamp() {
  return (
    <svg viewBox="0 0 120 120" width={96} height={96} role="img" aria-label="Checked by a person, every page" style={{ transform: "rotate(-7deg)", opacity: 0.92 }}>
      <defs>
        <path id="oat-stamp-top" d="M 18.65 75.05 A 44 44 0 1 1 101.35 75.05" />
        <path id="oat-stamp-bot" d="M 26 80 A 40 40 0 0 0 94 80" />
      </defs>
      <circle cx="60" cy="60" r="56" fill="none" stroke="var(--o-action)" strokeWidth="3" />
      <circle cx="60" cy="60" r="49" fill="none" stroke="var(--o-action)" strokeWidth="1.2" />
      <text fontSize="9.5" fontWeight="700" letterSpacing="1.5" fill="var(--o-action)" fontFamily="var(--font-funnel), sans-serif"><textPath href="#oat-stamp-top" startOffset="50%" textAnchor="middle">CHECKED BY A PERSON</textPath></text>
      <text fontSize="8.5" fontWeight="600" letterSpacing="1.4" fill="var(--o-action)" fontFamily="var(--font-funnel), sans-serif"><textPath href="#oat-stamp-bot" startOffset="50%" textAnchor="middle">EVERY PAGE</textPath></text>
      <text x="60" y="64" textAnchor="middle" fontSize="20" fontWeight="700" fill="var(--o-action)">✓</text>
    </svg>
  );
}

/* ---------- Close: always Esy's Navy, so even the Oat site ends in the family's dark ---------- */
/* The close is Esy Navy on Oat and black. On a navy page it flips to Oat so it still reads as the end. */
function Close({ inverse = false }: { inverse?: boolean }) {
  const navy = { "--o-text": "#f4f1ea", "--o-text2": "#cdd6e2", "--o-action": "#9db4ff", "--o-action-ink": "#0a2540", background: "#0a2540", color: "#f4f1ea" } as CSSProperties;
  const oat = { "--o-text": "#16130f", "--o-text2": "#3d372e", "--o-action": "#1b46d4", "--o-action-ink": "#ffffff", background: "#efece5", color: "#16130f" } as CSSProperties;
  return (
    <section className={`${SECTION} text-center`} style={inverse ? oat : navy}>
      <h2 className={`${H2} mx-auto max-w-[820px]`}>Someone&apos;s asking AI who to hire. Make the answer you.</h2>
      <p className={`${BODY} mx-auto mt-6 max-w-[560px]`}>Free to preview. {PRICE_LABEL} once, when you publish.</p>
      <div className="mt-10"><a href={CREATE_URL} className={PRIMARY}>Build my page free</a></div>
    </section>
  );
}

function ToneSwitch({ current }: { current: string }): ReactNode {
  return (
    <nav data-proto-ui aria-label="Tone" className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full bg-[#0a0c11] p-1 text-[13px] text-white shadow-2xl">
      <span className="px-3 text-white/55">Homepage, Signed</span>
      {TONES.map((t) => (
        <Link key={t.key} href={`/prototypes/oat/${t.key}`} className={`whitespace-nowrap rounded-full px-3.5 py-1.5 font-medium ${t.key === current ? "bg-[#1b46d4]" : "hover:bg-white/10"}`} title={t.note}>{t.name}</Link>
      ))}
    </nav>
  );
}
