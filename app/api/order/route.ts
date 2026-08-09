import { NextResponse } from "next/server";
import { getOrderBySession, updateOrder } from "@/lib/store";
import { sendOrderAlert, sendOrderConfirmation } from "@/lib/email";
import { checkRateLimit } from "@/lib/ratelimit";
import { track } from "@/lib/analytics";

export const runtime = "nodejs";

const MAX = 2000; // generous per-field cap; the brief is prose, not payloads

function clean(v: unknown): string | undefined {
  if (typeof v !== "string") return undefined;
  const s = v.trim().slice(0, MAX);
  return s || undefined;
}

/** Attach the buyer's brief to their paid order and kick off fulfillment. */
export async function POST(req: Request) {
  if (!(await checkRateLimit("order", req))) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment and try again." },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const sessionId = clean(body.sessionId);
  if (!sessionId) {
    return NextResponse.json({ error: "Missing order reference." }, { status: 400 });
  }

  // The order only exists if Stripe confirmed payment (webhook or /order
  // self-verify), so its existence IS the paid check.
  const order = await getOrderBySession(sessionId);
  if (!order) {
    return NextResponse.json(
      { error: "We couldn't find a paid order for this session." },
      { status: 404 },
    );
  }

  const email = clean(body.email);
  const businessName = clean(body.businessName);
  const targetKeyword = clean(body.targetKeyword);
  const service = clean(body.service);
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "A valid delivery email is required." }, { status: 400 });
  }
  if (!businessName || !targetKeyword || !service) {
    return NextResponse.json(
      { error: "Business name, target keyword, and offer are required." },
      { status: 400 },
    );
  }

  const goalRaw = clean(body.goal);
  const updated = await updateOrder(order.id, {
    email,
    businessName,
    targetKeyword,
    service,
    websiteUrl: clean(body.websiteUrl),
    location: clean(body.location),
    competitors: clean(body.competitors),
    audience: clean(body.audience),
    goal:
      goalRaw === "rank" || goalRaw === "leads" || goalRaw === "sales"
        ? goalRaw
        : undefined,
    internalLinks: clean(body.internalLinks),
    brandColor: clean(body.brandColor),
    phone: clean(body.phone),
    notes: clean(body.notes),
    status: "in_progress",
  });
  if (!updated) {
    return NextResponse.json({ error: "Could not save your brief." }, { status: 500 });
  }

  await track("intake_started", { id: order.id, source: "order_brief" });

  // Fire-and-forget notifications; failures never block the buyer.
  await Promise.all([sendOrderConfirmation(updated), sendOrderAlert(updated)]);

  return NextResponse.json({ ok: true });
}
