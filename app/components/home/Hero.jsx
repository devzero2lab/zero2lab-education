"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800', '900'] });

const Hero = () => {
  return (
    <section className={`relative bg-transparent pt-6 md:pt-10 pb-4 overflow-hidden ${montserrat.className}`}>
      <div className="w-full max-w-[1300px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          
          {/* Left Column: Content */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 z-10 mt-6 lg:mt-0"
          >
            

            <h1 className="text-[1.8rem] md:text-[2.8rem] xl:text-[3.2rem] font-extrabold text-[#090D24] leading-[1.1] mb-5 md:mb-7">
              Build things
              <br />
              that actually get you
              <br />
              <span className="relative inline-block">
                hired
                <svg className="absolute -bottom-1 left-0 w-full h-2 text-[#D9FFA5]" viewBox="0 0 200 8" preserveAspectRatio="none">
                  <path d="M0,5 Q50,0 100,5 T200,5" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
              </span>
            </h1>

            <p className="text-sm md:text-base text-gray-500 max-w-md mb-7 md:mb-9 leading-relaxed font-medium">
              Take your knowledge to the next level with guided learning and real-world practice. Join thousands of students building their careers.
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4 flex-wrap">
              <Link
                href="/courses"
                className="inline-flex items-center bg-[#090D24] text-white px-7 py-3.5 rounded-full text-base font-bold hover:bg-black transition-all shadow-md shadow-gray-900/10 active:scale-95"
              >
                Explore programs
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/about-us"
                className="inline-flex items-center px-6 py-3.5 rounded-full text-base font-bold text-[#090D24] border border-gray-300 hover:border-gray-400 hover:bg-gray-50/50 transition-all active:scale-95"
              >
                Learn more
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Hero Image */}
          <div className="lg:col-span-7 w-full flex items-center justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9 }}
              className="w-full"
            >
              <Image
                src="/images/homepage/hero-image.png"
                alt="Student looking at career paths"
                width={1200}
                height={1200}
                className="w-full h-auto object-contain select-none"
                priority
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
