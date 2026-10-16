import Link from 'next/link';
import { redirect } from 'next/navigation';
import { logado } from '@/lib/auth';
import { STATUS, dbAtivo, diasParaVencer, listarPedidos, type PedidoDB } from '@/lib/db';
import { PRODUTOS, nomeCompleto } from '@/lib/catalogo';
import { SITE, brl } from '@/lib/site';
import { WhatsIcon } from '@/components/Icones';
import Notificacoes from '@/components/Notificacoes';
import { acaoAvisado, acaoDetalhes, acaoExcluir, acaoNovo, acaoSair, acaoStatus } from './actions';

export const dynamic = 'force-dynamic';

type Filtro = 'atender' | 'renovar' | 'aguardando' | 'emitidos' | 'todos';
const FILTROS: { id: Filtro; nome: string }[] = [
  { id: 'atender', nome: 'Para atender' },
  { id: 'renovar', nome: 'Renovações' },
  { id: 'aguardando', nome: 'Aguardando pagamento' },
  { id: 'emitidos', nome: 'Emitidos' },
  { id: 'todos', nome: 'Todos' },
];

const COR: Record<string, string> = {
  aguardando: 'bg-amber-100 text-amber-900',
  pago: 'bg-carimbo-50 text-carimbo',
  documentos: 'bg-sky-100 text-sky-900',
  agendado: 'bg-violet-100 text-violet-900',
  emitido: 'bg-emerald-100 text-emerald-900',
  cancelado: 'bg-ink/10 text-ink/60',
};

const data = (ms?: number) => (ms ? new Date(ms).toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' }) : '—');
const dataISO = (iso?: string) => (iso ? iso.split('-').reverse().join('/') : '—');
const waCliente = (tel: string, msg: string) => {
  const d = tel.replace(/\D/g, '');
  return `https://wa.me/${d.startsWith('55') ? d : `55${d}`}?text=${encodeURIComponent(msg)}`;
};
const primeiroNome = (n: string) => n.split(' ')[0] || '';

function precisaRenovar(p: PedidoDB) {
  const d = diasParaVencer(p);
  return p.status === 'emitido' && d !== null && d <= 45 && d >= -60;
}

export default async function Painel({ searchParams }: { searchParams: Promise<{ f?: string; q?: string; novo?: string }> }) {
  if (!(await logado())) redirect('/painel/entrar');
  const sp = await searchParams;
  const filtro = (FILTROS.find((x) => x.id === sp.f)?.id || 'atender') as Filtro;
  const q = (sp.q || '').toLowerCase().trim();

  if (!dbAtivo()) {
    return (
      <div className="container-x py-16">
        <h1 className="text-3xl font-extrabold">Painel de pedidos</h1>
        <p className="mt-4 max-w-xl text-ink/70">
          Falta conectar o banco de dados. No Vercel, abra o projeto → Storage → Create Database → <b>Upstash for Redis</b> (plano grátis) → conecte a este
          projeto e publique de novo. As variáveis são criadas automaticamente.
        </p>
      </div>
    );
  }

  const todos = await listarPedidos();
  const agora = Date.now();
  const inicioMes = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime();
  const vendidos = todos.filter((p) => !['aguardando', 'cancelado'].includes(p.status));
  const totalMes = vendidos.filter((p) => (p.pagoEm || 0) >= inicioMes).reduce((s, p) => s + p.preco, 0);
  const qtdAtender = todos.filter((p) => ['pago', 'documentos', 'agendado'].includes(p.status)).length;
  const qtdRenovar = todos.filter(precisaRenovar).length;

  let lista = todos.filter((p) => {
    if (filtro === 'atender') return ['pago', 'documentos', 'agendado'].includes(p.status);
    if (filtro === 'renovar') return precisaRenovar(p);
    if (filtro === 'aguardando') return p.status === 'aguardando' && agora - p.criadoEm < 14 * 86_400_000;
    if (filtro === 'emitidos') return p.status === 'emitido';
    return true;
  });
  if (filtro === 'renovar') lista = lista.sort((a, b) => (diasParaVencer(a) ?? 0) - (diasParaVencer(b) ?? 0));
  if (q) lista = lista.filter((p) => [p.nome, p.documento, p.telefone, p.email, p.id, p.cidade].join(' ').toLowerCase().includes(q));

  return (
    <div className="pb-20">
      <header className="bg-ink text-white">
        <div className="container-x flex flex-wrap items-center justify-between gap-3 py-4">
          <p className="font-display text-lg font-bold">Revolux · Painel</p>
          <div className="flex items-center gap-2 text-sm">
            <Link href="/painel/agenda" className="rounded-lg bg-white/10 px-3 py-2 font-semibold hover:bg-white/20">Agenda</Link>
            <a href="/api/painel/csv" className="rounded-lg px-3 py-2 hover:bg-white/10">Baixar planilha</a>
            <Link href="/" className="rounded-lg px-3 py-2 hover:bg-white/10">Ver site</Link>
            <form action={acaoSair}>
              <button className="rounded-lg px-3 py-2 hover:bg-white/10">Sair</button>
            </form>
          </div>
        </div>
      </header>

      <div className="container-x mt-6 grid grid-cols-3 gap-2 sm:gap-4">
        {[
          ['Vendas no mês', brl(totalMes)],
          ['Pedidos para atender', String(qtdAtender)],
          ['Renovações (45 dias)', String(qtdRenovar)],
        ].map(([t, v]) => (
          <div key={t} className="rounded-2xl border border-ink/10 bg-white p-3 sm:p-5">
            <p className="text-xs leading-tight text-ink/60 sm:text-sm">{t}</p>
            <p className="mt-1 font-display text-lg font-extrabold tabular-nums sm:text-3xl">{v}</p>
          </div>
        ))}
      </div>

      <div className="container-x mt-4">
        <Notificacoes />
      </div>

      <div className="container-x mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <nav className="flex flex-wrap gap-2" aria-label="Filtros">
          {FILTROS.map((x) => (
            <Link
              key={x.id}
              href={`/painel?f=${x.id}`}
              className={`rounded-full px-4 py-2 text-sm font-medium ${filtro === x.id ? 'bg-ink text-white' : 'border border-ink/15 bg-white hover:border-ink/40'}`}
            >
              {x.nome}
            </Link>
          ))}
        </nav>
        <div className="flex gap-2">
          <form className="flex gap-2">
            <input type="hidden" name="f" value="todos" />
            <input name="q" defaultValue={sp.q} placeholder="Buscar nome, CPF, telefone…" className="input !py-2" aria-label="Buscar" />
          </form>
          <Link href={sp.novo ? `/painel?f=${filtro}` : `/painel?f=${filtro}&novo=1`} className="btn-primary shrink-0 !py-2">
            + Cadastrar
          </Link>
        </div>
      </div>

      {sp.novo && (
        <div className="container-x mt-6">
          <form action={acaoNovo} className="grid gap-4 rounded-2xl border border-ink/10 bg-white p-6 sm:grid-cols-2 lg:grid-cols-4">
            <p className="font-semibold sm:col-span-2 lg:col-span-4">
              Cadastrar venda feita pelo WhatsApp ou cliente antigo (para entrar nos lembretes de renovação)
            </p>
            <div className="lg:col-span-2">
              <label className="label" htmlFor="n-nome">Nome</label>
              <input id="n-nome" name="nome" required className="input" />
            </div>
            <div>
              <label className="label" htmlFor="n-tel">WhatsApp</label>
              <input id="n-tel" name="telefone" required className="input" placeholder="(00) 00000-0000" />
            </div>
            <div>
              <label className="label" htmlFor="n-doc">CPF/CNPJ</label>
              <input id="n-doc" name="documento" className="input" />
            </div>
            <div className="lg:col-span-2">
              <label className="label" htmlFor="n-prod">Certificado</label>
              <select id="n-prod" name="produtoId" className="input">
                {PRODUTOS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {nomeCompleto(p)} — {brl(p.preco)}
                  </option>
                ))}
                <option value="">Outro</option>
              </select>
            </div>
            <div>
              <label className="label" htmlFor="n-status">Situação</label>
              <select id="n-status" name="status" className="input" defaultValue="emitido">
                {STATUS.map((s) => (
                  <option key={s.id} value={s.id}>{s.nome}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label" htmlFor="n-val">Vence em</label>
              <input id="n-val" name="validade" type="date" className="input" />
            </div>
            <div>
              <label className="label" htmlFor="n-email">E-mail</label>
              <input id="n-email" name="email" type="email" className="input" />
            </div>
            <div>
              <label className="label" htmlFor="n-cid">Cidade/UF</label>
              <input id="n-cid" name="cidade" className="input" />
            </div>
            <div>
              <label className="label" htmlFor="n-preco">Valor (opcional)</label>
              <input id="n-preco" name="preco" inputMode="decimal" className="input" placeholder="Preço do catálogo" />
            </div>
            <label className="flex items-center gap-2 text-sm sm:col-span-2 lg:col-span-3">
              <input type="checkbox" name="venda" defaultChecked className="h-5 w-5 accent-navy" />
              Contar como venda deste mês (desmarque para clientes antigos)
            </label>
            <div className="flex items-end">
              <button className="btn-navy w-full">Salvar cliente</button>
            </div>
          </form>
        </div>
      )}

      <div className="container-x mt-6 space-y-3">
        {lista.length === 0 && (
          <div className="rounded-2xl border border-dashed border-ink/20 bg-white p-10 text-center text-ink/60">
            {filtro === 'atender' ? 'Nenhum pedido esperando atendimento.' : 'Nada por aqui.'}
          </div>
        )}

        {lista.map((p) => {
          const dias = diasParaVencer(p);
          const msgCliente =
            filtro === 'renovar'
              ? `Olá, ${primeiroNome(p.nome)}! Aqui é da Revolux Certificado Digital. Seu certificado ${p.produto} ${
                  dias !== null && dias < 0 ? `venceu em ${dataISO(p.validade)}` : `vence em ${dataISO(p.validade)}`
                }. Quer que eu já deixe a renovação agendada? É tudo por videoconferência, rapidinho.`
              : p.status === 'emitido'
                ? `Olá, ${primeiroNome(p.nome)}! Seu certificado ${p.produto} está pronto e instalado. Obrigada pela confiança!${
                    SITE.googleAvaliarUrl ? ` Se puder, deixe sua avaliação no Google, ajuda muito: ${SITE.googleAvaliarUrl}` : ''
                  }`
                : p.status === 'pago'
                ? `Olá, ${primeiroNome(p.nome)}! Aqui é da Revolux. Recebemos seu pagamento do ${p.produto} (pedido ${p.id}). Vamos agendar sua videoconferência? Me envie, por favor, foto do seu documento com foto.`
                : `Olá, ${primeiroNome(p.nome)}! Aqui é da Revolux Certificado Digital.`;

          return (
            <details key={p.id} className="group rounded-2xl border border-ink/10 bg-white open:shadow-card">
              <summary className="flex cursor-pointer list-none flex-wrap items-center gap-x-4 gap-y-2 p-4 md:p-5 [&::-webkit-details-marker]:hidden">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${COR[p.status]}`}>{STATUS.find((s) => s.id === p.status)?.nome}</span>
                <span className="min-w-0 flex-1 font-semibold">
                  {p.nome || 'Sem nome'} <span className="font-normal text-ink/50">· {p.produto}</span>
                </span>
                {p.validade && (
                  <span className={`text-sm tabular-nums ${dias !== null && dias <= 30 ? 'font-semibold text-red-700' : 'text-ink/60'}`}>
                    vence {dataISO(p.validade)}
                    {dias !== null && ` (${dias < 0 ? `há ${-dias} d` : `${dias} d`})`}
                  </span>
                )}
                {p.agendadoPara && p.status !== 'emitido' && <span className="text-sm font-semibold text-violet-900">📅 {p.agendadoPara}</span>}
                <span className="text-sm tabular-nums text-ink/50">{data(p.criadoEm)}</span>
                <span className="font-display font-bold tabular-nums">{brl(p.preco)}</span>
              </summary>

              <div className="grid gap-6 border-t border-ink/10 p-4 md:grid-cols-[1fr_1fr_auto] md:p-5">
                <dl className="grid grid-cols-[110px_1fr] gap-x-3 gap-y-1.5 text-sm">
                  <dt className="text-ink/50">Pedido</dt>
                  <dd className="font-mono">{p.id}{p.origem === 'manual' && ' (manual)'}</dd>
                  <dt className="text-ink/50">CPF/CNPJ</dt>
                  <dd>{p.documento || '—'}</dd>
                  <dt className="text-ink/50">WhatsApp</dt>
                  <dd>{p.telefone || '—'}</dd>
                  <dt className="text-ink/50">E-mail</dt>
                  <dd className="break-all">{p.email || '—'}</dd>
                  <dt className="text-ink/50">Cidade</dt>
                  <dd>{p.cidade || '—'}</dd>
                  <dt className="text-ink/50">Pago em</dt>
                  <dd>{data(p.pagoEm)}{p.pagamentoId && <span className="text-ink/50"> · MP {p.pagamentoId}</span>}</dd>
                  <dt className="text-ink/50">Emitido em</dt>
                  <dd>{data(p.emitidoEm)}</dd>
                  {!!p.avisos?.length && (
                    <>
                      <dt className="text-ink/50">Avisos</dt>
                      <dd>{p.avisos.join(', ')}</dd>
                    </>
                  )}
                </dl>

                <form action={acaoDetalhes} className="space-y-3 text-sm">
                  <input type="hidden" name="id" value={p.id} />
                  <div>
                    <label className="label" htmlFor={`ag-${p.id}`}>Videoconferência</label>
                    <input id={`ag-${p.id}`} name="agendadoPara" defaultValue={p.agendadoPara} placeholder="Ex.: 15/10 às 14h" className="input !py-2" />
                  </div>
                  <div>
                    <label className="label" htmlFor={`va-${p.id}`}>Validade do certificado</label>
                    <input id={`va-${p.id}`} name="validade" type="date" defaultValue={p.validade} className="input !py-2" />
                  </div>
                  <div>
                    <label className="label" htmlFor={`no-${p.id}`}>Anotações</label>
                    <textarea id={`no-${p.id}`} name="notas" defaultValue={p.notas} rows={2} className="input resize-none !py-2" />
                  </div>
                  <button className="btn-outline !py-2">Salvar detalhes</button>
                </form>

                <div className="flex flex-col gap-2 md:w-56">
                  <a href={waCliente(p.telefone, msgCliente)} target="_blank" rel="noopener noreferrer" className="btn-wa !py-2.5">
                    <WhatsIcon className="h-4 w-4" /> {filtro === 'renovar' ? 'Avisar renovação' : p.status === 'emitido' ? 'Agradecer e pedir avaliação' : 'Chamar cliente'}
                  </a>
                  {filtro === 'renovar' && (
                    <form action={acaoAvisado}>
                      <input type="hidden" name="id" value={p.id} />
                      <button className="btn-outline w-full !py-2">Marcar como avisado</button>
                    </form>
                  )}
                  <form action={acaoStatus} className="flex gap-2">
                    <input type="hidden" name="id" value={p.id} />
                    <select name="status" defaultValue={p.status} className="input !py-2" aria-label="Mudar situação">
                      {STATUS.map((s) => (
                        <option key={s.id} value={s.id}>{s.nome}</option>
                      ))}
                    </select>
                    <button className="btn-navy !px-3 !py-2">OK</button>
                  </form>
                  <details className="text-sm">
                    <summary className="cursor-pointer text-ink/50">Excluir pedido</summary>
                    <form action={acaoExcluir} className="mt-2">
                      <input type="hidden" name="id" value={p.id} />
                      <button className="w-full rounded-lg border border-red-300 px-3 py-2 text-red-700 hover:bg-red-50">Confirmar exclusão</button>
                    </form>
                  </details>
                </div>
              </div>
            </details>
          );
        })}
      </div>
    </div>
  );
}
