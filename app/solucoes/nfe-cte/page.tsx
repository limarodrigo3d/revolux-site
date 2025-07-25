'use client';

import { useState } from 'react';

const opcoes = [
  {
    id: 'nfe-pj',
    nome: 'NF-e / CT-e (Pessoa Jurídica)',
    preco: 199.90,
  },
  {
    id: 'nfe-a3',
    nome: 'NF-e A3 (Token)',
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
          email: 'cliente@email.com', // Trocar por dados reais no futuro
        }),
      });

      const data = await res.json();
      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        alert('Erro ao iniciar pagamento.');
      }
    } catch (err) {
      console.error('Erro ao redirecionar:', err);
      alert('Falha ao processar pagamento.');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-white px-6 pt-28 pb-16 text-gray-800 animate-fade-in">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-blue-700">
          Certificado Digital NF-e / CT-e
        </h1>
        <p className="text-base mb-10">
          Emita notas fiscais eletrônicas com validade jurídica e segurança.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 text-left">
          {opcoes.map((opcao) => (
            <div
              key={opcao.id}
              className="bg-gray-50 border rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-2">{opcao.nome}</h2>
              <p className="text-sm text-gray-700 mb-4">
                R$ {opcao.preco.toFixed(2).replace('.', ',')}
              </p>
              <button
                onClick={() => comprar(opcao)}
                disabled={loadingId === opcao.id}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition disabled:opacity-50"
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
