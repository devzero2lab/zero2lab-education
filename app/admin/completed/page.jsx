"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CompletedList from "./CompletedList";
import { Spin } from "antd";

function CourseCompleted() {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [completedCourses, setCompletedCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCompletedCourses = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/api/admin/usercourses`, {
        params: { status: "Completed" },
      });
      setCompletedCourses(response.data.userCourses || []);
    } catch (error) {
      console.error("Error fetching pending courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompletedCourses();
  }, []);
  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Course Completed Users List</h1>
      <Spin spinning={loading}>
        <CompletedList
          courses={completedCourses}
          fetchCompletedCourses={fetchCompletedCourses}
        />
      </Spin>
    </div>
  );
}

export default CourseCompleted;
