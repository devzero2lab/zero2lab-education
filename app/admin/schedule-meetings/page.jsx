"use client";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import MeetingList from "./MeetingList";
import { Calendar } from "lucide-react";

function ListSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl p-4 shadow-sm animate-pulse">
          <div className="h-4 bg-slate-200 rounded w-1/3 mb-2" />
          <div className="h-3 bg-slate-200 rounded w-2/3 mb-2" />
          <div className="h-3 bg-slate-200 rounded w-1/4" />
        </div>
      ))}
    </div>
  );
}

function Page() {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMeetings = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/api/meetings`);
      setMeetings(response.data.meetingList);
    } catch (error) {
      console.error("Failed to fetch meetings:", error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchMeetings();
  }, [fetchMeetings]);

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <div className="w-9 h-9 rounded-lg bg-indigo-100 flex items-center justify-center">
          <Calendar size={18} className="text-indigo-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-800">Meetings</h1>
          <p className="text-xs text-slate-500">{meetings.length} scheduled meetings</p>
        </div>
      </div>

      {loading ? (
        <ListSkeleton />
      ) : (
        <MeetingList meetings={meetings} fetchMeetings={fetchMeetings} />
      )}
    </div>
  );
}

export default Page;
