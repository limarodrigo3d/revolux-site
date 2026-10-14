'use client';

import { useActionState } from 'react';
import { acaoEntrar } from '../actions';

export default function FormEntrar() {
  const [estado, acao, enviando] = useActionState(acaoEntrar, null);
  return (
    <form action={acao} className="mt-8 space-y-4">
      <div>
        <label htmlFor="senha" className="label">Senha</label>
        <input id="senha" name="senha" type="password" required autoFocus autoComplete="current-password" className="input" />
      </div>
      {estado?.erro && <p role="alert" className="text-sm text-red-700">{estado.erro}</p>}
      <button className="btn-navy w-full" disabled={enviando}>{enviando ? 'Entrando…' : 'Entrar'}</button>
    </form>
  );
}
