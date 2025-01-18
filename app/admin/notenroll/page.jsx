"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import UserList from "./UserList";

const UsersPage = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotEnrolledUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/api/users`);
      setData(response.data);
    } catch (err) {
      console.error("Fetch Error:", err);
      toast.error(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotEnrolledUsers();
  }, [apiUrl]);

  return (
    <div className="p-4">
      <p className="mb-6 text-2xl font-bold">Not Enrolled Users</p>
      <UserList
        data={data}
        loading={loading}
        fetchNotEnrolledUsers={fetchNotEnrolledUsers}
      />
    </div>
  );
};

export default UsersPage;
