'use client';

import { motion } from "framer-motion";
import { FaUserFriends, FaShieldAlt, FaRocket, FaQuoteLeft, FaHandshake, FaBullseye, FaEye } from "react-icons/fa";

export default function QuemSomos() {
  return (
    <main className="bg-white min-h-screen py-24 px-6 sm:px-10 lg:px-24 text-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        {/* Título principal */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-primary mb-10">
          Quem Somos
        </h1>

        {/* História */}
        <div className="space-y-6 text-justify text-lg md:text-xl text-gray-700 leading-relaxed mb-16">
          <p>
            A <span className="font-semibold text-primary">Revolux Certificadora Digital</span> nasceu da união de três irmãos com uma missão clara: transformar a certificação digital em uma experiência simples, segura e humana.
          </p>
          <p>
            Embora recente como marca, trazemos <span className="font-bold">mais de 9 anos de experiência</span> no setor. Acreditamos que a tecnologia deve facilitar a vida, não complicar — e é isso que entregamos todos os dias.
          </p>
        </div>

        {/* Missão, Visão, Valores */}
        <div className="grid md:grid-cols-3 gap-8 text-center mb-20">
          {[
            {
              icon: <FaBullseye className="text-primary text-3xl" />,
              title: "Missão",
              desc: "Simplificar o acesso à certificação digital com atendimento humano, seguro e eficiente.",
            },
            {
              icon: <FaEye className="text-primary text-3xl" />,
              title: "Visão",
              desc: "Ser referência nacional em certificação digital com foco em confiança e proximidade.",
            },
            {
              icon: <FaHandshake className="text-primary text-3xl" />,
              title: "Valores",
              desc: "Empatia, agilidade, transparência, ética e excelência técnica em cada entrega.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-6 border rounded-2xl shadow-sm hover:shadow-md bg-white transition"
            >
              <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-primary/10">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Diferenciais */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: <FaUserFriends className="text-primary text-3xl" />,
              title: "Atendimento Humano",
              desc: "Você fala com pessoas reais, que se importam com a sua experiência.",
            },
            {
              icon: <FaShieldAlt className="text-primary text-3xl" />,
              title: "Segurança Garantida",
              desc: "Tratamos seus dados com responsabilidade, sigilo e proteção total.",
            },
            {
              icon: <FaRocket className="text-primary text-3xl" />,
              title: "Agilidade de Verdade",
              desc: "Resolvemos rápido — sem perder qualidade ou compromisso.",
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

        {/* Depoimentos */}
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold text-primary mb-8">O que dizem nossos clientes</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Carlos M.",
                msg: "Fui atendido de forma ágil e respeitosa. Muito acima do padrão que esperava!",
              },
              {
                name: "Juliana R.",
                msg: "Senti segurança em cada etapa. Atendimento humano e suporte impecável.",
              },
            ].map((dep, i) => (
              <motion.div
                key={i}
                className="bg-gray-50 border border-gray-200 p-6 rounded-xl shadow-sm"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-3 mb-4 text-left">
                  <FaQuoteLeft className="text-primary mt-1 text-lg" />
                  <p className="text-gray-700 text-sm">{dep.msg}</p>
                </div>
                <p className="text-sm font-semibold text-gray-800 text-right">— {dep.name}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA final */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="mt-12 bg-primary text-white text-center px-8 py-10 rounded-2xl shadow-md max-w-3xl mx-auto"
        >
          <h3 className="text-2xl font-semibold mb-4">
            Pronto para emitir seu certificado com segurança e atendimento humano?
          </h3>
          <a
            href="/contato"
            className="inline-block mt-4 bg-white text-primary font-bold py-2 px-6 rounded-full hover:bg-gray-100 transition"
          >
            Fale com a Revolux
          </a>
        </motion.div>
      </motion.div>
    </main>
  );
}
