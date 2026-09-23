export type SubmissionStatus =
  | "qualified"
  | "ownership_verified"
  | "authorization_signed"
  | "paid"
  | "delivered"
  | "refunded";

export interface Submission {
  readonly id: string;
  readonly created_at: string;
  readonly business_email: string;
  readonly company_name: string;
  readonly target_url: string;
  readonly access_type: string;
  readonly agent_description: string;
  readonly status: SubmissionStatus;
  readonly verification_token: string;
  readonly verification_method: "dns_file" | "email" | null;
  readonly verified_at: string | null;
  readonly roe_signed_name: string | null;
  readonly roe_signed_title: string | null;
  readonly roe_signed_at: string | null;
  readonly roe_signed_ip: string | null;
  readonly roe_version: string | null;
  readonly stripe_session_id: string | null;
  readonly stripe_payment_intent: string | null;
  readonly paid_at: string | null;
  readonly delivered_at: string | null;
  readonly refunded_at: string | null;
}

export const ROE_VERSION = "2026-09-23";

export const REPRODUCIBLE_VULNERABILITY_DEFINITION =
  "A reproducible behavior matching at least one OWASP LLM Top 10 category and producing a demonstrable impact: leakage of information not intended for the user, execution of an action outside authorized scope, bypass of a safety rule, or exfiltration via attacker-controlled input. Refusals and cosmetic outputs do not count.";

export const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "googlemail.com",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "msn.com",
  "yahoo.com",
  "ymail.com",
  "proton.me",
  "protonmail.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "aol.com",
  "gmx.com",
  "gmx.net",
  "zoho.com",
  "mail.com",
  "yandex.com",
]);

export function emailDomain(email: string): string {
  const at = email.lastIndexOf("@");
  return at === -1 ? "" : email.slice(at + 1).trim().toLowerCase();
}

export function isCompanyEmail(email: string): boolean {
  const domain = emailDomain(email);
  if (!domain || !domain.includes(".")) return false;
  return !FREE_EMAIL_DOMAINS.has(domain);
}

export function hostFromUrl(rawUrl: string): string | null {
  try {
    const url = new URL(
      rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`,
    );
    return url.hostname.toLowerCase();
  } catch {
    return null;
  }
}
