# CodeColiseum Frontend (React + Vite)

The standalone SPA for CodeColiseum. It replaces the former Next.js frontend and
communicates exclusively with the Express backend in
`../CodeColiseum-Express`.

## Quick start

```bash
npm install
cp .env.example .env     # adjust VITE_API_URL if needed
npm run dev              # http://localhost:5173
```

The Express backend must allow the SPA origin:

```dotenv
# CodeColiseum-Express/.env
FRONTEND_URL=http://localhost:5173
```

Default `VITE_API_URL` is `http://localhost:5000/api`. BetterAuth is hosted at
`${VITE_API_URL}/auth`.

> In the repository local stack (`node scripts/dev.mjs` / `run-local.cmd`), this
> app runs on **http://localhost:3000** so the backend's existing
> `FRONTEND_URL`, cookies and password-reset links keep working. `npm run dev`
> on its own uses Vite's default port 5173.

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Type-check + production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm test` | Vitest (jsdom + React Testing Library) |

## CI/CD

`.github/workflows/frontend.yaml` runs lint, type check, tests and the
production build on pushes and pull requests to `main`, then (on `main`)
builds the Docker image with the `VITE_*` build args, pushes it to ECR and
forces a new ECS deployment.

Repository secrets:

| Secret | Purpose |
| --- | --- |
| `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION` | AWS credentials |
| `ECR_REPOSITORY_FRONTEND` | ECR repository name |
| `ECS_CLUSTER_APP` | ECS cluster |
| `ECS_SERVICE_FRONTEND` | ECS service |

Optional repository variables (production defaults are built in):
`VITE_API_URL`, `VITE_AUTH_URL`, `VITE_APP_URL`. The workflow references a
`Codecoliseum` environment, matching the previous frontend pipeline.

Deployment note: the Nginx image listens on **80 and 3000** because the existing
ECS `frontend-target-group` targets port 3000 (from the previous Next.js image).
A Docker `HEALTHCHECK` probes port 3000, and the deploy job waits for
`aws ecs wait services-stable`.

## Documentation

Workspace docs (in the parent repo, not committed here):

- `../docs/MIGRATION_MAPPING.md` — route and feature mapping from Next.js
- `../docs/VALIDATION_REPORT.md` — checks and E2E results
- `../docs/DEPLOYMENT.md` — production build, SPA fallback, CORS/cookies,
  CI/CD secrets and variables

## Architecture

```text
src/
├── app/          router, providers, route guards, layouts, pages
├── features/     authentication, analytics, dashboard, exams, labs, marketplace, notifications, problems
├── components/   ui primitives (unchanged shadcn/Radix) + shared (AppImage)
├── hooks/        shared hooks
├── lib/          api client, navigation adapter, lazy component, utilities
├── stores/       Zustand client state
├── styles/       Tailwind v4 entry (globals.css)
├── themes/       custom theme tokens
└── types/        API view models + enum constants
```

Rules of thumb:

- All HTTP calls go through `getBackendURL()` / `src/lib/api/client.ts`.
- Never import server-only code (Prisma, nodemailer, node crypto).
- Never store auth tokens in `localStorage`; use BetterAuth cookies.
- Keep business rules in the Express backend.
