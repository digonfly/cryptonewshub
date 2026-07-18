"use client";

import { motion } from "framer-motion";

export default function Bitcoin3D() {
  return (
    <div className="h-[300px] md:h-[400px] w-full flex items-center justify-center relative">
      {/* Glow Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-64 h-64 md:w-80 md:h-80 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-orange-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Main Coin with 3D Rotation */}
      <motion.div
        className="relative"
        style={{ perspective: "1000px" }}
        animate={{ rotateY: 360 }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Outer Glow Ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 via-orange-500 to-yellow-600 blur-xl opacity-50" />

        {/* Coin Body */}
        <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full bg-gradient-to-br from-yellow-400 via-orange-500 to-yellow-600 shadow-[0_0_60px_rgba(247,147,26,0.6)] flex items-center justify-center border-4 border-yellow-300">
          
          {/* Inner Ring */}
          <div className="absolute inset-4 rounded-full border-2 border-yellow-200/50" />

          {/* Bitcoin Symbol */}
          <div
            className="text-white font-black select-none"
            style={{
              fontSize: "180px",
              lineHeight: 1,
              textShadow: "0 6px 20px rgba(0,0,0,0.4)",
              fontFamily: "Arial, sans-serif",
            }}
          >
            ₿
          </div>

          {/* Shine Effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent" />
        </div>
      </motion.div>
    </div>
  );
}