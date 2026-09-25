"use client";

import { useEffect, useState } from "react";

/** A cobalt reading bar pinned to the top of the article. */
export function Progress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      setP(Math.min(1, h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)));
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div className="fixed inset-x-0 top-0 z-[90] h-[3px]">
      <div className="h-full origin-left bg-[#3D6BFF]" style={{ transform: `scaleX(${p})` }} />
    </div>
  );
}
