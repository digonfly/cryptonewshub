import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://cryptonewshub-eight.vercel.app",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://cryptonewshub-eight.vercel.app/coins",
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.9,
    },
    {
      url: "https://cryptonewshub-eight.vercel.app/trending",
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.8,
    },
    {
      url: "https://cryptonewshub-eight.vercel.app/news",
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.8,
    },
    {
      url: "https://cryptonewshub-eight.vercel.app/airdrops",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://cryptonewshub-eight.vercel.app/watchlist",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.6,
    },
    {
      url: "https://cryptonewshub-eight.vercel.app/alerts",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.6,
    },
  ];
}