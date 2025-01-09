"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import PendingList from "./PendingList";

function PendingPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [pendingCourses, setPendingCourses] = useState([]);

  useEffect(() => {
    const fetchPendingCourses = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/usercourses`, {
          params: { status: "Pending" },
        });
        setPendingCourses(response.data.userCourses || []);
      } catch (error) {
        console.error("Error fetching pending courses:", error);
      }
    };

    fetchPendingCourses();
  }, []);

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Pending Courses Access</h1>
      <PendingList courses={pendingCourses} />
    </div>
  );
}

export default PendingPage;
