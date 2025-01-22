"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const Hero = () => {


  const iconVariants = {
    animate: {
      rotate: 360, // Full circular rotation
      transition: {
        repeat: Infinity,
        ease: "linear",
        duration: 150, // Adjust speed
      },
    },
  };

  const iconVariants2 = {
    animate: {
      rotate: 360, // Full circular rotation
      transition: {
        repeat: Infinity,
        ease: "linear",
        duration: 130, // Adjust speed
      },
    },
  };

  const iconVariants3 = {
    animate: {
      rotate: 360, // Full circular rotation
      transition: {
        repeat: Infinity,
        ease: "linear",
        duration: 110, // Adjust speed
      },
    },
  };

  const iconVariants4 = {
    animate: {
      rotate: 360, // Full circular rotation
      transition: {
        repeat: Infinity,
        ease: "linear",
        duration: 90, // Adjust speed
      },
    },
  };

  return (
    <section className="relative overflow-clip h-[60vh] bg-gradient-to-r from-red-100 via-white to-purple-100 py-16">
      <div className="container mx-auto px-4 flex flex-col items-center text-center">
        <div className="absolute z-40 bg-white/40 backdrop-blur-sm px-28 py-7 rounded-lg">
          <h1 className="text-6xl font-bold text-gray-800">
            Learn From <span className="text-purple-600">Experts</span>
          </h1>
          <p className="mt-4 text-gray-600">
            Take your knowledge to the next level with guided learning and practice
          </p>
          
        </div>

        <div className="relative  mt-8">
          {/* Center Image */}
          <div className="rounded-full overflow-hidden shadow-lg">
            <Image
              src="/images/homepage/hero.png"
              alt="Smiling student"
              width={360}
              height={360}
              className="object-cover"
            />
          </div>

          {/* Rotating icons around the circle */}
          <div className="absolute  inset-0 flex justify-center items-center">
            <motion.div
              className="absolute z-20 h-[544px] w-[544px] rounded-full border-2 border-dashed border-gray-300"
              variants={iconVariants}
              animate="animate"
            >
              

              {/* Icon 2 */}
              <div className="absolute w-12 h-12 rounded-full bg-white shadow-md flex justify-center items-center right-0 top-1/2 transform -translate-y-1/2">
                <Image src="/icons/react.svg" alt="React" width={32} height={32} />
              </div>

             

              {/* Icon 4 */}
              <div className="absolute w-12 h-12 rounded-full bg-white shadow-md flex justify-center items-center left-0 top-1/2 transform -translate-y-1/2">
                <Image src="/icons/javascript.svg" alt="JavaScript" width={32} height={32} />
              </div>
            </motion.div>
          </div>


          {/* Rotating icons around the circle */}
          <div className="absolute  inset-0 flex justify-center items-center">
            <motion.div
              className="absolute z-20 h-[944px] w-[944px] rounded-full border-2 border-dashed border-gray-300"
              variants={iconVariants2}
              animate="animate"
            >
              

              {/* Icon 2 */}
              <div className="absolute w-12 h-12 rounded-full bg-white shadow-md flex justify-center items-center right-0 top-1/2 transform -translate-y-1/2">
                <Image src="/icons/react.svg" alt="React" width={32} height={32} />
              </div>

              

              {/* Icon 4 */}
              <div className="absolute w-12 h-12 rounded-full bg-white shadow-md flex justify-center items-center left-0 top-1/2 transform -translate-y-1/2">
                <Image src="/icons/javascript.svg" alt="JavaScript" width={32} height={32} />
              </div>
            </motion.div>
          </div>

          {/* Rotating icons around the circle */}
          <div className="absolute  inset-0 flex justify-center items-center">
            <motion.div
              className="absolute z-20 h-[744px] w-[744px] rounded-full border-2 border-dashed border-gray-300"
              variants={iconVariants3}
              animate="animate"
            >
              {/* Icon 1 */}
              <div className="absolute w-12 h-12 rounded-full bg-white shadow-md flex justify-center items-center top-0 left-1/2 transform -translate-x-1/2">
                <Image src="/icons/python.svg" alt="Python" width={32} height={32} />
              </div>

             

              {/* Icon 3 */}
              <div className="absolute w-12 h-12 rounded-full bg-white shadow-md flex justify-center items-center bottom-0 left-1/2 transform -translate-x-1/2">
                <Image src="/icons/figma.svg" alt="Figma" width={32} height={32} />
              </div>

              
            </motion.div>
          </div>


          {/* Rotating icons around the circle */}
          <div className="absolute  inset-0 flex justify-center items-center">
            <motion.div
              className="absolute z-20 h-[644px] w-[644px] rounded-full border-2 border-dashed border-gray-300"
              variants={iconVariants4}
              animate="animate"
            >
              {/* Icon 1 */}
              <div className="absolute w-12 h-12 rounded-full bg-white shadow-md flex justify-center items-center top-0 left-1/2 transform -translate-x-1/2">
                <Image src="/icons/python.svg" alt="Python" width={32} height={32} />
              </div>

             

              {/* Icon 3 */}
              <div className="absolute w-12 h-12 rounded-full bg-white shadow-md flex justify-center items-center bottom-0 left-1/2 transform -translate-x-1/2">
                <Image src="/icons/figma.svg" alt="Figma" width={32} height={32} />
              </div>

              
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
