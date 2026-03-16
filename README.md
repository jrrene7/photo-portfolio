This is a photography portfolio built with [Next.js](https://nextjs.org/).

## Getting Started

First, install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

## Calendly Booking

This project uses Calendly for booking instead of a custom scheduler.

- Set `NEXT_PUBLIC_CALENDLY_URL` to your public Calendly booking link to enable the popup scheduler across the site.
- The main booking CTA now opens a responsive on-site popup instead of rendering a full embedded page.
- The webhook receiver lives at `/api/webhooks/calendly`.
- If you have a Calendly webhook signing key, set `CALENDLY_WEBHOOK_SIGNING_KEY` to validate webhook payloads before processing them.

Calendly’s public API does not handle the booking flow itself; the popup/modal integration keeps the booking step lighter while still using Calendly for scheduling.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

Set `Node.js Version` to `24.x` in Vercel project settings, add the variables from `.env.example`, and redeploy.
