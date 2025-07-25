'use client';

import Link from 'next/link';

export default function WhatsappButton() {
  return (
    <Link
      href="https://wa.me/553235328411" // substitua pelo seu número completo
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chamar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 cursor-pointer"
    >
      <img
        src="/whatsapp-btn.png"
        alt="Chamar no WhatsApp"
        className="w-40 md:w-48 lg:w-52"
        draggable={false}
      />
    </Link>
  );
}
