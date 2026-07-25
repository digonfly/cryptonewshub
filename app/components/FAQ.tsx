"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What is cryptocurrency?",
    answer:
      "Cryptocurrency is a digital or virtual form of currency that uses cryptography for security. Unlike traditional currencies, it operates on decentralized networks based on blockchain technology, making it resistant to government manipulation and interference.",
  },
  {
    question: "Is cryptocurrency legal in India?",
    answer:
      "Yes, cryptocurrency is legal in India. However, it's not recognized as legal tender. The Indian government has introduced a 30% tax on crypto gains and 1% TDS on transactions. You can legally buy, sell, and hold cryptocurrencies through registered exchanges.",
  },
  {
    question: "How to buy Bitcoin in India?",
    answer:
      "To buy Bitcoin in India: 1) Sign up on a crypto exchange like CoinDCX or WazirX, 2) Complete KYC verification with PAN and Aadhaar, 3) Deposit INR via UPI or bank transfer, 4) Navigate to Buy Bitcoin section, 5) Enter amount and confirm purchase.",
  },
  {
    question: "What is the minimum amount to invest in crypto?",
    answer:
      "You can start investing in crypto with as little as ₹100 in India. Most exchanges allow fractional buying, meaning you can buy 0.0001 Bitcoin. It's recommended to start small, learn the market, and never invest more than you can afford to lose.",
  },
  {
    question: "How is cryptocurrency taxed in India?",
    answer:
      "In India, cryptocurrency gains are taxed at a flat 30% rate, regardless of your income bracket. Additionally, there's a 1% TDS on all crypto transactions above ₹10,000. Losses cannot be offset against gains, and you must report all crypto activities in your ITR.",
  },
  {
    question: "What is the best cryptocurrency to invest in 2026?",
    answer:
      "The top cryptocurrencies to consider in 2026 are: 1) Bitcoin (BTC) - Most secure and established, 2) Ethereum (ETH) - Smart contracts leader, 3) Solana (SOL) - Fast and scalable, 4) BNB - Binance ecosystem, 5) XRP - Cross-border payments.",
  },
  {
    question: "Is Bitcoin safe to invest in?",
    answer:
      "Bitcoin is considered relatively safe compared to other cryptocurrencies due to its large market cap, wide adoption, and long track record since 2009. However, it's still volatile and risky. Use reputable exchanges, enable 2FA, store large amounts in hardware wallets.",
  },
  {
    question: "What is a crypto wallet?",
    answer:
      "A crypto wallet is a digital tool that allows you to store, send, and receive cryptocurrencies. There are two main types: 1) Hot wallets (online) like MetaMask, Trust Wallet - convenient but less secure, 2) Cold wallets (offline) like Ledger, Trezor - most secure.",
  },
  {
    question: "Can I lose all my money in cryptocurrency?",
    answer:
      "Yes, cryptocurrency is highly volatile and you can lose your entire investment. Reasons include: market crashes, scams, hacks, lost private keys, and rug pulls. Only invest what you can afford to lose and always research before investing.",
  },
  {
    question: "What is DeFi (Decentralized Finance)?",
    answer:
      "DeFi refers to financial services built on blockchain technology that operate without traditional intermediaries like banks. It includes lending, borrowing, trading, yield farming, and staking. Popular platforms include Uniswap, Aave, and Compound.",
  },
  {
    question: "What is Ethereum?",
    answer:
      "Ethereum is a decentralized blockchain platform that enables smart contracts and decentralized applications (dApps). Its native cryptocurrency is Ether (ETH). Ethereum is the second-largest cryptocurrency by market cap and powers most DeFi and NFT ecosystems.",
  },
  {
    question: "What are NFTs?",
    answer:
      "NFTs (Non-Fungible Tokens) are unique digital assets stored on blockchain that represent ownership of items like art, music, videos, or in-game items. Unlike cryptocurrencies, each NFT is unique and cannot be exchanged on a one-to-one basis.",
  },
  {
    question: "What is blockchain?",
    answer:
      "Blockchain is a distributed digital ledger that records transactions across many computers. Each block contains transaction data linked to the previous block using cryptography, making it secure and tamper-proof. It's the technology behind Bitcoin and other cryptocurrencies.",
  },
  {
    question: "What is crypto mining?",
    answer:
      "Crypto mining is the process of validating cryptocurrency transactions and adding them to the blockchain. Miners use powerful computers to solve complex mathematical problems, and in return, they receive newly created cryptocurrencies as rewards.",
  },
  {
    question: "What is staking in cryptocurrency?",
    answer:
      "Staking is the process of locking up your cryptocurrency to support blockchain operations and earn rewards. It's like earning interest on savings. Popular staking coins include Ethereum, Cardano, and Solana, offering 4-10% annual returns.",
  },
];

interface QAHistory {
  question: string;
  answer: string;
  isAI: boolean;
  timestamp: number;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [aiAnswer, setAiAnswer] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<QAHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Load history from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("qaHistory");
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const askAI = async () => {
    if (!searchQuery.trim()) return;

    // Check history first (cached answer)
    const cached = history.find(
      (h) => h.question.toLowerCase() === searchQuery.toLowerCase()
    );
    if (cached) {
      setAiAnswer(cached.answer);
      return;
    }

    setLoading(true);
    setAiAnswer("");

    try {
      const res = await fetch("/api/ask-crypto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: searchQuery }),
      });

      const data = await res.json();

      if (data.success) {
        setAiAnswer(data.answer);

        // Save to history
        const newHistory: QAHistory = {
          question: searchQuery,
          answer: data.answer,
          isAI: true,
          timestamp: Date.now(),
        };
        const updatedHistory = [newHistory, ...history].slice(0, 50); // Keep last 50
        setHistory(updatedHistory);
        localStorage.setItem("qaHistory", JSON.stringify(updatedHistory));
      } else {
        setAiAnswer(`❌ Error: ${data.error}`);
      }
    } catch (err) {
      setAiAnswer("❌ Failed to get answer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchQuery.trim() && filteredFAQs.length === 0) {
      askAI();
    }
  };

  const clearHistory = () => {
    if (confirm("Clear all Q&A history?")) {
      setHistory([]);
      localStorage.removeItem("qaHistory");
    }
  };

  const loadFromHistory = (item: QAHistory) => {
    setSearchQuery(item.question);
    setAiAnswer(item.answer);
    setShowHistory(false);
  };

  return (
    <section className="px-4 md:px-10 py-10 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl md:text-4xl font-bold mb-3">
          🤖 <span className="rainbow-text">Ask Anything About Crypto</span>
        </h2>
        <p className="text-gray-400">
          Search FAQs or ask AI any crypto question - get instant answers!
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="mb-6"
      >
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setAiAnswer("");
            }}
            onKeyPress={handleKeyPress}
            placeholder="🔍 Type any crypto question... (e.g., 'What is Solana?')"
            className="w-full px-4 py-4 pr-32 rounded-lg bg-gray-900/60 backdrop-blur-sm border border-gray-800 focus:outline-none focus:border-purple-500 transition text-lg"
          />
          {searchQuery && filteredFAQs.length === 0 && !aiAnswer && (
            <button
              onClick={askAI}
              disabled={loading}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-4 py-2 rounded-lg text-sm transition disabled:opacity-50"
            >
              {loading ? "🤖 Thinking..." : "🤖 Ask AI"}
            </button>
          )}
        </div>

        {/* History Toggle */}
        {history.length > 0 && (
          <div className="mt-2 flex items-center justify-between">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="text-sm text-purple-400 hover:text-purple-300"
            >
              📚 {showHistory ? "Hide" : "Show"} History ({history.length})
            </button>
            {showHistory && (
              <button
                onClick={clearHistory}
                className="text-sm text-red-400 hover:text-red-300"
              >
                🗑️ Clear All
              </button>
            )}
          </div>
        )}
      </motion.div>

      {/* History Panel */}
      <AnimatePresence>
        {showHistory && history.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 bg-gray-900/60 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-4 max-h-80 overflow-y-auto"
          >
            <h3 className="text-sm font-bold mb-3 text-purple-400">
              📚 Previous Questions
            </h3>
            <div className="space-y-2">
              {history.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => loadFromHistory(item)}
                  className="w-full text-left p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition text-sm text-gray-300"
                >
                  {item.isAI ? "🤖" : "📖"} {item.question}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Answer */}
      {(loading || aiAnswer) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-5"
        >
          <div className="flex items-start gap-3">
            <div className="text-3xl">🤖</div>
            <div className="flex-1">
              <p className="text-sm text-purple-400 font-bold mb-2">
                AI Answer:
              </p>
              {loading ? (
                <div className="flex items-center gap-2 text-gray-300">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full"
                  />
                  <span>AI is thinking...</span>
                </div>
              ) : (
                <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">
                  {aiAnswer}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* FAQ Items */}
      <div className="space-y-3">
        {searchQuery && filteredFAQs.length === 0 && !aiAnswer && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-10 bg-gray-900/40 rounded-2xl border border-gray-800"
          >
            <p className="text-gray-400 mb-3">
              No FAQ found for "{searchQuery}"
            </p>
            <button
              onClick={askAI}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-6 py-3 rounded-lg hover:opacity-90 transition"
            >
              🤖 Ask AI Instead
            </button>
          </motion.div>
        )}

        {filteredFAQs.map((faq, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden hover:border-green-500/50 transition"
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-800/40 transition"
            >
              <h3 className="text-lg font-bold pr-4 text-white">
                {faq.question}
              </h3>
              <motion.div
                animate={{ rotate: openIndex === idx ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-green-400 text-2xl flex-shrink-0"
              >
                ▼
              </motion.div>
            </button>

            <AnimatePresence>
              {openIndex === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 pt-0 text-gray-300 leading-relaxed border-t border-gray-800">
                    <p className="pt-4">{faq.answer}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Info Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-8 p-6 bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-2xl"
      >
        <p className="text-gray-300 mb-2">
          💡 <strong>Pro Tip:</strong> Ask any crypto question and get AI-powered answers instantly!
        </p>
        <p className="text-sm text-gray-400">
          Powered by Google Gemini AI • Answers cached for faster access
        </p>
      </motion.div>

      {/* SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </section>
  );
}