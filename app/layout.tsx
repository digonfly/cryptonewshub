import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CryptoBackground from "./components/CryptoBackground";
import GoogleAnalytics from "./components/GoogleAnalytics";
import WelcomeScreen from "./components/WelcomeScreen";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CryptoNewsHub - Real-time Crypto Prices, News, Airdrops & AI Blog",
  description:
    "Track crypto prices, discover airdrops, read AI-powered blogs, manage portfolio, get price alerts. Your complete crypto companion.",
  keywords: "cryptocurrency, bitcoin, ethereum, crypto news, airdrops, crypto blog, portfolio tracker, price alerts, defi, web3",
  authors: [{ name: "CryptoNewsHub" }],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "CryptoNewsHub - Complete Crypto Platform",
    description: "Real-time crypto prices, AI-powered blogs, airdrops, portfolio tracker & more!",
    url: "https://cryptonewshub-eight.vercel.app",
    siteName: "CryptoNewsHub",
    images: [
      {
        url: "/logo.png",
        width: 1536,
        height: 1024,
        alt: "CryptoNewsHub Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CryptoNewsHub - Complete Crypto Platform",
    description: "Real-time crypto prices, AI blogs, airdrops & more!",
    images: ["/logo.png"],
  },
  verification: {
    google: "NdUfnBGrTvAk8WBaYUgaiTuCkXmj75Ok-SOmo2Qfvzw",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        {/* 🎬 Welcome Screen - Pehli baar dikhega */}
        <WelcomeScreen />
        
        <GoogleAnalytics GA_ID="G-LXP71R82RE" />
        <CryptoBackground />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}