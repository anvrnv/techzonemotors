"use client";

import { useState, useEffect } from "react";

import { OPEN_CONTACT_MODAL_EVENT } from "@/lib/contact-modal";

import ContactModal from "./ContactModal";

export default function GlobalContactModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener(OPEN_CONTACT_MODAL_EVENT, handler);
    return () => window.removeEventListener(OPEN_CONTACT_MODAL_EVENT, handler);
  }, []);

  return <ContactModal isOpen={isOpen} onClose={() => setIsOpen(false)} />;
}
