import type { Metadata } from 'next';
import Link from 'next/link';
import { CATEGORIAS } from '@/lib/catalogo';
import { CtaFinal, ProdutoCard, TopoPagina } from '@/components/Blocos';

export const metadata: Metadata = {
  title: 'Preços de Certificado Digital e-CPF, e-CNPJ, A1, A3 e Bird ID',
  description:
    'Veja os preços de todos os certificados digitais: e-CPF a partir de R$ 149,90, e-CNPJ, NF-e/CT-e e Bird ID em nuvem. Emissão por videoconferência para todo o Brasil.',
  alternates: { canonical: '/certificados' },
};

export default function CertificadosPage() {
  return (
    <>
      <TopoPagina
        eyebrow="Certificados e preços"
        titulo="Escolha o certificado ideal"
        sub="Preço final, validação por videoconferência inclusa e ajuda na instalação. Compre agora e agende no horário que preferir."
      >
        <nav className="flex flex-wrap gap-2" aria-label="Ir para categoria">
          {CATEGORIAS.map((c) => (
            <a key={c.slug} href={`#${c.slug}`} className="rounded-full border-[1.5px] border-ink/15 bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:border-carimbo hover:bg-carimbo hover:text-white">
              {c.nome}
            </a>
          ))}
        </nav>
      </TopoPagina>

      <div className="bg-paper">
        {CATEGORIAS.map((c, i) => (
          <section key={c.slug} id={c.slug} className={`scroll-mt-20 py-14 md:py-16 ${i > 0 ? 'border-t border-ink/10' : ''}`}>
            <div className="container-x">
              <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
                <div>
                  <p className="eyebrow">{c.tag}</p>
                  <h2 className="mt-1 text-3xl font-extrabold">{c.titulo}</h2>
                  <p className="mt-2 max-w-2xl text-ink/65">{c.resumo}</p>
                </div>
                <Link href={`/solucoes/${c.slug}`} className="inline-flex shrink-0 items-center gap-2 font-semibold text-carimbo hover:underline">
                  Saiba mais
                </Link>
              </div>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {c.produtos.map((p) => (
                  <ProdutoCard key={p.id} p={p} />
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      <CtaFinal titulo="Não sabe qual escolher? A gente te indica." msg="Olá! Não sei qual certificado preciso. Pode me ajudar a escolher?" />
    </>
  );
}
