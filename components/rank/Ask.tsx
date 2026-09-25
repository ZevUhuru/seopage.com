"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export type Source = { n: number; slug: string; title: string; lead: string; label: string; date: string; minutes: number; haystack: string };

const SUGGEST = ["landing page", "AI SEO services", "agencies", "agentic", "best practices"];

/**
 * The index's ask box. Filters the composed answer and its sources in the
 * browser; the full list is server-rendered, so crawlers see every issue.
 */
export function Ask({ sources, base }: { sources: Source[]; base: string }) {
  const [q, setQ] = useState("");
  const hits = useMemo(() => {
    const t = q.trim().toLowerCase();
    return t ? sources.filter((s) => t.split(/\s+/).every((w) => s.haystack.includes(w))) : sources;
  }, [q, sources]);

  return (
    <>
      <label className="mt-10 flex h-16 w-full max-w-[760px] items-center gap-3 rounded-full border border-white/20 bg-[#0A0F1E]/80 pl-6 pr-2 backdrop-blur focus-within:border-[#9DB4FF]">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7D869C" strokeWidth="2" aria-hidden>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <span className="sr-only">Search the journal</span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ask how a page gets cited…"
          className="min-w-0 flex-1 border-0 bg-transparent text-[17px] text-[#EEF2FF] placeholder:text-[#7D869C] focus:outline-none"
        />
        {q && (
          <button onClick={() => setQ("")} className="h-12 rounded-full px-4 text-[14px] text-[#A0A9C0] hover:text-white">
            Clear
          </button>
        )}
      </label>
      <div className="mt-4 flex flex-wrap gap-2">
        {SUGGEST.map((s) => (
          <button key={s} onClick={() => setQ(s)} className="rounded-full border border-white/12 px-3.5 py-1.5 text-[13.5px] text-[#C9D0E2] hover:border-white/40">
            {s}
          </button>
        ))}
      </div>

      {/* ANSWER */}
      <div className="mt-14 max-w-[860px]">
        <p className="flex items-center gap-2 text-[14px] text-[#9DB4FF]">
          <span className="h-2 w-2 rounded-full bg-[#3D6BFF]" />
          {q ? `Answer for “${q}”` : "What we know so far"}
        </p>
        {hits.length ? (
          <p className="mt-4 text-[clamp(21px,2vw,27px)] leading-[1.55] text-[#EEF2FF]">
            {hits.map((s) => (
              <span key={s.slug}>
                {s.lead}
                <Link href={`#src-${s.n}`} className="mx-[0.2em] inline-flex h-[1.3em] min-w-[1.3em] items-center justify-center rounded-[0.32em] bg-[#3D6BFF] px-[0.25em] align-[0.35em] text-[0.55em] font-semibold leading-none text-white hover:bg-[#5A82FF]">
                  {s.n}
                </Link>{" "}
              </span>
            ))}
          </p>
        ) : (
          <p className="mt-4 text-[22px] leading-[1.5] text-[#A0A9C0]">
            We haven&apos;t written that one yet. That&apos;s a gap, and gaps are what we build pages for.
          </p>
        )}
      </div>

      {/* SOURCES */}
      <div className="mt-20 flex items-end justify-between border-b border-white/12 pb-4">
        <h2 className="nh-display text-[28px] tracking-[-0.03em]">Sources</h2>
        <span className="text-[14px] text-[#7D869C]">{hits.length} of {sources.length} issues</span>
      </div>
      <ul className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {hits.map((s) => (
          <li key={s.slug} id={`src-${s.n}`} className="min-w-0 scroll-mt-24">
            <Link href={`${base}/${s.slug}`} className="group flex h-full flex-col gap-4 rounded-[22px] border border-white/12 bg-[#0A0F1E] p-6 transition-colors hover:border-[#3D6BFF]/60">
              <span className="flex min-w-0 items-center gap-3">
                <span className="flex h-7 shrink-0 min-w-7 items-center justify-center rounded-[8px] bg-[#3D6BFF] text-[13px] font-semibold text-white">{s.n}</span>
                <span className="nh-mono truncate text-[12px] text-[#7D869C]">seopage.com{base}/{s.slug}</span>
              </span>
              <span className="nh-display text-[24px] leading-[1.1] tracking-[-0.03em] group-hover:text-[#9DB4FF]">{s.title}</span>
              <span className="mt-auto flex gap-4 text-[13.5px] text-[#A0A9C0]">
                <span className="text-[#9DB4FF]">{s.label}</span>
                <span>{s.date}</span>
                <span>{s.minutes} min</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
