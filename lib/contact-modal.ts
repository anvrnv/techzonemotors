/** Event name must match `GlobalContactModal` listener. */
export const OPEN_CONTACT_MODAL_EVENT = "open-contact-modal" as const;

export function dispatchOpenContactModal(): void {
  if (typeof window === "undefined") {
    return;
  }
  window.dispatchEvent(new CustomEvent(OPEN_CONTACT_MODAL_EVENT));
}
