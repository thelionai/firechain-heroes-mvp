import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Marketplace from '../page'
import { supabase } from '@/lib/supabase'

// Mock Supabase client
vi.mock('@/lib/supabase', () => ({
    supabase: {
        from: vi.fn(() => ({
            select: vi.fn(),
        })),
    },
}))

// Mock NFTCard component to simplify testing
vi.mock('@/components/NFTCard', () => ({
    default: ({ nft }: { nft: any }) => <div data-testid="nft-card">{nft.name}</div>,
}))

describe('Marketplace Page', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders loading state initially', () => {
        // Mock a promise that never resolves immediately to test loading state
        (supabase.from as any).mockReturnValue({
            select: vi.fn().mockReturnValue(new Promise(() => { })),
        })

        render(<Marketplace />)
        // Check for loading skeleton or indicator
        // In our component, we have a grid of pulse animations when loading
        const loadingElements = document.getElementsByClassName('animate-pulse')
        expect(loadingElements.length).toBeGreaterThan(0)
    })

    it('renders NFTs after fetching', async () => {
        const mockNFTs = [
            { id: 1, name: 'Test NFT 1', price: 0.05, image_url: '/img1.png', fire_station: 'Station 1', region: 'lima', rarity: 'Common' },
            { id: 2, name: 'Test NFT 2', price: 0.10, image_url: '/img2.png', fire_station: 'Station 2', region: 'norte', rarity: 'Rare' },
        ];

        // Mock successful response
        (supabase.from as any).mockReturnValue({
            select: vi.fn().mockResolvedValue({ data: mockNFTs, error: null }),
        })

        render(<Marketplace />)

        await waitFor(() => {
            expect(screen.getByText('Test NFT 1')).toBeInTheDocument()
            expect(screen.getByText('Test NFT 2')).toBeInTheDocument()
        })
    })

    it('filters NFTs by rarity', async () => {
        const mockNFTs = [
            { id: 1, name: 'Common NFT', price: 0.05, image_url: '/img1.png', fire_station: 'Station 1', region: 'lima', rarity: 'Common' },
            { id: 2, name: 'Legendary NFT', price: 0.10, image_url: '/img2.png', fire_station: 'Station 2', region: 'norte', rarity: 'Legendary' },
        ];

        (supabase.from as any).mockReturnValue({
            select: vi.fn().mockResolvedValue({ data: mockNFTs, error: null }),
        })

        render(<Marketplace />)

        await waitFor(() => {
            expect(screen.getByText('Common NFT')).toBeInTheDocument()
        })

        // Click on Legendary filter
        // Note: In our UI, radio buttons are hidden and labels are used. 
        // We can find the label text "Legendary" and click it.
        const legendaryFilter = screen.getByLabelText('Legendary')
        fireEvent.click(legendaryFilter)

        await waitFor(() => {
            expect(screen.queryByText('Common NFT')).not.toBeInTheDocument()
            expect(screen.getByText('Legendary NFT')).toBeInTheDocument()
        })
    })

    it('shows error message on fetch failure', async () => {
        (supabase.from as any).mockReturnValue({
            select: vi.fn().mockResolvedValue({ data: null, error: { message: 'Network error' } }),
        })

        render(<Marketplace />)

        await waitFor(() => {
            expect(screen.getByText(/No se pudieron cargar los NFTs/i)).toBeInTheDocument()
        })
    })
})
