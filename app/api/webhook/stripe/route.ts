import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { markPaid, getSubmission } from "@/lib/submissions";
import { sendPaymentConfirmation } from "@/lib/email";

export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || !secret) {
    return NextResponse.json({ error: "Webhook not configured." }, { status: 500 });
  }

  const raw = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe().webhooks.constructEvent(raw, signature, secret);
  } catch (err) {
    console.error("[stripe webhook] signature verification failed", err);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const paymentIntent =
      typeof session.payment_intent === "string" ? session.payment_intent : null;
    const submission = await markPaid(session.id, paymentIntent);
    if (submission) {
      const fresh = await getSubmission(submission.id);
      if (fresh) {
        await sendPaymentConfirmation(fresh).catch((err) =>
          console.error("[stripe webhook] confirmation email failed", err),
        );
      }
    }
  }

  return NextResponse.json({ received: true });
}
