"use client";
import { BarChart3, TrendingUp, Users, MapPin, ShieldCheck, FileText, ExternalLink } from "lucide-react";

export default function ImpactPage() {
    return (
        <div className="min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--fc-teal)]/10 border border-[var(--fc-teal)]/20 text-[var(--fc-teal)] text-sm font-bold mb-6 animate-fade-in">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Transparencia Blockchain 100% Verificable</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Panel de Impacto</h1>
                <p className="text-[var(--fc-text-muted)] max-w-2xl mx-auto text-lg">
                    Cada sol donado es rastreable. Aquí mostramos cómo tu apoyo equipa a los bomberos del Perú.
                </p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                {[
                    { icon: <TrendingUp className="w-6 h-6" />, label: "Total Recaudado", value: "S/. 12,450", color: "text-[var(--fc-teal)]", bg: "bg-[var(--fc-teal)]/10" },
                    { icon: <Users className="w-6 h-6" />, label: "Bomberos Beneficiados", value: "142", color: "text-white", bg: "bg-white/10" },
                    { icon: <BarChart3 className="w-6 h-6" />, label: "Equipos Entregados", value: "28", color: "text-[var(--fc-red)]", bg: "bg-[var(--fc-red)]/10" },
                    { icon: <MapPin className="w-6 h-6" />, label: "Regiones Apoyadas", value: "3", color: "text-purple-400", bg: "bg-purple-500/10" },
                ].map((kpi, i) => (
                    <div key={i} className="glass-card p-6 flex items-center gap-4 hover:-translate-y-1 transition-transform">
                        <div className={`p-3 rounded-full ${kpi.bg} ${kpi.color}`}>
                            {kpi.icon}
                        </div>
                        <div>
                            <div className="text-xs text-[var(--fc-text-muted)] uppercase font-bold">{kpi.label}</div>
                            <div className="text-2xl font-bold text-white">{kpi.value}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {/* Funds by Equipment (Horizontal Bar) */}
                <div className="glass-card p-8 lg:col-span-2">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-[var(--fc-teal)]" />
                        Destino de Fondos (Equipamiento)
                    </h3>
                    <div className="space-y-6">
                        {[
                            { label: "Equipos de Protección Personal (EPP)", pct: 45, amount: "S/. 5,602", color: "bg-[var(--fc-red)]" },
                            { label: "Mantenimiento de Unidades", pct: 30, amount: "S/. 3,735", color: "bg-[var(--fc-teal)]" },
                            { label: "Herramientas de Rescate", pct: 15, amount: "S/. 1,867", color: "bg-purple-500" },
                            { label: "Capacitación y Logística", pct: 10, amount: "S/. 1,245", color: "bg-gray-500" },
                        ].map((item, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-white font-medium">{item.label}</span>
                                    <span className="text-white font-bold">{item.amount}</span>
                                </div>
                                <div className="w-full bg-white/5 rounded-full h-4 overflow-hidden relative">
                                    <div className={`h-full rounded-full ${item.color} relative group`} style={{ width: `${item.pct}%` }}>
                                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </div>
                                <div className="text-right text-xs text-[var(--fc-text-muted)] mt-1">{item.pct}% del total</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Funds by Region (Vertical Bar Chart Simulation) */}
                <div className="glass-card p-8 flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-purple-400" />
                        Por Región
                    </h3>
                    <div className="flex-1 flex items-end justify-between gap-4 px-2 pb-4 border-b border-white/10 min-h-[200px]">
                        {[
                            { label: "Lima", pct: 60, height: "h-[60%]", color: "bg-[var(--fc-teal)]" },
                            { label: "Norte", pct: 25, height: "h-[25%]", color: "bg-purple-500" },
                            { label: "Sur", pct: 15, height: "h-[15%]", color: "bg-[var(--fc-red)]" },
                        ].map((bar, i) => (
                            <div key={i} className="flex flex-col items-center gap-2 w-full group">
                                <div className="text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity mb-1">{bar.pct}%</div>
                                <div className={`w-full max-w-[60px] rounded-t-lg ${bar.color} ${bar.height} relative transition-all hover:brightness-110`}></div>
                                <div className="text-xs text-[var(--fc-text-muted)] font-medium">{bar.label}</div>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-[var(--fc-text-muted)] mt-4 text-center">
                        Distribución basada en la ubicación de las estaciones beneficiadas.
                    </p>
                </div>
            </div>

            {/* Top Stations Table */}
            <div className="glass-card p-8 mb-12">
                <h3 className="text-xl font-bold text-white mb-6">Estaciones con Mayor Recaudación</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-[var(--fc-text-muted)] text-sm border-b border-white/10">
                                <th className="py-3 font-medium">Estación</th>
                                <th className="py-3 font-medium">Región</th>
                                <th className="py-3 font-medium">Donantes</th>
                                <th className="py-3 font-medium text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody className="text-white">
                            {[
                                { name: "Compañía Lima 4", region: "Lima", donors: 45, total: "S/. 5,200" },
                                { name: "Compañía Roma 2", region: "Lima", donors: 32, total: "S/. 3,100" },
                                { name: "Compañía France 3", region: "Lima", donors: 28, total: "S/. 2,800" },
                                { name: "Salvadora Chiclayo 27", region: "Norte", donors: 15, total: "S/. 1,350" },
                            ].map((row, i) => (
                                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="py-4 font-medium">{row.name}</td>
                                    <td className="py-4 text-sm text-[var(--fc-text-muted)]">{row.region}</td>
                                    <td className="py-4 text-sm">{row.donors}</td>
                                    <td className="py-4 font-bold text-[var(--fc-teal)] text-right">{row.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Transparency Footer */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex gap-4">
                    <FileText className="w-8 h-8 text-blue-400 flex-shrink-0" />
                    <div>
                        <h4 className="text-white font-bold mb-1">Reportes Mensuales</h4>
                        <p className="text-sm text-[var(--fc-text-muted)] mb-3">
                            Publicamos estados de cuenta detallados y facturas de compra de equipamiento.
                        </p>
                        <button className="text-xs text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1">
                            Ver Documentación <ExternalLink className="w-3 h-3" />
                        </button>
                    </div>
                </div>
                <div className="p-6 rounded-2xl bg-[var(--fc-teal)]/10 border border-[var(--fc-teal)]/20 flex gap-4">
                    <ShieldCheck className="w-8 h-8 text-[var(--fc-teal)] flex-shrink-0" />
                    <div>
                        <h4 className="text-white font-bold mb-1">Smart Contracts Auditados</h4>
                        <p className="text-sm text-[var(--fc-text-muted)] mb-3">
                            El código que gestiona las donaciones es público y ha sido verificado para garantizar seguridad.
                        </p>
                        <button className="text-xs text-[var(--fc-teal)] hover:text-[var(--fc-teal)]/80 font-bold flex items-center gap-1">
                            Ver en Etherscan <ExternalLink className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
