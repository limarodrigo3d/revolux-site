import PaginaCategoria, { metadataCategoria } from '@/components/PaginaCategoria';

export const metadata = metadataCategoria('bird-id-pf');

export default function Page() {
  return <PaginaCategoria slug="bird-id-pf" />;
}
