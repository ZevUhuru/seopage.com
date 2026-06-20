import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { DeliveryActions } from "@/components/DeliveryActions";
import { getGeneration, updateGeneration } from "@/lib/store";
import { getStripe } from "@/lib/stripe";
import { track } from "@/lib/analytics";
import { PRODUCT } from "@/lib/config";

export const metadata: Metadata = {
  title: "Your page is ready",
  robots: { index: false, follow: false },
};

/**
 * Delivery + self-verifying unlock. The webhook is the primary unlock signal,
 * but we ALSO verify the Checkout Session here so post-payment delivery is
 * reliable even without a webhook configured (e.g. local dev).
 */
export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; session_id?: string }>;
}) {
  const { id, session_id } = await searchParams;

  if (!id) return <Failed reason="Missing your order reference." />;
  let gen = await getGeneration(id);
  if (!gen) return <Failed reason="We couldn't find that page." />;

  // Verify payment if not already unlocked.
  if (!gen.paid && session_id && process.env.STRIPE_SECRET_KEY) {
    try {
      const session = await getStripe().checkout.sessions.retrieve(session_id);
      const matches = session.metadata?.generationId === id;
      const isPaid = session.payment_status === "paid";
      if (matches && isPaid) {
        gen =
          (await updateGeneration(id, {
            paid: true,
            stripeSessionId: session.id,
          })) ?? gen;
        await track("payment_completed", { id, source: "success_redirect" });
      }
    } catch {
      // fall through to the not-unlocked state
    }
  }

  if (!gen.paid) {
    return (
      <Failed
        reason="We haven't confirmed your payment yet. If you just paid, give it a moment and refresh, or head back to the preview."
        id={id}
      />
    );
  }

  return (
    <>
      <header className="border-b border-line/70">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-5 sm:px-8">
          <Logo />
        </div>
      </header>
      <main className="mx-auto max-w-2xl px-5 py-14 sm:px-8 lg:py-20">
        <div className="text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-good-soft text-good">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12.5 10 17l9-10"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="display mt-5 text-4xl text-ink sm:text-5xl">
            Your page is ready.
          </h1>
          <p className="mt-3 text-lg text-ink-2">
            Payment confirmed. Here&apos;s your finished SEO landing page for{" "}
            <span className="font-semibold text-ink">
              {gen.intake.businessName}
            </span>
            . Clean, watermark-free HTML, ready to publish.
          </p>
        </div>

        <div className="card mt-9 p-6 sm:p-8">
          <DeliveryActions id={id} />

          <div className="mt-6 rounded-xl bg-surface-2 p-4 text-sm text-ink-2">
            <p className="font-semibold text-ink">How to publish it</p>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-[0.92rem]">
              <li>Download the HTML file above (or copy the code).</li>
              <li>
                Upload it to your host as{" "}
                <code className="mono rounded bg-bg px-1.5 py-0.5 text-xs">
                  index.html
                </code>
                , or paste it into your site builder&apos;s custom-HTML block.
              </li>
              <li>
                It&apos;s fully self-contained: the schema, styles, and SEO tags
                are all inside the one file.
              </li>
            </ol>
          </div>

          {gen.meta && (
            <div className="mt-6 grid gap-3 border-t border-line pt-6 sm:grid-cols-2">
              <Detail label="Title tag" value={gen.meta.title} />
              <Detail label="Meta description" value={gen.meta.description} />
            </div>
          )}
        </div>

        <p className="mt-8 text-center text-sm text-muted">
          {PRODUCT.satisfaction} ·{" "}
          <a
            href={`mailto:${PRODUCT.supportEmail}`}
            className="underline hover:text-ink"
          >
            {PRODUCT.supportEmail}
          </a>
        </p>
        <div className="mt-4 text-center">
          <Link href="/intake" className="text-sm text-muted hover:text-ink">
            Build another page →
          </Link>
        </div>
      </main>
    </>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mono text-[11px] uppercase tracking-wider text-muted">
        {label}
      </p>
      <p className="mt-1 text-sm leading-snug text-ink-2">{value}</p>
    </div>
  );
}

function Failed({ reason, id }: { reason: string; id?: string }) {
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
          {id && (
            <Link href={`/preview/${id}`} className="btn btn-primary btn-md">
              Back to preview
            </Link>
          )}
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
