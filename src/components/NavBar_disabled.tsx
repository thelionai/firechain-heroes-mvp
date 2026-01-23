"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="w-full px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-white font-bold">
        FireChain Heroes
      </Link>
      <ConnectButton />
    </nav>
  );
}
