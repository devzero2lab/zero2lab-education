"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

function Features() {
  const courses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      description:
        "Master HTML, CSS, JavaScript, React, Node.js, MongoDB and more! Build real projects and deploy your portfolio.",
      duration: "24h 40m",
      image: "/images/homepage/course1.png",
      instructors: [
        "/images/avatars/avatar1.jpg",
        "/images/avatars/avatar2.jpg",
        "/images/avatars/avatar3.jpg",
      ],
      rating: 4.9,
      reviews: 2385,
      badge: "Bestseller",
    },
    {
      id: 2,
      title: "Master Python for Data Science",
      description:
        "Learn Python, NumPy, Pandas, and machine learning algorithms to excel in data science and AI.",
      duration: "30h 15m",
      image: "/images/homepage/fwd.png",
      instructors: [
        "/images/avatars/avatar4.jpg",
        "/images/avatars/avatar5.jpg",
      ],
      rating: 4.8,
      reviews: 1850,
      badge: "Top Rated",
    },
    {
      id: 3,
      title: "UI/UX Design Fundamentals",
      description:
        "Understand the principles of user interface and user experience design, and create stunning designs.",
      duration: "18h 50m",
      image: "/images/homepage/mad.png",
      instructors: ["/images/avatars/avatar6.jpg"],
      rating: 4.7,
      reviews: 1320,
      badge: "Popular",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  return (
    <section className={`relative z-30 flex flex-col items-center w-full  ${montserrat.className}`}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex items-center justify-center w-full px-6 md:px-12 max-w-[1300px] mb-8 md:mb-12"
      >
        <motion.h2
          variants={itemVariants}
          className="text-2xl md:text-4xl font-extrabold text-[#090D24] text-center"
        >
          Popular Courses
        </motion.h2>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 gap-8 px-6 md:px-12 mx-auto max-w-[1300px] sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      >
        {courses.map((course) => (
          <motion.div
            key={course.id}
            variants={itemVariants}
            className="flex flex-col relative transition-all duration-300 ease-out bg-white border-2 border-[#090D24] rounded-2xl md:rounded-[2rem] shadow-sm hover:shadow-md group overflow-hidden"
          >
            <Link
              href="/courses"
              className="flex-1 flex flex-col"
              aria-label={`Course: ${course.title}`}
            >
              {/* Course Image */}
              <div className="overflow-hidden w-full h-full bg-[#f8ffec]">
                <Image
                  width={600}
                  height={440}
                  className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105"
                  src={course.image}
                  alt={course.title}
                />
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Call to Action */}
      <motion.div
        className="mt-12 md:mt-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Link
          href="/courses"
          className="px-8 py-4 text-lg font-bold text-white transition-all transform rounded-full bg-[#090D24] hover:bg-black shadow-md active:scale-95 inline-block"
        >
          View All Courses
        </Link>
      </motion.div>
    </section>
  );
}

export default Features;
