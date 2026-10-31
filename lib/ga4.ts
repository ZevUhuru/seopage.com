import { GA_MEASUREMENT_ID } from "./config";
import type { EventName } from "./events";

/**
 * Sends an event to GA4 from the server (the Measurement Protocol), for things the browser can't
 * be trusted to report, like a payment: ad blockers and closed tabs don't lose it. Production only,
 * and only when GA4_API_SECRET is set (GA4 → Admin → Data streams → the web stream →
 * Measurement Protocol API secrets). Never throws: analytics must not break a webhook.
 */
export async function sendGa4Event(clientId: string, name: EventName, params: Record<string, unknown>) {
  const secret = process.env.GA4_API_SECRET;
  if (!secret || process.env.VERCEL_ENV !== "production") return;
  try {
    await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${GA_MEASUREMENT_ID}&api_secret=${secret}`, {
      method: "POST",
      body: JSON.stringify({ client_id: clientId, events: [{ name, params }] }),
    });
  } catch (err) {
    console.warn(`[ga4] ${name} not sent`, err instanceof Error ? err.message : err);
  }
}
