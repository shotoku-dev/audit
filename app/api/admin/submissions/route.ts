import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/auth";
import { listSubmissions } from "@/lib/submissions";

export async function GET(req: NextRequest) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const status = req.nextUrl.searchParams.get("status") ?? undefined;
  const submissions = await listSubmissions(status);
  return NextResponse.json({ submissions });
}
