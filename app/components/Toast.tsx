"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";

type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  visible: boolean;
}

interface ToastContextValue {
  showToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

const COLOR_MAP: Record<
  ToastType,
  { border: string; bg: string; icon: string }
> = {
  success: {
    border: "var(--color-success)",
    bg: "var(--color-success-soft)",
    icon: "var(--color-success)",
  },
  error: {
    border: "var(--color-error)",
    bg: "var(--color-error-soft)",
    icon: "var(--color-error)",
  },
  warning: {
    border: "var(--color-warning)",
    bg: "var(--color-warning-soft)",
    icon: "var(--color-warning)",
  },
  info: {
    border: "var(--color-info)",
    bg: "var(--color-info-soft)",
    icon: "var(--color-info)",
  },
};

function ToastIcon({ type }: { type: ToastType }) {
  if (type === "success") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M5 8l2 2 4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (type === "error") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M6 6l4 4M10 6l-4 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (type === "warning") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path
          d="M8 2L14 13H2L8 2z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M8 6v3.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="8" cy="11" r="0.75" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 7v5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="8" cy="4.5" r="0.75" fill="currentColor" />
    </svg>
  );
}

function ToastItem({
  toast,
  onClose,
}: {
  toast: Toast;
  onClose: (id: string) => void;
}) {
  const colors = COLOR_MAP[toast.type];
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        backgroundColor: colors.bg,
        borderLeft: `4px solid ${colors.border}`,
        boxShadow: "var(--shadow-md)",
        animation: toast.visible
          ? "toast-in 200ms ease-out forwards"
          : "toast-out 400ms ease-out forwards",
        pointerEvents: "auto",
      }}
      className="flex min-w-[240px] max-w-[340px] items-start gap-3 rounded-xl px-4 py-3"
    >
      <span style={{ color: colors.icon }} className="mt-0.5 shrink-0">
        <ToastIcon type={toast.type} />
      </span>
      <span
        className="flex-1 text-sm leading-snug"
        style={{ color: "var(--color-text)" }}
      >
        {toast.message}
      </span>
      <button
        type="button"
        onClick={() => onClose(toast.id)}
        aria-label="Закрыть уведомление"
        className="shrink-0 text-base leading-none opacity-50 transition-opacity hover:opacity-80"
        style={{ color: "var(--color-text)" }}
      >
        ×
      </button>
    </div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const showToast = useCallback((message: string, type: ToastType) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, type, visible: true }]);

    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, visible: false } : t))
      );
    }, 3600);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, visible: false } : t))
    );
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 400);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {mounted &&
        createPortal(
          <div className="pointer-events-none fixed bottom-4 left-1/2 z-[300] flex -translate-x-1/2 flex-col-reverse gap-2 sm:left-auto sm:right-4 sm:translate-x-0">
            {toasts.map((toast) => (
              <ToastItem key={toast.id} toast={toast} onClose={removeToast} />
            ))}
          </div>,
          document.body
        )}
    </ToastContext.Provider>
  );
}
