import { CHANGES, WEEKS, day, fmt } from "./_data";

/* Two panels on one date axis (indexed pages, impressions a day), with
   site changes as numbered lines and Google updates as shaded bands
   through both. Small multiples instead of two y-axes on one chart. */

const W = 1000, LEFT = 64, RIGHT = 24, PANEL = 120, GAP = 44, TOP = 28;
const START = Date.parse("2026-08-01"), END = Date.parse("2026-10-26");
const X = (iso: string) => LEFT + ((Date.parse(iso) - START) / (END - START)) * (W - LEFT - RIGHT);

type Series = { key: "indexed" | "impressions"; label: string; max: number; ticks: number[] };
const SERIES: Series[] = [
  { key: "indexed", label: "Indexed pages", max: 7000, ticks: [0, 3500, 7000] },
  { key: "impressions", label: "Impressions a day", max: 5000, ticks: [0, 2500, 5000] },
];

export function Timeline({ numbered = true }: { numbered?: boolean }) {
  const H = TOP + SERIES.length * (PANEL + GAP) + 24;
  const site = CHANGES.filter((c) => c.who === "site");
  const months = ["2026-08-01", "2026-09-01", "2026-10-01"];
  return (
    <figure className="flex flex-col gap-4">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="clip.art indexed pages and impressions, August to October 2026" className="w-full">
        {/* Google's updates: shaded through both panels. */}
        {CHANGES.filter((c) => c.who === "google").map((c) => (
          <g key={c.date}>
            <rect x={X(c.date)} y={TOP - 10} width={Math.max(4, X(c.end ?? c.date) - X(c.date))} height={H - TOP - 14} fill="#FF6B5C" fillOpacity={0.1} />
            <text x={X(c.date) + 6} y={TOP - 14} fontSize="12" fill="#FF9A8F">{c.what.replace(" 2026", "")}</text>
          </g>
        ))}
        {/* Site changes: a numbered line through both panels. */}
        {site.map((c, i) => (
          <g key={c.date + c.what}>
            <line x1={X(c.date)} x2={X(c.date)} y1={TOP} y2={H - 30} stroke="#9DB4FF" strokeOpacity={0.55} strokeDasharray="3 4" />
            {numbered && (
              <g>
                <rect x={X(c.date) - 9} y={H - 30} width="18" height="18" rx="5" fill="#3D6BFF" />
                <text x={X(c.date)} y={H - 17} textAnchor="middle" fontSize="11.5" fontWeight="600" fill="#fff">{i + 1}</text>
              </g>
            )}
          </g>
        ))}
        {SERIES.map((s, p) => {
          const y0 = TOP + p * (PANEL + GAP);
          const Y = (v: number) => y0 + PANEL - (v / s.max) * PANEL;
          const pts = WEEKS.map((w) => `${X(w.week)},${Y(w[s.key])}`).join(" ");
          const last = WEEKS.at(-1)!;
          return (
            <g key={s.key}>
              <text x={LEFT} y={y0 - 2} fontSize="13" fontWeight="600" fill="#EEF2FF">{s.label}</text>
              {s.ticks.map((t) => (
                <g key={t}>
                  <line x1={LEFT} x2={W - RIGHT} y1={Y(t)} y2={Y(t)} stroke="#fff" strokeOpacity={t === 0 ? 0.25 : 0.07} />
                  <text x={LEFT - 10} y={Y(t) + 4} textAnchor="end" fontSize="11.5" fill="#7D869C">{t >= 1000 ? `${t / 1000}K` : t}</text>
                </g>
              ))}
              <polygon points={`${X(WEEKS[0].week)},${Y(0)} ${pts} ${X(last.week)},${Y(0)}`} fill="#3D6BFF" fillOpacity={0.12} />
              <polyline points={pts} fill="none" stroke="#5A82FF" strokeWidth="2.25" strokeLinejoin="round" />
              <circle cx={X(last.week)} cy={Y(last[s.key])} r="4" fill="#9DB4FF" />
              <text x={X(last.week) - 8} y={Y(last[s.key]) - 10} textAnchor="end" fontSize="12.5" fontWeight="600" fill="#EEF2FF">{fmt(last[s.key])}</text>
            </g>
          );
        })}
        {months.map((m) => (
          <text key={m} x={X(m)} y={H - 2} fontSize="11.5" fill="#7D869C">{day(m).replace(" 1", "")}</text>
        ))}
      </svg>
      {numbered && (
        <ol className="grid gap-x-8 gap-y-2 text-[14px] text-[#C9D0E2] sm:grid-cols-2">
          {site.map((c, i) => (
            <li key={c.date + c.what} className="flex gap-3">
              <span className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-[5px] bg-[#3D6BFF] text-[12px] font-semibold text-white">{i + 1}</span>
              <span><span className="text-[#7D869C]">{day(c.date)}</span> · {c.what}{c.ref && <span className="text-[#7D869C]"> ({c.ref})</span>}</span>
            </li>
          ))}
        </ol>
      )}
      <figcaption className="text-[13px] text-[#7D869C]">Weekly, read off Search Console&apos;s charts, so approximate. Red bands are Google&apos;s updates, from its Search Status Dashboard.</figcaption>
    </figure>
  );
}
