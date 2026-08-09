import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import {
  getGeneration,
  getOrderBySession,
  newOrderId,
  saveOrder,
  updateGeneration,
} from "@/lib/store";
import { sendOrderAlert } from "@/lib/email";
import { track } from "@/lib/analytics";

export const runtime = "nodejs";

/** Stripe webhook — the authoritative unlock signal (the success page also self-verifies). */
export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const sig = req.headers.get("stripe-signature");
  const raw = await req.text();

  if (!secret || !sig) {
    // Webhook not configured — the success route handles unlock instead.
    return NextResponse.json({ received: true, verified: false });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(raw, sig, secret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "bad signature";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Pay-first orders: record the payment immediately so the order exists
    // even if the buyer never returns to fill the intake form.
    if (session.metadata?.kind === "direct-order") {
      const existing = await getOrderBySession(session.id);
      if (!existing) {
        const order = {
          id: newOrderId(),
          stripeSessionId: session.id,
          email: session.customer_details?.email || "",
          status: "awaiting_intake" as const,
          createdAt: Date.now(),
        };
        await saveOrder(order);
        await track("payment_completed", { id: order.id, source: "webhook-direct" });
        await sendOrderAlert(order);
      }
      return NextResponse.json({ received: true });
    }

    const id = session.metadata?.generationId;
    if (id) {
      const gen = await getGeneration(id);
      if (gen && !gen.paid) {
        await updateGeneration(id, {
          paid: true,
          stripeSessionId: session.id,
        });
        await track("payment_completed", { id, source: "webhook" });
      }
    }
  }

  return NextResponse.json({ received: true });
}
