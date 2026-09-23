import { NextRequest, NextResponse } from "next/server";
import { getSubmission, attachStripeSession } from "@/lib/submissions";
import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const id = String(body.id ?? "");
  const submission = await getSubmission(id);

  if (!submission) {
    return NextResponse.json({ error: "Submission not found." }, { status: 404 });
  }
  if (submission.status !== "authorization_signed") {
    return NextResponse.json(
      { error: "Sign the authorization agreement before paying." },
      { status: 409 },
    );
  }

  const priceId = process.env.STRIPE_PRICE_ID;
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? req.nextUrl.origin;
  if (!priceId) {
    return NextResponse.json({ error: "Checkout is not configured." }, { status: 500 });
  }

  const session = await stripe().checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: priceId, quantity: 1 }],
    customer_email: submission.business_email,
    success_url: `${base}/thank-you?id=${submission.id}`,
    cancel_url: `${base}/verify/${submission.id}`,
    metadata: { submissionId: submission.id },
  });

  await attachStripeSession(submission.id, session.id);

  return NextResponse.json({ url: session.url });
}
