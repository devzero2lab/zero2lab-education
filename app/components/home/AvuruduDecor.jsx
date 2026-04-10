"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { Montserrat } from "next/font/google";
import Image from "next/image";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

// Refactored FallingPetals to use pure CSS instead of Framer Motion for better CPU/RAM performance
const FallingPetals = () => {
  // Reduced number of petals slightly for performance optimization
  const petals = Array.from({ length: 12 });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {petals.map((_, i) => {
        const startX = Math.random() * 100;
        const duration = 6 + Math.random() * 8; // 6 to 14 seconds
        const delay = Math.random() * 5;
        const size = 10 + Math.random() * 12; 
        
        return (
          <div
            key={i}
            className="absolute -top-[60px] text-[#e62020] drop-shadow-md mix-blend-multiply opacity-0 falling-petal"
            style={{ 
              left: `${startX}%`, 
              width: size, 
              height: size * 1.2,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`
            }}
          >
            {/* Simple elegant petal shape */}
            <svg viewBox="0 0 24 30" fill="currentColor" className="w-full h-full opacity-90">
              <path d="M12 0C18 10 24 15 12 30C0 15 6 10 12 0Z" />
            </svg>
          </div>
        );
      })}
    </div>
  );
};

const AvuruduDecor = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20, height: 0, margin: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          /* Adjusted top margin significantly to prevent margin-collapse and clear the mobile navbar */
          className={`relative z-40 w-[94%] max-w-[1200px] mx-auto mt-24 md:mt-[110px] mb-0 rounded-xl md:rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden border border-yellow-500/30 ${montserrat.className} will-change-transform`}
        >
          {/* Banner Container */}
          <div className="relative w-full h-[70px] md:h-[90px] lg:h-[100px] flex items-center justify-center bg-green-950 group">
            
            {/* Highly Aesthetic Animated Background Image - Used Pure CSS for performance */}
            <div className="absolute inset-0 w-full h-full animated-bg">
              <Image 
                src="/images/avurudu_premium_banner.png"
                alt="Ultra Premium Avurudu Festive Art with Erabadu and Koha"
                fill
                className="object-cover object-center pointer-events-none"
                priority
                unoptimized={true}
              />
            </div>
            
            {/* Soft gradient overlays for perfect text contrast & rich vibes */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/60 pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/10 to-green-900/40 pointer-events-none mix-blend-overlay"></div>

            {/* Premium Animated Falling Erabadu Petals overlaying the banner image */}
            <FallingPetals />

            {/* Glassmorphic floating text box */}
            <div className="relative z-20 px-5 md:px-10 py-2 md:py-2.5 bg-[#090D24]/40 backdrop-blur-md border border-white/20 rounded-full shadow-[0_4px_16px_0_rgba(0,0,0,0.3)] flex items-center space-x-2 text-white overflow-hidden transform hover:scale-105 transition-transform duration-500 hover:bg-[#090D24]/60">
              
              <div className="flex flex-col md:flex-row md:items-center text-center relative z-10 w-full px-1">
                <span className="font-black text-sm md:text-lg lg:text-xl tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] text-[#FFD54F] bg-clip-text">
                  සුභ අලුත් අවුරුද්දක් වේවා!
                </span>
                
                <span className="hidden md:inline-block font-bold mx-3 md:mx-4 opacity-50 text-white text-base">
                  |
                </span>
                
                <span className="font-semibold text-[10px] md:text-sm lg:text-base flex items-center justify-center drop-shadow-md text-[#F1F8E9] mt-0.5 md:mt-0 opacity-90 tracking-wide">
                  Enjoy a special <span className="bg-[#FF9800] text-[#090D24] px-1.5 md:px-2 py-0.5 mx-1.5 rounded-md font-extrabold shadow-sm md:text-[15px]">50% DISCOUNT</span> this season
                  <Sparkles className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-1.5 text-[#FFD54F] animate-pulse" />
                </span>
              </div>

              {/* Shimmer light effect passing over text card */}
              <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_3s_infinite_linear]"></div>
            </div>

            {/* Close Button - refined and more accessible */}
            <button
              onClick={() => setIsVisible(false)}
              className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 text-white/70 hover:text-[#FFD54F] transition-all p-2 bg-black/30 hover:bg-black/60 backdrop-blur-md border border-white/10 rounded-full shadow-lg"
              aria-label="Close Avurudu Banner"
            >
              <X className="w-5 h-5" />
            </button>

          </div>
          
          <style jsx>{`
            @keyframes shimmer {
              100% {
                transform: translateX(150%);
              }
            }
            .falling-petal {
              animation-name: fallAndSway;
              animation-timing-function: linear;
              animation-iteration-count: infinite;
              will-change: transform, opacity;
            }
            @keyframes fallAndSway {
              0% { transform: translate3d(0, 0, 0) rotate(0deg); opacity: 0; }
              10% { opacity: 0.9; }
              50% { transform: translate3d(15px, 150px, 0) rotate(180deg); }
              90% { opacity: 0.9; }
              100% { transform: translate3d(-15px, 300px, 0) rotate(360deg); opacity: 0; }
            }
            .animated-bg {
              animation: bgPanZoom 20s ease-in-out infinite;
              will-change: transform;
            }
            @keyframes bgPanZoom {
              0%, 100% { transform: scale(1.05) translate3d(0, 0, 0); }
              50% { transform: scale(1.15) translate3d(-2%, 0, 0); }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AvuruduDecor;
