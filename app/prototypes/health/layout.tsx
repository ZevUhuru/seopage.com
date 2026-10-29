import type { Metadata } from "next";

export const metadata: Metadata = { title: { absolute: "Site health prototypes | SEOPage" } };

export default function HealthLayout({ children }: { children: React.ReactNode }) {
  return <div className="bg-[#04060B]">{children}</div>;
}
