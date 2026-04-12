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
| `sanity/schemaTypes/svoProduct.ts` | Document type `svoProduct`: required `brand`, `model`, `slug` (slug source from brand+model), `image` (hotspot) — Studio **`description`** on `image` (RU): real PNG/WebP alpha for `/svo` dark UI; gray checkerboard in file = baked-in fake transparency, replace asset in CMS; optional `name` (used by `svoDisplayTitle()` only if brand+model empty), `description`, optional string prices `priceRegular` / `priceDiscount`; **six optional strings** for detail UI: four specs (Studio titles **крутящий момент**, **расход**, **макс. скорость**, **объём**) plus **length** / **height** for hero dimension overlay; `sortOrder`; Studio preview shows «Бренд — Модель» |
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
| `lib/svo-products.ts` | `getSvoCatalogProducts()` → `SvoCatalogProduct` (list unchanged); `getSvoProductBySlug(slug)` → **`SvoDetailProduct`** (adds optional CMS specs + dimensions); `svoDisplayTitle()` (brand — model, else optional `name`, else «Техника СВО»); maps `SanitySvoProductRow` / detail row via `svoProductsQuery` / `svoProductBySlugQuery` or `lib/svo-products-fallback.ts` |
| `lib/svo-products-fallback.ts` | Static SVO fallback: **9** items with unique `slug`, `brand`, `model`, optional prices; `SvoFallbackRow`; sample spec/dimension strings on **1–2** slugs for local detail preview; `seedRemoteImageUrl` for seed script `--with-remote-images` |
| `lib/contact-modal.ts` | `OPEN_CONTACT_MODAL_EVENT` and `dispatchOpenContactModal()` for client components |
| `lib/sanity/env.ts` | `apiVersion`, `dataset`, `projectId`, `resolveProjectIdForSanityTools()`, placeholder for missing id |
| `lib/sanity/client.ts` | `getSanityClient()` — `next-sanity` `createClient`, CDN, null if no `projectId` |
| `lib/sanity/image.ts` | `urlForImage` using `@sanity/image-url` |
| `lib/sanity/queries.ts` | GROQ `productsQuery` (`product`); SVO: `svoProductsQuery` (list; unchanged fields) and `svoProductBySlugQuery` on published `svoProduct` only (`!(_id in path("drafts.**"))`), order `sortOrder asc, brand asc, model asc`; **by-slug** projects list fields **plus** optional spec/dimension strings; `homeCarouselSettingsQuery` (singleton `homeCarouselSettings`, dereferences `items` to product rows); article queries `articlesListQuery`, `articleSlugsQuery`, `articleBySlugQuery` with published filter; `reviewsQuery` — published `review`, `order(sortOrder asc, authorName asc)`, slice `[0...12]`, projects `"id": _id` and fields |
| `lib/sanity/types.ts` | TypeScript shapes: `SanityProductRow`; `SanitySvoProductRow` (list/catalog: brand, model, slug, optional name/description/prices, image); **`SanitySvoProductDetailRow`** — by-slug shape including optional spec + dimension strings; `SanityHomeCarouselSettingsRow`; articles: `SanityArticleListRow`, `SanityArticleDetail` (`PortableTextBlock`); `SanityReviewRow` |
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
| `app/svo/page.tsx` | Server page: `revalidate = 60`, `getSvoCatalogProducts()`, renders `SvoPageClient` (server component) |
| `app/svo/[slug]/page.tsx` | SVO detail: `generateStaticParams` from `getSvoCatalogProducts()`, `generateMetadata` / `notFound` via `getSvoProductBySlug`, `revalidate = 60`; `SvoPageShell`; **no heavy card shell** — `SvoDetailHeader`, `SvoDetailHero`, optional description, `SvoSpecsRow` inside section **`#svo-specs`** when any spec is set, `SvoPriceBlock`, `SvoDetailCta` |
| `app/svo/SvoDetailHeader.tsx` | Detail top bar: back link, centered title, **«Ещё данные»** skip link to `#svo-specs` when specs exist (a11y-friendly) |
| `app/svo/SvoDetailHero.tsx` | Hero: `next/image` (`fill`, `sizes`, `priority`), `object-contain`; `imageAlt` from detail title; optional dimension overlay (SVG + labels) when length/height from CMS |
| `app/svo/SvoSpecsRow.tsx` | Horizontal row of CMS-driven spec chips/labels |
| `app/svo/SvoDetailCta.tsx` | Client CTA button → `dispatchOpenContactModal()` (`lib/contact-modal.ts`) |
| `app/svo/SvoPageClient.tsx` | Server UI for `/svo` list: `SvoPageShell`; inner wrapper **`max-w-7xl` only below `lg`**; **`lg:max-w-none`** + **`lg:px-8`** / **`xl:px-12`** so **3-column grid spans full viewport width**; **`lg:min-h-[calc(100dvh-7.5rem)]`**; **`shrink-0`** page header; grid **`flex-1 min-h-0`**, **`lg:grid-cols-3`**; **`>= 4`** products → **`1fr`/`1fr`/`auto`** row template; **`2–3`** → one **`1fr`** row; **`Link`/`article`** **`h-full min-h-0 flex flex-col`**; image **`flex-1 min-h-0`** or **`clamp`**; single → **`lg:col-span-3`** + **`max-w-4xl mx-auto`**; `next/image` **`sizes`** includes **`34vw`** for desktop third; caption + **`svoTileAccessibleText()`** |
| `app/svo/SvoPageShell.tsx` | Shared SVO layout: `bg-[#0a0a0a]`, vertical stripe overlay (`repeating-linear-gradient`) |
| `app/svo/SvoPriceBlock.tsx` | Optional `priceRegular` / `priceDiscount` display (strikethrough + accent); returns null if both empty |
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
| `scripts/seed-sanity-svo.ts` | Seeds `svoProduct` from `lib/svo-products-fallback.ts` (brand, model, slug, optional name/prices, image, **optional spec + dimension fields**); same env/token pattern as catalog seed; optional `--with-remote-images` |

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
| `docs/PROJECT_ADMIN.md` | Russian admin / secrets; architecture includes home **Отзывы** (`review`); **Изображения СВО** — checkerboard in SVO photos = bad raster alpha, fix by replacing asset in Sanity (`/svo` dark bg); section **Пошагово** — GitHub Actions, Sanity Open Studio (в т.ч. шаг 6: **Карусель главной** — порядок ссылок на `product`), `/studio` + `.env.local` на VPS |
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
3. **SVO (`/svo`, `/svo/[slug]`):** `getSvoCatalogProducts()` in `lib/svo-products.ts` → published-only `svoProductsQuery` (no drafts) or **9-item** `lib/svo-products-fallback.ts` with slugs. **List:** `app/svo/page.tsx` (ISR `revalidate = 60`) → `SvoPageClient` (server) inside `SvoPageShell`: **`lg:grid-cols-3`**, **`lg:max-w-none`** (full-width grid on desktop); **`lg:min-h-[calc(100dvh-7.5rem)]`** + grid **`flex-1`**; **`>= 4`** → rows **`1fr`/`1fr`/`auto`**; **`2–3`** → one **`1fr`** row; one item → **`lg:col-span-3`** + **`max-w-4xl mx-auto`**; each `Link` to `/svo/[slug]`; caption + **`svoTileAccessibleText()`** for **`alt`** / **`aria-label`**. **Detail:** `getSvoProductBySlug(slug)` → **`SvoDetailProduct`** via `svoProductBySlugQuery` (extra optional fields) or fallback; `app/svo/[slug]/page.tsx` — `generateStaticParams`, `generateMetadata`, `notFound` if missing, `revalidate = 60`; `SvoDetailHeader` / `SvoDetailHero` / conditional **`#svo-specs`** + `SvoSpecsRow` when CMS specs exist, `SvoPriceBlock`, client `SvoDetailCta`.
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
- **Sanity `svoProduct`:** required `brand`, `model`, `slug`, `image` (field **`description`** in Studio: RU guidance — true PNG/WebP alpha for dark `/svo`; checkerboard pattern means file error, re-export and replace asset); optional `name`, `description`, `priceRegular`, `priceDiscount`, `sortOrder`, **four optional spec strings** (Studio: крутящий момент, расход, макс. скорость, объём) and **two optional dimension strings** (length/height for hero overlay) — see `sanity/schemaTypes/svoProduct.ts` (separate Studio list from catalog). GROQ: published filter; list query unchanged; **by-slug** query projects extra fields in `lib/sanity/queries.ts`. Types: `SanitySvoProductDetailRow` in `lib/sanity/types.ts`. Ops note: `docs/PROJECT_ADMIN.md` subsection **Изображения СВО**.
- **Prisma `Lead`:** see `prisma/schema.prisma`.

---

*Last updated: 2026-04-12 — **SVO list (`SvoPageClient`):** **`lg:max-w-none`** + horizontal padding so **3-column grid uses full viewport width** on desktop; keep **`lg:grid-cols-3`**, **`lg:min-h-[calc(100dvh-7.5rem)]`**, rows **`1fr`/`1fr`/`auto`** when **`>=4`** products; **`2–3`** → one **`1fr`** row; tile **`flex`** + image **`flex-1 min-h-0`**; single → `lg:col-span-3` + `max-w-4xl`. **SVO raster / alpha guidance:** `svoProduct` `image` field Studio `description` (RU: real alpha PNG/WebP, no checkerboard baked in); `docs/PROJECT_ADMIN.md` subsection **Изображения СВО** (diagnosis, `/svo` dark page). Same day earlier: SVO **block E / finish:** list + detail hero **`next/image`** (`fill` + `sizes`); SVO list density (lg, ~900px, 2×3 tiles); detail CMS specs + dimensions; seed/fallback on 1–2 slugs; `svoProduct` schema / queries / fallback **9**; 2026-04-10 — `review` / `ReviewsGrid`; 2026-04-09 — `homeCarouselSettings`.*
