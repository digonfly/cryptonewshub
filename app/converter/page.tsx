"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
}

const currencies = [
  { code: "usd", symbol: "$", name: "USD" },
  { code: "inr", symbol: "₹", name: "INR" },
  { code: "eur", symbol: "€", name: "EUR" },
  { code: "gbp", symbol: "£", name: "GBP" },
  { code: "jpy", symbol: "¥", name: "JPY" },
  { code: "aud", symbol: "A$", name: "AUD" },
  { code: "cad", symbol: "C$", name: "CAD" },
];

export default function ConverterPage() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [amount, setAmount] = useState("1");
  const [result, setResult] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [searchCoin, setSearchCoin] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchCoins() {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        );
        const data = await res.json();
        if (Array.isArray(data)) {
          setCoins(data);
          setSelectedCoin(data[0]); // Default: Bitcoin
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchCoins();
  }, []);

  useEffect(() => {
    async function convertPrice() {
      if (!selectedCoin || !amount) return;

      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${selectedCoin.id}&vs_currencies=${selectedCurrency.code}`
        );
        const data = await res.json();
        const price = data[selectedCoin.id]?.[selectedCurrency.code] || 0;
        setResult(price * parseFloat(amount || "0"));
      } catch (err) {
        console.error(err);
      }
    }
    convertPrice();
  }, [selectedCoin, selectedCurrency, amount]);

  const copyResult = () => {
    const text = `${amount} ${selectedCoin?.symbol.toUpperCase()} = ${selectedCurrency.symbol}${result.toLocaleString()} ${selectedCurrency.name}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredCoins = coins.filter((c) =>
    c.name.toLowerCase().includes(searchCoin.toLowerCase())
  );

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
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl md:text-5xl font-bold mb-3">
          🔄 <span className="rainbow-text">Crypto Converter</span>
        </h1>
        <p className="text-gray-400">Convert any cryptocurrency to fiat in real-time</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-2xl mx-auto bg-gray-900/60 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-6"
      >
        {/* Amount Input */}
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">Amount</label>
          <input
            type="number"
            step="0.00000001"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="1"
            className="w-full px-4 py-4 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500 text-2xl font-bold"
          />
        </div>

        {/* Coin Selector */}
        <div className="mb-4 relative">
          <label className="block text-sm text-gray-400 mb-2">From (Cryptocurrency)</label>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 hover:border-blue-500 transition"
          >
            {selectedCoin && (
              <>
                <img src={selectedCoin.image} alt={selectedCoin.name} className="w-8 h-8" />
                <div className="flex-1 text-left">
                  <p className="font-bold">{selectedCoin.name}</p>
                  <p className="text-sm text-gray-400">{selectedCoin.symbol.toUpperCase()}</p>
                </div>
                <span className="text-gray-400">▼</span>
              </>
            )}
          </button>

          {showDropdown && (
            <div className="absolute z-10 top-full mt-2 w-full bg-gray-900 border border-gray-700 rounded-lg shadow-2xl max-h-80 overflow-hidden">
              <input
                type="text"
                value={searchCoin}
                onChange={(e) => setSearchCoin(e.target.value)}
                placeholder="🔍 Search coin..."
                className="w-full px-4 py-3 bg-gray-800 border-b border-gray-700 focus:outline-none"
              />
              <div className="max-h-64 overflow-y-auto">
                {filteredCoins.map((coin) => (
                  <button
                    key={coin.id}
                    onClick={() => {
                      setSelectedCoin(coin);
                      setShowDropdown(false);
                      setSearchCoin("");
                    }}
                    className="w-full flex items-center gap-3 p-3 hover:bg-gray-800 transition text-left"
                  >
                    <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                    <span className="flex-1">{coin.name}</span>
                    <span className="text-gray-400">{coin.symbol.toUpperCase()}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Currency Selector */}
        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">To (Currency)</label>
          <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
            {currencies.map((c) => (
              <button
                key={c.code}
                onClick={() => setSelectedCurrency(c)}
                className={`px-3 py-2 rounded-lg font-bold text-sm transition ${
                  selectedCurrency.code === c.code
                    ? "bg-blue-500 text-white"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
              >
                {c.symbol} {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Result */}
        <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-xl p-6 text-center">
          <p className="text-gray-400 text-sm mb-2">Converted Amount</p>
          <p className="text-3xl md:text-4xl font-bold text-blue-400 mb-4">
            {selectedCurrency.symbol}
            {result.toLocaleString(undefined, { maximumFractionDigits: 8 })}
          </p>
          <p className="text-gray-400 text-sm mb-4">
            {amount} {selectedCoin?.symbol.toUpperCase()} = {selectedCurrency.symbol}
            {result.toLocaleString()} {selectedCurrency.name}
          </p>
          <button
            onClick={copyResult}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-2 rounded-lg transition"
          >
            {copied ? "✅ Copied!" : "📋 Copy Result"}
          </button>
        </div>

        {/* Info */}
        <div className="mt-4 p-3 bg-gray-800/50 rounded-lg text-center">
          <p className="text-xs text-gray-400">
            💡 Prices update in real-time from CoinGecko API
          </p>
        </div>
      </motion.div>
    </div>
  );
}