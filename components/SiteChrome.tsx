'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

/** Esconde cabeçalho/rodapé do site público dentro do painel interno. */
export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith('/painel')) return null;
  return <>{children}</>;
}
