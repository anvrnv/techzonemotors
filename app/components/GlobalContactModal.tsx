"use client";

import { useState, useEffect } from "react";
import ContactModal from "./ContactModal";

export default function GlobalContactModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener("open-contact-modal", handler);
    return () => window.removeEventListener("open-contact-modal", handler);
  }, []);

  return <ContactModal isOpen={isOpen} onClose={() => setIsOpen(false)} />;
}
