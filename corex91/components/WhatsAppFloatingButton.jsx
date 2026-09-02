"use client";

import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

export default function WhatsAppFloatingButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 left-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-opacity hover:opacity-90"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={26} fill="white" strokeWidth={0} />
    </a>
  );
}
