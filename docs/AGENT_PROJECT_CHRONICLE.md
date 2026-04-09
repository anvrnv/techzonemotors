# Agent project chronicle (TechZone Motors / my-next-app)

**Read this file at the start of any non-trivial coding, planning, or debugging task** in this repository, unless the user explicitly scopes work to a single known file. For human-oriented deployment and secrets inventory, see `docs/PROJECT_ADMIN.md` (Russian).

This document is the **structural source of truth** for agents. After meaningful code changes, a **Chronicler** subagent (see `.cursor/agents/chronicler.md` and `.cursor/rules/chronicler-doc-update.mdc`) should update this file so it stays accurate.

---

## Stack and runtime

| Layer | Choice |
|-------|--------|
| Framework | Next.js **16.2.1** (App Router) |
| UI | React **19**, Tailwind **4** (`@tailwindcss/postcss`, `postcss.config.mjs`, `app/globals.css`) |
| CMS | Sanity **5** + `next-sanity` **12**; Studio at **`/studio`** |
| DB | PostgreSQL via Prisma **7** with **`@prisma/adapter-pg`** (`lib/prisma.ts`) |
| Integrations | Telegram Bot API for lead notifications (`app/api/contact/route.ts`) |

**Next.js note:** `AGENTS.md` states this may differ from older Next.js docs; prefer `node_modules/next/dist/docs/` when unsure.

**Deploy:** Push to `main` triggers `.github/workflows/deploy.yml` (SSH → `git fetch` + `git reset --hard origin/main`, `npm install`, `npx prisma db push`, `npm run build`, `pm2 reload techzonemotors`). Server path `/var/www/techzonemotors`. See `docs/PROJECT_ADMIN.md` for secrets.

**Agent workflow:** After substantive edits — commit + `git push` per `.cursor/rules/git-push-autodeploy.mdc` (unless user forbids).

---

## Environment variables (names only)

| Variable | Used by |
|----------|---------|
| `DATABASE_URL` | Prisma (`prisma.config.ts`, `lib/prisma.ts`) |
| `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` | `app/api/contact/route.ts` |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION` | `lib/sanity/env.ts`, Sanity config |
| `SANITY_API_WRITE_TOKEN` | `scripts/seed-sanity-catalog.ts`, `scripts/seed-sanity-svo.ts` (via `scripts/bootstrap-env.ts`) |

CLI scripts require `.env.local` to exist (`scripts/bootstrap-env.ts` exits if missing).

---

## Directory map (repository root)

### Config / tooling

| Path | Role |
|------|------|
| `package.json` | Scripts: `dev`, `build` (= `prisma generate && next build`), `start`, `lint`, `postinstall` (= `prisma generate`), `sanity:seed-catalog`, `sanity:seed-svo` |
| `package-lock.json` | Locked dependencies |
| `tsconfig.json` | TypeScript; path alias `@/*` → repo root |
| `next.config.ts` | Next config; `images.remotePatterns` for `cdn.sanity.io` |
| `eslint.config.mjs` | ESLint flat config |
| `postcss.config.mjs` | PostCSS (Tailwind v4) |
| `prisma.config.ts` | Prisma 7 config; datasource URL from `DATABASE_URL` |
| `ecosystem.config.js` | PM2 CommonJS config; app name `techzonemotors`, `cwd` `/var/www/techzonemotors`, `next start`, `PORT` 3000 |
| `.gitignore` | Ignores `node_modules`, `.next`, `.env*`, etc. |

### Prisma

| Path | Role |
|------|------|
| `prisma/schema.prisma` | Single model `Lead` (id, name, phone, createdAt); PostgreSQL datasource |

### Sanity

| Path | Role |
|------|------|
| `sanity.config.ts` | Studio config: project id resolver, dataset, schema types, `basePath: "/studio"`, `structureTool` with two list items: **Каталог товаров** (`product`), **Техника для СВО** (`svoProduct`) |
| `sanity.cli.ts` | Sanity CLI API project/dataset from `lib/sanity/env` |
| `sanity/schemaTypes/index.ts` | Exports schema type array (includes `product`, `svoProduct`) |
| `sanity/schemaTypes/product.ts` | Document type `product`: name, slug, description, price (string), image, sortOrder |
| `sanity/schemaTypes/svoProduct.ts` | Document type `svoProduct`: name, slug, description, image (hotspot), sortOrder, `priceRegular`, `priceDiscount` |

### Library code (`lib/`)

| Path | Role |
|------|------|
| `lib/prisma.ts` | Singleton Prisma client with `PrismaPg` adapter |
| `lib/catalog-product.ts` | `CatalogProduct` type; `DEFAULT_CATALOG_IMAGE_URL` → `/catalog-placeholder.jpg` |
| `lib/products.ts` | `getCatalogProducts()`: Sanity fetch → map images via `urlForImage`; fallback to `products-fallback` if no projectId / error / empty |
| `lib/products-fallback.ts` | Static fallback catalog for offline / missing Sanity |
| `lib/svo-products.ts` | `getSvoCatalogProducts()`, `SvoCatalogProduct`; Sanity fetch for `/svo` with fallback |
| `lib/svo-products-fallback.ts` | Static SVO catalog fallback (ids `fallback-svo-1` …) |
| `lib/contact-modal.ts` | `OPEN_CONTACT_MODAL_EVENT` and `dispatchOpenContactModal()` for client components |
| `lib/sanity/env.ts` | `apiVersion`, `dataset`, `projectId`, `resolveProjectIdForSanityTools()`, placeholder for missing id |
| `lib/sanity/client.ts` | `getSanityClient()` — `next-sanity` `createClient`, CDN, null if no `projectId` |
| `lib/sanity/image.ts` | `urlForImage` using `@sanity/image-url` |
| `lib/sanity/queries.ts` | GROQ `productsQuery` (`product`); `svoProductsQuery` (`svoProduct`) |
| `lib/sanity/types.ts` | TypeScript shapes for Sanity rows (e.g. `SanitySvoProductRow`) |

### App Router (`app/`)

| Path | Role |
|------|------|
| `app/layout.tsx` | Root layout: Montserrat font, `Navbar`, `main`, `GlobalContactModal`; metadata "TechZone Motors" |
| `app/globals.css` | Global styles / Tailwind entry |
| `app/page.tsx` | Home server page: `revalidate = 60`, loads `getCatalogProducts()`, renders `HomeClient` |
| `app/HomeClient.tsx` | Client home: dark layout, `ProductCarousel` (buy → contact modal), `ReviewsGrid`, `Footer` |
| `app/catalog/page.tsx` | Catalog server page |
| `app/catalog/CatalogPageClient.tsx` | Client catalog UI |
| `app/svo/page.tsx` | Server page: `revalidate = 60`, `getSvoCatalogProducts()`, passes data to client |
| `app/svo/SvoPageClient.tsx` | Client UI for `/svo`: product cards, modals, CTA via `dispatchOpenContactModal` |
| `app/api/contact/route.ts` | `POST` JSON `{ name, phone }` → Telegram `sendMessage` → `prisma.lead.create` |
| `app/studio/[[...tool]]/layout.tsx` | Layout wrapper for Studio route |
| `app/studio/[[...tool]]/page.tsx` | Client: если нет `NEXT_PUBLIC_SANITY_PROJECT_ID` в билде — подсказка; иначе `NextStudio` + `sanity.config` |
| `app/components/Navbar.tsx` | Site navigation |
| `app/components/Footer.tsx` | Footer |
| `app/components/ProductCarousel.tsx` | Product carousel (home) |
| `app/components/ReviewsGrid.tsx` | Reviews section |
| `app/components/ContactModal.tsx` | Contact form modal UI |
| `app/components/GlobalContactModal.tsx` | Global modal + event listener for `OPEN_CONTACT_MODAL_EVENT` |

### Public assets (`public/`)

| Path | Role |
|------|------|
| `public/catalog-placeholder.jpg` | Default catalog image when mapping Sanity assets |
| `public/file.svg`, `public/window.svg`, `public/vercel.svg` | Static assets (template leftovers may exist) |

### Scripts (`scripts/`)

| Path | Role |
|------|------|
| `scripts/bootstrap-env.ts` | Loads `.env.local` + `.env`; exports `REPO_ROOT`, `getSanityWriteEnv()` |
| `scripts/seed-sanity-catalog.ts` | Seeds Sanity from `fallbackCatalogProducts`; requires write token; optional `--with-remote-images` |
| `scripts/seed-sanity-svo.ts` | Seeds `svoProduct` from `lib/svo-products-fallback.ts`; same env/token pattern as catalog seed; optional `--with-remote-images` |

### Deploy (`deploy/`)

| Path | Role |
|------|------|
| `deploy/setup-server.sh` | Idempotent VPS bootstrap: Node 20, PM2, Nginx, UFW, clone repo, `.env.local` placeholders, build, PM2, Certbot, full `nginx.conf` |
| `deploy/nginx.conf` | Production Nginx: HTTP→HTTPS, www→apex, TLS, proxy to `localhost:3000`, gzip, security headers |

### CI (`.github/workflows/`)

| Path | Role |
|------|------|
| `deploy.yml` | Deploy on push to `main` via `appleboy/ssh-action` |

### Cursor / agent definitions (`.cursor/`)

| Path | Role |
|------|------|
| `.cursor/rules/git-push-autodeploy.mdc` | Mandatory commit + push after meaningful edits |
| `.cursor/rules/chronicler-doc-update.mdc` | After code changes, run Chronicler to update this chronicle |
| `.cursor/agents/orchestrator.md` | Planner → Implementer → Debugger pipeline; should reference reading this doc first |
| `.cursor/agents/planner.md` | Planning agent |
| `.cursor/agents/implementer.md` | Implementation agent |
| `.cursor/agents/debugger.md` | Review / fix agent |
| `.cursor/agents/chronicler.md` | Documentation sync agent |

### Docs (`docs/`)

| Path | Role |
|------|------|
| `docs/PROJECT_ADMIN.md` | Russian admin / secrets; section **Пошагово** — GitHub Actions, Sanity Open Studio, `/studio` + `.env.local` на VPS |
| `docs/AGENT_PROJECT_CHRONICLE.md` | This file |

### Other root files

| Path | Role |
|------|------|
| `README.md` | Default create-next-app readme (mostly generic) |
| `AGENTS.md` | Next.js warning + reminder to commit/push |
| `CLAUDE.md` | Points to `@AGENTS.md` |

### Not committed / generated (do not edit in git)

| Path | Role |
|------|------|
| `node_modules/` | Dependencies |
| `.next/` | Next build output |
| `next-env.d.ts` | Generated Next types (ignored in `.gitignore`) |

---

## Data flow shortcuts

1. **Catalog page:** `getCatalogProducts()` in `lib/products.ts` → Sanity GROQ or `lib/products-fallback.ts`.
2. **SVO page (`/svo`):** `getSvoCatalogProducts()` in `lib/svo-products.ts` → Sanity `svoProductsQuery` or `lib/svo-products-fallback.ts` (ISR `revalidate = 60` on `app/svo/page.tsx`).
3. **Contact:** Client posts to `/api/contact` → Telegram → DB `Lead`.
4. **Studio:** `/studio` → `NextStudio` + `sanity.config.ts` (split lists: catalog `product` vs SVO `svoProduct`).

---

## Schema summary

- **Sanity `product`:** see `sanity/schemaTypes/product.ts`.
- **Sanity `svoProduct`:** see `sanity/schemaTypes/svoProduct.ts` (separate Studio list from catalog).
- **Prisma `Lead`:** see `prisma/schema.prisma`.

---

*Last updated: 2026-04-09 (SVO catalog: Sanity `svoProduct`, `/svo` data layer + seed script).*
