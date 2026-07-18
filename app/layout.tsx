import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CryptoBackground from "./components/CryptoBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CryptoNewsHub - Real-time Crypto Prices & News",
  description: "Track crypto prices, market trends, news, and manage your watchlist with real-time alerts.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <CryptoBackground />
        <Navbar />
        <main className="min-h-screen relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}