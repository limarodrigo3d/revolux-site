'use client';

import { FaUserFriends, FaShieldAlt, FaRocket } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const images = [
  '/mulher-1.jpg',
  '/mulher-2.jpg',
  '/mulher-3.jpg',
  '/mulher-4.jpg',
];

export default function Home() {
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = images[index];
    img.onload = () => setLoaded(true);
    img.onerror = () => setLoaded(true);
  }, [index]);

  useEffect(() => {
    const timer = setInterval(() => {
      setLoaded(false);
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="bg-white text-gray-800">
      {/* HERO */}
      <section className="relative h-screen min-h-[600px] pt-24 overflow-hidden bg-black">
        {loaded && (
          <motion.div
            key={`bg-${index}`}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.2, scale: 0.98 }}
            transition={{ duration: 1 }}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${images[index]})` }}
              role="img"
              aria-label="Imagem ilustrativa de atendimento"
            >
              <div className="w-full h-full bg-black/60" />
            </div>
          </motion.div>
        )}

        <div className="absolute inset-0 flex items-center justify-center z-10 px-6 text-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-xl mb-8 leading-tight">
              Certificação digital com atendimento humano,<br className="hidden md:inline" />
              seguro e sem complicações.
            </h1>
            <a
              href="/contato"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-6 py-3 rounded-lg shadow-lg transition"
            >
              Solicitar Certificado
            </a>
          </div>
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">Por que escolher a Revolux?</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: <FaUserFriends className="text-primary text-3xl" />,
                title: 'Atendimento Humano',
                desc: 'Empatia, paciência e suporte real. Nada de robôs.',
              },
              {
                icon: <FaShieldAlt className="text-primary text-3xl" />,
                title: 'Segurança e Sigilo',
                desc: 'Proteção completa dos seus dados e documentos.',
              },
              {
                icon: <FaRocket className="text-primary text-3xl" />,
                title: 'Agilidade na Entrega',
                desc: 'Certificados emitidos de forma rápida e sem dor de cabeça.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-md transition text-center"
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="bg-blue-50 py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">Como funciona?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Escolha o certificado',
                desc: 'Defina o tipo ideal para sua necessidade.',
              },
              {
                step: '2',
                title: 'Envie seus dados',
                desc: 'Preencha os dados com segurança. Rápido e prático.',
              },
              {
                step: '3',
                title: 'Receba seu certificado',
                desc: 'Tudo validado? Você está pronto para usar!',
              },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white rounded-xl shadow text-left">
                <span className="text-primary font-bold text-xl mb-2 inline-block">
                  Etapa {item.step}
                </span>
                <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICADOS EM DESTAQUE */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-10">Certificados em Destaque</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            {[
              {
                title: 'e-CPF',
                desc: 'Ideal para pessoas físicas com validade jurídica.',
                href: '/solucoes/e-cpf',
              },
              {
                title: 'e-CNPJ',
                desc: 'Certificação empresarial segura e confiável.',
                href: '/solucoes/e-cnpj',
              },
              {
                title: 'Bird ID PF',
                desc: 'Assinatura com biometria facial. 100% online.',
                href: '/solucoes/bird-id-pf',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 border rounded-xl shadow hover:shadow-lg transition text-left"
              >
                <h3 className="text-xl font-semibold text-blue-700 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{item.desc}</p>
                <a
                  href={item.href}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium"
                >
                  Ver opções
                </a>
              </div>
            ))}
          </div>
          <a
            href="/certificados"
            className="inline-block text-blue-700 font-semibold hover:underline"
          >
            Ver todos os certificados →
          </a>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-blue-600 text-white py-16 text-center px-6">
        <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
        <p className="mb-6 text-lg">Fale com a equipe Revolux e emita seu certificado agora mesmo.</p>
        <a
          href="/contato"
          className="inline-block bg-white text-blue-600 font-bold py-3 px-6 rounded-full hover:bg-gray-100 transition"
        >
          Entrar em contato
        </a>
      </section>
    </main>
  );
}
