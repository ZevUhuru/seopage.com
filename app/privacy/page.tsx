import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { PRIVACY } from "@/lib/legal";

// seopage.com/privacy (2026-11-06). Text in lib/legal.ts.
export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "What SEOPage collects, why, who helps us, how long we keep it, and how to see, fix or delete it.",
  alternates: { canonical: "/privacy" },
};

export default function Privacy() {
  return <LegalPage doc={PRIVACY} others={[{ label: "Terms of service", href: "/terms" }, { label: "Cookie policy", href: "/cookies" }]} />;
}
