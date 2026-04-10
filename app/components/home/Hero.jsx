"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800', '900'] });

const Hero = () => {
  return (
    <section className={`relative bg-white pt-4 md:pt-8 overflow-hidden ${montserrat.className}`}>
      <div className="w-full max-w-[1300px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 z-10 mt-8 lg:mt-0"
          >
            

            <h1 className="text-[1.8rem] md:text-[3rem] xl:text-5xl font-bold text-[#090D24] leading-[1.12] mb-6 md:mb-8">
              Build things
             that actually get you
               hired
            </h1>

            <p className="text-base md:text-[1.1rem] text-[#090D24] max-w-lg mb-8 md:mb-10 leading-relaxed font-medium">
              <span>
                Take your knowledge to the next level with guided learning and
              </span>{" "}
              practice
            </p>

            <Link
              href="/courses"
              className="inline-block bg-[#090D24] text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-black transition-all shadow-md active:scale-95"
            >
              Explore programs
            </Link>
          </motion.div>

          {/* Right Column: Complete Hero Image */}
          <div className="lg:col-span-7 w-full flex items-center justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
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
      
      {/* Decorative subtle gradient */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-50/40 blur-[120px] rounded-full -z-10"></div>
    </section>
  );
};

export default Hero;
