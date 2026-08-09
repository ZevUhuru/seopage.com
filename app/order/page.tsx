import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { OrderIntakeForm } from "@/components/OrderIntakeForm";
import {
  getOrderBySession,
  newOrderId,
  saveOrder,
} from "@/lib/store";
import { getStripe } from "@/lib/stripe";
import { sendOrderAlert } from "@/lib/email";
import { track } from "@/lib/analytics";
import { DELIVERY_HOURS, PRODUCT } from "@/lib/config";

export const metadata: Metadata = {
  title: "Tell us about your page",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

/**
 * Post-payment intake. Mirrors the /success self-verify pattern: the webhook
 * is the primary signal, but we also verify the Checkout Session here so the
 * funnel works even without a webhook (e.g. local dev). Only a paid session
 * ever sees the form.
 */
/**
 * Webhook hasn't landed (or isn't configured) — verify the Checkout Session
 * with Stripe directly and create the order record ourselves.
 */
async function verifyAndCreateOrder(sessionId: string) {
  if (!process.env.STRIPE_SECRET_KEY) return undefined;
  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId);
    const isDirect = session.metadata?.kind === "direct-order";
    if (!isDirect || session.payment_status !== "paid") return undefined;
    const order = {
      id: newOrderId(),
      stripeSessionId: session.id,
      email: session.customer_details?.email || "",
      status: "awaiting_intake" as const,
      createdAt: Date.now(),
    };
    await saveOrder(order);
    await track("payment_completed", { id: order.id, source: "order_redirect" });
    await sendOrderAlert(order);
    return order;
  } catch {
    return undefined;
  }
}

export default async function OrderPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  if (!session_id) {
    return <Failed reason="Missing your order reference. Use the link from your checkout confirmation." />;
  }

  const order =
    (await getOrderBySession(session_id)) ??
    (await verifyAndCreateOrder(session_id));

  if (!order) {
    return (
      <Failed reason="We haven't confirmed your payment yet. If you just paid, give it a moment and refresh this page." />
    );
  }

  const intakeDone = order.status !== "awaiting_intake";

  return (
    <>
      <header className="border-b border-line/70">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-5 sm:px-8">
          <Logo />
        </div>
      </header>
      <main className="mx-auto max-w-2xl px-5 py-12 sm:px-8 lg:py-16">
        {intakeDone ? (
          <div className="card p-8 text-center sm:p-10">
            <h1 className="display text-3xl text-ink">
              Your page is in production.
            </h1>
            <p className="mx-auto mt-3 max-w-md text-ink-2">
              We have your brief. The finished page will arrive at{" "}
              <span className="font-semibold text-ink">{order.email}</span>{" "}
              within {DELIVERY_HOURS} hours of your order.
            </p>
            <p className="mt-6 text-sm text-muted">
              Need to change something?{" "}
              <a
                href={`mailto:${PRODUCT.supportEmail}`}
                className="underline hover:text-ink"
              >
                {PRODUCT.supportEmail}
              </a>
            </p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <p className="mono text-xs uppercase tracking-wider text-good">
                ✓ Payment received
              </p>
              <h1 className="display mt-4 text-4xl text-ink sm:text-5xl">
                Tell us about the page you need.
              </h1>
              <p className="mt-3 text-lg text-ink-2">
                This brief takes about 3 minutes. The more you give us, the
                stronger the page — then research, writing, and review start
                immediately.
              </p>
            </div>
            <OrderIntakeForm
              sessionId={session_id}
              defaultEmail={order.email}
              deliveryHours={DELIVERY_HOURS}
            />
          </>
        )}
      </main>
    </>
  );
}

function Failed({ reason }: { reason: string }) {
  return (
    <>
      <header className="border-b border-line/70">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-5 sm:px-8">
          <Logo />
        </div>
      </header>
      <main className="mx-auto max-w-lg px-5 py-24 text-center sm:px-8">
        <h1 className="display text-3xl text-ink">Almost there</h1>
        <p className="mt-3 text-ink-2">{reason}</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/" className="btn btn-primary btn-md">
            Back to the homepage
          </Link>
          <a
            href={`mailto:${PRODUCT.supportEmail}`}
            className="btn btn-ghost btn-md"
          >
            Email us
          </a>
        </div>
      </main>
    </>
  );
}
