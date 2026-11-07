import { COMPANY, UPDATED, type Block, type Doc } from "@/lib/legal";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

/* seopage.com's legal pages (2026-11-06): the same shape as esy.com's (the promise and short points
   first, then numbered sections that each open with a one-line answer), in seopage.com's own light
   style. One component for /terms, /privacy and /cookies; the text is in lib/legal.ts. */

function Address() {
  return (
    <address className="my-3 not-italic leading-relaxed text-ink-2">
      <b className="text-ink">{COMPANY.name}</b>
      {COMPANY.lines.map((l) => <span key={l} className="block">{l}</span>)}
    </address>
  );
}

function Body({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        if (typeof b === "string") return <p key={i} className="mb-4 leading-relaxed text-ink-2">{b}</p>;
        if ("list" in b) return <ul key={i} className="mb-4 ml-5 list-disc space-y-1.5 leading-relaxed text-ink-2">{b.list.map((x) => <li key={x}>{x}</li>)}</ul>;
        return <Address key={i} />;
      })}
    </>
  );
}

export function LegalPage({ doc, others }: { doc: Doc; others: { label: string; href: string }[] }) {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="border-b border-line">
          <div className="mx-auto max-w-6xl px-5 pb-12 pt-14 sm:px-8 lg:pt-20">
            <h1 className="kicker">{doc.kicker}</h1>
            <p className="display mt-4 max-w-3xl text-balance text-[2.2rem] leading-[1.05] text-ink sm:text-[3rem]">{doc.title}</p>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">{doc.promise}</p>
            <p className="mono mt-5 text-[0.72rem] uppercase tracking-[0.14em] text-muted">Updated {UPDATED} &middot; {COMPANY.name}</p>
          </div>
        </section>

        <section className="border-b border-line bg-surface-2">
          <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
            <span className="kicker">The short version</span>
            <ol className={`mt-6 grid gap-4 ${doc.short.length > 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-3"}`}>
              {doc.short.map((x, i) => (
                <li key={x.title} className="rounded-xl border border-line bg-surface p-5">
                  <span className="mono text-[0.72rem] text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <b className="mt-2 block text-ink">{x.title}</b>
                  <p className="mt-1 text-[0.95rem] leading-relaxed text-ink-2">{x.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[240px_minmax(0,1fr)]">
          <nav aria-label="Sections" className="lg:sticky lg:top-24 lg:self-start">
            <p className="mono mb-3 text-[0.7rem] uppercase tracking-[0.14em] text-muted">On this page</p>
            <ol className="space-y-1.5 text-sm">
              {doc.sections.map((s, i) => (
                <li key={s.id}><a href={`#${s.id}`} className="flex gap-2 text-ink-2 hover:text-accent"><span className="mono w-5 text-muted">{i + 1}</span>{s.title}</a></li>
              ))}
            </ol>
            <p className="mono mb-2 mt-8 text-[0.7rem] uppercase tracking-[0.14em] text-muted">Also</p>
            <ul className="space-y-1.5 text-sm">{others.map((o) => <li key={o.href}><a href={o.href} className="text-ink-2 hover:text-accent">{o.label}</a></li>)}</ul>
          </nav>
          <article className="max-w-3xl">
            {doc.sections.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-24 pb-8">
                <h2 className="display flex items-baseline gap-3 text-[1.5rem] leading-tight text-ink">
                  <span className="mono text-[0.8rem] text-accent">{i + 1}</span>{s.title}
                </h2>
                <p className="my-3 border-l-[3px] border-accent pl-3 font-medium text-ink">{s.short}</p>
                <Body blocks={s.body} />
              </section>
            ))}
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
