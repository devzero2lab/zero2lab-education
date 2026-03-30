"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BookOpenText } from "lucide-react";
import Link from "next/link";

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };



  return (
    <section className="relative overflow-clip h-[60vh] md:h-[33vw]  [background:radial-gradient(125%_125%_at_50%_20%,#111212_46%,#1e0f4d_100%)] py-16">
      <motion.div
        className="container mx-auto px-4 flex flex-col items-end text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="absolute left-0 w-full md:w-8/12 h-full flex flex-col items-start mt-[5vh] z-40 px-6 md:px-28 py-7 rounded-lg"
          variants={containerVariants}
        >
          <motion.div
            className="relative -top-10 inline-flex items-center   text-white  rounded-full shadow-lg hover:shadow-xl transition-shadow"
            variants={itemVariants}
          >
            <BookOpenText className="mr-2 h-5 w-5" />
            <span className="font-bold">Welcome to zero2lab</span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl font-bold animate-glow"
            style={{
              backgroundImage: 'linear-gradient(45deg, #39e991, #27d48c, #1abf77)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              filter: 'drop-shadow(0 0 12px rgba(57, 233, 145, 0.4))',
            }}
            variants={itemVariants}
          >
            Learn From <span className="text-white">Experts</span>
          </motion.h1>

          <motion.p
            className="mt-4 text-white"
            variants={itemVariants}
          >
            Take your knowledge to the next level with guided learning and practice
          </motion.p>
          <br />

          <motion.div variants={itemVariants}>
            <Link
              href={'/courses'}
              className="cursor-pointer inline-flex items-center bg-blue-300 text-black px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
              <BookOpenText className="mr-2 h-5 w-5" />
              <span className="font-bold">Browse Courses</span>
            </Link>
          </motion.div>
        </motion.div>












        <div className="relative   ">
          {/* Center Image */}
          <div className="rounded-full invisible md:visible overflow-hidden shadow-2xl shadow-white/50 bg-black ">
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
      </motion.div>
    </section>
  );
};

export default Hero;
