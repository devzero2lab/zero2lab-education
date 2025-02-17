"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ApprovedList from "./ApprovedList";
import { Spin } from "antd";

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
      console.error("Error fetching pending courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovedCourses();
  }, []);

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Approved Courses Access</h1>
      <Spin spinning={loading}>
        <ApprovedList
          courses={approvedCourses}
          fetchApprovedCourses={fetchApprovedCourses}
        />
      </Spin>
    </div>
  );
}

export default ApprovedPage;
