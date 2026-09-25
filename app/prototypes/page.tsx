import Link from "next/link";
import { getArticles } from "@/lib/articles";
import { base, RankMark, STYLES } from "./_lib/shared";
import { FOOTERS } from "./_lib/footer";

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
    </main>
  );
}
