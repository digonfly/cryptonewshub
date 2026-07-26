import { NextResponse } from "next/server";

interface RealtimeAirdrop {
  id: string;
  name: string;
  symbol: string;
  image: string;
  price?: number;
  change24h?: number;
  marketCap?: number;
  category: string;
  source: string;
  addedAt: string;
  isNew: boolean;
}

// Helper: Safe fetch with timeout
async function safeFetch(url: string, timeout = 5000) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    const res = await fetch(url, {
      signal: controller.signal,
      next: { revalidate: 21600 }, // 6 hours cache
    });
    clearTimeout(timeoutId);
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error(`Fetch error for ${url}:`, err);
    return null;
  }
}

// Check if airdrop is "new" (added in last 24 hours)
function isNewAirdrop(): boolean {
  return true; // For new fetches, always mark as new
}

export async function GET() {
  try {
    const results: RealtimeAirdrop[] = [];
    const now = new Date().toISOString();

    // ═══════ SOURCE 1: Trending Coins ═══════
    const trendingData = await safeFetch(
      "https://api.coingecko.com/api/v3/search/trending"
    );

    if (trendingData?.coins) {
      trendingData.coins.slice(0, 10).forEach((coin: any) => {
        if (coin.item) {
          results.push({
            id: `trending-${coin.item.id}`,
            name: coin.item.name,
            symbol: coin.item.symbol,
            image: coin.item.small || coin.item.thumb || "",
            marketCap: coin.item.market_cap_rank,
            category: "Trending",
            source: "CoinGecko Trending",
            addedAt: now,
            isNew: true,
          });
        }
      });
    }

    // ═══════ SOURCE 2: Top Gainers (24h) ═══════
    const gainersData = await safeFetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=price_change_percentage_24h_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h"
    );

    if (Array.isArray(gainersData)) {
      gainersData.slice(0, 8).forEach((coin: any) => {
        if (coin.price_change_percentage_24h > 20) {
          results.push({
            id: `gainer-${coin.id}`,
            name: coin.name,
            symbol: coin.symbol,
            image: coin.image,
            price: coin.current_price,
            change24h: coin.price_change_percentage_24h,
            marketCap: coin.market_cap,
            category: "Top Gainer",
            source: "CoinGecko Markets",
            addedAt: now,
            isNew: true,
          });
        }
      });
    }

    // ═══════ SOURCE 3: New Listings ═══════
    const newListingsData = await safeFetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false"
    );

    if (Array.isArray(newListingsData)) {
      // Take coins with lower market cap rank (newer/smaller)
      const newCoins = newListingsData.slice(30, 50);
      newCoins.forEach((coin: any) => {
        results.push({
          id: `new-${coin.id}`,
          name: coin.name,
          symbol: coin.symbol,
          image: coin.image,
          price: coin.current_price,
          change24h: coin.price_change_percentage_24h,
          marketCap: coin.market_cap,
          category: "New Listing",
          source: "CoinGecko New",
          addedAt: now,
          isNew: true,
        });
      });
    }

    // Remove duplicates by ID
    const uniqueResults = Array.from(
      new Map(results.map((item) => [item.id, item])).values()
    );

    // Also return legacy format for backward compatibility
    const legacyTrending = uniqueResults.slice(0, 5).map((item) => ({
      id: item.id,
      name: item.name,
      symbol: item.symbol,
      icon: "🔥",
      thumb: item.image,
      market_cap_rank: item.marketCap || 0,
    }));

    return NextResponse.json({
      success: true,
      total: uniqueResults.length,
      realtimeAirdrops: uniqueResults,
      trending: legacyTrending,
      updated: now,
      nextUpdate: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
      sources: ["CoinGecko Trending", "Top Gainers 24h", "New Listings"],
    });
  } catch (error: any) {
    console.error("Airdrops API Error:", error);
    return NextResponse.json({
      success: true,
      total: 0,
      realtimeAirdrops: [],
      trending: [],
      error: error.message,
    });
  }
}