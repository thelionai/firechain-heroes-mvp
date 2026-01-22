"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Users, Target, ArrowLeft, ShieldCheck } from "lucide-react";
import NFTCard from "@/components/NFTCard";

// Mock Data (In a real app, fetch based on ID)
const STATION_DATA = {
    id: 1,
    name: "B-4 Lima",
    region: "Lima y Callao",
    location: "Lince, Lima",
    description: "Fundada en 1866, la Compañía de Bomberos Lima No. 4 es una de las más antiguas y activas de la capital. Especializada en rescate urbano y control de incendios estructurales, nuestros 120 voluntarios atienden más de 1,500 emergencias al año.",
    needs: [
        "Equipos de respiración autónoma (ERA)",
        "Renovación de trajes estructurales",
        "Mantenimiento de unidad de agua"
    ],
    stats: {
        members: 120,
        emergencies: "1.5k/año",
        founded: 1866
    },
    funding: {
        current: 12450,
        goal: 50000,
        percentage: 25
    },
    nfts: [
        { id: 1, name: "Bombero Elite #001", price: "0.05 ETH", image: "/hero-firefighter.png", station: "Lima 4", rarity: "Legendary" },
        { id: 4, name: "Voluntario #88", price: "0.01 ETH", image: "/hero-firefighter.png", station: "Lima 4", rarity: "Common" },
    ]
};

export default function StationProfile() {
    const params = useParams();
    // In real app: const station = fetchStation(params.id);
    const station = STATION_DATA;

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto">
            <Link href="/estaciones" className="inline-flex items-center gap-2 text-[var(--fc-text-muted)] hover:text-white mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Volver a Estaciones
            </Link>

            {/* Header Profile */}
            <div className="glass-card p-8 mb-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--fc-red)]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

                <div className="flex flex-col md:flex-row gap-8 relative z-10">
                    <div className="w-32 h-32 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                        <ShieldCheck className="w-16 h-16 text-[var(--fc-red)]" />
                    </div>

                    <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                            <div>
                                <div className="text-[var(--fc-teal)] font-bold uppercase tracking-wider text-sm mb-1">{station.region}</div>
                                <h1 className="text-4xl font-bold text-white">{station.name}</h1>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <div className="text-sm text-[var(--fc-text-muted)]">Meta de Financiamiento</div>
                                    <div className="text-xl font-bold text-white">S/. {station.funding.current.toLocaleString()} / {station.funding.goal.toLocaleString()}</div>
                                </div>
                                <div className="w-16 h-16 rounded-full border-4 border-white/10 flex items-center justify-center relative">
                                    <div className="absolute inset-0 border-4 border-[var(--fc-teal)] rounded-full border-l-transparent rotate-45" />
                                    <span className="font-bold text-white text-sm">{station.funding.percentage}%</span>
                                </div>
                            </div>
                        </div>

                        <p className="text-[var(--fc-text-muted)] leading-relaxed max-w-3xl mb-6">
                            {station.description}
                        </p>

                        <div className="flex flex-wrap gap-6 border-t border-white/10 pt-6">
                            <div className="flex items-center gap-2 text-white">
                                <MapPin className="w-5 h-5 text-[var(--fc-teal)]" />
                                <span>{station.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-white">
                                <Users className="w-5 h-5 text-[var(--fc-teal)]" />
                                <span>{station.stats.members} Voluntarios</span>
                            </div>
                            <div className="flex items-center gap-2 text-white">
                                <Target className="w-5 h-5 text-[var(--fc-teal)]" />
                                <span>{station.stats.emergencies}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Needs Column */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="glass-card p-6">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Target className="w-5 h-5 text-[var(--fc-red)]" />
                            Necesidades Urgentes
                        </h3>
                        <ul className="space-y-4">
                            {station.needs.map((need, i) => (
                                <li key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--fc-red)] mt-2" />
                                    <span className="text-[var(--fc-text-muted)] text-sm">{need}</span>
                                </li>
                            ))}
                        </ul>
                        <button className="btn-primary w-full mt-6">
                            Donar Directamente
                        </button>
                    </div>
                </div>

                {/* NFTs Column */}
                <div className="lg:col-span-2">
                    <h3 className="text-2xl font-bold text-white mb-6">NFTs de esta Estación</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {station.nfts.map((nft) => (
                            <NFTCard key={nft.id} nft={nft} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
