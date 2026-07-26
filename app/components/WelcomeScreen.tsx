"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function WelcomeScreen() {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check agar pehli baar visit hai
    const hasVisited = sessionStorage.getItem("hasVisited");
    
    if (!hasVisited) {
      setShow(true);
      sessionStorage.setItem("hasVisited", "true");

      // Progress bar animation
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 2;
        });
      }, 60);

      // Auto hide after 4 seconds
      const timer = setTimeout(() => {
        setShow(false);
      }, 4000);

      return () => {
        clearTimeout(timer);
        clearInterval(progressInterval);
      };
    }
  }, []);

  const handleSkip = () => {
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden"
        >
          {/* Animated Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-950/30 to-black">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
          </div>

          {/* Floating Coins Background */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-4xl opacity-10"
                initial={{
                  x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
                  y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
                  rotate: 0,
                }}
                animate={{
                  y: [null, -100, null],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 10 + Math.random() * 10,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                }}
              >
                {["₿", "Ξ", "◎", "$", "💎"][Math.floor(Math.random() * 5)]}
              </motion.div>
            ))}
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
            
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{
                duration: 1.2,
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
              className="relative w-40 h-40 md:w-56 md:h-56 mb-8"
            >
              {/* Rotating Glow Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-50 blur-3xl"
              />
              
              {/* Logo */}
              <div className="relative w-full h-full">
                <Image
                  src="/logo.png"
                  alt="CryptoNewsHub"
                  fill
                  className="object-contain drop-shadow-[0_0_30px_rgba(168,85,247,0.8)]"
                  priority
                />
              </div>
            </motion.div>

            {/* Welcome Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mb-4"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-3 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Welcome to
              </h1>
              <h2 className="text-5xl md:text-7xl font-black rainbow-text">
                CryptoNewsHub
              </h2>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="text-gray-300 text-lg md:text-xl mb-8 max-w-md"
            >
              🚀 Your Ultimate Crypto Destination
            </motion.p>

            {/* Features Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="flex items-center gap-6 mb-10 flex-wrap justify-center"
            >
              {[
                { icon: "📊", label: "Live Prices" },
                { icon: "📰", label: "News" },
                { icon: "🤖", label: "AI Blogs" },
                { icon: "🎁", label: "Airdrops" },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 2 + idx * 0.15, type: "spring" }}
                  className="flex flex-col items-center gap-1"
                >
                  <span className="text-3xl">{item.icon}</span>
                  <span className="text-xs text-gray-400">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              className="w-64 md:w-80"
            >
              <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>
              <p className="text-gray-500 text-xs mt-2 text-center">
                Loading... {progress}%
              </p>
            </motion.div>

            {/* Skip Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3 }}
              onClick={handleSkip}
              className="absolute bottom-8 right-8 text-gray-400 hover:text-white text-sm transition flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10"
            >
              Skip →
            </motion.button>

            {/* Bottom Credit */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.2 }}
              className="absolute bottom-8 left-8 text-gray-500 text-xs"
            >
              Made with 💜 by Diganto
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}