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
import { sendGa4Event } from "@/lib/ga4";
import { PRICE_CENTS, PRODUCT } from "@/lib/config";

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

    // GA4 purchase, sent once per paid session whichever branch below handles it. The session id is
    // the transaction id, so a retried webhook doesn't count twice. Without the visitor's GA id (an
    // ad blocker), the sale still counts, just not credited to a channel.
    if (session.payment_status === "paid") {
      const value = (session.amount_total ?? PRICE_CENTS) / 100;
      await sendGa4Event(session.metadata?.ga_client_id || `stripe.${session.id}`, "purchase", {
        transaction_id: session.id,
        value,
        currency: (session.currency ?? "usd").toUpperCase(),
        items: [{ item_id: "seo-page", item_name: PRODUCT.productName, price: value, quantity: 1 }],
      });
    }

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
