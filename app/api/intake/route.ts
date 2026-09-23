import { NextRequest, NextResponse } from "next/server";
import { createSubmission } from "@/lib/submissions";
import { isCompanyEmail, hostFromUrl } from "@/lib/types";
import { sendOperatorNewSubmission } from "@/lib/email";

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const businessEmail = String(body.businessEmail ?? "").trim().toLowerCase();
  const companyName = String(body.companyName ?? "").trim();
  const targetUrl = String(body.targetUrl ?? "").trim();
  const accessType = String(body.accessType ?? "").trim();
  const agentDescription = String(body.agentDescription ?? "").trim();

  if (!businessEmail || !companyName || !targetUrl || !accessType || !agentDescription) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  if (!isCompanyEmail(businessEmail)) {
    return NextResponse.json(
      { error: "Use your company email — free providers (Gmail, Outlook, etc.) aren't accepted." },
      { status: 400 },
    );
  }

  if (!hostFromUrl(targetUrl)) {
    return NextResponse.json({ error: "That doesn't look like a valid URL." }, { status: 400 });
  }

  const submission = await createSubmission({
    businessEmail,
    companyName,
    targetUrl,
    accessType,
    agentDescription,
  });

  await sendOperatorNewSubmission(submission).catch((err) =>
    console.error("[intake] operator notification failed", err),
  );

  return NextResponse.json({ id: submission.id });
}
