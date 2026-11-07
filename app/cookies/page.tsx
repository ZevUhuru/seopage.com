import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { COOKIES } from "@/lib/legal";

// seopage.com/cookies (2026-11-06). Text in lib/legal.ts.
export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "What seopage.com stores in your browser: essential cookies only, no analytics or advertising.",
  alternates: { canonical: "/cookies" },
};

export default function Cookies() {
  return <LegalPage doc={COOKIES} others={[{ label: "Terms of service", href: "/terms" }, { label: "Privacy policy", href: "/privacy" }]} />;
}
