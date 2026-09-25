import { funnelDisplay, funnelSans } from "@/components/home/fonts";

/** The journal wears the homepage's dark system and faces. */
export default function RankLayout({ children }: { children: React.ReactNode }) {
  return <div className={`nh ${funnelDisplay.variable} ${funnelSans.variable} min-h-screen`}>{children}</div>;
}
