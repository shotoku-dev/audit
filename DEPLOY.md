# Deploying Breakpoint

Target: `breakpoint.shotoku.dev`.

The app is built so you can do this in stages. Step 1 works with **zero**
environment variables — the landing page will be live in about five
minutes. The funnel (intake onwards) needs the services in steps 3–6.

---

## 1. Deploy the shell

1. Go to <https://vercel.com/new> and import `shotoku-dev/audit`.
2. Framework preset: **Next.js**. Root directory: `./`. Leave everything
   else alone.
3. Deploy. No environment variables needed yet.

You get a `*.vercel.app` URL. Open it — the landing page, `/terms`,
`/privacy` and `/legal` all render. The intake form will fail on submit
until step 3, which is expected.

## 2. Point the domain

`shotoku.dev` is on **Namecheap** DNS (`dns1/dns2.registrar-servers.com`)
and the apex already points at Vercel.

1. In the Vercel project → **Settings → Domains** → add
   `breakpoint.shotoku.dev`. Vercel will show you the exact record it
   wants (normally a CNAME to `cname.vercel-dns.com`).
2. In Namecheap → **Domain List → shotoku.dev → Advanced DNS** → add:

   | Type  | Host         | Value                    | TTL       |
   | ----- | ------------ | ------------------------ | --------- |
   | CNAME | `breakpoint` | *(value Vercel showed)*  | Automatic |

3. Wait for propagation (usually minutes). Vercel issues the TLS
   certificate automatically once the record resolves.

Do not touch the existing apex `A` record — that's the main
`shotoku.dev` site.

## 3. Database

Any standard Postgres works. Supabase (free tier) or Vercel Postgres are
both fine.

1. Create the database, copy its connection string.
2. Run the schema once:

   ```bash
   psql "<your connection string>" -f lib/schema.sql
   ```

   (Supabase: you can paste the contents of `lib/schema.sql` into the SQL
   editor instead.)
3. Set `DATABASE_URL` in Vercel → Settings → Environment Variables.

## 4. Stripe

1. Create a **Product** ("Breakpoint audit") with a one-time **Price** of
   **99 EUR**. Copy the price ID (`price_...`) → `STRIPE_PRICE_ID`.
2. Copy your secret key → `STRIPE_SECRET_KEY`.
3. **Webhooks** → add endpoint
   `https://breakpoint.shotoku.dev/api/webhook/stripe`, subscribe to
   **`checkout.session.completed`** only. Copy the signing secret
   (`whsec_...`) → `STRIPE_WEBHOOK_SECRET`.

> The webhook is what marks a submission paid and sends the confirmation
> email. Without it, a buyer pays and nothing happens on your side. Don't
> skip it.

## 5. Email (Resend)

1. Verify a sending domain in Resend (`shotoku.dev` or
   `breakpoint.shotoku.dev`) — this means adding the DKIM/SPF records
   Resend gives you to Namecheap, same place as step 2.
2. Set `RESEND_API_KEY`, `EMAIL_FROM` (must be on the verified domain),
   and `OPERATOR_EMAIL` (where *you* get notified of new submissions).

Until this is set, email sends are skipped with a console warning rather
than crashing — ownership-by-email verification just won't work.

## 6. Admin and base URL

```
NEXT_PUBLIC_BASE_URL=https://breakpoint.shotoku.dev
ADMIN_PASSWORD=<something long you actually remember>
ADMIN_SESSION_SECRET=<32+ random bytes>
```

Generate the session secret locally — don't reuse anything:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

`NEXT_PUBLIC_BASE_URL` matters: it builds the Stripe redirect URLs and the
email verification links. If it's wrong, those links point at the wrong
host.

**Environment variables only take effect on the next deploy.** After
setting them, redeploy from the Vercel dashboard.

---

## 7. Smoke test before going live

Do the whole funnel yourself in Stripe **test mode** first:

1. Submit the form with a real company email on a domain you control.
2. Verify ownership — host the token file, or use the email link.
3. Sign the authorization.
4. Pay with test card `4242 4242 4242 4242`, any future expiry, any CVC.
5. Confirm: you land on `/thank-you`, the confirmation email arrives, and
   the submission shows as **paid** in `/admin`.
6. In `/admin`, test **Refund** on that submission and confirm it reaches
   Stripe.

If step 5 shows the submission still unpaid, the webhook is misconfigured
— check the Stripe webhook log for delivery failures.

Then switch Stripe to live keys and redeploy.

---

## 8. Do not make it public until

See the checklist in [README.md](README.md). In short: a real published
finding, your photo and bio, a contact email, the SIRET, and reviewed
terms/privacy. The proof section renders a visible
"slot unfilled — do not launch" block until the first real finding is in
`lib/findings.ts`.
