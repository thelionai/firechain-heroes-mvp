import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "FireChain Heroes",
  description: "NFTs solidarios para los bomberos del Perú.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="dark">
      <body>
        <Providers>
          <NavBar />
          <main className="min-h-screen flex flex-col">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
