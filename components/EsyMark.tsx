/**
 * Esy's wordmark (esy.com public/brand/logo/esy-wordmark.svg), inline so it
 * takes the text colour around it. `color` keeps Esy's teal "e"; `mono` draws
 * the whole mark in the current colour; `hover` is mono until a parent with
 * `group` is hovered, then the "e" turns teal. Sized by `className` (height).
 */
export function EsyMark({ tone = "color", className = "h-[1em]" }: { tone?: "color" | "mono" | "hover"; className?: string }) {
  return (
    <svg viewBox="0 0 3909 1432" role="img" aria-label="Esy" className={`inline-block w-auto ${className}`}>
      <title>Esy</title>
      <path
        fill={tone === "color" ? "#00A896" : "currentColor"}
        className={tone === "hover" ? "transition-colors group-hover:fill-[#00A896]" : undefined}
        transform="translate(-95.0 1062.0) scale(1 -1)"
        d="M360 0 95 265V797L360 1062H537V0ZM607 426V611H840V797H607V1062H982L1247 797V426ZM607 0V248H1201V133L1069 0Z"
      />
      <path
        fill="currentColor"
        transform="translate(1297.4 1062.0) scale(1 -1)"
        d="M804 0V401H326L96 622V824L335 1062H512V687H1016L1246 455V248L999 0ZM804 784V867H582V1062H1052L1210 904V784ZM279 0 95 219V304H538V195H734V0Z"
      />
      <path
        fill="currentColor"
        transform="translate(2673.9 1062.0) scale(1 -1)"
        d="M272 -370 810 1062H1235L696 -370ZM378 89 -14 1062H427L576 630Z"
      />
    </svg>
  );
}
