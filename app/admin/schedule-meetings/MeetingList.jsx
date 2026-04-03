"use client";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { toast } from "sonner";
import axios from "axios";
import { Mail, Clock, CalendarDays, Calendar, Trash2, AlignLeft } from "lucide-react";
import Pagination from "../components/Pagination";

const PAGE_SIZE = 8;

function MeetingList({ meetings, fetchMeetings }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil((meetings?.length || 0) / PAGE_SIZE);
  const paginated = (meetings || []).slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const deleteMeeting = async (id) => {
    const result = await Swal.fire({
      title: "Delete Meeting?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`${apiUrl}/api/meetings/${id}`);
        toast.success("Meeting deleted successfully!");
        fetchMeetings();
      } catch (error) {
        console.error("Failed to delete meeting:", error);
        toast.error("Failed to delete meeting.");
      }
    }
  };

  if (!meetings || meetings.length === 0) {
    return (
      <div className="bg-white rounded-xl p-10 text-center shadow-sm border border-slate-100">
        <Calendar size={32} className="text-slate-300 mx-auto mb-2" />
        <p className="text-slate-400 text-sm">No meetings scheduled.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-3">
        {paginated.map((meeting) => (
          <div
            key={meeting._id}
            className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-2">
                  <Mail size={13} className="text-slate-400 flex-shrink-0" />
                  <span className="text-sm font-semibold text-slate-800 truncate">
                    {meeting.email}
                  </span>
                </div>
                <div className="flex items-start gap-1.5 mb-2">
                  <AlignLeft size={13} className="text-slate-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-500 line-clamp-2">{meeting.description}</p>
                </div>
                <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <CalendarDays size={12} className="text-slate-400" />
                    <span>{meeting.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={12} className="text-slate-400" />
                    <span>{meeting.time}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => deleteMeeting(meeting._id)}
                className="flex-shrink-0 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete meeting"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}

export default MeetingList;
