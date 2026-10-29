"use client";

import { useEffect, useState } from "react";
import { usePersonalize, useVisitor } from "@/components/home/Personalize";
import { CREATE_URL } from "@/lib/config";

/* The hero form and the AI-answer card, drawn from the tone's tokens
   (--o-*) so the same page works on Oat, Navy or black. Same behaviour
   as the live HeroForm and AlarmTranscript. */

export function OatForm() {
  const p = usePersonalize();
  const field = "min-w-0 border-0 bg-transparent text-[16px] text-[var(--o-text)] placeholder:text-[var(--o-muted)] focus:outline-none";
  return (
    <form className="flex w-full flex-col gap-3.5" onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-col gap-3 rounded-[14px] border border-[var(--o-edge-strong)] bg-[var(--o-panel)] p-3 sm:h-16 sm:rounded-[var(--o-rf,14px)] sm:flex-row sm:items-center sm:gap-0 sm:py-0 sm:pl-5 sm:pr-2">
        <label className="flex flex-1">
          <span className="sr-only">Business name</span>
          <input className={`${field} w-full px-2 sm:px-0`} value={p.name} onChange={(e) => p.setName(e.target.value)} placeholder="Your business" />
        </label>
        <span className="mx-3.5 hidden h-6 w-px bg-[var(--o-edge)] sm:block" />
        <label className="flex sm:w-[124px]">
          <span className="sr-only">What you do</span>
          <input className={`${field} w-full px-2 sm:px-0`} value={p.service} onChange={(e) => p.setService(e.target.value)} placeholder="What you do" />
        </label>
        <span className="mx-3.5 hidden h-6 w-px bg-[var(--o-edge)] sm:block" />
        <label className="flex sm:w-[88px]">
          <span className="sr-only">City</span>
          <input className={`${field} w-full px-2 sm:px-0`} value={p.city} onChange={(e) => p.setCity(e.target.value)} placeholder="City" />
        </label>
        <a href={CREATE_URL} className="flex h-[48px] shrink-0 items-center justify-center rounded-[var(--o-r,10px)] bg-[var(--o-action)] px-6 text-[15.5px] font-semibold text-[var(--o-action-ink)] hover:opacity-90">
          Start free
        </a>
      </div>
      <ul className="flex flex-wrap gap-x-[22px] gap-y-2 pl-2 text-[14px] text-[var(--o-text2)] sm:pl-5">
        {["First page free to preview", "Monthly plan from $149, opening soon", "You own every page"].map((t) => (
          <li key={t} className="flex items-center gap-[7px]">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--o-link)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12.5l4.5 4.5L19 7" /></svg>
            {t}
          </li>
        ))}
      </ul>
    </form>
  );
}

/* The visitor's search gap (N1): searches near them, and whether their site has a page for each.
   Sample numbers, labelled as an example. Reads the hero form. */
export function OatGap() {
  const { service, city } = useVisitor().demo;
  const s = service.toLowerCase();
  const t = city.toLowerCase();
  const rows = [
    { q: `${s} cost ${t}`, seen: "880", status: "No page", tone: "miss" },
    { q: `emergency ${s} ${t}`, seen: "390", status: "No page", tone: "miss" },
    { q: `${s} near me`, seen: "1,300", status: "Page 2", tone: "near" },
    { q: `${s} ${t} reviews`, seen: "210", status: "No page", tone: "miss" },
    { q: `${s} company ${t}`, seen: "640", status: "Answered", tone: "ok" },
  ];
  const chip = { miss: "border-[var(--o-danger)]/40 text-[var(--o-danger)]", near: "border-[var(--o-edge-strong)] text-[var(--o-text2)]", ok: "border-[var(--o-link)]/40 text-[var(--o-link)]" } as const;
  return (
    <div className="rounded-[18px] border border-[var(--o-edge)] bg-[var(--o-panel)] p-6">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <span className="text-[15px] font-semibold">Searches near you, and your site</span>
        <span className="text-[13px] text-[var(--o-muted)]">Example</span>
      </div>
      <div className="grid grid-cols-[1fr_auto_auto] gap-x-5 border-b border-[var(--o-edge)] pb-2 text-[12.5px] text-[var(--o-muted)]">
        <span>Search</span><span className="text-right">Seen a month</span><span className="w-[86px]">Your site</span>
      </div>
      <ul>
        {rows.map((r) => (
          <li key={r.q} className="grid grid-cols-[1fr_auto_auto] items-center gap-x-5 border-b border-[var(--o-edge)] py-3 text-[15px] last:border-b-0">
            <span className="truncate">{r.q}</span>
            <span className="text-right font-[family-name:var(--o-mono)] text-[14px] tabular-nums text-[var(--o-text2)]">{r.seen}</span>
            <span className={`w-[86px] rounded-full border px-2.5 py-0.5 text-center text-[12.5px] font-medium ${chip[r.tone as keyof typeof chip]}`}>{r.status}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[14px] leading-[1.55] text-[var(--o-text2)]">Each month SEOPage builds the missing pages first, then the ones you almost win.</p>
    </div>
  );
}

/* The hero's floating card: this month's pages moving through the plan, picked from Search Console,
   researched, scored on the ten checks, ready to approve. Labelled as an example. Each row advances on
   one clock, staggered, and the month starts over. Reduced-motion visitors see every row ready. */
const STAGES = ["Picked from Search Console", "Researching", "Scored on ten checks", "Ready for you"] as const;

export function OatMonth() {
  const { service, city } = useVisitor().demo;
  const pages = [
    { t: `${service} prices in ${city}`, why: "Searched 880 times a month. No page yet." },
    { t: `Emergency ${service.toLowerCase()}, ${city}`, why: "Searched 390 times. No page yet." },
    { t: `${service} near you`, why: "You show up, but on page 2." },
  ];
  const [tick, setTick] = useState(0);
  const [still, setStill] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const t = window.setTimeout(() => setStill(true), 0);
      return () => window.clearTimeout(t);
    }
    // 1.1s a tick; row i starts 2 ticks after row i-1; hold the finished month, then restart
    const id = window.setInterval(() => setTick((n) => (n >= 14 ? 0 : n + 1)), 1100);
    return () => window.clearInterval(id);
  }, []);
  const stageOf = (i: number) => (still ? 3 : Math.max(-1, Math.min(3, tick - i * 2)));
  return (
    <div className="w-[372px] rounded-[18px] border border-white/10 bg-[#0f1a2e]/95 p-5 text-left text-[#eef2ff] shadow-[0_24px_60px_-12px_rgba(4,6,11,.6)] backdrop-blur" aria-label="Example of a month of pages in the plan">
      <div className="mb-3 flex items-baseline justify-between">
        <span className="text-[14px] font-semibold">This month&apos;s pages</span>
        <span className="text-[12px] text-[#9fb0c4]">Example</span>
      </div>
      <ul className="flex flex-col gap-2.5">
        {pages.map((p, i) => {
          const st = stageOf(i);
          const ready = st === 3;
          return (
            <li key={p.t} className={`rounded-[12px] border px-3.5 py-3 transition-colors duration-500 ${ready ? "border-[#9db4ff]/50 bg-[#9db4ff]/[0.08]" : "border-white/10 bg-white/[0.04]"} ${st < 0 ? "opacity-40" : "opacity-100"}`}>
              <div className="flex items-start justify-between gap-3">
                <span className="text-[14.5px] font-medium leading-[1.35]">{p.t}</span>
                {ready && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9db4ff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0" aria-hidden><path d="M5 12.5l4.5 4.5L19 7" /></svg>}
              </div>
              <p className="mt-0.5 text-[12.5px] text-[#9fb0c4]">{p.why}</p>
              <div className="mt-2.5 flex items-center gap-2">
                <span className="flex gap-1" aria-hidden>{STAGES.map((_, k) => <span key={k} className={`h-1 w-6 rounded-full transition-colors duration-500 ${k <= st ? "bg-[#9db4ff]" : "bg-white/12"}`} />)}</span>
                <span className="text-[12px] text-[#c9d0e2]">{st < 0 ? "Up next" : STAGES[st]}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
