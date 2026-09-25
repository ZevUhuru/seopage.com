/* eslint-disable @next/next/no-img-element -- preview thumbnails. */
import Link from "next/link";
import { VERTICALS } from "@/lib/verticals";
import { SETS } from "../_lib/sample";

export default function SampleChooser() {
  return (
    <main className="px-6 py-16 sm:px-10 lg:px-24 lg:py-24">
      <h1 className="nh-display text-[clamp(56px,8vw,120px)] leading-[0.9]">Photo sets.</h1>
      <p className="mt-6 max-w-[660px] text-[19px] leading-[1.55] text-[#C9D0E2]">
        The before/after sample, three ways. Same hand-written homeowner copy, three realistic photo directions. Each set is used on both sides, since a business&apos;s photos don&apos;t change when its page does.
      </p>
      <ul className="mt-14 grid gap-5 md:grid-cols-3">
        {SETS.map((s, i) => (
          <li key={s.key} className="flex flex-col overflow-hidden rounded-[24px] border border-white/12 bg-[#0A0F1E]">
            <img src={`/prototypes/sample/${s.key}/roofers/hero.webp`} alt="" className="aspect-[4/3] w-full object-cover" />
            <div className="flex flex-1 flex-col gap-3 p-7">
              <span className="nh-display text-[30px] leading-none tracking-[-0.03em]"><span className="text-[#3D6BFF]">{i + 1}</span> · {s.name}</span>
              <span className="text-[16px] text-[#A0A9C0]">{s.note}</span>
              <span className="mt-auto flex flex-wrap gap-3 pt-4">
                {VERTICALS.map((v, j) => (
                  <Link key={v.slug} href={`/prototypes/sample/${s.key}/${v.slug}`} className={`flex h-11 items-center rounded-full px-5 text-[14.5px] ${j === 0 ? "bg-[#3D6BFF] font-semibold text-white hover:bg-[#5A82FF]" : "border border-white/30 hover:border-white/60"}`}>
                    /{v.slug}
                  </Link>
                ))}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
