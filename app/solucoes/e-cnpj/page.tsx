import PaginaCategoria, { metadataCategoria } from '@/components/PaginaCategoria';

export const metadata = metadataCategoria('e-cnpj');

export default function Page() {
  return <PaginaCategoria slug="e-cnpj" />;
}
