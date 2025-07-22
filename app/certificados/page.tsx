// app/certificados/page.tsx
"use client";

import Link from "next/link";

const certificados = [
  {
    nome: "e-CPF",
    descricao: "Certificado Digital para pessoa física.",
    link: "/solucoes/e-cpf",
  },
  {
    nome: "e-CNPJ",
    descricao: "Certificado Digital para empresas.",
    link: "/solucoes/e-cnpj",
  },
  {
    nome: "NF-e / CT-e",
    descricao: "Certificado para emissão de Nota Fiscal e Conhecimento de Transporte.",
    link: "/solucoes/nfe-cte",
  },
  {
    nome: "Bird ID PF",
    descricao: "Autenticação moderna para pessoa física.",
    link: "/solucoes/bird-id-pf",
  },
  {
    nome: "Bird ID PJ",
    descricao: "Autenticação moderna para pessoa jurídica.",
    link: "/solucoes/bird-id-pj",
  },
];

export default function CertificadosPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Certificados Digitais
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {certificados.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className="border rounded-xl p-6 bg-white shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-blue-700 mb-2">{item.nome}</h2>
            <p className="text-gray-600">{item.descricao}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
