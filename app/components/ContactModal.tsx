"use client";

import { useState } from "react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="relative w-full max-w-md bg-[#1e1e1e] border border-white/10 rounded-2xl shadow-2xl p-8">
        {/* Close button */}
        <button
          onClick={handleClose}
          aria-label="Закрыть"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 3L13 13M13 3L3 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 13L9 17L19 7"
                  stroke="#22c55e"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="text-white text-xl font-bold mb-2">Заявка принята!</h3>
            <p className="text-zinc-400 text-sm">Мы свяжемся с вами в течение 15 минут.</p>
            <button
              onClick={handleClose}
              className="mt-6 px-6 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-all"
            >
              Закрыть
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <h2 className="text-white text-xl font-bold leading-snug mb-6 pr-6">
              Оставьте свои данные, и мы свяжемся с вами в течение 15 минут
            </h2>

            {/* Name */}
            <div className="mb-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Имя"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-white/30 transition-all"
              />
            </div>

            {/* Phone */}
            <div className="mb-6">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Номер телефона"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-white/30 transition-all"
              />
            </div>

            {/* Checkboxes */}
            <div className="flex flex-col gap-3 mb-6">
              <label className="flex items-start gap-3 cursor-pointer group">
                <button
                  type="button"
                  onClick={() => setPrivacyChecked((v) => !v)}
                  className={`mt-0.5 w-5 h-5 rounded-md border flex-shrink-0 flex items-center justify-center transition-all ${
                    privacyChecked
                      ? "bg-white border-white"
                      : "bg-transparent border-white/30 group-hover:border-white/60"
                  }`}
                  aria-checked={privacyChecked}
                  role="checkbox"
                >
                  {privacyChecked && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6L5 9L10 3"
                        stroke="#000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
                <span className="text-zinc-400 text-sm leading-snug group-hover:text-zinc-300 transition-colors select-none">
                  Я согласен с{" "}
                  <a
                    href="/privacy"
                    className="text-white/70 hover:text-white underline underline-offset-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    политикой конфиденциальности
                  </a>
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <button
                  type="button"
                  onClick={() => setConsentChecked((v) => !v)}
                  className={`mt-0.5 w-5 h-5 rounded-md border flex-shrink-0 flex items-center justify-center transition-all ${
                    consentChecked
                      ? "bg-white border-white"
                      : "bg-transparent border-white/30 group-hover:border-white/60"
                  }`}
                  aria-checked={consentChecked}
                  role="checkbox"
                >
                  {consentChecked && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6L5 9L10 3"
                        stroke="#000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
                <span className="text-zinc-400 text-sm leading-snug group-hover:text-zinc-300 transition-colors select-none">
                  Согласие на обработку{" "}
                  <a
                    href="/consent"
                    className="text-white/70 hover:text-white underline underline-offset-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    персональных данных
                  </a>
                </span>
              </label>
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-400 text-xs mb-4 leading-snug">{error}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={!canSubmit || isLoading}
              className={`w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                canSubmit && !isLoading
                  ? "bg-white text-black hover:bg-white/90 active:scale-[0.98] cursor-pointer"
                  : "bg-white/10 text-white/30 cursor-not-allowed"
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
