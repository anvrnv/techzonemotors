"use client";

import { NextStudio } from "next-sanity/studio/client-component";

import config from "@/sanity.config";
import { isSanityStudioConfigured } from "@/lib/sanity/env";

export default function StudioPage() {
  if (!isSanityStudioConfigured()) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center text-[var(--foreground,#171717)]">
        <h1 className="text-xl font-semibold">CMS на сайте не настроена</h1>
        <p className="mt-4 text-sm leading-relaxed text-neutral-600">
          На сервере нет значения{" "}
          <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-[13px]">
            NEXT_PUBLIC_SANITY_PROJECT_ID
          </code>{" "}
          в момент{" "}
          <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-[13px]">
            npm run build
          </code>
          — без него Sanity Studio не может подключиться к проекту (раньше страница падала с
          общей ошибкой).
        </p>
        <ol className="mt-6 list-decimal space-y-2 pl-6 text-left text-sm text-neutral-600">
          <li>
            В{" "}
            <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-[13px]">
              /var/www/techzonemotors/.env.local
            </code>{" "}
            задайте{" "}
            <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-[13px]">
              NEXT_PUBLIC_SANITY_PROJECT_ID
            </code>{" "}
            и{" "}
            <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-[13px]">
              NEXT_PUBLIC_SANITY_DATASET
            </code>{" "}
            из{" "}
            <a
              className="text-blue-600 underline"
              href="https://www.sanity.io/manage"
              rel="noopener noreferrer"
              target="_blank"
            >
              sanity.io/manage
            </a>
            .
          </li>
          <li>
            Снова на сервере:{" "}
            <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-[13px]">
              npm run build
            </code>{" "}
            и{" "}
            <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-[13px]">
              pm2 reload techzonemotors --update-env
            </code>
            .
          </li>
        </ol>
        <p className="mt-6 text-sm text-neutral-600">
          Править каталог можно уже сейчас в облачной Studio: в панели проекта кнопка{" "}
          <strong>Open Studio</strong>.
        </p>
      </div>
    );
  }

  return <NextStudio config={config} />;
}
