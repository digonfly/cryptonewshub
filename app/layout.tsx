import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CryptoBackground from "./components/CryptoBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "CryptoNewsHub - Live Crypto Prices, News & Market Data",
    template: "%s | CryptoNewsHub",
  },
  description:
    "Track real-time cryptocurrency prices, trending coins, latest crypto news, airdrops, and manage your watchlist with price alerts. Free and open source.",
  keywords: [
    "crypto",
    "cryptocurrency",
    "bitcoin",
    "ethereum",
    "crypto news",
    "crypto prices",
    "crypto market",
    "crypto tracker",
    "crypto watchlist",
    "crypto airdrops",
    "bitcoin price",
    "ethereum price",
    "trending coins",
    "fear and greed index",
    "crypto alerts",
  ],
  authors: [{ name: "CryptoNewsHub" }],
  creator: "CryptoNewsHub",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cryptonewshub-eight.vercel.app",
    title: "CryptoNewsHub - Live Crypto Prices, News & Market Data",
    description:
      "Track real-time cryptocurrency prices, trending coins, latest crypto news, airdrops, and manage your watchlist with price alerts.",
    siteName: "CryptoNewsHub",
  },
  twitter: {
    card: "summary_large_image",
    title: "CryptoNewsHub - Live Crypto Prices & News",
    description:
      "Real-time crypto prices, news, trending coins, airdrops and more.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} bg-black text-white`}>
        <CryptoBackground />
        <Navbar />
        <main className="min-h-screen relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}