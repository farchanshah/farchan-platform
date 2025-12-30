# Farchan Platform

Local run:

1. copy .env.example -> .env.local and fill values
2. npm install
3. npx prisma generate
4. npx prisma migrate dev --name init
5. npm run seed
6. npm run dev

Deploy: push to GitHub, then deploy to Vercel and set Env Vars accordingly.
