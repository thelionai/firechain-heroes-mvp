import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-[var(--fc-deep)] mt-20">
            <div className="mx-auto max-w-7xl px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="text-2xl font-bold tracking-wide text-white">
                            FireChain <span className="text-[var(--fc-teal)]">Heroes</span>
                        </Link>
                        <p className="mt-4 text-sm text-[var(--fc-text-muted)] max-w-xs">
                            La primera plataforma Web3 solidaria dedicada a apoyar a los bomberos voluntarios del Perú. Transparencia, tecnología y corazón.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Plataforma</h3>
                        <ul className="space-y-2 text-sm text-[var(--fc-text-muted)]">
                            <li><Link href="/marketplace" className="hover:text-[var(--fc-teal)] transition-colors">Marketplace</Link></li>
                            <li><Link href="/impacto" className="hover:text-[var(--fc-teal)] transition-colors">Impacto</Link></li>
                            <li><Link href="/estaciones" className="hover:text-[var(--fc-teal)] transition-colors">Estaciones</Link></li>
                            <li><Link href="/ayuda" className="hover:text-[var(--fc-teal)] transition-colors">Ayuda / FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Síguenos</h3>
                        <div className="flex gap-4">
                            <a href="#" className="text-[var(--fc-text-muted)] hover:text-white transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="text-[var(--fc-text-muted)] hover:text-white transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="text-[var(--fc-text-muted)] hover:text-white transition-colors"><Twitter size={20} /></a>
                        </div>
                        <p className="mt-6 text-xs text-[var(--fc-text-muted)]">
                            &copy; {new Date().getFullYear()} FireChain Heroes.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
