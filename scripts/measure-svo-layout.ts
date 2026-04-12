/**
 * Снимает реальные размеры DOM страницы /svo через Playwright (Chromium).
 *
 * Запуск: подними сервер (`npm run dev` или `npm run start`), затем:
 *   SVO_LAYOUT_URL=http://127.0.0.1:3000/svo SVO_VIEWPORT_W=1440 SVO_VIEWPORT_H=900 npx tsx scripts/measure-svo-layout.ts
 *
 * Или: npm run measure:svo-layout
 */
import { chromium } from "playwright";

type Box = {
  top: number;
  left: number;
  bottom: number;
  right: number;
  width: number;
  height: number;
  paddingTop: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
  rowGap: string;
  columnGap: string;
} | null;

type MeasureResult = {
  innerW: number;
  innerH: number;
  docElClientHeight: number;
  nav: Box;
  main: Box;
  shell: Box;
  pageColumn: Box;
  pageHeader: Box;
  pageTitle: Box;
  productGrid: Box;
  cards: Record<string, Box>;
  spaceBelowGrid: number | null;
  spaceBelowColumn: number | null;
};

const url =
  process.env.SVO_LAYOUT_URL?.trim() || "http://127.0.0.1:3000/svo";
const vw = Number(process.env.SVO_VIEWPORT_W || "1440");
const vh = Number(process.env.SVO_VIEWPORT_H || "900");

function num(n: number): string {
  return Number.isFinite(n) ? String(Math.round(n * 100) / 100) : "—";
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: vw, height: vh },
    deviceScaleFactor: 1,
  });

  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });
    await page.waitForSelector('[data-svo-measure="product-grid"]', {
      timeout: 30_000,
    });

    // Строка для evaluate: tsx не должен трансформировать тело (иначе __name в браузере).
    const m = (await page.evaluate(`(() => {
      const pick = (sel) => document.querySelector(sel);
      const rect = (el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        return {
          top: r.top,
          left: r.left,
          bottom: r.bottom,
          right: r.right,
          width: r.width,
          height: r.height,
          paddingTop: parseFloat(cs.paddingTop) || 0,
          paddingBottom: parseFloat(cs.paddingBottom) || 0,
          paddingLeft: parseFloat(cs.paddingLeft) || 0,
          paddingRight: parseFloat(cs.paddingRight) || 0,
          marginTop: parseFloat(cs.marginTop) || 0,
          marginBottom: parseFloat(cs.marginBottom) || 0,
          marginLeft: parseFloat(cs.marginLeft) || 0,
          marginRight: parseFloat(cs.marginRight) || 0,
          rowGap: cs.rowGap,
          columnGap: cs.columnGap
        };
      };
      const nav = document.querySelector("body > header");
      const main = document.querySelector("main");
      const shell = pick('[data-svo-measure="shell-root"]');
      const column = pick('[data-svo-measure="page-column"]');
      const pageHeader = pick('[data-svo-measure="page-header"]');
      const pageTitle = pick('[data-svo-measure="page-title"]');
      const grid = pick('[data-svo-measure="product-grid"]');
      const innerH = window.innerHeight;
      const innerW = window.innerWidth;
      const docEl = document.documentElement.clientHeight;
      const cards = {};
      for (let i = 0; i < 12; i++) {
        const link = pick('[data-svo-measure="card-link-' + i + '"]');
        if (!link) break;
        cards['link-' + i] = rect(link);
        cards['article-' + i] = rect(pick('[data-svo-measure="card-article-' + i + '"]'));
        cards['image-' + i] = rect(pick('[data-svo-measure="card-image-' + i + '"]'));
        cards['caption-' + i] = rect(pick('[data-svo-measure="card-caption-' + i + '"]'));
      }
      return {
        innerW,
        innerH,
        docElClientHeight: docEl,
        nav: rect(nav),
        main: rect(main),
        shell: rect(shell),
        pageColumn: rect(column),
        pageHeader: rect(pageHeader),
        pageTitle: rect(pageTitle),
        productGrid: rect(grid),
        cards,
        spaceBelowGrid: grid ? innerH - grid.getBoundingClientRect().bottom : null,
        spaceBelowColumn: column ? innerH - column.getBoundingClientRect().bottom : null
      };
    })()`)) as MeasureResult;

    const lines: string[] = [];
    lines.push("## SVO layout — измерено Playwright");
    lines.push("");
    lines.push(`- **URL:** ${url}`);
    lines.push(`- **Viewport:** ${vw}×${vh} (CSS px)`);
    lines.push(`- **window.innerHeight:** ${num(m.innerH)}`);
    lines.push(`- **documentElement.clientHeight:** ${num(m.docElClientHeight)}`);
    lines.push("");
    lines.push("| px | Элемент (data-svo-measure / DOM) | Примечание |");
    lines.push("| ---:| --- | --- |");
    lines.push(
      `| ${num(m.innerH)} | viewport height | window.innerHeight |`,
    );
    lines.push(
      `| ${m.nav?.height != null ? num(m.nav.height) : "—"} | body > header (Navbar) | высота фикс-шапки |`,
    );
    lines.push(
      `| ${m.main?.paddingTop != null ? num(m.main.paddingTop) : "—"} | main padding-top | pt-14 под навбар |`,
    );
    lines.push(
      `| ${m.shell?.height != null ? num(m.shell.height) : "—"} | shell-root | SvoPageShell min-h-screen |`,
    );
    lines.push(
      `| ${m.pageColumn?.height != null ? num(m.pageColumn.height) : "—"} | page-column | обёртка flex + min-h |`,
    );
    lines.push(
      `| ${m.pageColumn?.paddingTop != null ? num(m.pageColumn.paddingTop) : "—"} | page-column padding-top | |`,
    );
    lines.push(
      `| ${m.pageColumn?.paddingBottom != null ? num(m.pageColumn.paddingBottom) : "—"} | page-column padding-bottom | |`,
    );
    lines.push(
      `| ${m.pageHeader?.height != null ? num(m.pageHeader.height) : "—"} | page-header | блок с заголовком (вкл. margin визуально отдельно) |`,
    );
    lines.push(
      `| ${m.pageHeader?.marginBottom != null ? num(m.pageHeader.marginBottom) : "—"} | page-header margin-bottom | |`,
    );
    lines.push(
      `| ${m.pageTitle?.height != null ? num(m.pageTitle.height) : "—"} | page-title (h1) | строка «Техника для СВО» |`,
    );
    lines.push(
      `| ${m.productGrid?.height != null ? num(m.productGrid.height) : "—"} | product-grid | контейнер сетки |`,
    );
    lines.push(
      `| ${m.productGrid?.rowGap != null ? m.productGrid.rowGap : "—"} | product-grid row-gap | CSS (rem→px в браузере) |`,
    );
    lines.push(
      `| ${m.spaceBelowGrid != null ? num(m.spaceBelowGrid) : "—"} | — | **свободно от низа сетки до низа viewport** |`,
    );
    lines.push(
      `| ${m.spaceBelowColumn != null ? num(m.spaceBelowColumn) : "—"} | — | свободно от низа page-column до низа viewport |`,
    );

    for (let i = 0; i < 12; i++) {
      const lk = m.cards[`link-${i}`];
      if (!lk) break;
      lines.push(
        `| ${num(lk.height)} | card-link-${i} | полная высота карточки (ссылка) |`,
      );
      const im = m.cards[`image-${i}`];
      const cap = m.cards[`caption-${i}`];
      if (im?.height != null)
        lines.push(`| ${num(im.height)} | card-image-${i} | зона изображения |`);
      if (cap?.height != null)
        lines.push(`| ${num(cap.height)} | card-caption-${i} | подпись |`);
    }

    lines.push("");
    lines.push("### JSON (сырьё)");
    lines.push("```json");
    lines.push(JSON.stringify(m, null, 2));
    lines.push("```");

    const out = lines.join("\n");
    console.log(out);
  } finally {
    await browser.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
