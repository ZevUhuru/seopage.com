import type { EventName } from "./events";

/* Browser-side event sending. The Google tag defines window.gtag on the production deploy only
   (app/layout.tsx), so everywhere else these calls do nothing. The server-side funnel log is a
   different thing: lib/analytics.ts. */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Sends one event to GA4. Beacon transport, so a click that leaves the page still arrives. */
export function trackEvent(name: EventName, params: Record<string, string | number | undefined> = {}) {
  window.gtag?.("event", name, { ...params, transport_type: "beacon" });
}

/** This visitor's GA4 client id, read from the _ga cookie ("GA1.1.123.456" → "123.456"), or undefined.
 *  Passed through checkout so the server's purchase event joins the same visitor's journey. */
export function gaClientId(): string | undefined {
  const m = document.cookie.match(/(?:^|; )_ga=GA\d\.\d\.(\d+\.\d+)/);
  return m?.[1];
}
