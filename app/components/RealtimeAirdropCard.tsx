"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface RealtimeAirdrop {
  id: string;
  name: string;
  symbol: string;
  image: string;
  price?: number;
  change24h?: number;
  marketCap?: number;
  category: string;
  source: string;
  addedAt: string;
  isNew: boolean;
}

interface Props {
  airdrop: RealtimeAirdrop;
  index: number;
}

export default function RealtimeAirdropCard({ airdrop, index }: Props) {
  const categoryColors: Record<string, string> = {
    "Trending": "from-orange-500 to-red-500",
    "Top Gainer": "from-green-500 to-emerald-500",
    "New Listing": "from-blue-500 to-cyan-500",
  };

  const categoryIcons: Record<string, string> = {
    "Trending": "🔥",
    "Top Gainer": "📈",
    "New Listing": "🆕",
  };

  const gradient = categoryColors[airdrop.category] || "from-purple-500 to-pink-500";
  const icon = categoryIcons[airdrop.category] || "🎁";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      whileHover={{ scale: 1.03, y: -5 }}
      className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden hover:border-purple-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition group flex flex-col relative"
    >
      {/* NEW Badge */}
      {airdrop.isNew && (
        <div className="absolute top-2 right-2 z-10">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg"
          >
            🆕 NEW
          </motion.div>
        </div>
      )}

      {/* Header */}
      <div className={`bg-gradient-to-br ${gradient} p-5 relative overflow-hidden`}>
        <div className="absolute top-0 right-0 text-8xl opacity-10">
          {icon}
        </div>

        <div className="relative z-10">
          <span className="inline-block bg-white/20 text-white text-xs px-2 py-1 rounded-full mb-3 font-bold">
            {icon} {airdrop.category}
          </span>

          <div className="flex items-center gap-3">
            {airdrop.image && (
              <img
                src={airdrop.image}
                alt={airdrop.name}
                className="w-12 h-12 rounded-full border-2 border-white/30"
              />
            )}
            <div>
              <h3 className="text-xl font-bold text-white">{airdrop.name}</h3>
              <p className="text-white/80 text-sm">${airdrop.symbol.toUpperCase()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Stats */}
        {(airdrop.price || airdrop.change24h) && (
          <div className="grid grid-cols-2 gap-3 mb-4">
            {airdrop.price && (
              <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-400 mb-1">Price</p>
                <p className="text-sm font-bold text-green-400">
                  ${airdrop.price.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                </p>
              </div>
            )}
            {airdrop.change24h !== undefined && (
              <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-400 mb-1">24h Change</p>
                <p className={`text-sm font-bold ${airdrop.change24h >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {airdrop.change24h >= 0 ? "+" : ""}{airdrop.change24h.toFixed(2)}%
                </p>
              </div>
            )}
          </div>
        )}

        {/* Description */}
        <p className="text-gray-300 text-sm mb-4">
          {airdrop.category === "Trending" && "🔥 Currently trending on CoinGecko. Check for airdrop opportunities."}
          {airdrop.category === "Top Gainer" && `📈 Up ${airdrop.change24h?.toFixed(2)}% in 24h. Explore for potential rewards.`}
          {airdrop.category === "New Listing" && "🆕 Recently listed coin. Early opportunities may exist."}
        </p>

        {/* Source */}
        <div className="mb-4 flex items-center gap-2 text-xs text-gray-500">
          <span>📡 Source:</span>
          <span className="text-purple-400 font-medium">{airdrop.source}</span>
        </div>

        {/* Warning */}
        <div className="mb-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
          <p className="text-xs text-yellow-400">
            ⚠️ Auto-detected. Verify official channels before participating.
          </p>
        </div>

        {/* CTAs */}
        <div className="mt-auto grid grid-cols-2 gap-2">
          <Link
            href={`/coin/${airdrop.id.replace(/^(trending-|gainer-|new-)/, '')}`}
            className="bg-gray-800 hover:bg-gray-700 text-white font-bold text-center py-3 rounded-xl transition text-sm"
          >
            📊 View Coin
          </Link>
          <a
            href={`https://www.coingecko.com/en/coins/${airdrop.id.replace(/^(trending-|gainer-|new-)/, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`bg-gradient-to-r ${gradient} hover:opacity-90 text-white font-bold text-center py-3 rounded-xl transition text-sm`}
          >
            🔍 Research
          </a>
        </div>
      </div>
    </motion.div>
  );
}