import React from "react";
import { Table, Image, Button } from "antd";
import { toast } from "sonner";
import Swal from "sweetalert2";
import axios from "axios";
import Link from "next/link";

function Course({ courses, fetchCourses }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Handle course deletion
  const handleDelete = async (courseID) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${apiUrl}/api/courses/${courseID}`);
          toast.success("Course deleted successfully!");
          fetchCourses(); // Refresh list
        } catch (error) {
          console.error("Error deleting course:", error);
          toast.error("Failed to delete the course. Please try again.");
        }
      }
    });
  };

  // Define columns for Ant Design Table
  const columns = [
    {
      title: "Course Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <Image
          width={50}
          src={image}
          alt="Course Image"
          preview={{ src: image }}
        />
      ),
    },
    {
      title: "Course Name",
      dataIndex: "courseName",
      key: "courseName",
      render: (text, record) => (
        <Link href={`/admin/course/${record._id}`}>{text}</Link>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => <span className="font-semibold">Rs. {price}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <button
            className="px-4 py-2 mt-4 text-white bg-red-500 rounded hover:bg-red-600"
            onClick={() => handleDelete(record._id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={courses.map((course) => ({ ...course, key: course._id }))}
      bordered
      pagination={{ pageSize: 5 }}
      footer={() => <div>{`Total ${courses.length} Courses`}</div>}
      locale={{ emptyText: "No courses available" }}
    />
  );
}

export default Course;
