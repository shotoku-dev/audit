import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/auth";
import { getSubmission, markRefunded } from "@/lib/submissions";
import { stripe } from "@/lib/stripe";
import { sendRefundConfirmation } from "@/lib/email";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const { id } = await params;
  const submission = await getSubmission(id);
  if (!submission || !submission.stripe_payment_intent) {
    return NextResponse.json({ error: "No payment to refund." }, { status: 409 });
  }

  await stripe().refunds.create({
    payment_intent: submission.stripe_payment_intent,
  });

  const updated = await markRefunded(id);
  if (updated) {
    await sendRefundConfirmation(updated).catch((err) =>
      console.error("[refund] confirmation email failed", err),
    );
  }

  return NextResponse.json({ ok: true });
}
