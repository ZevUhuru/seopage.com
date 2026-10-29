import Link from "next/link";
import { Logo } from "@/components/Logo";
import { HeroForm } from "@/components/home/HeroAnswer";
import { AppShot } from "@/components/home/AppShot";
import { AppHero } from "@/components/home/AppHero";
import { CREATE_URL } from "@/lib/config";

/* Three homepage heroes that show the app (create.seopage.com) instead of
   Nora (/prototypes/hero/h1…h3). Each keeps the title, the line under it and
   the form; the app on screen is filled in from what the visitor types. */

export const HEROES = [
  { key: "h1", name: "Beside the form", note: "Today's layout. The app takes Nora's place on the right, in dark, running off the edge of the screen. Its versions take turns on the visitor's page." },
  { key: "h2", name: "Under the form", note: "Title and form centred, the whole app below them in light, cut off at the fold so the next scroll shows more. The most like a software site. Chosen: it is the live hero." },
  { key: "h3", name: "On a phone", note: "The app with its phone preview on, beside the form: the visitor's page as their customers see it on a phone." },
] as const;
export type HeroKey = (typeof HEROES)[number]["key"];

const PAD = "px-6 sm:px-10 lg:px-24";
const H1 = "nh-display text-[clamp(48px,6.2vw,88px)] leading-[0.95]";
const LEAD = "text-[clamp(17px,1.5vw,20px)] leading-[1.55] text-[#C9D0E2]";

function Header() {
  return (
    <header className="relative z-10 flex h-[52px] items-center justify-between">
      <Logo tone="dark" className="text-[26px]" />
      <a href={CREATE_URL} className="flex h-11 items-center rounded-full border border-white/30 bg-[#04060B]/35 px-5 font-medium text-[#EEF2FF] backdrop-blur hover:border-white/60">
        Build my page
      </a>
    </header>
  );
}

function Title({ center = false }: { center?: boolean }) {
  return (
    <>
      <h1 className={H1}>SEO landing pages that get cited by AI.</h1>
      <p className={`${LEAD} max-w-[540px] ${center ? "mx-auto" : ""}`}>
        And rank on Google. Built from live search data for your city, and scored on ten checks before you pay.
      </p>
    </>
  );
}

/** A line under the app that ties it to the form. */
function Caption({ className = "" }: { className?: string }) {
  return <p className={`text-[14px] text-[#A0A9C0] ${className}`}>The builder, with your business in it. Type yours above and watch it change.</p>;
}

export function Hero({ v }: { v: HeroKey }) {
  if (v === "h1") {
    return (
      <section className="relative overflow-hidden" style={{ background: "radial-gradient(60% 70% at 85% 30%, rgba(61,107,255,.20), transparent 70%)" }}>
        <div className={`relative ${PAD} pb-20 pt-7 lg:h-[940px]`}>
          <Header />
          <div className="relative z-10 mt-20 flex max-w-[600px] flex-col gap-6 lg:mt-[150px] lg:max-w-[44%]">
            <Title />
            <HeroForm />
            <Caption className="hidden lg:block" />
          </div>
          {/* The app just past the right edge on wide screens, rail in view; below lg it sits under the form */}
          <div className="mt-14 lg:absolute lg:left-[49%] lg:right-[-16px] lg:top-[150px] lg:mt-0">
            <AppShot theme="dark" />
          </div>
          <Caption className="mt-4 lg:hidden" />
        </div>
      </section>
    );
  }

  // H2 was chosen and is the live hero.
  if (v === "h2") return <AppHero />;

  return (
    <section className="relative overflow-hidden" style={{ background: "radial-gradient(45% 60% at 78% 45%, rgba(61,107,255,.20), transparent 72%)" }}>
      <div className={`relative ${PAD} pb-20 pt-7`}>
        <Header />
        <div className="mt-16 grid items-center gap-14 lg:mt-16 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col gap-6">
            <Title />
            <HeroForm />
          </div>
          {/* The app cropped to its phone preview and the rail */}
          <div className="flex flex-col gap-4">
            <AppShot theme="dark" device="mobile" crop={{ x: 470, w: 770 }} />
            <Caption />
          </div>
        </div>
      </div>
    </section>
  );
}

export function HeroSwitcher({ current }: { current: HeroKey }) {
  return (
    <nav data-proto-ui className="fixed bottom-4 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/15 bg-[#0A0F1E]/90 p-1 text-[13px] shadow-2xl backdrop-blur">
      <Link href="/prototypes" className="hidden px-3 text-[#7D869C] hover:text-white sm:inline">Hero</Link>
      {HEROES.map((h) => (
        <Link key={h.key} href={`/prototypes/hero/${h.key}`} className={`whitespace-nowrap rounded-full px-3.5 py-1.5 font-medium ${h.key === current ? "bg-[#3D6BFF] text-white" : "text-[#C9D0E2] hover:bg-white/10"}`}>
          {h.key.toUpperCase()}<span className="hidden sm:inline"> · {h.name}</span>
        </Link>
      ))}
    </nav>
  );
}
