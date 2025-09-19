"use client";
import React from "react";
import { motion } from "framer-motion";

export function TechStackSection({ techStack }) {
  return (
    <div className="py-8 bg-slate-50/50">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
        }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
            Master Industry-Leading Technologies
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto font-medium">
            Work with the same tools used by top AI companies and startups worldwide. Build expertise in the most in-demand technologies.
          </p>
        </div>
          
        <div className="rounded-3xl p-8 lg:p-3 relative overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-indigo-50"></div>
          </div>
          
          <div className="relative">
            {/* Tech stack grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
              {techStack.map((tech, index) => (
                <motion.div 
                  key={tech.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group flex flex-col items-center p-3 rounded-xl bg-slate-50/50 hover:bg-white hover:shadow transition-all duration-300 cursor-pointer border border-slate-100 hover:border-blue-200"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center mb-2 group-hover:shadow-sm transition-all duration-300 border border-blue-100 group-hover:border-blue-200 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10 w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm">
                      {tech.name.charAt(0)}
                    </div>
                  </div>
                  <div className="text-center w-full">
                    <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-300 block mb-0.5">
                      {tech.name}
                    </span>
                    <span className="text-[10px] text-slate-500 group-hover:text-slate-600 transition-colors duration-300 block mb-1.5 font-medium">
                      {tech.category}
                    </span>
                    {/* <div className="w-full bg-slate-200 rounded-full h-1 mb-1">
                      <motion.div 
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 h-1 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${tech.popularity}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-500 font-semibold">{tech.popularity}% Industry Use</span> */}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}