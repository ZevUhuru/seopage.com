import { Logo } from "@/components/Logo";
import { HeroForm } from "./HeroAnswer";
import { AppShot } from "./AppShot";
import { CREATE_URL } from "@/lib/config";

/**
 * The homepage hero (/prototypes/hero, H2 chosen): the title and the form
 * centred, and the builder at create.seopage.com below them, cut off at the
 * fold. The builder is filled in from what the visitor types in the form.
 */
const PAD = "px-6 sm:px-10 lg:px-24";

export function AppHero() {
  return (
    <section className="relative overflow-hidden" style={{ background: "radial-gradient(50% 45% at 50% 62%, rgba(61,107,255,.22), transparent 75%)" }}>
      <div className={`relative ${PAD} pt-7`}>
        <header className="relative z-10 flex h-[52px] items-center justify-between">
          <Logo tone="dark" className="text-[26px]" />
          <a href={CREATE_URL} className="flex h-11 items-center rounded-full border border-white/30 bg-[#04060B]/35 px-5 font-medium text-[#EEF2FF] backdrop-blur hover:border-white/60">
            Build my page
          </a>
        </header>

        <div className="mx-auto mt-16 flex max-w-[860px] flex-col items-center gap-6 text-center lg:mt-24">
          <h1 className="nh-display text-[clamp(48px,6.2vw,88px)] leading-[0.95]">SEO landing pages that get cited by AI.</h1>
          <p className="mx-auto max-w-[540px] text-[clamp(17px,1.5vw,20px)] leading-[1.55] text-[#C9D0E2]">
            And rank on Google. Built from live search data for your city, and scored on ten checks before you pay.
          </p>
          <div className="w-full max-w-[760px] text-left">
            <HeroForm />
          </div>
        </div>

        <p className="mt-14 text-center text-[14px] text-[#A0A9C0]">The builder, with your business in it. Type yours above and watch it change.</p>
        {/* The whole app, cut off at the hero's bottom edge. On a phone the whole app would be too small to read, so it shows just its phone preview. */}
        <div className="relative mx-auto mt-5 max-h-[560px] max-w-[1240px] overflow-hidden lg:max-h-[600px]">
          <AppShot theme="light" className="hidden sm:block" />
          <AppShot theme="light" device="mobile" crop={{ x: 478, w: 400 }} className="sm:hidden" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#04060B] to-transparent" />
        </div>
      </div>
    </section>
  );
}
