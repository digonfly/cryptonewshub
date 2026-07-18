"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface Alert {
  id: string;
  coinId: string;
  coinName: string;
  coinSymbol: string;
  targetPrice: number;
  condition: "above" | "below";
  createdAt: string;
  triggered: boolean;
}

interface CoinPrice {
  [key: string]: { usd: number };
}

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [prices, setPrices] = useState<CoinPrice>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAlerts() {
      const stored = localStorage.getItem("priceAlerts");
      const savedAlerts: Alert[] = stored ? JSON.parse(stored) : [];
      setAlerts(savedAlerts);
      if (savedAlerts.length === 0) { setLoading(false); return; }

      try {
        const ids = savedAlerts.map((a) => a.coinId).join(",");
        const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`);
        const data = await res.json();
        setPrices(data);

        const updatedAlerts = savedAlerts.map((alert) => {
          const currentPrice = data[alert.coinId]?.usd;
          if (!currentPrice) return alert;
          let triggered = false;
          if (alert.condition === "above" && currentPrice >= alert.targetPrice) triggered = true;
          else if (alert.condition === "below" && currentPrice <= alert.targetPrice) triggered = true;
          return { ...alert, triggered };
        });
        setAlerts(updatedAlerts);
        localStorage.setItem("priceAlerts", JSON.stringify(updatedAlerts));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadAlerts();
  }, []);

  const deleteAlert = (id: string) => {
    const updated = alerts.filter((a) => a.id !== id);
    setAlerts(updated);
    localStorage.setItem("priceAlerts", JSON.stringify(updated));
  };

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
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-bold mb-3">
          🔔 <span className="rainbow-text">Price Alerts</span>
        </h1>
        <p className="text-gray-400">Get notified when your favorite coins hit target prices</p>
      </motion.div>

      {alerts.length === 0 ? (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
          <p className="text-2xl mb-4">🔕 No alerts set yet</p>
          <p className="text-gray-400 mb-6">Go to any coin page and click "🔔 Set Alert"</p>
          <Link href="/coins" className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-xl inline-block">Browse Coins →</Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {alerts.map((alert, idx) => {
            const currentPrice = prices[alert.coinId]?.usd || 0;
            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`bg-gray-900/60 backdrop-blur-sm border rounded-2xl p-5 transition ${alert.triggered ? "border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.4)]" : "border-gray-800 hover:border-blue-500"}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold">{alert.coinName}</h2>
                    <p className="text-gray-400 uppercase text-sm">{alert.coinSymbol}</p>
                  </div>
                  {alert.triggered && <span className="bg-green-500 text-black text-xs font-bold px-2 py-1 rounded-full">✅ HIT</span>}
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Current Price</span>
                    <span className="font-bold">${currentPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Target Price</span>
                    <span className={`font-bold ${alert.condition === "above" ? "text-green-400" : "text-red-400"}`}>
                      {alert.condition === "above" ? "📈" : "📉"} ${alert.targetPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Created</span>
                    <span className="text-sm">{new Date(alert.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href={`/coin/${alert.coinId}`} className="flex-1 bg-gray-800 hover:bg-gray-700 text-center py-2 rounded-lg text-sm font-bold transition">View Coin</Link>
                  <button onClick={() => deleteAlert(alert.id)} className="flex-1 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white py-2 rounded-lg text-sm font-bold transition">🗑️ Delete</button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}