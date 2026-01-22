"use client";
import { useState } from "react";
import { Plus, Minus, MessageCircle, ShieldCheck, HeartHandshake, Lock } from "lucide-react";

const FAQS = [
    {
        question: "¿Qué es un NFT y por qué debería importarme?",
        answer: "Un NFT (Token No Fungible) es como un certificado digital de autenticidad. En FireChain Heroes, representa tu donación única. No es solo una imagen; es la prueba inmutable en la blockchain de que ayudaste a equipar a una estación de bomberos específica. ¡Es tu medalla de honor digital!"
    },
    {
        question: "¿Necesito saber de criptomonedas para donar?",
        answer: "¡Para nada! Hemos diseñado la plataforma para todos. Puedes usar Yape o Plin para donar en Soles como lo harías en cualquier tienda. Nosotros nos encargamos de la tecnología blockchain por detrás para garantizar la transparencia."
    },
    {
        question: "¿Cómo funciona el pago con Yape / Plin?",
        answer: "Es muy simple: 1. Eliges el NFT que te gusta. 2. Seleccionas la opción 'Yape / Plin'. 3. Escaneas el QR que te mostramos. 4. Una vez confirmado el pago, nuestro sistema 'mintea' (crea) tu NFT y te lo envía. Todo el proceso es guiado y seguro."
    },
    {
        question: "¿Cómo se usan los fondos recaudados?",
        answer: "Transparencia total: El 100% de los fondos (descontando comisiones de transacción) va directo a las necesidades listadas por cada estación. Compramos equipos (EPP, mangueras, radios) y publicamos las facturas y fotos de la entrega en nuestra sección de Impacto."
    }
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 max-w-4xl mx-auto relative">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Ayuda y Transparencia</h1>
                <p className="text-[var(--fc-text-muted)] text-lg">
                    Resolvemos tus dudas para que dones con total confianza.
                </p>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                <div className="glass-card p-6 text-center hover:-translate-y-1 transition-transform">
                    <div className="w-12 h-12 bg-[var(--fc-red)]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[var(--fc-red)]">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="text-white font-bold mb-2">Verificación Oficial</h3>
                    <p className="text-sm text-[var(--fc-text-muted)]">
                        Trabajamos directamente con los comandantes de cada compañía para validar sus necesidades.
                    </p>
                </div>
                <div className="glass-card p-6 text-center hover:-translate-y-1 transition-transform">
                    <div className="w-12 h-12 bg-[var(--fc-teal)]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[var(--fc-teal)]">
                        <Lock className="w-6 h-6" />
                    </div>
                    <h3 className="text-white font-bold mb-2">Seguridad Blockchain</h3>
                    <p className="text-sm text-[var(--fc-text-muted)]">
                        Cada donación es inmutable y rastreable. Nadie puede alterar el registro de tu ayuda.
                    </p>
                </div>
                <div className="glass-card p-6 text-center hover:-translate-y-1 transition-transform">
                    <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-400">
                        <HeartHandshake className="w-6 h-6" />
                    </div>
                    <h3 className="text-white font-bold mb-2">Compromiso Humano</h3>
                    <p className="text-sm text-[var(--fc-text-muted)]">
                        Somos voluntarios ayudando a voluntarios. Nuestra misión es 100% sin fines de lucro.
                    </p>
                </div>
            </div>

            {/* FAQ Accordion */}
            <div className="space-y-4 mb-20">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Preguntas Frecuentes</h2>
                {FAQS.map((faq, index) => (
                    <div
                        key={index}
                        className={`glass-card overflow-hidden transition-all duration-300 ${openIndex === index ? 'border-[var(--fc-teal)]/30 bg-white/5' : ''}`}
                    >
                        <button
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            className="w-full p-6 flex items-center justify-between text-left"
                        >
                            <span className="font-bold text-white text-lg">{faq.question}</span>
                            {openIndex === index ? (
                                <Minus className="w-5 h-5 text-[var(--fc-teal)] flex-shrink-0" />
                            ) : (
                                <Plus className="w-5 h-5 text-[var(--fc-text-muted)] flex-shrink-0" />
                            )}
                        </button>
                        <div
                            className={`px-6 text-[var(--fc-text-muted)] overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'
                                }`}
                        >
                            {faq.answer}
                        </div>
                    </div>
                ))}
            </div>

            {/* Chatbot Placeholder */}
            <div className="fixed bottom-6 right-6 z-50 group">
                <div className="absolute bottom-full right-0 mb-4 w-64 p-4 glass-card rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto translate-y-2 group-hover:translate-y-0 duration-300">
                    <p className="text-sm text-white mb-2">👋 ¡Hola! ¿Tienes dudas sobre cómo donar?</p>
                    <button className="text-xs text-[var(--fc-teal)] font-bold hover:underline">
                        Chatear con soporte
                    </button>
                </div>
                <button className="w-14 h-14 rounded-full bg-[var(--fc-teal)] text-black flex items-center justify-center shadow-[0_0_20px_rgba(0,255,209,0.4)] hover:scale-110 transition-transform">
                    <MessageCircle className="w-7 h-7" />
                </button>
            </div>
        </div>
    );
}
