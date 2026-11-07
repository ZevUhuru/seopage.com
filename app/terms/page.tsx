import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { TERMS } from "@/lib/legal";

// seopage.com/terms (2026-11-06). Text in lib/legal.ts.
export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms for building, buying and publishing pages with SEOPage, in plain words.",
  alternates: { canonical: "/terms" },
};

export default function Terms() {
  return <LegalPage doc={TERMS} others={[{ label: "Privacy policy", href: "/privacy" }, { label: "Cookie policy", href: "/cookies" }]} />;
}
