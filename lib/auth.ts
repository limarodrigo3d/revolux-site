// Acesso ao painel: a senha fica na variável ADMIN_SENHA do Vercel.
import { createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';

const COOKIE = 'rvx_painel';

function token() {
  const senha = process.env.ADMIN_SENHA || '';
  return createHmac('sha256', senha).update('revolux-painel-v1').digest('hex');
}

export const painelConfigurado = () => (process.env.ADMIN_SENHA || '').length >= 8;

export function senhaCorreta(tentativa: string) {
  const senha = process.env.ADMIN_SENHA || '';
  const a = Buffer.from(tentativa);
  const b = Buffer.from(senha);
  return painelConfigurado() && a.length === b.length && timingSafeEqual(a, b);
}

export async function logado() {
  if (!painelConfigurado()) return false;
  const c = (await cookies()).get(COOKIE)?.value || '';
  const t = token();
  return c.length === t.length && timingSafeEqual(Buffer.from(c), Buffer.from(t));
}

export async function entrar() {
  (await cookies()).set(COOKIE, token(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function sair() {
  (await cookies()).delete(COOKIE);
}
