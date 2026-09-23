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

- [x] Proof — `PUBLIC_FINDINGS` in [`lib/findings.ts`](lib/findings.ts)
      carries findings 007 and 006 from
      [local-ai-security-lab](https://github.com/stizix/local-ai-security-lab),
      each linking its public PoC. These are **research**, not client work,
      and the page says so. Never relabel one as a client audit. If the list
      is ever emptied, the proof section renders a loud "do not launch"
      block by design.
- [x] Operator bio and links.
- [x] Contact email (`issa@shotoku.dev`).
- [x] Terms and privacy drafted — **you still need to read them end to end
      before launch.** They were written against what the code actually
      collects and the guarantee it actually makes, but they are not legal
      advice and have not been reviewed by a lawyer.
- [ ] **Photo** — drop a square image at `public/operator.jpg` and wire it
      into [`components/Operator.tsx`](components/Operator.tsx), replacing
      the `[PHOTO]` slot. A real face is the strongest trust signal in that
      section; an empty grey box is the weakest.
- [ ] **SIRET** — registration is in progress. The legal notice and footer
      currently say so honestly. Publish the number and registered address
      in [`app/legal/page.tsx`](app/legal/page.tsx) and
      [`components/Footer.tsx`](components/Footer.tsx) as soon as it is
      issued; you should not be invoicing before then.
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
