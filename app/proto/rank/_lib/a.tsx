import Link from "next/link";
import { Logo } from "@/components/Logo";
import { CREATE_URL, PRICE_LABEL } from "@/lib/config";
import { base, fmtDate, headingsOf, pad2, Prose, RankMark, readMinutes, type ArticleProps, type IndexProps } from "./shared";

/* A · FRONT PAGE
   A dark broadsheet. No imagery: the masthead, the numbering, and the
   headline sizes do the work the Nora videos do on the homepage. */

const PAD = "px-6 sm:px-10 lg:px-24";
const B = base("a");

function Strip({ issue }: { issue?: string }) {
  return (
    <div className={`${PAD} flex h-16 items-center justify-between border-b border-white/12`}>
      <div className="flex items-center gap-5">
        <Logo tone="dark" className="text-[20px]" />
        <span className="nh-mono hidden text-[11px] uppercase tracking-[0.16em] text-[#7D869C] sm:inline">{issue ?? "The journal"}</span>
      </div>
      <a href={CREATE_URL} className="flex h-10 items-center rounded-full border border-white/30 px-4 text-[14px] font-medium hover:border-white/60">
        Build my page
      </a>
    </div>
  );
}

function Close() {
  return (
    <section className={`${PAD} border-t border-white/12 bg-[#0A0F1E] py-24 lg:py-32`}>
      <p className="nh-mono text-[12px] uppercase tracking-[0.16em] text-[#FF8A7D]">Stop reading for a second</p>
      <h2 className="nh-display mt-5 max-w-[980px] text-[clamp(44px,6vw,96px)] leading-[0.95]">
        Everything here is how we build your page. <span className="text-[#7D869C]">For {PRICE_LABEL}, once.</span>
      </h2>
      <a href={CREATE_URL} className="mt-10 inline-flex h-[60px] items-center rounded-full bg-[#3D6BFF] px-8 text-[17px] font-semibold text-white hover:bg-[#5A82FF]">
        Build my page free
      </a>
    </section>
  );
}

export function IndexA({ articles }: IndexProps) {
  const [lead, ...rest] = articles;
  const next = rest.slice(0, 3);
  return (
    <main>
      <Strip issue={`No. ${pad2(articles.length)} · ${fmtDate(lead.publishedAt, "long")}`} />

      {/* MASTHEAD */}
      <header className={`${PAD} pb-8 pt-10 lg:pt-14`}>
        <RankMark className="text-[clamp(120px,24vw,380px)] tracking-[-0.07em] !leading-[0.78]" n="1" />
        <div className="mt-8 grid gap-4 border-y border-white/12 py-5 text-[15px] text-[#C9D0E2] md:grid-cols-3">
          <p className="text-[#EEF2FF]">How pages get found on Google and named by AI.</p>
          <p className="md:text-center">The work, not the theory. Written by Zev Uhuru.</p>
          <p className="nh-mono text-[12px] uppercase tracking-[0.14em] text-[#7D869C] md:text-right">{articles.length} issues</p>
        </div>
      </header>

      {/* FRONT */}
      <section className={`${PAD} grid gap-12 pb-24 lg:grid-cols-12 lg:gap-16`}>
        <Link href={`${B}/${lead.slug}`} className="group flex flex-col gap-6 lg:col-span-7">
          <span className="nh-mono text-[12px] uppercase tracking-[0.16em] text-[#FF8A7D]">Latest · {lead.categoryLabel}</span>
          <h1 className="nh-display text-[clamp(44px,5.6vw,88px)] leading-[0.95] transition-colors group-hover:text-[#9DB4FF]">{lead.title}</h1>
          <p className="max-w-[620px] text-[clamp(18px,1.5vw,21px)] leading-[1.55] text-[#C9D0E2]">{lead.description}</p>
          <span className="text-[15px] font-medium text-[#9DB4FF]">Read · {readMinutes(lead.content)} min →</span>
        </Link>
        <ol className="flex flex-col lg:col-span-5 lg:border-l lg:border-white/12 lg:pl-12">
          {next.map((a, i) => (
            <li key={a.slug} className="border-b border-white/12 first:border-t lg:first:border-t-0">
              <Link href={`${B}/${a.slug}`} className="group grid grid-cols-[64px_1fr] gap-4 py-7 lg:first:pt-0">
                <span className="nh-display text-[48px] leading-[0.85] text-[#FF6B5C]">{pad2(i + 2)}</span>
                <span className="flex flex-col gap-2">
                  <span className="nh-mono text-[11px] uppercase tracking-[0.14em] text-[#7D869C]">{a.categoryLabel}</span>
                  <span className="nh-display text-[26px] leading-[1.05] tracking-[-0.035em] transition-colors group-hover:text-[#9DB4FF]">{a.title}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* THE INDEX */}
      <section className={`${PAD} border-t border-white/12 py-20 lg:py-28`}>
        <div className="flex items-end justify-between gap-6">
          <h2 className="nh-display text-[clamp(40px,5vw,72px)] leading-none">Every issue.</h2>
          <span className="nh-mono text-[12px] uppercase tracking-[0.14em] text-[#7D869C]">Newest first</span>
        </div>
        <ul className="mt-12 border-t border-white/12">
          {articles.map((a, i) => (
            <li key={a.slug}>
              <Link
                href={`${B}/${a.slug}`}
                className="group grid grid-cols-[48px_1fr] items-baseline gap-x-5 gap-y-2 border-b border-white/12 py-7 transition-colors hover:bg-[#3D6BFF]/[0.07] md:grid-cols-[64px_1fr_160px_130px_80px]"
              >
                <span className="nh-mono text-[13px] text-[#7D869C]">{pad2(articles.length - i)}</span>
                <span className="nh-display text-[clamp(22px,2.2vw,32px)] leading-[1.08] tracking-[-0.035em] group-hover:text-[#9DB4FF]">{a.title}</span>
                <span className="col-start-2 text-[14px] text-[#FF8A7D] md:col-start-auto">{a.categoryLabel}</span>
                <span className="col-start-2 text-[14px] text-[#A0A9C0] md:col-start-auto">{fmtDate(a.publishedAt)}</span>
                <span className="hidden text-right text-[14px] text-[#7D869C] md:block">{readMinutes(a.content)} min</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <Close />
    </main>
  );
}

export function ArticleA({ article, all, related }: ArticleProps) {
  const heads = headingsOf(article.content);
  const no = all.length - all.findIndex((a) => a.slug === article.slug);
  const next = related[0];
  return (
    <main>
      <Strip issue={`No. ${pad2(no)}`} />
      <header className={`${PAD} pb-14 pt-14 lg:pt-20`}>
        <nav className="nh-mono flex items-center gap-3 text-[12px] uppercase tracking-[0.16em]">
          <Link href={B} className="text-[#9DB4FF] hover:text-white">rank¹</Link>
          <span className="text-[#7D869C]">/</span>
          <span className="text-[#FF8A7D]">{article.categoryLabel}</span>
          <span className="text-[#7D869C]">/</span>
          <span className="text-[#7D869C]">No. {pad2(no)}</span>
        </nav>
        <h1 className="nh-display mt-8 max-w-[1180px] text-[clamp(46px,6.8vw,112px)] leading-[0.93]">{article.title}</h1>
        <p className="mt-8 max-w-[760px] text-[clamp(19px,1.7vw,24px)] leading-[1.5] text-[#C9D0E2]">{article.description}</p>
        <div className="mt-10 flex flex-wrap gap-x-10 gap-y-3 border-y border-white/12 py-5 text-[14px] text-[#A0A9C0]">
          <span>By <b className="font-medium text-[#EEF2FF]">Zev Uhuru</b></span>
          <span>{fmtDate(article.publishedAt, "long")}</span>
          <span>{readMinutes(article.content)} min read</span>
          <span>{heads.length} sections</span>
        </div>
      </header>

      <div className={`${PAD} grid gap-12 pb-24 lg:grid-cols-12 lg:gap-16`}>
        <aside className="hidden lg:col-span-3 lg:block">
          <nav className="sticky top-8 flex flex-col gap-1">
            <span className="nh-mono mb-3 text-[11px] uppercase tracking-[0.16em] text-[#7D869C]">In this issue</span>
            {heads.map((h, i) => (
              <a key={h.id} href={`#${h.id}`} className="group grid grid-cols-[32px_1fr] gap-2 border-t border-white/10 py-3 text-[14.5px] leading-snug text-[#A0A9C0] hover:text-white">
                <span className="nh-mono text-[12px] text-[#FF6B5C]">{pad2(i + 1)}</span>
                {h.text}
              </a>
            ))}
          </nav>
        </aside>
        <article className="lg:col-span-7 lg:col-start-5">
          <Prose content={article.content} className="rk-prose-a" />
        </article>
      </div>

      {next && (
        <Link href={`${B}/${next.slug}`} className={`${PAD} group block border-t border-white/12 py-20 lg:py-28`}>
          <span className="nh-mono text-[12px] uppercase tracking-[0.16em] text-[#7D869C]">Next issue →</span>
          <span className="nh-display mt-5 block max-w-[1100px] text-[clamp(40px,5.2vw,80px)] leading-[0.96] transition-colors group-hover:text-[#9DB4FF]">{next.title}</span>
        </Link>
      )}
      <Close />
    </main>
  );
}
