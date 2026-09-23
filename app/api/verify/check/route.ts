import { NextRequest, NextResponse } from "next/server";
import { getSubmission, markOwnershipVerified } from "@/lib/submissions";
import { hostFromUrl } from "@/lib/types";

// Checks for a .txt file on the target's domain containing the submission's
// verification token. Tries a well-known path first, then the domain root.
async function fetchWithTimeout(url: string, ms = 8000): Promise<Response | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { signal: controller.signal, cache: "no-store" });
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const id = String(body.id ?? "");
  const submission = await getSubmission(id);
  if (!submission) {
    return NextResponse.json({ error: "Submission not found." }, { status: 404 });
  }
  if (submission.status !== "qualified") {
    return NextResponse.json({ verified: true });
  }

  const host = hostFromUrl(submission.target_url);
  if (!host) {
    return NextResponse.json({ error: "Target URL is invalid." }, { status: 400 });
  }

  const candidates = [
    `https://${host}/.well-known/breakpoint-verify.txt`,
    `https://${host}/breakpoint-verify.txt`,
  ];

  for (const url of candidates) {
    const res = await fetchWithTimeout(url);
    if (!res || !res.ok) continue;
    const text = (await res.text()).trim();
    if (text === submission.verification_token) {
      const updated = await markOwnershipVerified(submission.id, "dns_file");
      return NextResponse.json({ verified: Boolean(updated) });
    }
  }

  return NextResponse.json({ verified: false });
}
