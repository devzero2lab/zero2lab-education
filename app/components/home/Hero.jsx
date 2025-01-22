"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BookOpenText } from "lucide-react";

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
    <section className="relative overflow-clip h-[57vh] bg-gradient-to-r from-[#d2e5fe] via-white to-[#cffade] py-16">
      <div className="container mx-auto px-4 flex flex-col items-end text-center">
        <div className="absolute left-0 w-8/12 h-full flex flex-col items-center mt-20 top-10   z-40    px-28 py-7 rounded-lg">
          <h1 className="text-7xl font-bold text-center">
            Learn From <span className="text-red-600">Experts</span>
          </h1>

          <p className="mt-4 text-gray-600">
            Take your knowledge to the next level with guided learning and practice
          </p>

        </div>

        <div className="absolute left-40 top-20 inline-flex items-center bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow">
              <BookOpenText className="mr-2 h-5 w-5" />
              <span className="font-bold">Welcome to zero2learn</span>
            </div>

        
        

        <div className="relative  ">
          {/* Center Image */}
          <div className="rounded-full overflow-hidden shadow-lg">
            <Image
              src="/images/homepage/hero.png"
              alt="Smiling student"
              width={340}
              height={340}
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

              {/* Icon 1 */}
              <div className="absolute w-12 h-12 rounded-full bg-white shadow-md flex justify-center items-center top-0 left-1/2 transform -translate-x-1/2">
                <Image src="/images/homepage/python.svg" alt="Python" width={32} height={32} />
              </div>


              {/* Icon 2 */}
              <div className="absolute w-12 h-12 rounded-full bg-white shadow-md flex justify-center items-center right-0 top-1/2 transform -translate-y-1/2">
                <Image src="/images/homepage/python.svg" alt="React" width={32} height={32} />
              </div>

              {/* Icon 3 */}
              <div className="absolute w-12 h-12 rounded-full bg-white shadow-md flex justify-center items-center bottom-0 left-1/2 transform -translate-x-1/2">
                <Image src="/images/homepage/python.svg" alt="Figma" width={32} height={32} />
              </div>



              {/* Icon 4 */}
              <div className="absolute w-12 h-12 rounded-full bg-white shadow-md flex justify-center items-center left-0 top-1/2 transform -translate-y-1/2">
                <Image src="/images/homepage/python.svg" alt="JavaScript" width={32} height={32} />
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

              {/* Icon 1 */}
              <div className="absolute w-12 h-12 rounded-full bg-white shadow-md flex justify-center items-center top-0 left-1/2 transform -translate-x-1/2">
                <Image src="/images/homepage/python.svg" alt="Python" width={32} height={32} />
              </div>


              {/* Icon 2 */}
              <div className="absolute w-12 h-12 rounded-full bg-white shadow-md flex justify-center items-center right-0 top-1/2 transform -translate-y-1/2">
                <Image src="/images/homepage/python.svg" alt="React" width={32} height={32} />
              </div>

              {/* Icon 3 */}
              <div className="absolute w-12 h-12 rounded-full bg-white shadow-md flex justify-center items-center bottom-0 left-1/2 transform -translate-x-1/2">
                <Image src="/images/homepage/python.svg" alt="Figma" width={32} height={32} />
              </div>



              {/* Icon 4 */}
              <div className="absolute w-12 h-12 rounded-full bg-white shadow-md flex justify-center items-center left-0 top-1/2 transform -translate-y-1/2">
                <Image src="/images/homepage/python.svg" alt="JavaScript" width={32} height={32} />
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
                <Image src="/images/homepage/python.svg" alt="Python" width={32} height={32} />
              </div>

              {/* Icon 2 */}
              <div className="absolute w-12 h-12 rounded-full bg-white shadow-md flex justify-center items-center right-0 top-1/2 transform -translate-y-1/2">
                <Image src="/images/homepage/python.svg" alt="React" width={32} height={32} />
              </div>

              {/* Icon 3 */}
              <div className="absolute w-12 h-12 rounded-full bg-white shadow-md flex justify-center items-center bottom-0 left-1/2 transform -translate-x-1/2">
                <Image src="/images/homepage/python.svg" alt="Figma" width={32} height={32} />
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
                <Image src="/images/homepage/python.svg" alt="Python" width={32} height={32} />
              </div>

              {/* Icon 2 */}
              <div className="absolute w-12 h-12 rounded-full bg-white shadow-md flex justify-center items-center right-0 top-1/2 transform -translate-y-1/2">
                <Image src="/images/homepage/python.svg" alt="React" width={32} height={32} />
              </div>


              {/* Icon 3 */}
              <div className="absolute w-12 h-12 rounded-full bg-white shadow-md flex justify-center items-center bottom-0 left-1/2 transform -translate-x-1/2">
                <Image src="/images/homepage/python.svg" alt="Figma" width={32} height={32} />
              </div>


            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
