import { FooterProto, footerParams } from "../../../_lib/footer-page";

export const dynamicParams = false;
export const generateStaticParams = footerParams;

export default function Page({ params }: { params: Promise<{ v: string }> }) {
  return <FooterProto params={params} scale />;
}
