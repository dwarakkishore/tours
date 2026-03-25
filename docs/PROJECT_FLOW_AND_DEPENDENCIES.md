# Bayardvacations — Project Flow & Dependencies

Purpose
- Provide a concise overview of how the Bayardvacations project is structured, how data flows through it, the main dependencies, setup steps for new developers, and recommended onboarding checks.

Repository snapshot (observed)
- Framework: Next.js (package.json -> next 16.0.8)
- App entry: app/ (Next.js app directory)
- Major folders in `src/`: animations, app, assets, components, config, contexts, data, firebase, hooks, lib, utils
- Key files: next.config.mjs, tailwind.config.js, package.json, README.md, Sentry config files, instrumentation scripts
- No Dockerfile found. No Bayard-Admin repo access (request access or correct repo name).

High-level architecture & flow
1. Client (Next.js) — front-end application implemented with Next.js app router.
   - Renders pages from `src/app`.
   - Uses components from `src/components` and UI utilities from `src/lib` and `src/utils`.
   - Animations and interactive UI use GSAP, Framer Motion, Swiper, Tiptap, and other UI libs.
2. State & data handling
   - React contexts in `src/contexts` and hooks in `src/hooks`.
   - Data fetching & caching uses @tanstack/react-query and persistence libraries.
3. Backend / third-party services
   - Firebase (firebase / firebase-admin packages) — authentication, database, server functions or admin tasks.
   - Razorpay — payments integration (razorpay package).
   - Typesense — search backend (typesense package).
   - Sentry — error tracking (sentry configs present).
   - Possibly server-side Node/Edge functions via Next.js server runtime.
4. Instrumentation
   - `src/instrumentation.js` and `src/instrumentation-client.js` present for analytics/error instrumentation.
5. Build & Deploy
   - Build scripts: `npm run build` (next build). Dev server: `npm run dev` (uses turbopack).
   - Deployment likely targeted to Vercel (README mentions deploy on Vercel). Check next.config.mjs for platform-specific settings.

Key dependencies (selected from package.json)
- Next.js 16.0.8 (framework)
- React 19.2.1, react-dom 19.2.1
- Tailwind CSS + tailwind plugins
- @tanstack/react-query and persistence packages (data fetching & cache)
- firebase, firebase-admin (client & server/admin SDKs)
- typesense (search)
- axios (HTTP)
- sentry (@sentry/nextjs)
- gsap, framer-motion, swiper (animations/carousel)
- tiptap for rich text editing
- razorpay (payments)
- lottie-react, lucide-react, sonner (UI libs)
- dev: typescript, eslint, prettier, postcss

Notable dev tooling & configs
- ESLint config (.eslintrc.json, eslint.config.mjs)
- Tailwind config (tailwind.config.js)
- Scripts:
  - dev: `next dev --turbopack`
  - build, start, lint, analyze, type-check (tsc)
- Bun lockfile present (bun.lock) — repo may support bun installs as an alternative to npm/yarn/pnpm.

Environment variables (likely required)
- Firebase client config (NEXT_PUBLIC_FIREBASE_API_KEY, NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN, etc.)
- Firebase admin/server service account or a path to credentials for server code
- RAZORPAY_KEY_ID, RAZORPAY_SECRET (or NEXT_PUBLIC_ for client key)
- SENTRY_DSN (and SENTRY_* environment variables used in config)
- TYPESENSE_SERVER_KEY and server host details
- NEXT_PUBLIC_... prefixed vars for anything required by client-side code
Note: Search the codebase for `process.env.` or `NEXT_PUBLIC_` to identify exact names.

Local setup & onboarding (quick start)
1. Prereqs
   - Node (recommended version aligned with Next 16, check engines if present)
   - Optionally Bun or pnpm if maintainers prefer (bun.lock present).
2. Clone the repo:
   - git clone git@github.com:SwantechDev5/bayardvacations.git
3. Install dependencies:
   - npm ci
   - or yarn install
   - or bun install
4. Create env file
   - Copy `.env.example` if present, or ask a teammate for the env variables/secrets.
5. Run development server:
   - npm run dev
   - Visit http://localhost:3000
6. Lint & type-check:
   - npm run lint
   - npm run type-check
7. Build locally:
   - npm run build
   - npm start (for production preview)

Codebase orientation for new engineers
- Start at `src/app/page.js` (home page) and `src/components` for shared UI.
- Look in `src/config` for environment-specific config and `src/firebase` for auth/database access.
- Instrumentation: check `src/instrumentation*` and Sentry config files to see how errors are reported.
- For animations, review `src/animations` and how they are composed in components.
- For forms and editor features, inspect Tiptap-related components.

Testing, CI & Quality
- No explicit test framework files detected (e.g., jest, vitest) — consider adding tests and CI if not present.
- Linting & Prettier are present. Add pre-commit hooks (husky) if desired.
- Recommend setting up a CI workflow for PRs (lint, type-check, build, run tests).

Deployment notes
- Next.js + Vercel is recommended and hinted by README. Confirm:
  - Vercel project connected to the repo.
  - Environment variables set in the Vercel dashboard (production & preview).
- If deploying elsewhere (Docker), add a Dockerfile and documentation for container build & runtime.

Security & secrets
- Ensure Firebase admin keys and other service keys are stored in vault/CI secrets and not checked into repo.
- Rotate keys regularly and grant least privilege.

Documentation gaps / recommended follow-ups
- Add a `docs/ENV_VARS.md` listing all environment variables with exact names and scopes (client/server).
- Add a `docs/ARCHITECTURE.md` visualizing data flow (client → Typesense/Firebase → serverless functions).
- Add `CONTRIBUTING.md` with branch/PR rules and code style expectations.
- Add simple onboarding checklist (below) as `docs/ONBOARDING.md`.

Onboarding checklist (short)
- [ ] Get GitHub access & fork/clone repo
- [ ] Get environment variables or access to secrets manager
- [ ] Install Node (version), run `npm ci` and `npm run dev`
- [ ] Run lint & type-check locally
- [ ] Understand where Firebase and search keys live and how to use them
- [ ] Review Sentry & instrumentation setup
- [ ] Create a small onboarding PR: fix a lint error, add a README note, or update a component.

Action items / next steps
- I can add this file directly to the repository (create `docs/PROJECT_FLOW_AND_DEPENDENCIES.md`).
- I could also generate `ENV_VARS.md`, `ARCHITECTURE.md`, and `ONBOARDING.md` if you’d like a full docs folder.
- I could not access the Bayard-Admin repository. Please provide:
  - the correct repository name or a direct link (URL), or
  - grant read access to SwantechDev5 (or tell me the organization/owner) so I can produce a similar doc for it.

If you want, I can next:
- create separate docs files in a docs/ folder and open a PR (I’ll need repository write access or permission to create branches).
- or produce `ENV_VARS.md` here listing discovered environment variable candidates (searching the codebase for exact names).
