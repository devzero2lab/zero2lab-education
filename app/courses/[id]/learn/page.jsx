"use client";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import VideoSection from "./VideoSection";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();
  const { isSignedIn, user } = useUser();
  const { type, id } = params; // Extract dynamic route parameters
  const [courseData, setCourseData] = useState(null); // Store fetched course data
  const [currentDay, setCurrentDay] = useState(1); // Track the selected day
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    // if (!isSignedIn) {
    //   router.push("/sign-in"); // Redirect to the login page
    //   return; // Stop further execution of this effect
    // }

    const fetchCourseData = async () => {
      try {
        // Fetch the courses the user is enrolled in
        const response = await axios.get(
          `${apiUrl}/api/usercourses?userId=${user.id}`
        );
        const userCourses = response.data.userCourses;

        // Check if the user is enrolled in the current course
        const isEnrolled = userCourses.some(
          (userCourse) => userCourse.courseId._id === id
        );

        if (!isEnrolled) {
          router.push("/not-enrolled"); // Redirect if the user is not enrolled
          return; // Stop further execution
        }

        const courseResponse = await axios.get(`${apiUrl}/api/courses/${id}`);
        setCourseData(courseResponse.data.course);
        console.log(response.data.course);
      } catch (error) {
        console.error("Error fetching course data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseData();
  }, [isSignedIn, user, id, apiUrl, router]);

  // if (!isSignedIn) {
  //   return null; // Prevent rendering during redirection
  // }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-500">Course not found.</p>
      </div>
    );
  }

  const currentLesson = courseData.content.find(
    (lesson) => lesson.day === currentDay
  );

  return (
    <div className="flex flex-col h-screen md:flex-row">
      {/* Sidebar */}
      <Sidebar
        lessons={courseData.content}
        currentDay={currentDay}
        setCurrentDay={setCurrentDay}
      />
      {/* Video Section */}
      <VideoSection lesson={currentLesson} />
    </div>
  );
}
