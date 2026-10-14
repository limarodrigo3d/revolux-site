import PaginaCategoria, { metadataCategoria } from '@/components/PaginaCategoria';

export const metadata = metadataCategoria('bird-id-pj');

export default function Page() {
  return <PaginaCategoria slug="bird-id-pj" />;
}
