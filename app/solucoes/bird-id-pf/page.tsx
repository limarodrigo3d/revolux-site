// app/solucoes/bird-id-pf/page.tsx
"use client";

import { useCart } from "@/context/CartContext";

export default function BirdIDPFPage() {
  const { addToCart } = useCart();

  const produtos = [
    {
      id: "birdidpf-arquivo",
      nome: "Bird ID PF A1 (Arquivo)",
      preco: 179.90,
    },
    {
      id: "birdidpf-cartao",
      nome: "Bird ID PF A3 (Cartão + Leitora)",
      preco: 289.90,
    },
    {
      id: "birdidpf-token",
      nome: "Bird ID PF A3 (Token)",
      preco: 319.90,
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 py-12 px-6">
      <h1 className="text-3xl font-bold mb-6">Certificado Bird ID PF</h1>

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
