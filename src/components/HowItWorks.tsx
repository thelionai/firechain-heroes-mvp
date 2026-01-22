import { Wallet, ShoppingCart, Heart } from "lucide-react";

export default function HowItWorks() {
    const steps = [
        {
            icon: <ShoppingCart className="w-8 h-8 text-[var(--fc-teal)]" />,
            title: "1. Elige un NFT",
            desc: "Explora nuestra colección y selecciona el arte digital que más te inspire."
        },
        {
            icon: <Wallet className="w-8 h-8 text-[var(--fc-teal)]" />,
            title: "2. Paga con Wallet o Yape/Plin",
            desc: "Facilitamos tu donación con métodos de pago flexibles y seguros."
        },
        {
            icon: <Heart className="w-8 h-8 text-[var(--fc-red)]" />,
            title: "3. Apoyas a los bomberos",
            desc: "El 100% de los fondos se destinan directamente a equipamiento vital."
        }
    ];

    return (
        <section className="py-24 relative overflow-hidden bg-black/20">
            <div className="mx-auto max-w-7xl px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">¿Cómo funciona?</h2>
                    <p className="text-[var(--fc-text-muted)] max-w-2xl mx-auto text-lg">
                        Tu ayuda llega a quienes más lo necesitan en 3 simples pasos.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, i) => (
                        <div key={i} className="glass-card p-10 text-center flex flex-col items-center hover:-translate-y-2 transition-transform duration-300 group">
                            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:border-[var(--fc-teal)]/50 transition-colors">
                                {step.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                            <p className="text-[var(--fc-text-muted)] leading-relaxed">
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
