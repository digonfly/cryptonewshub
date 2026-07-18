"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Bitcoin3D from "./components/Bitcoin3D";

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

    async function fetchAll() {
      const coinsData = await fetchWithRetry(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      );
      if (Array.isArray(coinsData)) setCoins(coinsData);

      await delay(1000);

      const globalJson = await fetchWithRetry(
        "https://api.coingecko.com/api/v3/global"
      );
      if (globalJson?.data) setGlobalData(globalJson.data);

      await delay(500);

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
    .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
    .slice(0, 5);

  const topLosers = [...coins]
    .filter((c) => c.price_change_percentage_24h != null)
    .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
    .slice(0, 5);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      {/* Hero */}
      <section className="relative py-16 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              🚀 <span className="rainbow-text">Crypto News Hub</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl mb-8">
              Real-time crypto prices, news & market insights
            </p>
            <Link
              href="/coins"
              className="bg-green-500 hover:bg-green-600 text-black font-bold px-8 py-4 rounded-xl text-lg transition shadow-[0_0_30px_rgba(34,197,94,0.5)] inline-block"
            >
              View All Coins →
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <Bitcoin3D />
          </motion.div>
        </div>
      </section>

      {/* Global Stats */}
      {globalData && (
        <motion.section
          className="px-4 md:px-10 py-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            🌍 Global Market Stats
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {[
              { label: "Total Market Cap", value: `$${(globalData.total_market_cap.usd / 1e12).toFixed(2)}T`, color: "text-green-400" },
              { label: "24h Volume", value: `$${(globalData.total_volume.usd / 1e9).toFixed(2)}B`, color: "text-blue-400" },
              { label: "BTC Dominance", value: `${globalData.market_cap_percentage.btc.toFixed(2)}%`, color: "text-yellow-400" },
              { label: "Market Cap Change", value: `${globalData.market_cap_change_percentage_24h_usd.toFixed(2)}%`, color: globalData.market_cap_change_percentage_24h_usd >= 0 ? "text-green-400" : "text-red-400" },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl p-4 text-center hover:border-green-500 transition"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Fear & Greed */}
      {fearGreedValue && (
        <section className="px-4 md:px-10 py-6">
          <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 text-center max-w-sm mx-auto">
            <h2 className="text-xl font-bold mb-2">😎 Fear & Greed Index</h2>
            <p className="text-5xl font-bold text-yellow-400 my-3">{fearGreedValue}</p>
            <p className="text-gray-400 text-lg">{fearGreed}</p>
          </div>
        </section>
      )}

      {/* Gainers / Losers */}
      {coins.length > 0 && (
        <section className="px-4 md:px-10 py-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-green-400">📈 Top Gainers</h2>
              <div className="space-y-3">
                {topGainers.map((coin) => (
                  <Link href={`/coin/${coin.id}`} key={coin.id}>
                    <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl p-4 flex items-center justify-between hover:border-green-500 transition cursor-pointer">
                      <div className="flex items-center gap-3">
                        <img src={coin.image} alt={coin.name} className="w-8 h-8" />
                        <div>
                          <p className="font-bold">{coin.name}</p>
                          <p className="text-gray-400 text-sm">{coin.symbol.toUpperCase()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${coin.current_price.toLocaleString()}</p>
                        <p className="text-green-400 font-bold">+{coin.price_change_percentage_24h.toFixed(2)}%</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-red-400">📉 Top Losers</h2>
              <div className="space-y-3">
                {topLosers.map((coin) => (
                  <Link href={`/coin/${coin.id}`} key={coin.id}>
                    <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl p-4 flex items-center justify-between hover:border-red-500 transition cursor-pointer">
                      <div className="flex items-center gap-3">
                        <img src={coin.image} alt={coin.name} className="w-8 h-8" />
                        <div>
                          <p className="font-bold">{coin.name}</p>
                          <p className="text-gray-400 text-sm">{coin.symbol.toUpperCase()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${coin.current_price.toLocaleString()}</p>
                        <p className="text-red-400 font-bold">{coin.price_change_percentage_24h.toFixed(2)}%</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}