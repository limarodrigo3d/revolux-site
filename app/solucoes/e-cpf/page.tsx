'use client';

import { useState } from 'react';

const opcoes = [
  {
    id: 'ecpf-a1',
    nome: 'e-CPF A1 (Arquivo)',
    preco: 149.90,
  },
  {
    id: 'ecpf-cartao',
    nome: 'e-CPF A3 (Cartão + Leitora)',
    preco: 239.90,
  },
  {
    id: 'ecpf-token',
    nome: 'e-CPF A3 (Token)',
    preco: 299.90,
  },
];

export default function Page() {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const comprar = async (produto: typeof opcoes[number]) => {
    setLoadingId(produto.id);

    try {
      const res = await fetch('/api/pagamento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [produto],
          nome: 'Cliente',
          email: 'cliente@email.com', // Você pode substituir futuramente
        }),
      });

      const data = await res.json();
      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        alert('Erro ao iniciar pagamento.');
      }
    } catch (err) {
      console.error('Erro:', err);
      alert('Falha ao processar o pagamento.');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <main className="pt-28 px-6 pb-16 min-h-screen bg-white text-gray-800">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-6">Certificado e-CPF</h1>
        <p className="text-base mb-10">Escolha seu modelo ideal com total segurança digital.</p>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 text-left">
          {opcoes.map((opcao) => (
            <div
              key={opcao.id}
              className="border rounded-xl shadow-sm p-6 bg-gray-50 hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold mb-2 text-gray-900">{opcao.nome}</h2>
              <p className="text-blue-600 font-bold mb-4 text-sm">
                R$ {opcao.preco.toFixed(2).replace('.', ',')}
              </p>
              <button
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition disabled:opacity-50"
                onClick={() => comprar(opcao)}
                disabled={loadingId === opcao.id}
              >
                {loadingId === opcao.id ? 'Redirecionando...' : 'Comprar agora'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
