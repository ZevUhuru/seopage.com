import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Tick } from "@/components/home/HeroAnswer";
import { CREATE_URL, PRICE_AFTER_LAUNCH_LABEL, PRICE_LABEL } from "@/lib/config";
import { Ask } from "./b-ask";
import { base, Cite, fmtDate, firstSentence, headingsOf, Prose, RankMark, readMinutes, type ArticleProps, type IndexProps } from "./shared";

/* B · ANSWER ENGINE
   The logo's superscript is the brand: the thing AI puts next to a source.
   So the journal reads the way an AI answer does. The index is a composed
   answer citing each issue; each issue opens with its short answer and
   numbers its sections like sources. */

const PAD = "px-6 sm:px-10 lg:px-24";
const B = base("b");

function Top() {
  return (
    <header className={`${PAD} flex h-20 items-center justify-between`}>
      <div className="flex items-center gap-4">
        <Logo tone="dark" className="text-[22px]" />
        <span className="h-6 w-px bg-white/15" />
        <RankMark href={B} className="text-[22px] text-[#9DB4FF]" n="1" />
      </div>
      <a href={CREATE_URL} className="flex h-11 items-center rounded-full border border-white/30 px-5 font-medium hover:border-white/60">
        Build my page
      </a>
    </header>
  );
}

function PriceCard() {
  return (
    <div className="flex flex-col gap-4 rounded-[24px] border border-[#3D6BFF]/40 bg-gradient-to-b from-[#12204A] to-[#0A0F1E] p-7">
      <span className="text-[15px] text-[#C9D0E2]">Want your page to be the source?</span>
      <span className="flex items-baseline gap-3">
        <span className="nh-display text-[56px] leading-none tracking-[-0.05em]">{PRICE_LABEL}</span>
        <span className="text-[14px] text-[#9DB4FF]">launch price</span>
      </span>
      <ul className="flex flex-col gap-2 border-y border-white/12 py-4 text-[14.5px] text-[#C9D0E2]">
        {["Free preview, no card", "Ten checks before you pay", "You own the page"].map((x) => (
          <li key={x} className="flex items-center gap-2"><Tick />{x}</li>
        ))}
      </ul>
      <a href={CREATE_URL} className="flex h-[52px] items-center justify-center rounded-full bg-[#3D6BFF] font-semibold text-white hover:bg-[#5A82FF]">
        Build my page free
      </a>
      <span className="text-[13px] text-[#7D869C]">{PRICE_AFTER_LAUNCH_LABEL} after launch.</span>
    </div>
  );
}

export function IndexB({ articles }: IndexProps) {
  const sources = articles.map((a, i) => ({
    n: i + 1,
    slug: a.slug,
    title: a.title,
    lead: firstSentence(a.description),
    label: a.categoryLabel,
    date: fmtDate(a.publishedAt),
    minutes: readMinutes(a.content),
    haystack: [a.title, a.description, a.categoryLabel, ...a.tags].join(" ").toLowerCase(),
  }));
  return (
    <main style={{ background: "radial-gradient(60% 50% at 85% 0%, rgba(61,107,255,.16), transparent 70%)" }}>
      <Top />
      <section className={`${PAD} pb-28 pt-14 lg:pt-20`}>
        <h1 className="nh-display max-w-[1000px] text-[clamp(48px,6.2vw,96px)] leading-[0.95]">
          Ask how pages get cited.
          <br />
          <span className="text-[#7D869C]">We answer with the work.</span>
        </h1>
        <Ask sources={sources} base={B} />
      </section>
    </main>
  );
}

export function ArticleB({ article, related }: ArticleProps) {
  const heads = headingsOf(article.content);
  return (
    <main>
      <Top />
      <div className={`${PAD} grid gap-14 pb-24 pt-10 lg:grid-cols-12 lg:pt-16`}>
        <article className="lg:col-span-8">
          <p className="nh-mono truncate text-[13px] text-[#7D869C]">
            <Link href={B} className="hover:text-white">seopage.com › rank</Link> › {article.slug}
          </p>
          <h1 className="nh-display mt-6 text-[clamp(42px,5.2vw,80px)] leading-[0.96]">{article.title}</h1>
          <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[14.5px] text-[#A0A9C0]">
            <span className="text-[#9DB4FF]">{article.categoryLabel}</span>
            <span>Zev Uhuru</span>
            <span>{fmtDate(article.publishedAt, "long")}</span>
            <span>{readMinutes(article.content)} min read</span>
          </p>

          {/* THE SHORT ANSWER */}
          <section className="mt-10 rounded-[24px] border border-white/12 bg-[#0A0F1E] p-7 sm:p-9">
            <p className="flex items-center gap-2 text-[14px] text-[#9DB4FF]">
              <span className="h-2 w-2 rounded-full bg-[#3D6BFF]" />
              The short answer
            </p>
            <p className="mt-4 text-[clamp(20px,1.8vw,24px)] leading-[1.5] text-[#EEF2FF]">{article.description}</p>
            <ol className="mt-7 grid gap-2.5 border-t border-white/12 pt-6 sm:grid-cols-2">
              {heads.map((h, i) => (
                <li key={h.id}>
                  <a href={`#${h.id}`} className="flex items-baseline gap-2.5 text-[15.5px] text-[#C9D0E2] hover:text-white">
                    <Cite n={i + 1} className="!bg-[#3D6BFF] !text-white" />
                    {h.text}
                  </a>
                </li>
              ))}
            </ol>
          </section>

          <div className="mt-6 max-w-[720px]">
            <Prose content={article.content} className="rk-prose-b" h2Prefix={(i) => <Cite n={i + 1} className="shrink-0 text-[0.6em]" />} />
          </div>

          {/* RELATED, AS FOLLOW-UP QUESTIONS */}
          {related.length > 0 && (
            <section className="mt-20 max-w-[720px]">
              <h2 className="nh-display text-[28px] tracking-[-0.03em]">Follow-up questions</h2>
              <ul className="mt-5 border-t border-white/12">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={`${B}/${r.slug}`} className="flex items-center justify-between gap-5 border-b border-white/12 py-5 text-[18px] hover:text-[#9DB4FF]">
                      {r.title}
                      <span className="text-[22px] text-[#7D869C]">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>

        <aside className="lg:col-span-4">
          <div className="sticky top-8 flex flex-col gap-6">
            <div className="rounded-[22px] border border-white/12 p-6">
              <p className="text-[14px] text-[#7D869C]">Sections, cited</p>
              <ol className="mt-3 flex flex-col gap-2.5">
                {heads.map((h, i) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} className="flex items-baseline gap-2.5 text-[14.5px] leading-snug text-[#C9D0E2] hover:text-white">
                      <Cite n={i + 1} />
                      {h.text}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
            <PriceCard />
          </div>
        </aside>
      </div>
    </main>
  );
}
