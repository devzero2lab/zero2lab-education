"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { FaBook, FaGraduationCap, FaLock } from "react-icons/fa";
import Loader from "../components/Loader";
import Certificates from "./components/Certificates";

function Page() {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const userID = user?.id || "";
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [approvedCount, setApprovedCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const coursesResponse = await axios.get(
          `${apiUrl}/api/usercourses?userId=${userID}`
        );
        const countResponse = await axios.get(
          `${apiUrl}/api/usercourses?userId=${userID}&action=count`
        );
        // const certificatesResponse = await axios.get(
        //   `${apiUrl}/api/certificates?userID=${userID}`
        // );

        setEnrolledCourses(coursesResponse.data.userCourses);
        setApprovedCount(countResponse.data.approvedCount);
        setCompletedCount(countResponse.data.completedCount);
        // setCertificates(certificatesResponse.data.completedCourses);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isLoaded && isSignedIn) {
      fetchData();
    }
  }, [isLoaded, isSignedIn, userID, apiUrl]);

  if (!isLoaded) {
    return (
      <div className="">
        <Loader />
      </div>
    );
  }

  if (!isSignedIn) {
    router.push("/sign-in");
    return null;
  }

  const stats = [
    {
      title: "In Progress Courses",
      value: approvedCount,
      icon: <FaBook className="w-8 h-8 text-white" />,
      color: "bg-gradient-to-r from-blue-600 to-indigo-600",
    },
    {
      title: "Completed Courses",
      value: completedCount,
      icon: <FaBook className="w-8 h-8 text-white" />,
      color: "bg-gradient-to-r from-pink-500 to-orange-400",
    },
  ];

  return (
    <div className="w-full min-h-screen px-4 py-8 pt-20 mx-auto max-w-7xl sm:px-6 lg:px-8">
      {/* Welcome Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-transparent bg-gray-400 md:text-2xl bg-clip-text">
          Welcome Back, {user?.firstName}!
        </h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-2">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.color} rounded-2xl p-6 shadow-lg relative overflow-hidden`}
          >
            <div className="absolute -right-4 -bottom-4 opacity-20">
              {React.cloneElement(stat.icon, { className: "w-24 h-24" })}
            </div>
            <div className="flex items-center space-x-6">
              <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                {stat.icon}
              </div>
              <div>
                <p className="text-lg font-medium text-white/90">
                  {stat.title}
                </p>
                <p className="mt-2 text-4xl font-bold text-white">
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enrolled Courses Section */}
      <section className="mb-12 bg-white border border-gray-200 shadow-sm rounded-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="flex items-center text-2xl font-semibold">
            <FaGraduationCap className="mr-3 text-purple-600" />
            Enrolled Courses
          </h2>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="py-12 text-center ">Loading...</div>
          ) : enrolledCourses.length === 0 ? (
            <div className="py-12 text-center">
              <FaBook className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900">
                No courses enrolled yet
              </h3>
              <p className="mt-1 text-gray-500">
                Explore our courses to get started!
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {enrolledCourses.map((courseData, index) => {
                const { courseId, status } = courseData;
                return (
                  <div
                    key={index}
                    className="p-5 transition-all duration-200 border border-gray-200 group rounded-xl hover:bg-gray-50"
                  >
                    {status === "Approved" || status === "Completed" ? (
                      <Link
                        href={`/courses/${courseId._id}/learn`}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {courseId.courseName}
                          </h3>
                          <div className="flex items-center mt-2 space-x-2">
                            <span
                              className={`px-3 py-1 rounded-full text-sm ${
                                status === "Approved"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {status}
                            </span>
                            <span className="text-sm text-gray-500"></span>
                          </div>
                        </div>
                        <div className="hidden transition-opacity opacity-0 md:block group-hover:opacity-100">
                          <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse" />
                        </div>
                      </Link>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {courseId.courseName}
                          </h3>
                          <span className="inline-block px-3 py-1 mt-2 text-sm text-gray-600 bg-gray-100 rounded-full">
                            {status}
                          </span>
                        </div>
                        <FaLock className="mr-4 text-gray-400" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* user certificates */}
      {/* <Certificates certificates={certificates} loading={loading} /> */}
    </div>
  );
}

export default Page;
