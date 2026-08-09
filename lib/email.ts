import { Resend } from "resend";
import type { Order } from "./types";
import { DELIVERY_HOURS, PRICE_LABEL, PRODUCT, getBaseUrl } from "./config";

/**
 * Transactional email via Resend. Fails soft everywhere: if RESEND_API_KEY is
 * missing or a send throws, we log and move on — orders still land in /admin
 * and can be fulfilled by hand. Never let email take down the paid funnel.
 *
 * Links are written by hand as plain <a href> tags (no tracking/rewriting):
 * rewritten URLs have burned us before and the delivery email must be clean.
 */

function resendClient(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  const g = globalThis as unknown as { __seopageResend?: Resend };
  if (!g.__seopageResend) g.__seopageResend = new Resend(key);
  return g.__seopageResend;
}

const FROM = () => process.env.EMAIL_FROM || "SEOPage <pages@seopage.com>";
const ALERT_TO = () => process.env.ORDER_ALERT_TO || PRODUCT.supportEmail;

async function send(opts: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<boolean> {
  const resend = resendClient();
  if (!resend) {
    console.log(`[email] RESEND_API_KEY unset — skipped "${opts.subject}" to ${opts.to}`);
    return false;
  }
  try {
    const { error } = await resend.emails.send({
      from: FROM(),
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      replyTo: opts.replyTo,
    });
    if (error) {
      console.error(`[email] send failed "${opts.subject}" to ${opts.to}:`, error);
      return false;
    }
    return true;
  } catch (err) {
    console.error(`[email] send threw "${opts.subject}" to ${opts.to}:`, err);
    return false;
  }
}

/* ------------------------------- templates ------------------------------- */

const wrap = (body: string) => `
<div style="font-family: -apple-system, Segoe UI, Helvetica, Arial, sans-serif; color: #0a0c11; max-width: 560px; margin: 0 auto; padding: 24px 16px;">
  <p style="font-weight: 700; font-size: 18px; margin: 0 0 20px;">SEO<span style="color:#1b46d4">Page</span></p>
  ${body}
  <p style="color: #646b78; font-size: 13px; margin-top: 32px; border-top: 1px solid #e6e8ec; padding-top: 16px;">
    SEOPage · Questions? Just reply to this email or write to
    <a href="mailto:${PRODUCT.supportEmail}">${PRODUCT.supportEmail}</a>.
  </p>
</div>`;

/** Buyer confirmation, sent as soon as the intake form lands. */
export async function sendOrderConfirmation(order: Order): Promise<boolean> {
  const body = `
  <p style="font-size: 16px;">Thanks for your order — we're on it.</p>
  <p>Your SEO page for <strong>${escapeHtml(order.businessName || "your business")}</strong>
  is now being researched, written, and reviewed by a person.
  You'll receive the finished page at this address <strong>within ${DELIVERY_HOURS} hours</strong>.</p>
  <p style="margin-top:20px;">What happens now:</p>
  <ol style="color:#353a44; line-height: 1.7;">
    <li>We research the search results for your target keyword.</li>
    <li>We write and structure the full page — title, meta description, headings, copy, FAQ, and schema.</li>
    <li>A person reviews everything before it goes out.</li>
    <li>The finished, ready-to-publish page arrives in your inbox.</li>
  </ol>
  <p style="color:#646b78;">${PRODUCT.satisfaction}</p>`;
  return send({
    to: order.email,
    subject: `Your SEO page is in production — arriving within ${DELIVERY_HOURS} hours`,
    html: wrap(body),
    replyTo: PRODUCT.supportEmail,
  });
}

/** Operator alert with the full intake so fulfillment can start immediately. */
export async function sendOrderAlert(order: Order): Promise<boolean> {
  const adminUrl = `${getBaseUrl()}/admin`;
  const rows = (
    [
      ["Order", order.id],
      ["Status", order.status],
      ["Email", order.email],
      ["Business", order.businessName],
      ["Industry", order.industry],
      ["Website", order.websiteUrl],
      ["USP", order.usp],
      ["Target keyword", order.targetKeyword],
      ["Service / offer", order.service],
      ["Location", order.location],
      ["Service area", order.serviceArea],
      ["Competitors", order.competitors],
      ["Audience", order.audience],
      ["Goal", order.goal],
      ["Conversion", order.conversionAction],
      ["Conversion target", order.conversionTarget],
      ["Tone", order.tone],
      ["Link to pages", order.internalLinks],
      ["Brand color", order.brandColor],
      ["Phone", order.phone],
      ["Notes", order.notes],
      ["Stripe session", order.stripeSessionId],
    ] as const
  )
    .filter(([, v]) => Boolean(v))
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 12px 4px 0; color:#646b78; vertical-align:top; white-space:nowrap;">${k}</td><td style="padding:4px 0;">${escapeHtml(String(v))}</td></tr>`,
    )
    .join("");
  const deadline = new Date(order.createdAt + DELIVERY_HOURS * 3600_000);
  const body = `
  <p style="font-size:16px;"><strong>${PRICE_LABEL} paid order</strong> — ${
    order.status === "awaiting_intake"
      ? "payment received, intake not yet submitted."
      : `intake in. Deliver by <strong>${deadline.toUTCString()}</strong>.`
  }</p>
  <table style="font-size:14px; border-collapse:collapse;">${rows}</table>
  <p style="margin-top:20px;"><a href="${adminUrl}">Open the admin queue</a> (append your key).</p>`;
  return send({
    to: ALERT_TO(),
    subject:
      order.status === "awaiting_intake"
        ? `New ${PRICE_LABEL} order paid — awaiting intake (${order.id})`
        : `Intake in for ${order.businessName || order.id} — ${DELIVERY_HOURS}h clock running`,
    html: wrap(body),
  });
}

/** Final delivery: link to the clean HTML export plus publish instructions. */
export async function sendDeliveryEmail(
  order: Order,
  generationId: string,
  pageTitle?: string,
): Promise<boolean> {
  const exportUrl = `${getBaseUrl()}/api/export/${generationId}`;
  const body = `
  <p style="font-size:16px;">Your SEO page is ready.</p>
  <p><strong>${escapeHtml(pageTitle || order.businessName || "Your page")}</strong> has been
  researched, written, and reviewed. Download the finished file:</p>
  <p style="margin: 24px 0;">
    <a href="${exportUrl}" style="background:#1b46d4; color:#fff; padding: 12px 20px; border-radius: 8px; text-decoration:none; font-weight:600;">Download your page</a>
  </p>
  <p style="color:#646b78; font-size:14px;">Direct link: <a href="${exportUrl}">${exportUrl}</a></p>
  <p style="margin-top:20px;">How to publish it:</p>
  <ol style="color:#353a44; line-height:1.7;">
    <li>Download the file — it's a single, self-contained HTML page.</li>
    <li>Upload it to your site (any host works: your CMS, Netlify, Vercel, cPanel).</li>
    <li>Keep the URL short and close to your keyword.</li>
    <li>Link to the new page from your homepage or navigation so it gets crawled.</li>
  </ol>
  <p>Want changes? Reply to this email — ${PRODUCT.satisfaction.toLowerCase()}</p>`;
  return send({
    to: order.email,
    subject: "Your SEO page is ready to publish",
    html: wrap(body),
    replyTo: PRODUCT.supportEmail,
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
