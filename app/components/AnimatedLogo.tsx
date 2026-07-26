"use client";

import { motion } from "framer-motion";

interface Props {
  size?: "small" | "medium" | "large";
  showText?: boolean;
}

export default function AnimatedLogo({ size = "medium", showText = true }: Props) {
  const sizes = {
    small: {
      container: "gap-2",
      coin: "w-10 h-10 text-3xl",
      text: "text-xl",
      particle: "w-1 h-1",
    },
    medium: {
      container: "gap-3",
      coin: "w-14 h-14 text-4xl",
      text: "text-2xl",
      particle: "w-1.5 h-1.5",
    },
    large: {
      container: "gap-6",
      coin: "w-32 h-32 text-8xl",
      text: "text-6xl",
      particle: "w-2 h-2",
    },
  };

  const s = sizes[size];

  return (
    <div className={`flex items-center ${s.container} relative`}>
      {/* Rotating Bitcoin Coin */}
      <div className="relative">
        {/* Glow Halo */}
        <motion.div
          className="absolute inset-0 rounded-full blur-xl bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Rotating Coin Container */}
        <motion.div
          className={`relative ${s.coin} rounded-full bg-gradient-to-br from-yellow-400 via-orange-500 to-yellow-600 flex items-center justify-center shadow-[0_0_20px_rgba(251,146,60,0.6)]`}
          animate={{
            rotateY: [0, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Bitcoin Symbol */}
          <span className="font-bold text-white drop-shadow-lg">₿</span>
        </motion.div>

        {/* Floating Sparkles Around Coin */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute ${s.particle} bg-yellow-300 rounded-full`}
            style={{
              top: "50%",
              left: "50%",
            }}
            animate={{
              x: [
                0,
                Math.cos((i * 60 * Math.PI) / 180) * 40,
                0,
              ],
              y: [
                0,
                Math.sin((i * 60 * Math.PI) / 180) * 40,
                0,
              ],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Rainbow Wave Text */}
      {showText && (
        <div className={`font-bold ${s.text} relative overflow-hidden`}>
          <motion.span
            className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-orange-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-purple-500"
            style={{
              backgroundSize: "200% 100%",
            }}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            CryptoNewsHub
          </motion.span>

          {/* Underline Effect */}
          <motion.div
            className="h-0.5 mt-1 bg-gradient-to-r from-red-500 via-yellow-500 to-purple-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </div>
      )}

      {/* Extra Floating Particles */}
      {showText && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-400 rounded-full"
              style={{
                left: `${20 + i * 20}%`,
                top: "50%",
              }}
              animate={{
                y: [-10, -30, -10],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}