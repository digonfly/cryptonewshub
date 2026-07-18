"use client";

import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (!search.trim()) return;
    onSearch(search.trim());
  };

  return (
    <div className="w-full mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search any coin (Bitcoin, Ethereum, Pepe, Solana...)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          className="flex-1 px-5 py-4 bg-[#111827] border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
        />

        <button
          onClick={handleSearch}
          className="px-8 py-4 bg-cyan-500 hover:bg-cyan-600 rounded-xl font-bold text-white transition"
        >
          🔍 Search
        </button>
      </div>
    </div>
  );
}