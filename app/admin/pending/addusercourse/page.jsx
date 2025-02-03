"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

function AddUserCourse() {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    whatsappNumber: "",
    courseId: "",
    paymentSlip: "",
  });

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/courses`);
      setCourses(response.data.courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/api/usercourses`, formData);
      toast.success("user course created");
    } catch (error) {
      console.error("Error adding user course:", error);
      toast.error("failed to add user course");
    }
  };

  return (
    <div className="max-w-lg p-6 mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="mb-4 text-xl font-semibold">Add User Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="userId"
          placeholder="User ID"
          value={formData.userId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="whatsappNumber"
          placeholder="WhatsApp Number"
          value={formData.whatsappNumber}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="paymentSlip"
          placeholder="Payment Slip"
          value={formData.paymentSlip}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="courseId"
          value={formData.courseId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select a Course</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.courseName}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddUserCourse;
