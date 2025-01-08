import React from "react";
import Hero from "./components/home/Hero";
import TechStackIcons from "./components/home/TechStack";
import Features from "./components/home/Features";
import Reviews from "./components/home/Reviews";
import Link from "next/link";

function Home() {
  return (
    <div className="mt-12">
      {/* hero section */}
      <Hero />
      {/* TechStacks */}
      <TechStackIcons />
      {/* Features section */}
      <Features />
      {/* Reviews section */}
      <div className="relative z-30 flex flex-col items-center px-4 mt-16 text-center md:px-8 lg:px-16">
        <h2 className="text-2xl font-semibold md:text-3xl lg:text-4xl">
          See for yourself what others think
        </h2>
        <p className="text-sm text-[#626262] md:text-base lg:text-lg mt-2">
          Master coding and design to achieve your goals with expert guidance
        </p>
        <Reviews />
      </div>
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#268ff2] to-[#63a8f6] text-white">
        <div className="max-w-6xl px-4 mx-auto text-center md:px-8">
          <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">
            Excited to dive into learning ?
          </h2>
          <p className="mt-3 text-lg md:text-xl lg:text-2xl">
            Take your knowledge to the next level with guided learning and
            practice
          </p>
          <div className="mt-10">
            <Link
              href="/courses"
              className="inline-block bg-white text-[#2652f2] font-medium text-lg md:text-xl py-2 px-8 rounded-full shadow-lg hover:bg-gray-100"
            >
              Get Started Now 
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
