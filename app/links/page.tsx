// Página de links para a bio do Instagram (como um Linktree, mas dentro do site).
// Endereço: /links — os links internos levam utm_source=instagram para aparecer no Analytics.
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SITE, brl, waLink } from '@/lib/site';
import { MENOR_PRECO } from '@/lib/catalogo';
import { Instagram, Seta, WhatsIcon } from '@/components/Icones';

export const metadata: Metadata = {
  title: 'Links',
  description: 'Certificado digital por videochamada: compre, agende, renove e fale com a Revolux.',
  robots: { index: false, follow: true },
};

const utm = (url: string) => `${url}${url.includes('?') ? '&' : '?'}utm_source=instagram&utm_medium=bio`;

const LINKS: { titulo: string; sub: string; href: string; destaque?: boolean }[] = [
  { titulo: 'Comprar meu certificado', sub: `e-CPF, e-CNPJ e Bird ID a partir de ${brl(MENOR_PRECO)}`, href: utm('/certificados'), destaque: true },
  { titulo: 'Não sei qual escolher', sub: 'Teste de 3 perguntas', href: utm('/qual-certificado') },
  { titulo: 'Renovar meu certificado', sub: 'Por videochamada, sem sair de casa', href: utm('/renovacao') },
  { titulo: 'Dúvidas frequentes', sub: 'Documentos, prazos, A1 ou A3', href: utm('/duvidas') },
];

export default function Links() {
  const extras = [SITE.googleAvaliacoesUrl && { titulo: 'Avaliações no Google', sub: 'Veja o que os clientes dizem', href: SITE.googleAvaliacoesUrl }].filter(
    Boolean,
  ) as { titulo: string; sub: string; href: string }[];

  return (
    <div className="min-h-screen bg-paper px-4 py-10">
      <div className="mx-auto flex w-full max-w-md flex-col items-center text-center">
        <div className="grid h-28 w-28 place-items-center rounded-full bg-white shadow-card">
          <Image src="/img/logo.png" alt="Revolux Certificado Digital" width={520} height={145} priority className="w-20" />
        </div>
        <h1 className="mt-5 max-w-full font-display text-xl font-extrabold [overflow-wrap:anywhere] sm:text-2xl">@{SITE.instagramUser.replace('@', '')}</h1>
        <p className="mt-2 max-w-sm text-[15px] text-ink/70">
          Certificado digital por videochamada, de qualquer lugar do Brasil. Sem fila e com uma pessoa de verdade do outro lado.
        </p>

        <div className="mt-5 flex gap-3">
          <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid h-11 w-11 place-items-center rounded-full bg-white text-ink shadow-card hover:text-carimbo">
            <Instagram className="h-6 w-6" />
          </a>
          <a href={waLink('Olá! Vim pelo Instagram e quero falar sobre certificado digital.')} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="grid h-11 w-11 place-items-center rounded-full bg-white text-wa-600 shadow-card">
            <WhatsIcon className="h-6 w-6" />
          </a>
        </div>

        <nav className="mt-8 flex w-full flex-col gap-3" aria-label="Links">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`group flex items-center gap-3 rounded-2xl px-5 py-4 text-left shadow-card transition hover:-translate-y-0.5 ${
                l.destaque ? 'bg-carimbo text-white' : 'bg-white text-ink'
              }`}
            >
              <span className="min-w-0 flex-1">
                <span className="block font-display text-[17px] font-bold">{l.titulo}</span>
                <span className={`block text-sm ${l.destaque ? 'text-white/80' : 'text-ink/55'}`}>{l.sub}</span>
              </span>
              <Seta className="h-5 w-5 shrink-0 opacity-60 transition group-hover:translate-x-0.5" />
            </Link>
          ))}

          <a
            href={waLink('Olá! Vim pelo Instagram e quero falar sobre certificado digital.')}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-2xl bg-selo px-5 py-4 text-left text-white shadow-card transition hover:-translate-y-0.5"
          >
            <WhatsIcon className="h-6 w-6 shrink-0" />
            <span className="min-w-0 flex-1">
              <span className="block font-display text-[17px] font-bold">Falar no WhatsApp</span>
              <span className="block text-sm text-white/85">{SITE.horario}</span>
            </span>
          </a>

          {extras.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl bg-white px-5 py-4 text-left shadow-card">
              <span className="min-w-0 flex-1">
                <span className="block font-display text-[17px] font-bold">{l.titulo}</span>
                <span className="block text-sm text-ink/55">{l.sub}</span>
              </span>
              <Seta className="h-5 w-5 shrink-0 opacity-60" />
            </a>
          ))}
        </nav>

        <Link href={utm('/')} className="mt-10 text-sm font-semibold text-ink/50 underline underline-offset-4">
          {SITE.url.replace(/^https?:\/\/(www\.)?/, '')}
        </Link>
      </div>
    </div>
  );
}
