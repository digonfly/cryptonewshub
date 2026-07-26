"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { airdropsData, categories, difficulties, statuses } from "./data";
import AirdropCard from "../components/AirdropCard";
import RealtimeAirdropCard from "../components/RealtimeAirdropCard";

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

export default function AirdropsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortBy, setSortBy] = useState("trending");
  const [activeTab, setActiveTab] = useState<"curated" | "realtime">("realtime");

  // Realtime data
  const [realtimeAirdrops, setRealtimeAirdrops] = useState<RealtimeAirdrop[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [nextUpdate, setNextUpdate] = useState<string>("");
  const [loadingRealtime, setLoadingRealtime] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch realtime airdrops
  const fetchRealtimeAirdrops = async (isManualRefresh = false) => {
    if (isManualRefresh) setRefreshing(true);
    else setLoadingRealtime(true);

    try {
      const url = isManualRefresh
        ? `/api/airdrops?refresh=${Date.now()}`
        : "/api/airdrops";
      const res = await fetch(url);
      if (!res.ok) return;

      const text = await res.text();
      if (!text) return;

      const data = JSON.parse(text);
      if (data.success && Array.isArray(data.realtimeAirdrops)) {
        setRealtimeAirdrops(data.realtimeAirdrops);
        setLastUpdated(data.updated);
        setNextUpdate(data.nextUpdate);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoadingRealtime(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRealtimeAirdrops();
  }, []);

  // Time formatting
  const getTimeAgo = (dateStr: string) => {
    if (!dateStr) return "";
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    const hrs = Math.floor(mins / 60);
    if (hrs > 0) return `${hrs}h ago`;
    if (mins > 0) return `${mins}m ago`;
    return "Just now";
  };

  const getNextUpdateIn = (dateStr: string) => {
    if (!dateStr) return "";
    const diff = new Date(dateStr).getTime() - Date.now();
    if (diff < 0) return "Any moment";
    const mins = Math.floor(diff / 60000);
    const hrs = Math.floor(mins / 60);
    if (hrs > 0) return `in ${hrs}h`;
    return `in ${mins}m`;
  };

  // Filter curated airdrops
  const filteredAirdrops = airdropsData
    .filter((airdrop) => {
      const matchesSearch =
        airdrop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        airdrop.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        airdrop.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === "All" || airdrop.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === "All" || airdrop.difficulty === selectedDifficulty;
      const matchesStatus = selectedStatus === "All" || airdrop.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesDifficulty && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "trending") {
        if (a.trending && !b.trending) return -1;
        if (!a.trending && b.trending) return 1;
        return 0;
      }
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "difficulty") {
        const order: Record<string, number> = { Easy: 1, Medium: 2, Hard: 3 };
        return order[a.difficulty] - order[b.difficulty];
      }
      return 0;
    });

  // Filter realtime airdrops by search
  const filteredRealtime = realtimeAirdrops.filter((a) =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: airdropsData.length,
    active: airdropsData.filter((a) => a.status === "Active").length,
    upcoming: airdropsData.filter((a) => a.status === "Upcoming").length,
    trending: airdropsData.filter((a) => a.trending).length,
    realtime: realtimeAirdrops.length,
  };

  return (
    <div className="min-h-screen text-white px-4 md:px-10 py-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl md:text-5xl font-bold mb-3">
          🎁 <span className="rainbow-text">Crypto Airdrops A-Z</span>
        </h1>
        <p className="text-gray-400 max-w-3xl mx-auto">
          Real-time airdrops updating automatically every 6 hours. Zero manual work!
        </p>
      </motion.div>

      {/* Real-Time Status Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto mb-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-4"
      >
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping" />
            </div>
            <div>
              <p className="font-bold text-green-400">🔴 LIVE Auto-Updates Active</p>
              <p className="text-xs text-gray-400">
                Last updated: <span className="text-white">{getTimeAgo(lastUpdated)}</span>
                {" • "}
                Next: <span className="text-white">{getNextUpdateIn(nextUpdate)}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => fetchRealtimeAirdrops(true)}
            disabled={refreshing}
            className="bg-green-500 hover:bg-green-600 disabled:bg-gray-700 text-white font-bold px-4 py-2 rounded-lg text-sm transition flex items-center gap-2"
          >
            {refreshing ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                />
                Refreshing...
              </>
            ) : (
              <>🔄 Refresh Now</>
            )}
          </button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-6xl mx-auto mb-8"
      >
        <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl p-3 text-center hover:border-red-500 transition">
          <p className="text-2xl font-bold text-red-400">{stats.realtime}</p>
          <p className="text-xs text-gray-400">🔴 Live Now</p>
        </div>
        <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl p-3 text-center hover:border-purple-500 transition">
          <p className="text-2xl font-bold text-purple-400">{stats.total}</p>
          <p className="text-xs text-gray-400">✓ Verified</p>
        </div>
        <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl p-3 text-center hover:border-green-500 transition">
          <p className="text-2xl font-bold text-green-400">{stats.active}</p>
          <p className="text-xs text-gray-400">Active</p>
        </div>
        <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl p-3 text-center hover:border-blue-500 transition">
          <p className="text-2xl font-bold text-blue-400">{stats.upcoming}</p>
          <p className="text-xs text-gray-400">Upcoming</p>
        </div>
        <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl p-3 text-center hover:border-orange-500 transition">
          <p className="text-2xl font-bold text-orange-400">{stats.trending}</p>
          <p className="text-xs text-gray-400">🔥 Trending</p>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex gap-2 border-b border-gray-800">
          <button
            onClick={() => setActiveTab("realtime")}
            className={`px-6 py-3 font-bold transition relative ${
              activeTab === "realtime"
                ? "text-red-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            🔴 Live Real-Time ({stats.realtime})
            {activeTab === "realtime" && (
              <motion.div
                layoutId="tabline"
                className="absolute bottom-0 left-0 right-0 h-1 bg-red-500"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab("curated")}
            className={`px-6 py-3 font-bold transition relative ${
              activeTab === "curated"
                ? "text-purple-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            ✓ Verified Airdrops ({stats.total})
            {activeTab === "curated" && (
              <motion.div
                layoutId="tabline"
                className="absolute bottom-0 left-0 right-0 h-1 bg-purple-500"
              />
            )}
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-6xl mx-auto mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="🔍 Search airdrops..."
          className="w-full px-4 py-3 rounded-lg bg-gray-900/60 border border-gray-800 focus:outline-none focus:border-purple-500"
        />
      </div>

      {/* Curated Tab Filters */}
      {activeTab === "curated" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-6xl mx-auto mb-8 bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-2xl p-5"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-purple-500 text-sm"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Difficulty</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-purple-500 text-sm"
              >
                {difficulties.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-purple-500 text-sm"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-purple-500 text-sm"
              >
                <option value="trending">🔥 Trending</option>
                <option value="name">📝 Name (A-Z)</option>
                <option value="difficulty">⭐ Difficulty</option>
              </select>
            </div>
          </div>
        </motion.div>
      )}

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === "realtime" ? (
          <motion.div
            key="realtime"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            {loadingRealtime ? (
              <div className="flex items-center justify-center py-20">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full"
                />
              </div>
            ) : filteredRealtime.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-2xl mb-2">😔 No live airdrops match your search</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {filteredRealtime.map((airdrop, idx) => (
                  <RealtimeAirdropCard key={airdrop.id} airdrop={airdrop} index={idx} />
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="curated"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {filteredAirdrops.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-2xl mb-2">😔 No airdrops found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {filteredAirdrops.map((airdrop, idx) => (
                  <AirdropCard key={airdrop.id} airdrop={airdrop} index={idx} />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Note */}
      <div className="max-w-6xl mx-auto mt-10 p-5 bg-gray-900/40 rounded-2xl border border-gray-800 text-center">
        <p className="text-sm text-gray-400">
          🤖 <strong className="text-white">Auto-Updates:</strong> Real-time airdrops refresh every 6 hours automatically from CoinGecko API.
        </p>
        <p className="text-xs text-gray-500 mt-2">
          ⚠️ Always verify airdrops from official sources. Never share private keys.
        </p>
      </div>
    </div>
  );
}