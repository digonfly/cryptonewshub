"use client";

import { useEffect, useState } from "react";

interface Props {
  coinId: string;
}

export default function WatchlistButton({ coinId }: Props) {
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("watchlist");
    const watchlist: string[] = stored ? JSON.parse(stored) : [];
    setIsInWatchlist(watchlist.includes(coinId));
  }, [coinId]);

  const toggleWatchlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const stored = localStorage.getItem("watchlist");
    let watchlist: string[] = stored ? JSON.parse(stored) : [];

    if (watchlist.includes(coinId)) {
      watchlist = watchlist.filter((id) => id !== coinId);
      setIsInWatchlist(false);
    } else {
      watchlist.push(coinId);
      setIsInWatchlist(true);
    }

    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  };

  return (
    <button
      onClick={toggleWatchlist}
      className="text-2xl hover:scale-125 transition-transform"
      title={isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
    >
      {isInWatchlist ? "⭐" : "☆"}
    </button>
  );
}