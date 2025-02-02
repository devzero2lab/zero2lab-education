"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Spin } from "antd";
import Course from "./components/Course";

export default function CoursePage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all courses
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/api/courses/`);
      setCourses(response.data.courses);
      setError(null);
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError("Failed to fetch courses.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [apiUrl]);

  return (
    <div className="p-4">
      <Link
        href="/admin/course/addcourse"
        className="inline-block px-4 py-2 mb-6 text-white bg-blue-500 rounded"
      >
        Add Course
      </Link>

      {loading ? (
        <div className="flex justify-center">
          <Spin size="large" />
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <Course courses={courses} fetchCourses={fetchCourses} />
      )}
    </div>
  );
}
