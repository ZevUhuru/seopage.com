import { DarkFooter, type SocialsPlacement } from "@/components/DarkFooter";
import { SOCIAL_PLACEMENTS } from "../_lib/socials";

/* Three placements for the YouTube and LinkedIn links, each on the real
   footer with its real content. The footer takes `socials` to switch. */
export default function SocialsPrototypes() {
  return (
    <main>
      <div className="px-6 py-16 sm:px-10 lg:px-24 lg:py-24">
        <h1 className="nh-display text-[clamp(56px,8vw,120px)] leading-[0.9]">Social links.</h1>
        <p className="mt-6 max-w-[680px] text-[19px] leading-[1.55] text-[#C9D0E2]">
          Where YouTube and LinkedIn sit in the footer, three ways. Each is the real footer below; &ldquo;Download page&rdquo; saves all three.
        </p>
      </div>
      {SOCIAL_PLACEMENTS.map((p) => (
        <section key={p.key} className="border-t-4 border-[#3D6BFF]/60">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 px-6 py-10 sm:px-10 lg:px-24">
            <span className="nh-display text-[36px] leading-none tracking-[-0.03em]">
              <span className="text-[#3D6BFF]">{p.key.toUpperCase()}</span> · {p.name}
            </span>
            {p.chosen && <span className="rounded-full bg-[#3D6BFF] px-3 py-1 text-[13px] font-semibold text-white">Recommended</span>}
            <span className="w-full max-w-[760px] text-[16px] text-[#A0A9C0]">{p.note}</span>
          </div>
          <DarkFooter socials={p.placement as SocialsPlacement} />
        </section>
      ))}
    </main>
  );
}
