'use client';

import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

export default function WhatsappButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <Link
        href="https://wa.me/553235328411"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale conosco pelo WhatsApp"
        title="Fale conosco pelo WhatsApp"
        className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 flex items-center justify-center hover:scale-110"
      >
        <MessageCircle size={28} />
      </Link>
    </div>
  );
}
