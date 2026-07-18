"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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

  useEffect(() => {
    async function loadWatchlist() {
      const stored = localStorage.getItem("watchlist");
      const ids: string[] = stored ? JSON.parse(stored) : [];
      setWatchlistIds(ids);

      if (ids.length === 0) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids.join(
            ","
          )}&order=market_cap_desc&sparkline=false`
        );
        const data = await res.json();
        if (Array.isArray(data)) setCoins(data);
      } catch (err) {
        console.error("Failed to load watchlist:", err);
      } finally {
        setLoading(false);
      }
    }

    loadWatchlist();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center text-xl">
        Loading your watchlist...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-10 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-bold mb-3">
          ⭐ My Watchlist
        </h1>
        <p className="text-gray-400">
          Your saved coins for quick access
        </p>
      </div>

      {watchlistIds.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-2xl mb-4">😢 Your watchlist is empty</p>
          <p className="text-gray-400 mb-6">
            Add coins to your watchlist by clicking the star icon
          </p>
          <Link
            href="/coins"
            className="bg-green-500 hover:bg-green-600 text-black font-bold px-6 py-3 rounded-xl inline-block"
          >
            Browse Coins →
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-700 text-gray-400 text-sm md:text-base">
                <th className="text-left py-3">★</th>
                <th className="text-left py-3">Coin</th>
                <th className="text-left py-3">Price</th>
                <th className="text-left py-3">24h %</th>
                <th className="text-left 