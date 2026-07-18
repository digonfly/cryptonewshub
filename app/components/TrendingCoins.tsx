"use client";

import { useEffect, useState } from "react";

interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap_rank: number;
}

export default function TrendingCoins() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCoins() {
      try {
        const res = await fetch("/api/coins?limit=4");
        const data = await res.json();

        if (Array.isArray(data)) {
          setCoins(data);
        }
      } catch (error) {
        console.error("Failed to fetch coins:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCoins();
  }, []);

  return (
    <section className="bg-[#111827] text-white py-20 px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-10">
          🔥 Trending Coins
        </h2>

        {loading ? (
          <div className="text-center text-cyan-400 text-xl">
            Loading Coins...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coins.map((coin) => (
              <div
                key={coin.id}
                className="bg-[#1F2937] rounded-xl p-6 border border-gray-700 hover:border-cyan-400 hover:scale-105 transition duration-300"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="w-12 h-12"
                  />

                  <div>
                    <h3 className="text-xl font-bold">
                      {coin.name}
                    </h3>

                    <p className="uppercase text-gray-400">
                      {coin.symbol}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-3xl font-bold">
                    $
                    {coin.current_price.toLocaleString()}
                  </p>

                  <p
                    className={`mt-2 font-semibold ${
                      coin.price_change_percentage_24h >= 0
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {coin.price_change_percentage_24h >= 0 ? "+" : ""}
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </p>

                  <p className="text-gray-500 mt-4">
                    Rank #{coin.market_cap_rank}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}