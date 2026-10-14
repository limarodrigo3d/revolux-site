import type { Metadata } from 'next';
import { TopoPagina } from '@/components/Blocos';
import Quiz from './Quiz';

export const metadata: Metadata = {
  title: 'Qual Certificado Digital Eu Preciso? Faça o Teste',
  description: 'Responda 3 perguntas rápidas e descubra o certificado digital ideal para você ou sua empresa: e-CPF, e-CNPJ, A1, A3 ou Bird ID.',
  alternates: { canonical: '/qual-certificado' },
};

export default function QualCertificadoPage() {
  return (
    <>
      <TopoPagina eyebrow="Teste rápido" titulo="Qual certificado eu preciso?" sub="Três perguntas e você descobre o modelo certo, sem pagar por algo que não vai usar." />
      <section className="bg-paper py-12 md:py-16">
        <div className="container-x">
          <Quiz />
        </div>
      </section>
    </>
  );
}
