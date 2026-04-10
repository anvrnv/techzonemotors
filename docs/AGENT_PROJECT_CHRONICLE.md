# Agent project chronicle (TechZone Motors / my-next-app)

**Read this file at the start of any non-trivial coding, planning, or debugging task** in this repository, unless the user explicitly scopes work to a single known file. For human-oriented deployment and secrets inventory, see `docs/PROJECT_ADMIN.md` (Russian).

This document is the **structural source of truth** for agents. After meaningful code changes, a **Chronicler** subagent (see `.cursor/agents/chronicler.md` and `.cursor/rules/chronicler-doc-update.mdc`) should update this file so it stays accurate.

---

## Stack and runtime

| Layer | Choice |
|-------|--------|
| Framework | Next.js **16.2.1** (App Router) |
| UI | React **19**, Tailwind **4** (`@tailwindcss/postcss`, `postcss.config.mjs`, `app/globals.css`) |
| CMS | Sanity **5** + `next-sanity` **12**; Studio at **`/studio`**; article bodies rendered with **`@portabletext/react`** |
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
| `package.json` | Scripts: `dev`, `build` (= `prisma generate && next build`), `start`, `lint`, `postinstall` (= `prisma generate`), `sanity:seed-catalog`, `sanity:seed-svo`; dependency `@portabletext/react` (article body UI) |
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
| `sanity.config.ts` | Studio config: project id resolver, dataset, schema types, `basePath: "/studio"`, `structureTool` with list items: **Карусель главной** (singleton `homeCarouselSettings` / id `homeCarouselSettings`), **Каталог товаров** (`documentTypeList("product")`), **Техника для СВО** (`svoProduct`), **Статьи** (`documentTypeList("article")`), **Отзывы** (`documentTypeList("review")`) |
| `sanity.cli.ts` | Sanity CLI API project/dataset from `lib/sanity/env` |
| `sanity/schemaTypes/index.ts` | Exports schema type array (`blockContent`, `homeCarouselSettings`, `product`, `svoProduct`, `article`, `review`) |
| `sanity/schemaTypes/blockContent.ts` | Shared Portable Text type `blockContent` (blocks, headings, lists, marks, links, images) for article body |
| `sanity/schemaTypes/homeCarouselSettings.ts` | Document type `homeCarouselSettings`: ordered array of references to `product` (Studio title **Карусель главной**) |
| `sanity/schemaTypes/product.ts` | Document type `product`: name, slug, description, price (string), image, sortOrder |
| `sanity/schemaTypes/svoProduct.ts` | Document type `svoProduct`: name, slug, description, image (hotspot), sortOrder, `priceRegular`, `priceDiscount` |
| `sanity/schemaTypes/article.ts` | Document type `article`: title, slug, excerpt (SEO/list, max 300), sortOrder, body (`blockContent`) |
| `sanity/schemaTypes/review.ts` | Document type `review` (Studio **Отзыв**): `authorName`, `text`, `ratingTen` (integer 0–10), `sortOrder`; Studio ordering **Порядок, затем имя**; preview truncates `text` in subtitle |

### Library code (`lib/`)

| Path | Role |
|------|------|
| `lib/prisma.ts` | Singleton Prisma client with `PrismaPg` adapter |
| `lib/catalog-product.ts` | `CatalogProduct` type; `DEFAULT_CATALOG_IMAGE_URL` → `/catalog-placeholder.jpg` |
| `lib/products.ts` | `getCatalogProducts()`, exported `mapSanityProductRows()`: Sanity fetch → map images via `urlForImage`; fallback to `products-fallback` if no projectId / error / empty |
| `lib/home-carousel.ts` | `getHomeCarouselProducts()`: fetches singleton `homeCarouselSettings` via `homeCarouselSettingsQuery`, maps with `mapSanityProductRows`; falls back to `getCatalogProducts()` when unset, empty, or on error / no client |
| `lib/products-fallback.ts` | Static fallback catalog for offline / missing Sanity |
| `lib/svo-products.ts` | `getSvoCatalogProducts()`, `SvoCatalogProduct`; Sanity fetch for `/svo` with fallback |
| `lib/svo-products-fallback.ts` | Static SVO catalog fallback (ids `fallback-svo-1` …) |
| `lib/contact-modal.ts` | `OPEN_CONTACT_MODAL_EVENT` and `dispatchOpenContactModal()` for client components |
| `lib/sanity/env.ts` | `apiVersion`, `dataset`, `projectId`, `resolveProjectIdForSanityTools()`, placeholder for missing id |
| `lib/sanity/client.ts` | `getSanityClient()` — `next-sanity` `createClient`, CDN, null if no `projectId` |
| `lib/sanity/image.ts` | `urlForImage` using `@sanity/image-url` |
| `lib/sanity/queries.ts` | GROQ `productsQuery` (`product`); `svoProductsQuery` (`svoProduct`); `homeCarouselSettingsQuery` (singleton `homeCarouselSettings`, dereferences `items` to product rows); article queries `articlesListQuery`, `articleSlugsQuery`, `articleBySlugQuery` with published filter `!(_id in path("drafts.**"))`; `reviewsQuery` — published `review`, `order(sortOrder asc, authorName asc)`, slice `[0...12]`, projects `"id": _id` and fields |
| `lib/sanity/types.ts` | TypeScript shapes: `SanityProductRow`, `SanitySvoProductRow`, `SanityHomeCarouselSettingsRow`; articles: `SanityArticleListRow`, `SanityArticleDetail` (uses `PortableTextBlock` from `@portabletext/types`); `SanityReviewRow` for home reviews grid |
| `lib/reviews.ts` | `ReviewData`, `getReviewsForGrid()`: `reviewsQuery` → map valid rows (trim strings, integer `ratingTen` 0–10), skip invalid, pad to **12** with `null`; no client / error → 12× `null` |
| `lib/articles.ts` | `getArticlesList()`, `getArticleBySlug(slug)`, `getArticleSlugs()` — Sanity fetch via queries above; empty/null client → empty / not found |

### App Router (`app/`)

| Path | Role |
|------|------|
| `app/layout.tsx` | Root layout: Montserrat font, `Navbar`, `main`, `GlobalContactModal`; metadata "TechZone Motors" |
| `app/globals.css` | Global styles / Tailwind entry |
| `app/page.tsx` | Home server page: `revalidate = 60`, `Promise.all` of `getHomeCarouselProducts()` (`lib/home-carousel.ts`) and `getReviewsForGrid()` (`lib/reviews.ts`), passes `products` + `reviews` to `HomeClient` |
| `app/HomeClient.tsx` | Client home: `HomeClientProps` = `CatalogProductsProps` & `{ reviews: (ReviewData \| null)[] }`; dark layout, `ProductCarousel` with `onDetailsClick` → `router.push("/catalog")` («Подробнее») and `onBuyClick` → contact modal (`dispatchOpenContactModal`), `ReviewsGrid` (12-slot grid from `reviews`), `Footer` |
| `app/catalog/page.tsx` | Catalog server page |
| `app/catalog/CatalogPageClient.tsx` | Client catalog UI; `ProductModal`: `aspect-[3/2]` hero + bottom gradient overlay (same pattern as home carousel), `max-h-[90vh] overflow-y-auto`; `role="dialog"`, `aria-modal`, `aria-labelledby`, Escape closes |
| `app/articles/page.tsx` | Articles list: `metadata` (title/description), `revalidate = 60`, `getArticlesList()` |
| `app/articles/[slug]/page.tsx` | Article detail: `revalidate = 60`, `generateStaticParams` from `getArticleSlugs()`, `generateMetadata` from excerpt, `getArticleBySlug()` |
| `app/articles/ArticleBody.tsx` | Renders article `body` with `@portabletext/react` |
| `app/svo/page.tsx` | Server page: `revalidate = 60`, `getSvoCatalogProducts()`, passes data to client |
| `app/svo/SvoPageClient.tsx` | Client UI for `/svo`: cards with `SvoBadge` top-left (`z-20`); product modal matches catalog (3:2 + overlay, `max-h-[90vh]` scroll, dialog a11y, Escape); CTA via `dispatchOpenContactModal` |
| `app/api/contact/route.ts` | `POST` JSON `{ name, phone }` → Telegram `sendMessage` → `prisma.lead.create` |
| `app/studio/[[...tool]]/layout.tsx` | Layout wrapper for Studio route |
| `app/studio/[[...tool]]/page.tsx` | Client: если нет `NEXT_PUBLIC_SANITY_PROJECT_ID` в билде — подсказка; иначе `NextStudio` + `sanity.config` |
| `app/components/Navbar.tsx` | Site navigation; center + mobile nav link **Статьи** → `/articles` (replaces prior «Связаться» CTA placement there) |
| `app/components/Footer.tsx` | Footer |
| `app/components/ProductCarousel.tsx` | Home carousel: large cards `aspect-[3/2]`, full-bleed `object-cover` image, bottom gradient overlay (title, excerpt, price, actions); fade/slide timer cleared on unmount; optional `onDetailsClick` for «Подробнее» (separate from «Купить» / buy handler) |
| `app/components/ReviewsGrid.tsx` | **12**-cell grid (`md:grid-cols-10`, rows 3+3+4 / 4+3+3 ×2); prop `reviews` padded to 12; stars from `ratingTen / 2` with half-star SVG (`useId` clip paths), `role="img"` + `aria-label`; empty slots = shell + outline stars only (`"use client"`) |
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
| `docs/PROJECT_ADMIN.md` | Russian admin / secrets; architecture includes home **Отзывы** (`review`); section **Пошагово** — GitHub Actions, Sanity Open Studio (в т.ч. шаг 6: **Карусель главной** — порядок ссылок на `product`), `/studio` + `.env.local` на VPS |
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

1. **Home carousel + reviews:** Server `app/page.tsx` runs `Promise.all` of `getHomeCarouselProducts()` and `getReviewsForGrid()`. **Carousel:** `getHomeCarouselProducts()` in `lib/home-carousel.ts` → Sanity `homeCarouselSettingsQuery` (ordered `product` refs on singleton `homeCarouselSettings`) → `mapSanityProductRows`; if missing/empty/error/no client → same path as catalog via `getCatalogProducts()` (including `lib/products-fallback.ts`). **Reviews:** `getReviewsForGrid()` in `lib/reviews.ts` → `reviewsQuery` (published `review`, max 12, `sortOrder` then `authorName`) → skip invalid rows → pad to 12 with `null`. `HomeClient` passes `reviews` to `ReviewsGrid`.
2. **Catalog page:** `getCatalogProducts()` in `lib/products.ts` → Sanity GROQ or `lib/products-fallback.ts`.
3. **SVO page (`/svo`):** `getSvoCatalogProducts()` in `lib/svo-products.ts` → Sanity `svoProductsQuery` or `lib/svo-products-fallback.ts` (ISR `revalidate = 60` on `app/svo/page.tsx`).
4. **Articles (`/articles`, `/articles/[slug]`):** `lib/articles.ts` → GROQ list/slug/detail queries (published only, no drafts via `!(_id in path("drafts.**"))`) → list page and detail with `ArticleBody` (`@portabletext/react`); ISR `revalidate = 60`; `generateStaticParams` on detail route.
5. **Contact:** Client posts to `/api/contact` → Telegram → DB `Lead`.
6. **Studio:** `/studio` → `NextStudio` + `sanity.config.ts` (lists: home carousel singleton, catalog `product`, SVO `svoProduct`, **Статьи** `article`, **Отзывы** `review`).

---

## Schema summary

- **Sanity `blockContent`:** shared Portable Text array type for rich article body — see `sanity/schemaTypes/blockContent.ts`.
- **Sanity `article`:** SEO-oriented posts (title, slug, excerpt for list/meta, sortOrder, body → `blockContent`) — see `sanity/schemaTypes/article.ts`; Studio sidebar **Статьи**.
- **Sanity `review`:** customer reviews for the home grid (`authorName`, `text`, `ratingTen` 0–10, `sortOrder`) — see `sanity/schemaTypes/review.ts`; Studio **Отзывы**; `reviewsQuery` matches `sortOrder` / `authorName`; site shows stars as `ratingTen / 2` (half stars in UI); `"id": _id` for React keys.
- **Sanity `homeCarouselSettings`:** singleton document id `homeCarouselSettings`; ordered references to `product` for the home carousel — see `sanity/schemaTypes/homeCarouselSettings.ts`.
- **Sanity `product`:** see `sanity/schemaTypes/product.ts`.
- **Sanity `svoProduct`:** see `sanity/schemaTypes/svoProduct.ts` (separate Studio list from catalog).
- **Prisma `Lead`:** see `prisma/schema.prisma`.

---

*Last updated: 2026-04-10 — Sanity `review`, `reviewsQuery` (`sortOrder` / `authorName`), `getReviewsForGrid` + `ReviewsGrid` (12 slots, half-star SVG, a11y labels); Studio **Отзывы**; `PROJECT_ADMIN` отзывы на главной. Prior: 2026-04-09 — `homeCarouselSettings`; 3:2 overlay, SVO badge.*
