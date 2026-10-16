// Cadastra (POST) ou remove (DELETE) o aparelho que recebe as notificações. Só com login no painel.
import { NextResponse } from 'next/server';
import { logado } from '@/lib/auth';
import { dbAtivo } from '@/lib/db';
import { chavesVapid, removerAssinatura, salvarAssinatura } from '@/lib/push';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!(await logado()) || !dbAtivo()) return NextResponse.json({ erro: 'não autorizado' }, { status: 401 });
  return NextResponse.json({ publicKey: (await chavesVapid()).publicKey });
}

export async function POST(req: Request) {
  if (!(await logado()) || !dbAtivo()) return NextResponse.json({ erro: 'não autorizado' }, { status: 401 });
  const sub = await req.json().catch(() => null);
  if (!sub?.endpoint || !/^https:\/\//.test(sub.endpoint) || !sub.keys?.p256dh || !sub.keys?.auth) {
    return NextResponse.json({ erro: 'assinatura inválida' }, { status: 400 });
  }
  await salvarAssinatura({ endpoint: sub.endpoint, keys: { p256dh: sub.keys.p256dh, auth: sub.keys.auth } });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  if (!(await logado()) || !dbAtivo()) return NextResponse.json({ erro: 'não autorizado' }, { status: 401 });
  const { endpoint } = await req.json().catch(() => ({}));
  if (endpoint) await removerAssinatura(String(endpoint));
  return NextResponse.json({ ok: true });
}
