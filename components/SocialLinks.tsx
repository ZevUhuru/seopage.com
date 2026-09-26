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
