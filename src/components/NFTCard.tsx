import Link from "next/link";
import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";

type NFTProps = {
    id: number;
    name: string;
    price: string;
    image: string;
    station: string;
    rarity?: string;
};

const rarityColors: Record<string, string> = {
    Legendary: "bg-amber-500/20 text-amber-400 border-amber-500/50",
    Epic: "bg-purple-500/20 text-purple-400 border-purple-500/50",
    Rare: "bg-blue-500/20 text-blue-400 border-blue-500/50",
    Common: "bg-gray-500/20 text-gray-400 border-gray-500/50",
};

export default function NFTCard({ nft }: { nft: NFTProps }) {
    const rarityColor = rarityColors[nft.rarity || "Common"] || rarityColors["Common"];

    return (
        <Link href={`/marketplace/${nft.id}`} className="group block h-full">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="glass-card overflow-hidden h-full flex flex-col relative hover:shadow-[0_0_30px_rgba(0,255,209,0.15)]"
            >

                {/* Rarity Badge */}
                <div className={`absolute top-3 right-3 z-20 px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wider border backdrop-blur-md ${rarityColor}`}>
                    {nft.rarity || "Common"}
                </div>

                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-black/40">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity" />
                    <Image
                        src={nft.image}
                        alt={nft.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Quick Action */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <button className="w-full btn-primary text-sm py-3 shadow-lg font-bold tracking-wide">
                            Comprar Ahora
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow bg-gradient-to-b from-transparent to-black/20">
                    <div className="flex items-center gap-1 text-xs text-[var(--fc-teal)] font-medium mb-2 uppercase tracking-wider">
                        <BadgeCheck className="w-3 h-3" />
                        {nft.station}
                    </div>

                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[var(--fc-teal)] transition-colors line-clamp-1">
                        {nft.name}
                    </h3>

                    <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-[var(--fc-text-muted)] uppercase tracking-wider">Precio</span>
                            <span className="font-mono font-bold text-white text-lg">{nft.price}</span>
                        </div>
                        <div className="text-xs text-[var(--fc-text-muted)] bg-white/5 px-2 py-1 rounded">
                            # {nft.id.toString().padStart(4, '0')}
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
