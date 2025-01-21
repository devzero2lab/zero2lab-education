"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import MLLearningThings from "./MLLearningThings";
import MLCertificate from "./MLCertificate";

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
    <div className="mx-12 mt-20 lg:mx-32">
      <div className="relative z-30 h-full">
        {/* hero section */}
        <section className="grid grid-cols-1 mt-10 lg:grid-cols-2 lg:gap-20">
          <div className="relative w-full h-full">
            <Image
              src={"/images/courses/ml/cimage.jpeg"}
              alt="course-image"
              width={500}
              height={400}
              className="object-contain w-full h-full"
            />
          </div>
          <div className="flex flex-col mt-5 max-w-full lg:max-w-[700px]">
            <p className="text-2xl font-bold md:text-4xl xl:text-5xl">
              Machine Learning Course
            </p>
            <p className="my-2 font-semibold text-1xl opacity-90 xl:text-lg">
              Professional Certification
            </p>
            <p className="font-semibold text-1xl xl:text-lg opacity-90">
              Learn the essentials of machine learning with Python.This course
              covers core concepts like supervised and unsupervised learning,
              decision trees, and regression models to kickstart your AI career.
            </p>
            {loading ? (
              <div className="flex items-center justify-center px-5 py-3 my-4 text-lg font-bold text-white bg-gray-500 rounded-lg md:w-60">
                Loading...
              </div>
            ) : isEnrolled ? (
              <Link
                href="/dashboard"
                className="flex items-center justify-center px-5 py-3 my-4 text-lg font-bold text-white bg-green-600 rounded-lg md:w-60"
              >
                Go to the Dashboard
              </Link>
            ) : (
              <Link
                href={`/courses/${courseId}/enroll`}
                className="flex items-center justify-center bg-[#5e53ff] text-white font-bold text-lg px-5 py-3 rounded-lg my-4 md:w-60"
              >
                Enroll Now
              </Link>
            )}
          </div>
        </section>
        <div className="my-5"></div>
        {/* learning things */}
        <MLLearningThings />
        {/* certificate section */}
        <MLCertificate />
      </div>
      {/* Blue gradient on the left */}
      <div className="absolute top-0 left-0 w-[200px] sm:w-1/3 h-[200px] bg-blue-200 rounded-full blur-[50px]"></div>
      {/* Green gradient on the right */}
      <div className="absolute bottom-0 right-0 w-[200px] sm:w-1/3 h-[200px] bg-green-200 rounded-full blur-[50px]"></div>
    </div>
  );
}

export default Page;
