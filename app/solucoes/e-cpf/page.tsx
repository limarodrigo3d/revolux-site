import PaginaCategoria, { metadataCategoria } from '@/components/PaginaCategoria';

export const metadata = metadataCategoria('e-cpf');

export default function Page() {
  return <PaginaCategoria slug="e-cpf" />;
}
