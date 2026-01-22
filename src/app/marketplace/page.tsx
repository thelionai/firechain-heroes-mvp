"use client";
import { useState, useEffect } from "react";
import NFTCard from "@/components/NFTCard";
import { Filter, Search, MapPin, Tag, DollarSign, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Skeleton } from "@/components/ui/Skeleton";
import PageTransition from "@/components/PageTransition";
import { MOCK_NFTS } from "@/lib/mock-data";

// Shared Data Constants (Synchronized with Stations Page)
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

export default function Marketplace() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nfts, setNfts] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    rarity: "All",
    station: "All",
    region: "All",
    priceRange: "All"
  });
  const [search, setSearch] = useState("");

  // Fetch NFTs from Supabase or Mock
  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        setLoading(true);

        // DEMO MODE CHECK
        if (process.env.NEXT_PUBLIC_USE_MOCK === 'true') {
          console.log("USING MOCK DATA");
          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, 800));

          const mappedNFTs = MOCK_NFTS.map(nft => ({
            id: nft.id,
            name: nft.name,
            price: nft.price,
            image: nft.image_url,
            station: nft.fire_station,
            region: nft.region,
            rarity: nft.rarity
          }));
          setNfts(mappedNFTs);
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('nfts')
          .select('*');

        if (error) throw error;

        // Map database fields to component props if necessary
        // Assuming database columns match: id, name, price, image_url, station, region, rarity
        const mappedNFTs = data?.map(nft => ({
          id: nft.id,
          name: nft.name,
          price: `${nft.price} ETH`, // Format price
          image: nft.image_url,
          station: nft.fire_station,
          region: nft.region,
          rarity: nft.rarity
        })) || [];

        setNfts(mappedNFTs);
      } catch (err: any) {
        console.error("Error fetching NFTs:", err);
        setError("No se pudieron cargar los NFTs. Por favor intenta de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, []);

  const filteredNFTs = nfts.filter(nft => {
    if (filters.rarity !== "All" && nft.rarity !== filters.rarity) return false;
    if (filters.station !== "All" && nft.station !== filters.station) return false;
    if (filters.region !== "All" && nft.region !== filters.region) return false;
    if (search && !nft.name.toLowerCase().includes(search.toLowerCase())) return false;

    // Price filter logic
    if (filters.priceRange !== "All") {
      const priceVal = parseFloat(nft.price.replace(" ETH", ""));
      if (filters.priceRange === "low" && priceVal >= 0.01) return false;
      if (filters.priceRange === "mid" && (priceVal < 0.01 || priceVal > 0.05)) return false;
      if (filters.priceRange === "high" && priceVal <= 0.05) return false;
    }

    return true;
  });

  const clearFilters = () => {
    setFilters({ rarity: "All", station: "All", region: "All", priceRange: "All" });
    setSearch("");
  };

  // Filter stations based on selected region
  const availableStations = filters.region === "All"
    ? STATIONS
    : STATIONS.filter(s => s.region === filters.region);

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Marketplace</h1>
            <p className="text-[var(--fc-text-muted)]">Colecciona NFTs únicos y apoya a tu estación favorita.</p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--fc-text-muted)] w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar bombero..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-white focus:outline-none focus:border-[var(--fc-teal)] transition-colors placeholder:text-white/20"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0 space-y-6">
            <div className="glass-card p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <Filter className="w-4 h-4" /> Filtros
                </div>
                <button onClick={clearFilters} className="text-xs text-[var(--fc-teal)] hover:underline">
                  Limpiar
                </button>
              </div>

              <div className="space-y-6">
                {/* Region Filter */}
                <div>
                  <label className="text-xs text-[var(--fc-text-muted)] uppercase font-bold mb-3 flex items-center gap-2">
                    <MapPin className="w-3 h-3" /> Región
                  </label>
                  <select
                    className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-sm text-white focus:border-[var(--fc-teal)] outline-none"
                    value={filters.region}
                    onChange={(e) => setFilters({ ...filters, region: e.target.value, station: "All" })}
                  >
                    <option value="All">Todas las regiones</option>
                    {REGIONS.map(region => (
                      <option key={region.id} value={region.id}>{region.name}</option>
                    ))}
                  </select>
                </div>

                {/* Station Filter */}
                <div>
                  <label className="text-xs text-[var(--fc-text-muted)] uppercase font-bold mb-3 flex items-center gap-2">
                    <Tag className="w-3 h-3" /> Estación
                  </label>
                  <select
                    className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-sm text-white focus:border-[var(--fc-teal)] outline-none"
                    value={filters.station}
                    onChange={(e) => setFilters({ ...filters, station: e.target.value })}
                    disabled={availableStations.length === 0}
                  >
                    <option value="All">Todas las estaciones</option>
                    {availableStations.map(station => (
                      <option key={station.id} value={station.name}>{station.name}</option>
                    ))}
                  </select>
                </div>

                {/* Rarity Filter */}
                <div>
                  <label className="text-xs text-[var(--fc-text-muted)] uppercase font-bold mb-3 block">Rareza</label>
                  <div className="space-y-2">
                    {["All", "Legendary", "Epic", "Rare", "Common"].map((r) => (
                      <label key={r} className="flex items-center gap-2 text-sm text-[var(--fc-text-muted)] hover:text-white cursor-pointer group">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${filters.rarity === r ? "bg-[var(--fc-teal)] border-[var(--fc-teal)]" : "border-white/20 group-hover:border-white/50"}`}>
                          {filters.rarity === r && <div className="w-2 h-2 bg-black rounded-full" />}
                        </div>
                        <input
                          type="radio"
                          name="rarity"
                          checked={filters.rarity === r}
                          onChange={() => setFilters({ ...filters, rarity: r })}
                          className="hidden"
                        />
                        {r === "All" ? "Todas" : r}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div>
                  <label className="text-xs text-[var(--fc-text-muted)] uppercase font-bold mb-3 flex items-center gap-2">
                    <DollarSign className="w-3 h-3" /> Precio
                  </label>
                  <select
                    className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-sm text-white focus:border-[var(--fc-teal)] outline-none"
                    value={filters.priceRange}
                    onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                  >
                    <option value="All">Cualquier precio</option>
                    <option value="low">Menos de 0.01 ETH</option>
                    <option value="mid">0.01 - 0.05 ETH</option>
                    <option value="high">Más de 0.05 ETH</option>
                  </select>
                </div>
              </div>
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            {error && (
              <div className="glass-card p-6 mb-6 border-red-500/50 bg-red-500/10 flex items-center gap-4 text-red-200">
                <AlertCircle className="w-6 h-6 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="glass-card h-[400px] flex flex-col">
                    <Skeleton className="h-2/3 w-full rounded-t-xl rounded-b-none" />
                    <div className="p-4 space-y-3 flex-1">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-6 w-2/3" />
                      <Skeleton className="h-4 w-full mt-4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredNFTs.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNFTs.map((nft) => (
                  <NFTCard key={nft.id} nft={nft} />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="glass-card p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                  <Search className="w-8 h-8 text-[var(--fc-text-muted)]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No se encontraron resultados</h3>
                <p className="text-[var(--fc-text-muted)] max-w-md mx-auto mb-6">
                  Intenta ajustar tus filtros o búsqueda para encontrar lo que buscas.
                </p>
                <button onClick={clearFilters} className="btn-secondary">
                  Limpiar Filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

