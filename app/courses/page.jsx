"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseComponent from "./components/CourseComponent";

const RecordCoursesPage = () => {

  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${apiUrl}/api/courses/`,{
          cache: "no-store",
        });
        setCourses(response.data.courses);
      } catch (error) {
        setError(error.message || "Failed to fetch courses");
      } finally {
        setLoading(false);
      }
    };

    fetchRCourses();
  }, []);

  return (
    <div className="px-8 py-4 mt-12">
      <h1 className="mt-6 mb-8 text-2xl font-semibold text-center">
        Explore Our Recorded Courses
      </h1>

    {loading && <div className="text-center">Loading...</div>}

      <div className="flex flex-wrap justify-center gap-6">
      {courses.length > 0 ? (
        courses.map((course) => (
          <CourseComponent key={course._id} course={course} />
        ))
      ) : (
        <div>No courses available</div>
      )}
      </div>
    </div>
  );
};

export default RecordCoursesPage;
