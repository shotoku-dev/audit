import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/auth";
import { markDelivered } from "@/lib/submissions";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const { id } = await params;
  const submission = await markDelivered(id);
  if (!submission) {
    return NextResponse.json({ error: "Submission is not paid." }, { status: 409 });
  }
  return NextResponse.json({ ok: true });
}
