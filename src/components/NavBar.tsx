"use client";
import Link from "next/link";
import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Menu, X } from "lucide-react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Marketplace", href: "/marketplace" },
    { name: "Impacto", href: "/impacto" },
    { name: "Estaciones", href: "/estaciones" },
    { name: "Ayuda", href: "/ayuda" },
    { name: "Mi Perfil", href: "/profile" },
  ];

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/5">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-wide text-white flex items-center gap-2">
          FireChain <span className="text-[var(--fc-teal)]">Heroes</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 text-sm font-medium text-[var(--fc-text-muted)]">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-white hover:text-[var(--fc-teal)] transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <ConnectButton showBalance={false} accountStatus="address" chainStatus="icon" />
          <button className="bg-[var(--fc-red)] hover:bg-[var(--fc-red-hover)] text-white text-sm font-bold rounded-lg px-4 py-2 transition-all shadow-[0_0_10px_rgba(255,59,48,0.3)]">
            Donar
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[var(--fc-deep)] border-b border-white/10 p-4 flex flex-col gap-4 animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[var(--fc-text-muted)] hover:text-white py-2 block"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <ConnectButton showBalance={false} />
            <button className="w-full bg-[var(--fc-red)] text-white font-bold rounded-lg px-4 py-3">
              Donar
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
