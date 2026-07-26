"use client";

import { motion } from "framer-motion";

interface Props {
  difficulty: "Easy" | "Medium" | "Hard";
  tasks: string[];
}

export default function DifficultyGuide({ difficulty, tasks }: Props) {
  const guides = {
    Easy: {
      color: "green",
      gradient: "from-green-500 to-emerald-500",
      icon: "🟢",
      time: "5-15 minutes",
      cost: "Free (Gas fees may apply)",
      difficulty_level: "Beginner Friendly",
      prerequisites: [
        "Web3 wallet (MetaMask/Trust Wallet)",
        "Email address",
        "Twitter/Discord account",
      ],
      tools: ["MetaMask", "Discord", "Twitter"],
      tips: [
        "✅ Complete daily tasks consistently",
        "✅ Follow official social media",
        "✅ Join community Discord",
        "✅ Use referral links to boost rewards",
      ],
    },
    Medium: {
      color: "yellow",
      gradient: "from-yellow-500 to-orange-500",
      icon: "🟡",
      time: "30-60 minutes",
      cost: "$5-50 in gas fees",
      difficulty_level: "Intermediate",
      prerequisites: [
        "Funded Web3 wallet with ETH/USDC",
        "Basic DeFi knowledge",
        "Bridge experience helpful",
        "Understanding of transactions",
      ],
      tools: ["MetaMask", "Bridge (LayerSwap/Orbiter)", "DEX (Uniswap)", "Explorer"],
      tips: [
        "✅ Use gas fee tracker for cheap times",
        "✅ Bridge in bulk to save fees",
        "✅ Interact with multiple protocols",
        "✅ Keep transaction history",
        "✅ Use Layer 2s for cheaper txns",
      ],
    },
    Hard: {
      color: "red",
      gradient: "from-red-500 to-pink-500",
      icon: "🔴",
      time: "2-8 hours setup",
      cost: "$50-500+ investment",
      difficulty_level: "Advanced",
      prerequisites: [
        "Deep DeFi understanding",
        "Multi-chain wallet setup",
        "Understanding of restaking/staking",
        "Risk management knowledge",
        "Capital for liquidity provision",
      ],
      tools: [
        "Multiple wallets (Argent, Rabby)",
        "Hardware wallet recommended",
        "DeFi tools (Debank, Zapper)",
        "Testnet experience",
        "Advanced DEX aggregators",
      ],
      tips: [
        "✅ Start with small amounts to test",
        "✅ Use hardware wallet for security",
        "✅ Diversify across protocols",
        "✅ Track all interactions on Debank",
        "✅ Never invest more than you can lose",
        "✅ Study protocol tokenomics",
        "✅ Join alpha groups for tips",
      ],
    },
  };

  const guide = guides[difficulty];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-2xl p-6"
    >
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        📚 <span className="rainbow-text">Complete Guide</span>
      </h2>

      {/* Difficulty Header */}
      <div className={`bg-gradient-to-r ${guide.gradient} rounded-xl p-5 mb-6`}>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="text-4xl">{guide.icon}</div>
            <div>
              <p className="text-white/80 text-sm">Difficulty Level</p>
              <p className="text-2xl font-bold text-white">{guide.difficulty_level}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white/80 text-sm">Estimated Time</p>
            <p className="text-xl font-bold text-white">{guide.time}</p>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {/* Cost */}
        <div className="bg-gray-800/50 rounded-xl p-4">
          <p className="text-sm text-gray-400 mb-1">💰 Estimated Cost</p>
          <p className="font-bold text-green-400">{guide.cost}</p>
        </div>

        {/* Time */}
        <div className="bg-gray-800/50 rounded-xl p-4">
          <p className="text-sm text-gray-400 mb-1">⏱️ Time Required</p>
          <p className="font-bold text-blue-400">{guide.time}</p>
        </div>
      </div>

      {/* Prerequisites */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-3 text-purple-400">
          📋 Prerequisites
        </h3>
        <ul className="space-y-2 bg-gray-800/30 rounded-xl p-4">
          {guide.prerequisites.map((prereq, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-300">
              <span className="text-purple-400">✓</span>
              <span>{prereq}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tools Needed */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-3 text-blue-400">
          🛠️ Tools You'll Need
        </h3>
        <div className="flex flex-wrap gap-2">
          {guide.tools.map((tool, i) => (
            <span
              key={i}
              className="bg-blue-500/20 text-blue-400 px-3 py-2 rounded-lg text-sm font-medium"
            >
              🔧 {tool}
            </span>
          ))}
        </div>
      </div>

      {/* Step-by-Step Tasks */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-3 text-green-400">
          📝 Step-by-Step Tasks
        </h3>
        <ol className="space-y-3">
          {tasks.map((task, i) => (
            <li
              key={i}
              className="flex items-start gap-3 bg-gray-800/50 rounded-xl p-3 hover:bg-gray-800 transition"
            >
              <span className={`bg-gradient-to-r ${guide.gradient} text-white font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0`}>
                {i + 1}
              </span>
              <p className="text-gray-300 pt-1">{task}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Pro Tips */}
      <div>
        <h3 className="text-lg font-bold mb-3 text-yellow-400">
          💡 Pro Tips
        </h3>
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
          <ul className="space-y-2">
            {guide.tips.map((tip, i) => (
              <li key={i} className="text-gray-300 text-sm">
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}