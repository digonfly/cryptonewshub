"use client";

import { useEffect, useState } from "react";

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

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch("/api/news");
        const data = await res.json();
        setNews(data.slice(0, 6));
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
    }

    fetchNews();
  }, []);

  return (
    <section className="bg-[#0B0F19] text-white py-20 px-8">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-4xl font-bold mb-10">
          📰 Latest Crypto News
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {news.map((item) => (
            <div
              key={item.article_id}
              className="bg-[#111827] border border-gray-700 rounded-xl overflow-hidden hover:border-cyan-400 transition"
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

                <p className="text-cyan-400 text-sm mb-2">
                  {item.source_name}
                </p>

                <h3 className="text-xl font-bold mb-3 line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-gray-400 text-sm line-clamp-3 mb-5">
                  {item.description || "No description available."}
                </p>

                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline font-semibold"
                >
                  Read More →
                </a>

              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}