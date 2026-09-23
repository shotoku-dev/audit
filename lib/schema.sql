-- Breakpoint submissions ledger. One row per prospect / target.
-- Run once against DATABASE_URL: psql "$DATABASE_URL" -f lib/schema.sql

create extension if not exists pgcrypto;

create table if not exists submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  business_email text not null,
  company_name text not null,
  target_url text not null,
  access_type text not null,
  agent_description text not null,

  status text not null default 'qualified',

  verification_token text not null,
  verification_method text,
  verified_at timestamptz,

  roe_signed_name text,
  roe_signed_title text,
  roe_signed_at timestamptz,
  roe_signed_ip text,
  roe_version text,

  stripe_session_id text,
  stripe_payment_intent text,
  paid_at timestamptz,

  delivered_at timestamptz,
  refunded_at timestamptz
);

create index if not exists submissions_status_idx on submissions (status);
create index if not exists submissions_created_at_idx on submissions (created_at desc);
