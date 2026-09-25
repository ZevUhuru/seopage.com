import { notFound } from "next/navigation";
import { getVertical, VERTICALS } from "@/lib/verticals";
import { TradeA } from "../../../_lib/trade-a";
import { TradeB } from "../../../_lib/trade-b";
import { TradeC } from "../../../_lib/trade-c";
import { TradeD } from "../../../_lib/trade-d";
import { TRADE_STYLES, TradeSwitcher, type TradeKey } from "../../../_lib/trade-shared";

const VIEWS = { a: TradeA, b: TradeB, c: TradeC, d: TradeD };

export const dynamicParams = false;
export function generateStaticParams() {
  return TRADE_STYLES.flatMap((s) => VERTICALS.map((v) => ({ style: s.key, vertical: v.slug })));
}

export default async function TradeProto({ params }: { params: Promise<{ style: string; vertical: string }> }) {
  const { style, vertical } = await params;
  const View = VIEWS[style as TradeKey];
  const v = getVertical(vertical);
  if (!View || !v) notFound();
  return (
    <>
      <View v={v} />
      <div className="h-20" />
      <TradeSwitcher style={style as TradeKey} slug={v.slug} />
    </>
  );
}
