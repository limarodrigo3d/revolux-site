import { permanentRedirect } from 'next/navigation';

// Página antiga: a confirmação de pedido agora fica em /obrigado
export default function Page() {
  permanentRedirect('/obrigado');
}
