import { DarkFooter, type EsyLogoPlacement } from "@/components/DarkFooter";
import { EsyMark } from "@/components/EsyMark";
import { ESY_LOGO_PLACEMENTS } from "../_lib/esy-logo";

/* Three placements for Esy's logo, each on the real footer. Readers coming
   from the Esy newsletter know the logo, not "ESY LLC"; the footer takes
   `esy` to switch, and the live footer shows none yet. */
export default function EsyLogoPrototypes() {
  return (
    <main>
      <div className="px-6 py-16 sm:px-10 lg:px-24 lg:py-24">
        <h1 className="nh-display flex flex-wrap items-center gap-x-6 text-[clamp(56px,8vw,120px)] leading-[0.9]">
          Built on <EsyMark className="h-[0.8em] text-white" />
        </h1>
        <p className="mt-6 max-w-[680px] text-[19px] leading-[1.55] text-[#C9D0E2]">
          Where Esy&apos;s logo sits in the footer, beside the line that says SEOPage is a division of ESY LLC. The header stays SEOPage alone, and customers&apos; pages never carry it. Each is the real footer below.
        </p>
      </div>
      {ESY_LOGO_PLACEMENTS.map((p) => (
        <section key={p.key} id={p.key} className="border-t-4 border-[#3D6BFF]/60">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 px-6 py-10 sm:px-10 lg:px-24">
            <span className="nh-display text-[36px] leading-none tracking-[-0.03em]">
              <span className="text-[#3D6BFF]">{p.key.toUpperCase()}</span> · {p.name}
            </span>
            {p.chosen && <span className="rounded-full bg-[#3D6BFF] px-3 py-1 text-[13px] font-semibold text-white">Recommended</span>}
            <span className="w-full max-w-[760px] text-[16px] text-[#A0A9C0]">{p.note}</span>
          </div>
          <DarkFooter esy={p.placement as EsyLogoPlacement} />
        </section>
      ))}
    </main>
  );
}
