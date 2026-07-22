"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { blogArticles, BlogArticle } from "../articles";

export default function BlogArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState<BlogArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    // Get current URL for sharing
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }

    // First check static articles
    let found = blogArticles.find((a) => a.slug === slug);

    // If not found, check AI articles from localStorage
    if (!found) {
      const stored = localStorage.getItem("aiArticles");
      if (stored) {
        const aiArticles: BlogArticle[] = JSON.parse(stored);
        found = aiArticles.find((a) => a.slug === slug);
      }
    }

    setArticle(found || null);
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-3xl mb-4">Article Not Found</h1>
          <Link href="/blog" className="text-green-400 hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Share text with title + URL
  const shareText = `${article.title}\n\nRead more: ${currentUrl}`;
  const encodedShareText = encodeURIComponent(shareText);
  const encodedTitle = encodeURIComponent(article.title);
  const encodedUrl = encodeURIComponent(currentUrl);

  return (
    <div className="min-h-screen text-white px-4 md:px-10 py-10">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/blog"
          className="text-green-400 hover:text-green-300 mb-6 inline-block"
        >
          ← Back to Blog
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden"
        >
          <div className="h-64 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-9xl">
            {article.emoji}
          </div>

          <div className="p-6 md:p-10">
            <div className="flex items-center gap-3 mb-4 text-sm flex-wrap">
              <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full font-semibold">
                {article.category}
              </span>
              <span className="text-gray-400">{article.date}</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-400">{article.readTime}</span>
              {article.author === "CryptoNewsHub AI" && (
                <span className="bg-purple-500 text-white px-3 py-1 rounded-full font-semibold">
                  🤖 AI Generated
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="rainbow-text">{article.title}</span>
            </h1>

            <p className="text-gray-400 text-lg mb-6">By {article.author}</p>

            <div
              className="prose prose-invert prose-lg max-w-none
                prose-headings:text-white prose-headings:font-bold
                prose-h1:text-3xl prose-h1:mb-4 prose-h1:mt-8
                prose-h2:text-2xl prose-h2:mb-3 prose-h2:mt-6 prose-h2:text-green-400
                prose-h3:text-xl prose-h3:mb-2 prose-h3:mt-4 prose-h3:text-blue-400
                prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
                prose-strong:text-white prose-strong:font-bold
                prose-ul:text-gray-300 prose-ul:my-4
                prose-li:mb-2"
              dangerouslySetInnerHTML={{
                __html: article.content
                  .replace(/^# (.*$)/gim, '<h1>$1</h1>')
                  .replace(/^## (.*$)/gim, '<h2>$1</h2>')
                  .replace(/^### (.*$)/gim, '<h3>$1</h3>')
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/^\- (.*$)/gim, '<li>$1</li>')
                  .replace(/^✅ (.*$)/gim, '<li>✅ $1</li>')
                  .replace(/^❌ (.*$)/gim, '<li>❌ $1</li>')
                  .replace(/^⚠️ (.*$)/gim, '<li>⚠️ $1</li>')
                  .replace(/\n\n/g, '</p><p>')
                  .replace(/^(?!<[h|l|p])(.+)$/gim, '<p>$1</p>'),
              }}
            />

            {/* Share Section */}
            <div className="mt-10 pt-6 border-t border-gray-800">
              <h3 className="text-lg font-bold mb-4">📤 Share this article:</h3>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <Link
                  href="/blog"
                  className="text-green-400 hover:text-green-300"
                >
                  ← Back to Blog
                </Link>
                <div className="flex gap-2 flex-wrap">
                  {/* WhatsApp */}
                  <a
                    href={`https://wa.me/?text=${encodedShareText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1"
                  >
                    💬 WhatsApp
                  </a>

                  {/* Twitter */}
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1"
                  >
                    🐦 Twitter
                  </a>

                  {/* Facebook */}
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1"
                  >
                    📘 Facebook
                  </a>

                  {/* Telegram */}
                  <a
                    href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1"
                  >
                    ✈️ Telegram
                  </a>

                  {/* Copy Link */}
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(currentUrl);
                      alert("✅ Link copied to clipboard!");
                    }}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1"
                  >
                    🔗 Copy Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}