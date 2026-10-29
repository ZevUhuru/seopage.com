"use client";

import { useEffect, useState } from "react";
import { usePersonalize, useVisitor } from "@/components/home/Personalize";
import { CREATE_URL, PRICE_LABEL } from "@/lib/config";

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
          Build it free
        </a>
      </div>
      <ul className="flex flex-wrap gap-x-[22px] gap-y-2 pl-2 text-[14px] text-[var(--o-text2)] sm:pl-5">
        {["Free preview, no card", `${PRICE_LABEL} once, when you publish`, "You own the page"].map((t) => (
          <li key={t} className="flex items-center gap-[7px]">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--o-link)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12.5l4.5 4.5L19 7" /></svg>
            {t}
          </li>
        ))}
      </ul>
    </form>
  );
}

/* The answer that names someone else. Red only on the name and the warning, never as a fill. */
export function OatAlarm() {
  const v = useVisitor();
  return (
    <div className="flex flex-col gap-3 rounded-[14px] border border-[var(--o-edge)] bg-[var(--o-panel)] px-6 py-[22px]">
      <p className="text-[14px] text-[var(--o-muted)]">&ldquo;{v.alarmQuestion}&rdquo;</p>
      <p className="text-[18px] leading-[1.55] text-[var(--o-text)]">
        The one most people recommend is <b className="font-semibold text-[var(--o-danger)]">[the business down the street]</b>. Their page answers pricing and timing directly and lists the areas they serve.
      </p>
      <p className="flex items-center gap-2 text-[14px] text-[var(--o-danger)]">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M12 7v6M12 16.5v.5" /></svg>
        {v.missing}
      </p>
    </div>
  );
}

/* The hero's floating card: someone asks AI, and the answer names the business from the form.
   Labelled as the goal, not a result. Types the question, thinks, then reveals the answer word
   by word, holds, and starts again. Reduced-motion visitors see it finished. */
export function OatAnswer() {
  const { name, service, city } = useVisitor().demo;
  const question = `Who should I call for ${service.toLowerCase()} in ${city}?`;
  // Keyed by the question and name, so typing in the form restarts the card from the top
  return <AnswerCard key={`${question}|${name}`} name={name} question={question} />;
}

function AnswerCard({ name, question }: { name: string; question: string }) {
  const host = `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "your-business"}.seo.page`;
  // The business name is one token, so it lands (and is bolded) as a whole
  const words = [`${name}.`, ..."Their page lists prices for common jobs, how soon they can come, and the neighbourhoods they cover.".split(" ")];

  // step: 0..question.length types the question, then a thinking beat, then words appear
  const thinkAt = question.length + 6;
  const answerAt = thinkAt + 14;
  const end = answerAt + words.length * 2 + 60;
  const [step, setStep] = useState(0);
  const [still, setStill] = useState(false);

  // One clock drives the whole card; reduced motion skips straight to the finished answer
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const t = window.setTimeout(() => setStill(true), 0);
      return () => window.clearTimeout(t);
    }
    const id = window.setInterval(() => setStep((n) => (n >= end ? 0 : n + 1)), 55);
    return () => window.clearInterval(id);
  }, [end]);

  const shownQ = still ? question : question.slice(0, step);
  const thinking = !still && step >= thinkAt && step < answerAt;
  const shownWords = still ? words.length : Math.max(0, Math.floor((step - answerAt) / 2) + 1) * (step >= answerAt ? 1 : 0);
  const [first, ...rest] = words.slice(0, shownWords);

  return (
    <div className="w-[360px] rounded-[18px] border border-white/10 bg-[#0f1a2e]/95 p-5 text-left text-[#eef2ff] shadow-[0_24px_60px_-12px_rgba(4,6,11,.6)] backdrop-blur" aria-label="Example of the answer you want AI to give">
      <p className="mb-3 text-[12px] font-medium text-[#9db4ff]">The answer you want</p>
      <p className="min-h-[22px] rounded-[12px] bg-white/[0.07] px-3.5 py-2.5 text-[14.5px] leading-[1.45] text-[#dfe5f3]">
        {shownQ}<span className={`${still || step >= thinkAt ? "hidden" : "inline-block"} ml-0.5 h-[15px] w-[2px] translate-y-[2px] animate-pulse bg-[#9db4ff]`} />
      </p>
      <div className="mt-3 min-h-[96px] text-[15px] leading-[1.55]">
        {thinking && <span className="inline-flex gap-1 pt-2" aria-hidden>{[0, 1, 2].map((i) => <span key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#9db4ff]" style={{ animationDelay: `${i * 120}ms` }} />)}</span>}
        {shownWords > 0 && (
          <p>
            <b className="font-semibold text-white">{first}</b>{rest.length ? " " + rest.join(" ") : ""}
          </p>
        )}
      </div>
      <p className={`mt-3 inline-flex items-center gap-1.5 rounded-full border border-white/12 px-2.5 py-1 font-mono text-[11.5px] text-[#c9d0e2] transition-opacity duration-500 ${still || shownWords === words.length ? "opacity-100" : "opacity-0"}`}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden><path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" /></svg>
        {host}
      </p>
    </div>
  );
}
