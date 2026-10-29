/* eslint-disable @next/next/no-img-element -- real product screenshots, shown at their own size */
import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google";
import { DarkFooter } from "@/components/DarkFooter";
import { Logo } from "@/components/Logo";
import { AppShot } from "@/components/home/AppShot";
import { PersonalizeProvider } from "@/components/home/Personalize";
import { CREATE_URL, PRICE_LABEL } from "@/lib/config";
import { OatAlarm, OatForm } from "../../_lib/oat-client";

/* ================================================================
   The homepage in the Signed direction (2026-10-29), with the N1 story
   under the new builder hero. One page, three tones, so the dark
   question can be answered side by side:
     oat   · Oat #EFECE5, the pick for the site
     night · Esy's Navy #0A2540
     black · today's #04060B, with the same system
   System: Cormorant for big headlines (Esy's face, lining figures),
   Geist for everything else, one cobalt, 10px buttons, one primary per
   section, no ALL-CAPS labels, no glows, the stamp once (on the plan a
   person reviews). Copy follows N1; no ranking promises.
   ================================================================ */

export const metadata: Metadata = { title: { absolute: "Homepage in Signed | SEOPage" }, robots: { index: false, follow: false } };

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["600", "700"], variable: "--o-serif" });
const sans = Geist({ subsets: ["latin"], variable: "--o-sans" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--o-mono" });

type Tone = { key: string; name: string; note: string; dark: boolean; vars: Record<string, string> };

/* Every pair checked: text 10:1+, muted 5.7:1+, buttons 7:1+, links 6:1+. */
const TONES: Tone[] = [
  {
    key: "oat", name: "Oat", note: "Warm ground, navy close", dark: false,
    vars: { bg: "#efece5", alt: "#f6f3ec", panel: "#fffdf9", edge: "#ddd6c8", "edge-strong": "#c9bfac", text: "#16130f", text2: "#3a342b", muted: "#625a4c", action: "#1b46d4", "action-ink": "#ffffff", link: "#1b46d4", danger: "#b42318" },
  },
  {
    key: "night", name: "Night", note: "Esy's Navy all the way down", dark: true,
    vars: { bg: "#0a2540", alt: "#0c2a49", panel: "#0f3052", edge: "#1d4270", "edge-strong": "#2c5487", text: "#f4f1ea", text2: "#cdd6e2", muted: "#9fb0c4", action: "#9db4ff", "action-ink": "#0a2540", link: "#9db4ff", danger: "#ff8a7d" },
  },
  {
    key: "black", name: "Black", note: "Today's black, with the new system", dark: true,
    vars: { bg: "#04060b", alt: "#070a12", panel: "#0a0f1e", edge: "#1a2033", "edge-strong": "#2a3248", text: "#eef2ff", text2: "#c9d0e2", muted: "#a0a9c0", action: "#9db4ff", "action-ink": "#04060b", link: "#9db4ff", danger: "#ff8a7d" },
  },
];

const PAD = "px-6 sm:px-10 lg:px-24";
const SECTION = `${PAD} py-24 lg:py-[128px]`;
const H1 = "font-[family-name:var(--o-serif)] font-semibold text-[clamp(52px,7vw,104px)] leading-[0.95] tracking-[-0.01em] [font-variant-numeric:lining-nums]";
const H2 = "font-[family-name:var(--o-serif)] font-semibold text-[clamp(42px,5vw,72px)] leading-[1] tracking-[-0.005em] [font-variant-numeric:lining-nums]";
const BODY = "text-[clamp(17px,1.4vw,19px)] leading-[1.6] text-[var(--o-text2)]";
const PRIMARY = "inline-flex h-[52px] items-center rounded-[10px] bg-[var(--o-action)] px-7 text-[16px] font-semibold text-[var(--o-action-ink)] hover:opacity-90";
const GHOST = "inline-flex h-[52px] items-center rounded-[10px] border border-[var(--o-edge-strong)] px-6 text-[16px] font-medium text-[var(--o-text)] hover:border-[var(--o-text)]";
const CARD = "rounded-[14px] border border-[var(--o-edge)] bg-[var(--o-panel)]";

export const dynamicParams = false;
export function generateStaticParams() {
  return TONES.map((t) => ({ tone: t.key }));
}

export default async function Page({ params }: { params: Promise<{ tone: string }> }) {
  const { tone } = await params;
  const t = TONES.find((x) => x.key === tone);
  if (!t) notFound();
  const style = Object.fromEntries(Object.entries(t.vars).map(([k, v]) => [`--o-${k}`, v])) as CSSProperties;
  return (
    <div className={`${serif.variable} ${sans.variable} ${mono.variable} min-h-screen font-[family-name:var(--o-sans)] text-[var(--o-text)]`} style={{ ...style, background: "var(--o-bg)" }}>
      <PersonalizeProvider>
        <Hero dark={t.dark} />
        <Question />
      </PersonalizeProvider>
      <WhatItNeeds />
      <Builder />
      <Proof />
      <Offer />
      <Close inverse={t.key === "night"} />
      <DarkFooter />
      <ToneSwitch current={t.key} />
    </div>
  );
}

/* ---------- Hero: the title, the form, the builder with your business in it ---------- */
function Hero({ dark }: { dark: boolean }) {
  return (
    <section className={`relative overflow-hidden ${PAD} pt-7`}>
      <header className="flex h-[52px] items-center justify-between">
        <Logo tone={dark ? "dark" : "light"} className="text-[26px]" />
        <a href={CREATE_URL} className="inline-flex h-11 items-center rounded-[10px] border border-[var(--o-edge-strong)] px-5 font-medium hover:border-[var(--o-text)]">Build my page</a>
      </header>
      <div className="mx-auto mt-16 flex max-w-[880px] flex-col items-center gap-6 text-center lg:mt-24">
        <h1 className={H1}>SEO landing pages that get cited by AI.</h1>
        <p className={`${BODY} mx-auto max-w-[560px]`}>And rank on Google. Built from live search data for your city, and scored on ten checks before you pay.</p>
        <div className="w-full max-w-[760px] text-left"><OatForm /></div>
      </div>
      <p className="mt-14 text-center text-[14px] text-[var(--o-muted)]">The builder, with your business in it. Type yours above and watch it change.</p>
      <div className="relative mx-auto mt-5 max-h-[560px] max-w-[1240px] overflow-hidden rounded-t-[16px] border border-b-0 border-[var(--o-edge)] lg:max-h-[600px]">
        <AppShot theme="light" className="hidden sm:block" />
        <AppShot theme="light" device="mobile" crop={{ x: 478, w: 400 }} className="sm:hidden" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40" style={{ background: "linear-gradient(to top, var(--o-bg), transparent)" }} />
      </div>
    </section>
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

/* ---------- Our own sites ---------- */
function Proof() {
  return (
    <section className={`${SECTION} border-t border-[var(--o-edge)]`} style={{ background: "var(--o-alt)" }}>
      <div className="flex max-w-[760px] flex-col gap-5">
        <h2 className={H2}>We ran it on our own sites first.</h2>
        <p className={BODY}>The same system builds and checks the pages on our own products. Here is what AI search shows for them.</p>
      </div>
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <Shot src="/proof/clipart-ai-responses-sep-2026.png" alt="Ahrefs Site Explorer overview for clip.art, September 2026: 102 AI responses across 35 pages." caption="clip.art: named in 102 AI answers, across 35 pages. Ahrefs, September 2026." />
        <Shot src="/proof/esy-ai-citations.png" alt="AI citations for Esy." caption="Esy: where AI answers cite it." />
      </div>
      <p className="mt-8 text-[14px] text-[var(--o-muted)]">Our own sites, not customer results. Yours will differ.</p>
    </section>
  );
}

function Shot({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="flex flex-col gap-3">
      <img src={src} alt={alt} className="block w-full rounded-[14px] border border-[var(--o-edge)]" loading="lazy" />
      <figcaption className="text-[14px] text-[var(--o-muted)]">{caption}</figcaption>
    </figure>
  );
}

/* ---------- The offer: one page now, the plan when it opens. The stamp, once. ---------- */
function Offer() {
  return (
    <section className={`${SECTION}`}>
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
      <text fontSize="9.5" fontWeight="700" letterSpacing="1.5" fill="var(--o-action)" fontFamily="var(--o-sans), sans-serif"><textPath href="#oat-stamp-top" startOffset="50%" textAnchor="middle">CHECKED BY A PERSON</textPath></text>
      <text fontSize="8.5" fontWeight="600" letterSpacing="1.4" fill="var(--o-action)" fontFamily="var(--o-sans), sans-serif"><textPath href="#oat-stamp-bot" startOffset="50%" textAnchor="middle">EVERY PAGE</textPath></text>
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
