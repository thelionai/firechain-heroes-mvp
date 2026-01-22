import { Wallet, Heart, Shield } from "lucide-react";

interface ProfileHeaderProps {
    walletAddress: string;
    totalDonated: string;
    stationsHelped: number;
    nftsOwned: number;
}

export default function ProfileHeader({ walletAddress, totalDonated, stationsHelped, nftsOwned }: ProfileHeaderProps) {
    return (
        <div className="glass-card p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--fc-orange)] to-[var(--fc-red)] flex items-center justify-center">
                        <Wallet className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Mi Perfil</h1>
                        <p className="text-[var(--fc-text-muted)] font-mono text-sm">
                            {walletAddress}
                        </p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="text-center px-6 py-3 bg-white/5 rounded-xl border border-white/10">
                        <div className="flex items-center justify-center gap-2 text-[var(--fc-teal)] mb-1">
                            <Heart className="w-4 h-4" />
                        </div>
                        <div className="text-2xl font-bold text-white">{totalDonated} ETH</div>
                        <div className="text-xs text-[var(--fc-text-muted)] uppercase">Donado</div>
                    </div>

                    <div className="text-center px-6 py-3 bg-white/5 rounded-xl border border-white/10">
                        <div className="flex items-center justify-center gap-2 text-[var(--fc-orange)] mb-1">
                            <Shield className="w-4 h-4" />
                        </div>
                        <div className="text-2xl font-bold text-white">{stationsHelped}</div>
                        <div className="text-xs text-[var(--fc-text-muted)] uppercase">Estaciones</div>
                    </div>

                    <div className="text-center px-6 py-3 bg-white/5 rounded-xl border border-white/10">
                        <div className="flex items-center justify-center gap-2 text-purple-400 mb-1">
                            <Wallet className="w-4 h-4" />
                        </div>
                        <div className="text-2xl font-bold text-white">{nftsOwned}</div>
                        <div className="text-xs text-[var(--fc-text-muted)] uppercase">NFTs</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
