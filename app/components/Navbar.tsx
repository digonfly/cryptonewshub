"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/coins", label: "Coins" },
  { href: "/trending", label: "Trending" },
  { href: "/news", label: "📰 News" },
  { href: "/blog", label: "📝 Blog" },
  { href: "/airdrops", label: "Airdrops" },
  { href: "/watchlist", label: "⭐ Watchlist" },
  { href: "/alerts", label: "🔔 Alerts" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-950/80 backdrop-blur-md border-b border-gray-800 px-4 md:px-10 py-4 sticky top-0 z-50"
    >
      <div className="flex items-center justify-between">
        <Link href="/" className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <span>🚀</span>
          <span className="rainbow-text">CryptoNewsHub</span>
        </Link>

        <div className="hidden lg:flex items-center gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-400 hover:text-green-400 transition font-medium text-sm"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          className="lg:hidden text-gray-300 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="lg:hidden mt-4 flex flex-col gap-4 pb-2"
        >
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
        </motion.div>
      )}
    </motion.nav>
  );
}