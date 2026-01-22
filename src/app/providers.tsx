"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, darkTheme, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { base, polygon } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: "FireChain Heroes",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!, // WalletConnect Cloud
  chains: [polygon, base],
  // Opcional: si quieres forzar RPCs:
  // transports: {
  //   [polygon.id]: http("https://polygon-rpc.com"),
  //   [base.id]: http("https://mainnet.base.org"),
  // },
  ssr: true,
});

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme({ accentColor: "#FF3B30" })}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
