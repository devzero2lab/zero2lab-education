"use client";
import React from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { Pencil, Trash2, Tag, FileText } from "lucide-react";

function Course({ courses, fetchCourses }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleDelete = async (courseID) => {
    const result = await Swal.fire({
      title: "Delete Course?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${apiUrl}/api/courses/${courseID}`);
        toast.success("Course deleted successfully!");
        fetchCourses();
      } catch (error) {
        console.error("Error deleting course:", error);
        toast.error("Failed to delete the course. Please try again.");
      }
    }
  };

  if (courses.length === 0) {
    return (
      <div className="bg-white rounded-xl p-10 text-center shadow-sm">
        <p className="text-slate-400 text-sm">No courses available yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {courses.map((course) => (
        <div
          key={course._id}
          className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
        >
          {/* Course image */}
          <div className="relative h-40 w-full bg-slate-100">
            {course.image ? (
              <Image
                src={course.image}
                alt={course.courseName}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-200">
                <span className="text-slate-400 text-xs">No image</span>
              </div>
            )}
            {/* Type badge */}
            <span
              className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-semibold ${
                course.type === "Live"
                  ? "bg-green-100 text-green-700"
                  : "bg-purple-100 text-purple-700"
              }`}
            >
              {course.type || "Live"}
            </span>
          </div>

          {/* Info */}
          <div className="p-4 flex-1 flex flex-col">
            <Link href={`/admin/course/${course._id}`}>
              <h3 className="font-semibold text-slate-800 text-sm hover:text-blue-600 transition-colors line-clamp-2">
                {course.courseName}
              </h3>
            </Link>
            <div className="flex items-center gap-1 mt-2">
              <Tag size={12} className="text-slate-400" />
              <span className="text-slate-600 text-sm font-medium">
                Rs. {course.price?.toLocaleString()}
              </span>
              {course.discountPrice > 0 && (
                <span className="text-xs text-slate-400 line-through ml-1">
                  Rs. {course.discountPrice?.toLocaleString()}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1">{course.level || "—"} · {course.duration || "—"}</p>

            {/* Actions */}
            <div className="flex gap-2 mt-auto pt-3">
              <Link
                href={`/admin/course/${course._id}/content`}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
              >
                <FileText size={13} />
                Content
              </Link>
              <Link
                href={`/admin/course/${course._id}`}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <Pencil size={13} />
                Edit
              </Link>
              <button
                onClick={() => handleDelete(course._id)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
              >
                <Trash2 size={13} />
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Course;
