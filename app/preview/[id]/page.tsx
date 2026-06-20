import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { PayButton } from "@/components/PayButton";
import { PreviewPending } from "@/components/PreviewPending";
import { getGeneration } from "@/lib/store";
import { PRICE_LABEL, PRODUCT } from "@/lib/config";

export const metadata: Metadata = {
  title: "Your page preview",
  robots: { index: false, follow: false },
};

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const gen = await getGeneration(id);

  if (!gen) notFound();
  if (gen.paid) redirect(`/success?id=${id}`);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line/70 bg-bg/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Logo />
          <Link href="/intake" className="text-sm text-muted hover:text-ink">
            Start over
          </Link>
        </div>
      </header>

      {gen.status === "error" ? (
        <ErrorState message={gen.error} />
      ) : gen.status !== "complete" ? (
        <PreviewPending id={id} />
      ) : (
        <Ready id={id} gen={gen} />
      )}
    </>
  );
}

function ErrorState({ message }: { message?: string }) {
  return (
    <main className="mx-auto max-w-lg px-5 py-24 text-center sm:px-8">
      <h1 className="display text-3xl text-ink">Generation failed</h1>
      <p className="mt-3 text-ink-2">
        {message ?? "Something went wrong while building your page."}
      </p>
      <Link href="/intake" className="btn btn-primary btn-lg mt-6">
        Try again
      </Link>
    </main>
  );
}

function Ready({
  id,
  gen,
}: {
  id: string;
  gen: NonNullable<Awaited<ReturnType<typeof getGeneration>>>;
}) {
  const meta = gen.meta;
  const faviconUrl =
    gen.intake.websiteUrl?.replace(/^https?:\/\//, "").replace(/\/.*$/, "") ||
    `${slug(gen.intake.businessName)}.com`;

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-8 lg:py-12">
      <div className="mx-auto mb-8 max-w-2xl text-center">
        <span className="kicker">Your page is ready</span>
        <h1 className="display mt-3 text-3xl text-ink sm:text-4xl">
          Here&apos;s your SEO landing page.
        </h1>
        <p className="mt-3 text-ink-2">
          This is the real thing: researched, written, and built for your
          business. Look it over below, then download the clean HTML when
          you&apos;re ready.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.55fr_1fr]">
        {/* Preview */}
        <div>
          <div className="card overflow-hidden shadow-lg">
            <div className="flex items-center gap-2 border-b border-line bg-surface-2 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <div className="mono ml-3 flex-1 truncate rounded-md bg-bg px-3 py-1 text-xs text-muted">
                {faviconUrl}
              </div>
              <span className="pill text-[0.7rem] text-accent">Preview</span>
            </div>
            <div className="relative bg-white">
              <iframe
                src={`/api/preview/${id}`}
                title="Your generated landing page preview"
                className="h-[620px] w-full lg:h-[760px]"
                sandbox="allow-same-origin"
              />
            </div>
          </div>
          <p className="mt-3 text-center text-sm text-muted">
            Watermarked preview. Your exported file has no watermark.
          </p>
        </div>

        {/* Value summary + paywall */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="card p-6">
            <div className="flex items-baseline justify-between">
              <h2 className="text-lg font-semibold text-ink">
                What we optimized
              </h2>
              <span className="pill text-[0.72rem] text-good">
                <span className="h-1.5 w-1.5 rounded-full bg-good" /> Built
              </span>
            </div>

            {meta && (
              <ul className="mt-4 space-y-3 text-[0.92rem] text-ink-2">
                {meta.optimizationSummary.map((s, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M5 12.5 10 17l9-10"
                          stroke="currentColor"
                          strokeWidth="2.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            )}

            {meta && (
              <div className="mt-5 border-t border-line pt-5">
                <p className="mono text-[11px] uppercase tracking-wider text-muted">
                  Targeting
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {meta.targetKeywords.slice(0, 8).map((k) => (
                    <span
                      key={k}
                      className="rounded-lg bg-surface-2 px-2.5 py-1 text-xs font-medium text-ink-2"
                    >
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {meta && (
              <div className="mt-5 space-y-3 border-t border-line pt-5">
                <MetaRow label="Title tag" value={meta.title} />
                <MetaRow label="Meta description" value={meta.description} />
              </div>
            )}
          </div>

          {/* Paywall */}
          <div className="card mt-5 overflow-hidden">
            <div className="bg-ink px-6 py-5 text-white">
              <div className="flex items-end justify-between">
                <span className="font-semibold">Get your page</span>
                <span className="display text-3xl">{PRICE_LABEL}</span>
              </div>
              <p className="mt-1 text-sm text-white/65">
                Download your finished page as clean, ready-to-publish HTML you
                own.
              </p>
            </div>
            <div className="p-6">
              <PayButton id={id} label={`Get the page · ${PRICE_LABEL}`} />
              <ul className="mt-4 space-y-2 text-sm text-ink-2">
                {[
                  "No watermark, ready to publish",
                  "Title, meta, and schema.org markup included",
                  "Yours to publish anywhere, forever",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <span className="text-good">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M5 12.5 10 17l9-10"
                          stroke="currentColor"
                          strokeWidth="2.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-center text-xs text-muted">
                {PRODUCT.satisfaction}
              </p>
              <p className="mt-2 text-center text-[11px] text-muted">
                Secure checkout by Stripe · billed as {PRODUCT.billingDescriptor}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mono text-[11px] uppercase tracking-wider text-muted">
        {label}
      </p>
      <p className="mt-1 text-sm leading-snug text-ink-2">{value}</p>
    </div>
  );
}

function slug(s: string): string {
  return (
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "")
      .slice(0, 30) || "yourbusiness"
  );
}
