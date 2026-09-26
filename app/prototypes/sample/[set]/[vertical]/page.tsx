import { notFound } from "next/navigation";
import { getVertical, VERTICALS } from "@/lib/verticals";
import { SampleProto, SampleSwitcher, SETS, type SetKey } from "../../../_lib/sample";

export const dynamicParams = false;
export function generateStaticParams() {
  return SETS.flatMap((s) => VERTICALS.map((v) => ({ set: s.key, vertical: v.slug })));
}

export default async function SamplePage({ params }: { params: Promise<{ set: string; vertical: string }> }) {
  const { set, vertical } = await params;
  const v = getVertical(vertical);
  if (!v || !SETS.some((s) => s.key === set)) notFound();
  return (
    <>
      <p className="border-b border-white/12 px-6 py-4 text-[13px] text-[#7D869C] sm:px-10 lg:px-24">
        Direction B of the app section, with three realistic photo sets to choose from. Photos generated through api.esy.com.
      </p>
      <SampleProto set={set as SetKey} v={v} />
      <div className="h-24" />
      <SampleSwitcher set={set as SetKey} slug={v.slug} />
    </>
  );
}
