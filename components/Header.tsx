"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);

  return (
    <header className="bg-white text-gray-800 px-6 md:px-20 py-2 shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Logo + Nome */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Revolux Certificados"
            width={160}
            height={80}
            className="object-contain"
          />
          <span className="text-lg md:text-xl font-semibold">
            Revolux Certificados
          </span>
        </Link>

        {/* Botão hambúrguer */}
        <button
          className="md:hidden text-gray-800 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menu"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Menu Desktop */}
        <nav className="hidden md:flex gap-6 text-sm items-center">
          <Link href="/" className="hover:text-[#0057D8] transition">Início</Link>
          <Link href="/certificados" className="hover:text-[#0057D8] transition">Certificados</Link>

          <div
            className="relative"
            onMouseEnter={() => setShowSubmenu(true)}
            onMouseLeave={() => setShowSubmenu(false)}
          >
            <button className="hover:text-[#0057D8] transition">Soluções</button>
            {showSubmenu && (
              <div className="absolute left-0 mt-2 w-48 bg-white text-gray-800 rounded shadow-lg z-50">
                <Link href="/solucoes/e-cpf" className="block px-4 py-2 hover:bg-gray-100">e-CPF</Link>
                <Link href="/solucoes/e-cnpj" className="block px-4 py-2 hover:bg-gray-100">e-CNPJ</Link>
                <Link href="/solucoes/nfe-cte" className="block px-4 py-2 hover:bg-gray-100">NF-e / CT-e</Link>
                <Link href="/solucoes/bird-id-pf" className="block px-4 py-2 hover:bg-gray-100">Bird ID PF</Link>
                <Link href="/solucoes/bird-id-pj" className="block px-4 py-2 hover:bg-gray-100">Bird ID PJ</Link>
              </div>
            )}
          </div>

          <Link href="/contato" className="hover:text-[#0057D8] transition">Contato</Link>
        </nav>
      </div>

      {/* Menu Mobile */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-3 text-sm bg-white text-gray-800 p-4 rounded shadow-md z-50">
          <Link href="/" className="block hover:text-[#0057D8]" onClick={() => setMenuOpen(false)}>Início</Link>
          <Link href="/certificados" className="block hover:text-[#0057D8]" onClick={() => setMenuOpen(false)}>Certificados</Link>
          <details className="group">
            <summary className="cursor-pointer hover:text-[#0057D8]">Soluções</summary>
            <div className="pl-4 mt-2 space-y-1 text-gray-600">
              <Link href="/solucoes/e-cpf" onClick={() => setMenuOpen(false)}>e-CPF</Link>
              <Link href="/solucoes/e-cnpj" onClick={() => setMenuOpen(false)}>e-CNPJ</Link>
              <Link href="/solucoes/nfe-cte" onClick={() => setMenuOpen(false)}>NF-e / CT-e</Link>
              <Link href="/solucoes/bird-id-pf" onClick={() => setMenuOpen(false)}>Bird ID PF</Link>
              <Link href="/solucoes/bird-id-pj" onClick={() => setMenuOpen(false)}>Bird ID PJ</Link>
            </div>
          </details>
          <Link href="/contato" className="block hover:text-[#0057D8]" onClick={() => setMenuOpen(false)}>Contato</Link>
        </div>
      )}
    </header>
  );
}
