import { DarkFooter, type ParentPlacement } from "@/components/DarkFooter";
import { PARENT_PLACEMENTS } from "../_lib/parent";

/* Three placements for "SEOPage is a division of ESY LLC", each on the real
   footer. The footer takes `parent` to switch; the live footer shows none yet. */
export default function ParentPrototypes() {
  return (
    <main>
      <div className="px-6 py-16 sm:px-10 lg:px-24 lg:py-24">
        <h1 className="nh-display text-[clamp(56px,8vw,120px)] leading-[0.9]">A division of ESY.</h1>
        <p className="mt-6 max-w-[680px] text-[19px] leading-[1.55] text-[#C9D0E2]">
          Where the footer says SEOPage is a division of ESY LLC, linking esy.com. Each is the real footer below.
        </p>
      </div>
      {PARENT_PLACEMENTS.map((p) => (
        <section key={p.key} className="border-t-4 border-[#3D6BFF]/60">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 px-6 py-10 sm:px-10 lg:px-24">
            <span className="nh-display text-[36px] leading-none tracking-[-0.03em]">
              <span className="text-[#3D6BFF]">{p.key.toUpperCase()}</span> · {p.name}
            </span>
            {p.chosen && <span className="rounded-full bg-[#3D6BFF] px-3 py-1 text-[13px] font-semibold text-white">Recommended</span>}
            <span className="w-full max-w-[760px] text-[16px] text-[#A0A9C0]">{p.note}</span>
          </div>
          <DarkFooter parent={p.placement as ParentPlacement} />
        </section>
      ))}
    </main>
  );
}
