"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";

/* ============================================================
   The Answer Console — section 01's proof, performed.

   The visitor watches an assistant answer the question their own
   customers are asking, and it names the competitor. Then they flip
   one switch and watch the same answer name them instead. The
   argument of the section is that the answer only has room for one
   name; this lets the reader cause the swap themselves.

   Everything here is scripted. No network, no model, no libraries.
   ============================================================ */

type Segment = { t: string; mark?: boolean };

type Variant = {
  /** The answer, split so the business name can be highlighted atomically. */
  answer: Segment[];
  sources: string[];
  /** The absence line. Present only while the visitor is losing the answer. */
  missing: string | null;
  /** Status label above the turn. */
  label: string;
};

type Script = { question: string; before: Variant; after: Variant };

/** Who the visitor is, once they've told us. Optional the whole way through. */
type Biz = { name: string; trade: string; city: string };

const DEMO: Script = {
  question: "Who does emergency roof repair in Denver?",
  before: {
    label: "The AI answer in your market · today",
    answer: [
      { t: "For urgent roof repair in Denver, most sources point to " },
      { t: "Apex Roofing", mark: true },
      {
        t: ", a licensed crew offering 24/7 storm response and free inspections.",
      },
    ],
    sources: ["apexroofingdenver.com"],
    missing: "summitroofing.com — not cited",
  },
  after: {
    label: "The same answer · with your SEOPage live",
    answer: [
      { t: "For urgent roof repair in Denver, a strong option is " },
      { t: "Summit Roofing Co.", mark: true },
      {
        t: ", a licensed, insured crew offering 24/7 storm response and free same-day inspections.",
      },
    ],
    sources: ["summitroofing.com"],
    missing: null,
  },
};

/** "Emergency Plumbing" mid-sentence reads like a brand. Lower it unless the
    visitor meant the capitals (HVAC, IT support). */
function sentenceCase(s: string) {
  if (!s) return s;
  const first = s.slice(0, 2);
  if (first === first.toUpperCase() && /[A-Z]{2}/.test(first)) return s;
  return s[0].toLowerCase() + s.slice(1);
}

/**
 * The visitor's own version. The competitor is never given a name: inventing
 * one inside somebody's real market could land on a real business, and the
 * argument doesn't need it. The line that has to land is their own name in
 * the "not cited" slot.
 */
function scriptFor(biz: Biz | null): Script {
  if (!biz) return DEMO;
  const trade = sentenceCase(biz.trade);
  const where = `${trade} in ${biz.city}`;
  return {
    question: `Who does ${where}?`,
    before: {
      label: "The AI answer in your market · today",
      answer: [
        { t: `For ${where}, most sources point to ` },
        { t: "a competitor down the road", mark: true },
        { t: ", whose page answers this exact question." },
      ],
      sources: ["a competitor's site"],
      missing: `${biz.name} — not cited`,
    },
    after: {
      label: "The same answer · with your SEOPage live",
      answer: [
        { t: `For ${where}, a strong option is ` },
        { t: biz.name, mark: true },
        { t: ", the one with the clearest page on exactly this question." },
      ],
      sources: [biz.name],
      missing: null,
    },
  };
}

/** Beat timings, in ms. The pauses carry as much as the motion does. */
const T = {
  charType: 34,
  afterQuestion: 420,
  thinking: 720,
  word: 46,
  beforeSources: 480,
  betweenChips: 180,
  beforeMissing: 620,
};

type Token = { t: string; mark: boolean };

/** Words stream one at a time; a highlighted name arrives whole. */
function tokenize(answer: Segment[]): Token[] {
  return answer.flatMap<Token>((seg) =>
    seg.mark
      ? [{ t: seg.t, mark: true }]
      : seg.t
          .split(/(?<=\s)/)
          .filter(Boolean)
          .map((t) => ({ t, mark: false })),
  );
}

function plain(answer: Segment[]) {
  return answer.map((s) => s.t).join("");
}

/** Where the scripted run has got to. One object, so a flip resets atomically. */
type Run = {
  key: string;
  chars: number;
  thinking: boolean;
  words: number;
  chips: number;
  missing: boolean;
  settled: string;
};

/**
 * The opening frame for a run. Before the console is scrolled into view it is
 * empty; for a reader who prefers reduced motion it opens already finished, so
 * the switch still works and only the motion is dropped.
 */
function openingFrame(
  key: string,
  question: string,
  variant: Variant,
  started: boolean,
  reduced: boolean,
): Run {
  if (started && reduced) {
    return {
      key,
      chars: question.length,
      thinking: false,
      words: tokenize(variant.answer).length,
      chips: variant.sources.length,
      missing: Boolean(variant.missing),
      settled: plain(variant.answer),
    };
  }
  return {
    key,
    chars: 0,
    thinking: false,
    words: 0,
    chips: 0,
    missing: false,
    settled: "",
  };
}

/** Subscribe to the motion preference, and keep honouring it if it changes. */
const MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeMotion(onChange: () => void) {
  const mq = window.matchMedia(MOTION_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export default function AnswerConsole() {
  const [published, setPublished] = useState(false);
  const [started, setStarted] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const reduced = useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia(MOTION_QUERY).matches,
    () => false,
  );

  // Personalization is a second act, never a gate: the console plays the
  // worked example first, and only a reader already leaning in spends three
  // fields to see their own name in it.
  const [biz, setBiz] = useState<Biz | null>(null);
  const [editing, setEditing] = useState(false);

  const script = useMemo(() => scriptFor(biz), [biz]);
  const variant = published ? script.after : script.before;
  const tokens = useMemo(() => tokenize(variant.answer), [variant]);

  // A run is identified by everything that should restart it. When any of them
  // changes, the run is reset during render rather than in an effect, so the
  // console never paints a frame of the old answer under the new state.
  const runKey = `${published ? "after" : "before"}:${started}:${reduced}:${
    biz ? `${biz.name}|${biz.trade}|${biz.city}` : "demo"
  }`;
  const [run, setRun] = useState<Run>(() =>
    openingFrame(runKey, script.question, variant, started, reduced),
  );
  if (run.key !== runKey) {
    setRun(openingFrame(runKey, script.question, variant, started, reduced));
  }

  const advance = useCallback(
    (key: string, patch: Partial<Run>) =>
      setRun((prev) => (prev.key === key ? { ...prev, ...patch } : prev)),
    [],
  );

  // Start on arrival, not on mount: a section that finishes animating before
  // the reader gets there has spent itself on nobody.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || started) return;

    if (typeof IntersectionObserver === "undefined") {
      const id = window.setTimeout(() => setStarted(true), 0);
      return () => clearTimeout(id);
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [started]);

  // The scripted run. The cleanup abandons any stream still in flight, so a
  // mid-stream flip never double-types.
  useEffect(() => {
    if (!started || reduced) return;

    let cancelled = false;
    const timers: number[] = [];
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(window.setTimeout(resolve, ms));
      });

    const key = runKey;
    const full = tokens.length;
    const settledText = plain(variant.answer);

    (async () => {
      for (let i = 1; i <= script.question.length; i++) {
        await wait(T.charType);
        if (cancelled) return;
        advance(key, { chars: i });
      }

      await wait(T.afterQuestion);
      if (cancelled) return;
      advance(key, { thinking: true });

      await wait(T.thinking);
      if (cancelled) return;
      advance(key, { thinking: false });

      for (let i = 1; i <= full; i++) {
        await wait(T.word);
        if (cancelled) return;
        advance(key, { words: i });
      }

      // The answer reaches the live region only once it has settled; a region
      // that fires per word is unusable with a screen reader.
      advance(key, { settled: settledText });

      await wait(T.beforeSources);
      for (let i = 1; i <= variant.sources.length; i++) {
        if (cancelled) return;
        advance(key, { chips: i });
        await wait(T.betweenChips);
      }

      if (variant.missing) {
        await wait(T.beforeMissing);
        if (cancelled) return;
        advance(key, { missing: true });
      }
    })();

    return () => {
      cancelled = true;
      timers.forEach((id) => clearTimeout(id));
    };
  }, [started, reduced, runKey, tokens, variant, script, advance]);

  const { chars, thinking, words, chips, missing, settled } = run;
  const typing = started && chars < script.question.length && !reduced;

  return (
    <div ref={rootRef}>
      <div className="card overflow-hidden shadow-lg">
        {/* Console chrome. Deliberately generic — this is an assistant, not a
            named product, and it should never read as an impersonation. */}
        <div className="flex items-center gap-2 border-b border-line px-5 py-3 sm:px-6">
          <span
            className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${
              published ? "bg-good" : "bg-[#e0584b]"
            }`}
          />
          <span className="mono text-[10px] uppercase tracking-[0.14em] text-muted">
            Ask an AI assistant
          </span>
          <span className="mono ml-auto text-[10px] uppercase tracking-[0.14em] text-muted">
            {variant.label}
          </span>
        </div>

        {/* The thread. Both variants are rendered in full and hidden in the
            same grid cell, so the console is always as tall as its tallest
            possible state and never shifts the page under the reader. */}
        <div className="grid px-5 py-6 sm:px-6">
          <div className="invisible col-start-1 row-start-1" aria-hidden>
            <Thread
              question={script.question}
              variant={script.before}
              tokens={tokenize(script.before.answer)}
            />
          </div>
          <div className="invisible col-start-1 row-start-1" aria-hidden>
            <Thread
              question={script.question}
              variant={script.after}
              tokens={tokenize(script.after.answer)}
            />
          </div>

          <div className="col-start-1 row-start-1">
            <Thread
              question={script.question}
              variant={variant}
              tokens={tokens}
              chars={chars}
              typing={typing}
              thinking={thinking}
              words={words}
              chips={chips}
              missing={missing}
            />
          </div>
        </div>

        {/* The control. The whole pitch, compressed into one gesture. */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-line bg-surface-2 px-5 py-4 sm:px-6">
          <button
            type="button"
            role="switch"
            aria-checked={published}
            onClick={() => setPublished((p) => !p)}
            className="group flex items-center gap-3 rounded-md text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-2"
          >
            <span
              className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors duration-300 ${
                published
                  ? "border-accent bg-accent"
                  : "border-line-strong bg-surface group-hover:border-muted"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${
                  published ? "translate-x-6" : "translate-x-1"
                } ${published ? "" : "border border-line-strong"}`}
              />
            </span>
            <span className="text-[0.92rem] font-semibold text-ink">
              Publish your SEOPage
            </span>
          </button>

          <span className="mono ml-auto text-[10px] uppercase tracking-[0.14em] text-muted">
            {published
              ? "You are the answer"
              : "Flip it and watch the answer change"}
          </span>
        </div>

        {/* Second act. Nothing here is required to understand the section. */}
        <div className="border-t border-line px-5 py-3 sm:px-6">
          {editing ? (
            <BizForm
              initial={biz}
              onCancel={() => setEditing(false)}
              onApply={(next) => {
                setBiz(next);
                setPublished(false);
                setEditing(false);
              }}
            />
          ) : (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="text-[0.85rem] font-semibold text-accent underline underline-offset-4 hover:text-accent-strong"
              >
                {biz ? "Change your details" : "Try it with your business"}
              </button>
              {biz && (
                <>
                  <span className="text-[0.85rem] text-muted">
                    Showing {biz.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setBiz(null);
                      setPublished(false);
                    }}
                    className="text-[0.85rem] text-muted underline underline-offset-4 hover:text-ink"
                  >
                    Use the example instead
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* The demo is more persuasive for being plainly a demo. */}
        <div className="border-t border-line px-5 py-2.5 sm:px-6">
          <p className="mono text-[9px] uppercase tracking-[0.14em] text-muted">
            {biz
              ? "Simulated · we haven't checked your actual citations"
              : "Illustrative example · not a recorded AI response"}
          </p>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {settled}
      </p>
    </div>
  );
}

/**
 * One question-and-answer exchange. Rendered live with cursors, or fully and
 * hidden as a height reservation — the defaults fill everything in.
 */
function Thread({
  question,
  variant,
  tokens,
  chars = Number.MAX_SAFE_INTEGER,
  typing = false,
  thinking = false,
  words,
  chips,
  missing = true,
}: {
  question: string;
  variant: Variant;
  tokens: Token[];
  chars?: number;
  typing?: boolean;
  thinking?: boolean;
  words?: number;
  chips?: number;
  missing?: boolean;
}) {
  const shown = words ?? tokens.length;
  const chipCount = chips ?? variant.sources.length;

  return (
    <div>
      {/* The customer's question. */}
      <div className="flex justify-end">
        <p className="max-w-[85%] rounded-xl rounded-br-sm bg-surface-3 px-4 py-2.5 text-[0.92rem] leading-relaxed text-ink">
          {question.slice(0, chars) || "​"}
          {typing && <span className="caret" aria-hidden />}
        </p>
      </div>

      {/* The answer, flush left the way every assistant renders it. */}
      <div className="mt-5 min-h-[1.5rem]">
        {thinking ? (
          <span className="inline-flex items-center gap-1.5" aria-hidden>
            <Dot i={0} />
            <Dot i={1} />
            <Dot i={2} />
          </span>
        ) : (
          <p className="text-[0.95rem] leading-relaxed text-ink-2">
            {tokens.slice(0, shown).map((tok, i) =>
              tok.mark ? (
                <span
                  key={i}
                  className={`font-semibold text-ink underline decoration-2 underline-offset-2 ${
                    variant.missing
                      ? "decoration-[#e0584b]"
                      : "decoration-accent"
                  }`}
                >
                  {tok.t}
                </span>
              ) : (
                <span key={i}>{tok.t}</span>
              ),
            )}
          </p>
        )}
      </div>

      {/* Sources, and the absence that costs you the job. */}
      <div className="mt-5 flex min-h-[2rem] flex-wrap items-center gap-2 border-t border-line pt-4">
        <span className="mono text-[10px] uppercase tracking-wider text-muted">
          Sources
        </span>
        {variant.sources.slice(0, chipCount).map((s) => (
          <span key={s} className="pill chip-in text-[0.72rem]">
            {s}
          </span>
        ))}
        {variant.missing && missing && (
          <span className="mono chip-in ml-auto text-[10px] uppercase tracking-wider text-[#b42318]">
            {variant.missing}
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * Three fields, all required, because a name without a trade and a city
 * produces a dentist being recommended for emergency roof repair. Capped
 * lengths keep a long paste from breaking the answer's line.
 */
function BizForm({
  initial,
  onApply,
  onCancel,
}: {
  initial: Biz | null;
  onApply: (b: Biz) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [trade, setTrade] = useState(initial?.trade ?? "");
  const [city, setCity] = useState(initial?.city ?? "");

  const clean = (v: string) => v.trim().replace(/\s+/g, " ").slice(0, 48);
  const ready = clean(name) && clean(trade) && clean(city);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!ready) return;
        onApply({
          name: clean(name),
          trade: clean(trade),
          city: clean(city),
        });
      }}
    >
      <div className="grid gap-2 sm:grid-cols-3">
        <MiniField
          label="Business name"
          placeholder="Summit Roofing Co."
          value={name}
          onChange={setName}
          autoFocus
        />
        <MiniField
          label="What you do"
          placeholder="emergency roof repair"
          value={trade}
          onChange={setTrade}
        />
        <MiniField
          label="City"
          placeholder="Denver"
          value={city}
          onChange={setCity}
        />
      </div>
      <div className="mt-3 flex items-center gap-3">
        <button
          type="submit"
          disabled={!ready}
          className="btn btn-accent btn-md disabled:cursor-not-allowed disabled:opacity-40"
        >
          Run it with my name
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-[0.85rem] text-muted underline underline-offset-4 hover:text-ink"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function MiniField({
  label,
  value,
  onChange,
  placeholder,
  autoFocus,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}) {
  return (
    <label className="block">
      <span className="mono text-[9px] uppercase tracking-[0.14em] text-muted">
        {label}
      </span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        autoFocus={autoFocus}
        maxLength={48}
        onChange={(e) => onChange(e.target.value)}
        className="field mt-1 !py-2 text-[0.9rem]"
      />
    </label>
  );
}

function Dot({ i }: { i: number }) {
  return (
    <span
      className="think-dot h-1.5 w-1.5 rounded-full bg-muted"
      style={{ animationDelay: `${i * 0.16}s` }}
    />
  );
}
