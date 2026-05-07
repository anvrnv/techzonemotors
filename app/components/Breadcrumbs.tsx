"use client";

import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1" style={{ fontSize: 'var(--breadcrumb-font-size)' }}>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-x-1.5">
              {i > 0 && (
                <span aria-hidden="true" style={{ color: 'var(--color-text-disabled)' }}>/</span>
              )}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="transition-colors hover:underline"
                  style={{ color: 'var(--breadcrumb-color)' }}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  style={{
                    color: isLast ? 'var(--breadcrumb-active-color)' : 'var(--breadcrumb-color)',
                    fontWeight: isLast ? 500 : 400,
                  }}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
