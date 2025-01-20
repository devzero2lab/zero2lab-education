"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import MyMeetingsCalendar from "../schedule-meetings/page"; // Import the calendar component
import {
  FaBook,
  FaCalendarAlt,
  FaChartLine,
  FaClipboardList,
  FaGraduationCap,
  FaUsers,
  FaTasks,
  FaClock,
  FaStar,
} from "react-icons/fa"; // Icons
import Modal from "../modal/Modal"; // Import the modal component
import ScheduleForm from "../schedule-meetings/schedule-form/page"; // Import the schedule form component

function Page() {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const userID = user?.id || "";
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [courseCount, setCourseCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

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
    return <div className="flex justify-center items-center min-h-screen text-gray-700">Loading...</div>;
  }

  if (!isSignedIn) {
    router.push("/sign-in"); // Redirect to the login page
    return null; // Prevent rendering
  }

  const stats = [
    {
      title: "Enrolled Courses",
      value: courseCount,
      icon: <FaBook className="w-8 h-8 text-white" />,
      color: "bg-gradient-to-r from-[#AE9FA6] to-[#AE5ff6]",
    },
    {
      title: "Upcoming Tests",
      value: 0,
      icon: <FaClipboardList className="w-8 h-8 text-white" />,
      color: "bg-gradient-to-r from-[#FBA25C] to-[#FBA27c]", // Custom gradient
    },
    {
      title: "Active Students",
      value: 120,
      icon: <FaUsers className="w-8 h-8 text-white" />,
      color: "bg-gradient-to-r from-[#6EE7B7] to-[#3B82F6]", // Green to blue gradient
    },
    {
      title: "Completed Tasks",
      value: 15,
      icon: <FaTasks className="w-8 h-8 text-white" />,
      color: "bg-gradient-to-r from-[#F472B6] to-[#F59E0B]", // Pink to orange gradient
    },
  ];

  return (
    <div className="relative z-10 w-full max-w-[90rem] mx-auto mt-20 mb-20 bg-[#F6FFFF] min-h-screen p-8">
      {/* Title */}
      <h1 className="mb-12 text-4xl font-bold text-gray-800 text-center">
        Welcome Back, {user?.firstName}!
      </h1>

      {/* Header Stats */}
      <div className="bg-white rounded-2xl shadow-2xl border-2 border-[#F6F2FD] p-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl shadow-lg bg-gradient-to-r ${stat.color} text-white hover:scale-105 transition-transform duration-300 border-2 border-[#F6F2FD]`}
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                  {stat.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{stat.title}</h3>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enrolled Courses Section */}
      <div className="bg-white rounded-2xl shadow-2xl border-2 border-[#F6F2FD] p-8 mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center">
            <FaGraduationCap className="mr-3 w-8 h-8 text-blue-500" />
            Enrolled Courses
          </h2>
          <Link
            href="/courses"
            className="px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
          >
            View All
          </Link>
        </div>
        {enrolledCourses.length === 0 ? (
          <div className="p-8 text-center bg-gray-50 rounded-xl border-2 border-[#F6F2FD]">
            <h3 className="text-xl font-semibold text-gray-800">
              You are not enrolled in any courses
            </h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((courseData, index) => {
              const { courseId, status } = courseData;
              return (
                <div
                  key={index}
                  className="p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow border-2 border-[#F6F2FD]"
                >
                  {status === "Approved" ? (
                    <Link
                      href={`/courses/${courseId._id}/learn`}
                      className="flex flex-col space-y-4"
                    >
                      <h3 className="text-xl font-semibold text-gray-800">
                        {courseId.courseName}
                      </h3>
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold ${
                          status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : status === "Approved"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {status}
                      </span>
                    </Link>
                  ) : (
                    <div className="flex flex-col space-y-4">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {courseId.courseName}
                      </h3>
                      <span className="px-4 py-2 rounded-full text-sm font-semibold bg-gray-100 text-gray-800">
                        {status}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Calendar Section */}
      <div className="bg-white rounded-2xl shadow-2xl border-2 border-[#F6F2FD] p-8 mb-12">
        {/* Header and Button in the Same Line */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center">
            <FaChartLine className="mr-3 w-8 h-8 text-purple-500" />
            My Meetings
          </h2>
          <button
  onClick={() => setIsModalOpen(true)}
  className="inline-flex items-center px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 w-full sm:w-auto"
>
  <FaCalendarAlt className="mr-3 w-6 h-6" />
  Schedule Meetings
</button>

        </div>
        <MyMeetingsCalendar /> {/* Calendar component as it is */}
      </div>

      {/* Modal for Scheduling Form */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ScheduleForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}

export default Page;
