/* eslint-disable @next/next/no-img-element -- real product screenshots, shown at their own size */
import Link from "next/link";
import { AlarmTranscript, Tick } from "@/components/home/HeroAnswer";
import { CREATE_URL } from "@/lib/config";
import { BELOW, type BelowKey } from "./below";

/* The first section of each of the five stories for the homepage's middle.
   Rules: home3 DESIGN.md (2026-10-12): the live look, real screenshots only,
   no glows, no stat rows, no ALL-CAPS or mono labels, 10px buttons, one
   primary button per section, no ranking promises. The plan is SEOPage at
   $149 a month (the 2026-10-06 offer). */

const PAD = "px-6 sm:px-10 lg:px-24";
const SECTION = `${PAD} py-24 lg:py-[136px]`;
const H2 = "nh-display text-[clamp(40px,5vw,64px)] leading-[1.02] tracking-[-0.02em]";
const BODY = "text-[clamp(17px,1.5vw,20px)] leading-[1.6] text-[#C9D0E2]";
const BTN = "inline-flex h-[54px] items-center rounded-[10px] bg-[#3D6BFF] px-7 text-[16px] font-semibold text-white transition-colors hover:bg-[#5A82FF]";
const SHOT = "block w-full rounded-[12px] border border-white/12";
const RULE = "border-white/12";

/** A real product screenshot, captioned in plain words. `trimTop` crops the app's top bar (it still shows the old one-off price). */
function Shot({ src, alt, caption, trimTop = false }: { src: string; alt: string; caption: string; trimTop?: boolean }) {
  return (
    <figure className="flex flex-col gap-3">
      {trimTop ? (
        <div className={`${SHOT} aspect-[1316/758] overflow-hidden`}>
          <img src={src} alt={alt} className="h-full w-full object-cover object-bottom" loading="lazy" />
        </div>
      ) : (
        <img src={src} alt={alt} className={SHOT} loading="lazy" />
      )}
      <figcaption className="text-[14px] text-[#A0A9C0]">{caption}</figcaption>
    </figure>
  );
}

export function BelowSection({ v }: { v: BelowKey }) {
  // N1 · The question: the problem, as the answer that names someone else.
  if (v === "n1") {
    return (
      <section className={`${SECTION} bg-[#0A0F1E]`}>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-6 lg:col-span-6">
            <h2 className={H2}>Someone near you just asked AI who to hire. It named someone else.</h2>
            <p className={BODY}>
              AI answers quote pages that say plainly what you do, where you do it, and what it costs. When your site doesn&apos;t say it, the answer names a business whose site does.
            </p>
            <p className="text-[16px] leading-[1.6] text-[#A0A9C0]">
              45% of US consumers now use AI to find a local business, up from 6% a year earlier (
              <a href="https://www.brightlocal.com/research/lcrs-ai-trust/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white">BrightLocal, 2026</a>).
            </p>
          </div>
          <div className="lg:col-span-6">
            <AlarmTranscript />
          </div>
        </div>
      </section>
    );
  }

  // N2 · Three steps: what happens after you start, through the months after.
  if (v === "n2") {
    const steps = [
      { n: 1, h: "Tell us who you are", d: "Your business, what you do and where. The page starts taking shape while you type." },
      { n: 2, h: "Choose each section", d: "Every section comes with versions to compare. Keep one, ask for three more, or edit the words yourself." },
      { n: 3, h: "Every month after, more pages", d: "New pages every month, picked from the searches in your own Search Console. Pages that slip get rewritten. You approve each one." },
    ];
    return (
      <section className={`${SECTION} bg-[#0A0F1E]`}>
        <div className="flex max-w-[760px] flex-col gap-5">
          <h2 className={H2}>Three steps. The third one keeps going.</h2>
          <p className={BODY}>New pages every month, each researched and checked by a person, chosen from what people really search to find you.</p>
        </div>
        <ol className={`mt-14 grid gap-10 border-t ${RULE} pt-10 lg:grid-cols-3 lg:gap-12`}>
          {steps.map((s) => (
            <li key={s.n} className="flex flex-col gap-3">
              <span className="nh-display text-[22px] text-[#9DB4FF]">{s.n}</span>
              <span className="nh-display text-[28px] leading-tight tracking-[-0.02em]">{s.h}</span>
              <span className="text-[17px] leading-[1.6] text-[#C9D0E2]">{s.d}</span>
            </li>
          ))}
        </ol>
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <Shot src="/prototypes/below/intake-filled.jpg" alt="The SEOPage form filled in for an example roofer in Denver, with the page starting to take shape beside it." caption="Step 1, as it looks in SEOPage. Example business." />
          <Shot src="/prototypes/below/builder-versions.jpg" trimTop alt="The SEOPage builder with the page's opening section picked and its versions in the side panel." caption="Step 2: the opening section and its versions. Example page." />
        </div>
      </section>
    );
  }

  // N3 · The checks: the real page, beside what is checked on it.
  if (v === "n3") {
    const checks = [
      ["One clear headline", "The page says what it's about once, at the top."],
      ["Your search in the title", "The words people type to find you are in the page's title."],
      ["A phone number you can tap", "On a phone, one tap starts the call."],
      ["One main thing to do", "Every button leads to the same next step."],
      ["Nothing you didn't tell us", "A claim we can't find in your details is marked for you to confirm or change."],
      ["Google's rules", "No review stars Google doesn't allow, no lists of towns, no copies of your other pages."],
    ];
    return (
      <section className={`${SECTION} bg-[#0A0F1E]`}>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="flex flex-col gap-5 lg:col-span-5">
            <h2 className={H2}>Every page is checked before it goes live.</h2>
            <p className={BODY}>Against Google&apos;s guidelines and against your own details. You see every finding, and you decide what goes live.</p>
            <ul className={`mt-4 flex flex-col border-t ${RULE}`}>
              {checks.map(([t, d]) => (
                <li key={t} className={`flex gap-3 border-b ${RULE} py-4`}>
                  <span className="mt-1.5"><Tick /></span>
                  <span className="flex flex-col gap-1">
                    <span className="text-[17px] font-semibold">{t}</span>
                    <span className="text-[15px] leading-[1.5] text-[#A0A9C0]">{d}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <figure className="flex flex-col gap-3 lg:col-span-7">
            <iframe src="/prototypes/below/northline.html" title="An example page SEOPage built" className="h-[640px] w-full rounded-[12px] border border-white/12 bg-white" loading="lazy" />
            <figcaption className="text-[14px] text-[#A0A9C0]">An example page SEOPage built, live. It scored 88 on its page check. Scroll it.</figcaption>
          </figure>
        </div>
      </section>
    );
  }

  // N4 · Our own sites: proof first, for readers who know Esy.
  if (v === "n4") {
    return (
      <section className={`${SECTION} bg-[#0A0F1E]`}>
        <div className="flex max-w-[820px] flex-col gap-5">
          <h2 className={H2}>We built our own sites this way first.</h2>
          <p className={BODY}>
            esy.com and clip.art run on Esy, the same system that builds SEOPage pages: one search per page, straight answers, and the details AI quotes. Here is what Ahrefs shows for them, unedited.
          </p>
        </div>
        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <Shot src="/proof/esy-ai-citations.png" alt="Ahrefs Site Explorer overview for esy.com: 37 ChatGPT citations across 20 pages, plus Perplexity, Copilot, and Grok." caption="esy.com: cited 37 times by ChatGPT, across 20 pages. Ahrefs, May 2026." />
          <Shot src="/proof/clipart-ai-responses-sep-2026.png" alt="Ahrefs Site Explorer overview for clip.art, September 2026: 102 AI responses across 35 pages." caption="clip.art: named in 102 AI answers, across 35 pages. Ahrefs, September 2026." />
        </div>
        <p className="mt-8 text-[14px] text-[#A0A9C0]">Our own sites, not customer results. Yours will differ.</p>
      </section>
    );
  }

  // N5 · What you get: the plan, straight away.
  const includes = [
    "New researched pages every month",
    "Picked from the searches in your own Search Console",
    "Pages that slip get rewritten",
    "Every page checked before it goes live",
    "Which AI answers name you, checked weekly",
    "One monthly report: Search Console and Google Analytics together",
  ];
  return (
    <section className={`${SECTION} bg-[#0A0F1E]`}>
      <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="flex flex-col gap-5 lg:col-span-6">
          <h2 className={H2}>Pages every month, for $149.</h2>
          <p className={BODY}>SEOPage keeps adding the pages your searches call for, and keeps the ones you have up to date. You approve each one.</p>
          <ul className={`mt-4 flex flex-col border-t ${RULE}`}>
            {includes.map((x) => (
              <li key={x} className={`flex items-center gap-3 border-b ${RULE} py-4 text-[17px]`}>
                <Tick />
                {x}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-6 rounded-[12px] border border-white/12 bg-[#04060B] p-8 sm:p-10 lg:col-span-5 lg:col-start-8">
          <span className="text-[17px] text-[#C9D0E2]">SEOPage</span>
          <span className="flex items-baseline gap-2">
            <span className="nh-display text-[clamp(64px,6vw,88px)] leading-none tracking-[-0.02em]">$149</span>
            <span className="text-[17px] text-[#C9D0E2]">a month</span>
          </span>
          <span className="text-[15px] text-[#A0A9C0]">Or $1,490 a year, two months free. See your first page free before you pay.</span>
          <a href={CREATE_URL} className={`${BTN} justify-center`}>Start with a free preview</a>
          <span className={`border-t ${RULE} pt-5 text-[15px] leading-[1.6] text-[#A0A9C0]`}>
            Already paying for Google Ads? SEOPage + Ads is $279 a month. Want it run for you? Managed starts at $1,499 a month.
          </span>
        </div>
      </div>
    </section>
  );
}

/** Prototype-only: the sections this story would continue with. */
export function StoryOutline({ v }: { v: BelowKey }) {
  const s = BELOW.find((x) => x.key === v)!;
  return (
    <aside data-proto-ui className={`${PAD} border-y border-dashed border-white/20 py-14`}>
      <p className="text-[15px] text-[#A0A9C0]">Prototype: the rest of this story, not built yet</p>
      <h3 className="nh-display mt-2 text-[32px] tracking-[-0.02em]">{s.key.toUpperCase()} · {s.name}</h3>
      <p className="mt-3 max-w-[760px] text-[17px] leading-[1.6] text-[#C9D0E2]">{s.note}</p>
      <ol className="mt-6 flex max-w-[760px] flex-col gap-2 text-[17px] text-[#C9D0E2]">
        <li><span className="text-[#7D869C]">Hero.</span> The builder, with your business in it</li>
        {s.story.map((x, i) => (
          <li key={x}><span className="text-[#7D869C]">{i + 1}.</span> {x}{i === 0 && <span className="text-[#9DB4FF]"> (above)</span>}</li>
        ))}
        <li><span className="text-[#7D869C]">Footer.</span> As it is</li>
      </ol>
    </aside>
  );
}

export function BelowSwitcher({ current }: { current: BelowKey }) {
  return (
    <nav data-proto-ui className="fixed bottom-4 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/15 bg-[#0A0F1E]/90 p-1 text-[13px] shadow-2xl backdrop-blur">
      <Link href="/prototypes" className="hidden px-3 text-[#7D869C] hover:text-white sm:inline">Story</Link>
      {BELOW.map((b) => (
        <Link key={b.key} href={`/prototypes/below/${b.key}`} className={`whitespace-nowrap rounded-full px-3.5 py-1.5 font-medium ${b.key === current ? "bg-[#3D6BFF] text-white" : "text-[#C9D0E2] hover:bg-white/10"}`}>
          {b.key.toUpperCase()}<span className="hidden md:inline"> · {b.name}</span>
        </Link>
      ))}
    </nav>
  );
}
