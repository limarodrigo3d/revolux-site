import { permanentRedirect } from 'next/navigation';

// Conteúdo de suporte agora está em /duvidas
export default function Page() {
  permanentRedirect('/duvidas#instalacao');
}
