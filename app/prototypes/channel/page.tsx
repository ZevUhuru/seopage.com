/* eslint-disable @next/next/no-img-element -- channel art, shown as-is. */

import { BANNERS, PROFILES } from "../_lib/channel";

type Item = { key: string; file: string; name: string; note: string; chosen: boolean };

function Card({ t, round, download }: { t: Item; round?: boolean; download: string }) {
  return (
    <li className={`flex flex-col overflow-hidden rounded-[24px] border bg-[#0A0F1E] ${t.chosen ? "border-[#3D6BFF]" : "border-white/12"}`}>
      {round ? (
        <div className="flex justify-center bg-[#0f0f0f] py-10">
          <img src={`/prototypes/channel/${t.file}`} alt={`Profile ${t.key.toUpperCase()}: ${t.name}`} className="h-40 w-40 rounded-full" />
        </div>
      ) : (
        <img src={`/prototypes/channel/${t.file}`} alt={`Banner ${t.key.toUpperCase()}: ${t.name}`} className="aspect-video w-full object-cover" />
      )}
      <div className="flex flex-1 flex-col gap-3 p-7">
        <span className="flex items-center gap-3">
          <span className="nh-display text-[30px] leading-none tracking-[-0.03em]">
            <span className="text-[#3D6BFF]">{t.key.toUpperCase()}</span> · {t.name}
          </span>
          {t.chosen && <span className="rounded-full bg-[#3D6BFF] px-3 py-1 text-[13px] font-semibold text-white">Chosen</span>}
        </span>
        <span className="text-[16px] text-[#A0A9C0]">{t.note}</span>
        <a href={`/prototypes/channel/${t.file}`} download={download} className={`mt-auto flex h-11 items-center self-start rounded-full px-5 text-[14.5px] ${t.chosen ? "bg-[#3D6BFF] font-semibold text-white hover:bg-[#5A82FF]" : "border border-white/30 hover:border-white/60"}`}>
          Download
        </a>
      </div>
    </li>
  );
}

export default function ChannelPrototypes() {
  return (
    <main className="px-6 py-16 sm:px-10 lg:px-24 lg:py-24">
      <h1 className="nh-display text-[clamp(56px,8vw,120px)] leading-[0.9]">YouTube channel.</h1>
      <p className="mt-6 max-w-[680px] text-[19px] leading-[1.55] text-[#C9D0E2]">
        Profile picture and banner, built from what the brand already is: the seopage¹ wordmark and its citation mark, the homepage&apos;s ink and blue, and Nora. The launch price stays off the banner so it can&apos;t go stale.
      </p>

      <h2 className="nh-display mt-20 text-[clamp(36px,4vw,56px)] leading-none">Profile picture.</h2>
      <p className="mt-4 max-w-[620px] text-[17px] leading-[1.55] text-[#C9D0E2]">800×800, shown as a circle as small as 24px.</p>
      <ul className="mt-10 grid gap-8 lg:grid-cols-3">
        {PROFILES.map((t) => <Card key={t.key} t={t} round download={`seopage-youtube-profile-${t.key}.png`} />)}
      </ul>
      <img src="/prototypes/channel/profiles-preview.jpg" alt="Each profile picture at 160, 48, 36, and 24 pixels." className="mt-8 w-full rounded-[18px] border border-white/12" />

      <h2 className="nh-display mt-24 text-[clamp(36px,4vw,56px)] leading-none">Banner.</h2>
      <p className="mt-4 max-w-[620px] text-[17px] leading-[1.55] text-[#C9D0E2]">2560×1440. TVs show all of it; phones show only the centre 1546×423 strip, outlined in red below.</p>
      <ul className="mt-10 grid gap-8 lg:grid-cols-3">
        {BANNERS.map((t) => <Card key={t.key} t={t} download={`seopage-youtube-banner-${t.key}.jpg`} />)}
      </ul>
      <img src="/prototypes/channel/banners-preview.jpg" alt="Each banner in full with its safe strip outlined, and as a phone shows it." className="mt-8 w-full rounded-[18px] border border-white/12" />
    </main>
  );
}
