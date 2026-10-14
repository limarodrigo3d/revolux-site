// Banco de dados dos pedidos (Upstash Redis via REST — plano grátis no Vercel Marketplace).
// Variáveis criadas automaticamente pela integração do Vercel:
//   KV_REST_API_URL e KV_REST_API_TOKEN  (ou UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN)
// Sem essas variáveis o site continua funcionando; só o painel fica desativado.

export type Status = 'aguardando' | 'pago' | 'documentos' | 'agendado' | 'emitido' | 'cancelado';

export const STATUS: { id: Status; nome: string }[] = [
  { id: 'aguardando', nome: 'Aguardando pagamento' },
  { id: 'pago', nome: 'Pago' },
  { id: 'documentos', nome: 'Documentos ok' },
  { id: 'agendado', nome: 'Vídeo agendada' },
  { id: 'emitido', nome: 'Emitido' },
  { id: 'cancelado', nome: 'Cancelado' },
];

export type PedidoDB = {
  id: string;
  criadoEm: number;
  origem: 'site' | 'manual';
  produtoId: string;
  produto: string;
  preco: number;
  nome: string;
  email: string;
  documento: string;
  telefone: string;
  cidade: string;
  status: Status;
  pagamentoId?: string;
  pagoEm?: number;
  agendadoPara?: string; // texto livre, ex.: "15/10 às 14h"
  emitidoEm?: number;
  validade?: string; // AAAA-MM-DD
  avisos?: string[]; // marcações de lembrete enviados, ex.: "30d", "7d", "manual:2026-10-14"
  notas?: string;
};

const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '';
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '';

export const dbAtivo = () => Boolean(URL_ && TOKEN);

async function cmd<T = unknown>(comandos: (string | number)[][]): Promise<T[]> {
  const res = await fetch(`${URL_.replace(/\/$/, '')}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(comandos),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Redis HTTP ${res.status}`);
  const data = (await res.json()) as { result?: T; error?: string }[];
  return data.map((d) => {
    if (d.error) throw new Error(d.error);
    return d.result as T;
  });
}

const chave = (id: string) => `pedido:${id}`;

export async function salvarPedido(p: PedidoDB) {
  if (!dbAtivo()) return;
  await cmd([
    ['SET', chave(p.id), JSON.stringify(p)],
    ['ZADD', 'pedidos', p.criadoEm, p.id],
  ]);
}

export async function getPedido(id: string): Promise<PedidoDB | null> {
  if (!dbAtivo()) return null;
  const [raw] = await cmd<string | null>([['GET', chave(id)]]);
  return raw ? (JSON.parse(raw) as PedidoDB) : null;
}

export async function atualizarPedido(id: string, patch: Partial<PedidoDB>) {
  const atual = await getPedido(id);
  if (!atual) return null;
  const novo = { ...atual, ...patch, id: atual.id };
  await cmd([['SET', chave(id), JSON.stringify(novo)]]);
  return novo;
}

export async function listarPedidos(limite = 500): Promise<PedidoDB[]> {
  if (!dbAtivo()) return [];
  const [ids] = await cmd<string[]>([['ZRANGE', 'pedidos', 0, limite - 1, 'REV']]);
  if (!ids?.length) return [];
  const [vals] = await cmd<(string | null)[]>([['MGET', ...ids.map(chave)]]);
  return vals.filter(Boolean).map((v) => JSON.parse(v as string) as PedidoDB);
}

export async function excluirPedido(id: string) {
  await cmd([
    ['DEL', chave(id)],
    ['ZREM', 'pedidos', id],
  ]);
}

/** Dias até a validade (negativo = vencido). */
export function diasParaVencer(p: PedidoDB, hoje = new Date()) {
  if (!p.validade) return null;
  const v = new Date(`${p.validade}T12:00:00-03:00`).getTime();
  return Math.round((v - hoje.getTime()) / 86_400_000);
}

export function somarMeses(data: Date, meses: number) {
  const d = new Date(data);
  d.setMonth(d.getMonth() + meses);
  return d.toISOString().slice(0, 10);
}
