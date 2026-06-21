import { NextResponse } from "next/server";
import { runResearch } from "@/lib/generate";

export const runtime = "nodejs";
export const maxDuration = 300; // capped by your Vercel plan (Hobby = 60s)

export async function POST(req: Request) {
  let id: string | undefined;
  try {
    ({ id } = await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!id) {
    return NextResponse.json({ error: "Missing generation id." }, { status: 400 });
  }
  try {
    await runResearch(id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Research failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
