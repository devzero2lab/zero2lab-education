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
import Loader from "../components/Loader";

function Page() {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const userID = user?.id || "";
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [courseCount, setCourseCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
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
      <div className="flex justify-center">
        <Loader />
      </div>
    );
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
      title: "Certificates",
      value: 0,
      icon: <FaTasks className="w-8 h-8 text-white" />,
      color: "bg-gradient-to-r from-[#F472B6] to-[#F59E0B]", // Pink to orange gradient
    },
  ];

  return (
    <div className="relative z-10 w-full max-w-[90rem] mx-auto mt-12 mb-20 bg-[#F6FFFF] min-h-screen p-8">
      {/* Title */}
      <h1 className="mb-8 text-4xl font-bold text-center text-gray-800">
        Welcome Back, {user?.firstName} !
      </h1>
      {/* Header Stats */}
      <div className="bg-white rounded-2xl shadow-2xl border-2 border-[#F6F2FD] p-8 mb-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl shadow-lg bg-gradient-to-r ${stat.color} text-white hover:scale-105 transition-transform duration-300 border-2 border-[#F6F2FD]`}
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-lg bg-white/20 backdrop-blur-sm">
                  {stat.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{stat.title}</h3>
                  <p className="mt-1 text-3xl font-bold">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enrolled Courses Section */}
      <div className="bg-white rounded-2xl shadow-2xl border-2 border-[#F6F2FD] p-8 mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="flex items-center text-3xl font-bold text-gray-800">
            <FaGraduationCap className="w-8 h-8 mr-3 text-blue-500" />
            Enrolled Courses
          </h2>
        </div>

        {loading ? (
          <div className="p-8 text-center bg-gray-50 rounded-xl border-2 border-[#F6F2FD]">
            <h3 className="text-xl font-semibold text-gray-800">Loading...</h3>
          </div>
        ) : enrolledCourses.length === 0 ? (
          <div className="p-8 text-center bg-gray-50 rounded-xl border-2 border-[#F6F2FD]">
            <h3 className="text-xl font-semibold text-gray-800">
              You are not enrolled in any courses
            </h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-1 lg:grid-cols-1">
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
                            ? "bg-blue-600 text-white"
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
                      <span className="px-4 py-2 text-sm font-semibold text-red-600 bg-gray-100 rounded-full">
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
          <h2 className="flex items-center text-3xl font-bold text-gray-800">
            <FaChartLine className="w-8 h-8 mr-3 text-purple-500" />
            My Meetings
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center w-full px-8 py-3 text-lg font-semibold text-white transition-all transform rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:scale-105 sm:w-auto"
          >
            <FaCalendarAlt className="w-6 h-6 mr-3" />
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
