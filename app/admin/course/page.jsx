"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Plus, BookOpen } from "lucide-react";
import Course from "./components/Course";

function CourseSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl p-4 shadow-sm animate-pulse">
          <div className="w-full h-36 bg-slate-200 rounded-lg mb-3" />
          <div className="h-4 bg-slate-200 rounded w-3/4 mb-2" />
          <div className="h-4 bg-slate-200 rounded w-1/3" />
        </div>
      ))}
    </div>
  );
}

export default function CoursePage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/api/courses/`);
      const data = await response.json();
      setCourses(data.courses);
      setError(null);
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError("Failed to fetch courses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div>
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
            <BookOpen size={18} className="text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">Courses</h1>
            <p className="text-xs text-slate-500">{courses.length} courses total</p>
          </div>
        </div>
        <Link
          href="/admin/course/addcourse"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#090D24] hover:bg-black text-white text-sm font-medium rounded-xl shadow-sm transition-colors"
        >
          <Plus size={16} />
          Add Course
        </Link>
      </div>

      {loading ? (
        <CourseSkeleton />
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm">
          {error}
        </div>
      ) : (
        <Course courses={courses} fetchCourses={fetchCourses} />
      )}
    </div>
  );
}
