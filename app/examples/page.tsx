import Link from "next/link";
import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { examplePages, pageTypes } from "@/lib/data";

const SAMPLE_REQUEST_HREF =
  "mailto:hello@seopage.com?subject=SEOPage%20sample%20request&body=Site%20URL%3A%20%0ACompetitors%20or%20keywords%3A%20%0A";

const cardThemes: Record<string, { card: string; chip: string; accent: string; motif: string }> = {
  "clip-art-vs-canva": {
    card: "border-[#decfba] bg-[#fff8eb]",
    chip: "border-[#decfba] bg-[#f1e3cb] text-[#6f4b22]",
    accent: "bg-[#f08a24]",
    motif: "Comparison matrix",
  },
  "canva-clip-art-alternative": {
    card: "border-[#b8d9cd] bg-[#f5fffb]",
    chip: "border-[#b8d9cd] bg-[#d7eee6] text-[#1d6654]",
    accent: "bg-[#10a37f]",
    motif: "Switching map",
  },
  "best-ai-clip-art-generator": {
    card: "border-[#cfc8f6] bg-[#fbfaff]",
    chip: "border-[#cfc8f6] bg-[#e4defd] text-[#5440a6]",
    accent: "bg-[#7867e8]",
    motif: "Best-of rubric",
  },
};

export const metadata: Metadata = {
  title: "Examples",
  description:
    "Sample SEO landing pages from SEOPage — comparison, alternatives, best-of, FAQ hubs, and category pages.",
};

export default function ExamplesPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <SiteHeader active="examples" />
      <main className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <header>
          <span className="eyebrow">Library</span>
          <h1 className="serif mt-5 max-w-3xl text-balance text-5xl leading-[1.02] tracking-[-0.015em] text-[var(--ink)] sm:text-6xl">
            Sample SEO landing pages.{" "}
            <span className="italic text-[var(--muted)]">See the structure.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--ink-soft)]">
            These examples show the SEO landing page types SEOPage is built to generate.
            They are sample outputs for evaluating structure, flow, and page format.
          </p>
        </header>

        <div className="mt-12 flex flex-wrap gap-2">
          <FilterChip active label="All" href="/examples" />
          {pageTypes.map((p) => (
            <FilterChip
              key={p.key}
              label={p.label}
              href={`/examples?type=${p.key}`}
            />
          ))}
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {examplePages.map((ex) => {
            const theme = cardThemes[ex.slug] ?? cardThemes["clip-art-vs-canva"];
            return (
              <Link
                key={ex.slug}
                href={`/examples/${ex.slug}`}
                className={`group flex h-full flex-col overflow-hidden rounded-3xl border p-6 transition hover:-translate-y-0.5 hover:shadow-xl ${theme.card}`}
              >
                <div className="flex items-center justify-between">
                  <span className={`mono rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.18em] ${theme.chip}`}>
                    {labelFor(ex.type)}
                  </span>
                  <span className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
                    {theme.motif}
                  </span>
                </div>

                <div className="mt-6 rounded-2xl border border-black/10 bg-white/55 p-4">
                  <div className="flex items-center gap-2">
                    <span className={`h-10 w-10 rounded-xl ${theme.accent}`} />
                    <div className="flex-1 space-y-1.5">
                      <div className="h-2 rounded-full bg-black/15" />
                      <div className="h-2 w-2/3 rounded-full bg-black/10" />
                    </div>
                  </div>
                  <div className="mt-4 grid gap-2">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="grid grid-cols-[1fr_60px] gap-2">
                        <div className="h-2.5 rounded-full bg-black/10" />
                        <div className={`h-2.5 rounded-full ${i === 0 ? theme.accent : "bg-black/10"}`} />
                      </div>
                    ))}
                  </div>
                </div>

                <h2 className="mt-6 text-3xl font-semibold leading-tight tracking-[-0.025em] text-[var(--ink)]">
                  {ex.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)]">{ex.subtitle}</p>
                <span className="mt-auto pt-6 text-sm font-medium text-[var(--ink)]">
                  Open sample landing page →
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-16 rounded-3xl border border-[var(--rule)] bg-[var(--paper)] p-8 text-center sm:p-12">
          <h2 className="serif text-balance text-3xl leading-tight text-[var(--ink)] sm:text-4xl">
            Want one for your site?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[var(--ink-soft)]">
            Generate a sample SEO landing page from your URL and see how SEOPage handles
            your product, competitors, and page type.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href={SAMPLE_REQUEST_HREF}
              className="rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-medium text-[var(--paper)] transition hover:bg-[var(--ink-soft)]"
            >
              Request a sample →
            </Link>
            <Link
              href="mailto:hello@seopage.com"
              className="rounded-full border border-[var(--rule-strong)] px-5 py-3 text-sm font-medium text-[var(--ink)] transition hover:bg-[var(--background)]"
            >
              Talk to a human
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function FilterChip({
  active = false,
  label,
  href,
}: {
  active?: boolean;
  label: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className={`rounded-full px-4 py-2 text-xs font-medium transition ${
        active
          ? "bg-[var(--ink)] text-[var(--paper)]"
          : "border border-[var(--rule-strong)] bg-[var(--paper)] text-[var(--ink-soft)] hover:bg-[var(--paper-soft)]"
      }`}
    >
      {label}
    </Link>
  );
}

function labelFor(type: string) {
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
