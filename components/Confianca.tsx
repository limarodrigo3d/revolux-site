import { AVALIACOES, NUMEROS, SITE } from '@/lib/site';
import { Check } from './Icones';

/** Faixa de selos logo abaixo do topo. Itens vazios em lib/site.ts não aparecem. */
export function SelosConfianca() {
  const itens = [
    'Padrão ICP-Brasil',
    SITE.acParceira && `Emissão ${SITE.acParceira}`,
    'Pagamento seguro Mercado Pago',
    `+${SITE.anosExperiencia} anos de experiência`,
    NUMEROS.certificadosEmitidos > 0 && `+${NUMEROS.certificadosEmitidos.toLocaleString('pt-BR')} certificados emitidos`,
    NUMEROS.estadosAtendidos > 0 && `Clientes em ${NUMEROS.estadosAtendidos} estados`,
    SITE.horario && `Atendimento ${SITE.horario}`,
  ].filter(Boolean) as string[];

  return (
    <section className="border-b border-ink/10 bg-white" aria-label="Por que confiar">
      <ul className="container-x flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-5 text-sm font-medium text-ink/70">
        {itens.map((t) => (
          <li key={t} className="flex items-center gap-2">
            <Check className="h-4 w-4 text-selo" /> {t}
          </li>
        ))}
      </ul>
    </section>
  );
}

function Estrelas({ nota }: { nota: number }) {
  return (
    <span className="text-amber-500" aria-label={`${nota} de 5 estrelas`}>
      {'★★★★★'.slice(0, Math.round(nota))}
      <span className="text-ink/15">{'★★★★★'.slice(Math.round(nota))}</span>
    </span>
  );
}

/** Avaliações reais do Google. Só aparece quando há avaliações ou nota preenchidas em lib/site.ts. */
export function AvaliacoesGoogle() {
  if (!AVALIACOES.length && !NUMEROS.notaGoogle) return null;
  return (
    <section className="py-16 md:py-24">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Avaliações no Google</p>
            <h2 className="mt-2 text-3xl font-extrabold md:text-5xl">Quem já emitiu com a gente</h2>
          </div>
          {NUMEROS.notaGoogle > 0 && (
            <div className="flex items-center gap-3">
              <span className="font-display text-5xl font-extrabold">{NUMEROS.notaGoogle.toFixed(1).replace('.', ',')}</span>
              <div className="text-sm">
                <Estrelas nota={NUMEROS.notaGoogle} />
                {NUMEROS.totalAvaliacoes > 0 && <p className="text-ink/60">{NUMEROS.totalAvaliacoes} avaliações</p>}
              </div>
            </div>
          )}
        </div>
        {AVALIACOES.length > 0 && (
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {AVALIACOES.slice(0, 6).map((a) => (
              <figure key={a.nome + a.texto.slice(0, 10)} className="flex flex-col rounded-2xl border border-ink/10 bg-white p-6 shadow-card">
                <Estrelas nota={a.nota} />
                <blockquote className="mt-3 flex-1 leading-relaxed">“{a.texto}”</blockquote>
                <figcaption className="mt-4 text-sm font-semibold">
                  {a.nome}
                  {a.cidade && <span className="font-normal text-ink/55"> · {a.cidade}</span>}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
        {SITE.googleAvaliacoesUrl && (
          <a href={SITE.googleAvaliacoesUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block font-semibold text-carimbo underline underline-offset-4">
            Ver todas as avaliações no Google
          </a>
        )}
      </div>
    </section>
  );
}
