"use client";

import { useState } from "react";

/** Direct pay-first checkout: no generation id — pay now, brief after. */
export function BuyButton({
  label,
  className = "btn btn-accent btn-lg",
}: {
  label: string;
  className?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function checkout() {
    setLoading(true);
    setError(null);
    try {
      void fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event: "paywall_reached", meta: { source: "direct" } }),
      }).catch(() => {});
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Could not start checkout.");
      }
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start checkout.");
      setLoading(false);
    }
  }

  return (
    <div>
      <button onClick={checkout} disabled={loading} className={className}>
        {loading ? (
          <>
            <span className="spin h-4 w-4 rounded-full border-2 border-white/40 border-t-white" />
            Redirecting…
          </>
        ) : (
          label
        )}
      </button>
      {error && (
        <p className="mt-3 rounded-xl border border-[#f3c2bd] bg-[#fdecea] px-4 py-3 text-sm text-[#b42318]">
          {error}
        </p>
      )}
    </div>
  );
}
