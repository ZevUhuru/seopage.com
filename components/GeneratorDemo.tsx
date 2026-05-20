"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { demoOpportunities, type Opportunity } from "@/lib/data";

type Phase = "idle" | "scanning" | "ready";

const PRESETS = [
  { label: "clip.art", value: "https://clip.art" },
  { label: "canva.com", value: "https://canva.com" },
  { label: "webflow.com", value: "https://webflow.com" },
  { label: "linear.app", value: "https://linear.app" },
];

const SCAN_LINES = [
  "Reading the product context…",
  "Finding competitor-style page angles…",
  "Matching ideas to page types…",
  "Generating titles, sections, and FAQs…",
  "Preparing export options…",
];

export function GeneratorDemo() {
  const [url, setUrl] = useState("https://clip.art");
  const [phase, setPhase] = useState<Phase>("ready");
  const [scanLine, setScanLine] = useState(0);
  const [revealCount, setRevealCount] = useState(demoOpportunities.length);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const opportunities = useMemo<Opportunity[]>(() => demoOpportunities, []);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  function run() {
    if (timer.current) clearTimeout(timer.current);
    setPhase("scanning");
    setScanLine(0);
    setRevealCount(0);

    let i = 0;
    const tick = () => {
      i += 1;
      if (i < SCAN_LINES.length) {
        setScanLine(i);
        timer.current = setTimeout(tick, 520);
      } else {
        setPhase("ready");
        // Stagger the reveal of opportunity rows.
        let r = 1;
        const reveal = () => {
          setRevealCount(r);
          if (r < opportunities.length) {
            r += 1;
            timer.current = setTimeout(reveal, 140);
          }
        };
        reveal();
      }
    };
    timer.current = setTimeout(tick, 380);
  }

  function reset() {
    if (timer.current) clearTimeout(timer.current);
    setPhase("idle");
    setScanLine(0);
    setRevealCount(0);
  }

  return (
    <div
      id="generate"
      className="overflow-hidden rounded-3xl border border-[var(--rule)] bg-[var(--paper)] shadow-[0_24px_70px_-36px_rgba(17,20,17,0.45)]"
    >
      <div className="border-b border-[var(--rule)] bg-[var(--background)] px-5 py-4 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="eyebrow">Opportunity builder</p>
            <h2 className="mt-1 text-base font-semibold text-[var(--ink)]">
              Find page ideas from a URL
            </h2>
          </div>
          <span className="rounded-full border border-[var(--rule)] bg-[var(--paper)] px-3 py-1 text-xs font-medium text-[var(--ink-soft)]">
            Demo
          </span>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex items-center gap-2 rounded-2xl border border-[var(--rule)] bg-[var(--paper)] p-2 shadow-sm">
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-[var(--muted)]" fill="none">
            <path d="M5 12h14M12 5a14 14 0 010 14M12 5a14 14 0 000 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") run();
            }}
            spellCheck={false}
            placeholder="Paste your URL or describe your niche"
            className="w-full bg-transparent px-1 text-sm text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none"
          />
          <button
            type="button"
            onClick={phase === "idle" ? run : reset}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              phase === "idle"
                ? "bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--ink-soft)]"
                : "border border-[var(--rule-strong)] bg-transparent text-[var(--ink)] hover:bg-[var(--paper-soft)]"
            }`}
          >
            {phase === "idle" ? "Generate" : "Reset"}
          </button>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="eyebrow mr-1">Try</span>
          {PRESETS.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => {
                setUrl(p.value);
                setPhase("idle");
                setRevealCount(0);
              }}
              className="rounded-full border border-[var(--rule)] bg-[var(--background)] px-3 py-1.5 text-xs text-[var(--ink-soft)] transition hover:border-[var(--rule-strong)] hover:bg-[var(--paper-soft)]"
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--background)]">
          <div className="flex items-center justify-between border-b border-[var(--rule)] bg-[var(--paper)] px-4 py-3">
            <div className="flex items-center gap-2 text-xs">
              <StatusDot phase={phase} />
              <span className="mono uppercase tracking-[0.18em] text-[var(--muted)]">
              {phase === "idle" && "Ready for a URL"}
                {phase === "scanning" && `Demo workflow · ${url.replace(/^https?:\/\//, "")}`}
              {phase === "ready" && `Page ideas for ${url.replace(/^https?:\/\//, "")}`}
              </span>
            </div>
            {phase === "ready" ? (
              <span className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--signal-deep)]">
                {opportunities.length} page ideas
              </span>
            ) : null}
          </div>

          {phase === "idle" ? <IdleState /> : null}
          {phase === "scanning" ? <ScanningState lineIndex={scanLine} /> : null}
          {phase === "ready" ? (
            <OpportunityTable opportunities={opportunities} reveal={revealCount} />
          ) : null}
        </div>

        <p className="mt-3 text-center text-xs text-[var(--muted)]">
          Example opportunities. Request a sample to see pages for your own site.
        </p>
      </div>
    </div>
  );
}

function StatusDot({ phase }: { phase: Phase }) {
  const color =
    phase === "scanning"
      ? "bg-[var(--warn)]"
      : phase === "ready"
        ? "bg-[var(--signal-deep)]"
        : "bg-[var(--muted)]";
  return (
    <span className="relative inline-flex h-2 w-2">
      <span className={`absolute inset-0 rounded-full ${color} ${phase === "scanning" ? "pulse-dot" : ""}`} />
    </span>
  );
}

function IdleState() {
  return (
    <div className="grid-bg flex min-h-[300px] flex-col items-center justify-center p-10 text-center">
      <div className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
        Ready when you are
      </div>
      <p className="mt-4 max-w-md text-xl font-semibold leading-snug text-[var(--ink)]">
        Press <span className="mark">Generate</span> to see the kind of page ideas
        SEOPage can create for a site.
      </p>
      <div className="mt-6 flex items-center gap-2 text-xs text-[var(--muted)]">
        <Kbd>⌘</Kbd>
        <span>+</span>
        <Kbd>↵</Kbd>
        <span>from the input</span>
      </div>
    </div>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <span className="mono rounded-md border border-[var(--rule)] bg-[var(--paper)] px-1.5 py-0.5 text-[11px] text-[var(--ink-soft)]">
      {children}
    </span>
  );
}

function ScanningState({ lineIndex }: { lineIndex: number }) {
  return (
    <div className="grid gap-6 bg-[var(--paper)] p-6 md:grid-cols-[1fr_1px_1fr]">
      <ul className="space-y-3">
        {SCAN_LINES.map((line, i) => {
          const done = i < lineIndex;
          const active = i === lineIndex;
          return (
            <li key={line} className="flex items-start gap-3 text-sm">
              <span
                className={`mt-0.5 grid h-5 w-5 place-items-center rounded-full border ${
                  done
                    ? "border-[var(--signal-deep)] bg-[var(--signal-deep)] text-[var(--paper)]"
                    : active
                      ? "border-[var(--warn)] bg-[var(--paper-soft)] text-[var(--warn)]"
                      : "border-[var(--rule)] bg-[var(--paper)] text-[var(--muted)]"
                }`}
              >
                {done ? (
                  <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 6.5L5 9l5-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : active ? (
                  <span className="h-2 w-2 rounded-full bg-[var(--warn)] pulse-dot" />
                ) : (
                  <span className="text-[10px]">{i + 1}</span>
                )}
              </span>
              <span className={done ? "text-[var(--ink)]" : active ? "text-[var(--ink)]" : "text-[var(--muted)]"}>
                {line}
              </span>
            </li>
          );
        })}
      </ul>

      <div aria-hidden="true" className="hidden bg-[var(--rule)] md:block" />

      <div className="space-y-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="shimmer h-9 rounded-lg"
            style={{ opacity: 1 - i * 0.12 }}
          />
        ))}
      </div>
    </div>
  );
}

function OpportunityTable({
  opportunities,
  reveal,
}: {
  opportunities: Opportunity[];
  reveal: number;
}) {
  const rows = opportunities.slice(0, reveal);
  return (
    <div className="divide-y divide-[var(--rule)] bg-[var(--paper)]">
      <div className="mono grid grid-cols-[1fr_auto_auto_auto] gap-4 bg-[var(--background)] px-5 py-2.5 text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
        <span>Page</span>
        <span className="hidden sm:inline">Type</span>
        <span className="hidden sm:inline text-right">Volume / mo</span>
        <span className="text-right">Action</span>
      </div>
      {rows.map((row, i) => (
        <OpportunityRow key={row.query} row={row} index={i} />
      ))}
      {reveal >= opportunities.length ? (
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[var(--background)] px-5 py-4 text-sm">
          <span className="text-[var(--ink-soft)]">
            Buy a pack when you want to generate and export pages for your site.
          </span>
          <Link
            href="/pricing"
            className="rounded-full bg-[var(--ink)] px-4 py-2 text-xs font-medium text-[var(--paper)] transition hover:bg-[var(--ink-soft)]"
          >
            See SEO landing page packs →
          </Link>
        </div>
      ) : null}
    </div>
  );
}

function OpportunityRow({ row, index }: { row: Opportunity; index: number }) {
  const typeChip =
    row.type === "vs"
      ? "Comparison"
      : row.type === "alt"
        ? "Alternative"
        : row.type === "best"
          ? "Best-of"
          : row.type === "faq"
            ? "FAQ"
            : "Category";
  return (
    <div
      className="rise grid grid-cols-[1fr_auto] items-center gap-4 px-5 py-3.5 text-sm sm:grid-cols-[1fr_auto_auto_auto]"
      style={{ animationDelay: `${index * 30}ms` }}
    >
      <div className="min-w-0">
        <div className="truncate text-[var(--ink)]">{row.query}</div>
        <div className="mono mt-1 text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]">
          Difficulty {row.difficulty} · {row.intent}
        </div>
      </div>
      <span className="hidden rounded-full border border-[var(--rule)] bg-[var(--paper)] px-2.5 py-1 text-[11px] text-[var(--ink-soft)] sm:inline">
        {typeChip}
      </span>
      <span className="mono hidden text-right text-[var(--ink-soft)] tabular-nums sm:inline">
        {row.volume.toLocaleString()}
      </span>
      <button
        type="button"
        className="rounded-full bg-[var(--signal)] px-3 py-1.5 text-[11px] font-medium text-[var(--signal-deep)] transition hover:brightness-95"
      >
        Generate
      </button>
    </div>
  );
}
