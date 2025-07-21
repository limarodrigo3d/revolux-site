'use client'

import { CheckCircle } from 'lucide-react'

export default function SolucoesPage() {
  return (
    <main className="min-h-screen pt-28 px-6 pb-16 bg-white text-gray-800 animate-fade-in">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-blue-700">
          Nossas Soluções
        </h1>
        <p className="mb-10 text-lg text-gray-600">
          Certificados digitais para pessoas e empresas com segurança, praticidade e suporte especializado.
        </p>

        <section className="grid gap-8 md:grid-cols-2 text-left">
          {[
            {
              title: 'Certificado e-CPF',
              description:
                'Para pessoas físicas que precisam assinar documentos digitais com validade jurídica.',
            },
            {
              title: 'Certificado e-CNPJ',
              description:
                'Ideal para empresas que emitem NF-e, acessam sistemas do governo e realizam transações seguras.',
            },
            {
              title: 'Certificado NF-e',
              description:
                'Solução prática e eficiente para emissão de Nota Fiscal Eletrônica sem complicações.',
            },
            {
              title: 'Outros Certificados',
              description:
                'Oferecemos certificados para diversas necessidades específicas — fale com um especialista.',
            },
          ].map((solucao, index) => (
            <div
              key={index}
              className="bg-gray-50 border rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <CheckCircle className="text-blue-600 mb-3" size={28} />
              <h2 className="text-lg font-semibold mb-1">{solucao.title}</h2>
              <p className="text-sm text-gray-600">{solucao.description}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  )
}
