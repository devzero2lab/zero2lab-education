"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ApprovedList from "./ApprovedList";
import { Spin, Input } from "antd";

function ApprovedPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [approvedCourses, setApprovedCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchApprovedCourses = async (search = "") => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/api/admin/usercourses`, {
        params: { status: "Approved", search },
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

  // Handle search input changes
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchApprovedCourses(query); // Fetch courses based on search query
  };

  // Handle clearing search input
  const handleClearSearch = () => {
    setSearchQuery(""); // Reset search query state
    fetchApprovedCourses(); // Re-fetch courses without search
  };

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Approved Courses Access</h1>
      {/* Search Bar */}
      <Input
        placeholder="Search by Name, Email, or WhatsApp Number"
        value={searchQuery}
        onChange={handleSearch}
        onClear={handleClearSearch}
        className="w-full mb-4"
      />
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
