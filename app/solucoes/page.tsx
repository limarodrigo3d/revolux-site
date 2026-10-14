import { permanentRedirect } from 'next/navigation';

// Página antiga: agora tudo fica em /certificados
export default function Page() {
  permanentRedirect('/certificados');
}
