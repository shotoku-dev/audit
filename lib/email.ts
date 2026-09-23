import { Resend } from "resend";
import type { Submission } from "./types";

function client(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not set.");
  return new Resend(key);
}

const from = () => process.env.EMAIL_FROM ?? "Breakpoint <hello@audit.shotoku.dev>";
const baseUrl = () => process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

async function send(to: string, subject: string, html: string): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    console.warn(`[email] RESEND_API_KEY missing, skipping send to ${to}: ${subject}`);
    return;
  }
  await client().emails.send({ from: from(), to, subject, html });
}

export async function sendOwnershipVerifyEmail(
  submission: Submission,
): Promise<void> {
  const link = `${baseUrl()}/api/verify/email/confirm?id=${submission.id}&token=${submission.verification_token}`;
  await send(
    submission.business_email,
    "Confirm you control this domain — Breakpoint audit",
    `<p>Click the link below to confirm you control <strong>${submission.business_email}</strong> and can authorize a security audit of <strong>${submission.target_url}</strong>.</p>
     <p><a href="${link}">${link}</a></p>
     <p>If you did not request this, ignore this email.</p>`,
  );
}

export async function sendOperatorNewSubmission(
  submission: Submission,
): Promise<void> {
  const operator = process.env.OPERATOR_EMAIL;
  if (!operator) return;
  await send(
    operator,
    `New Breakpoint submission — ${submission.company_name}`,
    `<p>${submission.company_name} (${submission.business_email}) submitted ${submission.target_url}.</p>
     <p>Access: ${submission.access_type}</p>
     <p>${submission.agent_description}</p>
     <p><a href="${baseUrl()}/admin">Open admin</a></p>`,
  );
}

export async function sendPaymentConfirmation(
  submission: Submission,
): Promise<void> {
  await send(
    submission.business_email,
    "You're booked — Breakpoint audit of " + submission.target_url,
    `<p>Payment received for the audit of <strong>${submission.target_url}</strong>.</p>
     <p><strong>Scope recap</strong></p>
     <ul>
       <li>Target: ${submission.target_url}</li>
       <li>Access provided: ${submission.access_type}</li>
       <li>Authorized by: ${submission.roe_signed_name} (${submission.roe_signed_title ?? "n/a"})</li>
     </ul>
     <p><strong>What we need from you now</strong>: send working access (staging credentials, test account, or API docs) to this email. The 72-hour clock starts when we receive it, not at payment.</p>
     <p>You'll get a findings report mapped to the OWASP LLM Top 10 and a 30-minute walkthrough call.</p>`,
  );
}

export async function sendRefundConfirmation(
  submission: Submission,
): Promise<void> {
  await send(
    submission.business_email,
    "Refund issued — Breakpoint audit",
    `<p>We did not find a reproducible vulnerability mapped to the OWASP LLM Top 10 for <strong>${submission.target_url}</strong>, so your payment has been refunded in full per the guarantee.</p>`,
  );
}
