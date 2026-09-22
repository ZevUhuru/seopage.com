"use client";

import { useEffect, useState } from "react";
import { usePersonalize, useVisitor } from "./Personalize";
import { CREATE_URL } from "@/lib/config";

const WORDS = ["The", "one", "most", "people", "recommend", "is"];

/** The AI answer that streams in and names SEOPage (or the visitor's business). */
export function HeroAnswer() {
  const v = useVisitor();
  // A new key remounts the stream, so it replays whenever the named business changes.
  return <StreamedAnswer key={v.displayName + v.question} v={v} />;
}

function StreamedAnswer({ v }: { v: ReturnType<typeof useVisitor> }) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setInterval(
      () => setShown((n) => (reduced ? WORDS.length + 1 : n > WORDS.length ? n : n + 1)),
      reduced ? 0 : 180,
    );
    return () => clearInterval(t);
  }, []);

  const done = shown > WORDS.length;
  return (
    <div
      className="w-full max-w-[470px] rounded-[18px] border border-white/15 bg-[#0A0F1E]/80 px-5 py-[18px] backdrop-blur-md"
    >
      <p className="text-[13px] text-[#A0A9C0]">{v.question}</p>
      <p className="mt-2 text-[18px] leading-[1.45]">
        {WORDS.slice(0, Math.min(shown, WORDS.length)).join(" ")}{" "}
        {done ? (
          <>
            <b className="nh-named inline-block font-semibold text-[#9DB4FF]">{v.displayName}.</b>
            <sup className="ml-1 rounded bg-[#3D6BFF] px-[5px] py-px text-[11px] font-semibold text-white">1</sup>
          </>
        ) : (
          <span className="nh-caret" aria-hidden />
        )}
      </p>
      <p className="nh-mono mt-2 text-[11.5px] text-[#7D869C]">1 · {v.host}</p>
    </div>
  );
}

/** The hero's pill form. Typing personalizes the page; the button starts the builder. */
export function HeroForm() {
  const p = usePersonalize();
  const field = "min-w-0 border-0 bg-transparent text-[16px] text-[#EEF2FF] placeholder:text-[#7D869C] focus:outline-none";
  return (
    <form className="flex w-full flex-col gap-3.5" onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-col gap-3 rounded-[24px] border border-white/20 bg-[#0A0F1E]/80 p-3 backdrop-blur-md sm:h-16 sm:flex-row sm:items-center sm:gap-0 sm:rounded-full sm:py-0 sm:pl-6 sm:pr-1.5">
        <label className="flex flex-1">
          <span className="sr-only">Business name</span>
          <input className={`${field} w-full px-2 sm:px-0`} value={p.name} onChange={(e) => p.setName(e.target.value)} placeholder="Your business" />
        </label>
        <span className="mx-3.5 hidden h-6 w-px bg-white/15 sm:block" />
        <label className="flex sm:w-[124px]">
          <span className="sr-only">What you do</span>
          <input className={`${field} w-full px-2 sm:px-0`} value={p.service} onChange={(e) => p.setService(e.target.value)} placeholder="What you do" />
        </label>
        <span className="mx-3.5 hidden h-6 w-px bg-white/15 sm:block" />
        <label className="flex sm:w-[88px]">
          <span className="sr-only">City</span>
          <input className={`${field} w-full px-2 sm:px-0`} value={p.city} onChange={(e) => p.setCity(e.target.value)} placeholder="City" />
        </label>
        <a
          href={CREATE_URL}
          className="flex h-[52px] shrink-0 items-center justify-center rounded-full bg-[#3D6BFF] px-6 text-[15.5px] font-semibold text-white transition-colors hover:bg-[#5A82FF]"
        >
          Build it free
        </a>
      </div>
      <ul className="flex flex-wrap gap-x-[22px] gap-y-2 pl-2 text-[14px] text-[#C9D0E2] sm:pl-6">
        {["Free preview, no card", "$149 launch price, once", "You own the page"].map((t) => (
          <li key={t} className="flex items-center gap-[7px]">
            <Tick />
            {t}
          </li>
        ))}
      </ul>
    </form>
  );
}

/** The alarm section's transcript: the answer names someone else. */
export function AlarmTranscript() {
  const v = useVisitor();
  return (
    <div className="mt-2 flex flex-col gap-3 rounded-[18px] border border-[#FF5A4A]/25 bg-[#0A0F1E] px-6 py-[22px]">
      <p className="text-[14px] text-[#A0A9C0]">&ldquo;{v.alarmQuestion}&rdquo;</p>
      <p className="text-[18px] leading-[1.55]">
        The one most people recommend is{" "}
        <b className="font-semibold text-[#FF6B5C]">[the business down the street]</b>. Their page
        answers pricing and timing directly and lists the areas they serve.
      </p>
      <p className="flex items-center gap-2 text-[14px] text-[#FF8A7D]">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v6M12 16.5v.5" />
        </svg>
        {v.missing}
      </p>
    </div>
  );
}

export function Tick({ color = "#9DB4FF" }: { color?: string }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12.5l4.5 4.5L19 7" />
    </svg>
  );
}
