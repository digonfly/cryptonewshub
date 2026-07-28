"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [coins, setCoins] = useState<Coin[]>([]);

  useEffect(() => {
    async function fetchTopCoins() {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
        );
        const data = await res.json();
        if (Array.isArray(data)) setCoins(data);
      } catch (err) {
        console.error("Footer coins error:", err);
      }
    }
    fetchTopCoins();
  }, []);

  return (
    <footer className="bg-gray-950/80 backdrop-blur-md border-t border-gray-800 mt-20 relative overflow-hidden">
      {/* Scrolling Coins Ticker */}
      {coins.length > 0 && (
        <div className="relative border-b border-gray-800 bg-gradient-to-r from-black via-gray-900 to-black py-4 overflow-hidden">
          <div className="flex ticker-scroll gap-8 whitespace-nowrap">
            {[...coins, ...coins].map((coin, idx) => (
              <div
                key={`${coin.id}-${idx}`}
                className="flex items-center gap-3 bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-full px-5 py-2 hover:border-green-500 transition"
              >
                <img src={coin.image} alt={coin.name} className="w-8 h-8" />
                <div className="flex flex-col">
                  <span className="text-white font-bold text-sm">
                    {coin.symbol.toUpperCase()}
                  </span>
                  <span className="text-gray-400 text-xs">{coin.name}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-white font-bold text-sm">
                    ${coin.current_price.toLocaleString()}
                  </span>
                  <span
                    className={`text-xs font-bold ${
                      coin.price_change_percentage_24h >= 0
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {coin.price_change_percentage_24h >= 0 ? "▲" : "▼"}{" "}
                    {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand with Logo Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Logo Image from Public Folder */}
            <Link href="/" className="flex items-center gap-3 mb-3 group">
              <div className="relative w-16 h-16 md:w-20 md:h-20 group-hover:scale-110 transition duration-300">
                <Image
                  src="/logo.png"
                  alt="CryptoNewsHub Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-bold rainbow-text">
                CryptoNewsHub
              </span>
            </Link>

            <p className="text-gray-400 text-sm mt-3">
              Real-time crypto prices, AI-powered blogs, airdrops & complete crypto tools in one place.
            </p>

            {/* Popular Coins Mini */}
            {coins.length > 0 && (
              <div className="mt-4 flex items-center gap-2 flex-wrap">
                {coins.slice(0, 5).map((coin) => (
                  <Link href={`/coin/${coin.id}`} key={coin.id}>
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="w-6 h-6 hover:scale-125 transition cursor-pointer"
                      title={coin.name}
                    />
                  </Link>
                ))}
              </div>
            )}
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-white font-bold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-green-400 text-sm transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/coins" className="text-gray-400 hover:text-green-400 text-sm transition">
                  Coins
                </Link>
              </li>
              <li>
                <Link href="/trending" className="text-gray-400 hover:text-green-400 text-sm transition">
                  Trending
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-400 hover:text-green-400 text-sm transition">
                  News
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-green-400 text-sm transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-purple-400 text-sm transition">
                  👋 About
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Tools */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-white font-bold mb-3">Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/converter" className="text-gray-400 hover:text-cyan-400 text-sm transition">
                  🔄 Converter
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-gray-400 hover:text-green-400 text-sm transition">
                  💼 Portfolio
                </Link>
              </li>
              <li>
                <Link href="/watchlist" className="text-gray-400 hover:text-yellow-400 text-sm transition">
                  ⭐ Watchlist
                </Link>
              </li>
              <li>
                <Link href="/alerts" className="text-gray-400 hover:text-blue-400 text-sm transition">
                  🔔 Price Alerts
                </Link>
              </li>
              <li>
                <Link href="/airdrops" className="text-gray-400 hover:text-purple-400 text-sm transition">
                  🎁 Airdrops
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-white font-bold mb-3">Connect</h3>
            <ul className="space-y-2 mb-4">
              <li>
                <a
                  href="https://x.com/Digonrabha1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-sky-400 text-sm transition flex items-center gap-2"
                >
                  🐦 Twitter/X
                </a>
              </li>
              <li>
                <a
                  href="mailto:digonfly@gmail.com"
                  className="text-gray-400 hover:text-red-400 text-sm transition flex items-center gap-2"
                >
                  📧 Email
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/digonfly"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-300 text-sm transition flex items-center gap-2"
                >
                  💻 GitHub
                </a>
              </li>
            </ul>

            {/* Resources */}
            <h3 className="text-white font-bold mb-2 text-sm">Data Sources</h3>
            <ul className="space-y-1">
              <li>
                <a
                  href="https://www.coingecko.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-green-400 text-xs transition"
                >
                  CoinGecko
                </a>
              </li>
              <li>
                <a
                  href="https://newsdata.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-green-400 text-xs transition"
                >
                  NewsData
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Owner Credit Section */}
        <div className="border-t border-gray-800 pt-6 mb-4">
          <div className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                D
              </div>
              <div>
                <p className="font-bold text-white">
                  <Link href="/about" className="hover:text-purple-400 transition">
                    Diganto Rabha
                  </Link>
                </p>
                <p className="text-xs text-gray-400">🚀 Founder & Developer</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://x.com/@Digonrabha1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-sky-400 transition"
                title="Twitter"
              >
                🐦
              </a>
              <a
                href="mailto:digonfly@gmail.com"
                className="text-gray-400 hover:text-red-400 transition"
                title="Email"
              >
                📧
              </a>
              <a
                href="https://github.com/digonfly"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
                title="GitHub"
              >
                💻
              </a>
              <Link
                href="/about"
                className="bg-purple-500 hover:bg-purple-600 text-white text-xs font-bold px-4 py-2 rounded-lg transition"
              >
                About Me →
              </Link>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-gray-800 pt-4">
          <p className="text-gray-500 text-xs text-center mb-2">
            ⚠️ Crypto investments are subject to market risks. Please do your own research before investing.
          </p>
          <p className="text-gray-600 text-sm text-center">
            © {currentYear} <span className="rainbow-text">CryptoNewsHub</span>. All rights reserved.
            Made with 💚 by <Link href="/about" className="text-purple-400 hover:text-purple-300 font-bold">Diganto Rabha</Link> in India 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  );
}