import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";
import {
  getGeneration,
  getOrder,
  updateGeneration,
  updateOrder,
} from "@/lib/store";
import { sendDeliveryEmail } from "@/lib/email";
import { getBaseUrl } from "@/lib/config";

export const runtime = "nodejs";

/**
 * Admin fulfillment actions, submitted as plain HTML forms from /admin:
 *  - attach: link a reviewed generation to an order
 *  - deliver: unlock the export and email the finished page to the buyer
 * Redirects back to the order's admin detail view either way.
 */
export async function POST(req: Request) {
  const form = await req.formData();
  const key = String(form.get("key") || "");
  if (!isAdmin(key)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const orderId = String(form.get("orderId") || "").trim();
  const action = String(form.get("action") || "");
  const back = new URL("/admin", getBaseUrl());
  back.searchParams.set("key", key);
  back.searchParams.set("q", orderId);

  const order = await getOrder(orderId);
  if (!order) {
    back.searchParams.set("notice", "Order not found");
    return NextResponse.redirect(back, 303);
  }

  if (action === "attach") {
    const generationId = String(form.get("generationId") || "").trim();
    const gen = generationId ? await getGeneration(generationId) : undefined;
    if (!gen) {
      back.searchParams.set("notice", "Generation not found");
      return NextResponse.redirect(back, 303);
    }
    await updateOrder(orderId, { generationId });
    back.searchParams.set("notice", "Generation attached");
    return NextResponse.redirect(back, 303);
  }

  if (action === "deliver") {
    if (!order.generationId) {
      back.searchParams.set("notice", "Attach a generation first");
      return NextResponse.redirect(back, 303);
    }
    const gen = await getGeneration(order.generationId);
    if (!gen?.html) {
      back.searchParams.set("notice", "Generation has no finished page");
      return NextResponse.redirect(back, 303);
    }
    // The buyer paid up front — unlock the export before mailing the link.
    if (!gen.paid) {
      await updateGeneration(gen.id, {
        paid: true,
        stripeSessionId: order.stripeSessionId,
      });
    }
    const sent = await sendDeliveryEmail(order, gen.id, gen.meta?.title);
    await updateOrder(orderId, {
      status: "delivered",
      deliveredAt: Date.now(),
    });
    back.searchParams.set(
      "notice",
      sent ? "Delivered — email sent" : "Marked delivered, but the email failed (check logs)",
    );
    return NextResponse.redirect(back, 303);
  }

  back.searchParams.set("notice", "Unknown action");
  return NextResponse.redirect(back, 303);
}
