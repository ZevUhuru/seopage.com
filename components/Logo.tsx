import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 font-semibold tracking-tight ${className}`}
      aria-label="SEOPage home"
    >
      <span className="grid h-8 w-8 place-items-center rounded-[10px] bg-ink text-white">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M6 15.5 10.5 11l3 3L19 8"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 8h4v4"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="text-[1.15rem]">
        SEO<span className="text-accent">Page</span>
      </span>
    </Link>
  );
}
