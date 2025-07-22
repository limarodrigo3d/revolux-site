// app/solucoes/bird-id-pf/page.tsx
"use client";

import React from "react";

export default function BirdIdPfPage() {
  const opcoes = [
    { titulo: "Bird ID PF - 12 Meses", preco: "R$ 145,00" },
    { titulo: "Bird ID PF - 24 Meses", preco: "R$ 195,00" },
    { titulo: "Bird ID PF - 36 Meses", preco: "R$ 245,00" },
  ];

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Escolha as opções disponíveis para <span className="text-blue-600">Bird ID PF</span>
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {opcoes.map((opcao, index) => (
          <div key={index} className="border rounded-xl shadow-md p-6 bg-white hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">{opcao.titulo}</h2>
            <p className="text-gray-600 mb-4">{opcao.preco}</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Comprar
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
