// app/solucoes/bird-id-pj/page.tsx
"use client";

import { useCart } from "@/context/CartContext";

export default function BirdIDPJPage() {
  const { addToCart } = useCart();

  const produtos = [
    {
      id: "birdidpj-arquivo",
      nome: "Bird ID PJ A1 (Arquivo)",
      preco: 189.90,
    },
    {
      id: "birdidpj-cartao",
      nome: "Bird ID PJ A3 (Cartão + Leitora)",
      preco: 299.90,
    },
    {
      id: "birdidpj-token",
      nome: "Bird ID PJ A3 (Token)",
      preco: 329.90,
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 py-12 px-6">
      <h1 className="text-3xl font-bold mb-6">Certificado Bird ID PJ</h1>

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
