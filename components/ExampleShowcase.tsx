/**
 * A curated example of the generated output, framed as "here's what you get".
 * This is a hand-built mock for the homepage — swap in a real generated page
 * (screenshot or iframe of an exported file) by replacing the inner markup.
 */

const EXAMPLE = {
  url: "summitroofingdenver.com",
  business: "Summit Roofing Co.",
  city: "Denver",
  headline: "Emergency roof repair in Denver, on-site in 60 minutes",
  sub: "Hail damage, leaks, and storm repairs handled same-day by Denver's licensed, insured roofing crew. Free inspection, no-pressure estimate.",
  cta: "Get a free inspection",
  badges: ["Licensed & insured", "4.9 ★ · 380 reviews", "24/7 storm response"],
};

function Annotation({ children }: { children: React.ReactNode }) {
  return (
    <span className="pill bg-surface text-[0.78rem]">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      {children}
    </span>
  );
}

export function ExampleShowcase() {
  return (
    <div className="relative">
      {/* Browser frame */}
      <div className="card overflow-hidden shadow-lg">
        <div className="flex items-center gap-2 border-b border-line bg-surface-2 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <div className="mono ml-3 flex-1 truncate rounded-md bg-bg px-3 py-1 text-xs text-muted">
            {EXAMPLE.url}
          </div>
        </div>

        {/* Mock page */}
        <div className="bg-white">
          <div className="flex items-center justify-between border-b border-line px-5 py-3 sm:px-7">
            <span className="text-sm font-bold tracking-tight">
              {EXAMPLE.business}
            </span>
            <span className="hidden gap-5 text-xs text-muted sm:flex">
              <span>Services</span>
              <span>Reviews</span>
              <span>Service area</span>
            </span>
            <span className="rounded-md bg-ink px-3 py-1.5 text-xs font-semibold text-white">
              (303) 555-0142
            </span>
          </div>

          <div className="px-6 py-9 sm:px-10 sm:py-12">
            <span className="kicker">Denver · Adams &amp; Arapahoe County</span>
            <h3 className="display mt-3 max-w-xl text-[1.7rem] leading-tight text-ink sm:text-[2.1rem]">
              {EXAMPLE.headline}
            </h3>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-2">
              {EXAMPLE.sub}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white">
                {EXAMPLE.cta}
              </span>
              <span className="text-xs text-muted">
                or call, we answer 24/7
              </span>
            </div>
            <div className="mt-7 flex flex-wrap gap-2">
              {EXAMPLE.badges.map((b) => (
                <span
                  key={b}
                  className="rounded-lg bg-surface-2 px-3 py-1.5 text-xs font-medium text-ink-2"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-px border-t border-line bg-line sm:grid-cols-3">
            {[
              ["Hail & storm repair", "Insurance-claim ready documentation."],
              ["Leak detection", "Find and stop the source, not just the spot."],
              ["Full replacement", "Architectural shingle & metal, warrantied."],
            ].map(([t, d]) => (
              <div key={t} className="bg-white p-5">
                <p className="text-sm font-semibold text-ink">{t}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating annotations — what makes it rank */}
      <div className="mt-5 flex flex-wrap justify-center gap-2.5">
        <Annotation>Precise title tag + meta description</Annotation>
        <Annotation>LocalBusiness + Service + FAQPage schema</Annotation>
        <Annotation>FAQ structured for AI-search citation</Annotation>
        <Annotation>Semantic, mobile-first HTML</Annotation>
      </div>
    </div>
  );
}
