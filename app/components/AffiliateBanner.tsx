"use client";

import { motion } from "framer-motion";

// ⚠️ IMPORTANT: Apne actual referral links yahan paste karo!
const affiliateLinks = {
  coindcx: "https://invite.coindcx.com/03640718",
  binance: "https://www.binance.com/referral/earn-together/refer2earn-usdc/claim?hl=en&ref=GRO_28502_IXMU1&utm_source=referral_entrance&utm_medium=web_share_copy",
  bybit: "https://www.bybit.com/invite?ref=O97PGL&medium=referral&utm_campaign=evergreen&share_to=post",
  
};

const exchanges = [
  {
    name: "CoinDCX",
    tagline: "India's Simplest Crypto Exchange",
    description: "Buy Bitcoin & 500+ cryptos with UPI. Instant KYC.",
    bonus: "Get ₹100 FREE Bitcoin",
    color: "from-blue-500 to-cyan-500",
    borderColor: "border-blue-500",
    shadow: "shadow-[0_0_30px_rgba(59,130,246,0.5)]",
    icon: "🇮🇳",
    link: affiliateLinks.coindcx,
    features: ["Instant UPI Deposit", "500+ Coins", "24/7 Support"],
    country: "Best for India",
  },
  {
    name: "Binance",
    tagline: "World's Largest Crypto Exchange",
    description: "Trade 1000+ cryptos with lowest fees globally.",
    bonus: "Get $100 Trading Bonus",
    color: "from-yellow-500 to-orange-500",
    borderColor: "border-yellow-500",
    shadow: "shadow-[0_0_30px_rgba(234,179,8,0.5)]",
    icon: "🌍",
    link: affiliateLinks.binance,
    features: ["Lowest Fees", "1000+ Coins", "Advanced Trading"],
    country: "Global",
  },
  {
    name: "Bybit",
    tagline: "Professional Crypto Trading",
    description: "Advanced derivatives & futures trading platform.",
    bonus: "Up to $30,000 Bonus",
    color: "from-purple-500 to-pink-500",
    borderColor: "border-purple-500",
    shadow: "shadow-[0_0_30px_rgba(168,85,247,0.5)]",
    icon: "⚡",
    link: affiliateLinks.bybit,
    features: ["Copy Trading", "Futures", "Zero Fees"],
    country: "Best for Trading",
  },
];

export default function AffiliateBanner() {
  return (
    <section className="px-4 md:px-10 py-10 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl md:text-4xl font-bold mb-3">
          💰 <span className="rainbow-text">Start Trading Today</span>
        </h2>
        <p className="text-gray-400">
          Sign up on top exchanges and get exclusive bonuses
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {exchanges.map((exchange, idx) => (
          <motion.a
            key={exchange.name}
            href={exchange.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className={`bg-gray-900/60 backdrop-blur-sm border-2 border-gray-800 hover:${exchange.borderColor} rounded-2xl overflow-hidden transition cursor-pointer group`}
          >
            <div className={`bg-gradient-to-r ${exchange.color} p-6 relative overflow-hidden`}>
              <div className="absolute top-0 right-0 text-8xl opacity-20">
                {exchange.icon}
              </div>
              <div className="relative z-10">
                <span className="inline-block bg-white/20 text-white text-xs px-3 py-1 rounded-full mb-2 font-bold">
                  {exchange.country}
                </span>
                <h3 className="text-3xl font-bold text-white mb-1">
                  {exchange.name}
                </h3>
                <p className="text-white/90 text-sm">{exchange.tagline}</p>
              </div>
            </div>

            <div className="p-6">
              <p className="text-gray-300 mb-4">{exchange.description}</p>

              <div className={`bg-gradient-to-r ${exchange.color} text-white font-bold px-4 py-3 rounded-lg text-center mb-4 ${exchange.shadow}`}>
                🎁 {exchange.bonus}
              </div>

              <ul className="space-y-2 mb-6">
                {exchange.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="text-green-400">✅</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className={`bg-gradient-to-r ${exchange.color} hover:opacity-90 text-white font-bold text-center py-3 rounded-xl transition group-hover:${exchange.shadow}`}>
                Sign Up Now →
              </div>

              <p className="text-xs text-gray-500 text-center mt-3">
                *Referral link • Bonus terms apply
              </p>
            </div>
          </motion.a>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs text-gray-500 max-w-2xl mx-auto">
          ⚠️ Cryptocurrency investments are subject to market risks. Please do your own research before investing. CryptoNewsHub may earn affiliate commission when you sign up through our links.
        </p>
      </div>
    </section>
  );
}