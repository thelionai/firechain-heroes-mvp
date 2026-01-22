"use client";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { supabase } from "@/lib/supabase";
import NFTCard from "@/components/NFTCard";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Loader2, Wallet } from "lucide-react";
import { MOCK_USER_NFTS, MOCK_DONATIONS } from "@/lib/mock-data";

export default function ProfilePage() {
    const { address, isConnected } = useAccount();
    const [loading, setLoading] = useState(false);
    const [myNfts, setMyNfts] = useState<any[]>([]);
    const [stats, setStats] = useState({
        totalDonated: 0,
        stationsHelped: 0,
        nftsOwned: 0
    });

    useEffect(() => {
        const fetchUserData = async () => {
            if (!address) return;

            try {
                setLoading(true);

                // DEMO MODE CHECK
                if (process.env.NEXT_PUBLIC_USE_MOCK === 'true') {
                    console.log("USING MOCK DATA FOR PROFILE");
                    await new Promise(resolve => setTimeout(resolve, 800));

                    // Process Mock NFTs
                    const mappedNFTs = MOCK_USER_NFTS.map((item: any) => ({
                        id: item.nfts.id,
                        name: item.nfts.name,
                        price: `${item.nfts.price} ETH`,
                        image: item.nfts.image_url,
                        station: item.nfts.fire_station,
                        region: item.nfts.region,
                        rarity: item.nfts.rarity
                    }));
                    setMyNfts(mappedNFTs);

                    // Process Mock Stats
                    const totalDonated = MOCK_DONATIONS.reduce((acc, curr) => acc + curr.amount_eth, 0);
                    const uniqueStations = new Set(MOCK_DONATIONS.map(d => d.station_id)).size;

                    setStats({
                        totalDonated,
                        stationsHelped: uniqueStations,
                        nftsOwned: mappedNFTs.length
                    });

                    setLoading(false);
                    return;
                }

                // 1. Fetch User NFTs
                const { data: userNfts, error: nftError } = await supabase
                    .from('user_nfts')
                    .select(`
            *,
            nfts (*)
          `)
                    .eq('user_wallet', address);

                if (nftError) throw nftError;

                const mappedNFTs = userNfts?.map((item: any) => ({
                    id: item.nfts.id,
                    name: item.nfts.name,
                    price: `${item.nfts.price} ETH`,
                    image: item.nfts.image_url,
                    station: item.nfts.fire_station,
                    region: item.nfts.region,
                    rarity: item.nfts.rarity
                })) || [];

                setMyNfts(mappedNFTs);

                // 2. Fetch Donations for Stats
                const { data: donations, error: donationError } = await supabase
                    .from('donations')
                    .select('*')
                    .eq('user_wallet', address);

                if (donationError) throw donationError;

                const totalDonated = donations?.reduce((acc, curr) => acc + curr.amount_eth, 0) || 0;
                const uniqueStations = new Set(donations?.map(d => d.station_id)).size;

                setStats({
                    totalDonated,
                    stationsHelped: uniqueStations,
                    nftsOwned: mappedNFTs.length
                });

            } catch (error) {
                console.error("Error fetching profile data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [address]);

    if (!isConnected) {
        return (
            <div className="min-h-screen pt-32 pb-12 px-4 flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8 animate-pulse">
                    <Wallet className="w-10 h-10 text-[var(--fc-text-muted)]" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-4">Conecta tu Wallet</h1>
                <p className="text-[var(--fc-text-muted)] max-w-md mb-8">
                    Para ver tu colección de NFTs y tu impacto social, necesitas conectar tu billetera.
                </p>
                <ConnectButton />
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto">
            <ProfileHeader
                walletAddress={address || ""}
                totalDonated={stats.totalDonated.toFixed(3)}
                stationsHelped={stats.stationsHelped}
                nftsOwned={stats.nftsOwned}
            />

            <h2 className="text-2xl font-bold text-white mb-6">Mi Colección</h2>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 text-[var(--fc-teal)] animate-spin" />
                </div>
            ) : myNfts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myNfts.map((nft) => (
                        <NFTCard key={nft.id} nft={nft} />
                    ))}
                </div>
            ) : (
                <div className="glass-card p-12 text-center">
                    <p className="text-[var(--fc-text-muted)] mb-6">Aún no tienes NFTs en tu colección.</p>
                    <a href="/marketplace" className="btn-primary inline-block">
                        Ir al Marketplace
                    </a>
                </div>
            )}
        </div>
    );
}
