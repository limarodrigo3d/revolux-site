"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleSubMenu = () => setSubMenuOpen(!subMenuOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo e nome */}
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo Revolux" className="h-12 md:h-16" />
          <span className="text-lg md:text-xl font-semibold text-gray-800">
            Revolux Certificados
          </span>
        </Link>

        {/* Menu desktop */}
        <nav className="hidden md:flex gap-6 items-center text-sm font-medium text-gray-700">
          <Link href="/" className="hover:text-blue-600 transition">Início</Link>
          <Link href="/sobrenos" className="hover:text-blue-600 transition">Sobre Nós</Link>
          <Link href="/certificados" className="hover:text-blue-600 transition">Certificados</Link>

          {/* Soluções com submenu */}
          <div className="relative group">
            <button className="hover:text-blue-600 transition">Soluções</button>
            <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-md border opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 min-w-[200px] z-50">
              <Link href="/solucoes/e-cpf" className="block px-4 py-2 hover:bg-gray-100">e-CPF</Link>
              <Link href="/solucoes/e-cnpj" className="block px-4 py-2 hover:bg-gray-100">e-CNPJ</Link>
              <Link href="/solucoes/nfe-cte" className="block px-4 py-2 hover:bg-gray-100">NF-e / CT-e</Link>
              <Link href="/solucoes/bird-id-pf" className="block px-4 py-2 hover:bg-gray-100">Bird ID PF</Link>
              <Link href="/solucoes/bird-id-pj" className="block px-4 py-2 hover:bg-gray-100">Bird ID PJ</Link>
            </div>
          </div>

          <Link href="/contato" className="hover:text-blue-600 transition">Contato</Link>
        </nav>

        {/* Botão mobile */}
        <button onClick={toggleMenu} className="md:hidden text-gray-700 focus:outline-none">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 bg-white shadow-md text-sm font-medium text-gray-700 space-y-3">
          <Link href="/" className="block hover:text-blue-600 transition">Início</Link>
          <Link href="/sobrenos" className="block hover:text-blue-600 transition">Sobre Nós</Link>
          <Link href="/certificados" className="block hover:text-blue-600 transition">Certificados</Link>

          <button onClick={toggleSubMenu} className="block w-full text-left hover:text-blue-600 transition">
            Soluções
          </button>
          {subMenuOpen && (
            <div className="ml-4 space-y-1">
              <Link href="/solucoes/e-cpf" className="block hover:text-blue-600">e-CPF</Link>
              <Link href="/solucoes/e-cnpj" className="block hover:text-blue-600">e-CNPJ</Link>
              <Link href="/solucoes/nfe-cte" className="block hover:text-blue-600">NF-e / CT-e</Link>
              <Link href="/solucoes/bird-id-pf" className="block hover:text-blue-600">Bird ID PF</Link>
              <Link href="/solucoes/bird-id-pj" className="block hover:text-blue-600">Bird ID PJ</Link>
            </div>
          )}

          <Link href="/contato" className="block hover:text-blue-600 transition">Contato</Link>
        </div>
      )}
    </header>
  );
}
