import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { isAdmin } from "@/lib/admin";
import {
  getGeneration,
  getGenerationBySession,
  listAllGenerations,
  listPaidGenerations,
} from "@/lib/store";
import type { Generation } from "@/lib/types";
import { PRICE_LABEL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Admin · Orders",
  robots: { index: false, follow: false },
};

// Always read live — this is an audit view, never cache it.
export const dynamic = "force-dynamic";

type Params = Promise<{ key?: string; q?: string; view?: string }>;

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Params;
}) {
  const { key, q, view } = await searchParams;

  if (!isAdmin(key)) return <Locked configured={Boolean(process.env.ADMIN_TOKEN)} />;

  // Single-order lookup by generation id OR Stripe session id.
  if (q) {
    const term = q.trim();
    const order =
      (await getGeneration(term)) ?? (await getGenerationBySession(term));
    return (
      <Shell adminKey={key!}>
        <SearchBar adminKey={key!} value={term} />
        {order ? (
          <OrderDetail gen={order} adminKey={key!} />
        ) : (
          <p className="mt-8 text-ink-2">
            No record found for{" "}
            <span className="mono text-ink">{term}</span>. It may have expired
            (non-converting intakes are kept 90 days) or the id/session is wrong.
          </p>
        )}
      </Shell>
    );
  }

  // List view — all intakes, or paid only.
  const paidOnly = view === "paid";
  const [all, paid] = await Promise.all([
    listAllGenerations(),
    listPaidGenerations(),
  ]);
  const rows = paidOnly ? paid : all;
  const conversion = all.length
    ? Math.round((paid.length / all.length) * 100)
    : 0;

  return (
    <Shell adminKey={key!}>
      <SearchBar adminKey={key!} />

      <div className="mt-6 grid grid-cols-3 gap-3">
        <Stat label="Intakes" value={String(all.length)} />
        <Stat label="Paid orders" value={String(paid.length)} />
        <Stat label="Conversion" value={`${conversion}%`} />
      </div>

      <div className="mt-6 flex gap-2">
        <Tab adminKey={key!} active={!paidOnly} view={undefined} label={`All (${all.length})`} />
        <Tab adminKey={key!} active={paidOnly} view="paid" label={`Paid (${paid.length})`} />
      </div>

      {rows.length === 0 ? (
        <p className="mt-8 text-ink-2">No records yet.</p>
      ) : (
        <div className="card mt-4 divide-y divide-line">
          {rows.map((g) => (
            <Row key={g.id} gen={g} adminKey={key!} />
          ))}
        </div>
      )}
    </Shell>
  );
}

/* --------------------------------- pieces -------------------------------- */

function Row({ gen, adminKey }: { gen: Generation; adminKey: string }) {
  return (
    <Link
      href={`/admin?key=${enc(adminKey)}&q=${enc(gen.id)}`}
      className="flex items-center gap-4 px-4 py-3 hover:bg-surface-2"
    >
      <Outcome gen={gen} />
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-ink">
          {gen.intake.businessName || "—"}
        </p>
        <p className="mono truncate text-xs text-muted">
          {[gen.intake.service, gen.intake.location].filter(Boolean).join(" · ") ||
            gen.id}
        </p>
      </div>
      <time className="shrink-0 text-xs text-muted">{fmt(gen.createdAt)}</time>
    </Link>
  );
}

function OrderDetail({ gen, adminKey }: { gen: Generation; adminKey: string }) {
  const i = gen.intake;
  return (
    <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_1.3fr]">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ink">
            {i.businessName || gen.id}
          </h2>
          <Outcome gen={gen} />
        </div>

        <dl className="card mt-4 divide-y divide-line text-sm">
          <Field label="Generation id" value={gen.id} mono />
          <Field label="Created" value={fmt(gen.createdAt)} />
          <Field label="Status" value={gen.status} />
          <Field label="Paid" value={gen.paid ? `Yes · ${PRICE_LABEL}` : "No"} />
          {gen.stripeSessionId && (
            <Field label="Stripe session" value={gen.stripeSessionId} mono />
          )}
          <Field label="Service" value={i.service} />
          <Field label="Location" value={i.location} />
          {i.targetKeyword && <Field label="Target keyword" value={i.targetKeyword} />}
          {i.websiteUrl && <Field label="Website" value={i.websiteUrl} />}
          {i.phone && <Field label="Phone" value={i.phone} />}
          {i.brandColor && <Field label="Brand color" value={i.brandColor} />}
          {i.details && <Field label="Details" value={i.details} />}
          {gen.error && <Field label="Error" value={gen.error} />}
        </dl>

        <div className="mt-4 flex flex-wrap gap-2">
          {gen.html && (
            <a
              href={`/api/preview/${gen.id}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost btn-md"
            >
              Open preview ↗
            </a>
          )}
          {gen.paid && (
            <a
              href={`/api/export/${gen.id}`}
              className="btn btn-primary btn-md"
            >
              Download delivered file ↓
            </a>
          )}
          <Link href={`/admin?key=${enc(adminKey)}`} className="btn btn-ghost btn-md">
            ← Back to list
          </Link>
        </div>
      </div>

      <div>
        <p className="mono text-[11px] uppercase tracking-wider text-muted">
          What the visitor saw
        </p>
        {gen.html ? (
          <div className="card mt-2 overflow-hidden bg-white">
            <iframe
              src={`/api/preview/${gen.id}`}
              title="Generated page"
              className="h-[640px] w-full"
              sandbox="allow-same-origin"
            />
          </div>
        ) : (
          <p className="mt-2 text-sm text-ink-2">No page was generated.</p>
        )}
      </div>
    </div>
  );
}

function Outcome({ gen }: { gen: Generation }) {
  const [label, cls] = gen.paid
    ? ["Paid", "bg-good-soft text-good"]
    : gen.status === "error"
      ? ["Error", "bg-ink text-white"]
      : gen.status === "complete"
        ? ["Previewed", "bg-accent-soft text-accent"]
        : ["Building", "bg-surface-2 text-muted"];
  return (
    <span
      className={`shrink-0 rounded-full px-2.5 py-1 text-[0.7rem] font-medium ${cls}`}
    >
      {label}
    </span>
  );
}

function Field({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex gap-4 px-4 py-2.5">
      <dt className="w-32 shrink-0 text-muted">{label}</dt>
      <dd className={`min-w-0 break-words text-ink-2 ${mono ? "mono text-xs" : ""}`}>
        {value}
      </dd>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="card p-4">
      <p className="mono text-[11px] uppercase tracking-wider text-muted">
        {label}
      </p>
      <p className="display mt-1 text-2xl text-ink">{value}</p>
    </div>
  );
}

function Tab({
  adminKey,
  active,
  view,
  label,
}: {
  adminKey: string;
  active: boolean;
  view?: string;
  label: string;
}) {
  const href = view
    ? `/admin?key=${enc(adminKey)}&view=${view}`
    : `/admin?key=${enc(adminKey)}`;
  return (
    <Link
      href={href}
      className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
        active ? "bg-ink text-white" : "bg-surface-2 text-ink-2 hover:text-ink"
      }`}
    >
      {label}
    </Link>
  );
}

function SearchBar({ adminKey, value }: { adminKey: string; value?: string }) {
  return (
    <form action="/admin" method="get" className="flex gap-2">
      <input type="hidden" name="key" value={adminKey} />
      <input
        name="q"
        defaultValue={value}
        placeholder="Look up by generation id or Stripe session id…"
        className="mono flex-1 rounded-lg border border-line bg-bg px-3 py-2 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none"
      />
      <button type="submit" className="btn btn-primary btn-md">
        Look up
      </button>
    </form>
  );
}

function Shell({
  adminKey,
  children,
}: {
  adminKey: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="border-b border-line/70">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-8">
          <Logo />
          <span className="pill text-[0.72rem] text-accent">Admin</span>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
        <Link
          href={`/admin?key=${enc(adminKey)}`}
          className="display text-2xl text-ink hover:opacity-80"
        >
          Orders &amp; intakes
        </Link>
        <div className="mt-6">{children}</div>
      </main>
    </>
  );
}

function Locked({ configured }: { configured: boolean }) {
  return (
    <main className="mx-auto max-w-md px-5 py-28 text-center sm:px-8">
      <h1 className="display text-3xl text-ink">Restricted</h1>
      <p className="mt-3 text-ink-2">
        {configured
          ? "Add ?key=<ADMIN_TOKEN> to the URL to view orders."
          : "Set ADMIN_TOKEN in the environment to enable this page."}
      </p>
    </main>
  );
}

/* --------------------------------- utils --------------------------------- */

function enc(s: string): string {
  return encodeURIComponent(s);
}

function fmt(ms: number): string {
  return new Date(ms).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
