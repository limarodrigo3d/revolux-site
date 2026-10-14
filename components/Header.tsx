'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { waLink } from '@/lib/site';
import { WhatsIcon } from './Icones';

const links = [
  { href: '/certificados', label: 'Certificados' },
  { href: '/qual-certificado', label: 'Qual escolher?' },
  { href: '/renovacao', label: 'Renovação' },
  { href: '/duvidas', label: 'Dúvidas' },
  { href: '/sobrenos', label: 'Quem somos' },
];

export default function Header() {
  const [aberto, setAberto] = useState(false);
  const pathname = usePathname();

  useEffect(() => setAberto(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/90 backdrop-blur-md">
      <div className="container-x flex h-16 items-center justify-between md:h-[72px]">
        <Link href="/" className="shrink-0" aria-label="Revolux Certificado Digital, página inicial">
          <Image src="/img/logo.png" alt="Revolux Certificado Digital" width={520} height={145} priority className="h-10 w-auto md:h-11" />
        </Link>

        <nav className="hidden items-center gap-8 text-[15px] font-medium md:flex" aria-label="Principal">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`transition hover:text-carimbo ${pathname.startsWith(l.href) ? 'text-carimbo' : 'text-ink/75'}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={waLink('Olá! Vim pelo site e quero ajuda com um certificado digital.')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wa hidden !px-5 !py-2.5 text-[15px] sm:inline-flex"
          >
            <WhatsIcon /> Falar no WhatsApp
          </a>
          <button
            onClick={() => setAberto((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-xl text-ink md:hidden"
            aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={aberto}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {aberto ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {aberto && (
        <nav className="border-t border-ink/5 bg-white md:hidden" aria-label="Menu móvel">
          <div className="container-x flex flex-col py-3">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="rounded-lg px-2 py-3 text-base font-medium text-ink hover:bg-paper">
                {l.label}
              </Link>
            ))}
            <Link href="/contato" className="rounded-lg px-2 py-3 text-base font-medium text-ink hover:bg-paper">
              Contato
            </Link>
            <a
              href={waLink('Olá! Vim pelo site e quero ajuda com um certificado digital.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa mt-2"
            >
              <WhatsIcon /> Falar no WhatsApp
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
