import Image from 'next/image';
import { painelConfigurado } from '@/lib/auth';
import FormEntrar from './FormEntrar';

export const dynamic = 'force-dynamic';

export default function EntrarPage() {
  return (
    <div className="grid min-h-screen place-items-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-ink/10 bg-white p-8 shadow-card">
        <Image src="/img/logo.png" alt="Revolux" width={520} height={145} className="h-10 w-auto" />
        <h1 className="mt-6 text-2xl font-extrabold">Painel de pedidos</h1>
        {painelConfigurado() ? (
          <FormEntrar />
        ) : (
          <p className="mt-4 text-sm leading-relaxed text-ink/70">
            O painel ainda não foi ativado. Crie a variável <code className="rounded bg-paper px-1">ADMIN_SENHA</code> no Vercel (mínimo de 8 caracteres) e publique o site de novo.
          </p>
        )}
      </div>
    </div>
  );
}
