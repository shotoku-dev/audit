# Breakpoint

Landing page + intake funnel for a fixed-scope AI-agent red-team audit.
"We break your AI agent before someone else does."

Separate product from Shotoku itself, meant to deploy on its own domain
(e.g. `breakpoint.shotoku.dev`). No dashboard, no API-key storage, no
automated testing — the audit is delivered manually, off-platform. This
app only persuades, qualifies, verifies ownership, gets authorization
signed, and collects payment.

## Flow

1. **Landing page** (`/`) — hero, proof (real redacted findings), the
   guarantee, price, deliverables, how-it-works, then the intake form.
2. **Intake** (`POST /api/intake`) — blocks free email providers, creates a
   `submissions` row, redirects to `/verify/[id]`.
3. **Ownership verification** (`/verify/[id]`) — either host a token `.txt`
   file on the target domain (`POST /api/verify/check` fetches it
   server-side), or confirm via a magic-link email sent to the business
   address (`/api/verify/email/send` + `/api/verify/email/confirm`).
4. **Authorization** — signs a rules-of-engagement agreement
   (`POST /api/authorization`), storing name, title, timestamp, and IP.
5. **Payment** — Stripe Checkout (`POST /api/checkout`), unlocked only
   after verification + signature. `POST /api/webhook/stripe` marks the
   submission paid and sends the confirmation email.
6. **Admin** (`/admin`, password-gated) — lists submissions by status,
   marks delivered, and triggers a Stripe refund when no vulnerability is
   found.

## Before this can launch

Credibility on this page rests on two things: a real finding, and a real
named person. Both have visible holes right now.

- [ ] Add at least one real, reproduced, client-approved finding to
      `PUBLIC_FINDINGS` in [`lib/findings.ts`](lib/findings.ts). While the
      list is empty the proof section renders a loud yellow
      "slot unfilled — do not launch" block on the live page. That's
      deliberate: the guarantee has nothing behind it until this is filled.
      (`SAMPLE_FINDING` is the illustrative hero excerpt and is labelled as
      such — it is not proof and must not be relabelled as a client.)
- [ ] Fill the operator block in
      [`components/Operator.tsx`](components/Operator.tsx): a real photo at
      `/public/operator.jpg`, the X/LinkedIn link, and the `[REPLACE]` bio
      line. Write only claims you can back up if a prospect asks.
- [ ] Add the contact email in [`components/Footer.tsx`](components/Footer.tsx).
- [ ] Fill in the SIRET and address placeholders in
      [`app/legal/page.tsx`](app/legal/page.tsx) and the footer once
      registered.
- [ ] Have terms/privacy reviewed — they're marked `[PLACEHOLDER]`.
- [ ] Work through [DEPLOY.md](DEPLOY.md) — database, Stripe (including
      the webhook), email, domain — and smoke-test the funnel in Stripe
      test mode.

## Deploying

See [DEPLOY.md](DEPLOY.md). The app builds with **zero** environment
variables, so the landing page can go live before the database, Stripe,
or email exist. Wire those up in stages.

## Local dev

```bash
pnpm install
pnpm dev
```

The landing page and legal pages run with no configuration. The funnel
needs `DATABASE_URL` (any Postgres — Vercel Postgres or Supabase both
work), `STRIPE_SECRET_KEY` + `STRIPE_PRICE_ID` + `STRIPE_WEBHOOK_SECRET`,
and `RESEND_API_KEY`. Copy `.env.example` to `.env.local`.
