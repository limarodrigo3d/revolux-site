'use client';

import { useState } from 'react';
import { waLink } from '@/lib/site';
import { mascaraTelefone } from '@/lib/pedido';
import { WhatsIcon } from '@/components/Icones';

const assuntos = ['Quero comprar um certificado', 'Renovar meu certificado', 'Ajuda com instalação', 'Sou contador(a) / parceria', 'Outro assunto'];

export default function FormContato() {
  const [f, setF] = useState({ nome: '', cidade: '', telefone: '', assunto: assuntos[0], mensagem: '' });
  const [enviado, setEnviado] = useState(false);

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    const texto = [
      `Olá! Meu nome é ${f.nome.trim()}${f.cidade ? ` (${f.cidade.trim()})` : ''}.`,
      `*Assunto:* ${f.assunto}`,
      f.telefone ? `*Meu WhatsApp:* ${f.telefone}` : '',
      f.mensagem ? `\n${f.mensagem.trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n');
    window.open(waLink(texto), '_blank', 'noopener');
    setEnviado(true);
  };

  return (
    <form onSubmit={enviar} className="rounded-2xl border border-ink/10 bg-white p-6 shadow-card md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="nome" className="label">Seu nome</label>
          <input id="nome" required className="input" value={f.nome} onChange={(e) => setF({ ...f, nome: e.target.value })} autoComplete="name" />
        </div>
        <div>
          <label htmlFor="cidade" className="label">Cidade / UF</label>
          <input id="cidade" className="input" value={f.cidade} onChange={(e) => setF({ ...f, cidade: e.target.value })} placeholder="Ex.: Ubá / MG" />
        </div>
        <div>
          <label htmlFor="tel" className="label">WhatsApp (opcional)</label>
          <input
            id="tel"
            inputMode="tel"
            className="input"
            value={f.telefone}
            onChange={(e) => setF({ ...f, telefone: mascaraTelefone(e.target.value) })}
            placeholder="(00) 00000-0000"
          />
        </div>
        <div>
          <label htmlFor="assunto" className="label">Assunto</label>
          <select id="assunto" className="input" value={f.assunto} onChange={(e) => setF({ ...f, assunto: e.target.value })}>
            {assuntos.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="msg" className="label">Mensagem</label>
          <textarea id="msg" rows={4} className="input resize-none" value={f.mensagem} onChange={(e) => setF({ ...f, mensagem: e.target.value })} />
        </div>
      </div>
      <button type="submit" className="btn-wa mt-6 w-full py-4 text-base">
        <WhatsIcon /> Enviar pelo WhatsApp
      </button>
      <p className="mt-3 text-center text-sm text-ink/55">
        {enviado ? 'Abrimos o WhatsApp com sua mensagem pronta. É só tocar em enviar.' : 'O WhatsApp abre com a mensagem pronta. É só enviar.'}
      </p>
    </form>
  );
}
