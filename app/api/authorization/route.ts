import { NextRequest, NextResponse } from "next/server";
import { signAuthorization } from "@/lib/submissions";
import { ROE_VERSION } from "@/lib/types";

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const id = String(body.id ?? "");
  const fullName = String(body.fullName ?? "").trim();
  const title = String(body.title ?? "").trim();
  const exclusionsAck = Boolean(body.exclusionsAck);
  const authorityAck = Boolean(body.authorityAck);

  if (!id || !fullName || !title || !exclusionsAck || !authorityAck) {
    return NextResponse.json(
      { error: "Full name, title, and both acknowledgements are required." },
      { status: 400 },
    );
  }

  const submission = await signAuthorization({
    id,
    fullName,
    title,
    ip: clientIp(req),
    roeVersion: ROE_VERSION,
  });

  if (!submission) {
    return NextResponse.json(
      { error: "Ownership must be verified before signing authorization." },
      { status: 409 },
    );
  }

  return NextResponse.json({ ok: true });
}
