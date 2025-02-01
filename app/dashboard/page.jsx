"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import MyMeetingsCalendar from "../schedule-meetings/page";
import {
  FaBook,
  FaCalendarAlt,
  FaGraduationCap,
  FaPlus,
  FaLock,
  FaCertificate,
} from "react-icons/fa";
import Modal from "../modal/Modal";
import ScheduleForm from "../schedule-meetings/schedule-form/page";
import Loader from "../components/Loader";

function Page() {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const userID = user?.id || "";
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [approvedCount, setApprovedCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [allCertificates, setCertificates] = useState([]);

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
        const Certificates = await axios.get(
          `${apiUrl}/api/Certificates/${userID}`
        );

        setEnrolledCourses(coursesResponse.data.userCourses);
        setApprovedCount(countResponse.data.approvedCount);
        setCompletedCount(countResponse.data.completedCount);
        setCertificates(Certificates.data);
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

      {console.log(allCertificates)}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-2">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.color} rounded-2xl p-6 shadow-lg relative overflow-hidden transition-transform hover:scale-[1.02]`}
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
            <div className="py-12 text-center ">
              <div class="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
                <svg
                  class="w-16 h-16 animate-spin text-gray-900/50"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                >
                  <path
                    d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                    stroke="currentColor"
                    stroke-width="5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                    stroke="currentColor"
                    stroke-width="5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="text-gray-900"
                  ></path>
                </svg>
              </div>
              loading...
            </div>
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

      <section className="mb-12 bg-white border border-gray-200 shadow-sm rounded-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="flex items-center text-2xl font-semibold">
            <FaCertificate className="mr-3 text-purple-600" />
            Certificates
          </h2>
        </div>

        <div className="p-6">
          {allCertificates.length > 0 ? (
            <ul className="space-y-4">
              {allCertificates.map((certificate) => (
                <Link
                  href={`/certificates/${certificate._id}`}
                  key={certificate._id}
                >
                  <li className="p-4 mb-3 border rounded-lg shadow">
                    <h3 className="text-lg font-medium">
                      {certificate.courseId.courseName}
                    </h3>
                    <p className="text-gray-500">
                      Status: {certificate.status}
                    </p>
                  </li>
                </Link>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">
              No completed certificates available.
            </p>
          )}
        </div>
      </section>

      {/* Meetings Section */}
      <section className="bg-white border border-gray-200 shadow-sm rounded-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="flex items-center text-2xl font-semibold">
            <FaCalendarAlt className="mr-3 text-blue-600" />
            My Meetings
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
          >
            <FaPlus className="mr-2" />
            Schedule Meeting
          </button>
        </div>

        <div>
          <MyMeetingsCalendar />
        </div>
      </section>

      {/* Schedule Meeting Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ScheduleForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}

export default Page;
