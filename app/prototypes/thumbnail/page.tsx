/* eslint-disable @next/next/no-img-element -- full-size thumbnails, shown as-is. */

import { THUMBS } from "../_lib/thumbnail";

export default function ThumbnailPrototypes() {
  return (
    <main className="px-6 py-16 sm:px-10 lg:px-24 lg:py-24">
      <h1 className="nh-display text-[clamp(56px,8vw,120px)] leading-[0.9]">YouTube thumbnail.</h1>
      <p className="mt-6 max-w-[680px] text-[19px] leading-[1.55] text-[#C9D0E2]">
        Three directions for the explainer video, 1920×1080. One face, three or four words, the bottom-right left clear for YouTube&apos;s duration badge. A is the pick; load all three into YouTube&apos;s Test &amp; Compare, which chooses by watch time.
      </p>
      <ul className="mt-14 grid gap-8 lg:grid-cols-3">
        {THUMBS.map((t) => (
          <li key={t.key} className={`flex flex-col overflow-hidden rounded-[24px] border bg-[#0A0F1E] ${t.chosen ? "border-[#3D6BFF]" : "border-white/12"}`}>
            <img src={`/prototypes/thumbnail/${t.file}`} alt={`Thumbnail ${t.key.toUpperCase()}: ${t.words}`} className="aspect-video w-full object-cover" />
            <div className="flex flex-1 flex-col gap-3 p-7">
              <span className="flex items-center gap-3">
                <span className="nh-display text-[30px] leading-none tracking-[-0.03em]">
                  <span className="text-[#3D6BFF]">{t.key.toUpperCase()}</span> · {t.name}
                </span>
                {t.chosen && <span className="rounded-full bg-[#3D6BFF] px-3 py-1 text-[13px] font-semibold text-white">Chosen</span>}
              </span>
              <span className="text-[17px] font-medium text-[#EEF2FF]">&ldquo;{t.words}&rdquo;</span>
              <span className="text-[16px] text-[#A0A9C0]">{t.note}</span>
              <a href={`/prototypes/thumbnail/${t.file}`} download={`seopage-thumbnail-${t.key}.jpg`} className={`mt-auto flex h-11 items-center self-start rounded-full px-5 text-[14.5px] ${t.chosen ? "bg-[#3D6BFF] font-semibold text-white hover:bg-[#5A82FF]" : "border border-white/30 hover:border-white/60"}`}>
                Download
              </a>
            </div>
          </li>
        ))}
      </ul>
      <h2 className="nh-display mt-24 text-[clamp(36px,4vw,56px)] leading-none">At feed size.</h2>
      <p className="mt-4 max-w-[620px] text-[17px] leading-[1.55] text-[#C9D0E2]">
        Each one as a desktop sidebar card (360px) and a phone feed card (170px), with the duration badge where YouTube draws it.
      </p>
      <img src="/prototypes/thumbnail/feed.jpg" alt="The three thumbnails at desktop and phone feed sizes." className="mt-8 w-full rounded-[18px] border border-white/12" />
    </main>
  );
}
