export const MOCK_NFTS = [
    { id: 1, name: "Bombero Elite #001", price: "0.05 ETH", image_url: "/hero-firefighter.png", fire_station: "B-4 Lima", region: "lima", rarity: "Legendary" },
    { id: 2, name: "Rescate Urbano #042", price: "0.02 ETH", image_url: "/hero-firefighter.png", fire_station: "B-10 Salvadora Lima", region: "lima", rarity: "Rare" },
    { id: 3, name: "Unidad Hazmat #103", price: "0.03 ETH", image_url: "/hero-firefighter.png", fire_station: "B-4 Lima", region: "lima", rarity: "Epic" },
    { id: 4, name: "Voluntario #88", price: "0.01 ETH", image_url: "/hero-firefighter.png", fire_station: "B-4 Lima", region: "lima", rarity: "Common" },
    { id: 5, name: "Jefe de Brigada", price: "0.10 ETH", image_url: "/hero-firefighter.png", fire_station: "B-10 Salvadora Lima", region: "lima", rarity: "Legendary" },
    { id: 6, name: "Operador de Bomba", price: "0.02 ETH", image_url: "/hero-firefighter.png", fire_station: "B-27 Salvadora Chiclayo", region: "norte", rarity: "Rare" },
    { id: 7, name: "Paramédico #12", price: "0.04 ETH", image_url: "/hero-firefighter.png", fire_station: "B-27 Salvadora Chiclayo", region: "norte", rarity: "Epic" },
    { id: 8, name: "Cadete #05", price: "0.005 ETH", image_url: "/hero-firefighter.png", fire_station: "B-19 Arequipa", region: "sierra-sur", rarity: "Common" },
    { id: 9, name: "Rescate Andino #01", price: "0.06 ETH", image_url: "/hero-firefighter.png", fire_station: "B-56 Huancayo", region: "sierra-centro", rarity: "Epic" },
    { id: 10, name: "Guardián Amazónico", price: "0.05 ETH", image_url: "/hero-firefighter.png", fire_station: "B-72 Iquitos", region: "selva", rarity: "Legendary" },
];

export const MOCK_USER_NFTS = [
    {
        id: 1,
        nfts: {
            id: 1,
            name: "Bombero Elite #001",
            price: 0.05,
            image_url: "/hero-firefighter.png",
            fire_station: "B-4 Lima",
            region: "lima",
            rarity: "Legendary"
        },
        purchased_at: new Date().toISOString()
    },
    {
        id: 2,
        nfts: {
            id: 3,
            name: "Unidad Hazmat #103",
            price: 0.03,
            image_url: "/hero-firefighter.png",
            fire_station: "B-4 Lima",
            region: "lima",
            rarity: "Epic"
        },
        purchased_at: new Date().toISOString()
    }
];

export const MOCK_DONATIONS = [
    { id: 1, amount_eth: 0.05, station_id: "B-4 Lima", created_at: new Date().toISOString() },
    { id: 2, amount_eth: 0.03, station_id: "B-4 Lima", created_at: new Date().toISOString() }
];
