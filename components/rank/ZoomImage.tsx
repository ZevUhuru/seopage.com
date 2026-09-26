"use client";
/* eslint-disable @next/next/no-img-element -- article images from Markdown, sized by their own files. */

import { useCallback, useEffect, useState } from "react";

/**
 * An article image that opens a close-up when clicked. The close-up fills
 * the screen at the image's full resolution; clicking inside it magnifies
 * 2.5× around the point clicked (click again to zoom back out). Escape,
 * the close button, or a click on the backdrop closes it.
 */
export function ZoomImage({ src, alt }: { src?: string; alt?: string }) {
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    setZoom(null);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  if (!src) return null;
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="rank-zoom group relative block w-full cursor-zoom-in" aria-label={`Enlarge image: ${alt ?? ""}`}>
        <img src={src} alt={alt ?? ""} loading="lazy" />
        <span className="pointer-events-none absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#04060B]/75 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M11 8v6M8 11h6M16.5 16.5L21 21" /></svg>
        </span>
      </button>
      {alt && <span className="rank-caption">{alt}</span>}
      {open && (
        <div role="dialog" aria-modal="true" aria-label={alt} className="fixed inset-0 z-[200] flex items-center justify-center bg-[#04060B]/92 p-4 backdrop-blur-sm sm:p-10" onClick={close}>
          <div className="relative flex max-h-full max-w-full items-center justify-center overflow-hidden rounded-[14px]" onClick={(e) => e.stopPropagation()}>
            <img
              src={src}
              alt={alt ?? ""}
              onClick={(e) => {
                if (zoom) return setZoom(null);
                const r = e.currentTarget.getBoundingClientRect();
                setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
              }}
              className={`block max-h-[calc(100vh-5rem)] max-w-full object-contain transition-transform duration-300 ease-out ${zoom ? "cursor-zoom-out" : "cursor-zoom-in"}`}
              style={{ transform: zoom ? "scale(2.5)" : "none", transformOrigin: zoom ? `${zoom.x}% ${zoom.y}%` : "center" }}
            />
          </div>
          <button type="button" onClick={close} className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-[#04060B]/80 text-white hover:border-white/60" aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
          <p className="pointer-events-none absolute bottom-4 left-0 right-0 text-center text-[13px] text-[#A0A9C0]">{zoom ? "Click to zoom out" : "Click the image to magnify"} · Esc to close</p>
        </div>
      )}
    </>
  );
}
