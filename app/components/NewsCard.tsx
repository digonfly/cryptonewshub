"use client";

import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";

interface News {
  article_id: string;
  title: string;
  description: string;
  image_url: string | null;
  link: string;
  source_name: string;
  pubDate: string;
}

export default function NewsCard() {
  const [news, setNews] = useState<News[]>([]);
  const [searchQuery, setSearchQuery] = useState("crypto");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNews(searchQuery);
  }, [searchQuery]);

  async function fetchNews(query: string) {
    try {
      setLoading(true);

      const res = await fetch(
        `/api/news?q=${encodeURIComponent(query)}`
      );

      const data = await res.json();

      if (Array.isArray(data)) {
        setNews(data.slice(0, 6));
      } else {
        setNews([]);
      }
    } catch (error) {
      console.error("Failed to fetch news:", error);
      setNews([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-[#0B0F19] text-white py-20 px-8">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-4xl font-bold mb-6">
          📰 Latest Crypto News
        </h2>

        <SearchBar onSearch={setSearchQuery} />

        {loading ? (
          <div className="text-center py-10 text-cyan-400 text-xl">
            Loading News...
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {news.map((item) => (
              <div
                key={item.article_id}
                className="bg-[#111827] border border-gray-700 rounded-xl overflow-hidden hover:border-cyan-400 transition duration-300"
              >
                <img
                  src={
                    item.image_url ||
                    "https://placehold.co/600x400/111827/ffffff?text=Crypto+News"
                  }
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />

                <div className="p-6">

                  <div className="flex justify-between items-center mb-3">
                    <span className="text-cyan-400 text-sm">
                      {item.source_name}
                    </span>

                    <span className="text-gray-500 text-xs">
                      {new Date(item.pubDate).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-3 line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-gray-400 text-sm line-clamp-3 mb-6">
                    {item.description || "No description available."}
                  </p>

                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-lg transition"
                  >
                    Read More →
                  </a>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}