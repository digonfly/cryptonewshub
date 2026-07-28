"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  const skills = [
    { icon: "🚀", name: "Web Development", color: "from-blue-500 to-cyan-500" },
    { icon: "💰", name: "Cryptocurrency", color: "from-yellow-500 to-orange-500" },
    { icon: "🤖", name: "AI Integration", color: "from-purple-500 to-pink-500" },
    { icon: "📊", name: "Data Analytics", color: "from-green-500 to-emerald-500" },
    { icon: "🎨", name: "UI/UX Design", color: "from-pink-500 to-red-500" },
    { icon: "⚡", name: "Next.js & React", color: "from-indigo-500 to-purple-500" },
  ];

  const socialLinks = [
    {
      name: "Twitter/X",
      url: "https://x.com/Digonrabha1",
      icon: "🐦",
      color: "hover:bg-sky-500",
      handle: "@Digonrabha1",
    },
    {
      name: "Email",
      url: "mailto:digonfly@gmail.com",
      icon: "📧",
      color: "hover:bg-red-500",
      handle: "digonfly@gmail.com",
    },
    {
      name: "GitHub",
      url: "https://github.com/digonfly",
      icon: "💻",
      color: "hover:bg-gray-700",
      handle: "digonfly",
    },
    {
      name: "Website",
      url: "https://cryptonewshub-eight.vercel.app",
      icon: "🌐",
      color: "hover:bg-green-500",
      handle: "cryptonewshub-eight.vercel.app",
    },
  ];

  const achievements = [
    { number: "15+", label: "Pages Built", icon: "📄" },
    { number: "40+", label: "Features", icon: "⚡" },
    { number: "100%", label: "AI Powered", icon: "🤖" },
    { number: "24/7", label: "Live Updates", icon: "🔴" },
  ];

  return (
    <div className="min-h-screen text-white px-4 md:px-10 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-3">
            👋 <span className="rainbow-text">About Me</span>
          </h1>
          <p className="text-gray-400">
            The person behind CryptoNewsHub
          </p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 md:p-10 mb-8 relative overflow-hidden"
        >
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            {/* Avatar */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              className="flex-shrink-0"
            >
              <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-purple-500 shadow-[0_0_50px_rgba(168,85,247,0.5)]">
                <div className="w-full h-full bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 flex items-center justify-center">
                  <span className="text-7xl md:text-8xl font-bold text-white">
                    D
                  </span>
                </div>
              </div>
              {/* Verified Badge */}
              <div className="absolute -bottom-2 right-4 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                ✓ Founder
              </div>
            </motion.div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="text-3xl md:text-5xl font-bold mb-2"
              >
                <span className="rainbow-text">Diganto Rabha</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="text-purple-400 text-lg font-bold mb-3"
              >
                🚀 Founder & Developer
              </motion.p>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="flex items-center justify-center md:justify-start gap-2 text-gray-400 mb-4"
              >
                <span>📍</span>
                <span>India 🇮🇳</span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-gray-300 leading-relaxed"
              >
                Hi! I'm <span className="text-purple-400 font-bold">Diganto</span> —
                a passionate developer and crypto enthusiast from India. I built{" "}
                <span className="text-green-400 font-bold">CryptoNewsHub</span> to
                make cryptocurrency simple, accessible, and free for everyone.
                My mission is to empower Indians and global crypto enthusiasts
                with real-time data, AI-powered insights, and comprehensive tools.
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {achievements.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + idx * 0.1 }}
              className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl p-4 text-center hover:border-purple-500 transition"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold rainbow-text">{stat.number}</div>
              <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 md:p-8 mb-8"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            🎯 <span className="rainbow-text">My Mission</span>
          </h2>
          <p className="text-gray-300 leading-relaxed text-lg">
            To democratize cryptocurrency access in India and worldwide by
            providing <span className="text-green-400 font-bold">FREE</span>,
            reliable, and easy-to-use tools. Whether you're a beginner or a
            seasoned trader, CryptoNewsHub is designed to be your{" "}
            <span className="text-purple-400 font-bold">complete crypto companion</span>.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-gray-800/50 rounded-xl p-4">
              <div className="text-3xl mb-2">💡</div>
              <h3 className="font-bold text-purple-400 mb-1">Educate</h3>
              <p className="text-sm text-gray-400">
                AI-powered blogs & guides
              </p>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4">
              <div className="text-3xl mb-2">🛠️</div>
              <h3 className="font-bold text-blue-400 mb-1">Empower</h3>
              <p className="text-sm text-gray-400">
                Free tools for everyone
              </p>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4">
              <div className="text-3xl mb-2">🌍</div>
              <h3 className="font-bold text-green-400 mb-1">Connect</h3>
              <p className="text-sm text-gray-400">
                Global crypto community
              </p>
            </div>
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 md:p-8 mb-8"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            💪 <span className="rainbow-text">Skills & Expertise</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {skills.map((skill, idx) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.05, y: -3 }}
                className={`bg-gradient-to-br ${skill.color} rounded-xl p-4 text-center cursor-pointer`}
              >
                <div className="text-3xl mb-2">{skill.icon}</div>
                <div className="font-bold text-white text-sm">{skill.name}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 md:p-8 mb-8"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            🔗 <span className="rainbow-text">Connect With Me</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {socialLinks.map((link, idx) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className={`bg-gray-800/50 hover:bg-gray-700 border border-gray-700 hover:border-purple-500 rounded-xl p-4 flex items-center gap-4 transition ${link.color}`}
              >
                <div className="text-3xl">{link.icon}</div>
                <div className="flex-1">
                  <p className="font-bold text-white">{link.name}</p>
                  <p className="text-sm text-gray-400">{link.handle}</p>
                </div>
                <div className="text-purple-400 text-xl">→</div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* CryptoNewsHub Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-green-500/10 via-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-green-500/30 rounded-2xl p-6 md:p-8 mb-8"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            🚀 <span className="rainbow-text">The CryptoNewsHub Story</span>
          </h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            CryptoNewsHub was born from a simple idea: <span className="text-white font-bold">
            "Make cryptocurrency accessible to everyone."</span>
          </p>
          <p className="text-gray-300 leading-relaxed mb-4">
            Starting with real-time price tracking, I've built this platform into
            a comprehensive crypto ecosystem featuring:
          </p>
          <ul className="grid md:grid-cols-2 gap-2 text-gray-300 mb-4">
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span> 100+ Live Crypto Prices
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span> AI-Powered Blog Generator
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span> Real-Time Airdrops (Auto-Updated)
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span> Portfolio Tracker
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span> Price Alerts
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span> AI FAQ Assistant
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span> Crypto Converter
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span> Newsletter & News Feed
            </li>
          </ul>
          <p className="text-gray-300 leading-relaxed">
            And this is just the beginning! 🎯
          </p>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            💬 Let's Connect!
          </h2>
          <p className="text-gray-300 mb-6">
            Have suggestions, feedback, or want to collaborate? Reach out anytime!
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="mailto:digonfly@gmail.com"
              className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-3 rounded-xl transition shadow-[0_0_20px_rgba(239,68,68,0.4)]"
            >
              📧 Email Me
            </a>
            <a
              href="https://x.com/@Digonrabha1"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-sky-500 hover:bg-sky-600 text-white font-bold px-6 py-3 rounded-xl transition shadow-[0_0_20px_rgba(14,165,233,0.4)]"
            >
              🐦 Follow on X
            </a>
            <Link
              href="/"
              className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-xl transition shadow-[0_0_20px_rgba(34,197,94,0.4)]"
            >
              🚀 Explore Site
            </Link>
          </div>
        </motion.div>

        {/* Thank You */}
        <div className="text-center mt-10 py-6">
          <p className="text-gray-400 text-lg">
            Thank you for visiting! 💚
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Made with ❤️ by Diganto Rabha in India 🇮🇳
          </p>
        </div>
      </div>
    </div>
  );
}