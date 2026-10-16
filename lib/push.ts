// Notificações no celular da Revolux (Web Push), usadas pelo painel instalado como app.
// Não precisa configurar nada: as chaves VAPID são geradas na primeira vez e guardadas no banco.
// (Se preferir, defina VAPID_PUBLIC_KEY e VAPID_PRIVATE_KEY no Vercel.)
// Lembrete antes da videochamada: precisa do QStash (QSTASH_TOKEN, criado pela integração Upstash QStash no Vercel).

import webpush, { type PushSubscription } from 'web-push';
import { randomBytes } from 'crypto';
import { cmd, dbAtivo } from './db';
import { SITE } from './site';

export type Aviso = { titulo: string; corpo: string; url?: string; tag?: string };

export const LEMBRETE_MINUTOS = 30; // quanto tempo antes da videochamada chega o lembrete

const K_VAPID = 'push:vapid';
const K_SUBS = 'push:subs';
const K_SEGREDO = 'push:segredo';

let vapidCache: { publicKey: string; privateKey: string } | null = null;

export async function chavesVapid() {
  if (process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
    return { publicKey: process.env.VAPID_PUBLIC_KEY, privateKey: process.env.VAPID_PRIVATE_KEY };
  }
  if (vapidCache) return vapidCache;
  const novas = webpush.generateVAPIDKeys();
  // SET NX: se duas requisições gerarem ao mesmo tempo, vale a primeira
  const [, atual] = await cmd<string | null>([
    ['SET', K_VAPID, JSON.stringify(novas), 'NX'],
    ['GET', K_VAPID],
  ]);
  vapidCache = JSON.parse(atual as string);
  return vapidCache!;
}

/** Segredo aleatório usado na URL do lembrete (só o QStash conhece). */
async function segredo() {
  const [, s] = await cmd<string | null>([
    ['SET', K_SEGREDO, randomBytes(24).toString('hex'), 'NX'],
    ['GET', K_SEGREDO],
  ]);
  return s as string;
}

export async function segredoValido(tentativa: string) {
  return !!tentativa && tentativa === (await segredo());
}

export async function salvarAssinatura(sub: PushSubscription) {
  await cmd([['HSET', K_SUBS, sub.endpoint, JSON.stringify(sub)]]);
}

export async function removerAssinatura(endpoint: string) {
  await cmd([['HDEL', K_SUBS, endpoint]]);
}

export async function qtdAparelhos() {
  if (!dbAtivo()) return 0;
  const [n] = await cmd<number>([['HLEN', K_SUBS]]);
  return n || 0;
}

/** Envia para todos os aparelhos cadastrados. Nunca lança erro (não pode atrapalhar uma venda). */
export async function notificar(aviso: Aviso) {
  if (!dbAtivo()) return 0;
  try {
    const { publicKey, privateKey } = await chavesVapid();
    const [flat] = await cmd<string[]>([['HGETALL', K_SUBS]]);
    if (!flat?.length) return 0;
    const payload = JSON.stringify({ ...aviso, url: aviso.url || '/painel' });
    let ok = 0;
    for (let i = 0; i < flat.length; i += 2) {
      try {
        await webpush.sendNotification(JSON.parse(flat[i + 1]), payload, {
          vapidDetails: { subject: SITE.url, publicKey, privateKey },
          TTL: 60 * 60 * 6,
        });
        ok++;
      } catch (e) {
        const status = (e as { statusCode?: number }).statusCode;
        if (status === 404 || status === 410) await removerAssinatura(flat[i]); // aparelho desinstalou
        else console.error('Falha ao enviar notificação', status, e);
      }
    }
    return ok;
  } catch (e) {
    console.error('Notificações indisponíveis', e);
    return 0;
  }
}

/** Agenda o lembrete X minutos antes da videochamada (via QStash). Sem QStash, não faz nada. */
export async function agendarLembrete(data: string, hora: string, pedido: string, instanteMs: number) {
  const token = process.env.QSTASH_TOKEN;
  if (!token) return false;
  const quando = Math.floor((instanteMs - LEMBRETE_MINUTOS * 60_000) / 1000);
  if (quando * 1000 < Date.now()) return false;
  try {
    const base = (process.env.QSTASH_URL || 'https://qstash.upstash.io').replace(/\/$/, '');
    const destino = `${SITE.url}/api/push/lembrete?k=${await segredo()}`;
    const res = await fetch(`${base}/v2/publish/${destino}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', 'Upstash-Not-Before': String(quando) },
      body: JSON.stringify({ data, hora, pedido }),
    });
    if (!res.ok) console.error('QStash recusou o lembrete', res.status, await res.text());
    return res.ok;
  } catch (e) {
    console.error('Falha ao agendar lembrete', e);
    return false;
  }
}
