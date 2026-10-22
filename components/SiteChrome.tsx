'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

/** Esconde cabeçalho/rodapé do site público no painel interno e na página de links da bio. */
export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith('/painel') || pathname === '/links') return null;
  return <>{children}</>;
}
