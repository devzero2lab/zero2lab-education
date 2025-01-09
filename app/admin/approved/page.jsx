"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ApprovedList from "./ApprovedList";

function ApprovedPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [approvedCourses, setApprovedCourses] = useState([]);

  useEffect(() => {
    const fetchApprovedCourses = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/usercourses`, {
          params: { status: "Approved" },
        });
        setApprovedCourses(response.data.userCourses || []);
      } catch (error) {
        console.error("Error fetching pending courses:", error);
      }
    };

    fetchApprovedCourses();
  }, []);

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Approved Courses Access</h1>
      <ApprovedList courses={approvedCourses} />
    </div>
  );
}

export default ApprovedPage;
