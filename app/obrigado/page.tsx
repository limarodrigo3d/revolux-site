import type { Metadata } from 'next';
import StatusPedido from '@/components/StatusPedido';

export const metadata: Metadata = {
  title: 'Pedido confirmado',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <StatusPedido tipo="sucesso" />;
}
