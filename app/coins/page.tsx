"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import WatchlistButton from "../components/WatchlistButton";

interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
}

export default function CoinsPage() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [filteredCoins, setFilteredCoins] = useState<Coin[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

    async function fetchWithRetry(url: string, retries = 3): Promise<any> {
      for (let i = 0; i < retries; i++) {
        try {
          const res = await fetch(url);
          if (res.ok) return await res.json();
        } catch {}
        await delay(1500);
      }
      return null;
    }

    async function fetchCoins() {
      const data = await fetchWithRetry(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      );
      if (Array.isArray(data) && data.length > 0) {
        setCoins(data);
        setFilteredCoins(data);
      } else {
        setError("Failed to load coins. Please refresh.");
      }
      setLoading(false);
    }
    fetchCoins();
  }, []);

  useEffect(() => {
    const results = coins.filter((coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCoins(results);
  }, [search, coins]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400 text-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white px-4 md:px-10 py-10">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-bold mb-6 text-center"
      >
        Top 100 <span className="rainbow-text">Cryptocurrencies</span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center mb-8"
      >
        <input
          type="text"
          placeholder="🔍 Search coin..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-3 rounded-lg bg-gray-900/60 backdrop-blur-sm border border-gray-700 focus:outline-none focus:border-green-500 transition"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="overflow-x-auto bg-gray-900/40 backdrop-blur-sm rounded-2xl border border-gray-800 p-4"
      >
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-700 text-gray-400 text-sm md:text-base">
              <th className="text-left py-3 w-12">★</th>
              <th className="text-left py-3">Coin</th>
              <th className="text-left py-3">Price</th>
              <th className="text-left py-3">24h %</th>
              <th className="text-left py-3 hidden md:table-cell">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {filteredCoins.map((coin, idx) => (
              <motion.tr
                key={coin.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(idx * 0.02, 0.5) }}
                className="border-b border-gray-800 hover:bg-gray-800/40 transition"
              >
                <td className="py-4">
                  <WatchlistButton coinId={coin.id} />
                </td>
                <td className="py-4">
                  <Link href={`/coin/${coin.id}`} className="flex items-center gap-3 hover:text-green-400 transition">
                    <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                    {coin.name} ({coin.symbol.toUpperCase()})
                  </Link>
                </td>
                <td className="py-4">${coin.current_price.toLocaleString()}</td>
                <td className={`py-4 font-bold ${coin.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {coin.price_change_percentage_24h?.toFixed(2)}%
                </td>
                <td className="py-4 hidden md:table-cell">${coin.market_cap.toLocaleString()}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}