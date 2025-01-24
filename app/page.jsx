import React from "react";
import Hero from "./components/home/Hero";
import TechStackIcons from "./components/home/TechStack";
import Features from "./components/home/Features";
import Reviews from "./components/home/Reviews"; 
import Link from "next/link";

function Home() { 
  return (
    <div className="mt-12 bg-[#ffffff]">
      
      {/* hero section */}
      <Hero />
      {/* TechStacks */}
      {/* <TechStackIcons />  */}
      {/* Features section */} 
      <br/>
      <Features />
      {/* Reviews section */}
      <div className="relative z-30 flex flex-col items-center px-4 mt-5 text-center md:px-8 lg:px-16">
        <h2 className="text-2xl font-semibold md:text-3xl lg:text-3xl">
          See for yourself what others think
        </h2>
        <p className="text-sm text-[#626262] md:text-base lg:text-sm mt-2">
          Master coding and design to achieve your goals with expert guidance
        </p>
        <Reviews />
      </div>
      
    </div>
  );
}

export default Home;
