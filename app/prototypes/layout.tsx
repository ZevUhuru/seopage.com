import type { Metadata } from "next";
import { funnelDisplay, funnelSans } from "@/components/home/fonts";
import "./proto.css";

/* Prototypes for the /agentic → /rank redesign. Never indexed; delete the
   whole folder once a direction is chosen. */
export const metadata: Metadata = {
  title: { absolute: "rank¹ prototypes | SEOPage" },
  robots: { index: false, follow: false },
};

export default function ProtoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`nh ${funnelDisplay.variable} ${funnelSans.variable} min-h-screen`}>
      {children}
    </div>
  );
}
