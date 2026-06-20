import { getGeneration } from "@/lib/store";
import { watermarkHtml } from "@/lib/preview";

export const runtime = "nodejs";

/** Serves the watermarked, non-exportable preview page (rendered in an iframe). */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const gen = await getGeneration(id);

  if (!gen || gen.status !== "complete" || !gen.html) {
    return new Response("Preview not ready.", { status: 404 });
  }

  return new Response(watermarkHtml(gen.html), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}
