"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ApprovedList from "./ApprovedList";
import { CheckCircle } from "lucide-react";

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

function ApprovedPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [approvedCourses, setApprovedCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchApprovedCourses = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/api/admin/usercourses`, {
        params: { status: "Approved" },
      });
      setApprovedCourses(response.data.userCourses || []);
    } catch (error) {
      console.error("Error fetching approved courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovedCourses();
  }, []);

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center">
          <CheckCircle size={18} className="text-green-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-800">Approved Access</h1>
          <p className="text-xs text-slate-500">{approvedCourses.length} active enrollments</p>
        </div>
      </div>

      {loading ? (
        <ListSkeleton />
      ) : (
        <ApprovedList courses={approvedCourses} fetchApprovedCourses={fetchApprovedCourses} />
      )}
    </div>
  );
}

export default ApprovedPage;
