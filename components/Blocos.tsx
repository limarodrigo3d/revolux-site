import Link from 'next/link';
import type { ReactNode } from 'react';
import { brl, waLink } from '@/lib/site';
import type { Produto } from '@/lib/catalogo';
import type { Pergunta } from '@/lib/faq';
import { Check, WhatsIcon } from './Icones';
import { Carimbo, Guilhoche } from './Documento';

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

/** Topo das páginas internas: papel de segurança com guilhoché */
export function TopoPagina({ eyebrow, titulo, sub, children }: { eyebrow?: string; titulo: ReactNode; sub?: ReactNode; children?: ReactNode }) {
  return (
    <section className="papel relative overflow-hidden border-b border-ink/10">
      <Guilhoche className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 text-selo/30 md:-right-10" />
      <div className="container-x relative py-12 md:py-20">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="display mt-3 max-w-4xl text-[2.6rem] sm:text-6xl md:text-7xl">{titulo}</h1>
        {sub && <p className="mt-6 max-w-2xl text-lg text-ink/70 md:text-xl">{sub}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}

/** Produto como uma “via” de documento, com picote no topo */
export function ProdutoCard({ p }: { p: Produto }) {
  return (
    <article className={`picote relative flex flex-col bg-white px-6 pb-6 pt-8 shadow-card ${p.destaque ? 'ring-[1.5px] ring-carimbo' : ''}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="campo">{p.midia}</p>
          <h3 className="mt-1 text-2xl font-extrabold">{p.nome}</h3>
        </div>
        {p.destaque && <span className="shrink-0 rounded-full bg-carimbo px-3 py-1 text-xs font-bold text-white">Recomendado</span>}
      </div>

      <div className="mt-6 border-y border-dashed border-ink/20 py-4">
        <p className="campo">Valor final</p>
        <p className="font-display text-[2.6rem] font-extrabold leading-none tabular-nums" style={{ fontStretch: '110%' }}>
          {brl(p.preco)}
        </p>
        <p className="mt-2 text-sm text-ink/60">
          {p.precoOriginal ? (
            <>
              de <s>{brl(p.precoOriginal)}</s>, no Pix ou cartão
            </>
          ) : (
            'No Pix ou cartão de crédito'
          )}
        </p>
      </div>

      <ul className="mt-5 space-y-2.5 text-[15px]">
        {p.itens.map((i) => (
          <li key={i} className="flex gap-2.5">
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-selo" />
            {i}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-7">
        <Link href={`/checkout?p=${p.id}`} className={`w-full ${p.destaque ? 'btn-primary' : 'btn-navy'}`}>
          Comprar {p.nome}
        </Link>
      </div>
    </article>
  );
}

/** Passo a passo como protocolo: cada etapa é um carimbo numerado */
export function Passos({ escuro = false }: { escuro?: boolean }) {
  const passos = [
    { t: 'Você compra pelo site', d: 'Escolhe o certificado e paga no Pix ou no cartão, pelo Mercado Pago.' },
    { t: 'Conferimos seus documentos', d: 'Uma pessoa da equipe fala com você no WhatsApp e confere tudo antes.' },
    { t: 'Videochamada rápida', d: 'No dia e horário que você escolher, pelo celular ou computador.' },
    { t: 'Certificado instalado', d: 'Emitimos, instalamos com você e avisamos antes de vencer.' },
  ];
  return (
    <ol className="relative grid gap-8 md:grid-cols-4 md:gap-6">
      <span className={`absolute left-7 top-7 hidden h-px w-[calc(100%-3.5rem)] border-t-2 border-dashed md:block ${escuro ? 'border-white/25' : 'border-ink/20'}`} aria-hidden="true" />
      {passos.map((p, i) => (
        <li key={p.t} className="relative flex gap-4 md:block">
          <span
            className={`relative grid h-14 w-14 shrink-0 place-items-center rounded-full border-[3px] font-display text-xl font-black ${
              escuro ? 'border-carimbo-300 bg-ink text-carimbo-300' : 'border-carimbo bg-paper text-carimbo'
            }`}
          >
            {i + 1}
          </span>
          <div className="md:mt-5">
            <h3 className={`text-xl font-extrabold ${escuro ? 'text-white' : ''}`}>{p.t}</h3>
            <p className={`mt-2 text-[16px] leading-relaxed ${escuro ? 'text-white/70' : 'text-ink/70'}`}>{p.d}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function FaqLista({ itens }: { itens: Pergunta[] }) {
  return (
    <div className="border-t-[1.5px] border-ink">
      {itens.map((f) => (
        <details key={f.p} id={f.id} className="group scroll-mt-24 border-b border-ink/15">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left font-display text-lg font-bold [&::-webkit-details-marker]:hidden" style={{ fontStretch: '100%' }}>
            {f.p}
            <span className="relative h-4 w-4 shrink-0" aria-hidden="true">
              <span className="absolute left-0 top-1/2 h-[2px] w-4 -translate-y-1/2 bg-carimbo" />
              <span className="absolute left-1/2 top-0 h-4 w-[2px] -translate-x-1/2 bg-carimbo transition group-open:scale-y-0" />
            </span>
          </summary>
          <p className="max-w-2xl pb-6 leading-relaxed text-ink/75">{f.r}</p>
        </details>
      ))}
    </div>
  );
}

export function faqJsonLd(itens: Pergunta[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: itens.map((f) => ({ '@type': 'Question', name: f.p, acceptedAnswer: { '@type': 'Answer', text: f.r } })),
  };
}

export function CtaFinal({ titulo = 'Seu próximo certificado não precisa de fila.', msg }: { titulo?: string; msg?: string }) {
  return (
    <section className="relative overflow-hidden bg-carimbo text-white">
      <Carimbo className="pointer-events-none absolute -right-16 top-1/2 h-[22rem] w-[22rem] -translate-y-1/2 rotate-[-10deg] text-white/15" centro="SEM FILA" />
      <div className="container-x relative py-16 md:py-24">
        <h2 className="display max-w-3xl text-4xl text-white md:text-6xl">{titulo}</h2>
        <p className="mt-4 max-w-xl text-lg text-white/80">Fale com uma pessoa de verdade e resolva hoje, de onde estiver.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={waLink(msg || 'Olá! Vim pelo site e quero emitir meu certificado digital.')} target="_blank" rel="noopener noreferrer" className="btn-wa px-7 py-4">
            <WhatsIcon /> Chamar no WhatsApp
          </a>
          <Link href="/certificados" className="btn bg-white px-7 py-4 text-carimbo hover:bg-carimbo-50">
            Ver preços
          </Link>
        </div>
      </div>
    </section>
  );
}
