"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Montserrat } from "next/font/google";
import { Gift, Copy, CheckCircle2, Timer, Sparkles } from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

function PromoBanner() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isCopied, setIsCopied] = useState(false);
  const [isFloating, setIsFloating] = useState(false);
  const bannerRef = useRef(null);
  
  const promoCode = "ML26";

  // Calculate target date (20th of current month)
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      let targetDate = new Date(now.getFullYear(), now.getMonth(), 20, 23, 59, 59);
      
      if (now.getTime() > targetDate.getTime()) {
         targetDate = new Date(now.getFullYear(), now.getMonth() + 1, 20, 23, 59, 59);
      }

      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle Scroll to toggle floating state
  useEffect(() => {
    const handleScroll = () => {
      if (bannerRef.current) {
        const offsetPosition = bannerRef.current.offsetTop;
        const bannerBottom = offsetPosition + bannerRef.current.offsetHeight;
        
        if (window.scrollY > bannerBottom) {
          setIsFloating(true);
        } else {
          setIsFloating(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(promoCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const scrollToBanner = () => {
    if (bannerRef.current) {
      window.scrollTo({
        top: bannerRef.current.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={`w-full px-4 md:px-12 my-12 ${montserrat.className}`} ref={bannerRef}>
      {/* 
        ========================================
        MAIN BANNER IN THE DOCUMENT FLOW
        ========================================
      */}
      <div className="w-full flex justify-center z-20 relative text-center lg:text-left">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full max-w-[1300px] bg-white border-2 border-[#090D24] rounded-[1.5rem] md:rounded-[2.5rem] p-6 lg:py-10 lg:px-12 shadow-sm overflow-hidden mx-auto"
        >
          {/* Subtle background abstract shapes matching theme */}
          <div className="absolute -top-24 -right-12 w-[300px] h-[300px] bg-[#D9FFA5] opacity-50 rounded-full blur-[80px] -z-10"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#f8ffec] opacity-60 rounded-full blur-[100px] -z-10"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-center w-full z-10 relative">
            
            {/* 1. Left Content: Heading & Description */}
            <div className="flex flex-col items-center lg:items-start lg:col-span-1 lg:border-r-2 border-dashed border-[#090D24]/20 lg:pr-8">
              <div className="inline-flex items-center space-x-2 bg-[#D9FFA5] px-3 py-1.5 md:px-4 md:py-2 rounded-full border-2 border-[#090D24] mb-3">
                <Sparkles className="w-4 h-4 text-[#090D24]" />
                <span className="text-xs md:text-sm font-bold text-[#090D24] uppercase tracking-wide">
                  Special Offer
                </span>
              </div>
              
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#090D24] leading-tight mb-3">
                Grab an incredible <br className="hidden lg:block"/>
                <span className="inline-block bg-[#ffea00] px-4 py-1 mt-1 border-2 border-[#090D24] rounded-2xl shadow-[4px_4px_0px_#090D24] -rotate-2 transform">
                  50% DISCOUNT
                </span>
              </h2>
              
              <p className="text-[#090D24] text-sm md:text-base font-medium leading-relaxed mb-6 max-w-[450px]">
                Use our exclusive promo code before the 20th of this month to get half the price off on all popular masterclass programs.
              </p>
            </div>

            {/* 2. Middle Content: Promo Code */}
            <div className="flex flex-col items-center justify-center lg:col-span-1 py-2 lg:py-0">
              <span className="text-[#090D24] font-bold text-xs uppercase tracking-widest mb-3 opacity-80 hidden lg:block">Use Code at Checkout</span>
              <div className="flex items-center bg-[#f8ffec] border-2 border-[#090D24] rounded-full p-1 w-full max-w-xs md:max-w-[340px] shadow-sm">
                <div className="flex-1 px-2 font-mono text-xl md:text-2xl font-black text-[#090D24] tracking-widest text-center">
                  {promoCode}
                </div>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center justify-center bg-[#090D24] text-white px-4 py-2 md:px-6 md:py-2.5 rounded-full hover:bg-black transition-colors min-w-[110px]"
                >
                  {isCopied ? (
                    <div className="flex items-center space-x-2">
                       <CheckCircle2 className="w-4 h-4 text-[#D9FFA5]" />
                       <span className="font-bold text-xs md:text-sm">COPIED</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Copy className="w-4 h-4" />
                      <span className="font-bold text-xs md:text-sm">COPY</span>
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* 3. Right Content: Timer */}
            <div className="flex flex-col items-center lg:items-end lg:col-span-1 lg:border-l-2 border-dashed border-[#090D24]/20 lg:pl-8">
               <div className="flex items-center justify-center space-x-2 mb-4 bg-[#090D24] text-white px-5 py-2 rounded-full max-w-max mx-auto lg:mr-0 shadow-sm">
                  <Timer className="w-4 h-4 md:w-5 md:h-5 animate-pulse text-[#D9FFA5]" />
                  <span className="font-bold text-sm">Offer ends on the 20th</span>
               </div>
              
               <div className="flex space-x-3 md:space-x-4 justify-center lg:justify-end w-full">
                  {[
                    { label: "Days", value: timeLeft.days },
                    { label: "Hrs", value: timeLeft.hours },
                    { label: "Mins", value: timeLeft.minutes },
                    { label: "Secs", value: timeLeft.seconds },
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <div className="w-14 h-16 lg:w-16 lg:h-20 flex items-center justify-center bg-white border-2 border-[#090D24] rounded-xl shadow-sm mb-2 relative overflow-hidden group hover:-translate-y-1 transition-transform">
                        <div className="absolute bottom-0 w-full h-1/2 bg-gray-50/50"></div>
                        <span className="text-[#090D24] font-black text-2xl lg:text-3xl z-10">
                          {item.value.toString().padStart(2, "0")}
                        </span>
                      </div>
                      <span className="text-[#090D24] font-bold text-xs uppercase tracking-wide">
                        {item.label}
                      </span>
                    </div>
                  ))}
               </div>
            </div>

          </div>
        </motion.div>
      </div>

      {/* 
        ========================================
        FLOATING ICON (WHEN SCROLLED PAST)
        ========================================
      */}
      <AnimatePresence>
        {isFloating && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="fixed bottom-[90px] right-8 z-[100] group"
          >
            {/* Tooltip */}
            <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="bg-white border-2 border-[#090D24] text-[#090D24] text-sm font-bold px-4 py-2 rounded-xl whitespace-nowrap shadow-sm flex flex-col items-end">
                <span>Grab Discount!</span>
              </div>
            </div>

            <button
              onClick={scrollToBanner}
              className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#D9FFA5] rounded-full hover:scale-110 active:scale-95 transition-transform duration-300 border-2 border-[#090D24] shadow-sm overflow-visible"
              aria-label="Scroll to Discount Banner"
            >
              <Gift className="w-6 h-6 md:w-8 md:h-8 text-[#090D24] animate-bounce-slow" />
              
              {/* Notification Badge */}
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#ff4a4a] rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-white shadow-sm z-20">
                1
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
        @keyframes bounce {
          0%, 100% {
            transform: translateY(-8%);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          50% {
            transform: translateY(8%);
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        }
      `}</style>
    </div>
  );
}

export default PromoBanner;
