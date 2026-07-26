"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Airdrop } from "../airdrops/data";

interface Props {
  airdrop: Airdrop;
  index: number;
}

export default function AirdropCard({ airdrop, index }: Props) {
  const getDaysRemaining = () => {
    if (airdrop.deadline === "TBA" || airdrop.deadline === "Ongoing") {
      return airdrop.deadline;
    }
    const deadline = new Date(airdrop.deadline);
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return "Ended";
    if (diffDays === 0) return "Ends today";
    if (diffDays === 1) return "1 day left";
    return `${diffDays} days left`;
  };

  const daysRemaining = getDaysRemaining();

  const difficultyStars: Record<string, string> = {
    Easy: "⭐",
    Medium: "⭐⭐",
    Hard: "⭐⭐⭐",
  };

  const statusColors: Record<string, string> = {
    Active: "bg-green-500/20 text-green-400 border-green-500/30",
    Upcoming: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    Ended: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.03, y: -5 }}
      className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden hover:border-purple-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition group flex flex-col"
    >
      <div className={`bg-gradient-to-br ${airdrop.gradient} p-5 relative overflow-hidden`}>
        <div className="absolute top-0 right-0 text-8xl opacity-10">
          {airdrop.icon}
        </div>

        <div className="flex items-center justify-between mb-3 relative z-10">
          <div className="flex gap-2">
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
          </div>
          <span className={`text-xs px-2 py-1 rounded-full font-bold border ${statusColors[airdrop.status]}`}>
            {airdrop.status}
          </span>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="text-4xl">{airdrop.icon}</div>
          <div>
            <h3 className="text-2xl font-bold text-white">{airdrop.name}</h3>
            <p className="text-white/80 text-sm">${airdrop.symbol}</p>
          </div>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="mb-3">
          <span className="text-xs bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full font-semibold">
            {airdrop.category}
          </span>
        </div>

        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
          {airdrop.description}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gray-800/50 rounded-lg p-2 text-center">
            <p className="text-xs text-gray-400 mb-1">Reward</p>
            <p className="text-sm font-bold text-green-400">{airdrop.reward}</p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-2 text-center">
            <p className="text-xs text-gray-400 mb-1">Difficulty</p>
            <p className="text-sm font-bold text-yellow-400">
              {difficultyStars[airdrop.difficulty]} {airdrop.difficulty}
            </p>
          </div>
        </div>

        <div className="mb-4 flex items-center gap-2 text-sm">
          <span className="text-gray-400">⏰</span>
          <span className={`font-bold ${daysRemaining === "Ended" ? "text-red-400" : "text-blue-400"}`}>
            {daysRemaining}
          </span>
        </div>

        <div className="mb-5">
          <p className="text-xs text-gray-400 mb-2 font-bold">📋 Tasks:</p>
          <ul className="space-y-1">
            {airdrop.tasks.slice(0, 3).map((task, i) => (
              <li key={i} className="text-xs text-gray-300 flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>{task}</span>
              </li>
            ))}
            {airdrop.tasks.length > 3 && (
              <li className="text-xs text-gray-500 italic">
                + {airdrop.tasks.length - 3} more tasks
              </li>
            )}
          </ul>
        </div>

        {/* Two Buttons: Details + Participate */}
        <div className="mt-auto grid grid-cols-2 gap-2">
          <Link
            href={`/airdrops/${airdrop.id}`}
            className="bg-gray-800 hover:bg-gray-700 text-white font-bold text-center py-3 rounded-xl transition text-sm"
          >
            📖 Details
          </Link>
          <a
            href={airdrop.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`bg-gradient-to-r ${airdrop.gradient} hover:opacity-90 text-white font-bold text-center py-3 rounded-xl transition text-sm`}
          >
            🚀 Participate
          </a>
        </div>
      </div>
    </motion.div>
  );
}