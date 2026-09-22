"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

/**
 * What the visitor typed in the hero form. The hero's AI answer, the alarm
 * transcript, and the builder demo all read it, so typing a business name
 * personalizes the whole page. Empty means "show SEOPage's own example".
 */
type Personal = {
  name: string;
  service: string;
  city: string;
  setName: (v: string) => void;
  setService: (v: string) => void;
  setCity: (v: string) => void;
};

const Ctx = createContext<Personal | null>(null);

export function PersonalizeProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [city, setCity] = useState("");
  const value = useMemo(
    () => ({ name, service, city, setName, setService, setCity }),
    [name, service, city],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function usePersonalize(): Personal {
  const v = useContext(Ctx);
  if (!v) throw new Error("usePersonalize must be used inside PersonalizeProvider");
  return v;
}

/** Derived, display-ready values with sensible defaults. */
export function useVisitor() {
  const { name, service, city } = usePersonalize();
  const own = !name.trim();
  const displayName = own ? "SEOPage" : name.trim();
  const svc = service.trim() || "plumber";
  const town = city.split(",")[0].trim() || "your city";
  const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "") || "yourbusiness";
  return {
    own,
    displayName,
    service: svc,
    city: town,
    host: own ? "seopage.com" : `${slug(displayName)}.seo.page`,
    question: own
      ? "Who builds SEO pages that get cited by AI?"
      : `Who’s the best ${svc.toLowerCase()} in ${town}?`,
    alarmQuestion: `Who’s the best ${svc.toLowerCase()} in ${town}?`,
    missing: `${own ? "Your business" : displayName} isn’t mentioned. There’s no page for the answer to quote.`,
    // The demo builds Nora's example shop until the visitor types their own.
    demo: {
      name: name.trim() || "Lind Plumbing",
      service: service.trim() || "Plumbing",
      city: city.split(",")[0].trim() || "Denver",
    },
    slug,
  };
}
