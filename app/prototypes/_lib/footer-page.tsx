import { notFound } from "next/navigation";
import { FOOTERS, FOOTER_VIEWS, FooterSwitcher, type FooterKey } from "./footer";

export const footerParams = () => FOOTERS.map((f) => ({ v: f.key }));

/** One footer direction on the homepage's closing scene. */
export async function FooterProto({ params, scale }: { params: Promise<{ v: string }>; scale: boolean }) {
  const { v } = await params;
  const View = FOOTER_VIEWS[v as FooterKey];
  if (!View) notFound();
  return (
    <>
      <p className="border-b border-white/12 px-6 py-4 text-[13px] text-[#7D869C] sm:px-10 lg:px-24">
        The last screen of the homepage, then the footer.
        {scale && " At scale: 24 trades (22 simulated, linking nowhere) and 30 issues."}
      </p>
      <View scale={scale} />
      <div className="h-24" />
      <FooterSwitcher current={v as FooterKey} scale={scale} />
    </>
  );
}
