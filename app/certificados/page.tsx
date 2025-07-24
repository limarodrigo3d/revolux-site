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
    <main className="min-h-screen bg-gray-50 py-24 px-6 text-gray-900">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">
          Certificados Digitais
        </h1>
        <p className="text-lg text-gray-600">
          Escolha a opção ideal para você ou sua empresa com segurança e praticidade.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {certificados.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className="block border border-gray-200 rounded-2xl p-6 bg-white shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out"
          >
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">{item.nome}</h2>
            <p className="text-gray-600 text-sm">{item.descricao}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
