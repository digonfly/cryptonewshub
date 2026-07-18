"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/coins", label: "Coins" },
  { href: "/trending", label: "Trending" },
  { href: "/airdrops", label: "Airdrops" },
  { href: "/watchlist", label: "⭐ Watchlist" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-950 border-b border-gray-800 px-4 md:px-10 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          🚀 Crypto<span className="text-green-400">NewsHub</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-400 hover:text-green-400 transition font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          className="md:hidden text-gray-300 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 pb-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-gray-400 hover:text-green-400 transition font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}