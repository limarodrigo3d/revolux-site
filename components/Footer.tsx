import Link from 'next/link';
import Image from 'next/image';
import { CATEGORIAS } from '@/lib/catalogo';
import { SEGMENTOS } from '@/lib/segmentos';
import { SITE, waLink } from '@/lib/site';
import { Instagram, WhatsIcon } from './Icones';
import { Guilhoche } from './Documento';

const pagamentos = [
  ['/visa.svg', 'Visa'],
  ['/mastercard.svg', 'Mastercard'],
  ['/elo.svg', 'Elo'],
  ['/pix.svg', 'Pix'],
  ['/hipercard.svg', 'Hipercard'],
  ['/amex.svg', 'American Express'],
  ['/diners.svg', 'Diners Club'],
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white/70">
      <Guilhoche className="pointer-events-none absolute -bottom-48 -right-40 h-[32rem] w-[32rem] text-white/[.05]" />
      <div className="container-x relative grid gap-10 py-14 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <Image src="/img/logo-branco.png" alt="Revolux Certificado Digital" width={520} height={145} className="h-11 w-auto" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            Certificado digital com atendimento humano, emitido por videoconferência para todo o Brasil. Mais de {SITE.anosExperiencia} anos de experiência.
          </p>
          {SITE.horario && <p className="mt-2 text-sm">Atendimento: {SITE.horario}</p>}
          <div className="mt-5 flex items-center gap-3">
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-wa !px-4 !py-2.5 text-sm">
              <WhatsIcon className="h-4 w-4" /> {SITE.whatsappFormatado}
            </a>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da Revolux"
              className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 text-white transition hover:bg-white/10"
            >
              <Instagram />
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">Certificados</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {CATEGORIAS.map((c) => (
              <li key={c.slug}>
                <Link href={`/solucoes/${c.slug}`} className="hover:text-white">
                  {c.nome}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">Para quem</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {SEGMENTOS.map((s) => (
              <li key={s.slug}>
                <Link href={`/para/${s.slug}`} className="hover:text-white">
                  {s.menu}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">Ajuda</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link href="/duvidas#instalacao" className="hover:text-white">Instalação do A1</Link></li>
            <li><Link href="/duvidas#usos" className="hover:text-white">Aplicações e usos</Link></li>
            <li><Link href="/renovacao" className="hover:text-white">Renovação</Link></li>
            <li><Link href="/duvidas" className="hover:text-white">Perguntas frequentes</Link></li>
            <li><Link href="/contato" className="hover:text-white">Contato</Link></li>
            <li><Link href="/politica-de-privacidade" className="hover:text-white">Política de Privacidade</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-6 text-xs md:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {pagamentos.map(([src, alt]) => (
              <span key={src} className="grid h-7 w-11 place-items-center rounded bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={alt} className="h-4 w-auto" loading="lazy" />
              </span>
            ))}
          </div>
          <p className="text-center">
            © {new Date().getFullYear()} {SITE.razaoSocial || 'Revolux Certificado Digital'}
            {SITE.cnpj && ` · CNPJ ${SITE.cnpj}`} · Desenvolvido por{' '}
            <a href="https://agenciarevolux.com.br" target="_blank" rel="noopener noreferrer" className="font-semibold text-white hover:underline">
              Agência Revolux®
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
