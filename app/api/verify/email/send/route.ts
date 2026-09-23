import { NextRequest, NextResponse } from "next/server";
import { getSubmission } from "@/lib/submissions";
import { sendOwnershipVerifyEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const id = String(body.id ?? "");
  const submission = await getSubmission(id);
  if (!submission) {
    return NextResponse.json({ error: "Submission not found." }, { status: 404 });
  }
  if (submission.status !== "qualified") {
    return NextResponse.json({ sent: false, alreadyVerified: true });
  }

  await sendOwnershipVerifyEmail(submission);
  return NextResponse.json({ sent: true });
}
