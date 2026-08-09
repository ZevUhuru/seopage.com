import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getGeneration } from "@/lib/store";
import { PRICE_CENTS, PRODUCT, getBaseUrl } from "@/lib/config";

export const runtime = "nodejs";

/**
 * Two checkout modes:
 *  - Direct (no body / no id): the pay-first funnel. Pay $PRICE up front,
 *    then land on /order to fill the intake. Stripe collects the email.
 *  - Legacy (id): unlock a completed self-serve generation (preview paywall).
 */
export async function POST(req: Request) {
  let body: { id?: string } = {};
  try {
    body = await req.json();
  } catch {
    // No body — treat as a direct purchase.
  }
  const id = body.id?.trim();
  if (!id) {
    return createDirectSession();
  }

  const gen = await getGeneration(id);
  if (!gen || gen.status !== "complete") {
    return NextResponse.json(
      { error: "This page isn't ready to purchase yet." },
      { status: 400 },
    );
  }
  if (gen.paid) {
    // Already paid — send them straight to delivery.
    return NextResponse.json({ url: `${getBaseUrl()}/success?id=${id}` });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Payments aren't configured yet (missing STRIPE_SECRET_KEY)." },
      { status: 503 },
    );
  }

  try {
    const base = getBaseUrl();
    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: PRICE_CENTS,
            product_data: {
              name: PRODUCT.productName,
              description: PRODUCT.productDescription,
            },
          },
        },
      ],
      payment_intent_data: {
        statement_descriptor_suffix: PRODUCT.billingDescriptor,
      },
      metadata: { generationId: id },
      success_url: `${base}/success?id=${id}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/preview/${id}?canceled=1`,
    });

    if (!session.url) {
      throw new Error("Stripe did not return a checkout URL.");
    }
    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Could not start checkout.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/** Pay-first purchase from the marketing site: pay now, intake after. */
async function createDirectSession() {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Payments aren't configured yet (missing STRIPE_SECRET_KEY)." },
      { status: 503 },
    );
  }
  try {
    const base = getBaseUrl();
    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: PRICE_CENTS,
            product_data: {
              name: PRODUCT.productName,
              description: PRODUCT.productDescription,
            },
          },
        },
      ],
      payment_intent_data: {
        statement_descriptor_suffix: PRODUCT.billingDescriptor,
      },
      metadata: { kind: "direct-order" },
      success_url: `${base}/order?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/?canceled=1`,
    });
    if (!session.url) {
      throw new Error("Stripe did not return a checkout URL.");
    }
    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Could not start checkout.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
