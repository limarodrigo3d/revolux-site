"use client";

import { FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#F9FAFB] text-gray-700 pt-12 pb-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-sm">

        {/* Acesso Rápido */}
        <div>
          <h4 className="text-[#0057D8] font-semibold mb-4">Acesso Rápido</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-black">Instalação A1</a></li>
            <li><a href="#" className="hover:text-black">Aplicações e Usos</a></li>
            <li><a href="#" className="hover:text-black">Renovação</a></li>
            <li><a href="#" className="hover:text-black">Ajuda</a></li>
            <li><a href="#" className="hover:text-black">Política de Privacidade</a></li>
          </ul>
        </div>

        {/* Formas de Pagamento */}
        <div>
          <h4 className="text-[#0057D8] font-semibold mb-4">Formas de Pagamento</h4>
          <div className="flex flex-wrap gap-4">
            <img src="/visa.svg" alt="Visa" className="h-6" />
            <img src="/mastercard.svg" alt="MasterCard" className="h-6" />
            <img src="/elo.svg" alt="Elo" className="h-6" />
            <img src="/pix.svg" alt="Pix" className="h-6" />
            <img src="/hipercard.svg" alt="Hipercard" className="h-6" />
            <img src="/amex.svg" alt="Amex" className="h-6" />
            <img src="/diners.svg" alt="Diners Club" className="h-6" />
          </div>
        </div>

        {/* Atendimento */}
        <div>
          <h4 className="text-[#0057D8] font-semibold mb-4">Atendimento</h4>
          <a
            href="https://wa.me/553235328411"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl font-medium shadow hover:bg-green-400 transition"
          >
            <FaWhatsapp className="text-lg" />
            WhatsApp Comercial
          </a>
          <div className="mt-4 flex gap-4 justify-start">
            <a
              href="https://www.instagram.com/revolux_certificadodigital"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0057D8] hover:text-black text-xl transition-transform hover:scale-110"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Rodapé inferior */}
      <div className="mt-10 text-center text-xs text-gray-500 px-4">
        <p>
          © 2025 <strong className="text-gray-800">Revolux Certificados Digitais</strong>. Todos os direitos reservados.
        </p>
        <p className="mt-1">
          Desenvolvido por{" "}
          <a
            href="https://agenciarevolux.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0057D8] hover:underline font-semibold"
          >
            Agência Revolux®
          </a>
        </p>
      </div>
    </footer>
  );
}