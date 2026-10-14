'use client';

import { usePathname } from 'next/navigation';
import { waLink } from '@/lib/site';
import { WhatsIcon } from './Icones';

// Botão flutuante leve (SVG, ~1 KB) no lugar da imagem PNG de 1,5 MB
export default function WhatsappButton() {
  const pathname = usePathname();
  if (pathname.startsWith('/checkout')) return null;

  return (
    <a
      href={waLink('Olá! Vim pelo site e quero ajuda com um certificado digital.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chamar no WhatsApp"
      className="group fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-wa p-3.5 text-white shadow-lift transition hover:bg-wa-600 md:bottom-6 md:right-6 md:px-5"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-wa/40 [animation-duration:2.5s]" aria-hidden="true" />
      <WhatsIcon className="h-7 w-7" />
      <span className="hidden font-semibold md:inline">Dúvidas? Fale agora</span>
    </a>
  );
}
