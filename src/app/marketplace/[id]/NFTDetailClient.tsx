"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PaymentModal from "@/components/PaymentModal";
import { ArrowLeft, Share2, Shield, MapPin, Zap } from "lucide-react";

export default function NFTDetailClient({ id }: { id: string }) {
    const [openModal, setOpenModal] = useState(false);

    // Mock Data (In a real app, fetch based on id)
    const nft = {
        id: id,
        name: "Bombero Elite #001",
        description: "Este NFT representa el rango más alto de valentía. Tu contribución equipará a la Compañía Lima 4 con nuevos equipos de respiración autónoma.",
        price: "0.05 ETH",
        pricePen: 350,
        image: "/hero-firefighter.png",
        station: "Lima 4",
        rarity: "Legendary",
        minted: 12,
        total: 50,
        traits: [
            { type: "Rango", value: "Capitán" },
            { type: "Especialidad", value: "Rescate" },
            { type: "Elemento", value: "Fuego" },
            { type: "Fondo", value: "Ciudad Nocturna" }
        ]
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto">
            <Link href="/marketplace" className="inline-flex items-center text-[var(--fc-text-muted)] hover:text-white mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> Volver al Marketplace
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left: Image */}
                <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                    <Image
                        src={nft.image}
                        alt={nft.name}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute top-4 right-4">
                        <button className="p-3 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors">
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Right: Details */}
                <div className="space-y-8">
                    <div>
                        <div className="flex items-center gap-2 text-[var(--fc-teal)] font-bold uppercase tracking-wider text-sm mb-2">
                            <MapPin className="w-4 h-4" /> {nft.station}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{nft.name}</h1>
                        <p className="text-[var(--fc-text-muted)] text-lg leading-relaxed">
                            {nft.description}
                        </p>
                    </div>

                    {/* Stats / Progress */}
                    <div className="glass-card p-6 space-y-4">
                        <div className="flex justify-between items-end">
                            <div>
                                <div className="text-sm text-[var(--fc-text-muted)] mb-1">Precio Actual</div>
                                <div className="text-3xl font-bold text-white">{nft.price} <span className="text-lg text-[var(--fc-text-muted)] font-normal">/ S/. {nft.pricePen}</span></div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm text-[var(--fc-text-muted)] mb-1">Disponibilidad</div>
                                <div className="text-xl font-bold text-white">{nft.minted} / {nft.total}</div>
                            </div>
                        </div>

                        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                            <div
                                className="bg-[var(--fc-teal)] h-full rounded-full"
                                style={{ width: `${(nft.minted / nft.total) * 100}%` }}
                            />
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button className="flex-1 btn-primary text-lg" onClick={() => setOpenModal(true)}>
                                Comprar Ahora
                            </button>
                        </div>
                    </div>

                    {/* Traits */}
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <Shield className="w-5 h-5 text-[var(--fc-red)]" /> Atributos
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            {nft.traits.map((trait, i) => (
                                <div key={i} className="glass-card p-4 text-center">
                                    <div className="text-xs text-[var(--fc-text-muted)] uppercase mb-1">{trait.type}</div>
                                    <div className="font-bold text-white">{trait.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Impact Note */}
                    <div className="bg-[var(--fc-teal)]/10 border border-[var(--fc-teal)]/20 rounded-2xl p-6 flex gap-4 items-start">
                        <Zap className="w-6 h-6 text-[var(--fc-teal)] flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-[var(--fc-teal)] mb-1">Impacto Directo</h4>
                            <p className="text-sm text-[var(--fc-text-muted)]">
                                El 100% de los fondos recaudados por este NFT serán gestionados por un Smart Contract para la compra directa de equipamiento.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <PaymentModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                nftName={nft.name}
                amountPen={nft.pricePen}
                amountNative={nft.price}
            />
        </div>
    );
}
