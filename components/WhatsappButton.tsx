'use client'

import Link from 'next/link'
import { MessageCircle } from 'lucide-react'

export default function WhatsappButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link
        href="https://wa.me/553235328411"
        target="_blank"
        aria-label="Fale conosco pelo WhatsApp"
        className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition duration-300 flex items-center justify-center"
      >
        <MessageCircle size={28} />
      </Link>
    </div>
  )
}
