"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const HomeBackground = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#FBFBFE] overflow-hidden selection:bg-amber-50 selection:text-[#090D24]">
      
      {/* 1. Animated Warm Aurora / Mesh Gradient layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none w-full h-full">
        {mounted && (
          <>
            {/* Top Right Warm Glow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 0.5,
                scale: [1, 1.15, 1],
                x: [0, -80, 40, 0],
                y: [0, 40, -30, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-[-10%] right-[-5%] w-[550px] h-[550px] rounded-full bg-gradient-to-br from-amber-50 to-orange-50 blur-[140px] mix-blend-multiply"
            />
            
            {/* Center Left Soft Gold */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 0.4,
                scale: [1, 1.1, 0.95, 1],
                x: [0, 80, -40, 0],
                y: [0, -80, 60, 0],
              }}
              transition={{
                duration: 22,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
              className="absolute top-[25%] left-[-8%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-yellow-50 to-amber-50 blur-[150px] mix-blend-multiply"
            />

            {/* Bottom Warm Glow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 0.35,
                scale: [1, 1.2, 1],
                x: [0, -100, 30, 0],
                y: [0, -30, -60, 0],
              }}
              transition={{
                duration: 28,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 4,
              }}
              className="absolute bottom-[-15%] right-[10%] w-[700px] h-[500px] rounded-full bg-gradient-to-l from-amber-50/80 to-yellow-50/60 blur-[160px] mix-blend-multiply"
            />
          </>
        )}
      </div>

      {/* 2. Subtle Tech Grid — very faint */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.25] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(9, 13, 36, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(9, 13, 36, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 75%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 75%, transparent 100%)'
        }}
      ></div>

      {/* 3. Noise / Grain for premium matte feel */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.025] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')",
          backgroundRepeat: 'repeat',
          backgroundSize: '120px 120px'
        }}
      ></div>

      {/* 4. Soft vignette for readability */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,_transparent_0%,_rgba(251,251,254,0.6)_100%)]"></div>

      {/* Content */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
};

export default HomeBackground;
