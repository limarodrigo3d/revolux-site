'use client';

import { FaShieldAlt, FaClock, FaLaptopCode } from 'react-icons/fa';

export default function VantagensSection() {
  const vantagens = [
    {
      titulo: 'Segurança Jurídica',
      descricao: 'Certificados com validade jurídica garantida, protegendo seus dados e transações.',
      icone: <FaShieldAlt className="text-3xl text-blue-600" />,
    },
    {
      titulo: 'Atendimento Rápido',
      descricao: 'Emita seu certificado com agilidade e suporte especializado.',
      icone: <FaClock className="text-3xl text-blue-600" />,
    },
    {
      titulo: '100% Online',
      descricao: 'Processo totalmente digital, seguro e sem complicações.',
      icone: <FaLaptopCode className="text-3xl text-blue-600" />,
    },
  ];

  return (
    <section className="py-20 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">Por que escolher a Revolux?</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {vantagens.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl shadow hover:shadow-md p-6 transition"
            >
              <div className="mb-4">{item.icone}</div>
              <h3 className="text-xl font-semibold mb-2">{item.titulo}</h3>
              <p className="text-sm text-gray-600">{item.descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
