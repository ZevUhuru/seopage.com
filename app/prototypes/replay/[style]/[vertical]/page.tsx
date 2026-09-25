import { notFound } from "next/navigation";
import { getVertical, VERTICALS } from "@/lib/verticals";
import { REPLAY_STYLES, ReplayProto, ReplaySwitcher, type ReplayKey } from "../../../_lib/replay";

export const dynamicParams = false;
export function generateStaticParams() {
  return REPLAY_STYLES.flatMap((s) => VERTICALS.map((v) => ({ style: s.key, vertical: v.slug })));
}

export default async function ReplayPage({ params }: { params: Promise<{ style: string; vertical: string }> }) {
  const { style, vertical } = await params;
  const v = getVertical(vertical);
  if (!v || !REPLAY_STYLES.some((s) => s.key === style)) notFound();
  return (
    <>
      <p className="border-b border-white/12 px-6 py-4 text-[13px] text-[#7D869C] sm:px-10 lg:px-24">
        The app section of the trade page, three ways. Images generated through api.esy.com.
      </p>
      <ReplayProto style={style as ReplayKey} v={v} />
      <div className="h-24" />
      <ReplaySwitcher style={style as ReplayKey} slug={v.slug} />
    </>
  );
}
