"use client";

import { useEffect, useState } from "react";
import type { StepState } from "@/lib/types";

const DEFAULT_STEPS: StepState[] = [
  { key: "research", label: "Researching your market", status: "active" },
  { key: "analysis", label: "Analyzing local search intent", status: "waiting" },
  { key: "copy", label: "Writing your page", status: "waiting" },
  { key: "seo", label: "Optimizing for Google & AI search", status: "waiting" },
  { key: "build", label: "Designing & building your page", status: "waiting" },
];

const REASSURANCE = [
  "We're actually researching your market, not filling in a template.",
  "Finding the keywords and questions your customers really search.",
  "Writing copy that sounds like a real person from your town.",
  "Adding the schema so Google and AI tools can read your page.",
];

export function GeneratingView({
  businessName,
  steps,
  error,
  onRetry,
}: {
  businessName: string;
  steps: StepState[];
  error: string | null;
  onRetry: () => void;
}) {
  const list = steps.length ? steps : DEFAULT_STEPS;
  const done = list.filter((s) => s.status === "done").length;
  const progress = Math.min(
    96,
    Math.round(((done + (list.some((s) => s.status === "active") ? 0.5 : 0)) /
      list.length) *
      100),
  );

  const [tip, setTip] = useState(0);
  useEffect(() => {
    if (error) return;
    const t = setInterval(() => setTip((i) => (i + 1) % REASSURANCE.length), 3200);
    return () => clearInterval(t);
  }, [error]);

  if (error) {
    return (
      <div className="mx-auto max-w-lg px-5 py-20 text-center sm:px-8">
        <div className="card p-8">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#fdecea] text-[#b42318]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 8v5M12 16.5h.01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          <h2 className="display mt-5 text-2xl text-ink">
            That didn&apos;t go through.
          </h2>
          <p className="mt-3 text-ink-2">{error}</p>
          <button onClick={onRetry} className="btn btn-primary btn-lg mt-6">
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-5 py-16 sm:px-8 lg:py-20">
      <div className="text-center">
        <span className="kicker">Generating</span>
        <h2 className="display mt-3 text-3xl text-ink sm:text-4xl">
          Building{" "}
          <span className="text-accent">
            {businessName.trim() || "your"}
          </span>
          {businessName.trim().endsWith("s") ? "'" : "’s"} page
        </h2>
        <p className="mt-3 text-ink-2">
          Hang tight. This usually takes 30 to 90 seconds.
        </p>
      </div>

      {/* Progress bar */}
      <div className="mt-8 h-2 w-full overflow-hidden rounded-full bg-surface-2">
        <div
          className="h-full rounded-full bg-accent transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Steps */}
      <ul className="card mt-6 divide-y divide-line p-2">
        {list.map((s) => (
          <li key={s.key} className="flex items-center gap-4 px-4 py-4">
            <StepIcon status={s.status} />
            <span
              className={`text-[0.97rem] ${
                s.status === "done"
                  ? "text-muted"
                  : s.status === "active"
                    ? "font-semibold text-ink"
                    : "text-muted"
              }`}
            >
              {s.label}
            </span>
            {s.status === "active" && (
              <span className="mono ml-auto text-[11px] uppercase tracking-wider text-accent">
                Working
              </span>
            )}
            {s.status === "done" && (
              <span className="ml-auto text-good">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12.5 10 17l9-10"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            )}
          </li>
        ))}
      </ul>

      <p className="mt-6 text-center text-sm text-muted transition-opacity duration-500">
        {REASSURANCE[tip]}
      </p>
    </div>
  );
}

function StepIcon({ status }: { status: StepState["status"] }) {
  if (status === "done") {
    return (
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-good-soft text-good">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 12.5 10 17l9-10"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  }
  if (status === "active") {
    return (
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent-soft">
        <span className="spin h-4 w-4 rounded-full border-2 border-accent/30 border-t-accent" />
      </span>
    );
  }
  return (
    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-surface-2">
      <span className="h-2 w-2 rounded-full bg-line-strong" />
    </span>
  );
}
