import type { Metadata } from 'next';
import { PainelMarca } from '@/components/Ilustracoes';
import { CtaFinal, TopoPagina } from '@/components/Blocos';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Quem Somos: Revolux Certificado Digital',
  description: `A Revolux nasceu da união de três irmãos com mais de ${SITE.anosExperiencia} anos de experiência em certificação digital. Atendimento humano para todo o Brasil.`,
  alternates: { canonical: '/sobrenos' },
};

const pilares = [
  { t: 'Missão', d: 'Simplificar o acesso à certificação digital com atendimento humano, seguro e eficiente.' },
  { t: 'Visão', d: 'Ser referência nacional em certificação digital com foco em confiança e proximidade.' },
  { t: 'Valores', d: 'Empatia, agilidade, transparência, ética e excelência técnica em cada entrega.' },
];

const depoimentos = [
  { nome: 'Carlos M.', msg: 'Fui atendido de forma ágil e respeitosa. Muito acima do padrão que esperava!' },
  { nome: 'Juliana R.', msg: 'Senti segurança em cada etapa. Atendimento humano e suporte impecável.' },
];

export default function QuemSomos() {
  return (
    <>
      <TopoPagina eyebrow="Quem somos" titulo="Uma família cuidando do seu certificado" />

      <section className="py-14 md:py-20">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-5 text-lg leading-relaxed text-ink/75">
            <p>
              A <strong className="text-ink">Revolux Certificado Digital</strong> nasceu da união de três irmãos com uma missão clara: transformar a certificação digital em uma
              experiência simples, segura e humana.
            </p>
            <p>
              Embora recente como marca, trazemos <strong className="text-ink">mais de {SITE.anosExperiencia} anos de experiência</strong> no setor. Hoje atendemos clientes de todo o
              Brasil com validação por videoconferência, sem que ninguém precise sair de casa.
            </p>
            <p>Acreditamos que a tecnologia deve facilitar a vida, não complicar. E é isso que entregamos todos os dias.</p>
          </div>
          <PainelMarca anos={SITE.anosExperiencia} />
        </div>
      </section>

      <section className="bg-ink py-14 text-white md:py-20">
        <div className="container-x grid gap-6 md:grid-cols-3">
          {pilares.map((p) => (
            <div key={p.t} className="rounded-2xl border border-white/10 bg-white/[.04] p-7">
              <h2 className="text-xl font-bold text-carimbo-300">{p.t}</h2>
              <p className="mt-3 leading-relaxed text-white/75">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-paper py-14 md:py-20">
        <div className="container-x">
          <h2 className="text-2xl font-extrabold md:text-3xl">O que dizem nossos clientes</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {depoimentos.map((d) => (
              <figure key={d.nome} className="rounded-2xl border border-ink/10 bg-white p-7 shadow-card">
                <blockquote className="text-lg leading-relaxed">“{d.msg}”</blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-ink/60">— {d.nome}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <CtaFinal titulo="Pronto para emitir seu certificado com quem entende?" />
    </>
  );
}
