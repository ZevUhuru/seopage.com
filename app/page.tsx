import type { Metadata } from "next";
import Link from "next/link";
import { DarkFooter } from "@/components/DarkFooter";
import { JsonLd } from "@/components/JsonLd";
import { Logo } from "@/components/Logo";
import { PersonalizeProvider } from "@/components/home/Personalize";
import { AlarmTranscript, HeroForm, Tick } from "@/components/home/HeroAnswer";
import { LoopVideo } from "@/components/home/LoopVideo";
import { BuilderDemo } from "@/components/home/BuilderDemo";
import { ChecksExplorer } from "@/components/home/ChecksExplorer";
import { funnelDisplay, funnelSans } from "@/components/home/fonts";
import { FAQS, HOME_SCHEMA } from "@/lib/homeContent";
import { CREATE_URL, PRICE_AFTER_LAUNCH_LABEL, PRICE_LABEL } from "@/lib/config";

/* ================================================================
   One goal: build a page in the builder (free to preview, PRICE_LABEL
   to publish). Problem (hero) → alarm (the answer names someone else)
   → the turn (the click follows the citation) → the builder, replayed
   → proof (our own sites, unedited) → the ten checks → rank vs. cited
   → offer → FAQ (the ranking content) → close → the footer, below the
   closing scene so its links can grow without covering Nora.
   Nora is an illustration and is labeled as one on the page.
   ================================================================ */

export const metadata: Metadata = {
  // Primary keyword ("SEO landing page") front-loaded; see git history for
  // the targeting rationale. Do not swap the term without Zev.
  title: {
    absolute: `SEO Landing Pages That Get Cited by AI and Rank on Google | SEOPage`,
  },
  description: `An SEO landing page is a page built to win one search. Build yours with AI — researched, written, and engineered to rank on Google and get cited by ChatGPT, Perplexity, and AI Overviews. Free to preview, ${PRICE_LABEL} to publish.`,
  alternates: { canonical: "/" },
};

const PAD = "px-6 sm:px-10 lg:px-24";
const SECTION = `${PAD} py-24 lg:py-[136px]`;
const H2 = "nh-display text-[clamp(40px,5vw,72px)] leading-[1]";
const RULE = "border-white/12";

function Stat({ n, text, href, source, color = "#FF6B5C" }: { n: string; text: string; href: string; source: string; color?: string }) {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="nh-display text-[clamp(52px,5vw,72px)] font-medium leading-none tabular-nums" style={{ color }}>
        {n}
      </span>
      <span className="text-[16px] leading-[1.5] text-[#C9D0E2]">{text}</span>
      <a href={href} target="_blank" rel="noopener noreferrer" className="text-[13px] text-[#7D869C] underline-offset-2 hover:underline">
        {source}
      </a>
    </div>
  );
}

export default function Home() {
  return (
    <div className={`nh ${funnelDisplay.variable} ${funnelSans.variable} min-h-screen`}>
      <JsonLd data={HOME_SCHEMA} />
      <PersonalizeProvider>
        {/* HERO */}
        <section className="relative overflow-hidden lg:h-[940px]">
          <LoopVideo
            src="/home/nora-proud.mp4"
            poster="/home/nora-proud.webp"
            label="Nora, a clay-animated plumber, standing outside her shop with a pipe wrench on her shoulder."
            className="absolute right-0 top-0 h-full w-full object-cover lg:w-[72%] lg:[mask-image:linear-gradient(90deg,transparent_0%,black_32%)]"
            style={{ objectPosition: "30% 50%" }}
          />
          <div className="absolute inset-0 bg-[#04060B]/70 lg:bg-transparent lg:[background:linear-gradient(90deg,#04060B_0%,rgba(4,6,11,.86)_30%,rgba(4,6,11,.2)_62%,rgba(4,6,11,0)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#04060B] to-transparent" />

          <div className={`relative flex h-full flex-col ${PAD} pb-16 pt-7`}>
            <header className="flex h-[52px] items-center justify-between">
              <Logo tone="dark" className="text-[26px]" />
              <a href={CREATE_URL} className="flex h-11 items-center rounded-full border border-white/30 bg-[#04060B]/35 px-5 font-medium text-[#EEF2FF] backdrop-blur hover:border-white/60">
                Build my page
              </a>
            </header>

            <div className="mt-24 flex w-full max-w-[640px] flex-col gap-6 lg:mt-auto">
              <h1 className="nh-display text-[clamp(48px,6.2vw,88px)] leading-[0.95]">SEO landing pages that get cited by AI.</h1>
              <p className="max-w-[540px] text-[clamp(17px,1.5vw,20px)] leading-[1.55] text-[#C9D0E2]">
                And rank on Google. Built from live search data for your city, and scored on ten checks before you pay.
              </p>
              <HeroForm />
            </div>
          </div>
          <p className="absolute bottom-16 right-24 hidden text-right text-[14px] text-[#C9D0E2] lg:block">
            <b className="text-[#EEF2FF]">Meet Nora.</b> Master plumber, twelve years in.
            <br />
            Great at her job. Invisible to AI.
          </p>
        </section>

        {/* ALARM */}
        <section className={`${SECTION} flex flex-col gap-14 border-t border-[#FF5A4A]/20`}>
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="flex flex-col gap-6 lg:col-span-6">
              <p className="text-[clamp(18px,1.6vw,22px)] font-medium text-[#FF8A7D]">Right now, someone near you is asking ChatGPT who to hire.</p>
              <h2 className="nh-display text-[clamp(44px,5.6vw,80px)] leading-[0.97]">It&apos;s giving them your competitor&apos;s name.</h2>
              <AlarmTranscript />
            </div>
            <figure className="flex flex-col gap-3 lg:col-span-6">
              <div className="overflow-hidden rounded-3xl border border-white/12 shadow-[0_50px_100px_-50px_rgba(255,90,74,.35)]">
                <LoopVideo src="/home/nora-surprised.mp4" poster="/home/nora-surprised.webp" label="Nora reading her phone in disbelief." className="block aspect-[16/10] w-full object-cover" />
              </div>
              <figcaption className="text-[14px] text-[#A0A9C0]">Nora asked it herself: who&apos;s the best plumber in town? It named the shop across the street.</figcaption>
            </figure>
          </div>
          <div className={`grid gap-10 border-t ${RULE} pt-8 md:grid-cols-3 md:gap-0 md:[&>*+*]:border-l md:[&>*+*]:border-white/12 md:[&>*]:px-10 md:[&>*:first-child]:pl-0`}>
            <Stat n="45%" text="of US consumers now use AI to find a local business. A year earlier it was 6%." href="https://www.brightlocal.com/research/lcrs-ai-trust/" source="BrightLocal, 2026" />
            <Stat n="8 in 100" text="click a result when Google answers first with an AI summary. Without one, 15 do." href="https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/" source="Pew Research, 2025" />
            <Stat n="−58%" text="fewer clicks for the #1 Google result when an AI Overview sits above it." href="https://ahrefs.com/blog/ai-overviews-reduce-clicks-update/" source="Ahrefs, 2026" />
          </div>
        </section>

        {/* WAITING BAND */}
        <section className="relative h-[520px] overflow-hidden lg:h-[720px]">
          <LoopVideo src="/home/nora-waiting.mp4" poster="/home/nora-waiting.webp" label="Nora at her counter, chin in hand, watching a silent phone." className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: "50% 40%" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#04060B]/95 via-[#04060B]/35 to-transparent" />
          <p className={`nh-display absolute bottom-16 left-0 max-w-[1160px] ${PAD} text-[clamp(36px,4.8vw,68px)] leading-none`}>
            Every day you&apos;re not the answer, the call goes to someone who is.
          </p>
        </section>

        {/* THE TURN */}
        <section className={`${SECTION} grid items-end gap-12 lg:grid-cols-12`} style={{ background: "radial-gradient(55% 60% at 80% 10%, rgba(61,107,255,.16), transparent 70%)" }}>
          <div className="flex flex-col gap-5 lg:col-span-7">
            <h2 className={H2}>The click now goes to whoever the answer names.</h2>
            <p className="max-w-[600px] text-[clamp(17px,1.5vw,20px)] leading-[1.6] text-[#C9D0E2]">
              Fewer people click. But the businesses an AI answer cites get more clicks than before, and most of what AI cites is a business&apos;s own website. That&apos;s the page you control.
            </p>
          </div>
          <div className="flex flex-col gap-7 lg:col-span-4 lg:col-start-9">
            <div className={`border-b ${RULE} pb-6`}>
              <Stat n="+120%" color="#9DB4FF" text="more clicks for brands cited in an AI Overview." href="https://www.seerinteractive.com/insights/aio-impact-on-google-ctr-2026-update" source="Seer Interactive, 2026" />
            </div>
            <Stat n="44%" color="#9DB4FF" text="of AI citations point to businesses’ own websites." href="https://www.yext.com/blog/ai-citations-86-percent-of-sources-are-brand-managed" source="Yext, 2025 (vendor study)" />
          </div>
        </section>

        {/* DEMO */}
        <section id="demo" className={`${SECTION} flex flex-col gap-14 bg-[#0A0F1E]`}>
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="overflow-hidden rounded-[22px] border border-white/12 lg:col-span-5">
              <LoopVideo src="/home/nora-typing.mp4" poster="/home/nora-typing.webp" label="Nora typing on a laptop at her shop counter in the evening." className="block aspect-[16/10] w-full object-cover" />
            </div>
            <div className="flex flex-col gap-4 lg:col-span-7">
              <h2 className={H2}>So Nora built the page AI could quote.</h2>
              <p className="text-[clamp(17px,1.5vw,20px)] leading-[1.6] text-[#C9D0E2]">
                One evening, four details. SEOPage researched her market, wrote and designed the page, and scored it before she paid. This is the real builder, replayed. Type your own business in the hero and it replays with yours.
              </p>
            </div>
          </div>
          <BuilderDemo />
          <p className="text-[14px] text-[#7D869C]">
            The builder&apos;s screens, replayed. Search volumes are illustrative; yours come from live data. The page shown is Nora&apos;s example shop.
          </p>
        </section>

        {/* PROOF */}
        <section id="proof" className={`${SECTION} flex flex-col gap-12`}>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end lg:gap-14">
            <h2 className={`${H2} max-w-[780px]`}>We ran it on our own products first.</h2>
            <p className="max-w-[460px] text-[18px] leading-[1.6] text-[#C9D0E2]">
              esy.com and clip.art are built with the same workflow: live research, one search per page, direct answers, and schema. Here is what Ahrefs showed, unedited.
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            {[
              ["/proof/esy-ai-citations.png", "Ahrefs Site Explorer overview for esy.com: 37 ChatGPT citations across 20 pages, plus Perplexity, Copilot, and Grok.", "esy.com, cited 37 times by ChatGPT", "Across 20 pages, plus Perplexity, Copilot, and Grok."],
              ["/proof/clipart-ai-responses-sep-2026.png", "Ahrefs Site Explorer overview for clip.art, September 2026: 102 AI responses across 35 pages, 20 in AI Overviews, 36 in ChatGPT, domain rating 11, organic traffic 1.9K.", "clip.art, named in 102 AI answers", "Across 35 pages: 36 in ChatGPT, 20 in Google AI Overviews, plus AI Mode, Copilot, Perplexity, and Gemini. Organic traffic up 570 in a month, on a domain rating of 11."],
            ].map(([src, alt, h, d]) => (
              <figure key={src} className="flex flex-col gap-[18px]">
                <div className="overflow-hidden rounded-[18px] border border-white/15 bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={alt} className="block w-full" loading="lazy" />
                </div>
                <figcaption className="flex flex-col gap-1.5">
                  <span className="nh-display text-[28px] leading-tight tracking-[-0.03em]">{h}</span>
                  <span className="text-[16px] leading-[1.5] text-[#A0A9C0]">{d}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="text-[14px] text-[#7D869C]">Ahrefs Site Explorer: esy.com in May 2026, clip.art in September 2026. Our own sites, not client results. Yours will differ.</p>
        </section>

        {/* TEN CHECKS */}
        <section className={`${SECTION} bg-[#0A0F1E]`}>
          <ChecksExplorer />
        </section>

        {/* RANK VS CITED */}
        <section className={`${SECTION} grid gap-12 lg:grid-cols-12 lg:gap-14`}>
          <h2 className="nh-display text-[clamp(38px,4.4vw,60px)] leading-[1.02] lg:col-span-5">Ranking and being cited are two races. One page wins both.</h2>
          <div className="flex flex-col gap-8 lg:col-span-6 lg:col-start-7">
            <div className={`border-b ${RULE} pb-7`}>
              <Stat n="10% vs 65%" color="#9DB4FF" text="of the pages ChatGPT cites rank in Google’s top 10. For Perplexity, 65%." href="https://ahrefs.com/blog/chatgpt-google-citations" source="Ahrefs, 2025" />
            </div>
            <div className={`border-b ${RULE} pb-7`}>
              <Stat n="38%" color="#9DB4FF" text="of AI Overview citations come from Google’s top 10, down from 76%. A focused page can be cited without ranking first." href="https://www.searchenginejournal.com/google-ai-overview-citations-from-top-ranking-pages-drop-sharply/568637/" source="Ahrefs via Search Engine Journal, 2026" />
            </div>
            <p className="text-[18px] leading-[1.6]">
              Google says AI Overviews have{" "}
              <a href="https://developers.google.com/search/docs/appearance/ai-features" target="_blank" rel="noopener noreferrer" className="text-[#9DB4FF] underline underline-offset-2">
                no additional requirements
              </a>{" "}
              beyond a good page. So we don&apos;t sell tricks. We build the fundamentals, for both.
            </p>
          </div>
        </section>

        {/* PRICE */}
        <section id="price" className={`${SECTION} grid items-center gap-12 bg-[#0A0F1E] lg:grid-cols-12 lg:gap-14`}>
          <div className="flex flex-col gap-7 lg:col-span-6">
            <h2 className="nh-display text-[clamp(38px,4.4vw,60px)] leading-[1.02]">One page. One price. Once.</h2>
            <dl className={`flex flex-col border-t ${RULE} text-[16.5px] text-[#C9D0E2]`}>
              {[["SEO agency, per page", "$300–$1,000"], ["Freelance SEO writer", "$175–$350"], ["AI visibility dashboard, tells you, doesn’t fix it", "$25–$500/mo"]].map(([k, v]) => (
                <div key={k} className={`flex justify-between gap-4 border-b ${RULE} py-[18px]`}>
                  <dt>{k}</dt>
                  <dd className="tabular-nums">{v}</dd>
                </div>
              ))}
            </dl>
            <ul className="grid grid-cols-1 gap-x-6 gap-y-3 text-[15.5px] text-[#C9D0E2] sm:grid-cols-2">
              {["Free preview, no card", "Secure checkout by Stripe", "You own the page", "No subscription"].map((x) => (
                <li key={x} className="flex items-center gap-2"><Tick />{x}</li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-[18px] rounded-[28px] border border-[#3D6BFF]/40 bg-gradient-to-b from-[#12204A] to-[#0A0F1E] p-8 sm:p-10 lg:col-span-5 lg:col-start-8">
            <span className="text-[16px] text-[#C9D0E2]">SEO landing page</span>
            <span className="flex items-baseline gap-3.5">
              <span className="nh-display text-[clamp(72px,7vw,104px)] leading-none tracking-[-0.05em] tabular-nums">{PRICE_LABEL}</span>
              <span className="text-[15px] text-[#9DB4FF]">launch price</span>
            </span>
            <span className="text-[15px] text-[#A0A9C0]">{PRICE_AFTER_LAUNCH_LABEL} after launch. Pay when you publish.</span>
            <ul className={`flex flex-col gap-2.5 border-y ${RULE} py-[18px] text-[15.5px]`}>
              {["Live keyword research for your city", "The full page, written and designed", "Title, description, and schema", "Ten checks, scored before you pay", "Publish to your own address, or download it"].map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <a href={CREATE_URL} className="flex h-[58px] items-center justify-center rounded-full bg-[#3D6BFF] text-[16px] font-semibold text-white transition-colors hover:bg-[#5A82FF]">
              Build my page free
            </a>
          </div>
        </section>

        {/* FAQ — the ranking content; mirrored into FAQPage schema */}
        <section id="faq" className={`${SECTION} grid gap-12 lg:grid-cols-12 lg:gap-14`}>
          <h2 className="nh-display text-[clamp(34px,3.4vw,48px)] leading-[1.04] lg:col-span-4">Fair questions before you spend {PRICE_LABEL}.</h2>
          <div className={`flex flex-col border-t ${RULE} lg:col-span-7 lg:col-start-6`}>
            {FAQS.map((f, i) => (
              <details key={f.q} className={`nh-faq group border-b ${RULE}`} open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-6 text-[19px] font-medium">
                  <h3 className="font-medium">{f.q}</h3>
                  <span className="nh-plus shrink-0 text-[26px] font-light text-[#A0A9C0] transition-transform" aria-hidden>+</span>
                </summary>
                <p className="pb-6 pr-12 text-[16.5px] leading-[1.65] text-[#C9D0E2]">{f.a}</p>
              </details>
            ))}
            <p className="pt-8 text-[14px] text-[#A0A9C0]">
              Want the long version?{" "}
              <Link href="/audit" className="underline underline-offset-2 hover:text-white">Read the SEO page audit guide</Link> or see{" "}
              <Link href="/on-page-seo-services" className="underline underline-offset-2 hover:text-white">how on-page SEO services compare</Link>.
            </p>
          </div>
        </section>

        {/* CLOSE */}
        <section className="relative flex min-h-[860px] flex-col overflow-hidden">
          <LoopVideo src="/home/nora-call.mp4" poster="/home/nora-call.webp" label="Nora smiling on the phone, writing down a new job." className="absolute right-0 top-0 h-full w-full object-cover lg:w-[64%] lg:[mask-image:linear-gradient(90deg,transparent_0%,black_32%)]" style={{ objectPosition: "50% 40%" }} />
          <div className="absolute inset-0 bg-[#04060B]/75 lg:bg-transparent lg:[background:linear-gradient(90deg,#04060B_0%,rgba(4,6,11,.86)_30%,rgba(4,6,11,.2)_62%,rgba(4,6,11,0)_100%)]" />
          <div className={`relative flex min-h-[860px] flex-1 flex-col ${PAD} pb-11 pt-32 lg:pt-[150px]`}>
            <p className="max-w-[520px] text-[20px] text-[#C9D0E2]">
              The goal isn&apos;t a ranking report. It&apos;s a call that starts with &ldquo;I found you on ChatGPT.&rdquo;
            </p>
            <h2 className="nh-display mt-5 max-w-[720px] text-[clamp(48px,6.4vw,92px)] leading-[0.95]">Someone&apos;s asking AI who to hire. Make the answer you.</h2>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <a href={CREATE_URL} className="flex h-[60px] items-center rounded-full bg-[#3D6BFF] px-8 text-[17px] font-semibold text-white transition-colors hover:bg-[#5A82FF]">
                Build my page free
              </a>
              <span className="text-[14.5px] text-[#C9D0E2]">Free preview · {PRICE_LABEL} launch price · {PRICE_AFTER_LAUNCH_LABEL} after launch</span>
            </div>
          </div>
        </section>
      </PersonalizeProvider>
      <DarkFooter note="Nora is an illustration, not a customer." />
    </div>
  );
}
