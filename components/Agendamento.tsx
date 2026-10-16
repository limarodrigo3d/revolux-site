'use client';

import { useEffect, useState } from 'react';
import type { Pedido } from '@/lib/pedido';
import type { DiaAgenda } from '@/lib/agenda';

type Props = {
  pedido: Pedido;
  /** Chamado quando a reserva dá certo, com o texto do horário (ex.: "seg, 20/10 às 14:00"). */
  onAgendado: (quando: string) => void;
  /** Chamado quando a agenda não está disponível (sem banco): a página volta a usar o WhatsApp. */
  onIndisponivel: () => void;
};

export default function Agendamento({ pedido, onAgendado, onIndisponivel }: Props) {
  const [dias, setDias] = useState<DiaAgenda[] | null>(null);
  const [dia, setDia] = useState('');
  const [hora, setHora] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');

  async function carregar() {
    try {
      const r = await fetch('/api/agenda', { cache: 'no-store' });
      const j = (await r.json()) as { ativo: boolean; dias: DiaAgenda[] };
      if (!j.ativo || !j.dias.length) return onIndisponivel();
      setDias(j.dias);
      setDia((atual) => (j.dias.some((d) => d.data === atual) ? atual : j.dias.find((d) => d.horarios.some((h) => h.livre))?.data || j.dias[0].data));
    } catch {
      onIndisponivel();
    }
  }

  useEffect(() => {
    carregar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function confirmar() {
    setEnviando(true);
    setErro('');
    try {
      const r = await fetch('/api/agenda', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pedido: pedido.pedido, documento: pedido.documento, data: dia, hora }),
      });
      const j = await r.json();
      if (j.ok) return onAgendado(j.quando);
      setErro(j.erro || 'Não foi possível reservar. Tente outro horário.');
      setHora('');
      carregar(); // atualiza: o horário pode ter sido pego por outra pessoa
    } catch {
      setErro('Sem conexão. Tente de novo.');
    } finally {
      setEnviando(false);
    }
  }

  if (!dias) return <p className="mt-4 text-sm text-ink/50">Carregando horários…</p>;

  const atual = dias.find((d) => d.data === dia);

  return (
    <div className="mt-4">
      <p className="text-sm text-ink/60">Escolha o dia:</p>
      <div className="-mx-1 mt-2 flex gap-2 overflow-x-auto px-1 pb-2" role="radiogroup" aria-label="Dia">
        {dias.map((d) => {
          const livres = d.horarios.filter((h) => h.livre).length;
          return (
            <button
              key={d.data}
              type="button"
              role="radio"
              aria-checked={dia === d.data}
              disabled={!livres}
              onClick={() => {
                setDia(d.data);
                setHora('');
              }}
              className={`shrink-0 rounded-xl border px-3 py-2 text-center text-sm transition ${
                dia === d.data ? 'border-navy bg-navy text-white' : 'border-ink/15 bg-white hover:border-ink/40'
              } disabled:cursor-not-allowed disabled:opacity-40`}
            >
              <span className="block font-semibold">{d.rotulo}</span>
              <span className={`block text-xs ${dia === d.data ? 'text-white/70' : 'text-ink/50'}`}>{livres ? `${livres} livres` : 'lotado'}</span>
            </button>
          );
        })}
      </div>

      {atual && (
        <>
          <p className="mt-3 text-sm text-ink/60">Escolha o horário (horário de Brasília):</p>
          <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4" role="radiogroup" aria-label="Horário">
            {atual.horarios.map((h) => (
              <button
                key={h.hora}
                type="button"
                role="radio"
                aria-checked={hora === h.hora}
                disabled={!h.livre}
                title={h.livre ? undefined : 'Horário ocupado'}
                onClick={() => setHora(h.hora)}
                className={`min-h-[44px] rounded-lg border text-sm font-semibold tabular-nums transition ${
                  !h.livre
                    ? 'cursor-not-allowed border-ink/5 bg-ink/5 text-ink/30 line-through'
                    : hora === h.hora
                      ? 'border-selo bg-selo text-white'
                      : 'border-ink/15 bg-white hover:border-ink/40'
                }`}
              >
                {h.hora}
                {!h.livre && <span className="sr-only"> (ocupado)</span>}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-ink/45">Horários riscados já estão ocupados.</p>
        </>
      )}

      {erro && (
        <p className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-800" role="alert">
          {erro}
        </p>
      )}

      <button type="button" disabled={!hora || enviando} onClick={confirmar} className="btn-primary mt-4 w-full disabled:opacity-50">
        {enviando ? 'Reservando…' : hora ? `Confirmar ${atual?.rotulo} às ${hora}` : 'Escolha um horário'}
      </button>
    </div>
  );
}
