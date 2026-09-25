"use client";

import { useRef, useState } from "react";

/**
 * Drag (or use the arrow keys) to reveal the page SEOPage builds over the
 * site a trade has today. Both pages are drawn at 720px and scaled to fit.
 */
export function BeforeAfter({
  before,
  after,
  failings,
  proof,
}: {
  before: React.ReactNode;
  after: React.ReactNode;
  failings: string[];
  proof: string[];
}) {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const move = (clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (r) setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };
  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <ul className="flex flex-col gap-3 lg:col-span-3">
        <li className="nh-display text-[44px] leading-none text-[#FF6B5C]">18<span className="text-[18px] text-[#7D869C]">/100</span></li>
        <li className="nh-mono text-[11px] uppercase tracking-[0.16em] text-[#7D869C]">Their site today</li>
        {failings.map((f) => (
          <li key={f} className="flex gap-2.5 text-[14px] leading-[1.45] text-[#C9D0E2]"><span className="text-[#FF6B5C]">✕</span>{f}</li>
        ))}
      </ul>
      <div
        ref={box}
        role="slider"
        aria-label="Compare the site today with the page SEOPage builds"
        aria-valuenow={Math.round(pos)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        onPointerDown={(e) => { (e.target as HTMLElement).setPointerCapture?.(e.pointerId); move(e.clientX); }}
        onPointerMove={(e) => e.buttons === 1 && move(e.clientX)}
        onKeyDown={(e) => { if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5)); if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5)); }}
        className="relative aspect-[720/1000] cursor-ew-resize select-none overflow-hidden rounded-[20px] border border-white/15 bg-white lg:col-span-6"
        style={{ touchAction: "pan-y" }}
      >
        <Scaled>{before}</Scaled>
        <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
          <Scaled>{after}</Scaled>
        </div>
        <div className="absolute inset-y-0 w-[3px] bg-[#3D6BFF]" style={{ left: `calc(${pos}% - 1.5px)` }}>
          <span className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#3D6BFF] text-[16px] text-white shadow-lg">⇆</span>
        </div>
        <span className="absolute bottom-3 left-3 rounded-full bg-[#04060B]/80 px-3 py-1 text-[12px] text-[#FF8A7D]">Today</span>
        <span className="absolute bottom-3 right-3 rounded-full bg-[#04060B]/80 px-3 py-1 text-[12px] text-[#9DB4FF]">Built by SEOPage</span>
      </div>
      <ul className="flex flex-col gap-3 lg:col-span-3">
        <li className="nh-display text-[44px] leading-none text-[#9DB4FF]">90<span className="text-[18px] text-[#7D869C]">/100</span></li>
        <li className="nh-mono text-[11px] uppercase tracking-[0.16em] text-[#7D869C]">The page that wins</li>
        {proof.map((p) => (
          <li key={p} className="flex gap-2.5 text-[14px] leading-[1.45] text-[#C9D0E2]"><span className="text-[#9DB4FF]">✓</span>{p}</li>
        ))}
      </ul>
    </div>
  );
}

/** Scales a 720px-wide drawing to the width of its container. */
function Scaled({ children }: { children: React.ReactNode }) {
  const [scale, setScale] = useState(1);
  return (
    <div
      className="absolute inset-0"
      ref={(el) => {
        if (!el) return;
        const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / 720));
        ro.observe(el);
        return () => ro.disconnect();
      }}
    >
      <div className="origin-top-left" style={{ transform: `scale(${scale})`, width: 720 }}>{children}</div>
    </div>
  );
}
