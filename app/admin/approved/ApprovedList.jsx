"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { Mail, Phone, BookOpen, CreditCard, XCircle, Award } from "lucide-react";
import Pagination from "../components/Pagination";

const PAGE_SIZE = 8;

function StatusBadge({ status }) {
  const map = {
    Pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    Approved: "bg-green-100 text-green-700 border-green-200",
    Completed: "bg-blue-100 text-blue-700 border-blue-200",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${map[status] || "bg-slate-100 text-slate-600 border-slate-200"}`}>
      {status}
    </span>
  );
}

function ApprovedList({ courses, fetchApprovedCourses }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(courses.length / PAGE_SIZE);
  const paginated = courses.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleDenyAccess = async (course) => {
    try {
      const response = await axios.put(`${apiUrl}/api/usercourses/${course._id}`, {
        status: "Pending",
      });
      if (response.status === 200) {
        toast.success(`Access revoked for ${course.firstName} ${course.lastName}.`);
        fetchApprovedCourses();
      } else {
        toast.error("Failed to revoke access");
      }
    } catch (error) {
      console.error("Error revoking access:", error);
      toast.error("Something went wrong.");
    }
  };

  const handleComplete = async (course) => {
    const result = await Swal.fire({
      title: "Mark as Completed?",
      text: `${course.firstName} ${course.lastName} will be marked as completed.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Complete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#090D24",
    });
    if (result.isConfirmed) {
      try {
        const response = await axios.put(`${apiUrl}/api/usercourses/${course._id}`, {
          status: "Completed",
        });
        if (response.status === 200) {
          toast.success(`Marked as completed for ${course.firstName} ${course.lastName}.`);
          fetchApprovedCourses();
        } else {
          toast.error("Failed to mark as completed");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Something went wrong.");
      }
    }
  };

  if (courses.length === 0) {
    return (
      <div className="bg-white rounded-xl p-10 text-center shadow-sm border border-slate-100">
        <p className="text-slate-400 text-sm">No approved enrollments found.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-3">
        {paginated.map((course, index) => (
          <div
            key={course._id || index}
            className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-2 mb-3">
              <div>
                <p className="font-semibold text-slate-800 text-sm">
                  {course.firstName} {course.lastName}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <BookOpen size={12} className="text-slate-400" />
                  <span className="text-xs text-slate-500">
                    {course.courseId?.courseName || "N/A"}
                  </span>
                </div>
              </div>
              <StatusBadge status={course.status} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-500 mb-3">
              <div className="flex items-center gap-1.5">
                <Mail size={12} className="text-slate-400 flex-shrink-0" />
                <span className="truncate">{course.email}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone size={12} className="text-slate-400 flex-shrink-0" />
                <span>{course.whatsappNumber}</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <CreditCard size={12} className="text-slate-400" />
                {course.paymentSlip?.startsWith("http") ? (
                  <a href={course.paymentSlip} target="_blank" rel="noopener noreferrer"
                    className="text-[#090D24] hover:underline font-medium">
                    View Slip
                  </a>
                ) : (
                  <span>{course.paymentSlip || "No slip"}</span>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleDenyAccess(course)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors"
                >
                  <XCircle size={13} />
                  Revoke
                </button>
                <button
                  onClick={() => handleComplete(course)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#090D24] hover:bg-black rounded-lg transition-colors"
                >
                  <Award size={13} />
                  Complete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}

export default ApprovedList;
