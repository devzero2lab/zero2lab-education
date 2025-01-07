"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Course from "./components/Course";

export default function CoursePage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    // Fetch all courses
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/courses/`);
        console.log(response.data);
        setCourses(response.data.courses);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to fetch courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">All Courses</h1>
      <Link
        href="/admin/course/addcourse"
        className="inline-block px-4 py-2 mb-6 text-white bg-blue-500 rounded"
      >
        Add Course
      </Link>
      <p className="mb-4 text-gray-600">Welcome to the courses page!</p>

      {loading && <p>Loading courses...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Course
              key={course._id}
              courseID={course._id}
              courseImage={course.image}
              courseName={course.courseName}
              coursePrice={course.price}
            />
          ))}
        </div>
      )}
    </div>
  );
}
