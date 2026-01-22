import NFTDetailClient from "./NFTDetailClient";

export default async function NFTDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <NFTDetailClient id={id} />;
}
