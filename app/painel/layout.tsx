import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'Painel de pedidos',
  robots: { index: false, follow: false },
  // Permite instalar o painel como app (iPhone: Compartilhar → Adicionar à Tela de Início)
  manifest: '/painel.webmanifest',
  appleWebApp: { capable: true, title: 'Revolux', statusBarStyle: 'default' },
};

export const viewport: Viewport = { themeColor: '#14213D' };

export default function PainelLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-paper">{children}</div>;
}
