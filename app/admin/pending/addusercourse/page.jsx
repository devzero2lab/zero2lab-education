"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ArrowLeft, UserPlus } from "lucide-react";
import Link from "next/link";

const inputClass =
  "w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white placeholder-slate-400 transition";

const labelClass = "block text-sm font-medium text-slate-700 mb-1.5";

function AddUserCourse() {
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [courses, setCourses] = useState([]);
  const [submitting, setSubmitting] = useState(false);
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
      setSubmitting(true);
      await axios.post(`${apiUrl}/api/usercourses`, formData);
      toast.success("User course created successfully!");
      router.push("/admin/pending");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("User is already enrolled in this course.");
      } else {
        console.error("Error adding user course:", error);
        toast.error("Failed to add user course.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/admin/pending"
          className="p-2 rounded-lg text-slate-500 hover:bg-slate-200 transition-colors"
        >
          <ArrowLeft size={18} />
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
            <UserPlus size={18} className="text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">Add User Course</h1>
            <p className="text-xs text-slate-500">Manually enroll a user in a course</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 max-w-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* User Info */}
          <div>
            <h2 className="text-sm font-semibold text-slate-700 mb-3 pb-2 border-b border-slate-100">
              User Information
            </h2>
            <div className="space-y-3">
              <div>
                <label className={labelClass}>User ID *</label>
                <input
                  type="text"
                  name="userId"
                  placeholder="Clerk User ID"
                  value={formData.userId}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label className={labelClass}>Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>Email *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="user@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>WhatsApp Number *</label>
                <input
                  type="text"
                  name="whatsappNumber"
                  placeholder="+94 77 123 4567"
                  value={formData.whatsappNumber}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>
            </div>
          </div>

          {/* Course Info */}
          <div>
            <h2 className="text-sm font-semibold text-slate-700 mb-3 pb-2 border-b border-slate-100">
              Course & Payment
            </h2>
            <div className="space-y-3">
              <div>
                <label className={labelClass}>Select Course *</label>
                <select
                  name="courseId"
                  value={formData.courseId}
                  onChange={handleChange}
                  className={inputClass}
                  required
                >
                  <option value="">Choose a course...</option>
                  {courses.map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.courseName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Payment Slip Reference *</label>
                <input
                  type="text"
                  name="paymentSlip"
                  placeholder="URL or reference number"
                  value={formData.paymentSlip}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Link
              href="/admin/pending"
              className="px-5 py-2.5 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-2.5 text-sm font-semibold text-white bg-[#090D24] hover:bg-black rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Creating..." : "Create Enrollment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUserCourse;
