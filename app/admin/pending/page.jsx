"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import PendingList from "./PendingList";
import Link from "next/link";
import { Clock, Plus } from "lucide-react";

function ListSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl p-4 shadow-sm animate-pulse">
          <div className="flex justify-between mb-3">
            <div className="h-4 bg-slate-200 rounded w-1/3" />
            <div className="h-5 bg-slate-200 rounded-full w-20" />
          </div>
          <div className="h-3 bg-slate-200 rounded w-1/2 mb-2" />
          <div className="h-3 bg-slate-200 rounded w-1/4" />
        </div>
      ))}
    </div>
  );
}

function PendingPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [pendingCourses, setPendingCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPendingCourses = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/api/admin/usercourses`, {
        params: { status: "Pending" },
      });
      setPendingCourses(response.data.userCourses || []);
    } catch (error) {
      console.error("Error fetching pending courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingCourses();
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-yellow-100 flex items-center justify-center">
            <Clock size={18} className="text-yellow-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">Pending Access</h1>
            <p className="text-xs text-slate-500">
              {pendingCourses.length} requests awaiting review
            </p>
          </div>
        </div>
        <Link
          href="/admin/pending/addusercourse"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl shadow-sm transition-colors"
        >
          <Plus size={16} />
          Create User Course
        </Link>
      </div>

      {loading ? (
        <ListSkeleton />
      ) : (
        <PendingList courses={pendingCourses} fetchPendingCourses={fetchPendingCourses} />
      )}
    </div>
  );
}

export default PendingPage;
