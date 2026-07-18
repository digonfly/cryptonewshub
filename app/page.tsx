"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
}

interface GlobalData {
  total_market_cap: { usd: number };
  total_volume: { usd: number };
  market_cap_percentage: { btc: number };
  market_cap_change_percentage_24h_usd: number;
}

export default function HomePage() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [globalData, setGlobalData] = useState<GlobalData | null>(null);
  const [fearGreed, setFearGreed] = useState<string>("");
  const [fearGreedValue, setFearGreedValue] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

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

    async function fetchAll() {
      // 1. Coins
      const coinsData = await fetchWithRetry(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      );
      if (Array.isArray(coinsData)) setCoins(coinsData);

      await delay(1000);

      // 2. Global
      const globalJson = await fetchWithRetry(
        "https://api.coingecko.com/api/v3/global"
      );
      if (globalJson?.data) setGlobalData(globalJson.data);

      await delay(500);

      // 3. Fear & Greed
      const fgData = await fetchWithRetry("https://api.alternative.me/fng/");
      if (fgData?.data?.[0]) {
        setFearGreed(fgData.data[0].value_classification);
        setFearGreedValue(fgData.data[0].value);
      }

      setLoading(false);
    }

    fetchAll();
  }, []);

  const topGainers = [...coins]
    .filter((c) => c.price_change_percentage_24h != null)
    .sort(
      (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
    )
    .slice(0, 5);

  const topLosers = [...coins]
    .filter((c) => c.price_change_percentage_24h != null)
    .sort(
      (a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h
    )
    .slice(0, 5);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white text-xl">
        Loading crypto data...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="text-center py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          🚀 Crypto
          <span className="text-green-400"> News Hub</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl mb-8">
          Real-time crypto prices, news & market insights
        </p>
        <Link
          href="/coins"
          className="bg-green-500 hover:bg-green-600 text-black font-bold px-8 py-4 rounded-xl text-lg transition"
        >
          View All Coins →
        </Link>
      </section>

      {/* Global Stats */}
      {globalData && (
        <section className="px-4 md:px-10 py-10">
          <h2 className="text-2xl font-bold mb-6 text-center">
            🌍 Global Market Stats
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-900 rounded-xl p-4 text-center">
              <p className="text-gray-400 text-sm">Total Market Cap</p>
              <p className="text-xl font-bold text-green-400">
                ${(globalData.total_market_cap.usd / 1e12).toFixed(2)}T
              </p>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 text-center">
              <p className="text-gray-400 text-sm">24h Volume</p>
              <p className="text-xl font-bold text-blue-400">
                ${(globalData.total_volume.usd / 1e9).toFixed(2)}B
              </p>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 text-center">
              <p className="text-gray-400 text-sm">BTC Dominance</p>
              <p className="text-xl font-bold text-yellow-400">
                {globalData.market_cap_percentage.btc.toFixed(2)}%
              </p>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 text-center">
              <p className="text-gray-400 text-sm">Market Cap Change</p>
              <p
                className={`text-xl font-bold ${
                  globalData.market_cap_change_percentage_24h_usd >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {globalData.market_cap_change_percentage_24h_usd.toFixed(2)}%
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Fear & Greed */}
      {fearGreedValue && (
        <section className="px-4 md:px-10 py-6">
          <div className="bg-gray-900 rounded-xl p-6 text-center max-w-sm mx-auto">
            <h2 className="text-xl font-bold mb-2">😎 Fear & Greed Index</h2>
            <p className="text-5xl font-bold text-yellow-400 my-3">
              {fearGreedValue}
            </p>
            <p className="text-gray-400 text-lg">{fearGreed}</p>
          </div>
        </section>
      )}

      {/* Gainers / Losers */}
      {coins.length > 0 && (
        <section className="px-4 md:px-10 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-green-400">
                📈 Top Gainers
              </h2>
              <div className="space-y-3">
                {topGainers.map((coin) => (
                  <Link href={`/coin/${coin.id}`} key={coin.id}>
                    <div className="bg-gray-900 rounded-xl p-4 flex items-center justify-between hover:bg-gray-800 transition cursor-pointer">
                      <div className="flex items-center gap-3">
                        <img
                          src={coin.image}
                          alt={coin.name}
                          className="w-8 h-8"
                        />
                        <div>
                          <p className="font-bold">{coin.name}</p>
                          <p className="text-gray-400 text-sm">
                            {coin.symbol.toUpperCase()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">
                          ${coin.current_price.toLocaleString()}
                        </p>
                        <p className="text-green-400 font-bold">
                          +{coin.price_change_percentage_24h.toFixed(2)}%
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-red-400">
                📉 Top Losers
              </h2>
              <div className="space-y-3">
                {topLosers.map((coin) => (
                  <Link href={`/coin/${coin.id}`} key={coin.id}>
                    <div className="bg-gray-900 rounded-xl p-4 flex items-center justify-between hover:bg-gray-800 transition cursor-pointer">
                      <div className="flex items-center gap-3">
                        <img
                          src={coin.image}
                          alt={coin.name}
                          className="w-8 h-8"
                        />
                        <div>
                          <p className="font-bold">{coin.name}</p>
                          <p className="text-gray-400 text-sm">
                            {coin.symbol.toUpperCase()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">
                          ${coin.current_price.toLocaleString()}
                        </p>
                        <p className="text-red-400 font-bold">
                          {coin.price_change_percentage_24h.toFixed(2)}%
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <footer className="text-center py-8 text-gray-600 border-t border-gray-800">
        <p>© 2025 CryptoNewsHub. All rights reserved.</p>
      </footer>
    </div>
  );
}