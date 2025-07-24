'use client';

import { ShieldCheck, Building2, FileText, User, Fingerprint } from 'lucide-react';

const certificados = [
  {
    nome: 'e-CPF',
    desc: 'Certificado Digital para pessoa física.',
    link: '/solucoes/e-cpf',
    icon: <ShieldCheck className="text-primary w-6 h-6" />,
  },
  {
    nome: 'e-CNPJ',
    desc: 'Certificado Digital para empresas.',
    link: '/solucoes/e-cnpj',
    icon: <Building2 className="text-primary w-6 h-6" />,
  },
  {
    nome: 'NF-e / CT-e',
    desc: 'Para emissão de Nota Fiscal e Conhecimento de Transporte.',
    link: '/solucoes/nfe-cte',
    icon: <FileText className="text-primary w-6 h-6" />,
  },
  {
    nome: 'Bird ID PF',
    desc: 'Autenticação moderna para pessoa física.',
    link: '/solucoes/bird-id-pf',
    icon: <User className="text-primary w-6 h-6" />,
  },
  {
    nome: 'Bird ID PJ',
    desc: 'Assinatura por biometria para empresas.',
    link: '/solucoes/bird-id-pj',
    icon: <Fingerprint className="text-primary w-6 h-6" />,
  },
];

export default function CertificadosPage() {
  return (
    <main className="min-h-screen bg-white px-6 pt-28 pb-20 text-gray-800 animate-fade-in">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold text-primary mb-4">
          Certificados Digitais
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-12">
          Escolha a opção ideal para você ou sua empresa com segurança e praticidade.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {certificados.map((item) => (
            <a
              key={item.nome}
              href={item.link}
              className="group border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all bg-white text-left flex flex-col gap-3"
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <h2 className="text-lg font-bold text-primary group-hover:underline">
                  {item.nome}
                </h2>
              </div>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
