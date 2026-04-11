"use client";
import React from "react";
import { Montserrat } from "next/font/google";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const outcomes = [
  "Build 5+ real-world AI & Data Science projects for your portfolio",
  "Master in-demand tools used by top companies worldwide",
  "Earn a verifiable certificate valued by global employers",
  "Understand linear algebra, calculus, and statistics in depth",
  "Deploy machine learning models to production environments",
  "Work with Python, NumPy, Pandas, Scikit-learn, and more",
];

export default function MLLearningThings() {
  return (
    <section className={`w-full ${montserrat.className}`}>
      <div className="bg-white border border-gray-200/70 rounded-2xl md:rounded-[1.5rem] p-8 md:p-10 shadow-[0_2px_12px_rgba(0,0,0,0.03)] relative overflow-hidden transition-all duration-300 hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
        
        {/* Subtle decorative background (Clean, minimal) */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#f8ffec]/50 rounded-bl-full -z-0"></div>
        
        <div className="relative z-10 flex flex-col items-start mb-8 md:mb-10 lg:flex-row lg:items-center lg:justify-between border-b border-gray-100 pb-6">
          <h2 className="text-2xl md:text-[28px] font-extrabold text-[#090D24] tracking-tight">
            What you&apos;ll learn
          </h2>
          <div className="mt-4 lg:mt-0 px-4 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-[11px] font-bold text-gray-500 uppercase tracking-wider inline-block">
            {outcomes.length} Core Outcomes
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7 relative z-10">
          {outcomes.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
              className="flex items-start space-x-3.5 group"
            >
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mt-0.5 group-hover:bg-[#D9FFA5] group-hover:border-[#D9FFA5] transition-all duration-300">
                <Check className="w-4 h-4 text-emerald-600 group-hover:text-emerald-800 transition-colors" strokeWidth={2.5} />
              </div>
              <span className="text-[14px] md:text-[15px] font-medium text-gray-700 leading-relaxed group-hover:text-[#090D24] transition-colors duration-300">
                {item}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
