import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { isAdmin } from "@/lib/admin";
import {
  getGeneration,
  getGenerationBySession,
  getOrder,
  getOrderBySession,
  listAllGenerations,
  listOrders,
  listPaidGenerations,
} from "@/lib/store";
import type { Generation, Order } from "@/lib/types";
import { DELIVERY_HOURS, PRICE_LABEL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Admin · Orders",
  robots: { index: false, follow: false },
};

// Always read live — this is an audit view, never cache it.
export const dynamic = "force-dynamic";

type Params = Promise<{ key?: string; q?: string; view?: string; notice?: string }>;

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Params;
}) {
  const { key, q, view, notice } = await searchParams;

  if (!isAdmin(key)) return <Locked configured={Boolean(process.env.ADMIN_TOKEN)} />;

  // Single-record lookup: pay-first order id, generation id, or Stripe session.
  if (q) {
    const term = q.trim();
    const order = (await getOrder(term)) ?? (await getOrderBySession(term));
    if (order) {
      const gen = order.generationId
        ? await getGeneration(order.generationId)
        : undefined;
      return (
        <Shell adminKey={key!}>
          <SearchBar adminKey={key!} value={term} />
          {notice && <Notice text={notice} />}
          <PayFirstOrderDetail order={order} gen={gen} adminKey={key!} />
        </Shell>
      );
    }
    const gen =
      (await getGeneration(term)) ?? (await getGenerationBySession(term));
    return (
      <Shell adminKey={key!}>
        <SearchBar adminKey={key!} value={term} />
        {notice && <Notice text={notice} />}
        {gen ? (
          <OrderDetail gen={gen} adminKey={key!} />
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

  // List views. Pay-first orders are the fulfillment queue and the default.
  const [orders, all, paid] = await Promise.all([
    listOrders(),
    listAllGenerations(),
    listPaidGenerations(),
  ]);
  const openOrders = orders.filter((o) => o.status !== "delivered");
  const conversion = all.length
    ? Math.round((paid.length / all.length) * 100)
    : 0;
  const activeView =
    view === "paid" || view === "intakes" ? view : "orders";

  return (
    <Shell adminKey={key!}>
      <SearchBar adminKey={key!} />
      {notice && <Notice text={notice} />}

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Open orders" value={String(openOrders.length)} />
        <Stat label="Orders total" value={String(orders.length)} />
        <Stat label="Self-serve intakes" value={String(all.length)} />
        <Stat label="Intake conversion" value={`${conversion}%`} />
      </div>

      <div className="mt-6 flex gap-2">
        <Tab adminKey={key!} active={activeView === "orders"} view={undefined} label={`Orders (${orders.length})`} />
        <Tab adminKey={key!} active={activeView === "intakes"} view="intakes" label={`Intakes (${all.length})`} />
        <Tab adminKey={key!} active={activeView === "paid"} view="paid" label={`Paid intakes (${paid.length})`} />
      </div>

      {activeView === "orders" ? (
        orders.length === 0 ? (
          <p className="mt-8 text-ink-2">No pay-first orders yet.</p>
        ) : (
          <div className="card mt-4 divide-y divide-line">
            {orders.map((o) => (
              <PayFirstOrderRow key={o.id} order={o} adminKey={key!} />
            ))}
          </div>
        )
      ) : (
        (() => {
          const rows = activeView === "paid" ? paid : all;
          return rows.length === 0 ? (
            <p className="mt-8 text-ink-2">No records yet.</p>
          ) : (
            <div className="card mt-4 divide-y divide-line">
              {rows.map((g) => (
                <Row key={g.id} gen={g} adminKey={key!} />
              ))}
            </div>
          );
        })()
      )}
    </Shell>
  );
}

/* --------------------------------- pieces -------------------------------- */

function Notice({ text }: { text: string }) {
  return (
    <p className="mt-4 rounded-xl border border-line bg-surface-2 px-4 py-3 text-sm text-ink">
      {text}
    </p>
  );
}

/** Time left against the delivery promise, e.g. "1h 12m left" / "OVERDUE 20m". */
function clock(order: Order): { label: string; overdue: boolean } {
  if (order.status === "delivered") {
    return { label: "Delivered", overdue: false };
  }
  const deadline = order.createdAt + DELIVERY_HOURS * 3600_000;
  const diff = deadline - Date.now();
  const mins = Math.abs(Math.round(diff / 60_000));
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const span = h > 0 ? `${h}h ${m}m` : `${m}m`;
  return diff >= 0
    ? { label: `${span} left`, overdue: false }
    : { label: `OVERDUE ${span}`, overdue: true };
}

function OrderStatusPill({ order }: { order: Order }) {
  const [label, cls] =
    order.status === "delivered"
      ? ["Delivered", "bg-good-soft text-good"]
      : order.status === "in_progress"
        ? ["In production", "bg-accent-soft text-accent"]
        : ["Awaiting intake", "bg-surface-2 text-muted"];
  return (
    <span className={`shrink-0 rounded-full px-2.5 py-1 text-[0.7rem] font-medium ${cls}`}>
      {label}
    </span>
  );
}

function PayFirstOrderRow({ order, adminKey }: { order: Order; adminKey: string }) {
  const c = clock(order);
  return (
    <Link
      href={`/admin?key=${enc(adminKey)}&q=${enc(order.id)}`}
      className="flex items-center gap-4 px-4 py-3 hover:bg-surface-2"
    >
      <OrderStatusPill order={order} />
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-ink">
          {order.businessName || order.email || order.id}
        </p>
        <p className="mono truncate text-xs text-muted">
          {[order.targetKeyword, order.email].filter(Boolean).join(" · ") || order.id}
        </p>
      </div>
      {order.status !== "delivered" && (
        <span
          className={`mono shrink-0 text-xs ${c.overdue ? "font-semibold text-[#b42318]" : "text-muted"}`}
        >
          {c.label}
        </span>
      )}
      <time className="shrink-0 text-xs text-muted">{fmt(order.createdAt)}</time>
    </Link>
  );
}

function PayFirstOrderDetail({
  order,
  gen,
  adminKey,
}: {
  order: Order;
  gen?: Generation;
  adminKey: string;
}) {
  const c = clock(order);
  return (
    <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_1.3fr]">
      <div>
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-ink">
            {order.businessName || order.email || order.id}
          </h2>
          <div className="flex items-center gap-2">
            {order.status !== "delivered" && (
              <span
                className={`mono text-xs ${c.overdue ? "font-semibold text-[#b42318]" : "text-muted"}`}
              >
                {c.label}
              </span>
            )}
            <OrderStatusPill order={order} />
          </div>
        </div>

        <dl className="card mt-4 divide-y divide-line text-sm">
          <Field label="Order id" value={order.id} mono />
          <Field label="Paid" value={fmt(order.createdAt)} />
          <Field label="Email" value={order.email || "—"} />
          <Field label="Stripe session" value={order.stripeSessionId} mono />
          {order.targetKeyword && <Field label="Target keyword" value={order.targetKeyword} />}
          {order.service && <Field label="Offer" value={order.service} />}
          {order.websiteUrl && <Field label="Website" value={order.websiteUrl} />}
          {order.location && <Field label="Location" value={order.location} />}
          {order.competitors && <Field label="Competitors" value={order.competitors} />}
          {order.audience && <Field label="Audience" value={order.audience} />}
          {order.goal && <Field label="Goal" value={order.goal} />}
          {order.internalLinks && <Field label="Link to pages" value={order.internalLinks} />}
          {order.brandColor && <Field label="Brand color" value={order.brandColor} />}
          {order.phone && <Field label="Phone" value={order.phone} />}
          {order.notes && <Field label="Notes" value={order.notes} />}
          {order.generationId && <Field label="Generation" value={order.generationId} mono />}
          {order.deliveredAt && <Field label="Delivered" value={fmt(order.deliveredAt)} />}
        </dl>

        {/* Fulfillment: attach the reviewed generation, then deliver. */}
        <div className="card mt-4 space-y-4 p-4">
          <p className="mono text-[11px] uppercase tracking-wider text-muted">
            Fulfillment
          </p>
          <form action="/api/admin/order" method="post" className="flex gap-2">
            <input type="hidden" name="key" value={adminKey} />
            <input type="hidden" name="orderId" value={order.id} />
            <input type="hidden" name="action" value="attach" />
            <input
              name="generationId"
              defaultValue={order.generationId}
              placeholder="g_… generation id of the reviewed page"
              className="mono flex-1 rounded-lg border border-line bg-bg px-3 py-2 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none"
            />
            <button type="submit" className="btn btn-ghost btn-md">
              Attach
            </button>
          </form>
          <form action="/api/admin/order" method="post">
            <input type="hidden" name="key" value={adminKey} />
            <input type="hidden" name="orderId" value={order.id} />
            <input type="hidden" name="action" value="deliver" />
            <button
              type="submit"
              className="btn btn-primary btn-md w-full"
              disabled={!order.generationId || !gen?.html}
            >
              {order.status === "delivered"
                ? "Re-send delivery email"
                : "Send delivery email"}
            </button>
          </form>
          {!order.generationId && (
            <p className="text-xs text-muted">
              Run the page through <Link href="/intake" className="underline">/intake</Link> using
              this brief, review it, then attach its generation id here.
            </p>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {gen?.html && (
            <a
              href={`/api/preview/${gen.id}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost btn-md"
            >
              Open attached page ↗
            </a>
          )}
          <Link href={`/admin?key=${enc(adminKey)}`} className="btn btn-ghost btn-md">
            ← Back to queue
          </Link>
        </div>
      </div>

      <div>
        <p className="mono text-[11px] uppercase tracking-wider text-muted">
          Attached page
        </p>
        {gen?.html ? (
          <div className="card mt-2 overflow-hidden bg-white">
            <iframe
              src={`/api/preview/${gen.id}`}
              title="Attached page"
              className="h-[640px] w-full"
              sandbox="allow-same-origin"
            />
          </div>
        ) : (
          <p className="mt-2 text-sm text-ink-2">
            No page attached yet.
          </p>
        )}
      </div>
    </div>
  );
}

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
