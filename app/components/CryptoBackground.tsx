"use client";

import { useEffect, useState } from "react";

interface Candle {
  x: number;
  open: number;
  close: number;
  high: number;
  low: number;
  isGreen: boolean;
}

export default function CryptoBackground() {
  const [candles, setCandles] = useState<Candle[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    function makeCandles() {
      const list: Candle[] = [];
      let last = 400;
      for (let i = 0; i < 30; i++) {
        const open = last;
        const change = (Math.random() - 0.5) * 150;
        const close = Math.max(100, Math.min(700, open + change));
        list.push({
          x: i * 70,
          open,
          close,
          high: Math.max(open, close) + Math.random() * 60,
          low: Math.min(open, close) - Math.random() * 60,
          isGreen: close >= open,
        });
        last = close;
      }
      return list;
    }

    setCandles(makeCandles());

    const timer = setInterval(() => {
      setCandles((prev) => {
        if (!prev.length) return prev;
        const last = prev[prev.length - 1];
        const open = last.close;
        const change = (Math.random() - 0.5) * 150;
        const close = Math.max(100, Math.min(700, open + change));
        const next: Candle = {
          x: 29 * 70,
          open,
          close,
          high: Math.max(open, close) + Math.random() * 60,
          low: Math.min(open, close) - Math.random() * 60,
          isGreen: close >= open,
        };
        return [...prev.slice(1).map((c, i) => ({ ...c, x: i * 70 })), next];
      });
    }, 1500);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return <div className="fixed inset-0 -z-10 bg-black" />;
  }

  return (
    <div className="fixed inset-0 -z-10 bg-black overflow-hidden">

      {/* Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,197,94,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,197,94,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Big Candlestick Chart - Full Screen */}
      {candles.length > 0 && (
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 2100 800"
          preserveAspectRatio="none"
          style={{ opacity: 0.6 }}
        >
          {candles.map((c, i) => {
            const color = c.isGreen ? "#22c55e" : "#ef4444";
            const bodyTop = 800 - Math.max(c.open, c.close);
            const bodyH = Math.max(Math.abs(c.close - c.open), 15);
            return (
              <g key={i}>
                {/* Wick */}
                <line
                  x1={c.x + 30}
                  y1={800 - c.high}
                  x2={c.x + 30}
                  y2={800 - c.low}
                  stroke={color}
                  strokeWidth="4"
                />
                {/* Body */}
                <rect
                  x={c.x + 10}
                  y={bodyTop}
                  width="40"
                  height={bodyH}
                  fill={color}
                  rx="3"
                  style={{ filter: `drop-shadow(0 0 8px ${color})` }}
                />
              </g>
            );
          })}
        </svg>
      )}

      {/* Dark overlay - content readable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      {/* Green glow bottom left */}
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(34,197,94,0.15) 0%, transparent 70%)",
        }}
      />

      {/* Green glow top right */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}