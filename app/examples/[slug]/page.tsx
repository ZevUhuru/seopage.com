import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { examplePages, type ExamplePage } from "@/lib/data";

/* -------------------------------------------------------------------------- */
/* Theme                                                                       */
/* -------------------------------------------------------------------------- */

type ExampleTheme = {
  shell: string;
  hero: string;
  card: string;
  chip: string;
  accent: string;
  accentText: string;
  accentHex: string;
  soft: string;
  softInk: string;
  darkPanel: string;
  rule: string;
  variant: "vs" | "alt" | "best";
};

const exampleThemes: Record<string, ExampleTheme> = {
  "clip-art-vs-canva": {
    shell: "bg-[#f7f2e8]",
    hero: "border-[#e0cca8] bg-[#fff7e6]",
    card: "border-[#e0cca8] bg-[#fffaf0]",
    chip: "border-[#e0cca8] bg-[#f5e6c8] text-[#6b3d10]",
    accent: "bg-[#ef7a1a]",
    accentText: "text-[#7a3d00]",
    accentHex: "#ef7a1a",
    soft: "bg-[#f7dfbd]",
    softInk: "text-[#6b3d10]",
    darkPanel: "bg-[#2a1f13] text-[#fff7e6]",
    rule: "border-[#e0cca8]",
    variant: "vs",
  },
  "canva-clip-art-alternative": {
    shell: "bg-[#ecf6f1]",
    hero: "border-[#b2d4c4] bg-[#f4fcf8]",
    card: "border-[#b2d4c4] bg-[#fbfffd]",
    chip: "border-[#b2d4c4] bg-[#d4ece0] text-[#0e5e44]",
    accent: "bg-[#0ea374]",
    accentText: "text-[#0e5e44]",
    accentHex: "#0ea374",
    soft: "bg-[#d7eee2]",
    softInk: "text-[#0e5e44]",
    darkPanel: "bg-[#0e3329] text-[#f4fcf8]",
    rule: "border-[#b2d4c4]",
    variant: "alt",
  },
  "best-ai-clip-art-generator": {
    shell: "bg-[#f1eeff]",
    hero: "border-[#cabffa] bg-[#fbfaff]",
    card: "border-[#cabffa] bg-[#ffffff]",
    chip: "border-[#cabffa] bg-[#e0d8fc] text-[#4a35a3]",
    accent: "bg-[#6e5ae6]",
    accentText: "text-[#4a35a3]",
    accentHex: "#6e5ae6",
    soft: "bg-[#e4ddff]",
    softInk: "text-[#4a35a3]",
    darkPanel: "bg-[#1d1740] text-[#fbfaff]",
    rule: "border-[#cabffa]",
    variant: "best",
  },
};

/* -------------------------------------------------------------------------- */
/* Page                                                                        */
/* -------------------------------------------------------------------------- */

export function generateStaticParams() {
  return examplePages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = examplePages.find((p) => p.slug === slug);
  if (!page) return { title: "Example" };
  return {
    title: page.title,
    description: page.subtitle,
  };
}

export default async function ExampleDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = examplePages.find((p) => p.slug === slug);
  if (!page) notFound();
  const theme = themeFor(page);

  return (
    <div className={`min-h-screen ${theme.shell}`}>
      <SiteHeader active="examples" />

      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-14">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-xs">
          <Link
            href="/examples"
            className="text-[var(--ink-soft)] transition hover:text-[var(--ink)]"
          >
            ← All examples
          </Link>
          <div className="flex items-center gap-2 text-[var(--ink-soft)]">
            <span className="mono uppercase tracking-[0.18em] text-[var(--muted)]">
              Framed output preview
            </span>
            <span className="h-1 w-1 rounded-full bg-[var(--muted)]" />
            <span>This is the generated SEO landing page, not the SEOPage site chrome</span>
          </div>
        </div>

        <PreviewFrame page={page} theme={theme}>
          <article className="mx-auto max-w-5xl px-5 pb-16 pt-5 sm:px-8 lg:px-10">
            <GeneratedLandingNav theme={theme} />

            <Hero page={page} theme={theme} />

            <VerdictStrip page={page} theme={theme} />

            <TrustStrip theme={theme} />

            <OutputSampleStrip page={page} theme={theme} />

            <AudienceGrid page={page} theme={theme} />

            {page.type === "vs" && page.competitors ? (
              <VsBody page={page} theme={theme} />
            ) : page.type === "alt" ? (
              <AltBody theme={theme} />
            ) : (
              <BestBody page={page} theme={theme} />
            )}

            <ProofSection theme={theme} />

            <FaqSection page={page} theme={theme} />

            <InternalLinks page={page} theme={theme} />

            <ProductCta theme={theme} />
          </article>
        </PreviewFrame>
      </main>

      <SiteFooter />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Preview frame + nav                                                         */
/* -------------------------------------------------------------------------- */

function PreviewFrame({
  page,
  theme,
  children,
}: {
  page: ExamplePage;
  theme: ExampleTheme;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-black/15 bg-[#16181d] shadow-[0_40px_120px_-60px_rgba(0,0,0,0.75)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#20242b] px-4 py-3 text-xs text-white/65">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex min-w-0 flex-1 justify-center">
          <div className="mono flex max-w-full items-center gap-2 truncate rounded-full border border-white/10 bg-black/25 px-3.5 py-1.5 text-[11px] text-white/70">
            <svg viewBox="0 0 16 16" className="h-3 w-3 shrink-0" fill="none">
              <path d="M11 7V5.5a3 3 0 0 0-6 0V7" stroke="currentColor" strokeWidth="1.5" />
              <rect x="3.5" y="7" width="9" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            generated.seopage.com/preview/{page.slug}
          </div>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <span className="rounded-full border border-white/10 px-2.5 py-1">
            SEO landing page
          </span>
          <span className="rounded-full border border-white/10 px-2.5 py-1">
            {labelFor(page.type)}
          </span>
        </div>
      </div>
      <div className={`max-h-[78vh] overflow-y-auto ${theme.shell}`}>
        {children}
      </div>
    </section>
  );
}

function GeneratedLandingNav({ theme }: { theme: ExampleTheme }) {
  return (
    <div className={`flex flex-wrap items-center justify-between gap-4 rounded-2xl border px-4 py-3 ${theme.card}`}>
      <a href="#" className="flex items-center gap-2.5 font-semibold text-[var(--ink)]">
        <ClipArtLogo theme={theme} />
        <span className="text-[15px]">
          clip<span className="text-[var(--muted)]">.art</span>
        </span>
      </a>
      <nav className="hidden items-center gap-5 text-xs font-medium text-[var(--ink-soft)] md:flex">
        <a href="#styles" className="hover:text-[var(--ink)]">Styles</a>
        <a href="#categories" className="hover:text-[var(--ink)]">Categories</a>
        <a href="#compare" className="hover:text-[var(--ink)]">Compare</a>
        <a href="#faq" className="hover:text-[var(--ink)]">FAQ</a>
        <span className="h-1 w-1 rounded-full bg-[var(--muted)]" />
        <span className="rounded-full border border-black/10 bg-white/60 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-[var(--ink-soft)]">
          Free to start
        </span>
      </nav>
      <div className="flex items-center gap-2">
        <a
          href="#"
          className="hidden rounded-full border border-black/10 bg-white/55 px-3.5 py-1.5 text-xs font-semibold text-[var(--ink)] transition hover:bg-white/85 md:inline"
        >
          Sign in
        </a>
        <a
          href="#"
          className={`rounded-full px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:brightness-95 ${theme.accent}`}
        >
          Start creating →
        </a>
      </div>
    </div>
  );
}

function ClipArtLogo({ theme }: { theme: ExampleTheme }) {
  return (
    <span className={`grid h-8 w-8 place-items-center rounded-lg ${theme.accent}`}>
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
        <path d="M12 3 L13.6 9.4 L20 11 L13.6 12.6 L12 19 L10.4 12.6 L4 11 L10.4 9.4 Z" fill="white" />
      </svg>
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Hero                                                                        */
/* -------------------------------------------------------------------------- */

function Hero({ page, theme }: { page: ExamplePage; theme: ExampleTheme }) {
  return (
    <header className={`mt-5 overflow-hidden rounded-[2rem] border ${theme.hero}`}>
      <div className="grid gap-8 p-6 sm:p-9 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10 lg:p-11">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${theme.chip}`}>
              <IconSparkle className="h-3 w-3" />
              {labelFor(page.type)}
            </span>
            <span className={`rounded-full border bg-white/65 px-3 py-1 text-[11px] font-medium ${theme.rule} text-[var(--ink-soft)]`}>
              Target query · {page.query}
            </span>
            <span className="mono rounded-full bg-black/[0.04] px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
              ~{page.monthlySearches.toLocaleString()} /mo
            </span>
          </div>

          <h1 className="mt-6 text-balance text-[clamp(2.4rem,5.5vw,3.6rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-[var(--ink)]">
            {heroHeadlineFor(page)}
          </h1>
          <p className="mt-5 max-w-xl text-[1.05rem] leading-[1.65] text-[var(--ink-soft)]">
            {heroSubcopyFor(page)}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="#"
              className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-[0_6px_20px_-8px_rgba(0,0,0,0.35)] transition hover:brightness-95 ${theme.accent}`}
            >
              <IconWand className="h-4 w-4" />
              Create clip art free
            </a>
            <a
              href="#compare"
              className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white/65 px-5 py-3 text-sm font-semibold text-[var(--ink)] transition hover:bg-white/90"
            >
              See {page.type === "vs" ? "comparison" : page.type === "alt" ? "alternatives" : "ranking"}
              <span aria-hidden="true">→</span>
            </a>
            <span className="flex items-center gap-1.5 text-xs text-[var(--ink-soft)]">
              <IconCheck className="h-3.5 w-3.5 text-[var(--signal-deep)]" />
              No card required
            </span>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {heroStatsFor(page).map((stat) => (
              <div key={stat.label} className={`rounded-2xl border bg-white/55 p-4 ${theme.rule}`}>
                <div className="flex items-center gap-2">
                  <span className={`grid h-7 w-7 place-items-center rounded-lg ${theme.soft} ${theme.softInk}`}>
                    {stat.icon}
                  </span>
                  <p className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
                    {stat.label}
                  </p>
                </div>
                <p className="mt-3 text-sm font-semibold text-[var(--ink)]">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        <HeroVisual page={page} theme={theme} />
      </div>
    </header>
  );
}

function HeroVisual({ page, theme }: { page: ExamplePage; theme: ExampleTheme }) {
  if (theme.variant === "vs") return <VsHeroVisual theme={theme} />;
  if (theme.variant === "alt") return <AltHeroVisual theme={theme} />;
  return <BestHeroVisual page={page} theme={theme} />;
}

/* -------------------------------------------------------------------------- */
/* Hero visuals — one per page type                                            */
/* -------------------------------------------------------------------------- */

function VsHeroVisual({ theme }: { theme: ExampleTheme }) {
  return (
    <div className="relative">
      <div className="absolute -left-3 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
        <span className="grid h-12 w-12 place-items-center rounded-full border border-black/10 bg-white text-xs font-bold tracking-widest text-[var(--ink)] shadow-md">
          VS
        </span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <BrowserMock label="clip.art/create" theme={theme} compact>
          <div className="px-3 pb-3 pt-2">
            <div className="rounded-lg border border-black/10 bg-white/80 p-2">
              <div className="mono flex items-center gap-1.5 text-[9px] uppercase tracking-[0.18em] text-[var(--muted)]">
                <span className={`h-1.5 w-1.5 rounded-full ${theme.accent}`} />
                Prompt
              </div>
              <p className="mt-1 truncate text-[11px] text-[var(--ink)]">
                cute robot mascot, friendly, flat clip art
              </p>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-1.5">
              <ClipArt kind="robot" />
              <ClipArt kind="robot" tone="blue" />
              <ClipArt kind="robot" tone="pink" />
              <ClipArt kind="robot" tone="green" />
            </div>
            <div className="mt-2 flex items-center justify-between text-[10px] text-[var(--ink-soft)]">
              <span className="mono">4 transparent PNG</span>
              <span className={`flex items-center gap-1 font-semibold ${theme.accentText}`}>
                <IconDownload className="h-3 w-3" /> Export
              </span>
            </div>
          </div>
        </BrowserMock>

        <BrowserMock label="canva.com/design" theme={theme} compact tint="#f3f5fa">
          <div className="px-3 pb-3 pt-2">
            <div className="flex items-center gap-1.5 rounded-lg border border-black/10 bg-white/80 p-2">
              <span className="grid h-4 w-4 place-items-center rounded bg-[#00c4cc] text-[8px] font-bold text-white">C</span>
              <span className="mono text-[9px] uppercase tracking-[0.18em] text-[var(--muted)]">
                Instagram post · 1080×1080
              </span>
            </div>
            <div className="mt-2 overflow-hidden rounded-lg border border-black/10 bg-white">
              <div className="aspect-square bg-gradient-to-br from-[#ffe9d6] to-[#ffc6a3] p-3">
                <p className="mono text-[8px] uppercase tracking-[0.18em] text-[#7a3d00]">
                  Big sale
                </p>
                <h4 className="mt-1 text-[14px] font-bold leading-tight text-[#7a3d00]">
                  Meet our robot helper
                </h4>
                <div className="mt-1 flex justify-center">
                  <div className="h-12 w-12">
                    <ClipArtSvg kind="robot" tone="blue" rounded={false} />
                  </div>
                </div>
                <button className="mt-1 w-full rounded-md bg-[#7a3d00] py-0.5 text-[9px] font-semibold text-white">
                  Shop now →
                </button>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between text-[10px] text-[var(--ink-soft)]">
              <span className="mono">1 layered design</span>
              <span className="font-semibold text-[#00789a]">Edit more</span>
            </div>
          </div>
        </BrowserMock>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3 text-[11px]">
        <div className={`rounded-xl border bg-white/65 px-3 py-2 ${theme.rule}`}>
          <p className="mono text-[9px] uppercase tracking-[0.18em] text-[var(--muted)]">Output</p>
          <p className="mt-1 font-semibold text-[var(--ink)]">Transparent assets</p>
        </div>
        <div className={`rounded-xl border bg-white/65 px-3 py-2 ${theme.rule}`}>
          <p className="mono text-[9px] uppercase tracking-[0.18em] text-[var(--muted)]">Output</p>
          <p className="mt-1 font-semibold text-[var(--ink)]">Finished design</p>
        </div>
      </div>
    </div>
  );
}

function AltHeroVisual({ theme }: { theme: ExampleTheme }) {
  const reasons = [
    { icon: <IconBolt className="h-4 w-4" />, label: "Faster asset creation", from: "Canva" },
    { icon: <IconLayers className="h-4 w-4" />, label: "Transparent PNG workflow", from: "Editor exports" },
    { icon: <IconTarget className="h-4 w-4" />, label: "Clip-art-first browsing", from: "Stock libraries" },
    { icon: <IconLock className="h-4 w-4" />, label: "Simpler licensing", from: "Pro plan friction" },
  ];
  return (
    <div className={`relative overflow-hidden rounded-[1.75rem] border bg-white/55 p-5 ${theme.rule}`}>
      <div className="flex items-center justify-between">
        <span className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
          Why people switch from Canva
        </span>
        <span className={`inline-flex items-center gap-1 rounded-full border border-black/10 bg-white px-2.5 py-1 text-[10px] font-semibold ${theme.accentText}`}>
          <IconSparkle className="h-3 w-3" /> 4 reasons
        </span>
      </div>

      <ul className="mt-5 space-y-2.5">
        {reasons.map((r, i) => (
          <li key={r.label} className="flex items-center gap-3 rounded-xl border border-black/10 bg-white px-3 py-2.5 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
            <span className={`grid h-9 w-9 place-items-center rounded-lg text-white ${theme.accent}`}>
              {r.icon}
            </span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-[var(--ink)]">{r.label}</p>
              <p className="text-[11px] text-[var(--ink-soft)]">
                Replacing <span className="text-[var(--ink)]">{r.from}</span>
              </p>
            </div>
            <span className="mono text-[9px] uppercase tracking-[0.2em] text-[var(--muted)]">
              {String(i + 1).padStart(2, "0")}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-4 grid grid-cols-4 gap-2">
        {(["cat", "robot", "flower", "star"] as const).map((k) => (
          <ClipArt key={k} kind={k} />
        ))}
      </div>
      <p className="mt-3 text-center text-[10px] text-[var(--muted)]">
        Sample clip.art outputs — transparent PNG ready
      </p>
    </div>
  );
}

function BestHeroVisual({ theme }: { page: ExamplePage; theme: ExampleTheme }) {
  const podium = [
    { rank: 1, name: "clip.art", glyph: "ca", color: theme.accentHex, score: "9.4" },
    { rank: 2, name: "Canva", glyph: "Cv", color: "#00c4cc", score: "8.1" },
    { rank: 3, name: "Adobe", glyph: "Ae", color: "#ff3a3a", score: "7.6" },
  ];
  return (
    <div className={`relative overflow-hidden rounded-[1.75rem] border bg-white/55 p-5 ${theme.rule}`}>
      <div className="flex items-center justify-between">
        <span className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
          Editorial ranking — top 3
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-2.5 py-1 text-[10px] font-semibold text-[var(--ink)]">
          <IconTrophy className="h-3 w-3" />
          Rubric tested
        </span>
      </div>

      <div className="mt-5 grid grid-cols-3 items-end gap-2">
        {[1, 0, 2].map((idx, i) => {
          const item = podium[idx];
          const height = idx === 0 ? "h-32" : idx === 1 ? "h-24" : "h-20";
          return (
            <div key={item.name} className="flex flex-col items-center">
              <BrandGlyph glyph={item.glyph} color={item.color} size="lg" />
              <p className="mt-2 text-xs font-semibold text-[var(--ink)]">{item.name}</p>
              <p className="mono text-[9px] uppercase tracking-[0.18em] text-[var(--muted)]">
                {item.score} / 10
              </p>
              <div
                className={`mt-2 w-full rounded-t-lg border border-black/10 border-b-0 ${height} ${idx === 0 ? theme.accent : "bg-white"} grid place-items-center text-xs font-bold ${idx === 0 ? "text-white" : "text-[var(--ink-soft)]"}`}
              >
                #{item.rank}
              </div>
              <div className="h-1 w-full bg-black/10" />
            </div>
          );
        })}
      </div>

      <div className="mt-5 grid grid-cols-4 gap-2">
        {(["star", "robot", "flower", "rainbow"] as const).map((k) => (
          <ClipArt key={k} kind={k} />
        ))}
      </div>
      <p className="mt-3 text-center text-[10px] text-[var(--muted)]">
        Scored across output, exports, license, and speed
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Verdict + trust + output sample                                             */
/* -------------------------------------------------------------------------- */

function VerdictStrip({ page, theme }: { page: ExamplePage; theme: ExampleTheme }) {
  return (
    <section className={`mt-10 overflow-hidden rounded-[2rem] ${theme.darkPanel}`}>
      <div className="grid gap-7 p-7 sm:p-9 md:grid-cols-[0.85fr_1.15fr] md:items-center">
        <div>
          <span className="mono text-[11px] uppercase tracking-[0.22em] opacity-65">
            Quick verdict
          </span>
          <div className="mt-3 flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/15">
              <IconVerified className="h-4 w-4 text-white" />
            </span>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] opacity-85">
              Our take
            </p>
          </div>
        </div>
        <p className="text-balance text-[1.45rem] font-medium leading-snug sm:text-[1.65rem]">
          {page.verdict}
        </p>
      </div>
    </section>
  );
}

function TrustStrip({ theme }: { theme: ExampleTheme }) {
  const audiences: { label: string; icon: React.ReactNode }[] = [
    { label: "Teachers", icon: <IconBook className="h-3.5 w-3.5" /> },
    { label: "Creators", icon: <IconBrush className="h-3.5 w-3.5" /> },
    { label: "Printables", icon: <IconImage className="h-3.5 w-3.5" /> },
    { label: "Etsy shops", icon: <IconStorefront className="h-3.5 w-3.5" /> },
    { label: "POD sellers", icon: <IconTag className="h-3.5 w-3.5" /> },
    { label: "Bloggers", icon: <IconPen className="h-3.5 w-3.5" /> },
  ];
  return (
    <section className={`mt-6 overflow-hidden rounded-2xl border bg-white/55 ${theme.rule}`}>
      <div className="grid items-center gap-4 px-5 py-4 md:grid-cols-[auto_1fr]">
        <p className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
          Built for
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {audiences.map((a) => (
            <span
              key={a.label}
              className={`inline-flex items-center gap-1.5 rounded-full border bg-white px-3 py-1.5 text-xs font-medium text-[var(--ink-soft)] ${theme.rule}`}
            >
              <span className={theme.accentText}>{a.icon}</span>
              {a.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function OutputSampleStrip({ page, theme }: { page: ExamplePage; theme: ExampleTheme }) {
  return (
    <section id="styles" className="mt-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <span className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
            {page.type === "vs"
              ? "Output you can expect"
              : page.type === "alt"
                ? "Outputs after switching"
                : "Output quality samples"}
          </span>
          <h2 className="mt-3 text-balance text-[2rem] font-semibold leading-tight tracking-[-0.03em] text-[var(--ink)] sm:text-[2.3rem]">
            Real assets — not previews of previews.
          </h2>
        </div>
        <a
          href="#"
          className={`hidden items-center gap-1 rounded-full border bg-white/65 px-3.5 py-2 text-xs font-semibold text-[var(--ink)] transition hover:bg-white/90 sm:inline-flex ${theme.rule}`}
        >
          Browse gallery
          <span aria-hidden="true">→</span>
        </a>
      </div>

      <div className={`mt-7 grid gap-3 rounded-[1.75rem] border bg-white/55 p-3 sm:grid-cols-6 sm:p-4 ${theme.rule}`}>
        {[
          { kind: "cat", label: "Cat" },
          { kind: "robot", label: "Robot" },
          { kind: "flower", label: "Flower" },
          { kind: "cupcake", label: "Cupcake" },
          { kind: "rainbow", label: "Rainbow" },
          { kind: "star", label: "Star" },
        ].map((s, i) => (
          <div key={s.label} className="group relative">
            <ClipArt kind={s.kind as ClipArtKind} tone={i % 2 === 0 ? "default" : "pink"} />
            <div className="absolute inset-x-1 bottom-1 hidden items-center justify-between rounded-md bg-black/55 px-2 py-1 text-[9px] text-white backdrop-blur-sm group-hover:flex">
              <span>{s.label}.png</span>
              <IconDownload className="h-3 w-3" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-[var(--ink-soft)]">
        <IconCheck className="h-3.5 w-3.5 text-[var(--signal-deep)]" />
        <span>Transparent PNG</span>
        <span className="text-[var(--rule-strong)]">·</span>
        <IconCheck className="h-3.5 w-3.5 text-[var(--signal-deep)]" />
        <span>1024 × 1024 native</span>
        <span className="text-[var(--rule-strong)]">·</span>
        <IconCheck className="h-3.5 w-3.5 text-[var(--signal-deep)]" />
        <span>Commercial license included on Pro</span>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Audience cards                                                              */
/* -------------------------------------------------------------------------- */

function AudienceGrid({ page, theme }: { page: ExamplePage; theme: ExampleTheme }) {
  const cards = audienceCards(page.type);
  return (
    <section id="categories" className="mt-16">
      <SectionIntro
        eyebrow="Who this is for"
        title="Match the page to the visitor's real job."
        copy="A stronger SEO landing page names the audience, the task, and the reason the product fits before asking for a click."
      />
      <div className="mt-7 grid gap-4 md:grid-cols-3">
        {cards.map((c) => (
          <div key={c.title} className={`group relative overflow-hidden rounded-3xl border bg-white/65 p-6 transition hover:bg-white ${theme.rule}`}>
            <div className="flex items-center justify-between">
              <span className={`grid h-11 w-11 place-items-center rounded-2xl text-white ${theme.accent}`}>
                {c.icon}
              </span>
              <span className={`mono rounded-full border bg-white px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] ${theme.rule} ${theme.accentText}`}>
                {c.tag}
              </span>
            </div>
            <h3 className="mt-6 text-lg font-semibold tracking-[-0.01em] text-[var(--ink)]">
              {c.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">{c.body}</p>
            <ul className="mt-4 space-y-2 text-[12px] text-[var(--ink-soft)]">
              {c.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <IconCheck className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${theme.accentText}`} />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function audienceCards(type: ExamplePage["type"]) {
  const base = [
    {
      title: "Teachers",
      tag: "Classrooms",
      body: "Classroom-ready graphics without searching through stock libraries.",
      icon: <IconBook className="h-5 w-5" />,
      bullets: ["Worksheet-safe transparent PNGs", "Subject categories", "Print-ready resolution"],
    },
    {
      title: "Etsy + POD shops",
      tag: "Sellers",
      body: "Reusable visuals for mockups, bundles, stickers, and printables.",
      icon: <IconStorefront className="h-5 w-5" />,
      bullets: ["Commercial license on Pro", "Series-friendly styles", "Bundle-ready exports"],
    },
    {
      title: "Creators + bloggers",
      tag: "Content",
      body: "Visual assets for posts, downloads, and thumbnails — without re-licensing.",
      icon: <IconPen className="h-5 w-5" />,
      bullets: ["Consistent brand styles", "Hero image generation", "Drop into Notion or CMS"],
    },
  ];
  if (type === "alt") {
    return [
      { ...base[0], title: "Tired of design steps", body: "When a full editor slows down a simple clip art task." },
      { ...base[1], title: "Need asset reuse", body: "When transparent PNGs and repeatable styles matter more than layouts." },
      { ...base[2], title: "Search-first workflow", body: "When users want to browse or generate by clip art category." },
    ];
  }
  return base;
}

/* -------------------------------------------------------------------------- */
/* VS body                                                                     */
/* -------------------------------------------------------------------------- */

function VsBody({ page, theme }: { page: ExamplePage; theme: ExampleTheme }) {
  const a = page.competitors!.a;
  const b = page.competitors!.b;
  const rows: [string, "yes" | "partial" | "no", "yes" | "partial" | "no", string][] = [
    ["Transparent PNG export", "yes", "partial", "Asset-first vs design-first"],
    ["Prompt-to-asset speed", "yes", "no", "One step vs many"],
    ["Clip art categories", "yes", "partial", "Browse by subject + style"],
    ["Full design editor", "no", "yes", "Layouts, decks, social posts"],
    ["Brand kits + templates", "no", "yes", "Multi-brand teams"],
    ["Free for commercial use", "yes", "partial", "Pro tier on Canva"],
    ["Bulk generation", "yes", "no", "Series + variations"],
    ["Layered editing", "partial", "yes", "Re-arranging shapes"],
  ];
  return (
    <>
      {/* Feature highlight tiles */}
      <section id="compare" className="mt-16">
        <SectionIntro
          eyebrow="At a glance"
          title="One asset, two products, very different jobs."
          copy="This sample separates a focused clip art workflow from a general design workspace, then gives readers a direct way to choose."
        />
        <div className="mt-7 grid gap-4 md:grid-cols-2">
          <FeatureTile
            theme={theme}
            badge={<BrandGlyph glyph="ca" color={theme.accentHex} />}
            tag="Asset-first"
            title={`${a} — built around the clip art itself`}
            body="Type a prompt, pick a style, and pull a transparent PNG. The page maps directly to clip art categories that show up in search."
            features={[
              { icon: <IconBolt className="h-3.5 w-3.5" />, label: "Prompt → asset in seconds" },
              { icon: <IconLayers className="h-3.5 w-3.5" />, label: "Transparent PNG by default" },
              { icon: <IconTarget className="h-3.5 w-3.5" />, label: "Search-shaped categories" },
            ]}
            samples={["cat", "robot", "flower", "star"]}
          />
          <FeatureTile
            theme={theme}
            badge={<BrandGlyph glyph="Cv" color="#00c4cc" />}
            tag="Design-first"
            tagTone="muted"
            title={`${b} — full design workspace`}
            body="Clip art is one ingredient inside a much larger editor: brand kits, templates, presentations, and finished social designs."
            features={[
              { icon: <IconLayers className="h-3.5 w-3.5" />, label: "Layouts + brand kits" },
              { icon: <IconImage className="h-3.5 w-3.5" />, label: "Massive template library" },
              { icon: <IconPalette className="h-3.5 w-3.5" />, label: "Drag-drop editor" },
            ]}
            samples={["cupcake", "balloon", "heart", "rainbow"]}
            cool
          />
        </div>
      </section>

      {/* Comparison table */}
      <section className="mt-16">
        <SectionIntro
          eyebrow="Feature comparison"
          title="The decision comes down to the job you're hiring it to do."
          copy="Where these tools actually overlap, and where they don't. Marked from public docs and hands-on testing."
        />
        <div className={`mt-7 overflow-hidden rounded-3xl border bg-white/65 ${theme.rule}`}>
          <div className="mono grid grid-cols-[1.5fr_0.9fr_0.9fr] gap-4 border-b border-[var(--rule)] bg-white px-5 py-3 text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
            <span>Capability</span>
            <span className="flex items-center gap-2">
              <BrandGlyph glyph="ca" color={theme.accentHex} size="xs" />
              <span className={theme.accentText}>{a}</span>
            </span>
            <span className="flex items-center gap-2">
              <BrandGlyph glyph="Cv" color="#00c4cc" size="xs" />
              <span className="text-[#006a73]">{b}</span>
            </span>
          </div>
          {rows.map((row, i) => (
            <div
              key={row[0]}
              className={`grid grid-cols-[1.5fr_0.9fr_0.9fr] items-center gap-4 px-5 py-3.5 text-sm ${
                i % 2 === 1 ? "bg-white/40" : ""
              } ${i !== 0 ? "border-t border-[var(--rule)]" : ""}`}
            >
              <div>
                <p className="font-medium text-[var(--ink)]">{row[0]}</p>
                <p className="mt-0.5 text-[11px] text-[var(--ink-soft)]">{row[3]}</p>
              </div>
              <span><MarkCell value={row[1]} theme={theme} /></span>
              <span><MarkCell value={row[2]} theme={theme} muted /></span>
            </div>
          ))}
          <div className="grid grid-cols-[1.5fr_0.9fr_0.9fr] items-center gap-4 border-t border-[var(--rule)] bg-white/70 px-5 py-3 text-xs">
            <span className="mono uppercase tracking-[0.18em] text-[var(--muted)]">Score</span>
            <span className={`font-bold ${theme.accentText}`}>9.2 / 10</span>
            <span className="font-bold text-[var(--ink-soft)]">7.1 / 10</span>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mt-16">
        <SectionIntro
          eyebrow="Pricing positioning"
          title="A useful comparison page explains what each product is optimized to produce."
          copy="The page should not pretend both tools solve the same problem. It should make the tradeoff obvious."
        />
        <div className="mt-7 grid gap-4 md:grid-cols-2">
          <PriceCard
            theme={theme}
            highlight
            brandGlyph={<BrandGlyph glyph="ca" color={theme.accentHex} />}
            title={a}
            tier="Focused generator"
            price="Free"
            priceNote="Pro at $9 / mo"
            note="Best when the output is the clip art itself — transparent PNGs, categories, and fast reusable graphics."
            features={[
              "Unlimited free generations",
              "Transparent PNG export",
              "Category + style browsing",
              "Commercial license on Pro",
            ]}
          />
          <PriceCard
            theme={theme}
            brandGlyph={<BrandGlyph glyph="Cv" color="#00c4cc" />}
            title={b}
            tier="Design workspace"
            price="$15 / mo"
            priceNote="Pro tier"
            note="Best when clip art is one ingredient inside a larger design: posts, flyers, decks, and brand layouts."
            features={[
              "100M+ design templates",
              "Brand kit + team library",
              "Magic Design AI",
              "Background remover on Pro",
            ]}
            cool
          />
        </div>
      </section>

      {/* When to pick */}
      <section id="verdict" className="mt-16">
        <SectionIntro
          eyebrow="Buying guide"
          title="When to pick which"
          copy="The final sections turn comparison data into practical use cases — which is where a comparison page earns the click."
        />
        <div className="mt-7 grid gap-4 md:grid-cols-2">
          <UseCaseCard
            theme={theme}
            highlight
            title={`Pick ${a} if…`}
            items={[
              "You want clip art assets more than a full design canvas.",
              "Transparent exports and reusable graphics matter most.",
              "You want category pages that map directly to search demand.",
              "Speed from idea to PNG matters more than layout polish.",
            ]}
          />
          <UseCaseCard
            theme={theme}
            title={`Pick ${b} if…`}
            items={[
              "You're building complete designs, not just generating assets.",
              "Templates, brand kits, and layout tools are central.",
              "You want one broad editor for many kinds of creative work.",
              "Team collaboration in a shared design space matters.",
            ]}
          />
        </div>
      </section>
    </>
  );
}

function FeatureTile({
  theme,
  badge,
  tag,
  tagTone = "accent",
  title,
  body,
  features,
  samples,
  cool,
}: {
  theme: ExampleTheme;
  badge: React.ReactNode;
  tag: string;
  tagTone?: "accent" | "muted";
  title: string;
  body: string;
  features: { icon: React.ReactNode; label: string }[];
  samples: ClipArtKind[];
  cool?: boolean;
}) {
  return (
    <div className={`overflow-hidden rounded-3xl border bg-white/65 p-6 ${theme.rule}`}>
      <div className="flex items-center justify-between">
        {badge}
        <span
          className={`mono rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] ${
            tagTone === "accent" ? `${theme.chip}` : "border-black/15 bg-white text-[var(--ink-soft)]"
          }`}
        >
          {tag}
        </span>
      </div>
      <h3 className="mt-5 text-xl font-semibold leading-snug tracking-[-0.01em] text-[var(--ink)]">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">{body}</p>

      <ul className="mt-5 space-y-2.5 text-[13px] text-[var(--ink)]">
        {features.map((f) => (
          <li key={f.label} className="flex items-center gap-2.5">
            <span className={`grid h-7 w-7 place-items-center rounded-lg ${theme.soft} ${theme.softInk}`}>
              {f.icon}
            </span>
            {f.label}
          </li>
        ))}
      </ul>

      <div className="mt-5 grid grid-cols-4 gap-2">
        {samples.map((k, i) => (
          <ClipArt key={`${k}-${i}`} kind={k} tone={cool ? "blue" : i % 2 === 0 ? "default" : "pink"} />
        ))}
      </div>
    </div>
  );
}

function MarkCell({
  value,
  theme,
  muted = false,
}: {
  value: "yes" | "partial" | "no";
  theme: ExampleTheme;
  muted?: boolean;
}) {
  if (value === "yes") {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${muted ? "bg-[#dff4ed] text-[#0e5e44]" : `${theme.soft} ${theme.softInk}`}`}>
        <IconCheck className="h-3 w-3" /> Yes
      </span>
    );
  }
  if (value === "partial") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fff1d6] px-2.5 py-1 text-[11px] font-semibold text-[#8b5a00]">
        <IconDash className="h-3 w-3" /> Partial
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-black/5 px-2.5 py-1 text-[11px] font-semibold text-[var(--muted)]">
      <IconX className="h-3 w-3" /> No
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* ALT body                                                                    */
/* -------------------------------------------------------------------------- */

function AltBody({ theme }: { theme: ExampleTheme }) {
  const items = [
    { name: "clip.art", glyph: "ca", color: theme.accentHex, category: "Focused generator", pitch: "Fastest path to a reusable clip art asset. Type, pick a style, export a transparent PNG.", samples: ["cat", "robot", "flower"] as ClipArtKind[], featured: true, score: "9.4" },
    { name: "Adobe Express", glyph: "Ae", color: "#ff3a3a", category: "Design suite", pitch: "Strong when you need templates, editing, stock assets, and polished campaign graphics in one tool.", samples: ["cupcake", "balloon", "heart"] as ClipArtKind[], score: "8.0" },
    { name: "Creative Fabrica", glyph: "Cf", color: "#1f1f1f", category: "Marketplace", pitch: "Buyers who prefer browsing creator-made bundles, fonts, and curated asset packs.", samples: ["rainbow", "sun", "star"] as ClipArtKind[], score: "7.5" },
    { name: "Microsoft Designer", glyph: "MD", color: "#0078d4", category: "AI designer", pitch: "Quick AI-driven layouts that mix generation and design in one stripped-down editor.", samples: ["robot", "star", "balloon"] as ClipArtKind[], score: "7.2" },
    { name: "Openclipart", glyph: "Oc", color: "#5fb360", category: "Free library", pitch: "Public-domain style assets for simple needs — good when custom generation isn't required.", samples: ["sun", "flower", "heart"] as ClipArtKind[], score: "6.4" },
    { name: "Canva", glyph: "Cv", color: "#00c4cc", category: "Broad editor", pitch: "Still the broadest choice when you need a complete design workspace with collaboration.", samples: ["cat", "rainbow", "cupcake"] as ClipArtKind[], score: "8.3" },
  ];

  return (
    <>
      {/* Why people switch — bigger card grid */}
      <section id="compare" className="mt-16">
        <SectionIntro
          eyebrow="Search intent"
          title="People searching for an alternative usually have a specific frustration."
          copy="Strong alternative pages open by naming the switching reason out loud — design overhead, asset reuse, exports, licensing."
        />
        <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: <IconBolt className="h-5 w-5" />, title: "Too many design steps", body: "Canva is a great editor but the clip art is buried under templates and layout tools." },
            { icon: <IconLayers className="h-5 w-5" />, title: "Transparent exports", body: "Background removal sits behind Pro. A focused generator hands you transparent PNGs by default." },
            { icon: <IconTarget className="h-5 w-5" />, title: "Browse, don't build", body: "Search-first workflows when users want clip art by subject and style — not template-first design." },
            { icon: <IconLock className="h-5 w-5" />, title: "Simpler reuse terms", body: "Clear commercial license matters for teachers, shops, and POD sellers more than design polish." },
          ].map((r) => (
            <div key={r.title} className={`rounded-3xl border bg-white/65 p-5 ${theme.rule}`}>
              <span className={`grid h-11 w-11 place-items-center rounded-2xl text-white ${theme.accent}`}>
                {r.icon}
              </span>
              <h3 className="mt-5 text-base font-semibold text-[var(--ink)]">{r.title}</h3>
              <p className="mt-2 text-[13px] leading-6 text-[var(--ink-soft)]">{r.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ranked alternatives */}
      <section className="mt-16">
        <SectionIntro
          eyebrow="The alternatives"
          title="Six tools, ranked by the role they play in the buyer's decision"
          copy="Instead of a thin list, the page explains the role each alternative plays — and shows what its output actually looks like."
        />
        <ol className={`mt-7 overflow-hidden rounded-3xl border bg-white/65 ${theme.rule}`}>
          {items.map((it, i) => (
            <li
              key={it.name}
              className={`grid gap-5 p-5 sm:grid-cols-[44px_2fr_1fr_auto] sm:items-center ${i !== 0 ? "border-t border-[var(--rule)]" : ""} ${it.featured ? `${theme.soft}` : ""}`}
            >
              <span className="serif text-3xl text-[var(--muted)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex items-start gap-3">
                <BrandGlyph glyph={it.glyph} color={it.color} />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold text-[var(--ink)]">{it.name}</h3>
                    {it.featured ? (
                      <span className={`mono rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.18em] text-white ${theme.accent}`}>
                        Featured
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-[13px] leading-6 text-[var(--ink-soft)]">{it.pitch}</p>
                  <span className={`mono mt-2 inline-block rounded-full border bg-white px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] text-[var(--ink-soft)] ${theme.rule}`}>
                    {it.category}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {it.samples.map((s, j) => (
                  <ClipArt key={`${it.name}-${s}-${j}`} kind={s} tone={j % 2 === 0 ? "default" : "pink"} size="xs" />
                ))}
              </div>
              <div className="text-right">
                <p className={`text-lg font-bold ${theme.accentText}`}>{it.score}</p>
                <p className="mono text-[9px] uppercase tracking-[0.18em] text-[var(--muted)]">Editorial score</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Honest caveats */}
      <section className="mt-16">
        <SectionIntro
          eyebrow="Honest caveats"
          title="When not to switch from Canva"
          copy="Alternative pages work better when they admit where the incumbent still wins."
        />
        <ul className="mt-7 grid gap-3 md:grid-cols-2">
          {[
            "You need a complete design editor with templates, layouts, and brand kits.",
            "Your team already has a Canva-based campaign workflow with approvals.",
            "Collaboration inside the design tool matters more than asset reuse.",
            "Clip art is only a small part of a larger design or campaign project.",
          ].map((s) => (
            <li
              key={s}
              className={`flex items-start gap-3 rounded-2xl border bg-white/65 p-5 ${theme.rule}`}
            >
              <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#fff1d6] text-[#8b5a00]">
                <IconAlert className="h-3.5 w-3.5" />
              </span>
              <span className="text-sm leading-6 text-[var(--ink-soft)]">{s}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* BEST body                                                                   */
/* -------------------------------------------------------------------------- */

function BestBody({ page, theme }: { page: ExamplePage; theme: ExampleTheme }) {
  const tools = [
    { name: "clip.art", glyph: "ca", color: theme.accentHex, fit: "Fast reusable assets", score: 9.4, scoreLabel: "Best focused", verdict: "For teachers, creators, and small shops that want clip art outputs without building a whole design.", samples: ["cat", "robot", "flower", "star"] as ClipArtKind[], scores: { quality: 9, export: 10, license: 9, speed: 10 } },
    { name: "Canva", glyph: "Cv", color: "#00c4cc", fit: "Full design projects", score: 8.3, scoreLabel: "Best suite", verdict: "For teams that need clip art inside social posts, decks, flyers, and branded templates.", samples: ["cupcake", "balloon", "heart", "rainbow"] as ClipArtKind[], scores: { quality: 8, export: 7, license: 9, speed: 7 } },
    { name: "Adobe Express", glyph: "Ae", color: "#ff3a3a", fit: "Polished templates", score: 8.0, scoreLabel: "Best templates", verdict: "For users who want design polish and stock-style assets in a broader editor.", samples: ["sun", "star", "balloon", "cat"] as ClipArtKind[], scores: { quality: 9, export: 8, license: 7, speed: 7 } },
    { name: "Microsoft Designer", glyph: "MD", color: "#0078d4", fit: "Quick AI graphics", score: 7.2, scoreLabel: "Best quick start", verdict: "For prompt-led graphics where the design layout matters as much as the asset.", samples: ["robot", "star", "rainbow", "sun"] as ClipArtKind[], scores: { quality: 7, export: 7, license: 7, speed: 8 } },
    { name: "Creative Fabrica", glyph: "Cf", color: "#1f1f1f", fit: "Asset bundles", score: 7.5, scoreLabel: "Best marketplace", verdict: "For buyers who prefer browsing creator-made graphics, fonts, and curated bundles.", samples: ["flower", "heart", "cupcake", "rainbow"] as ClipArtKind[], scores: { quality: 8, export: 8, license: 8, speed: 6 } },
    { name: "Openclipart", glyph: "Oc", color: "#5fb360", fit: "Free library assets", score: 6.4, scoreLabel: "Best free library", verdict: "For simple public-domain downloads where custom generation isn't needed.", samples: ["sun", "flower", "star", "cat"] as ClipArtKind[], scores: { quality: 6, export: 6, license: 8, speed: 6 } },
  ];

  return (
    <>
      {/* Leaderboard */}
      <section id="compare" className="mt-16">
        <SectionIntro
          eyebrow="The ranking"
          title="Six AI clip art tools, scored on the four things that matter."
          copy="Output quality, export format, license clarity, and creation speed — each scored from hands-on use and current documentation."
        />
        <div className="mt-7 grid gap-3">
          {tools.map((t, i) => (
            <div
              key={t.name}
              className={`group grid gap-5 rounded-3xl border bg-white/65 p-5 transition hover:bg-white sm:grid-cols-[56px_1fr_auto_auto] sm:items-center ${i === 0 ? `${theme.soft}` : ""} ${theme.rule}`}
            >
              <div className="flex items-center gap-3">
                <span className={`grid h-10 w-10 place-items-center rounded-full text-sm font-bold text-white ${i === 0 ? theme.accent : i === 1 ? "bg-[#c0c5cc]" : i === 2 ? "bg-[#b08b58]" : "bg-[var(--ink-soft)]"}`}>
                  {i + 1}
                </span>
              </div>
              <div className="flex items-start gap-3 min-w-0">
                <BrandGlyph glyph={t.glyph} color={t.color} />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate text-base font-semibold text-[var(--ink)]">{t.name}</h3>
                    {i === 0 ? (
                      <span className={`mono rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.18em] text-white ${theme.accent}`}>
                        Top pick
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-[13px] leading-6 text-[var(--ink-soft)]">{t.verdict}</p>
                  <ScoreBars scores={t.scores} theme={theme} highlight={i === 0} />
                </div>
              </div>
              <div className="hidden grid-cols-4 gap-1.5 sm:grid">
                {t.samples.map((s, j) => (
                  <ClipArt key={`${t.name}-${s}-${j}`} kind={s} tone={j % 2 === 0 ? "default" : "pink"} size="xs" />
                ))}
              </div>
              <div className="text-right">
                <p className={`text-3xl font-bold tracking-[-0.02em] ${i === 0 ? theme.accentText : "text-[var(--ink)]"}`}>
                  {t.score.toFixed(1)}
                </p>
                <p className="mono text-[9px] uppercase tracking-[0.18em] text-[var(--muted)]">
                  {t.scoreLabel}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Scoring rubric */}
      <section className="mt-16">
        <SectionIntro
          eyebrow="Scoring rubric"
          title="The four criteria behind the ranking"
          copy="The page gives readers a reason to trust the order — and the four-axis rubric is what every tool is measured against."
        />
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: <IconImage className="h-5 w-5" />, weight: "30%", title: "Output quality", body: "Are the assets clean, on-prompt, and reusable across contexts?" },
            { icon: <IconDownload className="h-5 w-5" />, weight: "25%", title: "Export format", body: "Can users get the file type they actually need — including transparent PNG?" },
            { icon: <IconLock className="h-5 w-5" />, weight: "25%", title: "Licensing clarity", body: "Is commercial use easy to understand before publishing or selling?" },
            { icon: <IconBolt className="h-5 w-5" />, weight: "20%", title: "Creation speed", body: "How fast can someone go from idea to usable, exported clip art?" },
          ].map((c) => (
            <div key={c.title} className={`rounded-3xl border bg-white/65 p-5 ${theme.rule}`}>
              <div className="flex items-center justify-between">
                <span className={`grid h-11 w-11 place-items-center rounded-2xl text-white ${theme.accent}`}>
                  {c.icon}
                </span>
                <span className={`mono rounded-full border bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${theme.rule} ${theme.accentText}`}>
                  {c.weight}
                </span>
              </div>
              <h3 className="mt-5 text-base font-semibold text-[var(--ink)]">{c.title}</h3>
              <p className="mt-2 text-[13px] leading-6 text-[var(--ink-soft)]">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <PageCoverage page={page} theme={theme} />
    </>
  );
}

function ScoreBars({
  scores,
  theme,
  highlight,
}: {
  scores: { quality: number; export: number; license: number; speed: number };
  theme: ExampleTheme;
  highlight?: boolean;
}) {
  const entries: [string, number][] = [
    ["Q", scores.quality],
    ["E", scores.export],
    ["L", scores.license],
    ["S", scores.speed],
  ];
  return (
    <div className="mt-3 flex items-center gap-2.5">
      {entries.map(([label, val]) => (
        <div key={label} className="flex items-center gap-1.5">
          <span className="mono text-[9px] uppercase tracking-[0.18em] text-[var(--muted)]">{label}</span>
          <span className="relative block h-1.5 w-12 overflow-hidden rounded-full bg-black/10">
            <span
              className={`absolute inset-y-0 left-0 rounded-full ${highlight ? theme.accent : "bg-[var(--ink-soft)]"}`}
              style={{ width: `${val * 10}%` }}
            />
          </span>
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Shared sections                                                             */
/* -------------------------------------------------------------------------- */

function ProofSection({ theme }: { theme: ExampleTheme }) {
  return (
    <section className={`mt-16 overflow-hidden rounded-[2rem] border bg-white/55 ${theme.rule}`}>
      <div className="grid gap-7 p-7 sm:p-9 md:grid-cols-[0.95fr_1.05fr] md:items-center">
        <div>
          <span className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
            Why it works
          </span>
          <h2 className="mt-4 text-balance text-[2rem] font-semibold leading-tight tracking-[-0.03em] text-[var(--ink)] sm:text-[2.3rem]">
            Built around a concrete workflow, not generic AI claims.
          </h2>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex -space-x-2">
              {["Em", "Jo", "Ka", "Le"].map((init, i) => (
                <span
                  key={init}
                  className="grid h-9 w-9 place-items-center rounded-full border-2 border-white text-[11px] font-bold text-white"
                  style={{
                    background: ["#ef7a1a", "#0ea374", "#6e5ae6", "#ff3a8c"][i],
                  }}
                >
                  {init}
                </span>
              ))}
            </div>
            <p className="max-w-[18rem] text-xs leading-5 text-[var(--ink-soft)]">
              <span className="font-semibold text-[var(--ink)]">12k+ creators</span> ship classroom packs, sticker bundles, and printables this week.
            </p>
          </div>
        </div>
        <div className="grid gap-3">
          {[
            { icon: <IconBolt className="h-4 w-4" />, value: "3 steps", label: "Prompt, style, export — that's it." },
            { icon: <IconLayers className="h-4 w-4" />, value: "PNG-ready", label: "Transparent output is the default, not a Pro feature." },
            { icon: <IconTarget className="h-4 w-4" />, value: "Categories", label: "Search-shaped paths connect to clip art collections." },
          ].map((row) => (
            <div key={row.value} className={`flex items-center gap-4 rounded-2xl border bg-white px-5 py-4 ${theme.rule}`}>
              <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl text-white ${theme.accent}`}>
                {row.icon}
              </span>
              <div>
                <p className={`text-xl font-bold tracking-[-0.01em] ${theme.accentText}`}>{row.value}</p>
                <p className="mt-0.5 text-sm text-[var(--ink-soft)]">{row.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection({ page, theme }: { page: ExamplePage; theme: ExampleTheme }) {
  return (
    <section id="faq" className="mt-16">
      <SectionIntro
        eyebrow="FAQ"
        title="Questions buyers ask before they switch."
        copy="Real comparison pages cover commercial use, transparency, and licensing — not just feature lists."
      />
      <ul className={`mt-7 overflow-hidden rounded-3xl border bg-white/65 ${theme.rule}`}>
        {page.faq.map((f, i) => (
          <li key={f.q} className={i !== 0 ? "border-t border-[var(--rule)]" : ""}>
            <details className="group">
              <summary className="flex cursor-pointer items-start justify-between gap-4 px-6 py-5 text-left [&::-webkit-details-marker]:hidden">
                <div className="flex items-start gap-3">
                  <span className={`mono mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md text-[10px] font-bold ${theme.soft} ${theme.softInk}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] font-semibold leading-snug text-[var(--ink)]">
                    {f.q}
                  </span>
                </div>
                <span
                  aria-hidden="true"
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border bg-white text-[var(--ink-soft)] transition group-open:rotate-45 ${theme.rule}`}
                >
                  +
                </span>
              </summary>
              <p className="px-6 pb-6 pl-[60px] text-sm leading-7 text-[var(--ink-soft)]">{f.a}</p>
            </details>
          </li>
        ))}
      </ul>
    </section>
  );
}

function InternalLinks({ page, theme }: { page: ExamplePage; theme: ExampleTheme }) {
  return (
    <section className={`mt-16 rounded-3xl border bg-white/65 p-7 ${theme.rule}`}>
      <div className="flex items-center justify-between gap-4">
        <span className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
          Keep exploring
        </span>
        <a href="#" className={`mono text-[11px] uppercase tracking-[0.18em] ${theme.accentText}`}>
          See all examples →
        </a>
      </div>
      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        {examplePages
          .filter((p) => p.slug !== page.slug)
          .map((p) => (
            <Link
              key={p.slug}
              href={`/examples/${p.slug}`}
              className={`flex items-center gap-3 rounded-2xl border bg-white px-4 py-3.5 text-sm text-[var(--ink)] transition hover:shadow-sm ${theme.rule}`}
            >
              <span className={`mono rounded-full px-2 py-1 text-[9px] uppercase tracking-[0.18em] ${theme.chip}`}>
                {labelFor(p.type)}
              </span>
              <span className="flex-1 truncate font-medium">{p.title}</span>
              <span aria-hidden="true" className="text-[var(--muted)]">→</span>
            </Link>
          ))}
      </div>
    </section>
  );
}

function ProductCta({ theme }: { theme: ExampleTheme }) {
  return (
    <section className={`mt-16 overflow-hidden rounded-[2rem] ${theme.darkPanel}`}>
      <div className="grid gap-7 p-7 sm:p-10 md:grid-cols-[1.3fr_0.7fr] md:items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/15">
              <IconWand className="h-4 w-4 text-white" />
            </span>
            <span className="mono text-[11px] uppercase tracking-[0.22em] opacity-70">
              Ready to make clip art?
            </span>
          </div>
          <h2 className="mt-4 max-w-2xl text-balance text-[2rem] font-semibold leading-tight tracking-[-0.03em] sm:text-[2.5rem]">
            Make a transparent PNG asset in under 60 seconds.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 opacity-75">
            Describe what you need, choose a style, and export the asset for your classroom,
            shop, post, printable, or project. Free to start, no card required.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#"
              className={`inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--ink)] transition hover:bg-white/90`}
            >
              <IconSparkle className="h-4 w-4" /> Start creating free
            </a>
            <a
              href="#compare"
              className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
            >
              Compare first
            </a>
          </div>
          <p className="mt-4 flex items-center gap-2 text-xs opacity-70">
            <IconCheck className="h-3.5 w-3.5" /> Free generations
            <span>·</span>
            <IconCheck className="h-3.5 w-3.5" /> Transparent PNG
            <span>·</span>
            <IconCheck className="h-3.5 w-3.5" /> Commercial license on Pro
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {(["star", "robot", "flower", "cat"] as const).map((k, i) => (
            <ClipArt key={k} kind={k} tone={i % 2 === 0 ? "pink" : "blue"} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PageCoverage({ page, theme }: { page: ExamplePage; theme: ExampleTheme }) {
  return (
    <section className="mt-16">
      <SectionIntro
        eyebrow="Page modules"
        title="What this SEO landing page covers"
        copy="These are the modules a real generated page would hand you — before editorial review and publishing."
      />
      <ul className="mt-7 grid gap-3 sm:grid-cols-2">
        {page.highlights.map((h) => (
          <li
            key={h}
            className={`flex items-start gap-3 rounded-2xl border bg-white/65 p-5 ${theme.rule}`}
          >
            <span className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg ${theme.soft} ${theme.softInk}`}>
              <IconCheck className="h-3.5 w-3.5" />
            </span>
            <span className="text-sm leading-6 text-[var(--ink-soft)]">{h}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Small components                                                            */
/* -------------------------------------------------------------------------- */

function SectionIntro({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <div>
      <span className="mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
        {eyebrow}
      </span>
      <h2 className="mt-4 max-w-3xl text-balance text-[2rem] font-semibold leading-[1.1] tracking-[-0.03em] text-[var(--ink)] sm:text-[2.3rem]">
        {title}
      </h2>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--ink-soft)]">{copy}</p>
    </div>
  );
}

function PriceCard({
  theme,
  highlight,
  brandGlyph,
  title,
  tier,
  price,
  priceNote,
  note,
  features,
  cool,
}: {
  theme: ExampleTheme;
  highlight?: boolean;
  brandGlyph: React.ReactNode;
  title: string;
  tier: string;
  price: string;
  priceNote: string;
  note: string;
  features: string[];
  cool?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border p-6 ${
        highlight ? `${theme.card} shadow-[0_20px_60px_-30px_rgba(0,0,0,0.25)]` : `bg-white/65 ${theme.rule}`
      } ${theme.rule}`}
    >
      {highlight ? (
        <span className={`absolute right-5 top-5 mono rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-white ${theme.accent}`}>
          Featured
        </span>
      ) : null}
      <div className="flex items-center gap-3">
        {brandGlyph}
        <div>
          <h3 className="text-xl font-semibold text-[var(--ink)]">{title}</h3>
          <p className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">{tier}</p>
        </div>
      </div>
      <div className="mt-6 flex items-baseline gap-2">
        <p className={`text-[2.4rem] font-bold leading-none tracking-[-0.03em] ${highlight ? theme.accentText : "text-[var(--ink)]"}`}>
          {price}
        </p>
        <p className="text-xs text-[var(--muted)]">{priceNote}</p>
      </div>
      <p className="mt-4 text-sm leading-6 text-[var(--ink-soft)]">{note}</p>
      <ul className="mt-5 space-y-2.5 text-[13px] text-[var(--ink)]">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <IconCheck
              className={`mt-0.5 h-4 w-4 shrink-0 ${highlight ? theme.accentText : cool ? "text-[#006a73]" : "text-[var(--signal-deep)]"}`}
            />
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

function UseCaseCard({
  theme,
  highlight,
  title,
  items,
}: {
  theme: ExampleTheme;
  highlight?: boolean;
  title: string;
  items: string[];
}) {
  return (
    <div
      className={`rounded-3xl border p-6 ${highlight ? `${theme.card}` : `bg-white/65 ${theme.rule}`} ${theme.rule}`}
    >
      <h3 className="text-xl font-semibold tracking-[-0.01em] text-[var(--ink)]">{title}</h3>
      <ul className="mt-5 space-y-3 text-sm text-[var(--ink-soft)]">
        {items.map((i) => (
          <li key={i} className="flex items-start gap-3">
            <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${highlight ? theme.accent : "bg-[var(--signal-deep)]"}`} />
            <span className="leading-6">{i}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BrowserMock({
  label,
  theme: _theme,
  compact = false,
  tint,
  children,
}: {
  label: string;
  theme: ExampleTheme;
  compact?: boolean;
  tint?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="overflow-hidden rounded-xl border border-black/15 bg-white shadow-[0_18px_40px_-25px_rgba(0,0,0,0.4)]"
      style={tint ? { background: tint } : undefined}
    >
      <div className="flex items-center gap-2 border-b border-black/10 bg-black/[0.03] px-2.5 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#febc2e]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]" />
        <div className="mono mx-auto flex items-center gap-1 truncate rounded-full bg-white px-2 py-[2px] text-[9px] text-[var(--muted)]">
          <svg viewBox="0 0 12 12" className="h-2 w-2" fill="none">
            <path d="M8 5V4a2 2 0 0 0-4 0v1" stroke="currentColor" strokeWidth="1.2" />
            <rect x="3" y="5" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1.2" />
          </svg>
          {label}
        </div>
      </div>
      {compact ? children : <div className="p-3">{children}</div>}
    </div>
  );
}

function BrandGlyph({
  glyph,
  color,
  size = "md",
}: {
  glyph: string;
  color: string;
  size?: "xs" | "md" | "lg";
}) {
  const dim = size === "xs" ? "h-6 w-6 text-[10px]" : size === "lg" ? "h-12 w-12 text-base" : "h-10 w-10 text-sm";
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-xl font-bold tracking-tight text-white shadow-[0_2px_0_rgba(0,0,0,0.08)] ${dim}`}
      style={{ background: color }}
    >
      {glyph}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Clip-art illustration library                                               */
/* -------------------------------------------------------------------------- */

type ClipArtKind =
  | "cat"
  | "robot"
  | "flower"
  | "star"
  | "cupcake"
  | "rainbow"
  | "sun"
  | "balloon"
  | "heart"
  | "dinosaur";
type ClipArtTone = "default" | "pink" | "blue" | "green";

const TONE_BG: Record<ClipArtTone, string> = {
  default: "#fff4d6",
  pink: "#ffe1ec",
  blue: "#dbe9ff",
  green: "#dff2dc",
};

function ClipArt({
  kind,
  tone = "default",
  size = "md",
}: {
  kind: ClipArtKind;
  tone?: ClipArtTone;
  size?: "xs" | "md";
}) {
  const dim = size === "xs" ? "aspect-square" : "aspect-square";
  return (
    <div className={`relative ${dim} overflow-hidden rounded-xl border border-black/10`}>
      <ClipArtSvg kind={kind} tone={tone} rounded />
    </div>
  );
}

function ClipArtSvg({
  kind,
  tone = "default",
  rounded = true,
}: {
  kind: ClipArtKind;
  tone?: ClipArtTone;
  rounded?: boolean;
}) {
  const bg = TONE_BG[tone];
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
      <rect width="64" height="64" rx={rounded ? 10 : 0} fill={bg} />
      {renderClipArt(kind, tone)}
    </svg>
  );
}

function renderClipArt(kind: ClipArtKind, tone: ClipArtTone) {
  switch (kind) {
    case "cat":
      return (
        <g>
          <path d="M20 22 L24 12 L28 24 Z" fill="#9b6b3a" />
          <path d="M36 24 L40 12 L44 22 Z" fill="#9b6b3a" />
          <path d="M22 22 L25 16 L27 23 Z" fill="#ffb1cd" />
          <path d="M37 23 L40 16 L42 22 Z" fill="#ffb1cd" />
          <ellipse cx="32" cy="36" rx="14" ry="13" fill="#c9a584" />
          <circle cx="27" cy="34" r="1.8" fill="#1a1a1a" />
          <circle cx="37" cy="34" r="1.8" fill="#1a1a1a" />
          <circle cx="27.5" cy="33.4" r="0.6" fill="#fff" />
          <circle cx="37.5" cy="33.4" r="0.6" fill="#fff" />
          <path d="M30.5 38 L32 39.5 L33.5 38" fill="#ffb1cd" />
          <path d="M29 41 Q32 43 35 41" stroke="#3a1f10" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          <path d="M20 36 L16 35 M20 38 L16 39 M44 36 L48 35 M44 38 L48 39" stroke="#3a1f10" strokeWidth="0.8" strokeLinecap="round" />
        </g>
      );
    case "robot":
      return (
        <g>
          <rect x="31" y="10" width="2" height="6" fill="#5570a8" />
          <circle cx="32" cy="9" r="2" fill="#ffc233" />
          <rect x="16" y="20" width="32" height="28" rx="4" fill={tone === "pink" ? "#e89bbb" : tone === "blue" ? "#4f7ec7" : tone === "green" ? "#5fb360" : "#5570a8"} />
          <rect x="20" y="26" width="24" height="14" rx="3" fill="#1f2a44" />
          <circle cx="26" cy="33" r="3" fill="#ffd166" />
          <circle cx="38" cy="33" r="3" fill="#ffd166" />
          <circle cx="26" cy="33" r="1.2" fill="#3a2400" />
          <circle cx="38" cy="33" r="1.2" fill="#3a2400" />
          <rect x="27" y="43" width="10" height="2" rx="1" fill="#1f2a44" />
          <rect x="11" y="28" width="4" height="14" rx="1.5" fill="#5570a8" />
          <rect x="49" y="28" width="4" height="14" rx="1.5" fill="#5570a8" />
          <rect x="20" y="50" width="8" height="6" rx="1" fill="#3a4566" />
          <rect x="36" y="50" width="8" height="6" rx="1" fill="#3a4566" />
        </g>
      );
    case "flower":
      return (
        <g>
          <path d="M32 42 L32 56" stroke="#3a7a3e" strokeWidth="3" strokeLinecap="round" />
          <path d="M32 50 Q26 48 22 50" stroke="#3a7a3e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M32 47 Q38 45 42 47" stroke="#3a7a3e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <circle cx="32" cy="22" r="8" fill={tone === "blue" ? "#4f7ec7" : tone === "green" ? "#5fb360" : "#e83a59"} />
          <circle cx="22" cy="30" r="8" fill={tone === "blue" ? "#4f7ec7" : tone === "green" ? "#5fb360" : "#e83a59"} />
          <circle cx="42" cy="30" r="8" fill={tone === "blue" ? "#4f7ec7" : tone === "green" ? "#5fb360" : "#e83a59"} />
          <circle cx="26" cy="40" r="8" fill={tone === "blue" ? "#4f7ec7" : tone === "green" ? "#5fb360" : "#e83a59"} />
          <circle cx="38" cy="40" r="8" fill={tone === "blue" ? "#4f7ec7" : tone === "green" ? "#5fb360" : "#e83a59"} />
          <circle cx="32" cy="31" r="6" fill="#ffd166" />
          <circle cx="30" cy="29" r="1.2" fill="#a87807" />
          <circle cx="34" cy="29" r="1.2" fill="#a87807" />
          <path d="M30 33 Q32 34.5 34 33" stroke="#a87807" strokeWidth="1" fill="none" strokeLinecap="round" />
        </g>
      );
    case "star":
      return (
        <g>
          <path d="M32 10 L37.5 25 L53 26 L41 36 L45 51 L32 43 L19 51 L23 36 L11 26 L26.5 25 Z" fill="#ffc233" stroke="#a87807" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M28 28 Q32 30 36 28" stroke="#a87807" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          <circle cx="28" cy="24" r="1.2" fill="#a87807" />
          <circle cx="36" cy="24" r="1.2" fill="#a87807" />
          <path d="M22 18 L24 22" stroke="#fff5cc" strokeWidth="2" strokeLinecap="round" />
        </g>
      );
    case "cupcake":
      return (
        <g>
          <path d="M16 38 L22 56 L42 56 L48 38 Z" fill="#d99052" />
          <path d="M20 41 L44 41 M21 46 L43 46 M22 51 L42 51" stroke="#7a4b1a" strokeWidth="0.9" strokeDasharray="2 2.5" />
          <ellipse cx="32" cy="34" rx="16" ry="10" fill={tone === "blue" ? "#bcd1ff" : tone === "green" ? "#bce6c0" : "#ffb1cd"} />
          <ellipse cx="32" cy="28" rx="11" ry="7" fill={tone === "blue" ? "#bcd1ff" : tone === "green" ? "#bce6c0" : "#ffb1cd"} />
          <ellipse cx="32" cy="22" rx="6" ry="5" fill={tone === "blue" ? "#bcd1ff" : tone === "green" ? "#bce6c0" : "#ffb1cd"} />
          <circle cx="32" cy="16" r="3.5" fill="#e83a59" />
          <rect x="31" y="9" width="1.5" height="6" fill="#3a7a3e" />
          <circle cx="24" cy="32" r="1.2" fill="#fff" opacity="0.6" />
          <circle cx="38" cy="34" r="1.2" fill="#fff" opacity="0.6" />
          <circle cx="30" cy="36" r="1" fill="#fff" opacity="0.6" />
        </g>
      );
    case "rainbow":
      return (
        <g>
          <path d="M10 48 A22 22 0 0 1 54 48" stroke="#e83a59" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M14 48 A18 18 0 0 1 50 48" stroke="#ff9933" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M18 48 A14 14 0 0 1 46 48" stroke="#ffc233" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M22 48 A10 10 0 0 1 42 48" stroke="#5fb360" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M26 48 A6 6 0 0 1 38 48" stroke="#4f7ec7" strokeWidth="4" fill="none" strokeLinecap="round" />
          <ellipse cx="12" cy="50" rx="5" ry="3" fill="#ffffff" />
          <ellipse cx="52" cy="50" rx="5" ry="3" fill="#ffffff" />
          <circle cx="9" cy="50" r="1.5" fill="#dde6f0" />
          <circle cx="14" cy="49" r="1.2" fill="#dde6f0" />
          <circle cx="49" cy="50" r="1.5" fill="#dde6f0" />
          <circle cx="54" cy="49" r="1.2" fill="#dde6f0" />
        </g>
      );
    case "sun":
      return (
        <g>
          <g stroke="#ffc233" strokeWidth="3.5" strokeLinecap="round">
            <path d="M32 8 L32 16" />
            <path d="M32 48 L32 56" />
            <path d="M8 32 L16 32" />
            <path d="M48 32 L56 32" />
            <path d="M15 15 L20 20" />
            <path d="M44 44 L49 49" />
            <path d="M15 49 L20 44" />
            <path d="M44 20 L49 15" />
          </g>
          <circle cx="32" cy="32" r="12" fill="#ffd966" stroke="#e0a800" strokeWidth="1.5" />
          <circle cx="28" cy="30" r="1.6" fill="#3a2400" />
          <circle cx="36" cy="30" r="1.6" fill="#3a2400" />
          <path d="M27 35 Q32 39 37 35" stroke="#3a2400" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <circle cx="25" cy="35" r="2" fill="#ffb1cd" opacity="0.7" />
          <circle cx="39" cy="35" r="2" fill="#ffb1cd" opacity="0.7" />
        </g>
      );
    case "balloon":
      return (
        <g>
          <path d="M32 44 Q34 50 30 56" stroke="#888" strokeWidth="0.8" fill="none" />
          <ellipse cx="32" cy="26" rx="14" ry="16" fill={tone === "blue" ? "#7a9ce0" : tone === "green" ? "#7ac480" : "#c084fc"} />
          <path d="M32 42 L29 47 L35 47 Z" fill={tone === "blue" ? "#5570a8" : tone === "green" ? "#4f8a55" : "#9457dc"} />
          <ellipse cx="26" cy="20" rx="3" ry="5" fill="#ffffff" opacity="0.5" transform="rotate(-15 26 20)" />
          <ellipse cx="38" cy="34" rx="2" ry="3" fill="#ffffff" opacity="0.3" />
        </g>
      );
    case "heart":
      return (
        <g>
          <path
            d="M32 52 C14 38, 10 26, 17 19 C24 12, 32 18, 32 25 C32 18, 40 12, 47 19 C54 26, 50 38, 32 52 Z"
            fill={tone === "blue" ? "#4f7ec7" : tone === "green" ? "#5fb360" : "#e83a59"}
          />
          <ellipse cx="24" cy="24" rx="4" ry="6" fill="#ffffff" opacity="0.45" transform="rotate(-30 24 24)" />
          <ellipse cx="40" cy="28" rx="1.5" ry="2.5" fill="#ffffff" opacity="0.3" transform="rotate(-30 40 28)" />
        </g>
      );
    case "dinosaur":
      return (
        <g>
          <path d="M8 48 Q10 36 22 34 L26 22 Q34 14 44 22 L48 30 Q56 30 56 40 L52 44 L46 42 L42 50 L36 50 L36 44 L24 44 L24 50 L18 50 L18 44 Q14 44 12 48 Z" fill="#5fb360" />
          <path d="M28 28 L31 30 L29 24 Z M32 26 L35 28 L33 22 Z M36 24 L39 26 L37 20 Z" fill="#3a7a3e" />
          <circle cx="42" cy="24" r="2" fill="#ffffff" />
          <circle cx="42.5" cy="24" r="1" fill="#1a3a1a" />
          <path d="M45 27 Q47 28 47 30" stroke="#3a7a3e" strokeWidth="1" fill="none" />
          <circle cx="26" cy="38" r="1" fill="#3a7a3e" />
          <circle cx="32" cy="40" r="1" fill="#3a7a3e" />
        </g>
      );
    default:
      return null;
  }
}

/* -------------------------------------------------------------------------- */
/* Icon library                                                                */
/* -------------------------------------------------------------------------- */

type IconProps = { className?: string };

function IconSparkle({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2L13.7 9.3 21 11 13.7 12.7 12 20 10.3 12.7 3 11 10.3 9.3z" />
      <path d="M19 3l0.6 2.4L22 6l-2.4 0.6L19 9l-0.6-2.4L16 6l2.4-0.6z" opacity="0.6" />
    </svg>
  );
}
function IconWand({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 4l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" fill="currentColor" />
      <path d="M3 21l9-9" />
      <path d="M12 12l3 3" />
    </svg>
  );
}
function IconBolt({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M13 2L4 14h7l-2 8 9-12h-7z" />
    </svg>
  );
}
function IconCheck({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12l5 5L20 6" />
    </svg>
  );
}
function IconX({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
function IconDash({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
      <path d="M6 12h12" />
    </svg>
  );
}
function IconDownload({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    </svg>
  );
}
function IconLock({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}
function IconLayers({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l9 5-9 5-9-5z" />
      <path d="M3 13l9 5 9-5" />
      <path d="M3 18l9 5 9-5" />
    </svg>
  );
}
function IconTarget({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
    </svg>
  );
}
function IconImage({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="9" cy="10" r="1.6" />
      <path d="M21 16l-5-5-9 9" />
    </svg>
  );
}
function IconPalette({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3a9 9 0 1 0 0 18c1.5 0 1.5-1 1-2-0.5-1 0-2 1.5-2H17a4 4 0 0 0 4-4c0-5-4-10-9-10z" />
      <circle cx="8" cy="10" r="1.2" fill="currentColor" />
      <circle cx="12" cy="7" r="1.2" fill="currentColor" />
      <circle cx="16" cy="10" r="1.2" fill="currentColor" />
    </svg>
  );
}
function IconBrush({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 3l5 5-9 9H7v-5z" />
      <path d="M7 17l-3 4 4-3" />
    </svg>
  );
}
function IconPen({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 3l5 5L8 21H3v-5z" />
    </svg>
  );
}
function IconBook({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" />
      <path d="M4 19V5" />
    </svg>
  );
}
function IconStorefront({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 9l2-5h14l2 5" />
      <path d="M3 9v11h18V9" />
      <path d="M9 20v-6h6v6" />
    </svg>
  );
}
function IconTag({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 12l-8 8-9-9V3h8z" />
      <circle cx="7.5" cy="7.5" r="1.4" fill="currentColor" />
    </svg>
  );
}
function IconAlert({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 4l10 17H2z" />
      <path d="M12 10v5" />
      <circle cx="12" cy="18" r="0.8" fill="currentColor" />
    </svg>
  );
}
function IconVerified({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2l2.6 1.8L18 3l1 3.4L22 8l-1.6 3L22 14l-3 1.6L18 19l-3.4-0.8L12 20l-2.6-1.8L6 19l-1-3.4L2 14l1.6-3L2 8l3-1.6L6 3l3.4 0.8z" />
      <path d="M8.5 12l2.5 2.5 4.5-5" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconTrophy({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 4h10v5a5 5 0 0 1-10 0z" />
      <path d="M5 6H3v2a3 3 0 0 0 4 2.8" />
      <path d="M19 6h2v2a3 3 0 0 1-4 2.8" />
      <path d="M9 14h6l1 6H8z" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                     */
/* -------------------------------------------------------------------------- */

function themeFor(page: ExamplePage) {
  return exampleThemes[page.slug] ?? exampleThemes["clip-art-vs-canva"];
}

function labelFor(type: ExamplePage["type"]) {
  return type === "vs"
    ? "Comparison"
    : type === "alt"
      ? "Alternative"
      : type === "best"
        ? "Best-of"
        : type === "faq"
          ? "FAQ hub"
          : "Category";
}

function heroHeadlineFor(page: ExamplePage) {
  if (page.type === "vs" && page.competitors) {
    return `${page.competitors.a} vs ${page.competitors.b}: which one ships clip art faster?`;
  }
  if (page.type === "alt") {
    return "The Canva alternative built for clip art, not for layouts.";
  }
  return "The best AI clip art generators in 2026, scored on the four things that matter.";
}

function heroSubcopyFor(page: ExamplePage) {
  if (page.type === "vs") {
    return "Side-by-side on output, exports, license, and speed. Skim the table, see the workflow, pick the one that matches the job you're actually trying to do.";
  }
  if (page.type === "alt") {
    return "Six alternatives ranked, each with a one-line job, a sample of what its output looks like, and a clear note on when the incumbent still wins.";
  }
  return "Six tools ranked across output quality, export format, license clarity, and creation speed — with sample outputs from each so the score is visible, not just claimed.";
}

function heroStatsFor(page: ExamplePage) {
  return [
    { label: "Search intent", value: page.intent, icon: <IconTarget className="h-3.5 w-3.5" /> },
    { label: "Difficulty", value: page.difficulty, icon: <IconBolt className="h-3.5 w-3.5" /> },
    { label: "Output type", value: "Transparent PNG", icon: <IconLayers className="h-3.5 w-3.5" /> },
  ];
}
