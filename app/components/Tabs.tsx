"use client";

import { useId } from "react";

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

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label="Вкладки"
        className="flex gap-0 border-b"
        style={{ borderColor: 'var(--color-border)' }}
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
