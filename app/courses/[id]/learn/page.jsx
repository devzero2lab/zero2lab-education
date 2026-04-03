"use client";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import VideoSection from "./VideoSection";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

export default function Page({ params }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();
  const { isSignedIn, user } = useUser();
  const { id } = params;
  const [courseData, setCourseData] = useState(null);
  const [currentDay, setCurrentDay] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    const fetchCourseData = async () => {
      if (!isSignedIn || !user) {
        router.push("/sign-in");
        return;
      }

      try {
        const [enrollRes, courseRes] = await Promise.all([
          fetch(`${apiUrl}/api/usercourses?userId=${user.id}&action=check&courseId=${id}`),
          fetch(`${apiUrl}/api/recordings/${id}`),
        ]);

        const { isEnrolled } = await enrollRes.json();

        if (!isEnrolled) {
          setRedirecting(true);
          router.push("/not-enrolled");
          return;
        }

        const courseJson = await courseRes.json();
        if (courseJson?.course) {
          setCourseData(courseJson.course);
        } else {
          console.error("Course data not found.");
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseData();
  }, [isSignedIn, user, id, apiUrl, router]);

  if (redirecting) {
    return null;
  }

  if (isLoading) {
    return (
      <div className={`${montserrat.className} flex items-center justify-center min-h-[calc(100vh-100px)] mt-[100px]`}>
        <div className="flex flex-col items-center gap-4">
           <div className="w-10 h-10 border-4 border-gray-200 border-t-[#090D24] rounded-full animate-spin"></div>
           <p className="font-bold text-[#090D24]">Loading Course...</p>
        </div>
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className={`${montserrat.className} flex items-center justify-center min-h-[calc(100vh-100px)] mt-[100px]`}>
        <p className="text-lg font-bold text-gray-500">Course not found.</p>
      </div>
    );
  }

  const currentLesson =
    courseData.content?.find((lesson) => lesson.day === currentDay) || null;

  return (
    <div className={`${montserrat.className} flex flex-col md:flex-row h-[calc(100vh-100px)] mt-[100px] w-full overflow-hidden`}>
      {/* Sidebar - fixed heights and scrolling handled internally */}
      <Sidebar
        lessons={courseData.content || []}
        currentDay={currentDay}
        setCurrentDay={setCurrentDay}
      />
      {/* Video Section - scrolling handled internally */}
      <VideoSection currentLesson={currentLesson} />
    </div>
  );
}

