'use client';

import { FaShieldAlt, FaClock, FaUserCheck } from 'react-icons/fa';

export default function VantagensSection() {
  const vantagens = [
    {
      titulo: 'Segurança Garantida',
      descricao: 'Certificados com criptografia avançada e validação jurídica.',
      icone: <FaShieldAlt className="text-4xl text-blue-600" />,
    },
    {
      titulo: 'Agilidade no Processo',
      descricao: 'Emissão e renovação em poucos minutos, totalmente online.',
      icone: <FaClock className="text-4xl text-blue-600" />,
    },
    {
      titulo: 'Atendimento Personalizado',
      descricao: 'Suporte dedicado e consultoria para cada cliente.',
      icone: <FaUserCheck className="text-4xl text-blue-600" />,
    },
  ];

  return (
    <section className="py-24 bg-white text-gray-800 animate-fade-in">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center mb-16 text-blue-700">
          Por que escolher a Revolux?
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {vantagens.map((vantagem, index) => (
            <div
              key={index}
              className="bg-[#F2F5F9] rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="flex justify-center mb-6">{vantagem.icone}</div>
              <h3 className="text-xl font-semibold mb-3 text-[#1A1A2E]">
                {vantagem.titulo}
              </h3>
              <p className="text-sm text-gray-600">{vantagem.descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
