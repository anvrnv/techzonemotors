/**
 * Загрузка `.env.local` / `.env` для CLI-скриптов (tsx).
 * Импортируйте этот модуль ПЕРВЫМ в entrypoint — до любого импорта `lib/sanity/env`,
 * где переменные читаются при загрузке модуля.
 */
import { config as loadEnv } from "dotenv";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
export const REPO_ROOT = resolve(here, "..");

const envLocalPath = resolve(REPO_ROOT, ".env.local");

if (!existsSync(envLocalPath)) {
  console.error(`Файл не найден: ${envLocalPath}`);
  process.exit(1);
}

loadEnv({ path: envLocalPath, override: true });
loadEnv({ path: resolve(REPO_ROOT, ".env"), override: true });

export type SanityWriteEnv = {
  apiVersion: string;
  dataset: string;
  projectId: string;
  token: string | undefined;
};

export function getSanityWriteEnv(): SanityWriteEnv {
  return {
    apiVersion:
      process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || "2024-01-01",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production",
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || "",
    token: process.env.SANITY_API_WRITE_TOKEN?.trim(),
  };
}
