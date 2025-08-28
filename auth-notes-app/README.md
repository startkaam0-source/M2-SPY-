Starter scaffold for an Auth + Notes platform using Next.js (App Router) and Firebase. Includes email/password + Google login, password reset, maintenance mode, and a protected dashboard. Extend gradually towards the 200+ features list.

## Getting Started

1) Copy env example and fill values

```bash
cp .env.local.example .env.local
```

Required:
- NEXT_PUBLIC_FIREBASE_* (Client SDK)
- FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY (Admin SDK)
- Optional: MAINTENANCE_MODE, reCAPTCHA keys

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open http://localhost:3000

Key routes:
- `/login`, `/signup`, `/reset`
- `/dashboard` (protected client check)
- `/maintenance` (shown when `MAINTENANCE_MODE=true`)

Client/Auth init lives in `src/lib/firebase/client.ts`, Admin in `src/lib/firebase/admin.ts`.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
