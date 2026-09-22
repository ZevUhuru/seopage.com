"use client";

import { useEffect, useRef } from "react";

/**
 * A silent looping clip that only downloads and plays while on screen, and
 * stays on its poster for visitors who prefer reduced motion. The poster is
 * a real frame, so nothing is lost when the video never plays.
 */
export function LoopVideo({
  src,
  poster,
  label,
  className = "",
  style,
}: {
  src: string;
  poster: string;
  label: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (v.preload !== "auto") v.preload = "auto";
          void v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
      className={className}
      style={style}
    />
  );
}
