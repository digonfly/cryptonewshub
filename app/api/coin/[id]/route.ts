"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import WatchlistButton from "../../components/WatchlistButton";
import PriceAlertButton from "../../components/PriceAlertButton";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface CoinDetail {
  id: string;
  name: string;
  symbol: string;
  image: { large: string };
  market_data: {
    current_price: { usd: number };
    price_change_percentage_24h: number;
    market_cap: { usd: number };
    total_volume: { usd: number };
    high_24h: { usd: number };
    low_24h: { usd: number };
  };
  description: { en: string };
  links: { homepage: string[] };
}

interface ChartPoint {
  date: string;
  price: number;
}

export default function CoinDetailPage() {
  const { id } = useParams();
  const [coin, setCoin] = useState<CoinDetail | null>(null);
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [days, setDays] = useState("7");
  const [loading, setLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(false);

  useEffect(() => {
    async function fetchCoin() {
      try {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
        const data = await res.json();
        setCoin(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCoin();
  }, [id]);

  useEffect(() => {
    async function fetchChart() {
      setChartLoading(true);
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`
        );
        const data = await res.json();
        if (data.prices) {
          const formatted = data.prices.map((p: [number, number]) => ({
            date: new Date(p[0]).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            }),
            price: p[1],
          }));
          setChartData(formatted);
        }
      } catch (error) {
        console.error("Chart error:", error);
      } finally {
        setChartLoading(false);
      }
    }
    fetchChart();
  }, [id, days]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-gray-400">
        Loading coin details...
      </div>
    );
  }

  if (!coin) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-red-400">
        Coin not found.
      </div>
    );
  }

  const price = coin.market_data.current_price.usd;
  const change = coin.market_data.price_change_percentage_24h;
  const marketCap = coin.market_data.market_cap.usd;
  const volume = coin.market_data.total_volume.usd;
  const high = coin.market_data.high_24h.usd;
  const low = coin.market_data.low_24h.usd;

  const timeframes = [
    { label: "7D", value: "7" },
    { label: "30D", value: "30" },
    { label: "90D", value: "90" },
    { label: "1Y", value: "365" },
  ];

  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-10 py-10">
      <Link href="/coins" className="text-green-400 hover:text-green-300 mb-6 inline-block">
        ← Back to Coins
      </Link>

      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <img src={coin.image.large} alt={coin.name} className="w-16 h-16" />
          <div>
            <h1 className="text-3xl font-bold">{coin.name}</h1>
            <p className="text-gray-400 text-lg">{coin.symbol.toUpperCase()}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <PriceAlertButton
            coinId={coin.id}
            coinName={coin.name}
            coinSymbol={coin.symbol}
            currentPrice={price}
          />
          <WatchlistButton coinId={coin.id} />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-900 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Current Price</p>
          <p className="text-2xl font-bold">${price.toLocaleString()}</p>
        </div>
        <div className="bg-gray-900 rounded-xl p-4">
          <p className="text-gray-400 text-sm">24h Change</p>
          <p className={`text-2xl font-bold ${change >= 0 ? "text-green-500" : "text-red-500"}`}>
            {change?.toFixed(2)}%
          </p>
        </div>
        <div className="bg-gray-900 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Market Cap</p>
          <p className="text-2xl font-bold">${marketCap.toLocaleString()}</p>
        </div>
        <div className="bg-gray-900 rounded-xl p-4">
          <p className="text-gray-400 text-sm">24h Volume</p>
          <p className="text-2xl font-bold">${volume.toLocaleString()}</p>
        </div>
        <div className="bg-gray-900 rounded-xl p-4">
          <p className="text-gray-400 text-sm">24h High</p>
          <p className="text-2xl font-bold text-green-400">${high.toLocaleString()}</p>
        </div>
        <div className="bg-gray-900 rounded-xl p-4">
          <p className="text-gray-400 text-sm">24h Low</p>
          <p className="text-2xl font-bold text-red-400">${low.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-gray-900 rounded-xl p-4 md:p-6 mb-8">
        <div className="flex flex-wrap items-center justify-between mb-4 gap-3">
          <h2 className="text-xl font-bold">📊 Price Chart</h2>
          <div className="flex gap-2">
            {timeframes.map((tf) => (
              <button
                key={tf.value}
                onClick={() => setDays(tf.value)}
                className={`px-3 py-1 rounded-lg text-sm font-bold transition ${
                  days === tf.value
                    ? "bg-green-500 text-black"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
              >
                {tf.label}
              </button>
            ))}
          </div>
        </div>

        {chartLoading ? (
          <div className="h-72 flex items-center justify-center text-gray-500">
            Loading chart...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="date" stroke="#9ca3af" tick={{ fontSize: 12 }} />
              <YAxis
                stroke="#9ca3af"
                tick={{ fontSize: 12 }}
                domain={["auto", "auto"]}
                tickFormatter={(v) => `$${v.toLocaleString()}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#111827",
                  border: "1px solid #22c55e",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#9ca3af" }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, "Price"]}
              />
              <Line type="monotone" dataKey="price" stroke="#22c55e" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {coin.links.homepage[0] && (
        <div className="mb-8">
          <a
            href={coin.links.homepage[0]}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-black font-bold px-6 py-3 rounded-lg inline-block"
          >
            🌐 Official Website
          </a>
        </div>
      )}

      {coin.description.en && (
        <div className="bg-gray-900 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-3">About {coin.name}</h2>
          <p
            className="text-gray-400 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: coin.description.en.slice(0, 500) + "...",
            }}
          />
        </div>
      )}
    </div>
  );
}