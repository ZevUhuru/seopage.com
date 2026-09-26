/* eslint-disable @next/next/no-img-element -- social cards, shown as-is. */

import Link from "next/link";
import { CARDS } from "../_lib/social";

export default function SocialPrototypes() {
  return (
    <main className="px-6 py-16 sm:px-10 lg:px-24 lg:py-24">
      <h1 className="nh-display text-[clamp(56px,8vw,120px)] leading-[0.9]">Social card.</h1>
      <p className="mt-6 max-w-[680px] text-[19px] leading-[1.55] text-[#C9D0E2]">
        The image that shows when <Link href="/rank/how-we-made-our-explainer-video" className="underline underline-offset-2 hover:text-white">the explainer case study</Link> is shared on X, LinkedIn, Slack, or iMessage. 1200×630, seen at about 500px wide, so the words stay few and well inside the edges.
      </p>
      <ul className="mt-14 grid gap-8 lg:grid-cols-3">
        {CARDS.map((t) => (
          <li key={t.key} className={`flex flex-col overflow-hidden rounded-[24px] border bg-[#0A0F1E] ${t.chosen ? "border-[#3D6BFF]" : "border-white/12"}`}>
            <img src={`/prototypes/social/${t.file}`} alt={`Social card ${t.key.toUpperCase()}: ${t.name}`} className="aspect-[1200/630] w-full object-cover" />
            <div className="flex flex-1 flex-col gap-3 p-7">
              <span className="flex items-center gap-3">
                <span className="nh-display text-[30px] leading-none tracking-[-0.03em]">
                  <span className="text-[#3D6BFF]">{t.key.toUpperCase()}</span> · {t.name}
                </span>
                {t.chosen && <span className="rounded-full bg-[#3D6BFF] px-3 py-1 text-[13px] font-semibold text-white">Chosen</span>}
              </span>
              <span className="text-[16px] text-[#A0A9C0]">{t.note}</span>
              <a href={`/prototypes/social/${t.file}`} download={`seopage-social-card-${t.key}.jpg`} className={`mt-auto flex h-11 items-center self-start rounded-full px-5 text-[14.5px] ${t.chosen ? "bg-[#3D6BFF] font-semibold text-white hover:bg-[#5A82FF]" : "border border-white/30 hover:border-white/60"}`}>
                Download
              </a>
            </div>
          </li>
        ))}
      </ul>
      <h2 className="nh-display mt-24 text-[clamp(36px,4vw,56px)] leading-none">As a link preview.</h2>
      <p className="mt-4 max-w-[620px] text-[17px] leading-[1.55] text-[#C9D0E2]">Each card at 500px (desktop feed) and 300px (phone), with the domain and title a feed shows under it.</p>
      <img src="/prototypes/social/preview.jpg" alt="The three cards as link previews at 500 and 300 pixels wide." className="mt-8 w-full rounded-[18px] border border-white/12" />
    </main>
  );
}
