import Link from "next/link";
import React from "react";
import axios from "axios";
import { toast } from "sonner";
import Image from "next/image";
import Swal from "sweetalert2";

function Course({
  courseID,
  courseImage,
  courseName,
  coursePrice,
  fetchCourses,
}) {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `${apiUrl}/api/courses/${courseID}`
          );
          toast.success("Course deleted successfully!");
          fetchCourses();
        } catch (error) {
          console.error("Error deleting course:", error);
          toast.error("Failed to delete the course. Please try again.");
        }
      }
    });
  };

  return (
    <div className="p-4 border rounded shadow-sm">
      <Link href={`/admin/course/${courseID}`}>
        <Image
          src={courseImage}
          alt={courseName}
          width={300}
          height={200}
          className="object-cover rounded"
        />
        <h2 className="mt-2 text-lg font-bold">{courseName}</h2>
        <p className="font-semibold text-blue-500">Rs.{coursePrice}</p>
      </Link>
      {/* Delete button */}
      <button
        onClick={handleDelete}
        className="w-full px-4 py-2 mt-4 text-white bg-red-500 rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  );
}

export default Course;
