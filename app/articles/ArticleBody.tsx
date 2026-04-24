"use client";

import type { PortableTextBlock } from "@portabletext/types";
import { PortableText, type PortableTextComponents } from "@portabletext/react";

import { urlForImage } from "@/lib/sanity/image";

const linkMark =
  "text-accent underline underline-offset-2 transition-colors hover:text-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/50";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mb-4 mt-10 text-2xl font-bold tracking-tight text-foreground first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-3 text-xl font-semibold text-foreground first:mt-0">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="mb-4 text-[15px] leading-relaxed text-foreground-muted last:mb-0">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 list-inside list-disc space-y-2 pl-1 text-[15px] leading-relaxed text-foreground-muted marker:text-foreground-subtle">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 list-inside list-decimal space-y-2 pl-1 text-[15px] leading-relaxed text-foreground-muted marker:text-foreground-subtle">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-1">{children}</li>,
    number: ({ children }) => <li className="pl-1">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="text-foreground-muted italic">{children}</em>
    ),
    link: ({ value, children }) => {
      const href = typeof value?.href === "string" ? value.href : "#";
      return (
        <a
          href={href}
          className={linkMark}
          rel="noopener noreferrer"
          target={href.startsWith("http") ? "_blank" : undefined}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const src = urlForImage(value as Record<string, unknown>);
      if (!src) {
        return null;
      }
      const alt =
        typeof (value as { alt?: string }).alt === "string"
          ? (value as { alt: string }).alt
          : "";
      return (
        <figure className="my-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="w-full rounded-xl border border-border object-cover"
          />
        </figure>
      );
    },
  },
};

export default function ArticleBody({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="article-body max-w-3xl">
      <PortableText value={value} components={components} />
    </div>
  );
}
