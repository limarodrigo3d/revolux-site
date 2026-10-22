// Página de links para a bio do Instagram (como um Linktree, mas dentro do site).
// Endereço: /links — os links internos levam utm_source=instagram para aparecer no Analytics.
import type { Metadata } from 'next';
import type { ComponentType } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Award, BookOpen, HelpCircle, MapPin, RefreshCw, ShieldCheck, ShoppingCart, Star } from 'lucide-react';
import { SITE, brl, waLink } from '@/lib/site';
import { MENOR_PRECO } from '@/lib/catalogo';
import { Instagram, Seta, WhatsIcon } from '@/components/Icones';
import { Carimbo, Guilhoche } from '@/components/Documento';

export const metadata: Metadata = {
  title: 'Links',
  description: 'Certificado digital por videochamada: compre, agende, renove e fale com a Revolux.',
  robots: { index: false, follow: true },
};

const SITE_EXIBIDO = 'www.revoluxcd.com.br';
const MSG_WA = 'Olá! Vim pelo Instagram e quero falar sobre certificado digital.';
const utm = (url: string) => `${url}${url.includes('?') ? '&' : '?'}utm_source=instagram&utm_medium=bio`;

type Item = { titulo: string; sub: string; href: string; Icone: ComponentType<{ className?: string }>; cor: string; externo?: boolean };

const LINKS: Item[] = [
  { titulo: 'Não sei qual escolher', sub: 'Descubra em 3 perguntas', href: utm('/qual-certificado'), Icone: HelpCircle, cor: 'bg-amber-100 text-amber-700' },
  { titulo: 'Renovar meu certificado', sub: 'Sem sair de casa, por vídeo', href: utm('/renovacao'), Icone: RefreshCw, cor: 'bg-selo-50 text-selo' },
  { titulo: 'Dúvidas frequentes', sub: 'Documentos, prazos, A1 ou A3', href: utm('/duvidas'), Icone: BookOpen, cor: 'bg-navy-50 text-navy' },
];

const SELOS = [
  { Icone: ShieldCheck, texto: 'ICP-Brasil' },
  { Icone: Award, texto: `+${SITE.anosExperiencia} anos` },
  { Icone: MapPin, texto: 'Todo o Brasil' },
];

const entrada = (i: number) => ({ animationDelay: `${80 + i * 70}ms` });

export default function Links() {
  const itens: Item[] = [
    ...LINKS,
    ...(SITE.googleAvaliacoesUrl
      ? [{ titulo: 'Avaliações no Google', sub: 'Veja o que os clientes dizem', href: SITE.googleAvaliacoesUrl, Icone: Star, cor: 'bg-yellow-100 text-yellow-700', externo: true }]
      : []),
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-paper px-4 pb-12 pt-6">
      <style>{`
        @keyframes subir { from { opacity: 0; transform: translateY(14px) } to { opacity: 1; transform: none } }
        .subir { animation: subir .5s cubic-bezier(.2,.8,.2,1) both }
        @media (prefers-reduced-motion: reduce) { .subir { animation: none } }
      `}</style>

      <div className="mx-auto w-full max-w-md">
        {/* Capa */}
        <header className="subir relative overflow-hidden rounded-[28px] bg-ink px-6 pb-7 pt-8 text-center text-white shadow-lift">
          <Guilhoche className="pointer-events-none absolute -left-1/4 -top-1/4 h-[150%] w-[150%] text-white/10" />
          <Carimbo className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rotate-[-14deg] text-white/15" centro="SEM FILA" />

          <div className="relative mx-auto grid h-24 w-24 place-items-center rounded-full bg-white shadow-card ring-4 ring-white/15">
            <Image src="/img/logo.png" alt="Revolux Certificado Digital" width={520} height={145} priority className="w-[74px]" />
          </div>
          <h1 className="relative mt-4 font-display text-2xl font-extrabold leading-tight">Revolux Certificado Digital</h1>
          <p className="relative mt-1 text-sm font-medium text-white/70">{SITE.instagramUser}</p>
          <p className="relative mx-auto mt-3 max-w-xs text-[15px] leading-snug text-white/85">
            Seu certificado digital por videochamada. Sem fila e com uma pessoa de verdade do outro lado.
          </p>

          <ul className="relative mt-5 flex flex-wrap justify-center gap-2">
            {SELOS.map(({ Icone, texto }) => (
              <li key={texto} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/90 ring-1 ring-white/15">
                <Icone className="h-3.5 w-3.5" aria-hidden="true" /> {texto}
              </li>
            ))}
          </ul>
        </header>

        <nav className="mt-5 flex flex-col gap-3" aria-label="Links">
          {/* Destaque: comprar */}
          <Link
            href={utm('/certificados')}
            className="subir group relative flex items-center gap-4 overflow-hidden rounded-[22px] bg-carimbo px-5 py-5 text-white shadow-lift transition hover:-translate-y-0.5 hover:bg-carimbo-600"
            style={entrada(1)}
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/15">
              <ShoppingCart className="h-6 w-6" aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-display text-lg font-bold leading-tight">Comprar meu certificado</span>
              <span className="mt-1 inline-block rounded-full bg-white px-2.5 py-0.5 text-xs font-bold text-carimbo">
                a partir de {brl(MENOR_PRECO)}
              </span>
            </span>
            <Seta className="h-5 w-5 shrink-0 transition group-hover:translate-x-1" />
          </Link>

          {itens.map(({ titulo, sub, href, Icone, cor, externo }, i) => {
            const conteudo = (
              <>
                <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${cor}`}>
                  <Icone className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[17px] font-bold leading-tight">{titulo}</span>
                  <span className="mt-0.5 block text-sm text-ink/55">{sub}</span>
                </span>
                <Seta className="h-5 w-5 shrink-0 text-ink/35 transition group-hover:translate-x-1 group-hover:text-carimbo" />
              </>
            );
            const classe =
              'subir group flex items-center gap-4 rounded-[22px] bg-white px-5 py-4 text-ink shadow-card ring-1 ring-ink/5 transition hover:-translate-y-0.5 hover:ring-carimbo/30';
            return externo ? (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer" className={classe} style={entrada(i + 2)}>
                {conteudo}
              </a>
            ) : (
              <Link key={href} href={href} className={classe} style={entrada(i + 2)}>
                {conteudo}
              </Link>
            );
          })}

          {/* WhatsApp */}
          <a
            href={waLink(MSG_WA)}
            target="_blank"
            rel="noopener noreferrer"
            className="subir group flex items-center gap-4 rounded-[22px] bg-selo px-5 py-4 text-white shadow-card transition hover:-translate-y-0.5"
            style={entrada(itens.length + 2)}
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/15">
              <WhatsIcon className="h-6 w-6" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-display text-[17px] font-bold leading-tight">Falar no WhatsApp</span>
              <span className="mt-0.5 flex items-center gap-1.5 text-sm text-white/85">
                <span className="h-2 w-2 rounded-full bg-wa" aria-hidden="true" /> {SITE.horario}
              </span>
            </span>
            <Seta className="h-5 w-5 shrink-0 transition group-hover:translate-x-1" />
          </a>
        </nav>

        <div className="subir mt-6 flex justify-center gap-3" style={entrada(itens.length + 3)}>
          <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid h-11 w-11 place-items-center rounded-full bg-white text-ink shadow-card ring-1 ring-ink/5 hover:text-carimbo">
            <Instagram className="h-5 w-5" />
          </a>
          <a href={waLink(MSG_WA)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="grid h-11 w-11 place-items-center rounded-full bg-white text-selo shadow-card ring-1 ring-ink/5">
            <WhatsIcon className="h-5 w-5" />
          </a>
        </div>

        <footer className="mt-6 text-center text-xs text-ink/45">
          <Link href={utm('/')} className="font-display text-sm font-bold text-ink/70 underline-offset-4 hover:underline">
            {SITE_EXIBIDO}
          </Link>
          {SITE.cnpj && <p className="mt-1">CNPJ {SITE.cnpj}</p>}
        </footer>
      </div>
    </div>
  );
}
