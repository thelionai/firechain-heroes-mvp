"use client";

import { useState } from "react";
import { ShieldAlert, Upload, Loader2 } from "lucide-react";

const STATIONS = [
    { id: 1, name: "B-4 Lima", region: "lima" },
    { id: 2, name: "B-10 Salvadora Lima", region: "lima" },
    { id: 3, name: "B-27 Salvadora Chiclayo", region: "norte" },
    { id: 4, name: "B-19 Arequipa", region: "sierra-sur" },
    { id: 5, name: "B-56 Huancayo", region: "sierra-centro" },
    { id: 6, name: "B-72 Iquitos", region: "selva" },
];

export default function AdminPage() {
    const [uploading, setUploading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        station: STATIONS[0].name,
        region: STATIONS[0].region,
        rarity: "Common",
        description: "",
    });

    const isAdmin = true;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setImageFile(file);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);

        setTimeout(() => {
            setUploading(false);
            setSuccess(true);
        }, 1200);
    };

    if (!isAdmin) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-red-500">
                <ShieldAlert className="w-12 h-12 mb-4" />
                <h1 className="text-2xl font-bold">Acceso denegado</h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 max-w-2xl mx-auto px-4">
            <h1 className="text-3xl font-bold mb-6 text-white">
                Panel de Administración
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm mb-2 text-white">Imagen</label>
                    <input type="file" onChange={handleImageChange} />
                </div>

                <input
                    className="w-full p-3 rounded bg-black/30 text-white"
                    placeholder="Nombre"
                    value={formData.name}
                    onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                    }
                />

                <input
                    className="w-full p-3 rounded bg-black/30 text-white"
                    placeholder="Precio ETH"
                    value={formData.price}
                    onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                    }
                />

                <textarea
                    className="w-full p-3 rounded bg-black/30 text-white"
                    placeholder="Descripción"
                    value={formData.description}
                    onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                    }
                />

                <button
                    type="submit"
                    disabled={uploading}
                    className="w-full py-4 bg-teal-400 text-black font-bold rounded"
                >
                    {uploading ? (
                        <Loader2 className="animate-spin mx-auto" />
                    ) : (
                        "Crear NFT"
                    )}
                </button>

                {success && (
                    <div className="text-green-400 text-center">
                        NFT creado correctamente
                    </div>
                )}
            </form>
        </div>
    );
}
