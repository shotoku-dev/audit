import { NextRequest, NextResponse } from "next/server";
import { checkAdminPassword, createAdminSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const password = String(body.password ?? "");

  if (!checkAdminPassword(password)) {
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }

  await createAdminSession();
  return NextResponse.json({ ok: true });
}
