"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedLogo from "./AnimatedLogo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/coins", label: "Coins" },
  { href: "/trending", label: "Trending" },
  { href: "/news", label: "📰 News" },
  { href: "/blog", label: "📝 Blog" },
  { href: "/converter", label: "🔄 Converter" },
  { href: "/portfolio", label: "💼 Portfolio" },
  { href: "/airdrops", label: "🎁 Airdrops" },
  { href: "/watchlist", label: "⭐ Watchlist" },
  { href: "/alerts", label: "🔔 Alerts" },
  { href: "/about", label: "👋 About" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-950/80 backdrop-blur-md border-b border-gray-800 px-4 md:px-10 py-3 sticky top-0 z-50"
    >
      <div className="flex items-center justify-between">
        {/* Animated Logo */}
        <Link href="/" className="hover-lift">
          <AnimatedLogo size="small" showText={true} />
        </Link>

        {/* Desktop Links */}
        <div className="hidden xl:flex items-center gap-3">
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

        {/* Mobile Menu Button */}
        <button
          className="xl:hidden text-gray-300 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="xl:hidden mt-4 flex flex-col gap-4 pb-2"
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