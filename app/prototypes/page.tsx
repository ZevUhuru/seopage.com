import Link from "next/link";
import { getArticles } from "@/lib/articles";
import { base, RankMark, STYLES } from "./_lib/shared";
import { FOOTERS } from "./_lib/footer";
import { THUMBS } from "./_lib/thumbnail";
import { BANNERS, PROFILES } from "./_lib/channel";
import { CARDS } from "./_lib/social";

export default async function ProtoHome() {
  const [lead] = await getArticles();
  return (
    <main className="px-6 py-16 sm:px-10 lg:px-24 lg:py-24">
      <RankMark className="text-[clamp(80px,12vw,180px)]" />
      <p className="mt-6 max-w-[620px] text-[19px] leading-[1.55] text-[#C9D0E2]">
        rank¹ journal: three directions for the /agentic → /rank redesign (A index and B articles shipped). Each has an index and an article view, running on the real articles. The switcher at the bottom keeps your place when you flip styles.
      </p>
      <ul className="mt-14 grid gap-5 md:grid-cols-3">
        {STYLES.map((s) => (
          <li key={s.key} className="flex flex-col gap-4 rounded-[24px] border border-white/12 bg-[#0A0F1E] p-7">
            <span className="nh-display text-[64px] leading-none text-[#3D6BFF]">{s.key.toUpperCase()}</span>
            <span className="nh-display text-[30px] leading-none tracking-[-0.03em]">{s.name}</span>
            <span className="text-[16px] text-[#A0A9C0]">{s.note}</span>
            <span className="mt-auto flex gap-3 pt-4">
              <Link href={base(s.key)} className="flex h-11 items-center rounded-full bg-[#3D6BFF] px-5 text-[14.5px] font-semibold text-white hover:bg-[#5A82FF]">Index</Link>
              <Link href={`${base(s.key)}/${lead.slug}`} className="flex h-11 items-center rounded-full border border-white/30 px-5 text-[14.5px] hover:border-white/60">Article</Link>
            </span>
          </li>
        ))}
      </ul>

      <h2 className="nh-display mt-24 text-[clamp(40px,5vw,64px)] leading-none">Homepage footer</h2>
      <p className="mt-4 max-w-[620px] text-[17px] leading-[1.55] text-[#C9D0E2]">
        Three footers on the homepage&apos;s closing scene. Each has a view with today&apos;s links and one at scale.
      </p>
      <ul className="mt-10 grid gap-5 md:grid-cols-3">
        {FOOTERS.map((f) => (
          <li key={f.key} className="flex flex-col gap-4 rounded-[24px] border border-white/12 bg-[#0A0F1E] p-7">
            <span className="nh-display text-[64px] leading-none text-[#3D6BFF]">{f.key.toUpperCase()}</span>
            <span className="nh-display text-[30px] leading-none tracking-[-0.03em]">{f.name}</span>
            <span className="text-[16px] text-[#A0A9C0]">{f.note}</span>
            <span className="mt-auto flex gap-3 pt-4">
              <Link href={`/prototypes/footer/${f.key}`} className="flex h-11 items-center rounded-full bg-[#3D6BFF] px-5 text-[14.5px] font-semibold text-white hover:bg-[#5A82FF]">Today</Link>
              <Link href={`/prototypes/footer/${f.key}/scale`} className="flex h-11 items-center rounded-full border border-white/30 px-5 text-[14.5px] hover:border-white/60">At scale</Link>
            </span>
          </li>
        ))}
      </ul>

      <h2 className="nh-display mt-24 text-[clamp(40px,5vw,64px)] leading-none">YouTube thumbnail</h2>
      <p className="mt-4 max-w-[620px] text-[17px] leading-[1.55] text-[#C9D0E2]">
        Three thumbnails for the explainer video, and how each reads at feed size.
      </p>
      <ul className="mt-10 grid gap-5 md:grid-cols-3">
        {THUMBS.map((t) => (
          <li key={t.key} className={`flex flex-col overflow-hidden rounded-[24px] border bg-[#0A0F1E] ${t.chosen ? "border-[#3D6BFF]" : "border-white/12"}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/prototypes/thumbnail/${t.file}`} alt="" className="aspect-video w-full object-cover" />
            <span className="nh-display p-7 text-[30px] leading-none tracking-[-0.03em]">
              <span className="text-[#3D6BFF]">{t.key.toUpperCase()}</span> · {t.name}
              {t.chosen && <span className="ml-3 rounded-full bg-[#3D6BFF] px-3 py-1 align-middle font-sans text-[13px] font-semibold tracking-normal text-white">Chosen</span>}
            </span>
          </li>
        ))}
      </ul>
      <Link href="/prototypes/thumbnail" className="mt-6 inline-flex h-11 items-center rounded-full bg-[#3D6BFF] px-5 text-[14.5px] font-semibold text-white hover:bg-[#5A82FF]">See all three</Link>

      <h2 className="nh-display mt-24 text-[clamp(40px,5vw,64px)] leading-none">YouTube channel</h2>
      <p className="mt-4 max-w-[620px] text-[17px] leading-[1.55] text-[#C9D0E2]">
        Three profile pictures and three banners, each checked at the sizes YouTube actually shows them.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-8">
        {PROFILES.filter((p) => p.chosen).map((p) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={p.key} src={`/prototypes/channel/${p.file}`} alt="" className="h-28 w-28 rounded-full border border-[#3D6BFF]" />
        ))}
        {BANNERS.filter((b) => b.chosen).map((b) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={b.key} src={`/prototypes/channel/${b.file}`} alt="" className="aspect-video w-full max-w-[520px] rounded-[18px] border border-[#3D6BFF] object-cover" />
        ))}
      </div>
      <Link href="/prototypes/channel" className="mt-6 inline-flex h-11 items-center rounded-full bg-[#3D6BFF] px-5 text-[14.5px] font-semibold text-white hover:bg-[#5A82FF]">See all six</Link>

      <h2 className="nh-display mt-24 text-[clamp(40px,5vw,64px)] leading-none">Social card</h2>
      <p className="mt-4 max-w-[620px] text-[17px] leading-[1.55] text-[#C9D0E2]">
        Three share images for the explainer case study, and how each reads as a link preview.
      </p>
      <ul className="mt-10 grid gap-5 md:grid-cols-3">
        {CARDS.map((t) => (
          <li key={t.key} className={`flex flex-col overflow-hidden rounded-[24px] border bg-[#0A0F1E] ${t.chosen ? "border-[#3D6BFF]" : "border-white/12"}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/prototypes/social/${t.file}`} alt="" className="aspect-[1200/630] w-full object-cover" />
            <span className="nh-display p-7 text-[30px] leading-none tracking-[-0.03em]">
              <span className="text-[#3D6BFF]">{t.key.toUpperCase()}</span> · {t.name}
              {t.chosen && <span className="ml-3 rounded-full bg-[#3D6BFF] px-3 py-1 align-middle font-sans text-[13px] font-semibold tracking-normal text-white">Chosen</span>}
            </span>
          </li>
        ))}
      </ul>
      <Link href="/prototypes/social" className="mt-6 inline-flex h-11 items-center rounded-full bg-[#3D6BFF] px-5 text-[14.5px] font-semibold text-white hover:bg-[#5A82FF]">See all three</Link>
    </main>
  );
}
