"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Props {
  type?: "banner" | "rectangle" | "sidebar" | "in-content" | "social-bar";
}

// ⚠️ ADSTERRA AD CODES YAHAN PASTE KARO
// Use backticks (`) not quotes (")
const AD_CODES = {
  // Native Banner Code (Best for in-content)
  nativeBanner: `<script async="async" data-cfasync="false" src="https://pl30534123.effectivecpmnetwork.com/d5c36a24e0ea383f64f2b493e7305381/invoke.js"></script>
<div id="container-d5c36a24e0ea383f64f2b493e7305381"></div>
`,

  // Social Bar Code (Bottom floating bar)
  socialBar: `<script src="https://pl30534124.effectivecpmnetwork.com/a6/be/8a/a6be8ae68edbe6fc4f209a86daedf8b7.js"></script>
`,

  // Banner 728x90 Code (Top/Bottom banners)
  banner728x90: `<script>
  atOptions = {
    'key' : '811cebdd395cc36cafefbf1c8a83b33e',
    'format' : 'iframe',
    'height' : 90,
    'width' : 728,
    'params' : {}
  };
</script>
<script src="https://www.highperformanceformat.com/811cebdd395cc36cafefbf1c8a83b33e/invoke.js"></script>
`,

  // Banner 300x250 Code (Rectangle ads)
  banner300x250: `<script>
  atOptions = {
    'key' : 'e2b9d9982a2cc11f8f16604a9ad39e34',
    'format' : 'iframe',
    'height' : 250,
    'width' : 300,
    'params' : {}
  };
</script>
<script src="https://www.highperformanceformat.com/e2b9d9982a2cc11f8f16604a9ad39e34/invoke.js"></script>
`,
};

export default function AdBanner({ type = "banner" }: Props) {
  const adRef = useRef<HTMLDivElement>(null);

  // Get correct ad code based on type
  const getAdCode = () => {
    switch (type) {
      case "banner":
        return AD_CODES.banner728x90;
      case "rectangle":
        return AD_CODES.banner300x250;
      case "in-content":
        return AD_CODES.nativeBanner;
      case "social-bar":
        return AD_CODES.socialBar;
      default:
        return AD_CODES.banner728x90;
    }
  };

  const adCode = getAdCode();
  const isPlaceholder =
    !adCode || adCode.includes("PASTE_") || adCode.trim() === "";

  // Load ad scripts
  useEffect(() => {
    if (!isPlaceholder && adRef.current) {
      // Extract and execute scripts from ad code
      const scripts = adRef.current.querySelectorAll("script");
      scripts.forEach((oldScript) => {
        const newScript = document.createElement("script");
        Array.from(oldScript.attributes).forEach((attr) => {
          newScript.setAttribute(attr.name, attr.value);
        });
        newScript.text = oldScript.text;
        oldScript.parentNode?.replaceChild(newScript, oldScript);
      });
    }
  }, [isPlaceholder]);

  // Dimensions
  const dimensions = {
    banner: { width: "728px", height: "90px", label: "728x90 Banner" },
    rectangle: { width: "300px", height: "250px", label: "300x250 Rectangle" },
    sidebar: { width: "160px", height: "600px", label: "160x600 Sidebar" },
    "in-content": { width: "100%", height: "250px", label: "Native Banner" },
    "social-bar": { width: "100%", height: "0px", label: "Social Bar" },
  };

  const size = dimensions[type];

  // If real ad code exists, render it
  if (!isPlaceholder) {
    return (
      <div
        ref={adRef}
        className={type === "social-bar" ? "" : "my-6 mx-auto flex justify-center"}
        dangerouslySetInnerHTML={{ __html: adCode }}
      />
    );
  }

  // Social bar has no placeholder (invisible)
  if (type === "social-bar") return null;

  // Placeholder UI for empty codes
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="my-6 mx-auto flex justify-center"
    >
      <div
        style={{
          maxWidth: size.width,
          minHeight: size.height,
          width: "100%",
        }}
        className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 backdrop-blur-sm border-2 border-dashed border-gray-700 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-purple-500 transition group"
      >
        <div className="text-5xl mb-3 opacity-50 group-hover:opacity-100 transition">
          📢
        </div>
        <p className="text-gray-500 text-sm font-bold mb-2">
          Advertisement Space
        </p>
        <p className="text-xs text-gray-600 mb-3">{size.label}</p>
        <span className="text-xs bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full">
          Adsterra Ready
        </span>
      </div>
    </motion.div>
  );
}