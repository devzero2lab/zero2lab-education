"use client";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import CompletedList from "./CompletedList";
import { Award } from "lucide-react";

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

function CourseCompleted() {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [completedCourses, setCompletedCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCompletedCourses = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/api/admin/usercourses`, {
        params: { status: "Completed" },
      });
      setCompletedCourses(response.data.userCourses || []);
    } catch (error) {
      console.error("Error fetching completed courses:", error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchCompletedCourses();
  }, [fetchCompletedCourses]);

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
          <Award size={18} className="text-blue-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-800">Completed Users</h1>
          <p className="text-xs text-slate-500">{completedCourses.length} graduates</p>
        </div>
      </div>

      {loading ? (
        <ListSkeleton />
      ) : (
        <CompletedList courses={completedCourses} fetchCompletedCourses={fetchCompletedCourses} />
      )}
    </div>
  );
}

export default CourseCompleted;
