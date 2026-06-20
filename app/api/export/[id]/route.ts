import { getGeneration } from "@/lib/store";

export const runtime = "nodejs";

function slugify(s: string): string {
  return (
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 48) || "seo-landing-page"
  );
}

/** Serves the clean, watermark-free HTML as a download — paid only. */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const gen = await getGeneration(id);

  if (!gen || gen.status !== "complete" || !gen.html) {
    return new Response("Not found.", { status: 404 });
  }
  if (!gen.paid) {
    return new Response("Payment required.", { status: 402 });
  }

  const filename = `${slugify(gen.intake.businessName)}.html`;
  return new Response(gen.html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
