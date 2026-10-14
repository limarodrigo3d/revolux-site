import type { Metadata } from 'next';
import { CtaFinal, FaqLista, JsonLd, TopoPagina, faqJsonLd } from '@/components/Blocos';
import { FAQ } from '@/lib/faq';

export const metadata: Metadata = {
  title: 'Dúvidas sobre Certificado Digital: A1, A3, Videoconferência e Instalação',
  description:
    'Tire suas dúvidas sobre certificado digital: como funciona a emissão por videoconferência, documentos, diferença entre A1 e A3, Bird ID, instalação e renovação.',
  alternates: { canonical: '/duvidas' },
};

export default function DuvidasPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(FAQ)} />
      <TopoPagina eyebrow="Central de ajuda" titulo="Dúvidas frequentes" sub="Tudo o que você precisa saber antes de emitir, instalar ou renovar o seu certificado digital." />
      <section className="bg-paper py-14 md:py-20">
        <div className="container-x max-w-3xl">
          <FaqLista itens={FAQ} />
        </div>
      </section>
      <CtaFinal titulo="Ainda com dúvida? Pergunte para a gente." msg="Olá! Tenho uma dúvida sobre certificado digital." />
    </>
  );
}
