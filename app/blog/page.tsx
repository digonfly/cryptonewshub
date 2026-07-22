"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { blogArticles, BlogArticle } from "./articles";

const topicSuggestions = [
  "Bitcoin Halving 2028 Prediction",
  "How to Start Crypto Trading",
  "Ethereum vs Solana Comparison",
  "Top 10 Altcoins to Watch",
  "NFT Marketplaces Guide",
  "Crypto Wallets Explained",
  "Understanding Blockchain Technology",
  "DeFi vs CeFi Explained",
  "Bitcoin Mining Guide 2026",
  "Crypto Tax India 2026",
];

export default function BlogPage() {
  const [aiArticles, setAiArticles] = useState<BlogArticle[]>([]);
  const [topic, setTopic] = useState("");
  const [generating, setGenerating] = useState(false);
  const [message, setMessage] = useState("");
  const [showAI, setShowAI] = useState(false);

  // Load AI articles from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("aiArticles");
    if (stored) {
      setAiArticles(JSON.parse(stored));
    }
  }, []);

  const generateArticle = async () => {
    if (!topic.trim()) {
      setMessage("❌ Please enter a topic");
      return;
    }

    setGenerating(true);
    setMessage("🤖 AI is writing your article... (30-60 seconds)");

    try {
      const res = await fetch("/api/generate-article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      const data = await res.json();

      if (data.success) {
        const newArticles = [data.article, ...aiArticles];
        setAiArticles(newArticles);
        localStorage.setItem("aiArticles", JSON.stringify(newArticles));
        setMessage("✅ Article generated & saved!");
        setTopic("");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (err) {
      setMessage("❌ Failed to generate article");
    } finally {
      setGenerating(false);
    }
  };

  const deleteAiArticle = (slug: string) => {
    if (!confirm("Delete this AI article?")) return;
    const updated = aiArticles.filter((a) => a.slug !== slug);
    setAiArticles(updated);
    localStorage.setItem("aiArticles", JSON.stringify(updated));
  };

  const allArticles = [...aiArticles, ...blogArticles];

  return (
    <div className="min-h-screen text-white px-4 md:px-10 py-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl md:text-5xl font-bold mb-3">
          📝 <span className="rainbow-text">Crypto Blog</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Latest crypto guides, tutorials, and AI-powered analysis
        </p>
      </motion.div>

      {/* AI Generator Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-4xl mx-auto mb-10"
      >
        <button
          onClick={() => setShowAI(!showAI)}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-6 py-4 rounded-2xl transition shadow-[0_0_30px_rgba(168,85,247,0.5)] flex items-center justify-center gap-2"
        >
          🤖 {showAI ? "Hide AI Generator" : "Generate Article with AI"}
        </button>

        {showAI && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-4 bg-gray-900/60 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold mb-3">
              🎯 What should we write about?
            </h3>

            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., How to invest in Bitcoin 2026"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-purple-500 mb-3"
              disabled={generating}
            />

            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-2">💡 Quick Topics:</p>
              <div className="flex flex-wrap gap-2">
                {topicSuggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setTopic(s)}
                    disabled={generating}
                    className="text-xs bg-gray-800 hover:bg-purple-500 text-gray-300 hover:text-white px-3 py-1 rounded-full transition"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={generateArticle}
              disabled={generating || !topic.trim()}
              className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-lg transition"
            >
              {generating ? "🤖 Generating..." : "✨ Generate Article"}
            </button>

            {message && (
              <div className="mt-4 p-3 bg-gray-800 rounded-lg text-center">
                {message}
              </div>
            )}

            {aiArticles.length > 0 && (
              <div className="mt-4 p-3 bg-purple-500/10 rounded-lg text-center text-sm text-purple-300">
                ✨ You have {aiArticles.length} AI-generated article(s)
              </div>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {allArticles.map((article, idx) => {
          const isAI = aiArticles.some((a) => a.slug === article.slug);
          return (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="relative"
            >
              <Link href={`/blog/${article.slug}`}>
                <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden hover:border-green-500 hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] transition cursor-pointer h-full flex flex-col">
                  <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-6xl relative">
                    {article.emoji}
                    {isAI && (
                      <span className="absolute top-2 right-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                        🤖 AI
                      </span>
                    )}
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-3 text-xs text-gray-400">
                      <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full font-semibold">
                        {article.category}
                      </span>
                      <span>{article.readTime}</span>
                    </div>
                    <h2 className="text-lg font-bold mb-2 hover:text-green-400 transition line-clamp-2">
                      {article.title}
                    </h2>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-1">
                      {article.excerpt}
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {article.date}
                      </span>
                      <span className="inline-block bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-medium">
                        Read More →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
              {isAI && (
                <button
                  onClick={() => deleteAiArticle(article.slug)}
                  className="absolute top-2 left-2 bg-red-500/80 hover:bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold z-10"
                >
                  🗑️
                </button>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}