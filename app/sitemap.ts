import type { MetadataRoute } from 'next';
import { CATEGORIAS } from '@/lib/catalogo';
import { SEGMENTOS } from '@/lib/segmentos';
import { SITE } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const agora = new Date();
  const rotas: [string, number][] = [
    ['/', 1],
    ['/certificados', 0.9],
    ...CATEGORIAS.map((c) => [`/solucoes/${c.slug}`, 0.9] as [string, number]),
    ...SEGMENTOS.map((s) => [`/para/${s.slug}`, 0.8] as [string, number]),
    ['/qual-certificado', 0.8],
    ['/renovacao', 0.8],
    ['/duvidas', 0.7],
    ['/sobrenos', 0.5],
    ['/contato', 0.5],
    ['/politica-de-privacidade', 0.2],
  ];
  return rotas.map(([path, priority]) => ({ url: `${SITE.url}${path}`, lastModified: agora, priority }));
}
