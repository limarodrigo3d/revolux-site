import type { Metadata } from 'next';
import { TopoPagina } from '@/components/Blocos';
import { Instagram, WhatsIcon } from '@/components/Icones';
import { SITE, waLink } from '@/lib/site';
import FormContato from './FormContato';

export const metadata: Metadata = {
  title: 'Contato: fale com a Revolux pelo WhatsApp',
  description: 'Fale com a Revolux Certificado Digital pelo WhatsApp. Atendimento humano para todo o Brasil: compra, renovação e instalação de certificados.',
  alternates: { canonical: '/contato' },
};

export default function ContatoPage() {
  return (
    <>
      <TopoPagina eyebrow="Contato" titulo="Fale com uma pessoa de verdade" sub="Atendemos clientes de todo o Brasil pelo WhatsApp. Conte o que você precisa e respondemos o quanto antes." />
      <section className="bg-paper py-14 md:py-20">
        <div className="container-x grid gap-8 lg:grid-cols-[1.3fr_.7fr]">
          <FormContato />
          <div className="space-y-4">
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-2xl bg-ink p-6 text-white transition hover:bg-navy">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-wa">
                <WhatsIcon className="h-6 w-6" />
              </span>
              <span>
                <span className="block text-sm text-white/60">WhatsApp comercial</span>
                <span className="font-display text-xl font-bold">{SITE.whatsappFormatado}</span>
              </span>
            </a>
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-2xl border border-ink/10 bg-white p-6 transition hover:border-navy">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-paper text-navy">
                <Instagram className="h-6 w-6" />
              </span>
              <span>
                <span className="block text-sm text-ink/55">Instagram</span>
                <span className="font-semibold">{SITE.instagramUser}</span>
              </span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
