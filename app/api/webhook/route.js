import { headers } from "next/headers";

/**
 * app/api/webhook/route.js
 * - Lazy requires stripe and prisma
 * - Guards against missing STRIPE_WEBHOOK_SECRET
 * - Safe for Vercel build
 */

export async function POST(req) {
  const body = await req.text();
  const sig = headers().get("stripe-signature");

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.warn("STRIPE_WEBHOOK_SECRET not set — skipping webhook processing.");
    return new Response("webhook ignored (no secret)", { status: 200 });
  }

  let stripe;
  try {
    // lazy require stripe lib (lib/stripe exports { stripe })
    stripe = require("../../../lib/stripe").stripe;
  } catch (e) {
    console.error("Stripe lib not available", e?.message || e);
    return new Response("stripe lib missing", { status: 500 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature error", err?.message || err);
    return new Response("Webhook Error", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const metadata = session.metadata || {};
    try {
      const { getPrisma } = require("../../../lib/db");
      const prisma = getPrisma();
      if (prisma && metadata.projectId) {
        await prisma.payment.create({
          data: {
            amount: Math.round(session.amount_total / 100),
            status: "paid",
            stripeId: session.id,
            projectId: metadata.projectId,
          },
        });
        await prisma.project.update({
          where: { id: metadata.projectId },
          data: { status: "paid" },
        });
      } else {
        console.log("Prisma unavailable or no projectId in metadata — skipping DB write.");
      }
    } catch (e) {
      console.error("Prisma webhook error", e?.message || e);
    }
  }

  return new Response("ok");
}
