'use client';

import { motion } from "framer-motion";
import { FaUserFriends, FaShieldAlt, FaRocket } from "react-icons/fa";

export default function SobreNos() {
  return (
    <main className="bg-white min-h-screen py-24 px-6 sm:px-10 lg:px-24 text-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-primary mb-10">
          Sobre Nós
        </h1>

        <div className="space-y-6 text-justify">
          <p className="text-lg md:text-xl leading-relaxed text-gray-700">
            A <span className="font-semibold text-primary">Revolux Certificadora Digital</span> nasceu em 2024 da união de três irmãos
            com o sonho de transformar a emissão de certificados digitais em algo mais humano,
            acessível e confiável. Mesmo sendo uma empresa jovem, carregamos uma bagagem de mais de{" "}
            <span className="font-bold">9 anos de experiência</span> no mercado, o que nos permite oferecer um
            atendimento altamente qualificado e diferenciado.
          </p>

          <p className="text-lg md:text-xl leading-relaxed text-gray-700">
            Atuamos com foco em <span className="font-semibold text-primary">agilidade, segurança e sigilo</span>, tratando cada cliente
            com empatia e respeito. Nosso compromisso é simplificar a vida das pessoas por meio da
            tecnologia, mantendo sempre o toque humano no atendimento.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-14">
          {[
            {
              icon: <FaUserFriends className="text-primary text-3xl" />,
              title: 'Atendimento Humano',
              desc: 'Empatia, paciência e atenção verdadeira no atendimento individual.',
            },
            {
              icon: <FaShieldAlt className="text-primary text-3xl" />,
              title: 'Segurança & Sigilo',
              desc: 'Total confidencialidade e as melhores práticas de proteção digital.',
            },
            {
              icon: <FaRocket className="text-primary text-3xl" />,
              title: 'Experiência e Agilidade',
              desc: 'Processos rápidos, eficientes e com alto padrão de qualidade.',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition text-center bg-white"
            >
              <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-primary/10">
                {item.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2 text-dark">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-lg md:text-xl text-dark font-medium mt-16">
          Revolux Certificadora Digital — A confiança que você busca, com a experiência que você merece.
        </p>
      </motion.div>
    </main>
  );
}
