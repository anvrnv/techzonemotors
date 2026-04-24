"use client";

import { useState } from "react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const primaryFill =
  "bg-primary text-primary-foreground shadow-sm hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/60";
const secondaryOutline =
  "border border-border bg-card text-foreground shadow-sm hover:bg-card-raised focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/50";

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const canSubmit = privacyChecked && consentChecked && name.trim().length > 0 && phone.trim().length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError("Пожалуйста, заполните все поля.");
      return;
    }
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
      } else {
        setError(data.error || "Не удалось отправить заявку. Попробуйте позже.");
      }
    } catch {
      setError("Не удалось отправить заявку. Попробуйте позже.");
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
    setIsLoading(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-overlay-scrim p-4 backdrop-blur-[6px]"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-floating">
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
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
              <svg
                className="text-accent"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
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
              className={`mt-6 inline-flex rounded-full px-6 py-2.5 text-sm font-semibold transition-all active:scale-[0.98] ${secondaryOutline}`}
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
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Имя"
                className="w-full rounded-xl border border-border bg-card-raised px-4 py-3 text-sm text-foreground placeholder:text-foreground-subtle focus-visible:border-border-strong focus-visible:ring-2 focus-visible:ring-ring/25 focus:outline-none"
              />
            </div>

            <div className="mb-6">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Номер телефона"
                className="w-full rounded-xl border border-border bg-card-raised px-4 py-3 text-sm text-foreground placeholder:text-foreground-subtle focus-visible:border-border-strong focus-visible:ring-2 focus-visible:ring-ring/25 focus:outline-none"
              />
            </div>

            <div className="mb-6 flex flex-col gap-3">
              <label className="group flex cursor-pointer items-start gap-3">
                <button
                  type="button"
                  onClick={() => setPrivacyChecked((v) => !v)}
                  className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/50 ${
                    privacyChecked
                      ? "border-primary bg-primary"
                      : "border-border bg-transparent group-hover:border-border-strong"
                  }`}
                  aria-checked={privacyChecked}
                  role="checkbox"
                >
                  {privacyChecked && (
                    <svg
                      className="text-primary-foreground"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M2 6L5 9L10 3"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
                <span className="select-none text-sm leading-snug text-foreground-muted group-hover:text-foreground transition-colors">
                  Я согласен с{" "}
                  <a
                    href="/privacy"
                    className="text-foreground underline underline-offset-2 transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/50"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    политикой конфиденциальности
                  </a>
                </span>
              </label>

              <label className="group flex cursor-pointer items-start gap-3">
                <button
                  type="button"
                  onClick={() => setConsentChecked((v) => !v)}
                  className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/50 ${
                    consentChecked
                      ? "border-primary bg-primary"
                      : "border-border bg-transparent group-hover:border-border-strong"
                  }`}
                  aria-checked={consentChecked}
                  role="checkbox"
                >
                  {consentChecked && (
                    <svg
                      className="text-primary-foreground"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M2 6L5 9L10 3"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
                <span className="select-none text-sm leading-snug text-foreground-muted group-hover:text-foreground transition-colors">
                  Согласие на обработку{" "}
                  <a
                    href="/consent"
                    className="text-foreground underline underline-offset-2 transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/50"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    персональных данных
                  </a>
                </span>
              </label>
            </div>

            {error && (
              <p className="mb-4 text-xs leading-snug text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={!canSubmit || isLoading}
              className={`w-full rounded-xl py-3 text-sm font-semibold transition-all duration-200 ${
                canSubmit && !isLoading
                  ? `cursor-pointer active:scale-[0.98] ${primaryFill}`
                  : "cursor-not-allowed bg-card-muted text-foreground-subtle"
              }`}
            >
              {isLoading ? "Отправка..." : "Свяжитесь со мной"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
