import { SOCIALS } from "@/lib/config";

/** Official marks, drawn small and single-color so they sit in either footer. */
const ICONS: Record<(typeof SOCIALS)[number]["name"], React.ReactNode> = {
  YouTube: (
    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" />
  ),
  LinkedIn: (
    <path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.1c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zm1.8 13.1H3.6V9h3.5v11.5zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0z" />
  ),
};

/** One line on what each channel is for, for placements with room to say it. */
const WHY: Record<(typeof SOCIALS)[number]["name"], string> = {
  YouTube: "Watch pages get built",
  LinkedIn: "Company updates",
};

/** Small icon + name, for a quiet row like the footer's bottom bar. */
export function SocialInline({ className }: { className: string }) {
  return (
    <span className="flex gap-4">
      {SOCIALS.map((s) => (
        <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer me" className={`flex items-center gap-1.5 ${className}`}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>{ICONS[s.name]}</svg>
          {s.name}
        </a>
      ))}
    </span>
  );
}

/** Icon, name, and handle with a reason to follow, for a footer column. */
export function SocialList() {
  return (
    <ul className="flex flex-col gap-4">
      {SOCIALS.map((s) => (
        <li key={s.name}>
          <a href={s.href} target="_blank" rel="noopener noreferrer me" className="group flex items-start gap-3">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-[#C9D0E2] transition-colors group-hover:border-white/50 group-hover:text-white">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>{ICONS[s.name]}</svg>
            </span>
            <span className="flex flex-col">
              <span className="text-[15px] text-[#C9D0E2] transition-colors group-hover:text-white">{s.name}</span>
              <span className="text-[13px] text-[#7D869C]">{s.handle}</span>
              <span className="text-[13px] text-[#7D869C]">{WHY[s.name]}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

/** Icon buttons for the dark footer; `className` sets their color and hover. */
export function SocialIcons({ className }: { className: string }) {
  return (
    <ul className="flex gap-3">
      {SOCIALS.map((s) => (
        <li key={s.name}>
          <a href={s.href} target="_blank" rel="noopener noreferrer me" aria-label={`SEOPage on ${s.name} (${s.handle})`} className={className}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>{ICONS[s.name]}</svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
