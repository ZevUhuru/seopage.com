import Link from "next/link";
import { Logo } from "@/components/Logo";
import { LoopVideo } from "@/components/home/LoopVideo";
import { categoriesOf, type Article } from "@/lib/articles";
import { CREATE_URL, PRICE_LABEL } from "@/lib/config";
import { Progress } from "./c-progress";
import { base, fmtDate, pad2, Prose, RankMark, readMinutes, type ArticleProps, type IndexProps } from "./shared";

/* C · CINEMATIC
   The homepage's world, extended. Nora frames every issue the way a
   streaming service frames an episode, so the journal is ready for the Mux
   videos the articles already plan for. The reading body flips to light
   paper: bold chrome, calm reading. */

const PAD = "px-6 sm:px-10 lg:px-24";
const B = base("c");
const CLIPS = ["typing", "proud", "surprised", "waiting", "call"] as const;
const FADE = "lg:[background:linear-gradient(90deg,#04060B_0%,rgba(4,6,11,.86)_30%,rgba(4,6,11,.2)_62%,rgba(4,6,11,0)_100%)]";

/** Until each issue has its own video, it borrows a Nora clip. */
function clipFor(all: Article[], slug: string) {
  return CLIPS[Math.max(0, all.findIndex((a) => a.slug === slug)) % CLIPS.length];
}

function Bar({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <header className={`relative z-10 flex h-[76px] items-center justify-between ${PAD}`}>
      <div className="flex items-center gap-4">
        <Logo tone={tone} className="text-[22px]" />
        <span className={`h-6 w-px ${tone === "dark" ? "bg-white/20" : "bg-black/15"}`} />
        <RankMark href={B} className="text-[22px]" />
      </div>
      <a href={CREATE_URL} className="flex h-11 items-center rounded-full border border-white/30 bg-[#04060B]/35 px-5 font-medium text-[#EEF2FF] backdrop-blur hover:border-white/60">
        Build my page
      </a>
    </header>
  );
}

function Poster({ a, all, wide = false }: { a: Article; all: Article[]; wide?: boolean }) {
  const clip = clipFor(all, a.slug);
  return (
    <Link href={`${B}/${a.slug}`} className={`group relative block shrink-0 snap-start overflow-hidden rounded-[20px] border border-white/12 ${wide ? "w-[86vw] sm:w-[560px]" : "w-[78vw] sm:w-[400px]"}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/home/nora-${clip}.webp`} alt="" className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#04060B] via-[#04060B]/55 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6">
        <span className="flex gap-3 text-[13px] text-[#C9D0E2]">
          <span className="text-[#9DB4FF]">{a.categoryLabel}</span>
          <span>{readMinutes(a.content)} min</span>
          {a.durationSeconds && <span>▶ video soon</span>}
        </span>
        <span className="nh-display text-[26px] leading-[1.04] tracking-[-0.035em]">{a.title}</span>
      </div>
    </Link>
  );
}

export function IndexC({ articles }: IndexProps) {
  const [lead, ...rest] = articles;
  // The lead is the hero; shelves hold everything else so nothing shows twice.
  const shelves = categoriesOf(rest);
  return (
    <main>
      {/* HERO: the latest issue, full bleed */}
      <section className="relative overflow-hidden lg:h-[900px]">
        <LoopVideo src={`/home/nora-${clipFor(articles, lead.slug)}.mp4`} poster={`/home/nora-${clipFor(articles, lead.slug)}.webp`} label="Nora, the illustrated plumber from our homepage, at her shop." className="absolute right-0 top-0 h-full w-full object-cover lg:w-[72%] lg:[mask-image:linear-gradient(90deg,transparent_0%,black_32%)]" />
        <div className={`absolute inset-0 bg-[#04060B]/70 lg:bg-transparent ${FADE}`} />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#04060B] to-transparent" />
        <div className="relative flex h-full flex-col pb-20">
          <Bar />
          <div className={`${PAD} mt-24 flex max-w-[760px] flex-col gap-6 lg:mt-auto`}>
            <p className="text-[18px] font-medium text-[#FF8A7D]">The SEOPage journal · Latest</p>
            <h1 className="nh-display text-[clamp(46px,6vw,86px)] leading-[0.95]">{lead.title}</h1>
            <p className="max-w-[560px] text-[clamp(17px,1.5vw,20px)] leading-[1.55] text-[#C9D0E2]">{lead.description}</p>
            <div className="flex flex-wrap items-center gap-5">
              <Link href={`${B}/${lead.slug}`} className="flex h-[58px] items-center rounded-full bg-[#3D6BFF] px-8 text-[16px] font-semibold text-white hover:bg-[#5A82FF]">
                Read the issue
              </Link>
              <span className="text-[14.5px] text-[#C9D0E2]">{readMinutes(lead.content)} min · {fmtDate(lead.publishedAt, "long")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* SHELVES */}
      {shelves.map(({ category, label }, si) => {
        const items = rest.filter((a) => a.category === category);
        return (
          <section key={category} className="py-14">
            <div className={`${PAD} flex items-baseline justify-between`}>
              <h2 className="nh-display text-[clamp(30px,3vw,44px)] leading-none">{label.endsWith("s") ? label : `${label}s`}</h2>
              <span className="text-[14px] text-[#7D869C]">{items.length} {items.length === 1 ? "issue" : "issues"}</span>
            </div>
            <div className={`rk-scroll mt-7 flex snap-x gap-5 overflow-x-auto ${PAD} scroll-px-6 sm:scroll-px-10 lg:scroll-px-24`}>
              {items.map((a) => (
                <Poster key={a.slug} a={a} all={articles} wide={si === 0} />
              ))}
            </div>
          </section>
        );
      })}

      {/* BAND */}
      <section className="relative mt-10 h-[520px] overflow-hidden lg:h-[660px]">
        <LoopVideo src="/home/nora-waiting.mp4" poster="/home/nora-waiting.webp" label="Nora at her counter, watching a silent phone." className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: "50% 40%" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#04060B]/95 via-[#04060B]/35 to-transparent" />
        <div className={`absolute bottom-16 left-0 ${PAD}`}>
          <p className="nh-display max-w-[1100px] text-[clamp(36px,4.8vw,68px)] leading-none">Reading helps. A page that gets cited helps more.</p>
          <a href={CREATE_URL} className="mt-8 inline-flex h-[58px] items-center rounded-full bg-[#3D6BFF] px-8 text-[16px] font-semibold text-white hover:bg-[#5A82FF]">
            Build my page free · {PRICE_LABEL} to publish
          </a>
        </div>
      </section>
      <p className={`${PAD} py-8 text-[13px] text-[#7D869C]`}>Nora is an illustration, not a customer.</p>
    </main>
  );
}

export function ArticleC({ article, all, related }: ArticleProps) {
  const clip = clipFor(all, article.slug);
  return (
    <main>
      <Progress />
      <section className="relative flex min-h-[min(86vh,820px)] flex-col overflow-hidden">
        <LoopVideo src={`/home/nora-${clip}.mp4`} poster={`/home/nora-${clip}.webp`} label="Nora, the illustrated plumber from our homepage." className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#04060B] via-[#04060B]/60 to-[#04060B]/20" />
        <Bar />
        <div className={`relative mt-auto ${PAD} pb-16`}>
          <p className="flex flex-wrap gap-x-5 text-[15px] text-[#C9D0E2]">
            <Link href={B} className="text-[#9DB4FF] hover:text-white">rank¹</Link>
            <span className="text-[#FF8A7D]">{article.categoryLabel}</span>
            <span>{readMinutes(article.content)} min read</span>
            {article.durationSeconds && <span>▶ Video in production</span>}
          </p>
          <h1 className="nh-display mt-5 max-w-[1150px] text-[clamp(46px,6.6vw,108px)] leading-[0.93]">{article.title}</h1>
        </div>
      </section>

      {/* LIGHT PAPER BODY */}
      <div className="bg-[#F6F5F1] text-[#04060B]">
        <div className="mx-auto max-w-[740px] px-6 py-20 sm:py-24">
          <p className="nh-display text-[clamp(24px,2.3vw,31px)] leading-[1.25] tracking-[-0.03em]">{article.description}</p>
          <div className="mt-8 flex items-center gap-4 border-y border-black/10 py-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/founder-zev-uhuru.png" alt="" className="h-11 w-11 rounded-full object-cover" />
            <div className="text-[14.5px] leading-tight">
              <b className="font-semibold">Zev Uhuru</b>
              <span className="block text-[#646B78]">{fmtDate(article.publishedAt, "long")}</span>
            </div>
          </div>
          <div className="mt-10">
            <Prose content={article.content} className="rk-prose-c" />
          </div>
        </div>
      </div>

      {/* CLOSE, back into the dark */}
      <section className="relative overflow-hidden">
        <LoopVideo src="/home/nora-call.mp4" poster="/home/nora-call.webp" label="Nora smiling on the phone, writing down a new job." className="absolute right-0 top-0 h-full w-full object-cover lg:w-[64%] lg:[mask-image:linear-gradient(90deg,transparent_0%,black_32%)]" style={{ objectPosition: "50% 40%" }} />
        <div className={`absolute inset-0 bg-[#04060B]/75 lg:bg-transparent ${FADE}`} />
        <div className={`relative ${PAD} py-28 lg:py-36`}>
          <h2 className="nh-display max-w-[680px] text-[clamp(44px,5.6vw,84px)] leading-[0.95]">Now make the answer you.</h2>
          <a href={CREATE_URL} className="mt-9 inline-flex h-[58px] items-center rounded-full bg-[#3D6BFF] px-8 text-[16px] font-semibold text-white hover:bg-[#5A82FF]">
            Build my page free
          </a>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-16">
          <h2 className={`${PAD} nh-display text-[36px] leading-none`}>Up next</h2>
          <div className={`rk-scroll mt-7 flex snap-x gap-5 overflow-x-auto ${PAD}`}>
            {related.map((r, i) => (
              <div key={r.slug} className="flex flex-col gap-3">
                <span className="nh-mono text-[12px] text-[#7D869C]">{pad2(i + 1)}</span>
                <Poster a={r} all={all} />
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
