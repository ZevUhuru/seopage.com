"use client";

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
      <div className="flex flex-col gap-3 rounded-[14px] border border-[var(--o-edge-strong)] bg-[var(--o-panel)] p-3 sm:h-16 sm:flex-row sm:items-center sm:gap-0 sm:py-0 sm:pl-5 sm:pr-2">
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
        <a href={CREATE_URL} className="flex h-[48px] shrink-0 items-center justify-center rounded-[10px] bg-[var(--o-action)] px-6 text-[15.5px] font-semibold text-[var(--o-action-ink)] hover:opacity-90">
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
