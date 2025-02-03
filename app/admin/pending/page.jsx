"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import PendingList from "./PendingList";
import { Spin } from "antd";
import Link from "next/link";

function PendingPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [pendingCourses, setPendingCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPendingCourses = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/api/usercourses`, {
        params: { status: "Pending" },
      });
      setPendingCourses(response.data.userCourses || []);
    } catch (error) {
      console.error("Error fetching pending courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingCourses();
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold ">Pending Courses Access</h1>
        <Link
          className="px-2 py-2 text-lg font-semibold text-white bg-blue-500 rounded-lg"
          href={"/admin/pending/addusercourse"}
        >
          create user course
        </Link>
      </div>
      <Spin spinning={loading}>
        <PendingList
          courses={pendingCourses}
          fetchPendingCourses={fetchPendingCourses}
        />
      </Spin>
    </div>
  );
}

export default PendingPage;
