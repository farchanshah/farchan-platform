# Farchan Platform — Ready-to-deploy

## Quick start (local)
1. Copy `.env.example` → `.env.local` and fill values.
2. npm install
3. npx prisma generate
4. npx prisma migrate dev --name init
5. npm run seed
6. npm run dev

## Build (production)
- `npm run build` (this runs `prisma generate` automatically)
- `npm run start`

## Deploy to Vercel
1. Push to GitHub.
2. Import repo in Vercel.
3. Set Environment Variables in Vercel (Production & Preview):
   - DATABASE_URL
   - NEXT_PUBLIC_SITE_URL
   - STRIPE_SECRET_KEY
   - STRIPE_WEBHOOK_SECRET
   - SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, NOTIFY_EMAIL
   - JWT_SECRET
   - ADMIN_EMAIL, ADMIN_PASSWORD
4. Deploy. Vercel build uses `prisma generate` before `next build`.

## Notes
- All DB/email calls are best-effort (try/catch).
- Prisma client is lazy-initialized to avoid build-time initialization errors.
