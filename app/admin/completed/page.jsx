"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CompletedList from "./CompletedList";
import { Spin, Input } from "antd";

function CourseCompleted() {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [completedCourses, setCompletedCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchCompletedCourses = async (search = "") => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/api/admin/usercourses`, {
        params: { status: "Completed", search },
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

  // Handle search input changes
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchCompletedCourses(query);
  };

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Course Completed Users List</h1>
      {/* Search Bar */}
      <Input
        placeholder="Search by Name, Email, or WhatsApp Number"
        value={searchQuery}
        onChange={handleSearch}
        className="w-full mb-4"
      />
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
