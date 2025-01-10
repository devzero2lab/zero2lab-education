"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

function Page() {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const userID = user?.id || "";
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [courseCount, setCourseCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user enrolled courses
        const coursesResponse = await axios.get(
          `${apiUrl}/api/usercourses?userId=${userID}`
        );
        // Fetch user enrolled courses count
        const countResponse = await axios.get(
          `${apiUrl}/api/usercourses?userId=${userID}&action=count`
        );

        setEnrolledCourses(coursesResponse.data.userCourses);
        setCourseCount(countResponse.data.count);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (isLoaded && isSignedIn) {
      fetchData();
    }
  }, [isLoaded, isSignedIn, userID, apiUrl]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    router.push("/sign-in"); // Redirect to the login page
    return null; // Prevent rendering
  }

  const stats = [
    { title: "Enrolled Courses", value: courseCount, color: "bg-pink-100" },
    { title: "Upcoming Tests", value: 0, color: "bg-indigo-50" },
  ];

  return (
    <div className="relative flex flex-col justify-center px-6 bg-gray-50">
      {/* Gradient Background */}
      <div className="absolute top-0 left-0 w-1/3 h-[300px] bg-blue-200 rounded-full blur-[150px]"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-[300px] bg-green-100 rounded-full blur-[100px]"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto mt-20 mb-20">
        {/* Title */}
        <h1 className="mb-12 text-4xl font-bold text-gray-800">
          Student Dashboard
        </h1>

        {/* Header Stats - Using Flexbox instead of Grid */}
        <div className="flex flex-wrap justify-start gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`flex-1 min-w-[250px] p-6 border rounded-lg shadow-lg ${stat.color} text-center`}
            >
              <h3 className="text-xl font-semibold text-gray-700">
                {stat.title}
              </h3>
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Course Progress - Using Flexbox instead of Grid */}
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          Enrolled Courses
        </h2>
        <div className="flex flex-col gap-6">
          {enrolledCourses.map((courseData, index) => {
            const { courseId, status } = courseData;
            return (
              <div
                key={index}
                className="p-6 bg-white border border-gray-300 rounded-lg shadow-lg "
              >
                {/* Conditionally render Link for Approved status, show message for Pending */}
                {status === "Approved" ? (
                  <Link
                    href={`/courses/${courseId._id}/learn`}
                    className="flex items-center justify-between"
                  >
                    <h3 className="text-xl font-semibold text-gray-800">
                      {courseId.courseName}
                    </h3>
                    <span
                      className={`px-4 py-2 rounded-full ${
                        status === "Pending"
                          ? "bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-black"
                          : status === "Approved"
                          ? "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white"
                          : "bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white"
                      }`}
                    >
                      {status}
                    </span>
                  </Link>
                ) : (
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {courseId.courseName}
                    </h3>
                    <span className="px-4 py-2 text-white bg-gray-400 rounded-full">
                      {status}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Page;
