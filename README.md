# FixMate — Device & Home Appliance Repair Platform

**Live site:** [https://fixmate-project.vercel.app](https://fixmate-project.vercel.app)

FixMate is a full-stack repair-service marketplace where customers book trusted technicians for device and home appliance repairs (home visit or workshop service), technicians manage their services and repair requests, and admins moderate users, services, bookings and payments.

This repository contains the **Next.js client**. All data, authentication, payments and business logic live in a separate Express + MongoDB API (`fixmate-server`), which the client talks to through same-origin proxy rewrites.

## Table of contents

- [Demo accounts](#demo-accounts)
- [Key features](#key-features)
- [Tech stack](#tech-stack)
- [npm packages used](#npm-packages-used)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Scripts](#scripts)
- [Architecture notes](#architecture-notes)

## Demo accounts

| Role | Email | Password |
| --- | --- | --- |
| Customer | `new@customer.com` | `New.Cust0mer` |
| Technician | `smart@technician.com` | `Smart.Technic1` |
| Admin | `fixmate@admin.com` | `FixM@te.Adm1n` |


## Key features

### Public site
- Marketing landing page with hero, featured/latest services, benefits, "How FixMate works", customer testimonials and popular categories.
- Searchable and filterable service explorer with paginated service cards.
- Service detail page with technician info, pricing, category/mode, booking card and related services.
- About page and "Become a Technician" application form.
- Responsive sticky navbar, footer and dark/light theme setup.

### Authentication
- Email/password sign-up and sign-in with live password-strength feedback.
- Google OAuth sign-in (when configured in the backend).
- HttpOnly session cookie + short-lived JWT refreshed by the Next.js proxy; role-based route guards for customer, technician and admin dashboards.
- Profile page for updating account details.

### Customer
- Customer dashboard overview with booking and payment statistics.
- Create a repair booking for a service (preferred date, phone, address, problem description).
- Booking list with status/payment badges, cancel pending requests, and "Pay Now" for completed bookings.
- Stripe Checkout payment flow (success / cancel pages, payment retry) and payment history with transaction IDs.
- Auto-refresh of dashboard data after booking/payment changes.

### Technician
- Technician dashboard with request and earnings summaries.
- Add, edit and delete services with image upload, category, price, duration, service mode and service area.
- Manage service availability and view all owned services.
- Repair request inbox with accept/reject and status updates (`requested → accepted → in-progress → completed`), plus payment requests for completed jobs.

### Admin
- Admin dashboard with platform-wide statistics.
- User management (roles, technician approvals).
- Service moderation and booking management.
- Payment/transaction history across all customers.

### UX
- Fully responsive layouts (tables on desktop, cards on mobile).
- Skeleton loaders, error boundaries, custom 404 and empty states.
- Toast notifications, accessible dialogs (Base UI), form validation and role-aware navigation.

## Tech stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16.4.6 (App Router, React Server Components, Turbopack) |
| UI library | React 19.3, shadcn/ui (`base-nova` style) on Base UI |
| Styling | Tailwind CSS v4 (CSS-first config, oklch theme tokens), `tw-animate-css` |
| Language | TypeScript 5 |
| Auth (client) | `better-auth` client + server-side session helper |
| Icons | `lucide-react` |
| Payments | Stripe Checkout (session created by the backend) |
| Linting | ESLint 9 flat config + `eslint-config-next` |
| Hosting | Vercel (client + Express API) |

## npm packages used

### Runtime dependencies

| Package | Used for |
| --- | --- |
| `next` | App Router, routing, proxy (middleware), image optimization |
| `react`, `react-dom` | UI rendering |
| `better-auth` | Sign-in/sign-up/sign-out client and session hooks |
| `@base-ui/react` | Accessible UI primitives underlying the shadcn components |
| `shadcn`, `@shadcn/react` | shadcn CLI/runtime pieces for the `base-nova` component style |
| `lucide-react` | Icon set used across the app |
| `class-variance-authority` | Variant-based component styling (buttons, badges, etc.) |
| `cn` | `clsx` + `tailwind-merge` replacement used by every component |
| `tw-animate-css` | Tailwind animation utilities |
| `date-fns` | Date formatting helpers |
| `react-day-picker` | Calendar/date-picker primitives (booking date) |
| `embla-carousel-react` | Image and content carousels |
| `recharts` | Chart primitives for dashboard statistics |
| `input-otp` | OTP input primitive |
| `cmdk` | Command menu primitive |
| `react-resizable-panels` | Resizable panel layouts |
| `shiki` | Syntax highlighting primitive |


### Dev dependencies

| Package | Used for |
| --- | --- |
| `typescript`, `@types/*` | Type checking |
| `tailwindcss`, `@tailwindcss/turbopack` | CSS compilation in dev/build |
| `eslint`, `eslint-config-next` | Linting (`npm run lint`) |

## Project structure

```
src/
├─ app/
│  ├─ (root)/                 # Public pages: home, services, service detail, about, become-technician
│  ├─ (auth)/                 # sign-in, sign-up (full-screen auth shell)
│  ├─ (dashboard)/dashboard/  # customer, technician, admin dashboards + profile
│  ├─ components/             # Page-level components (shared, homepage, auth, bookings, ...)
│  └─ layout.tsx              # Root layout + <Toaster />
├─ components/ui/             # Vendored shadcn/Base UI primitives only
├─ helper/                    # Plain event handlers (auth, services, bookings)
├─ lib/
│  ├─ actions/                # Client-side API calls (bookings, services, upload)
│  ├─ api/                    # Server-side fetchers (categories, payments, services)
│  ├─ auth/                   # Auth client + server session helpers
│  ├─ navigation/             # Nav links and active-path logic
│  └─ <feature>/              # Static copy/config per feature
├─ types/                     # Shared TypeScript types
└─ proxy.ts                   # JWT refresh/forwarding proxy for /api/*
```

## Getting started

### Prerequisites

- Node.js 20+ and npm
- The FixMate API (`fixmate-server`) running locally on port `8000`
- MongoDB reachable by that API

### Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Create `.env` (or `.env.local`) in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

For production (Vercel) use the deployed API origin, without a trailing slash:

```env
NEXT_PUBLIC_API_URL=https://your-fixmate-server.vercel.app
```

> `NEXT_PUBLIC_API_URL` is required for production builds — the build fails if it is missing. Secrets (MongoDB URI, Better Auth secret, Google OAuth keys, Stripe secret, ImgBB key) belong only in the backend environment, never in this client.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server (Turbopack, port 3000) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint over the repository |
| `npx tsc --noEmit` | Type-check the project |

Stop `npm run dev` before running `npm run build` — both use `.next/`.

## Architecture notes

- **Same-origin API proxy:** the browser always calls `/api/proxy/*` (application API) and `/api/auth/*` (Better Auth), which `next.config.ts` rewrites to the Express API. `src/proxy.ts` refreshes the short-lived JWT from the session cookie and forwards it as `Authorization: Bearer <token>`.
- **Server components** call the API origin directly with a verified token (`serverApiFetch`) for role-guarded pages such as dashboards and payment confirmation.
- **Payments:** booking payment is initiated from the customer dashboard, redirected to Stripe Checkout, and confirmed on the success page, where the backend verifies the Stripe session before marking the booking paid.
- **Mock-free UI:** all data comes from the Express API; no MongoDB or Stripe secret is used in the client.
- **Images:** remote images are served from `i.ibb.co` (configured in `next.config.ts`).
