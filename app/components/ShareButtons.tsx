"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Props {
  title: string;
  url?: string;
}

export default function ShareButtons({ title, url }: Props) {
  const [copied, setCopied] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");
  const shareText = encodeURIComponent(`Check out: ${title}`);
  const encodedUrl = encodeURIComponent(shareUrl);

  const shareLinks = [
    {
      name: "WhatsApp",
      icon: "💬",
      color: "hover:bg-green-500",
      url: `https://wa.me/?text=${shareText}%20${encodedUrl}`,
    },
    {
      name: "Twitter",
      icon: "🐦",
      color: "hover:bg-sky-500",
      url: `https://twitter.com/intent/tweet?text=${shareText}&url=${encodedUrl}`,
    },
    {
      name: "Facebook",
      icon: "📘",
      color: "hover:bg-blue-600",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: "Telegram",
      icon: "✈️",
      color: "hover:bg-blue-500",
      url: `https://t.me/share/url?url=${encodedUrl}&text=${shareText}`,
    },
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="bg-gray-800 hover:bg-gray-700 text-white font-bold px-4 py-2 rounded-lg transition flex items-center gap-2"
      >
        🔗 Share
      </button>

      {showMenu && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowMenu(false)}
          />

          {/* Menu */}
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="absolute right-0 top-full mt-2 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl p-2 z-50 min-w-[200px]"
          >
            {shareLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowMenu(false)}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg text-white transition ${link.color}`}
              >
                <span className="text-xl">{link.icon}</span>
                <span className="font-medium">{link.name}</span>
              </a>
            ))}

            <button
              onClick={copyLink}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-white hover:bg-purple-500 transition"
            >
              <span className="text-xl">{copied ? "✅" : "📋"}</span>
              <span className="font-medium">
                {copied ? "Copied!" : "Copy Link"}
              </span>
            </button>
          </motion.div>
        </>
      )}
    </div>
  );
}