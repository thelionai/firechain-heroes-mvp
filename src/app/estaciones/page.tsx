"use client";
import { useState } from "react";
import Link from "next/link";
import { MapPin, ChevronRight, Shield } from "lucide-react";

// Mock Data Structure
const REGIONS = [
    { id: "lima", name: "Lima y Callao" },
    { id: "norte", name: "Costa Norte" },
    { id: "centro-sur", name: "Costa Centro / Sur" },
    { id: "sierra-centro", name: "Sierra Centro" },
    { id: "sierra-sur", name: "Sierra Sur" },
    { id: "selva", name: "Selva" },
];

const STATIONS = [
    { id: 1, name: "B-4 Lima", region: "lima", location: "Lince, Lima", members: 120, funded: 45 },
    { id: 2, name: "B-10 Salvadora Lima", region: "lima", location: "Cercado de Lima", members: 85, funded: 70 },
    { id: 3, name: "B-27 Salvadora Chiclayo", region: "norte", location: "Chiclayo", members: 60, funded: 30 },
    { id: 4, name: "B-19 Arequipa", region: "sierra-sur", location: "Arequipa", members: 90, funded: 55 },
    { id: 5, name: "B-56 Huancayo", region: "sierra-centro", location: "Huancayo", members: 50, funded: 20 },
    { id: 6, name: "B-72 Iquitos", region: "selva", location: "Iquitos", members: 45, funded: 15 },
];

export default function StationsPage() {
    const [activeRegion, setActiveRegion] = useState("lima");

    const filteredStations = STATIONS.filter(s => s.region === activeRegion);

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Nuestras Estaciones</h1>
                <p className="text-[var(--fc-text-muted)] max-w-2xl mx-auto text-lg">
                    Conoce a los héroes locales. Selecciona una región para ver las compañías que necesitan tu apoyo.
                </p>
            </div>

            {/* Region Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
                {REGIONS.map((region) => (
                    <button
                        key={region.id}
                        onClick={() => setActiveRegion(region.id)}
                        className={`px-6 py-3 rounded-full text-sm font-semibold transition-all ${activeRegion === region.id
                                ? "bg-[var(--fc-teal)] text-black shadow-[0_0_20px_rgba(0,255,209,0.3)]"
                                : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                            }`}
                    >
                        {region.name}
                    </button>
                ))}
            </div>

            {/* Stations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStations.map((station) => (
                    <Link key={station.id} href={`/estaciones/${station.id}`} className="group">
                        <div className="glass-card p-6 h-full hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Shield className="w-24 h-24 text-white" />
                            </div>

                            <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 rounded-xl bg-[var(--fc-red)]/20 flex items-center justify-center text-[var(--fc-red)] border border-[var(--fc-red)]/30">
                                    <Shield className="w-6 h-6" />
                                </div>
                                <div className="px-2 py-1 rounded bg-white/5 text-xs font-mono text-[var(--fc-teal)] border border-white/10">
                                    {station.funded}% Financiado
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[var(--fc-teal)] transition-colors">
                                {station.name}
                            </h3>

                            <div className="flex items-center gap-2 text-[var(--fc-text-muted)] text-sm mb-6">
                                <MapPin className="w-4 h-4" />
                                {station.location}
                            </div>

                            <div className="w-full bg-white/5 rounded-full h-2 mb-4 overflow-hidden">
                                <div
                                    className="bg-[var(--fc-teal)] h-full rounded-full transition-all duration-1000"
                                    style={{ width: `${station.funded}%` }}
                                />
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                <span className="text-sm text-white">{station.members} Voluntarios</span>
                                <span className="flex items-center gap-1 text-sm text-[var(--fc-teal)] font-medium group-hover:underline">
                                    Ver Perfil <ChevronRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {filteredStations.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-[var(--fc-text-muted)]">Pronto añadiremos estaciones en esta región.</p>
                </div>
            )}
        </div>
    );
}
