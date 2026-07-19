import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: "https://cryptonewshub-eight.vercel.app/sitemap.xml",
    host: "https://cryptonewshub-eight.vercel.app",
  };
}