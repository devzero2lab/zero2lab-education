"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import MLLearningThings from "./MLLearningThings";
import MLCertificate from "./MLCertificate";
import { motion, AnimatePresence } from "framer-motion";

function Page() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const courseId = "677a02ca6360d9d4edf96737";
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const checkEnrollmentStatus = async () => {
      if (isLoaded && isSignedIn && user) {
        try {
          const response = await axios.get(`${apiUrl}/api/usercourses`, {
            params: { userId: user.id },
          });
          const userCourses = response.data.userCourses || [];
          const enrolled = userCourses.some(
            (course) => course.courseId._id === courseId
          );
          setIsEnrolled(enrolled);
        } catch (error) {
          console.error("Error checking enrollment status:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    checkEnrollmentStatus();
  }, [isLoaded, isSignedIn, user, courseId, apiUrl]);

  return (
    <div className="mx-5 md:mx-12 mt-20 lg:mx-32">
      <div className="relative z-30 h-full">
        {/* Hero Section */}
        <section className="grid grid-cols-1 mt-10 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative flex-1"
          >
            <Image
              src="/images/courses/ml/cimage.jpeg"
              alt="Machine Learning Course"
              width={600}
              height={400}
              className="rounded-2xl shadow-xl"
              priority
            />
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-300 rounded-full blur-xl opacity-30" />
          </motion.div>

          <div className="flex flex-col mt-5 max-w-full lg:max-w-[700px]">
            <h1 className="text-2xl font-bold md:text-4xl xl:text-5xl">
              Machine Learning Professional Certification
            </h1>
            <p className="my-4 text-lg font-medium text-gray-600 xl:text-xl">
              Master Python-based ML fundamentals and advanced techniques
            </p>
            
            {loading ? (
              <div className="flex items-center justify-center px-5 py-3 my-4 text-lg font-bold text-white bg-gray-500 rounded-lg md:w-60">
                Loading...
              </div>
            ) : isEnrolled ? (
              <Link
                href="/dashboard"
                className="flex items-center justify-center px-5 py-3 my-4 text-lg font-bold text-white transition-transform bg-green-600 rounded-lg md:w-60 hover:scale-105"
              >
                Continue Learning
              </Link>
            ) : (
              <div className="flex flex-col my-4 md:flex-row gap-4">
                <Link 
                  href="#curriculum"
                  className="flex items-center justify-center bg-[#8933c2] text-white font-bold text-lg px-5 py-3 rounded-lg md:w-60 hover:bg-[#6b2596] transition-colors"
                >
                  View Curriculum
                </Link>
                <Link
                  href={`/courses/${courseId}/enroll`}
                  className="flex items-center justify-center bg-[#5e53ff] text-white font-bold text-lg px-5 py-3 rounded-lg md:w-60 hover:bg-[#483dff] transition-colors"
                >
                  Enroll Now
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Course Introduction Video */}
        <section className="pt-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-2 text-center">
              <h2 className="text-3xl font-bold md:text-4xl">
                Course Introduction
              </h2>
              <p className="mt-4 text-gray-600 md:text-lg">
                Watch this overview to see what you&apos;ll achieve in this course
              </p>
            </div>
            
            <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/A3ltFssuAKg"
                title="Machine Learning Course Introduction"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Course Components */}
        <div className="my-1">
          <MLLearningThings />
        </div>

        {/* Gradient Background Elements */}
        <div className="absolute top-0 left-0 w-[200px] sm:w-1/3 h-[200px] bg-blue-200 rounded-full blur-[50px] -z-10" />
        <div className="absolute bottom-0 right-0 w-[200px] sm:w-1/3 h-[200px] bg-green-200 rounded-full blur-[50px] -z-10" />
      </div>
    </div>
  );
}

export default Page;