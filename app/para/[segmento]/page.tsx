import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CtaFinal, FaqLista, JsonLd, Passos, ProdutoCard, TopoPagina, faqJsonLd } from '@/components/Blocos';
import { Check, WhatsIcon } from '@/components/Icones';
import { getProduto } from '@/lib/catalogo';
import { FAQ } from '@/lib/faq';
import { SEGMENTOS, getSegmento } from '@/lib/segmentos';
import { waLink } from '@/lib/site';

type Props = { params: Promise<{ segmento: string }> };

export function generateStaticParams() {
  return SEGMENTOS.map((s) => ({ segmento: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getSegmento((await params).segmento);
  if (!s) return {};
  return {
    title: s.seoTitulo,
    description: s.seoDescricao,
    alternates: { canonical: `/para/${s.slug}` },
    openGraph: { title: s.seoTitulo, description: s.seoDescricao, url: `/para/${s.slug}` },
  };
}

export default async function SegmentoPage({ params }: Props) {
  const s = getSegmento((await params).segmento);
  if (!s) notFound();
  const produtos = s.recomendados.map(getProduto).filter((p) => p !== undefined);
  const faq = FAQ.slice(0, 4);

  return (
    <>
      <JsonLd data={faqJsonLd(faq)} />
      <TopoPagina eyebrow={`Para ${s.slug === 'mei' ? 'MEI' : s.menu.toLowerCase()}`} titulo={s.titulo} sub={s.sub}>
        <a href={waLink(s.ctaWhats)} target="_blank" rel="noopener noreferrer" className="btn-primary px-7 py-4 text-base">
          <WhatsIcon /> Falar com especialista
        </a>
      </TopoPagina>

      <section className="py-14 md:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <h2 className="text-2xl font-extrabold md:text-3xl">Para que você vai usar</h2>
            <ul className="mt-6 space-y-3">
              {s.usos.map((u) => (
                <li key={u} className="flex gap-3 text-lg">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-selo" /> {u}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold md:text-3xl">Recomendados para você</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {produtos.map((p) => (
                <ProdutoCard key={p.id} p={{ ...p, destaque: p.id === s.recomendados[0] }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper py-14 md:py-20">
        <div className="container-x">
          <h2 className="text-2xl font-extrabold md:text-3xl">Como funciona</h2>
          <div className="mt-8">
            <Passos />
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-x max-w-3xl">
          <h2 className="mb-8 text-2xl font-extrabold md:text-3xl">Dúvidas frequentes</h2>
          <FaqLista itens={faq} />
        </div>
      </section>

      <CtaFinal msg={s.ctaWhats} />
    </>
  );
}
