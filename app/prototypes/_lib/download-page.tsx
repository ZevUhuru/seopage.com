"use client";

import { toPng } from "html-to-image";
import { usePathname } from "next/navigation";
import { useState } from "react";

/**
 * On every prototype page: saves a full-length PNG of exactly what's on
 * screen, captured in the browser, so it is always current. The button
 * itself is left out of the capture.
 */
export function DownloadPage() {
  const path = usePathname();
  const [state, setState] = useState<"idle" | "busy" | "failed">("idle");

  async function save() {
    setState("busy");
    try {
      const node = document.body;
      const width = node.scrollWidth;
      const height = node.scrollHeight;
      // Browsers cap a canvas side near 32k px; long pages drop to 1x to fit.
      const pixelRatio = Math.max(1, Math.min(2, 30000 / height));
      const url = await toPng(node, {
        width,
        height,
        pixelRatio,
        cacheBust: true,
        backgroundColor: "#04060B",
        filter: (n) => !(n instanceof HTMLElement && n.dataset.protoUi !== undefined),
      });
      const a = document.createElement("a");
      a.href = url;
      a.download = `seopage-${path.replace(/^\/|\/$/g, "").replace(/\//g, "-") || "prototypes"}.png`;
      a.click();
      setState("idle");
    } catch {
      setState("failed");
    }
  }

  return (
    <button
      data-proto-ui
      onClick={save}
      disabled={state === "busy"}
      className="fixed bottom-5 left-5 z-[100] flex h-11 items-center gap-2 rounded-full border border-white/25 bg-[#04060B]/85 px-5 text-[14px] font-medium text-[#EEF2FF] shadow-[0_10px_30px_rgba(0,0,0,.5)] backdrop-blur hover:border-white/60 disabled:opacity-60"
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
      </svg>
      {state === "busy" ? "Saving…" : state === "failed" ? "Couldn't save, try again" : "Download page"}
    </button>
  );
}
