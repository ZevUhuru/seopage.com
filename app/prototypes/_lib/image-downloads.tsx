/* eslint-disable @next/next/no-img-element -- small previews of the files offered. */
import { readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const IMAGE = /\.(webp|png|jpe?g|gif|avif)$/i;

/** Every image under public/<dir>, as paths relative to public/. Read at build time. */
function images(dir: string): string[] {
  const pub = join(process.cwd(), "public");
  const walk = (d: string): string[] =>
    readdirSync(d)
      .sort()
      .flatMap((f) => {
        const p = join(d, f);
        return statSync(p).isDirectory() ? walk(p) : IMAGE.test(f) ? [relative(pub, p)] : [];
      });
  return walk(join(pub, dir));
}

/**
 * Per-image downloads for a prototype built from images: every file in its
 * folder, grouped by subfolder, each with a Download link. Lists the folder
 * itself, so new or regenerated images show up without editing this page.
 */
export function ImageDownloads({ dir, title = "Images" }: { dir: string; title?: string }) {
  const files = images(dir);
  const groups = new Map<string, string[]>();
  for (const f of files) {
    const group = relative(dir, f).split("/").slice(0, -1).join(" / ") || dir;
    groups.set(group, [...(groups.get(group) ?? []), f]);
  }
  return (
    <section className="mt-20">
      <h2 className="nh-display text-[clamp(32px,3.5vw,48px)] leading-none">{title}</h2>
      <p className="mt-3 text-[16px] text-[#A0A9C0]">{files.length} files this prototype is built from.</p>
      <div className="mt-8 flex flex-col gap-4">
        {[...groups].map(([group, list]) => (
          <details key={group} className="rounded-[18px] border border-white/12 bg-[#0A0F1E] px-6 py-4">
            <summary className="cursor-pointer text-[16px] font-medium">
              {group} <span className="text-[#7D869C]">· {list.length}</span>
            </summary>
            <ul className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {list.map((f) => {
                const name = f.split("/").pop()!;
                return (
                  <li key={f} className="flex flex-col gap-2">
                    <img src={`/${f}`} alt="" loading="lazy" className="aspect-[3/2] w-full rounded-[10px] object-cover" />
                    <a href={`/${f}`} download={`seopage-${f.replace(/\//g, "-")}`} className="flex h-9 items-center justify-center rounded-full border border-white/30 text-[13px] hover:border-white/60">
                      {name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </details>
        ))}
      </div>
    </section>
  );
}
