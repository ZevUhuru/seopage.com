/**
 * The essay's "anatomy" exhibit: a finished generated page in a browser
 * frame, with numbered callout dots that map to the margin notes beside it.
 * Hand-built mock of real output for a plausible business.
 */

const EXAMPLE = {
  url: "summitroofingdenver.com",
  business: "Summit Roofing Co.",
  headline: "Emergency roof repair in Denver, on-site in 60 minutes",
  sub: "Hail damage, leaks, and storm repairs handled same-day by Denver's licensed, insured roofing crew. Free inspection, no-pressure estimate.",
  cta: "Get a free inspection",
};

export const ANATOMY: { n: number; t: string; d: string }[] = [
  {
    n: 1,
    t: "A title tag aimed at one search",
    d: "The page targets a single keyword, like “roof repair Denver,” in its title, meta description, and headings. One page, one search, no dilution.",
  },
  {
    n: 2,
    t: "Copy researched for the city",
    d: "Named neighborhoods, local weather, the way people in that town actually buy. Not boilerplate that could belong to any roofer anywhere.",
  },
  {
    n: 3,
    t: "An FAQ an AI can lift verbatim",
    d: "Real customer questions answered in two or three clean sentences, so an AI assistant can quote the answer and credit the business by name.",
  },
  {
    n: 4,
    t: "Structured data under the hood",
    d: "Valid LocalBusiness, Service, and FAQPage JSON-LD. The machine-readable layer that powers rich results and keeps every detail consistent.",
  },
  {
    n: 5,
    t: "One self-contained file",
    d: "Copy, design, and schema in a single HTML file that loads fast and works on any host. No platform, no login, no monthly fee.",
  },
];

function Dot({ n }: { n: number }) {
  return <span className="callout-dot">{n}</span>;
}

export function ExampleShowcase() {
  return (
    <div className="frame-offset overflow-hidden rounded-lg border border-line bg-surface">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-line bg-surface-2 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <div className="mono ml-3 flex flex-1 items-center gap-2 truncate rounded-md bg-bg px-3 py-1 text-xs text-muted">
          {EXAMPLE.url}
        </div>
        <Dot n={1} />
      </div>

      {/* Mock page */}
      <div className="bg-white">
        <div className="flex items-center justify-between border-b border-line px-5 py-3 sm:px-7">
          <span className="text-sm font-bold tracking-tight text-ink">
            {EXAMPLE.business}
          </span>
          <span className="hidden gap-5 text-xs text-muted sm:flex">
            <span>Services</span>
            <span>Reviews</span>
            <span>FAQ</span>
          </span>
          <span className="rounded-md bg-ink px-3 py-1.5 text-xs font-semibold text-white">
            (303) 555-0142
          </span>
        </div>

        <div className="px-6 py-8 sm:px-10 sm:py-10">
          <div className="flex items-center gap-2.5">
            <span className="kicker">Denver &middot; Adams &amp; Arapahoe County</span>
            <Dot n={2} />
          </div>
          <h3 className="display mt-3 max-w-xl text-[1.6rem] leading-tight text-ink sm:text-[2rem]">
            {EXAMPLE.headline}
          </h3>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-2">
            {EXAMPLE.sub}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white">
              {EXAMPLE.cta}
            </span>
            <span className="text-xs text-muted">or call, we answer 24/7</span>
          </div>
        </div>

        {/* FAQ strip — the quotable layer */}
        <div className="border-t border-line px-6 py-5 sm:px-10">
          <div className="flex items-center gap-2.5">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-muted">
              Frequently asked in Denver
            </p>
            <Dot n={3} />
          </div>
          <p className="mt-2.5 text-sm font-semibold text-ink">
            How fast can you repair storm damage in Denver?
          </p>
          <p className="mt-1 max-w-xl text-xs leading-relaxed text-ink-2">
            Summit Roofing Co. reaches most Denver-metro homes within 60
            minutes and completes the majority of hail and leak repairs the
            same day, with insurance-claim documentation included.
          </p>
        </div>

        {/* Schema footer — the machine-readable layer */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t border-line bg-surface-2 px-6 py-3 sm:px-10">
          <Dot n={4} />
          <span className="mono text-[0.7rem] text-muted">
            &lt;script type=&quot;application/ld+json&quot;&gt;
          </span>
          <span className="mono text-[0.7rem] text-ink-2">
            LocalBusiness &middot; Service &middot; FAQPage
          </span>
          <span className="mono ml-auto flex items-center gap-2 text-[0.7rem] text-muted">
            <Dot n={5} /> index.html &middot; 48 KB
          </span>
        </div>
      </div>
    </div>
  );
}
