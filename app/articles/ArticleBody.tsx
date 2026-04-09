"use client";

import type { PortableTextBlock } from "@portabletext/types";
import { PortableText, type PortableTextComponents } from "@portabletext/react";

import { urlForImage } from "@/lib/sanity/image";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-white text-2xl font-bold tracking-tight mt-10 mb-4 first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-white text-xl font-semibold mt-8 mb-3 first:mt-0">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-zinc-300 text-[15px] leading-relaxed mb-4 last:mb-0">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside text-zinc-300 text-[15px] leading-relaxed space-y-2 mb-4 pl-1 marker:text-zinc-500">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside text-zinc-300 text-[15px] leading-relaxed space-y-2 mb-4 pl-1 marker:text-zinc-500">
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
      <strong className="font-semibold text-white">{children}</strong>
    ),
    em: ({ children }) => <em className="italic text-zinc-200">{children}</em>,
    link: ({ value, children }) => {
      const href = typeof value?.href === "string" ? value.href : "#";
      return (
        <a
          href={href}
          className="text-orange-400 underline underline-offset-2 hover:text-orange-300 transition-colors"
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
            className="w-full rounded-xl border border-white/10 object-cover"
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
