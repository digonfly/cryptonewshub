import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CryptoTicker from "./components/CryptoTicker";
import TrendingCoins from "./components/TrendingCoins";
import NewsCard from "./components/NewsCard";
import AirdropSection from "./components/AirdropSection";
import TradingTips from "./components/TradingTips";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <CryptoTicker />
      <TrendingCoins />
      <NewsCard />
      <AirdropSection />
      <TradingTips />
      <Newsletter />
      <Footer />
    </>
  );
}