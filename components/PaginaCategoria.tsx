import type { Metadata } from 'next';
import Link from 'next/link';
import { getCategoria, nomeCompleto } from '@/lib/catalogo';
import { FAQ } from '@/lib/faq';
import { SITE, waLink } from '@/lib/site';
import { CtaFinal, FaqLista, JsonLd, Passos, ProdutoCard, TopoPagina, faqJsonLd } from './Blocos';
import { Check, WhatsIcon } from './Icones';

export function metadataCategoria(slug: string): Metadata {
  const c = getCategoria(slug)!;
  return {
    title: c.seoTitulo,
    description: c.seoDescricao,
    alternates: { canonical: `/solucoes/${slug}` },
    openGraph: { title: c.seoTitulo, description: c.seoDescricao, url: `/solucoes/${slug}` },
  };
}

export default function PaginaCategoria({ slug }: { slug: string }) {
  const c = getCategoria(slug)!;
  const faq = FAQ.filter((f) => ['videoconferencia', 'documentos', slug.startsWith('bird') ? 'bird-id' : 'a1-ou-a3', 'prazo'].includes(f.id || ''));

  const produtosLd = c.produtos.map((p) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `Certificado Digital ${nomeCompleto(p)}`,
    description: c.seoDescricao,
    brand: { '@type': 'Brand', name: 'Revolux' },
    offers: {
      '@type': 'Offer',
      price: p.preco.toFixed(2),
      priceCurrency: 'BRL',
      availability: 'https://schema.org/InStock',
      url: `${SITE.url}/solucoes/${slug}`,
      areaServed: 'BR',
    },
  }));

  return (
    <>
      <JsonLd data={produtosLd} />
      <JsonLd data={faqJsonLd(faq)} />

      <TopoPagina eyebrow={c.tag} titulo={c.titulo} sub={c.resumo}>
        <ul className="flex flex-wrap gap-2">
          {c.usos.map((u) => (
            <li key={u} className="rounded-full border-[1.5px] border-ink/15 bg-white px-3.5 py-1.5 text-sm font-medium text-ink">
              {u}
            </li>
          ))}
        </ul>
      </TopoPagina>

      <section className="bg-paper py-14 md:py-20">
        <div className="container-x">
          <h2 className="text-2xl font-extrabold md:text-3xl">Escolha o seu modelo</h2>
          <p className="mt-2 text-ink/60">Preço final, sem taxa escondida. A validação por videoconferência já está inclusa.</p>
          <div className={`mt-10 grid gap-6 ${c.produtos.length >= 3 ? 'md:grid-cols-3' : c.produtos.length === 2 ? 'md:grid-cols-2 md:max-w-3xl' : 'md:max-w-sm'}`}>
            {c.produtos.map((p) => (
              <ProdutoCard key={p.id} p={p} />
            ))}
          </div>
          <div className="mt-8 flex flex-col items-start gap-3 rounded-2xl border border-ink/10 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-ink/70">
              <strong className="text-ink">Ficou na dúvida entre os modelos?</strong> Te ajudamos a escolher em 1 minuto.
            </p>
            <a
              href={waLink(`Olá! Estou vendo o ${c.nome} no site e queria ajuda para escolher o modelo.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa shrink-0"
            >
              <WhatsIcon /> Perguntar no WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-x grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-extrabold md:text-3xl">Para quem é</h2>
            <ul className="mt-6 space-y-3">
              {c.paraQuem.map((q) => (
                <li key={q} className="flex gap-3 text-lg">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-selo" /> {q}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-ink p-8 text-white">
            <h2 className="text-2xl font-extrabold">Tudo pela internet</h2>
            <p className="mt-3 text-white/70">
              Você não precisa ir a nenhum lugar. Atendemos clientes de todos os estados com validação por vídeo e suporte pelo WhatsApp.
            </p>
            <Link href="/duvidas" className="mt-6 inline-block font-semibold text-carimbo-300 underline underline-offset-4">
              Ver dúvidas frequentes
            </Link>
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
          <h2 className="mb-8 text-2xl font-extrabold md:text-3xl">Dúvidas sobre o {c.nome}</h2>
          <FaqLista itens={faq} />
        </div>
      </section>

      <CtaFinal msg={`Olá! Quero emitir o ${c.nome}. Pode me ajudar?`} />
    </>
  );
}
