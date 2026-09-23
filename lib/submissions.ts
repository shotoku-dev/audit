import { randomBytes } from "node:crypto";
import { sql } from "./db";
import type { Submission } from "./types";

export function generateToken(): string {
  return randomBytes(16).toString("hex");
}

export interface CreateSubmissionInput {
  readonly businessEmail: string;
  readonly companyName: string;
  readonly targetUrl: string;
  readonly accessType: string;
  readonly agentDescription: string;
}

export async function createSubmission(
  input: CreateSubmissionInput,
): Promise<Submission> {
  const token = generateToken();
  const [row] = await sql<Submission[]>`
    insert into submissions (
      business_email, company_name, target_url, access_type,
      agent_description, verification_token, status
    ) values (
      ${input.businessEmail}, ${input.companyName}, ${input.targetUrl},
      ${input.accessType}, ${input.agentDescription}, ${token}, 'qualified'
    )
    returning *
  `;
  return row;
}

export async function getSubmission(id: string): Promise<Submission | null> {
  const rows = await sql<Submission[]>`
    select * from submissions where id = ${id} limit 1
  `;
  return rows[0] ?? null;
}

export async function listSubmissions(
  status?: string,
): Promise<Submission[]> {
  if (status) {
    return sql<Submission[]>`
      select * from submissions where status = ${status} order by created_at desc
    `;
  }
  return sql<Submission[]>`
    select * from submissions order by created_at desc
  `;
}

export async function markOwnershipVerified(
  id: string,
  method: "dns_file" | "email",
): Promise<Submission | null> {
  const rows = await sql<Submission[]>`
    update submissions
    set status = 'ownership_verified', verification_method = ${method}, verified_at = now()
    where id = ${id} and status = 'qualified'
    returning *
  `;
  return rows[0] ?? null;
}

export interface SignAuthorizationInput {
  readonly id: string;
  readonly fullName: string;
  readonly title: string;
  readonly ip: string;
  readonly roeVersion: string;
}

export async function signAuthorization(
  input: SignAuthorizationInput,
): Promise<Submission | null> {
  const rows = await sql<Submission[]>`
    update submissions
    set status = 'authorization_signed',
        roe_signed_name = ${input.fullName},
        roe_signed_title = ${input.title},
        roe_signed_ip = ${input.ip},
        roe_signed_at = now(),
        roe_version = ${input.roeVersion}
    where id = ${input.id} and status = 'ownership_verified'
    returning *
  `;
  return rows[0] ?? null;
}

export async function attachStripeSession(
  id: string,
  sessionId: string,
): Promise<void> {
  await sql`
    update submissions set stripe_session_id = ${sessionId}
    where id = ${id} and status = 'authorization_signed'
  `;
}

export async function markPaid(
  sessionId: string,
  paymentIntentId: string | null,
): Promise<Submission | null> {
  const rows = await sql<Submission[]>`
    update submissions
    set status = 'paid', paid_at = now(), stripe_payment_intent = ${paymentIntentId}
    where stripe_session_id = ${sessionId} and status <> 'paid'
    returning *
  `;
  return rows[0] ?? null;
}

export async function markDelivered(id: string): Promise<Submission | null> {
  const rows = await sql<Submission[]>`
    update submissions
    set status = 'delivered', delivered_at = now()
    where id = ${id} and status = 'paid'
    returning *
  `;
  return rows[0] ?? null;
}

export async function markRefunded(id: string): Promise<Submission | null> {
  const rows = await sql<Submission[]>`
    update submissions
    set status = 'refunded', refunded_at = now()
    where id = ${id} and status in ('paid', 'delivered')
    returning *
  `;
  return rows[0] ?? null;
}
