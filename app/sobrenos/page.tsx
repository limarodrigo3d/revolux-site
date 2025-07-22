"use client";

import { motion } from "framer-motion";
import { FaUserFriends, FaShieldAlt, FaRocket } from "react-icons/fa";

export default function SobreNos() {
  return (
    <main className="bg-white min-h-screen py-16 px-6 sm:px-10 lg:px-24 text-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center text-[#1A1A2E] mb-6">Sobre Nós</h1>

        <p className="text-lg text-gray-700 mb-6 leading-relaxed text-justify">
          A <strong>Revolux Certificadora Digital</strong> nasceu em 2024 da união de três irmãos com o sonho de transformar a emissão de certificados digitais em algo mais humano, acessível e confiável. Mesmo sendo uma empresa jovem, carregamos uma bagagem de mais de <strong>9 anos de experiência</strong> no mercado, o que nos permite oferecer um atendimento altamente qualificado e diferenciado.
        </p>

        <p className="text-lg text-gray-700 mb-6 leading-relaxed text-justify">
          Atuamos com foco em <strong>agilidade, segurança e sigilo</strong>, tratando cada cliente com empatia e respeito. Nosso compromisso é simplificar a vida das pessoas por meio da tecnologia, mantendo sempre o toque humano no atendimento.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <div className="p-6 rounded-xl shadow-md border hover:shadow-lg transition duration-300 text-center">
            <FaUserFriends className="text-[#1A1A2E] text-4xl mx-auto mb-4" />
            <h3 className="font-semibold text-xl mb-2">Atendimento Humano</h3>
            <p className="text-gray-600 text-sm">Nossa equipe se dedica a entender e atender cada cliente com empatia, paciência e atenção verdadeira.</p>
          </div>

          <div className="p-6 rounded-xl shadow-md border hover:shadow-lg transition duration-300 text-center">
            <FaShieldAlt className="text-[#1A1A2E] text-4xl mx-auto mb-4" />
            <h3 className="font-semibold text-xl mb-2">Segurança & Sigilo</h3>
            <p className="text-gray-600 text-sm">Tratamos seus dados com total confidencialidade e as melhores práticas de proteção digital.</p>
          </div>

          <div className="p-6 rounded-xl shadow-md border hover:shadow-lg transition duration-300 text-center">
            <FaRocket className="text-[#1A1A2E] text-4xl mx-auto mb-4" />
            <h3 className="font-semibold text-xl mb-2">Experiência e Agilidade</h3>
            <p className="text-gray-600 text-sm">Com anos de experiência, realizamos os processos com eficiência e rapidez sem abrir mão da qualidade.</p>
          </div>
        </div>

        <p className="text-center text-lg text-[#1A1A2E] font-medium mt-12">
          Revolux Certificadora Digital — A confiança que você busca, com a experiência que você merece.
        </p>
      </motion.div>
    </main>
  );
}
