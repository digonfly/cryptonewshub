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

export default function WatchlistPage() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [watchlistIds, setWatchlistIds] = useState<string[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadWatchlist() {
      try {
        const stored = localStorage.getItem("watchlist");
        const ids: string[] = stored ? JSON.parse(stored) : [];
        setWatchlistIds(ids);

        if (ids.length === 0) {
          setLoading(false);
          return;
        }

        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids.join(
            ","
          )}&order=market_cap_desc&sparkline=false`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch watchlist coins");
        }

        const data = await res.json();
        if (Array.isArray(data)) {
          setCoins(data);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load watchlist. Please refresh after a few seconds.");
      } finally {
        setLoading(false);
      }
    }

    loadWatchlist();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-10 py-10">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-black via-gray-950 to-yellow-950/20" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl md:text-5xl font-bold mb-3">
          ⭐{" "}
          <span className="text-yellow-400 drop-shadow-[0_0_25px_rgba(234,179,8,0.8)]">
            My Watchlist
          </span>
        </h1>
        <p className="text-gray-400">Your saved coins for quick access</p>
      </motion.div>

      {error ? (
        <div className="text-center py-20">
          <p className="text-red-400 text-xl mb-6">{error}</p>
          <Link
            href="/coins"
            className="bg-green-500 hover:bg-green-600 text-black font-bold px-6 py-3 rounded-xl inline-block"
          >
            Browse Coins →
          </Link>
        </div>
      ) : watchlistIds.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20"
        >
          <p className="text-2xl mb-4">😢 Your watchlist is empty</p>
          <p className="text-gray-400 mb-6">
            Add coins to your watchlist by clicking the star icon.
          </p>
          <Link
            href="/coins"
            className="bg-green-500 hover:bg-green-600 text-black font-bold px-6 py-3 rounded-xl inline-block shadow-[0_0_20px_rgba(34,197,94,0.5)]"
          >
            Browse Coins →
          </Link>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="overflow-x-auto bg-gray-900/40 backdrop-blur-sm rounded-2xl border border-gray-800 p-4"
        >
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-700 text-gray-400 text-sm md:text-base">
                <th className="text-left py-3 w-12">★</th>
                <th className="text-left py-3">Coin</th>
                <th className="text-left py-3">Price</th>
                <th className="text-left py-3">24h %</th>
                <th className="text-left py-3 hidden md:table-cell">
                  Market Cap
                </th>
              </tr>
            </thead>

            <tbody>
              {coins.map((coin, idx) => (
                <motion.tr
                  key={coin.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: Math.min(idx * 0.05, 0.5) }}
                  className="border-b border-gray-800 hover:bg-gray-800/40 transition"
                >
                  <td className="py-4">
                    <WatchlistButton coinId={coin.id} />
                  </td>

                  <td className="py-4">
                    <Link
                      href={`/coin/${coin.id}`}
                      className="flex items-center gap-3 hover:text-yellow-400 transition"
                    >
                      <img
                        src={coin.image}
                        alt={coin.name}
                        className="w-6 h-6"
                      />
                      {coin.name} ({coin.symbol.toUpperCase()})
                    </Link>
                  </td>

                  <td className="py-4">
                    ${coin.current_price.toLocaleString()}
                  </td>

                  <td
                    className={`py-4 font-bold ${
                      coin.price_change_percentage_24h >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {coin.price_change_percentage_24h?.toFixed(2)}%
                  </td>

                  <td className="py-4 hidden md:table-cell">
                    ${coin.market_cap.toLocaleString()}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
}