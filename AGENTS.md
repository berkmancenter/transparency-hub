# AGENTS.md

This file provides guidance to AI coding agents working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server on http://localhost:3002 (uses Turbopack)
npm run build    # Production build; also catches TypeScript errors
npm run lint     # ESLint over app/ and components/
```

Lint a single file:
```bash
npx eslint app/api/company-changes/route.ts
```

Type-check without building:
```bash
npx tsc --noEmit
```

There is no test suite configured in this project.

## Architecture

**Next.js 16 App Router** with MongoDB as the database and Google Cloud Storage (GCS) for WARC policy archives.

### Data flow

- `app/lib/mongodb.js` — singleton MongoDB client, exported as `connectToDatabase()`. All API routes call this directly. Requires `NEXT_ATLAS_URI` and `NEXT_ATLAS_DATABASE` env vars.
- `app/api/` — Route handlers that query MongoDB collections (`companies`, etc.) or fetch pre-computed diff files from GCS. Responses include `Cache-Control` headers for edge caching.
- `app/api/proxy-warc/` — Proxies GCS URLs (`https://storage.googleapis.com/...`) to the client for the embedded WARC replay viewer. Validates URLs before proxying.
- `app/api/company-changes/` — Fetches JSON diff files from GCS and parses them into structured change data (word counts, topic changes, line-by-line diffs).

### Key pages

- `/policy_index` — Browse/search all tracked platforms. Uses URL `?query=` and `?filters=` search params (server component, params passed to client components).
- `/policy_index/[platformName]` — Per-platform policy list and document viewer with embedded WARC replay (`<replay-web-page>` custom element from `/replay/ui.js`).
- `/comparison_tool` — Side-by-side diff view between two policy revisions, driven by `ComparisonEngine` which calls `/api/company-changes`.
- `/projects` — Research projects showcase.

### Component conventions

- `components/ui/ClientLayout.tsx` — Root client layout managing Header, Footer, and Sidebar toggle state.
- Server components fetch data directly or pass server-fetched props to client components.
- Mark components `'use client'` only when needed (hooks, event handlers, browser APIs).
- Path alias `@/` resolves to the project root (configured in `tsconfig.json`).

### Styling

Tailwind CSS v4. Custom colors like `ASML-blue`, `ASML-purple`, `ASML-red` and utility classes like `ASML_Heading`, `ASML_Text` are used throughout for brand consistency.

### WARC replay

Archived policy documents are displayed using [ReplayWeb.page](https://replayweb.page/). The `<replay-web-page>` custom element is registered by `/replay/ui.js` (loaded `beforeInteractive` in the root layout). The `global.d.ts` declares JSX types for this element.

## Good patterns to follow

- `app/api/company-details/route.ts` — well-structured API route with typed MongoDB documents and clean date formatting
- `components/ui/comparison_tool/ComparisonEngine.tsx` — client component with proper error state and async data fetching
- `app/policy_index/[platformName]/page.tsx` — correct pattern for async params in Next.js 16 App Router

## Patterns to avoid

- Avoid `any` types — define proper interfaces (see `Document` and `Platform` types in `app/api/company-details/route.ts`)
- Don't add `'use client'` to components that don't need browser APIs or interactivity — keep server components server-side

## PR and commit guidelines

- Branch names: `feature/your-feature-name` or `fix/issue-description`
- Commit messages: imperative mood, first line under 72 characters, reference issues when applicable
  - ✅ `Add policy comparison filter functionality`
  - ✅ `Fix pagination bug in policy index (#123)`
  - ❌ `Added feature` / `fixed stuff`
- Before opening a PR: run `npm run lint` and `npm run build` to catch errors
- Keep PRs focused on a single feature or fix; include screenshots for UI changes

## Permission boundaries

**Do autonomously:**
- Read any file in the repo
- Run `npm run lint`, `npx eslint <file>`, `npx tsc --noEmit`
- Run `npm run dev` or `npm run build`
- Edit source files in `app/`, `components/`, `public/`, `types/`

**Ask before doing:**
- `npm install` / adding or removing packages
- Any `git` operations (commit, push, branch deletion)
- Changes to `next.config.*`, `tsconfig.json`, `eslint.config.mjs`, or `postcss.config.mjs`
- Any changes to `.env*` files

**Never do:**
- Push to `main` directly
- Modify or delete `.env.local` or any credentials file

## Off-limits files

Do not read, modify, or log the contents of:

- `.env.local` and any `.env.*.local` files — contain live credentials
- `*.pem` — private keys
- GCS credentials JSON files (referenced by `GOOGLE_APPLICATION_CREDENTIALS`)
- `ecosystem.config.js` — may contain deployment secrets

Refer to `.env.example` to understand what environment variables are required.

## Environment variables

| Variable | Purpose |
|---|---|
| `NEXT_ATLAS_URI` | MongoDB connection string |
| `NEXT_ATLAS_DATABASE` | MongoDB database name |
| `GOOGLE_APPLICATION_CREDENTIALS` | Path to GCS service account JSON (optional) |
| `GCS_BUCKET_NAME` | GCS bucket for WARC files (optional) |

## Troubleshooting

- **MongoDB connection error on startup** — ensure `NEXT_ATLAS_URI` and `NEXT_ATLAS_DATABASE` are set in `.env.local` and that your MongoDB instance is reachable.
- **`replay-web-page` element not rendering** — the `/replay/ui.js` file must be present in `public/replay/`. It is not committed to the repo; obtain it from the ReplayWeb.page project.
- **TypeScript errors on `params`** — in Next.js 16, route params are `Promise<{...}>` and must be awaited. See `app/policy_index/[platformName]/page.tsx` for the correct pattern.
- **Port conflict** — dev server runs on `3002` (not the Next.js default of 3000) to avoid conflicts with other local services.
