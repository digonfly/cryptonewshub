"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { airdropsData } from "../../data";
import type { Airdrop } from "../../data";
import AirdropCard from "../../../components/AirdropCard";

const categoryInfo: Record<string, { name: string; description: string; icon: string; color: string }> = {
  "defi": {
    name: "DeFi",
    description: "Decentralized Finance protocols offering the best airdrop opportunities. Interact with lending, DEXs, and yield farming platforms.",
    icon: "💰",
    color: "from-green-500 to-emerald-500",
  },
  "layer-2": {
    name: "Layer 2",
    description: "Ethereum Layer 2 scaling solutions with massive airdrop potential. Bridge and interact for future rewards.",
    icon: "⚡",
    color: "from-blue-500 to-cyan-500",
  },
  "nft": {
    name: "NFT",
    description: "NFT-based airdrops and rewards. Mint, trade, and collect for exclusive tokens.",
    icon: "🎨",
    color: "from-pink-500 to-purple-500",
  },
  "gaming": {
    name: "Gaming",
    description: "Play-to-earn gaming platforms with in-game rewards and token airdrops.",
    icon: "🎮",
    color: "from-purple-500 to-indigo-500",
  },
  "meme": {
    name: "Meme",
    description: "Meme coin airdrops with high risk but potentially high rewards. DYOR!",
    icon: "🐸",
    color: "from-yellow-500 to-orange-500",
  },
  "ai": {
    name: "AI",
    description: "AI and machine learning crypto projects offering compute and data rewards.",
    icon: "🤖",
    color: "from-cyan-500 to-blue-500",
  },
  "quest-platform": {
    name: "Quest Platform",
    description: "Complete quests, tasks, and campaigns to earn rewards from multiple projects.",
    icon: "🎯",
    color: "from-orange-500 to-red-500",
  },
  "infrastructure": {
    name: "Infrastructure",
    description: "Blockchain infrastructure projects providing essential Web3 services.",
    icon: "🏗️",
    color: "from-gray-500 to-slate-500",
  },
};

export default function CategoryPage() {
  const { slug } = useParams();
  const [airdrops, setAirdrops] = useState<Airdrop[]>([]);
  const [loading, setLoading] = useState(true);

  const slugStr = typeof slug === "string" ? slug : Array.isArray(slug) ? slug[0] : "";
  const info = categoryInfo[slugStr] || {
    name: "Category",
    description: "Airdrops in this category",
    icon: "🎁",
    color: "from-purple-500 to-pink-500",
  };

  useEffect(() => {
    // Match category by slug
    const categoryMap: Record<string, string> = {
      "defi": "DeFi",
      "layer-2": "Layer 2",
      "nft": "NFT",
      "gaming": "Gaming",
      "meme": "Meme",
      "ai": "AI",
      "quest-platform": "Quest Platform",
      "infrastructure": "Infrastructure",
    };

    const targetCategory = categoryMap[slugStr];
    const filtered = airdropsData.filter((a) => a.category === targetCategory);
    setAirdrops(filtered);
    setLoading(false);
  }, [slugStr]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white px-4 md:px-10 py-10">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/airdrops"
          className="text-purple-400 hover:text-purple-300 mb-6 inline-block"
        >
          ← Back to All Airdrops
        </Link>

        {/* Category Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-gradient-to-br ${info.color} rounded-2xl p-8 mb-8 relative overflow-hidden`}
        >
          <div className="absolute top-0 right-0 text-9xl opacity-10">
            {info.icon}
          </div>
          <div className="relative z-10">
            <div className="text-6xl mb-3">{info.icon}</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              {info.name} Airdrops
            </h1>
            <p className="text-white/90 text-lg max-w-3xl">
              {info.description}
            </p>
            <div className="mt-4">
              <span className="bg-white/20 text-white px-4 py-2 rounded-full font-bold">
                {airdrops.length} Airdrops Available
              </span>
            </div>
          </div>
        </motion.div>

        {/* Airdrops Grid */}
        {airdrops.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl mb-2">😔 No airdrops in this category</p>
            <Link href="/airdrops" className="text-purple-400 hover:underline">
              Browse all airdrops
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {airdrops.map((airdrop, idx) => (
              <AirdropCard key={airdrop.id} airdrop={airdrop} index={idx} />
            ))}
          </div>
        )}

        {/* Other Categories */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">🎁 Other Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(categoryInfo).map(([key, cat]) => (
              key !== slugStr && (
                <Link
                  key={key}
                  href={`/airdrops/category/${key}`}
                  className={`bg-gradient-to-br ${cat.color} rounded-xl p-4 text-center hover:scale-105 transition`}
                >
                  <div className="text-3xl mb-1">{cat.icon}</div>
                  <p className="font-bold text-white text-sm">{cat.name}</p>
                </Link>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}