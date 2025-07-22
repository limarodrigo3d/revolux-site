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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo e nome */}
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="h-16" />
          <span className="text-xl font-semibold text-gray-800">
            Revolux Certificados
          </span>
        </Link>

        {/* Menu desktop */}
        <nav className="hidden md:flex gap-6 items-center text-sm font-medium text-gray-700">
          <Link href="/">Início</Link>
          <Link href="/sobrenos">Sobre Nós</Link>
          <Link href="/certificados">Certificados</Link>

          {/* Soluções com submenu */}
          <div className="relative group">
            <button className="focus:outline-none">Soluções</button>
            <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-md border opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 min-w-[200px] z-50">
              <Link
                href="/solucoes/e-cpf"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                e-CPF
              </Link>
              <Link
                href="/solucoes/e-cnpj"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                e-CNPJ
              </Link>
              <Link
                href="/solucoes/nfe-cte"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                NF-e / CT-e
              </Link>
              <Link
                href="/solucoes/bird-id-pf"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Bird ID PF
              </Link>
              <Link
                href="/solucoes/bird-id-pj"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Bird ID PJ
              </Link>
            </div>
          </div>

          <Link href="/contato">Contato</Link>
        </nav>

        {/* Botão mobile */}
        <button onClick={toggleMenu} className="md:hidden text-gray-700">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 text-sm font-medium text-gray-700 space-y-3 bg-white shadow-md">
          <Link href="/" className="block">Início</Link>
          <Link href="/sobrenos" className="block">Sobre Nós</Link>
          <Link href="/certificados" className="block">Certificados</Link>

          <button
            onClick={toggleSubMenu}
            className="block w-full text-left"
          >
            Soluções
          </button>
          {subMenuOpen && (
            <div className="ml-4 space-y-1">
              <Link href="/solucoes/e-cpf" className="block">e-CPF</Link>
              <Link href="/solucoes/e-cnpj" className="block">e-CNPJ</Link>
              <Link href="/solucoes/nfe-cte" className="block">NF-e / CT-e</Link>
              <Link href="/solucoes/bird-id-pf" className="block">Bird ID PF</Link>
              <Link href="/solucoes/bird-id-pj" className="block">Bird ID PJ</Link>
            </div>
          )}

          <Link href="/contato" className="block">Contato</Link>
        </div>
      )}
    </header>
  );
}
