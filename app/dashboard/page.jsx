"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { FaBook, FaGraduationCap, FaLock } from "react-icons/fa";
import Loader from "../components/Loader";
import Certificates from "../certificates/Certificates";
import BookMeeting from "./components/BookMeeting";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

function Page() {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const userID = user?.id || "";
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [approvedCount, setApprovedCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  // Map of courseId → { completedLessons, totalLessons, percentage }
  const [progressMap, setProgressMap] = useState({});

  // Redirect unenrolled/unauthenticated users without a render-time side effect
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 3 parallel requests — no sequential waterfall, no redundant count call
        const [coursesRes, certsRes, allProgressRes] = await Promise.all([
          fetch(`${apiUrl}/api/usercourses?userId=${userID}`),
          fetch(`${apiUrl}/api/usercertificate?userID=${userID}`),
          fetch(`${apiUrl}/api/progress?userId=${userID}`),
        ]);

        const coursesData = await coursesRes.json();
        const certsData = await certsRes.json();
        const allProgressData = await allProgressRes.json();

        const courses = coursesData.userCourses || [];
        setEnrolledCourses(courses);

        // Derive counts from the course list — no separate count API call needed
        setApprovedCount(courses.filter((c) => c.status === "Approved").length);
        setCompletedCount(courses.filter((c) => c.status === "Completed").length);

        setCertificates(certsData.completedCourses);

        // Build progressMap from batch data.
        // totalLessons comes from the already-populated courseId.content on each course.
        const rawProgress = allProgressData.progressMap || {};
        const newProgressMap = {};
        courses.forEach((c) => {
          const id = c.courseId._id.toString();
          const p = rawProgress[id];
          if (p) {
            const totalLessons = c.courseId.content?.length || 0;
            const { completedCount } = p;
            const percentage =
              totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
            newProgressMap[id] = { completedCount, totalLessons, percentage };
          }
        });
        setProgressMap(newProgressMap);
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
    return <div><Loader /></div>;
  }

  if (!isSignedIn) {
    return null;
  }

  const stats = [
    {
      title: "In Progress Courses",
      value: approvedCount,
      icon: <FaBook className="w-6 h-6 sm:w-8 sm:h-8 text-[#090D24]" />,
      color: "bg-[#D9FFA5] border-2 border-[#090D24]",
      textColor: "text-[#090D24]",
    },
    {
      title: "Completed Courses",
      value: completedCount,
      icon: <FaGraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-white" />,
      color: "bg-[#090D24] border-2 border-[#090D24]",
      textColor: "text-white",
    },
  ];

  return (
    <div className={`${montserrat.className} mt-[130px] mb-12 w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-12`}>
      {/* Welcome Header */}
      <div className="mb-8 md:mb-10 flex text-center md:text-left flex-col items-center md:items-start group">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#090D24] leading-tight break-words max-w-full">
          Welcome Back,{" "}
          <span className="text-gray-600 block sm:inline mt-1 sm:mt-0">
            {user?.firstName}!
          </span>
        </h1>
        <div className="h-[3px] w-16 bg-[#D9FFA5] rounded-full mt-4 transition-all duration-300 group-hover:w-24"></div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 mb-10 md:grid-cols-2">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.color} rounded-3xl p-5 sm:p-7 shadow-sm relative overflow-hidden transition-transform duration-300 hover:-translate-y-1`}
          >
            <div className="absolute -right-4 -bottom-4 opacity-10">
              {React.cloneElement(stat.icon, { className: "w-28 h-28" })}
            </div>
            <div className="flex items-center space-x-5 relative z-10">
              <div className={`p-3 sm:p-4 rounded-2xl ${stat.title === "Completed Courses" ? "bg-white/10" : "bg-white border-2 border-[#090D24]"}`}>
                {stat.icon}
              </div>
              <div>
                <p className={`text-base sm:text-lg font-semibold ${stat.title === "Completed Courses" ? "text-gray-300" : "text-[#090D24]/70"}`}>
                  {stat.title}
                </p>
                <p className={`mt-0.5 text-3xl sm:text-4xl font-bold ${stat.textColor}`}>
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enrolled Courses Section */}
      <section className="mb-10 bg-white border-2 border-gray-100 shadow-sm rounded-3xl overflow-hidden">
        <div className="flex items-center justify-between px-5 sm:px-6 py-5 border-b-2 border-gray-100 bg-gray-50/50">
          <h2 className="flex items-center text-lg sm:text-xl font-bold text-[#090D24]">
            <span className="p-2 bg-gray-100 border-2 border-gray-200 rounded-xl mr-3 sm:mr-4 shrink-0">
              <FaGraduationCap className="w-5 h-5 text-[#090D24]" />
            </span>
            Enrolled Courses
          </h2>
        </div>

        <div className="p-5 sm:p-6">
          {loading ? (
            <div className="py-10 flex justify-center">
              <div className="w-8 h-8 border-4 border-gray-200 border-t-[#090D24] rounded-full animate-spin"></div>
            </div>
          ) : enrolledCourses.length === 0 ? (
            <div className="py-10 text-center flex flex-col items-center">
              <div className="p-4 bg-gray-50 rounded-2xl mb-4 border-2 border-gray-100">
                <FaBook className="w-10 h-10 text-[#090D24]/30" />
              </div>
              <h3 className="text-lg font-bold text-[#090D24]">No courses enrolled yet</h3>
              <p className="mt-1.5 text-sm text-gray-500 font-medium">Explore our courses to get started!</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {enrolledCourses.map((courseData, index) => {
                const { courseId, status } = courseData;
                const progress = progressMap[courseId._id];
                const isAccessible = status === "Approved" || status === "Completed";

                return (
                  <div
                    key={index}
                    className="p-4 transition-all duration-300 border-2 border-gray-100 group rounded-2xl hover:border-[#090D24] hover:shadow-[4px_4px_0_0_#D9FFA5] bg-white"
                  >
                    {isAccessible ? (
                      <Link href={`/courses/${courseId._id}/learn`} className="block">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base sm:text-lg font-semibold text-[#090D24] line-clamp-1">
                              {courseId.courseName}
                            </h3>
                            <div className="flex items-center mt-2 space-x-2">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${
                                  status === "Approved"
                                    ? "bg-[#D9FFA5] text-[#090D24] border-[#090D24]"
                                    : "bg-blue-100 text-blue-800 border-blue-800"
                                }`}
                              >
                                {status}
                              </span>
                            </div>
                          </div>
                          <div className="p-2 sm:p-3 bg-gray-50 border border-gray-200 rounded-xl group-hover:bg-[#090D24] transition-colors shrink-0 ml-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        {progress && status !== "Completed" && (
                          <div className="mt-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-semibold text-gray-500">
                                {progress.completedCount}/{progress.totalLessons} lessons
                              </span>
                              <span className="text-xs font-bold text-[#090D24]">
                                {progress.percentage}%
                              </span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                              <div
                                className="h-full rounded-full transition-all duration-700"
                                style={{
                                  width: `${progress.percentage}%`,
                                  backgroundColor: progress.percentage === 100 ? "#22c55e" : "#090D24",
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </Link>
                    ) : (
                      <div className="flex items-center justify-between opacity-70">
                        <div>
                          <h3 className="text-base sm:text-lg font-semibold text-[#090D24] line-clamp-1">
                            {courseId.courseName}
                          </h3>
                          <span className="inline-block px-3 py-1 mt-2.5 text-xs font-bold text-gray-600 bg-gray-100 border-2 border-gray-200 rounded-full">
                            {status}
                          </span>
                        </div>
                        <div className="p-2 sm:p-3 bg-gray-50 border border-gray-200 rounded-xl shrink-0">
                          <FaLock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* User certificates */}
      <Certificates certificates={certificates} loading={loading} />

      {/* Meeting section */}
      <BookMeeting />
    </div>
  );
}

export default Page;
