"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const slides = [
  { icon: "/images/techstack/t1.png" },
  { icon: "/images/techstack/t2.png" },
  { icon: "/images/techstack/t3.png" },
  { icon: "/images/techstack/t4.png" },
  { icon: "/images/techstack/t5.png" },
  { icon: "/images/techstack/t6.png" },
  { icon: "/images/techstack/t7.png" },
  { icon: "/images/techstack/t8.png" },
  { icon: "/images/techstack/t9.png" },
  { icon: "/images/techstack/t10.png" },
  { icon: "/images/techstack/t11.png" },
];

const TechStackIcons = () => {
  const duplicatedSlides = [...slides, ...slides];

  return (
    <div className="relative overflow-hidden bg-white py-9 ">
      {/* Gradient overlays for the edges */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-white to-transparent"></div>
        <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-white to-transparent"></div>
      </div>
      {/* Scrolling Slider */}
      <motion.div
        className="flex items-center gap-8"
        animate={{
          x: ["0%", "-100%"],
          transition: {
            ease: "linear",
            duration: 45,
            repeat: Infinity,
          },
        }}
      >
        {duplicatedSlides.map((slide, index) => (
          <div
            key={index}
            className="flex items-center justify-center flex-shrink-0 w-20 h-full"
          >
            <Image
              src={slide.icon}
              width={90}
              height={90}
              alt={`Slide ${index + 1}`}
              className="object-contain w-auto h-8"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default TechStackIcons;
