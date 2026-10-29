import Link from "next/link";
import { TAKES } from "./_data";

/* Three ways SEOPage could show a site's search health, on clip.art's
   real October drop. */
export default function HealthTakes() {
  return (
    <main className="mx-auto flex max-w-[1160px] flex-col gap-10 bg-[#04060B] px-4 py-16 sm:px-8">
      <div className="flex flex-col gap-4">
        <h1 className="nh-display text-[44px] leading-none sm:text-[60px]">Site health, three ways</h1>
        <p className="max-w-[720px] text-[17px] leading-[1.6] text-[#C9D0E2]">
          SEOPage looking at clip.art: Search Console, Esy&apos;s own crawl and a log of what changed, read together. Each take runs on clip.art&apos;s real drop from about 6,000 indexed pages to 1,340 in October.
        </p>
      </div>
      <ul className="grid gap-5 md:grid-cols-3">
        {TAKES.map((t) => (
          <li key={t.key} className="flex flex-col gap-4 rounded-[16px] border border-white/12 bg-[#0A0F1E] p-7">
            <span className="nh-display text-[56px] leading-none text-[#3D6BFF]">{t.key.toUpperCase()}</span>
            <span className="nh-display text-[28px] leading-none">{t.name}</span>
            <span className="text-[15.5px] leading-[1.55] text-[#A0A9C0]">{t.note}</span>
            <Link href={`/prototypes/health/${t.key}`} className="mt-auto inline-flex h-11 w-fit items-center rounded-[10px] bg-[#3D6BFF] px-5 text-[14.5px] font-semibold text-white hover:bg-[#5A82FF]">Open</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
