import React from "react";
import Hero from "./components/home/Hero";
import TechStackIcons from "./components/home/TechStack";

function Home() {
  return (
    <div className="mt-12">
      {/* hero section */}
      <Hero />
      {/* TechStacks */}
      <TechStackIcons />
    </div>
  );
}

export default Home;
