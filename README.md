# True Plumb Execution Sprint app

The course app for True Plumb Academy, built with Next.js, Supabase and Stripe.

- **Learners** log in by email link, choose a course and work setting, and play 3 days of scenarios.
- **Team managers** (team licence buyers) add their people and see scores and patterns. They never see private notes.
- **Admin** (`ADMIN_EMAILS`) sees all payments, teams and progress, and can add bank-transfer customers by hand.
- **Stripe** payments create accounts automatically through `/api/stripe/webhook`.

## One-off setup

### 1. Supabase
1. SQL Editor -> New query -> paste `supabase/schema.sql` -> Run.
2. Authentication -> Sign In / Providers -> Email: keep enabled. Turn **off** "Allow new users to sign up" (only paying customers get accounts).
3. Authentication -> URL Configuration:
   - Site URL: `https://app.trueplumb.co.uk`
   - Redirect URLs: `https://app.trueplumb.co.uk/**`
4. Authentication -> Emails -> SMTP Settings: enable custom SMTP with Resend
   (host `smtp.resend.com`, port `465`, user `resend`, password = Resend API key, sender `hello@trueplumb.co.uk`, name `True Plumb`).
5. Authentication -> Emails -> Templates. Replace the link in **Magic Link** and **Invite user** with:
   - Magic Link: `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=magiclink&next=/`
   - Invite user: `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=invite&next=/start`

### 2. Vercel
Import the GitHub repo, add the variables from `.env.example`, deploy. Add the domain `app.trueplumb.co.uk` and the DNS record Vercel shows in Porkbun.

### 3. Stripe
1. Developers -> Webhooks -> Add endpoint `https://app.trueplumb.co.uk/api/stripe/webhook`,
   events `checkout.session.completed` and `checkout.session.async_payment_succeeded`. Copy the signing secret into `STRIPE_WEBHOOK_SECRET`.
2. Each payment link -> After payment -> redirect to `https://app.trueplumb.co.uk/welcome`.
3. Team licence payment link: allow quantity adjustment, and add a custom text field with key `company`.
4. Products must keep metadata `type=individual` or `type=b2b` (already set).

## Local development
`npm install`, create `.env.local` from `.env.example`, `npm run dev`.

## Version 2 update (November 2026)

1. **Database:** in Supabase, open SQL Editor, then New query, paste `supabase/migration-002.sql` and press Run.
2. **Follow-up emails:** in Resend, create a second API key with sending access (name it `netlify-followups`). In Netlify environment variables, add `RESEND_API_KEY` with that value and tick "Contains secret values". The daily job (`netlify/functions/followups.mjs`) runs at 08:00 and does nothing until this key is set.
3. Course tuning (trap balance, defensible options, site-specific scoring, words to use, Day 3 callback, ratings, guides) lives in `lib/course/tuning.js`.

## v3 · Standards alignment (7 Nov 2026)
- `lib/course/law.js`: legal and guidance basis per scenario, shown as "The rules behind this". Update `LAW_REVIEWED` whenever it changes.
- `lib/course/checks.js`: 54 CITB-style knowledge-check questions (3 per day, single answer and "select TWO"). Knowledge % shows on admin and team pages.
