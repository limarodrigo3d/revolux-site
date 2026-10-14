import Link from 'next/link';
import type { Metadata } from 'next';
import { CATEGORIAS } from '@/lib/catalogo';
import { SEGMENTOS } from '@/lib/segmentos';
import { FAQ } from '@/lib/faq';
import { SITE, brl, waLink } from '@/lib/site';
import { CtaFinal, FaqLista, JsonLd, Passos, faqJsonLd } from '@/components/Blocos';
import { Check, WhatsIcon } from '@/components/Icones';
import { CertificadoDoc, Guilhoche } from '@/components/Documento';
import { ConversaIlustracao } from '@/components/Ilustracoes';
import { AvaliacoesGoogle, SelosConfianca } from '@/components/Confianca';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

const antes = ['Pegar senha e esperar ser chamado', 'Ir até um posto em horário comercial', 'Voltar outro dia porque faltou um papel', 'Instalar sozinho e torcer para funcionar'];
const agora = [
  'Compra pelo site, no Pix ou no cartão',
  'Videochamada no dia e horário que você escolher',
  'Documentos conferidos antes, pelo WhatsApp',
  'A gente instala e testa junto com você',
];

const vias = [
  { slug: 'e-cpf', titulo: 'Para você', quem: 'e-CPF, pessoa física', uso: 'Imposto de Renda, e-CAC, gov.br, contratos', grande: true },
  { slug: 'e-cnpj', titulo: 'Para sua empresa ou MEI', quem: 'e-CNPJ, pessoa jurídica', uso: 'Nota fiscal, eSocial, Receita Federal', grande: true },
  { slug: 'nfe-cte', titulo: 'Para emitir notas', quem: 'NF-e e CT-e', uso: 'Lojas, indústrias e transportadoras', grande: false },
  { slug: 'bird-id-pf', titulo: 'No celular, sem token', quem: 'Bird ID, na nuvem', uso: 'Receitas digitais e assinaturas', grande: false },
];

export default function Home() {
  const precoMin = (slug: string) => Math.min(...CATEGORIAS.find((c) => c.slug === slug)!.produtos.map((p) => p.preco));
  const faqHome = FAQ.slice(0, 6);

  return (
    <>
      <JsonLd data={faqJsonLd(faqHome)} />

      {/* TOPO: o certificado sendo carimbado */}
      <section className="papel relative overflow-hidden">
        <div className="container-x relative grid items-center gap-14 pb-20 pt-10 md:pt-16 lg:grid-cols-[1.15fr_.85fr] lg:pb-28">
          <div className="min-w-0">
            <p
              className="inline-flex items-center gap-3 rounded-full border-2 border-selo bg-white px-5 py-2.5 font-display text-lg font-bold text-selo shadow-card md:text-2xl"
              style={{ fontStretch: '105%' }}
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0 md:h-7 md:w-7" fill="currentColor" aria-hidden="true">
                <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
              </svg>
              Atendemos todo o Brasil
            </p>
            <p className="mt-2 pl-1 text-[15px] text-ink/60">do Oiapoque ao Chuí, sem sair de casa</p>
            <h1 className="display mt-6 text-[2.65rem] sm:text-7xl lg:text-[5.6rem]">Certificado digital sem balcão.</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/75 md:text-xl">
              e-CPF, e-CNPJ e Bird ID emitidos por videochamada, de qualquer cidade do país. Você compra aqui e uma pessoa de verdade cuida do resto com você.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/certificados" className="btn-primary px-8 py-4 text-[17px]">
                Escolher meu certificado
              </Link>
              <a
                href={waLink('Olá! Vim pelo site e quero ajuda para escolher meu certificado digital.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline px-8 py-4 text-[17px]"
              >
                <WhatsIcon className="h-5 w-5 text-[#1EBE5A]" /> Tirar dúvida no WhatsApp
              </a>
            </div>
            <p className="mt-6 text-[15px] text-ink/60">A partir de {brl(149.9)}, no Pix ou no cartão.</p>
          </div>

          <div className="min-w-0 pb-8 lg:pb-0">
            <CertificadoDoc />
          </div>
        </div>
      </section>

      <SelosConfianca />

      {/* ANTES x AGORA */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-x">
          <h2 className="display max-w-3xl text-4xl md:text-6xl">Tiramos o balcão do caminho.</h2>
          <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <p className="campo text-[14px]">Do jeito antigo</p>
              <ul className="mt-5 space-y-5">
                {antes.map((t) => (
                  <li key={t} className="text-xl text-ink/45 line-through decoration-carimbo decoration-[3px] md:text-2xl">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="campo text-[14px] text-selo">Com a Revolux</p>
              <ul className="mt-5 space-y-5">
                {agora.map((t) => (
                  <li key={t} className="flex gap-3 text-xl font-semibold md:text-2xl">
                    <Check className="mt-1.5 h-6 w-6 shrink-0 text-selo" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* AS VIAS */}
      <section className="papel py-20 md:py-28">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="display max-w-2xl text-4xl md:text-6xl">Qual é a sua via?</h2>
            <p className="max-w-sm text-ink/70">
              Cada certificado serve para uma coisa. Escolha pelo uso.{' '}
              <Link href="/qual-certificado" className="font-semibold text-carimbo underline decoration-2 underline-offset-4">
                Em dúvida? Faça o teste de 3 perguntas.
              </Link>
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {vias.map((v) => (
              <Link
                key={v.slug}
                href={`/solucoes/${v.slug}`}
                className={`picote group relative flex flex-col justify-between bg-white px-6 pb-6 pt-9 shadow-card transition hover:-translate-y-1 hover:shadow-lift ${v.grande ? 'md:min-h-[300px]' : ''}`}
              >
                <div>
                  <p className="campo">{v.quem}</p>
                  <h3 className={`mt-2 font-extrabold ${v.grande ? 'text-3xl md:text-[2.6rem]' : 'text-2xl md:text-3xl'}`}>{v.titulo}</h3>
                  <p className="mt-3 text-ink/65">{v.uso}</p>
                </div>
                <div className="mt-8 flex items-end justify-between border-t border-dashed border-ink/20 pt-4">
                  <p>
                    <span className="campo block">a partir de</span>
                    <span className="font-display text-3xl font-extrabold tabular-nums" style={{ fontStretch: '110%' }}>
                      {brl(precoMin(v.slug))}
                    </span>
                  </p>
                  <span className="rounded-full border-[1.5px] border-ink/20 px-4 py-2 text-sm font-semibold transition group-hover:border-carimbo group-hover:bg-carimbo group-hover:text-white">
                    Ver modelos
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PROTOCOLO */}
      <section className="relative overflow-hidden bg-ink py-20 text-white md:py-28">
        <Guilhoche className="pointer-events-none absolute -left-40 -top-40 h-[34rem] w-[34rem] text-white/[.06]" />
        <div className="container-x relative">
          <h2 className="display max-w-3xl text-4xl text-white md:text-6xl">Quatro passos, nenhum deslocamento.</h2>
          <div className="mt-16">
            <Passos escuro />
          </div>
        </div>
      </section>

      {/* ATENDIMENTO */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <div>
            <h2 className="display text-4xl md:text-6xl">Do outro lado, uma pessoa.</h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink/75">
              Somos três irmãos com mais de {SITE.anosExperiencia} anos em certificação digital. Quem atende o seu pedido acompanha você até o certificado funcionar no
              seu computador, no seu emissor de nota ou no seu celular.
            </p>
            <ul className="mt-8 space-y-3">
              {['Conferimos os documentos antes da chamada', 'Ajudamos na instalação e no primeiro uso', 'Avisamos antes do seu certificado vencer'].map((t) => (
                <li key={t} className="flex gap-3 text-lg">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-selo" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <ConversaIlustracao />
        </div>
      </section>

      <AvaliacoesGoogle />

      {/* PARA QUEM */}
      <section className="papel border-y border-ink/10 py-16">
        <div className="container-x">
          <p className="max-w-4xl font-display text-2xl font-bold leading-snug md:text-4xl" style={{ fontStretch: '105%' }}>
            Atendemos todo mundo, e conhecemos de perto a rotina de{' '}
            {SEGMENTOS.map((s, i) => (
              <span key={s.slug}>
                <Link href={`/para/${s.slug}`} className="text-carimbo underline decoration-2 underline-offset-[6px] hover:decoration-4">
                  {s.slug === 'mei' ? 'MEI' : s.menu.toLowerCase()}
                </Link>
                {i < SEGMENTOS.length - 2 ? ', ' : i === SEGMENTOS.length - 2 ? ' e ' : '.'}
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* DÚVIDAS */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <h2 className="display text-4xl md:text-5xl">Perguntas de quem está começando</h2>
            <p className="mt-5 text-ink/70">Não achou a sua? Pergunte no WhatsApp.</p>
            <Link href="/duvidas" className="mt-6 inline-block font-semibold text-carimbo underline decoration-2 underline-offset-4">
              Ver todas as dúvidas
            </Link>
          </div>
          <FaqLista itens={faqHome} />
        </div>
      </section>

      <CtaFinal />
    </>
  );
}
