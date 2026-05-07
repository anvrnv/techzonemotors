"use client";

import { useId, useRef } from "react";

export interface TabItem {
  id: string;
  label: string;
  disabled?: boolean;
}

interface TabsProps {
  tabs: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

export default function Tabs({ tabs, activeId, onChange, className = "" }: TabsProps) {
  const baseId = useId();
  const listRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const enabledTabs = tabs.filter((t) => !t.disabled);
    const currentIndex = enabledTabs.findIndex((t) => t.id === activeId);

    let nextIndex: number | null = null;

    if (e.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % enabledTabs.length;
    } else if (e.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + enabledTabs.length) % enabledTabs.length;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = enabledTabs.length - 1;
    }

    if (nextIndex !== null) {
      e.preventDefault();
      const nextTab = enabledTabs[nextIndex];
      onChange(nextTab.id);
      const btn = listRef.current?.querySelector<HTMLButtonElement>(
        `#${CSS.escape(`${baseId}-tab-${nextTab.id}`)}`
      );
      btn?.focus();
    }
  };

  return (
    <div className={className}>
      <div
        ref={listRef}
        role="tablist"
        aria-label="Вкладки"
        className="flex gap-0 border-b"
        style={{ borderColor: 'var(--color-border)' }}
        onKeyDown={handleKeyDown}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeId;
          return (
            <button
              key={tab.id}
              role="tab"
              id={`${baseId}-tab-${tab.id}`}
              aria-controls={`${baseId}-panel-${tab.id}`}
              aria-selected={isActive}
              disabled={tab.disabled}
              tabIndex={isActive ? 0 : -1}
              onClick={() => !tab.disabled && onChange(tab.id)}
              className="relative -mb-px px-4 py-2.5 text-sm font-medium transition-colors"
              style={{
                borderBottom: isActive ? `2px solid var(--color-primary)` : '2px solid transparent',
                color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
                cursor: tab.disabled ? 'not-allowed' : 'pointer',
                opacity: tab.disabled ? 0.4 : 1,
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
