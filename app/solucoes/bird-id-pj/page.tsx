'use client';

import { useState } from 'react';

const opcoes = [
  {
    id: 'birdidpj',
    nome: 'Bird ID PJ (Pessoa Jurídica)',
    preco: 189.90,
  },
];

export default function Page() {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleCheckout = async (produto: typeof opcoes[0]) => {
    setLoadingId(produto.id);

    try {
      const response = await fetch('/api/pagamento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [
            {
              id: produto.id,
              nome: produto.nome,
              preco: produto.preco,
              quantidade: 1,
            },
          ],
          nome: 'Cliente Revolux',
          email: 'cliente@revolux.com.br',
        }),
      });

      const data = await response.json();

      if (data?.init_point) {
        window.location.href = data.init_point;
      } else {
        alert('Erro ao redirecionar para o pagamento.');
      }
    } catch (error) {
      console.error('Erro ao criar preferência:', error);
      alert('Erro ao processar o pagamento.');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-white px-6 pt-28 pb-16 text-gray-800 animate-fade-in">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-blue-700">
          Certificado Bird ID - Pessoa Jurídica
        </h1>
        <p className="text-base mb-10">
          Faça autenticações com reconhecimento facial para empresas.
        </p>

        <div className="grid gap-6 md:grid-cols-2 text-left">
          {opcoes.map((produto) => (
            <div
              key={produto.id}
              className="bg-gray-50 border rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-2">{produto.nome}</h2>
              <p className="text-sm text-gray-700 mb-4">
                R$ {produto.preco.toFixed(2).replace('.', ',')}
              </p>
              <button
                onClick={() => handleCheckout(produto)}
                disabled={loadingId === produto.id}
                className={`w-full py-2 px-4 rounded text-white font-medium transition ${
                  loadingId === produto.id
                    ? 'bg-blue-300 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {loadingId === produto.id ? 'Redirecionando...' : 'Comprar agora'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
