"use client";
import Link from "next/link";
import { useState } from "react";
import PaymentModal from "@/components/PaymentModal";
import AnimatedCounter from "@/components/AnimatedCounter";
import { ShieldCheck } from "lucide-react";

export default function Hero() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[var(--fc-teal)]/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[var(--fc-red)]/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <div className="mx-auto max-w-7xl px-4 relative z-10 text-center flex flex-col items-center">

        {/* Trust Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-[var(--fc-teal)] mb-8 animate-fade-in-up hover:bg-white/10 transition-colors cursor-default">
          <ShieldCheck className="w-4 h-4" />
          <span>Apoyo directo al CGBVP</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-8 leading-[1.1] animate-fade-in-up delay-100">
          Héroes en <span className="text-gradient">Cadena</span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-[var(--fc-text-muted)] max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in-up delay-200 font-light">
          La primera plataforma NFT dedicada a equipar a los bomberos voluntarios del Perú.
          <strong className="text-white font-medium block mt-2">Transparencia total. Impacto real.</strong>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center w-full max-w-md animate-fade-in-up delay-300">
          <Link href="/marketplace" className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 group text-lg font-bold">
            Explorar Colección
          </Link>
          <button
            onClick={() => setOpenModal(true)}
            className="btn-secondary w-full sm:w-auto text-lg"
          >
            Donar con Yape/Plin
          </button>
        </div>

        {/* Impact Counters */}
        <div className="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-5xl animate-fade-in-up delay-500">
          {[
            { label: "S/. Recaudado", value: 12450, prefix: "S/. ", color: "text-[var(--fc-teal)]" },
            { label: "NFTs Vendidos", value: 843, prefix: "", color: "text-white" },
            { label: "Estaciones Apoyadas", value: 5, prefix: "", color: "text-[var(--fc-red)]" },
          ].map((kpi, i) => (
            <div key={i} className="glass-card p-8 flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300">
              <div className={`text-4xl md:text-5xl font-bold ${kpi.color} mb-2`}>
                <AnimatedCounter end={kpi.value} prefix={kpi.prefix} />
              </div>
              <div className="text-sm text-[var(--fc-text-muted)] font-semibold uppercase tracking-widest">{kpi.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        nftName="Donación solidaria"
        amountPen={60}
        amountNative="0.02 MATIC"
      />
    </section>
  );
}
