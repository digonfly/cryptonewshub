"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface Holding {
  id: string;
  coinId: string;
  coinName: string;
  coinSymbol: string;
  coinImage: string;
  quantity: number;
  buyPrice: number;
  addedAt: string;
}

interface CoinPrice {
  [key: string]: { usd: number };
}

interface CoinOption {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
}

export default function PortfolioPage() {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [prices, setPrices] = useState<CoinPrice>({});
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [coinOptions, setCoinOptions] = useState<CoinOption[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<CoinOption | null>(null);
  const [quantity, setQuantity] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [searchCoin, setSearchCoin] = useState("");

  // Load holdings and prices
  useEffect(() => {
    async function loadData() {
      try {
        // Load holdings from localStorage
        const stored = localStorage.getItem("portfolio");
        const savedHoldings: Holding[] = stored ? JSON.parse(stored) : [];
        setHoldings(savedHoldings);

        // Fetch coin options for adding
        const coinsRes = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        );
        const coinsData = await coinsRes.json();
        if (Array.isArray(coinsData)) {
          setCoinOptions(coinsData);
        }

        // Fetch current prices for holdings
        if (savedHoldings.length > 0) {
          const ids = savedHoldings.map((h) => h.coinId).join(",");
          const pricesRes = await fetch(
            `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
          );
          const pricesData = await pricesRes.json();
          setPrices(pricesData);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const addHolding = () => {
    if (!selectedCoin || !quantity || !buyPrice) {
      alert("❌ Please fill all fields");
      return;
    }

    const newHolding: Holding = {
      id: Date.now().toString(),
      coinId: selectedCoin.id,
      coinName: selectedCoin.name,
      coinSymbol: selectedCoin.symbol,
      coinImage: selectedCoin.image,
      quantity: parseFloat(quantity),
      buyPrice: parseFloat(buyPrice),
      addedAt: new Date().toISOString(),
    };

    const updated = [...holdings, newHolding];
    setHoldings(updated);
    localStorage.setItem("portfolio", JSON.stringify(updated));

    // Update prices
    setPrices({
      ...prices,
      [selectedCoin.id]: { usd: selectedCoin.current_price },
    });

    // Reset form
    setSelectedCoin(null);
    setQuantity("");
    setBuyPrice("");
    setSearchCoin("");
    setShowAddForm(false);
  };

  const deleteHolding = (id: string) => {
    if (!confirm("Delete this holding?")) return;
    const updated = holdings.filter((h) => h.id !== id);
    setHoldings(updated);
    localStorage.setItem("portfolio", JSON.stringify(updated));
  };

  // Calculations
  const calculateStats = () => {
    let totalInvested = 0;
    let totalCurrent = 0;

    holdings.forEach((h) => {
      const currentPrice = prices[h.coinId]?.usd || 0;
      totalInvested += h.quantity * h.buyPrice;
      totalCurrent += h.quantity * currentPrice;
    });

    const totalProfit = totalCurrent - totalInvested;
    const totalProfitPercent = totalInvested > 0 ? (totalProfit / totalInvested) * 100 : 0;

    return { totalInvested, totalCurrent, totalProfit, totalProfitPercent };
  };

  const stats = calculateStats();

  const filteredCoins = coinOptions.filter((c) =>
    c.name.toLowerCase().includes(searchCoin.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full"
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
          💼 <span className="rainbow-text">My Portfolio</span>
        </h1>
        <p className="text-gray-400">Track your crypto investments in real-time</p>
      </motion.div>

      {/* Stats Cards */}
      {holdings.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto mb-8"
        >
          <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl p-4 text-center">
            <p className="text-gray-400 text-sm">Total Invested</p>
            <p className="text-xl font-bold text-blue-400">
              ${stats.totalInvested.toFixed(2)}
            </p>
          </div>
          <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl p-4 text-center">
            <p className="text-gray-400 text-sm">Current Value</p>
            <p className="text-xl font-bold text-green-400">
              ${stats.totalCurrent.toFixed(2)}
            </p>
          </div>
          <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl p-4 text-center">
            <p className="text-gray-400 text-sm">Profit/Loss</p>
            <p className={`text-xl font-bold ${stats.totalProfit >= 0 ? "text-green-400" : "text-red-400"}`}>
              {stats.totalProfit >= 0 ? "+" : ""}${stats.totalProfit.toFixed(2)}
            </p>
          </div>
          <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl p-4 text-center">
            <p className="text-gray-400 text-sm">Change %</p>
            <p className={`text-xl font-bold ${stats.totalProfitPercent >= 0 ? "text-green-400" : "text-red-400"}`}>
              {stats.totalProfitPercent >= 0 ? "+" : ""}{stats.totalProfitPercent.toFixed(2)}%
            </p>
          </div>
        </motion.div>
      )}

      {/* Add Coin Button */}
      <div className="max-w-6xl mx-auto mb-6">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold px-6 py-4 rounded-2xl transition shadow-[0_0_30px_rgba(34,197,94,0.5)]"
        >
          {showAddForm ? "❌ Cancel" : "➕ Add New Holding"}
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="max-w-6xl mx-auto mb-8 bg-gray-900/60 backdrop-blur-sm border border-green-500/30 rounded-2xl p-6"
        >
          <h3 className="text-xl font-bold mb-4">Add New Coin</h3>

          {!selectedCoin ? (
            <>
              <input
                type="text"
                value={searchCoin}
                onChange={(e) => setSearchCoin(e.target.value)}
                placeholder="🔍 Search coin..."
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-green-500 mb-3"
              />

              <div className="max-h-64 overflow-y-auto space-y-2">
                {filteredCoins.slice(0, 20).map((coin) => (
                  <button
                    key={coin.id}
                    onClick={() => setSelectedCoin(coin)}
                    className="w-full flex items-center gap-3 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition text-left"
                  >
                    <img src={coin.image} alt={coin.name} className="w-8 h-8" />
                    <div className="flex-1">
                      <p className="font-bold">{coin.name}</p>
                      <p className="text-sm text-gray-400">{coin.symbol.toUpperCase()}</p>
                    </div>
                    <p className="text-green-400 font-bold">
                      ${coin.current_price.toLocaleString()}
                    </p>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-4 p-3 bg-gray-800 rounded-lg">
                <img src={selectedCoin.image} alt={selectedCoin.name} className="w-10 h-10" />
                <div className="flex-1">
                  <p className="font-bold">{selectedCoin.name}</p>
                  <p className="text-sm text-gray-400">
                    Current: ${selectedCoin.current_price.toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCoin(null)}
                  className="text-gray-400 hover:text-white"
                >
                  Change
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Quantity</label>
                  <input
                    type="number"
                    step="0.00000001"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="0.5"
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Buy Price (USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={buyPrice}
                    onChange={(e) => setBuyPrice(e.target.value)}
                    placeholder="50000"
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-green-500"
                  />
                </div>
              </div>

              <button
                onClick={addHolding}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition"
              >
                ✅ Add to Portfolio
              </button>
            </>
          )}
        </motion.div>
      )}

      {/* Holdings List */}
      {holdings.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20"
        >
          <p className="text-2xl mb-4">💼 Your portfolio is empty</p>
          <p className="text-gray-400 mb-6">Start tracking your crypto investments!</p>
        </motion.div>
      ) : (
        <div className="max-w-6xl mx-auto space-y-3">
          {holdings.map((h, idx) => {
            const currentPrice = prices[h.coinId]?.usd || 0;
            const currentValue = h.quantity * currentPrice;
            const invested = h.quantity * h.buyPrice;
            const profit = currentValue - invested;
            const profitPercent = invested > 0 ? (profit / invested) * 100 : 0;

            return (
              <motion.div
                key={h.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-2xl p-5 hover:border-green-500 transition"
              >
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <img src={h.coinImage} alt={h.coinName} className="w-12 h-12" />
                    <div>
                      <h3 className="text-xl font-bold">{h.coinName}</h3>
                      <p className="text-gray-400 text-sm">{h.coinSymbol.toUpperCase()}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1 max-w-2xl">
                    <div className="text-center">
                      <p className="text-xs text-gray-400">Quantity</p>
                      <p className="font-bold">{h.quantity}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-400">Buy Price</p>
                      <p className="font-bold">${h.buyPrice.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-400">Current Value</p>
                      <p className="font-bold text-green-400">${currentValue.toFixed(2)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-400">Profit/Loss</p>
                      <p className={`font-bold ${profit >= 0 ? "text-green-400" : "text-red-400"}`}>
                        {profit >= 0 ? "+" : ""}${profit.toFixed(2)}
                        <span className="text-xs ml-1">({profitPercent.toFixed(2)}%)</span>
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteHolding(h.id)}
                    className="bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white px-3 py-2 rounded-lg text-sm font-bold transition"
                  >
                    🗑️
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}