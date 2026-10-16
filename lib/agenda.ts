// Agenda de videochamadas guardada no mesmo banco dos pedidos (Upstash Redis).
// Cada dia é um hash "agenda:AAAA-MM-DD" com { "HH:MM": reserva em JSON | "BLOQ" }.
// HSETNX garante que um horário só pode ser pego uma vez, mesmo com dois cliques ao mesmo tempo.

import { AGENDA } from './site';
import { atualizarPedido, cmd, dbAtivo, getPedido } from './db';

export type Reserva = { pedido: string; nome: string; telefone: string; produto: string; criadoEm: number };
export type Ocupacao = Reserva | 'BLOQ';
export type DiaAgenda = { data: string; rotulo: string; horarios: { hora: string; livre: boolean }[] };

const FUSO = '-03:00'; // horário de Brasília (sem horário de verão)
const chave = (data: string) => `agenda:${data}`;
const DIAS = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];

const minutos = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};
const hhmm = (min: number) => `${String(Math.floor(min / 60)).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`;

/** Momento exato (ms) de um horário em Brasília. */
export const instante = (data: string, hora: string) => Date.parse(`${data}T${hora}:00${FUSO}`);

/** "seg, 20/10" */
export function rotuloDia(data: string) {
  const [a, m, d] = data.split('-').map(Number);
  return `${DIAS[new Date(Date.UTC(a, m - 1, d)).getUTCDay()]}, ${String(d).padStart(2, '0')}/${String(m).padStart(2, '0')}`;
}
export const rotuloHorario = (data: string, hora: string) => `${rotuloDia(data)} às ${hora}`;

export function horariosDoDia() {
  const lista: string[] = [];
  for (let t = minutos(AGENDA.inicio); t + AGENDA.duracaoMin <= minutos(AGENDA.fim); t += AGENDA.duracaoMin) {
    const emPausa = AGENDA.pausas.some(([i, f]) => t + AGENDA.duracaoMin > minutos(i) && t < minutos(f));
    if (!emPausa) lista.push(hhmm(t));
  }
  return lista;
}

/** Datas (AAAA-MM-DD) de atendimento a partir de hoje, em Brasília. */
export function diasDeAtendimento(qtd = AGENDA.diasAFrente, inicioOffset = 0) {
  const hojeSP = new Date(Date.now() - 3 * 3_600_000);
  const base = Date.UTC(hojeSP.getUTCFullYear(), hojeSP.getUTCMonth(), hojeSP.getUTCDate());
  const datas: string[] = [];
  for (let i = inicioOffset; i <= qtd; i++) {
    const d = new Date(base + i * 86_400_000);
    if (AGENDA.diasDaSemana.includes(d.getUTCDay())) datas.push(d.toISOString().slice(0, 10));
  }
  return datas;
}

function parseHash(flat: string[] | null): Record<string, Ocupacao> {
  const out: Record<string, Ocupacao> = {};
  for (let i = 0; flat && i < flat.length; i += 2) {
    const v = flat[i + 1];
    try {
      out[flat[i]] = v === 'BLOQ' ? 'BLOQ' : (JSON.parse(v) as Reserva);
    } catch {
      out[flat[i]] = 'BLOQ';
    }
  }
  return out;
}

export async function ocupacao(datas: string[]) {
  if (!datas.length) return {} as Record<string, Record<string, Ocupacao>>;
  const res = await cmd<string[]>(datas.map((d) => ['HGETALL', chave(d)]));
  return Object.fromEntries(datas.map((d, i) => [d, parseHash(res[i])]));
}

/** O que o cliente vê: horários futuros, com os ocupados marcados como indisponíveis. */
export async function agendaPublica(): Promise<DiaAgenda[]> {
  const datas = diasDeAtendimento();
  const ocup = await ocupacao(datas);
  const limite = Date.now() + AGENDA.antecedenciaHoras * 3_600_000;
  return datas
    .map((data) => ({
      data,
      rotulo: rotuloDia(data),
      horarios: horariosDoDia()
        .filter((hora) => instante(data, hora) >= limite)
        .map((hora) => ({ hora, livre: !ocup[data]?.[hora] })),
    }))
    .filter((d) => d.horarios.length > 0);
}

export function horarioValido(data: string, hora: string) {
  return (
    /^\d{4}-\d{2}-\d{2}$/.test(data) &&
    diasDeAtendimento().includes(data) &&
    horariosDoDia().includes(hora) &&
    instante(data, hora) >= Date.now() + AGENDA.antecedenciaHoras * 3_600_000
  );
}

type Resultado = { ok: true; quando: string } | { ok: false; erro: string };

/** Reserva feita pelo cliente. Exige o número do pedido + CPF/CNPJ usados na compra. */
export async function reservar(pedidoId: string, documento: string, data: string, hora: string): Promise<Resultado> {
  if (!dbAtivo()) return { ok: false, erro: 'Agenda indisponível. Agende pelo WhatsApp.' };
  if (!horarioValido(data, hora)) return { ok: false, erro: 'Esse horário não está mais disponível. Escolha outro.' };

  const p = await getPedido(pedidoId);
  const soNum = (s: string) => s.replace(/\D/g, '');
  if (!p || p.status === 'cancelado' || !soNum(documento) || soNum(p.documento) !== soNum(documento)) {
    return { ok: false, erro: 'Não encontramos o seu pedido. Agende pelo WhatsApp que a gente resolve.' };
  }

  const reserva: Reserva = { pedido: p.id, nome: p.nome, telefone: p.telefone, produto: p.produto, criadoEm: Date.now() };
  const [pegou] = await cmd<number>([
    ['HSETNX', chave(data), hora, JSON.stringify(reserva)],
    ['EXPIRE', chave(data), 60 * 60 * 24 * 120], // limpa dias antigos sozinho
  ]);
  if (!pegou) return { ok: false, erro: 'Alguém acabou de reservar esse horário. Escolha outro, por favor.' };

  // Remarcação: libera o horário antigo do mesmo pedido
  if (p.agendaData && p.agendaHora && (p.agendaData !== data || p.agendaHora !== hora)) {
    await liberar(p.agendaData, p.agendaHora, p.id);
  }

  const quando = rotuloHorario(data, hora);
  await atualizarPedido(p.id, {
    agendaData: data,
    agendaHora: hora,
    agendadoPara: quando,
    status: ['pago', 'documentos'].includes(p.status) ? 'agendado' : p.status,
  });
  return { ok: true, quando };
}

/** Remove a reserva de um horário. Se `soDoPedido` for passado, só remove se for desse pedido. */
export async function liberar(data: string, hora: string, soDoPedido?: string) {
  const [raw] = await cmd<string | null>([['HGET', chave(data), hora]]);
  if (!raw) return;
  if (soDoPedido) {
    try {
      if ((JSON.parse(raw) as Reserva).pedido !== soDoPedido) return;
    } catch {
      return;
    }
  }
  await cmd([['HDEL', chave(data), hora]]);
}

/** Bloqueia um horário (ou o dia todo, com hora = 'dia') sem mexer nos já reservados. */
export async function bloquear(data: string, hora: string) {
  const horas = hora === 'dia' ? horariosDoDia() : [hora];
  await cmd(horas.map((h) => ['HSETNX', chave(data), h, 'BLOQ']));
  await cmd([['EXPIRE', chave(data), 60 * 60 * 24 * 120]]);
}

export async function desbloquear(data: string, hora: string) {
  const ocup = (await ocupacao([data]))[data] || {};
  const horas = (hora === 'dia' ? Object.keys(ocup) : [hora]).filter((h) => ocup[h] === 'BLOQ');
  if (horas.length) await cmd([['HDEL', chave(data), ...horas]]);
}
