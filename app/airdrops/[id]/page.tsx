"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { airdropsData } from "../data";
import type { Airdrop } from "../data";
import AirdropReviews from "../../components/AirdropReviews";
import DifficultyGuide from "../../components/DifficultyGuide";

export default function AirdropDetailPage() {
  const { id } = useParams();
  const [airdrop, setAirdrop] = useState<Airdrop | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const found = airdropsData.find((a) => a.id === id);
    setAirdrop(found || null);
    setLoading(false);
  }, [id]);

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

  if (!airdrop) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-3xl mb-4">Airdrop Not Found</h1>
          <Link href="/airdrops" className="text-green-400 hover:underline">
            ← Back to Airdrops
          </Link>
        </div>
      </div>
    );
  }

  // Related airdrops (same category)
  const related = airdropsData
    .filter((a) => a.category === airdrop.category && a.id !== airdrop.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen text-white px-4 md:px-10 py-10">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/airdrops"
          className="text-purple-400 hover:text-purple-300 mb-6 inline-block"
        >
          ← Back to Airdrops
        </Link>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden"
        >
          {/* Header */}
          <div className={`bg-gradient-to-br ${airdrop.gradient} p-8 relative overflow-hidden`}>
            <div className="absolute top-0 right-0 text-9xl opacity-10">
              {airdrop.icon}
            </div>

            <div className="relative z-10 flex items-start justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="text-6xl">{airdrop.icon}</div>
                <div>
                  <div className="flex gap-2 mb-2 flex-wrap">
                    {airdrop.verified && (
                      <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full font-bold">
                        ✓ Verified
                      </span>
                    )}
                    {airdrop.trending && (
                      <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                        🔥 Trending
                      </span>
                    )}
                    <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full font-bold">
                      {airdrop.status}
                    </span>
                  </div>
                  <h1 className="text-4xl font-bold text-white">{airdrop.name}</h1>
                  <p className="text-white/80 text-lg">${airdrop.symbol}</p>
                </div>
              </div>

              <a
                href={airdrop.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black font-bold px-6 py-3 rounded-xl hover:scale-105 transition"
              >
                🚀 Participate Now
              </a>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-400 mb-1">Category</p>
                <p className="font-bold text-purple-400">{airdrop.category}</p>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-400 mb-1">Reward</p>
                <p className="font-bold text-green-400">{airdrop.reward}</p>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-400 mb-1">Difficulty</p>
                <p className="font-bold text-yellow-400">{airdrop.difficulty}</p>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-400 mb-1">Deadline</p>
                <p className="font-bold text-blue-400">{airdrop.deadline}</p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-3 text-white">
                About {airdrop.name}
              </h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                {airdrop.description}
              </p>
            </div>

            {/* Share Buttons */}
            <div className="flex flex-wrap gap-2 mb-6">
              <p className="w-full text-sm text-gray-400 mb-2">📤 Share:</p>
              <a
                href={`https://wa.me/?text=Check out ${airdrop.name} airdrop! ${airdrop.reward} rewards!`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold"
              >
                💬 WhatsApp
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=Check out ${airdrop.name} airdrop! Get ${airdrop.reward}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-bold"
              >
                🐦 Twitter
              </a>
              <a
                href={`https://t.me/share/url?text=${airdrop.name} Airdrop`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold"
              >
                ✈️ Telegram
              </a>
            </div>
          </div>
        </motion.div>

        {/* Difficulty Guide */}
        <DifficultyGuide difficulty={airdrop.difficulty} tasks={airdrop.tasks} />

        {/* User Reviews */}
        <AirdropReviews airdropId={airdrop.id} airdropName={airdrop.name} />

        {/* Related Airdrops */}
        {related.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">
              🔗 Related {airdrop.category} Airdrops
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/airdrops/${r.id}`}
                  className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl p-4 hover:border-purple-500 transition"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-3xl">{r.icon}</div>
                    <div>
                      <p className="font-bold">{r.name}</p>
                      <p className="text-xs text-gray-400">${r.symbol}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 line-clamp-2">
                    {r.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}