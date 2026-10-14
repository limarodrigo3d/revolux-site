import type { Metadata } from 'next';
import Link from 'next/link';
import { CtaFinal, Passos, TopoPagina } from '@/components/Blocos';
import { Check, WhatsIcon } from '@/components/Icones';
import { waLink } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Renovar Certificado Digital Online: e-CPF e e-CNPJ Vencido ou a Vencer',
  description:
    'Seu certificado digital venceu ou está para vencer? Renove o e-CPF ou e-CNPJ online, com validação por videoconferência de qualquer lugar do Brasil.',
  alternates: { canonical: '/renovacao' },
};

const sinais = [
  'O emissor de nota fiscal parou de funcionar',
  'O e-CAC não aceita mais o seu certificado',
  'Apareceu a mensagem “certificado expirado”',
  'Faltam menos de 30 dias para o vencimento',
];

export default function RenovacaoPage() {
  return (
    <>
      <TopoPagina
        eyebrow="Renovação"
        titulo={
          <>
            Certificado vencendo? Renove sem sair de casa.
          </>
        }
        sub="Não deixe sua empresa parar de emitir notas. Fazemos a renovação do seu e-CPF ou e-CNPJ por videoconferência, com a mesma praticidade da primeira emissão."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={waLink('Olá! Meu certificado digital está vencendo/venceu e quero renovar.')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary px-7 py-4 text-base"
          >
            <WhatsIcon /> Quero renovar
          </a>
          <Link href="/certificados" className="btn-outline px-7 py-4 text-base">
            Ver preços
          </Link>
        </div>
      </TopoPagina>

      <section className="py-14 md:py-20">
        <div className="container-x grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-extrabold md:text-3xl">Sinais de que está na hora</h2>
            <ul className="mt-6 space-y-3">
              {sinais.map((s) => (
                <li key={s} className="flex gap-3 text-lg">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-selo" /> {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-paper p-8">
            <h2 className="text-2xl font-extrabold">Nunca mais seja pego de surpresa</h2>
            <p className="mt-3 text-ink/70">
              Clientes Revolux recebem um lembrete pelo WhatsApp antes do vencimento. Assim você renova com calma e sem parar o trabalho.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-paper py-14 md:py-20">
        <div className="container-x">
          <h2 className="text-2xl font-extrabold md:text-3xl">Como funciona a renovação</h2>
          <div className="mt-8">
            <Passos />
          </div>
        </div>
      </section>

      <CtaFinal titulo="Renove hoje e evite dor de cabeça." msg="Olá! Quero renovar meu certificado digital." />
    </>
  );
}
