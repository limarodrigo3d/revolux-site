'use client';

import { FaShieldAlt, FaClock, FaUserCheck } from 'react-icons/fa';

export default function VantagensSection() {
  const vantagens = [
    {
      titulo: 'Segurança Garantida',
      descricao: 'Certificados com criptografia avançada e validação jurídica.',
      icone: <FaShieldAlt className="text-3xl text-blue-600" />,
    },
    {
      titulo: 'Agilidade no Processo',
      descricao: 'Emissão e renovação em poucos minutos, totalmente online.',
      icone: <FaClock className="text-3xl text-blue-600" />,
    },
    {
      titulo: 'Atendimento Personalizado',
      descricao: 'Suporte dedicado e consultoria para cada cliente.',
      icone: <FaUserCheck className="text-3xl text-blue-600" />,
    },
  ];

  return (
    <section className="py-20 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-700">
          Por que escolher a Revolux?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {vantagens.map((vantagem, index) => (
            <div
              key={index}
              className="p-6 bg-[#F2F5F9] rounded-xl shadow hover:shadow-md transition"
            >
              <div className="mb-4">{vantagem.icone}</div>
              <h3 className="text-xl font-semibold mb-2">{vantagem.titulo}</h3>
              <p>{vantagem.descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
