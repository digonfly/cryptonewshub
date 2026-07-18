"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface MarketCoin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number | null;
  market_cap: number;
}

interface TrendingApiCoin {
  item: {
    id: string;
    name: string;
    symbol: string;
    market_cap_rank: number;
    thumb: string;
    score: number;
  };
}

export default function TrendingPage() {
  const [coins, setCoins] = useState<MarketCoin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTrendingCoins() {
      try {
        const trendingRes = await fetch(
          "https://api.coingecko.com/api/v3/search/trending"
        );
        const trendingData = await trendingRes.json();

        const ids =
          trendingData.coins
            ?.map((coin: TrendingApiCoin) => coin.item.id)
            .slice(0, 7) || [];

        if (!ids.length) {
          throw new Error("No trending coins found");
        }

        const marketRes = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids.join(
            ","
          )}&order=market_cap_desc&sparkline=false&price_change_percentage=24h`
        );

        const marketData = await marketRes.json();

        const orderedCoins = ids
          .map((id: string) =>
            marketData.find((coin: MarketCoin) => coin.id === id)
          )
          .filter(Boolean) as MarketCoin[];

        setCoins(orderedCoins);
      } catch (err) {
        console.error(err);
        setError("Failed to load trending coins.");
      } finally {
        setLoading(false);
      }
    }

    fetchTrendingCoins();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center text-xl">
        Loading trending coins...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-red-400 flex items-center justify-center text-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-10 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-bold mb-3">
          🔥 Trending Coins to Watch
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          These coins are trending right now in the crypto market. Use this
          page for research only — trending does not guarantee profit.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {coins.map((coin, index) => (
          <Link href={`/coin/${coin.id}`} key={coin.id}>
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-green-500 hover:bg-gray-800 transition cursor-pointer h-full">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-green-400 font-semibold">
                  #{index + 1} Trending
                </span>
                <span
                  className={`text-sm font-bold ${
                    (coin.price_change_percentage_24h ?? 0) >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {(coin.price_change_percentage_24h ?? 0).toFixed(2)}%
                </span>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <img src={coin.image} alt={coin.name} className="w-12 h-12" />
                <div>
                  <h2 className="text-xl font-bold">{coin.name}</h2>
                  <p className="text-gray-400 uppercase">{coin.symbol}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Price</span>
                  <span className="font-semibold">
                    ${coin.current_price.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Market Cap</span>
                  <span className="font-semibold">
                    ${coin.market_cap.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="mt-5">
                <span className="inline-block bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-medium">
                  Research this coin
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}