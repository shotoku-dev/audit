import { NextRequest, NextResponse } from "next/server";
import { getSubmission, markOwnershipVerified } from "@/lib/submissions";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id") ?? "";
  const token = req.nextUrl.searchParams.get("token") ?? "";
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? req.nextUrl.origin;

  const submission = await getSubmission(id);
  if (!submission || submission.verification_token !== token) {
    return NextResponse.redirect(`${base}/verify/${id}?error=bad_token`);
  }

  if (submission.status === "qualified") {
    await markOwnershipVerified(submission.id, "email");
  }

  return NextResponse.redirect(`${base}/verify/${id}?confirmed=1`);
}
