"use client";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import FeedbackList from "./FeedbackList";
import { MessageSquare } from "lucide-react";

function ListSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl p-4 shadow-sm animate-pulse">
          <div className="h-4 bg-slate-200 rounded w-1/4 mb-2" />
          <div className="h-3 bg-slate-200 rounded w-full mb-2" />
          <div className="h-3 bg-slate-200 rounded w-1/3" />
        </div>
      ))}
    </div>
  );
}

function Page() {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFeedbacks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/api/contactus`);
      setFeedbacks(response.data.feedbackList);
    } catch (error) {
      console.error("Failed to fetch feedbacks:", error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchFeedbacks();
  }, [fetchFeedbacks]);

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <div className="w-9 h-9 rounded-lg bg-rose-100 flex items-center justify-center">
          <MessageSquare size={18} className="text-rose-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-800">Feedbacks</h1>
          <p className="text-xs text-slate-500">{feedbacks.length} messages received</p>
        </div>
      </div>

      {loading ? (
        <ListSkeleton />
      ) : (
        <FeedbackList feedbacks={feedbacks} fetchFeedbacks={fetchFeedbacks} />
      )}
    </div>
  );
}

export default Page;
