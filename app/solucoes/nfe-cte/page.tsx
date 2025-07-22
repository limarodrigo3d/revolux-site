// app/solucoes/nfe-cte/page.tsx
"use client";

import { useCart } from "@/context/CartContext";

export default function NFePage() {
  const { addToCart } = useCart();

  const produtos = [
    {
      id: "nfe-arquivo",
      nome: "NF-e A1 (Arquivo)",
      preco: 159.90,
    },
    {
      id: "nfe-cartao",
      nome: "NF-e A3 (Cartão + Leitora)",
      preco: 279.90,
    },
    {
      id: "nfe-token",
      nome: "NF-e A3 (Token)",
      preco: 319.90,
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 py-12 px-6">
      <h1 className="text-3xl font-bold mb-6">Certificado NF-e / CT-e</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {produtos.map((produto) => (
          <div
            key={produto.id}
            className="border rounded-xl shadow p-6 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold">{produto.nome}</h2>
              <p className="text-lg mt-2 text-blue-600 font-bold">
                R$ {produto.preco.toFixed(2).replace(".", ",")}
              </p>
            </div>
            <button
              onClick={() => addToCart(produto)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Comprar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
