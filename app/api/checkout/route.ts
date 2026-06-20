import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getGeneration } from "@/lib/store";
import { PRICE_CENTS, PRODUCT, getBaseUrl } from "@/lib/config";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: { id?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const id = body.id?.trim();
  if (!id) {
    return NextResponse.json({ error: "Missing generation id." }, { status: 400 });
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
