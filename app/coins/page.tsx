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

export default function CoinsPage() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [filteredCoins, setFilteredCoins] = useState<Coin[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCoins() {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        );
        const data = await res.json();
        setCoins(data);
        setFilteredCoins(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching coins:", error);
        setLoading(false);
      }
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
      <div className="min-h-screen flex items-center justify-center text-xl text-gray-400">
        Loading coins...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-10 py-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
        Top 100 Cryptocurrencies
      </h1>

      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search coin..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:border-green-500"
        />
      </div>

      <div className="overflow-x-auto">
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
            {filteredCoins.map((coin) => (
              <tr
                key={coin.id}
                className="border-b border-gray-800 hover:bg-gray-900 transition"
              >
                <td className="py-4">
                  <WatchlistButton coinId={coin.id} />
                </td>
                <td className="py-4">
                  <Link
                    href={`/coin/${coin.id}`}
                    className="flex items-center gap-3 hover:text-green-400"
                  >
                    <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                    {coin.name} ({coin.symbol.toUpperCase()})
                  </Link>
                </td>
                <td className="py-4">
                  ${coin.current_price.toLocaleString()}
                </td>
                <td
                  className={`py-4 ${
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}