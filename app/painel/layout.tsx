import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Painel de pedidos',
  robots: { index: false, follow: false },
};

export default function PainelLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-paper">{children}</div>;
}
