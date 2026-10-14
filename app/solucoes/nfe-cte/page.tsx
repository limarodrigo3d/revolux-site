import PaginaCategoria, { metadataCategoria } from '@/components/PaginaCategoria';

export const metadata = metadataCategoria('nfe-cte');

export default function Page() {
  return <PaginaCategoria slug="nfe-cte" />;
}
