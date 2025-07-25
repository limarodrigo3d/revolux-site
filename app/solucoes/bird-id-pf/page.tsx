'use client';

import { useState } from 'react';

const opcoes = [
  {
    id: 'birdidpf',
    nome: 'Bird ID PF (Pessoa Física)',
    preco: 169.90,
  },
];

export default function Page() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (opcao: typeof opcoes[0]) => {
    setLoading(opcao.id);

    try {
      const response = await fetch('/api/pagamento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [opcao],
          nome: 'Cliente',
          email: 'cliente@email.com', // Você pode substituir depois com dados reais
        }),
      });

      const data = await response.json();

      if (data.init_point) {
        window.location.href = data.init_point; // Redireciona para o Mercado Pago
      } else {
        alert('Erro ao iniciar pagamento.');
      }
    } catch (error) {
      console.error('Erro ao redirecionar:', error);
      alert('Falha ao processar pagamento.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <main className="min-h-screen bg-white px-6 pt-28 pb-16 text-gray-800 animate-fade-in">
      <section className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-blue-700">
          Certificado Bird ID - Pessoa Física
        </h1>
        <p className="text-base mb-10">
          Realize assinaturas com biometria facial e máxima segurança.
        </p>

        <div className="grid gap-6 md:grid-cols-2 text-left">
          {opcoes.map((opcao) => (
            <article
              key={opcao.id}
              className="bg-gray-50 border rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-2">{opcao.nome}</h2>
              <p className="text-sm text-gray-700 mb-4">
                R$ {opcao.preco.toFixed(2).replace('.', ',')}
              </p>
              <button
                onClick={() => handleCheckout(opcao)}
                disabled={loading === opcao.id}
                className={`w-full py-2 px-4 rounded transition text-white font-medium ${
                  loading === opcao.id
                    ? 'bg-blue-300 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {loading === opcao.id ? 'Redirecionando...' : 'Comprar agora'}
              </button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
