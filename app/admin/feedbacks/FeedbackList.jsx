"use client";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { toast } from "sonner";
import axios from "axios";
import { Mail, CalendarDays, Clock, Trash2, ChevronDown, ChevronUp, User } from "lucide-react";
import Pagination from "../components/Pagination";

const PAGE_SIZE = 10;

function FeedbackList({ feedbacks, fetchFeedbacks }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [expanded, setExpanded] = useState({});
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil((feedbacks?.length || 0) / PAGE_SIZE);
  const paginated = (feedbacks || []).slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const deleteFeedback = async (id) => {
    const result = await Swal.fire({
      title: "Delete Feedback?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`${apiUrl}/api/contactus/${id}`);
        toast.success("Feedback deleted successfully!");
        fetchFeedbacks();
      } catch (error) {
        console.error("Failed to delete feedback:", error);
        toast.error("Failed to delete feedback.");
      }
    }
  };

  if (!feedbacks || feedbacks.length === 0) {
    return (
      <div className="bg-white rounded-xl p-10 text-center shadow-sm border border-slate-100">
        <p className="text-slate-400 text-sm">No feedbacks yet.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-3">
        {paginated.map((fb) => {
          const isExpanded = expanded[fb._id];
          return (
            <div
              key={fb._id}
              className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <User size={13} className="text-slate-400 flex-shrink-0" />
                    <span className="text-sm font-semibold text-slate-800">{fb.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Mail size={12} className="text-slate-400 flex-shrink-0" />
                    <span className="text-xs text-slate-500 truncate">{fb.email}</span>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-2.5 mb-2">
                    <p className={`text-xs text-slate-600 leading-relaxed ${!isExpanded ? "line-clamp-2" : ""}`}>
                      {fb.message}
                    </p>
                    {fb.message?.length > 100 && (
                      <button
                        onClick={() => toggleExpand(fb._id)}
                        className="flex items-center gap-0.5 mt-1 text-xs text-[#090D24] hover:opacity-70 font-medium"
                      >
                        {isExpanded ? (
                          <><ChevronUp size={12} /> Show less</>
                        ) : (
                          <><ChevronDown size={12} /> Read more</>
                        )}
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3 text-xs text-slate-400">
                    <div className="flex items-center gap-1">
                      <CalendarDays size={11} />
                      <span>{fb.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={11} />
                      <span>{fb.time}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => deleteFeedback(fb._id)}
                  className="flex-shrink-0 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete feedback"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}

export default FeedbackList;
