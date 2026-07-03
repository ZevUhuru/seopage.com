/**
 * A faithful, hand-built reproduction of the create.seopage.com intake
 * screen (dark UI), with a generation-progress card overlapping it.
 * Rendered as HTML rather than a screenshot so it stays crisp at any
 * size and never goes stale.
 */

const FIELDS: { label: string; value: string; hint?: string }[] = [
  { label: "Business name", value: "Summit Roofing Co." },
  { label: "What you do", value: "Roof repair and replacement" },
  {
    label: "City / service area",
    value: "Denver, CO",
    hint: "This is what makes it a local page.",
  },
];

export function IntakeMock() {
  return (
    <div className="relative">
      <div className="frame-offset overflow-hidden rounded-xl border border-white/10 bg-[#0e0f13]">
        {/* App chrome */}
        <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-3.5">
          <span className="flex items-center gap-2.5">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-[#7c86f5] text-[10px] font-bold text-[#0e0f13]">
              ↗
            </span>
            <span className="text-sm font-bold tracking-tight text-white">
              SEO<span className="text-[#8b93f8]">Page</span>
            </span>
            <span className="mono text-[10px] tracking-[0.18em] text-white/35">
              create
            </span>
          </span>
          <span className="text-xs text-white/45">Sign in</span>
        </div>

        {/* Intake card */}
        <div className="px-6 pb-7 pt-6 sm:px-8">
          <div className="rounded-xl border border-white/[0.07] bg-[#15161c] p-5 sm:p-6">
            {FIELDS.map((f) => (
              <div key={f.label} className="mb-4 last:mb-0">
                <p className="text-[0.8rem] font-semibold text-white/85">
                  {f.label}
                </p>
                <div className="mt-1.5 rounded-lg border border-white/10 bg-[#1c1e26] px-3.5 py-2.5 text-[0.9rem] text-white/90">
                  {f.value}
                </div>
                {f.hint && (
                  <p className="mt-1.5 text-[0.72rem] text-white/35">{f.hint}</p>
                )}
              </div>
            ))}

            <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-4 text-[0.82rem]">
              <span className="font-semibold text-white/85">
                + Add details <span className="font-normal text-white/40">(optional)</span>
              </span>
              <span className="text-white/35">⌄</span>
            </div>

            <div className="mt-4 rounded-lg bg-[#7c86f5] py-3 text-center text-[0.92rem] font-semibold text-[#0e0f13]">
              Generate my page
            </div>
            <p className="mono mt-3 text-center text-[0.64rem] tracking-[0.18em] text-white/35">
              FREE TO PREVIEW &middot; $29 TO PUBLISH
            </p>
          </div>
        </div>
      </div>

      {/* Progress card — what the ~2 minutes look like */}
      <div className="mt-4 rounded-lg border border-line bg-surface p-4 shadow-lg sm:absolute sm:-right-7 sm:top-[54%] sm:mt-0 sm:w-64">
        <p className="mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">
          Generating &middot; about 2 min
        </p>
        <ul className="mt-2.5 space-y-2 text-[0.8rem]">
          <li className="flex items-center gap-2 text-ink-2">
            <CheckDot /> Researched roof repair in Denver
          </li>
          <li className="flex items-center gap-2 text-ink-2">
            <CheckDot /> Chose keywords &amp; customer questions
          </li>
          <li className="flex items-center gap-2 font-medium text-ink">
            <span className="spin inline-block h-3.5 w-3.5 rounded-full border-[2px] border-line-strong border-t-accent" />
            Writing your page&hellip;
          </li>
        </ul>
      </div>
    </div>
  );
}

function CheckDot() {
  return (
    <span className="grid h-3.5 w-3.5 place-items-center rounded-full bg-good-soft">
      <svg width="8" height="8" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 12.5 10 17l9-10"
          stroke="var(--good)"
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
