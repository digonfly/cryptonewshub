"use client";

import { useEffect, useState } from "react";

interface Coin {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
}

export default function CryptoTicker() {
  const [coins, setCoins] = useState<Coin[]>([]);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch("/api/coins");
        const data = await res.json();
        setCoins(data);
      } catch (error) {
        console.error("Error fetching coins:", error);
      }
    };

    fetchCoins();

    const interval = setInterval(fetchCoins, 60000); // Refresh every 60 sec

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-black border-y border-gray-800 overflow-hidden">
      <div className="flex gap-8 whitespace-nowrap overflow-x-auto px-6 py-4">
        {coins.map((coin) => (
          <div key={coin.id} className="flex items-center gap-3">
            <span className="font-bold text-cyan-400 uppercase">
              {coin.symbol}
            </span>

            <span>
              $
              {coin.current_price.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </span>

            <span
              className={
                coin.price_change_percentage_24h >= 0
                  ? "text-green-400"
                  : "text-red-400"
              }
            >
              {coin.price_change_percentage_24h >= 0 ? "+" : ""}
              {coin.price_change_percentage_24h.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}