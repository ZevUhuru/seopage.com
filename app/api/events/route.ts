import { NextResponse } from "next/server";
import { track, type FunnelEvent } from "@/lib/analytics";

export const runtime = "nodejs";

const ALLOWED: FunnelEvent[] = [
  "intake_started",
  "paywall_reached",
  "payment_completed",
];

export async function POST(req: Request) {
  let body: { event?: string; meta?: Record<string, unknown> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const event = body.event as FunnelEvent;
  if (!ALLOWED.includes(event)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  await track(event, body.meta ?? {});
  return NextResponse.json({ ok: true });
}
