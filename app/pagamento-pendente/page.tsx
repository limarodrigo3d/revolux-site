import type { Metadata } from 'next';
import StatusPedido from '@/components/StatusPedido';

export const metadata: Metadata = {
  title: 'Pagamento em análise',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <StatusPedido tipo="pendente" />;
}
