'use client';

import { useState } from 'react';

const opcoes = [
  {
    id: 'ecnpj-a1',
    nome: 'e-CNPJ A1 (Arquivo)',
    preco: 169.90,
  },
  {
    id: 'ecnpj-cartao',
    nome: 'e-CNPJ A3 (Cartão + Leitora)',
    preco: 279.90,
  },
  {
    id: 'ecnpj-token',
    nome: 'e-CNPJ A3 (Token)',
    preco: 329.90,
  },
];

export default function Page() {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [erro, setErro] = useState('');
  const [cliente] = useState({
    nome: 'Cliente',
    email: 'cliente@email.com', // Pode ser atualizado com base no login futuramente
  });

  const comprar = async (produto: typeof opcoes[number]) => {
    setErro('');
    setLoadingId(produto.id);
    try {
      const res = await fetch('/api/pagamento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [produto],
          nome: cliente.nome,
          email: cliente.email,
        }),
      });

      const data = await res.json();
      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        setErro('Erro ao iniciar pagamento.');
      }
    } catch (err) {
      console.error(err);
      setErro('Erro ao processar pagamento.');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-white px-6 pt-28 pb-16 text-gray-800 animate-fade-in">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-blue-700">
          Certificado Digital e-CNPJ
        </h1>
        <p className="text-base mb-6">
          Certifique a sua empresa com segurança e praticidade.
        </p>

        {erro && (
          <div className="mb-6 text-sm text-red-600 bg-red-100 p-3 rounded border border-red-300">
            {erro}
          </div>
        )}

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
                aria-busy={loadingId === opcao.id}
                aria-label={`Comprar ${opcao.nome}`}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loadingId === opcao.id ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      ></path>
                    </svg>
                    Redirecionando...
                  </>
                ) : (
                  'Comprar agora'
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
