"use client";

import { useEffect, useRef, useState } from "react";
import { useToast } from "./Toast";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FOCUSABLE =
  'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { showToast } = useToast();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !dialogRef.current) return;
    const el = dialogRef.current;
    const focusable = () => Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE));
    const trapFocus = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const items = focusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    el.addEventListener("keydown", trapFocus);
    focusable()[0]?.focus();
    return () => el.removeEventListener("keydown", trapFocus);
  }, [isOpen]);

  if (!isOpen) return null;

  const canSubmit = privacyChecked && consentChecked && name.trim().length > 0 && phone.trim().length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;
    if (!name.trim()) {
      setNameError("Пожалуйста, введите имя.");
      hasError = true;
    }
    if (!phone.trim()) {
      setPhoneError("Пожалуйста, введите номер телефона.");
      hasError = true;
    }
    if (hasError) return;
    if (!privacyChecked || !consentChecked) {
      setError("Необходимо принять оба согласия для отправки заявки.");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone }),
      });
      const data = await res.json();
      if (res.ok && data.ok === true) {
        setSubmitted(true);
        showToast("Заявка принята! Свяжемся в течение 15 минут", "success");
      } else {
        setError(data.error || "Не удалось отправить заявку. Попробуйте позже.");
        showToast("Не удалось отправить. Попробуйте позже.", "error");
      }
    } catch {
      setError("Не удалось отправить заявку. Попробуйте позже.");
      showToast("Не удалось отправить. Попробуйте позже.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setName("");
    setPhone("");
    setPrivacyChecked(false);
    setConsentChecked(false);
    setSubmitted(false);
    setError("");
    setNameError("");
    setPhoneError("");
    setIsLoading(false);
    onClose();
  };

  return (
    <div
      className="modal-overlay-enter fixed inset-0 z-[100] flex items-center justify-center bg-overlay-scrim p-4 backdrop-blur-[6px]"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-label="Форма заявки" className="modal-content-enter relative w-full max-w-[560px] rounded-[24px] border border-border bg-card p-5 shadow-floating sm:p-8">
        {/* Close button */}
        <button
          onClick={handleClose}
          aria-label="Закрыть"
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full text-foreground-subtle transition-all hover:bg-card-raised hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/50"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M3 3L13 13M13 3L3 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {submitted ? (
          <div className="py-6 text-center">
            <div
              className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full"
              style={{ background: 'var(--color-primary-soft)', border: '1px solid var(--color-primary)' }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
                style={{ color: 'var(--color-primary)' }}
              >
                <path
                  d="M5 13L9 17L19 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-foreground">Заявка принята!</h3>
            <p className="text-sm text-foreground-muted">Мы свяжемся с вами в течение 15 минут.</p>
            <button
              onClick={handleClose}
              type="button"
              className="btn-secondary mt-6"
            >
              Закрыть
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <h2 className="mb-6 pr-6 text-xl font-bold leading-snug text-foreground">
              Оставьте свои данные, и мы свяжемся с вами в течение 15 минут
            </h2>

            <div className="mb-4">
              <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                Имя
              </label>
              <input
                id="contact-name"
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); if (nameError) setNameError(""); }}
                placeholder="Ваше имя"
                aria-invalid={nameError ? "true" : undefined}
                aria-describedby={nameError ? "contact-name-error" : undefined}
                className="ui-input"
              />
              {nameError && (
                <p id="contact-name-error" role="alert" className="mt-1 text-xs" style={{ color: 'var(--color-error)' }}>
                  {nameError}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="contact-phone" className="mb-1.5 block text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                Телефон
              </label>
              <input
                id="contact-phone"
                type="tel"
                value={phone}
                onChange={(e) => { setPhone(e.target.value); if (phoneError) setPhoneError(""); }}
                placeholder="+7 (___) ___-__-__"
                aria-invalid={phoneError ? "true" : undefined}
                aria-describedby={phoneError ? "contact-phone-error" : undefined}
                className="ui-input"
              />
              {phoneError && (
                <p id="contact-phone-error" role="alert" className="mt-1 text-xs" style={{ color: 'var(--color-error)' }}>
                  {phoneError}
                </p>
              )}
            </div>

            <div className="mb-6 flex flex-col gap-3">
              <label className="group flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={privacyChecked}
                  onChange={(e) => setPrivacyChecked(e.target.checked)}
                  className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded-md border"
                  style={{ borderColor: 'var(--checkbox-border)', accentColor: 'var(--checkbox-checked-bg)' }}
                />
                <span className="select-none text-sm leading-snug transition-colors" style={{ color: 'var(--color-text-muted)' }}>
                  Я согласен с{" "}
                  <a
                    href="/privacy"
                    className="underline underline-offset-2 transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/50"
                    style={{ color: 'var(--color-text)' }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    политикой конфиденциальности
                  </a>
                </span>
              </label>

              <label className="group flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={consentChecked}
                  onChange={(e) => setConsentChecked(e.target.checked)}
                  className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded-md border"
                  style={{ borderColor: 'var(--checkbox-border)', accentColor: 'var(--checkbox-checked-bg)' }}
                />
                <span className="select-none text-sm leading-snug transition-colors" style={{ color: 'var(--color-text-muted)' }}>
                  Согласие на обработку{" "}
                  <a
                    href="/consent"
                    className="underline underline-offset-2 transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/50"
                    style={{ color: 'var(--color-text)' }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    персональных данных
                  </a>
                </span>
              </label>
            </div>

            {error && (
              <p className="mb-4 text-xs leading-snug" style={{ color: 'var(--color-error)' }}>{error}</p>
            )}

            <button
              type="submit"
              disabled={!canSubmit || isLoading}
              aria-disabled={isLoading}
              className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
              ) : (
                "Свяжитесь со мной"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
