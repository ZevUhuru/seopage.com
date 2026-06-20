"use client";

import { useState } from "react";

export function DeliveryActions({ id }: { id: string }) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  async function copyCode() {
    try {
      const res = await fetch(`/api/export/${id}`, { cache: "no-store" });
      if (!res.ok) throw new Error();
      const html = await res.text();
      await navigator.clipboard.writeText(html);
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 2200);
    } catch {
      setCopyState("error");
      setTimeout(() => setCopyState("idle"), 2200);
    }
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <a
        href={`/api/export/${id}`}
        download
        className="btn btn-accent btn-lg flex-1"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 4v11m0 0 4-4m-4 4-4-4M5 19h14"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Download HTML
      </a>
      <button onClick={copyCode} className="btn btn-ghost btn-lg flex-1">
        {copyState === "copied"
          ? "Copied to clipboard ✓"
          : copyState === "error"
            ? "Copy failed, use download"
            : "Copy the code"}
      </button>
    </div>
  );
}
