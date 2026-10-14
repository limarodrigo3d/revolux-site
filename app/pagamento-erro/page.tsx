import type { Metadata } from 'next';
import StatusPedido from '@/components/StatusPedido';

export const metadata: Metadata = {
  title: 'Pagamento não concluído',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <StatusPedido tipo="erro" />;
}
