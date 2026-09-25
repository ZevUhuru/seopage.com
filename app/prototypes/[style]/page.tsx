import { notFound } from "next/navigation";
import { getArticles } from "@/lib/articles";
import { IndexA } from "../_lib/a";
import { IndexB } from "../_lib/b";
import { IndexC } from "../_lib/c";
import { ProtoSwitcher, STYLES, type StyleKey } from "../_lib/shared";

const INDEX = { a: IndexA, b: IndexB, c: IndexC };

// Built once, so the prototype links never depend on the API.
export const dynamicParams = false;
export function generateStaticParams() {
  return STYLES.map((s) => ({ style: s.key }));
}

export default async function ProtoIndex({ params }: { params: Promise<{ style: string }> }) {
  const { style } = await params;
  const View = INDEX[style as StyleKey];
  if (!View) notFound();
  const articles = await getArticles();
  return (
    <>
      <View articles={articles} />
      <ProtoSwitcher current={style as StyleKey} />
    </>
  );
}
