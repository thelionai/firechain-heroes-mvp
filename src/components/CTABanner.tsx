import Link from "next/link";

export default function CTABanner() {
    return (
        <section className="py-20 px-4">
            <div className="mx-auto max-w-5xl">
                <div className="relative rounded-3xl overflow-hidden p-12 text-center border border-[var(--fc-red)]/30">
                    {/* Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--fc-deep)] to-[var(--fc-red)]/20 z-0" />

                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                            Apoya hoy a quienes nos protegen
                        </h2>
                        <p className="text-lg text-[var(--fc-text-muted)] max-w-2xl mx-auto mb-8">
                            Tu contribución hace la diferencia entre un equipo obsoleto y uno que salva vidas.
                            Únete a la comunidad de FireChain Heroes.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/marketplace" className="btn-primary text-lg px-8 py-4">
                                Explorar Colección
                            </Link>
                            <Link href="/impacto" className="btn-secondary text-lg px-8 py-4">
                                Ver Impacto
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
