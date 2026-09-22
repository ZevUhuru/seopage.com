import Image from "next/image";

/**
 * The founder section, lifted out of the homepage when the narrative moved
 * from "I build and review your page" to the self-serve builder. Kept intact
 * so it can go back on any page as-is: <FounderNote n="03" />.
 */
export function FounderNote({ n }: { n: string }) {
  return (
    <section id="founder" className="border-t border-line bg-surface-2">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="chapter-head">
          <span className="chapter-num">{n}</span>
          <span className="chapter-eyebrow">Who&apos;s behind it</span>
          <span className="chapter-line" />
        </div>
        <div className="mx-auto mt-12 grid max-w-4xl items-center gap-10 sm:grid-cols-[auto_1fr]">
          <div className="mx-auto text-center">
            {/* Wrapper clips; the image is zoomed and nudged right within it. */}
            <div className="h-44 w-44 overflow-hidden rounded-full border-2 border-accent">
              <Image
                src="/founder-zev-uhuru.png"
                alt="Zev Uhuru, founder of SEOPage"
                width={176}
                height={176}
                className="h-full w-full scale-[1.35] translate-x-2 translate-y-4 object-cover"
              />
            </div>
            <p className="mt-3 text-sm text-muted">New York City</p>
          </div>
          <div>
            <p className="mono text-[11px] uppercase tracking-[0.14em] text-accent">
              A note from the founder
            </p>
            <p className="note mt-5">
              I&apos;ve built SEO landing pages professionally for over a
              decade, for{" "}
              <span className="font-semibold text-[#0b2c5b]">vroom.com</span>,{" "}
              <span className="font-semibold text-[#c2560c]">fubo.tv</span>,{" "}
              <span className="font-semibold text-[#00786a]">esy.com</span>,
              and my own products.
              SEOPage is that craft turned into a service. AI does in an
              hour what used to take me a week of research and drafting,
              though it still doesn&apos;t know which page is worth
              publishing. That part is the decade, and I bring it to every
              page before it ships.{" "}
              <span className="note-close">
                If it isn&apos;t a page I&apos;d publish myself, it
                doesn&apos;t go out.
              </span>
            </p>
            <div className="mt-6 flex items-center justify-between gap-4 border-t border-line pt-5">
              <div>
                <p className="font-semibold text-ink">Zev Uhuru</p>
                <p className="text-sm text-muted">
                  Founder &middot; Marketing Engineer
                </p>
              </div>
              {/* GitHub first: the profile README lists the fubo and Vroom
                  work by URL, so it verifies the claim this note actually
                  makes. LinkedIn stays for readers who don't know what a
                  commit is. */}
              <div className="flex shrink-0 items-center gap-2">
                <a
                  href="https://github.com/ZevUhuru"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Zev Uhuru on GitHub"
                  className="grid h-10 w-10 place-items-center rounded-lg border border-line text-ink-2 transition hover:border-accent hover:text-accent"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.35-1.29-1.71-1.29-1.71-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.26 5.69.41.35.78 1.05.78 2.12v3.14c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/in/zevuhuru"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Zev Uhuru on LinkedIn"
                  className="grid h-10 w-10 place-items-center rounded-lg border border-line text-ink-2 transition hover:border-accent hover:text-accent"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
