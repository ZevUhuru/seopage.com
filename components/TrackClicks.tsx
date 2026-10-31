"use client";

import { useEffect } from "react";
import { BOOK_CALL_URL, CREATE_URL, SIGN_IN_URL } from "@/lib/config";
import { trackEvent } from "@/lib/track";

/**
 * One listener for the whole site instead of a handler on every button: a click on a link into
 * the app is start_free, a click on the booking link is book_call. `location` says where on the
 * page it was: the nearest data-track, else the section's id, else header/footer/section.
 * Prototype pages are skipped, so reviewing them never counts. Mounted in app/layout.tsx with the tag.
 */
export function TrackClicks() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (window.location.pathname.startsWith("/prototypes")) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.href;
      // Sign in also points into the app, but it's a returning owner, not a new start
      const name = href.startsWith(SIGN_IN_URL) ? null : href.startsWith(CREATE_URL) ? "start_free" : href.startsWith(BOOK_CALL_URL) ? "book_call" : null;
      if (!name) return;
      const area = a.closest("[data-track], section[id], header, footer, section") as HTMLElement | null;
      const location = area?.dataset.track || area?.id || area?.tagName.toLowerCase() || "page";
      const trade = new URLSearchParams(window.location.search).get("trade") ?? undefined;
      trackEvent(name, { location, link_text: (a.textContent || "").trim().slice(0, 60), trade });
    }
    // Capture phase, so the event is sent before the browser starts leaving the page
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}
