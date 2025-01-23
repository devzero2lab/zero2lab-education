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
    <section className="relative overflow-clip h-[30vw]  [background:radial-gradient(125%_125%_at_50%_20%,#111212_46%,#1e0f4d_100%)] py-16">
      <div className="container mx-auto px-4 flex flex-col items-end text-center">
        <div className="absolute  left-0 w-8/12 h-full flex flex-col items-start mt-[12vh]    z-40    px-28 py-7 rounded-lg">
          <h1 className="text-4xl md:text-7xl font-bold animate-glow"
            style={{
              backgroundImage: 'linear-gradient(45deg, #39e991, #27d48c, #1abf77)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              filter: 'drop-shadow(0 0 12px rgba(57, 233, 145, 0.4))',
            }}>
            Learn From <span className="text-white">Experts</span>
          </h1>

          <p className="mt-4 text-white">
            Take your knowledge to the next level with guided learning and practice
          </p>
          <br />

          <div className="shadow-white/30 inline-flex items-center bg-blue-300 text-black px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-shadow">
            <BookOpenText className="mr-2 h-5 w-5" />
            <span className="font-bold ">browsers course</span>
          </div>

        </div>


        




        <div className="absolute left-28 top-28 inline-flex items-center shadow-white/20 bg-white text-black px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow">
          <BookOpenText className="mr-2 h-5 w-5" />
          <span className="font-bold">Welcome to zero2learn</span>
        </div>




        <div className="relative   ">
          {/* Center Image */}
          <div className="rounded-full overflow-hidden shadow-2xl shadow-white/50 bg-white ">
            <Image
              src="/images/homepage/hero.png"
              alt="Smiling student"
              width={560}
              height={560}
              className="object-cover "
            />
          </div>

          {/* Rotating icons around the circle */}
          <div className="absolute  inset-0 flex justify-center items-center ">
            <motion.div
              className="absolute z-20 h-[564px] w-[564px]  rounded-full border-2 border-dashed border-gray-700"
              variants={iconVariants}
              animate="animate"
            >

              {/* Icon 1 */}
              <div className="absolute w-20 h-20 shadow-white/50 rounded-full bg-white shadow-md flex justify-center items-center top-0 left-1/2 transform -translate-x-1/2">
                <Image src="/images/homepage/python.svg" alt="Python" width={39} height={39} />
              </div>


              {/* Icon 2 */}
              <div className="absolute w-16 h-16 shadow-white/50 rounded-full bg-white shadow-md flex justify-center items-center right-0 top-1/2 transform -translate-y-1/2">
                <Image src="/images/homepage/android.svg" alt="React" width={32} height={32} />
              </div>

              {/* Icon 3 */}
              <div className="absolute w-8 h-8 rounded-full shadow-white/50 bg-white shadow-md flex justify-center items-center bottom-0 left-1/2 transform -translate-x-1/2">
                <Image src="/images/homepage/docker.svg" alt="Figma" width={22} height={22} />
              </div>



              {/* Icon 4 */}
              <div className="absolute w-12 h-12 rounded-full shadow-white/50 bg-white shadow-md flex justify-center items-center left-0 top-1/2 transform -translate-y-1/2">
                <Image src="/images/homepage/firebase.svg" alt="JavaScript" width={32} height={32} />
              </div>
            </motion.div>
          </div>


          {/* Rotating icons around the circle */}
          <div className="absolute  inset-0 flex justify-center items-center">
            <motion.div
              className="absolute z-20 h-[944px] w-[944px] rounded-full border-2 border-dashed border-gray-700"
              variants={iconVariants2}
              animate="animate"
            >

              {/* Icon 1 */}
              <div className="absolute w-12 h-12 rounded-full  shadow-white/50 bg-white shadow-md flex justify-center items-center top-0 left-1/2 transform -translate-x-1/2">
                <Image src="/images/homepage/flutter.svg" alt="Python" width={32} height={32} />
              </div>


              {/* Icon 2 */}
              <div className="absolute w-12 h-12 rounded-full shadow-white/50 bg-white shadow-md flex justify-center items-center right-0 top-1/2 transform -translate-y-1/2">
                <Image src="/images/homepage/gitlab.svg" alt="React" width={32} height={32} />
              </div>

              {/* Icon 3 */}
              <div className="absolute w-12 h-12 rounded-full shadow-white/50 bg-white shadow-md flex justify-center items-center bottom-0 left-1/2 transform -translate-x-1/2">
                <Image src="/images/homepage/grafana.svg" alt="Figma" width={32} height={32} />
              </div>



              {/* Icon 4 */}
              <div className="absolute w-12 h-12 rounded-full shadow-white/50 bg-white shadow-md flex justify-center items-center left-0 top-1/2 transform -translate-y-1/2">
                <Image src="/images/homepage/graphql.svg" alt="JavaScript" width={32} height={32} />
              </div>
            </motion.div>
          </div>

          {/* Rotating icons around the circle */}
          <div className="absolute  inset-0 flex justify-center items-center">
            <motion.div
              className="absolute z-20 h-[744px] w-[744px] rounded-full border-2 border-dashed border-gray-700"
              variants={iconVariants3}
              animate="animate"
            >
              {/* Icon 1 */}
              <div className="absolute w-12 h-12 rounded-full shadow-white/50 bg-white shadow-md flex justify-center items-center top-0 left-1/2 transform -translate-x-1/2">
                <Image src="/images/homepage/javascript.svg" alt="Python" width={32} height={32} />
              </div>

              {/* Icon 2 */}
              <div className="absolute w-12 h-12 rounded-full shadow-white/50 bg-white shadow-md flex justify-center items-center right-0 top-1/2 transform -translate-y-1/2">
                <Image src="/images/homepage/kaggle.svg" alt="React" width={32} height={32} />
              </div>

              {/* Icon 3 */}
              <div className="absolute w-12 h-12 rounded-full shadow-white/50 bg-white shadow-md flex justify-center items-center bottom-0 left-1/2 transform -translate-x-1/2">
                <Image src="/images/homepage/kotlin.svg" alt="Figma" width={32} height={32} />
              </div>


            </motion.div>
          </div>


          {/* Rotating icons around the circle */}
          <div className="absolute  inset-0 flex justify-center items-center">
            <motion.div
              className="absolute z-20 h-[644px] w-[644px] rounded-full border-2 border-dashed border-gray-700"
              variants={iconVariants4}
              animate="animate"
            >
              {/* Icon 1 */}
              <div className="absolute w-12 h-12 rounded-full shadow-white/50 bg-white shadow-md flex justify-center items-center top-0 left-1/2 transform -translate-x-1/2">
                <Image src="/images/homepage/linux.svg" alt="Python" width={32} height={32} />
              </div>

              {/* Icon 2 */}
              <div className="absolute w-12 h-12 rounded-full shadow-white/50 bg-white shadow-md flex justify-center items-center right-0 top-1/2 transform -translate-y-1/2">
                <Image src="/images/homepage/nginx.svg" alt="React" width={32} height={32} />
              </div>


              {/* Icon 3 */}
              <div className="absolute w-12 h-12 rounded-full shadow-white/50 bg-white shadow-md flex justify-center items-center bottom-0 left-1/2 transform -translate-x-1/2">
                <Image src="/images/homepage/react.svg" alt="Figma" width={32} height={32} />
              </div>

            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
