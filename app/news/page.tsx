"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface NewsArticle {
  article_id: string;
  title: string;
  link: string;
  description: string | null;
  image_url: string | null;
  pubDate: string;
  source_id: string;
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch("/api/news");
        const data = await res.json();
        if (data.results && Array.isArray(data.results)) {
          setNews(data.results);
        } else {
          setError("No news available right now.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load news.");
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white px-4 md:px-10 py-10">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-bold mb-3">
          📰 <span className="rainbow-text">Crypto News</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">Latest crypto news and market updates</p>
      </motion.div>

      {error ? (
        <div className="text-center text-red-400 text-xl py-20">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {news.map((article, idx) => (
            <motion.a
              key={article.article_id || idx}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition cursor-pointer flex flex-col"
            >
              {article.image_url && (
                <div className="h-48 overflow-hidden bg-gray-800">
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-110 transition duration-500"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
              )}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-3 text-xs text-gray-400">
                  <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full font-semibold">
                    {article.source_id || "News"}
                  </span>
                  <span>
                    {new Date(article.pubDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                </div>
                <h2 className="text-lg font-bold mb-2 hover:text-blue-400 transition line-clamp-2">{article.title}</h2>
                {article.description && (
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-1">{article.description}</p>
                )}
                <div className="mt-auto">
                  <span className="inline-block bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-xs font-medium">Read More →</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      )}
    </div>
  );
}