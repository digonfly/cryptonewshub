"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-black text-white px-8 py-4 flex justify-between items-center">
      <h1 className="text-3xl font-bold text-cyan-400">
        CryptoNewsHub
      </h1>

      <div className="flex gap-8">
        <Link href="/">Home</Link>
        <Link href="/news">News</Link>
        <Link href="/airdrops">Airdrops</Link>
        <Link href="/trading">Trading Tips</Link>
      </div>
    </nav>
  );
}