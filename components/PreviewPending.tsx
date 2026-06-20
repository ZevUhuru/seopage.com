"use client";

import { useEffect } from "react";
import type { GenerationView } from "@/lib/types";

/** Rare path: someone lands on /preview before generation finished. Poll + reload. */
export function PreviewPending({ id }: { id: string }) {
  useEffect(() => {
    const t = setInterval(async () => {
      try {
        const res = await fetch(`/api/status/${id}`, { cache: "no-store" });
        if (!res.ok) return;
        const view = (await res.json()) as GenerationView;
        if (view.status === "complete" || view.status === "error") {
          window.location.reload();
        }
      } catch {
        /* keep polling */
      }
    }, 1500);
    return () => clearInterval(t);
  }, [id]);

  return (
    <div className="mx-auto max-w-lg px-5 py-24 text-center sm:px-8">
      <span className="spin mx-auto block h-8 w-8 rounded-full border-[3px] border-accent/30 border-t-accent" />
      <h1 className="display mt-6 text-2xl text-ink">
        Putting the finishing touches on your page…
      </h1>
      <p className="mt-3 text-ink-2">This will only take a moment.</p>
    </div>
  );
}
