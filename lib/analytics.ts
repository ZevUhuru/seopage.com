import { promises as fs } from "fs";
import os from "os";
import path from "path";

/**
 * Lightweight, privacy-friendly funnel logging. The three numbers that read
 * the validation result:
 *   - intake_started   → visitor started the intake (try rate)
 *   - paywall_reached  → generated a page and saw the preview
 *   - payment_completed→ paid (conversion)
 *
 * Events are appended to a JSONL file (tmp dir) and printed to the server log.
 * Swap this for PostHog/Plausible/etc. without touching callers.
 */

export type FunnelEvent =
  | "intake_started"
  | "paywall_reached"
  | "payment_completed";

const LOG = path.join(os.tmpdir(), "seopage-events.jsonl");

export async function track(
  event: FunnelEvent,
  meta: Record<string, unknown> = {},
): Promise<void> {
  const row = { ts: new Date().toISOString(), event, ...meta };
  // Server log — visible in `vercel logs` or your terminal.
  console.log(`[funnel] ${event}`, JSON.stringify(meta));
  try {
    await fs.appendFile(LOG, JSON.stringify(row) + "\n", "utf8");
  } catch {
    // Best-effort.
  }
}

/** Read the running funnel totals (used by an optional internal check). */
export async function funnelTotals(): Promise<Record<string, number>> {
  const totals: Record<string, number> = {
    intake_started: 0,
    paywall_reached: 0,
    payment_completed: 0,
  };
  try {
    const raw = await fs.readFile(LOG, "utf8");
    for (const line of raw.split("\n")) {
      if (!line.trim()) continue;
      const { event } = JSON.parse(line) as { event: string };
      if (event in totals) totals[event] += 1;
    }
  } catch {
    // No events yet.
  }
  return totals;
}
