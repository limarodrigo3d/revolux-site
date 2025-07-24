"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function SolucoesPage() {
  const opcoes = [
    {
      title: "Certificado e-CPF",
      href: "/solucoes/e-cpf",
      description:
        "Ideal para pessoas físicas que precisam assinar documentos digitais com validade jurídica.",
    },
    {
      title: "Certificado e-CNPJ",
      href: "/solucoes/e-cnpj",
      description:
        "Para empresas que emitem NF-e, acessam sistemas do governo e assinam digitalmente.",
    },
    {
      title: "Certificado NF-e / CT-e",
      href: "/solucoes/nfe-cte",
      description:
        "Emitir Nota Fiscal Eletrônica e Conhecimento de Transporte com praticidade.",
    },
    {
      title: "Bird ID - Pessoa Física",
      href: "/solucoes/bird-id-pf",
      description:
        "Certificado com biometria facial e emissão 100% online para pessoas físicas.",
    },
    {
      title: "Bird ID - Pessoa Jurídica",
      href: "/solucoes/bird-id-pj",
      description:
        "Certificado com biometria facial e emissão remota para empresas.",
    },
  ];

  return (
    <main className="min-h-screen pt-28 px-6 pb-20 bg-gray-50 text-gray-800 animate-fade-in">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold mb-4 text-blue-700">Nossas Soluções</h1>
        <p className="mb-12 text-lg text-gray-600">
          Conheça os tipos de certificados digitais que oferecemos para você e sua empresa.
        </p>

        <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 text-left">
          {opcoes.map((item, index) => (
            <Link
              href={item.href}
              key={index}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-blue-600 transition-all block"
            >
              <div className="flex items-start gap-3">
                <CheckCircle className="text-blue-600 mt-1" size={24} />
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">
                    {item.title}
                  </h2>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
