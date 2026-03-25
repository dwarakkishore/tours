# Architecture — Bayardvacations

This document describes the high-level architecture, component responsibilities, data and control flow, third-party integrations, deployment model, and operational considerations for the Bayardvacations Next.js application. Use this as a reference when onboarding engineers or planning changes to integrations and infrastructure.

## 1. High-level overview

- Frontend: Next.js (App Router) application hosted in this repository. UI code lives under `src/app` and shared UI under `src/components`.
- Client state & data: React Contexts and custom hooks (`src/contexts`, `src/hooks`) with remote data fetched using @tanstack/react-query.
- Backend services: Firebase (Auth / Firestore or RTDB / Functions), Typesense (search), Razorpay (payments), and other third-party APIs.
- Observability: Sentry for error tracking and custom instrumentation via `src/instrumentation.js`.
- Deployment: Typically hosted on Vercel (recommended), running Next.js server and edge functions where configured.

## 2. Component responsibilities

- src/app: Page routes, layout, server-components and client components. Entry point for rendering and routing.
- src/components: Reusable UI primitives and composite components.
- src/lib: Utility libraries, API wrappers and low-level helpers.
- src/firebase: Firebase initialization, auth helpers, cloud-function clients, and admin utilities (server-side).
- src/instrumentation*.js: Setup for analytics and error reporting (Sentry + custom events).
- src/hooks & src/contexts: State management (auth, cart, booking flow) and data layer glue to react-query.

## 3. Data flow patterns

1. Page/component requests data -> uses react-query hooks -> API wrapper in `src/lib` or direct Firebase client -> remote service (Firebase / REST API / Typesense).
2. Mutations (bookings, payments) -> call backend API / Firebase Function -> server validates, creates records, and returns status.
\3. Payment flow (Razorpay):
   - Client requests order creation (server or cloud function) -> server calls Razorpay API with amount & metadata -> Razorpay returns order id.
   - Client invokes Razorpay checkout using order id -> user completes payment -> Razorpay sends a webhook to server or client gets callback -> server verifies signature and updates booking/payment record.

## 4. Authentication & authorization

- Client-side auth uses Firebase Client SDK for sign-in (email/password, providers).
- Server-side admin tasks use `firebase-admin` with service credentials (kept in CI/secret manager).
- Protect server/API routes by validating Firebase ID tokens (verifyIdToken) on server or Cloud Functions.

## 5. Search (Typesense)

- Typesense powers search features. The app queries Typesense from server-side endpoints (recommended) to avoid exposing admin keys.
- Indexing: server processes or functions should update Typesense indexes when relevant data changes (e.g., new listings, updates).

## 6. Instrumentation & error reporting

- Sentry configured via `sentry.server.config.js` and `sentry.edge.config.js`. Ensure SENTRY_DSN and environment tags are set in deploy environment.
- Local instrumentation utilities in `src/instrumentation-client.js` are used for event capture and performance metrics.

## 7. Deployment model

- Vercel (recommended): automatic builds on push, preview deployments for PRs, environment variables set per environment (preview/prod).
- If using Docker or another host: build Next.js for production (`next build`) and run `next start` or use a custom server. Add a Dockerfile if you need containerized deployments.

## 8. Environment variables (examples)

- NEXT_PUBLIC_FIREBASE_API_KEY, NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN, NEXT_PUBLIC_FIREBASE_PROJECT_ID, NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
- FIREBASE_ADMIN_CREDENTIALS (or GOOGLE_APPLICATION_CREDENTIALS for server)
- RAZORPAY_KEY_ID, RAZORPAY_SECRET
- SENTRY_DSN, SENTRY_ENVIRONMENT
- TYPESENSE_API_KEY, TYPESENSE_HOST, TYPESENSE_PORT

Note: Search the codebase for exact `process.env.` usage and ensure secret keys are stored in a secret manager or platform env var store.

## 9. Security & best practices

- Never embed admin/service keys in client code — use server-side endpoints to proxy requests that require secrets.
- Enforce least privilege for service accounts and rotate secrets periodically.
- Validate and verify payment signatures on the server.
- Use HTTPS and secure cookies for auth tokens.

## 10. Operational concerns & runbooks

- Monitoring: Ensure Sentry errors are triaged and integrated with an alerting channel (Slack).
- Backups: Confirm Firebase (Firestore) export policies and Typesense snapshot/backup schedule.
- Incident: For payment incidents, check webhook delivery logs and Razorpay dashboard, verify successful signatures, and reconcile payment vs booking states.

## 11. Suggested improvements (short list)

- Move Typesense queries behind server-side endpoints to hide keys and add caching.
- Add automated tests (unit + integration) around booking and payment flows.
- Add CI workflow (lint, type-check, build, tests) if missing.
- Create a `docs/ENV_VARS.md` with exact env var names and contexts.

---

If you'd like, I can:
- Add an ASCII or SVG sequence diagram showing the booking -> payment -> webhook verification flow and commit it to `docs/ARCHITECTURE.md`.
- Generate `docs/ENV_VARS.md` by scanning the repo for `process.env` usages and listing exact variable names.
