"use client";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { supabase } from "@/lib/supabase";
import { Loader2, Upload, ShieldAlert } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

// Hardcoded admin wallet for demo purposes
// Replace with your actual wallet address
const ADMIN_WALLET = "0x1234567890abcdef1234567890abcdef12345678";

const REGIONS = [
    { id: "lima", name: "Lima y Callao" },
    { id: "norte", name: "Costa Norte" },
    { id: "centro-sur", name: "Costa Centro / Sur" },
    { id: "sierra-centro", name: "Sierra Centro" },
    { id: "sierra-sur", name: "Sierra Sur" },
    { id: "selva", name: "Selva" },
];

const STATIONS = [
    { id: 1, name: "B-4 Lima", region: "lima" },
    { id: 2, name: "B-10 Salvadora Lima", region: "lima" },
    { id: 3, name: "B-27 Salvadora Chiclayo", region: "norte" },
    { id: 4, name: "B-19 Arequipa", region: "sierra-sur" },
    { id: 5, name: "B-56 Huancayo", region: "sierra-centro" },
    { id: 6, name: "B-72 Iquitos", region: "selva" },
];

export default function AdminPage() {
    const { address, isConnected } = useAccount();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        station: STATIONS[0].name,
        region: STATIONS[0].region,
        rarity: "Common",
        description: "",
    });
    const [imageFile, setImageFile] = useState<File | null>(null);

    // Simple protection
    const isAdmin = true; // For demo, allow everyone. In prod: address === ADMIN_WALLET

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            </div >
        );
}

if (!isAdmin) {
    return (
        <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-center text-red-500">
            <ShieldAlert className="w-12 h-12 mb-4" />
            <h1 className="text-2xl font-bold">Acceso Denegado</h1>
            <p>No tienes permisos de administrador.</p>
        </div>
    );
}

return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Panel de Administración</h1>

        <div className="glass-card p-8">
            <h2 className="text-xl font-bold text-white mb-6">Crear Nuevo NFT</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium text-[var(--fc-text-muted)] mb-2">Imagen del NFT</label>
                    <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-[var(--fc-teal)] transition-colors">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                            id="image-upload"
                        />
                        <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center gap-2">
                            <Upload className="w-8 h-8 text-[var(--fc-text-muted)]" />
                            <span className="text-sm text-white">
                                {imageFile ? imageFile.name : "Click para subir imagen"}
                            </span>
                        </label>
                    </div>
                </div>

                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-[var(--fc-text-muted)] mb-2">Nombre</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-[var(--fc-teal)] outline-none"
                            placeholder="Ej. Bombero Elite #001"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[var(--fc-text-muted)] mb-2">Precio (ETH)</label>
                        <input
                            type="number"
                            step="0.001"
                            required
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-[var(--fc-teal)] outline-none"
                            placeholder="0.05"
                        />
                    </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-[var(--fc-text-muted)] mb-2">Estación</label>
                        <select
                            value={formData.station}
                            onChange={(e) => {
                                const station = STATIONS.find(s => s.name === e.target.value);
                                setFormData({
                                    ...formData,
                                    station: e.target.value,
                                    region: station ? station.region : formData.region
                                });
                            }}
                            className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-[var(--fc-teal)] outline-none"
                        >
                            {STATIONS.map(s => (
                                <option key={s.id} value={s.name}>{s.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[var(--fc-text-muted)] mb-2">Rareza</label>
                        <select
                            value={formData.rarity}
                            onChange={(e) => setFormData({ ...formData, rarity: e.target.value })}
                            className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-[var(--fc-teal)] outline-none"
                        >
                            {["Common", "Rare", "Epic", "Legendary"].map(r => (
                                <option key={r} value={r}>{r}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-[var(--fc-text-muted)] mb-2">Descripción</label>
                    <textarea
                        rows={3}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-[var(--fc-teal)] outline-none"
                        placeholder="Historia del héroe..."
                    />
                </div>

                <button
                    type="submit"
                    disabled={uploading}
                    className="w-full bg-[var(--fc-teal)] hover:bg-[var(--fc-teal)]/80 text-black font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                    {uploading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" /> Creando...
                        </>
                    ) : (
                        "Crear NFT"
                    )}
                </button>

                {success && (
                    <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-200 text-center">
                        ¡NFT creado exitosamente!
                    </div>
                )}
            </form>
        </div>
    </div>
);
}
