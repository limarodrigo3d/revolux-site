import Link from 'next/link';
import { redirect } from 'next/navigation';
import { logado } from '@/lib/auth';
import { dbAtivo } from '@/lib/db';
import { diasDeAtendimento, horariosDoDia, instante, ocupacao, rotuloDia, type Reserva } from '@/lib/agenda';
import { WhatsIcon } from '@/components/Icones';
import { acaoBloquear, acaoDesbloquear, acaoDesmarcar, acaoSair } from '../actions';

export const dynamic = 'force-dynamic';

const waCliente = (tel: string, msg: string) => {
  const d = tel.replace(/\D/g, '');
  return `https://wa.me/${d.startsWith('55') ? d : `55${d}`}?text=${encodeURIComponent(msg)}`;
};
const primeiroNome = (n: string) => n.split(' ')[0] || '';

export default async function Agenda() {
  if (!(await logado())) redirect('/painel/entrar');
  if (!dbAtivo()) redirect('/painel');

  const datas = diasDeAtendimento();
  const ocup = await ocupacao(datas);
  const agora = Date.now();

  const proximas = datas
    .flatMap((data) =>
      Object.entries(ocup[data] || {})
        .filter(([hora, o]) => o !== 'BLOQ' && instante(data, hora) >= agora - 3_600_000)
        .map(([hora, o]) => ({ data, hora, r: o as Reserva })),
    )
    .sort((a, b) => instante(a.data, a.hora) - instante(b.data, b.hora));

  return (
    <div className="pb-20">
      <header className="bg-ink text-white">
        <div className="container-x flex flex-wrap items-center justify-between gap-3 py-4">
          <p className="font-display text-lg font-bold">Revolux · Agenda</p>
          <div className="flex items-center gap-2 text-sm">
            <Link href="/painel" className="rounded-lg px-3 py-2 hover:bg-white/10">Pedidos</Link>
            <Link href="/" className="rounded-lg px-3 py-2 hover:bg-white/10">Ver site</Link>
            <form action={acaoSair}>
              <button className="rounded-lg px-3 py-2 hover:bg-white/10">Sair</button>
            </form>
          </div>
        </div>
      </header>

      <div className="container-x mt-6">
        <h1 className="text-2xl font-extrabold">Próximas videochamadas</h1>
        {proximas.length === 0 ? (
          <p className="mt-3 rounded-2xl border border-dashed border-ink/20 bg-white p-8 text-center text-ink/60">Nenhum cliente agendado.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {proximas.map(({ data, hora, r }) => (
              <li key={data + hora} className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border border-ink/10 bg-white p-4">
                <span className="rounded-full bg-violet-100 px-3 py-1 text-sm font-semibold tabular-nums text-violet-900">
                  {rotuloDia(data)} · {hora}
                </span>
                <span className="min-w-0 flex-1 font-semibold">
                  {r.nome} <span className="font-normal text-ink/50">· {r.produto} · {r.pedido}</span>
                </span>
                <a
                  href={waCliente(r.telefone, `Olá, ${primeiroNome(r.nome)}! Aqui é da Revolux. Confirmando sua videochamada ${rotuloDia(data)} às ${hora}. Te envio o link um pouco antes, combinado?`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-wa !py-2"
                >
                  <WhatsIcon className="h-4 w-4" /> Confirmar
                </a>
                <details className="text-sm">
                  <summary className="cursor-pointer text-ink/50">Desmarcar</summary>
                  <form action={acaoDesmarcar} className="mt-2">
                    <input type="hidden" name="data" value={data} />
                    <input type="hidden" name="hora" value={hora} />
                    <input type="hidden" name="pedido" value={r.pedido} />
                    <button className="rounded-lg border border-red-300 px-3 py-2 text-red-700 hover:bg-red-50">Liberar horário</button>
                  </form>
                </details>
              </li>
            ))}
          </ul>
        )}

        <h2 className="mt-10 text-2xl font-extrabold">Dias e horários</h2>
        <p className="mt-1 text-sm text-ink/60">
          Clique num horário livre para bloquear (ele some para os clientes). Clique de novo para liberar. Horários com cliente não mudam aqui.
        </p>

        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {datas.map((data) => {
            const o = ocup[data] || {};
            const horas = horariosDoDia();
            const livres = horas.filter((h) => !o[h]).length;
            return (
              <section key={data} className="rounded-2xl border border-ink/10 bg-white p-4">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-display font-bold">{rotuloDia(data)}</h3>
                  <span className="text-xs text-ink/50">{livres} livres</span>
                </div>
                <div className="mt-3 grid grid-cols-4 gap-1.5">
                  {horas.map((hora) => {
                    const s = o[hora];
                    const passado = instante(data, hora) < agora;
                    if (s && s !== 'BLOQ') {
                      return (
                        <span key={hora} title={`${s.nome} · ${s.produto}`} className="rounded-lg bg-violet-100 py-2 text-center text-xs font-semibold tabular-nums text-violet-900">
                          {hora}
                          <span className="block truncate px-1 font-normal">{primeiroNome(s.nome)}</span>
                        </span>
                      );
                    }
                    return (
                      <form key={hora} action={s === 'BLOQ' ? acaoDesbloquear : acaoBloquear}>
                        <input type="hidden" name="data" value={data} />
                        <input type="hidden" name="hora" value={hora} />
                        <button
                          disabled={passado}
                          title={s === 'BLOQ' ? 'Bloqueado — clique para liberar' : 'Livre — clique para bloquear'}
                          className={`w-full rounded-lg py-2 text-xs font-semibold tabular-nums ${
                            s === 'BLOQ' ? 'bg-ink/10 text-ink/40 line-through' : 'border border-ink/15 hover:border-ink/40'
                          } disabled:opacity-30`}
                        >
                          {hora}
                        </button>
                      </form>
                    );
                  })}
                </div>
                <div className="mt-3 flex gap-2 text-xs">
                  <form action={acaoBloquear}>
                    <input type="hidden" name="data" value={data} />
                    <input type="hidden" name="hora" value="dia" />
                    <button className="rounded-lg border border-ink/15 px-3 py-1.5 hover:border-ink/40">Bloquear dia</button>
                  </form>
                  <form action={acaoDesbloquear}>
                    <input type="hidden" name="data" value={data} />
                    <input type="hidden" name="hora" value="dia" />
                    <button className="rounded-lg border border-ink/15 px-3 py-1.5 hover:border-ink/40">Liberar dia</button>
                  </form>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
