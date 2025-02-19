"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

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

  const cardHoverVariants = {
    hover: {
      y: -5,
      transition: { type: "spring", stiffness: 300 },
    },
  };

  const imageHoverVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  };

  return (
    <section className="relative z-30 flex flex-col items-center w-full pb-5 bg-gradient-to-b from-white to-gray-50">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex items-center justify-between w-full px-5 max-w-7xl"
      >
        <motion.h2
          variants={itemVariants}
          className="mb-6 text-3xl font-bold text-gray-900 font-inter"
        >
          Popular Courses
        </motion.h2>
      </motion.div>

      <div
        className="grid grid-cols-1 gap-8 px-5 mx-auto max-w-7xl sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      >
        {courses.map((course) => (
          <div
            key={course.id}
            variants={itemVariants}
            whileHover="hover"
            className="relative transition-all duration-300 ease-out bg-white shadow-lg group rounded-xl hover:shadow-2xl"
          >
            <Link
              href="/courses"
              className="block"
              aria-label={`Course: ${course.title}`}
            >
              {/* Course Image */}
              <div className="overflow-hidden rounded-xl">
                <div className="overflow-hidden rounded-xl" whileHover="hover">
                  <Image
                    width={600}
                    height={440}
                    className="object-contain w-full transition-transform duration-300 group-hover:scale-105"
                    src={course.image}
                    alt={course.title}
                  />
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div
        className="mt-9"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Link
          href="/courses"
          className="px-8 py-3 text-lg font-semibold text-white transition-all transform rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:scale-105 hover:shadow-xl"
        >
          View All Courses
        </Link>
      </div>
    </section>
  );
}

export default Features;
